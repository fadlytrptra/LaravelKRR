//#region Variables

// Input Text Elements
const txtIdDivisi = document.getElementById("id_divisi");
const txtDivisi = document.getElementById("divisi");
const txtIdObjek = document.getElementById("id_objek");
const txtObjek = document.getElementById("objek");
const txtIdKelut = document.getElementById("id_kelut");
const txtKelut = document.getElementById("kelut");
const txtTypeBarang = document.getElementById("type_barang");
const txtIdKelompok = document.getElementById("id_kelompok");
const txtKelompok = document.getElementById("kelompok");
const txtKodeBarang = document.getElementById("kode_barang");
const txtNamaBarang = document.getElementById("nama_barang");

// Input Number Elements
const numPrimer = document.getElementById("primer");
const numSekunder = document.getElementById("sekunder");
const numTritier = document.getElementById("tritier");
const numHasilKonversi = document.getElementById("hasil_konversi");
const numTotalBenang = document.getElementById("total_benang");

// Other Elements
const slcSubKelompok = document.getElementById("sub_kelompok");
const spnPrimer = document.getElementById("label_primer");
const spnSekunder = document.getElementById("label_sekunder");
const spnTritier = document.getElementById("label_tritier");
const hidIdMesin = document.getElementById("hid_id_mesin");
const hidIdOrder = document.getElementById("hid_id_order");
const hidIdLog = document.getElementById("hid_id_log");

// Button Elements
const btnHitung = document.getElementById("btn_hitung");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

// Table Array
const listAsal = [];
/** ISI LIST ASAL
 * 0 KodeBarang
 * 1 NamaType
 * 2 Primer
 * 3 Sekunder
 * 4 Tritier
 * 5 IdSubKelompok
 * 6 IdType
 * 7 SaldoPrimer
 * 8 SaldoSekunder
 * 9 SaldoTritier
 * 10 KodeBenang
 * 11 NamaSubKelompok
 */

// Non-Elements
var [keluarP, keluarS, keluarT] = [0, 0, 0];
var [saldoPrimer, saldoSekunder, saldoTritier] = [0, 0, 0];
var [idType, namaType] = ["", ""];
var [jumlahKu, p0, p1] = [0, 0, 0];
var [asal1, asal2] = ["", ""];
var [xBeratWa, xBeratWe, beratWa, beratWe] = [0, 0, 0, 0];
var [rwa, dwa, rwe, dwe] = [0, 0, 0, 0];
var [lebar, ket, jRein, lRein] = [0, 0, 0, 0];
var jumlahBenang = 0;
var [dBenang, jStrip] = [0, 0];
var [idMesin, idOrder, idLog] = ["", "", ""];

var idKelompok = "";

//#endregion

//#region Event Listeners
$("#" + slcSubKelompok.id).on("select2:select", function () {
    cekTypeBarang(txtKodeBarang.value, slcSubKelompok.value, (bool) => {
        if (bool) {
            cekKonversi(idOrder);
        } else {
            showToast(
                "Isi Dulu Pada Menu Type Barang Perdivisi Pada Program Inventory. Program Tidak Dapat Dilanjutkan"
            );

            // window.location.href = "/proses/formHasilMeter";
        }
    });
});

$("#sub_kelompok").on("select2:open", function () {
    this.selectedIndex = 0;
});

