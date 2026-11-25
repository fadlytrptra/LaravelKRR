$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let checkbox_semua = document.getElementById("checkbox_semua");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [4], visible: false }],
    });
    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [4], visible: false }],
    });

    table_atas = $("#table_atas").DataTable({
        responsive: false,
        processing: true,
        serverSide: true,
        destroy: true,
        scrollX: true,
        // width: "150%",
        ajax: {
            url: "/Kencana/ACCPenagihanPenjualanEksporKCN/getDisplayHeader",
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
                data: "Tgl_Penagihan",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "NamaCust" },
            { data: "PO" },
            { data: "Nilai_Penagihan" },
            { data: "Nama_MataUang" },
            { data: "Id_Customer" },
            { data: "Id_MataUang" },
            { data: "NilaiKurs" },
        ],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
        // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();

        $.ajax({
            url: "/Kencana/ACCPenagihanPenjualanEksporKCN",
            type: "POST",
            data: {
                _token: csrfToken,
                rowDataArray: rowDataArray,
            },
            success: function (response) {
                console.log(response);

                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        location.reload();
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        // $("#table_atas").DataTable().ajax.reload();
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

    let rowDataArray = [];
    let rowDataPertama;

    // Handle checkbox change events
    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                rowDataArray.push(rowDataPertama);
                // rowDataArray = [rowDataPertama];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            } else {
                // rowDataPertama = null;
                // Remove the unchecked row data from the array
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Penagihan
                rowDataArray = rowDataArray.filter(
                    (row) => row.Id_Penagihan !== rowDataPertama.Id_Penagihan
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    checkbox_semua.addEventListener("change", function() {
        // Cek apakah checkbox_semua dicentang
        let isChecked = this.checked;

        // Centang atau hilangkan centang semua checkbox penerima
        $('input[name="penerimaCheckbox"]').each(function() {
            $(this).prop("checked", isChecked).trigger("change");
        });
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);
        // fakturPajak.value = data.IdFakturPajak;

        table_bawah = $("#table_bawah").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            scrollX: true,
            // width: "150%",
            ajax: {
                url: "/Kencana/ACCPenagihanPenjualanEksporKCN/getDisplayDetail",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        id_penagihan: data.Id_Penagihan,
                    });
                },
            },
            columns: [
                {
                    data: "Surat_Jalan",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "Tgl_Surat_jalan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });
    });
});
