//#region Variabel dan DOM
const RK_txtIdKelutTujuan = document.getElementById("id_kelut_tujuan_rk");
const RK_txtNamaKelutTujuan = document.getElementById("txt_kelut_tujuan_rk");
const RK_btnKelutTujuan = document.getElementById("btn_lookup_kelut_rk");

const RK_txtIdKelTujuan = document.getElementById("id_kel_tujuan_rk");
const RK_txtNamaKelTujuan = document.getElementById("txt_kel_tujuan_rk");
const RK_btnKelTujuan = document.getElementById("btn_lookup_kel_rk");

const RK_txtIdSubkelTujuan = document.getElementById("id_subkel_tujuan_rk");
const RK_txtNamaSubkelTujuan = document.getElementById("txt_subkel_tujuan_rk");
const RK_btnSubkelTujuan = document.getElementById("btn_lookup_subkel_rk");

const RK_txtIdTypeTujuan = document.getElementById("id_type_tujuan_rk");
const RK_txtNamaTypeTujuan = document.getElementById("txt_type_tujuan_rk");
const RK_btnTypeTujuan = document.getElementById("btn_lookup_type_rk");

const RK_txtIdKelut = document.getElementById("id_kelut_rk");
const RK_txtNamaKelut = document.getElementById("nama_kelut_rk");
const RK_txtIdKelompok = document.getElementById("id_kel_rk");
const RK_txtNamaKelompok = document.getElementById("nama_kel_rk");
const RK_txtIdSubkel = document.getElementById("id_subkel_rk");
const RK_txtNamaSubkel = document.getElementById("nama_subkel_rk");
const RK_txtIdType = document.getElementById("id_type_rk");
const RK_txtNamaType = document.getElementById("nama_type_rk");

const txtSaldoPrimerAsal = document.getElementById("saldo_primer_asal");
const txtSaldoSekunderAsal = document.getElementById("saldo_sekunder_asal");
const txtSaldoTritierAsal = document.getElementById("saldo_tritier_asal");
const spnSatuanPrimerAsal = document.getElementById("sat_primer_asal");
const spnSatuanSekunderAsal = document.getElementById("sat_sekunder_asal");
const spnSatuanTritierAsal = document.getElementById("sat_tritier_asal");
const txtPrimerAsal = document.getElementById("primer_asal");
const txtSekunderAsal = document.getElementById("sekunder_asal");
const txtTritierAsal = document.getElementById("tritier_asal");

const txtSaldoPrimerTujuan = document.getElementById("saldo_primer_tujuan");
const txtSaldoSekunderTujuan = document.getElementById("saldo_sekunder_tujuan");
const txtSaldoTritierTujuan = document.getElementById("saldo_tritier_tujuan");
const spnSatuanPrimerTujuan = document.getElementById("sat_primer_tujuan");
const spnSatuanSekunderTujuan = document.getElementById("sat_sekunder_tujuan");
const spnSatuanTritierTujuan = document.getElementById("sat_tritier_tujuan");
const txtPrimerTujuan = document.getElementById("primer_tujuan");
const txtSekunderTujuan = document.getElementById("sekunder_tujuan");
const txtTritierTujuan = document.getElementById("tritier_tujuan");

const RK_btnConfirm = document.getElementById("rk_confirm");

// Kumpulan elemen untuk di-disable
const boxAsalKonversi = document.querySelectorAll("#asal_konv .form-control");
const boxTujuanKonversi = document.querySelectorAll(
    "#tujuan_konv .form-control, #tujuan_konv button",
);
const tujuanLookupButtons = [
    RK_btnKelutTujuan,
    RK_btnKelTujuan,
    RK_btnSubkelTujuan,
    RK_btnTypeTujuan,
];

var RK_modeProses = "";
//#endregion

//#region Function
function RK_setState(asalReadonly, tujuanReadonly, tujuanLookupEnabled) {
    boxAsalKonversi.forEach((el) => (el.disabled = asalReadonly));

    boxTujuanKonversi.forEach((el) => {
        if (el.tagName === "INPUT") {
            el.disabled = tujuanReadonly;
        } else if (el.tagName === "BUTTON") {
        }
    });

    tujuanLookupButtons.forEach((btn) => {
        btn.disabled = !tujuanLookupEnabled;
    });
}

function RK_setStateKoreksi(jenis) {
    boxAsalKonversi.forEach((el) => {
        el.disabled = true;
    });

    boxTujuanKonversi.forEach((el) => {
        el.disabled = true;
    });

    tujuanLookupButtons.forEach((btn) => {
        btn.disabled = true;
    });

    if (jenis === "asal") {
        txtPrimerAsal.disabled = false;
        txtSekunderAsal.disabled = false;
        txtTritierAsal.disabled = false;
    }

    if (jenis === "tujuan") {
        txtPrimerTujuan.disabled = false;
        txtSekunderTujuan.disabled = false;
        txtTritierTujuan.disabled = false;
    }
}

