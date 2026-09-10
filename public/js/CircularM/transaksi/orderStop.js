//#region Variables

// Form elements
const slcIdOrder = document.getElementById("id_order");
const txtKodeBarang = document.getElementById("kode_barang");
const txtNamaBarang = document.getElementById("nama_barang");
const txtUkuran = document.getElementById("ukuran");
const txtCorak = document.getElementById("corak");
const txtWaRajutan = document.getElementById("wa_rajutan");
const txtWeRajutan = document.getElementById("we_rajutan");
const txtWaDenier = document.getElementById("wa_denier");
const txtWeDenier = document.getElementById("we_denier");
const txtDenier = document.getElementById("denier");
const txtKeterangan = document.getElementById("keterangan");
const txtKodeWarp = document.getElementById("kode_warp");
const txtNamaWarp = document.getElementById("nama_warp");
const txtKodeWeft = document.getElementById("kode_weft");
const txtNamaWeft = document.getElementById("nama_weft");
const txtRencanaOrder = document.getElementById("rencana_order");
const txtOrderTerproduksi = document.getElementById("order_terproduksi");

const dtTglKerja = document.getElementById("tgl_kerja");
const dtTglSelesai = document.getElementById("tgl_selesai");
const hidData = document.getElementById("form_data");

// Buttons
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

//#endregion

//#region Listeners
$("#id_order").on("select2:select", function () {
    fetchSelect("/sp-order/Sp_List_Order~2/" + this.value, (data) => {
        txtKodeBarang.value = data[0]["Kode_barang"];
        txtNamaBarang.value = data[0]["Nama_Barang"];
        txtRencanaOrder.value = data[0]["R_jumlah_Order"];

        if (
            data[0]["A_tgl_Start"] !== null &&
            data[0]["A_tgl_Start"] !== undefined
        ) {
            dtTglKerja.value = dateTimeToDate(data[0]["A_tgl_Start"]);
        } else dtTglKerja.value = "";

        txtWaDenier.value = data[0]["A_n_warp"];
        txtWeDenier.value = data[0]["A_n_weft"];
        txtKodeWarp.value = data[0]["A_kodebarang_warp"];
        txtKodeWeft.value = data[0]["A_kodebarang_weft"];
        txtNamaWarp.value = data[0]["BenangWarp"];
        txtNamaWeft.value = data[0]["BenangWeft"];
        txtOrderTerproduksi.value = data[0]["A_jumlah_Order"];

        let nama_barang = txtNamaBarang.value.trim();
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
                            .substring(i + 1, i + 5)
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

        dtTglSelesai.disabled = false;
        dtTglSelesai.focus();
        btnProses.disabled = false;
    });
});

btnProses.addEventListener("click", function () {
    hidData.value = dtTglSelesai.value + "~" + slcIdOrder.value;
});

document.getElementById("form_submit").addEventListener("submit", function (e) {
    if (slcIdOrder.selectedIndex === 0) {
        e.preventDefault();
        showToast("Belum ada data order yang dipilih!");
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent !== "Keluar1") {
        clearForm();
        console.log(slcIdOrder.selectedIndex);
    } else window.location.href = "/";
});
//#endregion

//#region Functions
function init() {
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

    dtTglSelesai.value = getCurrentDate(-1);
    slcIdOrder.focus();
}

$(document).ready(function () {
    init();
});
//#endregion
