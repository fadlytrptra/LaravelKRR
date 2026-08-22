let cetak_belumACC = document.getElementById("cetak_belumACC");
let cetak_sudahACC = document.getElementById("cetak_sudahACC");
let tanggal_do = document.getElementById("tanggal_do");
let nomor_referensi = document.getElementById("nomor_referensi");
let print_button = document.getElementById("print_button");
let export_pdf = document.getElementById("export_pdf");
let contoh_print = document.getElementById("contoh_print");
let contoh_printDiv = document.getElementById("contoh_printDiv");
let body_deliveryOrderBelumACC = document.getElementById(
    "body_deliveryOrderBelumACC"
);
let body_deliveryOrderSudahACC = document.getElementById(
    "body_deliveryOrderSudahACC"
);
let nama_customerKolom = document.getElementById("nama_customerKolom");
let tanggal_kirimKolom = document.getElementById("tanggal_kirimKolom");
let nomor_referensiKolom = document.getElementById("nomor_referensiKolom");
let count_do = document.getElementById("count_do");
let div_cetakDOSudahACC = document.getElementById("div_cetakDOSudahACC");
let div_cetakDOBelumACC = document.getElementById("div_cetakDOBelumACC");

//#region Load Form

tanggal_do.valueAsDate = new Date();
cetak_sudahACC.checked = true;
contoh_print.style.display = "none";
contoh_printDiv.style.display = "none";
export_pdf.style.display = "none";
print_pdf.style.display = "none";

//#endregion

//#region Add event listener