btnHitung.addEventListener("click", function () {
    let p2 = 0;

    xBeratWa = 0;
    xBeratWe = 0;
    beratWa = 0;
    beratWe = 0;

    listTypeTujuan(idOrder, txtKodeBarang.value, () => {
        p1 = parseFloat(numTritier.value) * 1143000;
        p2 =
            lebar *
                (parseFloat(rwa) * parseFloat(dwa) +
                    parseFloat(rwe) * parseFloat(dwe)) +
            0.5 *
                parseFloat(jRein) *
                parseFloat(lRein) *
                parseFloat(rwa) *
                parseFloat(dwa);
        p0 = p1 / p2;

        let xReinf =
            (jRein * lRein * parseFloat(rwa) * parseFloat(dwa) * p0) / 2286000;

        // Mengambil index terakhir dari array listAsal dengan KodeBenang "1"
        let benangStripAkhir = 0;
        for (let i = listAsal.length - 1; i >= 0; i--) {
            if (listAsal[i]["KodeBenang"] == "1") {
                benangStripAkhir = i;
                break;
            }
        }

        const hitungBerat = () => {
            for (let j = 0; j < listAsal.length; j++) {
                if (listAsal[j]["KodeBenang"] == "4") {
                    xBeratWe =
                        (parseFloat(lebar) *
                            p0 *
                            parseFloat(rwe) *
                            parseFloat(dwe)) /
                        1143000;

                    beratWe = xBeratWe;
                    listAsal[j]["Tritier"] = beratWe.toFixed(2);
                } else if (listAsal[j]["KodeBenang"] == "3") {
                    xBeratWa =
                        (parseFloat(lebar) *
                            p0 *
                            parseFloat(rwa) *
                            parseFloat(dwa)) /
                        1143000;

                    beratWa = xBeratWa + xReinf - beratStrip;
                    listAsal[j]["Tritier"] = beratWa.toFixed(2);
                }
            }

            let beratBenang = 0;
            for (let j = 0; j < listAsal.length; j++) {
                beratBenang += parseFloat(listAsal[j]["Tritier"]);
            }

            numTotalBenang.value = beratBenang;
            btnProses.focus();
        };

        let beratStrip = 0;
        for (let i = 0; i < listAsal.length; i++) {
            let xBeratStrip = 0;
            if (listAsal[i]["KodeBenang"] == "1") {
                listTypeAsal(
                    idOrder,
                    listAsal[i]["KodeBarang"],
                    listAsal[i]["KodeBenang"],
                    () => {
                        xBeratStrip =
                            (parseFloat(jStrip) * parseFloat(dBenang) * p0) /
                            90000;
                        beratStrip += xBeratStrip;
                        listAsal[i]["Tritier"] = xBeratStrip.toFixed(2);

                        // Jika proses untuk KodeBenang "1" sudah selesai semua
                        if (i == benangStripAkhir) {
                            console.log("Mulai hitung");
                            hitungBerat();
                        }
                    }
                );
            } else {
                // Jika proses untuk KodeBenang "1" sudah selesai semua
                if (i == benangStripAkhir) {
                    console.log("Mulai hitung");
                    hitungBerat();
                }
            }
        }

        updateTableAsal();
    });
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/proses/formHasilMeter";
});

//#endregion

//#region Functions

function cekJumlahKeluar(id_type) {
    fetchSelect(
        "/sp-proses/SP_1486_CIR_LIST_JML_ANTRIAN/" + id_type,
        (data) => {
            keluarP = data[0]["outprimer"] ? data[0]["outprimer"] : 0;
            keluarS = data[0]["outSekunder"] ? data[0]["outSekunder"] : 0;
            keluarT = data[0]["outTritier"] ? data[0]["outTritier"] : 0;
        }
    );
}

function cekDetailAsal(kd_barang, id_subkel, kode) {
    let [saldo, lt, ls, lp] = ["", "", "", ""];
    let [t0, t1, t2, t3, t4, t5] = ["", "", "", "", "", ""];
    let [t6, t7, t8, t9, t10] = ["", "", "", "", ""];

    fetchSelect(
        "/sp-proses/sp_List_Subkel/" + kd_barang + "~" + id_subkel,
        (data) => {
            if (kode == 1) {
                // Sepertinya digunakan untuk debugging
                // Jika ya, maka nanti hapus saja

                t0 = data[0]["NAMATYPE"];
                t1 = data[0]["IDDIVISI"];
                t2 = data[0]["namadivisi"];
                t3 = data[0]["idobjek"];
                t4 = data[0]["namaobjek"];
                t5 = data[0]["idkelompokutama"];
                t6 = data[0]["namakelompokutama"];
                t7 = data[0]["idkelompok"];
                t8 = data[0]["namakelompok"];
                t9 = data[0]["idsubkelompok"];
                t10 = data[0]["namasubkelompok"];
                lp = data[0]["satprimer"];
                ls = data[0]["satsekunder"];
                lt = data[0]["nama_satuan"];
                saldo = data[0]["saldotritier"];
            } else {
                saldoPrimer = data[0]["saldoPrimer"];
                saldoSekunder = data[0]["saldosekunder"];
                saldoTritier = data[0]["saldotritier"];
            }
        }
    );
}

