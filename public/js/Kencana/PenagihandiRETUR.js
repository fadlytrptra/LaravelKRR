document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_sebagian = document.getElementById("btn_sebagian");
    let brg_retur = document.getElementById("brg_retur");
    let btn_proses = document.getElementById("btn_proses");
    let tableatas = $("#tableatas").DataTable();
    let tablebawah = $("#tablebawah").DataTable();
    if (successMessage) {
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: successMessage,
            showConfirmButton: false,
            timer: 1500,
        });
    } else if (errorMessage) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: errorMessage,
            showConfirmButton: false,
            timer: 1500,
        });
    }

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();

        const ids = [];
        $('input[name="penerimaCheckbox"]:checked').each(function () {
            ids.push({
                checked: this.checked,
                id: this.value,
            });
        });

        // Collect the form data
        const selectedRow = $("#tablebawah tbody tr").first();

        if (selectedRow.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "No rows found in the table.",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        const rowDataB = tablebawah.row(selectedRow).data();
        // const rowDataB = tableatas.row($(this).closest("tr")).data();

        const formData = {
            ids: ids,
            noterima: rowDataB.No_Terima,
            isSebagian: !isSebagian,
            _token: csrfToken,
        };

        $.ajax({
            url: '/Kencana/PenagihandiRETURKencana',
            type: "POST",
            data: formData,
            success: function (response) {
                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    // Reload the DataTable
                    $("#tableatas").DataTable().ajax.reload();
                    $("#tablebawah").DataTable().ajax.reload();
                });
            },
            error: function (xhr) {
                alert(xhr.responseJSON.message);
            },
        });
    });

    let urlDefault = "/Kencana/PenagihandiRETURKencana/getData";
    let urlSebagian = "/Kencana/PenagihandiRETURKencana/getDataSebagian";
    let isSebagian = false;

    function initializeDataTable(url) {
        console.log(url);
        if ($.fn.DataTable.isDataTable("#tableatas")) {
            $("#tableatas").DataTable().destroy();
        }

        tableatas = $("#tableatas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            returnFocus: true,
            ajax: {
                url: url,
                dataType: "json",
                type: "GET",
                data: {
                    _token: csrfToken,
                },
            },
            columns: [
                {
                    data: "Waktu_Penagihan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "ID_Penagihan" },
                { data: "nm_sup" },
                { data: "nama_dokumen" },
                { data: "Status_PPN" },
                { data: "Nama_MataUang" },
                { data: "nilai_penagihan" },
            ],
        });
    }

    if (btn_sebagian.textContent === "Tampilkan Retur Sebagian") {
        console.log(btn_sebagian.textContent);
        initializeDataTable(urlDefault);
    } else {
        console.log(btn_sebagian.textContent);
        initializeDataTable(urlSebagian);
    }

    btn_sebagian.addEventListener("click", function (event) {
        event.preventDefault();
        isSebagian = !isSebagian;

        let newUrl = isSebagian ? urlSebagian : urlDefault;
        initializeDataTable(newUrl);
        btn_sebagian.textContent = isSebagian
            ? "Tampilkan Retur Semua"
            : "Tampilkan Retur Sebagian";
    });

    $("#tableatas tbody").off("change", 'input[name="penerimaCheckbox"]');

    $("#tableatas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]').not(this).prop("checked", false);
                const rowData = tableatas.row($(this).closest("tr")).data();

                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };

                brg_retur.value = rowData.ID_Penagihan;
                if ($.fn.DataTable.isDataTable("#tablebawah")) {
                    $("#tablebawah").DataTable().destroy();
                }

                tablebawah = $("#tablebawah").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    returnFocus: true,
                    ajax: {
                        url: "/Kencana/PenagihandiRETURKEncana/getRincian",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            brg_retur: brg_retur.value,
                        },
                    },
                    columns: [
                        { data: "No_Terima" },
                        { data: "Id_Divisi" },
                        { data: "No_SPPB" },
                        { data: "Kd_Brg" },
                        { data: "NAMA_BRG" },
                        { data: "qty_tagih" },
                        { data: "SatTagih" },
                        { data: "Qty_retur" },
                        { data: "Tgl_Retur" },
                    ],
                });
            }
        }
    );

});
