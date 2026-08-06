//#region Variables

// Select Elements
const slcIdOrder = document.getElementById("id_order");
const slcKodeBarang = document.getElementById("kode_barang");
const slcBenangWARP = document.getElementById("benang_warp");
const slcBenangWEFT = document.getElementById("benang_weft");

// Input Elements (Kategori)
const txtKategoriUtama = document.getElementById("kategori_utama");
const txtKategoriBiasa = document.getElementById("kategori_biasa");
const txtIdSubKategori = document.getElementById("id_sub_kategori");
const txtSubKategori = document.getElementById("sub_kategori");

// Input Elements (Spesifikasi Karung)
const txtNamaOrder = document.getElementById("nama_order");
const txtUkuran = document.getElementById("ukuran");
const txtCorak = document.getElementById("corak");
const txtTextOrder = document.getElementById("text_order");
const txtWaRajutan = document.getElementById("wa_rajutan");
const txtWeRajutan = document.getElementById("we_rajutan");
const txtWaDenier = document.getElementById("wa_denier");
const txtWeDenier = document.getElementById("we_denier");
const txtDenier = document.getElementById("denier");
const txtKeterangan = document.getElementById("keterangan");
const txtEfisiensi = document.getElementById("efisiensi");

// Input Elements (Sub Kategori)
const txtIdSubBenang = document.getElementById("id_sub_benang");
const txtSubBenang = document.getElementById("sub_benang");

// Input Elements (Rencana)
const txtJumlahOrder = document.getElementById("jumlah_order");
const txtPanjangPotongan = document.getElementById("panjang_potongan");
const hidJumlahBenang = document.getElementById("jumlah_benang");
const dtTanggalKerja = document.getElementById("tgl_kerja");
const dtTanggalSelesai = document.getElementById("tgl_selesai");

// Button Elements
const btnBenangStrip = document.getElementById("btn_benang");
const spnBenangStrip = document.getElementById("jumlah_benang_strip");
const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

// Hidden Input Elements
const hidProses = document.getElementById("mode_proses");
const hidSp2 = document.getElementById("form_sp2");
const hidData = document.getElementById("form_data");
const hidData2 = document.getElementById("form_data2");

// Feedback Elements
const warnWa = document.getElementById("warn_wa");
const warnWe = document.getElementById("warn_we");
const warnEf = document.getElementById("warn_ef");
const warnOrder = document.getElementById("warn_order");
const warnTanggal = document.getElementById("warn_tanggal");

// Non-Elements
var adaOrder = false;
var jumlahBenang = 0;
const listOrder = [];
const BNG_listWaft = [];
const BNG_listWeft = [];
const BNG_listOrder = [];

//#endregion

