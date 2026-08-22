//#region get element by id

// let nomor_spData = document.getElementById("nomor_spData");
let alamat_kirim = document.getElementById("alamat_kirim");
let listBarang_button = document.getElementById("listBarang_button");
let id_pesananText = document.getElementById("id_pesananText");
// let cc = document.getElementById("cc");
let customer = document.getElementById("customer");
let div_deliveryOrder = document.getElementById("div_deliveryOrder");
let divisi = document.getElementById("divisi");
// let etd = document.getElementById("etd");
let form_deliveryOrder = document.getElementById("form_deliveryOrder");
let id_pesananSelect = document.getElementById("id_pesananSelect");
// let id_pesanan_hidden = document.getElementById("id_pesanan_hidden");
let id_typeBarang = document.getElementById("id_typeBarang");
let kelompok = document.getElementById("kelompok");
let kelompok_utama = document.getElementById("kelompok_utama");
let alamat_kirimCustomer = document.getElementById("alamat_kirimCustomer");
let kode_barang = document.getElementById("kode_barang");
let kota_kirim = document.getElementById("kota_kirim");
let listDO_button = document.getElementById("listDO_button");
let listSP_button = document.getElementById("listSP_button");
let max_kirim = document.getElementById("max_kirim");
let min_kirim = document.getElementById("min_kirim");
let nomor_doSelect = document.getElementById("nomor_doSelect");
let nomor_doSpan = document.getElementById("nomor_doSpan");
let nomor_doText = document.getElementById("nomor_doText");
let nomor_spText = document.getElementById("nomor_spText");
let nomor_spSelect = document.getElementById("nomor_spSelect");
let proses = 0;
// let qty_kirim = document.getElementById("qty_kirim");
// let qty_order = document.getElementById("qty_order");
let qty_primer = document.getElementById("qty_primer");
let qty_primerGudang = document.getElementById("qty_primerGudang");
let qty_sekunder = document.getElementById("qty_sekunder");
let qty_sekunderGudang = document.getElementById("qty_sekunderGudang");
let qty_tritier = document.getElementById("qty_tritier");
let qty_tritierGudang = document.getElementById("qty_tritierGudang");
let satuan_primer = document.getElementById("satuan_primer");
let satuan_sekunder = document.getElementById("satuan_sekunder");
let satuan_tritier = document.getElementById("satuan_tritier");
let sub_kelompok = document.getElementById("sub_kelompok");
let text_idTypeBarang = document.getElementById("text_idTypeBarang");
let tgl_do = document.getElementById("tgl_do");
let uraian = document.getElementById("uraian");
let id_pesananDiv = document.getElementById("id_pesananDiv");
let surat_pesananDiv = document.getElementById("surat_pesananDiv");

//#endregion

//#region input filter

setInputFilter(
    document.getElementById("qty_primer"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);
setInputFilter(
    document.getElementById("qty_sekunder"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);
setInputFilter(
    document.getElementById("qty_tritier"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);
// setInputFilter(
//     document.getElementById("qty_order"),
//     function (value) {
//         return /^-?\d*[.]?\d*$/.test(value);
//     },
//     "Must be a floating (real) number"
// );
// setInputFilter(
//     document.getElementById("qty_kirim"),
//     function (value) {
//         return /^-?\d*[.]?\d*$/.test(value);
//     },
//     "Must be a floating (real) number"
// );
setInputFilter(
    document.getElementById("max_kirim"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);
setInputFilter(
    document.getElementById("min_kirim"),
    function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);
//#endregion

//#region enter-enter

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(
        ".permohonan-do-container27 .button"
    );

    buttons.forEach((button, index) => {
        button.addEventListener("keydown", function (e) {
            if (e.key === "ArrowRight") {
                e.preventDefault();
                const next = (index + 1) % buttons.length;
                buttons[next].focus();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                const prev = (index - 1 + buttons.length) % buttons.length;
                buttons[prev].focus();
            }
        });
    });
});

tgl_do.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        // console.log(proses);
        event.preventDefault();
        if (proses == 1) {
            customer.focus();
        } else {
            listDO_button.focus();
        }
    }
});
// nomor_spText.addEventListener("keypress", function(event){
//     if (event.key == "Enter") {
//         event.preventDefault();
//         listBarang_button.focus();
//     }
// });
max_kirim.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        min_kirim.focus();
    }
});

