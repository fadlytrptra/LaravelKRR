jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let nomorUser = document.getElementById("nomorUser").value;
    let tambahKegiatanMesinPrintingLabel = document.getElementById("tambahKegiatanMesinPrintingLabel");
    let tanggalLog = document.getElementById("tanggalLog");
    let noMesin = document.getElementById("noMesin");
    let shiftPrinting = document.getElementById("shiftPrinting");
    let ukuranpanjang_tableHit = document.getElementById("ukuranpanjang_tableHit");
    let ukuranlebar_tableHit = document.getElementById("ukuranlebar_tableHit");
    let warnaTinta = document.getElementById("warnaTinta");
    let beratTintaAwal = document.getElementById("beratTintaAwal");
    let beratTintaAkhir = document.getElementById("beratTintaAkhir");
    let beratPemakaianTinta = document.getElementById("beratPemakaianTinta");
    let jumlahKain = document.getElementById("jumlahKain");
    let hasilPrinting = document.getElementById("hasilPrinting");
    let beratKain = document.getElementById("beratKain");
    let afalanPrinting = document.getElementById("afalanPrinting");
    let pemakaianReduser = document.getElementById("pemakaianReduser");
    let pembersihan = document.getElementById("pembersihan");
    let buangAfalanTintaPail = document.getElementById("buangAfalanTintaPail");
    let buangAfalanTintaKG = document.getElementById("buangAfalanTintaKG");
    let keterangan_kegiatan = document.getElementById("keterangan_kegiatan");
    let button_modalProsesPrinting = document.getElementById("button_modalProsesPrinting");
    let closeTambahKegiatanMesinPrintingModal = document.getElementById("closeTambahKegiatanMesinPrintingModal");
    let btn_timbangBeratKain = document.getElementById("btn_timbangBeratKain");
    let btn_timbangAfalanPrinting = document.getElementById("btn_timbangAfalanPrinting");
    let total_beratTintaAwal = document.getElementById("total_beratTintaAwal");
    let total_beratTintaAkhir = document.getElementById("total_beratTintaAkhir");
    let total_beratPemakaianTinta = document.getElementById("total_beratPemakaianTinta");
    let total_jumlahKain = document.getElementById("total_jumlahKain");
    let total_hasilPrinting = document.getElementById("total_hasilPrinting");
    let total_beratKain = document.getElementById("total_beratKain");
    let total_afalanPrinting = document.getElementById("total_afalanPrinting");
    let persen1 = document.getElementById("persen1");
    let persen2 = document.getElementById("persen2");
    let persen3 = document.getElementById("persen3");
    let btn_add = document.getElementById("btn_add");
    let btn_update = document.getElementById("btn_update");
    let btn_delete = document.getElementById("btn_delete");
    // let tgl_awal = document.getElementById("tgl_awal");
    // let tgl_akhir = document.getElementById("tgl_akhir");
    let table_detail = $("#table_detail").DataTable({
        paging: false,
        scrollY: "500px",
        scrollX: true,
        scrollCollapse: true,
        autoWidth: false,
        responsive: false,
        ordering: false,
        searching: false,
        info: false,
        columnDefs: [
            {
                targets: "_all",
                className: "text-nowrap",
            },
        ],
        columnDefs: [{ targets: [0, 3], visible: false }],
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

    const customer_tableHit = $("#customer_tableHit");
    const kodebarang_tableHit = $("#kodebarang_tableHit");
    const komponen_tableHit = $("#komponen_tableHit");
    const slcLokasi = document.getElementById("lokasi");

    let idLog = null
    let kodebarang_tableHitEdit = null
    let komponen_tableHitEdit = null
    let jenisPotongan = null
    let isCustomKomponen = false;

    tanggalLog.valueAsDate = new Date();
    // tgl_awal.valueAsDate = new Date();
    // tgl_akhir.valueAsDate = new Date();
    initModal();
    initializeSelect2();

    //#region DataTable Data Log

    let userAction = [
        "4405",
        "4221",
        "4259",
        "8982",
        "4451",
        "4199"
    ];

    // table_logMesin = $("#table_logMesin").DataTable({
    //     responsive: false,
    //     processing: true,
    //     serverSide: true,
    //     destroy: true,
    //     autoWidth: false,
    //     paging: false,
    //     // scrollX: true,
    //     scrollX: "500px",
    //     scrollY: "500px", // Mengatur tinggi tabel
    //     scrollCollapse: true,

    //     ajax: {
    //         url: "MaintKegiatanMesinPrintingJBB/getData",
    //         dataType: "json",
    //         type: "GET",
    //         data: function (d) {
    //             return $.extend({}, d, {
    //                 _token: csrfToken,
    //                 lokasi: $("#" + slcLokasi.id).val(),
    //             });
    //         },
    //     },

    //     columns: [
    //         { data: "idLog" },
    //         {
    //             data: "tanggalLog_raw",
    //             render: function (data, type, row) {
    //                 if (type === "display") {
    //                     return row.tanggalLog;
    //                 }
    //                 return data;
    //             },
    //         },
    //         { data: "noMesin" },
    //         { data: "shiftPrinting" },
    //         { data: "kodeBarang", width: "250px" },
    //         { data: "warnaTinta", width: "150px" },
    //         {
    //             data: "total_beratTintaAwal",
    //             render: function (data) {
    //                 return numeral(data || 0).format("0.00");
    //             }
    //         },
    //         {
    //             data: "total_beratTintaAkhir",
    //             render: function (data) {
    //                 return numeral(data || 0).format("0.00");
    //             }
    //         },
    //         {
    //             data: "total_beratPemakaianTinta",
    //             render: function (data) {
    //                 return numeral(data || 0).format("0.00");
    //             }
    //         },
    //         {
    //             data: "total_jumlahKain",
    //             render: function (data) {
    //                 return numeral(data || 0).format("0.00");
    //             }
    //         },
    //         {
    //             data: "total_hasilPrinting",
    //             render: function (data) {
    //                 return numeral(data || 0).format("0.00");
    //             }
    //         },
    //         {
    //             data: "total_beratKain",
    //             render: function (data) {
    //                 return numeral(data || 0).format("0.00");
    //             }
    //         },
    //         {
    //             data: "total_afalanPrinting",
    //             render: function (data) {
    //                 return numeral(data || 0).format("0.00");
    //             }
    //         },
    //         { data: "NomorUser" },
    //         {
    //             data: null,
    //             orderable: false,
    //             searchable: false,
    //             render: function (data, type, row) {
    //                 return `
    //                 <button class="btn btn-sm btn-warning btn-edit"
    //                     style="width:150px"
    //                     data-id="${row.idLog}">
    //                     <i class="fa fa-edit"></i> Edit
    //                 </button>
    //                 <button class="btn btn-sm btn-danger btn-delete"
    //                     style="width:150px"
    //                     data-id="${row.idLog}">
    //                     <i class="fa fa-trash"></i> Delete
    //                 </button>
    //             `;
    //             },
    //         },
    //     ],

    //     columnDefs: [
    //         {
    //             targets: 4,
    //             width: "150px"
    //         },
    //         {
    //             targets: 5,
    //             width: "250px"
    //         }
    //     ],

    //     createdRow: function (row) {
    //         $(row).find("td").css({
    //             "font-family": "Arial",
    //             "font-size": "14px",
    //             "text-align": "center",
    //             "vertical-align": "middle"
    //         });
    //     },

    //     order: [[0, "desc"]],
    // });

    $("#table_logMesin").on("click", ".btn-edit", function () {
        const id = $(this).data("id");
        idLog = id;
        // Ambil data baris yang dipilih
        const table = $("#table_logMesin").DataTable();
        const rowData = table.row($(this).closest("tr")).data();

        // Bandingkan user login dengan user pemilik data
        if (
            !userAction.includes(String(nomorUser).trim()) &&
            String(nomorUser).trim() !== String(rowData.NomorUser).trim()
        ) {
            Swal.fire({
                icon: "warning",
                title: "Akses Ditolak!",
                text: "Anda tidak memiliki hak untuk mengedit data milik user lain!",
                confirmButtonText: "OK",
            });

            return;
        }

        // Kosongkan data lama SEBELUM menjalankan AJAX
        clearAll();

        $("#tambahKegiatanMesinPrintingModal").modal("show");
        tambahKegiatanMesinPrintingLabel.innerHTML =
            "Edit Kegiatan Mesin Printing JBB";

        // AJAX header
        $.ajax({
            url: "MaintKegiatanMesinPrintingJBB/getDataEdit",
            type: "GET",
            data: {
                idLog: id,
            },
            success: function (data) {
                console.log("Data header:", data);

                if (!data || !data[0]) {
                    console.error("Data header tidak ditemukan.");
                    return;
                }

                shiftPrinting.value = data[0].shiftPrinting;
                pemakaianReduser.value = numeral(data[0].pemakaianReduser).format('0.00');
                pembersihan.value = numeral(data[0].pembersihan).format('0.00');
                buangAfalanTintaPail.value = numeral(data[0].buangAfalanTintaPail).format('0.00');
                buangAfalanTintaKG.value = numeral(data[0].buangAfalanTintaKG).format('0.00');

                total_beratTintaAwal.value = numeral(data[0].total_beratTintaAwal).format('0.00');
                total_beratTintaAkhir.value = numeral(data[0].total_beratTintaAkhir).format('0.00');
                total_beratPemakaianTinta.value = numeral(data[0].total_beratPemakaianTinta).format('0.00');
                total_jumlahKain.value = numeral(data[0].total_jumlahKain).format('0.00');
                total_hasilPrinting.value = numeral(data[0].total_hasilPrinting).format('0.00');
                total_beratKain.value = numeral(data[0].total_beratKain).format('0.00');
                total_afalanPrinting.value = numeral(data[0].total_afalanPrinting).format('0.00');

                persen1.value = numeral(data[0].persen1).format('0.00');
                persen2.value = numeral(data[0].persen2).format('0.00');
                persen3.value = numeral(data[0].persen3).format('0.00');
            },
            error: function (xhr) {
                console.error("Gagal mengambil header:", xhr.responseText);
            },
        });

        // AJAX detail
        $.ajax({
            url: "MaintKegiatanMesinPrintingJBB/getDataEditDetail",
            type: "GET",
            data: {
                idLog: id,
            },
            success: function (response) {
                console.log("Data detail:", response);

                const table = $("#table_detail").DataTable();

                // Bersihkan data detail sebelumnya
                table.clear();
                tableData.length = 0;

                if (!response || !Array.isArray(response.data)) {
                    console.error("Format response detail tidak sesuai:", response);
                    table.draw();
                    updateTotal();
                    return;
                }

                response.data.forEach(function (row) {
                    const newRow = {
                        id_detail: row.idDetail,
                        customer: row.customer,
                        kodeBarang: row.kodeBarang,
                        komponen: row.komponen,
                        jenisPotongan: row.jenisPotongan,
                        ukuranPanjang: row.ukuranPanjang,
                        ukuranLebar: row.ukuranLebar,
                        warnaTinta: row.warnaTinta,
                        beratTintaAwal: numeral(row.beratTintaAwal).format('0.00'),
                        beratTintaAkhir: numeral(row.beratTintaAkhir).format('0.00'),
                        beratPemakaianTinta: numeral(row.beratPemakaianTinta).format('0.00'),
                        jumlahKain: numeral(row.jumlahKain).format('0.00'),
                        hasilPrinting: numeral(row.hasilPrinting).format('0.00'),
                        beratKain: numeral(row.beratKain).format('0.00'),
                        afalanPrinting: numeral(row.afalanPrinting).format('0.00'),
                        keterangan_kegiatan: row.keterangan,
                    };

                    tableData.push(newRow);

                    table.row.add([
                        newRow.id_detail,
                        newRow.customer,
                        newRow.kodeBarang,
                        newRow.komponen,
                        newRow.jenisPotongan,
                        newRow.ukuranPanjang,
                        newRow.ukuranLebar,
                        newRow.warnaTinta,
                        newRow.beratTintaAwal,
                        newRow.beratTintaAkhir,
                        newRow.beratPemakaianTinta,
                        newRow.jumlahKain,
                        newRow.hasilPrinting,
                        newRow.beratKain,
                        newRow.afalanPrinting,
                        newRow.keterangan_kegiatan,
                    ]);
                });

                table.draw();
                updateTotal();

                console.log("Jumlah detail:", tableData.length);
            },
            error: function (xhr) {
                console.error("Gagal mengambil detail:", xhr.responseText);
            },
        });
    });

    $('#table_logMesin').on('click', '.btn-delete', function () {
        const id = $(this).data('id');
        console.log(id);

        // Ambil data baris yang dipilih
        const table = $("#table_logMesin").DataTable();
        const rowData = table.row($(this).closest("tr")).data();

        console.log(nomorUser);

        // Bandingkan user login dengan user pemilik data
        if (
            !userAction.includes(String(nomorUser).trim()) &&
            String(nomorUser).trim() !== String(rowData.NomorUser).trim()
        ) {
            Swal.fire({
                icon: "warning",
                title: "Akses Ditolak!",
                text: "Anda tidak memiliki hak untuk menghapus data milik user lain!",
                confirmButtonText: "OK",
            });

            return;
        }

        // idLog = id;
        Swal.fire({
            title: 'Apakah anda yakin ingin menghapus data?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "MaintKegiatanMesinPrintingJBB",
                    dataType: "json",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 3,
                        idLog: id,
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
                                $("#table_logMesin").DataTable().ajax.reload();
                                // console.log(result);
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
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    });

    $('#table_bawah').on('click', '.btn-hapus', function () {
        const id = $(this).data('id');
        console.log(id);
        // idDetail = id;
        Swal.fire({
            title: 'Apakah anda yakin ingin menghapus data?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "MaintenanceSM",
                    dataType: "json",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 6,
                        id_setting: id,
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
                                $("#table_bawah").DataTable().ajax.reload();
                                console.log(result);
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

            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    });

    //#region Datatable Detail

    let selectedRow = null;
    $("#table_detail tbody").on("click", "tr", function () {
        if (!table_detail.row(this).data()) {
            return;
        }

        // Hapus highlight sebelumnya
        $("#table_detail tbody tr").removeClass("selected");

        // Tambah highlight ke row ini
        $(this).addClass("selected");

        // Simpan reference row DataTable
        selectedRow = this;

        // Ambil data (opsional)
        let data = table_detail.row(this).data();
        console.log(data);

        if (data[3] == null || data[3] === "") {

            customer_tableHit
                .val(data[1]?.trim())
                .trigger("change");

            const kodeBarang = data[2]?.trim();
            const jenis = data[4]?.trim();

            kodebarang_tableHitEdit = kodeBarang;

            isCustomKomponen = true;

            komponen_tableHitEdit = null;
            jenisPotongan = jenis;

            // Tambahkan kode barang ke Select2
            kodebarang_tableHit.append(
                new Option(
                    kodeBarang,
                    kodeBarang,
                    true,
                    true
                )
            );

            kodebarang_tableHit
                .val(kodeBarang)
                .trigger("change")
                .trigger("select2:select");

        } else {

            customer_tableHit
                .val(data[1]?.trim())
                .trigger("change");

            const kodeBarang = data[2]?.trim();

            kodebarang_tableHitEdit = kodeBarang;

            komponen_tableHitEdit = data[3]?.trim();

            jenisPotongan = data[4]?.trim();

            isCustomKomponen = false;

            // Tambahkan kode barang ke Select2
            kodebarang_tableHit.append(
                new Option(
                    kodeBarang,
                    kodeBarang,
                    true,
                    true
                )
            );

            kodebarang_tableHit
                .val(kodeBarang)
                .trigger("change")
                .trigger("select2:select");
        }
        ukuranpanjang_tableHit.value = data[5];
        ukuranlebar_tableHit.value = data[6];
        warnaTinta.value = data[7];
        beratTintaAwal.value = data[8];
        beratTintaAkhir.value = data[9];
        beratTintaAkhir.dispatchEvent(new Event("input"));
        // beratPemakaianTinta.value = data[10];
        jumlahKain.value = data[11];
        hasilPrinting.value = data[12];
        beratKain.value = data[13];
        afalanPrinting.value = data[14];
        keterangan_kegiatan.value = data[15];
    });

    let tableData = [];

    btn_add.addEventListener("click", async function (event) {
        event.preventDefault();

        // if (customer_tableHit.val() === null || kodebarang_tableHit.val() === null || jenisPotongan == null) {
        //     Swal.fire({
        //         icon: "info",
        //         title: "Info!",
        //         text: "Isi terlebih dahulu datanya!",
        //         showConfirmButton: true,
        //         // timer: 2000
        //     });
        //     btn_proses.disabled = false;
        //     return;
        // }

        if (jenisPotongan == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Isi terlebih dahulu datanya!",
                showConfirmButton: true,
                // timer: 2000
            });
            btn_proses.disabled = false;
            return;
        }

        const table = $("#table_detail").DataTable();
        const data = selectedRow ? table.row(selectedRow).data() : undefined;

        let newRow;

        if (!data) {
            // Tambah baru atau komponen kosong
            newRow = {
                id_detail: "",
                customer: customer_tableHit.val(),
                kodeBarang: kodebarang_tableHit.val(),
                komponen: komponen_tableHit.val(),
                jenisPotongan: jenisPotongan,
                ukuranPanjang: ukuranpanjang_tableHit.value,
                ukuranLebar: ukuranlebar_tableHit.value,
                warnaTinta: warnaTinta.value,
                beratTintaAwal: beratTintaAwal.value,
                beratTintaAkhir: beratTintaAkhir.value,
                beratPemakaianTinta: beratPemakaianTinta.value,
                jumlahKain: jumlahKain.value,
                hasilPrinting: hasilPrinting.value,
                beratKain: beratKain.value,
                afalanPrinting: afalanPrinting.value,
                keterangan_kegiatan: keterangan_kegiatan.value,
            };
        } else if (data[3] == null || data[3] === "") {
            newRow = {
                id_detail: "",
                customer: customer_tableHit.val(),
                kodeBarang: kodebarang_tableHit.val(),
                komponen: "",
                jenisPotongan: jenisPotongan,
                ukuranPanjang: ukuranpanjang_tableHit.value,
                ukuranLebar: ukuranlebar_tableHit.value,
                warnaTinta: warnaTinta.value,
                beratTintaAwal: beratTintaAwal.value,
                beratTintaAkhir: beratTintaAkhir.value,
                beratPemakaianTinta: beratPemakaianTinta.value,
                jumlahKain: jumlahKain.value,
                hasilPrinting: hasilPrinting.value,
                beratKain: beratKain.value,
                afalanPrinting: afalanPrinting.value,
                keterangan_kegiatan: keterangan_kegiatan.value,
            };
        }
        else {
            // Edit dengan komponen yang sudah tersedia
            newRow = {
                id_detail: "",
                customer: customer_tableHit.val(),
                kodeBarang: kodebarang_tableHit.val(),
                komponen: komponen_tableHit.val(),
                jenisPotongan: jenisPotongan,
                ukuranPanjang: ukuranpanjang_tableHit.value,
                ukuranLebar: ukuranlebar_tableHit.value,
                warnaTinta: warnaTinta.value,
                beratTintaAwal: beratTintaAwal.value,
                beratTintaAkhir: beratTintaAkhir.value,
                beratPemakaianTinta: beratPemakaianTinta.value,
                jumlahKain: jumlahKain.value,
                hasilPrinting: hasilPrinting.value,
                beratKain: beratKain.value,
                afalanPrinting: afalanPrinting.value,
                keterangan_kegiatan: keterangan_kegiatan.value,
            };
        }

        tableData.push(newRow);
        updateTotal();

        if ($.fn.DataTable.isDataTable("#table_detail")) {
            const table_detail = $("#table_detail").DataTable();

            table_detail.row
                .add([
                    newRow.id_detail,
                    newRow.customer,
                    newRow.kodeBarang,
                    newRow.komponen,
                    newRow.jenisPotongan,
                    newRow.ukuranPanjang,
                    newRow.ukuranLebar,
                    newRow.warnaTinta,
                    newRow.beratTintaAwal,
                    newRow.beratTintaAkhir,
                    newRow.beratPemakaianTinta,
                    newRow.jumlahKain,
                    newRow.hasilPrinting,
                    newRow.beratKain,
                    newRow.afalanPrinting,
                    newRow.keterangan_kegiatan,
                ])
                .draw();
        }
    });

    btn_update.addEventListener("click", function (event) {
        event.preventDefault();

        if (!selectedRow) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang ingin diupdate terlebih dahulu!",
            });
            return;
        }

        const row = table_detail.row(selectedRow);
        const oldData = row.data();
        const rowIndex = row.index();

        const isNew =
            tambahKegiatanMesinPrintingLabel.innerHTML ===
            "Tambah Kegiatan Mesin Printing JBB";

        const updatedRow = [
            isNew ? "" : oldData[0],
            customer_tableHit.val(),
            kodebarang_tableHit.val(),
            komponen_tableHit.val(),
            jenisPotongan,
            ukuranpanjang_tableHit.value,
            ukuranlebar_tableHit.value,
            warnaTinta.value,
            beratTintaAwal.value,
            beratTintaAkhir.value,
            beratPemakaianTinta.value,
            jumlahKain.value,
            hasilPrinting.value,
            beratKain.value,
            afalanPrinting.value,
            keterangan_kegiatan.value,
        ];

        // Update row pada DataTables
        row.data(updatedRow).draw(false);

        // Update data pada tableData
        const updatedObject = {
            id_detail: updatedRow[0],
            customer: updatedRow[1],
            kodeBarang: updatedRow[2],
            komponen: updatedRow[3],
            jenisPotongan: updatedRow[4],
            ukuranPanjang: updatedRow[5],
            ukuranLebar: updatedRow[6],
            warnaTinta: updatedRow[7],
            beratTintaAwal: updatedRow[8],
            beratTintaAkhir: updatedRow[9],
            beratPemakaianTinta: updatedRow[10],
            jumlahKain: updatedRow[11],
            hasilPrinting: updatedRow[12],
            beratKain: updatedRow[13],
            afalanPrinting: updatedRow[14],
            keterangan_kegiatan: updatedRow[15],
        };

        if (isNew && rowIndex >= 0 && rowIndex < tableData.length) {
            tableData[rowIndex] = updatedObject;
        } else if (!isNew) {
            const index = tableData.findIndex(
                (item) => String(item.id_detail) === String(oldData[0])
            );

            if (index !== -1) {
                tableData[index] = updatedObject;
            }
        }

        // Hitung ulang total seluruh row
        updateTotal();

        // Reset selection
        $(selectedRow).removeClass("selected");
        selectedRow = null;
    });

    btn_delete.addEventListener("click", function (event) {
        event.preventDefault();

        if (!selectedRow) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang ingin dihapus terlebih dahulu!",
            });
            return;
        }

        const row = table_detail.row(selectedRow);
        const oldData = row.data();
        const idDetail = oldData[0];

        // Cek apakah ID detail belum tersedia
        const isNew =
            idDetail === null ||
            idDetail === undefined ||
            String(idDetail).trim() === "";

        function hapusRow() {
            // Hapus dari DataTables
            row.remove().draw(false);

            // Hapus dari tableData berdasarkan ID atau data row
            if (isNew) {
                const index = tableData.findIndex((item) => {
                    return (
                        String(item.customer ?? "") === String(oldData[1] ?? "") &&
                        String(item.kodeBarang ?? "") === String(oldData[2] ?? "") &&
                        String(item.warnaTinta ?? "") === String(oldData[7] ?? "") &&
                        String(item.beratTintaAwal ?? "") === String(oldData[8] ?? "") &&
                        String(item.beratTintaAkhir ?? "") === String(oldData[9] ?? "")
                    );
                });

                if (index !== -1) {
                    tableData.splice(index, 1);
                }
            } else {
                const index = tableData.findIndex(
                    (item) => String(item.id_detail) === String(idDetail)
                );

                if (index !== -1) {
                    tableData.splice(index, 1);
                }
            }

            // Hitung ulang total
            updateTotal();

            // Reset selection
            selectedRow = null;
        }

        // Jika tidak memiliki ID detail, hapus langsung tanpa AJAX
        if (isNew) {
            hapusRow();
            return;
        }

        // Jika memiliki ID detail, hapus dari database
        Swal.fire({
            title: "Apakah anda yakin ingin menghapus data detail?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "MaintKegiatanMesinPrintingJBB",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 4,
                        idDetail: idDetail,
                    },
                    success: function (response) {
                        if (response.message) {
                            Swal.fire({
                                icon: "success",
                                title: "Success!",
                                text: response.message,
                                showConfirmButton: true,
                            }).then(() => {
                                hapusRow();
                            });
                        } else if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: response.error,
                                showConfirmButton: true,
                            });

                            btn_proses.disabled = false;
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                        console.error(xhr.responseText);

                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: "Terjadi kesalahan saat menghapus data.",
                        });

                        btn_proses.disabled = false;
                    },
                });
            }
        });
    });

    //#region Functions

    function clearAll() {
        tanggalLog.valueAsDate = new Date();
        shiftPrinting.value = "";
        customer_tableHit.val(null).trigger("change");
        kodebarang_tableHit.empty();
        kodebarang_tableHit.val(null).trigger("change");
        komponen_tableHit.empty();
        komponen_tableHit.val(null).trigger("change");
        jenisPotongan = null;
        ukuranpanjang_tableHit.value = "";
        ukuranlebar_tableHit.value = "";
        warnaTinta.value = "";
        beratTintaAwal.value = "";
        beratTintaAkhir.value = "";
        beratPemakaianTinta.value = "";
        jumlahKain.value = "";
        hasilPrinting.value = "";
        beratKain.value = "";
        afalanPrinting.value = "";
        pemakaianReduser.value = "";
        pembersihan.value = "";
        buangAfalanTintaPail.value = "";
        buangAfalanTintaKG.value = "";
        keterangan_kegiatan.value = "";

        tableData = [];
        if ($.fn.DataTable.isDataTable("#table_detail")) {
            table_detail.clear().draw();
        }
        updateTotal();
        selectedRow = null;
    }

    function updateTotal() {
        const total = {
            beratTintaAwal: 0,
            beratTintaAkhir: 0,
            beratPemakaianTinta: 0,
            jumlahKain: 0,
            hasilPrinting: 0,
            beratKain: 0,
            afalanPrinting: 0,
        };

        tableData.forEach((row) => {
            total.beratTintaAwal += parseFloat(row.beratTintaAwal) || 0;
            total.beratTintaAkhir += parseFloat(row.beratTintaAkhir) || 0;
            total.beratPemakaianTinta += parseFloat(row.beratPemakaianTinta) || 0;
            total.jumlahKain += parseFloat(row.jumlahKain) || 0;
            total.hasilPrinting += parseFloat(row.hasilPrinting) || 0;
            total.beratKain += parseFloat(row.beratKain) || 0;
            total.afalanPrinting += parseFloat(row.afalanPrinting) || 0;
        });

        total_beratTintaAwal.value = total.beratTintaAwal.toFixed(2);
        total_beratTintaAkhir.value = total.beratTintaAkhir.toFixed(2);
        total_beratPemakaianTinta.value = total.beratPemakaianTinta.toFixed(2);
        total_jumlahKain.value = total.jumlahKain.toFixed(2);
        total_hasilPrinting.value = total.hasilPrinting.toFixed(2);
        total_beratKain.value = total.beratKain.toFixed(2);
        total_afalanPrinting.value = total.afalanPrinting.toFixed(2);

        persen1.value = total.beratTintaAwal > 0 ? ((total.beratTintaAkhir / total.beratTintaAwal) * 100).toFixed(2) : 0;
        persen2.value = total.jumlahKain > 0 ? ((total.hasilPrinting / total.jumlahKain) * 100).toFixed(2) : 0;
        persen3.value = total.beratKain > 0 ? ((total.afalanPrinting / total.beratKain) * 100).toFixed(2) : 0;
    }

    function initModal() {
        // setTimeout(() => {
        //     tanggalLog.focus();
        // }, 200);
        $.ajax({
            url: "/MaintKegiatanMesinPrintingJBB/initModalTambahKegiatanMesinPotong",
            method: "GET",
            data: { idTypeMesin: 1 }, // id type mesin 1 = potong
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text: "fetching data machine failed ",
                        returnFocus: false,
                    });
                } else {
                    // namaMesinPotong.empty();
                    // data.dataMesin.forEach(function (item) {
                    //     namaMesinPotong.append(
                    //         new Option(item.Nama_Mesin, item.Id_Mesin), // prettier-ignore
                    //     );
                    // });
                    // namaMesinPotong.val(null).trigger("change");
                    data.dataCustomer.forEach(function (item) {
                        customer_tableHit.append(
                            new Option(item.Nama_Customer + " | " + item.Kode_Customer, item.Kode_Customer), // prettier-ignore
                        );
                    });
                    customer_tableHit.val(null).trigger("change");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Mesin.",
                });
            },
        });
    }

    function initializeSelect2() {
        customer_tableHit.select2({
            dropdownParent: $("#div_parentSelectCustomerTableHit"),
            placeholder: "Pilih Customer",
        });

        kodebarang_tableHit.select2({
            dropdownParent: $("#div_parentSelectKodeBarangTableHit"),
            placeholder: "Pilih KB Tabel Hit.",
        });

        komponen_tableHit.select2({
            dropdownParent: $("#div_parentSelectKomponenTableHit"),
            placeholder: "Pilih Komponen",
        });

        $("#customer_tableHit").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#kodebarang_tableHit").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#komponen_tableHit").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
    }

    //#region Enter
    beratTintaAwal.addEventListener("input", function () {
        let awal = parseFloat(beratTintaAwal.value) || 0;
        let akhir = parseFloat(beratTintaAkhir.value) || 0;

        beratPemakaianTinta.value = (awal - akhir).toFixed(2);
    });

    beratTintaAkhir.addEventListener("input", function () {
        let awal = parseFloat(beratTintaAwal.value) || 0;
        let akhir = parseFloat(beratTintaAkhir.value) || 0;

        beratPemakaianTinta.value = (awal - akhir).toFixed(2);
    });

    tanggalLog.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            shiftPrinting.select();
        }
    });

    shiftPrinting.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = this.value.toUpperCase();
            customer_tableHit.select2("open");
        }
    });

    shiftPrinting.addEventListener("input", function (e) {
        this.value = this.value.toUpperCase();

        if (this.value !== "" && !["P", "S", "M"].includes(this.value)) {
            Swal.fire({
                icon: "warning",
                title: "Input Tidak Valid",
                text: "Shift hanya boleh diisi P, S, atau M.",
                confirmButtonText: "OK"
            });

            this.value = "";
        }
    });

    shiftPrinting.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();

            this.value = this.value.toUpperCase();

            customer_tableHit.select2("open");
        }
    });

    warnaTinta.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            beratTintaAwal.select();
        }
    });

    beratTintaAwal.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            beratTintaAkhir.select();
        }
    });

    beratTintaAkhir.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            jumlahKain.select();
        }
    });

    jumlahKain.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasilPrinting.select();
        }
    });

    hasilPrinting.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            beratKain.select();
        }
    });

    beratKain.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            afalanPrinting.select();
        }
    });

    afalanPrinting.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            keterangan_kegiatan.select();
        }
    });

    keterangan_kegiatan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            pemakaianReduser.select();
        }
    });

    pemakaianReduser.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            pembersihan.select();
        }
    });

    pembersihan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            buangAfalanTintaPail.select();
        }
    });

    buangAfalanTintaPail.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            buangAfalanTintaKG.select();
        }
    });

    buangAfalanTintaKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            button_modalProsesPrinting.focus();
        }
    });

    // #region Select 2

    $("#" + slcLokasi.id).select2({
        placeholder: "-- Pilih Lokasi --"
    });

    $("#" + slcLokasi.id).on("change", function () {
        const val = $(this).val();
        let allowedType = [];
        switch (val) {
            case "Tropodo":
                // Lokasi 1 boleh semua
                // $("#divTropGedB").show();
                // $("#divGedD").hide();
                // btn_redisplay.click();
                // allowedType = ["1", "2"];
                // btn_batal.click();
                // $("#labelProses").text("Input Data");
                // $("#btn_proses").text("PROSES");
                table_logMesin = $("#table_logMesin").DataTable({
                    responsive: false,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    autoWidth: false,
                    paging: false,
                    // scrollX: true,
                    scrollX: "500px",
                    scrollY: "500px", // Mengatur tinggi tabel
                    scrollCollapse: true,

                    ajax: {
                        url: "MaintKegiatanMesinPrintingJBB/getData",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                lokasi: $("#" + slcLokasi.id).val(),
                            });
                        },
                    },

                    columns: [
                        { data: "idLog" },
                        {
                            data: "tanggalLog_raw",
                            render: function (data, type, row) {
                                if (type === "display") {
                                    return row.tanggalLog;
                                }
                                return data;
                            },
                        },
                        { data: "noMesin" },
                        { data: "shiftPrinting" },
                        { data: "kodeBarang", width: "250px" },
                        { data: "warnaTinta", width: "150px" },
                        {
                            data: "total_beratTintaAwal",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        {
                            data: "total_beratTintaAkhir",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        {
                            data: "total_beratPemakaianTinta",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        {
                            data: "total_jumlahKain",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        {
                            data: "total_hasilPrinting",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        {
                            data: "total_beratKain",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        {
                            data: "total_afalanPrinting",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        { data: "NomorUser" },
                        {
                            data: null,
                            orderable: false,
                            searchable: false,
                            render: function (data, type, row) {
                                return `
                                <div class="d-flex align-items-center gap-1">
                                    <button class="btn btn-sm btn-warning btn-edit"
                                        style="width:150px; white-space:nowrap;"
                                        data-id="${row.idLog}">
                                        <i class="fa fa-edit"></i> Edit
                                    </button>
                                                
                                    <button class="btn btn-sm btn-danger btn-delete"
                                        style="width:150px; white-space:nowrap;"
                                        data-id="${row.idLog}">
                                        <i class="fa fa-trash"></i> Delete
                                    </button>
                                </div>
                            `;
                            },
                        },
                    ],

                    columnDefs: [
                        {
                            targets: 4,
                            width: "150px"
                        },
                        {
                            targets: 5,
                            width: "250px"
                        }
                    ],

                    createdRow: function (row) {
                        $(row).find("td").css({
                            "font-family": "Arial",
                            "font-size": "14px",
                            "text-align": "center",
                            "vertical-align": "middle"
                        });
                    },

                    order: [[0, "desc"]],
                });
                break;

            case "Mojosari":
                // Lokasi 2 hanya type tertentu
                // $("#divTropGedB").show();
                // $("#divGedD").hide();
                // btn_redisplay.click();
                // allowedType = ["3"];
                // btn_batal.click();
                // $("#labelProses").text("Input Data");
                // $("#btn_proses").text("PROSES");
                table_logMesin = $("#table_logMesin").DataTable({
                    responsive: false,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    autoWidth: false,
                    paging: false,
                    // scrollX: true,
                    scrollX: "500px",
                    scrollY: "500px", // Mengatur tinggi tabel
                    scrollCollapse: true,

                    ajax: {
                        url: "MaintKegiatanMesinPrintingJBB/getData",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                lokasi: $("#" + slcLokasi.id).val(),
                            });
                        },
                    },

                    columns: [
                        { data: "idLog" },
                        {
                            data: "tanggalLog_raw",
                            render: function (data, type, row) {
                                if (type === "display") {
                                    return row.tanggalLog;
                                }
                                return data;
                            },
                        },
                        { data: "noMesin" },
                        { data: "shiftPrinting" },
                        { data: "kodeBarang", width: "250px" },
                        { data: "warnaTinta", width: "150px" },
                        {
                            data: "total_beratTintaAwal",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        {
                            data: "total_beratTintaAkhir",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        {
                            data: "total_beratPemakaianTinta",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        {
                            data: "total_jumlahKain",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        {
                            data: "total_hasilPrinting",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        {
                            data: "total_beratKain",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        {
                            data: "total_afalanPrinting",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        { data: "NomorUser" },
                        {
                            data: null,
                            orderable: false,
                            searchable: false,
                            render: function (data, type, row) {
                                return `
                                <div class="d-flex align-items-center gap-1">
                                    <button class="btn btn-sm btn-warning btn-edit"
                                        style="width:150px; white-space:nowrap;"
                                        data-id="${row.idLog}">
                                        <i class="fa fa-edit"></i> Edit
                                    </button>

                                    <button class="btn btn-sm btn-danger btn-delete"
                                        style="width:150px; white-space:nowrap;"
                                        data-id="${row.idLog}">
                                        <i class="fa fa-trash"></i> Delete
                                    </button>
                                </div>
                            `;
                            },
                        },
                    ],

                    columnDefs: [
                        {
                            targets: 4,
                            width: "150px"
                        },
                        {
                            targets: 5,
                            width: "250px"
                        }
                    ],

                    createdRow: function (row) {
                        $(row).find("td").css({
                            "font-family": "Arial",
                            "font-size": "14px",
                            "text-align": "center",
                            "vertical-align": "middle"
                        });
                    },

                    order: [[0, "desc"]],
                });
                break;
        }
    });

    // default lokasi = 1
    $("#" + slcLokasi.id).val("Tropodo").trigger("change");

    customer_tableHit.on("select2:select", function () {
        const selectedCustomer = $(this).val(); // Get selected Customer
        $.ajax({
            url: "/MaintKegiatanMesinPrintingJBB/getTabelHitunganByCustomer",
            method: "GET",
            data: {
                kodeCustomer: selectedCustomer,
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                kodebarang_tableHit.empty();
                komponen_tableHit.empty();
                data.forEach(function (item) {
                    kodebarang_tableHit.append(
                        new Option(item.Kode_Barang, item.Kode_Barang), // prettier-ignore
                    );
                });
                kodebarang_tableHit.val(null).trigger("change");
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kode Barang Tabel Hitungan.",
                });
            },
        }).then(() => {
            if (tambahKegiatanMesinPrintingLabel.innerHTML !== "Edit Kegiatan Mesin Printing JBB") {
                kodebarang_tableHit.select2("open");
            } else {
                kodebarang_tableHit.select2("open");
                // kodebarang_tableHit
                //     .val(kodebarang_tableHitEdit)
                //     .trigger("change")
                //     .trigger("select2:select");
            }
        });
    });

    kodebarang_tableHit.on("select2:select", function () {

        const selectedKodeBarang = $(this).val();

        $.ajax({
            url: "/MaintKegiatanMesinPrintingJBB/getKomponenByTabelHitungan",
            method: "GET",
            data: {
                kodeBarang: selectedKodeBarang,
            },
            dataType: "json",

            success: function (data) {

                komponen_tableHit.empty();

                data.forEach(function (item) {

                    komponen_tableHit.append(
                        new Option(
                            item.Nama_Komponen +
                            " Uk. " +
                            numeral(item.Panjang_Potongan).value() +
                            " X " +
                            numeral(item.Lebar_Potongan).value(),
                            item.Kode_Komponen
                        )
                    );

                });

                // ==============================
                // CUSTOM KOMPONEN
                // ==============================
                if (isCustomKomponen && jenisPotongan) {

                    const option = new Option(
                        jenisPotongan,
                        jenisPotongan,
                        true,
                        true
                    );

                    komponen_tableHit.append(option);

                    komponen_tableHit
                        .val(jenisPotongan)
                        .trigger("change");

                }

                // ==============================
                // KOMPONEN NORMAL
                // ==============================
                else if (komponen_tableHitEdit) {

                    komponen_tableHit
                        .val(komponen_tableHitEdit)
                        .trigger("change");

                }

                // ==============================
                // TAMBAH BARU
                // ==============================
                else {

                    komponen_tableHit
                        .val(null)
                        .trigger("change");

                }
            },

            error: function () {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kode Barang Tabel Hitungan.",
                });

            },

        }).then(() => {
            if (selectedRow) {
                // komponen_tableHit.select2("open");
            } else {
                komponen_tableHit.select2("open");
            }
            // if (
            //     tambahKegiatanMesinPrintingLabel.innerHTML !==
            //     "Edit Kegiatan Mesin Printing JBB" && selectedRow == null
            // ) {
            //     komponen_tableHit.select2("open");
            // }

        });

    });

    komponen_tableHit.on("select2:select", function () {
        const selectedData = $(this).select2("data")[0]; // Get selected Komponen
        // let komponenId = selectedData.id;
        let komponenName = selectedData.text;
        let komponenNameParts = komponenName.split(" Uk. ");
        let komponenLength = komponenNameParts[1].split(" X ")[0];
        let komponenWidth = komponenNameParts[1].split(" X ")[1];
        jenisPotongan = komponenName;
        ukuranpanjang_tableHit.value = komponenLength;
        ukuranlebar_tableHit.value = komponenWidth;
        const event = new KeyboardEvent("keypress", { key: "Enter" });
        ukuranpanjang_tableHit.dispatchEvent(event);
        warnaTinta.focus();
    });

    komponen_tableHit.on("select2:open", function () {
        let searchField = document.querySelector(
            ".select2-container--open .select2-search__field",
        );

        $(searchField)
            .off("keydown.komponen_tableHit")
            .on("keydown.komponen_tableHit", function (e) {
                if (e.key === "Enter") {
                    let newKomponen = $(this).val().trim();
                    if (newKomponen !== "") {
                        e.preventDefault();
                        const regex =
                            /^.+\sUk\.\s\d+(?:\.\d+)?\sX\s\d+(?:\.\d+)?$/i;
                        if (!regex.test(newKomponen)) {
                            Swal.fire({
                                icon: "error",
                                title: "Format nama komponen tidak valid",
                                text: "Format harus: <Nama> Uk. <Panjang> X <Lebar>",
                            });
                            return;
                        }

                        const parts = newKomponen.split(/\s+Uk\.\s+/i);

                        if (parts.length === 2) {
                            const namaKomponen = parts[0].toUpperCase();
                            // Normalize "x" or "X" to uppercase " X "
                            // const ukuran = parts[1].replace(/\s*x\s*/i, " X ");
                            const ukuran = parts[1].replace(/\sx\s/i, " X ");

                            newKomponen = `${namaKomponen} Uk. ${ukuran}`;
                        }

                        komponen_tableHit.append(
                            new Option(newKomponen, newKomponen, true, true),
                        );
                        komponen_tableHit
                            .trigger("change")
                            .trigger("select2:select");
                        komponen_tableHit.select2("close");
                        komponen_tableHit.val(null);
                        warnaTinta.focus();
                    }
                }
            });
    });

    //#region EvenetListener

    warnaTinta.addEventListener("input", function () {
        this.value = this.value.toUpperCase();
    });

    button_tambahKegiatanMesin.addEventListener("click", function () {
        $("#button_modalProsesPotong").data("id", null);
        tambahKegiatanMesinPrintingLabel.innerHTML = "Tambah Kegiatan Mesin Printing JBB"; // prettier-ignore
        $("#tambahKegiatanMesinPrintingModal").modal("show");
        clearAll();
    });

    closeTambahKegiatanMesinPrintingModal.addEventListener("click", function () {
        $("#tambahKegiatanMesinPrintingModal").modal("hide");
    });

    $("#tambahKegiatanMesinPrintingModal").on("shown.bs.modal", function (event) {
        let idLog = $("#button_modalProsesPotong").data("id");

        table_detail.columns.adjust().draw(false);

        $("#table_detail").css({
            width: "100%",
            whiteSpace: "nowrap"
        });

        $("#table_detail_wrapper .dataTables_scrollHeadInner").css({
            width: "max-content"
        });

        $("#table_detail_wrapper .dataTables_scrollHeadInner table").css({
            width: "max-content"
        });

        $("#table_detail_wrapper .dataTables_scrollBody table").css({
            width: "max-content"
        });

        if (idLog == null) {
            // tanggalLogMesinPotong.value = moment().format("YYYY-MM-DD");
            // clearAll();
            setTimeout(() => {
                tanggalLog.focus();
            }, 200); // delay in milliseconds (adjust as needed)
            // div_alasanEditPotong.style.display = "none";
        } else {
            // alasanEdit.value = "";
            // div_alasanEditPotong.style.display = "block";
        }
    });

    button_modalProsesPrinting.addEventListener("click", async function (event) {
        event.preventDefault();
        button_modalProsesPrinting.disabled = true;
        const allRowsDataDetail = table_detail.rows().data().toArray();
        if (
            tanggalLog.value == "" || shiftPrinting.value == ""
        ) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Isi tanggal dan shift terlebih dahulu!",
                showConfirmButton: true,
                // timer: 2000
            });
            button_modalProsesPrinting.disabled = false;
            return;
        }

        $.ajax({
            url: "MaintKegiatanMesinPrintingJBB",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                // checkedRows: checkedRows,
                proses: (tambahKegiatanMesinPrintingLabel.textContent == "Edit Kegiatan Mesin Printing JBB") ? 2 : 1,
                idLog: idLog,
                tanggalLog: tanggalLog.value,
                lokasi: $("#" + slcLokasi.id).val(),
                noMesin: noMesin.value,
                shiftPrinting: shiftPrinting.value,
                customer: customer_tableHit.val(),
                kodeBarang: kodebarang_tableHit.val(),
                komponen: komponen_tableHit.val(),
                jenisPotongan: jenisPotongan,
                ukuranPanjang: ukuranpanjang_tableHit.value,
                ukuranLebar: ukuranlebar_tableHit.value,
                warnaTinta: warnaTinta.value,
                beratTintaAwal: beratTintaAwal.value,
                beratTintaAkhir: beratTintaAkhir.value,
                jumlahKain: jumlahKain.value,
                hasilPrinting: hasilPrinting.value,
                beratKain: beratKain.value,
                afalanPrinting: afalanPrinting.value,
                pemakaianReduser: pemakaianReduser.value,
                pembersihan: pembersihan.value,
                buangAfalanTintaPail: buangAfalanTintaPail.value,
                buangAfalanTintaKG: buangAfalanTintaKG.value,
                keterangan_kegiatan: keterangan_kegiatan.value,
                total_beratTintaAwal: total_beratTintaAwal.value,
                total_beratTintaAkhir: total_beratTintaAkhir.value,
                total_beratPemakaianTinta: total_beratPemakaianTinta.value,
                total_jumlahKain: total_jumlahKain.value,
                total_hasilPrinting: total_hasilPrinting.value,
                total_beratKain: total_beratKain.value,
                total_afalanPrinting: total_afalanPrinting.value,
                persen1: persen1.value,
                persen2: persen2.value,
                persen3: persen3.value,
                allRowsDataDetail: allRowsDataDetail,
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
                        $("#table_logMesin").DataTable().ajax.reload();
                        $("#tambahKegiatanMesinPrintingModal").modal("hide");
                        clearAll();
                        // id_setting = null
                        // btn_batal.click();
                        // btn_redisplay.click();
                        button_modalProsesPrinting.disabled = false;
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    button_modalProsesPrinting.disabled = false;
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                button_modalProsesPrinting.disabled = false;
            },
        });
    });

    btn_timbangBeratKain.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.86:8080/",
            method: "GET",
            dataType: "text",
            success: function (weight) {
                console.log("Data dari timbangan: ".weight);
                if (weight < 0) {
                    Swal.fire({
                        icon: "info",
                        title: "Nilai Timbangan Minus",
                        text: "Data timbangan tidak boleh bernilai negatif. Silakan periksa kembali timbangan Anda",
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    return;
                }
                weight = parseFloat(weight.replace(",", "."));
                beratKain.value = numeral(weight).value();
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "info",
                    title: "Timbangan tidak ditemukan!",
                    text: error,
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        }).then(() => {
            // hitungBeratPemakaian();
            // hitungSelisihBeratPemakaian();
            // hitungPersentaseAfalan();
            // btn_timbangAfalanWA.focus();
        });
    });

    btn_timbangAfalanPrinting.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.86:8080/",
            method: "GET",
            dataType: "text",
            success: function (weight) {
                console.log("Data dari timbangan: ".weight);
                if (weight < 0) {
                    Swal.fire({
                        icon: "info",
                        title: "Nilai Timbangan Minus",
                        text: "Data timbangan tidak boleh bernilai negatif. Silakan periksa kembali timbangan Anda",
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    return;
                }
                weight = parseFloat(weight.replace(",", "."));
                afalanPrinting.value = numeral(weight).value();
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "info",
                    title: "Timbangan tidak ditemukan!",
                    text: error,
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        }).then(() => {
            // hitungBeratPemakaian();
            // hitungSelisihBeratPemakaian();
            // hitungPersentaseAfalan();
            // btn_timbangAfalanWA.focus();
        });
    });
});