//#region Listeners
$("#" + slcKodeBarang.id).on("select2:select", function (e) {
    let nama_barang = e.params.data.nama_barang;
    let jum = 0;

    for (let i = 0; i < nama_barang.length; i++) {
        const element = nama_barang[i];

        if (element == "/") {
            jum += 1;

            switch (jum) {
                case 1:
                    txtUkuran.value = nama_barang
                        .substring(i + 1, i + 7)
                        .trim();
                    break;

                case 2:
                    txtWaRajutan.value = nama_barang
                        .substring(i + 1, i + 6)
                        .trim();
                    txtWeRajutan.value = nama_barang
                        .substring(i + 9, i + 14)
                        .trim();
                    break;

                case 3:
                    txtDenier.value = nama_barang
                        .substring(i + 1, i + 6)
                        .trim();
                    break;

                case 4:
                    txtCorak.value = nama_barang.substring(i + 1, i + 7);
                    break;

                case 5:
                    break;

                case 6:
                    txtKeterangan.value = nama_barang.substring(i + 1);
                    break;
            }
        }
    }

    fetchSelect("/sp-orderD/Sp_List_Order~7/" + this.value, (data) => {
        txtNamaOrder.value = data[0].D_TEK0;

        const rightmostChar = txtNamaOrder.value.trim().slice(-1);
        if (isNaN(rightmostChar) || isNaN(parseInt(rightmostChar, 10))) {
            txtTextOrder.value = txtNamaOrder.value.trim().slice(0, -1);

            const checkingOrder = () => {
                cekOrder(txtTextOrder.value, (orderFound) => {
                    if (!orderFound) {
                        adaOrder = false;
                        slcBenangWARP.selectedIndex = 0;
                        slcBenangWEFT.selectedIndex = 0;
                    } else adaOrder = true;

                    txtWaDenier.disabled = false;
                    txtWeDenier.disabled = false;
                    txtEfisiensi.disabled = false;
                    txtJumlahOrder.disabled = false;
                    txtPanjangPotongan.disabled = false;

                    dtTanggalKerja.disabled = false;
                    dtTanggalSelesai.disabled = false;

                    slcBenangWARP.disabled = false;
                    slcBenangWEFT.disabled = false;

                    txtWaDenier.focus();
                });
            };

            showModal(
                "Order Acuannya: <b>" + txtTextOrder.value + "</b> ?",
                () => {
                    checkingOrder();
                },
                () => {
                    slcBenangWARP.selectedIndex = 0;
                    slcBenangWEFT.selectedIndex = 0;

                    fetchSelect("/sp-orderD/Sp_List_Order~8/", (data2) => {
                        showModalTable({
                            data: data2,
                            keyOrder: ["Nama_Brg", "D_tek0"],
                            tableHeaders: ["Nama Barang", "D Tek0"],
                            columnSizes: [200, 100],
                            postAction: () => {
                                txtTextOrder.value = MD_selectedData["D Tek0"];
                                checkingOrder();
                            },
                        });
                    });
                }
            );
        } else {
            slcBenangWARP.disabled = false;
            slcBenangWEFT.disabled = false;

            txtWaDenier.disabled = false;
            txtWeDenier.disabled = false;
            txtEfisiensi.disabled = false;
            txtJumlahOrder.disabled = false;
            txtPanjangPotongan.disabled = false;

            dtTanggalKerja.disabled = false;
            dtTanggalSelesai.disabled = false;

            txtWaDenier.focus();
        }
    });
});

