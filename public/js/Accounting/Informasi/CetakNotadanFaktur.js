// Inisialisasi elemen-elemen ke dalam variabel
var optTunai = document.getElementById("optTunai");
var optPajakTunai = document.getElementById("optPajakTunai");
var optUM = document.getElementById("optUM");
var optNotaFaktur = document.getElementById("optNotaFaktur");
var optPajak = document.getElementById("optPajak");
var optPajakUM = document.getElementById("optPajakUM");

var tglPenagihan = document.getElementById("tgl_Penagihan");
var customer = document.getElementById("customer");
var btnBrowse = document.getElementById("btnBrowse");
var idPenagihan = document.getElementById("idPenagihan");
var bankSelect = document.getElementById("bankSelect");
var ttdSelect = document.getElementById("ttdSelect");
// var radioPilihan = document.querySelectorAll('input[name="pilihan"]');

// var formatLabel = document.getElementById("formatLabel");
// var formatSelect = document.getElementById("formatSelect");

// function toggleFormat() {
//     if (optNotaFaktur.checked) {
//         formatLabel.style.display = "block";
//         formatSelect.style.display = "block";
//     } else {
//         formatLabel.style.display = "none";
//         formatSelect.style.display = "none";
//     }
// }

// toggleFormat();

// radioPilihan.forEach((radio) => {
//     radio.addEventListener("change", toggleFormat);
// });

var btnPrev = document.getElementById("btnPrev");
var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tglPenagihan.value = formattedDate2;

tglPenagihan.focus();

tglPenagihan.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        btnBrowse.focus();
    }
});

btnBrowse.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        btnPrev.focus();
    }
});

function printPreview(previewClass) {
    document
        .querySelectorAll(".faktur, .faktur2, .fakturXC")
        .forEach(function (preview) {
            preview.style.display = "none";
        });

    const previewToPrint = document.querySelector(`.${previewClass}`);
    previewToPrint.style.display = "block";

    window.print();

    previewToPrint.style.display = "none";
}

function formatDateToMMDDYYYY(date) {
    let dateObj = new Date(date);
    if (isNaN(dateObj)) {
        return "";
    }

    let month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    let day = dateObj.getDate().toString().padStart(2, "0");
    let year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
}

let tradeTerm = "";
let dcn = "";
let doi = "";
let editDate;
let sfilter, sType;
btnPrev.addEventListener("click", function (e) {
    let sType = "";

    if (optNotaFaktur.checked) {
        if (bankSelect.value == "6") {
            Swal.fire({
                title: "Masukkan Informasi Berikut",
                icon: "info",
                html: `
                      <div style="text-align: left;">
                        <label for="trade_term">Trade Term:</label>
                        <input type="text" id="trade_term" class="swal2-input" style="width: 80%;">

                        <label for="dcn">Documentary Credit Number:</label>
                        <input type="text" id="dcn" class="swal2-input" style="width: 80%;">

                        <label for="doi">Date of Issue:</label>
                        <input type="text" id="doi" class="swal2-input" style="width: 80%;">
                      </div>
                    `,
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                // width: "70%",
                preConfirm: () => {
                    const tradeTerm = document
                        .getElementById("trade_term")
                        .value.trim();
                    const dcn = document.getElementById("dcn").value.trim();
                    const doi = document.getElementById("doi").value.trim();

                    if (!tradeTerm || !dcn || !doi) {
                        Swal.showValidationMessage("Semua kolom harus diisi");
                        return false;
                    }

                    return { tradeTerm, dcn, doi };
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    tradeTerm = result.value.tradeTerm;
                    dcn = result.value.dcn;
                    doi = result.value.doi;
                    sType = "CetakNotaFaktur";
                    getViewSJ(sType);
                }
            });
        } else if (bankSelect.value == "7") {
            Swal.fire({
                title: "Masukkan Informasi Berikut",
                icon: "info",
                html: `
                      <div style="text-align: left;">
                        <label for="editDate">Edit date:</label>
                        <input type="date" id="editDate" class="swal2-input" style="width: 80%;">
                      </div>
                    `,
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                // width: "70%",
                preConfirm: () => {
                    const editDate = document
                        .getElementById("editDate")
                        .value.trim();

                    // if (!tradeTerm || !dcn || !doi) {
                    //     Swal.showValidationMessage("Semua kolom harus diisi");
                    //     return false;
                    // }
                    return { editDate };
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    editDate = new Date(result.value.editDate);
                    // dcn = result.value.dcn;
                    // doi = result.value.doi;
                    sType = "CetakNotaFaktur";
                    getViewSJ(sType);
                }
            });
        } else {
            sType = "CetakNotaFaktur";
            getViewSJ(sType);
        }
    } else if (optPajak.checked) {
        sType = "CetakFakturPajak";
        getViewSJ(sType);
    } else if (optTunai.checked) {
        sType = "Cetaknotatunai";
        getViewSP(sType);
    } else if (optPajakTunai.checked) {
        sType = "CetakFakturPajakTunai";
        getViewSP(sType);
    } else if (optUM.checked) {
        sType = "CetakFakturUM";
        getViewSP(sType);
    } else if (optPajakUM.checked) {
        sType = "CetakFakturPajakUM";
        getViewSP(sType);
    }
});

