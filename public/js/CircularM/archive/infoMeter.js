//#region Variables
const slcShift = document.getElementById("shift");
const dtTanggal = document.getElementById("tanggal");
const btnOK = document.getElementById("btn_OK");
const btnKeluar = document.getElementById("btn_keluar");

var tableMeter = null;
const listMeter = [
    // {
    //     IdLog: d["Id_Log"],
    //     NamaMesin: d["Nama_Mesin"],
    //     Ukuran: ukuran,
    //     Rajutan: rajutan,
    //     D_Tek4: d["D_Tek4"],
    //     D_Tek5: d["D_Tek5"],
    //     Keterangan: d["Keterangan"],
    //     CounterMesinAwal: Number(d["Counter_Mesin_Awal"]),
    //     CounterMesinAkhir: Number(d["Counter_mesin_akhir"]),
    //     AwalJamKerja: dateTimeToTime(d["Awal_Jam_kerja"]),
    //     AkhirJamKerja: dateTimeToTime(d["Akhir_Jam_kerja"]),
    //     HasilMeter: hasil_meter,
    //     BenangWE: we,
    // }
];
//#endregion

//#region Events
$("#" + slcShift.id).on("select2:select", function () {
    dtTanggal.focus();
    btnOK.disabled = false;
});

dtTanggal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btnOK.focus();
    }
});

btnOK.addEventListener("click", function () {
    let hasil_meter = 0,
        id_mesin = 0;

    fetchSelect(
        "/sp-informasi/Sp_List_ProsesMeter~6/" +
            dtTanggal.value +
            "~" +
            slcShift.value,
        (data) => {
            if (data[0]["Ada"] <= 0) {
                showToast("Data tidak ditemukan!");
                slcShift.focus();
            } else {
                listMeter.length = 0;
                isiListMeter();
            }
        }
    );

    function isiListMeter() {
        fetchSelect(
            "/sp-informasi/Sp_List_ProsesMeter~5/" +
                dtTanggal.value +
                "~" +
                slcShift.value,
            (data) => {
                for (let i = 0; i < data.length; i++) {
                    const d = data[i];

                    let jumlah = 0,
                        ukuran = "",
                        we = "",
                        rajutan = "",
                        nama_barang = d["NAMA_BRG"].trim();

                    // Ambil ukuran, we, and rajutan dari nama_barang
                    for (let j = 0; j < nama_barang.length; j++) {
                        if (nama_barang.charAt(j) === "/") {
                            jumlah++;

                            if (jumlah === 1) {
                                ukuran = nama_barang.substring(j + 2, j + 7);
                            }

                            if (jumlah === 2) {
                                we = nama_barang.substring(j + 10, j + 14);
                                rajutan = nama_barang.substring(j + 2, j + 14);
                                break;
                            }
                        }
                    }

                    listMeter.push({
                        IdLog: d["Id_Log"],
                        NamaMesin: d["Nama_mesin"],
                        Ukuran: ukuran,
                        Rajutan: rajutan,
                        D_Tek4: d["D_TEK4"],
                        D_Tek5: d["D_TEK5"],
                        Keterangan: d["Keterangan"],
                        CounterMesinAwal: Number(d["Counter_mesin_awal"]),
                        CounterMesinAkhir: Number(d["Counter_mesin_akhir"]),
                        AwalJamKerja: dateTimeToTime(d["Awal_jam_kerja"]),
                        AkhirJamKerja: dateTimeToTime(d["Akhir_jam_kerja"]),
                        BenangWE: we,
                    });

                    // Hitung hasil meter
                    if (i === 0) {
                        hasil_meter =
                            listMeter[i].CounterMesinAkhir -
                            listMeter[i].CounterMesinAwal;
                    } else {
                        if (id_mesin === d["id_mesin"]) {
                            hasil_meter +=
                                listMeter[i].CounterMesinAkhir -
                                listMeter[i].CounterMesinAwal;
                        } else {
                            hasil_meter =
                                listMeter[i].CounterMesinAkhir -
                                listMeter[i].CounterMesinAwal;
                        }
                    }

                    id_mesin = d["Id_mesin"];

                    // Jika field "Keterangan" berisi "ganti shift" (case insensitive)
                    if (/ganti shift/i.test(listMeter[i].Keterangan)) {
                        listMeter[i].HasilMeter = hasil_meter.toFixed(0);
                    } else {
                        listMeter[i].HasilMeter = "";
                    }
                }

                initDataTable(listMeter);
            }
        );
    }
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/";
});
//#endregion

//#region Functions
function initDataTable(data) {
    const dtOptions = {
        responsive: true,
        scrollX: true,
        scrollY: "400px",
        layout: {
            topStart: {
                info: true,
            },
            bottomStart: {
                buttons: ["excel"],
            },
        },
        language: {
            searchPlaceholder: " Pencarian...",
            search: "",
            info: "Menampilkan _START_ - _END_ dari _TOTAL_ data",
        },
        initComplete: function () {
            var searchInput = $('input[type="search"]');
            searchInput.eq(0).addClass("form-control");
            searchInput.wrap('<div class="input-group input-group-sm"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');

            $(".dt-buttons button")
                .removeClass("btn-secondary")
                .addClass("btn-success btn-sm ms-3");

            var infoText = $(".dt-info").text();
            if (infoText.includes("Showing 0 to 0 of 0 entries")) {
                $(".dt-info").text("Menampilkan 0 data");
            }
        },
    };

    if (data) {
        dtOptions.columns = [
            { data: "IdLog", width: "50px" },
            { data: "NamaMesin", width: "0px" },
            { data: "Ukuran", width: "0px" },
            { data: "Rajutan", width: "75px" },
            { data: "D_Tek4", width: "0px" },
            { data: "D_Tek5", width: "0px" },
            { data: "Keterangan", width: "150px" },
            { data: "CounterMesinAwal", width: "75px" },
            { data: "CounterMesinAkhir", width: "75px" },
            { data: "AwalJamKerja", width: "75px" },
            { data: "AkhirJamKerja", width: "75px" },
            { data: "HasilMeter", width: "75px" },
        ];
        dtOptions.data = data;
    } else {
        dtOptions.columns = [
            { width: "50px" }, // Id Log
            { width: "0px" }, // Mesin
            { width: "0px" }, // Ukuran
            { width: "75px" }, // Rajutan
            { width: "0px" }, // Denier
            { width: "0px" }, // Corak
            { width: "150px" }, // Status Log
            { width: "75px" }, // Cnt. Awal
            { width: "75px" }, // Cnt. Akhir
            { width: "75px" }, // Jam Awal
            { width: "75px" }, // Jam Akhir
            { width: "75px" }, // Hsl. Meter
        ];
    }

    if (tableMeter) {
        tableMeter.destroy();
    }

    tableMeter = new DataTable("#table_meter", dtOptions);
}

function init() {
    // Initialize DataTable
    initDataTable();

    // Initialize inputs
    $("#" + slcShift.id).select2({ placeholder: "-- Pilih Shift --" });
    dtTanggal.value = getCurrentDate();
    slcShift.focus();
}

$(document).ready(function () {
    init();
});
//#endregion
