//#region Variabel DOM Elements & Global State
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

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
    0 Identifikasi (HTML checkbox + text)
    1 IDOrder
*/

const listDetailOrder = [];
/* ISI LIST DETAIL ORDER
    0 TypeBenang
    1 JumlahPrimer
    2 SatuanPrimer
    3 JumlahSekunder
    4 SatuanSekunder
    5 JumlahTritier
    6 SatuanTritier
*/

const tableDetailCol = [
    { width: "300px" }, // TypeBenang
    { width: "125px" }, // JumlahPrimer
    { width: "125px" }, // SatuanPrimer
    { width: "125px" }, // JumlahSekunder
    { width: "125px" }, // SatuanSekunder
    { width: "125px" }, // JumlahTritier
    { width: "125px" }, // SatuanTritier
];

let terpilih = -1;
let tableOrder = "";
let tableDetailOrder = "";
//#endregion

//#region Data Fetch & Render Functions
async function loadOrders() {
    try {
        listOrder.length = 0;
        clearTable_DataTable("table_order", 2, "Memuat data...");

        // SP_5298_EXT_ORDER_BLM_ACC
        const data = await fetchSelectAsync(
            `/Order/getOrderBlmAcc/${safeUrlParam(idDivisi)}`,
        );

        if (!data || data.length === 0) {
            clearTable_DataTable(
                "table_order",
                2,
                "<b>Tidak ditemukan Order yang belum di-ACC.</b>",
            );
            return;
        }

        const strCheckBox = `<input class="form-check-input" type="checkbox" id="`;
        for (let i = 0; i < data.length; i++) {
            listOrder.push({
                Identifikasi: `${strCheckBox}${data[i].IDOrder}"> ${data[i].Identifikasi}`,
                IDOrder: data[i].IDOrder,
            });
        }

        addTable_DataTable("table_order", listOrder, null, handleRowClick);

        // Event listener untuk checkbox agar tidak memicu row click
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("click", function (event) {
                event.stopPropagation();
            });
        });
    } catch (error) {
        console.error("Error loadOrders:", error);
        Swal.fire(
            "Error",
            "Gagal memuat daftar order: " + error.message,
            "error",
        );
        clearTable_DataTable(
            "table_order",
            2,
            "Terjadi kesalahan saat memuat data.",
        );
    }
}

async function handleRowClick(row, data, _) {
    const currentIdx = findClickedRowInList(listOrder, "IDOrder", data.IDOrder);

    if (terpilih === currentIdx) {
        row.style.background = "white";
        terpilih = -1;
        clearTable_DataTable("table_detail_order", tableDetailCol.length);
        return;
    }

    clearSelection_DataTable("table_order");
    row.style.background = "aliceblue";
    terpilih = currentIdx;

    clearTable_DataTable(
        "table_detail_order",
        tableDetailCol.length,
        "Memuat data...",
    );

    try {
        // SP_5298_EXT_LIST_SPEK_ORDER_1
        const detailData = await fetchSelectAsync(
            `/Order/getListSpek/${safeUrlParam(data.IDOrder)}`,
        );

        if (!detailData || detailData.length === 0) {
            clearTable_DataTable(
                "table_detail_order",
                tableDetailCol.length,
                `Data untuk <b>Order ${data.IDOrder}</b> tidak ditemukan.`,
            );
            return;
        }

        listDetailOrder.length = 0;
        for (let i = 0; i < detailData.length; i++) {
            listDetailOrder.push({
                TypeBenang: detailData[i].TypeBenang,
                JumlahPrimer: detailData[i].JumlahPrimer,
                SatuanPrimer: "NULL", // Sesuai spesifikasi di kode lama
                JumlahSekunder: detailData[i].JumlahSekunder,
                SatuanSekunder: "NULL",
                JumlahTritier: detailData[i].JumlahTritier,
                SatuanTritier: "KG",
            });
        }

        addTable_DataTable(
            "table_detail_order",
            listDetailOrder,
            tableDetailCol,
        );
        window.scrollTo(0, document.body.scrollHeight);
    } catch (error) {
        console.error("Error loading detail order:", error);
        Swal.fire(
            "Error",
            "Gagal memuat detail order: " + error.message,
            "error",
        );
        clearTable_DataTable(
            "table_detail_order",
            tableDetailCol.length,
            "Terjadi kesalahan.",
        );
    }
}
//#endregion

//#region Event Listeners
btnProses.addEventListener("click", async function () {
    try {
        // Ambil semua checkbox yang tercentang
        const checkedCheckboxes = document.querySelectorAll(
            'input[type="checkbox"]:checked',
        );

        if (checkedCheckboxes.length === 0) {
            Swal.fire(
                "Peringatan",
                "Tidak ada order yang dipilih untuk di-ACC.",
                "warning",
            );
            return;
        }

        // Konfirmasi sebelum proses
        const confirm = await Swal.fire({
            title: "Konfirmasi ACC",
            text: `Anda akan meng-ACC ${checkedCheckboxes.length} order. Lanjutkan?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, ACC",
            cancelButtonText: "Batal",
        });

        if (!confirm.isConfirmed) return;

        this.disabled = true;
        btnKeluar.disabled = true;
        this.innerHTML =
            '<span class="spinner-border spinner-border-sm"></span> Memproses...';

        // Proses setiap order secara berurutan
        for (const checkbox of checkedCheckboxes) {
            const orderId = checkbox.id;
            // SP_5298_EXT_ACC_ORDER
            await fetchPost("/Order/updAccOrder", { id_order: orderId }, "PUT");
        }

        listDetailOrder.length = 0;
        clearTable_DataTable("table_detail_order", tableDetailCol.length);

        Swal.fire("Berhasil", "Order berhasil di-ACC!", "success");

        terpilih = -1;
        await loadOrders();
    } catch (error) {
        console.error("Error proses ACC:", error);
        Swal.fire("Error", "Gagal memproses ACC: " + error.message, "error");
    } finally {
        this.disabled = false;
        btnKeluar.disabled = false;
        this.innerHTML = "Proses";
    }
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/ExtruderNet";
});
//#endregion

//#region Initialization
function init() {
    tableOrder = $("#table_order").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "",
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel order...",
            search: "",
        },
    });

    tableDetailOrder = $("#table_detail_order").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: tableDetailCol,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel detail order...",
            search: "",
        },
        initComplete: function () {
            const searchInput = $('input[type="search"]').addClass(
                "form-control",
            );
            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });

    clearTable_DataTable("table_order", 2);
    clearTable_DataTable("table_detail_order", tableDetailCol.length);
    loadOrders();
}

$(document).ready(() => init());
//#endregion
