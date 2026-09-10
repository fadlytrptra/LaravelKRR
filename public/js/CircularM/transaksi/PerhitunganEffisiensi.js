jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let radioProsesPertama = document.getElementById("radioProsesPertama");
    let radioUpdateProses = document.getElementById("radioUpdateProses");
    let btn_tanggal = document.getElementById("btn_tanggal");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let tanggal = document.getElementById("tanggal");
    let shift = document.getElementById("shift");
    let shift_lengkap = document.getElementById("shift_lengkap");
    let mesin = document.getElementById("mesin");
    let ukuran = document.getElementById("ukuran");
    let rajutan = document.getElementById("rajutan");
    let rpm = document.getElementById("rpm");
    let shutle = document.getElementById("shutle");
    let hsl_meter = document.getElementById("hsl_meter");
    let effisiensi = document.getElementById("effisiensi");

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

    tanggal.readOnly = true;
    shift.readOnly = true;
    shift_lengkap.readOnly = true;

    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });
    let kode = 7;
    radioProsesPertama.click();
    btn_tanggal.focus();

    radioProsesPertama.addEventListener("click", function (event) {
        kode = 7;
        // table_atas.clear().draw();
    });

    radioUpdateProses.addEventListener("click", function (event) {
        kode = 8;
        // table_atas.clear().draw();
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_tanggal.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Tanggal",
                html: '<table id="tanggalTable" class="display" style="width:100%"><thead><tr><th>Tgl Log</th><th>Shift</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tanggalTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    jQuery(function ($) {
                        let orderSetting = (kode === 7) ? [[0, "asc"]] : [[0, "desc"]];
                        const table = $("#tanggalTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/orderD/show/getTanggal",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    kode: kode,
                                },
                            },
                            columns: [
                                {
                                    data: 'Tgl_Log_raw', // Data asli untuk sorting
                                    render: function (data, type, row) {
                                        // type === 'display' digunakan saat menampilkan di tabel
                                        if (type === 'display') {
                                            return row.Tgl_Log; // tampilkan versi m/d/Y
                                        }
                                        return data; // untuk sorting & filtering (yyyy-mm-dd)
                                    }
                                },
                                {
                                    data: 'Shift',
                                },
                            ],
                            order: orderSetting,
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#tanggalTable_filter input").focus();
                        }, 300);
                        // $("#tanggalTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#tanggalTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tanggalTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    shift.value = selectedRow.Shift;
                    // tanggal.value = selectedRow.Tgl_Log.split(" ")[0];
                    const originalDate = selectedRow.Tgl_Log; // contoh: "06/16/2025"
                    const dateObj = new Date(originalDate);

                    // Format ke yyyy-MM-dd tanpa konversi UTC
                    const year = dateObj.getFullYear();
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const day = String(dateObj.getDate()).padStart(2, '0');

                    const formattedDate = `${year}-${month}-${day}`;
                    tanggal.value = formattedDate;

                    shift_lengkap.value = selectedRow.KetShift;
                    setTimeout(() => {
                        btn_proses.focus();
                    }, 300);
                    // $.ajax({
                    //     url: "PenagihanPenjualanLokal/getJenisCustomer",
                    //     type: "GET",
                    //     data: {
                    //         _token: csrfToken,
                    //         idCustomer: idCustomer.value,
                    //     },
                    //     success: function (data) {
                    //         console.log(data);
                    //         jenisCustomer.value = data.TJenisCust;
                    //         alamat.value = data.TAlamat;
                    //     },
                    //     error: function (xhr, status, error) {
                    //         var err = eval("(" + xhr.responseText + ")");
                    //         alert(err.Message);
                    //     },
                    // });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: "/orderD/store",
            type: "POST",
            data: {
                _token: csrfToken,
                shift: shift.value,
                tanggal: tanggal.value,
                kode: kode,
                kodeProses: "ProsesPerhitunganEffisiensi",
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
                        console.log(response);

                        table_atas = $("#table_atas").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            destroy: true,
                            ajax: {
                                url: "/orderD/show/tampilData",
                                dataType: "json",
                                type: "GET",
                                data: function (d) {
                                    return $.extend({}, d, {
                                        _token: csrfToken,
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
                                    data: "Nama_Mesin",
                                    // render: function (data) {
                                    //     return numeral(data).format("0,0.00");
                                    // },
                                },
                                { data: "Ukuran" },
                                { data: "Rajutan" },
                                { data: "A_rpm" },
                                { data: "A_n_shutle" },
                                { data: "Keterangan" },
                                { data: "Counter_Mesin_Awal" },
                                { data: "Counter_Mesin_Akhir" },
                                { data: "Awal_Jam_Kerja" },
                                { data: "Akhir_Jam_Kerja" },
                                { data: "Hasil_meter" },
                                { data: "Effisiensi" },
                            ],
                            order: [[1, "asc"]],
                            createdRow: function (row, data, dataIndex) {
                                if (
                                    data.Highlight === true ||
                                    data.Highlight === "true"
                                ) {
                                    $("td", row).each(function () {
                                        $(this).css("color", "red");
                                    });
                                }
                            },
                            paging: false,
                            scrollY: "300px",
                            scrollCollapse: true,
                        });
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

    // $("#table_atas tbody").on("click", "tr", function () {
    //     // Remove the 'selected' class from any previously selected row
    //     $("#table_atas tbody tr").removeClass("selected");

    //     // Add the 'selected' class to the clicked row
    //     $(this).addClass("selected");

    //     // Get data from the clicked row
    //     var data = table_atas.row(this).data();
    //     console.log(data);

    //     mesin.value = data.Nama_Mesin;
    //     ukuran.value = data.Ukuran;
    //     rajutan.value = data.Rajutan;
    //     rpm.value = data.A_rpm;
    //     shutle.value = data.A_n_shutle;
    //     hsl_meter.value = data.Hasil_meter;
    //     effisiensi.value = data.Effisiensi;
    // });

    // Event untuk klik baris pada tabel #table_atas
    $("#table_atas tbody").on("click", "tr", function () {
        selectRow($(this));
    });

    // Fungsi untuk memilih baris dan mengisi data ke form
    function selectRow(row) {
        let table = $("#table_atas").DataTable();
        table.$("tr.selected").removeClass("selected");
        row.addClass("selected");

        let data = table.row(row).data();
        if (!data) return;

        // Mengisi nilai ke form
        mesin.value = data.Nama_Mesin;
        ukuran.value = data.Ukuran;
        rajutan.value = data.Rajutan;
        rpm.value = data.A_rpm;
        shutle.value = data.A_n_shutle;
        hsl_meter.value = data.Hasil_meter;
        effisiensi.value = data.Effisiensi;
    }

    // Navigasi dengan tombol panah atas dan bawah
    $(document).on("keydown", function (e) {
        let selectedRow = $("#table_atas tbody tr.selected");
        let nextRow;

        if (e.key === "ArrowDown") {
            nextRow = selectedRow.length
                ? selectedRow.next("tr")
                : $("#table_atas tbody tr").first();
        } else if (e.key === "ArrowUp") {
            nextRow = selectedRow.length
                ? selectedRow.prev("tr")
                : $("#table_atas tbody tr").last();
        }

        if (nextRow && nextRow.length) {
            selectRow(nextRow);
            e.preventDefault(); // Hindari scroll halaman
        }
    });
});
