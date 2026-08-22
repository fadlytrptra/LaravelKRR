//#region Document get element by id
let add_button = document.getElementById("add_button");
let berat_indexInner = document.getElementById("berat_indexInner");
let berat_indexKarung = document.getElementById("berat_indexKarung");
let berat_indexKertas = document.getElementById("berat_indexKertas");
let berat_indexLami = document.getElementById("berat_indexLami");
let berat_inner = document.getElementById("berat_inner");
let berat_innerMeter = document.getElementById("berat_innerMeter");
let berat_karung = document.getElementById("berat_karung");
let berat_karungMeter = document.getElementById("berat_karungMeter");
let berat_kertas = document.getElementById("berat_kertas");
let berat_kertasMeter = document.getElementById("berat_kertasMeter");
let berat_lami = document.getElementById("berat_lami");
let berat_lamiMeter = document.getElementById("berat_lamiMeter");
let div_beratStandardMeter = document.getElementById("div_beratStandardMeter");
let berat_standardTotal = document.getElementById("berat_standardTotal");
let berat_standardTotalMeter = document.getElementById(
    "berat_standardTotalMeter"
);
let status_lunas = document.getElementById("status_lunas");
let informasi_tambahan = document.getElementById("informasi_tambahan");
let biaya_lain = document.getElementById("biaya_lain");
let delete_button = document.getElementById("delete_button");
let div_beratStandard = document.getElementById("div_beratStandard");
let div_detailSuratPesanan = document.getElementById("div_detailSuratPesanan");
let div_headerSuratPesanan = document.getElementById("div_headerSuratPesanan");
let div_tabelSuratPesanan = document.getElementById("div_tabelSuratPesanan");
let batal_spButton = document.getElementById("batal_spButton");
let enter_kodeBarang = document.getElementById("enter_kodeBarang");
let faktur_pjkBiasa = document.getElementById("faktur_pjkBiasa");
let faktur_pjkSederhana = document.getElementById("faktur_pjkSederhana");
let form_suratPesanan = document.getElementById("form_suratPesanan");
let harga_satuan = document.getElementById("harga_satuan");
let index_inner = document.getElementById("index_inner");
let index_karung = document.getElementById("index_karung");
let index_kertas = document.getElementById("index_kertas");
let index_lami = document.getElementById("index_lami");
let koreksi_button = document.getElementById("koreksi_button");
let jenis_bayar = document.getElementById("jenis_bayar");
let jenis_brg = document.getElementById("jenis_brg");
let jenis_sp = document.getElementById("jenis_sp");
let kategori = document.getElementById("kategori");
let kategori_utama = document.getElementById("kategori_utama");
let keterangan = document.getElementById("keterangan");
let kode_barang = document.getElementById("kode_barang");
let kodeStJual;
let kodeStPrim;
let kodeStSek;
let kodeStTri;
let trigger = 0;
let div_saldoInventory = document.getElementById("div_saldoInventory");
let list_customer = document.getElementById("list_customer");
let list_sales = document.getElementById("list_sales");
let table_saldoInventory = $("#table_saldoInventory").DataTable();
let list_view = $("#list_view").DataTable();
let table_listView = document.getElementById("list_view");
let mata_uang = document.getElementById("mata_uang");
let nama_barang = document.getElementById("nama_barang");
let no_pi = document.getElementById("no_pi");
let no_po = document.getElementById("no_po");
let no_spText = document.getElementById("no_spText");
let ppn = document.getElementById("ppn");
let proses = 0;
let qty_pesan = document.getElementById("qty_pesan");
let rencana_kirim = document.getElementById("rencana_kirim");
let satuan_jual = document.getElementById("satuan_jual");
let satuan_primer = document.getElementById("satuan_primer");
var satuan_sekunder = document.getElementById("satuan_sekunder");
let satuan_tritier = document.getElementById("satuan_tritier");
let sub_kategori = document.getElementById("sub_kategori");
let syarat_bayar = document.getElementById("syarat_bayar");
let tgl_pesan = document.getElementById("tgl_pesan");
let tgl_po = document.getElementById("tgl_po");
let total_cost = document.getElementById("total_cost");
let update_button = document.getElementById("update_button");

//#endregion

//#region Load Form

setInputFilter(
    document.getElementById("qty_pesan"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("harga_satuan"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);
setInputFilter(
    document.getElementById("syarat_bayar"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("kode_barang"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("berat_karung"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);
setInputFilter(
    document.getElementById("berat_inner"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);
setInputFilter(
    document.getElementById("berat_lami"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);
setInputFilter(
    document.getElementById("berat_kertas"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);

tgl_pesan.valueAsDate = new Date();
tgl_po.valueAsDate = new Date();
rencana_kirim.valueAsDate = new Date();
koreksi_button.focus();
div_headerSuratPesanan.classList.toggle("disabled");
div_tabelSuratPesanan.classList.toggle("disabled");
div_detailSuratPesanan.classList.toggle("disabled");
div_beratStandard.classList.toggle("disabled");
div_saldoInventory.classList.toggle("disabled");

//#endregion

//#region enter-enter

no_po.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        tgl_po.focus();
    }
});

tgl_po.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        no_pi.focus();
    }
});

no_pi.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        list_sales.focus();
    }
});

mata_uang.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        jenis_bayar.focus();
    }
});

syarat_bayar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        faktur_pjkBiasa.focus();
    }
});

faktur_pjkBiasa.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        keterangan.focus();
    }
});

faktur_pjkSederhana.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        keterangan.focus();
    }
});

keterangan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        jenis_brg.focus();
    }
});

qty_pesan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        harga_satuan.focus();
    }
});

harga_satuan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        satuan_jual.focus();
    }
});

satuan_jual.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        rencana_kirim.focus();
    }
});

rencana_kirim.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_karung.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            berat_karung.selectionStart = 0;
        });
        berat_karung.focus();
    }
});

berat_karung.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_inner.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            berat_inner.selectionStart = 0;
        });
        berat_inner.focus();
    }
});

berat_inner.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_lami.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            berat_lami.selectionStart = 0;
        });
        berat_lami.focus();
    }
});

berat_lami.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_kertas.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            berat_kertas.selectionStart = 0;
        });
        berat_kertas.focus();
    }
});