min_kirim.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        alamat_kirim.focus();
        alamat_kirim.select();
    }
});

alamat_kirim.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Cegah enter default hanya jika tanpa shift
        isi_button.focus(); // Pindah fokus ke tombol
    }
    // Jika shift+enter, tidak dicegah dan akan membuat baris baru
});

// alamat_kirim.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         isi_button.focus();
//     }
// });

nomor_doSelect.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        min_kirim.focus();
        min_kirim.select();
    }
});

// qty_order.addEventListener("keypress", function (event) {
//     if (event.key == "Enter") {
//         event.preventDefault();
//         qty_kirim.focus();
//     }
// });

// qty_kirim.addEventListener("keypress", function (event) {
//     if (event.key == "Enter") {
//         event.preventDefault();
//         alamat_kirim.focus();
//     }
// });

//#endregion

//#region load form

isi_button.focus();
// etd.valueAsDate = new Date();
// cc.valueAsDate = new Date();
tgl_do.valueAsDate = new Date();
nomor_spSelect.style.display = "none";
id_pesananSelect.style.display = "none";
div_deliveryOrder.classList.toggle("disabled");

//#endregion

//#region get value option using ajax

customer.addEventListener("change", function () {
    let customer = this.value;
    fetch("/Kencana/options/nomorsp/" + customer)
        .then((response) => response.json())
        .then((options) => {
            if (options.length < 1) {
                alamat_kirimCustomer.value =
                    "Tidak ada Surat Pesanan yang bisa diproses";
                alamat_kirimCustomer.classList.add("text-danger");
                alamat_kirimCustomer.classList.remove("text-success");
            } else {
                alamat_kirimCustomer.value = options[0].AlamatKirim;
                alamat_kirimCustomer.classList.remove("text-danger");
                alamat_kirimCustomer.classList.add("text-success");
            }
            alamat_kirimCustomer.focus();
            nomor_spText.focus();
            nomor_spSelect.innerHTML =
                "<option disabled selected value>-- Pilih Nomor Surat Pesanan --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IDSuratPesanan;
                optionTag.text =
                    option.IDSuratPesanan + " | " + option.JnsSuratPesanan;
                nomor_spSelect.appendChild(optionTag);
            });
        });
});

alamat_kirimCustomer.addEventListener("focus", autoResize, false);

nomor_spText.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // nomor_spSelect.style.display = "block";
        let nomor_spText = this.value;
        let selectedOption = Array.from(nomor_spSelect.options).find(
            (option) => option.value === nomor_spText
        );
        // console.log(selectedOption == undefined);
        if (selectedOption == undefined) {
            alert(
                "Nomor SP yang dimasukkan salah, silahkan cek daftar nomor surat pesanan!"
            );
            nomor_spSelect.style.display = "block";
            nomor_spText.style.display = "none";
            nomor_spSelect.focus();
        } else {
            if (selectedOption.value.includes("/")) {
                no_spValue = selectedOption.value.replace(/\//g, ".");
            } else {
                no_spValue = selectedOption.value;
            }
            nomor_spSelect.value = selectedOption.value;
            fetch("/Kencana/options/id_pesanan/" + no_spValue)
                .then((response) => response.json())
                .then((options) => {
                    id_pesananSelect.innerHTML =
                        "<option disabled selected value>-- Pilih ID Pesanan --</option>";
                    options.forEach((option) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = option.IDPesanan;
                        optionTag.text =
                            option.IDPesanan + " | " + option.Uraian;
                        id_pesananSelect.appendChild(optionTag);
                    });
                });
            listBarang_button.focus();
        }
    }
});

nomor_spSelect.addEventListener("change", function () {
    // let nomor_spSelect = this.value;
    // nomor_spText.value = nomor_spSelect;
    if (this.value.includes("/")) {
        no_spValue = this.value.replace(/\//g, ".");
    } else {
        no_spValue = this.value;
    }
    id_pesananText.value = "";
    id_pesananSelect.focus();
    fetch("/Kencana/options/id_pesanan/" + no_spValue)
        .then((response) => response.json())
        .then((options) => {
            console.log(options); //eksport harus ambil kode barang bukan ID Type
            id_pesananSelect.innerHTML =
                "<option disabled selected value>-- Pilih ID Pesanan --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IDPesanan;
                optionTag.text = option.IDPesanan + " | " + option.Uraian;
                id_pesananSelect.appendChild(optionTag);
            });
        });
});