$("#" + slcIdOrder.id).on("select2:select", function () {
    fetchSelect("/sp-orderD/Sp_List_Order~2/" + slcIdOrder.value, (data) => {
        addOptionToSelect(
            slcKodeBarang.id,
            data[0]["Kode_barang"],
            data[0]["Nama_Barang"]
        );

        addOptionToSelect(
            slcBenangWARP.id,
            data[0]["A_kodebarang_warp"],
            data[0]["BenangWarp"]
        );

        addOptionToSelect(
            slcBenangWEFT.id,
            data[0]["A_kodebarang_weft"],
            data[0]["BenangWeft"]
        );
        // console.log(data[0]);
        txtPanjangPotongan.value = data[0]["PanjangPotong"];
        txtJumlahOrder.value = data[0]["R_jumlah_Order"].slice(0, -3);
        dtTanggalKerja.value = dateTimeToDate(data[0]["R_tgl_Start"]);
        dtTanggalSelesai.value = dateTimeToDate(data[0]["R_tgl_Selesai"]);
        txtWaDenier.value = data[0]["A_n_warp"];
        txtWeDenier.value = data[0]["A_n_weft"];
        txtNamaOrder.value = data[0]["D_Tek0"];

        jumlahBenang =
            data[0]["JmlBngStrip"] === null ? 0 : data[0]["JmlBngStrip"];
        hidJumlahBenang.value = jumlahBenang;

        txtEfisiensi.value =
            data[0]["Estimasi_Effisiensi"] === null
                ? 0
                : data[0]["Estimasi_Effisiensi"];

        let nama_barang = data[0]["Nama_Barang"];
        let jum = 0;
        for (let i = 0; i < nama_barang.length; i++) {
            const element = nama_barang[i];

            if (element == "/") {
                jum += 1;

                switch (jum) {
                    case 1:
                        txtUkuran.value = nama_barang
                            .substring(i + 1, i + 7)
                            .trim();
                        break;

                    case 2:
                        txtWaRajutan.value = nama_barang
                            .substring(i + 1, i + 6)
                            .trim();
                        txtWeRajutan.value = nama_barang
                            .substring(i + 9, i + 14)
                            .trim();
                        break;

                    case 3:
                        txtDenier.value = nama_barang
                            .substring(i + 1, i + 6)
                            .trim();
                        break;

                    case 4:
                        txtCorak.value = nama_barang.substring(i + 1, i + 7);
                        break;

                    case 5:
                        break;

                    case 6:
                        txtKeterangan.value = nama_barang.substring(i + 1);
                        break;
                }
            }
        }

        btnProses.disabled = false;
        if (hidProses.value == "2") {
            slcBenangWARP.disabled = false;
            slcBenangWEFT.disabled = false;

            dtTanggalKerja.disabled = false;
            dtTanggalSelesai.disabled = false;

            txtPanjangPotongan.disabled = false;
            txtJumlahOrder.disabled = false;
            txtWaDenier.disabled = false;
            txtWeDenier.disabled = false;
            txtEfisiensi.disabled = false;

            txtWaDenier.focus();
        } else if (hidProses.value == "3") {
            btnProses.focus();
        }

        fetchSelect(
            "/sp-orderD/Sp_List_Benang~1/" + slcIdOrder.value,
            (data) => {
                BNG_listWaft.length = 0;
                for (let i = 0; i < data.length; i++) {
                    BNG_listOrder.push(data[i]["IdDetail"]);
                    listOrder.push(data[i]["IdDetail"]);
                    BNG_listWaft.push({
                        NamaBarang: data[i]["NAMA_BRG"],
                        KodeBarang: data[i]["Kd_Brg"],
                        JumlahBenang: data[i]["JmlBng"],
                        IdDetail: data[i]["IdDetail"],
                    });
                }

                fetchSelect(
                    "/sp-orderD/Sp_List_Benang~2/" + slcIdOrder.value,
                    (data) => {
                        BNG_listWeft.length = 0;
                        for (let i = 0; i < data.length; i++) {
                            BNG_listOrder.push(data[i]["IdDetail"]);
                            listOrder.push(data[i]["IdDetail"]);
                            BNG_listWeft.push({
                                NamaBarang: data[i]["NAMA_BRG"],
                                KodeBarang: data[i]["Kd_Brg"],
                                JumlahBenang: data[i]["JmlBng"],
                                IdDetail: data[i]["IdDetail"],
                            });
                        }

                        spnBenangStrip.textContent = listOrder.length;
                    },
                    () => {
                        spnBenangStrip.textContent = listOrder.length;
                    }
                );
            },
            () => { }
        );
    });
});

$("#" + slcBenangWARP.id).on("select2:select", function () {
    slcBenangWEFT.disabled = false;
    slcBenangWEFT.focus();
});

$("#" + slcBenangWEFT.id).on("select2:select", function () {
    txtJumlahOrder.disabled = false;
    txtPanjangPotongan.disabled = false;
    txtJumlahOrder.focus();
});

txtJumlahOrder.addEventListener("keydown", function (event) {
    let key = event.key;

    if (key === "," || key === "." || key === "-") {
        event.preventDefault();
    }
});

dtTanggalKerja.addEventListener("input", function () {
    if (this.value > dtTanggalSelesai.value) {
        warnTanggal.style.display = "block";
    } else {
        warnTanggal.style.display = "none";
    }
});

dtTanggalSelesai.addEventListener("input", function () {
    if (this.value < dtTanggalKerja.value) {
        warnTanggal.style.display = "block";
    } else {
        warnTanggal.style.display = "none";
    }
});