berat_kertas.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        index_karung.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            index_karung.selectionStart = 0;
        });
        index_karung.focus();
    }
});

index_karung.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        index_inner.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            index_inner.selectionStart = 0;
        });
        index_inner.focus();
    }
});

index_inner.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        index_lami.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            index_lami.selectionStart = 0;
        });
        index_lami.focus();
    }
});

index_lami.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        index_kertas.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            index_kertas.selectionStart = 0;
        });
        index_kertas.focus();
    }
});

index_kertas.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        biaya_lain.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            biaya_lain.selectionStart = 0;
        });
        biaya_lain.focus();
    }
});

berat_indexKarung.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_indexInner.focus();
    }
});

berat_indexInner.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_indexLami.focus();
    }
});

berat_indexLami.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_indexKertas.focus();
    }
});

berat_indexKertas.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        biaya_lain.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            biaya_lain.selectionStart = 0;
        });
        biaya_lain.focus();
    }
});

biaya_lain.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        add_button.focus();
    }
});

berat_karungMeter.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_innerMeter.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            berat_innerMeter.selectionStart = 0;
        });
        berat_innerMeter.focus();
    }
});

berat_innerMeter.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_lamiMeter.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            berat_lamiMeter.selectionStart = 0;
        });
        berat_lamiMeter.focus();
    }
});

berat_lamiMeter.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        berat_kertasMeter.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            berat_kertasMeter.selectionStart = 0;
        });
        berat_kertasMeter.focus();
    }
});

berat_kertasMeter.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        add_button.focus();
    }
});

tgl_pesan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        jenis_sp.focus();
    }
});

tgl_po.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        no_pi.focus();
    }
});

jenis_sp.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        list_customer.focus();
    }
});

list_customer.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        no_po.focus();
    }
});

list_sales.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        mata_uang.focus();
    }
});

jenis_bayar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        syarat_bayar.focus();
    }
});

//#endregion

//#region Add Event Listener

koreksi_button.addEventListener("click", function (event) {
    // console.log(proses);
    event.preventDefault();

    if (proses == 0) {
        div_headerSuratPesanan.classList.toggle("disabled");
        proses = 1;
        batal_spButton.innerHTML = "Batal";
        koreksi_button.innerHTML = "Proses";
        mata_uang.value = "IDR";

        //harus isi Nomor SP dulu!
        no_spText.focus();
        no_spText.readOnly = false;
        funcHeaderDisabled(true);
    } else if (proses == 1) {
        //koreksi
        funcDatatablesIntoInput();
        form_suratPesanan.submit();
        div_tabelSuratPesanan.classList.toggle("disabled");
        div_detailSuratPesanan.classList.toggle("disabled");
        div_beratStandard.classList.toggle("disabled");
        div_saldoInventory.classList.toggle("disabled");
        div_headerSuratPesanan.classList.toggle("disabled");
        list_view.clear();
        // disableElements();
        proses = 0;
        this.innerHTML = "Isi";
        batal_spButton.innerHTML = "Batal SP";
    } else if (proses == 2) {
        //batal SP
        funcDatatablesIntoInput();
        form_suratPesanan.action = "/Kencana/penyesuaiansp/batalsp/";
        form_suratPesanan.submit();

        funcClearHeaderPesanan();
        funcClearInputBarang();
        list_view.clear();
        div_headerSuratPesanan.classList.toggle("disabled");
        div_tabelSuratPesanan.classList.toggle("disabled");
        div_detailSuratPesanan.classList.toggle("disabled");
        div_beratStandard.classList.toggle("disabled");
        div_saldoInventory.classList.toggle("disabled");
        // disableElements();
        proses = 0;
        batal_spButton.innerHTML = "Batal SP";
        this.innerHTML = "Isi";
    }
});

batal_spButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        // enableElements();
        div_headerSuratPesanan.classList.toggle("disabled");
        proses = 2;
        this.innerHTML = "Batal";
        koreksi_button.innerHTML = "Proses";
        mata_uang.value = "IDR";

        //harus isi Nomor SP dulu!
        no_spText.focus();
        no_spText.readOnly = false;
        funcHeaderDisabled(true);
    } else {
        no_spText.style.display = "block";
        no_spText.readOnly = true;
        funcClearHeaderPesanan();
        funcClearInputBarang();
        funcHeaderDisabled(false);
        list_view.clear().draw();
        div_headerSuratPesanan.classList.toggle("disabled");
        // div_tabelSuratPesanan.classList.toggle("disabled");
        div_tabelSuratPesanan.classList.add("disabled");
        div_detailSuratPesanan.classList.add("disabled");
        div_beratStandard.classList.add("disabled");
        div_saldoInventory.classList.add("disabled");
        // disableElements();
        proses = 0;
        this.innerHTML = "Batal SP";
        koreksi_button.innerHTML = "Koreksi";
    }
});

jenis_brg.addEventListener("change", function () {
    if (ppn.value === "EXCLUDE") {
        return;
    }
    kode_barang.readOnly = false;
    kode_barang.focus();
    enter_kodeBarang.style.display = "block";
    satuan_primer.value = "";
    satuan_sekunder.value = "";
    satuan_tritier.value = "";
    satuan_jual.selectedIndex = "0";
    kategori_utama.selectedIndex = "0";
    kategori.innerHTML = "";
    sub_kategori.innerHTML = "";
    nama_barang.innerHTML = "";
});

kategori_utama.addEventListener("change", function () {
    // Code to retrieve options for the second select input based on the selected value of the first select input
    let kategoriUtama = this.value; // Use the value of the first select input as the firstValue variable
    enter_kodeBarang.style.display = "none";
    kategori.disabled = false;
    sub_kategori.disabled = false;
    nama_barang.disabled = false;
    kategori.focus();
    fetch("/Kencana/options/kategori/" + kategoriUtama)
        .then((response) => response.json())
        .then((options) => {
            kategori.innerHTML =
                "<option disabled selected value>-- Pilih Kategori --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.no_kategori;
                optionTag.text = option.nama_kategori;
                kategori.appendChild(optionTag);
            });
            sub_kategori.innerHTML =
                "<option disabled selected value>-- Pilih Sub Kategori --</option>";
            nama_barang.innerHTML =
                "<option disabled selected value>-- Pilih Nama Barang --</option>";
            satuan_jual.disabled = false;
            fetch("/listsatuan/")
                .then((response) => response.json())
                .then((options) => {
                    satuan_jual.innerHTML =
                        "<option selected value>-- Pilih Satuan Jual --</option>";
                    options.forEach((option) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = option.No_satuan;
                        optionTag.text = option.Nama_satuan;
                        satuan_jual.appendChild(optionTag);
                        satuan_jual.selectedIndex = 0;
                    });
                });
            funcClearInputBarang();
        });
});