nomor_doText.addEventListener("keypress", function (event) {
    console.log("Masuk edit");
    if (event.key === "Enter") {
        event.preventDefault();
        let nomor_do = this.value;
        let selectedOption = Array.from(nomor_doSelect.options).find(
            (option) => option.value === nomor_do
        );
        if (selectedOption == undefined) {
            edit_button.dispatchEvent(new Event("click"));
            alert(
                "Nomor SP yang dimasukkan salah, silahkan cek daftar nomor surat pesanan!"
            );
            edit_button.focus();
        } else {
            for (let i = 0; i < nomor_doSelect.length; i++) {
                if (nomor_doSelect.options[i].value == nomor_do) {
                    nomor_doSelect.options[i].selected = true;
                    nomor_doSelect.dispatchEvent(new Event("change"));
                    break;
                }
            }
        }
    }
});

nomor_doSelect.addEventListener("change", function () {
    nomor_doText.value = this.value;
    nomor_spSelect.style.display = "none";
    nomor_spText.style.display = "block";
    console.log("Nomor DO select:", this.value);
    const url = "/Kencana/DeliveryOrder/" + this.value + "/edit";
    console.log("URL EDIT:", url);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            tgl_do.value = data[0].tanggal.substr(0, 10);
            for (let i = 0; i < customer.options.length; i++) {
                if (customer.options[i].value == data[0].IDCust) {
                    customer.options[i].selected = true;
                    break;
                }
            }
            nomor_spText.value = data[0].IDSuratPesanan;
            id_pesananText.value = data[0].IDPesanan;
            fetch("/Kencana/options/nomorsp/" + customer.value)
                .then((response) => response.json())
                .then((options) => {
                    // console.log(options);
                    nomor_spSelect.innerHTML =
                        "<option disabled selected value>-- Pilih Nomor Delivery Order --</option>";
                    options.forEach((option) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = option.IDSuratPesanan;
                        optionTag.text =
                            option.IDSuratPesanan +
                            " - " +
                            option.JnsSuratPesanan;
                        nomor_spSelect.appendChild(optionTag);
                        // console.log(nomor_spSelect.options.length);
                        for (
                            let i = 0;
                            i < nomor_spSelect.options.length;
                            i++
                        ) {
                            if (
                                nomor_spSelect.options[i].value ==
                                nomor_spText.value
                            ) {
                                nomor_spSelect.options[i].selected = true;
                                // console.log(nomor_spSelect.options[i].value);
                                break;
                            }
                        }
                    });
                });
            // console.log(data);
            fetch("/Kencana/options/id_pesanan/" + nomor_spText.value)
                .then((response) => response.json())
                .then((options) => {
                    id_pesananSelect.innerHTML =
                        "<option disabled selected value>-- Pilih ID Pesanan --</option>";
                    options.forEach((option) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = option.IDPesanan;
                        optionTag.text =
                            option.IDPesanan + " | " + option.Uraian;
                        id_pesananSelect.appendChild(optionTag);
                        for (
                            let i = 0;
                            i < id_pesananSelect.options.length;
                            i++
                        ) {
                            if (
                                id_pesananSelect.options[i].value ==
                                data[0].IDPesanan
                            ) {
                                id_pesananSelect.options[i].selected = true;
                                // console.log(nomor_spSelect.options[i].value);
                                break;
                            }
                        }
                        kode_barang.value = option.Uraian.slice(-9);
                        uraian.value = option.Uraian.split("-")
                            .slice(0, -1)
                            .join("-");
                    });
                    fetch(
                        "/Kencana/options/kelompokutama/" +
                        encodeURIComponent(kode_barang.value)
                    )
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(
                                    `Gagal mengambil Kelompok Utama: HTTP ${response.status}`
                                );
                            }

                            return response.json();
                        })
                        .then((options) => {
                            console.log("Kelompok Utama:", options);

                            kelompok_utama.innerHTML =
                                '<option disabled selected value="">-- Pilih Kelompok Utama --</option>';

                            options.forEach((option) => {
                                const optionTag = document.createElement("option");

                                // SESUAI DENGAN RESPONSE CONTROLLER
                                optionTag.value = option.IdKelompokUtama;

                                optionTag.textContent =
                                    option.IdKelompokUtama +
                                    " | " +
                                    option.NamaKelompokUtama;

                                kelompok_utama.appendChild(optionTag);
                            });

                            // Pilih Kelompok Utama sesuai data DO
                            const idKelompokUtama = data[0].IdKelompokUtama;

                            if (idKelompokUtama) {
                                kelompok_utama.value = idKelompokUtama;
                            }

                            console.log(
                                "Selected Kelompok Utama:",
                                kelompok_utama.value
                            );

                            // Jangan lanjut kalau tidak ditemukan
                            if (!kelompok_utama.value) {
                                console.warn(
                                    "Kelompok Utama tidak ditemukan:",
                                    idKelompokUtama
                                );

                                kelompok.innerHTML =
                                    '<option disabled selected value="">-- Pilih Kelompok --</option>';

                                sub_kelompok.innerHTML =
                                    '<option disabled selected value="">-- Pilih Sub Kelompok --</option>';

                                return;
                            }

                            // Ambil Kelompok
                            return fetch(
                                "/Kencana/options/kelompok/" +
                                encodeURIComponent(kelompok_utama.value) +
                                "/" +
                                encodeURIComponent(kode_barang.value)
                            );
                        })
                        .then((response) => {
                            if (!response) {
                                return;
                            }

                            if (!response.ok) {
                                throw new Error(
                                    `Gagal mengambil Kelompok: HTTP ${response.status}`
                                );
                            }

                            return response.json();
                        })
                        .then((options) => {
                            if (!options) {
                                return;
                            }

                            console.log("Kelompok:", options);

                            kelompok.innerHTML =
                                '<option disabled selected value="">-- Pilih Kelompok --</option>';

                            options.forEach((option) => {
                                const optionTag = document.createElement("option");

                                optionTag.value = option.IdKelompok;

                                optionTag.textContent =
                                    option.IdKelompok +
                                    " | " +
                                    option.NamaKelompok;

                                kelompok.appendChild(optionTag);
                            });

                            // Pilih Kelompok sesuai data DO
                            const idKelompok = data[0].IdKelompok;

                            if (idKelompok) {
                                kelompok.value = idKelompok;
                            }

                            console.log(
                                "Selected Kelompok:",
                                kelompok.value
                            );

                            if (!kelompok.value) {
                                console.warn(
                                    "Kelompok tidak ditemukan:",
                                    idKelompok
                                );

                                sub_kelompok.innerHTML =
                                    '<option disabled selected value="">-- Pilih Sub Kelompok --</option>';

                                return;
                            }

                            // Ambil Sub Kelompok
                            return fetch(
                                "/Kencana/options/subkelompok/" +
                                encodeURIComponent(kelompok.value) +
                                "/" +
                                encodeURIComponent(kode_barang.value)
                            );
                        })
                        .then((response) => {
                            if (!response) {
                                return;
                            }

                            if (!response.ok) {
                                throw new Error(
                                    `Gagal mengambil Sub Kelompok: HTTP ${response.status}`
                                );
                            }

                            return response.json();
                        })
                        .then((options) => {
                            if (!options) {
                                return;
                            }

                            console.log("Sub Kelompok:", options);

                            sub_kelompok.innerHTML =
                                '<option disabled selected value="">-- Pilih Sub Kelompok --</option>';

                            options.forEach((option) => {
                                const optionTag = document.createElement("option");

                                optionTag.value = option.IdSubkelompok;

                                optionTag.textContent =
                                    option.IdSubkelompok +
                                    " | " +
                                    option.NamaSubKelompok;

                                sub_kelompok.appendChild(optionTag);
                            });

                            // Pilih Sub Kelompok sesuai data DO
                            const idSubKelompok = data[0].IdSubkelompok;

                            if (idSubKelompok) {
                                sub_kelompok.value = idSubKelompok;
                            }

                            console.log(
                                "Selected Sub Kelompok:",
                                sub_kelompok.value
                            );
                        })
                        .catch((error) => {
                            console.error(
                                "Gagal memuat Kelompok/Sub Kelompok:",
                                error
                            );
                        });
                });
            qty_primer.value = numeral(data[0].QtyPrimer).value();
            qty_sekunder.value = numeral(data[0].QtySekunder).value();
            qty_tritier.value = numeral(data[0].QtyTritier).value();
            // qty_kirim.value = numeral(data[0].TerKirim).value();
            // qty_order.value = numeral(data[0].Qty).value();
            max_kirim.value = data[0].MaxKirimDO;
            min_kirim.value = data[0].MinKirimDO;
            qty_primerGudang.value = numeral(data[0].SaldoPrimer).value(); // prettier-ignore
            qty_sekunderGudang.value = numeral(data[0].SaldoSekunder).value(); // prettier-ignore
            qty_tritierGudang.value = numeral(data[0].SaldoTritier).value(); // prettier-ignore
            satuan_primer.value = data[0].SatPrimer;
            satuan_sekunder.value = data[0].SatSekunder;
            satuan_tritier.value = data[0].SatTritier;
            alamat_kirim.value = data[0].AlamatKirim;
            kota_kirim.value = data[0].KotaKirim;
        });
});