btnBenangStrip.addEventListener("click", function () {
    addOptionToSelect(BNG_slcSubKategori.id, "1474", "BENANG");
    BNG_txtIdOrder.value =
        slcIdOrder.selectedIndex === 0 ? "" : slcIdOrder.value;
    BNG_txtJmlBngStrip.value = hidJumlahBenang.value;
    BNG_txtJmlBenang.value = "";
    document.querySelector("html").style.overflow = "hidden";
    $("#modalBenang").modal("show");

    BNG_post_action = () => {
        document.querySelector("html").style.overflow = "auto";
        jumlahBenang = BNG_txtJmlBngStrip.value;
        hidJumlahBenang.value = BNG_txtJmlBngStrip.value;
        listOrder.length = 0;
        if (BNG_listOrder.length > 0) {
            for (let i = 0; i < BNG_listOrder.length; i++) {
                listOrder.push(BNG_listOrder[i]);
            }

            hidSp2.value = "Sp_Maint_Benang";
        }

        console.log("Jumlah Benang Strip: " + listOrder.length);
        spnBenangStrip.textContent =
            listOrder.length == 0 ? "" : listOrder.length;
    };
});

let lastActivity = Date.now();

document.addEventListener("click", () => lastActivity = Date.now());
document.addEventListener("keypress", () => lastActivity = Date.now());

setInterval(function () {
    let now = Date.now();
    let diff = (now - lastActivity) / 1000;

    if (diff > 600) { // 10 menit idle
        alert("Session akan habis, halaman akan di-refresh");
        location.reload();
    }
}, 60000);

document.getElementById("form_submit").addEventListener("submit", function () {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    let inputToken = this.querySelector('input[name="_token"]');

    if (!inputToken) {
        inputToken = document.createElement("input");
        inputToken.type = "hidden";
        inputToken.name = "_token";
        this.appendChild(inputToken);
    }

    inputToken.value = token;

    btnProses.disabled = true;
});

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
});

btnProses.addEventListener("click", function () {
    hidData.value = "";

    switch (hidProses.value) {
        case "3":
            // Mode proses "hapus"
            hidData.value = slcIdOrder.value;
            break;

        case "2":
            // Mode proses "koreksi"
            hidData.value =
                slcIdOrder.value +
                "~" +
                dtTanggalKerja.value +
                "~" +
                dtTanggalSelesai.value +
                "~" +
                txtJumlahOrder.value +
                "~" +
                txtWaDenier.value +
                "~" +
                txtWeDenier.value +
                "~" +
                slcBenangWARP.value +
                "~" +
                slcBenangWEFT.value +
                "~" +
                jumlahBenang +
                "~Mojosari Gedung D~" +
                txtEfisiensi.value +
                "~" +
                (txtPanjangPotongan.value || 0);
            break;

        default:
            // Mode proses "Isi"
            hidData.value =
                slcKodeBarang.value.trim() +
                "~" +
                dtTanggalKerja.value +
                "~" +
                dtTanggalSelesai.value +
                "~" +
                txtJumlahOrder.value +
                "~" +
                txtWaDenier.value +
                "~" +
                txtWeDenier.value +
                "~" +
                slcBenangWARP.value +
                "~" +
                slcBenangWEFT.value +
                "~" +
                jumlahBenang +
                "~Mojosari Gedung D~" +
                txtEfisiensi.value +
                "~" +
                (txtPanjangPotongan.value || 0);
            break;
    }
    hidData2.value = slcIdOrder.value + "~" + listOrder;
});

btnIsi.addEventListener("click", function () {
    hidProses.value = 1;
    toggleButtons(2);
    btnProses.disabled = false;
    isiForm();
    slcKodeBarang.disabled = false;
    slcKodeBarang.focus();
    btnBenangStrip.disabled = true;
});

btnKoreksi.addEventListener("click", function () {
    hidProses.value = 2;
    toggleButtons(2);
    isiForm();
    btnBenangStrip.disabled = false;
    slcIdOrder.disabled = false;
    slcIdOrder.focus();
});

