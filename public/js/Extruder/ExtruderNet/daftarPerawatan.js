//#region Variables
const spnLoading = document.getElementById("loading_lbl");
const tableRawat = document.getElementById("table_perawatan");
const RW_btnConfirm = document.getElementById("rw_confirm");

const listRawat = [];
/* ISI LIST RAWAT
    0 Kode *hidden
    1 Tanggal
    2 NamaUser
    3 UserId *hidden
    4 Shift
    5 Waktu
    6 IdPerawatan *hidden
    7 NamaPerawatan
    8 IdMesin *hidden
    9 TypeMesin
    10 NoWinder
    11 Gangguan
    12 Penyebab
    13 Penyelesaian
    14 WaktuMulai
    15 WaktuSelesai
    16 IdGangguan *hidden
    17 Winder *hidden
*/

const colRawat = [
    { width: "100px" }, // Tanggal
    { width: "100px" }, // Nama
    { width: "1px" }, // Shift
    { width: "100px" }, // Waktu
    { width: "150px" }, // Bagian
    { width: "100px" }, // Mesin
    { width: "150px" }, // No. Winder
    { width: "150px" }, // Gangguan
    { width: "150px" }, // Penyebab
    { width: "150px" }, // Penyelesaian
    { width: "1px" }, // Mulai
    { width: "1px" }, // Selesai
    // { width: "1px" }, // Kode
];

var pilRawat = -1;
var RW_tanggal = getCurrentDate();
var RW_clickedData = null;
//#endregion

//#region Events
RW_btnConfirm.addEventListener("click", function () {
    document
        .getElementById("form_rw_return")
        .dispatchEvent(new Event("change"));
});
//#endregion

//#region Functions
function RW_showData() {
    // SP_5298_EXT_DATA_PERAWATAN
    fetchSelectAsync(`/Catat/getDataPerawatan/${safeUrlParam(RW_tanggal)}`, (data) => {
        let pushedData = [];
        for (let i = 0; i < data.length; i++) {
            listRawat.push({
                Kode: data[i].Kode,
                Tanggal: dateTimeToDate(data[i].Tanggal),
                NamaUser: data[i].NamaUser,
                UserId: data[i].UserId,
                Shift: data[i].Shift,
                Waktu: data[i].Waktu,
                IdPerawatan: data[i].IdPerawatan,
                NamaPerawatan: data[i].NamaPerawatan,
                IdMesin: data[i].IdMesin,
                TypeMesin: data[i].TypeMesin,
                NoWinder: data[i].NoWinder,
                Gangguan: data[i].Gangguan,
                Penyebab: data[i].Penyebab,
                Penyelesaian: data[i].Penyelesaian,
                WaktuMulai: dateTimetoTime(data[i].WaktuMulai).slice(0, 5),
                WaktuSelesai: dateTimetoTime(data[i].WaktuSelesai).slice(0, 5),
                IdGangguan:
                    data[i].IdGangguan !== undefined ? data[i].IdGangguan : "",
                Winder: data[i].Winder,
            });

            pushedData.push({
                Tanggal: dateTimeToDate(data[i].Tanggal),
                NamaUser: data[i].NamaUser,
                Shift: data[i].Shift,
                Waktu: data[i].Waktu,
                NamaPerawatan: data[i].NamaPerawatan,
                TypeMesin: data[i].TypeMesin,
                NoWinder: data[i].NoWinder,
                Gangguan: data[i].Gangguan,
                Penyebab: data[i].Penyebab,
                Penyelesaian: data[i].Penyelesaian,
                WaktuMulai: dateTimetoTime(data[i].WaktuMulai).slice(0, 5),
                WaktuSelesai: dateTimetoTime(data[i].WaktuSelesai).slice(0, 5),
                Kode: data[i].Kode,
            });
        }

        if (data.length > 0) {
            addTable_DataTable(
                "table_perawatan",
                pushedData,
                colRawat,
                rowClickedRawat
            );
        } else {
            clearTable_DataTable("table_perawatan", colRawat.length, [
                "padding=100px",
                "Tidak ditemukan data perawatan pada <b>" +
                    RW_tanggal +
                    "</b>.",
            ]);
        }
    });
}

function rowClickedRawat(row, data, _) {
    if (pilRawat == findClickedRowInList(listRawat, "Kode", data.Kode)) {
        row.style.background = "white";
        pilRawat = -1;
        RW_clickedData = null;
    } else {
        clearSelection_DataTable("table_perawatan");
        row.style.background = "aliceblue";
        pilRawat = findClickedRowInList(listRawat, "Kode", data.Kode);
        RW_clickedData = listRawat[pilRawat];
        RW_btnConfirm.focus();
    }

    console.log(RW_clickedData);
}
//#endregion

function init_rw() {
    pilRawat = -1;
    // RW_tanggal = getCurrentDate();
    RW_clickedData = null;

    spnLoading.classList.add("hidden");
    tableRawat.classList.remove("hidden");

    if (!$.fn.DataTable.isDataTable("#table_perawatan")) {
        $("#table_perawatan").DataTable({
            responsive: true,
            paging: false,
            scrollY: "250px",
            scrollX: "1000000px",
            columns: colRawat,
            dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
            language: {
                searchPlaceholder: " Tabel perawatan...",
                search: "",
            },

            initComplete: () => {
                var searchInput = $('input[type="search"]').addClass(
                    "form-control"
                );

                searchInput.wrap('<div class="input-group"></div>');
                searchInput.before(
                    '<span class="input-group-text">Cari:</span>'
                );
            },
        });
    }

    addTable_DataTable(
        "table_perawatan",
        [
            {
                Tanggal: " ",
                NamaUser: " ",
                Shift: " ",
                Waktu: " ",
                NamaPerawatan: " ",
                TypeMesin: " ",
                NoWinder: " ",
                Gangguan: " ",
                Penyebab: " ",
                Penyelesaian: " ",
                WaktuMulai: " ",
                WaktuSelesai: " ",
                // Kode: " ",
            },
        ],
        colRawat
    );

    listRawat.length = 0;
    clearTable_DataTable("table_perawatan", colRawat.length, [
        "padding=250px",
        "Memuat data...",
    ]);
    RW_showData();
}

$("#form_daftar_rawat").on("shown.bs.modal", function () {
    init_rw();
});