id_pesananSelect.addEventListener("change", function () {
    id_pesananDiv.style.display = "none";
    id_pesananSelect.style.display = "none";
    id_pesananText.style.display = "block";
    let selectedOption = this.options[this.selectedIndex];
    let text = selectedOption.text;
    let parts = text.split(" | ");
    // console.log(parts);
    // selectedOption.text = parts[0];
    kode_barang.value = text.slice(-9);
    // console.log(text);
    uraian.value = text.split(" | ")[1].split("-").slice(0, -1).join("-");
    id_pesanan_hidden.value = parts[0];
    // console.log(parts[0]);
    kelompok_utama.focus();
    if (nomor_spSelect.value.includes("/")) {
        id_pesananText.value = this.value + ".Ekspor";
    } else {
        id_pesananText.value = this.value;
    }
    fetch("/Kencana/options/barang/" + id_pesananText.value)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // document.getElementById("id_pesanan").disabled = true;
            kode_barang.readOnly = true;
            uraian.readOnly = true;
            // qty_kirim.readOnly = true;
            // qty_kirim.value = numeral(data[0].TerKirim).format("0,0");
            // qty_order.readOnly = true;
            // qty_order.value = data[0].Qty;
            satuan_primer.readOnly = true;
            satuan_primer.value = data[0].SatuanPrimer;
            satuan_sekunder.readOnly = true;
            satuan_sekunder.value = data[0].SatuanSekunder;
            satuan_tritier.readOnly = true;
            satuan_tritier.value = data[0].SatuanTritier;
        });
    // console.log(kode_barang.value);
    console.log(kode_barang.value); //eksport harus ambil kode barang bukan ID Type
    fetch("/Kencana/options/kelompokutama/" + kode_barang.value)
        .then((response) => response.json())
        .then((options) => {
            kelompok_utama.innerHTML =
                '<option disabled selected value="">-- Pilih Kelompok Utama --</option>';

            options.forEach((option) => {
                let optionTag = document.createElement("option");

                // VALUE = ID KELOMPOK UTAMA
                optionTag.value = option.IdKelompokUtama;

                // TEXT = ID + NAMA
                optionTag.text =
                    option.IdKelompokUtama +
                    " | " +
                    option.NamaKelompokUtama;

                kelompok_utama.appendChild(optionTag);
            });
        })
        .catch((error) => {
            console.error("Gagal mengambil Kelompok Utama:", error);
        });
    id_pesananText.value = this.value;
});

