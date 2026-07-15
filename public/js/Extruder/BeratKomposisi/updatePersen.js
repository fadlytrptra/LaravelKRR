//#region Variables
const txtKodeBarang = document.getElementById("kode_barang");
const txtNamaBarang = document.getElementById("nama_barang");
const txtAlasan = document.getElementById("alasan");

const numAtas = document.getElementById("persen_atas");
const numBawah = document.getElementById("persen_bawah");
const listOfTxt = document.querySelectorAll("input, textarea");

const btnKoreksi = document.getElementById("btn_koreksi");
const btnBatal = document.getElementById("btn_batal");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
//#endregion

//#region Events
btnKoreksi.addEventListener("click", function () {
    listOfTxt.forEach((ele) => (ele.value = ""));
    enableForm(true);
    txtKodeBarang.select();
});

txtKodeBarang.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value.trim() != "") {
            let kode = "000000000";
            kode += this.value.toUpperCase();
            kode = kode.slice(-9);
            this.value = kode;
            loadDataFetch(kode);
        } else this.select();
    }
});

btnProses.addEventListener("click", function () {
    if (parseFloat(numBawah.value) > 0) {
        alert(
            "Persen bawah harus negatif. Tambahkan tanda minus (-) di depannya.",
        );
        numBawah.select();
    } else if (parseFloat(numAtas.value) < 0) {
        alert(
            "Persen atas harus positif. Hilangkan tanda minus (-) di depannya.",
        );
        numAtas.select();
    } else if (
        numBawah.value.trim() == "" ||
        numAtas.value.trim() == "" ||
        parseFloat(numBawah.value) == 0 ||
        parseFloat(numAtas.value) == 0
    ) {
        numBawah.value = "-5";
        numAtas.value = "5";
    } else {
        $.ajax({
            url: "/beratStandar/SP_1273_PRG_BERAT_STANDART~2/fundata",
            type: "GET",
            data: {
                txtKodeBarang: txtKodeBarang.value,
                txtAlasan: txtAlasan.value,
                numAtas: numAtas.value,
                numBawah: numBawah.value,
                date: getCurrentDate(),
                _token: csrfToken,
            },
            success: function (response) {
                enableForm(false);
                alert("Data berhasil tersimpan.");
            },
            error: function (xhr, status, error) {
                console.error("Error: ", error);
            },
        });
        // fetchStmt(
        //     "/beratStandar/SP_1273_PRG_BERAT_STANDART~2/" +
        //         txtKodeBarang.value +
        //         "~" +
        //         txtAlasan.value.replace(/ /g, "_") +
        //         "~" +
        //         numAtas.value +
        //         "~" +
        //         numBawah.value +
        //         "~" +
        //         getCurrentDate(),
        //     () => {
        //         enableForm(false);
        //         alert("Data berhasil tersimpan.");
        //     }
        // );
    }
});

btnBatal.addEventListener("click", function () {
    enableForm(false);
    listOfTxt.forEach((ele) => (ele.value = ""));
});

txtAlasan.addEventListener("keypress", function (event) {
    if (event.key == "Enter") btnProses.focus();
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/Berat Komposisi 2";
});
//#endregion

//#region Functions
function enableForm(bool_state) {
    listOfTxt.forEach((ele) => (ele.disabled = !bool_state));
    btnKoreksi.disabled = bool_state;
    btnBatal.disabled = !bool_state;
    btnProses.disabled = !bool_state;
    txtNamaBarang.disabled = true;
}

function loadDataFetch(s_kode_brg) {
    fetchSelect(
        "/beratStandar/SP_1273_PRG_BERAT_STANDART~1/" + s_kode_brg,
        (data) => {
            if (data.length > 0) {
                txtKodeBarang.value = s_kode_brg;
                txtNamaBarang.value = data[0].NAMA_BRG;
                numAtas.value = data[0].PersenAtas;
                numBawah.value = data[0].PersenBawah;
                txtAlasan.value = data[0].Alasan;
                btnProses.focus();
            } else alert("Kode barang tidak ditemukan.");
        },
    );
}
//#endregion

function init() {
    enableForm(false);
    btnKoreksi.focus();
}

$(document).ready(() => init());