btnHapus.addEventListener("click", function () {
    hidProses.value = 3;
    toggleButtons(2);
    isiForm();
    btnBenangStrip.disabled = false;
    slcIdOrder.disabled = false;
    slcIdOrder.focus();
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        clearForm();
        jumlahBenang = 0;
        toggleButtons(1);
        btnBenangStrip.disabled = true;
        listOrder.length = 0;
        spnBenangStrip.textContent = "";

        BNG_listOrder.length = 0;
        BNG_listWaft.length = 0;
        BNG_listWeft.length = 0;

        txtWaDenier.classList.remove("is-invalid");
        txtWeDenier.classList.remove("is-invalid");
        txtEfisiensi.classList.remove("is-invalid");
        txtJumlahOrder.classList.remove("is-invalid");

        $(
            '[aria-labelledby="select2-' + slcBenangWARP.id + '-container"]'
        ).removeClass("is-invalid");
        $(
            '[aria-labelledby="select2-' + slcBenangWEFT.id + '-container"]'
        ).removeClass("is-invalid");
        $(
            '[aria-labelledby="select2-' + slcKodeBarang.id + '-container"]'
        ).removeClass("is-invalid");
    } else window.location.href = "/";
});
//#endregion

//#region Functions
function cekOrder(sd_tek, post_action) {
    fetchSelect("/sp-orderD/Sp_List_Order~6/" + sd_tek, (data) => {
        if (data[0].Jml > 0) {
            fetchSelect("/sp-orderD/Sp_List_Order~5" + sd_tek, (data2) => {
                kode_warp = data2[0].A_kodebarang_warp;
                nama_warp = data2[0].Benang_warp;
                kode_weft = data2[0].A_kodebarang_weft;
                nama_weft = data2[0].Benang_weft;

                replaceFirstOption(
                    slcBenangWARP,
                    kode_warp,
                    kode_warp + " | " + nama_warp
                );

                replaceFirstOption(
                    slcBenangWEFT,
                    kode_weft,
                    kode_weft + " | " + nama_weft
                );

                console.log("cekOrder: true");
                post_action(true);
            });
        } else {
            console.log("cekOrder: false");
            post_action(false);
        }
    });
}

/**
 *
 * @param {number} i 1 untuk keluar, 2 untuk batal
 */
function toggleButtons(i) {
    switch (i) {
        case 2:
            btnIsi.disabled = true;
            btnKoreksi.disabled = true;
            btnHapus.disabled = true;
            btnKeluar.textContent = "Batal";
            btnBenangStrip.disabled = false;
            break;

        default:
            btnIsi.disabled = false;
            btnKoreksi.disabled = false;
            btnHapus.disabled = false;
            btnProses.disabled = true;
            btnKeluar.textContent = "Keluar";
            btnBenangStrip.disabled = true;
            disableAllInputs();
            break;
    }
}

function isiForm() {
    txtKategoriUtama.value = "PRODUCTION - Hasil Produksi KRR";
    txtKategoriBiasa.value = "HASIL PRODUCTION";
    txtSubKategori.value = "GELONDONGAN";
    txtIdSubKategori.value = "1097";
    txtSubBenang.value = "BENANG";
    txtIdSubBenang.value = "1474";
}