function isiTujuanKonversi(id_mesin, id_order, id_log) {
    let typeKu, namaKu, kodeKu;
    fetchSelect(
        "/sp-proses/Sp_Maint_Transfer~4/" +
            id_mesin +
            "~" +
            id_order +
            "~" +
            id_log,
        (data) => {
            typeKu = data[0]["Type_mesin"];
            namaKu = data[0]["nama_mesin"];
            kodeKu = data[0]["kodebarang"];

            // Mengambil data dari db INVENTORY
            fetchSelect(
                "/sp-proses/Sp_Maint_Transfer~8/" +
                    typeKu +
                    "~" +
                    namaKu +
                    "~" +
                    kodeKu,
                (data2) => {
                    txtIdDivisi.value = data2[0]["IdDivisi"];
                    txtDivisi.value = data2[0]["NamaDivisi"];
                    txtIdObjek.value = data2[0]["IdObjek"];
                    txtObjek.value = data2[0]["NamaObjek"];
                    txtIdKelut.value = data2[0]["IdKelompokUtama"];
                    txtKelut.value = data2[0]["NamaKelompokUtama"];
                    txtIdKelompok.value = data2[0]["IdKelompok"];
                    idKelompok = txtIdKelompok.value;
                    txtKelompok.value = data2[0]["NamaKelompok"];
                    txtKodeBarang.value = data2[0]["KodeBarang"];

                    slcSubKelompok.disabled = false;
                    slcSubKelompok.focus();
                },
                () => {
                    showModal(
                        "Cek di Program Inventory pada,<br>Divisi: Circular <br>Objek: Produksi Roll <br><br>Untuk kelompok utama atau kelompok atau subkelompok atau type ada yang belum terbentuk. <br><br>Program Tidak Dapat Dilanjutkan!"
                    );
                }
            );
        }
    );
}

/**
 * Nama fungsi pada program lama = IsiAsalKonversi()
 * @param {String} type1
 * @param {String} type2
 * @param {Function} post_action
 */
function isiAsalKonversiUtama(type1, type2, post_action = null) {
    fetchSelect(
        "/sp-proses/Sp_Maint_Transfer~7/" +
            idMesin +
            "~" +
            idOrder +
            "~" +
            type1,
        (data) => {
            listAsal.length = 0;

            for (let i = 0; i < data.length; i++) {
                listAsal.push({
                    KodeBarang: data[i]["KodeBarang"],
                    NamaType: data[i]["NamaType"],
                    Primer: 0,
                    Sekunder: 0,
                    Tritier: 0,
                    IdSubKelompok: data[i]["IdSubkelompok"],
                    IdType: data[i]["IdType"],
                    SaldoPrimer: data[i]["SaldoPrimer"],
                    SaldoSekunder: data[i]["SaldoSekunder"],
                    SaldoTritier: data[i]["SaldoTritier"],
                    KodeBenang: "3", // Benang WA Utama
                    NamaSubKelompok: data[i]["NamaSubKelompok"],
                });
            }

            fetchSelect(
                "/sp-proses/Sp_Maint_Transfer~7/" +
                    idMesin +
                    "~" +
                    idOrder +
                    "~" +
                    type2,
                (data) => {
                    for (let i = 0; i < data.length; i++) {
                        listAsal.push({
                            KodeBarang: data[i]["KodeBarang"],
                            NamaType: data[i]["NamaType"],
                            Primer: 0,
                            Sekunder: 0,
                            Tritier: 0,
                            IdSubKelompok: data[i]["IdSubkelompok"],
                            IdType: data[i]["IdType"],
                            SaldoPrimer: data[i]["SaldoPrimer"],
                            SaldoSekunder: data[i]["SaldoSekunder"],
                            SaldoTritier: data[i]["SaldoTritier"],
                            KodeBenang: "4", // Benang WE Utama
                            NamaSubKelompok: data[i]["NamaSubKelompok"],
                        });
                    }

                    if (post_action) {
                        post_action();
                    }
                }
            );
        }
    );
}