id_pesananText.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
    }
});

kelompok_utama.addEventListener("change", function () {
    const idKelompokUtama = this.value;
    const selectedOption = this.options[this.selectedIndex];

    id_typeBarang.value = selectedOption.dataset.idType || "";
    kelompok.innerHTML = '<option disabled selected value="">-- Pilih Kelompok --</option>';
    sub_kelompok.innerHTML = '<option disabled selected value="">-- Pilih Sub Kelompok --</option>';

    fetch(
        "/Kencana/options/kelompok/" +
        encodeURIComponent(idKelompokUtama) +
        "/" +
        encodeURIComponent(kode_barang.value)
    )
        .then((response) => response.json())
        .then((options) => {

            options.forEach((option) => {

                let optionTag = document.createElement("option");

                optionTag.value = option.IdKelompok;

                optionTag.text =
                    option.IdKelompok +
                    " | " +
                    option.NamaKelompok;

                kelompok.appendChild(optionTag);
            });

            kelompok.focus();
        })
        .catch((error) => {
            console.error("Gagal mengambil Kelompok:", error);
        });
});

kelompok.addEventListener("change", function () {

    const idKelompok = this.value;

    sub_kelompok.innerHTML =
        '<option disabled selected value="">-- Pilih Sub Kelompok --</option>';

    fetch(
        "/Kencana/options/subkelompok/" +
        encodeURIComponent(idKelompok) +
        "/" +
        encodeURIComponent(kode_barang.value)
    )
        .then((response) => response.json())
        .then((options) => {

            options.forEach((option) => {

                let optionTag = document.createElement("option");

                optionTag.value = option.IdSubkelompok;
                optionTag.text =
                    option.IdSubkelompok +
                    " | " +
                    option.NamaSubKelompok;

                sub_kelompok.appendChild(optionTag);
            });

            sub_kelompok.focus();
        })
        .catch((error) => {
            console.error("Gagal mengambil Sub Kelompok:", error);
        });
});
sub_kelompok.addEventListener("change", function () {
    let sub_kelompok = this.value;

    fetch("/Kencana/options/saldo/" + sub_kelompok + "/" + kode_barang.value)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            if (!data || data.length === 0) {
                console.error("Data IdType tidak ditemukan");
                return;
            }

            text_idTypeBarang.style.display = "block";
            id_typeBarang.style.display = "block";
            id_typeBarang.readOnly = true;

            id_typeBarang.value = data[0].IdType;

            max_kirim.focus();

            qty_primer.value = 0;
            qty_sekunder.value = 0;
            qty_tritier.value = 0;
        });
});