function RK_clearTujuan() {
    RK_txtIdKelutTujuan.value = "";
    RK_txtNamaKelutTujuan.value = "";
    RK_txtIdKelTujuan.value = "";
    RK_txtNamaKelTujuan.value = "";
    RK_txtIdSubkelTujuan.value = "";
    RK_txtNamaSubkelTujuan.value = "";
    RK_txtIdTypeTujuan.value = "";
    RK_txtNamaTypeTujuan.value = "";
    txtPrimerTujuan.value = "0";
    txtSekunderTujuan.value = "0";
    txtTritierTujuan.value = "0";
    txtSaldoPrimerTujuan.value = "0";
    txtSaldoSekunderTujuan.value = "0";
    txtSaldoTritierTujuan.value = "0";
    spnSatuanPrimerTujuan.textContent = "";
    spnSatuanSekunderTujuan.textContent = "";
    spnSatuanTritierTujuan.textContent = "";
}

function RK_clearAll() {
    boxAsalKonversi.forEach((txt) => (txt.value = ""));
    RK_clearTujuan();

    tujuanLookupButtons.forEach((btn) => (btn.disabled = true));
}

function saldoTypeFetch(id_type, asal) {
    fetchSelectAsync(`/Benang/getSaldoBarang/${safeUrlParam(id_type)}`)
        .then((data) => {
            if (data && data.length > 0) {
                const d = data[0];
                if (asal) {
                    txtSaldoPrimerAsal.value = d.SaldoPrimer || 0;
                    txtSaldoSekunderAsal.value = d.SaldoSekunder || 0;
                    txtSaldoTritierAsal.value = d.SaldoTritier || 0;
                    spnSatuanPrimerAsal.textContent = d.SatPrimer || "";
                    spnSatuanSekunderAsal.textContent = d.SatSekunder || "";
                    spnSatuanTritierAsal.textContent = d.SatTritier || "";
                } else {
                    txtSaldoPrimerTujuan.value = d.SaldoPrimer || 0;
                    txtSaldoSekunderTujuan.value = d.SaldoSekunder || 0;
                    txtSaldoTritierTujuan.value = d.SaldoTritier || 0;
                    spnSatuanPrimerTujuan.textContent = d.SatPrimer || "";
                    spnSatuanSekunderTujuan.textContent = d.SatSekunder || "";
                    spnSatuanTritierTujuan.textContent = d.SatTritier || "";
                }
            }
        })
        .catch(() => console.warn("Gagal mengambil saldo type"));
}
//#endregion

//#region Input Event
txtPrimerAsal.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        if (this.value === "") this.value = "0";
        txtSekunderAsal.select();
    }
});
txtSekunderAsal.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        if (this.value === "") this.value = "0";
        txtTritierAsal.select();
    }
});
txtTritierAsal.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const val = parseFloat(this.value);
        if (val <= 0 || isNaN(val)) {
            Swal.fire(
                "Peringatan",
                "Jumlah tritier harus lebih besar dari 0.",
                "warning",
            );
            this.focus();
        } else {
            if (window.modeProses === "koreksi") {
                RK_btnConfirm.focus();
            } else {
                txtTritierTujuan.value = this.value;
                RK_btnKelutTujuan.disabled = false;
                $("#form_rincian_konversi .modal-body").animate(
                    {
                        scrollTop: $("#form_rincian_konversi .modal-body")[0]
                            .scrollHeight,
                    },
                    100,
                );
                RK_btnKelutTujuan.focus();
            }
        }
    }
});

txtTritierAsal.addEventListener("blur", function () {
    const val = parseFloat(this.value);
    if (val <= 0 || isNaN(val)) {
        this.value = "0";
    }
});

txtPrimerTujuan.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        if (this.value === "") this.value = "0";
        txtSekunderTujuan.disabled = false;
        txtSekunderTujuan.select();
    }
});
txtSekunderTujuan.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        if (this.value === "") this.value = "0";
        txtTritierTujuan.disabled = false;
        txtTritierTujuan.select();
    }
});
txtTritierTujuan.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const val = parseFloat(this.value);
        if (val <= 0 || isNaN(val)) {
            Swal.fire(
                "Peringatan",
                "Jumlah tritier harus lebih besar dari 0.",
                "warning",
            );
            this.select();
        } else {
            RK_btnConfirm.focus();
        }
    }
});
txtTritierTujuan.addEventListener("blur", function () {
    const val = parseFloat(this.value);
    if (val <= 0 || isNaN(val)) {
        this.value = "0";
    }
});