print_button.addEventListener("click", function (event) {
    event.preventDefault();
    $("#loading-screen").css("display", "flex");
    if (nomor_referensi.value == "") {
        alert("Isi kolom nomor referensi terlebih dahulu!");
        nomor_referensi.focus();
        $("#loading-screen").css("display", "none");
    } else {
        export_pdf.style.display = "inline-block";
        print_pdf.style.display = "inline-block";
        contoh_printDiv.style.display = "block";
        contoh_print.style.display = "inline-block";

        if (cetak_belumACC.checked == true) {
            fetch("/Kencana/dobelumacc/" + tanggal_do.value)
                .then((response) => response.json())
                .then((options) => {
                    nomor_referensiKolom.innerHTML = nomor_referensi.value;
                    div_cetakDOSudahACC.innerHTML = "";
                    div_cetakDOBelumACC.innerHTML = "";
                    const date = new Date(tanggal_do.value);
                    const formattedDate = date.toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                    });
                    tanggal_kirimKolom.innerHTML = formattedDate;
                    console.log(options);
                    options.forEach((option, index) => {
                        console.log(option);
                        for (let prop in option) {
                            if (option[prop] === null) {
                                option[prop] = ""; // Change null value to an empty string
                            }
                        }
                        let min_kirimSekunderValue = 0;
                        const body_deliveryOrderBelumACC =
                            document.createElement("div");
                        body_deliveryOrderBelumACC.classList.add(
                            "cetak-dopdf-container05"
                        );
                        if (option.SatuanJual.trim() == "KGM") {
                            if (typeof option.MinKirimDO === "number") {
                                min_kirimSekunderValue =
                                    option.MinKirimDO.toFixed(2);
                            } else if (typeof option.MinKirimDO !== "number") {
                                let minKirimDO = parseFloat(
                                    option.MinKirimDO
                                ).toFixed(2);
                                min_kirimSekunderValue = minKirimDO;
                            }
                        } else if (option.SatuanJual.trim() !== "KGM") {
                            min_kirimSekunderValue = (
                                (option.BERAT_TOTAL * option.MinKirimDO) /
                                1000
                            ).toFixed(2);
                        }
                        const formattedText = option.AlamatKirimDO.replace(
                            /\r\n/g,
                            "<br>"
                        );
                        body_deliveryOrderBelumACC.innerHTML = `
                        <div class="acs-dopdf-container03">
                            <div class="cetak-dopdf-container03">
                                <div style=width:100%>
                                    <table style="text-align: start">
                                        <tr>
                                            <td>Pelanggan: </td>
                                            <td id="nama_customerKolom">${
                                                option.NamaCust
                                            }</td>
                                        </tr>
                                        <tr>
                                            <td style="white-space: nowrap;vertical-align:top">Alamat Kirim: </td>
                                            <td id="alamat_kirimKolom">${
                                                option.AlamatKirim
                                            }</td>
                                        </tr>
                                        <tr>
                                            <td>No. SP: </td>
                                            <td id="no_spKolom">${
                                                option.IDSuratPesanan
                                            }</td>
                                        </tr>
                                        <tr>
                                            <td>No. PO: </td>
                                            <td id="no_poKolom">${
                                                option.NO_PO
                                            }</td>
                                        </tr>
                                        <tr>
                                            <td style="white-space: nowrap;vertical-align:top">Alamat Kantor: </td>
                                            <td id="keterangan_kolom">${
                                                option.Alamat ?? ""
                                            }</td>
                                        </tr>
                                    </table>

                                </div>
                                <div class="cetak-dopdf-container04">
                                    <table>
                                        <tr>
                                            <td style="vertical-align: top;white-space: nowrap;">Spesifikasi:&nbsp;</td>
                                            <td><span id="nama_kelompokKolom">Ukuran: ${
                                                option.NamaKelompok
                                            }</span> <br> <span
                                                    id="nama_barangKolom">${
                                                        option.NamaBarang
                                                    }</span></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td style="vertical-align: top;overflow-wrap: break-word;                                            ">Corak: ${
                                                option.Corak
                                            }</td>
                                        </tr>
                                    </table>
                                    <table>
                                        <tr>
                                            <td style="vertical-align: top">Jumlah:&nbsp;</td>
                                            <td>Min: </td>
                                            <td id="min_kirimKolom">${
                                                option.MinKirimDO
                                            }&nbsp;</td>
                                            <td>${option.SatuanJual.trim()}&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>Max:&nbsp;</td>
                                            <td id="max_kirimKolom">${
                                                option.MaxKirimDO
                                            }</td>
                                            <td>${option.SatuanJual.trim()}&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td id="min_kirimSekunderKolom">${min_kirimSekunderValue}&nbsp;</td>
                                            <td>${option.SatuanTritier.trim()}&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="white-space: nowrap">Jenis Customer:&nbsp;</td>
                                            <td>${option.JnsCust}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div style="display:flex; flex-direction:row;margin:3px;gap:5px">
                                        <p style="white-space: nowrap">
                                            Keterangan:
                                        </p>
                                        <p style="text-align:justify">
                                            ${formattedText}
                                        </p>
                                </div>
                                <span style="margin-right: 5px;display:flex;justify-content:right;">${
                                    index + 1
                                }</span>
                        </div>
                        `;
                        div_cetakDOBelumACC.appendChild(
                            body_deliveryOrderBelumACC
                        );
                    });
                })
                .finally(() => {
                    $("#loading-screen").css("display", "none");
                });
        } else if (cetak_sudahACC.checked == true) {
            // INI TIDAK DIPAKAI TAPI TIDAK DIHAPUS UNTUK JAGA-JAGA
            fetch("/Kencana/dosudahacc/" + tanggal_do.value)
                .then((response) => response.json())
                .then((options) => {
                    nomor_referensiKolom.innerHTML = nomor_referensi.value;
                    div_cetakDOSudahACC.innerHTML = "";
                    div_cetakDOBelumACC.innerHTML = "";
                    const date = new Date(tanggal_do.value);
                    const formattedDate = date.toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                    });
                    tanggal_kirimKolom.innerHTML = formattedDate;
                    // count_do.innerHTML = options.count();
                    console.log(options);
                    options.forEach((option, index) => {
                        console.log(option);
                        let min_kirimSekunderValue = 0;
                        min_kirimSekunderValue = (
                            option.BERAT_TOTAL * option.MinKirimDO
                        ).toFixed(3);
                        const body_deliveryOrderSudahACC =
                            document.createElement("div");
                        body_deliveryOrderSudahACC.classList.add(
                            "cetak-dopdf-container05"
                        );
                        // body_deliveryOrderSudahACC.classList.add("body-cetak");
                        body_deliveryOrderSudahACC.innerHTML = `
                        <div class="cetak-dopdf-container03">
                            <div style=width:45%>
                                <table style="text-align: start">
                                    <tr>
                                        <td>Pelanggan: </td>
                                        <td id="nama_customerKolom">${
                                            option.NamaCust
                                        }</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top;white-space: nowrap">Alamat Kirim: </td>
                                        <td id="alamat_kirimKolom">${
                                            option.AlamatKirim
                                        }</td>
                                    </tr>
                                    <tr>
                                        <td>No. SP: </td>
                                        <td id="no_spKolom">${
                                            option.IDSuratPesanan
                                        }</td>
                                    </tr>
                                    <tr>
                                        <td>No. PO: </td>
                                        <td id="no_poKolom">${option.NO_PO}</td>
                                    </tr>
                                    <tr>
                                        <td>Keterangan: </td>
                                        <td id="keterangan_kolom">${
                                            option.Keterangan
                                        }</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="cetak-dopdf-container04">
                                <table>
                                    <tr>
                                        <td style="vertical-align: top;">Spesifikasi:&nbsp;</td>
                                        <td style="max-width: 200px"><span id="nama_kelompokKolom">Ukuran: ${
                                            option.NamaKelompok
                                        }</span> <br> <span
                                                id="nama_barangKolom">${
                                                    option.NamaBarang
                                                }</span></td>
                                        <td></td>
                                        <td style="vertical-align: top">Corak</td>
                                    </tr>
                                </table>
                                <table>
                                    <tr>
                                        <td style="vertical-align: top;text-align: right">Jumlah:&nbsp;</td>
                                        <td>Min: </td>
                                        <td id="min_kirimKolom">${
                                            option.MinKirimDO
                                        }&nbsp;</td>
                                        <td>${option.SatuanJual}&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Max:&nbsp;</td>
                                        <td id="max_kirimKolom">${
                                            option.MaxKirimDO
                                        }</td>
                                        <td>${option.SatuanJual}&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td id="min_kirimSekunderKolom">${min_kirimSekunderValue}&nbsp;</td>
                                        <td>${option.satTritier}&nbsp;</td>
                                    </tr>
                                </table>
                            </div>
                            <span style="margin-right: 5px;align-self: end;">${
                                index + 1
                            }</span>
                        </div>
                        `;
                        div_cetakDOSudahACC.appendChild(
                            body_deliveryOrderSudahACC
                        );
                    });
                })
                .finally(() => {
                    $("#loading-screen").css("display", "none");
                });
        } else {
            alert("Pilih status DO sudah ACC atau belum ACC dulu!");
            cetak_belumACC.focus();
        }
    }
});

nomor_referensi.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (nomor_referensi.value == "") {
            alert("Isi kolom nomor referensi terlebih dahulu!");
            nomor_referensi.focus();
        } else {
            print_button.focus();
        }
    }
});

print_pdf.addEventListener("click", function (event) {
    event.preventDefault();
    window.print();
});

//#endregion

//#region function mantap-mantap

//#endregion