kategori.addEventListener("change", function () {
    // Code to retrieve options for the second select input based on the selected value of the first select input
    let kategori = this.value; // Use the value of the first select input as the firstValue variable
    sub_kategori.focus();
    fetch("/Kencana/options/subKategori/" + kategori)
        .then((response) => response.json())
        .then((options) => {
            sub_kategori.innerHTML =
                "<option disabled selected value>-- Pilih Sub Kategori --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.no_sub_kategori;
                optionTag.text = option.nama_sub_kategori;
                sub_kategori.appendChild(optionTag);
            });
        });
});

sub_kategori.addEventListener("change", function () {
    // Code to retrieve options for the second select input based on the selected value of the first select input
    let subKategori = this.value; // Use the value of the first select input as the firstValue variable
    namaBarang.focus();
    fetch("/Kencana/options/namaBarang/" + subKategori)
        .then((response) => response.json())
        .then((options) => {
            nama_barang.innerHTML =
                "<option disabled selected value>-- Pilih Nama Barang --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.KD_BRG;
                optionTag.text = option.NAMA_BRG;
                nama_barang.appendChild(optionTag);
            });
        });
});

nama_barang.addEventListener("change", function () {
    let namaBarang = this.value;
    kode_barang.value = namaBarang;
    qty_pesan.focus();
    ppn.value = "EXCLUDE";
    ppn.readOnly = true;
    document.getElementById("kode_barang").readOnly = true;

    //Isi Satuan INV
    fetch("/Kencana/satuan/" + namaBarang)
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0]);
            satuan_primer.value =
                data[0].SatPrimer.trim() +
                " (Primer)               -" +
                data[0].ST_PRIM;
            satuan_sekunder.value =
                data[0].SatSekunder.trim() +
                " (Sekunder)               -" +
                data[0].ST_SEK;
            satuan_tritier.value =
                data[0].Nama_satuan.trim() +
                " (Tritier)               -" +
                data[0].ST_TRI;
            kodeStPrim = satuan_primer.value.split("-").pop();
            kodeStSek = satuan_sekunder.value.split("-").pop();
            kodeStTri = satuan_tritier.value.split("-").pop();
            // kodeStJual = data[0].NO_SATUAN_UMUM + ' - ' + data[0].SatUmum;
            // console.log(kodeStJual);
            const options = satuan_jual.options;
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                // console.log(option);
                if (option.value === data[0].NO_SATUAN_UMUM) {
                    option.selected = true;
                    break;
                }
            }
            document.getElementById("satuan_primer").readOnly = true;
            document.getElementById("satuan_sekunder").readOnly = true;
            document.getElementById("satuan_tritier").readOnly = true;
        });
    // console.log(kategoriUtama.value);

    //Jika kategori utama berasal dari KRR-Hasil Produksi, isi Berat Standard
    funcBeratStandard(namaBarang);
    funcKolomBeratStandard();
});

kode_barang.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let kodeBarang9digit;
        kodeBarang9digit = document.getElementById("kode_barang");
        // console.log(kodeBarang9digit.value);
        // alert('Kode barang dienter');
        if (kodeBarang9digit.value.length < 9) {
            // alert("kode barang tidak sesuai");
            kodeBarang9digit.value = kode_barang.value.padStart(9, "0");
            // console.log(kodeBarang9digit.value);
        }
        kode_barang.value = kodeBarang9digit.value;
        fetch("/Kencana/satuan1/" + kode_barang.value)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data[0]);
                const optionKategoriUtama = kategori_utama.options;
                for (let i = 0; i < optionKategoriUtama.length; i++) {
                    const option = optionKategoriUtama[i];
                    if (option.value === data[0].no_kat_utama) {
                        option.selected = true;
                        break;
                    }
                }
                kategori.innerHTML = "";
                sub_kategori.innerHTML = "";
                nama_barang.innerHTML = "";
                //add option kategori sampai nama barang
                let optionKategori = document.createElement("option");
                optionKategori.value = data[0].no_kategori;
                optionKategori.text = data[0].nama_kategori;
                kategori.appendChild(optionKategori);
                let optionSubKategori = document.createElement("option");
                optionSubKategori.value = data[0].no_sub_kategori;
                optionSubKategori.text = data[0].nama_sub_kategori;
                sub_kategori.appendChild(optionSubKategori);
                let optionNamaBarang = document.createElement("option");
                optionNamaBarang.value = data[0].KodeBarang;
                optionNamaBarang.text = data[0].NAMA_BRG;
                nama_barang.appendChild(optionNamaBarang);
                //Isi data satuan
                const optionSatuanJual = satuan_jual.options;
                for (let i = 0; i < optionSatuanJual.length; i++) {
                    const option = optionSatuanJual[i];
                    // console.log(option);
                    if (option.value === data[0].NO_SATUAN_UMUM) {
                        option.selected = true;
                        break;
                    }
                }
                ppn.value = "EXCLUDE";
                ppn.readOnly = true;
                rencana_kirim.valueAsDate = new Date();
                satuan_primer.value = data[0].SatPrimer;
                satuan_sekunder.value = data[0].SatSekunder;
                satuan_tritier.value = data[0].Nama_satuan;
                funcBeratStandard(kode_barang.value);
                funcKolomBeratStandard();
                funcTampilInv(kode_barang.value);
            });
        qty_pesan.focus();
    }
});