function getViewSJ(sType) {
    $.ajax({
        type: "GET",
        url: "CetakNotaDanFaktur/getSJ",
        data: {
            _token: csrfToken,
            Id_Penagihan: idPenagihan.value.trim(),
        },
        success: function (result) {
            if (sType === "CetakNotaFaktur") {
                rpt_cetakNotaFaktur(result);
            } else if (sType === "CetakFakturPajak") {
                rpt_cetakFakturPajak(result);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function getViewSP(sType) {
    $.ajax({
        type: "GET",
        url: "CetakNotaDanFaktur/getSP",
        data: {
            _token: csrfToken,
            Id_Penagihan: idPenagihan.value.trim(),
        },
        success: function (result) {
            if (sType === "Cetaknotatunai") {
                rpt_cetakNotaTunai(result);
            } else if (sType === "CetakFakturPajakTunai") {
                rpt_CetakFakturPajakTunai(result);
            } else if (sType === "CetakFakturUM") {
                rpt_CetakFakturUM(result);
            } else if (sType === "CetakFakturPajakUM") {
                rpt_CetakFakturPajakUM(result);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function cekXC(idTagih) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "CetakNotaDanFaktur/cekXC",
            data: {
                _token: csrfToken,
                noInv: idTagih,
            },
            success: function (result) {
                let cekXC = result[0].ada ? result[0].ada : 0;
                resolve(cekXC);
            },
            error: function (xhr, status, error) {
                reject(error);
            },
        });
    });
}

// cetak nota faktur done
function rpt_cetakNotaFaktur(result) {
    let noInv = "";
    if (idPenagihan.value.length > 14) {
        noInv = idPenagihan.value;

        cekXC(noInv)
            .then(function (XC) {
                if (XC > 0) {
                    $.ajax({
                        type: "GET",
                        url: "CetakNotaDanFaktur/getBiayaTambahanFakturXC",
                        data: {
                            _token: csrfToken,
                            Id_Penagihan: idPenagihan.value.trim(),
                        },
                        success: function (hello) {
                            if (hello.length !== 0) {
                                var fakturXC_Dexlite =
                                    document.getElementById("fakturXC_Dexlite");
                                var fakturXC_Demurrage =
                                    document.getElementById(
                                        "fakturXC_Demurrage"
                                    );

                                fakturXC_Dexlite.textContent = numeral(
                                    hello[0].XCTranspor
                                ).format("0,0.00");
                                fakturXC_Demurrage.textContent = numeral(
                                    hello[0].Storage
                                ).format("0,0.00");
                            } else {
                                fakturXC_Dexlite.textContent = "";
                                fakturXC_Demurrage.textContent = "";
                            }

                            var fakturXC_IdPenagihan = document.getElementById(
                                "fakturXC_IdPenagihan"
                            );
                            var fakturXC_AreaPPNThnIdFakturPajak =
                                document.getElementById(
                                    "fakturXC_AreaPPNThnIdFakturPajak"
                                );
                            var fakturXC_NamaNPWP =
                                document.getElementById("fakturXC_NamaNPWP");
                            var fakturXC_AlamatNPWP = document.getElementById(
                                "fakturXC_AlamatNPWP"
                            );
                            var fakturXC_NPWP =
                                document.getElementById("fakturXC_NPWP");
                            var fakturXC_NamaKelompokUtama =
                                document.getElementById(
                                    "fakturXC_NamaKelompokUtama"
                                );
                            var fakturXC_Grand =
                                document.getElementById("fakturXC_Grand");
                            var fakturXC_SymbolGrand = document.getElementById(
                                "fakturXC_SymbolGrand"
                            );
                            var fakturXC_UM =
                                document.getElementById("fakturXC_UM");
                            var fakturXC_SymbolUM =
                                document.getElementById("fakturXC_SymbolUM");
                            var fakturXC_DPP =
                                document.getElementById("fakturXC_DPP");
                            var fakturXC_SymbolDPP =
                                document.getElementById("fakturXC_SymbolDPP");
                            var fakturXC_Pajak =
                                document.getElementById("fakturXC_Pajak");
                            var fakturXC_SymbolPajak = document.getElementById(
                                "fakturXC_SymbolPajak"
                            );
                            var fakturXC_Terbilang =
                                document.getElementById("fakturXC_Terbilang");
                            var fakturXC_Terbayar =
                                document.getElementById("fakturXC_Terbayar");
                            var fakturXC_SymbolTerbayar =
                                document.getElementById(
                                    "fakturXC_SymbolTerbayar"
                                );
                            var fakturXC_SyaratBayar = document.getElementById(
                                "fakturXC_SyaratBayar"
                            );
                            var fakturXC_TglBln =
                                document.getElementById("fakturXC_TglBln");
                            var fakturXC_Thn =
                                document.getElementById("fakturXC_Thn");
                            var fakturXC_PersenPPN =
                                document.getElementById("fakturXC_PersenPPN");
                            var fakturXC_Tempo =
                                document.getElementById("fakturXC_Tempo");
                            var fakturXC_SuratJalan = document.getElementById(
                                "fakturXC_SuratJalan"
                            );
                            var fakturXC_SJ =
                                document.getElementById("fakturXC_SJ");

                            if (result.length !== 0) {
                                fakturXC_IdPenagihan.textContent =
                                    decodeHtmlEntities(result[0].Id_Penagihan);

                                var date2 = new Date(result[0].Tgl_Penagihan);

                                var namaBulan = [
                                    "Januari",
                                    "Februari",
                                    "Maret",
                                    "April",
                                    "Mei",
                                    "Juni",
                                    "Juli",
                                    "Agustus",
                                    "September",
                                    "Oktober",
                                    "November",
                                    "Desember",
                                ];

                                var tanggal = date2.getDate();
                                var bulan = namaBulan[date2.getMonth()];
                                var tahunLengkap = date2.getFullYear();
                                var duaDigitTahun = tahunLengkap
                                    .toString()
                                    .slice(-2);
                                fakturXC_AreaPPNThnIdFakturPajak.textContent =
                                    decodeHtmlEntities(result[0].KdArea_Ppn) +
                                    " . 012 - " +
                                    duaDigitTahun +
                                    ". " +
                                    decodeHtmlEntities(result[0].IdFakturPajak);

                                fakturXC_NamaNPWP.textContent =
                                    decodeHtmlEntities(result[0].NamaNPWP);
                                fakturXC_AlamatNPWP.textContent =
                                    decodeHtmlEntities(result[0].AlamatNPWP);

                                let npwp = result[0].NPWP;
                                let formattedNPWP =
                                    npwp.slice(0, 2) +
                                    " . " +
                                    npwp.slice(2, 5) +
                                    " . " +
                                    npwp.slice(5, 8) +
                                    " . " +
                                    npwp.slice(8, 9) +
                                    " - " +
                                    npwp.slice(9, 12) +
                                    " . " +
                                    npwp.slice(12, 15);
                                fakturXC_NPWP.textContent = formattedNPWP;

                                fakturXC_NamaKelompokUtama.textContent =
                                    decodeHtmlEntities(
                                        result[0].NamaKelompokUtama
                                    );

                                let totalGrand = 0;
                                let count = 0;
                                var fakturXC_Detail =
                                    document.getElementById("fakturXC_Detail");

                                fakturXC_Detail.innerHTML = "";

                                result.forEach(function (item, index) {
                                    var row = document.createElement("div");
                                    row.classList.add("row");
                                    count += 1;

                                    var coaCol = document.createElement("div");
                                    coaCol.classList.add(
                                        "col-sm-1",
                                        "text-right"
                                    );
                                    coaCol.textContent = count;
                                    row.appendChild(coaCol);

                                    var accountCol =
                                        document.createElement("div");
                                    accountCol.classList.add(
                                        "col-sm-5",
                                        "text-left"
                                    );
                                    accountCol.textContent = item.NamaType
                                        ? decodeHtmlEntities(item.NamaType)
                                        : "";
                                    row.appendChild(accountCol);

                                    var descriptionCol =
                                        document.createElement("div");
                                    descriptionCol.classList.add(
                                        "col-sm-2",
                                        "text-right"
                                    );
                                    descriptionCol.textContent = item.Jml
                                        ? numeral(item.Jml).format("0,0.00") +
                                        item.Satuan
                                        : "";
                                    row.appendChild(descriptionCol);

                                    var amountCol =
                                        document.createElement("div");
                                    amountCol.classList.add(
                                        "col-sm-2",
                                        "text-right"
                                    );
                                    amountCol.textContent = item.HargaSatuan
                                        ? decodeHtmlEntities(item.Symbol2) +
                                        numeral(item.HargaSatuan).format(
                                            "0,0.00"
                                        )
                                        : "0.00";
                                    row.appendChild(amountCol);

                                    var totalCol =
                                        document.createElement("div");
                                    totalCol.classList.add(
                                        "col-sm-2",
                                        "text-left"
                                    );
                                    let tempTotal =
                                        numeral(item.Jml).value() *
                                        numeral(item.HargaSatuan).value();
                                    totalCol.textContent = item.HargaSatuan
                                        ? decodeHtmlEntities(item.Symbol2) +
                                        numeral(tempTotal).format("0,0.00")
                                        : "0.00";
                                    row.appendChild(totalCol);

                                    fakturXC_Detail.appendChild(row);

                                    totalGrand += numeral(tempTotal).value();

                                    var additionalRow =
                                        document.createElement("div");
                                    additionalRow.classList.add("row");

                                    var mantap = document.createElement("div");
                                    mantap.classList.add(
                                        "col-sm-1",
                                        "text-right"
                                    );
                                    additionalRow.appendChild(mantap);

                                    var additionalCoaCol =
                                        document.createElement("div");
                                    additionalCoaCol.classList.add(
                                        "col-sm-1",
                                        "text-right"
                                    );
                                    additionalCoaCol.textContent = "P O :";
                                    additionalRow.appendChild(additionalCoaCol);

                                    var additionalAccountCol =
                                        document.createElement("div");
                                    additionalAccountCol.classList.add(
                                        "col-sm-10",
                                        "text-left"
                                    );
                                    additionalAccountCol.textContent =
                                        item.NO_PO
                                            ? decodeHtmlEntities(item.NO_PO)
                                            : "";
                                    additionalRow.appendChild(
                                        additionalAccountCol
                                    );

                                    fakturXC_Detail.appendChild(additionalRow);
                                });

                                fakturXC_SymbolGrand.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                fakturXC_SymbolUM.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                fakturXC_SymbolDPP.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                fakturXC_SymbolPajak.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                fakturXC_SymbolTerbayar.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);

                                totalGrand =
                                    numeral(totalGrand).value() +
                                    numeral(
                                        fakturXC_Dexlite.textContent
                                    ).value() +
                                    numeral(
                                        fakturXC_Demurrage.textContent
                                    ).value();
                                fakturXC_Grand.textContent =
                                    numeral(totalGrand).format("0,0.00");

                                fakturXC_UM.textContent = result[0].Nilai_UM
                                    ? numeral(result[0].Nilai_UM).format(
                                        "0,0.00"
                                    )
                                    : "0.00";

                                let dpp =
                                    numeral(
                                        fakturXC_Grand.textContent
                                    ).value() -
                                    numeral(fakturXC_UM.textContent).value();
                                if (duaDigitTahun > 24) {
                                    fakturXC_DPP.textContent = numeral(
                                        (dpp * 11) / 12
                                    ).format("0,0.00");
                                } else {
                                    fakturXC_DPP.textContent =
                                        numeral(dpp).format("0,0.00");
                                }

                                let pajak =
                                    (Math.round(numeral(dpp).value()) *
                                        numeral(result[0].PersenPPN).value()) /
                                    100;
                                fakturXC_Pajak.textContent =
                                    numeral(pajak).format("0,0.00");

                                let terbayar =
                                    numeral(dpp).value() +
                                    numeral(pajak).value();
                                fakturXC_Terbayar.textContent =
                                    numeral(terbayar).format("0,0.00");

                                fakturXC_Terbilang.textContent =
                                    decodeHtmlEntities(result[0].Terbilang);

                                fakturXC_SyaratBayar.innerHTML =
                                    "Syarat Pembayaran: &emsp;&emsp;" +
                                    decodeHtmlEntities(result[0].SyaratBayar) +
                                    " Hari";

                                fakturXC_TglBln.textContent =
                                    tanggal + " " + bulan;
                                fakturXC_Thn.textContent = duaDigitTahun;
                                if (duaDigitTahun > 24) {
                                    fakturXC_PersenPPN.innerHTML =
                                        "<strong>12%</strong>";
                                } else {
                                    fakturXC_PersenPPN.innerHTML =
                                        "<strong>11%</strong>";
                                }

                                let syaratBayar = result[0].SyaratBayar;
                                let tglTerimaBarang =
                                    result[0].Tgl_Terima_Barang;
                                let syaratBayarNumber = Number(syaratBayar);
                                let date3 = new Date(tglTerimaBarang);
                                let resultDate = new Date(date3);
                                resultDate.setDate(
                                    date3.getDate() + syaratBayarNumber
                                );
                                fakturXC_Tempo.innerHTML =
                                    "Jatuh Tempo: &emsp;&emsp; " +
                                    formatDateToMMDDYYYY(resultDate);

                                if (sFormula0.length > 255) {
                                    fakturXC_SuratJalan.innerHTML =
                                        "Surat Jalan: &emsp;&emsp; " +
                                        sFormula0.slice(0, 252);
                                    fakturXC_SJ.textContent =
                                        sFormula0.slice(252);
                                } else {
                                    fakturXC_SuratJalan.innerHTML =
                                        "Surat Jalan: &emsp;&emsp; " +
                                        sFormula0;
                                    fakturXC_SJ.textContent = "";
                                }

                                printPreview("fakturXC");
                            } else {
                                const elements = [
                                    "fakturXC_IdPenagihan",
                                    "fakturXC_AreaPPNThnIdFakturPajak",
                                    "fakturXC_NamaNPWP",
                                    "fakturXC_AlamatNPWP",
                                    "fakturXC_NPWP",
                                    "fakturXC_NamaKelompokUtama",
                                    "fakturXC_Grand",
                                    "fakturXC_SymbolGrand",
                                    "fakturXC_UM",
                                    "fakturXC_SymbolUM",
                                    "fakturXC_DPP",
                                    "fakturXC_SymbolDPP",
                                    "fakturXC_Pajak",
                                    "fakturXC_SymbolPajak",
                                    "fakturXC_Terbilang",
                                    "fakturXC_Terbayar",
                                    "fakturXC_SymbolTerbayar",
                                    "fakturXC_SyaratBayar",
                                    "fakturXC_TglBln",
                                    "fakturXC_Thn",
                                    "fakturXC_PersenPPN",
                                    "fakturXC_Tempo",
                                    "fakturXC_SuratJalan",
                                    "fakturXC_SJ",
                                ];

                                elements.forEach((id) => {
                                    const element = document.getElementById(id);
                                    if (element) {
                                        element.textContent = ""; // Set the value to empty string
                                    }
                                });

                                printPreview("fakturXC");
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                } else {
                    //#region Faktur OMYA
                    if (
                        result[0].NamaNPWP == "PT. OMYA INDONESIA" ||
                        bankSelect.value == "7" || formatSelect.value == "2"
                    ) {
                        // print faktur3
                        var faktur_beneficiary3 = document.getElementById(
                            "faktur_beneficiary3"
                        );
                        faktur_beneficiary3.style.visibility = "hidden";
                        var faktur_applicant3 =
                            document.getElementById("faktur_applicant3");
                        faktur_applicant3.style.visibility = "hidden";
                        var faktur_emptyBag3 =
                            document.getElementById("faktur_emptyBag3");
                        faktur_emptyBag3.style.visibility = "hidden";

                        var faktur_IdPenagihan3 = document.getElementById(
                            "faktur_IdPenagihan3"
                        );
                        faktur_IdPenagihan3.style.fontWeight = "bold";
                        // var faktur_AreaPPNThnIdFakturPajak =
                        //     document.getElementById(
                        //         "faktur_AreaPPNThnIdFakturPajak"
                        //     );
                        // faktur_AreaPPNThnIdFakturPajak.style.fontWeight = "bold";
                        var faktur_NamaNPWP3 =
                            document.getElementById("faktur_NamaNPWP3");
                        faktur_NamaNPWP3.style.fontWeight = "bold";
                        var faktur_AlamatNPWP3 =
                            document.getElementById("faktur_AlamatNPWP3");
                        var faktur_NPWP3 =
                            document.getElementById("faktur_NPWP3");
                        var faktur_NamaKelompokUtama3 = document.getElementById(
                            "faktur_NamaKelompokUtama3"
                        );
                        var faktur_SymbolGrand3 = document.getElementById(
                            "faktur_SymbolGrand3"
                        );
                        var faktur_Grand3 =
                            document.getElementById("faktur_Grand3");
                        var faktur_SymbolUM3 =
                            document.getElementById("faktur_SymbolUM3");
                        var faktur_UM3 = document.getElementById("faktur_UM3");
                        var faktur_SymbolDPP3 =
                            document.getElementById("faktur_SymbolDPP3");
                        var faktur_DPP3 =
                            document.getElementById("faktur_DPP3");
                        var faktur_SymbolPajak3 = document.getElementById(
                            "faktur_SymbolPajak3"
                        );
                        var faktur_SymbolPPH3 = document.getElementById(
                            "faktur_SymbolPPH3"
                        );
                        var faktur_Pajak3 =
                            document.getElementById("faktur_Pajak3");
                        var faktur_PPH3 =
                            document.getElementById("faktur_PPH3");
                        var faktur_Terbilang3 =
                            document.getElementById("faktur_Terbilang3");
                        var faktur_SymbolTerbayar3 = document.getElementById(
                            "faktur_SymbolTerbayar3"
                        );
                        var faktur_Terbayar3 =
                            document.getElementById("faktur_Terbayar3");
                        var faktur_SyaratBayar3 = document.getElementById(
                            "faktur_SyaratBayar3"
                        );
                        var faktur_TglBln3 =
                            document.getElementById("faktur_TglBln3");
                        var faktur_Thn3 =
                            document.getElementById("faktur_Thn3");
                        var faktur_PersenPPN3 =
                            document.getElementById("faktur_PersenPPN3");
                        var faktur_PersenPPH3 =
                            document.getElementById("faktur_PersenPPH3");
                        var faktur_Tempo3 =
                            document.getElementById("faktur_Tempo3");
                        var faktur_SuratJalan3 =
                            document.getElementById("faktur_SuratJalan3");
                        var faktur_SJ3 = document.getElementById("faktur_SJ3");
                        var bankBayar3 = document.getElementById("bankBayar3");
                        var ttdPimpinan3 =
                            document.getElementById("ttdPimpinan3");

                        if (result.length === 0) {
                            const elements = [
                                "faktur_IdPenagihan3",
                                // "faktur_AreaPPNThnIdFakturPajak3",
                                "faktur_NamaNPWP3",
                                "faktur_AlamatNPWP3",
                                "faktur_NPWP3",
                                "faktur_NamaKelompokUtama3",
                                "faktur_SymbolGrand3",
                                "faktur_Grand3",
                                "faktur_SymbolUM3",
                                "faktur_UM3",
                                "faktur_SymbolDPP3",
                                "faktur_DPP3",
                                "faktur_SymbolPajak3",
                                "faktur_Pajak3",
                                "faktur_Terbilang3",
                                "faktur_SymbolTerbayar3",
                                "faktur_Terbayar3",
                                "faktur_SyaratBayar3",
                                "faktur_TglBln3",
                                "faktur_Thn3",
                                "faktur_PersenPPN3",
                                "faktur_Tempo3",
                                "faktur_SuratJalan3",
                                "faktur_SJ3",
                                "bankBayar3",
                                "ttdPimpinan3",
                            ];

                            elements.forEach((id) => {
                                const element = document.getElementById(id);
                                if (element) {
                                    element.textContent = ""; // Set the value to empty string
                                }
                            });

                            // printPreview("faktur3");
                        } else {

                            if (result[0].PersenPPH == null) {
                                if (bankSelect.value == "1") {
                                    bankBayar3.innerHTML =
                                        "Pembayaran mohon ditransfer ke:" +
                                        "<br>" +
                                        "BCA Cab. Galaxy - Surabaya" +
                                        "<br>" +
                                        "a/c. 788 010 1999 ( IDR )" +
                                        "<br>" +
                                        "a/n. PT. Kerta Rajasa Raya";
                                } else if (bankSelect.value == "2") {
                                    bankBayar3.innerHTML =
                                        "Pembayaran melalui SCF ke Rekening:" +
                                        "<br>" +
                                        "BNI  Cabang Tropodo Sidoarjo" +
                                        "<br>" +
                                        "a/c. 6388888829 ( IDR )" +
                                        "<br>" +
                                        "a/n. PT. Kerta Rajasa Raya";
                                } else if (bankSelect.value == "3") {
                                    bankBayar3.innerHTML =
                                        "Pembayaran melalui SCF ke Rekening:" +
                                        "<br>" +
                                        "Bank Mandiri  KCP Padang Indarung" +
                                        "<br>" +
                                        "a/c. 111 0007609759 ( IDR )" +
                                        "<br>" +
                                        "a/n. PT. Kerta Rajasa Raya";
                                } else if (bankSelect.value == "4") {
                                    bankBayar3.innerHTML =
                                        "Pembayaran mohon ditransfer ke:" +
                                        "<br>" +
                                        "Bank Mandiri  KCP Pondok Chandra Sidoarjo" +
                                        "<br>" +
                                        "a/c. 14200 5555 0007 ( IDR )" +
                                        "<br>" +
                                        "a/n. PT. Kerta Rajasa Raya";
                                } else if (bankSelect.value == "5") {
                                    bankBayar3.innerHTML =
                                        "Pembayaran mohon ditransfer ke:" +
                                        "<br>" +
                                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                                        "<br>" +
                                        "a/c. 5578 0000 9333 ( IDR )" +
                                        "<br>" +
                                        "a/n. PT. Kerta Rajasa Raya";
                                } else if (bankSelect.value == "6") {
                                    faktur_beneficiary3.style.visibility =
                                        "visible";
                                    faktur_applicant3.style.visibility = "visible";
                                    faktur_emptyBag3.style.visibility = "visible";
                                    bankBayar3.innerHTML =
                                        "TRADE TERM: " +
                                        tradeTerm +
                                        "<br>" +
                                        "Documentary Credit Number: " +
                                        dcn +
                                        "<br>" +
                                        "Date of Issue: " +
                                        doi +
                                        "<br>" +
                                        "&nbsp;";
                                } else if (bankSelect.value == "7") {
                                    bankBayar3.innerHTML =
                                        "Pembayaran mohon ditransfer ke:" +
                                        "<br>" +
                                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                                        "<br>" +
                                        "a/c. 5578 0000 9333 ( IDR )" +
                                        "<br>" +
                                        "a/n. PT. Kerta Rajasa Raya";
                                } else {
                                    bankBayar3.innerHTML =
                                        "&nbsp;" +
                                        "<br>" +
                                        "&nbsp;" +
                                        "<br>" +
                                        "&nbsp;" +
                                        "<br>" +
                                        "&nbsp;";
                                }
                            } else {
                                if (bankSelect.value == "1") {
                                    bankBayar3.innerHTML =
                                        `<div style="
                                    display: inline-block;
                                    border: 2px solid black;
                                    padding: 2px 5px;
                                    font-weight: bold;
                                    background-color: #f2f2f2;
                                ">
                                    MOHON DITERBITKAN BUKTI POTONG
                                </div>
                                <br>
                                ` +
                                        "Pembayaran mohon ditransfer ke:" +
                                        "<br>" +
                                        "BCA Cab. Galaxy - Surabaya" +
                                        "<br>" +
                                        "a/c. 788 010 1999 ( IDR )" +
                                        "<br>" +
                                        "a/n. PT. Kerta Rajasa Raya";
                                } else if (bankSelect.value == "2") {
                                    bankBayar3.innerHTML =
                                        `<div style="
                                    display: inline-block;
                                    border: 2px solid black;
                                    padding: 4px 10px;
                                    font-weight: bold;
                                    background-color: #f2f2f2;
                                ">
                                    MOHON DITERBITKAN BUKTI POTONG
                                </div>
                                <br>
                                ` +
                                        "Pembayaran melalui SCF ke Rekening:" +
                                        "<br>" +
                                        "BNI  Cabang Tropodo Sidoarjo" +
                                        "<br>" +
                                        "a/c. 6388888829 ( IDR )" +
                                        "<br>" +
                                        "a/n. PT. Kerta Rajasa Raya";
                                } else if (bankSelect.value == "3") {
                                    bankBayar3.innerHTML =
                                        `<div style="
                                    display: inline-block;
                                    border: 2px solid black;
                                    padding: 4px 10px;
                                    font-weight: bold;
                                    background-color: #f2f2f2;
                                ">
                                    MOHON DITERBITKAN BUKTI POTONG
                                </div>
                                <br>
                                ` +
                                        "Pembayaran melalui SCF ke Rekening:" +
                                        "<br>" +
                                        "Bank Mandiri  KCP Padang Indarung" +
                                        "<br>" +
                                        "a/c. 111 0007609759 ( IDR )" +
                                        "<br>" +
                                        "a/n. PT. Kerta Rajasa Raya";
                                } else if (bankSelect.value == "4") {
                                    bankBayar3.innerHTML =
                                        `<div style="
                                    display: inline-block;
                                    border: 2px solid black;
                                    padding: 4px 10px;
                                    font-weight: bold;
                                    background-color: #f2f2f2;
                                ">
                                    MOHON DITERBITKAN BUKTI POTONG
                                </div>
                                <br>
                                ` +
                                        "Pembayaran mohon ditransfer ke:" +
                                        "<br>" +
                                        "Bank Mandiri  KCP Pondok Chandra Sidoarjo" +
                                        "<br>" +
                                        "a/c. 14200 5555 0007 ( IDR )" +
                                        "<br>" +
                                        "a/n. PT. Kerta Rajasa Raya";
                                } else if (bankSelect.value == "5") {
                                    bankBayar3.innerHTML =
                                        `<div style="
                                    display: inline-block;
                                    border: 2px solid black;
                                    padding: 4px 10px;
                                    font-weight: bold;
                                    background-color: #f2f2f2;
                                ">
                                    MOHON DITERBITKAN BUKTI POTONG
                                </div>
                                <br>
                                ` +
                                        "Pembayaran mohon ditransfer ke:" +
                                        "<br>" +
                                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                                        "<br>" +
                                        "a/c. 5578 0000 9333 ( IDR )" +
                                        "<br>" +
                                        "a/n. PT. Kerta Rajasa Raya";
                                } else if (bankSelect.value == "6") {
                                    faktur_beneficiary3.style.visibility =
                                        "visible";
                                    faktur_applicant3.style.visibility = "visible";
                                    faktur_emptyBag3.style.visibility = "visible";
                                    bankBayar3.innerHTML =
                                        `<div style="
                                    display: inline-block;
                                    border: 2px solid black;
                                    padding: 4px 10px;
                                    font-weight: bold;
                                    background-color: #f2f2f2;
                                ">
                                    MOHON DITERBITKAN BUKTI POTONG
                                </div>
                                <br>
                                ` +
                                        "TRADE TERM: " +
                                        tradeTerm +
                                        "<br>" +
                                        "Documentary Credit Number: " +
                                        dcn +
                                        "<br>" +
                                        "Date of Issue: " +
                                        doi +
                                        "<br>" +
                                        "&nbsp;";
                                } else if (bankSelect.value == "7") {
                                    bankBayar3.innerHTML =
                                        `<div style="
                                    display: inline-block;
                                    border: 2px solid black;
                                    padding: 4px 10px;
                                    font-weight: bold;
                                    background-color: #f2f2f2;
                                ">
                                    MOHON DITERBITKAN BUKTI POTONG
                                </div>
                                <br>
                                ` +
                                        "Pembayaran mohon ditransfer ke:" +
                                        "<br>" +
                                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                                        "<br>" +
                                        "a/c. 5578 0000 9333 ( IDR )" +
                                        "<br>" +
                                        "a/n. PT. Kerta Rajasa Raya";
                                } else {
                                    bankBayar3.innerHTML =
                                        `<div style="
                                    display: inline-block;
                                    border: 2px solid black;
                                    padding: 4px 10px;
                                    font-weight: bold;
                                    background-color: #f2f2f2;
                                ">
                                    MOHON DITERBITKAN BUKTI POTONG
                                </div>
                                <br>
                                ` +
                                        "&nbsp;" +
                                        "<br>" +
                                        "&nbsp;" +
                                        "<br>" +
                                        "&nbsp;" +
                                        "<br>" +
                                        "&nbsp;";
                                }
                            }

                            if (ttdSelect.value == "1") {
                                ttdPimpinan3.textContent = "TJAHYO SANTOSO";
                            } else if (ttdSelect.value == "2") {
                                ttdPimpinan3.textContent = "RUDY SANTOSO";
                            } else if (ttdSelect.value == "3") {
                                ttdPimpinan3.textContent = "YUDI SANTOSO";
                            }

                            faktur_IdPenagihan3.textContent =
                                decodeHtmlEntities(result[0].Id_Penagihan);

                            if (bankSelect.value == "7") {
                                var date2 = isNaN(new Date(editDate).getTime())
                                    ? new Date(result[0].Tgl_Penagihan)
                                    : new Date(editDate);
                            } else {
                                var date2 = new Date(result[0].Tgl_Penagihan);
                            }
                            // var date2 = new Date(result[0].Tgl_Penagihan);

                            // var namaBulan = [
                            //     "January",
                            //     "February",
                            //     "March",
                            //     "April",
                            //     "May",
                            //     "June",
                            //     "July",
                            //     "August",
                            //     "September",
                            //     "October",
                            //     "November",
                            //     "December",
                            // ];

                            var namaBulan = [
                                "01",
                                "02",
                                "03",
                                "04",
                                "05",
                                "06",
                                "07",
                                "08",
                                "09",
                                "10",
                                "11",
                                "12",
                            ];

                            var tanggal = String(date2.getDate()).padStart(2, '0');
                            var bulan = namaBulan[date2.getMonth()];
                            var tahunLengkap = date2.getFullYear();
                            var duaDigitTahun = tahunLengkap
                                .toString()
                                .slice(-2);
                            // faktur_AreaPPNThnIdFakturPajak.textContent =
                            //     decodeHtmlEntities(result[0].KdArea_Ppn) +
                            //     " . 012 - " +
                            //     duaDigitTahun +
                            //     ". " +
                            //     decodeHtmlEntities(result[0].IdFakturPajak);

                            faktur_NamaNPWP3.textContent = decodeHtmlEntities(
                                result[0].NamaNPWP
                            );
                            faktur_AlamatNPWP3.textContent = decodeHtmlEntities(
                                result[0].AlamatNPWP
                            );

                            let npwp = result[0].NPWP;
                            // let formattedNPWP =
                            //     npwp.slice(0, 2) +
                            //     " . " +
                            //     npwp.slice(2, 5) +
                            //     " . " +
                            //     npwp.slice(5, 8) +
                            //     " . " +
                            //     npwp.slice(8, 9) +
                            //     " - " +
                            //     npwp.slice(9, 12) +
                            //     " . " +
                            //     npwp.slice(12, 15);
                            faktur_NPWP3.textContent = npwp;

                            // faktur_NamaKelompokUtama2.textContent =
                            //     decodeHtmlEntities(result[0].NamaKelompokUtama);

                            if (bankSelect.value == "6") {
                                faktur_NamaKelompokUtama3.innerHTML = "&nbsp;";
                            } else {
                                faktur_NamaKelompokUtama3.textContent =
                                    decodeHtmlEntities(
                                        result[0].NamaKelompokUtama
                                    );
                            }

                            let totalGrand = 0;
                            let count = 0;
                            var faktur_Detail3 =
                                document.getElementById("faktur_Detail3");

                            faktur_Detail3.innerHTML = "";
                            console.log(result.length > 4);

                            result.forEach(function (item, index) {
                                var row = document.createElement("div");
                                row.classList.add("row", "small-font");
                                count += 1;

                                // Tampilkan item kelima dan seterusnya
                                if (index >= 4) {
                                    row.style.display = "none"; // Sembunyikan item sebelum yang kelima
                                }

                                var coaCol = document.createElement("div");
                                coaCol.classList.add(
                                    "col-sm-1",
                                    "text-left",
                                    "small-font",
                                    "description-left"
                                );
                                coaCol.textContent = count;
                                row.appendChild(coaCol);

                                var accountCol = document.createElement("div");
                                accountCol.classList.add(
                                    "col-sm-5",
                                    "text-left",
                                    "small-font",
                                    "description-left"
                                );
                                accountCol.textContent = item.NamaType
                                    ? decodeHtmlEntities(item.NamaType)
                                    : "";
                                row.appendChild(accountCol);

                                var descriptionCol =
                                    document.createElement("div");
                                descriptionCol.classList.add(
                                    "col-sm-2",
                                    "text-right",
                                    "small-normal"
                                );
                                descriptionCol.textContent = item.Jml
                                    ? numeral(item.Jml).format("0,0.00") +
                                    item.Satuan
                                    : "";
                                row.appendChild(descriptionCol);

                                var amountCol = document.createElement("div");
                                amountCol.classList.add(
                                    "col-sm-2",
                                    "text-right",
                                    "small-normal"
                                );

                                if (bankSelect.value == "6") {
                                    amountCol.textContent = item.HargaSatuan
                                        ? "IDR " +
                                        numeral(item.HargaSatuan).format(
                                            "0,0.00"
                                        )
                                        : "0.00";
                                } else {
                                    amountCol.textContent = item.HargaSatuan
                                        ? decodeHtmlEntities(item.Symbol2) +
                                        numeral(item.HargaSatuan).format(
                                            "0,0.00"
                                        )
                                        : "0.00";
                                }
                                row.appendChild(amountCol);

                                var totalCol = document.createElement("div");
                                totalCol.classList.add(
                                    "col-sm-3",
                                    "text-center",
                                    "small-normal",
                                    "description-right"
                                );
                                let tempTotal =
                                    numeral(item.Jml).value() *
                                    numeral(item.HargaSatuan).value();

                                if (bankSelect.value == "6") {
                                    totalCol.textContent = item.HargaSatuan
                                        ? "IDR " +
                                        numeral(tempTotal).format("0,0.00")
                                        : "0.00";
                                } else {
                                    totalCol.textContent = item.HargaSatuan
                                        ? decodeHtmlEntities(item.Symbol2) +
                                        numeral(tempTotal).format("0,0.00")
                                        : "0.00";
                                }

                                row.appendChild(totalCol);
                                faktur_Detail3.appendChild(row);

                                totalGrand += numeral(tempTotal).value();

                                var additionalRow =
                                    document.createElement("div");
                                additionalRow.classList.add(
                                    "row",
                                    "small-font"
                                );

                                if (index >= 4) {
                                    additionalRow.style.display = "none";
                                }

                                var mantap = document.createElement("div");
                                mantap.classList.add(
                                    "col-sm-1",
                                    "text-left",
                                    "small-font",
                                    "description-left"
                                );
                                additionalRow.appendChild(mantap);

                                var additionalCoaCol =
                                    document.createElement("div");
                                additionalCoaCol.classList.add(
                                    "col-sm-5",
                                    "text-left",
                                    "small-font",
                                    "description-left"
                                );
                                // additionalCoaCol.textContent = item.NO_PO
                                //     ? "PO : " + decodeHtmlEntities(item.NO_PO)
                                //     : "";
                                // additionalRow.appendChild(additionalCoaCol);

                                if (bankSelect.value == "6") {
                                    additionalCoaCol.innerHTML = item.NO_PO
                                        ? "PO : " +
                                        decodeHtmlEntities(item.NO_PO) +
                                        "<br>" +
                                        "Jumlah Empty Bag yang dikirim: " +
                                        decodeHtmlEntities(item.Jml) +
                                        decodeHtmlEntities(item.Satuan)
                                        : "";
                                    additionalRow.appendChild(additionalCoaCol);
                                } else {
                                    additionalCoaCol.textContent = item.NO_PO
                                        ? "PO : " +
                                        decodeHtmlEntities(item.NO_PO)
                                        : "";
                                    additionalRow.appendChild(additionalCoaCol);
                                }

                                faktur_Detail3.appendChild(additionalRow);
                            });

                            if (bankSelect.value == "6") {
                                faktur_SymbolGrand3.textContent = "IDR";
                                faktur_SymbolUM3.textContent = "IDR";
                                faktur_SymbolDPP3.textContent = "IDR";
                                faktur_SymbolPajak3.textContent = "IDR";
                                faktur_SymbolTerbayar3.textContent = "IDR";
                                faktur_SymbolPPH3.textContent = "-IDR";
                            } else {
                                faktur_SymbolGrand3.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolUM3.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolDPP3.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolPajak3.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolTerbayar3.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolPPH3.textContent =
                                    (result[0].PersenPPH != null ? "-" : "") +
                                    decodeHtmlEntities(result[0].Symbol2);
                            }

                            faktur_Grand3.textContent =
                                numeral(totalGrand).format("0,0.00");

                            // if (
                            //     result[0].NamaNPWP ==
                            //     "PT. BLOOM TRADING INDONESIA"
                            // ) {
                            //     faktur_UM2.textContent = "";
                            // } else {
                            //     faktur_UM2.textContent = result[0].Nilai_UM
                            //         ? numeral(
                            //               (result[0].Nilai_UM * 11) / 12
                            //           ).format("0,0.00")
                            //         : "0.00";
                            // }

                            faktur_UM3.textContent = result[0].Nilai_UM
                                ? numeral(result[0].Nilai_UM).format("0,0.00")
                                : "0.00";
                            // result[0].Nilai_UM
                            //     ? numeral(
                            //           (result[0].Nilai_UM * 11) / 12
                            //       ).format("0,0.00")
                            //     : "0.00";

                            let dpp =
                                numeral(faktur_Grand3.textContent).value() -
                                numeral(result[0].Nilai_UM).value();
                            if (
                                result[0].NamaNPWP ==
                                "PT. BLOOM TRADING INDONESIA"
                            ) {
                                faktur_DPP3.textContent = "";
                            } else if (duaDigitTahun > 24) {
                                faktur_DPP3.textContent = numeral(
                                    (dpp * 11) / 12
                                ).format("0,0.00");
                            } else {
                                faktur_DPP3.textContent =
                                    numeral(dpp).format("0,0.00");
                            }
                            // if (duaDigitTahun > 24) {
                            //     faktur_DPP2.textContent = numeral(
                            //         (dpp * 11) / 12
                            //     ).format("0,0.00");
                            // } else {
                            //     faktur_DPP2.textContent =
                            //         numeral(dpp).format("0,0.00");
                            // }
                            let pph = (numeral(dpp).value() * numeral(result[0].PersenPPH).value()) / 100;
                            faktur_PPH3.textContent = numeral(pph).format("0,0.00");
                            let pajak =
                                (Math.round(numeral(dpp).value()) *
                                    numeral(result[0].PersenPPN).value()) /
                                100;
                            console.log(numeral(result[0].PersenPPN).value());

                            if (duaDigitTahun > 24) {
                                faktur_Pajak3.textContent = numeral(
                                    ((dpp * 11) / 12) * 0.12
                                ).format("0,0.00");
                            } else {
                                faktur_Pajak3.textContent =
                                    numeral(pajak).format("0,0.00");
                            }

                            if (duaDigitTahun > 24) {
                                let terbayar =
                                    numeral(dpp).value() +
                                    numeral(faktur_Pajak3.textContent).value() - numeral(pph).value();
                                faktur_Terbayar3.textContent =
                                    numeral(terbayar).format("0,0.00");
                                TTerbilang = convertNumberToWordsRupiah(
                                    numeral(
                                        faktur_Terbayar3.textContent
                                    ).value()
                                );
                                faktur_Terbilang3.innerHTML = decodeHtmlEntities(TTerbilang);
                                // faktur_Terbilang3.innerHTML =
                                //     "&emsp;" + decodeHtmlEntities(TTerbilang);
                            } else {
                                let terbayar =
                                    numeral(dpp).value() +
                                    numeral(pajak).value();
                                faktur_Terbayar3.textContent =
                                    numeral(terbayar).format("0,0.00");
                                faktur_Terbilang3.textContent =
                                    decodeHtmlEntities(result[0].Terbilang);
                            }

                            if (bankSelect.value == "7") {
                                faktur_SyaratBayar3.innerHTML = "&nbsp;";
                            } else {
                                faktur_SyaratBayar3.innerHTML =
                                    "Syarat Pembayaran: &emsp;" +
                                    decodeHtmlEntities(result[0].SyaratBayar) +
                                    " Hari";
                            }

                            faktur_TglBln3.textContent = tanggal + "-" + bulan + "-20" + duaDigitTahun;
                            // faktur_Thn3.textContent = " / 20" + duaDigitTahun;
                            if (
                                result[0].NamaNPWP ==
                                "PT. BLOOM TRADING INDONESIA"
                            ) {
                                faktur_PersenPPN3.innerHTML =
                                    "<strong></strong>";
                            } else if (duaDigitTahun > 24) {
                                faktur_PersenPPN3.innerHTML =
                                    "<strong>12%</strong>";
                            } else {
                                faktur_PersenPPN3.innerHTML =
                                    "<strong>11%</strong>";
                            }

                            let persen = result[0].PersenPPH;
                            if (persen == null) {
                                faktur_PersenPPH3.innerHTML = "<strong></strong>";
                            } else {
                                faktur_PersenPPH3.innerHTML = "<strong>" + persen + "%</strong>";
                            }

                            let syaratBayar = result[0].SyaratBayar;
                            let tglTerimaBarang = result[0].Tgl_Terima_Barang;
                            let syaratBayarNumber = Number(syaratBayar);
                            let date3 = new Date(tglTerimaBarang);
                            let resultDate = new Date(date3);
                            resultDate.setDate(
                                date3.getDate() + syaratBayarNumber
                            );
                            if (bankSelect.value == "7") {
                                faktur_Tempo3.innerHTML = "&nbsp;";
                                faktur_SuratJalan3.innerHTML = "&nbsp;";
                                faktur_SJ3.innerHTML = "&nbsp;";
                            } else {
                                faktur_Tempo3.innerHTML =
                                    "Jatuh Tempo: &emsp;" +
                                    formatDateToMMDDYYYY(resultDate);

                                if (sFormula0.length > 255) {
                                    faktur_SuratJalan3.innerHTML =
                                        "Surat Jalan: &emsp;" +
                                        sFormula0.slice(0, 252);
                                    faktur_SJ3.textContent =
                                        sFormula0.slice(252);
                                } else {
                                    faktur_SuratJalan3.innerHTML =
                                        "Surat Jalan: &emsp;" + sFormula0;
                                    faktur_SJ3.textContent = "";
                                }
                            }
                            // faktur_Tempo2.innerHTML =
                            //     "Jatuh Tempo: &emsp;&emsp; " +
                            //     formatDateToMMDDYYYY(resultDate);

                            // if (sFormula0.length > 255) {
                            //     faktur_SuratJalan2.innerHTML =
                            //         "Surat Jalan: &emsp;&emsp; " +
                            //         sFormula0.slice(0, 252);
                            //     faktur_SJ2.textContent = sFormula0.slice(252);
                            // } else {
                            //     faktur_SuratJalan2.innerHTML =
                            //         "Surat Jalan: &emsp;&emsp; " + sFormula0;
                            //     faktur_SJ2.textContent = "";
                            // }

                            printPreview("faktur3");
                        }
                    } else {
                        //#region Faktur
                        // print faktur
                        var faktur_beneficiary =
                            document.getElementById("faktur_beneficiary");
                        faktur_beneficiary.style.visibility = "hidden";
                        var faktur_applicant =
                            document.getElementById("faktur_applicant");
                        faktur_applicant.style.visibility = "hidden";
                        var faktur_emptyBag =
                            document.getElementById("faktur_emptyBag");
                        faktur_emptyBag.style.visibility = "hidden";

                        var faktur_IdPenagihan =
                            document.getElementById("faktur_IdPenagihan");
                        faktur_IdPenagihan.style.fontWeight = "bold";
                        // var faktur_AreaPPNThnIdFakturPajak =
                        //     document.getElementById(
                        //         "faktur_AreaPPNThnIdFakturPajak"
                        //     );
                        // faktur_AreaPPNThnIdFakturPajak.style.fontWeight = "bold";
                        var faktur_NamaNPWP =
                            document.getElementById("faktur_NamaNPWP");
                        faktur_NamaNPWP.style.fontWeight = "bold";
                        var faktur_AlamatNPWP =
                            document.getElementById("faktur_AlamatNPWP");
                        var faktur_NPWP =
                            document.getElementById("faktur_NPWP");
                        var faktur_NamaKelompokUtama = document.getElementById(
                            "faktur_NamaKelompokUtama"
                        );
                        var faktur_SymbolGrand =
                            document.getElementById("faktur_SymbolGrand");
                        var faktur_Grand =
                            document.getElementById("faktur_Grand");
                        var faktur_SymbolUM =
                            document.getElementById("faktur_SymbolUM");
                        var faktur_UM = document.getElementById("faktur_UM");
                        var faktur_SymbolDPP =
                            document.getElementById("faktur_SymbolDPP");
                        var faktur_DPP = document.getElementById("faktur_DPP");
                        var faktur_SymbolPajak =
                            document.getElementById("faktur_SymbolPajak");
                        var faktur_Pajak =
                            document.getElementById("faktur_Pajak");
                        var faktur_Terbilang =
                            document.getElementById("faktur_Terbilang");
                        var faktur_SymbolTerbayar = document.getElementById(
                            "faktur_SymbolTerbayar"
                        );
                        var faktur_Terbayar =
                            document.getElementById("faktur_Terbayar");
                        var faktur_SyaratBayar =
                            document.getElementById("faktur_SyaratBayar");
                        var faktur_TglBln =
                            document.getElementById("faktur_TglBln");
                        var faktur_Thn = document.getElementById("faktur_Thn");
                        var faktur_PersenPPN =
                            document.getElementById("faktur_PersenPPN");
                        var faktur_Tempo =
                            document.getElementById("faktur_Tempo");
                        var faktur_SuratJalan =
                            document.getElementById("faktur_SuratJalan");
                        var faktur_SJ = document.getElementById("faktur_SJ");
                        var bankBayar = document.getElementById("bankBayar");
                        var ttdPimpinan =
                            document.getElementById("ttdPimpinan");

                        if (result.length === 0) {
                            const elements = [
                                "faktur_IdPenagihan",
                                // "faktur_AreaPPNThnIdFakturPajak",
                                "faktur_NamaNPWP",
                                "faktur_AlamatNPWP",
                                "faktur_NPWP",
                                "faktur_NamaKelompokUtama",
                                "faktur_SymbolGrand",
                                "faktur_Grand",
                                "faktur_SymbolUM",
                                "faktur_UM",
                                "faktur_SymbolDPP",
                                "faktur_DPP",
                                "faktur_SymbolPajak",
                                "faktur_Pajak",
                                "faktur_Terbilang",
                                "faktur_SymbolTerbayar",
                                "faktur_Terbayar",
                                "faktur_SyaratBayar",
                                "faktur_TglBln",
                                "faktur_Thn",
                                "faktur_PersenPPN",
                                "faktur_Tempo",
                                "faktur_SuratJalan",
                                "faktur_SJ",
                                "bankBayar",
                                "ttdPimpinan",
                            ];

                            elements.forEach((id) => {
                                const element = document.getElementById(id);
                                if (element) {
                                    element.textContent = ""; // Set the value to empty string
                                }
                            });

                            printPreview("faktur");
                        } else {
                            console.log(result);

                            if (bankSelect.value == "1") {
                                bankBayar.innerHTML =
                                    "Pembayaran mohon ditransfer ke:" +
                                    "<br>" +
                                    "BCA Cab. Galaxy - Surabaya" +
                                    "<br>" +
                                    "a/c. 788 010 1999 ( IDR )" +
                                    "<br>" +
                                    "a/n. PT. Kerta Rajasa Raya";
                            } else if (bankSelect.value == "2") {
                                bankBayar.innerHTML =
                                    "Pembayaran melalui SCF ke Rekening:" +
                                    "<br>" +
                                    "BNI  Cabang Tropodo Sidoarjo" +
                                    "<br>" +
                                    "a/c. 6388888829 ( IDR )" +
                                    "<br>" +
                                    "a/n. PT. Kerta Rajasa Raya";
                            } else if (bankSelect.value == "3") {
                                bankBayar.innerHTML =
                                    "Pembayaran melalui SCF ke Rekening:" +
                                    "<br>" +
                                    "Bank Mandiri  KCP Padang Indarung" +
                                    "<br>" +
                                    "a/c. 111 0007609759 ( IDR )" +
                                    "<br>" +
                                    "a/n. PT. Kerta Rajasa Raya";
                            } else if (bankSelect.value == "4") {
                                bankBayar.innerHTML =
                                    "Pembayaran mohon ditransfer ke:" +
                                    "<br>" +
                                    "Bank Mandiri  KCP Pondok Chandra Sidoarjo" +
                                    "<br>" +
                                    "a/c. 14200 5555 0007 ( IDR )" +
                                    "<br>" +
                                    "a/n. PT. Kerta Rajasa Raya";
                            } else if (bankSelect.value == "5") {
                                bankBayar.innerHTML =
                                    "Pembayaran mohon ditransfer ke:" +
                                    "<br>" +
                                    "Bank OCBC Cab. Diponegoro - Surabaya" +
                                    "<br>" +
                                    "a/c. 5578 0000 9333 ( IDR )" +
                                    "<br>" +
                                    "a/n. PT. Kerta Rajasa Raya";
                            } else if (bankSelect.value == "6") {
                                faktur_beneficiary.style.visibility = "visible";
                                faktur_applicant.style.visibility = "visible";
                                faktur_emptyBag.style.visibility = "visible";
                                bankBayar.innerHTML =
                                    "TRADE TERM: " +
                                    tradeTerm +
                                    "<br>" +
                                    "Documentary Credit Number: " +
                                    dcn +
                                    "<br>" +
                                    "Date of Issue: " +
                                    doi +
                                    "<br>" +
                                    "&nbsp;";
                            } else if (bankSelect.value == "7") {
                                bankBayar.innerHTML =
                                    "Pembayaran mohon ditransfer ke:" +
                                    "<br>" +
                                    "Bank OCBC Cab. Diponegoro - Surabaya" +
                                    "<br>" +
                                    "a/c. 5578 0000 9333 ( IDR )" +
                                    "<br>" +
                                    "a/n. PT. Kerta Rajasa Raya";
                            } else {
                                bankBayar.innerHTML =
                                    "&nbsp;" +
                                    "<br>" +
                                    "&nbsp;" +
                                    "<br>" +
                                    "&nbsp;" +
                                    "<br>" +
                                    "&nbsp;";
                            }

                            if (ttdSelect.value == "1") {
                                ttdPimpinan.textContent = "TJAHYO SANTOSO";
                            } else if (ttdSelect.value == "2") {
                                ttdPimpinan.textContent = "RUDY SANTOSO";
                            } else if (ttdSelect.value == "3") {
                                ttdPimpinan.textContent = "YUDI SANTOSO";
                            }

                            faktur_IdPenagihan.textContent = decodeHtmlEntities(
                                result[0].Id_Penagihan
                            );

                            if (bankSelect.value == "7") {
                                var date2 = isNaN(new Date(editDate).getTime())
                                    ? new Date(result[0].Tgl_Penagihan)
                                    : new Date(editDate);
                            } else {
                                var date2 = new Date(result[0].Tgl_Penagihan);
                            }
                            // var date2 = new Date(result[0].Tgl_Penagihan);

                            var namaBulan = [
                                "Januari",
                                "Februari",
                                "Maret",
                                "April",
                                "Mei",
                                "Juni",
                                "Juli",
                                "Agustus",
                                "September",
                                "Oktober",
                                "November",
                                "Desember",
                            ];

                            var tanggal = date2.getDate();
                            var bulan = namaBulan[date2.getMonth()];
                            var tahunLengkap = date2.getFullYear();
                            var duaDigitTahun = tahunLengkap
                                .toString()
                                .slice(-2);
                            // faktur_AreaPPNThnIdFakturPajak.textContent =
                            //     decodeHtmlEntities(result[0].KdArea_Ppn) +
                            //     " . 012 - " +
                            //     duaDigitTahun +
                            //     ". " +
                            //     decodeHtmlEntities(result[0].IdFakturPajak);

                            faktur_NamaNPWP.textContent = decodeHtmlEntities(
                                result[0].NamaNPWP
                            );
                            faktur_AlamatNPWP.textContent = decodeHtmlEntities(
                                result[0].AlamatNPWP
                            );

                            let npwp = result[0].NPWP;
                            // let formattedNPWP =
                            //     npwp.slice(0, 2) +
                            //     " . " +
                            //     npwp.slice(2, 5) +
                            //     " . " +
                            //     npwp.slice(5, 8) +
                            //     " . " +
                            //     npwp.slice(8, 9) +
                            //     " - " +
                            //     npwp.slice(9, 12) +
                            //     " . " +
                            //     npwp.slice(12, 15);
                            faktur_NPWP.textContent = npwp;

                            // faktur_NamaKelompokUtama.textContent =
                            //     decodeHtmlEntities(result[0].NamaKelompokUtama);

                            if (bankSelect.value == "6") {
                                faktur_NamaKelompokUtama.innerHTML = "&nbsp;";
                            } else {
                                faktur_NamaKelompokUtama.textContent =
                                    decodeHtmlEntities(
                                        result[0].NamaKelompokUtama
                                    );
                            }

                            let totalGrand = 0;
                            let count = 0;
                            var faktur_Detail =
                                document.getElementById("faktur_Detail");

                            faktur_Detail.innerHTML = "";
                            console.log(result.length > 4);

                            result.forEach(function (item, index) {
                                var row = document.createElement("div");
                                row.classList.add("row", "small-font");
                                count += 1;

                                // Tampilkan hanya item pertama sampai ketiga
                                if (index >= 5) {
                                    row.style.display = "none"; // Sembunyikan item setelah yang ketiga
                                }

                                var coaCol = document.createElement("div");
                                coaCol.classList.add(
                                    "col-sm-1",
                                    "text-left",
                                    "small-font",
                                    "description-left"
                                );
                                coaCol.textContent = count;
                                row.appendChild(coaCol);

                                var accountCol = document.createElement("div");
                                accountCol.classList.add(
                                    "col-sm-5",
                                    "text-left",
                                    "small-font",
                                    "description-left"
                                );
                                accountCol.textContent = item.NamaType
                                    ? decodeHtmlEntities(item.NamaType)
                                    : "";
                                row.appendChild(accountCol);

                                var descriptionCol =
                                    document.createElement("div");
                                descriptionCol.classList.add(
                                    "col-sm-2",
                                    "text-right",
                                    "small-normal"
                                );
                                descriptionCol.textContent = item.Jml
                                    ? numeral(item.Jml).format("0,0.00") +
                                    item.Satuan
                                    : "";
                                row.appendChild(descriptionCol);

                                var amountCol = document.createElement("div");
                                amountCol.classList.add(
                                    "col-sm-2",
                                    "text-right",
                                    "small-normal"
                                );

                                if (bankSelect.value == "6") {
                                    amountCol.textContent = item.HargaSatuan
                                        ? "IDR " +
                                        numeral(item.HargaSatuan).format(
                                            "0,0.00"
                                        )
                                        : "0.00";
                                } else {
                                    amountCol.textContent = item.HargaSatuan
                                        ? decodeHtmlEntities(item.Symbol2) +
                                        numeral(item.HargaSatuan).format(
                                            "0,0.00"
                                        )
                                        : "0.00";
                                }
                                row.appendChild(amountCol);

                                var totalCol = document.createElement("div");
                                totalCol.classList.add(
                                    "col-sm-3",
                                    "text-center",
                                    "small-normal",
                                    "description-right"
                                );
                                let tempTotal =
                                    numeral(item.Jml).value() *
                                    numeral(item.HargaSatuan).value();

                                if (bankSelect.value == "6") {
                                    totalCol.textContent = item.HargaSatuan
                                        ? "IDR " +
                                        numeral(tempTotal).format("0,0.00")
                                        : "0.00";
                                } else {
                                    totalCol.textContent = item.HargaSatuan
                                        ? decodeHtmlEntities(item.Symbol2) +
                                        numeral(tempTotal).format("0,0.00")
                                        : "0.00";
                                }

                                row.appendChild(totalCol);
                                faktur_Detail.appendChild(row);

                                totalGrand += numeral(tempTotal).value();

                                var additionalRow =
                                    document.createElement("div");
                                additionalRow.classList.add(
                                    "row",
                                    "small-font"
                                );

                                if (index >= 5) {
                                    additionalRow.style.display = "none";
                                }

                                var mantap = document.createElement("div");
                                mantap.classList.add(
                                    "col-sm-1",
                                    "text-left",
                                    "small-font",
                                    "description-left"
                                );
                                additionalRow.appendChild(mantap);

                                var additionalCoaCol =
                                    document.createElement("div");
                                additionalCoaCol.classList.add(
                                    "col-sm-5",
                                    "text-left",
                                    "small-font",
                                    "description-left"
                                );

                                if (bankSelect.value == "6") {
                                    additionalCoaCol.innerHTML = item.NO_PO
                                        ? "PO : " +
                                        decodeHtmlEntities(item.NO_PO) +
                                        "<br>" +
                                        "Jumlah Empty Bag yang dikirim: " +
                                        decodeHtmlEntities(item.Jml) +
                                        decodeHtmlEntities(item.Satuan)
                                        : "";
                                    additionalRow.appendChild(additionalCoaCol);
                                } else {
                                    additionalCoaCol.textContent = item.NO_PO
                                        ? "PO : " +
                                        decodeHtmlEntities(item.NO_PO)
                                        : "";
                                    additionalRow.appendChild(additionalCoaCol);
                                }

                                faktur_Detail.appendChild(additionalRow);
                            });

                            if (bankSelect.value == "6") {
                                faktur_SymbolGrand.textContent = "IDR";
                                faktur_SymbolUM.textContent = "IDR";
                                faktur_SymbolDPP.textContent = "IDR";
                                faktur_SymbolPajak.textContent = "IDR";
                                faktur_SymbolTerbayar.textContent = "IDR";
                            } else {
                                faktur_SymbolGrand.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolUM.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolDPP.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolPajak.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolTerbayar.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                            }

                            faktur_Grand.textContent =
                                numeral(totalGrand).format("0,0.00");

                            // if (
                            //     result[0].NamaNPWP == "PT. BLOOM TRADING INDONESIA"
                            // ) {
                            //     faktur_UM.textContent = "";
                            // } else {
                            //     faktur_UM.textContent = result[0].Nilai_UM
                            //         ? numeral(
                            //               (result[0].Nilai_UM * 11) / 12
                            //           ).format("0,0.00")
                            //         : "0.00";
                            // }

                            faktur_UM.textContent = result[0].Nilai_UM
                                ? numeral(result[0].Nilai_UM).format("0,0.00")
                                : "0.00";
                            // result[0].Nilai_UM
                            //     ? numeral(
                            //           (result[0].Nilai_UM * 11) / 12
                            //       ).format("0,0.00")
                            //     : "0.00";

                            let dpp =
                                numeral(faktur_Grand.textContent).value() -
                                numeral(result[0].Nilai_UM).value();
                            if (
                                result[0].NamaNPWP ==
                                "PT. BLOOM TRADING INDONESIA"
                            ) {
                                faktur_DPP.textContent = "";
                            } else if (duaDigitTahun > 24) {
                                if (bankSelect.value == "6") {
                                    let nilaiDPP = (dpp * 11) / 12;
                                    let nilaiBulat = Math.round(nilaiDPP);
                                    faktur_DPP.textContent = numeral(nilaiBulat).format("0,0.00");
                                } else {
                                    faktur_DPP.textContent = numeral(
                                        (dpp * 11) / 12
                                    ).format("0,0.00");
                                }
                            } else {
                                faktur_DPP.textContent =
                                    numeral(dpp).format("0,0.00");
                            }

                            let pajak =
                                (Math.round(numeral(dpp).value()) *
                                    numeral(result[0].PersenPPN).value()) /
                                100;
                            console.log(numeral(result[0].PersenPPN).value());

                            if (duaDigitTahun > 24) {
                                faktur_Pajak.textContent = numeral(
                                    ((dpp * 11) / 12) * 0.12
                                ).format("0,0.00");
                            } else {
                                faktur_Pajak.textContent =
                                    numeral(pajak).format("0,0.00");
                            }

                            if (duaDigitTahun > 24) {
                                let terbayar =
                                    numeral(dpp).value() +
                                    numeral(faktur_Pajak.textContent).value();
                                faktur_Terbayar.textContent =
                                    numeral(terbayar).format("0,0.00");
                                TTerbilang = convertNumberToWordsRupiah(
                                    numeral(faktur_Terbayar.textContent).value()
                                );
                                faktur_Terbilang.innerHTML =
                                    "&emsp;" + decodeHtmlEntities(TTerbilang);
                            } else {
                                let terbayar =
                                    numeral(dpp).value() +
                                    numeral(pajak).value();
                                faktur_Terbayar.textContent =
                                    numeral(terbayar).format("0,0.00");
                                faktur_Terbilang.textContent =
                                    decodeHtmlEntities(result[0].Terbilang);
                            }

                            if (bankSelect.value == "7") {
                                faktur_SyaratBayar.innerHTML = "";
                            } else {
                                faktur_SyaratBayar.innerHTML =
                                    "Syarat Pembayaran: &emsp;&emsp;" +
                                    decodeHtmlEntities(result[0].SyaratBayar) +
                                    " Hari";
                            }
                            console.log(result);
                            console.log(
                                result[0].NamaNPWP ==
                                "PT. BLOOM TRADING INDONESIA"
                            );

                            faktur_TglBln.textContent = tanggal + " " + bulan;
                            faktur_Thn.textContent = duaDigitTahun;
                            if (
                                result[0].NamaNPWP ==
                                "PT. BLOOM TRADING INDONESIA"
                            ) {
                                faktur_PersenPPN.innerHTML =
                                    "<strong></strong>";
                            } else if (duaDigitTahun > 24) {
                                faktur_PersenPPN.innerHTML =
                                    "<strong>12%</strong>";
                            } else {
                                faktur_PersenPPN.innerHTML =
                                    "<strong>11%</strong>";
                            }

                            let syaratBayar = result[0].SyaratBayar;
                            let tglTerimaBarang = result[0].Tgl_Terima_Barang;
                            let syaratBayarNumber = Number(syaratBayar);
                            let date3 = new Date(tglTerimaBarang);
                            let resultDate = new Date(date3);
                            resultDate.setDate(
                                date3.getDate() + syaratBayarNumber
                            );
                            if (bankSelect.value == "7") {
                                faktur_Tempo.innerHTML = "";
                                faktur_SuratJalan.innerHTML = "";
                                faktur_SJ.textContent = "";
                            } else {
                                faktur_Tempo.innerHTML =
                                    "Jatuh Tempo: &emsp;&emsp; " +
                                    formatDateToMMDDYYYY(resultDate);

                                if (sFormula0.length > 255) {
                                    faktur_SuratJalan.innerHTML =
                                        "Surat Jalan: &emsp;&emsp; " +
                                        sFormula0.slice(0, 252);
                                    faktur_SJ.textContent =
                                        sFormula0.slice(252);
                                } else {
                                    faktur_SuratJalan.innerHTML =
                                        "Surat Jalan: &emsp;&emsp; " +
                                        sFormula0;
                                    faktur_SJ.textContent = "";
                                }
                            }

                            printPreview("faktur");
                        }
                    }

                    // print faktur2
                    if (result.length > 5) {
                        //     // print faktur2
                        var faktur_beneficiary2 = document.getElementById(
                            "faktur_beneficiary2"
                        );
                        faktur_beneficiary2.style.visibility = "hidden";
                        var faktur_applicant2 =
                            document.getElementById("faktur_applicant2");
                        faktur_applicant2.style.visibility = "hidden";
                        var faktur_emptyBag2 =
                            document.getElementById("faktur_emptyBag2");
                        faktur_emptyBag2.style.visibility = "hidden";

                        var faktur_IdPenagihan2 = document.getElementById(
                            "faktur_IdPenagihan2"
                        );
                        faktur_IdPenagihan2.style.fontWeight = "bold";
                        // var faktur_AreaPPNThnIdFakturPajak =
                        //     document.getElementById(
                        //         "faktur_AreaPPNThnIdFakturPajak"
                        //     );
                        // faktur_AreaPPNThnIdFakturPajak.style.fontWeight = "bold";
                        var faktur_NamaNPWP2 =
                            document.getElementById("faktur_NamaNPWP2");
                        faktur_NamaNPWP2.style.fontWeight = "bold";
                        var faktur_AlamatNPWP2 =
                            document.getElementById("faktur_AlamatNPWP2");
                        var faktur_NPWP2 =
                            document.getElementById("faktur_NPWP2");
                        var faktur_NamaKelompokUtama2 = document.getElementById(
                            "faktur_NamaKelompokUtama2"
                        );
                        var faktur_SymbolGrand2 = document.getElementById(
                            "faktur_SymbolGrand2"
                        );
                        var faktur_Grand2 =
                            document.getElementById("faktur_Grand2");
                        var faktur_SymbolUM2 =
                            document.getElementById("faktur_SymbolUM2");
                        var faktur_UM2 = document.getElementById("faktur_UM2");
                        var faktur_SymbolDPP2 =
                            document.getElementById("faktur_SymbolDPP2");
                        var faktur_DPP2 =
                            document.getElementById("faktur_DPP2");
                        var faktur_SymbolPajak2 = document.getElementById(
                            "faktur_SymbolPajak2"
                        );
                        var faktur_Pajak2 =
                            document.getElementById("faktur_Pajak2");
                        var faktur_Terbilang2 =
                            document.getElementById("faktur_Terbilang2");
                        var faktur_SymbolTerbayar2 = document.getElementById(
                            "faktur_SymbolTerbayar2"
                        );
                        var faktur_Terbayar2 =
                            document.getElementById("faktur_Terbayar2");
                        var faktur_SyaratBayar2 = document.getElementById(
                            "faktur_SyaratBayar2"
                        );
                        var faktur_TglBln2 =
                            document.getElementById("faktur_TglBln2");
                        var faktur_Thn2 =
                            document.getElementById("faktur_Thn2");
                        var faktur_PersenPPN2 =
                            document.getElementById("faktur_PersenPPN2");
                        var faktur_Tempo2 =
                            document.getElementById("faktur_Tempo2");
                        var faktur_SuratJalan2 =
                            document.getElementById("faktur_SuratJalan2");
                        var faktur_SJ2 = document.getElementById("faktur_SJ2");
                        var bankBayar2 = document.getElementById("bankBayar2");
                        var ttdPimpinan2 =
                            document.getElementById("ttdPimpinan2");

                        if (result.length === 0) {
                            const elements = [
                                "faktur_IdPenagihan2",
                                // "faktur_AreaPPNThnIdFakturPajak2",
                                "faktur_NamaNPWP2",
                                "faktur_AlamatNPWP2",
                                "faktur_NPWP2",
                                "faktur_NamaKelompokUtama2",
                                "faktur_SymbolGrand2",
                                "faktur_Grand2",
                                "faktur_SymbolUM2",
                                "faktur_UM2",
                                "faktur_SymbolDPP2",
                                "faktur_DPP2",
                                "faktur_SymbolPajak2",
                                "faktur_Pajak2",
                                "faktur_Terbilang2",
                                "faktur_SymbolTerbayar2",
                                "faktur_Terbayar2",
                                "faktur_SyaratBayar2",
                                "faktur_TglBln2",
                                "faktur_Thn2",
                                "faktur_PersenPPN2",
                                "faktur_Tempo2",
                                "faktur_SuratJalan2",
                                "faktur_SJ2",
                                "bankBayar2",
                                "ttdPimpinan2",
                            ];

                            elements.forEach((id) => {
                                const element = document.getElementById(id);
                                if (element) {
                                    element.textContent = ""; // Set the value to empty string
                                }
                            });

                            // printPreview("faktur2");
                        } else {
                            if (bankSelect.value == "1") {
                                bankBayar2.innerHTML =
                                    "Pembayaran mohon ditransfer ke:" +
                                    "<br>" +
                                    "BCA Cab. Galaxy - Surabaya" +
                                    "<br>" +
                                    "a/c. 788 010 1999 ( IDR )" +
                                    "<br>" +
                                    "a/n. PT. Kerta Rajasa Raya";
                            } else if (bankSelect.value == "2") {
                                bankBayar2.innerHTML =
                                    "Pembayaran melalui SCF ke Rekening:" +
                                    "<br>" +
                                    "BNI  Cabang Tropodo Sidoarjo" +
                                    "<br>" +
                                    "a/c. 6388888829 ( IDR )" +
                                    "<br>" +
                                    "a/n. PT. Kerta Rajasa Raya";
                            } else if (bankSelect.value == "3") {
                                bankBayar2.innerHTML =
                                    "Pembayaran melalui SCF ke Rekening:" +
                                    "<br>" +
                                    "Bank Mandiri  KCP Padang Indarung" +
                                    "<br>" +
                                    "a/c. 111 0007609759 ( IDR )" +
                                    "<br>" +
                                    "a/n. PT. Kerta Rajasa Raya";
                            } else if (bankSelect.value == "4") {
                                bankBayar2.innerHTML =
                                    "Pembayaran mohon ditransfer ke:" +
                                    "<br>" +
                                    "Bank Mandiri  KCP Pondok Chandra Sidoarjo" +
                                    "<br>" +
                                    "a/c. 14200 5555 0007 ( IDR )" +
                                    "<br>" +
                                    "a/n. PT. Kerta Rajasa Raya";
                            } else if (bankSelect.value == "5") {
                                bankBayar2.innerHTML =
                                    "Pembayaran mohon ditransfer ke:" +
                                    "<br>" +
                                    "Bank OCBC Cab. Diponegoro - Surabaya" +
                                    "<br>" +
                                    "a/c. 5578 0000 9333 ( IDR )" +
                                    "<br>" +
                                    "a/n. PT. Kerta Rajasa Raya";
                            } else if (bankSelect.value == "6") {
                                faktur_beneficiary2.style.visibility =
                                    "visible";
                                faktur_applicant2.style.visibility = "visible";
                                faktur_emptyBag2.style.visibility = "visible";
                                bankBayar2.innerHTML =
                                    "TRADE TERM: " +
                                    tradeTerm +
                                    "<br>" +
                                    "Documentary Credit Number: " +
                                    dcn +
                                    "<br>" +
                                    "Date of Issue: " +
                                    doi +
                                    "<br>" +
                                    "&nbsp;";
                            } else if (bankSelect.value == "7") {
                                bankBayar2.innerHTML =
                                    "Pembayaran mohon ditransfer ke:" +
                                    "<br>" +
                                    "Bank OCBC Cab. Diponegoro - Surabaya" +
                                    "<br>" +
                                    "a/c. 5578 0000 9333 ( IDR )" +
                                    "<br>" +
                                    "a/n. PT. Kerta Rajasa Raya";
                            } else {
                                bankBayar2.innerHTML =
                                    "&nbsp;" +
                                    "<br>" +
                                    "&nbsp;" +
                                    "<br>" +
                                    "&nbsp;" +
                                    "<br>" +
                                    "&nbsp;";
                            }

                            if (ttdSelect.value == "1") {
                                ttdPimpinan2.textContent = "TJAHYO SANTOSO";
                            } else if (ttdSelect.value == "2") {
                                ttdPimpinan2.textContent = "RUDY SANTOSO";
                            } else if (ttdSelect.value == "3") {
                                ttdPimpinan2.textContent = "YUDI SANTOSO";
                            }

                            faktur_IdPenagihan2.textContent =
                                decodeHtmlEntities(result[0].Id_Penagihan);

                            if (bankSelect.value == "7") {
                                var date2 = isNaN(new Date(editDate).getTime())
                                    ? new Date(result[0].Tgl_Penagihan)
                                    : new Date(editDate);
                            } else {
                                var date2 = new Date(result[0].Tgl_Penagihan);
                            }
                            // var date2 = new Date(result[0].Tgl_Penagihan);

                            var namaBulan = [
                                "Januari",
                                "Februari",
                                "Maret",
                                "April",
                                "Mei",
                                "Juni",
                                "Juli",
                                "Agustus",
                                "September",
                                "Oktober",
                                "November",
                                "Desember",
                            ];

                            var tanggal = date2.getDate();
                            var bulan = namaBulan[date2.getMonth()];
                            var tahunLengkap = date2.getFullYear();
                            var duaDigitTahun = tahunLengkap
                                .toString()
                                .slice(-2);
                            // faktur_AreaPPNThnIdFakturPajak.textContent =
                            //     decodeHtmlEntities(result[0].KdArea_Ppn) +
                            //     " . 012 - " +
                            //     duaDigitTahun +
                            //     ". " +
                            //     decodeHtmlEntities(result[0].IdFakturPajak);

                            faktur_NamaNPWP2.textContent = decodeHtmlEntities(
                                result[0].NamaNPWP
                            );
                            faktur_AlamatNPWP2.textContent = decodeHtmlEntities(
                                result[0].AlamatNPWP
                            );

                            let npwp = result[0].NPWP;
                            // let formattedNPWP =
                            //     npwp.slice(0, 2) +
                            //     " . " +
                            //     npwp.slice(2, 5) +
                            //     " . " +
                            //     npwp.slice(5, 8) +
                            //     " . " +
                            //     npwp.slice(8, 9) +
                            //     " - " +
                            //     npwp.slice(9, 12) +
                            //     " . " +
                            //     npwp.slice(12, 15);
                            faktur_NPWP2.textContent = npwp;

                            // faktur_NamaKelompokUtama2.textContent =
                            //     decodeHtmlEntities(result[0].NamaKelompokUtama);

                            if (bankSelect.value == "6") {
                                faktur_NamaKelompokUtama2.innerHTML = "&nbsp;";
                            } else {
                                faktur_NamaKelompokUtama2.textContent =
                                    decodeHtmlEntities(
                                        result[0].NamaKelompokUtama
                                    );
                            }

                            let totalGrand = 0;
                            let count = 0;
                            var faktur_Detail2 =
                                document.getElementById("faktur_Detail2");

                            faktur_Detail2.innerHTML = "";
                            console.log(result.length > 3);

                            result.forEach(function (item, index) {
                                var row = document.createElement("div");
                                row.classList.add("row", "small-font");
                                count += 1;

                                // Tampilkan item kelima dan seterusnya
                                if (index < 5) {
                                    row.style.display = "none"; // Sembunyikan item sebelum yang kelima
                                }

                                var coaCol = document.createElement("div");
                                coaCol.classList.add(
                                    "col-sm-1",
                                    "text-left",
                                    "small-font",
                                    "description-left"
                                );
                                coaCol.textContent = count;
                                row.appendChild(coaCol);

                                var accountCol = document.createElement("div");
                                accountCol.classList.add(
                                    "col-sm-5",
                                    "text-left",
                                    "small-font",
                                    "description-left"
                                );
                                accountCol.textContent = item.NamaType
                                    ? decodeHtmlEntities(item.NamaType)
                                    : "";
                                row.appendChild(accountCol);

                                var descriptionCol =
                                    document.createElement("div");
                                descriptionCol.classList.add(
                                    "col-sm-2",
                                    "text-right",
                                    "small-normal"
                                );
                                descriptionCol.textContent = item.Jml
                                    ? numeral(item.Jml).format("0,0.00") +
                                    item.Satuan
                                    : "";
                                row.appendChild(descriptionCol);

                                var amountCol = document.createElement("div");
                                amountCol.classList.add(
                                    "col-sm-2",
                                    "text-right",
                                    "small-normal"
                                );

                                if (bankSelect.value == "6") {
                                    amountCol.textContent = item.HargaSatuan
                                        ? "IDR " +
                                        numeral(item.HargaSatuan).format(
                                            "0,0.00"
                                        )
                                        : "0.00";
                                } else {
                                    amountCol.textContent = item.HargaSatuan
                                        ? decodeHtmlEntities(item.Symbol2) +
                                        numeral(item.HargaSatuan).format(
                                            "0,0.00"
                                        )
                                        : "0.00";
                                }
                                row.appendChild(amountCol);

                                var totalCol = document.createElement("div");
                                totalCol.classList.add(
                                    "col-sm-3",
                                    "text-center",
                                    "small-normal",
                                    "description-right"
                                );
                                let tempTotal =
                                    numeral(item.Jml).value() *
                                    numeral(item.HargaSatuan).value();

                                if (bankSelect.value == "6") {
                                    totalCol.textContent = item.HargaSatuan
                                        ? "IDR " +
                                        numeral(tempTotal).format("0,0.00")
                                        : "0.00";
                                } else {
                                    totalCol.textContent = item.HargaSatuan
                                        ? decodeHtmlEntities(item.Symbol2) +
                                        numeral(tempTotal).format("0,0.00")
                                        : "0.00";
                                }

                                row.appendChild(totalCol);
                                faktur_Detail2.appendChild(row);

                                totalGrand += numeral(tempTotal).value();

                                var additionalRow =
                                    document.createElement("div");
                                additionalRow.classList.add(
                                    "row",
                                    "small-font"
                                );

                                if (index < 5) {
                                    additionalRow.style.display = "none";
                                }

                                var mantap = document.createElement("div");
                                mantap.classList.add(
                                    "col-sm-1",
                                    "text-left",
                                    "small-font",
                                    "description-left"
                                );
                                additionalRow.appendChild(mantap);

                                var additionalCoaCol =
                                    document.createElement("div");
                                additionalCoaCol.classList.add(
                                    "col-sm-5",
                                    "text-left",
                                    "small-font",
                                    "description-left"
                                );
                                // additionalCoaCol.textContent = item.NO_PO
                                //     ? "PO : " + decodeHtmlEntities(item.NO_PO)
                                //     : "";
                                // additionalRow.appendChild(additionalCoaCol);

                                if (bankSelect.value == "6") {
                                    additionalCoaCol.innerHTML = item.NO_PO
                                        ? "PO : " +
                                        decodeHtmlEntities(item.NO_PO) +
                                        "<br>" +
                                        "Jumlah Empty Bag yang dikirim: " +
                                        decodeHtmlEntities(item.Jml) +
                                        decodeHtmlEntities(item.Satuan)
                                        : "";
                                    additionalRow.appendChild(additionalCoaCol);
                                } else {
                                    additionalCoaCol.textContent = item.NO_PO
                                        ? "PO : " +
                                        decodeHtmlEntities(item.NO_PO)
                                        : "";
                                    additionalRow.appendChild(additionalCoaCol);
                                }

                                faktur_Detail2.appendChild(additionalRow);
                            });

                            if (bankSelect.value == "6") {
                                faktur_SymbolGrand2.textContent = "IDR";
                                faktur_SymbolUM2.textContent = "IDR";
                                faktur_SymbolDPP2.textContent = "IDR";
                                faktur_SymbolPajak2.textContent = "IDR";
                                faktur_SymbolTerbayar2.textContent = "IDR";
                            } else {
                                faktur_SymbolGrand2.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolUM2.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolDPP2.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolPajak2.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                                faktur_SymbolTerbayar2.textContent =
                                    decodeHtmlEntities(result[0].Symbol2);
                            }

                            faktur_Grand2.textContent =
                                numeral(totalGrand).format("0,0.00");

                            // if (
                            //     result[0].NamaNPWP ==
                            //     "PT. BLOOM TRADING INDONESIA"
                            // ) {
                            //     faktur_UM2.textContent = "";
                            // } else {
                            //     faktur_UM2.textContent = result[0].Nilai_UM
                            //         ? numeral(
                            //               (result[0].Nilai_UM * 11) / 12
                            //           ).format("0,0.00")
                            //         : "0.00";
                            // }

                            faktur_UM2.textContent = result[0].Nilai_UM
                                ? numeral(result[0].Nilai_UM).format("0,0.00")
                                : "0.00";
                            // result[0].Nilai_UM
                            //     ? numeral(
                            //           (result[0].Nilai_UM * 11) / 12
                            //       ).format("0,0.00")
                            //     : "0.00";

                            let dpp =
                                numeral(faktur_Grand2.textContent).value() -
                                numeral(result[0].Nilai_UM).value();
                            if (
                                result[0].NamaNPWP ==
                                "PT. BLOOM TRADING INDONESIA"
                            ) {
                                faktur_DPP2.textContent = "";
                            } else if (duaDigitTahun > 24) {
                                if (bankSelect.value == "6") {
                                    let nilaiDPP = (dpp * 11) / 12;
                                    let nilaiBulat = Math.round(nilaiDPP);
                                    faktur_DPP2.textContent = numeral(nilaiBulat).format("0,0.00");
                                } else {
                                    faktur_DPP2.textContent = numeral(
                                        (dpp * 11) / 12
                                    ).format("0,0.00");
                                }
                            } else {
                                faktur_DPP2.textContent =
                                    numeral(dpp).format("0,0.00");
                            }
                            // if (duaDigitTahun > 24) {
                            //     faktur_DPP2.textContent = numeral(
                            //         (dpp * 11) / 12
                            //     ).format("0,0.00");
                            // } else {
                            //     faktur_DPP2.textContent =
                            //         numeral(dpp).format("0,0.00");
                            // }

                            let pajak =
                                (Math.round(numeral(dpp).value()) *
                                    numeral(result[0].PersenPPN).value()) /
                                100;
                            console.log(numeral(result[0].PersenPPN).value());

                            if (duaDigitTahun > 24) {
                                faktur_Pajak2.textContent = numeral(
                                    ((dpp * 11) / 12) * 0.12
                                ).format("0,0.00");
                            } else {
                                faktur_Pajak2.textContent =
                                    numeral(pajak).format("0,0.00");
                            }

                            if (duaDigitTahun > 24) {
                                let terbayar =
                                    numeral(dpp).value() +
                                    numeral(faktur_Pajak2.textContent).value();
                                faktur_Terbayar2.textContent =
                                    numeral(terbayar).format("0,0.00");
                                TTerbilang = convertNumberToWordsRupiah(
                                    numeral(
                                        faktur_Terbayar2.textContent
                                    ).value()
                                );
                                faktur_Terbilang2.innerHTML =
                                    "&emsp;" + decodeHtmlEntities(TTerbilang);
                            } else {
                                let terbayar =
                                    numeral(dpp).value() +
                                    numeral(pajak).value();
                                faktur_Terbayar2.textContent =
                                    numeral(terbayar).format("0,0.00");
                                faktur_Terbilang2.textContent =
                                    decodeHtmlEntities(result[0].Terbilang);
                            }

                            if (bankSelect.value == "7") {
                                faktur_SyaratBayar2.innerHTML = "";
                            } else {
                                faktur_SyaratBayar2.innerHTML =
                                    "Syarat Pembayaran: &emsp;&emsp;" +
                                    decodeHtmlEntities(result[0].SyaratBayar) +
                                    " Hari";
                            }

                            faktur_TglBln2.textContent = tanggal + " " + bulan;
                            faktur_Thn2.textContent = duaDigitTahun;
                            if (
                                result[0].NamaNPWP ==
                                "PT. BLOOM TRADING INDONESIA"
                            ) {
                                faktur_PersenPPN2.innerHTML =
                                    "<strong></strong>";
                            } else if (duaDigitTahun > 24) {
                                faktur_PersenPPN2.innerHTML =
                                    "<strong>12%</strong>";
                            } else {
                                faktur_PersenPPN2.innerHTML =
                                    "<strong>11%</strong>";
                            }

                            let syaratBayar = result[0].SyaratBayar;
                            let tglTerimaBarang = result[0].Tgl_Terima_Barang;
                            let syaratBayarNumber = Number(syaratBayar);
                            let date3 = new Date(tglTerimaBarang);
                            let resultDate = new Date(date3);
                            resultDate.setDate(
                                date3.getDate() + syaratBayarNumber
                            );
                            if (bankSelect.value == "7") {
                                faktur_Tempo2.innerHTML = "";
                                faktur_SuratJalan2.innerHTML = "";
                                faktur_SJ2.textContent = "";
                            } else {
                                faktur_Tempo2.innerHTML =
                                    "Jatuh Tempo: &emsp;&emsp; " +
                                    formatDateToMMDDYYYY(resultDate);

                                if (sFormula0.length > 255) {
                                    faktur_SuratJalan2.innerHTML =
                                        "Surat Jalan: &emsp;&emsp; " +
                                        sFormula0.slice(0, 252);
                                    faktur_SJ2.textContent =
                                        sFormula0.slice(252);
                                } else {
                                    faktur_SuratJalan2.innerHTML =
                                        "Surat Jalan: &emsp;&emsp; " +
                                        sFormula0;
                                    faktur_SJ2.textContent = "";
                                }
                            }
                            // faktur_Tempo2.innerHTML =
                            //     "Jatuh Tempo: &emsp;&emsp; " +
                            //     formatDateToMMDDYYYY(resultDate);

                            // if (sFormula0.length > 255) {
                            //     faktur_SuratJalan2.innerHTML =
                            //         "Surat Jalan: &emsp;&emsp; " +
                            //         sFormula0.slice(0, 252);
                            //     faktur_SJ2.textContent = sFormula0.slice(252);
                            // } else {
                            //     faktur_SuratJalan2.innerHTML =
                            //         "Surat Jalan: &emsp;&emsp; " + sFormula0;
                            //     faktur_SJ2.textContent = "";
                            // }

                            printPreview("faktur2");
                        }
                    }
                }
            })
            .catch(function (error) {
                console.error("Error:", error);
            });
    } else {
        // print nota
        var nota_IdPenagihan = document.getElementById("nota_IdPenagihan");
        var nota_NamaCust = document.getElementById("nota_NamaCust");
        var nota_Alamat = document.getElementById("nota_Alamat");
        var nota_NamaKelompokUtama = document.getElementById("nota_NamaKelompokUtama"); // prettier-ignore
        var nota_Detail = document.getElementById("nota_Detail");
        var nota_Terbilang = document.getElementById("nota_Terbilang");
        var nota_SymbolGrand = document.getElementById("nota_SymbolGrand");
        var nota_Grand = document.getElementById("nota_Grand");
        var nota_SyaratBayar = document.getElementById("nota_SyaratBayar");
        var nota_TglBln = document.getElementById("nota_TglBln");
        var nota_Thn = document.getElementById("nota_Thn");
        var nota_Tempo = document.getElementById("nota_Tempo");
        var nota_SuratJalan = document.getElementById("nota_SuratJalan");
        var nota_SJ = document.getElementById("nota_SJ");

        if (result === 0) {
            const elements = [
                "nota_IdPenagihan",
                "nota_NamaCust",
                "nota_Alamat",
                "nota_NamaKelompokUtama",
                "nota_Detail",
                "nota_Terbilang",
                "nota_SymbolGrand",
                "nota_Grand",
                "nota_SyaratBayar",
                "nota_TglBln",
                "nota_Thn",
                "nota_Tempo",
                "nota_SuratJalan",
                "nota_SJ",
            ];

            elements.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = ""; // Set the text content to empty string
                }
            });

            printPreview("nota");
        } else {
            var date2 = new Date(result[0].Tgl_Penagihan);

            var namaBulan = [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ];

            var tanggal = date2.getDate();
            var bulan = namaBulan[date2.getMonth()];
            var tahunLengkap = date2.getFullYear();
            var duaDigitTahun = tahunLengkap.toString().slice(-2);

            nota_IdPenagihan.textContent = result[0].Id_Penagihan
                ? decodeHtmlEntities(result[0].Id_Penagihan)
                : "";

            nota_NamaCust.textContent = result[0].NamaCust
                ? decodeHtmlEntities(result[0].NamaCust)
                : "";

            nota_Alamat.textContent = result[0].Alamat
                ? decodeHtmlEntities(result[0].Alamat)
                : "";

            nota_NamaKelompokUtama.textContent = result[0].NamaKelompokUtama
                ? decodeHtmlEntities(result[0].NamaKelompokUtama)
                : "";

            nota_Terbilang.textContent = result[0].Terbilang
                ? decodeHtmlEntities(result[0].Terbilang)
                : "";

            nota_SymbolGrand.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );

            let totalGrand = 0;
            let count = 0;
            var nota_Detail = document.getElementById("nota_Detail");

            nota_Detail.innerHTML = "";

            result.forEach(function (item, index) {
                var row = document.createElement("div");
                row.classList.add("row");
                count += 1;

                var coaCol = document.createElement("div");
                coaCol.classList.add("col-sm-1", "text-right");
                coaCol.textContent = count;
                row.appendChild(coaCol);

                var accountCol = document.createElement("div");
                accountCol.classList.add("col-sm-5", "text-left");
                accountCol.textContent = item.NamaType
                    ? decodeHtmlEntities(item.NamaType)
                    : "";
                row.appendChild(accountCol);

                var descriptionCol = document.createElement("div");
                descriptionCol.classList.add("col-sm-2", "text-right");
                descriptionCol.textContent = item.Jml
                    ? numeral(item.Jml).format("0,0.00") + item.Satuan
                    : "";
                row.appendChild(descriptionCol);

                var amountCol = document.createElement("div");
                amountCol.classList.add("col-sm-2", "text-right");
                amountCol.textContent = item.HargaSatuan
                    ? decodeHtmlEntities(item.Symbol2) +
                    numeral(item.HargaSatuan).format("0,0.00")
                    : "0.00";
                row.appendChild(amountCol);

                var totalCol = document.createElement("div");
                totalCol.classList.add("col-sm-2", "text-left");
                let tempTotal =
                    numeral(item.Jml).value() *
                    numeral(item.HargaSatuan).value();
                totalCol.textContent = item.HargaSatuan
                    ? decodeHtmlEntities(item.Symbol2) +
                    numeral(tempTotal).format("0,0.00")
                    : "0.00";
                row.appendChild(totalCol);

                nota_Detail.appendChild(row);

                totalGrand += numeral(tempTotal).value();

                if (item.Id_Penagihan.substring(4, 6) !== "AP") {
                    var additionalRow = document.createElement("div");
                    additionalRow.classList.add("row");

                    var mantap = document.createElement("div");
                    mantap.classList.add("col-sm-1", "text-right");
                    additionalRow.appendChild(mantap);

                    var additionalAccountCol = document.createElement("div");
                    additionalAccountCol.classList.add(
                        "col-sm-10",
                        "text-left"
                    );
                    additionalAccountCol.textContent = item.NO_PO
                        ? "P O : " + decodeHtmlEntities(item.NO_PO)
                        : "";
                    additionalRow.appendChild(additionalAccountCol);

                    nota_Detail.appendChild(additionalRow);
                }
            });

            nota_Grand.textContent = numeral(totalGrand).format("0,0.00");

            nota_SyaratBayar.innerHTML =
                "Syarat Pembayaran: &emsp;&emsp;" +
                decodeHtmlEntities(result[0].SyaratBayar) +
                " Hari";

            nota_TglBln.textContent = tanggal + " " + bulan;
            nota_Thn.textContent = duaDigitTahun;

            let syaratBayar = result[0].SyaratBayar;
            let tglTerimaBarang = result[0].Tgl_Terima_Barang;
            let syaratBayarNumber = Number(syaratBayar);
            let date3 = new Date(tglTerimaBarang);
            let resultDate = new Date(date3);
            resultDate.setDate(date3.getDate() + syaratBayarNumber);
            nota_Tempo.innerHTML =
                "Jatuh Tempo: &emsp;&emsp; " + formatDateToMMDDYYYY(resultDate);

            if (sFormula0.length > 255) {
                nota_SuratJalan.innerHTML =
                    "Surat Jalan: &emsp;&emsp; " + sFormula0.slice(0, 252);
                nota_SJ.textContent = sFormula0.slice(252);
            } else {
                nota_SuratJalan.innerHTML =
                    "Surat Jalan: &emsp;&emsp; " + sFormula0;
                nota_SJ.textContent = "";
            }

            printPreview("nota");
        }
    }
}

function rpt_cetakFakturPajak(result) {
    if (parseInt(sIdMataUang) === 1) {
        // print fakur pajak 1
        var fakturPajak1_AreaPPNThnIdFakturPajak = document.getElementById(
            "fakturPajak1_AreaPPNThnIdFakturPajak"
        );
        var fakturPajak1_NamaNPWP = document.getElementById(
            "fakturPajak1_NamaNPWP"
        );
        var fakturPajak1_AlamatNPWP = document.getElementById(
            "fakturPajak1_AlamatNPWP"
        );
        var fakturPajak1_NPWP = document.getElementById("fakturPajak1_NPWP");
        var fakturPajak1_NPWP2 = document.getElementById("fakturPajak1_NPWP2");
        var fakturPajak1_NamaKelompokUtama = document.getElementById(
            "fakturPajak1_NamaKelompokUtama"
        );
        var fakturPajak1_Detail = document.getElementById(
            "fakturPajak1_Detail"
        );
        var fakturPajak1_SymbolGrand = document.getElementById(
            "fakturPajak1_SymbolGrand"
        );
        var fakturPajak1_Grand = document.getElementById("fakturPajak1_Grand");
        var fakturPajak1_Symbol0 = document.getElementById(
            "fakturPajak1_Symbol0"
        );
        var fakturPajak1_SymbolUM = document.getElementById(
            "fakturPajak1_SymbolUM"
        );
        var fakturPajak1_UM = document.getElementById("fakturPajak1_UM");
        var fakturPajak1_SymbolGrandTot = document.getElementById(
            "fakturPajak1_SymbolGrandTot"
        );
        var fakturPajak1_GrandTot = document.getElementById(
            "fakturPajak1_GrandTot"
        );
        var fakturPajak1_SymbolPajak = document.getElementById(
            "fakturPajak1_SymbolPajak"
        );
        var fakturPajak1_Pajak = document.getElementById("fakturPajak1_Pajak");
        var fakturPajak1_TglBln = document.getElementById(
            "fakturPajak1_TglBln"
        );
        var fakturPajak1_Thn = document.getElementById("fakturPajak1_Thn");

        if (result.length === 0) {
            const elements = [
                "fakturPajak1_AreaPPNThnIdFakturPajak",
                "fakturPajak1_NamaNPWP",
                "fakturPajak1_AlamatNPWP",
                "fakturPajak1_NPWP",
                "fakturPajak1_NPWP2",
                "fakturPajak1_NamaKelompokUtama",
                "fakturPajak1_Detail",
                "fakturPajak1_SymbolGrand",
                "fakturPajak1_Grand",
                "fakturPajak1_Symbol0",
                "fakturPajak1_SymbolUM",
                "fakturPajak1_UM",
                "fakturPajak1_SymbolGrandTot",
                "fakturPajak1_GrandTot",
                "fakturPajak1_SymbolPajak",
                "fakturPajak1_Pajak",
                "fakturPajak1_TglBln",
                "fakturPajak1_Thn",
            ];

            elements.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = ""; // Set the text content to an empty string
                }
            });

            printPreview("fakturPajak1");
        } else {
            var date2 = new Date(result[0].Tgl_Penagihan);

            var namaBulan = [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ];

            var tanggal = date2.getDate();
            var bulan = namaBulan[date2.getMonth()];
            var tahunLengkap = date2.getFullYear();
            var duaDigitTahun = tahunLengkap.toString().slice(-2);
            fakturPajak1_AreaPPNThnIdFakturPajak.textContent =
                decodeHtmlEntities(result[0].KdArea_Ppn) +
                " . 000 - " +
                duaDigitTahun +
                " . " +
                decodeHtmlEntities(result[0].IdFakturPajak);

            fakturPajak1_NamaNPWP.textContent = decodeHtmlEntities(
                result[0].NamaNPWP
            );
            fakturPajak1_AlamatNPWP.textContent = decodeHtmlEntities(
                result[0].AlamatNPWP
            );

            let npwp = result[0].NPWP;
            let formattedNPWP =
                npwp.slice(0, 2) +
                " . " +
                npwp.slice(2, 5) +
                " . " +
                npwp.slice(5, 8) +
                " . " +
                npwp.slice(8, 9) +
                " - " +
                npwp.slice(9, 12) +
                " . " +
                npwp.slice(12, 15);
            fakturPajak1_NPWP.textContent = formattedNPWP;
            fakturPajak1_NPWP2.textContent = formattedNPWP;

            fakturPajak1_NamaKelompokUtama.textContent = decodeHtmlEntities(
                result[0].NamaKelompokUtama
            );

            let totalGrand = 0;
            let count = 0;
            var fakturPajak1_Detail = document.getElementById(
                "fakturPajak1_Detail"
            );

            fakturPajak1_Detail.innerHTML = "";

            result.forEach(function (item, index) {
                var row = document.createElement("div");
                row.classList.add("row");
                count += 1;

                var coaCol = document.createElement("div");
                coaCol.classList.add("col-sm-1", "text-right");
                coaCol.textContent = count;
                row.appendChild(coaCol);

                var accountCol = document.createElement("div");
                accountCol.classList.add("col-sm-8", "text-left");
                accountCol.textContent = item.NamaType
                    ? decodeHtmlEntities(item.NamaType)
                    : "";
                row.appendChild(accountCol);

                var totalCol = document.createElement("div");
                totalCol.classList.add("col-sm-3", "text-right");
                let tempTotal =
                    numeral(item.Jml).value() *
                    numeral(item.HargaSatuan).value();
                totalCol.textContent = item.HargaSatuan
                    ? decodeHtmlEntities(item.Symbol2) +
                    numeral(tempTotal).format("0,0.00")
                    : "0.00";
                row.appendChild(totalCol);

                fakturPajak1_Detail.appendChild(row);

                totalGrand += numeral(tempTotal).value();
            });

            fakturPajak1_SymbolGrand.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );
            fakturPajak1_Symbol0.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );
            fakturPajak1_SymbolUM.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );
            fakturPajak1_SymbolGrandTot.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );
            fakturPajak1_SymbolPajak.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );

            fakturPajak1_Grand.textContent =
                numeral(totalGrand).format("0,0.00");
            fakturPajak1_UM.textContent = result[0].Nilai_UM
                ? numeral(result[0].Nilai_UM).format("0,0.00")
                : 0;

            let grandTotTemp =
                numeral(totalGrand).value() -
                numeral(fakturPajak1_UM.textContent).value();
            fakturPajak1_GrandTot.textContent =
                numeral(grandTotTemp).format("0,0.00");

            let pajakTemp = numeral(grandTotTemp).value() * 0.1;
            fakturPajak1_Pajak.textContent =
                numeral(pajakTemp).format("0,0.00");

            fakturPajak1_TglBln.textContent = tanggal + " " + bulan;
            fakturPajak1_Thn.textContent = duaDigitTahun;

            printPreview("fakturPajak1");
        }
    } else {
        var fakturPajak_AreaPPNThnIdFakturPajak = document.getElementById(
            "fakturPajak_AreaPPNThnIdFakturPajak"
        );
        var fakturPajak_NamaNPWP = document.getElementById(
            "fakturPajak_NamaNPWP"
        );
        var fakturPajak_AlamatNPWP = document.getElementById(
            "fakturPajak_AlamatNPWP"
        );
        var fakturPajak_NPWP = document.getElementById("fakturPajak_NPWP");
        var fakturPajak_NPWP2 = document.getElementById("fakturPajak_NPWP2");
        var fakturPajak_NamaKelompokUtama = document.getElementById(
            "fakturPajak_NamaKelompokUtama"
        );
        var fakturPajak_Detail = document.getElementById("fakturPajak_Detail");
        var fakturPajak_SymbolGrand = document.getElementById(
            "fakturPajak_SymbolGrand"
        );
        var fakturPajak_Grand = document.getElementById("fakturPajak_Grand");
        var fakturPajak_SymbolUM = document.getElementById(
            "fakturPajak_SymbolUM"
        );
        var fakturPajak_UM = document.getElementById("fakturPajak_UM");
        var fakturPajak_UMRupiah = document.getElementById(
            "fakturPajak_UMRupiah"
        );
        var fakturPajak_SymbolGrandTot = document.getElementById(
            "fakturPajak_SymbolGrandTot"
        );
        var fakturPajak_GrandTot = document.getElementById(
            "fakturPajak_GrandTot"
        );
        var fakturPajak_TotalRupiah = document.getElementById(
            "fakturPajak_TotalRupiah"
        );
        var fakturPajak_Pajak = document.getElementById("fakturPajak_Pajak");
        var fakturPajak_TglBln = document.getElementById("fakturPajak_TglBln");
        var fakturPajak_Thn = document.getElementById("fakturPajak_Thn");
        var fakturPajak_Kurs = document.getElementById("fakturPajak_Kurs");

        if (result.length === 0) {
            const elements = [
                "fakturPajak_AreaPPNThnIdFakturPajak",
                "fakturPajak_NamaNPWP",
                "fakturPajak_AlamatNPWP",
                "fakturPajak_NPWP",
                "fakturPajak_NPWP2",
                "fakturPajak_NamaKelompokUtama",
                "fakturPajak_Detail",
                "fakturPajak_SymbolGrand",
                "fakturPajak_Grand",
                "fakturPajak_SymbolUM",
                "fakturPajak_UM",
                "fakturPajak_UMRupiah",
                "fakturPajak_SymbolGrandTot",
                "fakturPajak_GrandTot",
                "fakturPajak_TotalRupiah",
                "fakturPajak_Pajak",
                "fakturPajak_TglBln",
                "fakturPajak_Thn",
                "fakturPajak_Kurs",
            ];

            elements.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = ""; // Set text content to an empty string
                }
            });

            printPreview("fakturPajak");
        } else {
            if (result[0].Nama_MataUang !== "RUPIAH") {
                let kursTemp = numeral(result[0].NilaiKurs).value();
                fakturPajak_Kurs.textContent =
                    numeral(result[0].NilaiKurs).format("0,0.00") +
                    "/1 " +
                    result[0].Symbol2;
            }

            var date2 = new Date(result[0].Tgl_Penagihan);

            var namaBulan = [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ];

            var tanggal = date2.getDate();
            var bulan = namaBulan[date2.getMonth()];
            var tahunLengkap = date2.getFullYear();
            var duaDigitTahun = tahunLengkap.toString().slice(-2);
            fakturPajak_AreaPPNThnIdFakturPajak.textContent =
                decodeHtmlEntities(result[0].KdArea_Ppn) +
                " . 000 - " +
                duaDigitTahun +
                " . " +
                decodeHtmlEntities(result[0].IdFakturPajak);

            fakturPajak_NamaNPWP.textContent = decodeHtmlEntities(
                result[0].NamaNPWP
            );
            fakturPajak_AlamatNPWP.textContent = decodeHtmlEntities(
                result[0].AlamatNPWP
            );

            let npwp = result[0].NPWP;
            let formattedNPWP =
                npwp.slice(0, 2) +
                " . " +
                npwp.slice(2, 5) +
                " . " +
                npwp.slice(5, 8) +
                " . " +
                npwp.slice(8, 9) +
                " - " +
                npwp.slice(9, 12) +
                " . " +
                npwp.slice(12, 15);
            fakturPajak_NPWP.textContent = formattedNPWP;
            fakturPajak_NPWP2.textContent = formattedNPWP;

            fakturPajak_NamaKelompokUtama.textContent = decodeHtmlEntities(
                result[0].NamaKelompokUtama
            );

            let totalGrand = 0;
            let count = 0;
            var fakturPajak_Detail =
                document.getElementById("fakturPajak_Detail");

            fakturPajak_Detail.innerHTML = "";

            result.forEach(function (item, index) {
                var row = document.createElement("div");
                row.classList.add("row");
                count += 1;

                var coaCol = document.createElement("div");
                coaCol.classList.add("col-sm-1", "text-right");
                coaCol.textContent = count;
                row.appendChild(coaCol);

                var accountCol = document.createElement("div");
                accountCol.classList.add("col-sm-6", "text-left");
                accountCol.textContent = item.NamaType
                    ? decodeHtmlEntities(item.NamaType)
                    : "";
                row.appendChild(accountCol);

                var accountCol = document.createElement("div");
                accountCol.classList.add("col-sm-1", "text-right");
                accountCol.textContent = item.Symbol2
                    ? decodeHtmlEntities(item.Symbol2)
                    : "";
                row.appendChild(accountCol);

                var totalCol = document.createElement("div");
                totalCol.classList.add("col-sm-2", "text-right");
                let tempTotal =
                    numeral(item.Jml).value() *
                    numeral(item.HargaSatuan).value();
                totalCol.textContent = tempTotal
                    ? numeral(tempTotal).format("0,0.00")
                    : "0.00";
                row.appendChild(totalCol);

                fakturPajak_Detail.appendChild(row);

                totalGrand += numeral(tempTotal).value();
            });

            fakturPajak_SymbolGrand.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );
            fakturPajak_SymbolUM.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );
            fakturPajak_SymbolGrandTot.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );

            fakturPajak_Grand.textContent =
                numeral(totalGrand).format("0,0.00");
            fakturPajak_UM.textContent = result[0].Nilai_UM
                ? numeral(result[0].Nilai_UM).format("0,0.00")
                : "0.00";

            let grandTotTemp =
                numeral(totalGrand).value() -
                numeral(fakturPajak_UM.textContent).value();
            fakturPajak_GrandTot.textContent =
                numeral(grandTotTemp).format("0,0.00");

            fakturPajak_TglBln.textContent = tanggal + " " + bulan;
            fakturPajak_Thn.textContent = tahunLengkap;

            if (result[0].Nama_MataUang !== "RUPIAH") {
                if (result[0].Nilai_UM !== null) {
                    let umTemp =
                        numeral(result[0].Nilai_UM).value() *
                        numeral(result[0].Kurs_UM).value();
                    fakturPajak_UMRupiah.textContent =
                        umTemp !== 0
                            ? "Rp. " + numeral(umTemp).format("0,0.00")
                            : "Rp. 0.00";
                } else {
                    fakturPajak_UMRupiah.textContent = "Rp. 0.00";
                }

                if (result[0].Nama_MataUang !== "RUPIAH") {
                    let totalRupiahTemp =
                        numeral(fakturPajak_Grand.textContent).value() *
                        numeral(result[0].NilaiKurs).value() -
                        numeral(fakturPajak_UMRupiah).value();
                    fakturPajak_TotalRupiah.textContent =
                        "Rp. " + numeral(totalRupiahTemp).format("0,0.00");
                }
            }
            let totalRupiahTemp =
                numeral(fakturPajak_Grand.textContent).value() *
                numeral(result[0].NilaiKurs).value() -
                numeral(fakturPajak_UMRupiah).value();

            let pajakTemp = numeral(totalRupiahTemp).value() * 0.1;
            fakturPajak_Pajak.textContent =
                "Rp. " + numeral(pajakTemp).format("0,0.00");

            printPreview("fakturPajak");
        }
    }
}
// disini
function rpt_cetakNotaTunai(result) {
    if (result.length == 0) {
        Swal.fire({
            icon: "info",
            title: "Info!",
            text: "Data untuk id penagihan" + " " + idPenagihan.value + " " + "tidak ada atau salah pilih cetak Tunai!",
            showConfirmButton: true,
            // timer: 2000 
        });
        return;
    }
    if (idPenagihan.value.length > 14) {
        if (formatSelect.value == "2") {
            // print faktur3
            var faktur_beneficiary3 = document.getElementById(
                "faktur_beneficiary3"
            );
            faktur_beneficiary3.style.visibility = "hidden";
            var faktur_applicant3 =
                document.getElementById("faktur_applicant3");
            faktur_applicant3.style.visibility = "hidden";
            var faktur_emptyBag3 =
                document.getElementById("faktur_emptyBag3");
            faktur_emptyBag3.style.visibility = "hidden";

            var faktur_IdPenagihan3 = document.getElementById(
                "faktur_IdPenagihan3"
            );
            faktur_IdPenagihan3.style.fontWeight = "bold";
            // var faktur_AreaPPNThnIdFakturPajak =
            //     document.getElementById(
            //         "faktur_AreaPPNThnIdFakturPajak"
            //     );
            // faktur_AreaPPNThnIdFakturPajak.style.fontWeight = "bold";
            var faktur_NamaNPWP3 =
                document.getElementById("faktur_NamaNPWP3");
            faktur_NamaNPWP3.style.fontWeight = "bold";
            var faktur_AlamatNPWP3 =
                document.getElementById("faktur_AlamatNPWP3");
            var faktur_NPWP3 =
                document.getElementById("faktur_NPWP3");
            var faktur_NamaKelompokUtama3 = document.getElementById(
                "faktur_NamaKelompokUtama3"
            );
            var faktur_SymbolGrand3 = document.getElementById(
                "faktur_SymbolGrand3"
            );
            var faktur_Grand3 =
                document.getElementById("faktur_Grand3");
            var faktur_SymbolDiscount3 =
                document.getElementById("faktur_SymbolDiscount3");
            var faktur_Discount3 = document.getElementById("faktur_Discount3");
            var faktur_SymbolUM3 =
                document.getElementById("faktur_SymbolUM3");
            var faktur_UM3 = document.getElementById("faktur_UM3");
            var faktur_SymbolDPP3 =
                document.getElementById("faktur_SymbolDPP3");
            var faktur_DPP3 =
                document.getElementById("faktur_DPP3");
            var faktur_SymbolPajak3 = document.getElementById(
                "faktur_SymbolPajak3"
            );
            var faktur_Pajak3 =
                document.getElementById("faktur_Pajak3");
            var faktur_Terbilang3 =
                document.getElementById("faktur_Terbilang3");
            var faktur_SymbolTerbayar3 = document.getElementById(
                "faktur_SymbolTerbayar3"
            );
            var faktur_Terbayar3 =
                document.getElementById("faktur_Terbayar3");
            var faktur_SyaratBayar3 = document.getElementById(
                "faktur_SyaratBayar3"
            );
            var faktur_TglBln3 =
                document.getElementById("faktur_TglBln3");
            var faktur_Thn3 =
                document.getElementById("faktur_Thn3");
            var faktur_PersenPPN3 =
                document.getElementById("faktur_PersenPPN3");
            var faktur_PersenPPH3 =
                document.getElementById("faktur_PersenPPH3");
            var faktur_Tempo3 =
                document.getElementById("faktur_Tempo3");
            var faktur_SuratJalan3 =
                document.getElementById("faktur_SuratJalan3");
            var faktur_SJ3 = document.getElementById("faktur_SJ3");
            var bankBayar3 = document.getElementById("bankBayar3");
            var ttdPimpinan3 =
                document.getElementById("ttdPimpinan3");

            if (result.length === 0) {
                const elements = [
                    "faktur_IdPenagihan3",
                    // "faktur_AreaPPNThnIdFakturPajak3",
                    "faktur_NamaNPWP3",
                    "faktur_AlamatNPWP3",
                    "faktur_NPWP3",
                    "faktur_NamaKelompokUtama3",
                    "faktur_SymbolGrand3",
                    "faktur_Grand3",
                    "faktur_SymbolDiscount3",
                    "faktur_Discount3",
                    "faktur_SymbolUM3",
                    "faktur_UM3",
                    "faktur_SymbolDPP3",
                    "faktur_DPP3",
                    "faktur_SymbolPajak3",
                    "faktur_Pajak3",
                    "faktur_Terbilang3",
                    "faktur_SymbolTerbayar3",
                    "faktur_Terbayar3",
                    "faktur_SyaratBayar3",
                    "faktur_TglBln3",
                    "faktur_Thn3",
                    "faktur_PersenPPN3",
                    "faktur_Tempo3",
                    "faktur_SuratJalan3",
                    "faktur_SJ3",
                    "bankBayar3",
                    "ttdPimpinan3",
                ];

                elements.forEach((id) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.textContent = ""; // Set the value to empty string
                    }
                });

                // printPreview("faktur3");
            } else {
                if (bankSelect.value == "1") {
                    bankBayar3.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "BCA Cab. Galaxy - Surabaya" +
                        "<br>" +
                        "a/c. 788 010 1999 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "2") {
                    bankBayar3.innerHTML =
                        "Pembayaran melalui SCF ke Rekening:" +
                        "<br>" +
                        "BNI  Cabang Tropodo Sidoarjo" +
                        "<br>" +
                        "a/c. 6388888829 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "3") {
                    bankBayar3.innerHTML =
                        "Pembayaran melalui SCF ke Rekening:" +
                        "<br>" +
                        "Bank Mandiri  KCP Padang Indarung" +
                        "<br>" +
                        "a/c. 111 0007609759 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "4") {
                    bankBayar3.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank Mandiri  KCP Pondok Chandra Sidoarjo" +
                        "<br>" +
                        "a/c. 14200 5555 0007 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "5") {
                    bankBayar3.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                        "<br>" +
                        "a/c. 5578 0000 9333 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "6") {
                    faktur_beneficiary3.style.visibility =
                        "visible";
                    faktur_applicant3.style.visibility = "visible";
                    faktur_emptyBag3.style.visibility = "visible";
                    bankBayar3.innerHTML =
                        "TRADE TERM: " +
                        tradeTerm +
                        "<br>" +
                        "Documentary Credit Number: " +
                        dcn +
                        "<br>" +
                        "Date of Issue: " +
                        doi +
                        "<br>" +
                        "&nbsp;";
                } else if (bankSelect.value == "7") {
                    bankBayar3.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                        "<br>" +
                        "a/c. 5578 0000 9333 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else {
                    bankBayar3.innerHTML =
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;";
                }

                if (ttdSelect.value == "1") {
                    ttdPimpinan3.textContent = "TJAHYO SANTOSO";
                } else if (ttdSelect.value == "2") {
                    ttdPimpinan3.textContent = "RUDY SANTOSO";
                } else if (ttdSelect.value == "3") {
                    ttdPimpinan3.textContent = "YUDI SANTOSO";
                }

                faktur_IdPenagihan3.textContent =
                    decodeHtmlEntities(result[0].Id_Penagihan);

                if (bankSelect.value == "7") {
                    var date2 = isNaN(new Date(editDate).getTime())
                        ? new Date(result[0].Tgl_Penagihan)
                        : new Date(editDate);
                } else {
                    var date2 = new Date(result[0].Tgl_Penagihan);
                }
                // var date2 = new Date(result[0].Tgl_Penagihan);

                // var namaBulan = [
                //     "January",
                //     "February",
                //     "March",
                //     "April",
                //     "May",
                //     "June",
                //     "July",
                //     "August",
                //     "September",
                //     "October",
                //     "November",
                //     "December",
                // ];

                var namaBulan = [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                ];

                var tanggal = String(date2.getDate()).padStart(2, '0');
                var bulan = namaBulan[date2.getMonth()];
                var tahunLengkap = date2.getFullYear();
                var duaDigitTahun = tahunLengkap
                    .toString()
                    .slice(-2);
                // faktur_AreaPPNThnIdFakturPajak.textContent =
                //     decodeHtmlEntities(result[0].KdArea_Ppn) +
                //     " . 012 - " +
                //     duaDigitTahun +
                //     ". " +
                //     decodeHtmlEntities(result[0].IdFakturPajak);

                faktur_NamaNPWP3.textContent = decodeHtmlEntities(
                    result[0].NamaNPWP
                );
                faktur_AlamatNPWP3.textContent = decodeHtmlEntities(
                    result[0].AlamatNPWP
                );

                let npwp = result[0].NPWP;
                // let formattedNPWP =
                //     npwp.slice(0, 2) +
                //     " . " +
                //     npwp.slice(2, 5) +
                //     " . " +
                //     npwp.slice(5, 8) +
                //     " . " +
                //     npwp.slice(8, 9) +
                //     " - " +
                //     npwp.slice(9, 12) +
                //     " . " +
                //     npwp.slice(12, 15);
                faktur_NPWP3.textContent = npwp;

                // faktur_NamaKelompokUtama2.textContent =
                //     decodeHtmlEntities(result[0].NamaKelompokUtama);

                if (bankSelect.value == "6") {
                    faktur_NamaKelompokUtama3.innerHTML = "&nbsp;";
                } else {
                    faktur_NamaKelompokUtama3.textContent =
                        decodeHtmlEntities(
                            result[0].NAMATYPEBARANG
                        );
                }

                let totalGrand = 0;
                let count = 0;
                var faktur_Detail3 =
                    document.getElementById("faktur_Detail3");

                faktur_Detail3.innerHTML = "";
                console.log(result.length > 4);

                result.forEach(function (item, index) {
                    var row = document.createElement("div");
                    row.classList.add("row", "small-font");
                    count += 1;

                    // Tampilkan item kelima dan seterusnya
                    if (index >= 4) {
                        row.style.display = "none"; // Sembunyikan item sebelum yang kelima
                    }

                    var coaCol = document.createElement("div");
                    coaCol.classList.add(
                        "col-sm-1",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    coaCol.textContent = count;
                    row.appendChild(coaCol);

                    var accountCol = document.createElement("div");
                    accountCol.classList.add(
                        "col-sm-5",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    accountCol.textContent = item.NamaBarang
                        ? decodeHtmlEntities(item.NamaBarang)
                        : "";
                    row.appendChild(accountCol);

                    var descriptionCol =
                        document.createElement("div");
                    descriptionCol.classList.add(
                        "col-sm-2",
                        "text-right",
                        "small-normal"
                    );
                    descriptionCol.textContent = item.Qty
                        ? numeral(item.Qty).format("0,0.00") +
                        item.Satuan
                        : "";
                    row.appendChild(descriptionCol);

                    var amountCol = document.createElement("div");
                    amountCol.classList.add(
                        "col-sm-2",
                        "text-right",
                        "small-normal"
                    );

                    if (bankSelect.value == "6") {
                        amountCol.textContent = item.HargaSatuan
                            ? "IDR " +
                            numeral(item.HargaSatuan).format(
                                "0,0.00"
                            )
                            : "0.00";
                    } else {
                        amountCol.textContent = item.HargaSatuan
                            ? decodeHtmlEntities(item.Symbol2) +
                            numeral(item.HargaSatuan).format(
                                "0,0.00"
                            )
                            : "0.00";
                    }
                    row.appendChild(amountCol);

                    var totalCol = document.createElement("div");
                    totalCol.classList.add(
                        "col-sm-3",
                        "text-center",
                        "small-normal",
                        "description-right"
                    );
                    let tempTotal =
                        numeral(item.Qty).value() *
                        numeral(item.HargaSatuan).value();
                    totalCol.textContent = tempTotal
                        ? decodeHtmlEntities(item.Symbol2) +
                        numeral(tempTotal).format("0,0.00")
                        : decodeHtmlEntities(item.Symbol2) + "0.00";
                    row.appendChild(totalCol);

                    if (bankSelect.value == "6") {
                        totalCol.textContent = item.HargaSatuan
                            ? "IDR " +
                            numeral(tempTotal).format("0,0.00")
                            : "0.00";
                    } else {
                        totalCol.textContent = item.HargaSatuan
                            ? decodeHtmlEntities(item.Symbol2) +
                            numeral(tempTotal).format("0,0.00")
                            : "0.00";
                    }

                    row.appendChild(totalCol);
                    faktur_Detail3.appendChild(row);

                    totalGrand += numeral(tempTotal).value();

                    var additionalRow =
                        document.createElement("div");
                    additionalRow.classList.add(
                        "row",
                        "small-font"
                    );

                    if (index >= 4) {
                        additionalRow.style.display = "none";
                    }

                    var mantap = document.createElement("div");
                    mantap.classList.add(
                        "col-sm-1",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    additionalRow.appendChild(mantap);

                    var additionalCoaCol =
                        document.createElement("div");
                    additionalCoaCol.classList.add(
                        "col-sm-5",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    // additionalCoaCol.textContent = item.NO_PO
                    //     ? "PO : " + decodeHtmlEntities(item.NO_PO)
                    //     : "";
                    // additionalRow.appendChild(additionalCoaCol);

                    if (bankSelect.value == "6") {
                        additionalCoaCol.innerHTML = item.PO
                            ? "PO : " +
                            decodeHtmlEntities(item.PO) +
                            "<br>" +
                            "Jumlah Empty Bag yang dikirim: " +
                            decodeHtmlEntities(item.Jml) +
                            decodeHtmlEntities(item.Satuan)
                            : "";
                        additionalRow.appendChild(additionalCoaCol);
                    } else {
                        additionalCoaCol.textContent = item.PO
                            ? "PO : " +
                            decodeHtmlEntities(item.PO)
                            : "";
                        additionalRow.appendChild(additionalCoaCol);
                    }

                    faktur_Detail3.appendChild(additionalRow);
                });

                if (bankSelect.value == "6") {
                    faktur_SymbolGrand3.textContent = "IDR";
                    faktur_SymbolDiscount3.textContent = "IDR";
                    faktur_SymbolUM3.textContent = "IDR";
                    faktur_SymbolDPP3.textContent = "IDR";
                    faktur_SymbolPajak3.textContent = "IDR";
                    faktur_SymbolTerbayar3.textContent = "IDR";
                } else {
                    faktur_SymbolGrand3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolDiscount3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolUM3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolDPP3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolPajak3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolTerbayar3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                }

                faktur_Grand3.textContent =
                    numeral(totalGrand).format("0,0.00");

                faktur_Discount3.textContent = numeral(
                    result[0].Discount
                ).format("0,0.00");

                faktur_UM3.textContent = result[0].Nilai_UM
                    ? numeral(result[0].Nilai_UM).format("0,0.00")
                    : "0.00";

                let tempdpp =
                    numeral(totalGrand).value() -
                    numeral(result[0].Discount).value() -
                    numeral(result[0].Nilai_UM).value();
                if (duaDigitTahun > 24) {
                    faktur_DPP3.textContent = numeral(
                        (result[0].Nilai_blm_Pajak * 11) / 12
                    ).format("0,0.00");
                } else {
                    faktur_DPP3.textContent = numeral(tempdpp).format("0,0.00");
                }

                let tempPajak =
                    Math.round(
                        ((tempdpp * numeral(result[0].PersenPPN).value()) / 100) *
                        100
                    ) / 100;

                if (duaDigitTahun > 24) {
                    faktur_Pajak3.textContent = numeral(
                        ((tempdpp * 11) / 12) * 0.12
                    ).format("0,0.00");
                } else {
                    faktur_Pajak3.textContent =
                        numeral(tempPajak).format("0,0.00");
                }
                asasasa
                if (duaDigitTahun > 24) {
                    let terbayar =
                        numeral(tempdpp).value() +
                        numeral(faktur_Pajak3.textContent).value();
                    faktur_Terbayar3.textContent =
                        numeral(terbayar).format("0,0.00");
                    TTerbilang = convertNumberToWordsRupiah(
                        numeral(faktur_Terbayar3.textContent).value()
                    );
                    faktur_Terbilang3.innerHTML =
                        "&emsp;" + decodeHtmlEntities(TTerbilang);
                } else {
                    let terbayar =
                        numeral(tempdpp).value() + numeral(tempPajak).value();
                    faktur_Terbayar3.textContent =
                        numeral(terbayar).format("0,0.00");
                    faktur_Terbilang3.textContent = decodeHtmlEntities(
                        result[0].Terbilang
                    );
                }

                if (bankSelect.value == "7") {
                    faktur_SyaratBayar3.innerHTML = "&nbsp;";
                } else {
                    faktur_SyaratBayar3.innerHTML =
                        "Syarat Pembayaran: &emsp;" +
                        decodeHtmlEntities(result[0].SyaratBayar) +
                        " Hari";
                }

                faktur_TglBln3.textContent = tanggal + "-" + bulan + "-20" + duaDigitTahun;
                // faktur_Thn3.textContent = " / 20" + duaDigitTahun;
                if (
                    result[0].NamaNPWP ==
                    "PT. BLOOM TRADING INDONESIA"
                ) {
                    faktur_PersenPPN3.innerHTML =
                        "<strong></strong>";
                } else if (duaDigitTahun > 24) {
                    faktur_PersenPPN3.innerHTML =
                        "<strong>12%</strong>";
                } else {
                    faktur_PersenPPN3.innerHTML =
                        "<strong>11%</strong>";
                }

                let persen = result[0].PersenPPH;
                if (persen == null) {
                    faktur_PersenPPH3.innerHTML = "<strong></strong>";
                } else {
                    faktur_PersenPPH3.innerHTML = "<strong>" + persen + "%</strong>";
                }

                let syaratBayar = result[0].SyaratBayar;
                let tglTerimaBarang = result[0].Tgl_Penagihan;
                let syaratBayarNumber = Number(syaratBayar);
                let date3 = new Date(tglTerimaBarang);
                let resultDate = new Date(date3);
                resultDate.setDate(
                    date3.getDate() + syaratBayarNumber
                );

                if (bankSelect.value == "7") {
                    faktur_Tempo3.innerHTML = "&nbsp;";
                    faktur_SuratJalan3.innerHTML = "&nbsp;";
                    faktur_SJ3.innerHTML = "&nbsp;";
                } else {
                    faktur_Tempo3.innerHTML =
                        "Jatuh Tempo: &emsp;" +
                        formatDateToMMDDYYYY(resultDate);

                    faktur_SuratJalan3.innerHTML = "Surat Jalan: &emsp;&emsp; ";
                    faktur_SJ3.textContent = "";

                    // if (sFormula0.length > 255) {
                    //     faktur_SuratJalan3.innerHTML =
                    //         "Surat Jalan: &emsp;" +
                    //         sFormula0.slice(0, 252);
                    //     faktur_SJ3.textContent =
                    //         sFormula0.slice(252);
                    // } else {
                    //     faktur_SuratJalan3.innerHTML =
                    //         "Surat Jalan: &emsp;" + sFormula0;
                    //     faktur_SJ3.textContent = "";
                    // }
                }

                printPreview("faktur3");
            }
        } else {
            var fakturTunai_IdPenagihan = document.getElementById(
                "fakturTunai_IdPenagihan"
            );
            fakturTunai_IdPenagihan.style.fontWeight = "bold";
            // var fakturTunai_AreaPPNThnIdFakturPajak =
            //     document.getElementById(
            //         "fakturTunai_AreaPPNThnIdFakturPajak"
            //     );
            // fakturTunai_AreaPPNThnIdFakturPajak.style.fontWeight = "bold";
            var fakturTunai_NamaNPWP = document.getElementById(
                "fakturTunai_NamaNPWP"
            );
            fakturTunai_NamaNPWP.style.fontWeight = "bold";
            var fakturTunai_AlamatNPWP = document.getElementById(
                "fakturTunai_AlamatNPWP"
            );
            var fakturTunai_NPWP = document.getElementById("fakturTunai_NPWP");
            var fakturTunai_NamaKelompokUtama = document.getElementById(
                "fakturTunai_NamaKelompokUtama"
            );
            var fakturTunai_SymbolGrand = document.getElementById(
                "fakturTunai_SymbolGrand"
            );
            var fakturTunai_Grand = document.getElementById("fakturTunai_Grand");
            var fakturTunai_SymbolDiscount = document.getElementById(
                "fakturTunai_SymbolDiscount"
            );
            var fakturTunai_Discount = document.getElementById(
                "fakturTunai_Discount"
            );
            var fakturTunai_SymbolUM = document.getElementById(
                "fakturTunai_SymbolUM"
            );
            var fakturTunai_UM = document.getElementById("fakturTunai_UM");
            var fakturTunai_SymbolDPP = document.getElementById(
                "fakturTunai_SymbolDPP"
            );
            var fakturTunai_DPP = document.getElementById("fakturTunai_DPP");
            var fakturTunai_SymbolPajak = document.getElementById(
                "fakturTunai_SymbolPajak"
            );
            var fakturTunai_Pajak = document.getElementById("fakturTunai_Pajak");
            var fakturTunai_Terbilang = document.getElementById(
                "fakturTunai_Terbilang"
            );
            var fakturTunai_SymbolTerbayar = document.getElementById(
                "fakturTunai_SymbolTerbayar"
            );
            var fakturTunai_Terbayar = document.getElementById(
                "fakturTunai_Terbayar"
            );
            var fakturTunai_SyaratBayar = document.getElementById(
                "fakturTunai_SyaratBayar"
            );
            var fakturTunai_TglBln = document.getElementById("fakturTunai_TglBln");
            var fakturTunai_Thn = document.getElementById("fakturTunai_Thn");
            var fakturTunai_PersenPPN = document.getElementById(
                "fakturTunai_PersenPPN"
            );
            var fakturTunai_Tempo = document.getElementById("fakturTunai_Tempo");
            var fakturTunai_SuratJalan = document.getElementById(
                "fakturTunai_SuratJalan"
            );
            var fakturTunai_SJ = document.getElementById("fakturTunai_SJ");
            var bankBayarTunai = document.getElementById("bankBayarTunai");
            var ttdPimpinanTunai = document.getElementById("ttdPimpinanTunai");

            if (result.length === 0) {
                const elements = [
                    "fakturTunai_IdPenagihan",
                    // "fakturTunai_AreaPPNThnIdFakturPajak",
                    "fakturTunai_NamaNPWP",
                    "fakturTunai_AlamatNPWP",
                    "fakturTunai_NPWP",
                    "fakturTunai_NamaKelompokUtama",
                    "fakturTunai_SymbolGrand",
                    "fakturTunai_Grand",
                    "fakturTunai_SymbolDiscount",
                    "fakturTunai_Discount",
                    "fakturTunai_SymbolUM",
                    "fakturTunai_UM",
                    "fakturTunai_SymbolDPP",
                    "fakturTunai_DPP",
                    "fakturTunai_SymbolPajak",
                    "fakturTunai_Pajak",
                    "fakturTunai_Terbilang",
                    "fakturTunai_SymbolTerbayar",
                    "fakturTunai_Terbayar",
                    "fakturTunai_SyaratBayar",
                    "fakturTunai_TglBln",
                    "fakturTunai_Thn",
                    "fakturTunai_PersenPPN",
                    "fakturTunai_Tempo",
                    "fakturTunai_SuratJalan",
                    "fakturTunai_SJ",
                    "bankBayarTunai",
                    "ttdPimpinanTunai",
                ];

                elements.forEach((id) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.textContent = ""; // Set the value to empty string
                    }
                });

                printPreview("fakturTunai");
            } else {
                if (bankSelect.value == "1") {
                    bankBayarTunai.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "BCA Cab. Galaxy - Surabaya" +
                        "<br>" +
                        "a/c. 788 010 1999 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "2") {
                    bankBayarTunai.innerHTML =
                        "Pembayaran melalui SCF ke Rekening:" +
                        "<br>" +
                        "BNI  Cabang Tropodo Sidoarjo" +
                        "<br>" +
                        "a/c. 6388888829 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "3") {
                    bankBayarTunai.innerHTML =
                        "Pembayaran melalui SCF ke Rekening:" +
                        "<br>" +
                        "Bank Mandiri  KCP Padang Indarung" +
                        "<br>" +
                        "a/c. 111 0007609759 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "4") {
                    bankBayarTunai.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank Mandiri  KCP Pondok Chandra Sidoarjo" +
                        "<br>" +
                        "a/c. 14200 5555 0007 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "5") {
                    bankBayarTunai.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                        "<br>" +
                        "a/c. 5578 0000 9333 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else {
                    bankBayarTunai.innerHTML =
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;";
                }

                if (ttdSelect.value == "1") {
                    ttdPimpinanTunai.textContent = "TJAHYO SANTOSO";
                } else if (ttdSelect.value == "2") {
                    ttdPimpinanTunai.textContent = "RUDY SANTOSO";
                } else if (ttdSelect.value == "3") {
                    ttdPimpinanTunai.textContent = "YUDI SANTOSO";
                }

                fakturTunai_IdPenagihan.textContent = decodeHtmlEntities(
                    result[0].Id_Penagihan
                );

                var date2 = new Date(result[0].Tgl_Penagihan);

                var namaBulan = [
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desember",
                ];

                var tanggal = date2.getDate();
                var bulan = namaBulan[date2.getMonth()];
                var tahunLengkap = date2.getFullYear();
                var duaDigitTahun = tahunLengkap.toString().slice(-2);
                // faktur_AreaPPNThnIdFakturPajak.textContent =
                //     decodeHtmlEntities(result[0].KdArea_Ppn) +
                //     " . 012 - " +
                //     duaDigitTahun +
                //     ". " +
                //     decodeHtmlEntities(result[0].IdFakturPajak);

                fakturTunai_NamaNPWP.textContent = decodeHtmlEntities(
                    result[0].NamaNPWP
                );
                fakturTunai_AlamatNPWP.textContent = decodeHtmlEntities(
                    result[0].AlamatNPWP
                );

                let npwp = result[0].NPWP;
                // let formattedNPWP =
                //     npwp.slice(0, 2) +
                //     " . " +
                //     npwp.slice(2, 5) +
                //     " . " +
                //     npwp.slice(5, 8) +
                //     " . " +
                //     npwp.slice(8, 9) +
                //     " - " +
                //     npwp.slice(9, 12) +
                //     " . " +
                //     npwp.slice(12, 15);
                fakturTunai_NPWP.textContent = npwp;

                fakturTunai_NamaKelompokUtama.textContent = decodeHtmlEntities(
                    result[0].NAMATYPEBARANG
                );

                let totalGrand = 0;
                let count = 0;
                var fakturTunai_Detail =
                    document.getElementById("fakturTunai_Detail");

                fakturTunai_Detail.innerHTML = "";
                console.log(result);

                result.forEach(function (item, index) {
                    console.log(item);

                    var row = document.createElement("div");
                    row.classList.add("row", "small-font");
                    count += 1;

                    var coaCol = document.createElement("div");
                    coaCol.classList.add(
                        "col-sm-1",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    coaCol.textContent = count;
                    row.appendChild(coaCol);

                    var accountCol = document.createElement("div");
                    accountCol.classList.add(
                        "col-sm-5",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    console.log(item);

                    accountCol.textContent = item.NamaBarang
                        ? decodeHtmlEntities(item.NamaBarang)
                        : "";
                    row.appendChild(accountCol);

                    var descriptionCol = document.createElement("div");
                    descriptionCol.classList.add(
                        "col-sm-2",
                        "text-right",
                        "small-normal"
                    );
                    descriptionCol.textContent = item.Qty
                        ? numeral(item.Qty).format("0,0.00") + item.Satuan
                        : "";
                    row.appendChild(descriptionCol);

                    var amountCol = document.createElement("div");
                    amountCol.classList.add(
                        "col-sm-2",
                        "text-right",
                        "small-normal"
                    );
                    amountCol.textContent = item.HargaSatuan
                        ? decodeHtmlEntities(item.Symbol2) +
                        numeral(item.HargaSatuan).format("0,0.00")
                        : "0.00";
                    row.appendChild(amountCol);

                    var totalCol = document.createElement("div");
                    totalCol.classList.add(
                        "col-sm-3",
                        "text-center",
                        "small-normal",
                        "description-right"
                    );
                    // let tempTotal =
                    //     numeral(0).value() *
                    //     numeral(0).value();
                    // totalCol.textContent = 0
                    //     ? decodeHtmlEntities(item.Symbol2) +
                    //       numeral(0).format("0,0.00")
                    //     : "0.00";
                    // row.appendChild(totalCol);
                    let tempTotal =
                        numeral(item.Qty).value() *
                        numeral(item.HargaSatuan).value();
                    totalCol.textContent = tempTotal
                        ? decodeHtmlEntities(item.Symbol2) +
                        numeral(tempTotal).format("0,0.00")
                        : decodeHtmlEntities(item.Symbol2) + "0.00";
                    row.appendChild(totalCol);

                    fakturTunai_Detail.appendChild(row);

                    totalGrand += numeral(tempTotal).value();

                    var additionalRow = document.createElement("div");
                    additionalRow.classList.add("row", "small-font");

                    var mantap = document.createElement("div");
                    mantap.classList.add(
                        "col-sm-1",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    additionalRow.appendChild(mantap);

                    var additionalCoaCol = document.createElement("div");
                    additionalCoaCol.classList.add(
                        "col-sm-5",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    additionalCoaCol.textContent =
                        "PO :" + " " + item.PO
                            ? "PO :" + " " + decodeHtmlEntities(item.PO)
                            : "";
                    additionalRow.appendChild(additionalCoaCol);

                    // var additionalAccountCol =
                    //     document.createElement("div");
                    // additionalAccountCol.classList.add(
                    //     "col-sm-10",
                    //     "text-left",
                    //     "small-font"
                    // );
                    // additionalAccountCol.textContent = item.NO_PO
                    //     ? decodeHtmlEntities(item.NO_PO)
                    //     : "";
                    // additionalRow.appendChild(additionalAccountCol);

                    fakturTunai_Detail.appendChild(additionalRow);
                });

                fakturTunai_SymbolGrand.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturTunai_SymbolDiscount.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturTunai_SymbolUM.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturTunai_SymbolDPP.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturTunai_SymbolPajak.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturTunai_SymbolTerbayar.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );

                fakturTunai_Grand.textContent =
                    numeral(totalGrand).format("0,0.00");

                fakturTunai_Discount.textContent = numeral(
                    result[0].Discount
                ).format("0,0.00");

                fakturTunai_UM.textContent = result[0].Nilai_UM
                    ? numeral(result[0].Nilai_UM).format("0,0.00")
                    : "0.00";

                let tempdpp =
                    numeral(totalGrand).value() -
                    numeral(result[0].Discount).value() -
                    numeral(result[0].Nilai_UM).value();
                if (duaDigitTahun > 24) {
                    fakturTunai_DPP.textContent = numeral(
                        (result[0].Nilai_blm_Pajak * 11) / 12
                    ).format("0,0.00");
                } else {
                    fakturTunai_DPP.textContent = numeral(tempdpp).format("0,0.00");
                }

                let tempPajak =
                    Math.round(
                        ((tempdpp * numeral(result[0].PersenPPN).value()) / 100) *
                        100
                    ) / 100;

                if (duaDigitTahun > 24) {
                    fakturTunai_Pajak.textContent = numeral(
                        ((tempdpp * 11) / 12) * 0.12
                    ).format("0,0.00");
                } else {
                    fakturTunai_Pajak.textContent =
                        numeral(tempPajak).format("0,0.00");
                }

                if (duaDigitTahun > 24) {
                    let terbayar =
                        numeral(tempdpp).value() +
                        numeral(fakturTunai_Pajak.textContent).value();
                    fakturTunai_Terbayar.textContent =
                        numeral(terbayar).format("0,0.00");
                    TTerbilang = convertNumberToWordsRupiah(
                        numeral(fakturTunai_Terbayar.textContent).value()
                    );
                    fakturTunai_Terbilang.innerHTML =
                        "&emsp;" + decodeHtmlEntities(TTerbilang);
                } else {
                    let terbayar =
                        numeral(tempdpp).value() + numeral(tempPajak).value();
                    fakturTunai_Terbayar.textContent =
                        numeral(terbayar).format("0,0.00");
                    fakturTunai_Terbilang.textContent = decodeHtmlEntities(
                        result[0].Terbilang
                    );
                }

                fakturTunai_SyaratBayar.innerHTML =
                    "Syarat Pembayaran: &emsp;&emsp;" +
                    decodeHtmlEntities(result[0].SyaratBayar) +
                    " Hari";

                fakturTunai_TglBln.textContent = tanggal + " " + bulan;
                fakturTunai_Thn.textContent = duaDigitTahun;
                if (duaDigitTahun > 24) {
                    fakturTunai_PersenPPN.innerHTML = "<strong>12%</strong>";
                } else {
                    fakturTunai_PersenPPN.innerHTML = "<strong>11%</strong>";
                }

                let syaratBayar = result[0].SyaratBayar;
                let tglTerimaBarang = result[0].Tgl_Penagihan;
                let syaratBayarNumber = Number(syaratBayar);
                let date3 = new Date(tglTerimaBarang);
                let resultDate = new Date(date3);
                resultDate.setDate(date3.getDate() + syaratBayarNumber);
                fakturTunai_Tempo.innerHTML =
                    "Jatuh Tempo: &emsp;&emsp; " + formatDateToMMDDYYYY(resultDate);

                // if (sFormula0.length > 255) {
                //   faktur_SuratJalan.innerHTML =
                //     "Surat Jalan: &emsp;&emsp; " + sFormula0.slice(0, 252);
                //   faktur_SJ.textContent = sFormula0.slice(252);
                // } else {
                //   faktur_SuratJalan.innerHTML = "Surat Jalan: &emsp;&emsp; " + sFormula0;
                //   faktur_SJ.textContent = "";
                // }

                printPreview("fakturTunai");
            }
        }
    } else {
        // Declaring variables for each element by their id
        var nota1_IdPenagihan = document.getElementById("nota1_IdPenagihan");
        var nota1_NamaCust = document.getElementById("nota1_NamaCust");
        var nota1_Alamat = document.getElementById("nota1_Alamat");
        var nota1_NamaTypeBarang = document.getElementById(
            "nota1_NamaTypeBarang"
        );
        var nota1_Detail = document.getElementById("nota1_Detail");
        var nota1_Terbilang = document.getElementById("nota1_Terbilang");
        var nota1_SymbolTerbayar = document.getElementById(
            "nota1_SymbolTerbayar"
        );
        var nota1_Terbayar = document.getElementById("nota1_Terbayar");
        var nota1_TglBln = document.getElementById("nota1_TglBln");
        var nota1_Thn = document.getElementById("nota1_Thn");

        if (result.length === 0) {
            const elements = [
                "nota1_IdPenagihan",
                "nota1_NamaCust",
                "nota1_Alamat",
                "nota1_NamaTypeBarang",
                "nota1_Detail",
                "nota1_Terbilang",
                "nota1_SymbolTerbayar",
                "nota1_Terbayar",
                "nota1_TglBln",
                "nota1_Thn",
            ];

            elements.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = ""; // Set text content to an empty string
                }
            });

            printPreview("nota1");
        } else {
            nota1_IdPenagihan.textContent = decodeHtmlEntities(
                result[0].Id_Penagihan
            );
            nota1_NamaCust.textContent = decodeHtmlEntities(result[0].NamaCust);
            nota1_Alamat.textContent = decodeHtmlEntities(result[0].Alamat);

            nota1_NamaTypeBarang.textContent = decodeHtmlEntities(
                result[0].NAMATYPEBARANG
            );

            let totalGrand = 0;
            let count = 0;
            var nota1_Detail = document.getElementById("nota1_Detail");

            nota1_Detail.innerHTML = "";
            result.forEach(function (item, index) {
                var row = document.createElement("div");
                row.classList.add("row");
                count += 1;

                var coaCol = document.createElement("div");
                coaCol.classList.add("col-sm-1", "text-right");
                coaCol.textContent = count;
                row.appendChild(coaCol);

                var accountCol = document.createElement("div");
                accountCol.classList.add("col-sm-5", "text-left");
                accountCol.textContent = item.NamaBarang
                    ? decodeHtmlEntities(item.NamaBarang)
                    : "";
                row.appendChild(accountCol);

                var accountCol = document.createElement("div");
                accountCol.classList.add("col-sm-2", "text-right");
                accountCol.textContent =
                    numeral(item.Qty).format("0,0.00") +
                    decodeHtmlEntities(item.Satuan);
                row.appendChild(accountCol);

                var accountCol = document.createElement("div");
                accountCol.classList.add("col-sm-2", "text-right");
                accountCol.textContent =
                    decodeHtmlEntities(item.Symbol2) +
                    numeral(item.HargaSatuan).format("0,0.00");
                row.appendChild(accountCol);

                var totalCol = document.createElement("div");
                totalCol.classList.add("col-sm-2", "text-right");
                let tempTotal =
                    numeral(item.Qty).value() *
                    numeral(item.HargaSatuan).value();
                totalCol.textContent = tempTotal
                    ? decodeHtmlEntities(item.Symbol2) +
                    numeral(tempTotal).format("0,0.00")
                    : decodeHtmlEntities(item.Symbol2) + "0.00";
                row.appendChild(totalCol);

                nota1_Detail.appendChild(row);

                totalGrand += numeral(tempTotal).value();
            });

            nota1_Terbilang.textContent = decodeHtmlEntities(
                result[0].Terbilang
            );
            nota1_SymbolTerbayar.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );
            nota1_Terbayar.textContent = numeral(totalGrand).format("0,0.00");

            var tanggal = date2.getDate();
            var bulan = namaBulan[date2.getMonth()];
            var tahunLengkap = date2.getFullYear();
            var duaDigitTahun = tahunLengkap.toString().slice(-2);

            nota1_TglBln.textContent = tanggal + " " + bulan;
            nota1_Thn.textContent = duaDigitTahun;

            printPreview("nota1");
        }
    }
}

