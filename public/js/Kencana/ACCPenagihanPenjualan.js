$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let idPenagihan = document.getElementById("idPenagihan");
    let fakturPajak = document.getElementById("fakturPajak");
    let sIdMataUang = document.getElementById("idMataUang");
    let table_atas = $("#table_atas").DataTable({
        columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
    });
    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [0], visible: false }],
    });

    table_atas = $("#table_atas").DataTable({
        responsive: false,
        processing: true,
        serverSide: true,
        destroy: true,
        scrollX: true,
        // width: "150%",
        ajax: {
            url: "/Kencana/ACCPenagihanPenjualanKencana/getPenagihan",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                });
            },
        },
        columns: [
            {
                data: "Tgl_Penagihan",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "NamaCust" },
            { data: "PO" },
            { data: "Nilai_Penagihan" },
            { data: "Nama_MataUang" },
            { data: "Id_Customer" },
            { data: "Id_MataUang" },
            { data: "NilaiKurs" },
            { data: "NamaNPWP" },
            { data: "JnsCust" },
            { data: "IdFakturPajak" },
            { data: "Nama_Jns_PPN" },
        ],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
        columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
    });

    var arrData = [];
    // table_atas.cell(rowIndex, 1).data();

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        rowIndex = table_atas.row(this).index();
        // console.log(data);

        arrData = data;

        idPenagihan.value = data.Id_Penagihan;
        fakturPajak.value = data.IdFakturPajak;
        sIdMataUang.value = data.Id_MataUang;

        table_bawah = $("#table_bawah").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            scrollX: true,
            // width: "150%",
            ajax: {
                url: "/Kencana/ACCPenagihanPenjualanKencana/getDetailPenagihan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        ID_Penagihan: data.Id_Penagihan,
                    });
                },
            },
            columns: [
                {
                    data: "Surat_Jalan",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "Tgl_Surat_jalan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });
    });

    let rowDataArray = [];
    let rowDataPertama;

    // Handle checkbox change events
    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                // rowDataArray.push(rowDataPertama);
                rowDataArray = [rowDataPertama];

                // console.log(rowDataArray);
                // console.log(rowDataPertama, this, table_atas);
            } else {
                // rowDataPertama = null;
                // Remove the unchecked row data from the array
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Penagihan
                rowDataArray = rowDataArray.filter(
                    (row) => row.Id_Penagihan !== rowDataPertama.Id_Penagihan
                );

                // console.log(rowDataArray);
                // console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    let adaSJ = false,
        adaSP = false;
    btn_proses.addEventListener("click", function (e) {
        const rowData = table_atas.row(rowIndex).data(); // Retrieve data for the row with the given index
        console.log(`Data for row ${rowIndex}:`, rowData);

        adaSJ = false;
        adaSP = false;
        if (
            table_atas.cell(rowIndex, 10).data() === "PNX" ||
            table_atas.cell(rowIndex, 10).data() === "PWX"
        ) {
            if (table_atas.cell(rowIndex, 9).data() === "") {
                Swal.fire({
                    icon: "error",
                    text: "Data Tidak dapat di-ACC, Isi dulu Nama dan Alamat NPWPnya !..",
                    returnFocus: false,
                });
            }

            $.ajax({
                type: "PUT",
                url: "/Kencana/ACCPenagihanPenjualanKencana/proses",
                data: {
                    _token: csrfToken,
                    Id_Penagihan: table_atas.cell(rowIndex, 1).data(),
                    IdCust: table_atas.cell(rowIndex, 6).data(),
                    IdMtUang: table_atas.cell(rowIndex, 7).data(),
                    debet: numeral(table_atas.cell(rowIndex, 4).data()).value(),
                    kurs: numeral(table_atas.cell(rowIndex, 8).data()).value(),
                },
                success: function () {
                    $.ajax({
                        type: "PUT",
                        url: "/Kencana/ACCPenagihanPenjualanKencana/proses",
                        data: {
                            _token: csrfToken,
                            Id_Penagihan: table_atas.cell(rowIndex, 1).data(),
                            IdCust: table_atas.cell(rowIndex, 6).data(),
                            IdMtUang: table_atas.cell(rowIndex, 7).data(),
                            debet: numeral(
                                table_atas.cell(rowIndex, 4).data()
                            ).value(),
                            kurs: numeral(
                                table_atas.cell(rowIndex, 8).data()
                            ).value(),
                        },
                        success: function () {
                            displaySuratJalan()
                                .then(() => cekCtkSJ())
                                .then(() => cekCtkSP())
                                .then(() => {
                                    Swal.fire({
                                        icon: "success",
                                        text: "Proses Acc Penagihan Surat Jalan Selesai !!.",
                                        returnFocus: false,
                                    }).then(() => {
                                        // if (adaSP) {
                                        //     Swal.fire({
                                        //         icon: "info",
                                        //         text: "Cetak Tunai !!",
                                        //         returnFocus: false,
                                        //     }).then(() => {
                                        //         sType = "Cetaknotatunai";
                                        //         getViewSP(sType);
                                        //     });
                                        // }

                                        // if (adaSJ) {
                                        //     Swal.fire({
                                        //         icon: "info",
                                        //         text: "Cetak Nota/Faktur !!",
                                        //         returnFocus: false,
                                        //     }).then(() => {
                                        //         sType = "CetakNotaFaktur";
                                        //         getViewSJ(sType);
                                        //     });
                                        // }

                                        table_atas.ajax.reload(null, false);
                                    });
                                })
                                .catch((error) => {
                                    console.error("An error occurred:", error);
                                });
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });
        } else {
            $.ajax({
                type: "PUT",
                url: "/Kencana/ACCPenagihanPenjualanKencana/proses",
                data: {
                    _token: csrfToken,
                    Id_Penagihan: table_atas.cell(rowIndex, 1).data(),
                    IdCust: table_atas.cell(rowIndex, 6).data(),
                    IdMtUang: table_atas.cell(rowIndex, 7).data(),
                    debet: numeral(table_atas.cell(rowIndex, 4).data()).value(),
                    kurs: numeral(table_atas.cell(rowIndex, 8).data()).value(),
                },
                success: function () {
                    $.ajax({
                        type: "PUT",
                        url: "/Kencana/ACCPenagihanPenjualanKencana/proses",
                        data: {
                            _token: csrfToken,
                            Id_Penagihan: table_atas.cell(rowIndex, 1).data(),
                            IdCust: table_atas.cell(rowIndex, 6).data(),
                            IdMtUang: table_atas.cell(rowIndex, 7).data(),
                            debet: numeral(
                                table_atas.cell(rowIndex, 4).data()
                            ).value(),
                            kurs: numeral(
                                table_atas.cell(rowIndex, 8).data()
                            ).value(),
                        },
                        success: function () {
                            displaySuratJalan()
                                .then(() => cekCtkSJ())
                                .then(() => cekCtkSP())
                                .then(() => {
                                    Swal.fire({
                                        icon: "success",
                                        text: "Proses Acc Penagihan Surat Jalan Selesai !!.",
                                        returnFocus: false,
                                    }).then(() => {
                                        if (adaSP) {
                                            Swal.fire({
                                                icon: "info",
                                                text: "Cetak Tunai !!",
                                                returnFocus: false,
                                            }).then(() => {
                                                sType = "Cetaknotatunai";
                                                getViewSP(sType);
                                            });
                                        }

                                        if (adaSJ) {
                                            Swal.fire({
                                                icon: "info",
                                                text: "Cetak Nota/Faktur !!",
                                                returnFocus: false,
                                            }).then(() => {
                                                sType = "CetakNotaFaktur";
                                                getViewSJ(sType);
                                            });
                                        }

                                        table_atas.ajax.reload(null, false);
                                    });
                                })
                                .catch((error) => {
                                    console.error("An error occurred:", error);
                                });
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });
        }
    });

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

    function getViewSJ(sType) {
        $.ajax({
            type: "GET",
            url: "/Kencana/CetakNotaDanFakturKencana/getSJ",
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
            url: "/Kencana/CetakNotaDanFakturKencana/getSP",
            data: {
                _token: csrfToken,
                Id_Penagihan: idPenagihan.value.trim(),
            },
            success: function (result) {
                if (sType === "Cetaknotatunai") {
                    rpt_cetakNotaTunai(result);
                } else if (sType === "CetakFakturPajakTunai") {
                    rpt_CetakFakturPajakTunai(result);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }

    function rpt_cetakNotaFaktur(result) {
        let noInv = "";
        if (idPenagihan.value.length > 14) {
            noInv = idPenagihan.value;

            // print faktur
            var faktur_IdPenagihan =
                document.getElementById("faktur_IdPenagihan");
            var faktur_AreaPPNThnIdFakturPajak = document.getElementById(
                "faktur_AreaPPNThnIdFakturPajak"
            );
            var faktur_NamaNPWP = document.getElementById("faktur_NamaNPWP");
            var faktur_AlamatNPWP =
                document.getElementById("faktur_AlamatNPWP");
            var faktur_NPWP = document.getElementById("faktur_NPWP");
            var faktur_NamaKelompokUtama = document.getElementById(
                "faktur_NamaKelompokUtama"
            );
            var faktur_SymbolGrand =
                document.getElementById("faktur_SymbolGrand");
            var faktur_Grand = document.getElementById("faktur_Grand");
            var faktur_SymbolUM = document.getElementById("faktur_SymbolUM");
            var faktur_UM = document.getElementById("faktur_UM");
            var faktur_SymbolDPP = document.getElementById("faktur_SymbolDPP");
            var faktur_DPP = document.getElementById("faktur_DPP");
            var faktur_SymbolPajak =
                document.getElementById("faktur_SymbolPajak");
            var faktur_Pajak = document.getElementById("faktur_Pajak");
            var faktur_Terbilang = document.getElementById("faktur_Terbilang");
            var faktur_SymbolTerbayar = document.getElementById(
                "faktur_SymbolTerbayar"
            );
            var faktur_Terbayar = document.getElementById("faktur_Terbayar");
            var faktur_SyaratBayar =
                document.getElementById("faktur_SyaratBayar");
            var faktur_TglBln = document.getElementById("faktur_TglBln");
            var faktur_Thn = document.getElementById("faktur_Thn");
            var faktur_PersenPPN = document.getElementById("faktur_PersenPPN");
            var faktur_Tempo = document.getElementById("faktur_Tempo");
            var faktur_SuratJalan =
                document.getElementById("faktur_SuratJalan");
            var faktur_SJ = document.getElementById("faktur_SJ");

            if (result.length === 0) {
                const elements = [
                    "faktur_IdPenagihan",
                    "faktur_AreaPPNThnIdFakturPajak",
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
                ];

                elements.forEach((id) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.textContent = ""; // Set the value to empty string
                    }
                });

                printPreview("faktur");
            } else {
                faktur_IdPenagihan.textContent = decodeHtmlEntities(
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
                faktur_AreaPPNThnIdFakturPajak.textContent =
                    decodeHtmlEntities(result[0].KdArea_Ppn) +
                    " . 012 - " +
                    duaDigitTahun +
                    ". " +
                    decodeHtmlEntities(result[0].IdFakturPajak);

                faktur_NamaNPWP.textContent = decodeHtmlEntities(
                    result[0].NamaNPWP
                );
                faktur_AlamatNPWP.textContent = decodeHtmlEntities(
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
                faktur_NPWP.textContent = formattedNPWP;

                faktur_NamaKelompokUtama.textContent = decodeHtmlEntities(
                    result[0].NamaKelompokUtama
                );

                let totalGrand = 0;
                let count = 0;
                var faktur_Detail = document.getElementById("faktur_Detail");

                faktur_Detail.innerHTML = "";

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

                    faktur_Detail.appendChild(row);

                    totalGrand += numeral(tempTotal).value();

                    var additionalRow = document.createElement("div");
                    additionalRow.classList.add("row");

                    var mantap = document.createElement("div");
                    mantap.classList.add("col-sm-1", "text-right");
                    additionalRow.appendChild(mantap);

                    var additionalCoaCol = document.createElement("div");
                    additionalCoaCol.classList.add("col-sm-1", "text-right");
                    additionalCoaCol.textContent = "P O :";
                    additionalRow.appendChild(additionalCoaCol);

                    var additionalAccountCol = document.createElement("div");
                    additionalAccountCol.classList.add(
                        "col-sm-10",
                        "text-left"
                    );
                    additionalAccountCol.textContent = item.NO_PO
                        ? decodeHtmlEntities(item.NO_PO)
                        : "";
                    additionalRow.appendChild(additionalAccountCol);

                    faktur_Detail.appendChild(additionalRow);
                });

                faktur_SymbolGrand.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                faktur_SymbolUM.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                faktur_SymbolDPP.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                faktur_SymbolPajak.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );
                faktur_SymbolTerbayar.textContent = decodeHtmlEntities(
                    result[0].Symbol2
                );

                faktur_Grand.textContent = numeral(totalGrand).format("0,0.00");

                faktur_UM.textContent = result[0].Nilai_UM
                    ? numeral(result[0].Nilai_UM).format("0,0.00")
                    : "0.00";

                let dpp =
                    numeral(faktur_Grand.textContent).value() -
                    numeral(faktur_UM.textContent).value();
                if (duaDigitTahun > 24) {
                    faktur_DPP.textContent = numeral((dpp * 11) / 12).format(
                        "0,0.00"
                    );
                } else {
                    faktur_DPP.textContent = numeral(dpp).format("0,0.00");
                }

                let pajak =
                    (Math.round(numeral(dpp).value()) *
                        numeral(result[0].PersenPPN).value()) /
                    100;
                faktur_Pajak.textContent = numeral(pajak).format("0,0.00");

                let terbayar = numeral(dpp).value() + numeral(pajak).value();
                faktur_Terbayar.textContent =
                    numeral(terbayar).format("0,0.00");

                faktur_Terbilang.textContent = decodeHtmlEntities(
                    result[0].Terbilang
                );

                faktur_SyaratBayar.innerHTML =
                    "Syarat Pembayaran: &emsp;&emsp;" +
                    decodeHtmlEntities(result[0].SyaratBayar) +
                    " Hari";

                faktur_TglBln.textContent = tanggal + " " + bulan;
                faktur_Thn.textContent = duaDigitTahun;
                if (duaDigitTahun > 24) {
                    faktur_PersenPPN.innerHTML = "<strong>12%</strong>";
                } else {
                    faktur_PersenPPN.innerHTML = "<strong>11%</strong>";
                }

                let syaratBayar = result[0].SyaratBayar;
                let tglTerimaBarang = result[0].Tgl_Terima_Barang;
                let syaratBayarNumber = Number(syaratBayar);
                let date3 = new Date(tglTerimaBarang);
                let resultDate = new Date(date3);
                resultDate.setDate(date3.getDate() + syaratBayarNumber);
                faktur_Tempo.innerHTML =
                    "Jatuh Tempo: &emsp;&emsp; " +
                    formatDateToMMDDYYYY(resultDate);

                if (sFormula0.length > 255) {
                    faktur_SuratJalan.innerHTML =
                        "Surat Jalan: &emsp;&emsp; " + sFormula0.slice(0, 252);
                    faktur_SJ.textContent = sFormula0.slice(252);
                } else {
                    faktur_SuratJalan.innerHTML =
                        "Surat Jalan: &emsp;&emsp; " + sFormula0;
                    faktur_SJ.textContent = "";
                }

                printPreview("faktur");

                if (fakturPajak.value !== "") {
                    Swal.fire({
                        icon: "info",
                        text: "Cetak Faktur Pajak !!",
                        returnFocus: false,
                    }).then(() => {
                        sType = "CetakFakturPajak";
                        getViewSJ(sType);
                    });
                }
            }
        } else {
            // print nota
            var nota_IdPenagihan = document.getElementById("nota_IdPenagihan");
            var nota_NamaCust = document.getElementById("nota_NamaCust");
            var nota_Alamat = document.getElementById("nota_Alamat");
            var nota_NamaKelompokUtama = document.getElementById(
                "nota_NamaKelompokUtama"
            );
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

                        var additionalAccountCol =
                            document.createElement("div");
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
                    "Jatuh Tempo: &emsp;&emsp; " +
                    formatDateToMMDDYYYY(resultDate);

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

                if (fakturPajak.value !== "") {
                    Swal.fire({
                        icon: "info",
                        text: "Cetak Faktur Pajak !!",
                        returnFocus: false,
                    }).then(() => {
                        sType = "CetakFakturPajak";
                        getViewSJ(sType);
                    });
                }
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
            var fakturPajak1_NPWP =
                document.getElementById("fakturPajak1_NPWP");
            var fakturPajak1_NPWP2 =
                document.getElementById("fakturPajak1_NPWP2");
            var fakturPajak1_NamaKelompokUtama = document.getElementById(
                "fakturPajak1_NamaKelompokUtama"
            );
            var fakturPajak1_Detail = document.getElementById(
                "fakturPajak1_Detail"
            );
            var fakturPajak1_SymbolGrand = document.getElementById(
                "fakturPajak1_SymbolGrand"
            );
            var fakturPajak1_Grand =
                document.getElementById("fakturPajak1_Grand");
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
            var fakturPajak1_Pajak =
                document.getElementById("fakturPajak1_Pajak");
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
            var fakturPajak_NPWP2 =
                document.getElementById("fakturPajak_NPWP2");
            var fakturPajak_NamaKelompokUtama = document.getElementById(
                "fakturPajak_NamaKelompokUtama"
            );
            var fakturPajak_Detail =
                document.getElementById("fakturPajak_Detail");
            var fakturPajak_SymbolGrand = document.getElementById(
                "fakturPajak_SymbolGrand"
            );
            var fakturPajak_Grand =
                document.getElementById("fakturPajak_Grand");
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
            var fakturPajak_Pajak =
                document.getElementById("fakturPajak_Pajak");
            var fakturPajak_TglBln =
                document.getElementById("fakturPajak_TglBln");
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

    function rpt_cetakNotaTunai(result) {
        if (idPenagihan.value.length > 14) {
            var fakturTunai_AreaPPNThnIdFakturPajak = document.getElementById(
                "fakturTunai_AreaPPNThnIdFakturPajak"
            );
            var fakturTunai_IdPenagihan = document.getElementById(
                "fakturTunai_IdPenagihan"
            );
            var fakturTunai_NamaNPWP = document.getElementById(
                "fakturTunai_NamaNPWP"
            );
            var fakturTunai_AlamatNPWP = document.getElementById(
                "fakturTunai_AlamatNPWP"
            );
            var fakturTunai_NPWP = document.getElementById("fakturTunai_NPWP");
            var fakturTunai_NamaKelompokUtama = document.getElementById(
                "fakturTunai_NamaKelompokUtama"
            );
            var fakturTunai_Detail =
                document.getElementById("fakturTunai_Detail");
            var fakturTunai_SymbolGrand = document.getElementById(
                "fakturTunai_SymbolGrand"
            );
            var fakturTunai_Grand =
                document.getElementById("fakturTunai_Grand");
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
            var fakturTunai_Pajak =
                document.getElementById("fakturTunai_Pajak");
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
            var fakturTunai_TglBln =
                document.getElementById("fakturTunai_TglBln");
            var fakturTunai_Thn = document.getElementById("fakturTunai_Thn");
            var fakturTunai_Tempo =
                document.getElementById("fakturTunai_Tempo");

            if (result.length === 0) {
                const elements = [
                    "fakturTunai_AreaPPNThnIdFakturPajak",
                    "fakturTunai_IdPenagihan",
                    "fakturTunai_NamaNPWP",
                    "fakturTunai_AlamatNPWP",
                    "fakturTunai_NPWP",
                    "fakturTunai_NamaKelompokUtama",
                    "fakturTunai_Detail",
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
                    "fakturTunai_Tempo",
                ];

                elements.forEach((id) => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.textContent = ""; // Set text content to an empty string
                    }
                });

                printPreview("fakturTunai");
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
                fakturTunai_IdPenagihan.textContent = decodeHtmlEntities(
                    result[0].Id_Penagihan
                );
                fakturTunai_AreaPPNThnIdFakturPajak.textContent =
                    decodeHtmlEntities(result[0].KdArea_Ppn) +
                    " 010 " +
                    duaDigitTahun +
                    decodeHtmlEntities(result[0].IdFakturPajak);

                fakturTunai_NamaNPWP.textContent = decodeHtmlEntities(
                    result[0].NamaNPWP
                );
                fakturTunai_AlamatNPWP.textContent = decodeHtmlEntities(
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
                faktur_NPWP.textContent = formattedNPWP;
                fakturTunai_NPWP.textContent = formattedNPWP;

                fakturTunai_NamaKelompokUtama.textContent = decodeHtmlEntities(
                    result[0].NAMATYPEBARANG
                );

                // detail
                let totalGrand = 0;
                let count = 0;
                var fakturTunai_Detail =
                    document.getElementById("fakturTunai_Detail");

                fakturTunai_Detail.innerHTML = "";

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

                    fakturTunai_Detail.appendChild(row);

                    totalGrand += numeral(tempTotal).value();

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
                    additionalAccountCol.textContent = item.PO
                        ? "P O : " + decodeHtmlEntities(item.PO)
                        : "";
                    additionalRow.appendChild(additionalAccountCol);

                    fakturTunai_Detail.appendChild(additionalRow);
                });

                fakturTunai_Grand.textContent =
                    numeral(totalGrand).format("0,0.00");
                fakturTunai_Discount.textContent = numeral(
                    result[0].Discount
                ).format("0,0.00");
                fakturTunai_UM.textContent = numeral(result[0].Nilai_UM).format(
                    "0,0.00"
                );

                let dppTemp =
                    numeral(fakturTunai_Grand.textContent).value() -
                    numeral(fakturTunai_Discount.textContent).value() -
                    numeral(fakturTunai_UM.textContent).value();
                fakturTunai_DPP.textContent = numeral(dppTemp).format("0,0.00");

                tempPajak = numeral(fakturTunai_DPP.textContent).value() * 0.11;
                fakturTunai_Pajak.textContent =
                    numeral(tempPajak).format("0,0.00");

                terbayarTemp =
                    numeral(dppTemp).value() + numeral(tempPajak).value();
                fakturTunai_Terbayar.textContent =
                    numeral(terbayarTemp).format("0,0.00");

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

                fakturTunai_Terbilang.textContent = decodeHtmlEntities(
                    result[0].Terbilang
                );

                fakturTunai_SyaratBayar.innerHTML =
                    "Syarat Pembayaran: &emsp;&emsp;" +
                    decodeHtmlEntities(result[0].SyaratBayar) +
                    " Hari";

                fakturTunai_TglBln.textContent = tanggal + " " + bulan;
                fakturTunai_Thn.textContent = duaDigitTahun;

                let syaratBayar = result[0].SyaratBayar;
                let tglTerimaBarang = result[0].Tgl_Penagihan;
                let syaratBayarNumber = Number(syaratBayar);
                let date3 = new Date(tglTerimaBarang);
                let resultDate = new Date(date3);
                resultDate.setDate(date3.getDate() + syaratBayarNumber);
                fakturTunai_Tempo.innerHTML =
                    "Jatuh Tempo: &emsp;&emsp; " +
                    formatDateToMMDDYYYY(resultDate);

                fakturTunai_TglBln.textContent = tanggal + " " + bulan;
                fakturTunai_Thn.textContent = duaDigitTahun;

                printPreview("fakturTunai");
            }
        } else {
            // Declaring variables for each element by their id
            var nota1_IdPenagihan =
                document.getElementById("nota1_IdPenagihan");
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
                nota1_NamaCust.textContent = decodeHtmlEntities(
                    result[0].NamaCust
                );
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
                nota1_Terbayar.textContent =
                    numeral(totalGrand).format("0,0.00");

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
            var fakturPajakTunai_AreaPPNThnIdFakturPajak =
                document.getElementById(
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
                    additionalAccountCol.classList.add(
                        "col-sm-10",
                        "text-left"
                    );
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

                fakturPajakTunai_SymbolDiscount.textContent =
                    decodeHtmlEntities(result[0].Symbol2);
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

    function printPreview(previewClass) {
        document
            .querySelectorAll(".faktur, .fakturXC")
            .forEach(function (preview) {
                preview.style.display = "none";
            });

        const previewToPrint = document.querySelector(`.${previewClass}`);
        previewToPrint.style.display = "block";

        window.print();

        previewToPrint.style.display = "none";
    }

    let Ynomor = "";

    function cekCtkSJ() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "/Kencana/ACCPenagihanPenjualanKencana/cekCtkSJ",
                data: {
                    _token: csrfToken,
                    IdPenagihan: idPenagihan.value,
                },
                success: function (result) {
                    if (result[0].Ada > 0) {
                        adaSJ = true;
                    }
                    console.log(adaSJ);

                    resolve();
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                    reject(error);
                },
            });
        });
    }

    function cekCtkSP() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "/Kencana/ACCPenagihanPenjualanKencana/cekCtkSP",
                data: {
                    _token: csrfToken,
                    IdPenagihan: idPenagihan.value,
                },
                success: function (result) {
                    if (result[0].Ada > 0) {
                        adaSP = true;
                    }
                    console.log(adaSP);

                    resolve();
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                    reject(error);
                },
            });
        });
    }

    function displaySuratJalan() {
        Ynomor = "";
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "/Kencana/ACCPenagihanPenjualanKencana/displaySuratJalan",
                data: {
                    _token: csrfToken,
                    ID_PENAGIHAN: idPenagihan.value,
                },
                success: function (result) {
                    if (result.length > 0) {
                        result.forEach(function (item, index) {
                            if (Ynomor !== "") {
                                Ynomor += ", ";
                            }
                            Ynomor += item.Surat_Jalan;
                        });
                    }
                    sFormula0 = Ynomor;
                    resolve(Ynomor); // Resolve the promise with Ynomor value
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                    reject(error); // Reject the promise on error
                },
            });
        });
    }
});