no_spText.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // console.log(no_spText.value);
        // alert('Kode barang dienter');
        let no_spValue;
        if (no_spText.value.includes("/")) {
            no_spValue = no_spText.value.replace(/\//g, ".") + ".lama.";
        } else {
            no_spValue = no_spText.value + ".lama.";
        }
        fetch("/Kencana/penyesuaian/" + no_spValue)
            .then((response) => response.json())
            .then((data) => {
                funcHeaderDisabled(false);
                no_spText.readOnly = true;
                // console.log(data);
                for (let key in data[0][0]) {
                    if (
                        (data[0][0].hasOwnProperty(key) &&
                            data[0][0][key] === null) ||
                        (data[0][0].hasOwnProperty(key) &&
                            data[0][0][key] === "null")
                    ) {
                        data[0][0][key] = "";
                    }
                }
                // console.log(data[0][0].Tgl_Pesan.substr(0, 10));
                tgl_pesan.value = data[0][0].Tgl_Pesan.substr(0, 10);
                const optionJenisSp = jenis_sp.options;
                for (let i = 0; i < optionJenisSp.length; i++) {
                    const option = optionJenisSp[i];
                    if (option.value === data[0][0].IDJnsSuratPesanan) {
                        option.selected = true;
                        break;
                    }
                }
                const optionCustomer = list_customer.options;
                for (let i = 0; i < optionCustomer.length; i++) {
                    const option = optionCustomer[i];
                    if (option.value === data[0][0].IDCust) {
                        option.selected = true;
                        break;
                    }
                }
                no_po.value = data[0][0].NO_PO;
                tgl_po.value = data[0][0].Tgl_PO.substr(0, 10);
                no_pi.value = data[0][0].NO_PI;
                const optionSales = list_sales.options;
                for (let i = 0; i < optionSales.length; i++) {
                    const option = optionSales[i];
                    if (option.value === data[0][0].IDSales) {
                        option.selected = true;
                        break;
                    }
                }
                mata_uang.value = data[0][0].IDMataUang;
                const optionJenisBayar = jenis_bayar.options;
                for (let i = 0; i < optionJenisBayar.length; i++) {
                    const option = optionJenisBayar[i];
                    if (option.value === data[0][0].IDPembayaran) {
                        option.selected = true;
                        break;
                    }
                }
                syarat_bayar.value = data[0][0].SyaratBayar;
                let JnsFakturPjk = data[0][0].JnsFakturPjk;
                if (JnsFakturPjk == 0) {
                    faktur_pjkBiasa.checked = true;
                } else {
                    faktur_pjkSederhana.checked = true;
                }
                keterangan.value = data[0][0].Ket;
                if (no_spText.value.includes("/")) {
                    for (let i = 0; i < data[1].length; i++) {
                        // console.log("eksport");
                        const arraydata = [
                            data[1][i].namabarang,
                            data[1][i].KodeBarang,
                            formatangka(data[1][i].HargaSatuan),
                            formatangka(data[1][i].Qty),
                            data[1][i].Satuan,
                            data[1][i].TglRencanaKirim.substr(0, 10),
                            data[1][i].Lunas,
                            data[1][i].PPN,
                            data[1][i].BERAT_KARUNG3,
                            data[1][i].INDEX_KARUNG,
                            data[1][i].HARGA_KARUNG,
                            data[1][i].BERAT_INNER3,
                            data[1][i].INDEX_INNER,
                            data[1][i].HARGA_INNER,
                            data[1][i].BERAT_LAMI3,
                            data[1][i].INDEX_LAMI,
                            data[1][i].HARGA_LAMI,
                            data[1][i].BERAT_KERTAS3,
                            data[1][i].INDEX_KERTAS,
                            data[1][i].HARGA_KERTAS,
                            data[1][i].HARGA_LAIN2,
                            data[1][i].BERAT_TOTAL3,
                            data[1][i].HARGA_TOTAL,
                            data[1][i].BERAT_KARUNG,
                            data[1][i].BERAT_INNER,
                            data[1][i].BERAT_LAMI,
                            data[1][i].BERAT_CONDUCTIVE,
                            data[1][i].BERAT_TOTAL,
                            data[1][i].IDJnsBarang,
                            data[1][i].IDPesanan,
                            data[1][i].Informasi,
                        ];
                        // Insert array into a new row
                        funcInsertRow(arraydata);
                    }
                } else {
                    for (let i = 0; i < data[1].length; i++) {
                        // console.log("lokal");
                        const arraydata = [
                            data[1][i].namabarang,
                            data[1][i].IDBarang,
                            formatangka(parseFloat(data[1][i].HargaSatuan)),
                            formatangka(parseFloat(data[1][i].Qty)),
                            data[1][i].Satuan,
                            data[1][i].TglRencanaKirim.substr(0, 10),
                            data[1][i].Lunas ?? "",
                            data[1][i].PPN,
                            formatangka(parseFloat(data[1][i].BERAT_KARUNG3)),
                            formatangka(parseFloat(data[1][i].INDEX_KARUNG)),
                            formatangka(parseFloat(data[1][i].HARGA_KARUNG)),
                            formatangka(parseFloat(data[1][i].BERAT_INNER3)),
                            formatangka(parseFloat(data[1][i].INDEX_INNER)),
                            formatangka(parseFloat(data[1][i].HARGA_INNER)),
                            formatangka(parseFloat(data[1][i].BERAT_LAMI3)),
                            formatangka(parseFloat(data[1][i].INDEX_LAMI)),
                            formatangka(parseFloat(data[1][i].HARGA_LAMI)),
                            formatangka(parseFloat(data[1][i].BERAT_KERTAS3)),
                            formatangka(parseFloat(data[1][i].INDEX_KERTAS)),
                            formatangka(parseFloat(data[1][i].HARGA_KERTAS)),
                            formatangka(parseFloat(data[1][i].HARGA_LAIN2)),
                            formatangka(parseFloat(data[1][i].BERAT_TOTAL3)),
                            formatangka(parseFloat(data[1][i].HARGA_TOTAL)),
                            formatangka(parseFloat(data[1][i].BERAT_KARUNG)),
                            formatangka(parseFloat(data[1][i].BERAT_INNER)),
                            formatangka(parseFloat(data[1][i].BERAT_LAMI)),
                            formatangka(
                                parseFloat(data[1][i].BERAT_CONDUCTIVE)
                            ),
                            formatangka(parseFloat(data[1][i].BERAT_TOTAL)),
                            data[1][i].IDJnsBarang,
                            data[1][i].IDPesanan,
                            data[1][i].Informasi ?? "",
                        ];
                        // Insert array into a new row
                        funcInsertRow(arraydata);
                    }
                }
            });

        tgl_pesan.focus();
        div_tabelSuratPesanan.classList.toggle("disabled");
        div_detailSuratPesanan.classList.toggle("disabled");
        div_beratStandard.classList.toggle("disabled");
        div_saldoInventory.classList.toggle("disabled");
    }
});