function rpt_CetakFakturPajakTunai(result) {
    if (parseInt(sIdMataUang) === 1) {
        // Declaring variables for each element by their id
        var fakturPajakTunai_AreaPPNThnIdFakturPajak = document.getElementById(
            "fakturPajakTunai_AreaPPNThnIdFakturPajak"
        );
        var fakturPajakTunai_NamaNPWP = document.getElementById(
            "fakturPajakTunai_NamaNPWP"
        );
        var fakturPajakTunai_AlamatNPWP = document.getElementById(
            "fakturPajakTunai_AlamatNPWP"
        );
        var fakturPajakTunai_NPWP = document.getElementById(
            "fakturPajakTunai_NPWP"
        );
        var fakturPajakTunai_NamaKelompokUtama = document.getElementById(
            "fakturPajakTunai_NamaKelompokUtama"
        );
        var fakturPajakTunai_Detail = document.getElementById(
            "fakturPajakTunai_Detail"
        );
        var fakturPajakTunai_Grand = document.getElementById(
            "fakturPajakTunai_Grand"
        );
        var fakturPajakTunai_SymbolDiscount = document.getElementById(
            "fakturPajakTunai_SymbolDiscount"
        );
        var fakturPajakTunai_Discount = document.getElementById(
            "fakturPajakTunai_Discount"
        );
        var fakturPajakTunai_SymbolDPP = document.getElementById(
            "fakturPajakTunai_SymbolDPP"
        );
        var fakturPajakTunai_DPP = document.getElementById(
            "fakturPajakTunai_DPP"
        );
        var fakturPajakTunai_SymbolPajak = document.getElementById(
            "fakturPajakTunai_SymbolPajak"
        );
        var fakturPajakTunai_Pajak = document.getElementById(
            "fakturPajakTunai_Pajak"
        );
        var fakturPajakTunai_TglBln = document.getElementById(
            "fakturPajakTunai_TglBln"
        );
        var fakturPajakTunai_Thn = document.getElementById(
            "fakturPajakTunai_Thn"
        );

        if (result.length === 0) {
            const elements = [
                "fakturPajakTunai_AreaPPNThnIdFakturPajak",
                "fakturPajakTunai_NamaNPWP",
                "fakturPajakTunai_AlamatNPWP",
                "fakturPajakTunai_NPWP",
                "fakturPajakTunai_NPWP2",
                "fakturPajakTunai_NamaKelompokUtama",
                "fakturPajakTunai_Detail",
                "fakturPajakTunai_SymbolGrand",
                "fakturPajakTunai_Grand",
                "fakturPajakTunai_SymbolDiscount",
                "fakturPajakTunai_Discount",
                "fakturPajakTunai_SymbolUM",
                "fakturPajakTunai_UM",
                "fakturPajakTunai_SymbolGrandTot",
                "fakturPajakTunai_GrandTot",
                "fakturPajakTunai_TotalRupiah",
                "fakturPajakTunai_Pajak",
                "fakturPajakTunai_TglBln",
                "fakturPajakTunai_Thn",
                "fakturPajakTunai_Kurs",
            ];

            elements.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = ""; // Set text content to an empty string
                }
            });
            printPreview("fakturPajakTunai");
        } else {
            var date2 = new Date(result[0].Tgl_Penagihan);

            var namaBulan = [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ];

            var tanggal = date2.getDate();
            var bulan = namaBulan[date2.getMonth()];
            var tahunLengkap = date2.getFullYear();
            var duaDigitTahun = tahunLengkap.toString().slice(-2);

            fakturPajakTunai_AreaPPNThnIdFakturPajak.textContent =
                decodeHtmlEntities(result[0].KdArea_Ppn) +
                " . 000 - 07 . " +
                decodeHtmlEntities(result[0].IdFakturPajak);

            fakturPajakTunai_NamaNPWP.textContent = decodeHtmlEntities(
                result[0].NamaNPWP
            );
            fakturPajakTunai_AlamatNPWP.textContent = decodeHtmlEntities(
                result[0].AlamatNPWP
            );

            let npwp = result[0].NPWP;
            let formattedNPWP =
                npwp.slice(0, 2) +
                " . " +
                npwp.slice(2, 5) +
                " . " +
                npwp.slice(5, 8) +
                " . " +
                npwp.slice(8, 9) +
                " - " +
                npwp.slice(9, 12) +
                " . " +
                npwp.slice(12, 15);
            fakturPajakTunai_NPWP.textContent = formattedNPWP;

            fakturPajakTunai_NamaKelompokUtama.textContent = "";

            let totalGrand = 0;
            let count = 0;
            var fakturPajakTunai_Detail = document.getElementById(
                "fakturPajakTunai_Detail"
            );

            fakturPajakTunai_Detail.innerHTML = "";

            result.forEach(function (item, index) {
                var additionalRow = document.createElement("div");
                additionalRow.classList.add("row");

                var mantap = document.createElement("div");
                mantap.classList.add("col-sm-1", "text-right");
                additionalRow.appendChild(mantap);

                var additionalAccountCol = document.createElement("div");
                additionalAccountCol.classList.add("col-sm-10", "text-left");
                additionalAccountCol.innerHTML = item.NAMATYPEBARANG
                    ? '<span style="font-weight: bold; text-decoration: underline;">' +
                    decodeHtmlEntities(item.NAMATYPEBARANG) +
                    "</span>"
                    : "";
                additionalRow.appendChild(additionalAccountCol);

                fakturPajakTunai_Detail.appendChild(additionalRow);

                var row = document.createElement("div");
                row.classList.add("row");
                count += 1;

                var coaCol = document.createElement("div");
                coaCol.classList.add("col-sm-1", "text-right");
                coaCol.textContent = count;
                row.appendChild(coaCol);

                var accountCol = document.createElement("div");
                accountCol.classList.add("col-sm-9", "text-left");
                accountCol.textContent = item.NamaBarang
                    ? decodeHtmlEntities(item.NamaBarang)
                    : "";
                row.appendChild(accountCol);

                var totalCol = document.createElement("div");
                totalCol.classList.add("col-sm-2", "text-right");
                let tempTotal =
                    numeral(item.Qty).value() *
                    numeral(item.HargaSatuan).value();
                totalCol.textContent = tempTotal
                    ? decodeHtmlEntities(item.Symbol2) +
                    numeral(tempTotal).format("0,0.00")
                    : "0.00";
                row.appendChild(totalCol);

                fakturPajakTunai_Detail.appendChild(row);

                totalGrand += numeral(tempTotal).value();
            });

            fakturPajakTunai_Grand.textContent =
                numeral(totalGrand).format("0,0.00");
            fakturPajakTunai_Discount.textContent = numeral(
                result[0].Discount
            ).format("0,0.00");

            let tempDPP =
                numeral(fakturPajakTunai_Grand.textContent).value() -
                numeral(fakturPajakTunai_Discount.textContent).value();
            fakturPajakTunai_DPP.textContent =
                numeral(tempDPP).format("0,0.00");

            let tempPajak = numeral(tempDPP).value() * 0.1;
            fakturPajakTunai_Pajak.textContent =
                numeral(tempPajak).format("0,0.00");

            fakturPajakTunai_SymbolDiscount.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );
            fakturPajakTunai_SymbolDPP.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );
            fakturPajakTunai_SymbolPajak.textContent = decodeHtmlEntities(
                result[0].Symbol2
            );

            fakturPajakTunai_TglBln.textContent = tanggal + " " + bulan;
            fakturPajakTunai_Thn.textContent = duaDigitTahun;

            printPreview("fakturPajakTunai");
        }
    }
}

