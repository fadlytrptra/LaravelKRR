$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let checkbox_all = document.getElementById("checkbox_all");
    let btn_batal = document.getElementById("btn_batal");
    let btn_proses = document.getElementById("btn_proses");
    let table_terima = $("#table_terima").DataTable();
    let urlDefault = "/Kencana/ACCSerahTerimaPenagihanKencana/getSerahTerima";
    let urlSebagian = "/Kencana/ACCSerahTerimaPenagihanKencana/getBatalSerahTerima";
    let isSebagian = false;
    let checkedRows = [];
    let batal = 0;

    function initializeDataTable(url) {
        console.log(url);
        if ($.fn.DataTable.isDataTable("#table_terima")) {
            $("#table_terima").DataTable().destroy();
        }

        table_terima = $("#table_terima").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            returnFocus: true,
            ajax: {
                url: url,
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                    });
                },
            },
            columns: [
                {
                    data: "Waktu_Penagihan",
                    render: function (data, type, row) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${row.Id_Penagihan}" /> ${moment(data).format("MM/DD/YYYY")}`;
                    },
                },
                { data: "Id_Penagihan" },
                { data: "NM_SUP" },
                { data: "Nama_Dokumen" },
                { data: "Status_PPN" },
                { data: "Nama_MataUang" },
                { data: "Nilai_Penagihan" },
                { data: "Id_MataUang" },
            ],
            // columnDefs: [{ targets: [7], visible: false }],
            paging: false,
            scrollY: "350px",
            scrollCollapse: true,
        });
    }

    if (btn_batal.textContent === "Batal Serah Terima") {
        // batal = 0;
        console.log(btn_batal.textContent);
        initializeDataTable(urlDefault);
    } else if (btn_batal.textContent === "Serah Terima") {
        // batal = 1;
    } else {
        console.log(btn_batal.textContent);
        initializeDataTable(urlSebagian);
    }

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        isSebagian = !isSebagian;

        let newUrl = isSebagian ? urlSebagian : urlDefault;
        initializeDataTable(newUrl);
        if (isSebagian) {
            btn_batal.textContent = "Serah Terima";
            batal = 1; // Set to 1 when "Serah Terima"
        } else {
            btn_batal.textContent = "Batal Serah Terima";
            batal = 0; // Set to 0 when "Batal Serah Terima"
        }
    });

    checkbox_all.addEventListener("change", function () {
        const checkboxes = document.querySelectorAll(
            '#table_terima input[type="checkbox"][name="penerimaCheckbox"]',
        );
        checkedRows = []; // Reset checkedRows when selecting/deselecting all

        checkboxes.forEach(function (checkbox) {
            checkbox.checked = checkbox_all.checked;

            if (checkbox_all.checked) {
                let row = table_terima.row($(checkbox).closest("tr")).data();
                checkedRows.push(row); // Track all selected rows with full data
            }
        });
    });

    $("#table_terima tbody").off("change", 'input[name="penerimaCheckbox"]');

    $("#table_terima tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            rowData = table_terima.row($(this).closest("tr")).data();

            if (this.checked) {
                checkedRows.push(rowData); // Add checked row data to the array
            } else {
                checkedRows = checkedRows.filter(
                    (row) => row.Id_Penagihan !== rowData.Id_Penagihan,
                ); // Remove unchecked row data
            }

            console.log(checkedRows); // Debugging output
        },
    );

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        const formData = {
            _token: csrfToken,
            checkedRows: checkedRows,
            batal: batal,
        };

        $.ajax({
            url: "/Kencana/ACCSerahTerimaPenagihanKencana",
            type: "POST",
            data: formData,
            success: function (response) {
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        $("#table_terima").DataTable().ajax.reload();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr) {
                alert(xhr.responseJSON.message);
            },
        });
    });
});