/**
 * Nama fungsi pada program lama = IsiAsalKonversi1()
 * @param {String} mesin
 * @param {String} id_order
 */
function isiAsalKonversiStrip(mesin, id_order, post_action = null) {
    fetchSelect(
        "/sp-proses/Sp_Maint_Transfer~10/" + id_order + "~" + mesin,
        (data) => {
            listAsal.length = 0;

            for (let i = 0; i < listAsal.length; i++) {
                listAsal.push({
                    KodeBarang: data[i]["KodeBarang"],
                    NamaType: data[i]["NamaType"],
                    Primer: 0,
                    Sekunder: 0,
                    Tritier: 0,
                    IdSubKelompok: data[i]["IdSubkelompok"],
                    IdType: data[i]["IdType"],
                    SaldoPrimer: data[i]["SaldoPrimer"],
                    SaldoSekunder: data[i]["SaldoSekunder"],
                    SaldoTritier: data[i]["SaldoTritier"],
                    KodeBenang: data[i]["Ket"],
                    NamaSubKelompok: data[i]["NamaSubKelompok"],
                });
            }

            if (post_action) {
                post_action();
            }
        },
        () => {
            if (post_action) {
                post_action();
            }
        }
    );
}

/**
 * Gabungan dari fungsi CekAsalKonversi() & CekTypeKonversi, termasuk pengecekkan yang dilakukan setelahnya
 * Juga termasuk fungsi CekBenangStrip()
 * @param {String} id_order
 */
function cekKonversi(id_order) {
    fetchSelect("/sp-proses/Sp_Maint_Transfer~5/" + id_order, (data) => {
        asal1 = data[0]["A_kodebarang_warp"];
        asal2 = data[0]["A_kodebarang_weft"];

        fetchSelect(
            "/sp-proses/Sp_Maint_Transfer~6/" +
                asal1 +
                "~" +
                asal2 +
                "~" +
                idOrder +
                "~" +
                idMesin,
            (data2) => {
                jumlahKu = data2[0]["Jumlah"];

                if (asal1 == asal2) {
                    if (jumlahKu < 1) {
                        showToast(
                            "Kode Benang Utama Belum Ada, Isi Dulu di Inventory. Program Tidak dapat dilanjutkan",
                            "error"
                        );

                        return;
                    }
                } else {
                    if (jumlahKu < 2) {
                        showToast(
                            "Kode Benang Utama Belum Ada, Isi Dulu di Inventory. Program Tidak dapat dilanjutkan",
                            "error"
                        );

                        return;
                    }
                }

                // Cek Benang Strip
                fetchSelect(
                    "/sp-proses/Sp_Maint_Transfer~9/" + idOrder + "~" + idMesin,
                    (data) => {
                        if (data[0]["Error"]) {
                            showToast(data[0]["Error"], "error");
                        } else {
                            isiAsalKonversiUtama(asal1, asal2, () => {
                                isiAsalKonversiStrip(
                                    txtKelompok.value,
                                    idOrder,
                                    () => {
                                        console.log("Halo");
                                        updateTableAsal();

                                        numPrimer.disabled = false;
                                        numPrimer.focus();

                                        btnProses.disabled = false;
                                    }
                                );
                            });
                        }
                    }
                );
            }
        );
    });
}

