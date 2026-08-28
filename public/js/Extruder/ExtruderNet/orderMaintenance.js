//#region Variabel DOM Elements
const dateInput = document.getElementById("tanggal");
const txtNamaTypeBenang = document.getElementById("nama_type_benang");
const btnLookupBenang = document.getElementById("btn_lookup_benang");
const detailInputs = document.querySelectorAll(".card .form-control");

const txtNoOrder = document.getElementById("no_order");
const txtIdentifikasi = document.getElementById("identifikasi");
const txtPrimerQty = document.getElementById("primer_qty");
const txtSekunderQty = document.getElementById("sekunder_qty");
const txtTritierQty = document.getElementById("tritier_qty");

const spnPrimerSat = document.getElementById("primer_sat");
const spnSekunderSat = document.getElementById("sekunder_sat");
const spnTritierSat = document.getElementById("tritier_sat");

const btnBaru = document.getElementById("btn_baru");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");
const btnDetail = document.getElementById("btn_detail");

const namaGedung = document.getElementById("nama_gedung").value || "default";
let idDivisi = "";
let kodeBenang = 2;

switch (namaGedung) {
    case "B":
        idDivisi = "MEX";
        kodeBenang = 3;
        break;
    case "D":
        idDivisi = "DEX";
        kodeBenang = 5;
        break;
    default:
        idDivisi = "EXT";
        kodeBenang = 2;
        break;
}

const listOrder = [];
/* ISI LIST ORDER
    0 NamaType
    1 SatPrimer
    2 QtyPrimer
    3 SatSekunder
    4 QtySekunder
    5 SatTritier
    6 QtyTritier
*/

const tableOrderCol = [
    { width: "300px" }, // NamaType
    { width: "125px" }, // SatPrimer
    { width: "125px" }, // QtyPrimer
    { width: "125px" }, // SatSekunder
    { width: "125px" }, // QtySekunder
    { width: "125px" }, // SatTritier
    { width: "125px" }, // QtyTritier
];

let tableOrder = "";
//#endregion

//#region Utility & Helper Functions
function clearDataDetail() {
    txtNamaTypeBenang.value = "";
    spnPrimerSat.textContent = "";
    spnSekunderSat.textContent = "";
    spnTritierSat.textContent = "";
    detailInputs.forEach((ele) => (ele.value = ""));
}

function disableDetail() {
    btnLookupBenang.disabled = true;
    detailInputs.forEach((ele) => (ele.disabled = true));
    btnDetail.disabled = true;
}

function enableDetail() {
    btnLookupBenang.disabled = false;
    detailInputs.forEach((ele) => (ele.disabled = false));
    btnDetail.disabled = false;
}

function toggleButtons(tmb) {
    if (tmb === 1) {
        dateInput.classList.add("unclickable");
        txtIdentifikasi.disabled = true;
        btnBaru.disabled = false;
        btnProses.disabled = true;
        btnKeluar.textContent = "Keluar";
        disableDetail();
    } else if (tmb === 2) {
        dateInput.classList.remove("unclickable");
        txtIdentifikasi.disabled = false;
        btnBaru.disabled = true;
        btnProses.disabled = false;
        btnKeluar.textContent = "Batal";
        enableDetail();
    }
}

function toSnakeCase(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_");
}

//#region Lookup Events
btnLookupBenang.addEventListener("click", function () {
    // SP_5298_EXT_GET_LIST_BENANG
    openLookupModal({
        title: "Pilih Type Benang",
        url: `/Order/getListBenang/${safeUrlParam(kodeBenang)}`,
        headers: ["Nama Type"],
        columns: ["NamaType"],
        onSelect: (row) => {
            txtNamaTypeBenang.value = row.NamaType;
            spnPrimerSat.textContent = row.SatPrimer || "-";
            spnSekunderSat.textContent = row.SatSekunder || "-";
            spnTritierSat.textContent = row.SatTritier || "-";

            txtPrimerQty.disabled = false;
            txtPrimerQty.focus();
            txtPrimerQty.value = "";
            txtSekunderQty.value = "";
            txtTritierQty.value = "";
        },
    });
});
//#endregion

//#region Input & Core Events
txtIdentifikasi.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (this.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Masukkan identifikasi order terlebih dahulu.",
                "warning",
            ).then(() => {
                this.focus();
            });
            return;
        }
        btnLookupBenang.disabled = false;
        btnLookupBenang.focus();
    }
});

txtPrimerQty.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (this.value === "") this.value = 0;
        txtSekunderQty.disabled = false;
        txtSekunderQty.focus();
    }
});

txtSekunderQty.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (this.value === "") this.value = 0;
        txtTritierQty.disabled = false;
        txtTritierQty.focus();
    }
});

txtTritierQty.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (this.value === "") this.value = 0;
        btnDetail.disabled = false;
        btnDetail.focus();
    }
});

