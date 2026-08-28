//#region Variabel DOM Elements & Global State
const dateInput = document.getElementById("tanggal");
const listOfInput = document.querySelectorAll(".card .form-control");

const txtSpek = document.getElementById("spek");
const txtJmlhOrder = document.getElementById("jmlh_order");
const txtJmlhProd = document.getElementById("jmlh_produksi");
const txtKeterangan = document.getElementById("keterangan");

const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const inputIdOrder = document.getElementById("no_order");
const txtNamaOrder = document.getElementById("nama_order");
const btnLookupOrder = document.getElementById("btn_lookup_order");
const slcStatus = document.getElementById("select_status");

const namaGedung = document.getElementById("nama_gedung").value;
let idDivisi = "";
switch (namaGedung) {
    case "B":
        idDivisi = "MEX";
        break;
    case "D":
        idDivisi = "DEX";
        break;
    default:
        idDivisi = "EXT";
        break;
}

const listOrder = [];
/* ISI LIST ORDER
    0 TanggalOrder
    1 TypeBenang
    2 JumlahTritier
    3 JumlahProduksiTritier
*/

const tableOrderCol = [
    { width: "225px" }, // TanggalOrder
    { width: "500px" }, // TypeBenang
    { width: "225px" }, // JumlahTritier
    { width: "225px" }, // JumlahProduksiTritier
];

let terpilih = -1;
let tableOrder = "";
//#endregion

//#region Lookup Triggers (Events)
btnLookupOrder.addEventListener("click", function () {
    // SP_5298_EXT_LIST_BATAL_ORDER
    openLookupModal({
        title: "Pilih No. Order",
        url: `/Order/getListBatalOrd/${safeUrlParam(idDivisi)}`,
        headers: ["Identifikasi", "Id Order"],
        columns: ["Identifikasi", "IdOrder"],
        onSelect: (row) => {
            inputIdOrder.value = row.IdOrder;
            txtNamaOrder.value = row.Identifikasi;

            // Reset field detail
            listOfInput.forEach((input) => (input.value = ""));
            clearTable_DataTable(
                "table_order",
                tableOrderCol.length,
                "Memuat data...",
            );

            // SP_5298_EXT_LIST_BATAL_ORDER
            fetchSelectAsync(
                `/Order/getListOrderBtl/${safeUrlParam(row.IdOrder)}`,
            )
                .then((data) => {
                    listOrder.length = 0;
                    for (let i = 0; i < data.length; i++) {
                        listOrder.push({
                            TanggalOrder: dateTimeToDate(data[i].TanggalOrder),
                            TypeBenang: data[i].TypeBenang,
                            JumlahTritier: data[i].JumlahTritier,
                            JumlahProduksiTritier:
                                data[i].JumlahProduksiTritier,
                        });
                    }

                    if (data.length > 0) {
                        addTable_DataTable(
                            "table_order",
                            listOrder,
                            tableOrderCol,
                            rowClicked,
                        );
                    } else {
                        clearTable_DataTable(
                            "table_order",
                            tableOrderCol.length,
                            `Tidak ditemukan data untuk <b>Order ${row.IdOrder}</b>.`,
                        );
                    }

                    window.scrollTo(0, document.body.scrollHeight);
                    slcStatus.focus();
                })
                .catch((error) => {
                    Swal.fire(
                        "Error",
                        "Gagal memuat detail order: " + error.message,
                        "error",
                    );
                    clearTable_DataTable(
                        "table_order",
                        tableOrderCol.length,
                        "Terjadi kesalahan.",
                    );
                });
        },
    });
});
//#endregion

//#region Input & Core Events
slcStatus.addEventListener("change", function () {
    if (this.value !== "-- Pilih Status --") {
        txtKeterangan.focus();
    } else {
        Swal.fire(
            "Peringatan",
            "Pilih status terlebih dahulu.",
            "warning",
        ).then(() => {
            this.focus();
        });
    }
});

txtKeterangan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (this.value.trim() !== "") {
            btnProses.disabled = false;
            btnProses.focus();
        } else {
            Swal.fire(
                "Peringatan",
                "Keterangan masih belum terisi!",
                "warning",
            ).then(() => {
                this.focus();
            });
            return;
        }
    }
});

btnProses.addEventListener("click", async function () {
    try {
        // Validasi input
        if (slcStatus.value === "-- Pilih Status --") {
            Swal.fire("Peringatan", "Status masih belum terpilih!", "warning");
            slcStatus.focus();
            return;
        }

        if (txtKeterangan.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Keterangan masih belum terisi!",
                "warning",
            ).then(() => {
                txtKeterangan.focus();
            });
            return;
        }

        if (!inputIdOrder.value) {
            Swal.fire("Peringatan", "Pilih order terlebih dahulu!", "warning");
            btnLookupOrder.focus();
            return;
        }

        // Loading state
        this.disabled = true;
        btnKeluar.disabled = true;
        this.innerHTML =
            '<span class="spinner-border spinner-border-sm"></span> Memproses...';

        // SP_5298_EXT_STATUS_ORDER
        await fetchPost(
            "/Order/updStatusOrder",
            {
                id_order: inputIdOrder.value,
                status: slcStatus.value,
                ket: txtKeterangan.value.trim(),
            },
            "PUT",
        );

        listOrder.length = 0;
        clearTable_DataTable("table_order", tableOrderCol.length);
        clearData();

        this.disabled = true;

        Swal.fire("Berhasil", "Data telah diproses!", "success").then(() => {
            inputIdOrder.value = "";
            txtNamaOrder.value = "";
            btnLookupOrder.focus();
        });
        return;
    } catch (error) {
        console.error("Error proses batal order:", error);
        Swal.fire("Error", "Gagal memproses data: " + error.message, "error");
    } finally {
        this.disabled = false;
        btnKeluar.disabled = false;
        this.innerHTML = "Proses";
    }
});

btnKeluar.addEventListener("click", function () {
    window.location.href = '/Extruder/Extruder';
});

btnProses.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") btnKeluar.focus();
});

btnKeluar.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") btnProses.focus();
});
//#endregion

//#region Utility & Helper Functions
function clearData() {
    slcStatus.selectedIndex = 0;
    listOfInput.forEach((input) => (input.value = ""));
    terpilih = -1;
}

function rowClicked(row, data, _) {
    const currentIdx = findClickedRowInList(
        listOrder,
        "TypeBenang",
        data.TypeBenang,
    );

    if (terpilih === currentIdx) {
        row.style.background = "white";
        terpilih = -1;
        listOfInput.forEach((input) => {
            if (input.id !== "keterangan") input.value = "";
        });
    } else {
        clearSelection_DataTable("table_order");
        row.style.background = "aliceblue";
        terpilih = currentIdx;

        dateInput.value = data.TanggalOrder;
        txtSpek.value = data.TypeBenang;
        txtJmlhOrder.value = data.JumlahTritier;
        txtJmlhProd.value = data.JumlahProduksiTritier;
    }
}
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
    btnProses.disabled = true;
    btnLookupOrder.focus();
}

$(document).ready(() => init());
//#endregion