function cekTypeBarang(kd_barang, subkel, post_action) {
    fetchSelect(
        "/sp-proses/sp_KodeBarang_Type/" + kd_barang + "~" + subkel,
        (data) => {
            spnPrimer.textContent = data[0]["satuan_primer"]
                ? data[0]["satuan_primer"]
                : "";
            spnSekunder.textContent = data[0]["satuan_sekunder"]
                ? data[0]["satuan_sekunder"]
                : "";
            spnTritier.textContent = data[0]["satuan_tritier"]
                ? data[0]["satuan_tritier"]
                : "";

            idType = data[0]["IdType"];
            namaType = data[0]["NamaType"];

            txtNamaBarang.value = data[0]["NamaType"];
            txtTypeBarang.value = data[0]["IdType"];

            post_action(true);
        },
        () => {
            post_action(false);
        }
    );
}

function listTypeTujuan(id_order, kd_barang, post_action = null) {
    fetchSelect(
        "/sp-proses/sp_List_Type~1/" + id_order + "~" + kd_barang.trim(),
        (data) => {
            rwa = data[0]["Rwa"];
            dwa = data[0]["DwA"];
            rwe = data[0]["Rwe"];
            dwe = data[0]["Dwe"];
            lebar = data[0]["Lebar"];
            ket = data[0]["Ket"];
            jRein = data[0]["JmlReinf"];
            lRein = data[0]["LReinf"];
            jumlahBenang = data[0]["JmlBngStrip"] ? data[0]["JmlBngStrip"] : 0;

            if (post_action) post_action();
        },
        () => {
            rwa = 0;
            dwa = 0;
            rwe = 0;
            dwe = 0;
            lebar = 0;
            ket = "";
            jRein = 0;
            lRein = 0;
            jumlahBenang = 0;

            if (post_action) post_action();
        }
    );
}

function listTypeAsal(id_order, kd_barang, ket_ku, post_action = null) {
    fetchSelect(
        "/sp-proses/sp_List_Type~2/" +
            id_order +
            "~" +
            kd_barang.trim() +
            "~" +
            ket_ku.trim(),
        (data) => {
            let l_ket = data[0]["D_Tek2"];
            dBenang = 0;

            if (!Number.isNaN(parseFloat(l_ket))) {
                dBenang = l_ket * 10;
            } else {
                switch (l_ket) {
                    case "A0":
                        dBenang = 1000;
                        break;

                    case "F0":
                        dBenang = 1500;
                        break;

                    case "I0":
                        dBenang = 1800;
                        break;

                    case "K0":
                        dBenang = 2000;
                        break;
                    case "L0":
                        dBenang = 2100;
                        break;

                    default:
                        break;
                }
            }

            if (post_action) post_action();
        }
    );
}

function updateTableAsal() {
    updateTable("table_asal", listAsal, [
        "KodeBarang",
        "NamaType",
        "Primer",
        "Sekunder",
        "Tritier",
        "IdType",
        "SaldoPrimer",
        "SaldoSekunder",
        "SaldoTritier",
        "KodeBenang",
        "NamaSubKelompok",
    ]);
}

function hitungHasilMeter() {
    var i;
    var jum = 0;
    var weft, lebar_, waft, denier;
    var meter = 0;

    for (i = 0; i < txtNamaBarang.value.trim().length; i++) {
        if (txtNamaBarang.value.trim().charAt(i) === "/") {
            jum++;
            switch (jum) {
                case 1:
                    lebar_ = parseFloat(
                        txtNamaBarang.value.trim().substring(i + 1, i + 7)
                    );
                    break;
                case 2:
                    waft = parseFloat(
                        txtNamaBarang.value.trim().substring(i + 1, i + 6)
                    );
                    weft = parseFloat(
                        txtNamaBarang.value.trim().substring(i + 9, i + 14)
                    );
                    break;
                case 3:
                    denier = parseFloat(
                        txtNamaBarang.value
                            .trim()
                            .substring(i + 1, i + 6)
                            .replace(/[^0-9]/g, "")
                    );
                    break;
            }
        }
    }

    let z = slcSubKelompok.selectedIndex;
    if (
        slcSubKelompok.value === "0629" ||
        slcSubKelompok.options[z].text.startsWith("Kain") ||
        slcSubKelompok.options[z].text.startsWith("Kain No Lami")
    ) {
        meter =
            10 /
            (lebar_ / 2) /
            ((waft + weft) / 20) /
            ((denier * 2) / 2000) /
            0.0175;
    } else {
        meter =
            10 / lebar_ / ((waft + weft) / 20) / ((denier * 2) / 2000) / 0.0175;
    }

    console.log("Hasil hitung hasil meter: ", meter);
    return meter;
}

