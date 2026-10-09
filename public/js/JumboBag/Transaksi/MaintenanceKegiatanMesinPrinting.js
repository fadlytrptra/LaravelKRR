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
    // let table_logMesin = $("#table_logMesin").DataTable({
    //     // columnDefs: [{ targets: [5, 6], visible: false }],
    //     // headerCallback: function (thead, data, start, end, display) {
    //     //     $(thead).find("th")
    //     //         .css("font-family", "Arial")
    //     //         .css("font-size", "14px")
    //     //         .css("text-align", "center");
    //     // },
    //     paging: false,
    //     scrollY: "300px",
    //     scrollX: "300px",
    //     scrollCollapse: true,
    // });

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
    initModal();
    initializeSelect2();

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
        jumlahKain.value = "";
        hasilPrinting.value = "";
        beratKain.value = "";
        afalanPrinting.value = "";
        pemakaianReduser.value = "";
        pembersihan.value = "";
        buangAfalanTintaPail.value = "";
        buangAfalanTintaKG.value = "";
        keterangan_kegiatan.value = "";
    }

    let userAction = [
        "4405",
        "4221",
        "4259",
        "8982",
        "4451",
        "4199"
    ];

    table_logMesin = $("#table_logMesin").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        destroy: true,
        ajax: {
            url: "MaintKegiatanMesinPrintingJBB/getData",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                    // tgl_awal: tgl_awal.value,
                    // tgl_akhir: tgl_akhir.value,
                    lokasi: $("#" + slcLokasi.id).val(),
                });
            },
        },
        columns: [
            { data: "idLog" },
            {
                data: "tanggalLog_raw", // Data asli untuk sorting
                render: function (data, type, row) {
                    // type === 'display' digunakan saat menampilkan di tabel
                    if (type === "display") {
                        return row.tanggalLog; // tampilkan versi m/d/Y
                    }
                    return data; // untuk sorting & filtering (yyyy-mm-dd)
                },
            },
            { data: "noMesin" },
            { data: "shiftPrinting" },
            { data: "kodeBarang" },
            { data: "warnaTinta" },
            { data: "beratKain" },
            { data: "afalanPrinting" },
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row) {

                    if (!userAction.includes(nomorUser)) {
                        return "";
                    }

                    return `
                    <button
                        class="btn btn-sm btn-warning btn-edit"
                        style="width: 150px;"
                        data-id="${row.idLog}">
                        <i class="fa fa-edit"></i> Edit
                    </button>
                        
                    <button
                        class="btn btn-sm btn-danger btn-delete"
                        style="width: 150px;"
                        data-id="${row.idLog}">
                        <i class="fa fa-trash"></i> Delete
                    </button>
                `;
                },
            },
        ],
        createdRow: function (row, data, dataIndex) {
            $(row)
                .find("td")
                .css({
                    "font-family": "Arial",
                    "font-size": "14px",
                    "text-align": "center",
                    "vertical-align": "middle"
                });
        },
        headerCallback: function (thead, data, start, end, display, tdata) {
            $(thead, tdata)
                .find("th")
                .css("font-family", "Arial")
                .css("font-size", "14px")
                .css("text-align", "center");
        },
        order: [[1, "asc"]],
        // paging: false,
        // scrollY: "400px",
        // scrollCollapse: true,
    });

    $("#table_logMesin").on("click", ".btn-edit", function () {
        const id = $(this).data("id");
        console.log(id);
        idLog = id;
        $.ajax({
            url: "MaintKegiatanMesinPrintingJBB/getDataEdit",
            type: "GET",
            data: {
                _token: csrfToken,
                idLog: id,
            },
            success: function (data) {
                console.log(data);
                clearAll();
                $("#tambahKegiatanMesinPrintingModal").modal("show");
                tambahKegiatanMesinPrintingLabel.innerHTML = "Edit Kegiatan Mesin Printing JBB";
                shiftPrinting.value = data[0].shiftPrinting;
                ukuranpanjang_tableHit.value = data[0].ukuranPanjang;
                ukuranlebar_tableHit.value = data[0].ukuranLebar;
                warnaTinta.value = data[0].warnaTinta;
                beratTintaAwal.value = data[0].beratTintaAwal;
                beratTintaAkhir.value = data[0].beratTintaAkhir;
                jumlahKain.value = data[0].jumlahKain;
                hasilPrinting.value = data[0].hasilPrinting;
                beratKain.value = data[0].beratKain;
                afalanPrinting.value = data[0].afalanPrinting;
                pemakaianReduser.value = data[0].pemakaianReduser;
                pembersihan.value = data[0].pembersihan;
                buangAfalanTintaPail.value = data[0].buangAfalanTintaPail;
                buangAfalanTintaKG.value = data[0].buangAfalanTintaKG;
                keterangan_kegiatan.value = data[0].keterangan_kegiatan;
                if (data[0].komponen == null) {

                    customer_tableHit
                        .val(data[0].customer?.trim())
                        .trigger("change");

                    const kodeBarang = data[0].kodeBarang?.trim();
                    const jenis = data[0].jenisPotongan?.trim();

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
                        .val(data[0].customer?.trim())
                        .trigger("change");

                    const kodeBarang = data[0].kodeBarang?.trim();

                    kodebarang_tableHitEdit = kodeBarang;

                    komponen_tableHitEdit = data[0].komponen?.trim();

                    jenisPotongan = data[0].jenisPotongan?.trim();

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
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });

    });

    $('#table_logMesin').on('click', '.btn-delete', function () {
        const id = $(this).data('id');
        console.log(id);
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

    //#region Functions

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
            keterangan_kegiatan.select();
        }
    });

    keterangan_kegiatan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            button_modalProsesPrinting.focus();
        }
    });

    //#region Select2

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
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    ajax: {
                        url: "MaintKegiatanMesinPrintingJBB/getData",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                // tgl_awal: tgl_awal.value,
                                // tgl_akhir: tgl_akhir.value,
                                lokasi: $("#" + slcLokasi.id).val(),
                            });
                        },
                    },
                    columns: [
                        { data: "idLog" },
                        {
                            data: "tanggalLog_raw", // Data asli untuk sorting
                            render: function (data, type, row) {
                                // type === 'display' digunakan saat menampilkan di tabel
                                if (type === "display") {
                                    return row.tanggalLog; // tampilkan versi m/d/Y
                                }
                                return data; // untuk sorting & filtering (yyyy-mm-dd)
                            },
                        },
                        { data: "noMesin" },
                        { data: "shiftPrinting" },
                        { data: "kodeBarang" },
                        { data: "warnaTinta" },
                        { data: "beratKain" },
                        { data: "afalanPrinting" },
                        {
                            data: null,
                            orderable: false,
                            searchable: false,
                            render: function (data, type, row) {

                                if (!userAction.includes(nomorUser)) {
                                    return "";
                                }

                                return `
                                <button
                                    class="btn btn-sm btn-warning btn-edit"
                                    style="width: 150px;"
                                    data-id="${row.idLog}">
                                    <i class="fa fa-edit"></i> Edit
                                </button>

                                <button
                                    class="btn btn-sm btn-danger btn-delete"
                                    style="width: 150px;"
                                    data-id="${row.idLog}">
                                    <i class="fa fa-trash"></i> Delete
                                </button>
                            `;
                            },
                        },
                    ],
                    createdRow: function (row, data, dataIndex) {
                        $(row)
                            .find("td")
                            .css({
                                "font-family": "Arial",
                                "font-size": "14px",
                                "text-align": "center",
                                "vertical-align": "middle"
                            });
                    },
                    headerCallback: function (thead, data, start, end, display, tdata) {
                        $(thead, tdata)
                            .find("th")
                            .css("font-family", "Arial")
                            .css("font-size", "14px")
                            .css("text-align", "center");
                    },
                    order: [[1, "asc"]],
                    // paging: false,
                    // scrollY: "400px",
                    // scrollCollapse: true,
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
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    ajax: {
                        url: "MaintKegiatanMesinPrintingJBB/getData",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                // tgl_awal: tgl_awal.value,
                                // tgl_akhir: tgl_akhir.value,
                                lokasi: $("#" + slcLokasi.id).val(),
                            });
                        },
                    },
                    columns: [
                        { data: "idLog" },
                        {
                            data: "tanggalLog_raw", // Data asli untuk sorting
                            render: function (data, type, row) {
                                // type === 'display' digunakan saat menampilkan di tabel
                                if (type === "display") {
                                    return row.tanggalLog; // tampilkan versi m/d/Y
                                }
                                return data; // untuk sorting & filtering (yyyy-mm-dd)
                            },
                        },
                        { data: "noMesin" },
                        { data: "shiftPrinting" },
                        { data: "kodeBarang" },
                        { data: "warnaTinta" },
                        { data: "beratKain" },
                        { data: "afalanPrinting" },
                        {
                            data: null,
                            orderable: false,
                            searchable: false,
                            render: function (data, type, row) {

                                if (!userAction.includes(nomorUser)) {
                                    return "";
                                }

                                return `
                                <button
                                    class="btn btn-sm btn-warning btn-edit"
                                    style="width: 150px;"
                                    data-id="${row.idLog}">
                                    <i class="fa fa-edit"></i> Edit
                                </button>

                                <button
                                    class="btn btn-sm btn-danger btn-delete"
                                    style="width: 150px;"
                                    data-id="${row.idLog}">
                                    <i class="fa fa-trash"></i> Delete
                                </button>
                            `;
                            },
                        },
                    ],
                    createdRow: function (row, data, dataIndex) {
                        $(row)
                            .find("td")
                            .css({
                                "font-family": "Arial",
                                "font-size": "14px",
                                "text-align": "center",
                                "vertical-align": "middle"
                            });
                    },
                    headerCallback: function (thead, data, start, end, display, tdata) {
                        $(thead, tdata)
                            .find("th")
                            .css("font-family", "Arial")
                            .css("font-size", "14px")
                            .css("text-align", "center");
                    },
                    order: [[1, "asc"]],
                    // paging: false,
                    // scrollY: "400px",
                    // scrollCollapse: true,
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
                kodebarang_tableHit
                    .val(kodebarang_tableHitEdit)
                    .trigger("change")
                    .trigger("select2:select");
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

            if (
                tambahKegiatanMesinPrintingLabel.innerHTML !==
                "Edit Kegiatan Mesin Printing JBB"
            ) {
                komponen_tableHit.select2("open");
            }

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