jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let tanggal = document.getElementById("tanggal");
    let shift = document.getElementById("shift");
    let nama_mesin = document.getElementById("nama_mesin");
    let btn_batal = document.getElementById("btn_batal");
    let btn_proses = document.getElementById("btn_proses");
    let ganti_karyawan = document.getElementById("ganti_karyawan");
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

    tanggal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            shift.focus();
        }
    });

    shift.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            nama_mesin.focus();
        }
    });

    ganti_karyawan.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (ganti_karyawan.value.trim() === "") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Peringatan',
                    text: 'Tidak boleh kosong!',
                    confirmButtonText: 'OK'
                });
                return;
            } else {
                btn_proses.focus();
            }
        }
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        var dataKaryawan = table_atas.rows().data().toArray();
        $.ajax({
            url: "GantiNamaKaryawanD",
            type: "POST",
            data: {
                _token: csrfToken,
                data: dataKaryawan,
                tanggal: tanggal.value,
                shift: shift.value,
                ganti_karyawan: ganti_karyawan.value,
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
            if (shift.value.trim() === "") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Peringatan',
                    text: 'Shift tidak boleh kosong!',
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
                        url: "GantiNamaKaryawanD/getData",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                nama_mesin: nama_mesin.value,
                                shift: shift.value,
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
                    columnDefs: [{ targets: [12], visible: false }],
                    order: [[1, "asc"]],
                    paging: false,
                    scrollY: "300px",
                    scrollCollapse: true,
                });
            }
        }
    });
});