satuan_jual.addEventListener("change", function () {
    funcTampilBeratStandardKGM();
});

add_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (kode_barang.value === "") {
        alert("Tidak ada barang yang dimasukan");
        return;
    } else if (
        jenis_brg.selectedIndex === -1 ||
        jenis_brg.selectedIndex === 0
    ) {
        alert("Pilih jenis barang!");
        jenis_brg.focus();
        return;
    } else if (total_cost.value <= 0) {
        alert("Berat standard harap diisi!");
        berat_karung.focus();
        return;
    } else if (qty_pesan.value <= 0) {
        alert("Quantity pesan harap diisi!");
        qty_pesan.focus();
        return;
    } else if (harga_satuan.value <= 0) {
        alert("Harga satuan harap diisi");
        harga_satuan.focus();
        return;
    }
    const arraydata = [
        nama_barang.options[nama_barang.selectedIndex].text,
        kode_barang.value,
        formatangka(parseFloat(harga_satuan.value)),
        formatangka(parseInt(qty_pesan.value)),
        satuan_jual.options[satuan_jual.selectedIndex].text,
        rencana_kirim.value,
        status_lunas.value,
        ppn.value,
        formatangka(parseFloat(berat_karung.value)),
        formatangka(parseFloat(index_karung.value)),
        formatangka(parseFloat(berat_indexKarung.value)),
        formatangka(parseFloat(berat_inner.value)),
        formatangka(parseFloat(index_inner.value)),
        formatangka(parseFloat(berat_indexInner.value)),
        formatangka(parseFloat(berat_lami.value)),
        formatangka(parseFloat(index_lami.value)),
        formatangka(parseFloat(berat_indexLami.value)),
        formatangka(parseFloat(berat_kertas.value)),
        formatangka(parseFloat(index_kertas.value)),
        formatangka(parseFloat(berat_indexKertas.value)),
        formatangka(parseFloat(biaya_lain.value)),
        formatangka(parseFloat(berat_standardTotal.value)),
        formatangka(parseFloat(total_cost.value)),
        formatangka(parseFloat(berat_karungMeter.value)),
        formatangka(parseFloat(berat_innerMeter.value)),
        formatangka(parseFloat(berat_lamiMeter.value)),
        formatangka(parseFloat(berat_kertasMeter.value)),
        formatangka(parseFloat(berat_standardTotalMeter.value)),
        jenis_brg.value,
        "",
        informasi_tambahan.value,
    ];
    // Insert array into a new row
    funcInsertRow(arraydata);
    funcClearInputBarang();
    jenis_brg.selectedIndex = 0;
    kategori_utama.selectedIndex = 0;
    kategori.innerHTML = "";
    kategori.disabled = false;
    sub_kategori.innerHTML = "";
    sub_kategori.disabled = false;
    nama_barang.innerHTML = "";
    nama_barang.disabled = false;
    enter_kodeBarang.style.display = "none";
    qty_pesan.value = "";
    harga_satuan.value = "";
    // jenisBarang.focus();
    let confirmation = confirm("Apakah ingin menambah barang?");

    if (confirmation) {
        jenis_brg.focus();
    } else {
        koreksi_button.focus();
    }
});

update_button.addEventListener("click", function (event) {
    event.preventDefault();
    let selectedRow = $("#list_view tbody tr.selected");

    if (selectedRow.length > 0) {
        let table = $("#list_view").DataTable();
        let rowData = table.row(selectedRow).data();

        // Update the values in the rowData array
        rowData[0] = nama_barang.options[nama_barang.selectedIndex].text;
        rowData[1] = kode_barang.value;
        rowData[3] = formatangka(parseInt(qty_pesan.value));
        rowData[4] = satuan_jual.options[satuan_jual.selectedIndex].text;
        rowData[2] = formatangka(parseFloat(harga_satuan.value));
        rowData[5] = rencana_kirim.value;
        rowData[6] = status_lunas.value;
        rowData[8] = formatangka(parseFloat(berat_karung.value));
        rowData[9] = formatangka(parseFloat(index_karung.value));
        rowData[10] = formatangka(parseFloat(berat_indexKarung.value));
        rowData[11] = formatangka(parseFloat(berat_inner.value));
        rowData[12] = formatangka(parseFloat(index_inner.value));
        rowData[13] = formatangka(parseFloat(berat_indexInner.value));
        rowData[14] = formatangka(parseFloat(berat_lami.value));
        rowData[15] = formatangka(parseFloat(index_lami.value));
        rowData[16] = formatangka(parseFloat(berat_indexLami.value));
        rowData[17] = formatangka(parseFloat(berat_kertas.value));
        rowData[18] = formatangka(parseFloat(index_kertas.value));
        rowData[19] = formatangka(parseFloat(berat_indexKertas.value));
        rowData[20] = formatangka(
            !isNaN(parseFloat(biaya_lain.value))
                ? parseFloat(biaya_lain.value)
                : "0"
        );
        rowData[21] = formatangka(parseFloat(berat_standardTotal.value));
        rowData[22] = formatangka(parseFloat(total_cost.value));
        rowData[23] = formatangka(
            !isNaN(parseFloat(berat_karungMeter.value))
                ? parseFloat(berat_karungMeter.value)
                : "0"
        );
        rowData[24] = formatangka(
            !isNaN(parseFloat(berat_innerMeter.value))
                ? parseFloat(berat_innerMeter.value)
                : "0"
        );
        rowData[25] = formatangka(
            !isNaN(parseFloat(berat_lamiMeter.value))
                ? parseFloat(berat_lamiMeter.value)
                : "0"
        );
        rowData[26] = formatangka(
            !isNaN(parseFloat(berat_kertasMeter.value))
                ? parseFloat(berat_kertasMeter.value)
                : "0"
        );
        rowData[27] = formatangka(
            !isNaN(parseFloat(berat_standardTotalMeter.value))
                ? parseFloat(berat_standardTotalMeter.value)
                : "0"
        );
        rowData[28] = jenis_brg.value;
        rowData[30] = informasi_tambahan.value;

        // Update the data in the DataTable
        table.row(selectedRow).data(rowData).draw();
        // remove highlight from selected row
        selectedRow.toggleClass("selected");
        // clear input fields
        funcClearInputBarang();
        jenis_brg.selectedIndex = 0;
        kategori_utama.selectedIndex = 0;
        kategori.innerHTML = "";
        kategori.disabled = false;
        sub_kategori.innerHTML = "";
        sub_kategori.disabled = false;
        nama_barang.innerHTML = "";
        nama_barang.disabled = false;
        enter_kodeBarang.style.display = "none";
        qty_pesan.value = "";
        harga_satuan.value = "";
        jenis_brg.focus();
        // Update the table display
        $("#list_view").DataTable().draw();
        div_beratStandardMeter.style.display = "none";
        div_beratStandardMeter.disabled = false;
    }
});

