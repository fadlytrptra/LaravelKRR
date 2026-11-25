jQuery(function ($) {
    //#region Variables
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    const radios = $('input[name="radio_jenisCetak"]');
    let radio_jenisNotaFaktur = document.getElementById("radio_jenisNotaFaktur"); //prettier-ignore
    let radio_jenisTunai = document.getElementById("radio_jenisTunai");
    let tanggal_penagihan = document.getElementById("tanggal_penagihan");
    let select_ttd = $("#select_ttd");
    let select_bank = $("#select_bank");
    let button_browseData = document.getElementById("button_browseData");
    let id_penagihan = document.getElementById("id_penagihan");
    let nama_customer = document.getElementById("nama_customer");
    let id_customer = document.getElementById("id_customer");
    let button_cetak = document.getElementById("button_cetak");
    let jenisCetak = "NotaFaktur";
    //#endregion

    //#region Load Form
    init();
    getBank();
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
        radio_jenisNotaFaktur.checked = true;
        tanggal_penagihan.valueAsDate = new Date();
        tanggal_penagihan.focus();

        select_ttd.select2({
            dropdownParent: $("#select2DropdownParent"),
            allowClear: true,
            placeholder: "Pilih Tanda Tangan",
        });

        select_bank.select2({
            dropdownParent: $("#select2DropdownParent"),
            allowClear: true,
            placeholder: "Pilih Bank Penagihan",
        });

        $("#select_ttd").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#select_bank").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
        select_ttd.val(null).trigger("change");
        select_bank.val(null).trigger("change");
    }

    function getBank() {
        $.ajax({
            url: "/Kencana/CetakNotaFakturKencana/getBank",
            type: "GET",
            data: {
                _token: csrfToken,
            },
            success: function (data) {
                if (data.error || data.length == 0) {
                    errorHandling("ajaxGetDataResponse", data.error);
                } else {
                    select_bank.empty();
                    data.forEach(function (item) {
                        select_bank.append(
                            new Option(item.Nama_Bank.trim(), item.Id_Bank), // prettier-ignore
                        );
                    });
                    select_bank.val(null).trigger("change");
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.error(err.Message);
            },
        });
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
                            "selected",
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
                            "selected",
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

    function errorHandling(jenisError, data) {
        if (jenisError == "ajaxGetDataResponse") {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: data,
                showConfirmButton: false,
                timer: 1500,
            });
        } else if (jenisError == "ttd_belumDipilih") {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: data,
                showConfirmButton: false,
                timer: 1500,
                returnFocus: false,
            }).then(() => {
                select_ttd.select2("open");
            });
        } else if (jenisError == "bank_belumDipilih") {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: data,
                showConfirmButton: false,
                timer: 1500,
                returnFocus: false,
            }).then(() => {
                select_bank.select2("open");
            });
        } else if (jenisError == "penagihan_belumDipilih") {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: data,
                showConfirmButton: false,
                timer: 1500,
                returnFocus: false,
            }).then(() => {
                button_browseData.focus();
            });
        }
    }
    //#endregion

    //#region Event Listeners
    radios.on("change", function () {
        jenisCetak = $('input[name="radio_jenisCetak"]:checked').val();
    });

    tanggal_penagihan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (select_ttd.val() == null || select_ttd.val() == "") {
                select_ttd.select2("open");
                return;
            }
            if (select_bank.val() == null || select_bank.val() == "") {
                select_bank.select2("open");
                return;
            }
            if (id_penagihan.value == null || id_penagihan.value == "") {
                button_browseData.focus();
                return;
            }
            button_cetak.focus();
        }
    });

    select_ttd.on("select2:select", function () {
        if (select_bank.val() == null || select_bank.val() == "") {
            select_bank.select2("open");
            return;
        }
        if (id_penagihan.value == null || id_penagihan.value == "") {
            button_browseData.focus();
            return;
        }
        button_cetak.focus();
    });

    select_bank.on("select2:select", function () {
        if (id_penagihan.value == null || id_penagihan.value == "") {
            button_browseData.focus();
            return;
        }
        button_cetak.focus();
    });

    button_browseData.addEventListener("click", function (e) {
        try {
            let url;
            if (jenisCetak == 'NotaFaktur') {
                url = '/Kencana/CetakNotaFakturKencana/getDataPenagihanSJ';
            } else if (jenisCetak == 'Tunai') {
                url = '/Kencana/CetakNotaFakturKencana/getDataPenagihanSP';
            }
            Swal.fire({
                title: "Pilih Penagihan",
                html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Nama Customer</th>
                            <th scope="col">Id Penagihan</th>
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
                width: "50%",
                returnFocus: false,
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: "Select",
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                            order: [1, "asc"],
                            ajax: {
                                url: url,
                                dataType: "json",
                                type: "GET",
                                data: {
                                    Tgl_penagihan: tanggal_penagihan.value,
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "NamaCust" },
                                { data: "Id_Penagihan" },
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "70%",
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
                            handleTableKeydown(e, "table_list"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    id_penagihan.value = result.value.Id_Penagihan.trim();
                    nama_customer.value = result.value.NamaCust.trim();
                    button_cetak.focus();
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    button_cetak.addEventListener("click", function (e) {
        let checkedRadio = document.querySelector('input[name="radio_jenisCetak"]:checked'); // prettier-ignore
        console.log(select_ttd.val());

        if (select_ttd.val() == null || select_ttd.val() == "") {
            errorHandling("ttd_belumDipilih", "Tanda Tangan harus dipilih!");
            return;
        }
        if (select_bank.val() == null || select_bank.val() == "") {
            errorHandling("bank_belumDipilih", "Bank harus dipilih!");
            return;
        }
        if (id_penagihan.value == null || id_penagihan.value == "") {
            errorHandling("penagihan_belumDipilih", "Penagihan harus dipilih!");
            return;
        }

        let url = `/Kencana/CetakNotaFakturKencana/print?ttd=${select_ttd.val()}&jenisCetak=${checkedRadio.value}&bank=${select_bank.val()}&idPenagihan=${id_penagihan.value}`; // prettier-ignore
        window.open(url, "_blank");
    });
    //#endregion
});
