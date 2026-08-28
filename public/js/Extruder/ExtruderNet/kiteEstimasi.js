//#region Variables
const rdoPembebasan = document.getElementById("fasilitas_pembebasan");
const rdoPengembalian = document.getElementById("fasilitas_pengembalian");
const dateStart = document.getElementById("tgl_start");
const dateEstimasi = document.getElementById("estimasi_tgl");

const displayKodeBarang = document.getElementById("display_kode_barang");
const btnLookupKodeBarang = document.getElementById("btn_lookup_kode_barang");

const txtNamaBarang = document.getElementById("nama_barang");
const txtBahanPP = document.getElementById("bahan_pp");
const txtBenang = document.getElementById("benang");
const txtHasil = document.getElementById("hasil");
const txtSisa = document.getElementById("sisa");
const txtInputPP = document.getElementById("estimasi_pp");
const txtCaco3 = document.getElementById("estimasi_caco3");
const txtHasilBenang = document.getElementById("estimasi_benang");

const hidMeter = document.getElementById("meter");
const hidRoll = document.getElementById("roll");
const hidAwal = document.getElementById("meter_awal");
const hidOrder = document.getElementById("id_order");

const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const listOfEstimasi = document.querySelectorAll(
    "#estimase_bahan .form-control",
);
const listOrder = [];
//#endregion

//#region Events
rdoPembebasan.addEventListener("change", clearAll);
rdoPengembalian.addEventListener("change", clearAll);

btnLookupKodeBarang.addEventListener("click", function () {
    // SP_1273_EXT_KITE
    let kode = rdoPembebasan.checked ? 2 : 3;

    openLookupModal({
        title: "Pilih Estimasi KITE",
        url: `/Master/getKiteExtruder/${safeUrlParam(kode)}`,
        headers: ["Kode Barang", "Tgl Start"],
        columns: ["KodeBarang", "TglStart"],
        onSelect: function (selectedRow) {
            let tglVal = selectedRow.TglStart;
            if (tglVal && tglVal.includes("T")) {
                tglVal = tglVal.split("T")[0];
            }

            dateStart.value = tglVal;
            displayKodeBarang.value = selectedRow.KodeBarang;
            processDataKiteEstimasi(tglVal, selectedRow.KodeBarang);
        },
    });
    clearAll();
});

txtInputPP.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        let inputPP = parseFloat(this.value) || 0;

        if (inputPP === 0) {
            Swal.fire(
                "Peringatan",
                "Input Bahan PP tidak boleh kosong atau 0.",
                "warning",
            ).then(() => {
                this.focus();
            });
            return;
        }

        let hasilBenang = ((inputPP / 0.0757) * 97.01) / 1000;
        txtHasilBenang.value = hasilBenang.toFixed(2);

        let caco3 = hasilBenang - inputPP;
        txtCaco3.value = caco3.toFixed(2);

        btnProses.focus();
    }
});

btnProses.addEventListener("click", async function () {
    this.disabled = true;
    this.innerHTML =
        '<span class="spinner-border spinner-border-sm"></span> Processing...';
    btnKeluar.disabled = true;

    try {
        // SP_1273_EXT_KITE
        if (displayKodeBarang.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Pilih Kode Barang Fasilitas Terlebih Dahulu !",
                "warning",
            ).then(() => btnLookupKodeBarang.focus());
            return;
        }

        if (txtHasilBenang.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Isi Bahan PP Terlebih Dahulu !",
                "warning",
            ).then(() => txtInputPP.focus());
            return;
        }

        // Eksekusi POST untuk KITE Kode 7
        const res = await fetchPost("/Master/insKiteExtruder7", {
            id_order: hidOrder.value,
            tgl_start: dateEstimasi.value,
            bahan_pp: txtInputPP.value,
            caco3: txtCaco3.value,
            benang: txtHasilBenang.value,
        });

        if (res && res.status === "success") {
            Swal.fire("Berhasil", "Data berhasil tersimpan.", "success").then(
                () => {
                    dateEstimasi.value = getCurrentDate();
                    txtInputPP.value = "";
                    txtCaco3.value = "";
                    txtHasilBenang.value = "";

                    processDataKiteEstimasi(
                        dateStart.value,
                        displayKodeBarang.value,
                    );
                },
            );
        } else {
            Swal.fire("Error", "Data gagal tersimpan.", "error");
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Terjadi Kesalahan",
            text: err.toString(),
        });
    } finally {
        this.disabled = false;
        this.innerText = "Proses";
        btnKeluar.disabled = false;
    }
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/Extruder";
});
//#endregion

//#region Functions
function clearAll() {
    listOrder.length = 0;
    clearTable_DataTable("table_order", 4);

    displayKodeBarang.value = "";
    dateStart.value = getCurrentDate();
    txtNamaBarang.value = "";
    txtBahanPP.value = "";
    txtBenang.value = "";
    txtHasil.value = "";
    txtSisa.value = "";

    listOfEstimasi.forEach((ele) => (ele.value = ""));
    dateEstimasi.value = getCurrentDate();
}

// SP_1273_EXT_KITE Kode 4
async function processDataKiteEstimasi(tglStart, kodeBarang) {
    try {
        const data = await fetchSelectAsync(
            `/Master/getKiteExtruder/4/${safeUrlParam(tglStart)}/${safeUrlParam(kodeBarang.trim())}`,
        );

        if (!data || data.length === 0) {
            Swal.fire("Error", "Data barang tidak ditemukan.", "error");
            return;
        }

        let firstData = data[0];
        hidOrder.value = firstData.IdOrder;
        txtNamaBarang.value = firstData.NAMA_BRG;
        txtBahanPP.value = firstData.BahanPP;
        txtBenang.value = firstData.Benang;
        txtHasil.value = firstData.Hasil;

        let sisa = parseFloat(txtBenang.value) - parseFloat(txtHasil.value);
        txtSisa.value = isNaN(sisa) ? "0.00" : sisa.toFixed(2);

        const data2 = await fetchSelectAsync(
            `/Master/getKiteExtOrder/6/${safeUrlParam(hidOrder.value)}`,
        );

        if (!data2 || data2.length === 0 || data2[0].Ada <= 0) {
            txtInputPP.focus();
            return;
        }

        listOrder.length = 0;
        clearTable_DataTable("table_order", 4);

        const data3 = await fetchSelectAsync(
            `/Master/getKiteExtOrder/5/${safeUrlParam(hidOrder.value)}`,
        );

        if (data3 && data3.length > 0) {
            data3.forEach((item) => {
                listOrder.push({
                    Tanggal: item.Tanggal,
                    BahanPP: item.BahanPP,
                    CaCO3: item.CaCO3,
                    Benang: item.Benang,
                });
            });
            addTable_DataTable("table_order", listOrder, null, null, "500px");
        }
        txtInputPP.focus();
    } catch (error) {
        Swal.fire("Error", error.message || "Gagal memuat data", "error");
    }
}

function init() {
    $("#table_order").DataTable({
        responsive: true,
        paging: false,
        scrollY: "500px",
        scrollX: "",
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel order...",
            search: "",
        },
        initComplete: function () {
            var searchInput = $('input[type="search"]').addClass(
                "form-control",
            );
            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });

    btnLookupKodeBarang.focus();

    clearTable_DataTable("table_order", 4);
    rdoPembebasan.checked = true;
    dateStart.value = getCurrentDate();
    dateEstimasi.value = getCurrentDate();
}

$(document).ready(() => init());
//#endregion
