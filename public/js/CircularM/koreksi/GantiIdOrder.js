jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let tanggal = document.getElementById("tanggal");
    let order_lama = document.getElementById("order_lama");
    let nama_mesin = document.getElementById("nama_mesin");
    let btn_batal = document.getElementById("btn_batal");
    let btn_proses = document.getElementById("btn_proses");
    let ganti_order = document.getElementById("ganti_order");
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

    ganti_order.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_proses.focus();
        }
    });

    tanggal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            order_lama.focus();
        }
    });

    order_lama.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            nama_mesin.focus();
        }
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        var dataOrder = table_atas.rows().data().toArray();
        $.ajax({
            url: "GantiIdOrderD",
            type: "POST",
            data: {
                _token: csrfToken,
                data: dataOrder,
                tanggal: tanggal.value,
                order_lama: order_lama.value,
                ganti_order: ganti_order.value,
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
            if (order_lama.value.trim() === "") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Peringatan',
                    text: 'Order lama tidak boleh kosong!',
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
                        url: "GantiIdOrderD/getData",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                nama_mesin: nama_mesin.value,
                                order_lama: order_lama.value,
                                tanggal: tanggal.value,
                            });
                        },
                    },
                    columns: [
                        { data: "idMax" },
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
                        { data: "A_n_shutle" },
                        { data: "Id_order" },
                        { data: "Id_karyawan" },
                        { data: "Counter_mesin_awal" },
                        { data: "Counter_mesin_akhir" },
                        { data: "Awal_jam_kerja" },
                        { data: "Akhir_jam_kerja" },
                        { data: "Id_User" },
                        { data: "Id_mesin" },
                    ],
                    columnDefs: [{ targets: [0, 13], visible: false }],
                    order: [[1, "asc"]],
                    paging: false,
                    scrollY: "300px",
                    scrollCollapse: true,
                });
            }
        }
    });
});