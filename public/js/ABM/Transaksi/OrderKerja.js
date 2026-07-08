jQuery(function ($) {
    //#region Get element by ID
    // let button_tambahjenisOrderKerja = document.getElementById("button_tambahjenisOrderKerja"); // prettier-ignore
    // let jenisOrderAdstar = document.getElementById('jenisOrderAdstar'); // prettier-ignore
    // let jenisOrderKerjaPrintingStarpak = document.getElementById('jenisOrderKerjaPrintingStarpak'); // prettier-ignore
    // let jenisOrderKerjaPrintingWoven = document.getElementById('jenisOrderKerjaPrintingWoven'); // prettier-ignore
    // let jenisOrderWoven = document.getElementById('jenisOrderWoven'); // prettier-ignore
    // let kodeBarangSetengahJadiWoven = document.getElementById('kodeBarangSetengahJadiWoven'); // prettier-ignore
    // let namaBarangSetengahJadiWoven = document.getElementById('namaBarangSetengahJadiWoven'); // prettier-ignore
    const select_jenisOrderKerja = $("#select_jenisOrderKerja"); // prettier-ignore
    const select_suratPesananTujuan = $('#select_suratPesananTujuan'); // prettier-ignore
    let additionalInputs = document.getElementById("additionalInputs");
    let additionalInputsKBWoven = document.getElementById("additionalInputsKBWoven"); // prettier-ignore
    let additionalInputsPatchAtas = document.getElementById("additionalInputsPatchAtas"); //prettier-ignore
    let additionalInputsPatchBawah = document.getElementById("additionalInputsPatchBawah"); //prettier-ignore
    let button_modalDetailPermohonan = document.getElementById("button_modalDetailPermohonan"); // prettier-ignore
    let button_modalProses = document.getElementById("button_modalProses"); // prettier-ignore
    let button_pakaiMemo = document.getElementById("button_pakaiMemo"); // prettier-ignore
    let checkbox_patchIsEqual = document.getElementById("checkbox_patchIsEqual"); //prettier-ignore
    let button_tambahOrderKerja = document.getElementById("button_tambahOrderKerja"); // prettier-ignore
    let cekNomorOrderKerja = document.getElementById("cekNomorOrderKerja"); // prettier-ignore
    let corakPrintingPatchAtas = document.getElementById("corakPrintingPatchAtas"); //prettier-ignore
    let corakPrintingPatchBawah = document.getElementById("corakPrintingPatchBawah"); //prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let customerSuratPesanan = document.getElementById("customerSuratPesanan"); // prettier-ignore
    let dataSuratPesananTemp;
    let detailOrderKerjaCustomer = document.getElementById("detailOrderKerjaCustomer"); // prettier-ignore
    let detailOrderKerjaModalLabel = document.getElementById("detailOrderKerjaModalLabel"); // prettier-ignore
    let detailOrderKerjaNamaBarang = document.getElementById("detailOrderKerjaNamaBarang"); // prettier-ignore
    let detailOrderKerjaNomorSuratPesanan = document.getElementById("detailOrderKerjaNomorSuratPesanan"); // prettier-ignore
    let detailOrderKerjaTanggalRencanaMulaiKerja = document.getElementById("detailOrderKerjaTanggalRencanaMulaiKerja"); // prettier-ignore
    let detailOrderKerjaTanggalRencanaSelesaiKerja = document.getElementById("detailOrderKerjaTanggalRencanaSelesaiKerja"); // prettier-ignore
    let div_keterangan = document.getElementById("div_keterangan"); // prettier-ignore
    let div_kodeBarangHasilProduksiStarpak = document.getElementById('div_kodeBarangHasilProduksiStarpak'); // prettier-ignore
    let div_kodeBarangHasilProduksiWoven = document.getElementById('div_kodeBarangHasilProduksiWoven'); // prettier-ignore
    let div_printingStarpak1 = document.getElementById("div_printingStarpak1"); // prettier-ignore
    let div_printingStarpak2 = document.getElementById("div_printingStarpak2"); // prettier-ignore
    let div_printingWoven = document.getElementById("div_printingWoven"); // prettier-ignore
    let div_rollPatchAtasStarpak = document.getElementById("div_rollPatchAtasStarpak"); //prettier-ignore
    let div_rollPatchAtasStarpak2 = document.getElementById("div_rollPatchAtasStarpak2"); // prettier-ignore
    let div_rollPatchBawahStarpak = document.getElementById("div_rollPatchBawahStarpak"); //prettier-ignore
    let div_rollPatchBawahStarpak2 = document.getElementById("div_rollPatchBawahStarpak2"); // prettier-ignore
    let div_tanggalRencanaMulaiKerjaWoven = document.getElementById('div_tanggalRencanaMulaiKerjaWoven'); //prettier-ignore
    let div_tanggalRencanaSelesaiKerjaWoven = document.getElementById('div_tanggalRencanaSelesaiKerjaWoven'); //prettier-ignore
    let div_warnaKarungWoven = document.getElementById("div_warnaKarungWoven");
    let input_airPermeabilityStarpak = document.getElementById("input_airPermeabilityStarpak"); // prettier-ignore
    let input_coronaStarpak = document.getElementById("input_coronaStarpak"); // prettier-ignore
    let input_coronaStarpakPatchAtas = document.getElementById("input_coronaStarpakPatchAtas"); //prettier-ignore
    let input_coronaStarpakPatchBawah = document.getElementById("input_coronaStarpakPatchBawah"); //prettier-ignore
    let input_denier = document.getElementById("input_denier"); // prettier-ignore
    let input_drumKliseStarpak = document.getElementById("input_drumKliseStarpak"); // prettier-ignore
    let input_drumKliseStarpakPatchAtas = document.getElementById("input_drumKliseStarpakPatchAtas"); //prettier-ignore
    let input_drumKliseStarpakPatchBawah = document.getElementById("input_drumKliseStarpakPatchBawah"); //prettier-ignore
    let input_innerStarpak = document.getElementById("input_innerStarpak"); // prettier-ignore
    let input_innerWoven = document.getElementById('input_innerWoven'); //prettier-ignore
    let input_kertasWoven = document.getElementById('input_kertasWoven'); //prettier-ignore
    let input_jahitAtasWoven = document.getElementById("input_jahitAtasWoven"); // prettier-ignore
    let input_jahitBawahWoven = document.getElementById("input_jahitBawahWoven"); // prettier-ignore
    let input_jumlahPatchAtas = document.getElementById("input_jumlahPatchAtas"); //prettier-ignore
    let input_jumlahPatchBawah = document.getElementById("input_jumlahPatchBawah"); //prettier-ignore
    let input_jumlahWarna = document.getElementById("input_jumlahWarna"); // prettier-ignore
    let input_jumlahWarnaPatchAtas = document.getElementById("input_jumlahWarnaPatchAtas"); //prettier-ignore
    let input_jumlahWarnaPatchBawah = document.getElementById("input_jumlahWarnaPatchBawah"); //prettier-ignore
    let input_kertasStarpak = document.getElementById("input_kertasStarpak"); // prettier-ignore
    let input_keterangan = document.getElementById("input_keterangan"); // prettier-ignore
    let input_jumlahKodeBarangSetengahJadiWoven = document.getElementById("input_jumlahKodeBarangSetengahJadiWoven"); // prettier-ignore
    let input_panjangPotonganStarpak = document.getElementById("input_panjangPotonganStarpak"); // prettier-ignore
    let input_potongWoven = document.getElementById("input_potongWoven"); // prettier-ignore
    let input_printMaxStarpak = document.getElementById("input_printMaxStarpak"); // prettier-ignore
    let input_rajutan = document.getElementById("input_rajutan"); // prettier-ignore
    let input_rollStarpak = document.getElementById("input_rollStarpak"); // prettier-ignore
    let input_rollStarpakPatchAtas = document.getElementById("input_rollStarpakPatchAtas"); //prettier-ignore
    let input_rollStarpakPatchBawah = document.getElementById("input_rollStarpakPatchBawah"); //prettier-ignore
    let input_spoonBondStarpak = document.getElementById("input_spoonBondStarpak"); // prettier-ignore
    let input_tanggalRencanaMulaiKerjaWoven = document.getElementById("input_tanggalRencanaMulaiKerjaWoven"); // prettier-ignore
    let input_tanggalRencanaSelesaiKerjaWoven = document.getElementById("input_tanggalRencanaSelesaiKerjaWoven"); // prettier-ignore
    let input_ukuran = document.getElementById("input_ukuran"); // prettier-ignore
    let input_warnaKarungWoven = document.getElementById('input_warnaKarungWoven'); // prettier-ignore
    let jenisOrderKerja = 0;
    let jumlahPesanan = document.getElementById("jumlahPesanan"); // prettier-ignore
    let kodeBarangJadi = document.getElementById("kodeBarangJadi"); // prettier-ignore
    let kodeBarangPrintingStarpak = document.getElementById('kodeBarangPrintingStarpak'); // prettier-ignore
    let kodeBarangPrintingStarpakPatchAtas = document.getElementById("kodeBarangPrintingStarpakPatchAtas"); // prettier-ignore
    let kodeBarangPrintingStarpakPatchBawah = document.getElementById("kodeBarangPrintingStarpakPatchBawah"); // prettier-ignore
    let kodeBarangPrintingWoven = document.getElementById('kodeBarangPrintingWoven'); // prettier-ignore
    let kodeBarangBalikLamiWoven = document.getElementById("kodeBarangBalikLamiWoven"); //prettier-ignore
    let labelCorakPrinting = document.querySelector('label[for="corakPrinting"]'); // prettier-ignore
    let labelInput_jumlahWarna = document.querySelector('label[for="input_jumlahWarna"]'); // prettier-ignore
    let label_kodeBarang = document.getElementById('label_kodeBarang'); // prettier-ignore
    let namaBarang = document.getElementById("namaBarang"); // prettier-ignore
    let namaBarangPrintingStarpak = document.getElementById('namaBarangPrintingStarpak'); // prettier-ignore
    let namaBarangPrintingStarpakPatchAtas = document.getElementById("namaBarangPrintingStarpakPatchAtas"); // prettier-ignore
    let namaBarangPrintingStarpakPatchBawah = document.getElementById("namaBarangPrintingStarpakPatchBawah"); // prettier-ignore
    let namaBarangPrintingWoven = document.getElementById('namaBarangPrintingWoven'); // prettier-ignore
    let namaBarangBalikLamiWoven = document.getElementById("namaBarangBalikLamiWoven"); //prettier-ignore
    let NomorOrderKerja = document.getElementById("NomorOrderKerja"); // prettier-ignore
    let packingSuratPesanan = document.getElementById("packingSuratPesanan"); // prettier-ignore
    let sisaSaldo = document.getElementById("sisaSaldo"); // prettier-ignore
    let suratPesananValue = document.getElementById("suratPesananValue"); // prettier-ignore
    let tambahPermohonanOrderKerjaLabel = document.getElementById("tambahPermohonanOrderKerjaLabel"); // prettier-ignore
    let title_starpakPatchAtas = document.getElementById("title_starpakPatchAtas"); // prettier-ignore
    let title_starpakPatchBawah = document.getElementById("title_starpakPatchBawah"); // prettier-ignore
    let div_gambar_contohPacking = document.getElementById("div_gambar_contohPacking"); // prettier-ignore
    let gambar_contohPacking = document.getElementById("gambar_contohPacking"); // prettier-ignore
    let div_previewGambar_contohPacking = document.getElementById("div_previewGambar_contohPacking"); // prettier-ignore
    let imagePreview = document.getElementById("imagePreview");
    let previewImg = document.getElementById("previewImg");
    let clearImage = document.getElementById("clearImage");
    let div_packingPalletWoven = document.getElementById("div_packingPalletWoven"); // prettier-ignore
    let packingPalletWoven = document.getElementById("packingPalletWoven"); // prettier-ignore
    let base64Image;
    let pakaiMemo = false;

    let table_orderKerja = $("#table_orderKerja").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        serverSide: true,
        ajax: {
            url: "/MaintenanceOrderKerjaABM/getDataPermohonanOrderKerja",
            type: "GET",
        },
        columns: [
            { data: "NomorOrderKerja", width: "10%" },
            { data: "JenisOKDisplay", width: "10%" },
            { data: "NomorSP", width: "10%" },
            { data: "KodeBarang", width: "15%" },
            { data: "NamaCust", width: "30%" },
            {
                data: "IdOrder",
                render: function (data, type, full, meta) {
                    let buttonLabel =
                        full.Aktif == 1 ? "Deactivate" : "Activate";
                    let toggleClass =
                        full.Aktif == 1 ? "btn-danger" : "btn-success";
                    return (
                        '<button class="btn btn-success btn-print" data-id="' +
                        data +
                        " | " +
                        full.JenisOK +
                        '">Cetak</button>' +
                        '<button class="btn btn-info btn-edit" data-id="' +
                        data +
                        " | " +
                        full.JenisOK +
                        " | " +
                        full.NomorOrderKerja +
                        '" data-toggle="modal" data-target="#tambahPermohonanOrderKerjaModal">Edit</button>' +
                        '<button class="btn ' +
                        toggleClass +
                        ' btn-delete" data-id="' +
                        data +
                        " | " +
                        full.JenisOK +
                        " | " +
                        full.NomorOrderKerja +
                        '">' +
                        buttonLabel +
                        "</button>" +
                        '<button class="btn btn-secondary btn-copy" data-id="' +
                        data +
                        " | " +
                        full.JenisOK +
                        " | " +
                        full.NomorOrderKerja +
                        '" data-toggle="modal" data-target="#tambahPermohonanOrderKerjaModal">Copy</button>'
                    );
                },
                width: "25%",
            },
            {
                data: "Aktif", // hidden column
                visible: false, // make it invisible
                searchable: false, // optional, if you don't want it in search
            },
        ],
        orderFixed: {
            pre: [5, "desc"], // Always sort by Aktif first
        },
        columnDefs: [{ width: "23%", targets: [0, 1, 2] }],
    }); // prettier-ignore

    //#endregion

    //#region Load Form

    //#endregion

    //#region function
    // Setup global AJAX handlers
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

    function clearAll() {
        cekNomorOrderKerja.innerHTML = "";
        customerSuratPesanan.value = "";
        jumlahPesanan.value = "";
        kodeBarangJadi.value = "";
        sisaSaldo.value = "";
        packingSuratPesanan.value = "";
        namaBarang.innerHTML = "";
        kodeBarangPrintingWoven.value = "";
        namaBarangPrintingWoven.value = "";
        kodeBarangBalikLamiWoven.value = "";
        namaBarangBalikLamiWoven.value = "";
        input_jumlahKodeBarangSetengahJadiWoven.value = "";
        input_jumlahKodeBarangSetengahJadiWoven.dispatchEvent(
            new Event("input"),
        );
        kodeBarangPrintingStarpak.value = "";
        namaBarangPrintingStarpak.value = "";
        kodeBarangPrintingStarpakPatchAtas.value = "";
        namaBarangPrintingStarpakPatchAtas.value = "";
        kodeBarangPrintingStarpakPatchBawah.value = "";
        namaBarangPrintingStarpakPatchBawah.value = "";
        input_ukuran.value = "";
        input_rajutan.value = "";
        input_denier.value = "";
        input_innerWoven.value = "";
        input_kertasWoven.value = "";
        input_potongWoven.value = "";
        input_jahitAtasWoven.value = "";
        input_jahitBawahWoven.value = "";
        gambar_contohPacking.value = "";
        previewImg.value = "";
        packingPalletWoven.value = "";
        input_jumlahWarna.value = "";
        input_jumlahWarna.dispatchEvent(new Event("input"));
        input_keterangan.value = "";
        corakPrinting.value = "";
        input_warnaKarungWoven.value = "";
        input_drumKliseStarpak.value = "";
        input_panjangPotonganStarpak.value = "";
        input_coronaStarpak.value = "";
        input_printMaxStarpak.value = "";
        input_airPermeabilityStarpak.value = "";
        input_rollStarpak.value = "";
        input_rollStarpakPatchAtas.value = "";
        input_rollStarpakPatchBawah.value = "";
        input_drumKliseStarpakPatchAtas.value = "";
        input_drumKliseStarpakPatchBawah.value = "";
        input_coronaStarpakPatchAtas.value = "";
        input_coronaStarpakPatchBawah.value = "";
        input_jumlahPatchAtas.value = "";
        input_jumlahPatchBawah.value = "";
        input_jumlahWarnaPatchAtas.value = "";
        input_jumlahWarnaPatchAtas.dispatchEvent(new Event("input"));
        input_jumlahWarnaPatchBawah.value = "";
        input_jumlahWarnaPatchBawah.dispatchEvent(new Event("input"));
        corakPrintingPatchAtas.value = "";
        corakPrintingPatchBawah.value = "";
    }

    function getDataNomorOrderKerjaTerakhir(jenisOrderKerja) {
        $.ajax({
            url: "/MaintenanceOrderKerjaABM/getDataNomorOrderKerja",
            method: "GET",
            data: {
                jenisOrderKerja: jenisOrderKerja,
                _token: csrfToken,
            },
            dataType: "json",
            success: function (data) {
                const twoDigitYear = new Date().getFullYear().toString().slice(-2); // prettier-ignore
                console.log(data);

                if (data.success) {
                    if (
                        data.dataNomorOrderKerja.length > 0 &&
                        data.dataNomorOrderKerja[0].No_OK.substring(0, 2) ==
                            twoDigitYear
                    ) {
                        NomorOrderKerja.value = parseInt(data.dataNomorOrderKerja[0].No_OK) + 1; // prettier-ignore
                    } else {
                        NomorOrderKerja.value = twoDigitYear + "0001";
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load Nomor Order Kerja data.",
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to request data Nomor Order Kerja.",
                });
            },
        });
    }

    setInputFilter(
        NomorOrderKerja,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed",
    );

    setInputFilter(
        kodeBarangPrintingStarpak,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed",
    );

    setInputFilter(
        kodeBarangPrintingStarpakPatchAtas,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed",
    );

    setInputFilter(
        kodeBarangPrintingStarpakPatchBawah,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed",
    );

    setInputFilter(
        kodeBarangPrintingWoven,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed",
    );

    setInputFilter(
        kodeBarangBalikLamiWoven,
        function (value) {
            return /^\d*$/.test(value); // Allow only digits
        },
        "Only digits are allowed",
    );
    //#endregion

    //#region Event Listener

    button_tambahOrderKerja.addEventListener("click", function () {
        $("#button_modalProses").data("id", null);
        tambahPermohonanOrderKerjaLabel.textContent = "Tambah Order Kerja";
        $.ajax({
            url: "/MaintenanceOrderKerjaABM/getDataSuratPesanan",
            method: "GET",
            dataType: "json",
            success: function (data) {
                const twoDigitYear = new Date().getFullYear().toString().slice(-2); // prettier-ignore
                console.log(data);

                if (data.success) {
                    dataSuratPesananTemp = data.dataSuratPesanan;
                    // Populate select_suratPesananTujuan with data.dataSuratPesanan
                    select_suratPesananTujuan.empty(); // Clear existing options
                    data.dataSuratPesanan.forEach(function (item) {
                        select_suratPesananTujuan.append(
                            new Option(item.IDSuratPesanan + ' | ' + item.KodeBarang, item.IDPesanan), // prettier-ignore
                        );
                    });
                    select_suratPesananTujuan.val(null).trigger("change");
                    select_suratPesananTujuan.prop("disabled", false);
                    select_jenisOrderKerja.val(null).trigger("change");
                    select_jenisOrderKerja.prop("disabled", false);
                    NomorOrderKerja.value = "";
                    NomorOrderKerja.disabled = false;

                    pakaiMemo = false;
                    button_pakaiMemo.style.display = "block";
                    suratPesananValue.readOnly = false;
                    select_suratPesananTujuan.parent().show();
                    customerSuratPesanan.readOnly = true;
                    jumlahPesanan.readOnly = true;
                    kodeBarangJadi.readOnly = true;
                    // Hide
                    [
                        div_printingStarpak1,
                        div_printingStarpak2,
                        div_printingWoven,
                        div_kodeBarangHasilProduksiWoven,
                        div_rollPatchAtasStarpak,
                        div_rollPatchAtasStarpak2,
                        div_rollPatchBawahStarpak,
                        div_rollPatchBawahStarpak2,
                    ].forEach((el) => {
                        el.classList.remove("show-important");
                        el.classList.add("hide-important");
                    });
                    // Hide but removing class show-important-block
                    [
                        div_warnaKarungWoven,
                        div_kodeBarangHasilProduksiStarpak,
                        div_tanggalRencanaMulaiKerjaWoven,
                        div_tanggalRencanaSelesaiKerjaWoven,
                        title_starpakPatchAtas,
                        title_starpakPatchBawah,
                        suratPesananValue,
                    ].forEach((el) => {
                        el.classList.remove("show-important-block");
                        el.classList.add("hide-important");
                    });
                    label_kodeBarang.innerHTML = "Kode Barang";
                    clearAll();
                    input_tanggalRencanaMulaiKerjaWoven.value = "";
                    input_tanggalRencanaSelesaiKerjaWoven.value = "";
                    setTimeout(() => {
                        select_jenisOrderKerja.select2("open");
                    }, 200); // delay in milliseconds (adjust as needed)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load Nomor Order Kerja data.",
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to request data Nomor Order Kerja.",
                });
            },
        });
    });

    $("#tambahPermohonanOrderKerjaModal").on(
        "shown.bs.modal",
        function (event) {
            select_suratPesananTujuan.select2({
                dropdownParent: $("#tambahPermohonanOrderKerjaModal"),
                placeholder: "Pilih Surat Pesanan",
            });
            select_jenisOrderKerja.select2({
                dropdownParent: $("#tambahPermohonanOrderKerjaModal"),
                placeholder: "Pilih Jenis Order Kerja",
            });
        },
    );

    select_jenisOrderKerja.on("select2:select", function () {
        jenisOrderKerja = select_jenisOrderKerja.val();
        getDataNomorOrderKerjaTerakhir(jenisOrderKerja);
        cekNomorOrderKerja.innerHTML = "";
        if (jenisOrderKerja == 1) {
            // Enable these
            [
                kodeBarangPrintingWoven,
                kodeBarangBalikLamiWoven,
                input_jumlahKodeBarangSetengahJadiWoven,
            ].forEach((el) => (el.readOnly = false));

            // Disable & clear these
            [
                kodeBarangPrintingStarpak,
                kodeBarangPrintingStarpakPatchAtas,
                kodeBarangPrintingStarpakPatchBawah,
            ].forEach((el) => {
                el.readOnly = true;
                el.value = "";
            });
            [namaBarangPrintingStarpak].forEach((el) => (el.value = ""));

            // Show
            [
                div_printingWoven,
                div_kodeBarangHasilProduksiWoven,
                div_tanggalRencanaMulaiKerjaWoven,
                div_tanggalRencanaSelesaiKerjaWoven,
            ].forEach((el) => {
                el.classList.add("show-important");
                el.classList.remove("hide-important");
            });

            // Show but adding class show-important-block
            [
                div_warnaKarungWoven,
                div_tanggalRencanaMulaiKerjaWoven,
                div_tanggalRencanaSelesaiKerjaWoven,
            ].forEach((el) => {
                el.classList.add("show-important-block");
                el.classList.remove("hide-important");
            });

            // Hide but removing class show-important-block
            [
                title_starpakPatchAtas,
                title_starpakPatchBawah,
                div_kodeBarangHasilProduksiStarpak,
            ].forEach((el) => {
                el.classList.remove("show-important-block");
                el.classList.add("hide-important");
            });

            // Hide
            [
                div_printingStarpak1,
                div_printingStarpak2,
                div_rollPatchAtasStarpak,
                div_rollPatchAtasStarpak2,
                div_rollPatchBawahStarpak,
                div_rollPatchBawahStarpak2,
                title_starpakPatchAtas,
                title_starpakPatchBawah,
            ].forEach((el) => {
                el.classList.remove("show-important");
                el.classList.add("hide-important");
            });

            labelInput_jumlahWarna.textContent = "Jumlah Warna";
            labelCorakPrinting.textContent = "Corak Printing";
            label_kodeBarang.textContent = "Kode Barang Printing / Set. Jadi";
        } else if (jenisOrderKerja == 2) {
            // Enable these
            [
                kodeBarangPrintingStarpak,
                kodeBarangPrintingStarpakPatchAtas,
                kodeBarangPrintingStarpakPatchBawah,
            ].forEach((el) => (el.readOnly = false));

            // Disable & clear these
            [
                kodeBarangPrintingWoven,
                kodeBarangBalikLamiWoven,
                input_jumlahKodeBarangSetengahJadiWoven,
            ].forEach((el) => {
                el.readOnly = true;
                el.value = "";
            });
            input_jumlahKodeBarangSetengahJadiWoven.dispatchEvent(
                new Event("input"),
            );
            [namaBarangPrintingWoven].forEach((el) => (el.value = ""));

            // Show
            [
                div_printingStarpak1,
                div_printingStarpak2,
                div_rollPatchAtasStarpak,
                div_rollPatchAtasStarpak2,
                div_rollPatchBawahStarpak,
                div_rollPatchBawahStarpak2,
            ].forEach((el) => {
                el.classList.add("show-important");
                el.classList.remove("hide-important");
            });

            // Hide
            [
                div_printingWoven,
                div_kodeBarangHasilProduksiWoven,
                div_warnaKarungWoven,
                div_tanggalRencanaMulaiKerjaWoven,
                div_tanggalRencanaSelesaiKerjaWoven,
            ].forEach((el) => {
                el.classList.remove("show-important");
                el.classList.add("hide-important");
            });

            // Show but adding class show-important-block
            [
                title_starpakPatchAtas,
                title_starpakPatchBawah,
                div_kodeBarangHasilProduksiStarpak,
            ].forEach((el) => {
                el.classList.add("show-important-block");
                el.classList.remove("hide-important");
            });

            // Hide but removing class show-important-block
            [
                div_warnaKarungWoven,
                div_tanggalRencanaMulaiKerjaWoven,
                div_tanggalRencanaSelesaiKerjaWoven,
            ].forEach((el) => {
                el.classList.remove("show-important-block");
                el.classList.add("hide-important");
            });

            labelInput_jumlahWarna.textContent = "Jumlah Warna Body";
            labelCorakPrinting.textContent = "Corak Printing Body";
            label_kodeBarang.textContent = "Kode Barang Printing Starpak";
        }
        NomorOrderKerja.focus();
    });

    NomorOrderKerja.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            // Clear existing options
            select_suratPesananTujuan.empty();
            namaBarang.textContent = "";
            customerSuratPesanan.value = "";
            jumlahPesanan.value = "";
            kodeBarangJadi.value = "";
            packingSuratPesanan.value = "";
            if (NomorOrderKerja.value == "") {
                this.setCustomValidity("Nomor Order Kerja tidak boleh kosong"); // prettier-ignore
                NomorOrderKerja.classList.add("input-error");
                this.reportValidity();
                return;
            }
            console.log(select_jenisOrderKerja.val());

            if (select_jenisOrderKerja.val() == null) {
                this.setCustomValidity("Pilih Jenis Order Kerja dulu!"); // prettier-ignore
                NomorOrderKerja.classList.add("input-error");
                this.reportValidity();
                return;
            }

            // check apakah nomor order kerja sudah ada, kalau sudah ada filter surat pesanan berdasarkan kode barang yang sama
            $.ajax({
                url: "/MaintenanceOrderKerjaABM/getDataSPBerdasarkanNomorOrderKerja",
                method: "GET",
                data: {
                    NomorOrderKerja: NomorOrderKerja.value,
                    JenisOK: select_jenisOrderKerja.val(), // prettier-ignore
                    _token: csrfToken,
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);

                    if (data.success) {
                        // Populate select_suratPesananTujuan with data.dataSuratPesanan

                        if (
                            parseInt(
                                data.cekNomorOrderKerja[0]
                                    .JumlahNomorOrderKerja,
                            ) == 0
                        ) {
                            cekNomorOrderKerja.innerHTML = "Order Kerja Baru"; // prettier-ignore
                            cekNomorOrderKerja.style.color = "green";
                            cekNomorOrderKerja.style.fontSize = "";
                        } else {
                            cekNomorOrderKerja.innerHTML = "Order Kerja Sudah ada, pilihan SP ditampilkan berdasarkan data order kerja"; // prettier-ignore
                            cekNomorOrderKerja.style.color = "red";
                            cekNomorOrderKerja.style.fontSize = "14px";
                        }
                        if (data.dataSuratPesanan.length > 0) {
                            dataSuratPesananTemp = data.dataSuratPesanan;
                            data.dataSuratPesanan.forEach(function (item) {
                                select_suratPesananTujuan.append(
                                    new Option(item.IDSuratPesanan + ' | ' + item.KodeBarang, item.IDPesanan), // prettier-ignore
                                );
                            });
                            setTimeout(() => {
                                select_suratPesananTujuan.select2("open");
                            }, 200); // delay in milliseconds (adjust as needed)
                        }
                        select_suratPesananTujuan.val(null).trigger("change");
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to load Nomor Surat Pesanan.",
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to request data Nomor Order Kerja.",
                    });
                },
            });
            this.setCustomValidity("");
            this.reportValidity();
        }
    });

    select_suratPesananTujuan.on("select2:select", function () {
        let selectedId = $(this).val();
        button_pakaiMemo.style.display = "none";
        suratPesananValue.value = selectedId;
        if (dataSuratPesananTemp) {
            let selectedItem = dataSuratPesananTemp.find(
                (item) => item.IDPesanan == selectedId,
            );
            if (selectedItem) {
                namaBarang.textContent = selectedItem.NAMA_BRG;
                customerSuratPesanan.value = selectedItem.NamaCust;
                jumlahPesanan.value = numeral(selectedItem.Qty).format(
                    "0,0.00",
                );
                kodeBarangJadi.value = selectedItem.KodeBarang;
                if (
                    customerSuratPesanan.value.includes("JUSTUS") ||
                    customerSuratPesanan.value.includes("UNIPACK") ||
                    customerSuratPesanan.value.includes("YANAPRIMA")||
                    customerSuratPesanan.value.includes("TEREOS")
                ) {
                    packingSuratPesanan.value = selectedItem.Ket?.split(" | ")[3]; // prettier-ignore
                } else {
                    packingSuratPesanan.value = selectedItem.Ket;
                }
            }
        }

        if (
            customerSuratPesanan.value.includes("JUSTUS") ||
            customerSuratPesanan.value.includes("UNIPACK") ||
            customerSuratPesanan.value.includes("YANAPRIMA") ||
            customerSuratPesanan.value.includes("TEREOS")
        ) {
            div_gambar_contohPacking.style.display = "block";
            div_previewGambar_contohPacking.style.display = "block";
            div_packingPalletWoven.style.display = "block";
        } else {
            div_gambar_contohPacking.style.display = "none";
            div_packingPalletWoven.style.display = "none";
            div_previewGambar_contohPacking.style.display = "none";
        }
        sisaSaldo.focus();
    });

    button_pakaiMemo.addEventListener("click", function (e) {
        pakaiMemo = true;
        select_suratPesananTujuan.parent().hide();
        // select_suratPesananTujuan.addClass("hide-important");
        suratPesananValue.classList.remove("hide-important");
        suratPesananValue.classList.add("show-important-block");
        customerSuratPesanan.readOnly = false;
        jumlahPesanan.readOnly = false;
        kodeBarangJadi.readOnly = false;
        suratPesananValue.focus();
    });

    suratPesananValue.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            customerSuratPesanan.focus();
        }
    });

    customerSuratPesanan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            jumlahPesanan.focus();
        }
    });

    jumlahPesanan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            kodeBarangJadi.focus();
        }
    });

    kodeBarangJadi.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.setCustomValidity("Kode Barang tidak boleh kosong"); // prettier-ignore
                this.classList.add("input-error");
                kodeBarangJadi.focus();
            } else {
                // set kode barang supaya 9 digit
                let kodeBarang9digit;
                kodeBarang9digit = this;
                if (kodeBarang9digit.value.length < 9) {
                    kodeBarang9digit.value = this.value.padStart(9, "0");
                }
                this.value = kodeBarang9digit.value;

                $.ajax({
                    url: "/MaintenanceOrderKerjaABM/getDataBarangByKodeBarang",
                    method: "GET",
                    data: {
                        kodeBarang: this.value,
                        namaSubKategori: "WOVEN BAG LOKAL",
                        _token: csrfToken,
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);

                        if (data.success) {
                            if (data.dataBarang.length < 1) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Barang tidak masuk sub kategori WOVEN BAG LOKAL.",
                                });
                            } else {
                                namaBarang.textContent = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                sisaSaldo.focus();
                            }
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to load data Barang.",
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to request data Barang.",
                        });
                    },
                });
                this.setCustomValidity("");
            }
            this.reportValidity();
        }
        if (e.key == "Enter") {
            e.preventDefault();
            sisaSaldo.focus();
        }
    });

    sisaSaldo.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            packingSuratPesanan.focus();
        }
    });

    packingSuratPesanan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (jenisOrderKerja == "1") {
                kodeBarangPrintingWoven.focus();
            } else if (jenisOrderKerja == "2") {
                kodeBarangPrintingStarpak.focus();
            }
        }
    });

    kodeBarangPrintingWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.setCustomValidity("Kode Barang tidak boleh kosong"); // prettier-ignore
                this.classList.add("input-error");
                kodeBarangPrintingWoven.focus();
            } else {
                // set kode barang supaya 9 digit
                let kodeBarang9digit;
                kodeBarang9digit = this;
                if (kodeBarang9digit.value.length < 9) {
                    kodeBarang9digit.value = this.value.padStart(9, "0");
                }
                this.value = kodeBarang9digit.value;

                $.ajax({
                    url: "/MaintenanceOrderKerjaABM/getDataBarangByKodeBarang",
                    method: "GET",
                    data: {
                        kodeBarang: this.value,
                        namaSubKategori: "PRINTING WOVEN",
                        _token: csrfToken,
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);

                        if (data.success) {
                            if (data.dataBarang.length < 1) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Barang tidak masuk sub kategori PRINTING WOVEN.",
                                });
                            } else {
                                namaBarangPrintingWoven.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                input_jumlahKodeBarangSetengahJadiWoven.focus();
                            }
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to load data Barang.",
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to request data Barang.",
                        });
                    },
                });
                this.setCustomValidity("");
            }
            this.reportValidity();
        }
    });

    input_jumlahKodeBarangSetengahJadiWoven.addEventListener(
        "input",
        function () {
            const max = 3;
            const min = 0;
            let value = parseInt(this.value);
            const container = additionalInputsKBWoven;

            // Clamp the value between 0 and 8
            if (isNaN(value)) value = 0;
            value = Math.min(Math.max(value, min), max);
            this.value = value;

            // Clear existing inputs
            container.innerHTML = "";
            const colKBWoven = document.createElement("div");
            colKBWoven.className = "list-group mb-2";
            colKBWoven.style.flex = "0.3";
            colKBWoven.style.gap = "5px";
            const colNamaBarangWoven = document.createElement("div");
            colNamaBarangWoven.className = "list-group mb-2";
            colNamaBarangWoven.style.flex = "0.6";
            colNamaBarangWoven.style.gap = "5px";
            // Generate inputs in two columns
            for (let i = 1; i <= value; i++) {
                const inputKodeBarangSetengahJadi = document.createElement("input"); //prettier-ignore
                inputKodeBarangSetengahJadi.type = "text";
                inputKodeBarangSetengahJadi.className = "form-control";
                inputKodeBarangSetengahJadi.placeholder = `KB Setengah Jadi ${i}`;
                inputKodeBarangSetengahJadi.name = `kodeBarangSetengahJadiWoven_${i}`;
                inputKodeBarangSetengahJadi.id = `kodeBarangSetengahJadiWoven_${i}`;

                const inputNamaBarangSetengahJadi = document.createElement("input"); //prettier-ignore
                inputNamaBarangSetengahJadi.type = "text";
                inputNamaBarangSetengahJadi.className = "form-control";
                inputNamaBarangSetengahJadi.placeholder = `Nama Barang Setengah Jadi Woven ${i}`;
                inputNamaBarangSetengahJadi.readOnly = true;
                inputNamaBarangSetengahJadi.name = `namaBarangSetengahJadiWoven_${i}`;
                inputNamaBarangSetengahJadi.id = `namaBarangSetengahJadiWoven_${i}`;

                // If this is the last input, add keypress event for Enter
                inputKodeBarangSetengahJadi.addEventListener(
                    "keypress",
                    function (e) {
                        if (e.key === "Enter") {
                            e.preventDefault(); // Prevent form submission if inside a form
                            if (this.value == "") {
                                this.setCustomValidity("Kode Barang tidak boleh kosong"); // prettier-ignore
                                this.classList.add("input-error");
                            } else {
                                // set kode barang supaya 9 digit
                                let kodeBarang9digit;
                                kodeBarang9digit = this;
                                if (kodeBarang9digit.value.length < 9) {
                                    kodeBarang9digit.value =
                                        this.value.padStart(9, "0");
                                }
                                this.value = kodeBarang9digit.value;

                                $.ajax({
                                    url: "/MaintenanceOrderKerjaABM/getDataBarangByKodeBarang",
                                    method: "GET",
                                    data: {
                                        kodeBarang: this.value,
                                        namaSubKategori: "WOVEN KRR2",
                                        _token: csrfToken,
                                    },
                                    dataType: "json",
                                    success: function (data) {
                                        console.log(data);

                                        if (data.success) {
                                            if (data.dataBarang.length < 1) {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Error",
                                                    text: "Barang tidak masuk sub kategori WOVEN KRR2.",
                                                });
                                            } else {
                                                document.getElementById(`namaBarangSetengahJadiWoven_${i}`).value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                                if (i === value) {
                                                    input_ukuran.focus();
                                                } else {
                                                    const nextInput = document.getElementById(`kodeBarangSetengahJadiWoven_${i + 1}`); //prettier-ignore
                                                    if (nextInput) {
                                                        nextInput.focus();
                                                    }
                                                }
                                            }
                                        } else {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Error",
                                                text: "Failed to load data Barang.",
                                            });
                                        }
                                    },
                                    error: function () {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Error",
                                            text: "Failed to request data Barang.",
                                        });
                                    },
                                });
                                this.setCustomValidity("");
                            }
                            this.reportValidity();
                        }
                    },
                );

                colKBWoven.appendChild(inputKodeBarangSetengahJadi);
                colNamaBarangWoven.appendChild(inputNamaBarangSetengahJadi);
                container.appendChild(colKBWoven);
                container.appendChild(colNamaBarangWoven);

                setInputFilter(
                    document.getElementById(`kodeBarangSetengahJadiWoven_${i}`),
                    function (value) {
                        return /^\d*$/.test(value); // Allow only digits
                    },
                    "Only digits are allowed",
                );
            }
        },
    );

    input_jumlahKodeBarangSetengahJadiWoven.addEventListener(
        "keypress",
        function (e) {
            if (e.key == "Enter") {
                e.preventDefault();
                if (this.value > 0) {
                    document
                        .getElementById("kodeBarangSetengahJadiWoven_1")
                        .focus();
                } else {
                    input_ukuran.focus();
                }
            }
        },
    );

    // kodeBarangSetengahJadiWoven.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter") {
    //         if (this.value == "") {
    //             // this.setCustomValidity("Kode Barang tidak boleh kosong"); // prettier-ignore
    //             // this.classList.add("input-error");
    //             input_ukuran.focus();
    //         } else {
    //             // set kode barang supaya 9 digit
    //             let kodeBarang9digit;
    //             kodeBarang9digit = this;
    //             if (kodeBarang9digit.value.length < 9) {
    //                 kodeBarang9digit.value = this.value.padStart(9, "0");
    //             }
    //             this.value = kodeBarang9digit.value;

    //             $.ajax({
    //                 url: "/MaintenanceOrderKerjaABM/getDataBarangByKodeBarang",
    //                 method: "GET",
    //                 data: {
    //                     kodeBarang: this.value,
    //                     namaSubKategori: "SETENGAH JADI WOVEN",
    //                     _token: csrfToken,
    //                 },
    //                 dataType: "json",
    //                 success: function (data) {
    //                     console.log(data);

    //                     if (data.success) {
    //                         if (data.dataBarang.length < 1) {
    //                             Swal.fire({
    //                                 icon: "error",
    //                                 title: "Error",
    //                                 text: "Barang tidak masuk sub kategori POTONG JAHIT WOVEN.",
    //                             });
    //                         } else {
    //                             namaBarangSetengahJadiWoven.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
    //                             input_ukuran.focus();
    //                         }
    //                     } else {
    //                         Swal.fire({
    //                             icon: "error",
    //                             title: "Error",
    //                             text: "Failed to load data Barang.",
    //                         });
    //                     }
    //                 },
    //                 error: function () {
    //                     Swal.fire({
    //                         icon: "error",
    //                         title: "Error",
    //                         text: "Failed to request data Barang.",
    //                     });
    //                 },
    //             });
    //             this.setCustomValidity("");
    //         }
    //         this.reportValidity();
    //     }
    // });

    kodeBarangPrintingStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.setCustomValidity("Kode Barang tidak boleh kosong"); // prettier-ignore
                this.classList.add("input-error");
            } else {
                // set kode barang supaya 9 digit
                let kodeBarang9digit;
                kodeBarang9digit = this;
                if (kodeBarang9digit.value.length < 9) {
                    kodeBarang9digit.value = this.value.padStart(9, "0");
                }
                this.value = kodeBarang9digit.value;

                $.ajax({
                    url: "/MaintenanceOrderKerjaABM/getDataBarangByKodeBarang",
                    method: "GET",
                    data: {
                        kodeBarang: this.value,
                        namaSubKategori: "PRINTING STARPAK BODY",
                        _token: csrfToken,
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);

                        if (data.success) {
                            if (data.dataBarang.length < 1) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Barang tidak masuk sub kategori PRINTING STARPAK BODY.",
                                });
                            } else {
                                namaBarangPrintingStarpak.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                kodeBarangPrintingStarpakPatchAtas.focus();
                            }
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to load data Barang.",
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to request data Barang.",
                        });
                    },
                });
                this.setCustomValidity("");
            }
            this.reportValidity();
        }
    });

    kodeBarangPrintingStarpakPatchAtas.addEventListener(
        "keypress",
        function (e) {
            if (e.key == "Enter") {
                if (this.value == "") {
                    this.setCustomValidity("Kode Barang tidak boleh kosong"); // prettier-ignore
                    this.classList.add("input-error");
                } else {
                    // set kode barang supaya 9 digit
                    let kodeBarang9digit;
                    kodeBarang9digit = this;
                    if (kodeBarang9digit.value.length < 9) {
                        kodeBarang9digit.value = this.value.padStart(9, "0");
                    }
                    this.value = kodeBarang9digit.value;

                    $.ajax({
                        url: "/MaintenanceOrderKerjaABM/getDataBarangByKodeBarang",
                        method: "GET",
                        data: {
                            kodeBarang: this.value,
                            namaSubKategori: "PRINTING STARPAK PATCH",
                            _token: csrfToken,
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log(data);

                            if (data.success) {
                                if (data.dataBarang.length < 1) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        text: "Barang tidak masuk sub kategori PRINTING STARPAK PATCH.",
                                    });
                                } else {
                                    namaBarangPrintingStarpakPatchAtas.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                    kodeBarangPrintingStarpakPatchBawah.focus();
                                }
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Failed to load data Barang.",
                                });
                            }
                        },
                        error: function () {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to request data Barang.",
                            });
                        },
                    });
                    this.setCustomValidity("");
                }
                this.reportValidity();
            }
        },
    );

    kodeBarangPrintingStarpakPatchBawah.addEventListener(
        "keypress",
        function (e) {
            if (e.key == "Enter") {
                if (this.value == "") {
                    this.setCustomValidity("Kode Barang tidak boleh kosong"); // prettier-ignore
                    this.classList.add("input-error");
                } else {
                    // set kode barang supaya 9 digit
                    let kodeBarang9digit;
                    kodeBarang9digit = this;
                    if (kodeBarang9digit.value.length < 9) {
                        kodeBarang9digit.value = this.value.padStart(9, "0");
                    }
                    this.value = kodeBarang9digit.value;

                    $.ajax({
                        url: "/MaintenanceOrderKerjaABM/getDataBarangByKodeBarang",
                        method: "GET",
                        data: {
                            kodeBarang: this.value,
                            namaSubKategori: "PRINTING STARPAK PATCH",
                            _token: csrfToken,
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log(data);

                            if (data.success) {
                                if (data.dataBarang.length < 1) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        text: "Barang tidak masuk sub kategori PRINTING STARPAK PATCH.",
                                    });
                                } else {
                                    namaBarangPrintingStarpakPatchBawah.value = data.dataBarang[0].NAMA_BRG; //prettier-ignore
                                    input_ukuran.focus();
                                }
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Failed to load data Barang.",
                                });
                            }
                        },
                        error: function () {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to request data Barang.",
                            });
                        },
                    });
                    this.setCustomValidity("");
                }
                this.reportValidity();
            }
        },
    );

    input_ukuran.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_rajutan.focus();
        }
    });

    input_rajutan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_denier.focus();
        }
    });

    input_denier.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            //check jenis order kerja untuk menentukan mau fokus ke input mana
            if (jenisOrderKerja == "1") {
                input_innerWoven.focus();
            } else if (jenisOrderKerja == "2") {
                input_drumKliseStarpak.focus();
            }
        }
    });

    input_innerWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_kertasWoven.focus();
        }
    });

    input_kertasWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_potongWoven.focus();
        }
    });

    input_potongWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jahitAtasWoven.focus();
        }
    });

    input_jahitAtasWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jahitBawahWoven.focus();
        }
    });

    input_jahitBawahWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jumlahWarna.focus();
        }
    });

    input_drumKliseStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_panjangPotonganStarpak.focus();
        }
    });

    input_panjangPotonganStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_coronaStarpak.value = 2000;
            input_coronaStarpak.select();
        }
    });

    input_coronaStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_printMaxStarpak.value = parseInt(
                numeral(jumlahPesanan.value).value() / 0.95,
            );
            input_printMaxStarpak.select();
        }
    });

    input_printMaxStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_airPermeabilityStarpak.focus();
        }
    });

    input_airPermeabilityStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_rollStarpak.focus();
        }
    });

    input_rollStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_kertasStarpak.focus();
        }
    });

    input_kertasStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_innerStarpak.focus();
        }
    });

    input_innerStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_spoonBondStarpak.focus();
        }
    });

    input_spoonBondStarpak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jumlahWarna.focus();
        }
    });

    input_jumlahWarna.addEventListener("input", function () {
        const max = 8;
        const min = 0;
        let value = parseInt(this.value);
        const container = additionalInputs;

        // Clamp the value between 0 and 8
        if (isNaN(value)) value = 0;
        value = Math.min(Math.max(value, min), max);
        this.value = value;

        // Clear existing inputs
        container.innerHTML = "";

        // Generate inputs in two columns
        for (let i = 1; i <= value; i++) {
            const col = document.createElement("div");
            col.className = "col-md-6 mb-2";

            const input = document.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.placeholder = `Warna ${i}`;
            input.name = `warna_${i}`;
            input.id = `warna_${i}`;

            // If this is the last input, add keypress event for Enter
            if (i === value) {
                input.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission if inside a form
                        const txtArea =
                            document.getElementById("input_keterangan");
                        if (jenisOrderKerja == 1) {
                            txtArea.focus();
                        } else if (jenisOrderKerja == 2) {
                            input_rollStarpakPatchAtas.focus();
                        }
                    }
                });
            } else {
                input.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission if inside a form
                        const nextInput = document.getElementById(
                            `warna_${i + 1}`,
                        );
                        if (nextInput) nextInput.focus();
                    }
                });
            }

            col.appendChild(input);
            container.appendChild(col);
        }
    });

    input_jumlahWarna.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            corakPrinting.focus();
        }
    });

    corakPrinting.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (jenisOrderKerja == 1) {
                input_tanggalRencanaMulaiKerjaWoven.value =
                    "LIHAT SCHEDULE HARIAN";
                input_tanggalRencanaMulaiKerjaWoven.select();
            } else if (jenisOrderKerja == 2) {
                if (input_jumlahWarna.value > 0) {
                    document.getElementById("warna_1").focus();
                } else {
                    input_rollStarpakPatchAtas.focus();
                }
            }
        }
    });

    input_tanggalRencanaMulaiKerjaWoven.addEventListener(
        "keypress",
        function (e) {
            if (e.key == "Enter") {
                e.preventDefault();
                input_tanggalRencanaSelesaiKerjaWoven.value =
                    "SESUAI SCHEDULE PPIC";
                input_tanggalRencanaSelesaiKerjaWoven.select();
            }
        },
    );

    input_tanggalRencanaSelesaiKerjaWoven.addEventListener(
        "keypress",
        function (e) {
            if (e.key == "Enter") {
                e.preventDefault();
                input_warnaKarungWoven.focus();
            }
        },
    );

    input_warnaKarungWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (input_jumlahWarna.value > 0) {
                document.getElementById("warna_1").focus();
            } else {
                input_keterangan.focus();
            }
        }
    });

    input_rollStarpakPatchAtas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_drumKliseStarpakPatchAtas.focus();
        }
    });

    input_drumKliseStarpakPatchAtas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_coronaStarpakPatchAtas.value = 2000;
            input_coronaStarpakPatchAtas.select();
        }
    });

    input_coronaStarpakPatchAtas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jumlahPatchAtas.focus();
        }
    });

    input_jumlahPatchAtas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jumlahWarnaPatchAtas.select();
        }
    });

    input_jumlahWarnaPatchAtas.addEventListener("input", function () {
        const max = 8;
        const min = 0;
        let value = parseInt(this.value);
        const container = additionalInputsPatchAtas;

        // Clamp the value between 0 and 8
        if (isNaN(value)) value = 0;
        value = Math.min(Math.max(value, min), max);
        this.value = value;

        // Clear existing inputs
        container.innerHTML = "";

        // Generate inputs in two columns
        for (let i = 1; i <= value; i++) {
            const col = document.createElement("div");
            col.className = "col-md-6 mb-2";

            const input = document.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.placeholder = `Warna Patch ${i}`;
            input.name = `warna_patchAtas${i}`;
            input.id = `warna_patchAtas${i}`;

            // If this is the last input, add keypress event for Enter
            if (i === value) {
                input.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission if inside a form
                        input_rollStarpakPatchBawah.focus();
                    }
                });
            } else {
                input.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission if inside a form
                        const nextInput = document.getElementById(
                            `warna_patchAtas${i + 1}`,
                        );
                        if (nextInput) nextInput.focus();
                    }
                });
            }

            col.appendChild(input);
            container.appendChild(col);
        }
    });

    input_jumlahWarnaPatchAtas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            corakPrintingPatchAtas.focus();
        }
    });

    corakPrintingPatchAtas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (input_jumlahWarnaPatchAtas.value > 0) {
                document.getElementById("warna_patchAtas1").focus();
            } else {
                if (checkbox_patchIsEqual) {
                    input_keterangan.focus();
                } else {
                    input_rollStarpakPatchBawah.focus();
                }
            }
        }
    });

    checkbox_patchIsEqual.addEventListener("change", function () {
        if (this.checked) {
            kodeBarangPrintingStarpakPatchBawah.style.display = "none";
            namaBarangPrintingStarpakPatchBawah.style.display = "none";
            kodeBarangPrintingStarpakPatchAtas.placeholder = "KB Printing Starpak Patch"; //prettier-ignore
            namaBarangPrintingStarpakPatchAtas.placeholder = "Nama Barang Printing Starpak Patch"; //prettier-ignore
            title_starpakPatchAtas.innerHTML = "Patch";
            [div_rollPatchBawahStarpak, div_rollPatchBawahStarpak2].forEach(
                (el) => {
                    el.classList.remove("show-important");
                    el.classList.add("hide-important");
                },
            );
            [title_starpakPatchBawah].forEach((el) => {
                el.classList.remove("show-important-block");
                el.classList.add("hide-important");
            });
            label_rollStarpakPatchAtas.innerHTML = "Roll Patch";
            label_drumKliseStarpakPatchAtas.innerHTML = "Drum Klise Patch";
            label_coronaStarpakPatchAtas.innerHTML = "Corona Patch";
            label_jumlahPatchAtas.innerHTML = "Jumlah Patch";
            label_jumlahWarnaPatchAtas.innerHTML = "Jumlah Warna Patch";
            label_corakPrintingPatchAtas.innerHTML = "Corak Printing Patch";
        } else {
            kodeBarangPrintingStarpakPatchBawah.style.display = "block";
            namaBarangPrintingStarpakPatchBawah.style.display = "block";
            kodeBarangPrintingStarpakPatchAtas.placeholder = "KB Printing Starpak Patch Atas"; // prettier-ignore
            namaBarangPrintingStarpakPatchAtas.placeholder = "Nama Barang Printing Starpak Patch Atas"; // prettier-ignore
            title_starpakPatchAtas.innerHTML = "Patch Atas";
            [div_rollPatchBawahStarpak, div_rollPatchBawahStarpak2].forEach(
                (el) => {
                    el.classList.add("show-important");
                    el.classList.remove("hide-important");
                },
            );
            [title_starpakPatchBawah].forEach((el) => {
                el.classList.add("show-important-block");
                el.classList.remove("hide-important");
            });
            label_rollStarpakPatchAtas.innerHTML = "Roll Patch Atas";
            label_drumKliseStarpakPatchAtas.innerHTML = "Drum Klise Patch Atas";
            label_coronaStarpakPatchAtas.innerHTML = "Corona Patch Atas";
            label_jumlahPatchAtas.innerHTML = "Jumlah Patch Atas";
            label_jumlahWarnaPatchAtas.innerHTML = "Jumlah Warna Patch Atas";
            label_corakPrintingPatchAtas.innerHTML =
                "Corak Printing Patch Atas";
        }
    });

    input_rollStarpakPatchBawah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_drumKliseStarpakPatchBawah.focus();
        }
    });

    input_drumKliseStarpakPatchBawah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_coronaStarpakPatchBawah.value = 2000;
            input_coronaStarpakPatchBawah.select();
        }
    });

    input_coronaStarpakPatchBawah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jumlahPatchBawah.focus();
        }
    });

    input_jumlahPatchBawah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            input_jumlahWarnaPatchBawah.select();
        }
    });

    input_jumlahWarnaPatchBawah.addEventListener("input", function () {
        const max = 8;
        const min = 0;
        let value = parseInt(this.value);
        const container = additionalInputsPatchBawah;

        // Clamp the value between 0 and 8
        if (isNaN(value)) value = 0;
        value = Math.min(Math.max(value, min), max);
        this.value = value;

        // Clear existing inputs
        container.innerHTML = "";

        // Generate inputs in two columns
        for (let i = 1; i <= value; i++) {
            const col = document.createElement("div");
            col.className = "col-md-6 mb-2";

            const input = document.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.placeholder = `Warna Patch ${i}`;
            input.name = `warna_patchBawah${i}`;
            input.id = `warna_patchBawah${i}`;

            // If this is the last input, add keypress event for Enter
            if (i === value) {
                input.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission if inside a form
                        button_modalProses.focus();
                    }
                });
            } else {
                input.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission if inside a form
                        const nextInput = document.getElementById(
                            `warna_patchBawah${i + 1}`,
                        );
                        if (nextInput) nextInput.focus();
                    }
                });
            }

            col.appendChild(input);
            container.appendChild(col);
        }
    });

    input_jumlahWarnaPatchBawah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            corakPrintingPatchBawah.focus();
        }
    });

    corakPrintingPatchBawah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (input_jumlahWarnaPatchBawah.value > 0) {
                document.getElementById("warna_patchBawah1").focus();
            } else {
                input_keterangan.focus();
            }
        }
    });

    packingPalletWoven.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            gambar_contohPacking.focus();
        }
    });

    gambar_contohPacking.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
                previewImg.style.display = "block";
                previewImg.dataset.base64 = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    gambar_contohPacking.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            sisaSaldo.focus();
        }
    });

    clearImage.addEventListener("click", function () {
        gambar_contohPacking.value = "";
        previewImg.src = "#";
        previewImg.style.display = "none";
    });

    button_modalProses.addEventListener("click", function () {
        let warnaPrintingPatchAtas;
        let warnaPrintingPatchBawah;
        let kodeBarangSetengahJadiWoven;
        let packingWoven;
        // === VALIDASI INPUTAN ===
        if (!NomorOrderKerja.value.trim()) {
            Swal.fire("Error", "Nomor Order Kerja harus diisi.", "error");
            return;
        }

        if (suratPesananValue.value == null) {
            Swal.fire("Error", "Surat Pesanan harus dipilih.", "error");
            return;
        }

        if (!customerSuratPesanan.value) {
            Swal.fire("Error", "Customer harus diisi.", "error");
            return;
        }

        if (!jumlahPesanan.value || jumlahPesanan.value < 1) {
            Swal.fire("Error", "Jumlah Pesanan harus diisi.", "error");
            return;
        }

        if (!kodeBarangJadi.value) {
            Swal.fire("Error", "Kode Barang Jadi harus diisi.", "error");
            return;
        }

        if (!jenisOrderKerja) {
            Swal.fire("Error", "Jenis Order Kerja harus dipilih.", "error");
            return;
        }

        if (!input_ukuran.value) {
            Swal.fire("Error", "Ukuran tidak boleh kosong.", "error");
            input_ukuran.focus();
            return;
        } else {
            let value = input_ukuran.value.trim();
            // Supports:
            // 100 x 200
            // 50 x 57 + 16
            // 50 x 57 - 10
            // 10 + 10 x 10
            // 10 - 5 x 20
            let ukuranPattern =
                /^\d+(?:\.\d+)?(?:\s*[\+\-]\s*\d+(?:\.\d+)?)?\s*[xX]\s*\d+(?:\.\d+)?(?:\s*[\+\-]\s*\d+(?:\.\d+)?)?$/;
            // Breakdown of Regex:
            // \d+\s*[xX]\s*\d+     → base format (PANJANG X LEBAR)
            // (?:\s*[\+\-]\s*\d+)? → optional part with + or - and a number

            if (!ukuranPattern.test(value)) {
                Swal.fire(
                    "Error",
                    "Ukuran harus diisi sesuai format. Format harus PANJANG X LEBAR, contoh: 100 X 200.",
                    "error",
                );
                input_ukuran.focus();
                return;
            }
        }

        if (!input_rajutan.value) {
            Swal.fire("Error", "Rajutan tidak boleh kosong.", "error");
            input_rajutan.focus();
            return;
        } else {
            let value = input_rajutan.value.trim();
            // Supports:
            // 100 x 200
            // 50 x 57 + 16
            // 50 x 57 - 10
            // 10 + 10 x 10
            // 10 - 5 x 20
            let ukuranPattern =
                /^\d+(?:\.\d+)?(?:\s*[\+\-]\s*\d+(?:\.\d+)?)?\s*[xX]\s*\d+(?:\.\d+)?(?:\s*[\+\-]\s*\d+(?:\.\d+)?)?$/;
            // Breakdown of Regex:
            // \d+\s*[xX]\s*\d+     → base format (PANJANG X LEBAR)
            // (?:\s*[\+\-]\s*\d+)? → optional part with + or - and a number

            if (!ukuranPattern.test(value)) {
                Swal.fire(
                    "Error",
                    "Rajutan harus diisi sesuai format. Format harus WA X WE, contoh: 10 X 10.",
                    "error",
                );
                input_rajutan.focus();
                return;
            }
        }

        if (!input_jumlahWarna.value) {
            Swal.fire(
                "Error",
                "Jumlah Warna harus diisi, kalau tidak ada warna diisi 0.",
                "error",
            );
            return;
        }

        if (input_jumlahWarna.value > 0 && !corakPrinting.value.trim()) {
            Swal.fire("Error", "Corak Printing harus diisi.", "error");
            return;
        }

        // Validasi jenisOrderKerja khusus
        if (jenisOrderKerja == 1) {
            if (!packingSuratPesanan.value.trim()) {
                Swal.fire(
                    "Error",
                    "Packing Surat Pesanan harus diisi.",
                    "error",
                );
                return;
            }
            if (!input_potongWoven.value.trim()) {
                Swal.fire("Error", "Potong Woven harus diisi.", "error");
                return;
            }
            if (!input_jahitAtasWoven.value.trim()) {
                Swal.fire("Error", "Jahit Atas Woven harus diisi.", "error");
                return;
            }
            if (!input_jahitBawahWoven.value.trim()) {
                Swal.fire("Error", "Jahit Bawah Woven harus diisi.", "error");
                return;
            }
            if (!input_warnaKarungWoven.value.trim()) {
                Swal.fire("Error", "Warna Karung Woven harus diisi.", "error");
                return;
            }

            if (packingPalletWoven.value.trim()) {
                packingWoven =
                    packingSuratPesanan.value.trim() +
                    " | " +
                    packingPalletWoven.value.trim();
            } else {
                packingWoven = packingSuratPesanan.value.trim();
            }

            const containerKBWoven = document.getElementById(
                "additionalInputsKBWoven",
            );
            if (input_jumlahKodeBarangSetengahJadiWoven.value > 0) {
                const kbInputsPatch = containerKBWoven.querySelectorAll(
                    "input[id^='kodeBarangSetengahJadiWoven_']",
                );
                for (let i = 0; i < kbInputsPatch.length; i++) {
                    if (!kbInputsPatch[i].value.trim()) {
                        Swal.fire(
                            "Error",
                            `Kode Barang Setengah Jadi ${i + 1} harus diisi.`,
                            "error",
                        );
                        return;
                    }
                }
            }
            // === BANGUN DATA KODE BARANG SETENGAH JADI ===
            if (input_jumlahKodeBarangSetengahJadiWoven.value > 0) {
                const kbInputsPatch = containerKBWoven.querySelectorAll("input[id^='kodeBarangSetengahJadiWoven_']"); //prettier-ignore
                var kodeBarangSetengahJadiWovenArray = [];
                kbInputsPatch.forEach((input) => {
                    kodeBarangSetengahJadiWovenArray.push(input.value.trim());
                });
            }
        } else if (jenisOrderKerja == 2) {
            if (checkbox_patchIsEqual.checked) {
                kodeBarangPrintingStarpakPatchBawah.value = kodeBarangPrintingStarpakPatchAtas.value; //prettier-ignore
                input_rollStarpakPatchBawah.value =
                    input_rollStarpakPatchAtas.value;
                input_drumKliseStarpakPatchBawah.value = input_drumKliseStarpakPatchAtas.value; //prettier-ignore
                input_coronaStarpakPatchBawah.value = input_coronaStarpakPatchAtas.value; //prettier-ignore
                input_jumlahPatchBawah.value = input_jumlahPatchAtas.value;
                corakPrintingPatchBawah.value = corakPrintingPatchAtas.value;
                // samakan jumlah warna patch bawah dengan atas, lalu copy warna patch atas ke bawah
                if (input_jumlahWarnaPatchAtas.value > 0) {
                    input_jumlahWarnaPatchBawah.value =
                        input_jumlahWarnaPatchAtas.value;
                    input_jumlahWarnaPatchBawah.dispatchEvent(
                        new Event("input"),
                    );
                    for (
                        let i = 1;
                        i <= input_jumlahWarnaPatchAtas.value;
                        i++
                    ) {
                        document.getElementById(`warna_patchBawah${i}`).value =
                            document.getElementById(
                                `warna_patchAtas${i}`,
                            ).value;
                    }
                }
            }

            if (!input_rollStarpak.value.trim()) {
                Swal.fire("Error", "Roll Body Starpak harus diisi.", "error");
                return;
            }
            if (!input_drumKliseStarpak.value.trim()) {
                Swal.fire("Error", "Drum Klise Starpak harus diisi.", "error");
                return;
            }
            if (!input_panjangPotonganStarpak.value.trim()) {
                Swal.fire(
                    "Error",
                    "Panjang Potongan Starpak harus diisi.",
                    "error",
                );
                return;
            }
            if (!input_coronaStarpak.value.trim()) {
                Swal.fire("Error", "Corona Starpak harus diisi.", "error");
                return;
            }
            if (!input_printMaxStarpak.value.trim()) {
                Swal.fire("Error", "Print Max Starpak harus diisi.", "error");
                return;
            }
            if (!input_airPermeabilityStarpak.value.trim()) {
                Swal.fire(
                    "Error",
                    "Air Permeability Starpak harus diisi.",
                    "error",
                );
                return;
            }
            if (!input_rollStarpakPatchAtas.value.trim()) {
                Swal.fire(
                    "Error",
                    "Roll Patch Atas Starpak harus diisi.",
                    "error",
                );
                return;
            }
            if (
                (kodeBarangPrintingStarpakPatchAtas.value.trim() &&
                    !kodeBarangPrintingStarpakPatchBawah.value.trim()) ||
                (!kodeBarangPrintingStarpakPatchAtas.value.trim() &&
                    kodeBarangPrintingStarpakPatchBawah.value.trim())
            ) {
                Swal.fire(
                    "Error",
                    "Kode Barang Printing Patch Atas dan Bawah Starpak harus diisi bersamaan.",
                    "error",
                );
                return;
            }
            if (
                input_jumlahWarnaPatchAtas.value > 0 &&
                !corakPrintingPatchAtas.value.trim()
            ) {
                Swal.fire(
                    "Error",
                    "Corak Printing Patch Atas harus diisi.",
                    "error",
                );
                return;
            }
            if (!input_coronaStarpakPatchAtas.value.trim()) {
                Swal.fire(
                    "Error",
                    "Corona Patch Starpak harus diisi.",
                    "error",
                );
                return;
            }
            if (
                input_jumlahWarnaPatchAtas.value > 0 &&
                !input_jumlahPatchAtas.value.trim()
            ) {
                Swal.fire("Error", "Jumlah Patch Atas harus diisi.", "error");
                return;
            }

            warnaPrintingPatchAtas = input_jumlahWarnaPatchAtas.value;
            const containerPatchAtas = document.getElementById(
                "additionalInputsPatchAtas",
            );
            if (warnaPrintingPatchAtas > 0) {
                const warnaInputsPatch = containerPatchAtas.querySelectorAll(
                    "input[id^='warna_patchAtas']",
                );
                for (let i = 0; i < warnaInputsPatch.length; i++) {
                    if (!warnaInputsPatch[i].value.trim()) {
                        Swal.fire(
                            "Error",
                            `Warna ${i + 1} harus diisi.`,
                            "error",
                        );
                        return;
                    }
                }
            }
            // === BANGUN DATA WARNA PATCH ATAS ===
            if (warnaPrintingPatchAtas > 0) {
                const warnaInputsPatch = containerPatchAtas.querySelectorAll("input[id^='warna_patchAtas']"); //prettier-ignore
                warnaInputsPatch.forEach((input) => {
                    warnaPrintingPatchAtas += " | " + input.value.trim();
                });
            }
            if (!input_rollStarpakPatchBawah.value.trim()) {
                Swal.fire(
                    "Error",
                    "Roll Patch Bawah Starpak harus diisi.",
                    "error",
                );
                return;
            }
            if (
                input_jumlahWarnaPatchBawah.value > 0 &&
                !corakPrintingPatchBawah.value.trim()
            ) {
                Swal.fire(
                    "Error",
                    "Corak Printing Patch Bawah harus diisi.",
                    "error",
                );
                return;
            }
            if (!input_coronaStarpakPatchBawah.value.trim()) {
                Swal.fire(
                    "Error",
                    "Corona Patch Starpak harus diisi.",
                    "error",
                );
                return;
            }
            if (
                input_jumlahWarnaPatchBawah.value > 0 &&
                !input_jumlahPatchBawah.value.trim()
            ) {
                Swal.fire("Error", "Jumlah Patch Bawah harus diisi.", "error");
                return;
            }

            warnaPrintingPatchBawah = input_jumlahWarnaPatchBawah.value;
            const containerPatchBawah = document.getElementById(
                "additionalInputsPatchBawah",
            );
            if (warnaPrintingPatchBawah > 0) {
                const warnaInputsPatch = containerPatchBawah.querySelectorAll(
                    "input[id^='warna_patchBawah']",
                );
                for (let i = 0; i < warnaInputsPatch.length; i++) {
                    if (!warnaInputsPatch[i].value.trim()) {
                        Swal.fire(
                            "Error",
                            `Warna ${i + 1} harus diisi.`,
                            "error",
                        );
                        return;
                    }
                }
            }
            // === BANGUN DATA WARNA PATCH BAWAH ===
            if (warnaPrintingPatchBawah > 0) {
                const warnaInputsPatch = containerPatchBawah.querySelectorAll("input[id^='warna_patchBawah']"); //prettier-ignore
                warnaInputsPatch.forEach((input) => {
                    warnaPrintingPatchBawah += " | " + input.value.trim();
                });
            }
        }

        // Validasi warna jika jumlah > 0
        let warnaPrinting = input_jumlahWarna.value;
        const container = document.getElementById("additionalInputs");
        if (warnaPrinting > 0) {
            const warnaInputs = container.querySelectorAll(
                "input[id^='warna_']",
            );
            for (let i = 0; i < warnaInputs.length; i++) {
                if (!warnaInputs[i].value.trim()) {
                    Swal.fire("Error", `Warna ${i + 1} harus diisi.`, "error");
                    return;
                }
            }
        }

        // === BANGUN DATA WARNA ===
        if (warnaPrinting > 0) {
            const warnaInputs = container.querySelectorAll("input[id^='warna_']"); //prettier-ignore
            warnaInputs.forEach((input) => {
                warnaPrinting += " | " + input.value.trim();
            });
        }

        // get data-id button_modalProses
        let idOrder = $("#button_modalProses").data("id");

        //proses input
        let formData = new FormData();
        formData.append("jenisStore", idOrder ? "editOrderKerja" : "storeOrderKerja"); // prettier-ignore
        formData.append("idOrder", idOrder); // prettier-ignore
        formData.append("NomorOrderKerja", NomorOrderKerja.value); // prettier-ignore
        formData.append("TanggalRencanaMulaiKerja", input_tanggalRencanaMulaiKerjaWoven.value); // prettier-ignore
        formData.append("TanggalRencanaSelesaiKerja", input_tanggalRencanaSelesaiKerjaWoven.value); // prettier-ignore
        formData.append("SisaSaldoInventory", sisaSaldo.value); // prettier-ignore
        if (pakaiMemo) {
            let dataMemo =
                suratPesananValue.value +
                " | " +
                customerSuratPesanan.value +
                " | " +
                jumlahPesanan.value +
                " | " +
                kodeBarangJadi.value;
            formData.append("DataMemo", dataMemo); // prettier-ignore
        } else {
            formData.append("IDPesanan", suratPesananValue.value); // prettier-ignore
        }
        formData.append("JenisOK", jenisOrderKerja); // prettier-ignore
        formData.append("KBPrintingWoven", kodeBarangPrintingWoven.value); // prettier-ignore
        formData.append("KBBalikLamiWoven", kodeBarangBalikLamiWoven.value); // prettier-ignore
        formData.append("JumlahKBStghJadi", input_jumlahKodeBarangSetengahJadiWoven.value); // prettier-ignore
        formData.append(
            "KBSetengahJadiWovenArray",
            JSON.stringify(kodeBarangSetengahJadiWovenArray),
        ); // array should be stringified
        formData.append("WarnaPrinting", warnaPrinting); // prettier-ignore
        formData.append("CorakPrinting", corakPrinting.value); // prettier-ignore
        formData.append("KBPrintingStarpak", kodeBarangPrintingStarpak.value); // prettier-ignore
        formData.append("KBPrintingStarpakPatchAtas", kodeBarangPrintingStarpakPatchAtas.value); // prettier-ignore
        formData.append("KBPrintingStarpakPatchBawah", kodeBarangPrintingStarpakPatchBawah.value); // prettier-ignore
        formData.append("Ukuran", input_ukuran.value); // prettier-ignore
        formData.append("Rajutan", input_rajutan.value); // prettier-ignore
        formData.append("Denier", input_denier.value); // prettier-ignore
        formData.append("Packing", packingWoven ?? ""); // prettier-ignore
        formData.append("WarnaKarungWoven", input_warnaKarungWoven.value); // prettier-ignore
        formData.append("PotongWoven", input_potongWoven.value); // prettier-ignore
        formData.append("InnerWoven", input_innerWoven.value); // prettier-ignore
        formData.append("KertasWoven", input_kertasWoven.value); // prettier-ignore
        formData.append("JahitAtasWoven", input_jahitAtasWoven.value); // prettier-ignore
        formData.append("JahitBawahWoven", input_jahitBawahWoven.value); // prettier-ignore
        formData.append("DrumKliseStarpak", input_drumKliseStarpak.value); // prettier-ignore
        formData.append("PanjangPotongStarpak", input_panjangPotonganStarpak.value); // prettier-ignore
        formData.append("CoronaStarpak", input_coronaStarpak.value); // prettier-ignore
        formData.append("AirPermeabilityStarpak", input_airPermeabilityStarpak.value); // prettier-ignore
        formData.append("PrintMaxStarpak", input_printMaxStarpak.value); // prettier-ignore
        formData.append("RollStarpak", input_rollStarpak.value); // prettier-ignore
        formData.append("KertasStarpak", input_kertasStarpak.value); // prettier-ignore
        formData.append("InnerStarpak", input_innerStarpak.value); // prettier-ignore
        formData.append("SpoonBondStarpak", input_spoonBondStarpak.value); // prettier-ignore
        formData.append("Keterangan", input_keterangan.value); // prettier-ignore
        if (gambar_contohPacking.files.length > 0) {
            // User selected a new file, append it
            formData.append(
                "gambar_contohPacking",
                gambar_contohPacking.files[0],
            );
        } else {
            // No new file selected, send existing Base64 (if available)
            formData.append("gambar_contohPacking_existing", base64Image || "");
        }
        formData.append("RollPatchAtas", input_rollStarpakPatchAtas.value); // prettier-ignore
        formData.append("DrumKliseStarpakPatchAtas", input_drumKliseStarpakPatchAtas.value); // prettier-ignore
        formData.append("corakPrintingPatchAtas", corakPrintingPatchAtas.value); // prettier-ignore
        formData.append("WarnaPrintingPatchAtas", warnaPrintingPatchAtas); // prettier-ignore
        formData.append("JumlahPatchAtas", input_jumlahPatchAtas.value); // prettier-ignore
        formData.append("CoronaPatchAtas", input_coronaStarpakPatchAtas.value); // prettier-ignore
        formData.append("RollPatchBawah", input_rollStarpakPatchBawah.value); // prettier-ignore
        formData.append("DrumKliseStarpakPatchBawah", input_drumKliseStarpakPatchBawah.value); // prettier-ignore
        formData.append("corakPrintingPatchBawah", corakPrintingPatchBawah.value); // prettier-ignore
        formData.append("WarnaPrintingPatchBawah", warnaPrintingPatchBawah); // prettier-ignore
        formData.append("JumlahPatchBawah", input_jumlahPatchBawah.value); // prettier-ignore
        formData.append("CoronaPatchBawah", input_coronaStarpakPatchBawah.value); // prettier-ignore
        formData.append("_token", csrfToken); // prettier-ignore

        $.ajax({
            url: "/MaintenanceOrderKerjaABM",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (data) {
                if (data.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: data.error,
                    });
                } else {
                    table_orderKerja.ajax.reload();
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: data.success,
                    });
                    $("#tambahPermohonanOrderKerjaModal").modal("hide");
                }
            },
            error: function (xhr, status, error) {
                let errorMessage = "Terjadi kesalahan saat memproses data.";
                if (xhr.responseText) {
                    try {
                        const json = JSON.parse(xhr.responseText);
                        if (json.message) {
                            errorMessage = json.message;
                        } else {
                            errorMessage = xhr.responseText;
                        }
                    } catch (e) {
                        errorMessage = xhr.responseText;
                    }
                }

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: errorMessage,
                });

                console.error("AJAX Error:", {
                    status: status,
                    error: error,
                    response: xhr.responseText,
                });
            },
        });
    });

    // table_orderKerja.on("click", "tbody tr", function () {
    //     let data = table_orderKerja.row(this).data();
    //     console.log(data);

    //     alert("You clicked on " + data.NomorOrderKerja + "'s row");
    // });

    $(document).on("click", ".btn-print", function (e) {
        var rowID = $(this).data("id");
        idOrder = rowID.split(" | ")[0];
        jenisOK = rowID.split(" | ")[1];
        console.log(rowID);

        // Open new tab directly
        window.open(
            `/MaintenanceOrderKerjaABM/printOrderKerja?idOrder=${idOrder}&jenisOK=${jenisOK}`,
            "_blank",
        );
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        tambahPermohonanOrderKerjaLabel.textContent = "Edit Order Kerja " + rowID.split(" | ")[2]; // prettier-ignore
        idOrder = rowID.split(" | ")[0];
        jenisOK = rowID.split(" | ")[1];
        $("#button_modalProses").data("id", idOrder);
        clearAll();
        $.ajax({
            url: "/MaintenanceOrderKerjaABM/getDetailOrderKerja",
            data: {
                IdOrderKerja: idOrder,
                JenisOK: jenisOK,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                console.log(response.dataDetailOrderKerja);
                if (response.dataDetailOrderKerja) {
                    let packingSplit = response.dataDetailOrderKerja[0].Packing?.split(" | ") ?? []; //prettier-ignore
                    select_jenisOrderKerja
                        .val(response.dataDetailOrderKerja[0].JenisOK)
                        .trigger("change")
                        .trigger("select2:select");
                    NomorOrderKerja.value = response.dataDetailOrderKerja[0].No_OK; //prettier-ignore
                    customerSuratPesanan.value = response.dataDetailOrderKerja[0].NamaCust; //prettier-ignore
                    jumlahPesanan.value = response.dataDetailOrderKerja[0].Qty;
                    kodeBarangJadi.value = response.dataDetailOrderKerja[0].KodeBarang; //prettier-ignore
                    sisaSaldo.value = response.dataDetailOrderKerja[0].SisaSaldoInventory; //prettier-ignore
                    packingSuratPesanan.value = packingSplit[0] ?? ""; //prettier-ignore
                    namaBarang.textContent = response.dataDetailOrderKerja[0].NAMA_BRG; //prettier-ignore
                    if (response.dataDetailOrderKerja[0].IdPesanan) {
                        select_suratPesananTujuan.append(
                            new Option(response.dataDetailOrderKerja[0].IDSuratPesanan + ' | ' + response.dataDetailOrderKerja[0].KodeBarang, response.dataDetailOrderKerja[0].IdPesanan), // prettier-ignore
                        );
                        select_suratPesananTujuan
                            .val(response.dataDetailOrderKerja[0].IdPesanan)
                            .trigger("change")
                            .trigger("select2:select");
                    } else if (response.dataDetailOrderKerja[0].DataMemo) {
                        let dataMemoEdit =
                            response.dataDetailOrderKerja[0].DataMemo.split(
                                " | ",
                            );
                        pakaiMemo = true;
                        select_suratPesananTujuan.parent().hide();
                        suratPesananValue.readOnly = true;
                        suratPesananValue.classList.remove("hide-important");
                        suratPesananValue.classList.add("show-important-block");
                        suratPesananValue.value = dataMemoEdit[0];
                        customerSuratPesanan.value = dataMemoEdit[1];
                        jumlahPesanan.value = dataMemoEdit[2];
                        kodeBarangJadi.value = dataMemoEdit[3];
                        namaBarang.textContent = response.dataDetailOrderKerja[0].NamaBarangMemo; //prettier-ignore
                    }
                    input_ukuran.value = response.dataDetailOrderKerja[0].Ukuran; //prettier-ignore
                    input_rajutan.value = response.dataDetailOrderKerja[0].Rajutan; //prettier-ignore
                    input_denier.value = response.dataDetailOrderKerja[0].Denier; //prettier-ignore

                    if (jenisOrderKerja == 1) {
                        kodeBarangPrintingWoven.readOnly = true;
                        kodeBarangBalikLamiWoven.readOnly = true;
                        kodeBarangPrintingWoven.value = response.dataDetailOrderKerja[0].KBPrintingWoven; //prettier-ignore
                        kodeBarangBalikLamiWoven.value = response.dataDetailOrderKerja[0].KBBalikLamiWoven; //prettier-ignore
                        namaBarangPrintingWoven.value = response.dataDetailOrderKerja[0].NamaBarangWovenPrinting; //prettier-ignore
                        let jumlahKBSetJadi = response.dataDetailOrderKerja[0].JumlahKBStghJadi || 0; //prettier-ignore
                        input_jumlahKodeBarangSetengahJadiWoven.readOnly = true;

                        input_jumlahKodeBarangSetengahJadiWoven.value = jumlahKBSetJadi; // prettier-ignore
                        input_jumlahKodeBarangSetengahJadiWoven.dispatchEvent(
                            new Event("input"),
                        );
                        if (jumlahKBSetJadi > 0) {
                            for (let i = 0; i <= jumlahKBSetJadi; i++) {
                                let kbInput = document.getElementById(
                                    `kodeBarangSetengahJadiWoven_${i + 1}`,
                                );
                                let namabrgInput = document.getElementById(
                                    `namaBarangSetengahJadiWoven_${i + 1}`,
                                );
                                if (kbInput) {
                                    // Construct the property name dynamically
                                    let propName =
                                        i === 0
                                            ? "KBSetengahJadiWoven"
                                            : `KBSetengahJadiWoven${i}`;
                                    kbInput.value =
                                        response.dataDetailOrderKerja[0][
                                            propName
                                        ] || "";
                                }
                                if (namabrgInput) {
                                    // Construct the property name dynamically
                                    let propName =
                                        i === 0
                                            ? "NamaBarangWovenSetengahJadi"
                                            : `NamaBarangWovenSetengahJadi${i}`;
                                    namabrgInput.value =
                                        response.dataDetailOrderKerja[0][
                                            propName
                                        ] || "";
                                }
                            }
                        }

                        input_potongWoven.value = response.dataDetailOrderKerja[0].PotongWoven; //prettier-ignore
                        input_innerWoven.value = response.dataDetailOrderKerja[0].InnerWoven // prettier-ignore
                        input_kertasWoven.value = response.dataDetailOrderKerja[0].KertasWoven // prettier-ignore
                        input_jahitAtasWoven.value = response.dataDetailOrderKerja[0].JahitAtasWoven; //prettier-ignore
                        input_jahitBawahWoven.value = response.dataDetailOrderKerja[0].JahitBawahWoven; //prettier-ignore
                        input_warnaKarungWoven.value = response.dataDetailOrderKerja[0].WarnaKarungWoven; //prettier-ignore
                        input_tanggalRencanaMulaiKerjaWoven.value = response.dataDetailOrderKerja[0].TanggalRencanaMulaiKerja; //prettier-ignore
                        input_tanggalRencanaSelesaiKerjaWoven.value = response.dataDetailOrderKerja[0].TanggalRencanaSelesaiKerja; //prettier-ignore
                        input_keterangan.value = response.dataDetailOrderKerja[0].Keterangan; //prettier-ignore
                        packingPalletWoven.value = packingSplit[1] ?? ''; //prettier-ignore
                        base64Image = response.dataDetailOrderKerja[0].ContohPacking; //prettier-ignore

                        if (base64Image) {
                            previewImg.src = `data:image/png;base64,${base64Image}`;
                            previewImg.style.display = "block";
                        }
                    } else if (jenisOrderKerja == 2) {
                        kodeBarangPrintingStarpak.readOnly = true;
                        kodeBarangPrintingStarpakPatchAtas.readOnly = true;
                        kodeBarangPrintingStarpakPatchBawah.readOnly = true;
                        kodeBarangPrintingStarpak.value = response.dataDetailOrderKerja[0].KBPrintingStarpak; //prettier-ignore
                        namaBarangPrintingStarpak.value = response.dataDetailOrderKerja[0].NamaBarangStarpakPrinting; //prettier-ignore
                        kodeBarangPrintingStarpakPatchAtas.value = response.dataDetailOrderKerja[0].KBPrintingStarpakPatchAtas; //prettier-ignore
                        namaBarangPrintingStarpakPatchAtas.value = response.dataDetailOrderKerja[0].NamaBarangStarpakPrintingPatchAtas; //prettier-ignore
                        kodeBarangPrintingStarpakPatchBawah.value = response.dataDetailOrderKerja[0].KBPrintingStarpakPatchBawah; //prettier-ignore
                        namaBarangPrintingStarpakPatchBawah.value = response.dataDetailOrderKerja[0].NamaBarangStarpakPrintingPatchBawah; //prettier-ignore
                        input_drumKliseStarpak.value = response.dataDetailOrderKerja[0].DrumKliseStarpak; //prettier-ignore
                        input_panjangPotonganStarpak.value = response.dataDetailOrderKerja[0].PanjangPotongStarpak; //prettier-ignore
                        input_coronaStarpak.value = response.dataDetailOrderKerja[0].CoronaStarpak; //prettier-ignore
                        input_printMaxStarpak.value = response.dataDetailOrderKerja[0].PrintMaxStarpak; //prettier-ignore
                        input_airPermeabilityStarpak.value = response.dataDetailOrderKerja[0].AirPermeabilityStarpak; //prettier-ignore
                        input_rollStarpak.value = response.dataDetailOrderKerja[0].RollStarpak; //prettier-ignore
                        input_kertasStarpak.value = response.dataDetailOrderKerja[0].KertasStarpak //prettier-ignore
                        input_innerStarpak.value = response.dataDetailOrderKerja[0].InnerStarpak //prettier-ignore
                        input_spoonBondStarpak.value = response.dataDetailOrderKerja[0].SpoonBondStarpak //prettier-ignore
                        input_rollStarpakPatchAtas.value =response.dataDetailOrderKerja[0].RollPatchAtas //prettier-ignore
                        input_drumKliseStarpakPatchAtas.value = response.dataDetailOrderKerja[0].DrumKliseStarpakPatchAtas //prettier-ignore
                        input_coronaStarpakPatchAtas.value = response.dataDetailOrderKerja[0].CoronaPatchAtas //prettier-ignore
                        input_jumlahPatchAtas.value = response.dataDetailOrderKerja[0].JumlahPatchAtas //prettier-ignore
                        let dataWarnaPatchAtas = response.dataDetailOrderKerja?.[0]?.WarnaPrintingPatchAtas?.split(" | ") || []; //prettier-ignore
                        input_jumlahWarnaPatchAtas.value = dataWarnaPatchAtas[0] ?? 0; // prettier-ignore
                        input_jumlahWarnaPatchAtas.dispatchEvent(new Event("input")); // prettier-ignore
                        if (input_jumlahWarnaPatchAtas.value > 0) {
                            for (let i = 1; i <= dataWarnaPatchAtas[0]; i++) {
                                let warnaInput = document.getElementById(`warna_patchAtas${i}`); // prettier-ignore
                                if (warnaInput) {
                                    // Data warna starts from index 1 in dataWarnaPatchAtas array
                                    warnaInput.value = dataWarnaPatchAtas[i] || ""; // prettier-ignore
                                }
                            }
                        }
                        corakPrintingPatchAtas.value =response.dataDetailOrderKerja[0].CorakPrintingPatchAtas //prettier-ignore

                        input_rollStarpakPatchBawah.value =response.dataDetailOrderKerja[0].RollPatchBawah //prettier-ignore
                        input_drumKliseStarpakPatchBawah.value = response.dataDetailOrderKerja[0].DrumKliseStarpakPatchBawah //prettier-ignore
                        input_coronaStarpakPatchBawah.value = response.dataDetailOrderKerja[0].CoronaPatchBawah //prettier-ignore
                        input_jumlahPatchBawah.value = response.dataDetailOrderKerja[0].JumlahPatchBawah //prettier-ignore
                        let dataWarnaPatchBawah = response.dataDetailOrderKerja?.[0]?.WarnaPrintingPatchBawah?.split(" | ") || []; //prettier-ignore
                        input_jumlahWarnaPatchBawah.value = dataWarnaPatchBawah[0] ?? 0; // prettier-ignore
                        input_jumlahWarnaPatchBawah.dispatchEvent(new Event("input")); // prettier-ignore
                        if (input_jumlahWarnaPatchBawah.value > 0) {
                            for (let i = 1; i <= dataWarnaPatchBawah[0]; i++) {
                                let warnaInput = document.getElementById(`warna_patchBawah${i}`); // prettier-ignore
                                if (warnaInput) {
                                    // Data warna starts from index 1 in dataWarnaPatchBawah array
                                    warnaInput.value = dataWarnaPatchBawah[i] || ""; // prettier-ignore
                                }
                            }
                        }
                        corakPrintingPatchBawah.value =response.dataDetailOrderKerja[0].CorakPrintingPatchBawah //prettier-ignore
                    }

                    let dataWarna = response.dataDetailOrderKerja?.[0]?.WarnaPrinting?.split(" | ") || []; //prettier-ignore
                    input_jumlahWarna.value = dataWarna[0] ?? 0;
                    input_jumlahWarna.dispatchEvent(new Event("input"));
                    if (input_jumlahWarna.value > 0) {
                        for (let i = 1; i <= dataWarna[0]; i++) {
                            let warnaInput = document.getElementById(
                                `warna_${i}`,
                            );
                            if (warnaInput) {
                                // Data warna starts from index 1 in dataWarna array
                                warnaInput.value = dataWarna[i] || "";
                            }
                        }
                    }
                    corakPrinting.value = response.dataDetailOrderKerja[0].CorakPrinting; //prettier-ignore

                    NomorOrderKerja.disabled = true;
                    select_suratPesananTujuan.prop("disabled", true);
                    select_jenisOrderKerja.prop("disabled", true);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan!",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-copy", function (e) {
        var rowID = $(this).data("id");
        tambahPermohonanOrderKerjaLabel.textContent =
            "Copy Order Kerja " + rowID.split(" | ")[2];
        idOrder = rowID.split(" | ")[0];
        jenisOK = rowID.split(" | ")[1];
        $("#button_modalProses").data("id", null);
        clearAll();
        $.ajax({
            url: "/MaintenanceOrderKerjaABM/getDetailOrderKerja",
            data: {
                IdOrderKerja: idOrder,
                JenisOK: jenisOK,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                console.log(response.dataDetailOrderKerja);
                if (response.dataDetailOrderKerja) {
                    let packingSplit = response.dataDetailOrderKerja[0].Packing?.split(" | ") ?? []; //prettier-ignore
                    select_jenisOrderKerja
                        .val(response.dataDetailOrderKerja[0].JenisOK)
                        .trigger("change")
                        .trigger("select2:select");
                    select_suratPesananTujuan.empty();
                    select_suratPesananTujuan.val(null).trigger("change");
                    sisaSaldo.value = response.dataDetailOrderKerja[0].SisaSaldoInventory; //prettier-ignore
                    packingSuratPesanan.value = packingSplit[0] ?? ""; //prettier-ignore
                    input_ukuran.value = response.dataDetailOrderKerja[0].Ukuran; //prettier-ignore
                    input_rajutan.value = response.dataDetailOrderKerja[0].Rajutan; //prettier-ignore
                    input_denier.value = response.dataDetailOrderKerja[0].Denier; //prettier-ignore

                    if (jenisOrderKerja == 1) {
                        kodeBarangPrintingWoven.readOnly = true;
                        kodeBarangBalikLamiWoven.readOnly = true;
                        kodeBarangPrintingWoven.value = response.dataDetailOrderKerja[0].KBPrintingWoven; //prettier-ignore
                        kodeBarangBalikLamiWoven.value = response.dataDetailOrderKerja[0].KBBalikLamiWoven; //prettier-ignore
                        namaBarangPrintingWoven.value = response.dataDetailOrderKerja[0].NamaBarangWovenPrinting; //prettier-ignore
                        let jumlahKBSetJadi = response.dataDetailOrderKerja[0].JumlahKBStghJadi || 0; //prettier-ignore
                        input_jumlahKodeBarangSetengahJadiWoven.readOnly = true;

                        input_jumlahKodeBarangSetengahJadiWoven.value = jumlahKBSetJadi; // prettier-ignore
                        input_jumlahKodeBarangSetengahJadiWoven.dispatchEvent(
                            new Event("input"),
                        );
                        if (jumlahKBSetJadi > 0) {
                            for (let i = 0; i <= jumlahKBSetJadi; i++) {
                                let kbInput = document.getElementById(
                                    `kodeBarangSetengahJadiWoven_${i + 1}`,
                                );
                                let namabrgInput = document.getElementById(
                                    `namaBarangSetengahJadiWoven_${i + 1}`,
                                );
                                if (kbInput) {
                                    // Construct the property name dynamically
                                    let propName =
                                        i === 0
                                            ? "KBSetengahJadiWoven"
                                            : `KBSetengahJadiWoven${i}`;
                                    kbInput.value =
                                        response.dataDetailOrderKerja[0][
                                            propName
                                        ] || "";
                                }
                                if (namabrgInput) {
                                    // Construct the property name dynamically
                                    let propName =
                                        i === 0
                                            ? "NamaBarangWovenSetengahJadi"
                                            : `NamaBarangWovenSetengahJadi${i}`;
                                    namabrgInput.value =
                                        response.dataDetailOrderKerja[0][
                                            propName
                                        ] || "";
                                }
                            }
                        }

                        input_potongWoven.value = response.dataDetailOrderKerja[0].PotongWoven; //prettier-ignore
                        input_innerWoven.value = response.dataDetailOrderKerja[0].InnerWoven // prettier-ignore
                        input_kertasWoven.value = response.dataDetailOrderKerja[0].KertasWoven // prettier-ignore
                        input_jahitAtasWoven.value = response.dataDetailOrderKerja[0].JahitAtasWoven; //prettier-ignore
                        input_jahitBawahWoven.value = response.dataDetailOrderKerja[0].JahitBawahWoven; //prettier-ignore
                        input_warnaKarungWoven.value = response.dataDetailOrderKerja[0].WarnaKarungWoven; //prettier-ignore
                        input_tanggalRencanaMulaiKerjaWoven.value = response.dataDetailOrderKerja[0].TanggalRencanaMulaiKerja; //prettier-ignore
                        input_tanggalRencanaSelesaiKerjaWoven.value = response.dataDetailOrderKerja[0].TanggalRencanaSelesaiKerja; //prettier-ignore
                        packingPalletWoven.value = packingSplit[1] ?? ''; //prettier-ignore
                        base64Image = response.dataDetailOrderKerja[0].ContohPacking; //prettier-ignore

                        if (base64Image) {
                            previewImg.src = `data:image/png;base64,${base64Image}`;
                            previewImg.style.display = "block";
                        }
                    } else if (jenisOrderKerja == 2) {
                        kodeBarangPrintingStarpak.readOnly = true;
                        kodeBarangPrintingStarpakPatchAtas.readOnly = true;
                        kodeBarangPrintingStarpak.value = response.dataDetailOrderKerja[0].KBPrintingStarpak; //prettier-ignore
                        namaBarangPrintingStarpak.value = response.dataDetailOrderKerja[0].NamaBarangStarpakPrinting; //prettier-ignore
                        kodeBarangPrintingStarpakPatchAtas.value = response.dataDetailOrderKerja[0].KBPrintingStarpakPatchAtas; //prettier-ignore
                        namaBarangPrintingStarpakPatchAtas.value = response.dataDetailOrderKerja[0].NamaBarangStarpakPrintingPatchAtas; //prettier-ignore
                        kodeBarangPrintingStarpakPatchBawah.value = response.dataDetailOrderKerja[0].KBPrintingStarpakPatchBawah; //prettier-ignore
                        namaBarangPrintingStarpakPatchBawah.value = response.dataDetailOrderKerja[0].NamaBarangStarpakPrintingPatchBawah; //prettier-ignore
                        input_drumKliseStarpak.value = response.dataDetailOrderKerja[0].DrumKliseStarpak; //prettier-ignore
                        input_panjangPotonganStarpak.value = response.dataDetailOrderKerja[0].PanjangPotongStarpak; //prettier-ignore
                        input_coronaStarpak.value = response.dataDetailOrderKerja[0].CoronaStarpak; //prettier-ignore
                        input_printMaxStarpak.value = response.dataDetailOrderKerja[0].PrintMaxStarpak; //prettier-ignore
                        input_airPermeabilityStarpak.value = response.dataDetailOrderKerja[0].AirPermeabilityStarpak; //prettier-ignore
                        input_rollStarpak.value = response.dataDetailOrderKerja[0].RollStarpak; //prettier-ignore
                        input_kertasStarpak.value = response.dataDetailOrderKerja[0].KertasStarpak //prettier-ignore
                        input_innerStarpak.value = response.dataDetailOrderKerja[0].InnerStarpak //prettier-ignore
                        input_spoonBondStarpak.value = response.dataDetailOrderKerja[0].SpoonBondStarpak //prettier-ignore
                        input_rollStarpakPatchAtas.value =response.dataDetailOrderKerja[0].RollPatchAtas //prettier-ignore
                        input_drumKliseStarpakPatchAtas.value = response.dataDetailOrderKerja[0].DrumKliseStarpakPatchAtas //prettier-ignore
                        input_coronaStarpakPatchAtas.value = response.dataDetailOrderKerja[0].CoronaPatchAtas //prettier-ignore
                        input_jumlahPatchAtas.value = response.dataDetailOrderKerja[0].JumlahPatchAtas //prettier-ignore
                        let dataWarnaPatchAtas = response.dataDetailOrderKerja?.[0]?.WarnaPrintingPatchAtas?.split(" | ") || []; //prettier-ignore
                        input_jumlahWarnaPatchAtas.value = dataWarnaPatchAtas[0] ?? 0; // prettier-ignore
                        input_jumlahWarnaPatchAtas.dispatchEvent(new Event("input")); // prettier-ignore
                        if (input_jumlahWarnaPatchAtas.value > 0) {
                            for (let i = 1; i <= dataWarnaPatchAtas[0]; i++) {
                                let warnaInput = document.getElementById(`warna_patchAtas${i}`); // prettier-ignore
                                if (warnaInput) {
                                    // Data warna starts from index 1 in dataWarnaPatchAtas array
                                    warnaInput.value = dataWarnaPatchAtas[i] || ""; // prettier-ignore
                                }
                            }
                        }
                        corakPrintingPatchAtas.value =response.dataDetailOrderKerja[0].CorakPrintingPatchAtas //prettier-ignore

                        input_rollStarpakPatchBawah.value =response.dataDetailOrderKerja[0].RollPatchBawah //prettier-ignore
                        input_drumKliseStarpakPatchBawah.value = response.dataDetailOrderKerja[0].DrumKliseStarpakPatchBawah //prettier-ignore
                        input_coronaStarpakPatchBawah.value = response.dataDetailOrderKerja[0].CoronaPatchBawah //prettier-ignore
                        input_jumlahPatchBawah.value = response.dataDetailOrderKerja[0].JumlahPatchBawah //prettier-ignore
                        let dataWarnaPatchBawah = response.dataDetailOrderKerja?.[0]?.WarnaPrintingPatchBawah?.split(" | ") || []; //prettier-ignore
                        input_jumlahWarnaPatchBawah.value = dataWarnaPatchBawah[0] ?? 0; // prettier-ignore
                        input_jumlahWarnaPatchBawah.dispatchEvent(new Event("input")); // prettier-ignore
                        if (input_jumlahWarnaPatchBawah.value > 0) {
                            for (let i = 1; i <= dataWarnaPatchBawah[0]; i++) {
                                let warnaInput = document.getElementById(`warna_patchBawah${i}`); // prettier-ignore
                                if (warnaInput) {
                                    // Data warna starts from index 1 in dataWarnaPatchBawah array
                                    warnaInput.value = dataWarnaPatchBawah[i] || ""; // prettier-ignore
                                }
                            }
                        }
                        corakPrintingPatchBawah.value =response.dataDetailOrderKerja[0].CorakPrintingPatchBawah //prettier-ignore
                    }

                    let dataWarna = response.dataDetailOrderKerja?.[0]?.WarnaPrinting?.split(" | ") || []; //prettier-ignore
                    input_jumlahWarna.value = dataWarna[0] ?? 0;
                    input_jumlahWarna.dispatchEvent(new Event("input"));
                    if (input_jumlahWarna.value > 0) {
                        for (let i = 1; i <= dataWarna[0]; i++) {
                            let warnaInput = document.getElementById(
                                `warna_${i}`,
                            );
                            if (warnaInput) {
                                // Data warna starts from index 1 in dataWarna array
                                warnaInput.value = dataWarna[i] || "";
                            }
                        }
                    }
                    corakPrinting.value = response.dataDetailOrderKerja[0].CorakPrinting; //prettier-ignore
                    input_keterangan.value = response.dataDetailOrderKerja[0].Keterangan; //prettier-ignore

                    NomorOrderKerja.disabled = false;
                    select_suratPesananTujuan.prop("disabled", false);
                    select_jenisOrderKerja.prop("disabled", true);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan!",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        Swal.fire({
            title: "Yakin untuk menghapus?",
            text:
                "Apakah anda yakin untuk menghapus data nomor order kerja " +
                rowID.split(" | ")[2] +
                "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/MaintenanceOrderKerjaABM/" + rowID.split(" | ")[0],
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Terjadi Kesalahan!",
                                text: response.error,
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil!",
                                text: response.success,
                            });
                            table_orderKerja.ajax.reload();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching data: ", error);
                    },
                });
            } else if (result.isDismissed) {
                // If user cancels, show a message or do nothing
                Swal.fire(
                    "Pemberitahuan",
                    "Data permohonan tidak jadi dihapus :)",
                    "info",
                );
            }
        });
    });
    //#endregion
});