delete_button.addEventListener("click", function (event) {
    event.preventDefault();
    let selectedRow = $("#list_view tbody tr.selected");
    console.log(selectedRow.find("td").eq(28).text() !== "");
    let table = $("#list_view").DataTable();
    if (proses == 1) {
        if (selectedRow.length > 0) {
            let rowIndex = table.row(selectedRow).index();

            // Remove the selected row from the DataTable
            table.row(selectedRow).remove().draw();
            alert("Data sudah terhapus dari tabel!");
        } else {
            alert("Tidak ada data yang dihapus");
        }
    } else if (proses == 2) {
        if (selectedRow.length > 0) {
            if (selectedRow.find("td").eq(28).text() !== "") {
                // console.log(input[7].value);
                fetch("/Kencana/deletedetail/" + selectedRow.find("td").eq(28).text())
                    .then((response) => response.json())
                    .then((data) => {
                        alert(data);
                    });
                table.row(selectedRow).remove().draw();
            } else {
                table.row(selectedRow).remove().draw();
            }
            alert("Data sudah terhapus dari tabel!");
        } else {
            alert("Tidak ada data yang dihapus");
        }
    }
    funcClearInputBarang();
    jenis_brg.selectedIndex = 0;
    kategori_utama.selectedIndex = 0;
    kategori.innerHTML = "";
    kategori.disabled = false;
    sub_kategori.innerHTML = "";
    sub_kategori.disabled = false;
    nama_barang.innerHTML = "";
    nama_barang.disabled = false;
    enter_kodeBarang.style.display = "none";
    qty_pesan.value = "";
    harga_satuan.value = "";
    jenis_brg.focus();
    div_beratStandardMeter.style.display = "none";
    div_beratStandardMeter.disabled = false;
});

//#endregion

//#region Function

function funcClearHeaderPesanan() {
    tgl_pesan.valueAsDate = new Date();
    jenis_sp.selectedIndex = 0;
    no_spText.value = "";
    list_sales.selectedIndex = 0;
    list_customer.selectedIndex = 0;
    no_po.value = "";
    tgl_po.valueAsDate = new Date();
    no_pi.value = "";
    mata_uang.value = "";
    jenis_bayar.selectedIndex = 0;
    syarat_bayar = "";
    faktur_pjkBiasa.checked = true;
    keterangan.value = "";
}

function funcClearInputBarang() {
    jenis_brg.selectedIndex = 0;
    kategori_utama.selectedIndex = 0;
    kategori.innerHTML = "";
    sub_kategori.innerHTML = "";
    nama_barang.innerHTML = "";
    satuan_jual.selectedIndex = 0;
    qty_pesan.value = "";
    harga_satuan.value = "";
    rencana_kirim.valueAsDate = new Date();
    ppn.value = "";
    satuan_primer.value = "";
    satuan_sekunder.value = "";
    satuan_tritier.value = "";
    kode_barang.readOnly = true;
    kode_barang.value = "";
    berat_karung.value = "";
    berat_karung.readOnly = true;
    berat_inner.value = "";
    berat_inner.readOnly = true;
    berat_lami.value = "";
    berat_lami.readOnly = true;
    berat_kertas.value = "";
    berat_kertas.readOnly = true;
    index_karung.value = "";
    index_karung.readOnly = true;
    index_inner.value = "";
    index_inner.readOnly = true;
    index_lami.value = "";
    index_lami.readOnly = true;
    index_kertas.value = "";
    index_kertas.readOnly = true;
    berat_indexKarung.value = "";
    berat_indexKarung.readOnly = true;
    berat_indexInner.value = "";
    berat_indexInner.readOnly = true;
    berat_indexLami.value = "";
    berat_indexLami.readOnly = true;
    berat_indexKertas.value = "";
    berat_indexKertas.readOnly = true;
    biaya_lain.value = "";
    biaya_lain.readOnly = true;
    total_cost.value = "";
    berat_standardTotal.value = "";
    berat_innerMeter.value = "";
    berat_karungMeter.value = "";
    berat_kertasMeter.value = "";
    berat_lamiMeter.value = "";
    table_saldoInventory.clear().draw();
    status_lunas.value = "";
    informasi_tambahan.value = "";
    div_beratStandardMeter.style.display = "none";
}

function funcHeaderDisabled(bool) {
    tgl_pesan.readOnly = bool;
    jenis_sp.disabled = bool;
    list_customer.disabled = bool;
    no_po.readOnly = bool;
    no_pi.readOnly = bool;
    tgl_po.readOnly = bool;
    list_sales.disabled = bool;
    mata_uang.readOnly = bool;
    jenis_bayar.disabled = bool;
    syarat_bayar.readOnly = bool;
    keterangan.readOnly = bool;
    faktur_pjkBiasa.disabled = bool;
    faktur_pjkSederhana.disabled = bool;
}

