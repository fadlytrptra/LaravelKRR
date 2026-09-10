jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let gantiRPM = document.getElementById("gantiRPM");
    let gantiShutle = document.getElementById("gantiShutle");
    let label_ganti = document.getElementById("label_ganti");
    let nama_mesin = document.getElementById("nama_mesin");
    let shift = document.getElementById("shift");
    let tanggal = document.getElementById("tanggal");
    let ganti_rpm = document.getElementById("ganti_rpm");
    let btn_batal = document.getElementById("btn_batal");
    let btn_proses = document.getElementById("btn_proses");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });
    let kodeRadio = 1;
    tanggal.valueAsDate = new Date();
    gantiRPM.click();

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

    gantiRPM.addEventListener("click", function (event) {
        kodeRadio = 1;
        label_ganti.textContent = "Ganti RPM";
        tanggal.focus();
    });

    gantiShutle.addEventListener("click", function (event) {
        kodeRadio = 2;
        label_ganti.textContent = "Ganti Shutle";
        tanggal.focus();
    });

    ganti_rpm.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (ganti_rpm.value.trim() === "") {
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

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        var dataRPM = table_atas.rows().data().toArray();
        $.ajax({
            url: "GantiRPMShutleD",
            type: "POST",
            data: {
                _token: csrfToken,
                data: dataRPM,
                tanggal: tanggal.value,
                kodeRadio: kodeRadio,
                shift: shift.value,
                ganti_rpm: ganti_rpm.value,
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

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
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
            }
            table_atas = $("#table_atas").DataTable({
                responsive: true,
                processing: true,
                serverSide: true,
                destroy: true,
                ajax: {
                    url: "GantiRPMShutleD/getData",
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
            ganti_rpm.focus();
        }
    });

    // // Event untuk klik baris pada tabel #table_atas
    // $("#table_atas tbody").on("click", "tr", function () {
    //     selectRow($(this));
    // });

    // // Fungsi untuk memilih baris dan mengisi data ke form
    // function selectRow(row) {
    //     let table = $("#table_atas").DataTable();
    //     table.$("tr.selected").removeClass("selected");
    //     row.addClass("selected");

    //     let data = table.row(row).data();
    //     if (!data) return;

    //     // Mengisi nilai ke form
    //     if (kodeRadio === 1) {
    //         ganti_rpm.value = data.A_rpm;
    //     } else if (kodeRadio === 2) {
    //         ganti_rpm.value = data.A_n_shutle;
    //     }
    //     // ukuran.value = data.Ukuran;
    //     // rajutan.value = data.Rajutan;
    //     // rpm.value = data.A_rpm;
    //     // shutle.value = data.A_n_shutle;
    //     // hsl_meter.value = data.Hasil_meter;
    //     // effisiensi.value = data.Effisiensi;
    // }

    // // Navigasi dengan tombol panah atas dan bawah
    // $(document).on("keydown", function (e) {
    //     let selectedRow = $("#table_atas tbody tr.selected");
    //     let nextRow;

    //     if (e.key === "ArrowDown") {
    //         nextRow = selectedRow.length
    //             ? selectedRow.next("tr")
    //             : $("#table_atas tbody tr").first();
    //     } else if (e.key === "ArrowUp") {
    //         nextRow = selectedRow.length
    //             ? selectedRow.prev("tr")
    //             : $("#table_atas tbody tr").last();
    //     }

    //     if (nextRow && nextRow.length) {
    //         selectRow(nextRow);
    //         e.preventDefault(); // Hindari scroll halaman
    //     }
    // });
});