function init() {
    const columnsKu = [
        {
            width: "100px", // KodeBarang
        },
        {
            width: "300px", // NamaType
        },
        {
            width: "100px", // Primer
        },
        {
            width: "100px", // Sekunder
        },
        {
            width: "100px", // Tritier
        },
        {
            width: "100px", // IdType
        },
        {
            width: "125px", // SaldoPrimer
        },
        {
            width: "125px", // SaldoSekunder
        },
        {
            width: "125px", // SaldoTritier
        },
        {
            width: "100px", // KodeBenang
        },
        {
            width: "100px", // NamaSubKelompok
        },
    ];

    initTable("table_asal", columnsKu);

    $("#sub_kelompok").select2();
    addTxtListener(numPrimer, numTritier);
    addTxtListener(numTritier, btnHitung, {
        extraAction: () => {
            numHasilKonversi.value = (
                hitungHasilMeter() * parseFloat(numTritier.value)
            ).toFixed(2);
        },
    });

    [keluarP, keluarS, keluarT] = [0, 0, 0];
    [saldoPrimer, saldoSekunder, saldoTritier] = [0, 0, 0];
    [idMesin, idOrder, idLog] = ["", "", ""];
    [idType, namaType] = ["", ""];
    [jumlahKu, p0, p1] = [0, 0, 0];
    [asal1, asal2] = ["", ""];
    [xBeratWa, xBeratWe, beratWa, beratWe] = [0, 0, 0, 0];
    [rwa, dwa, rwe, dwe] = [0, 0, 0, 0];
    [lebar, ket, jRein, lRein] = [0, 0, 0, 0];
    jumlahBenang = 0;
    [dBenang, jStrip] = [0, 0];
    [idMesin, idOrder, idLog] = [
        hidIdMesin.value,
        hidIdOrder.value,
        hidIdLog.value,
    ];

    isiTujuanKonversi(hidIdMesin.value, hidIdOrder.value, hidIdLog.value);

    addTxtListener(numPrimer, numTritier);
    addTxtListener(numTritier, btnHitung, {
        extraAction: () => {
            numHasilKonversi.value = (
                hitungHasilMeter() * parseFloat(numTritier.value)
            ).toFixed(2);
        },
    });

    $("#" + slcSubKelompok.id).select2({
        placeholder: "-- Pilih Sub Kelompok --",
        ajax: {
            url: url_SubKelompok,
            type: "GET",
            dataType: "json",
            delay: 250,

            data: function (params) {
                return {
                    searchItem: params.term,
                    page: params.page || 1,
                    subKategori: idKelompok,
                };
            },

            processResults: function (data, params) {
                params.page = params.page || 1;

                console.log(data.data);

                data.data.forEach(function (d) {
                    d.id = d.idsubkelompok;

                    if (d.idsubkelompok && d.namasubkelompok) {
                        d.text = d.idsubkelompok + " | " + d.namasubkelompok;
                    }
                });

                return {
                    results: data.data,
                    pagination: {
                        more: data.current_page < data.last_page,
                    },
                };
            },
        },

        templateResult: function (data) {
            if (data.loading) {
                return data.text;
            } else {
                return data.idsubkelompok + " | " + data.namasubkelompok;
            }
        },

        templateSelection: function (data) {
            return data.text || "-- Pilih Sub Kelompok --";
        },
    });
}

$(document).ready(function () {
    init();

    console.log(idOrder);
});

//#endregion