function funcInsertRow(array) {
    let isDataInTable = false;
    const table = $("#list_view").DataTable();
    // console.log(table.rows.length);
    if (table.data().length > 0) {
        table.rows().every(function () {
            const rowData = this.data();
            const columnValue = rowData[1]; // Assuming you want to compare the second column

            // Compare the column value with your desired value
            if (columnValue === kode_barang.value) {
                // Perform your desired action here
                isDataInTable = true;
            }
        });
    }
    // table.clear();
    if (isDataInTable) {
        alert("Data barang sudah ada");
        table_listView.focus();
    } else {
        table.row.add(array);
        table.draw();
        $("#list_view tbody").off("click", "tr");
        $("#list_view tbody").on("click", "tr", function () {
            let checkSelectedRows = $("#list_view tbody tr.selected");

            if (checkSelectedRows.length > 0) {
                // Remove "selected" class from previously selected rows
                checkSelectedRows.removeClass("selected");
            }
            $(this).toggleClass("selected");
            let selectedRows = table.rows(".selected").data().toArray();
            console.log(selectedRows);
            qty_pesan.value = parseInt(selectedRows[0][3].replace(/,/g, ""));
            harga_satuan.value = parseFloat(
                selectedRows[0][2].replace(/,/g, "")
            );
            ppn.value = selectedRows[0][7];
            status_lunas.value = selectedRows[0][6];
            informasi_tambahan.value = selectedRows[0][30];
            satuan_jual.selectedIndex = 0;
            for (let i = 0; i < satuan_jual.length; i++) {
                // console.log(satuanJual.selectedIndex);
                satuan_jual.selectedIndex += 1;
                if (
                    satuan_jual.options[satuan_jual.selectedIndex].text ===
                    selectedRows[0][4].trim()
                ) {
                    break;
                }
            }
            jenis_brg.value = selectedRows[0][28];
            rencana_kirim.value = selectedRows[0][5];
            let optionNamaBarang = document.createElement("option");
            optionNamaBarang.value = selectedRows[0][1];
            optionNamaBarang.text = selectedRows[0][0];
            nama_barang.appendChild(optionNamaBarang);
            kode_barang.value = selectedRows[0][1];
            kode_barang.readOnly = false;
            berat_karung.readOnly = false;
            berat_inner.readOnly = false;
            berat_lami.readOnly = false;
            berat_kertas.readOnly = false;
            index_karung.readOnly = false;
            index_inner.readOnly = false;
            index_lami.readOnly = false;
            index_kertas.readOnly = false;
            biaya_lain.readOnly = false;
            berat_karung.value = parseFloat(
                selectedRows[0][8].replace(/,/g, "")
            );
            index_karung.value = parseFloat(
                selectedRows[0][9].replace(/,/g, "")
            );
            berat_indexKarung.value = parseFloat(
                selectedRows[0][10].replace(/,/g, "")
            );
            berat_inner.value = parseFloat(
                selectedRows[0][11].replace(/,/g, "")
            );
            index_inner.value = parseFloat(
                selectedRows[0][12].replace(/,/g, "")
            );
            berat_indexInner.value = parseFloat(
                selectedRows[0][13].replace(/,/g, "")
            );
            berat_lami.value = parseFloat(
                selectedRows[0][14].replace(/,/g, "")
            );
            index_lami.value = parseFloat(
                selectedRows[0][15].replace(/,/g, "")
            );
            berat_indexLami.value = parseFloat(
                selectedRows[0][16].replace(/,/g, "")
            );
            berat_kertas.value = parseFloat(
                selectedRows[0][17].replace(/,/g, "")
            );
            index_kertas.value = parseFloat(
                selectedRows[0][18].replace(/,/g, "")
            );
            berat_indexKertas.value = parseFloat(
                selectedRows[0][19].replace(/,/g, "")
            );
            biaya_lain.value = parseFloat(
                selectedRows[0][20].replace(/,/g, "")
            );
            berat_standardTotal.value = parseFloat(
                selectedRows[0][21].replace(/,/g, "")
            );
            total_cost.value = parseFloat(
                selectedRows[0][22].replace(/,/g, "")
            );
            berat_karungMeter.value = parseFloat(
                selectedRows[0][23].replace(/,/g, "")
            );
            berat_innerMeter.value = parseFloat(
                selectedRows[0][24].replace(/,/g, "")
            );
            berat_lamiMeter.value = parseFloat(
                selectedRows[0][25].replace(/,/g, "")
            );
            berat_kertasMeter.value = parseFloat(
                selectedRows[0][26].replace(/,/g, "")
            );
            berat_standardTotalMeter.value = parseFloat(
                selectedRows[0][27].replace(/,/g, "")
            );
            funcDisplayDataBrg(selectedRows[0][1]);
            funcTampilInv(selectedRows[0][1]);
            funcKolomBeratStandard();
        });
    }
}

function funcDisplayDataBrg(kodeBarangParameter) {
    // console.log(kodeBarangParameter);
    fetch("/Kencana/displaybarang/" + kodeBarangParameter)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            let optionTagKategori = document.createElement("option");
            let optionTagSubKategori = document.createElement("option");
            const optionKategoriUtama = kategori_utama.options;

            for (let i = 0; i < optionKategoriUtama.length; i++) {
                const option = optionKategoriUtama[i];
                if (option.value === data[0].IdKelompokUtama) {
                    option.selected = true;
                    break;
                }
            }
            //disable dulu karena ndak ada isi optionnya hehe
            // kategori.disabled = true;
            // sub_kategori.disabled = true;
            // nama_barang.disabled = true;
            //ngisi optionnya hehe
            optionTagKategori.value = data[0].IdKelompok;
            optionTagKategori.text = data[0].NamaKelompok;
            optionTagSubKategori.value = data[0].IdCorak;
            optionTagSubKategori.text = data[0].Corak;
            kategori.appendChild(optionTagKategori);
            sub_kategori.appendChild(optionTagSubKategori);
            //ngisi sisanya hehe
            satuan_primer.value = data[0].SatuanPrimer;
            satuan_sekunder.value = data[0].SatuanSekunder;
            satuan_tritier.value = data[0].SatuanTritier;
            funcTampilBeratStandardKGM();
        });
}