//#endregion

//#region Button-button

isi_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        proses = 1;
        nomor_doText.style.display = "none";
        listDO_button.style.display = "none";
        nomor_doSpan.style.display = "none";
        listSP_button.disabled = false;
        listBarang_button.disabled = false;
        this.innerHTML = "Proses";
        edit_button.innerHTML = "Batal";
        hapus_button.style.display = "none";
        tgl_do.focus();
    } else if (proses == 1) {
        //BUTTON PROSES
        //isi
        form_deliveryOrder.submit();
        proses = 0;
        this.innerHTML = "Isi";
        edit_button.innerHTML = "Koreksi";
        hapus_button.style.display = "none";
    } else if (proses == 2) {
        //edit
        form_deliveryOrder.action =
            "/Kencana/DeliveryOrder/" + nomor_doText.value + "/up";
        form_deliveryOrder.submit();

        proses = 0;
        edit_button.innerHTML = "Koreksi";
        this.innerHTML = "Isi";
        hapus_button.style.display = "block";
        listDO_button.disabled = true;
    } else if (proses == 3) {
        //delete
        form_deliveryOrder.action = "/Kencana/DeliveryOrder/" + nomor_doText.value;
        form_deliveryOrder.submit();
        proses = 0;
        edit_button.innerHTML = "Koreksi";
        this.innerHTML = "Isi";
        hapus_button.style.display = "block";
    }
    div_deliveryOrder.classList.toggle("disabled");
});

edit_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        proses = 2;
        this.innerHTML = "Batal";
        isi_button.innerHTML = "Proses";
        hapus_button.style.display = "none";
        listSP_button.disabled = false;
        listDO_button.disabled = false;
        listBarang_button.disabled = false;
        nomor_doText.focus();
        fetch("/Kencana/options/nomorDO/")
            .then((response) => response.json())
            .then((options) => {
                // console.log(options);
                nomor_doSelect.innerHTML =
                    "<option disabled selected value>-- Pilih Nomor Delivery Order --</option>";
                options.forEach((option) => {
                    let optionTag = document.createElement("option");
                    optionTag.value = option.IDDO;
                    optionTag.text = option.IDDO + " - " + option.Uraian;
                    nomor_doSelect.appendChild(optionTag);
                });
            });
    } else {
        // button BATAL
        proses = 0;
        funcResetForm();
        this.innerHTML = "Koreksi";
        isi_button.innerHTML = "Isi";
        hapus_button.style.display = "block";
    }
    div_deliveryOrder.classList.toggle("disabled");
});

