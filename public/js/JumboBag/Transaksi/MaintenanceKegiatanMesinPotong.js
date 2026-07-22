jQuery(function ($) {
    //#region Variables
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    let nomorUser = document.getElementById("nomorUser").value;
    let tambahKegiatanMesinPotongModal = document.getElementById("tambahKegiatanMesinPotongModal"); //prettier-ignore
    let tambahKegiatanMesinPotongLabel = document.getElementById("tambahKegiatanMesinPotongLabel"); //prettier-ignore
    let closeTambahKegiatanMesinPotongModal = document.getElementById("closeTambahKegiatanMesinPotongModal"); //prettier-ignore
    let tanggalLogMesinPotong = document.getElementById("tanggalLogMesinPotong"); //prettier-ignore
    let div_parentSelectNamaMesin = document.getElementById("div_parentSelectNamaMesin"); //prettier-ignore
    const namaMesinPotong = $("#namaMesinPotong");
    let shiftPotong = document.getElementById("shiftPotong");
    let searchDataByBarcode = document.getElementById("searchDataByBarcode");
    let ukuranRoll = document.getElementById("ukuranRoll");
    let rajutanWA = document.getElementById("rajutanWA");
    let rajutanWE = document.getElementById("rajutanWE");
    let denierKain = document.getElementById("denierKain");
    let statusLami = document.getElementById("statusLami");
    let warnaRoll = document.getElementById("warnaRoll");
    let statusReinforced = document.getElementById("statusReinforced");
    let beratRoll = document.getElementById("beratRoll");
    let panjangRoll = document.getElementById("panjangRoll");
    let nomor_mesinCL = document.getElementById("nomor_mesinCL");
    let div_parentSelectCustomerTableHit = document.getElementById("div_parentSelectCustomerTableHit"); //prettier-ignore
    const customer_tableHit = $("#customer_tableHit");
    let div_parentSelectKodeBarangTableHit = document.getElementById("div_parentSelectKodeBarangTableHit"); //prettier-ignore
    const kodebarang_tableHit = $("#kodebarang_tableHit");
    let div_parentSelectKomponenTableHit = document.getElementById("div_parentSelectKomponenTableHit"); //prettier-ignore
    const komponen_tableHit = $("#komponen_tableHit");
    let jenisPotongan = document.getElementById("jenisPotongan");
    let btn_isiJenisPotongan = document.getElementById("btn_isiJenisPotongan");
    let ukuranpanjang_tableHit = document.getElementById("ukuranpanjang_tableHit"); //prettier-ignore
    let ukuranlebar_tableHit = document.getElementById("ukuranlebar_tableHit");
    let hasil_potongJumlah = document.getElementById("hasil_potongJumlah");
    let hasil_potongBerat = document.getElementById("hasil_potongBerat");
    let btn_timbangHasil = document.getElementById("btn_timbangHasil");
    let afalan_waKG = document.getElementById("afalan_waKG");
    let afalan_waLBR = document.getElementById("afalan_waLBR");
    let btn_timbangAfalanWA = document.getElementById("btn_timbangAfalanWA");
    let afalan_weKG = document.getElementById("afalan_weKG");
    let afalan_weLBR = document.getElementById("afalan_weLBR");
    let btn_timbangAfalanWE = document.getElementById("btn_timbangAfalanWE");
    let afalan_lamiKG = document.getElementById("afalan_lamiKG");
    let afalan_lamiLBR = document.getElementById("afalan_lamiLBR");
    let btn_timbangAfalanLami = document.getElementById("btn_timbangAfalanLami"); //prettier-ignore
    let afalan_tepiKG = document.getElementById("afalan_tepiKG");
    let afalan_tepiLBR = document.getElementById("afalan_tepiLBR");
    let btn_timbangAfalanTepi = document.getElementById("btn_timbangAfalanTepi"); //prettier-ignore
    let afalan_settingLBR = document.getElementById("afalan_settingLBR");
    let afalan_settingKG = document.getElementById("afalan_settingKG");
    let btn_timbangAfalanSetting = document.getElementById("btn_timbangAfalanSetting"); //prettier-ignore
    let afalan_lamiSambunganLBR = document.getElementById("afalan_lamiSambunganLBR"); //prettier-ignore
    let afalan_lamiSambunganKG = document.getElementById("afalan_lamiSambunganKG"); //prettier-ignore
    let btn_timbangAfalanLamiSambungan = document.getElementById("btn_timbangAfalanLamiSambungan"); //prettier-ignore
    let afalan_lamiEkorLBR = document.getElementById("afalan_lamiEkorLBR");
    let afalan_lamiEkorKG = document.getElementById("afalan_lamiEkorKG");
    let btn_timbangAfalanLamiEkor = document.getElementById("btn_timbangAfalanLamiEkor"); //prettier-ignore
    let afalan_lamiLubangLBR = document.getElementById("afalan_lamiLubangLBR");
    let afalan_lamiLubangKG = document.getElementById("afalan_lamiLubangKG");
    let btn_timbangAfalanLamiLubang = document.getElementById("btn_timbangAfalanLamiLubang"); //prettier-ignore
    let afalan_kotorLBR = document.getElementById("afalan_kotorLBR");
    let afalan_kotorKG = document.getElementById("afalan_kotorKG");
    let btn_timbangAfalanKotor = document.getElementById("btn_timbangAfalanKotor"); //prettier-ignore
    let afalan_totalLBR = document.getElementById("afalan_totalLBR");
    let afalan_totalKG = document.getElementById("afalan_totalKG");
    let panjangPemakaian = document.getElementById("panjangPemakaian");
    let beratPemakaian = document.getElementById("beratPemakaian");
    let selisihBerat = document.getElementById("selisihBerat");
    let selisihPanjang = document.getElementById("selisihPanjang");
    let afalan_persentaseKG = document.getElementById("afalan_persentaseKG");
    let div_alasanEditPotong = document.getElementById("div_alasanEditPotong");
    let alasanEdit = document.getElementById("alasanEdit");
    let button_modalProsesPotong = document.getElementById("button_modalProsesPotong"); //prettier-ignore
    let columns = [
        {
            data: "Tgl_Log",
            render: function (data) {
                return moment(data).format("YYYY-MM-DD");
            },
            width: "10%",
        },
        {
            data: "Jenis_Potongan",
            width: "26%",
        },
        {
            data: "Nama_Mesin",
            width: "8%",
        },
        {
            data: "Shift",
            width: "5%",
        },
        {
            data: "KB_TabelHit",
            width: "13%",
        },
        {
            data: "Jumlah_Hasil_Potong",
            width: "9%",
            render: function (data) {
                return numeral(data).format("0,0.00");
            },
        },
        {
            data: "Berat_Hasil_Potong",
            width: "9%",
            render: function (data) {
                return numeral(data).format("0,0.00");
            },
        },
    ];

    // Only add the action column
    if (
        nomorUser == "4384" ||
        nomorUser == "4405" ||
        nomorUser == "4451" ||
        nomorUser == "4221" ||
        nomorUser == "4259" ||
        nomorUser == "8982" ||
        nomorUser == "4199"
    ) {
        columns.push({
            data: "Id_Log",
            render: function (data) {
                return `
                <button class="btn btn-primary btn-edit" data-id="${data}">Edit</button>
                <button class="btn btn-danger btn-delete" data-id="${data}">Hapus</button>
            `;
            },
            width: "12.5%",
        });
    }

    let table_logMesin = $("#table_logMesin").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        autoWidth: false,
        lengthMenu: [
            [10, 25, 100],
            ["10", "25", "100"],
        ],
        order: [[0, "desc"]],
        ajax: {
            url: "/MaintKegiatanMesinPotongJBB/getLogMesin",
            type: "GET",
        },
        columns: columns,
    });
    let shiftAllowedCharacters = ["P", "S", "M"];
    let statusLamiAllowedCharacters = ["L", "N"];
    let statusReinforcedAllowedCharacters = ["R", "N"];
    let kodebarang_tableHitEdit;
    let komponen_tableHitEdit;
    const getValue = (el) => parseFloat(el?.value || 0);
    //#endregion

    //#region Load Form
    initializeSelect2();
    initModal();
    //#endregion

    //#region Function
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

    // setInputFilter(
    //     afalanCutterLBRTanpaOK,
    //     function (value) {
    //         return /^-?\d*[.]?\d*$/.test(value); // Allow only digits
    //     },
    //     "Only digits are allowed",
    // );

    function initializeSelect2() {
        namaMesinPotong.select2({
            dropdownParent: $("#div_parentSelectNamaMesin"),
            placeholder: "Pilih Mesin",
        });

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

        $("#namaMesinPotong").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
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

    function initModal() {
        $.ajax({
            url: "/MaintKegiatanMesinPotongJBB/initModalTambahKegiatanMesinPotong",
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
                    namaMesinPotong.empty();
                    data.dataMesin.forEach(function (item) {
                        namaMesinPotong.append(
                            new Option(item.Nama_Mesin, item.Id_Mesin), // prettier-ignore
                        );
                    });
                    namaMesinPotong.val(null).trigger("change");
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

    function clearAll() {
        namaMesinPotong.val(null).trigger("change");
        shiftPotong.value = "";
        searchDataByBarcode.value = "";
        ukuranRoll.value = "";
        rajutanWA.value = "";
        rajutanWE.value = "";
        denierKain.value = "";
        statusLami.value = "";
        warnaRoll.value = "";
        statusReinforced.value = "";
        beratRoll.value = "";
        panjangRoll.value = "";
        nomor_mesinCL.value = "";
        kodebarang_tableHit.empty();
        kodebarang_tableHit.val(null).trigger("change");
        komponen_tableHit.empty();
        komponen_tableHit.val(null).trigger("change");
        jenisPotongan.value = "";
        ukuranpanjang_tableHit.value = "";
        ukuranlebar_tableHit.value = "";
        hasil_potongJumlah.value = "";
        hasil_potongBerat.value = "";
        afalan_waLBR.value = "";
        afalan_waKG.value = "";
        afalan_weLBR.value = "";
        afalan_weKG.value = "";
        afalan_lamiLBR.value = "";
        afalan_lamiKG.value = "";
        afalan_tepiLBR.value = "";
        afalan_tepiKG.value = "";
        afalan_settingLBR.value = "";
        afalan_settingKG.value = "";
        afalan_lamiSambunganLBR.value = "";
        afalan_lamiSambunganKG.value = "";
        afalan_lamiEkorLBR.value = "";
        afalan_lamiEkorKG.value = "";
        afalan_lamiLubangLBR.value = "";
        afalan_lamiLubangKG.value = "";
        afalan_kotorLBR.value = "";
        afalan_kotorKG.value = "";
        afalan_totalLBR.value = "";
        afalan_totalKG.value = "";
        panjangPemakaian.value = "";
        beratPemakaian.value = "";
        selisihBerat.value = "";
        selisihPanjang.value = "";
        afalan_persentaseKG.value = "";
        alasanEdit.value = "";
        showTabelHitunganSelect(true);
    }

    function fetchDataByBarcode(nomorIndeks, kodeBarang) {
        $.ajax({
            url: "/MaintKegiatanMesinPotongJBB/getDataByBarcode",
            method: "GET",
            data: {
                kodeBarang: kodeBarang,
                nomorIndeks: nomorIndeks,
            },
            dataType: "json",
            success: function (data) {
                console.log(data);

                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text: "fetching data by barcode failed ",
                        returnFocus: false,
                    });
                } else {
                    // Populate the form fields with the fetched data
                    ukuranRoll.value = numeral(
                        data[0].UkuranRoll?.trim() ?? 0,
                    ).value();
                    rajutanWA.value = numeral(
                        data[0].Warp?.trim() ?? 0,
                    ).value();
                    rajutanWE.value = numeral(
                        data[0].Weft?.trim() ?? 0,
                    ).value();
                    denierKain.value = numeral(
                        data[0].Denier?.trim() ?? 0,
                    ).value();
                    if (data[0].Lami?.includes("MIC")) {
                        statusLami.value = "L";
                    } else {
                        statusLami.value = "N";
                    }
                    warnaRoll.value = data[0].Warna?.trim();
                    beratRoll.value = numeral(data[0].Qty?.trim() ?? 0).value();
                    panjangRoll.value = numeral(
                        data[0].Qty_sekunder?.trim() ?? 0,
                    ).value();
                    if (
                        data[0].IdDivisi?.trim() == "CIR" ||
                        data[0].IdDivisi?.trim() == "CLM" ||
                        data[0].IdDivisi?.trim() == "MCL"
                    ) {
                        nomor_mesinCL.value = data[0].NamaKelompok?.trim();
                    }
                    // Move focus to the next field
                    statusReinforced.focus();
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch data by barcode.",
                });
            },
        });
    }

    function showTabelHitunganSelect(show) {
        if (show) {
            div_jenisPotongan.style.display = "none";
            div_parentSelectCustomerTableHit.style.display = "block";
            div_parentSelectKomponenTableHit.style.display = "block";
            div_parentSelectKodeBarangTableHit.style.display = "block";
            jenisPotongan.value = "";
            jenisPotongan.readOnly = true;
            customer_tableHit.val(null).trigger("change");
            btn_isiJenisPotongan.innerHTML = "Isi Jenis Potongan";
            btn_isiJenisPotongan.classList.remove("btn-info");
            btn_isiJenisPotongan.classList.add("btn-primary");
        } else {
            div_jenisPotongan.style.display = "block";
            div_parentSelectCustomerTableHit.style.display = "none";
            div_parentSelectKomponenTableHit.style.display = "none";
            div_parentSelectKodeBarangTableHit.style.display = "none";
            jenisPotongan.value = "";
            jenisPotongan.readOnly = false;
            customer_tableHit.val(null).trigger("change");
            kodebarang_tableHit.empty();
            komponen_tableHit.empty();
            btn_isiJenisPotongan.innerHTML = "Pilih Tabel Hit.";
            btn_isiJenisPotongan.classList.remove("btn-primary");
            btn_isiJenisPotongan.classList.add("btn-info");
        }
        return Promise.resolve();
    }

    function hitungBeratTotalAfalan() {
        const afalan_waKGValue = getValue(afalan_waKG);
        const afalan_weKGValue = getValue(afalan_weKG);
        const afalan_lamiKGValue = getValue(afalan_lamiKG);
        const afalan_tepiKGValue = getValue(afalan_tepiKG);
        const afalan_settingKGValue = getValue(afalan_settingKG);
        const afalan_lamiSambunganKGValue = getValue(afalan_lamiSambunganKG);
        const afalan_lamiEkorKGValue = getValue(afalan_lamiEkorKG);
        const afalan_lamiLubangKGValue = getValue(afalan_lamiLubangKG);
        const afalan_kotorKGValue = getValue(afalan_kotorKG);

        afalan_totalKG.value = numeral(
            afalan_waKGValue +
                afalan_weKGValue +
                afalan_lamiKGValue +
                afalan_tepiKGValue +
                afalan_settingKGValue +
                afalan_lamiSambunganKGValue +
                afalan_lamiEkorKGValue +
                afalan_lamiLubangKGValue +
                afalan_kotorKGValue,
        ).format("0.00");
    }

    function hitungLembarTotalAfalan() {
        const afalan_waLBRValue = getValue(afalan_waLBR);
        const afalan_weLBRValue = getValue(afalan_weLBR);
        const afalan_lamiLBRValue = getValue(afalan_lamiLBR);
        const afalan_tepiLBRValue = getValue(afalan_tepiLBR);
        const afalan_settingLBRValue = getValue(afalan_settingLBR);
        const afalan_lamiSambunganLBRValue = getValue(afalan_lamiSambunganLBR);
        const afalan_lamiEkorLBRValue = getValue(afalan_lamiEkorLBR);
        const afalan_lamiLubangLBRValue = getValue(afalan_lamiLubangLBR);
        const afalan_kotorLBRValue = getValue(afalan_kotorLBR);

        afalan_totalLBR.value = numeral(
            afalan_waLBRValue +
                afalan_weLBRValue +
                afalan_lamiLBRValue +
                afalan_tepiLBRValue +
                afalan_settingLBRValue +
                afalan_lamiSambunganLBRValue +
                afalan_lamiEkorLBRValue +
                afalan_lamiLubangLBRValue +
                afalan_kotorLBRValue,
        ).format("0.00");
    }

    function hitungPanjangPemakaian() {
        const ukuranpanjang_tableHitValue = getValue(ukuranpanjang_tableHit);
        const hasil_potongJumlahValue = getValue(hasil_potongJumlah);
        panjangPemakaian.value = numeral(
            (ukuranpanjang_tableHitValue * hasil_potongJumlahValue) / 100,
        ).format("0.00");
    }

    function hitungBeratPemakaian() {
        const hasil_potongBeratValue = getValue(hasil_potongBerat);
        const afalan_totalKGValue = getValue(afalan_totalKG);
        beratPemakaian.value = numeral(
            hasil_potongBeratValue + afalan_totalKGValue,
        ).format("0.00");
    }

    function hitungSelisihPanjangPemakaian() {
        const panjangRollValue = getValue(panjangRoll);
        const panjangPemakaianValue = getValue(panjangPemakaian);
        selisihPanjang.value = numeral(
            panjangRollValue - panjangPemakaianValue,
        ).format("0.00");
    }

    function hitungSelisihBeratPemakaian() {
        const beratRollValue = getValue(beratRoll);
        const beratPemakaianValue = getValue(beratPemakaian);
        selisihBerat.value = numeral(
            beratRollValue - beratPemakaianValue,
        ).format("0.00");
    }

    function hitungPersentaseAfalan() {
        const beratPemakaianValue = getValue(beratPemakaian);
        const afalan_totalKGValue = getValue(afalan_totalKG);
        afalan_persentaseKG.value = numeral(
            (afalan_totalKGValue / beratPemakaianValue) * 100,
        ).format("0.00");
    }
    //#endregion

    //#region Event Listener
    button_tambahKegiatanMesin.addEventListener("click", function () {
        $("#button_modalProsesPotong").data("id", null);
        tambahKegiatanMesinPotongLabel.innerHTML = "Tambah Kegiatan Mesin Potong JBB"; // prettier-ignore
        $("#tambahKegiatanMesinPotongModal").modal("show");
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $.ajax({
            url: "/MaintKegiatanMesinPotongJBB/getLogMesinByIdLog",
            data: {
                idLog: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                tanggalLogMesinPotong.value = moment(response[0].Tgl_Log).format("YYYY-MM-DD"); // prettier-ignore
                namaMesinPotong.val(response[0].Id_Mesin).trigger("change");
                shiftPotong.value = response[0].Shift;
                ukuranRoll.value = numeral(response[0].Ukuran_Roll).value();
                rajutanWA.value = numeral(response[0].Rajutan_WA).value();
                rajutanWE.value = numeral(response[0].Rajutan_WE).value();
                denierKain.value = numeral(response[0].Denier).value();
                statusLami.value = response[0].Status_Lami == 1 ? "L" : "N";
                warnaRoll.value = response[0].Warna;
                statusReinforced.value = response[0].Status_Reinforced == 1 ? "R" : "N"; //prettier-ignore
                beratRoll.value = numeral(response[0].Berat_Roll).value();
                panjangRoll.value = numeral(response[0].Panjang_Roll).value();
                nomor_mesinCL.value = response[0].Nomor_Mesin_CL;
                if (response[0].KB_TabelHit == null) {
                    showTabelHitunganSelect(false);
                    jenisPotongan.value = response[0].Jenis_Potongan;
                } else {
                    showTabelHitunganSelect(true);
                    customer_tableHit
                        .val(response[0].Kode_Customer?.trim())
                        .trigger("change")
                        .trigger("select2:select");
                    kodebarang_tableHitEdit = response[0].KB_TabelHit?.trim();
                    komponen_tableHitEdit = response[0].Kode_Komponen_TabelHit?.trim(); // prettier-ignore
                    jenisPotongan.value = response[0].Jenis_Potongan;
                }
                ukuranpanjang_tableHit.value = numeral(response[0].Panjang_Potongan).value(); // prettier-ignore
                ukuranlebar_tableHit.value = numeral(response[0].Lebar_Potongan).value(); // prettier-ignore
                hasil_potongJumlah.value = numeral(response[0].Jumlah_Hasil_Potong).value(); // prettier-ignore
                hasil_potongBerat.value = numeral(response[0].Berat_Hasil_Potong).value(); // prettier-ignore
                afalan_waLBR.value = numeral(response[0].Lembar_Afalan_WA).value(); // prettier-ignore
                afalan_waKG.value = numeral(response[0].Berat_Afalan_WA).value(); // prettier-ignore
                afalan_weLBR.value = numeral(response[0].Lembar_Afalan_WE).value(); // prettier-ignore
                afalan_weKG.value = numeral(response[0].Berat_Afalan_WE).value(); // prettier-ignore
                afalan_lamiLBR.value = numeral(response[0].Lembar_Afalan_Lami).value(); // prettier-ignore
                afalan_lamiKG.value = numeral(response[0].Berat_Afalan_Lami).value(); // prettier-ignore
                afalan_tepiLBR.value = numeral(response[0].Lembar_Afalan_Tepi).value(); // prettier-ignore
                afalan_tepiKG.value = numeral(response[0].Berat_Afalan_Tepi).value(); // prettier-ignore
                afalan_settingLBR.value = numeral(response[0].Lembar_Afalan_Setting).value(); // prettier-ignore
                afalan_settingKG.value = numeral(response[0].Berat_Afalan_Setting).value(); // prettier-ignore
                afalan_lamiSambunganLBR.value = numeral(response[0].Lembar_Afalan_LamiSambungan).value(); // prettier-ignore
                afalan_lamiSambunganKG.value = numeral(response[0].Berat_Afalan_LamiSambungan).value(); // prettier-ignore
                afalan_lamiEkorLBR.value = numeral(response[0].Lembar_Afalan_LamiEkor).value(); // prettier-ignore
                afalan_lamiEkorKG.value = numeral(response[0].Berat_Afalan_LamiEkor).value(); // prettier-ignore
                afalan_lamiLubangLBR.value = numeral(response[0].Lembar_Afalan_LamiLubang).value(); // prettier-ignore
                afalan_lamiLubangKG.value = numeral(response[0].Berat_Afalan_LamiLubang).value(); // prettier-ignore
                afalan_kotorLBR.value = numeral(response[0].Lembar_Afalan_Kotor).value(); // prettier-ignore
                afalan_kotorKG.value = numeral(response[0].Berat_Afalan_Kotor).value(); // prettier-ignore
                afalan_totalLBR.value = numeral(response[0].Lembar_Afalan_Total).value(); // prettier-ignore
                afalan_totalKG.value = numeral(response[0].Berat_Afalan_Total).value(); // prettier-ignore
                panjangPemakaian.value = numeral(response[0].Panjang_Pemakaian).value(); // prettier-ignore
                beratPemakaian.value = numeral(response[0].Berat_Pemakaian).value(); // prettier-ignore
                selisihPanjang.value = numeral(response[0].Panjang_Selisih).value(); // prettier-ignore
                selisihBerat.value = numeral(response[0].Berat_Selisih).value(); // prettier-ignore
                afalan_persentaseKG.value = numeral(response[0].Persentase_Afalan).value(); // prettier-ignore
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        }).then(() => {
            $("#button_modalProsesPotong").data("id", rowID);
            tambahKegiatanMesinPotongLabel.innerHTML = "Edit Kegiatan Mesin Potong JBB"; // prettier-ignore
            $("#tambahKegiatanMesinPotongModal").modal("show");
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        Swal.fire({
            title: "Tuliskan alasan penghapusan",
            input: "text",
            inputPlaceholder: "Alasan penghapusan...",
            inputAttributes: {
                autocapitalize: "off",
            },
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            inputValidator: (value) => {
                if (!value) {
                    return "Alasan harus diisi!";
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const reason = result.value;

                $.ajax({
                    url: "/MaintKegiatanMesinPotongJBB/" + rowID,
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
                        alasanHapus: reason,
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
                            table_logMesin.ajax.reload();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching data: ", error);
                    },
                });
            }
            if (result.isConfirmed) {
            } else if (result.isDismissed) {
                // If user cancels, show a message or do nothing
                Swal.fire(
                    "Pemberitahuan",
                    "Kegiatan mesin tidak dihapus :)",
                    "info",
                );
            }
        });
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalProsesPotong").data("id", rowID);
        Swal.fire({
            icon: "info",
            title: "Coming Soon",
            text: "Fitur ini akan tersedia pada update berikutnya.",
            confirmButtonText: "OK",
        });
    });

    $("#tambahKegiatanMesinPotongModal").on("shown.bs.modal", function (event) {
        let idLog = $("#button_modalProsesPotong").data("id");
        if (idLog == null) {
            tanggalLogMesinPotong.value = moment().format("YYYY-MM-DD");
            clearAll();
            setTimeout(() => {
                tanggalLogMesinPotong.focus();
            }, 200); // delay in milliseconds (adjust as needed)
            div_alasanEditPotong.style.display = "none";
        } else {
            alasanEdit.value = "";
            div_alasanEditPotong.style.display = "block";
        }
    });

    closeTambahKegiatanMesinPotongModal.addEventListener("click", function () {
        $("#tambahKegiatanMesinPotongModal").modal("hide");
    });

    tanggalLogMesinPotong.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            namaMesinPotong.select2("open");
        }
    });

    namaMesinPotong.on("select2:select", function () {
        shiftPotong.focus();
    });

    shiftPotong.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // If the input is more than one character or not one of the allowed characters
        if (
            this.value.length > 1 ||
            !shiftAllowedCharacters.includes(this.value)
        ) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!shiftAllowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity(
                "Hanya karakter " +
                    shiftAllowedCharacters.join(", ") +
                    " yang diperbolehkan",
            );
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        // else {
        //     this.classList.remove("input-error");
        //     this.setCustomValidity("");
        //     const cycleWeek = getShiftCycleWeek(); // 1, 2, or 3
        //     let start = "",
        //         end = "";

        //     // Define schedules for each rotation week
        //     if (cycleWeek === 1) {
        //         // Week 1
        //         if (this.value === "A") {
        //             start = "07:00";
        //             end = "15:00";
        //         } else if (this.value === "B") {
        //             start = "15:00";
        //             end = "23:00";
        //         } else if (this.value === "C") {
        //             start = "23:00";
        //             end = "07:00";
        //         }
        //     } else if (cycleWeek === 2) {
        //         // Week 2
        //         if (this.value === "A") {
        //             start = "23:00";
        //             end = "07:00";
        //         } else if (this.value === "B") {
        //             start = "07:00";
        //             end = "15:00";
        //         } else if (this.value === "C") {
        //             start = "15:00";
        //             end = "23:00";
        //         }
        //     } else if (cycleWeek === 3) {
        //         // Week 3
        //         if (this.value === "A") {
        //             start = "15:00";
        //             end = "23:00";
        //         } else if (this.value === "B") {
        //             start = "23:00";
        //             end = "07:00";
        //         } else if (this.value === "C") {
        //             start = "07:00";
        //             end = "15:00";
        //         }
        //     }

        //     // Apply to Flatpickr time pickers
        //     jamKerjaAwal.setDate(start);
        //     jamKerjaAkhir.setDate(end);
        // }
        this.reportValidity(); // Display the validity message
    });

    shiftPotong.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            ukuranRoll.focus();
        }
    });

    searchDataByBarcode.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            this.classList.remove("input-error");
            this.setCustomValidity("");
            this.reportValidity();

            if (this.value.trim() === "") {
                this.classList.add("input-error");
                this.setCustomValidity("Tidak boleh kosong");
                this.reportValidity();
                return;
            }

            const barcode = this.value.trim();

            // Validate barcode format: 000000289-000133198
            const regex = /^\d{1,9}-\d{1,9}$/;

            if (!regex.test(barcode)) {
                this.classList.add("input-error");
                this.setCustomValidity("Barcode tidak valid!");
                this.reportValidity();
                return;
            }

            let [nomorIndeks, kodeBarang] = barcode.split("-");

            nomorIndeks = nomorIndeks.padStart(9, "0");
            kodeBarang = kodeBarang.padStart(9, "0");

            this.value = `${nomorIndeks}-${kodeBarang}`;

            fetchDataByBarcode(nomorIndeks, kodeBarang);
        }
    });

    ukuranRoll.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            rajutanWA.focus();
        }
    });

    rajutanWA.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            rajutanWE.focus();
        }
    });

    rajutanWE.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            denierKain.focus();
        }
    });

    denierKain.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            statusLami.focus();
        }
    });

    statusLami.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // If the input is more than one character or not one of the allowed characters
        if (
            this.value.length > 1 ||
            !statusLamiAllowedCharacters.includes(this.value)
        ) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!statusLamiAllowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity(
                "Hanya karakter " +
                    statusLamiAllowedCharacters.join(", ") +
                    " yang diperbolehkan",
            );
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    statusLami.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.classList.add("input-error");
                this.setCustomValidity(
                    "Isilah dengan karakter " +
                        statusLamiAllowedCharacters.join(" atau "),
                );
            } else {
                this.classList.remove("input-error");
                this.setCustomValidity("");
                warnaRoll.focus();
            }
            this.reportValidity();
        }
    });

    warnaRoll.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.classList.add("input-error");
                this.setCustomValidity("Tidak boleh kosong");
            } else {
                this.classList.remove("input-error");
                this.setCustomValidity("");
                statusReinforced.focus();
            }
            this.reportValidity();
        }
    });

    statusReinforced.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.classList.add("input-error");
                this.setCustomValidity(
                    "Isilah dengan karakter " +
                        statusReinforcedAllowedCharacters.join(" atau "),
                );
            } else {
                this.classList.remove("input-error");
                this.setCustomValidity("");
                beratRoll.focus();
            }
            this.reportValidity();
        }
    });

    statusReinforced.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // If the input is more than one character or not one of the allowed characters
        if (
            this.value.length > 1 ||
            !statusReinforcedAllowedCharacters.includes(this.value)
        ) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!statusReinforcedAllowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity(
                "Hanya karakter " +
                    statusReinforcedAllowedCharacters.join(", ") +
                    " yang diperbolehkan",
            );
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    beratRoll.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            panjangRoll.focus();
        }
    });

    panjangRoll.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungPanjangPemakaian();
            hitungSelisihPanjangPemakaian();
            nomor_mesinCL.focus();
        }
    });

    nomor_mesinCL.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = "-";
            }
            customer_tableHit.select2("open");
        }
    });

    customer_tableHit.on("select2:select", function () {
        const selectedCustomer = $(this).val(); // Get selected Customer
        $.ajax({
            url: "/MaintKegiatanMesinPotongJBB/getTabelHitunganByCustomer",
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
            if ($("#button_modalProsesPotong").data("id") == null) {
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
        const selectedKodeBarang = $(this).val(); // Get selected Kode Barang Tabel Hit.
        $.ajax({
            url: "/MaintKegiatanMesinPotongJBB/getKomponenByTabelHitungan",
            method: "GET",
            data: {
                kodeBarang: selectedKodeBarang,
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                komponen_tableHit.empty();
                data.forEach(function (item) {
                    komponen_tableHit.append(
                        new Option(
                            item.Nama_Komponen +
                                " Uk. " +
                                numeral(item.Panjang_Potongan).value() +
                                " X " +
                                numeral(item.Lebar_Potongan).value(),
                            item.Kode_Komponen,
                        ),
                    );
                });
                komponen_tableHit.val(null).trigger("change");
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kode Barang Tabel Hitungan.",
                });
            },
        }).then(() => {
            if ($("#button_modalProsesPotong").data("id") == null) {
                komponen_tableHit.select2("open");
            } else {
                komponen_tableHit.val(komponen_tableHitEdit).trigger("change");
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
        jenisPotongan.value = komponenName;
        ukuranpanjang_tableHit.value = komponenLength;
        ukuranlebar_tableHit.value = komponenWidth;
        const event = new KeyboardEvent("keypress", { key: "Enter" });
        ukuranpanjang_tableHit.dispatchEvent(event);
        hasil_potongJumlah.focus();
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
                        hasil_potongJumlah.focus();
                    }
                }
            });
    });

    jenisPotongan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.classList.add("input-error");
                this.setCustomValidity("Tidak boleh kosong");
            } else {
                this.classList.remove("input-error");
                this.setCustomValidity("");
                komponen_tableHit.val(this.value).trigger("change");
                ukuranpanjang_tableHit.focus();
            }
            this.reportValidity();
        }
    });

    btn_isiJenisPotongan.addEventListener("click", function (e) {
        e.preventDefault();
        if (this.innerHTML == "Isi Jenis Potongan") {
            showTabelHitunganSelect(false).then(() => {
                jenisPotongan.focus();
            });
        } else {
            showTabelHitunganSelect(true).then(() => {
                customer_tableHit.select2("open");
            });
        }
    });

    ukuranpanjang_tableHit.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungPanjangPemakaian();
            hitungSelisihPanjangPemakaian();
            ukuranlebar_tableHit.focus();
        }
    });

    ukuranlebar_tableHit.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hasil_potongJumlah.focus();
        }
    });

    hasil_potongJumlah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungPanjangPemakaian();
            hitungSelisihPanjangPemakaian();
            hasil_potongBerat.focus();
        }
    });

    hasil_potongBerat.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_waLBR.focus();
        }
    });

    btn_timbangHasil.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.80:8080/",
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
                hasil_potongBerat.value = weight;
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
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            btn_timbangAfalanWA.focus();
        });
    });

    afalan_waLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            btn_timbangAfalanWA.focus();
        }
    });

    afalan_waKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_weLBR.focus();
        }
    });

    btn_timbangAfalanWA.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.80:8080/",
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
                afalan_waKG.value = weight;
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
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            btn_timbangAfalanWE.focus();
        });
    });

    afalan_weLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            btn_timbangAfalanWE.focus();
        }
    });

    afalan_weKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_lamiLBR.focus();
        }
    });

    btn_timbangAfalanWE.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.80:8080/",
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
                afalan_weKG.value = weight;
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
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            btn_timbangAfalanLami.focus();
        });
    });

    afalan_lamiLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            btn_timbangAfalanLami.focus();
        }
    });

    afalan_lamiKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_tepiLBR.focus();
        }
    });

    btn_timbangAfalanLami.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.80:8080/",
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
                afalan_lamiKG.value = weight;
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
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            btn_timbangAfalanTepi.focus();
        });
    });

    afalan_tepiLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            btn_timbangAfalanTepi.focus();
        }
    });

    afalan_tepiKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_settingLBR.focus();
        }
    });

    btn_timbangAfalanTepi.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.80:8080/",
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
                afalan_tepiKG.value = weight;
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
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_settingLBR.focus();
        });
    });

    afalan_settingLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            btn_timbangAfalanSetting.focus();
        }
    });

    afalan_settingKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_lamiSambunganLBR.focus();
        }
    });

    btn_timbangAfalanSetting.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.80:8080/",
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
                afalan_settingKG.value = weight;
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
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_lamiSambunganLBR.focus();
        });
    });

    afalan_lamiSambunganLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            btn_timbangAfalanLamiSambungan.focus();
        }
    });

    afalan_lamiSambunganKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_lamiEkorLBR.focus();
        }
    });

    btn_timbangAfalanLamiSambungan.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.80:8080/",
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
                afalan_lamiSambunganKG.value = weight;
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
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_lamiEkorLBR.focus();
        });
    });

    afalan_lamiEkorLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            btn_timbangAfalanLamiEkor.focus();
        }
    });

    afalan_lamiEkorKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_lamiLubangLBR.focus();
        }
    });

    btn_timbangAfalanLamiEkor.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.80:8080/",
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
                afalan_lamiEkorKG.value = weight;
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
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_lamiLubangLBR.focus();
        });
    });

    afalan_lamiLubangLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            btn_timbangAfalanLamiLubang.focus();
        }
    });

    afalan_lamiLubangKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_kotorLBR.focus();
        }
    });

    btn_timbangAfalanLamiLubang.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.80:8080/",
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
                afalan_lamiLubangKG.value = weight;
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
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            afalan_kotorLBR.focus();
        });
    });

    afalan_kotorLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            btn_timbangAfalanKotor.focus();
        }
    });

    afalan_kotorKG.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            button_modalProsesPotong.focus();
        }
    });

    btn_timbangAfalanKotor.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.80:8080/",
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
                afalan_kotorKG.value = weight;
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
            hitungBeratTotalAfalan();
            hitungBeratPemakaian();
            hitungSelisihBeratPemakaian();
            hitungPersentaseAfalan();
            button_modalProsesPotong.focus();
        });
    });

    button_modalProsesPotong.addEventListener("click", function () {
        let idLog = $(this).data("id");

        const ukuranRollValue = getValue(ukuranRoll);
        const rajutanWAValue = getValue(rajutanWA);
        const rajutanWEValue = getValue(rajutanWE);
        const denierKainValue = getValue(denierKain);
        const beratRollValue = getValue(beratRoll);
        const panjangRollValue = getValue(panjangRoll);
        const ukuranpanjang_tableHitValue = getValue(ukuranpanjang_tableHit);
        const ukuranlebar_tableHitValue = getValue(ukuranlebar_tableHit);
        const hasil_potongJumlahValue = getValue(hasil_potongJumlah);
        const hasil_potongBeratValue = getValue(hasil_potongBerat);
        const afalan_waLBRValue = getValue(afalan_waLBR);
        const afalan_waKGValue = getValue(afalan_waKG);
        const afalan_weLBRValue = getValue(afalan_weLBR);
        const afalan_weKGValue = getValue(afalan_weKG);
        const afalan_lamiLBRValue = getValue(afalan_lamiLBR);
        const afalan_lamiKGValue = getValue(afalan_lamiKG);
        const afalan_tepiLBRValue = getValue(afalan_tepiLBR);
        const afalan_tepiKGValue = getValue(afalan_tepiKG);
        const afalan_settingLBRValue = getValue(afalan_settingLBR);
        const afalan_settingKGValue = getValue(afalan_settingKG);
        const afalan_lamiSambunganLBRValue = getValue(afalan_lamiSambunganLBR);
        const afalan_lamiSambunganKGValue = getValue(afalan_lamiSambunganKG);
        const afalan_lamiEkorLBRValue = getValue(afalan_lamiEkorLBR);
        const afalan_lamiEkorKGValue = getValue(afalan_lamiEkorKG);
        const afalan_lamiLubangLBRValue = getValue(afalan_lamiLubangLBR);
        const afalan_lamiLubangKGValue = getValue(afalan_lamiLubangKG);
        const afalan_kotorLBRValue = getValue(afalan_kotorLBR);
        const afalan_kotorKGValue = getValue(afalan_kotorKG);
        const afalan_totalLBRValue = getValue(afalan_totalLBR);
        const afalan_totalKGValue = getValue(afalan_totalKG);
        const panjangPemakaianValue = getValue(panjangPemakaian);
        const beratPemakaianValue = getValue(beratPemakaian);
        const selisihBeratValue = getValue(selisihBerat);
        const selisihPanjangValue = getValue(selisihPanjang);
        const afalan_persentaseKGValue = getValue(afalan_persentaseKG);

        // Disable the button
        button_modalProsesPotong.disabled = true;

        // Re-enable after 0.5 seconds (500 ms)
        setTimeout(function () {
            button_modalProsesPotong.disabled = false;
        }, 500);

        let selectedDate = tanggalLogMesinPotong.value;
        let today = new Date().toISOString().split("T")[0];

        if (selectedDate > today) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Tanggal tidak boleh lebih dari hari ini",
                returnFocus: false,
            }).then(() => {
                tanggalLogMesinPotong.select();
            });
            return;
        }

        const afalanInputs = [
            afalan_waLBR,
            afalan_waKG,
            afalan_weLBR,
            afalan_weKG,
            afalan_lamiLBR,
            afalan_lamiKG,
            afalan_tepiLBR,
            afalan_tepiKG,
            afalan_settingLBR,
            afalan_settingKG,
            afalan_lamiSambunganLBR,
            afalan_lamiSambunganKG,
            afalan_lamiEkorLBR,
            afalan_lamiEkorKG,
            afalan_lamiLubangLBR,
            afalan_lamiLubangKG,
            afalan_kotorLBR,
            afalan_kotorKG,
        ];

        afalanInputs.forEach((input) => {
            if (input.value.trim() === "") {
                input.value = 0;
            }
        });

        if (shiftPotong.value == "" || shiftPotong.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Shift tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                shiftMPJ.select();
            });
            return;
        }

        if (namaMesinPotong.val() === "" || namaMesinPotong.val() == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Nama mesin tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    namaMesinPotong.select2("open");
                }, 200);
            });
            return;
        }

        if (jenisPotongan.value == "" || jenisPotongan.value == null) {
            if (div_jenisPotongan.style.display == "block") {
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Jenis Potongan tidak boleh kosong",
                    returnFocus: false,
                }).then(() => {
                    jenisPotongan.select();
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Komponen tabel hitungan harus dipilih",
                    returnFocus: false,
                });
            }
            return;
        }

        if (idLog) {
            if (alasanEdit.value == "" || alasanEdit.value == null) {
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Alasan Edit harus diisi",
                    returnFocus: false,
                }).then(() => {
                    alasanEdit.focus();
                });
                return;
            }
        }

        hitungBeratTotalAfalan();
        hitungLembarTotalAfalan();
        hitungPanjangPemakaian();
        hitungBeratPemakaian();
        hitungSelisihPanjangPemakaian();
        hitungSelisihBeratPemakaian();
        hitungPersentaseAfalan();

        $.ajax({
            url: "/MaintKegiatanMesinPotongJBB",
            method: "POST",
            data: {
                jenisStore: idLog ? "update" : "store",
                idLog: idLog,
                TglLogPotong: tanggalLogMesinPotong.value,
                idMesinPotong: namaMesinPotong.val(),
                shiftPotong: shiftPotong.value,
                ukuranRoll: ukuranRollValue,
                rajutanWA: rajutanWAValue,
                rajutanWE: rajutanWEValue,
                denierKain: denierKainValue,
                statusLami: statusLami.value,
                warnaRoll: warnaRoll.value,
                statusReinforced: statusReinforced.value,
                beratRoll: beratRollValue,
                panjangRoll: panjangRollValue,
                nomor_mesinCL: nomor_mesinCL.value,
                kodebarang_tableHit: kodebarang_tableHit.val(),
                komponen_tableHit: komponen_tableHit.val(),
                jenisPotongan: jenisPotongan.value,
                ukuranpanjang_tableHit: ukuranpanjang_tableHitValue,
                ukuranlebar_tableHit: ukuranlebar_tableHitValue,
                hasil_potongJumlah: hasil_potongJumlahValue,
                hasil_potongBerat: hasil_potongBeratValue,
                afalan_waLBR: afalan_waLBRValue,
                afalan_waKG: afalan_waKGValue,
                afalan_weLBR: afalan_weLBRValue,
                afalan_weKG: afalan_weKGValue,
                afalan_lamiLBR: afalan_lamiLBRValue,
                afalan_lamiKG: afalan_lamiKGValue,
                afalan_tepiLBR: afalan_tepiLBRValue,
                afalan_tepiKG: afalan_tepiKGValue,
                afalan_settingLBR: afalan_settingLBRValue,
                afalan_settingKG: afalan_settingKGValue,
                afalan_lamiSambunganLBR: afalan_lamiSambunganLBRValue,
                afalan_lamiSambunganKG: afalan_lamiSambunganKGValue,
                afalan_lamiEkorLBR: afalan_lamiEkorLBRValue,
                afalan_lamiEkorKG: afalan_lamiEkorKGValue,
                afalan_lamiLubangLBR: afalan_lamiLubangLBRValue,
                afalan_lamiLubangKG: afalan_lamiLubangKGValue,
                afalan_kotorLBR: afalan_kotorLBRValue,
                afalan_kotorKG: afalan_kotorKGValue,
                afalan_totalLBR: afalan_totalLBRValue,
                afalan_totalKG: afalan_totalKGValue,
                panjangPemakaian: panjangPemakaianValue,
                beratPemakaian: beratPemakaianValue,
                selisihBerat: selisihBeratValue,
                selisihPanjang: selisihPanjangValue,
                afalan_persentaseKG: afalan_persentaseKGValue,
                alasanEdit: alasanEdit.value,
                _token: csrfToken,
            },
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: idLog
                            ? "Data berhasil diupdate"
                            : "Data berhasil ditambahkan",
                    }).then(() => {
                        $("#tambahKegiatanMesinPotongModal").modal("hide");
                        table_logMesin.ajax.reload();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Mesin.",
                });
            },
        }).then(() => {
            $("#button_modalProsesPotong").data("id", null);
            tambahKegiatanMesinPotongLabel.innerHTML = "Tambah Kegiatan Mesin Potong JBB"; // prettier-ignore
            $("#tambahKegiatanMesinPotongModal").modal("show");
        });
    });
    //#endregion
});