function funcBeratStandard(namaBarang) {
    // console.log("kategori utama: " + kategoriUtama.value);
    // console.log('kode barang: ' + namaBarang);
    fetch("/Kencana/beratstandard/" + namaBarang)
        .then((response) => response.json())
        .then((data) => {
            div_beratStandard.style.display = "block";
            // console.log(data[0]);
            //ambil data dari database masuk ke input text
            berat_karung.value = data[0].BERAT_KARUNG3;
            berat_inner.value = data[0].BERAT_INNER3;
            berat_lami.value = data[0].BERAT_LAMI3;
            berat_karungMeter.value = data[0].BERAT_KARUNG2;
            berat_innerMeter.value = data[0].BERAT_INNER2;
            berat_lamiMeter.value = data[0].BERAT_LAMI2;
            berat_kertasMeter.value = data[0].BERAT_CONDUCTIVE2;
            berat_standardTotalMeter.value = data[0].BERAT_TOTAL2;
            berat_kertas.value = data[0].BERAT_KERTAS3;
            berat_standardTotal.value = data[0].BERAT_TOTAL3;
            berat_karung.readOnly = false;
            berat_inner.readOnly = false;
            berat_lami.readOnly = false;
            berat_kertas.readOnly = false;
            index_karung.readOnly = false;
            index_inner.readOnly = false;
            index_lami.readOnly = false;
            index_kertas.readOnly = false;
            biaya_lain.readOnly = false;
            index_karung.value = 0;
            index_inner.value = 0;
            index_lami.value = 0;
            index_kertas.value = 0;
            biaya_lain.value = 0;
            berat_indexInner.value = 0;
            berat_indexKarung.value = 0;
            berat_indexLami.value = 0;
            berat_indexKertas.value = 0;
            total_cost.value = 0;
        });
}

function funcKolomBeratStandard() {
    [
        berat_karung,
        berat_inner,
        berat_kertas,
        berat_lami,
        index_karung,
        index_inner,
        index_kertas,
        index_lami,
        biaya_lain,
        berat_karungMeter,
        berat_innerMeter,
        berat_lamiMeter,
        berat_kertasMeter,
    ].forEach(function (element) {
        element.addEventListener("input", function () {
            // console.log(trigger == 0);
            berat_indexKarung.value =
                parseFloat(berat_karung.value) * parseFloat(index_karung.value);

            berat_indexInner.value =
                parseFloat(berat_inner.value) * parseFloat(index_inner.value);

            berat_indexLami.value =
                parseFloat(berat_lami.value) * parseFloat(index_lami.value);

            berat_indexKertas.value =
                parseFloat(berat_kertas.value) * parseFloat(index_kertas.value);

            berat_standardTotal.value =
                parseFloat(berat_karung.value) +
                parseFloat(berat_inner.value) +
                parseFloat(berat_lami.value) +
                parseFloat(berat_kertas.value);

            total_cost.value =
                parseFloat(biaya_lain.value) +
                parseFloat(berat_indexKarung.value) +
                parseFloat(berat_indexInner.value) +
                parseFloat(berat_indexKertas.value) +
                parseFloat(berat_indexLami.value);

            berat_standardTotalMeter.value =
                parseFloat(berat_karungMeter.value) +
                parseFloat(berat_innerMeter.value) +
                parseFloat(berat_lamiMeter.value) +
                parseFloat(berat_kertasMeter.value);

            if (trigger == 0) {
                berat_karungMeter.value = parseFloat(berat_karung.value);
                berat_innerMeter.value = parseFloat(berat_inner.value);
                berat_lamiMeter.value = parseFloat(berat_lami.value);
                berat_kertasMeter.value = parseFloat(berat_kertas.value);
                berat_standardTotalMeter.value =
                    parseFloat(berat_karungMeter.value) +
                    parseFloat(berat_innerMeter.value) +
                    parseFloat(berat_lamiMeter.value) +
                    parseFloat(berat_kertasMeter.value);
            }
        });
    });
}

function funcTampilInv(kodeBarang) {
    fetch("/Kencana/saldoinventory/" + kodeBarang)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            const rows = data.map((item) => {
                return [
                    item.NamaDivisi.trim(),
                    item.SaldoTritier.trim(),
                    item.satTertier.trim(),
                    item.SaldoSekunder.trim(),
                    item.satSekunder.trim(),
                    item.SaldoPrimer.trim(),
                    item.satPrimer.trim(),
                    item.NamaObjek.trim(),
                    item.NamaKelompokUtama.trim(),
                    item.NamaKelompok.trim(),
                    item.NamaSubKelompok.trim(),
                ];
            });
            // const table = $("#table_saldoInventory").DataTable();
            table_saldoInventory.clear();
            table_saldoInventory.rows.add(rows);
            table_saldoInventory.draw();
        });
}

function funcDatatablesIntoInput() {
    let dataArray = [];
    dataArray = list_view.data().toArray();
    // console.log(dataArray);
    // Create a hidden input element
    for (let i = 0; i < dataArray.length; i++) {
        let row = dataArray[i];
        for (let j = 0; j < dataArray[i].length; j++) {
            let hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.name = "barang" + j + "[]"; // Set the name attribute as desired
            hiddenInput.multiple = true;
            console.log(row, row[j]);
            hiddenInput.value = row[j].replace(/,/g, "");
            // Append the hidden input to the document body or any other element
            form_suratPesanan.appendChild(hiddenInput);
        }
    }
}

function funcTampilBeratStandardKGM() {
    console.log(satuan_jual.options[satuan_jual.selectedIndex].text);
    console.log(satuan_sekunder.value);

    if (
        satuan_jual.options[satuan_jual.selectedIndex].text !==
        satuan_sekunder.value.trim()
    ) {
        div_beratStandardMeter.style.visibility = "visible";
        trigger = 1;
    } else if (
        satuan_jual.options[satuan_jual.selectedIndex].text ==
        satuan_sekunder.value.trim()
    ) {
        div_beratStandardMeter.style.visibility = "hidden";
        trigger = 0;
    }
}

function formatangka(objek) {
    // console.log(objek); // Output the provided number for debugging purposes

    // Check if the number has decimal places
    if (Number.isInteger(objek)) {
        return objek.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        let parts = objek.toFixed(3).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".").replace(/\.?0+$/, "");
    }
}
//#endregion