function init() {
    addTxtListener(txtWaDenier, txtWeDenier);
    addTxtListener(txtWeDenier, txtEfisiensi);
    addTxtListener(txtEfisiensi, slcBenangWARP);
    addTxtListener(txtJumlahOrder, dtTanggalKerja);
    addTxtListener(dtTanggalKerja, dtTanggalSelesai);
    addTxtListener(dtTanggalSelesai, btnProses, {
        extraAction: () => {
            if (dtTanggalSelesai.value < dtTanggalKerja.value) {
                return;
            } else {
                btnProses.disabled = false;
                btnProses.focus();
            }
        },
        stopAction: true,
    });

    prepareButtons(btnIsi, btnKoreksi, btnHapus, btnKeluar);

    addNumLimit(txtWaDenier, warnWa);
    addNumLimit(txtWeDenier, warnWe);
    addNumLimit(txtEfisiensi, warnEf);
    addNumLimit(txtJumlahOrder, warnOrder);

    addValidation(
        $(
            "#" +
            txtWaDenier.id +
            ", #" +
            txtWeDenier.id +
            ", #" +
            slcBenangWARP.id +
            ", #" +
            slcBenangWEFT.id +
            ", #" +
            txtJumlahOrder.id +
            ", #" +
            slcKodeBarang.id
        ),
        "form_submit"
    );

    $("#" + slcIdOrder.id).select2({
        placeholder: "",
        allowClear: true,
        ajax: {
            url: url_IdOrder,
            type: "GET",
            dataType: "json",
            delay: 250,

            data: function (params) {
                return {
                    searchItem: params.term,
                    page: params.page || 1,
                };
            },

            processResults: function (data, params) {
                params.page = params.page || 1;

                console.log(data.data);

                data.data.forEach(function (d) {
                    d.id = d.Id_order;
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
                return data.Id_order + " | " + data.Nama_Barang;
            }
        },

        templateSelection: function (data) {
            return data.Id_order || "-- Pilih Id Order --";
        },
    });

    $("#" + slcKodeBarang.id).select2({
        placeholder: "",
        allowClear: true,
        ajax: {
            url: url_KodeBarang,
            type: "GET",
            dataType: "json",
            delay: 250,

            data: function (params) {
                return {
                    searchItem: params.term,
                    page: params.page || 1,
                };
            },

            processResults: function (data) {
                data.forEach(function (d) {
                    d.id = d.KD_BRG;
                    d.text = d.KD_BRG + " | " + d.NAMA_BRG;
                    d.nama_barang = d.NAMA_BRG;
                });

                return {
                    results: data,
                    pagination: {
                        more: false
                    }
                };
            }
        },

        templateResult: function (data) {
            if (data.loading) {
                return data.text;
            } else {
                return data.KD_BRG + " | " + data.NmBrg;
            }
        },

        templateSelection: function (data) {
            return data.text || "-- Pilih Barang --";
        },

        escapeMarkup: function (markup) {
            return markup;
        },
    });

    $("#" + slcBenangWARP.id).select2({
        placeholder: "",
        allowClear: true,
        ajax: {
            url: url_BenangWarp,
            type: "GET",
            dataType: "json",
            delay: 250,

            data: function (params) {
                return {
                    searchItem: params.term,
                    page: params.page || 1,
                };
            },

            processResults: function (data, params) {
                params.page = params.page || 1;

                console.log(data.data);

                data.data.forEach(function (d) {
                    d.id = d.KD_BRG;

                    if (d.KD_BRG && d.NAMA_BRG) {
                        d.text = d.KD_BRG + " | " + d.NAMA_BRG;
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
                return data.KD_BRG + " | " + data.NAMA_BRG;
            }
        },

        templateSelection: function (data) {
            return data.text || "-- Pilih Benang WARP --";
        },
    });

    $("#" + slcBenangWEFT.id).select2({
        placeholder: "",
        allowClear: true,
        ajax: {
            url: url_BenangStrip,
            type: "GET",
            dataType: "json",
            delay: 250,

            data: function (params) {
                return {
                    searchItem: params.term,
                    page: params.page || 1,
                    subKategori: "1474",
                };
            },

            processResults: function (data, params) {
                params.page = params.page || 1;

                console.log(data.data);

                data.data.forEach(function (d) {
                    d.id = d.KD_BRG;

                    if (d.KD_BRG && d.NAMA_BRG) {
                        d.text = d.KD_BRG + " | " + d.NAMA_BRG;
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
                return data.KD_BRG + " | " + data.NAMA_BRG;
            }
        },

        templateSelection: function (data) {
            return data.text || "-- Pilih Benang WEFT --";
        },
    });

    dtTanggalKerja.value = getCurrentDate();
    dtTanggalSelesai.value = getCurrentDate();
}

$(document).ready(function () {
    init();
});
//#endregion

/**
 * CATATAN LAIN:
 *
 * Benang Waft benang yg nyantol d rak² mesin,
 * sedangkan benang Weft benang yg terpasang d shuttle.
 *
 * Jika karakter terakhir dari id order huruf,
 * maka akan menampilkan pesan peringatan untuk memilih Order Acuan.
 *
 * Saat ada benang strip data tidak bisa dihapus,
 * akan muncul sql exception.
 */
