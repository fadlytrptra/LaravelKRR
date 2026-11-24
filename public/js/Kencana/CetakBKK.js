jQuery(function ($) {
    //#region Variables
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let radio_jenisDPPelunasan = document.getElementById("radio_jenisDPPelunasan"); //prettier-ignore
    let tanggal_penagihan = document.getElementById("tanggal_penagihan");
    let button_browseData = document.getElementById("button_browseData");
    let id_bkk = document.getElementById("id_bkk");
    let button_cetak = document.getElementById("button_cetak");
    //#endregion

    //#region Load Form
    init();
    //#endregion

    //#region Functions
    $.ajaxSetup({
        beforeSend: function () {
            // Show the loading screen before the AJAX request
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            // Hide the loading screen after the AJAX request completes
            $("#loading-screen").css("display", "none");
        },
    });

    function init() {
        radio_jenisDPPelunasan.checked = true;
        tanggal_penagihan.valueAsDate = new Date();
    }

    // fungsi swal select pake arrow
    function handleTableKeydown(e, tableId) {
        const table = $(`#${tableId}`).DataTable();
        const rows = $(`#${tableId} tbody tr`);
        const rowCount = rows.length;

        if (e.key === "Enter") {
            e.preventDefault();
            const selectedRow = table.row(".selected").data();
            if (selectedRow) {
                Swal.getConfirmButton().click();
            } else {
                const firstRow = $(`#${tableId} tbody tr:first-child`);
                if (firstRow.length) {
                    firstRow.click();
                    Swal.getConfirmButton().click();
                }
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (currentIndex === null || currentIndex >= rowCount - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            rows.removeClass("selected");
            const selectedRow = $(rows[currentIndex]).addClass("selected");
            scrollRowIntoView(selectedRow[0]);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (currentIndex === null || currentIndex <= 0) {
                currentIndex = rowCount - 1;
            } else {
                currentIndex--;
            }
            rows.removeClass("selected");
            const selectedRow = $(rows[currentIndex]).addClass("selected");
            scrollRowIntoView(selectedRow[0]);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            const pageInfo = table.page.info();
            if (pageInfo.page < pageInfo.pages - 1) {
                table
                    .page("next")
                    .draw("page")
                    .on("draw", function () {
                        currentIndex = 0;
                        const newRows = $(`#${tableId} tbody tr`);
                        const selectedRow = $(newRows[currentIndex]).addClass(
                            "selected"
                        );
                        scrollRowIntoView(selectedRow[0]);
                    });
            }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            const pageInfo = table.page.info();
            if (pageInfo.page > 0) {
                table
                    .page("previous")
                    .draw("page")
                    .on("draw", function () {
                        currentIndex = 0;
                        const newRows = $(`#${tableId} tbody tr`);
                        const selectedRow = $(newRows[currentIndex]).addClass(
                            "selected"
                        );
                        scrollRowIntoView(selectedRow[0]);
                    });
            }
        }
    }

    // Helper function to scroll selected row into view
    function scrollRowIntoView(rowElement) {
        rowElement.scrollIntoView({ block: "nearest" });
    }
    //#endregion

    //#region Event KLListener
    button_browseData.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Id BKM",
                html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID BKM</th>
                            <th scope="col">Nilai Pelunasan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
                preConfirm: () => {
                    const selectedData = $("#table_list")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                width: "40%",
                returnFocus: false,
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: "Select",
                didOpen: () => {
                    $(document).ready(function () {
                        let checkedRadio = document.querySelector('input[name="radio_jenisBKK"]:checked'); // prettier-ignore
                        const table = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                            order: [1, "asc"],
                            ajax: {
                                url: "/Kencana/CetakBKKKencana/getDataBKK",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    jenisCetak: checkedRadio.value,
                                    tanggal: tanggal_penagihan.value,
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Id_BKK" },
                                {
                                    data: "Nilai_Pembulatan",
                                    render: function (data, type, row) {
                                        return numeral(data).format("0,0.00");
                                    },
                                },
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "50%",
                                },
                            ],
                        });

                        $("#table_list tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                            scrollRowIntoView(this);
                        });

                        const searchInput = $("#table_list_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "table_list")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(result.value);
                    id_bkk.value = result.value.Id_BKK;
                    // nilai_pelunasan.value = numeral(
                    //     result.value.Nilai_Pelunasan
                    // ).format("0,0.00");
                    button_cetak.focus();
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    button_cetak.addEventListener("click", function (e) {
        let checkedRadio = document.querySelector('input[name="radio_jenisBKK"]:checked'); // prettier-ignore
        if (id_bkk.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Pilih data BKM yang ingin dicetak!",
                showConfirmButton: false,
                timer: 1500,
            });
            button_browseData.focus();
            return;
        }

        let url = `/Kencana/CetakBKKKencana/printBKK?idbkk=${id_bkk.value}&jenisCetak=${checkedRadio.value}&tanggal=${tanggal_penagihan.value}`;
        window.open(url, "_blank");
    });
    //#endregion
});