function rpt_CetakFakturUM(result) {
    if (result.length == 0) {
        Swal.fire({
            icon: "info",
            title: "Info!",
            text: "Data untuk id penagihan" + " " + idPenagihan.value + " " + "tidak ada atau salah pilih cetak Faktur Uang Muka!",
            showConfirmButton: true,
            // timer: 2000 
        });
        return;
    }

    if (idPenagihan.value.length > 14) {
        if (formatSelect.value == "2") {
            // print faktur3
            var faktur_beneficiary3 = document.getElementById(
                "faktur_beneficiary3"
            );
            faktur_beneficiary3.style.visibility = "hidden";
            var faktur_applicant3 =
                document.getElementById("faktur_applicant3");
            faktur_applicant3.style.visibility = "hidden";
            var faktur_emptyBag3 =
                document.getElementById("faktur_emptyBag3");
            faktur_emptyBag3.style.visibility = "hidden";

            var faktur_IdPenagihan3 = document.getElementById(
                "faktur_IdPenagihan3"
            );
            faktur_IdPenagihan3.style.fontWeight = "bold";
            // var faktur_AreaPPNThnIdFakturPajak =
            //     document.getElementById(
            //         "faktur_AreaPPNThnIdFakturPajak"
            //     );
            // faktur_AreaPPNThnIdFakturPajak.style.fontWeight = "bold";
            var faktur_NamaNPWP3 =
                document.getElementById("faktur_NamaNPWP3");
            faktur_NamaNPWP3.style.fontWeight = "bold";
            var faktur_AlamatNPWP3 =
                document.getElementById("faktur_AlamatNPWP3");
            var faktur_NPWP3 =
                document.getElementById("faktur_NPWP3");
            var faktur_NamaKelompokUtama3 = document.getElementById(
                "faktur_NamaKelompokUtama3"
            );
            var faktur_SymbolGrand3 = document.getElementById(
                "faktur_SymbolGrand3"
            );
            var faktur_Grand3 =
                document.getElementById("faktur_Grand3");
            var faktur_SymbolDiscount3 =
                document.getElementById("faktur_SymbolDiscount3");
            var faktur_Discount3 = document.getElementById("faktur_Discount3");
            var faktur_SymbolUM3 =
                document.getElementById("faktur_SymbolUM3");
            var faktur_UM3 = document.getElementById("faktur_UM3");
            var faktur_SymbolDPP3 =
                document.getElementById("faktur_SymbolDPP3");
            var faktur_DPP3 =
                document.getElementById("faktur_DPP3");
            var faktur_SymbolPajak3 = document.getElementById(
                "faktur_SymbolPajak3"
            );
            var faktur_Pajak3 =
                document.getElementById("faktur_Pajak3");
            var faktur_Terbilang3 =
                document.getElementById("faktur_Terbilang3");
            var faktur_SymbolTerbayar3 = document.getElementById(
                "faktur_SymbolTerbayar3"
            );
            var faktur_Terbayar3 =
                document.getElementById("faktur_Terbayar3");
            var faktur_SyaratBayar3 = document.getElementById(
                "faktur_SyaratBayar3"
            );
            var faktur_TglBln3 =
                document.getElementById("faktur_TglBln3");
            var faktur_Thn3 =
                document.getElementById("faktur_Thn3");
            var faktur_PersenPPN3 =
                document.getElementById("faktur_PersenPPN3");
            var faktur_Tempo3 =
                document.getElementById("faktur_Tempo3");
            var faktur_SuratJalan3 =
                document.getElementById("faktur_SuratJalan3");
            var faktur_SJ3 = document.getElementById("faktur_SJ3");
            var bankBayar3 = document.getElementById("bankBayar3");
            var ttdPimpinan3 =
                document.getElementById("ttdPimpinan3");

            if (result.length === 0) {
                const elements = [
                    "faktur_IdPenagihan3",
                    // "faktur_AreaPPNThnIdFakturPajak3",
                    "faktur_NamaNPWP3",
                    "faktur_AlamatNPWP3",
                    "faktur_NPWP3",
                    "faktur_NamaKelompokUtama3",
                    "faktur_SymbolGrand3",
                    "faktur_Grand3",
                    "faktur_SymbolDiscount3",
                    "faktur_Discount3",
                    "faktur_SymbolUM3",
                    "faktur_UM3",
                    "faktur_SymbolDPP3",
                    "faktur_DPP3",
                    "faktur_SymbolPajak3",
                    "faktur_Pajak3",
                    "faktur_Terbilang3",
                    "faktur_SymbolTerbayar3",
                    "faktur_Terbayar3",
                    "faktur_SyaratBayar3",
                    "faktur_TglBln3",
                    "faktur_Thn3",
                    "faktur_PersenPPN3",
                    "faktur_Tempo3",
                    "faktur_SuratJalan3",
                    "faktur_SJ3",
                    "bankBayar3",
                    "ttdPimpinan3",
                ];

                elements.forEach((id) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.textContent = ""; // Set the value to empty string
                    }
                });

                // printPreview("faktur3");
            } else {
                if (bankSelect.value == "1") {
                    bankBayar3.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "BCA Cab. Galaxy - Surabaya" +
                        "<br>" +
                        "a/c. 788 010 1999 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "2") {
                    bankBayar3.innerHTML =
                        "Pembayaran melalui SCF ke Rekening:" +
                        "<br>" +
                        "BNI  Cabang Tropodo Sidoarjo" +
                        "<br>" +
                        "a/c. 6388888829 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "3") {
                    bankBayar3.innerHTML =
                        "Pembayaran melalui SCF ke Rekening:" +
                        "<br>" +
                        "Bank Mandiri  KCP Padang Indarung" +
                        "<br>" +
                        "a/c. 111 0007609759 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "4") {
                    bankBayar3.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank Mandiri  KCP Pondok Chandra Sidoarjo" +
                        "<br>" +
                        "a/c. 14200 5555 0007 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "5") {
                    bankBayar3.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                        "<br>" +
                        "a/c. 5578 0000 9333 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "6") {
                    faktur_beneficiary3.style.visibility =
                        "visible";
                    faktur_applicant3.style.visibility = "visible";
                    faktur_emptyBag3.style.visibility = "visible";
                    bankBayar3.innerHTML =
                        "TRADE TERM: " +
                        tradeTerm +
                        "<br>" +
                        "Documentary Credit Number: " +
                        dcn +
                        "<br>" +
                        "Date of Issue: " +
                        doi +
                        "<br>" +
                        "&nbsp;";
                } else if (bankSelect.value == "7") {
                    bankBayar3.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                        "<br>" +
                        "a/c. 5578 0000 9333 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else {
                    bankBayar3.innerHTML =
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;";
                }

                if (ttdSelect.value == "1") {
                    ttdPimpinan3.textContent = "TJAHYO SANTOSO";
                } else if (ttdSelect.value == "2") {
                    ttdPimpinan3.textContent = "RUDY SANTOSO";
                } else if (ttdSelect.value == "3") {
                    ttdPimpinan3.textContent = "YUDI SANTOSO";
                }

                faktur_IdPenagihan3.textContent =
                    decodeHtmlEntities(result[0].Id_Penagihan);

                if (bankSelect.value == "7") {
                    var date2 = isNaN(new Date(editDate).getTime())
                        ? new Date(result[0].Tgl_Penagihan)
                        : new Date(editDate);
                } else {
                    var date2 = new Date(result[0].Tgl_Penagihan);
                }
                // var date2 = new Date(result[0].Tgl_Penagihan);

                // var namaBulan = [
                //     "January",
                //     "February",
                //     "March",
                //     "April",
                //     "May",
                //     "June",
                //     "July",
                //     "August",
                //     "September",
                //     "October",
                //     "November",
                //     "December",
                // ];

                var namaBulan = [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                ];

                var tanggal = String(date2.getDate()).padStart(2, '0');
                var bulan = namaBulan[date2.getMonth()];
                var tahunLengkap = date2.getFullYear();
                var duaDigitTahun = tahunLengkap
                    .toString()
                    .slice(-2);
                // faktur_AreaPPNThnIdFakturPajak.textContent =
                //     decodeHtmlEntities(result[0].KdArea_Ppn) +
                //     " . 012 - " +
                //     duaDigitTahun +
                //     ". " +
                //     decodeHtmlEntities(result[0].IdFakturPajak);

                faktur_NamaNPWP3.textContent = decodeHtmlEntities(
                    result[0].NamaNPWP
                );
                faktur_AlamatNPWP3.textContent = decodeHtmlEntities(
                    result[0].AlamatNPWP
                );

                let npwp = result[0].NPWP;
                // let formattedNPWP =
                //     npwp.slice(0, 2) +
                //     " . " +
                //     npwp.slice(2, 5) +
                //     " . " +
                //     npwp.slice(5, 8) +
                //     " . " +
                //     npwp.slice(8, 9) +
                //     " - " +
                //     npwp.slice(9, 12) +
                //     " . " +
                //     npwp.slice(12, 15);
                faktur_NPWP3.textContent = npwp;

                // faktur_NamaKelompokUtama2.textContent =
                //     decodeHtmlEntities(result[0].NamaKelompokUtama);

                if (bankSelect.value == "6") {
                    faktur_NamaKelompokUtama3.innerHTML = "&nbsp;";
                } else {
                    faktur_NamaKelompokUtama3.textContent =
                        decodeHtmlEntities(
                            result[0].NAMATYPEBARANG
                        );
                }

                let totalGrand = 0;
                let count = 0;
                var faktur_Detail3 =
                    document.getElementById("faktur_Detail3");

                faktur_Detail3.innerHTML = "";
                console.log(result.length > 4);

                result.forEach(function (item, index) {
                    var row = document.createElement("div");
                    row.classList.add("row", "small-font");
                    count += 1;

                    // Tampilkan item kelima dan seterusnya
                    if (index >= 4) {
                        row.style.display = "none"; // Sembunyikan item sebelum yang kelima
                    }

                    var coaCol = document.createElement("div");
                    coaCol.classList.add(
                        "col-sm-1",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    coaCol.textContent = count;
                    row.appendChild(coaCol);

                    var accountCol = document.createElement("div");
                    accountCol.classList.add(
                        "col-sm-5",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    accountCol.textContent = item.NamaBarang
                        ? decodeHtmlEntities(item.NamaBarang)
                        : "";
                    row.appendChild(accountCol);

                    var descriptionCol =
                        document.createElement("div");
                    descriptionCol.classList.add(
                        "col-sm-2",
                        "text-right",
                        "small-normal"
                    );
                    descriptionCol.textContent = item.Qty
                        ? numeral(item.Qty).format("0,0.00") +
                        item.Satuan
                        : "";
                    row.appendChild(descriptionCol);

                    var amountCol = document.createElement("div");
                    amountCol.classList.add(
                        "col-sm-2",
                        "text-right",
                        "small-normal"
                    );

                    if (bankSelect.value == "6") {
                        amountCol.textContent = item.HargaSatuan
                            ? "IDR " +
                            numeral(item.HargaSatuan).format(
                                "0,0.00"
                            )
                            : "0.00";
                    } else {
                        amountCol.textContent = item.HargaSatuan
                            ? decodeHtmlEntities(item.Symbol2) +
                            numeral(item.HargaSatuan).format(
                                "0,0.00"
                            )
                            : "0.00";
                    }
                    row.appendChild(amountCol);

                    var totalCol = document.createElement("div");
                    totalCol.classList.add(
                        "col-sm-3",
                        "text-center",
                        "small-normal",
                        "description-right"
                    );
                    let tempTotal =
                        numeral(item.Qty).value() *
                        numeral(item.HargaSatuan).value();
                    totalCol.textContent = item.HargaSatuan
                        ? decodeHtmlEntities(item.Symbol2) +
                        numeral(tempTotal).format("0,0.00")
                        : decodeHtmlEntities(item.Symbol2) + "0.00";
                    row.appendChild(totalCol);

                    if (bankSelect.value == "6") {
                        totalCol.textContent = item.HargaSatuan
                            ? "IDR " +
                            numeral(tempTotal).format("0,0.00")
                            : "0.00";
                    } else {
                        totalCol.textContent = item.HargaSatuan
                            ? decodeHtmlEntities(item.Symbol2) +
                            numeral(tempTotal).format("0,0.00")
                            : "0.00";
                    }

                    row.appendChild(totalCol);
                    faktur_Detail3.appendChild(row);

                    totalGrand += numeral(tempTotal).value();

                    var additionalRow =
                        document.createElement("div");
                    additionalRow.classList.add(
                        "row",
                        "small-font"
                    );

                    if (index >= 4) {
                        additionalRow.style.display = "none";
                    }

                    var mantap = document.createElement("div");
                    mantap.classList.add(
                        "col-sm-1",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    additionalRow.appendChild(mantap);

                    var additionalCoaCol =
                        document.createElement("div");
                    additionalCoaCol.classList.add(
                        "col-sm-5",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    // additionalCoaCol.textContent = item.NO_PO
                    //     ? "PO : " + decodeHtmlEntities(item.NO_PO)
                    //     : "";
                    // additionalRow.appendChild(additionalCoaCol);

                    if (bankSelect.value == "6") {
                        additionalCoaCol.innerHTML = item.PO
                            ? "PO : " +
                            decodeHtmlEntities(item.PO) +
                            "<br>" +
                            "Jumlah Empty Bag yang dikirim: " +
                            decodeHtmlEntities(item.Jml) +
                            decodeHtmlEntities(item.Satuan)
                            : "";
                        additionalRow.appendChild(additionalCoaCol);
                    } else {
                        additionalCoaCol.textContent = item.PO
                            ? "PO : " +
                            decodeHtmlEntities(item.PO)
                            : "";
                        additionalRow.appendChild(additionalCoaCol);
                    }

                    faktur_Detail3.appendChild(additionalRow);
                });

                if (bankSelect.value == "6") {
                    faktur_SymbolGrand3.textContent = "IDR";
                    faktur_SymbolDiscount3.textContent = "IDR";
                    faktur_SymbolUM3.textContent = "";
                    faktur_SymbolDPP3.textContent = "IDR";
                    faktur_SymbolPajak3.textContent = "IDR";
                    faktur_SymbolTerbayar3.textContent = "IDR";
                } else {
                    faktur_SymbolGrand3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolDiscount3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolUM3.textContent = "";
                    faktur_SymbolDPP3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolPajak3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolTerbayar3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                }

                faktur_Grand3.textContent =
                    numeral(result[0].Nilai_blm_Pajak).format("0,0.00");

                faktur_Discount3.textContent = numeral(
                    result[0].Discount
                ).format("0,0.00");

                faktur_UM3.textContent = "";

                let tempDPP =
                    numeral(result[0].Nilai_blm_Pajak).value() -
                    numeral(result[0].Discount).value();
                if (duaDigitTahun > 24) {
                    faktur_DPP3.textContent = numeral(
                        (tempDPP * 11) / 12
                    ).format("0,0.00");
                } else {
                    faktur_DPP3.textContent = numeral(tempDPP).format("0,0.00");
                }

                let tempPajak =
                    Math.round(
                        ((tempDPP * numeral(result[0].PersenPPN).value()) / 100) *
                        100
                    ) / 100;

                if (duaDigitTahun > 24) {
                    faktur_Pajak3.textContent = numeral(
                        ((tempDPP * 11) / 12) * 0.12
                    ).format("0,0.00");
                } else {
                    faktur_Pajak3.textContent =
                        numeral(tempPajak).format("0,0.00");
                }

                if (duaDigitTahun > 24) {
                    let terbayar =
                        numeral(tempDPP).value() +
                        numeral(faktur_Pajak3.textContent).value();
                    faktur_Terbayar3.textContent =
                        numeral(terbayar).format("0,0.00");
                    TTerbilang = convertNumberToWordsRupiah(
                        numeral(faktur_Terbayar3.textContent).value()
                    );
                    faktur_Terbilang3.innerHTML =
                        "&emsp;" + decodeHtmlEntities(TTerbilang);
                } else {
                    let terbayar =
                        numeral(tempDPP).value() + numeral(tempPajak).value();
                    faktur_Terbayar3.textContent =
                        numeral(terbayar).format("0,0.00");
                    faktur_Terbilang3.textContent = decodeHtmlEntities(
                        result[0].Terbilang
                    );
                }

                if (bankSelect.value == "7") {
                    faktur_SyaratBayar3.innerHTML = "&nbsp;";
                } else {
                    faktur_SyaratBayar3.innerHTML =
                        "Syarat Pembayaran: &emsp;" +
                        decodeHtmlEntities(result[0].SyaratBayar) +
                        " Hari";
                }

                faktur_TglBln3.textContent = tanggal + "-" + bulan + "-20" + duaDigitTahun;
                // faktur_Thn3.textContent = " / 20" + duaDigitTahun;
                if (
                    result[0].NamaNPWP ==
                    "PT. BLOOM TRADING INDONESIA"
                ) {
                    faktur_PersenPPN3.innerHTML =
                        "<strong></strong>";
                } else if (duaDigitTahun > 24) {
                    faktur_PersenPPN3.innerHTML =
                        "<strong>12%</strong>";
                } else {
                    faktur_PersenPPN3.innerHTML =
                        "<strong>11%</strong>";
                }

                let syaratBayar = result[0].SyaratBayar;
                let tglTerimaBarang = result[0].Tgl_Penagihan;
                let syaratBayarNumber = Number(syaratBayar);
                let date3 = new Date(tglTerimaBarang);
                let resultDate = new Date(date3);
                resultDate.setDate(
                    date3.getDate() + syaratBayarNumber
                );

                if (bankSelect.value == "7") {
                    faktur_Tempo3.innerHTML = "&nbsp;";
                    faktur_SuratJalan3.innerHTML = "&nbsp;";
                    faktur_SJ3.innerHTML = "&nbsp;";
                } else {
                    faktur_Tempo3.innerHTML =
                        "Jatuh Tempo: &emsp;" +
                        formatDateToMMDDYYYY(resultDate);

                    faktur_SuratJalan3.innerHTML = "Surat Jalan: &emsp;&emsp; ";
                    faktur_SJ3.textContent = "";

                    // if (sFormula0.length > 255) {
                    //     faktur_SuratJalan3.innerHTML =
                    //         "Surat Jalan: &emsp;" +
                    //         sFormula0.slice(0, 252);
                    //     faktur_SJ3.textContent =
                    //         sFormula0.slice(252);
                    // } else {
                    //     faktur_SuratJalan3.innerHTML =
                    //         "Surat Jalan: &emsp;" + sFormula0;
                    //     faktur_SJ3.textContent = "";
                    // }
                }

                printPreview("faktur3");
            }
        } else {
            // Declare variables matching the element IDs
            var fakturUangMuka_IdPenagihan = document.getElementById(
                "fakturUangMuka_IdPenagihan"
            );
            fakturUangMuka_IdPenagihan.style.fontWeight = "bold";
            // var fakturUangMuka_AreaPPNThnIdFakturPajak =
            //     document.getElementById(
            //         "fakturUangMuka_AreaPPNThnIdFakturPajak"
            //     );
            // fakturUangMuka_AreaPPNThnIdFakturPajak.style.fontWeight = "bold";
            var fakturUangMuka_NamaNPWP = document.getElementById(
                "fakturUangMuka_NamaNPWP"
            );
            fakturUangMuka_NamaNPWP.style.fontWeight = "bold";
            var fakturUangMuka_AlamatNPWP = document.getElementById(
                "fakturUangMuka_AlamatNPWP"
            );
            var fakturUangMuka_NPWP = document.getElementById(
                "fakturUangMuka_NPWP"
            );
            var fakturUangMuka_NamaKelompokUtama = document.getElementById(
                "fakturUangMuka_NamaKelompokUtama"
            );
            var fakturUangMuka_SymbolGrand = document.getElementById(
                "fakturUangMuka_SymbolGrand"
            );
            var fakturUangMuka_Grand = document.getElementById(
                "fakturUangMuka_Grand"
            );
            var fakturUangMuka_Discount = document.getElementById(
                "fakturUangMuka_Discount"
            );
            var fakturUangMuka_SymbolUM = document.getElementById(
                "fakturUangMuka_SymbolUM"
            );
            var fakturUangMuka_UM = document.getElementById("fakturUangMuka_UM");
            var fakturUangMuka_SymbolDPP = document.getElementById(
                "fakturUangMuka_SymbolDPP"
            );
            var fakturUangMuka_DPP = document.getElementById("fakturUangMuka_DPP");
            var fakturUangMuka_SymbolPajak = document.getElementById(
                "fakturUangMuka_SymbolPajak"
            );
            var fakturUangMuka_Pajak = document.getElementById(
                "fakturUangMuka_Pajak"
            );
            var fakturUangMuka_Terbilang = document.getElementById(
                "fakturUangMuka_Terbilang"
            );
            var fakturUangMuka_SymbolTerbayar = document.getElementById(
                "fakturUangMuka_SymbolTerbayar"
            );
            var fakturUangMuka_Terbayar = document.getElementById(
                "fakturUangMuka_Terbayar"
            );
            var fakturUangMuka_SyaratBayar = document.getElementById(
                "fakturUangMuka_SyaratBayar"
            );
            var fakturUangMuka_TglBln = document.getElementById(
                "fakturUangMuka_TglBln"
            );
            var fakturUangMuka_Thn = document.getElementById("fakturUangMuka_Thn");
            var fakturUangMuka_PersenPPN = document.getElementById(
                "fakturUangMuka_PersenPPN"
            );
            var fakturUangMuka_Tempo = document.getElementById(
                "fakturUangMuka_Tempo"
            );
            var fakturUangMuka_SuratJalan = document.getElementById(
                "fakturUangMuka_SuratJalan"
            );
            var fakturUangMuka_SJ = document.getElementById("fakturUangMuka_SJ");
            var bankBayarUangMuka = document.getElementById("bankBayarUangMuka");
            var ttdPimpinanUangMuka = document.getElementById(
                "ttdPimpinanUangMuka"
            );

            if (result.length === 0) {
                const elements = [
                    "fakturUangMuka_IdPenagihan",
                    // "fakturUangMuka_AreaPPNThnIdFakturPajak",
                    "fakturUangMuka_NamaNPWP",
                    "fakturUangMuka_AlamatNPWP",
                    "fakturUangMuka_NPWP",
                    "fakturUangMuka_NamaKelompokUtama",
                    "fakturUangMuka_SymbolGrand",
                    "fakturUangMuka_Grand",
                    "fakturUangMuka_Discount",
                    "fakturUangMuka_SymbolUM",
                    "fakturUangMuka_UM",
                    "fakturUangMuka_SymbolDPP",
                    "fakturUangMuka_DPP",
                    "fakturUangMuka_SymbolPajak",
                    "fakturUangMuka_Pajak",
                    "fakturUangMuka_Terbilang",
                    "fakturUangMuka_SymbolTerbayar",
                    "fakturUangMuka_Terbayar",
                    "fakturUangMuka_SyaratBayar",
                    "fakturUangMuka_TglBln",
                    "fakturUangMuka_Thn",
                    "fakturUangMuka_PersenPPN",
                    "fakturUangMuka_Tempo",
                    "fakturUangMuka_SuratJalan",
                    "fakturUangMuka_SJ",
                    "bankBayarUangMuka",
                    "ttdPimpinanUangMuka",
                ];

                elements.forEach((id) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.textContent = ""; // Set the value to empty string
                    }
                });

                printPreview("fakturUangMuka");
            } else {
                if (bankSelect.value == "1") {
                    bankBayarUangMuka.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "BCA Cab. Galaxy - Surabaya" +
                        "<br>" +
                        "a/c. 788 010 1999 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "2") {
                    bankBayarUangMuka.innerHTML =
                        "Pembayaran melalui SCF ke Rekening:" +
                        "<br>" +
                        "BNI  Cabang Tropodo Sidoarjo" +
                        "<br>" +
                        "a/c. 6388888829 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "3") {
                    bankBayarUangMuka.innerHTML =
                        "Pembayaran melalui SCF ke Rekening:" +
                        "<br>" +
                        "Bank Mandiri  KCP Padang Indarung" +
                        "<br>" +
                        "a/c. 111 0007609759 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "4") {
                    bankBayarUangMuka.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank Mandiri  KCP Pondok Chandra Sidoarjo" +
                        "<br>" +
                        "a/c. 14200 5555 0007 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "5") {
                    bankBayarUangMuka.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                        "<br>" +
                        "a/c. 5578 0000 9333 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else {
                    bankBayarUangMuka.innerHTML =
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;";
                }

                if (ttdSelect.value == "1") {
                    ttdPimpinanUangMuka.textContent = "TJAHYO SANTOSO";
                } else if (ttdSelect.value == "2") {
                    ttdPimpinanUangMuka.textContent = "RUDY SANTOSO";
                } else if (ttdSelect.value == "3") {
                    ttdPimpinanUangMuka.textContent = "YUDI SANTOSO";
                }

                fakturUangMuka_IdPenagihan.textContent = decodeHtmlEntities(
                    result[0].Id_Penagihan
                );

                var date2 = new Date(result[0].Tgl_Penagihan);

                var namaBulan = [
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desember",
                ];

                var tanggal = date2.getDate();
                var bulan = namaBulan[date2.getMonth()];
                var tahunLengkap = date2.getFullYear();
                var duaDigitTahun = tahunLengkap.toString().slice(-2);
                // faktur_AreaPPNThnIdFakturPajak.textContent =
                //     decodeHtmlEntities(result[0].KdArea_Ppn) +
                //     " . 012 - " +
                //     duaDigitTahun +
                //     ". " +
                //     decodeHtmlEntities(result[0].IdFakturPajak);

                fakturUangMuka_NamaNPWP.textContent = decodeHtmlEntities(
                    result[0].NamaNPWP
                );
                fakturUangMuka_AlamatNPWP.textContent = decodeHtmlEntities(
                    result[0].AlamatNPWP
                );

                let npwp = result[0].NPWP;
                // let formattedNPWP =
                //     npwp.slice(0, 2) +
                //     " . " +
                //     npwp.slice(2, 5) +
                //     " . " +
                //     npwp.slice(5, 8) +
                //     " . " +
                //     npwp.slice(8, 9) +
                //     " - " +
                //     npwp.slice(9, 12) +
                //     " . " +
                //     npwp.slice(12, 15);
                fakturUangMuka_NPWP.textContent = npwp;

                fakturUangMuka_NamaKelompokUtama.textContent = decodeHtmlEntities(
                    result[0].NAMATYPEBARANG
                );

                let totalGrand = 0;
                let count = 0;
                var fakturUangMuka_Detail = document.getElementById(
                    "fakturUangMuka_Detail"
                );

                fakturUangMuka_Detail.innerHTML = "";

                result.forEach(function (item, index) {
                    var row = document.createElement("div");
                    row.classList.add("row", "small-font");
                    count += 1;

                    var coaCol = document.createElement("div");
                    coaCol.classList.add(
                        "col-sm-1",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    coaCol.textContent = count;
                    row.appendChild(coaCol);

                    var accountCol = document.createElement("div");
                    accountCol.classList.add(
                        "col-sm-5",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    console.log(item);

                    accountCol.textContent = item.NamaBarang
                        ? decodeHtmlEntities(item.NamaBarang)
                        : "";
                    row.appendChild(accountCol);

                    var descriptionCol = document.createElement("div");
                    descriptionCol.classList.add(
                        "col-sm-2",
                        "text-right",
                        "small-normal"
                    );
                    descriptionCol.textContent = item.Qty
                        ? numeral(item.Qty).format("0,0.00") + item.Satuan
                        : "";
                    row.appendChild(descriptionCol);

                    var amountCol = document.createElement("div");
                    amountCol.classList.add(
                        "col-sm-2",
                        "text-right",
                        "small-normal"
                    );
                    amountCol.textContent = item.HargaSatuan
                        ? decodeHtmlEntities(item.Symbol2) +
                        numeral(item.HargaSatuan).format("0,0.00")
                        : "0.00";
                    row.appendChild(amountCol);

                    var totalCol = document.createElement("div");
                    totalCol.classList.add(
                        "col-sm-3",
                        "text-center",
                        "small-normal",
                        "description-right"
                    );
                    // let tempTotal =
                    //     numeral(0).value() *
                    //     numeral(0).value();
                    // totalCol.textContent = 0
                    //     ? decodeHtmlEntities(item.Symbol2) +
                    //       numeral(0).format("0,0.00")
                    //     : "0.00";
                    // row.appendChild(totalCol);
                    let tempTotal =
                        numeral(item.Qty).value() *
                        numeral(item.HargaSatuan).value();
                    totalCol.textContent = item.HargaSatuan
                        ? decodeHtmlEntities(item.Symbol2) +
                        numeral(tempTotal).format("0,0.00")
                        : "0.00";
                    row.appendChild(totalCol);

                    fakturUangMuka_Detail.appendChild(row);

                    totalGrand += numeral(tempTotal).value();

                    var additionalRow = document.createElement("div");
                    additionalRow.classList.add("row", "small-font");

                    var mantap = document.createElement("div");
                    mantap.classList.add(
                        "col-sm-1",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    additionalRow.appendChild(mantap);

                    var additionalCoaCol = document.createElement("div");
                    additionalCoaCol.classList.add(
                        "col-sm-5",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    additionalCoaCol.textContent =
                        "PO :" + " " + item.PO
                            ? "PO :" + " " + decodeHtmlEntities(item.PO)
                            : "";
                    additionalRow.appendChild(additionalCoaCol);

                    // var additionalAccountCol =
                    //     document.createElement("div");
                    // additionalAccountCol.classList.add(
                    //     "col-sm-10",
                    //     "text-left",
                    //     "small-font"
                    // );
                    // additionalAccountCol.textContent = item.NO_PO
                    //     ? decodeHtmlEntities(item.NO_PO)
                    //     : "";
                    // additionalRow.appendChild(additionalAccountCol);

                    fakturUangMuka_Detail.appendChild(additionalRow);
                });

                fakturUangMuka_SymbolGrand.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturUangMuka_SymbolUM.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturUangMuka_SymbolDPP.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturUangMuka_SymbolPajak.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturUangMuka_SymbolTerbayar.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );

                fakturUangMuka_Grand.textContent = numeral(
                    result[0].Nilai_blm_Pajak
                ).format("0,0.00");

                fakturUangMuka_Discount.textContent = numeral(
                    result[0].Discount
                ).format("0,0.00");

                // fakturUangMuka_UM.textContent = result[0].Discount
                //     ? numeral(result[0].Discount).format("0,0.00")
                //     : "0.00";

                let tempDPP =
                    numeral(result[0].Nilai_blm_Pajak).value() -
                    numeral(result[0].Discount).value();
                if (duaDigitTahun > 24) {
                    fakturUangMuka_DPP.textContent = numeral(
                        (tempDPP * 11) / 12
                    ).format("0,0.00");
                } else {
                    fakturUangMuka_DPP.textContent =
                        numeral(tempDPP).format("0,0.00");
                }

                let tempPajak =
                    Math.round(
                        ((tempDPP * numeral(result[0].PersenPPN).value()) / 100) *
                        100
                    ) / 100;

                if (duaDigitTahun > 24) {
                    fakturUangMuka_Pajak.textContent = numeral(
                        ((tempDPP * 11) / 12) * 0.12
                    ).format("0,0.00");
                } else {
                    fakturUangMuka_Pajak.textContent =
                        numeral(tempPajak).format("0,0.00");
                }

                if (duaDigitTahun > 24) {
                    let terbayar =
                        numeral(tempDPP).value() +
                        numeral(fakturUangMuka_Pajak.textContent).value();
                    fakturUangMuka_Terbayar.textContent =
                        numeral(terbayar).format("0,0.00");
                    TTerbilang = convertNumberToWordsRupiah(
                        numeral(fakturUangMuka_Terbayar.textContent).value()
                    );
                    fakturUangMuka_Terbilang.innerHTML =
                        "&emsp;" + decodeHtmlEntities(TTerbilang);
                } else {
                    let terbayar = numeral(tempDPP).value() + numeral(tempPajak).value();
                    fakturUangMuka_Terbayar.textContent =
                        numeral(terbayar).format("0,0.00");
                    fakturUangMuka_Terbilang.textContent = decodeHtmlEntities(
                        result[0].Terbilang
                    );
                }

                fakturUangMuka_SyaratBayar.innerHTML =
                    "Syarat Pembayaran: &emsp;&emsp;" + "0" + " Hari";

                fakturUangMuka_TglBln.textContent = tanggal + " " + bulan;
                fakturUangMuka_Thn.textContent = duaDigitTahun;
                if (duaDigitTahun > 24) {
                    fakturUangMuka_PersenPPN.innerHTML = "<strong>12%</strong>";
                } else {
                    fakturUangMuka_PersenPPN.innerHTML = "<strong>11%</strong>";
                }

                let syaratBayar = result[0].SyaratBayar;
                let tglTerimaBarang = result[0].Tgl_Penagihan;
                let syaratBayarNumber = Number(syaratBayar);
                let date3 = new Date(tglTerimaBarang);
                let resultDate = new Date(date3);
                resultDate.setDate(date3.getDate() + syaratBayarNumber);
                fakturUangMuka_Tempo.innerHTML =
                    "Jatuh Tempo: &emsp;&emsp; " + formatDateToMMDDYYYY(resultDate);

                // if (sFormula0.length > 255) {
                //   faktur_SuratJalan.innerHTML =
                //     "Surat Jalan: &emsp;&emsp; " + sFormula0.slice(0, 252);
                //   faktur_SJ.textContent = sFormula0.slice(252);
                // } else {
                //   faktur_SuratJalan.innerHTML = "Surat Jalan: &emsp;&emsp; " + sFormula0;
                //   faktur_SJ.textContent = "";
                // }

                printPreview("fakturUangMuka");
            }
        }
    }
}

function rpt_CetakFakturPajakUM(result) {
    if (result.length == 0) {
        Swal.fire({
            icon: "info",
            title: "Info!",
            text: "Data untuk id penagihan" + " " + idPenagihan.value + " " + "tidak ada atau salah pilih cetak Faktur Tunai UM!",
            showConfirmButton: true,
            // timer: 2000 
        });
        return;
    }
    if (parseInt(sIdMataUang) === 1 && idPenagihan.value.length > 14) {
        if (formatSelect.value == "2") {
            // print faktur3
            var faktur_beneficiary3 = document.getElementById(
                "faktur_beneficiary3"
            );
            faktur_beneficiary3.style.visibility = "hidden";
            var faktur_applicant3 =
                document.getElementById("faktur_applicant3");
            faktur_applicant3.style.visibility = "hidden";
            var faktur_emptyBag3 =
                document.getElementById("faktur_emptyBag3");
            faktur_emptyBag3.style.visibility = "hidden";

            var faktur_IdPenagihan3 = document.getElementById(
                "faktur_IdPenagihan3"
            );
            faktur_IdPenagihan3.style.fontWeight = "bold";
            // var faktur_AreaPPNThnIdFakturPajak =
            //     document.getElementById(
            //         "faktur_AreaPPNThnIdFakturPajak"
            //     );
            // faktur_AreaPPNThnIdFakturPajak.style.fontWeight = "bold";
            var faktur_NamaNPWP3 =
                document.getElementById("faktur_NamaNPWP3");
            faktur_NamaNPWP3.style.fontWeight = "bold";
            var faktur_AlamatNPWP3 =
                document.getElementById("faktur_AlamatNPWP3");
            var faktur_NPWP3 =
                document.getElementById("faktur_NPWP3");
            var faktur_NamaKelompokUtama3 = document.getElementById(
                "faktur_NamaKelompokUtama3"
            );
            var faktur_SymbolGrand3 = document.getElementById(
                "faktur_SymbolGrand3"
            );
            var faktur_Grand3 =
                document.getElementById("faktur_Grand3");
            var faktur_SymbolDiscount3 =
                document.getElementById("faktur_SymbolDiscount3");
            var faktur_Discount3 = document.getElementById("faktur_Discount3");
            var faktur_SymbolUM3 =
                document.getElementById("faktur_SymbolUM3");
            var faktur_UM3 = document.getElementById("faktur_UM3");
            var faktur_SymbolDPP3 =
                document.getElementById("faktur_SymbolDPP3");
            var faktur_DPP3 =
                document.getElementById("faktur_DPP3");
            var faktur_SymbolPajak3 = document.getElementById(
                "faktur_SymbolPajak3"
            );
            var faktur_Pajak3 =
                document.getElementById("faktur_Pajak3");
            var faktur_Terbilang3 =
                document.getElementById("faktur_Terbilang3");
            var faktur_SymbolTerbayar3 = document.getElementById(
                "faktur_SymbolTerbayar3"
            );
            var faktur_Terbayar3 =
                document.getElementById("faktur_Terbayar3");
            var faktur_SyaratBayar3 = document.getElementById(
                "faktur_SyaratBayar3"
            );
            var faktur_TglBln3 =
                document.getElementById("faktur_TglBln3");
            var faktur_Thn3 =
                document.getElementById("faktur_Thn3");
            var faktur_PersenPPN3 =
                document.getElementById("faktur_PersenPPN3");
            var faktur_Tempo3 =
                document.getElementById("faktur_Tempo3");
            var faktur_SuratJalan3 =
                document.getElementById("faktur_SuratJalan3");
            var faktur_SJ3 = document.getElementById("faktur_SJ3");
            var bankBayar3 = document.getElementById("bankBayar3");
            var ttdPimpinan3 =
                document.getElementById("ttdPimpinan3");

            if (result.length === 0) {
                const elements = [
                    "faktur_IdPenagihan3",
                    // "faktur_AreaPPNThnIdFakturPajak3",
                    "faktur_NamaNPWP3",
                    "faktur_AlamatNPWP3",
                    "faktur_NPWP3",
                    "faktur_NamaKelompokUtama3",
                    "faktur_SymbolGrand3",
                    "faktur_Grand3",
                    "faktur_SymbolDiscount3",
                    "faktur_Discount3",
                    "faktur_SymbolUM3",
                    "faktur_UM3",
                    "faktur_SymbolDPP3",
                    "faktur_DPP3",
                    "faktur_SymbolPajak3",
                    "faktur_Pajak3",
                    "faktur_Terbilang3",
                    "faktur_SymbolTerbayar3",
                    "faktur_Terbayar3",
                    "faktur_SyaratBayar3",
                    "faktur_TglBln3",
                    "faktur_Thn3",
                    "faktur_PersenPPN3",
                    "faktur_Tempo3",
                    "faktur_SuratJalan3",
                    "faktur_SJ3",
                    "bankBayar3",
                    "ttdPimpinan3",
                ];

                elements.forEach((id) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.textContent = ""; // Set the value to empty string
                    }
                });

                // printPreview("faktur3");
            } else {
                if (bankSelect.value == "1") {
                    bankBayar3.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "BCA Cab. Galaxy - Surabaya" +
                        "<br>" +
                        "a/c. 788 010 1999 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "2") {
                    bankBayar3.innerHTML =
                        "Pembayaran melalui SCF ke Rekening:" +
                        "<br>" +
                        "BNI  Cabang Tropodo Sidoarjo" +
                        "<br>" +
                        "a/c. 6388888829 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "3") {
                    bankBayar3.innerHTML =
                        "Pembayaran melalui SCF ke Rekening:" +
                        "<br>" +
                        "Bank Mandiri  KCP Padang Indarung" +
                        "<br>" +
                        "a/c. 111 0007609759 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "4") {
                    bankBayar3.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank Mandiri  KCP Pondok Chandra Sidoarjo" +
                        "<br>" +
                        "a/c. 14200 5555 0007 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "5") {
                    bankBayar3.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                        "<br>" +
                        "a/c. 5578 0000 9333 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "6") {
                    faktur_beneficiary3.style.visibility =
                        "visible";
                    faktur_applicant3.style.visibility = "visible";
                    faktur_emptyBag3.style.visibility = "visible";
                    bankBayar3.innerHTML =
                        "TRADE TERM: " +
                        tradeTerm +
                        "<br>" +
                        "Documentary Credit Number: " +
                        dcn +
                        "<br>" +
                        "Date of Issue: " +
                        doi +
                        "<br>" +
                        "&nbsp;";
                } else if (bankSelect.value == "7") {
                    bankBayar3.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                        "<br>" +
                        "a/c. 5578 0000 9333 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else {
                    bankBayar3.innerHTML =
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;";
                }

                if (ttdSelect.value == "1") {
                    ttdPimpinan3.textContent = "TJAHYO SANTOSO";
                } else if (ttdSelect.value == "2") {
                    ttdPimpinan3.textContent = "RUDY SANTOSO";
                } else if (ttdSelect.value == "3") {
                    ttdPimpinan3.textContent = "YUDI SANTOSO";
                }

                faktur_IdPenagihan3.textContent =
                    decodeHtmlEntities(result[0].Id_Penagihan);

                if (bankSelect.value == "7") {
                    var date2 = isNaN(new Date(editDate).getTime())
                        ? new Date(result[0].Tgl_Penagihan)
                        : new Date(editDate);
                } else {
                    var date2 = new Date(result[0].Tgl_Penagihan);
                }
                // var date2 = new Date(result[0].Tgl_Penagihan);

                // var namaBulan = [
                //     "January",
                //     "February",
                //     "March",
                //     "April",
                //     "May",
                //     "June",
                //     "July",
                //     "August",
                //     "September",
                //     "October",
                //     "November",
                //     "December",
                // ];

                var namaBulan = [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                ];

                var tanggal = String(date2.getDate()).padStart(2, '0');
                var bulan = namaBulan[date2.getMonth()];
                var tahunLengkap = date2.getFullYear();
                var duaDigitTahun = tahunLengkap
                    .toString()
                    .slice(-2);
                // faktur_AreaPPNThnIdFakturPajak.textContent =
                //     decodeHtmlEntities(result[0].KdArea_Ppn) +
                //     " . 012 - " +
                //     duaDigitTahun +
                //     ". " +
                //     decodeHtmlEntities(result[0].IdFakturPajak);

                faktur_NamaNPWP3.textContent = decodeHtmlEntities(
                    result[0].NamaNPWP
                );
                faktur_AlamatNPWP3.textContent = decodeHtmlEntities(
                    result[0].AlamatNPWP
                );

                let npwp = result[0].NPWP;
                // let formattedNPWP =
                //     npwp.slice(0, 2) +
                //     " . " +
                //     npwp.slice(2, 5) +
                //     " . " +
                //     npwp.slice(5, 8) +
                //     " . " +
                //     npwp.slice(8, 9) +
                //     " - " +
                //     npwp.slice(9, 12) +
                //     " . " +
                //     npwp.slice(12, 15);
                faktur_NPWP3.textContent = npwp;

                // faktur_NamaKelompokUtama2.textContent =
                //     decodeHtmlEntities(result[0].NamaKelompokUtama);

                if (bankSelect.value == "6") {
                    faktur_NamaKelompokUtama3.innerHTML = "&nbsp;";
                } else {
                    faktur_NamaKelompokUtama3.textContent =
                        decodeHtmlEntities(
                            result[0].NAMATYPEBARANG
                        );
                }

                let totalGrand = 0;
                let count = 0;
                var faktur_Detail3 =
                    document.getElementById("faktur_Detail3");

                faktur_Detail3.innerHTML = "";
                console.log(result.length > 4);

                result.forEach(function (item, index) {
                    var row = document.createElement("div");
                    row.classList.add("row", "small-font");
                    count += 1;

                    // Tampilkan item kelima dan seterusnya
                    if (index >= 4) {
                        row.style.display = "none"; // Sembunyikan item sebelum yang kelima
                    }

                    var coaCol = document.createElement("div");
                    coaCol.classList.add(
                        "col-sm-1",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    coaCol.textContent = count;
                    row.appendChild(coaCol);

                    var accountCol = document.createElement("div");
                    accountCol.classList.add(
                        "col-sm-5",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    accountCol.textContent = item.NamaBarang
                        ? decodeHtmlEntities(item.NamaBarang)
                        : "";
                    row.appendChild(accountCol);

                    var descriptionCol =
                        document.createElement("div");
                    descriptionCol.classList.add(
                        "col-sm-2",
                        "text-right",
                        "small-normal"
                    );
                    descriptionCol.textContent = item.Qty
                        ? numeral(item.Qty).format("0,0.00") +
                        item.Satuan
                        : "";
                    row.appendChild(descriptionCol);

                    var amountCol = document.createElement("div");
                    amountCol.classList.add(
                        "col-sm-2",
                        "text-right",
                        "small-normal"
                    );

                    if (bankSelect.value == "6") {
                        amountCol.textContent = item.HargaSatuan
                            ? "IDR " +
                            numeral(item.HargaSatuan).format(
                                "0,0.00"
                            )
                            : "0.00";
                    } else {
                        amountCol.textContent = item.HargaSatuan
                            ? decodeHtmlEntities(item.Symbol2) +
                            numeral(item.HargaSatuan).format(
                                "0,0.00"
                            )
                            : "0.00";
                    }
                    row.appendChild(amountCol);

                    var totalCol = document.createElement("div");
                    totalCol.classList.add(
                        "col-sm-3",
                        "text-center",
                        "small-normal",
                        "description-right"
                    );
                    let tempTotal =
                        numeral(item.Qty).value() *
                        numeral(item.HargaSatuan).value();
                    totalCol.textContent = tempTotal
                        ? decodeHtmlEntities(item.Symbol2) +
                        numeral(tempTotal).format("0,0.00")
                        : decodeHtmlEntities(item.Symbol2) + "0.00";
                    row.appendChild(totalCol);

                    if (bankSelect.value == "6") {
                        totalCol.textContent = item.HargaSatuan
                            ? "IDR " +
                            numeral(tempTotal).format("0,0.00")
                            : "0.00";
                    } else {
                        totalCol.textContent = item.HargaSatuan
                            ? decodeHtmlEntities(item.Symbol2) +
                            numeral(tempTotal).format("0,0.00")
                            : "0.00";
                    }

                    row.appendChild(totalCol);
                    faktur_Detail3.appendChild(row);

                    totalGrand += numeral(tempTotal).value();

                    var additionalRow =
                        document.createElement("div");
                    additionalRow.classList.add(
                        "row",
                        "small-font"
                    );

                    if (index >= 4) {
                        additionalRow.style.display = "none";
                    }

                    var mantap = document.createElement("div");
                    mantap.classList.add(
                        "col-sm-1",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    additionalRow.appendChild(mantap);

                    var additionalCoaCol =
                        document.createElement("div");
                    additionalCoaCol.classList.add(
                        "col-sm-5",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    // additionalCoaCol.textContent = item.NO_PO
                    //     ? "PO : " + decodeHtmlEntities(item.NO_PO)
                    //     : "";
                    // additionalRow.appendChild(additionalCoaCol);

                    if (bankSelect.value == "6") {
                        additionalCoaCol.innerHTML = item.PO
                            ? "PO : " +
                            decodeHtmlEntities(item.PO) +
                            "<br>" +
                            "Jumlah Empty Bag yang dikirim: " +
                            decodeHtmlEntities(item.Jml) +
                            decodeHtmlEntities(item.Satuan)
                            : "";
                        additionalRow.appendChild(additionalCoaCol);
                    } else {
                        additionalCoaCol.textContent = item.PO
                            ? "PO : " +
                            decodeHtmlEntities(item.PO)
                            : "";
                        additionalRow.appendChild(additionalCoaCol);
                    }

                    faktur_Detail3.appendChild(additionalRow);
                });

                if (bankSelect.value == "6") {
                    faktur_SymbolGrand3.textContent = "IDR";
                    faktur_SymbolDiscount3.textContent = "IDR";
                    faktur_SymbolUM3.textContent = "IDR";
                    faktur_SymbolDPP3.textContent = "IDR";
                    faktur_SymbolPajak3.textContent = "IDR";
                    faktur_SymbolTerbayar3.textContent = "IDR";
                } else {
                    faktur_SymbolGrand3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolDiscount3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolUM3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolDPP3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolPajak3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                    faktur_SymbolTerbayar3.textContent =
                        decodeHtmlEntities(result[0].Symbol2);
                }

                faktur_Grand3.textContent =
                    numeral(totalGrand).format("0,0.00");

                faktur_Discount3.textContent = numeral(
                    result[0].Discount
                ).format("0,0.00");

                faktur_UM3.textContent = result[0].Nilai_UM
                    ? numeral(result[0].Nilai_UM).format("0,0.00")
                    : "0.00";

                let tempdpp =
                    numeral(totalGrand).value() -
                    numeral(result[0].Discount).value() -
                    numeral(result[0].Nilai_UM).value();
                if (duaDigitTahun > 24) {
                    faktur_DPP3.textContent = numeral(
                        (result[0].Nilai_blm_Pajak * 11) / 12
                    ).format("0,0.00");
                } else {
                    faktur_DPP3.textContent = numeral(tempdpp).format("0,0.00");
                }

                let tempPajak =
                    Math.round(
                        ((tempdpp * numeral(result[0].PersenPPN).value()) / 100) *
                        100
                    ) / 100;

                if (duaDigitTahun > 24) {
                    faktur_Pajak3.textContent = numeral(
                        ((tempdpp * 11) / 12) * 0.12
                    ).format("0,0.00");
                } else {
                    faktur_Pajak3.textContent =
                        numeral(tempPajak).format("0,0.00");
                }

                if (duaDigitTahun > 24) {
                    let terbayar =
                        numeral(tempdpp).value() +
                        numeral(faktur_Pajak3.textContent).value();
                    faktur_Terbayar3.textContent =
                        numeral(terbayar).format("0,0.00");
                    TTerbilang = convertNumberToWordsRupiah(
                        numeral(faktur_Terbayar3.textContent).value()
                    );
                    faktur_Terbilang3.innerHTML =
                        "&emsp;" + decodeHtmlEntities(TTerbilang);
                } else {
                    let terbayar =
                        numeral(tempdpp).value() + numeral(tempPajak).value();
                    faktur_Terbayar3.textContent =
                        numeral(terbayar).format("0,0.00");
                    faktur_Terbilang3.textContent = decodeHtmlEntities(
                        result[0].Terbilang
                    );
                }

                if (bankSelect.value == "7") {
                    faktur_SyaratBayar3.innerHTML = "&nbsp;";
                } else {
                    faktur_SyaratBayar3.innerHTML =
                        "Syarat Pembayaran: &emsp;" +
                        decodeHtmlEntities(result[0].SyaratBayar) +
                        " Hari";
                }

                faktur_TglBln3.textContent = tanggal + "-" + bulan + "-20" + duaDigitTahun;
                // faktur_Thn3.textContent = " / 20" + duaDigitTahun;
                if (
                    result[0].NamaNPWP ==
                    "PT. BLOOM TRADING INDONESIA"
                ) {
                    faktur_PersenPPN3.innerHTML =
                        "<strong></strong>";
                } else if (duaDigitTahun > 24) {
                    faktur_PersenPPN3.innerHTML =
                        "<strong>12%</strong>";
                } else {
                    faktur_PersenPPN3.innerHTML =
                        "<strong>11%</strong>";
                }

                let syaratBayar = result[0].SyaratBayar;
                let tglTerimaBarang = result[0].Tgl_Penagihan;
                let syaratBayarNumber = Number(syaratBayar);
                let date3 = new Date(tglTerimaBarang);
                let resultDate = new Date(date3);
                resultDate.setDate(
                    date3.getDate() + syaratBayarNumber
                );

                if (bankSelect.value == "7") {
                    faktur_Tempo3.innerHTML = "&nbsp;";
                    faktur_SuratJalan3.innerHTML = "&nbsp;";
                    faktur_SJ3.innerHTML = "&nbsp;";
                } else {
                    faktur_Tempo3.innerHTML =
                        "Jatuh Tempo: &emsp;" +
                        formatDateToMMDDYYYY(resultDate);

                    faktur_SuratJalan3.innerHTML = "Surat Jalan: &emsp;&emsp; ";
                    faktur_SJ3.textContent = "";

                    // if (sFormula0.length > 255) {
                    //     faktur_SuratJalan3.innerHTML =
                    //         "Surat Jalan: &emsp;" +
                    //         sFormula0.slice(0, 252);
                    //     faktur_SJ3.textContent =
                    //         sFormula0.slice(252);
                    // } else {
                    //     faktur_SuratJalan3.innerHTML =
                    //         "Surat Jalan: &emsp;" + sFormula0;
                    //     faktur_SJ3.textContent = "";
                    // }
                }

                printPreview("faktur3");
            }
        } else {
            // Declare variables using the same names as HTML element IDs
            var fakturTunaiUM_IdPenagihan = document.getElementById(
                "fakturTunaiUM_IdPenagihan"
            );
            fakturTunaiUM_IdPenagihan.style.fontWeight = "bold";
            // var fakturTunaiUM_AreaPPNThnIdFakturPajak =
            //     document.getElementById(
            //         "fakturTunaiUM_AreaPPNThnIdFakturPajak"
            //     );
            // fakturTunaiUM_AreaPPNThnIdFakturPajak.style.fontWeight = "bold";
            var fakturTunaiUM_NamaNPWP = document.getElementById(
                "fakturTunaiUM_NamaNPWP"
            );
            fakturTunaiUM_NamaNPWP.style.fontWeight = "bold";
            var fakturTunaiUM_AlamatNPWP = document.getElementById(
                "fakturTunaiUM_AlamatNPWP"
            );
            var fakturTunaiUM_NPWP = document.getElementById("fakturTunaiUM_NPWP");
            var fakturTunaiUM_NamaKelompokUtama = document.getElementById(
                "fakturTunaiUM_NamaKelompokUtama"
            );
            var fakturTunaiUM_SymbolGrand = document.getElementById(
                "fakturTunaiUM_SymbolGrand"
            );
            var fakturTunaiUM_Grand = document.getElementById(
                "fakturTunaiUM_Grand"
            );
            var fakturTunaiUM_SymbolDiscount = document.getElementById(
                "fakturTunaiUM_SymbolDiscount"
            );
            var fakturTunaiUM_Discount = document.getElementById(
                "fakturTunaiUM_Discount"
            );
            var fakturTunaiUM_SymbolUM = document.getElementById(
                "fakturTunaiUM_SymbolUM"
            );
            var fakturTunaiUM_UM = document.getElementById("fakturTunaiUM_UM");
            var fakturTunaiUM_SymbolDPP = document.getElementById(
                "fakturTunaiUM_SymbolDPP"
            );
            var fakturTunaiUM_DPP = document.getElementById("fakturTunaiUM_DPP");
            var fakturTunaiUM_SymbolPajak = document.getElementById(
                "fakturTunaiUM_SymbolPajak"
            );
            var fakturTunaiUM_Pajak = document.getElementById(
                "fakturTunaiUM_Pajak"
            );
            var fakturTunaiUM_Terbilang = document.getElementById(
                "fakturTunaiUM_Terbilang"
            );
            var fakturTunaiUM_SymbolTerbayar = document.getElementById(
                "fakturTunaiUM_SymbolTerbayar"
            );
            var fakturTunaiUM_Terbayar = document.getElementById(
                "fakturTunaiUM_Terbayar"
            );
            var fakturTunaiUM_SyaratBayar = document.getElementById(
                "fakturTunaiUM_SyaratBayar"
            );
            var fakturTunaiUM_TglBln = document.getElementById(
                "fakturTunaiUM_TglBln"
            );
            var fakturTunaiUM_Thn = document.getElementById("fakturTunaiUM_Thn");
            var fakturTunaiUM_PersenPPN = document.getElementById(
                "fakturTunaiUM_PersenPPN"
            );
            var fakturTunaiUM_Tempo = document.getElementById(
                "fakturTunaiUM_Tempo"
            );
            var fakturTunaiUM_SuratJalan = document.getElementById(
                "fakturTunaiUM_SuratJalan"
            );
            var fakturTunaiUM_SJ = document.getElementById("fakturTunaiUM_SJ");
            var bankBayarUM = document.getElementById("bankBayarUM");
            var ttdPimpinanUM = document.getElementById("ttdPimpinanUM");

            if (result.length === 0) {
                const elements = [
                    "fakturTunaiUM_IdPenagihan",
                    // "fakturTunaiUM_AreaPPNThnIdFakturPajak",
                    "fakturTunaiUM_NamaNPWP",
                    "fakturTunaiUM_AlamatNPWP",
                    "fakturTunaiUM_NPWP",
                    "fakturTunaiUM_NamaKelompokUtama",
                    "fakturTunaiUM_SymbolGrand",
                    "fakturTunaiUM_Grand",
                    "fakturTunaiUM_SymbolDiscount",
                    "fakturTunaiUM_Discount",
                    "fakturTunaiUM_SymbolUM",
                    "fakturTunaiUM_UM",
                    "fakturTunaiUM_SymbolDPP",
                    "fakturTunaiUM_DPP",
                    "fakturTunaiUM_SymbolPajak",
                    "fakturTunaiUM_Pajak",
                    "fakturTunaiUM_Terbilang",
                    "fakturTunaiUM_SymbolTerbayar",
                    "fakturTunaiUM_Terbayar",
                    "fakturTunaiUM_SyaratBayar",
                    "fakturTunaiUM_TglBln",
                    "fakturTunaiUM_Thn",
                    "fakturTunaiUM_PersenPPN",
                    "fakturTunaiUM_Tempo",
                    "fakturTunaiUM_SuratJalan",
                    "fakturTunaiUM_SJ",
                    "bankBayarUM",
                    "ttdPimpinanUM",
                ];

                elements.forEach((id) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.textContent = ""; // Set the value to empty string
                    }
                });

                printPreview("fakturTunaiUM");
            } else {
                if (bankSelect.value == "1") {
                    bankBayarUM.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "BCA Cab. Galaxy - Surabaya" +
                        "<br>" +
                        "a/c. 788 010 1999 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "2") {
                    bankBayarUM.innerHTML =
                        "Pembayaran melalui SCF ke Rekening:" +
                        "<br>" +
                        "BNI  Cabang Tropodo Sidoarjo" +
                        "<br>" +
                        "a/c. 6388888829 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "3") {
                    bankBayarUM.innerHTML =
                        "Pembayaran melalui SCF ke Rekening:" +
                        "<br>" +
                        "Bank Mandiri  KCP Padang Indarung" +
                        "<br>" +
                        "a/c. 111 0007609759 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "4") {
                    bankBayarUM.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank Mandiri  KCP Pondok Chandra Sidoarjo" +
                        "<br>" +
                        "a/c. 14200 5555 0007 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else if (bankSelect.value == "5") {
                    bankBayarUM.innerHTML =
                        "Pembayaran mohon ditransfer ke:" +
                        "<br>" +
                        "Bank OCBC Cab. Diponegoro - Surabaya" +
                        "<br>" +
                        "a/c. 5578 0000 9333 ( IDR )" +
                        "<br>" +
                        "a/n. PT. Kerta Rajasa Raya";
                } else {
                    bankBayarUM.innerHTML =
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;" +
                        "<br>" +
                        "&nbsp;";
                }

                if (ttdSelect.value == "1") {
                    ttdPimpinanUM.textContent = "TJAHYO SANTOSO";
                } else if (ttdSelect.value == "2") {
                    ttdPimpinanUM.textContent = "RUDY SANTOSO";
                } else if (ttdSelect.value == "3") {
                    ttdPimpinanUM.textContent = "YUDI SANTOSO";
                }

                fakturTunaiUM_IdPenagihan.textContent = decodeHtmlEntities(
                    result[0].Id_Penagihan
                );

                var date2 = new Date(result[0].Tgl_Penagihan);

                var namaBulan = [
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desember",
                ];

                var tanggal = date2.getDate();
                var bulan = namaBulan[date2.getMonth()];
                var tahunLengkap = date2.getFullYear();
                var duaDigitTahun = tahunLengkap.toString().slice(-2);
                // faktur_AreaPPNThnIdFakturPajak.textContent =
                //     decodeHtmlEntities(result[0].KdArea_Ppn) +
                //     " . 012 - " +
                //     duaDigitTahun +
                //     ". " +
                //     decodeHtmlEntities(result[0].IdFakturPajak);

                fakturTunaiUM_NamaNPWP.textContent = decodeHtmlEntities(
                    result[0].NamaNPWP
                );
                fakturTunaiUM_AlamatNPWP.textContent = decodeHtmlEntities(
                    result[0].AlamatNPWP
                );

                let npwp = result[0].NPWP;
                // let formattedNPWP =
                //     npwp.slice(0, 2) +
                //     " . " +
                //     npwp.slice(2, 5) +
                //     " . " +
                //     npwp.slice(5, 8) +
                //     " . " +
                //     npwp.slice(8, 9) +
                //     " - " +
                //     npwp.slice(9, 12) +
                //     " . " +
                //     npwp.slice(12, 15);
                fakturTunaiUM_NPWP.textContent = npwp;

                fakturTunaiUM_NamaKelompokUtama.textContent = decodeHtmlEntities(
                    result[0].NAMATYPEBARANG
                );

                let totalGrand = 0;
                let count = 0;
                var fakturTunaiUM_Detail = document.getElementById(
                    "fakturTunaiUM_Detail"
                );

                fakturTunaiUM_Detail.innerHTML = "";
                console.log(result);

                result.forEach(function (item, index) {
                    console.log(item);

                    var row = document.createElement("div");
                    row.classList.add("row", "small-font");
                    count += 1;

                    var coaCol = document.createElement("div");
                    coaCol.classList.add(
                        "col-sm-1",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    coaCol.textContent = count;
                    row.appendChild(coaCol);

                    var accountCol = document.createElement("div");
                    accountCol.classList.add(
                        "col-sm-5",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    console.log(item);

                    accountCol.textContent = item.NamaBarang
                        ? decodeHtmlEntities(item.NamaBarang)
                        : "";
                    row.appendChild(accountCol);

                    var descriptionCol = document.createElement("div");
                    descriptionCol.classList.add(
                        "col-sm-2",
                        "text-right",
                        "small-normal"
                    );
                    descriptionCol.textContent = item.Qty
                        ? numeral(item.Qty).format("0,0.00") + item.Satuan
                        : "";
                    row.appendChild(descriptionCol);

                    var amountCol = document.createElement("div");
                    amountCol.classList.add(
                        "col-sm-2",
                        "text-right",
                        "small-normal"
                    );
                    amountCol.textContent = item.HargaSatuan
                        ? decodeHtmlEntities(item.Symbol2) +
                        numeral(item.HargaSatuan).format("0,0.00")
                        : "0.00";
                    row.appendChild(amountCol);

                    var totalCol = document.createElement("div");
                    totalCol.classList.add(
                        "col-sm-3",
                        "text-center",
                        "small-normal",
                        "description-right"
                    );
                    // let tempTotal =
                    //     numeral(0).value() *
                    //     numeral(0).value();
                    // totalCol.textContent = 0
                    //     ? decodeHtmlEntities(item.Symbol2) +
                    //       numeral(0).format("0,0.00")
                    //     : "0.00";
                    // row.appendChild(totalCol);
                    let tempTotal =
                        numeral(item.Qty).value() *
                        numeral(item.HargaSatuan).value();
                    totalCol.textContent = tempTotal
                        ? decodeHtmlEntities(item.Symbol2) +
                        numeral(tempTotal).format("0,0.00")
                        : decodeHtmlEntities(item.Symbol2) + "0.00";
                    row.appendChild(totalCol);

                    fakturTunaiUM_Detail.appendChild(row);

                    totalGrand += numeral(tempTotal).value();

                    var additionalRow = document.createElement("div");
                    additionalRow.classList.add("row", "small-font");

                    var mantap = document.createElement("div");
                    mantap.classList.add(
                        "col-sm-1",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    additionalRow.appendChild(mantap);

                    var additionalCoaCol = document.createElement("div");
                    additionalCoaCol.classList.add(
                        "col-sm-5",
                        "text-left",
                        "small-font",
                        "description-left"
                    );
                    additionalCoaCol.textContent =
                        "PO :" + " " + item.PO
                            ? "PO :" + " " + decodeHtmlEntities(item.PO)
                            : "";
                    additionalRow.appendChild(additionalCoaCol);

                    // var additionalAccountCol =
                    //     document.createElement("div");
                    // additionalAccountCol.classList.add(
                    //     "col-sm-10",
                    //     "text-left",
                    //     "small-font"
                    // );
                    // additionalAccountCol.textContent = item.NO_PO
                    //     ? decodeHtmlEntities(item.NO_PO)
                    //     : "";
                    // additionalRow.appendChild(additionalAccountCol);

                    fakturTunaiUM_Detail.appendChild(additionalRow);
                });

                fakturTunaiUM_SymbolGrand.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturTunaiUM_SymbolDiscount.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturTunaiUM_SymbolUM.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturTunaiUM_SymbolDPP.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturTunaiUM_SymbolPajak.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                fakturTunaiUM_SymbolTerbayar.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );

                fakturTunaiUM_Grand.textContent =
                    numeral(totalGrand).format("0,0.00");

                fakturTunaiUM_Discount.textContent = numeral(
                    result[0].Discount
                ).format("0,0.00");

                // fakturTunaiUM_UM.textContent = result[0].Nilai_UM
                //     ? numeral((result[0].Nilai_UM * 11) / 12).format("0,0.00")
                //     : "0.00";
                fakturTunaiUM_UM.textContent = numeral(result[0].Nilai_UM).format("0,0.00");

                let tempdpp =
                    numeral(totalGrand).value() -
                    numeral(result[0].Discount).value() -
                    numeral(result[0].Nilai_UM).value();
                if (duaDigitTahun > 24) {
                    fakturTunaiUM_DPP.textContent = numeral(
                        (result[0].Nilai_blm_Pajak * 11) / 12
                    ).format("0,0.00");
                } else {
                    fakturTunaiUM_DPP.textContent =
                        numeral(tempdpp).format("0,0.00");
                }

                let tempPajak =
                    Math.round(
                        ((tempdpp * numeral(result[0].PersenPPN).value()) / 100) *
                        100
                    ) / 100;

                if (duaDigitTahun > 24) {
                    fakturTunaiUM_Pajak.textContent = numeral(
                        ((tempdpp * 11) / 12) * 0.12
                    ).format("0,0.00");
                } else {
                    fakturTunaiUM_Pajak.textContent =
                        numeral(tempPajak).format("0,0.00");
                }

                if (duaDigitTahun > 24) {
                    let terbayar =
                        numeral(tempdpp).value() +
                        numeral(fakturTunaiUM_Pajak.textContent).value();
                    fakturTunaiUM_Terbayar.textContent =
                        numeral(terbayar).format("0,0.00");
                    TTerbilang = convertNumberToWordsRupiah(
                        numeral(fakturTunaiUM_Terbayar.textContent).value()
                    );
                    fakturTunaiUM_Terbilang.innerHTML =
                        "&emsp;" + decodeHtmlEntities(TTerbilang);
                } else {
                    let terbayar =
                        numeral(tempdpp).value() + numeral(tempPajak).value();
                    fakturTunaiUM_Terbayar.textContent =
                        numeral(terbayar).format("0,0.00");
                    fakturTunaiUM_Terbilang.textContent = decodeHtmlEntities(
                        result[0].Terbilang
                    );
                }

                fakturTunaiUM_SyaratBayar.innerHTML =
                    "Syarat Pembayaran: &emsp;&emsp;" +
                    decodeHtmlEntities(result[0].SyaratBayar) +
                    " Hari";

                fakturTunaiUM_TglBln.textContent = tanggal + " " + bulan;
                fakturTunaiUM_Thn.textContent = duaDigitTahun;
                if (duaDigitTahun > 24) {
                    fakturTunaiUM_PersenPPN.innerHTML = "<strong>12%</strong>";
                } else {
                    fakturTunaiUM_PersenPPN.innerHTML = "<strong>11%</strong>";
                }

                let syaratBayar = result[0].SyaratBayar;
                let tglTerimaBarang = result[0].Tgl_Penagihan;
                let syaratBayarNumber = Number(syaratBayar);
                let date3 = new Date(tglTerimaBarang);
                let resultDate = new Date(date3);
                resultDate.setDate(date3.getDate() + syaratBayarNumber);
                fakturTunaiUM_Tempo.innerHTML =
                    "Jatuh Tempo: &emsp;&emsp; " + formatDateToMMDDYYYY(resultDate);

                // if (sFormula0.length > 255) {
                //   faktur_SuratJalan.innerHTML =
                //     "Surat Jalan: &emsp;&emsp; " + sFormula0.slice(0, 252);
                //   faktur_SJ.textContent = sFormula0.slice(252);
                // } else {
                //   faktur_SuratJalan.innerHTML = "Surat Jalan: &emsp;&emsp; " + sFormula0;
                //   faktur_SJ.textContent = "";
                // }

                printPreview("fakturTunaiUM");
            }
        }
    }
}

btnBrowse.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Customer",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "CetakNotaDanFaktur/getCust",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                Tgl_Penagihan: tglPenagihan.value,
                            },
                        },
                        columns: [
                            { data: "NamaCust" },
                            { data: "Id_Penagihan" },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                customer.value = decodeHtmlEntities(
                    result.value.NamaCust.trim()
                );
                idPenagihan.value = decodeHtmlEntities(
                    result.value.Id_Penagihan.trim()
                );

                if (
                    idPenagihan.value !== "" &&
                    (optNotaFaktur.checked ||
                        optPajak.checked ||
                        optPajakTunai.checked ||
                        optTunai.checked ||
                        optPajakUM.checked ||
                        optUM.checked)
                ) {
                    Promise.all([
                        DisplaySuratJalan(idPenagihan.value),
                        DisplayPajak(idPenagihan.value),
                    ])
                        .then(() => {
                            btnPrev.click();
                        })
                        .catch((error) => {
                            console.error(
                                "Ada error saat mengeksekusi:",
                                error
                            );
                        });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

let xnomor, sFormula0;
let sIdFakturPajak, sIdMataUang;

function DisplaySuratJalan(sid_Penagihan) {
    return new Promise((resolve, reject) => {
        xnomor = "";
        $.ajax({
            type: "GET",
            url: "CetakNotaDanFaktur/getSuratJalan",
            data: {
                _token: csrfToken,
                Id_Penagihan: sid_Penagihan.trim(),
            },
            success: function (result) {
                if (result.length !== 0) {
                    result.forEach(function (item, index) {
                        if (xnomor !== "") {
                            xnomor += ", ";
                        }
                        xnomor += item.Surat_Jalan;
                    });
                    sFormula0 = xnomor;
                }
                resolve();
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

function DisplayPajak(sid_Penagihan) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "CetakNotaDanFaktur/getPajak",
            data: {
                _token: csrfToken,
                Id_Penagihan: sid_Penagihan.trim(),
            },
            success: function (result) {
                if (result.length !== 0) {
                    sIdFakturPajak = result[0].IdFakturPajak
                        ? decodeHtmlEntities(result[0].IdFakturPajak.trim())
                        : "";
                    sIdMataUang = result[0].Id_MataUang
                        ? decodeHtmlEntities(result[0].Id_MataUang.trim())
                        : "";
                } else {
                    sIdFakturPajak = "";
                    sIdMataUang = "";
                }
                resolve();
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                reject(error);
            },
        });
    });
}

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

function escapeHtml(text) {
    var map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}

function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: "nearest" });
}

function handleTableKeydown(e, tableId) {
    const table = $(`#${tableId}`).DataTable();
    const rows = $(`#${tableId} tbody tr`);
    const rowCount = rows.length;

    if (e.key === "Enter") {
        e.preventDefault();
        const selectedRow = table.row(".selected").data();
        if (selectedRow) {
            Swal.getConfirmButton().click();
        } else {
            const firstRow = $(`#${tableId} tbody tr:first-child`);
            if (firstRow.length) {
                firstRow.click();
                Swal.getConfirmButton().click();
            }
        }
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === null || currentIndex >= rowCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null || currentIndex <= 0) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex--;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table
                .page("next")
                .draw("page")
                .on("draw", function () {
                    currentIndex = 0;
                    const newRows = $(`#${tableId} tbody tr`);
                    const selectedRow = $(newRows[currentIndex]).addClass(
                        "selected"
                    );
                    scrollRowIntoView(selectedRow[0]);
                });
        }
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table
                .page("previous")
                .draw("page")
                .on("draw", function () {
                    currentIndex = 0;
                    const newRows = $(`#${tableId} tbody tr`);
                    const selectedRow = $(newRows[currentIndex]).addClass(
                        "selected"
                    );
                    scrollRowIntoView(selectedRow[0]);
                });
        }
    }
}