hapus_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        proses = 3;
        edit_button.innerHTML = "Batal";
        isi_button.innerHTML = "Proses";
        this.style.display = "none";
        listDO_button.disabled = false;
        nomor_doText.focus();
        fetch("/Kencana/options/nomorDO/")
            .then((response) => response.json())
            .then((options) => {
                // console.log(options);
                nomor_doSelect.innerHTML =
                    "<option disabled selected value>-- Pilih Nomor Delivery Order --</option>";
                options.forEach((option) => {
                    let optionTag = document.createElement("option");
                    optionTag.value = option.IDDO;
                    optionTag.text = option.IDDO + " - " + option.Uraian;
                    nomor_doSelect.appendChild(optionTag);
                });
            });
    }
    div_deliveryOrder.classList.toggle("disabled");
});

listDO_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (nomor_doSelect.style.display == "block") {
        nomor_doSelect.style.display = "none";
        nomor_doText.style.display = "block";
        nomor_doText.focus();
    } else if (nomor_doSelect.style.display == "none") {
        nomor_doSelect.style.display = "block";
        nomor_doText.style.display = "none";
        nomor_doSelect.focus();
    }
});

listBarang_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (id_pesananSelect.style.display == "block") {
        id_pesananSelect.style.display = "none";
        id_pesananText.style.display = "block";
        id_pesananDiv.style.display = "none";
        id_pesananText.focus();
    } else if (id_pesananSelect.style.display == "none") {
        id_pesananSelect.style.display = "block";
        id_pesananText.style.display = "none";
        id_pesananDiv.style.display = "flex";
        id_pesananSelect.focus();
    }
});

listSP_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (nomor_spSelect.style.display == "block") {
        nomor_spSelect.style.display = "none";
        surat_pesananDiv.style.display = "none";
        nomor_spText.style.display = "block";
        nomor_spText.focus();
    } else if (nomor_spSelect.style.display == "none") {
        nomor_spSelect.style.display = "block";
        surat_pesananDiv.style.display = "flex";
        nomor_spText.style.display = "none";
        nomor_spSelect.focus();
    }
    // console.log(customer.value);
});
//#endregion

function funcResetForm() {
    surat_pesananDiv.style.display = "none";
    id_pesananDiv.style.display = "none";
    // etd.valueAsDate = new Date();
    // cc.valueAsDate = new Date();
    tgl_do.valueAsDate = new Date();
    nomor_doSelect.selectedIndex = 0;
    nomor_doText.value = "";
    customer.selectedIndex = 0;
    nomor_spSelect.selectedIndex = 0;
    nomor_spText.value = "";
    id_pesananSelect.selectedIndex = 0;
    kode_barang.value = "";
    uraian.value = "";
    kelompok_utama.selectedIndex = 0;
    kelompok.selectedIndex = 0;
    sub_kelompok.selectedIndex = 0;
    qty_primer.value = "";
    qty_sekunder.value = "";
    qty_tritier.value = "";
    // qty_kirim.value = "";
    // qty_order.value = "";
    max_kirim.value = "";
    min_kirim.value = "";
    qty_primerGudang.value = "";
    qty_sekunderGudang.value = "";
    qty_tritierGudang.value = "";
    divisi = "";
    satuan_primer.value = "";
    satuan_sekunder.value = "";
    satuan_tritier.value = "";
    alamat_kirim.value = "";
    kota_kirim.value = "";
    nomor_doSelect.innerHTML =
        "<option disabled selected value>-- Pilih Nomor Delivery Order --</option>";
    id_pesananSelect.innerHTML =
        "<option disabled selected value>-- Pilih ID Pesanan --</option>";
    id_pesananText.value = "";
    id_pesananText.style.display = "block";
    id_pesananSelect.style.display = "none";
    nomor_spSelect.innerHTML =
        "<option disabled selected value>-- Pilih Nomor Surat Pesanan --</option>";
    nomor_spText.value = "";
    nomor_spSelect.style.display = "none";
    nomor_spText.style.display = "block";
    nomor_doText.style.display = "block";
    listDO_button.style.display = "block";
    listDO_button.disabled = true;
    listSP_button.disabled = true;
    listBarang_button.disabled = true;
    nomor_doSpan.style.display = "block";
    nomor_doSelect.style.display = "none";
}

function autoResize() {
    console.log(this.style.height);
    this.style.height = "auto";
    this.style.overflow = "hidden";
    this.style.height = this.scrollHeight + "px";
}