RK_btnKelutTujuan.addEventListener("click", function () {
    if (this.disabled) return;
    openLookupModal({
        title: "Pilih Kelompok Utama",
        url: `/Benang/getKelompokUtama_IdObjek/032/3`,
        headers: ["ID", "Nama Kelompok Utama"],
        columns: ["IdKelompokUtama", "NamaKelompokUtama"],
        onSelect: function (selected) {
            RK_txtIdKelutTujuan.value = selected.IdKelompokUtama;
            RK_txtNamaKelutTujuan.value = selected.NamaKelompokUtama;
            RK_txtIdKelTujuan.value = "";
            RK_txtNamaKelTujuan.value = "";
            RK_txtIdSubkelTujuan.value = "";
            RK_txtNamaSubkelTujuan.value = "";
            RK_txtIdTypeTujuan.value = "";
            RK_txtNamaTypeTujuan.value = "";
            RK_btnKelTujuan.disabled = false;
            RK_btnSubkelTujuan.disabled = true;
            RK_btnTypeTujuan.disabled = true;
            RK_btnKelTujuan.focus();
        },
    });
});

RK_btnKelTujuan.addEventListener("click", function () {
    if (this.disabled) return;
    openLookupModal({
        title: "Pilih Kelompok",
        url: `/Benang/getKelompok_IdKelut/${safeUrlParam(RK_txtIdKelutTujuan.value)}`,
        headers: ["ID", "Nama Kelompok"],
        columns: ["idkelompok", "namakelompok"],
        onSelect: function (selected) {
            if (RK_txtIdKelutTujuan.value === "0731") {
                if (
                    RK_txtNamaKelompok.value.trim() !==
                    selected.namakelompok.trim()
                ) {
                    Swal.fire(
                        "Error",
                        `Nama kelompok (nama mesin) antara Asal konversi dan Tujuan tidak sama!\n${selected.namakelompok.trim()}\n${RK_txtNamaKelompok.value.trim()}`,
                        "error",
                    );
                    RK_btnKelTujuan.focus();
                    return;
                }
            }
            RK_txtIdKelTujuan.value = selected.idkelompok;
            RK_txtNamaKelTujuan.value = selected.namakelompok;
            RK_txtIdSubkelTujuan.value = "";
            RK_txtNamaSubkelTujuan.value = "";
            RK_txtIdTypeTujuan.value = "";
            RK_txtNamaTypeTujuan.value = "";
            RK_btnSubkelTujuan.disabled = false;
            RK_btnTypeTujuan.disabled = true;
            RK_btnSubkelTujuan.focus();
        },
    });
});

RK_btnSubkelTujuan.addEventListener("click", function () {
    if (this.disabled) return;
    openLookupModal({
        title: "Pilih Sub-kelompok",
        url: `/Benang/getSubKelompok_IdKelompok/${safeUrlParam(RK_txtIdKelTujuan.value)}`,
        headers: ["ID", "Nama Sub-kelompok"],
        columns: ["idsubkelompok", "namasubkelompok"],
        onSelect: function (selected) {
            RK_txtIdSubkelTujuan.value = selected.idsubkelompok;
            RK_txtNamaSubkelTujuan.value = selected.namasubkelompok;
            RK_txtIdTypeTujuan.value = "";
            RK_txtNamaTypeTujuan.value = "";
            RK_btnTypeTujuan.disabled = false;
            RK_btnTypeTujuan.focus();
        },
    });
});

RK_btnTypeTujuan.addEventListener("click", function () {
    if (this.disabled) return;
    openLookupModal({
        title: "Pilih Type",
        url: `/Benang/getType_IdSubkel/${safeUrlParam(RK_txtIdSubkelTujuan.value)}`,
        headers: ["ID", "Nama Type"],
        columns: ["IdType", "NamaType"],
        onSelect: function (selected) {
            RK_txtIdTypeTujuan.value = selected.IdType;
            RK_txtNamaTypeTujuan.value = selected.NamaType.trim();
            saldoTypeFetch(selected.IdType, false);
            txtPrimerTujuan.disabled = false;
            txtPrimerTujuan.select();
            $("#form_rincian_konversi .modal-body").animate(
                {
                    scrollTop: $("#form_rincian_konversi .modal-body")[0]
                        .scrollHeight,
                },
                100,
            );
        },
    });
});

RK_btnConfirm.addEventListener("click", function () {
    document
        .getElementById("form_rk_return")
        .dispatchEvent(new Event("change"));
});

$("#form_rincian_konversi").on("shown.bs.modal", function () {
    if (RK_modeProses === "tujuan") {
        $("#form_rincian_konversi .modal-body").animate(
            {
                scrollTop: $("#form_rincian_konversi .modal-body")[0]
                    .scrollHeight,
            },
            100,
        );
        txtPrimerTujuan.select();
    } else {
        txtPrimerAsal.select();
    }
});

document
    .getElementById("modalLookupGeneric")
    .addEventListener("show.bs.modal", function () {
        this.style.zIndex = "1060";
        setTimeout(() => {
            const backdrops = document.querySelectorAll(".modal-backdrop");
            if (backdrops.length > 1) {
                backdrops[backdrops.length - 1].style.zIndex = "1059";
            }
        }, 10);
    });
