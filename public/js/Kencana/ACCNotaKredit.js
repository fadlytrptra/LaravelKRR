$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let table_atas = $("#table_atas").DataTable({
        columnDefs: [{ targets: [7, 8, 9, 10], visible: false }],
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
            url: "/Kencana/ACCNotaKreditKCN/getNotaKredit",
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
                data: "NamaNotaKredit",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Tanggal" },
            { data: "NamaCust" },
            { data: "Id_NotaKredit" },
            { data: "Id_Penagihan" },
            { data: "Nilai" },
            { data: "Nama_MataUang" },
            { data: "Id_Customer" },
            { data: "Id_MataUang" },
            { data: "NilaiKurs" },
            { data: "Status_Pelunasan" },
        ],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
        columnDefs: [{ targets: [7, 8, 9, 10], visible: false }],
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);

        table_bawah = $("#table_bawah").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            scrollX: true,
            // width: "150%",
            ajax: {
                url: "/Kencana/ACCNotaKreditKCN/getNotaKreditDetail",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        Id_NotaKredit: data.Id_NotaKredit,
                    });
                },
            },
            columns: [
                {
                    data: "SuratJalan",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "IdRetur" },
                {
                    data: "QtyBrg",
                    render: function (data) {
                        return numeral(data).format("0");
                    },
                },
                {
                    data: "HargaSP",
                    render: function (data) {
                        return numeral(data).format("0");
                    },
                },
                { data: "SatuanJual" },
                {
                    data: "HargaPot",
                    render: function (data) {
                        return numeral(data).format("0");
                    },
                },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
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

                // Filter out the row with matching Id_NotaKredit
                rowDataArray = rowDataArray.filter(
                    (row) => row.Id_NotaKredit !== rowDataPertama.Id_NotaKredit
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();

        $.ajax({
            url: "/Kencana/ACCNotaKreditKCN",
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
                        btn_proses.disabled = true;
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
});