btnDetail.addEventListener("click", function () {
    this.disabled = true;

    // Validasi field
    if (txtNamaTypeBenang.value.trim() === "") {
        Swal.fire(
            "Peringatan",
            "Pilih type benang terlebih dahulu.",
            "warning",
        );
        btnLookupBenang.focus();
        this.disabled = false;
        return;
    }

    let isEmpty = false;
    detailInputs.forEach((ele) => {
        if (ele.value.trim() === "") {
            if (!isEmpty) {
                Swal.fire(
                    "Peringatan",
                    "Masih ada data yang belum terisi.",
                    "warning",
                );
                ele.focus();
            }
            isEmpty = true;
        }
    });

    if (isEmpty) {
        this.disabled = false;
        return;
    }

    // Cek duplikat
    const typeAda = listOrder.some(
        (order) => order.NamaType === txtNamaTypeBenang.value,
    );
    if (typeAda) {
        Swal.fire(
            "Error",
            "Sudah ada type benang yang sama dalam order.",
            "error",
        ).then(() => {
            btnLookupBenang.focus();
            this.disabled = false;
        });
        return;
    }

    // Tambah ke list
    listOrder.push({
        NamaType: txtNamaTypeBenang.value,
        SatPrimer: spnPrimerSat.textContent,
        QtyPrimer: txtPrimerQty.value,
        SatSekunder: spnSekunderSat.textContent,
        QtySekunder: txtSekunderQty.value,
        SatTritier: spnTritierSat.textContent,
        QtyTritier: txtTritierQty.value,
    });

    addTable_DataTable("table_order", listOrder, tableOrderCol);

    Swal.fire({
        title: "Input Lagi?",
        text: "Ingin input data bahan / hasil produksi lagi?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
    }).then((result) => {
        if (result.isConfirmed) {
            clearDataDetail();
            btnLookupBenang.focus();
        } else {
            btnProses.focus();
        }
        this.disabled = false;
    });
});

btnBaru.addEventListener("click", function () {
    listOrder.length = 0;
    clearTable_DataTable("table_order", tableOrderCol.length);
    clearDataDetail();
    toggleButtons(2);
    txtNoOrder.value = "";
    txtIdentifikasi.value = "";
    txtIdentifikasi.focus();
});

btnProses.addEventListener("click", async function () {
    try {
        if (listOrder.length < 1) {
            Swal.fire("Peringatan", "Data order masih kosong!", "warning");
            return;
        }

        this.disabled = true;
        btnKeluar.disabled = true;
        this.innerHTML =
            '<span class="spinner-border spinner-border-sm"></span> Memproses...';

        let kode_ins = namaGedung === "D" ? "D" : null;
        // SP_5298_EXT_INSERT_ORDER_BENANG / SP_1273_MEX_INSERT_ORDER_BENANG
        await fetchPost("/Order/insOrderBenang", {
            gedung: namaGedung,
            tanggal: dateInput.value,
            identifikasi: txtIdentifikasi.value,
            kode: kode_ins,
        });

        let noOrderUrl =
            namaGedung === "B"
                ? "/Order/getNoOrderMjs"
                : namaGedung === "D"
                  ? "/Order/getNoOrder/D"
                  : "/Order/getNoOrder";

        const data = await fetchSelectAsync(noOrderUrl);
        if (!data || !data.NoOrder) {
            throw new Error("Gagal mendapatkan nomor order.");
        }

        txtNoOrder.value = data.NoOrder;
        txtNoOrder.dispatchEvent(new Event("change"));

        Swal.fire("Berhasil", "Data order berhasil disimpan.", "success").then(
            () => {
                toggleButtons(1);
                disableDetail();
                btnBaru.focus();
            },
        );
        return;
    } catch (error) {
        console.error("Error proses order:", error);
        Swal.fire(
            "Error",
            error.message || "Gagal menyimpan data order.",
            "error",
        );
    } finally {
        this.disabled = false;
        btnKeluar.disabled = false;
        this.innerHTML = "Proses";
    }
});

txtNoOrder.addEventListener("change", async function () {
    if (!this.value) return;

    try {
        for (let i = 0; i < listOrder.length; i++) {
            // SP_5298_EXT_INSERT_ORDERDETAIL_BENANG
            await fetchPost("/Order/insOrderDetail", {
                id_order: this.value,
                type_benang: listOrder[i].NamaType,
                jmlh_primer: listOrder[i].QtyPrimer,
                jmlh_sekunder: listOrder[i].QtySekunder,
                jmlh_tritier: listOrder[i].QtyTritier,
                prod_primer: 0,
                prod_sekunder: 0,
                prod_tritier: 0,
            });
        }

        // SP_5298_EXT_UPDATE_COUNTER_ORDER
        await fetchPost(
            "/Order/updCounterOrder",
            {
                id_divisi: idDivisi,
            },
            "PUT",
        );
        // Swal.fire("Berhasil", "Detail order berhasil disimpan.", "success");
    } catch (error) {
        console.error("Error insert detail order:", error);
        Swal.fire("Error", "Gagal menyimpan detail order.", "error");
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent === "Keluar") {
        window.location.href = '/Extruder/Extruder';
    } else {
        toggleButtons(1);
        clearDataDetail();
        disableDetail();
        listOrder.length = 0;
        clearTable_DataTable("table_order", tableOrderCol.length);
        txtIdentifikasi.value = "";
        btnBaru.focus();
    }
});

// Keyboard navigation
btnBaru.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        if (!btnProses.disabled) btnProses.focus();
        else btnKeluar.focus();
    }
});

btnProses.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        if (!btnBaru.disabled) btnBaru.focus();
        else btnKeluar.focus();
    } else if (event.key === "ArrowRight") {
        btnKeluar.focus();
    }
});

btnKeluar.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        if (!btnProses.disabled) btnProses.focus();
        else if (!btnBaru.disabled) btnBaru.focus();
    }
});
//#endregion

//#region Initialization
function init() {
    tableOrder = $("#table_order").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: tableOrderCol,
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

    clearTable_DataTable("table_order", tableOrderCol.length);
    toggleButtons(1);
    btnBaru.focus();
    dateInput.value = getCurrentDate();
}

$(document).ready(() => init());
//#endregion
