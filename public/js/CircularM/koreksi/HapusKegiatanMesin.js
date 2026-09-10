jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let tanggal = document.getElementById("tanggal");
    let nama_mesin = document.getElementById("nama_mesin");
    let btn_batal = document.getElementById("btn_batal");
    let btn_proses = document.getElementById("btn_proses");
    let id_log = document.getElementById("id_log");
    let id_order = document.getElementById("id_order");
    let sisa = document.getElementById("sisa");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });

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

    tanggal.valueAsDate = new Date();

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    id_log.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            id_order.focus();
        }
    });

    id_order.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sisa.focus();
        }
    });

    sisa.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_proses.focus();
        }
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        var data = table_atas.rows().data().toArray();
        $.ajax({
            url: "HapusKegiatanMesinD",
            type: "POST",
            data: {
                _token: csrfToken,
                data: data,
                tanggal: tanggal.value,
                id_log: id_log.value,
                id_order: id_order.value,
                sisa: sisa.value,
                nama_mesin: nama_mesin.value,
            },
            success: function (response) {
                console.log(response.message);

                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        console.log(result);
                        $("#table_atas").DataTable().ajax.reload();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    nama_mesin.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (nama_mesin.value.trim() === "") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Peringatan',
                    text: 'Nama mesin tidak boleh kosong!',
                    confirmButtonText: 'OK'
                });
                return;
            } else {
                table_atas = $("#table_atas").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    ajax: {
                        url: "HapusKegiatanMesinD/getData",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                nama_mesin: nama_mesin.value,
                                tanggal: tanggal.value,
                            });
                        },
                    },
                    columns: [
                        {
                            data: "Id_Log",
                            // render: function (data) {
                            //     return <input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data};
                            // },
                        },
                        {
                            data: "Status_log",
                            // render: function (data) {
                            //     return numeral(data).format("0,0.00");
                            // },
                        },
                        { data: "Shift" },
                        { data: "A_rpm" },
                        { data: "Id_order" },
                        { data: "Id_karyawan" },
                        { data: "Counter_mesin_awal" },
                        { data: "Counter_mesin_akhir" },
                        { data: "Awal_jam_kerja" },
                        { data: "Akhir_jam_kerja" },
                        { data: "Id_User" },
                    ],
                    // columnDefs: [{ targets: [12], visible: false }],
                    order: [[1, "asc"]],
                    paging: false,
                    scrollY: "300px",
                    scrollCollapse: true,
                });
            }
        }
    });
});