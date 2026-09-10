//#region Variables
const dtTanggal = document.getElementById("tanggal");
const btnOK = document.getElementById("btn_OK");
const btnKeluar = document.getElementById("btn_keluar");

const listCicular = [];
//#endregion

//#region Events
dtTanggal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btnOK.focus();
    }
});

btnOK.addEventListener("click", function () {
    listCicular.length = 0;
    fetchSelect(
        "/sp-informasi/Sp_List_HistoryGelondongan~4/" + dtTanggal.value,
        (data) => {
            if (data[0]["Ada"] == 0) {
                showToast("Tidak ada Proses Potong Gelondongan.");
                dtTanggal.focus();
            } else {
                fill_listCircular(() => {
                    getDataInventory();
                });
            }
        }
    );

    function fill_listCircular(post_action) {
        fetchSelect(
            "/sp-informasi/Sp_List_HistoryGelondongan~5/" + dtTanggal.value,
            (data) => {
                for (let i = 0; i < data.length; i++) {
                    const d = data[i];
                    listCicular.push({
                        NamaMesin: d["Nama_mesin"],
                        Shift: d["Shift"],
                        Roll: d["Roll"],
                        Meter: Number(d["Meter"]),
                        Kg: parseFloat(d["Kg"]).toFixed(2),
                        IdKonversi: d["IdKonversi"],
                        KodeBarang: d["Kode_Barang"],
                        NoIndeks: d["NoIndeks"],
                    });

                    const status = d["Status"];
                    const lastIndex = listCicular.length - 1;
                    if (status == "1") {
                        listCicular[lastIndex]["Status"] = "Belum Dikirim";
                    } else {
                        listCicular[lastIndex]["Status"] = "Sudah Dikirim";
                    }
                }

                post_action();
            }
        );
    }

    function getDataInventory() {
        for (let i = 0; i < listCicular.length; i++) {
            const cir = listCicular[i];
            fetchSelect(
                "/sp-informasi/Sp_List_HistoryGelondongan~6/" +
                    cir["IdKonversi"] +
                    "~" +
                    cir["KodeBarang"],
                (data) => {
                    cir["IdDivisi"] = data[0]["IdDivisi"] ?? "";
                    cir["NamaObjek"] = data[0]["NamaObjek"] ?? "";
                    cir["NamaKelut"] = data[0]["NamaKelompokUtama"] ?? "";
                    cir["NamaKelompok"] = data[0]["NamaKelompok"] ?? "";
                    cir["NamaSubKel"] = data[0]["NamaSubKelompok"] ?? "";

                    if (i == listCicular.length - 1) {
                        setCursorWait(false);
                    }
                },
                null,
                true
            );
        }
    }
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/";
});
//#endregion

//#region Functions
function init() {
    dtTanggal.focus();
    dtTanggal.value = getCurrentDate();

    const columnsKu = [
        { width: "100px" }, // Mesin
        { width: "100px" }, // Shift
        { width: "100px" }, // Roll
        { width: "100px" }, // Meter
        { width: "100px" }, // Kg
        { width: "100px" }, // Id Konversi
        { width: "125px" }, // Status
        { width: "100px" }, // Kode Barang
        { width: "100px" }, // No. Indeks
        { width: "100px" }, // Divisi
        { width: "100px" }, // Objek
        { width: "100px" }, // Kel. Utama
        { width: "100px" }, // Kelompok
        { width: "125px" }, // Sub. Kelompok
    ];

    initTable("table_circular", columnsKu, 0, getTableHeight(50));
}

$(document).ready(function () {
    init();
});
//#endregion
