jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let nomorUser = document.getElementById("nomorUser").value;
    let tambahKegiatanMesinRBLabel = document.getElementById("tambahKegiatanMesinRBLabel");
    let tanggalLog = document.getElementById("tanggalLog");
    let shiftRB = document.getElementById("shiftRB");
    let ukuranRoll = document.getElementById("ukuranRoll");
    let rajutanWA = document.getElementById("rajutanWA");
    let rajutanWE = document.getElementById("rajutanWE");
    let denierKain = document.getElementById("denierKain");
    let lami = document.getElementById("lami");
    let warnaRoll = document.getElementById("warnaRoll");
    let reinforced = document.getElementById("reinforced");
    let beratRoll = document.getElementById("beratRoll");
    let panjangRoll = document.getElementById("panjangRoll");
    let nomor_mesinCL = document.getElementById("nomor_mesinCL");
    let ukuranpanjang_tableHit = document.getElementById("ukuranpanjang_tableHit");
    let ukuranlebar_tableHit = document.getElementById("ukuranlebar_tableHit");
    let hasil_potongJumlah = document.getElementById("hasil_potongJumlah");
    let hasil_potongBerat = document.getElementById("hasil_potongBerat");
    let afalan_waLBR = document.getElementById("afalan_waLBR");
    let afalan_waKG = document.getElementById("afalan_waKG");
    let afalan_weLBR = document.getElementById("afalan_weLBR");
    let afalan_weKG = document.getElementById("afalan_weKG");
    let afalan_lamiLBR = document.getElementById("afalan_lamiLBR");
    let afalan_lamiKG = document.getElementById("afalan_lamiKG");
    let afalan_tepiLBR = document.getElementById("afalan_tepiLBR");
    let afalan_tepiKG = document.getElementById("afalan_tepiKG");
    let keterangan_kegiatan = document.getElementById("keterangan_kegiatan");
    let afalan_totalKG = document.getElementById("afalan_totalKG");
    let afalan_totalLBR = document.getElementById("afalan_totalLBR");
    let panjangPemakaian = document.getElementById("panjangPemakaian");
    let beratPemakaian = document.getElementById("beratPemakaian");
    let selisihPanjang = document.getElementById("selisihPanjang");
    let selisihBerat = document.getElementById("selisihBerat");
    let afalan_persentaseKG = document.getElementById("afalan_persentaseKG");
    let btn_timbangHasil = document.getElementById("btn_timbangHasil");
    let btn_timbangAfalanWA = document.getElementById("btn_timbangAfalanWA");
    let btn_timbangAfalanWE = document.getElementById("btn_timbangAfalanWE");
    let btn_timbangAfalanLami = document.getElementById("btn_timbangAfalanLami");
    let btn_timbangAfalanTepi = document.getElementById("btn_timbangAfalanTepi");
    let closeTambahKegiatanMesinRBModal = document.getElementById("closeTambahKegiatanMesinRBModal");
    let button_modalProses = document.getElementById("button_modalProses");

    const getValue = (el) => parseFloat(el?.value || 0);
    // let tgl_awal = document.getElementById("tgl_awal");
    // let tgl_akhir = document.getElementById("tgl_akhir");
    
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
    const slcNamaMesinPotong = document.getElementById("namaMesinPotong");

    initModal();
    initializeSelect2();

    let idLog = null
    let kodebarang_tableHitEdit = null
    let komponen_tableHitEdit = null
    let jenisPotongan = null
    let isCustomKomponen = false;

    tanggalLog.valueAsDate = new Date();

    let userAction = [
        "4405",
        "4221",
        "4259",
        "8982",
        "4451",
        "4199"
    ];

    //#region Functions

    function clearAll() {
        tanggalLog.valueAsDate = new Date();
        shiftRB.value = "";
        ukuranRoll.value = "";
        rajutanWA.value = "";
        rajutanWE.value = "";
        denierKain.value = "";
        lami.value = "";
        warnaRoll.value = "";
        reinforced.value = "";
        beratRoll.value = "";
        panjangRoll.value = "";
        nomor_mesinCL.value = "";
        // $("#" + slcNamaMesinPotong.id).empty();
        // $("#" + slcNamaMesinPotong.id).trigger("change");
        customer_tableHit.val(null).trigger("change");
        kodebarang_tableHit.empty();
        kodebarang_tableHit.val(null).trigger("change");
        komponen_tableHit.empty();
        komponen_tableHit.val(null).trigger("change");
        jenisPotongan = null;
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
        keterangan_kegiatan.value = "";
        afalan_totalLBR.value = "";
        afalan_totalKG.value = "";
        panjangPemakaian.value = "";
        beratPemakaian.value = "";
        selisihPanjang.value = "";
        selisihBerat.value = "";
        afalan_persentaseKG.value = "";
    }

    function hitungBeratTotalAfalan() {
        const afalan_waKGValue = getValue(afalan_waKG);
        const afalan_weKGValue = getValue(afalan_weKG);
        const afalan_lamiKGValue = getValue(afalan_lamiKG);
        const afalan_tepiKGValue = getValue(afalan_tepiKG);

        afalan_totalKG.value = numeral(
            afalan_waKGValue +
            afalan_weKGValue +
            afalan_lamiKGValue +
            afalan_tepiKGValue,
        ).format("0.00");
    }

    function hitungLembarTotalAfalan() {
        const afalan_waLBRValue = getValue(afalan_waLBR);
        const afalan_weLBRValue = getValue(afalan_weLBR);
        const afalan_lamiLBRValue = getValue(afalan_lamiLBR);
        const afalan_tepiLBRValue = getValue(afalan_tepiLBR);

        afalan_totalLBR.value = numeral(
            afalan_waLBRValue +
            afalan_weLBRValue +
            afalan_lamiLBRValue +
            afalan_tepiLBRValue,
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

    function initModal() {
        // setTimeout(() => {
        //     tanggalLog.focus();
        // }, 200);
        $.ajax({
            url: "/MaintKegiatanMesinRBJBB/initModalTambahKegiatanMesinPotong",
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
            this.value = this.value.toUpperCase();
            $("#" + slcNamaMesinPotong.id).select2("open");
        }
    });

    shiftRB.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = this.value.toUpperCase();
            ukuranRoll.select();
        }
    });

    shiftRB.addEventListener("input", function (e) {
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

    ukuranpanjang_tableHit.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungPanjangPemakaian();
        hitungSelisihPanjangPemakaian();
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

    ukuranRoll.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = this.value.toUpperCase();
            rajutanWA.select();
        }
    });

    rajutanWA.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = this.value.toUpperCase();
            rajutanWE.select();
        }
    });

    rajutanWE.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = this.value.toUpperCase();
            denierKain.select();
        }
    });

    denierKain.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = this.value.toUpperCase();
            lami.select();
        }
    });

    lami.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = this.value.toUpperCase();
            warnaRoll.select();
        }
    });

    warnaRoll.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = this.value.toUpperCase();
            reinforced.select();
        }
    });

    reinforced.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            // this.value = this.value.toUpperCase();
            beratRoll.select();
        }
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

    beratRoll.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungBeratPemakaian();
        hitungSelisihBeratPemakaian();
        hitungPersentaseAfalan();
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

    panjangRoll.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungPanjangPemakaian();
        hitungSelisihPanjangPemakaian();
    });

    nomor_mesinCL.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = this.value.toUpperCase();
            customer_tableHit.select2("open");
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

    hasil_potongJumlah.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungPanjangPemakaian();
        hitungSelisihPanjangPemakaian();
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

    hasil_potongBerat.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungBeratPemakaian();
        hitungSelisihBeratPemakaian();
        hitungPersentaseAfalan();
    });

    afalan_waLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            afalan_waKG.focus();
        }
    });

    afalan_waLBR.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungLembarTotalAfalan();
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

    afalan_waKG.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungBeratTotalAfalan();
        hitungBeratPemakaian();
        hitungSelisihBeratPemakaian();
        hitungPersentaseAfalan();
    });

    afalan_weLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            afalan_weKG.focus();
        }
    });

    afalan_weLBR.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungLembarTotalAfalan();
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

    afalan_weKG.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungBeratTotalAfalan();
        hitungBeratPemakaian();
        hitungSelisihBeratPemakaian();
        hitungPersentaseAfalan();
    });

    afalan_lamiLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            afalan_lamiKG.focus();
        }
    });

    afalan_lamiLBR.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungLembarTotalAfalan();
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

    afalan_lamiKG.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungBeratTotalAfalan();
        hitungBeratPemakaian();
        hitungSelisihBeratPemakaian();
        hitungPersentaseAfalan();
    });

    afalan_tepiLBR.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hitungLembarTotalAfalan();
            afalan_tepiKG.focus();
        }
    });

    afalan_tepiLBR.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungLembarTotalAfalan();
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
            keterangan_kegiatan.focus();
        }
    });

    afalan_tepiKG.addEventListener("input", function (e) {
        if (this.value == "") {
            this.value = 0;
        }
        hitungBeratTotalAfalan();
        hitungBeratPemakaian();
        hitungSelisihBeratPemakaian();
        hitungPersentaseAfalan();
    });

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

        $("#tambahKegiatanMesinRBModal").modal("show");
        tambahKegiatanMesinRBLabel.innerHTML =
            "Edit Kegiatan Mesin Rope/Belt JBB";

        // AJAX header
        $.ajax({
            url: "MaintKegiatanMesinRBJBB/getDataEdit",
            type: "GET",
            data: {
                idLog: id,
            },
            success: function (data) {
                console.log("Data:", data);

                if (!data || !data[0]) {
                    console.error("Data tidak ditemukan.");
                    return;
                }

                if (data[0].komponen == null || data[0].komponen === "") {

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

                $("#" + slcNamaMesinPotong.id).val(data[0].namaMesin).trigger("change");

                shiftRB.value = data[0].shiftRB;
                ukuranRoll.value = numeral(data[0].ukuranRoll).format('0.00');
                rajutanWA.value = numeral(data[0].rajutanWA).format('0.00');
                rajutanWE.value = numeral(data[0].rajutanWE).format('0.00');
                denierKain.value = numeral(data[0].denierKain).format('0.00');
                lami.value = numeral(data[0].lami).format('0.00');
                warnaRoll.value = data[0].warnaRoll;
                reinforced.value = numeral(data[0].reinforced).format('0.00');
                beratRoll.value = numeral(data[0].beratRoll).format('0.00');
                panjangRoll.value = numeral(data[0].panjangRoll).format('0.00');
                nomor_mesinCL.value = data[0].nomor_mesinCL;
                ukuranpanjang_tableHit.value = numeral(data[0].ukuranpanjang_tableHit).format('0.00');
                ukuranlebar_tableHit.value = numeral(data[0].ukuranlebar_tableHit).format('0.00');
                hasil_potongJumlah.value = numeral(data[0].hasil_potongJumlah).format('0.00');
                hasil_potongBerat.value = numeral(data[0].hasil_potongBerat).format('0.00');
                afalan_waLBR.value = numeral(data[0].afalan_waLBR).format('0.00');
                afalan_waKG.value = numeral(data[0].afalan_waKG).format('0.00');
                afalan_weLBR.value = numeral(data[0].afalan_weLBR).format('0.00');
                afalan_weKG.value = numeral(data[0].afalan_weKG).format('0.00');
                afalan_lamiLBR.value = numeral(data[0].afalan_lamiLBR).format('0.00');
                afalan_lamiKG.value = numeral(data[0].afalan_lamiKG).format('0.00');
                afalan_tepiLBR.value = numeral(data[0].afalan_tepiLBR).format('0.00');
                afalan_tepiKG.value = numeral(data[0].afalan_tepiKG).format('0.00');
                keterangan_kegiatan.value = data[0].keterangan_kegiatan;
                afalan_totalLBR.value = numeral(data[0].afalan_totalLBR).format('0.00');
                afalan_totalKG.value = numeral(data[0].afalan_totalKG).format('0.00');
                panjangPemakaian.value = numeral(data[0].panjangPemakaian).format('0.00');
                beratPemakaian.value = numeral(data[0].beratPemakaian).format('0.00');
                selisihPanjang.value = numeral(data[0].selisihPanjang).format('0.00');
                selisihBerat.value = numeral(data[0].selisihBerat).format('0.00');
                afalan_persentaseKG.value = numeral(data[0].afalan_persentaseKG).format('0.00');
                // shiftPrinting.value = data[0].shiftPrinting;
                // pemakaianReduser.value = numeral(data[0].pemakaianReduser).format('0.00');
            },
            error: function (xhr) {
                console.error("Gagal mengambil header:", xhr.responseText);
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
                    url: "MaintKegiatanMesinRBJBB",
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

    //#region Select2
    $("#" + slcNamaMesinPotong.id).select2({
        placeholder: "-- Pilih Mesin --",
        dropdownParent: $("#div_parentSelectNamaMesin"),
    });

    $("#" + slcNamaMesinPotong.id).on("change", function () {
        const val = $(this).val();
        console.log(val);

        let allowedType = [];
        switch (val) {
            case "Rope":
                setTimeout(() => {
                    shiftRB.focus();
                }, 200);
                break;

            case "Belt":
                setTimeout(() => {
                    shiftRB.focus();
                }, 200);
                break;
        }
    });

    $("#" + slcLokasi.id).select2({
        placeholder: "-- Pilih Lokasi --"
    });

    $("#" + slcLokasi.id).on("change", function () {
        const val = $(this).val();
        let allowedType = [];
        switch (val) {
            case "Tropodo":
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
                        url: "MaintKegiatanMesinRBJBB/getData",
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
                        { data: "jenisPotongan", width: "250px" },
                        { data: "namaMesin" },
                        { data: "shiftRB" },
                        { data: "kodeBarang", width: "250px" },
                        // {
                        //     data: "total_afalanPrinting",
                        //     render: function (data) {
                        //         return numeral(data || 0).format("0.00");
                        //     }
                        // },
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
                            targets: 2,
                            width: "250px"
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
                // Lokasi 1 boleh semua
                // $("#divTropGedB").show();
                // $("#divGedD").hide();
                // btn_redisplay.click();
                // allowedType = ["1", "2"];
                // btn_batal.click();
                // $("#labelProses").text("Input Data");
                // $("#btn_proses").text("PROSES");
                break;

            case "Mojosari":
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
                        url: "MaintKegiatanMesinRBJBB/getData",
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
                        { data: "jenisPotongan", width: "250px" },
                        { data: "namaMesin" },
                        { data: "shiftRB" },
                        { data: "kodeBarang", width: "250px" },
                        // {
                        //     data: "total_afalanPrinting",
                        //     render: function (data) {
                        //         return numeral(data || 0).format("0.00");
                        //     }
                        // },
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
                            targets: 2,
                            width: "250px"
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
                // Lokasi 2 hanya type tertentu
                // $("#divTropGedB").show();
                // $("#divGedD").hide();
                // btn_redisplay.click();
                // allowedType = ["3"];
                // btn_batal.click();
                // $("#labelProses").text("Input Data");
                // $("#btn_proses").text("PROSES");
                break;
        }
    });

    // default lokasi = 1
    $("#" + slcLokasi.id).val("Tropodo").trigger("change");

    customer_tableHit.on("select2:select", function () {
        const selectedCustomer = $(this).val(); // Get selected Customer
        $.ajax({
            url: "/MaintKegiatanMesinRBJBB/getTabelHitunganByCustomer",
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
            if (tambahKegiatanMesinRBLabel.innerHTML !== "Edit Kegiatan Mesin Rope/Belt JBB") {
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
            url: "/MaintKegiatanMesinRBJBB/getKomponenByTabelHitungan",
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
            // if (selectedRow) {
            //     // komponen_tableHit.select2("open");
            // } else {
            //     komponen_tableHit.select2("open");
            // }
            if (
                tambahKegiatanMesinRBLabel.innerHTML !==
                "Edit Kegiatan Mesin Rope/Belt JBB"
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
                        komponen_tableHit.val(null);
                        warnaTinta.focus();
                    }
                }
            });
    });

    //#region Event Listener

    button_tambahKegiatanMesin.addEventListener("click", function () {
        $("#button_modalProsesPotong").data("id", null);
        tambahKegiatanMesinRBLabel.innerHTML = "Tambah Kegiatan Mesin Rope/Belt JBB"; // prettier-ignore
        $("#tambahKegiatanMesinRBModal").modal("show");
        clearAll();
    });

    closeTambahKegiatanMesinRBModal.addEventListener("click", function () {
        $("#tambahKegiatanMesinRBModal").modal("hide");
    });

    $("#tambahKegiatanMesinRBModal").on("shown.bs.modal", function (event) {
        let idLog = $("#button_modalProsesPotong").data("id");
        setTimeout(() => {
            tanggalLog.focus();
        }, 200);
    });

    button_modalProses.addEventListener("click", async function (event) {
        event.preventDefault();
        button_modalProses.disabled = true;
        // const allRowsDataDetail = table_detail.rows().data().toArray();
        if (
            tanggalLog.value == "" || shiftRB.value == ""
        ) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Isi tanggal dan shift terlebih dahulu!",
                showConfirmButton: true,
                // timer: 2000
            });
            button_modalProses.disabled = false;
            return;
        }

        $.ajax({
            url: "MaintKegiatanMesinRBJBB",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: (tambahKegiatanMesinRBLabel.textContent == "Edit Kegiatan Mesin Rope/Belt JBB") ? 2 : 1,
                idLog: idLog,
                tanggalLog: tanggalLog.value,
                lokasi: $("#" + slcLokasi.id).val(),
                namaMesin: $("#" + slcNamaMesinPotong.id).val(),
                shiftRB: shiftRB.value,
                ukuranRoll: ukuranRoll.value,
                rajutanWA: rajutanWA.value,
                rajutanWE: rajutanWE.value,
                denierKain: denierKain.value,
                lami: lami.value,
                warnaRoll: warnaRoll.value,
                reinforced: reinforced.value,
                beratRoll: beratRoll.value,
                panjangRoll: panjangRoll.value,
                nomor_mesinCL: nomor_mesinCL.value,
                customer: customer_tableHit.val(),
                kodeBarang: kodebarang_tableHit.val(),
                komponen: komponen_tableHit.val(),
                jenisPotongan: jenisPotongan,
                ukuranPanjang: ukuranpanjang_tableHit.value,
                ukuranLebar: ukuranlebar_tableHit.value,
                hasil_potongJumlah: hasil_potongJumlah.value,
                hasil_potongBerat: hasil_potongBerat.value,
                afalan_waLBR: afalan_waLBR.value,
                afalan_waKG: afalan_waKG.value,
                afalan_weLBR: afalan_weLBR.value,
                afalan_weKG: afalan_weKG.value,
                afalan_lamiLBR: afalan_lamiLBR.value,
                afalan_lamiKG: afalan_lamiKG.value,
                afalan_tepiLBR: afalan_tepiLBR.value,
                afalan_tepiKG: afalan_tepiKG.value,
                keterangan_kegiatan: keterangan_kegiatan.value,
                afalan_totalLBR: afalan_totalLBR.value,
                afalan_totalKG: afalan_totalKG.value,
                panjangPemakaian: panjangPemakaian.value,
                beratPemakaian: beratPemakaian.value,
                selisihPanjang: selisihPanjang.value,
                selisihBerat: selisihBerat.value,
                afalan_persentaseKG: afalan_persentaseKG.value,
                // allRowsDataDetail: allRowsDataDetail,
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
                        $("#tambahKegiatanMesinRBModal").modal("hide");
                        clearAll();
                        // id_setting = null
                        // btn_batal.click();
                        // btn_redisplay.click();
                        button_modalProses.disabled = false;
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    button_modalProses.disabled = false;
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                button_modalProses.disabled = false;
            },
        });
    });

    btn_timbangHasil.addEventListener("click", function () {
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
                hasil_potongBerat.value = numeral(weight).value();
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

    btn_timbangAfalanWA.addEventListener("click", function () {
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
                afalan_waKG.value = numeral(weight).value();
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

    btn_timbangAfalanWE.addEventListener("click", function () {
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
                afalan_weKG.value = numeral(weight).value();
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

    btn_timbangAfalanLami.addEventListener("click", function () {
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
                afalan_lamiKG.value = numeral(weight).value();
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

    btn_timbangAfalanTepi.addEventListener("click", function () {
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
                afalan_tepiKG.value = numeral(weight).value();
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
            keterangan_kegiatan.focus();
        });
    });
});