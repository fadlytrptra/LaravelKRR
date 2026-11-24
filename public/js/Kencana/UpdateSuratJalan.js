$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [0], visible: false }],
    });

    table_atas = $("#table_atas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        destroy: true,
        autoWidth: false,
        ajax: {
            url: "/Kencana/UpdateSuratJalanUJTKencana/DisplayData",
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
                data: "Id_Penagihan",
                // render: function (data) {
                //     return `<input type="checkbox" name="penerimaCheckboxM" value="${data}" /> ${data}`;
                // },
            },
            { data: "IDPengiriman" },
            { data: "Tgl_Penagihan" },
            { data: "NamaCust" },
            { data: "Nilai_Penagihan" },
            { data: "Nama_MataUang" },
            { data: "IDCust" },
            { data: "TanggalDiterima" },
            { data: "JmlTerimaUmum" },
        ],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
        // columnDefs: [{ targets: [3, 4], visible: false }],
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        const selectedRow = $("#table_atas tbody tr.selected");

        if (selectedRow.length > 0) {
            var table_atas = $("#table_atas").DataTable();

            var rowData = table_atas.row(selectedRow).data();
            console.log(rowData);

            $.ajax({
                url: "/Kencana/UpdateSuratJalanUJTKencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    suratJalan: rowData.IDPengiriman,
                    idPenagihan: rowData.Id_Penagihan,
                    jatuhTempo: rowData.TanggalDiterima,
                    idCustomer: rowData.IDCust,
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
                            // location.reload();
                            // document
                            //     .querySelectorAll("input")
                            //     .forEach((input) => (input.value = ""));
                            $("#table_atas").DataTable().ajax.reload();
                            // idReferensi.value = response.IdReferensi;
                            // btn_proses.disabled = true;
                            // btn_batal.disabled = true;
                            // btn_isi.disabled = false;
                            // btn_koreksi.disabled = false;
                            // btn_hapus.disabled = false;
                            // btn_ok.click();
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
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        }
    });
});
