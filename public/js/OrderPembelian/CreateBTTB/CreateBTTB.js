$(document).ready(function () {
    //#region Variable

    const kodeBarangElement = document.getElementById("kode_barang");
    let btn_remove = document.getElementById("btn_remove");
    let btn_toleransi = document.getElementById("btn_toleransi");
    let btn_update = document.getElementById("btn_update");
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    let data;
    let disc = document.getElementById("disc");
    let dpp_nilaiLain = document.getElementById("dpp_nilaiLain");
    let fixValueQTYOrder;
    let fixValueQTYReceived;
    let fixValueQTYRemain;
    let fixValueQTYShip;
    let harga_sub_total = document.getElementById("harga_sub_total");
    let harga_total = document.getElementById("harga_total");
    let harga_unit = document.getElementById("harga_unit");
    let idr_dpp = document.getElementById("idr_dpp");
    let idr_harga_total = document.getElementById("idr_harga_total");
    let idr_ppn = document.getElementById("idr_ppn");
    let idr_sub_total = document.getElementById("idr_sub_total");
    let idr_total_disc = document.getElementById("idr_total_disc");
    let idr_unit = document.getElementById("idr_unit");
    let kode_barang = document.getElementById("kode_barang");
    let kodehs = document.getElementById("kodehs");
    let kurs = document.getElementById("kurs");
    let mata_uang = document.getElementById("mata_uang");
    let maxLimit;
    let nama_barang = document.getElementById("nama_barang");
    let no_po = document.getElementById("no_po");
    let nobttb = document.getElementById("nobttb");
    let nopib = document.getElementById("nopib");
    let nopibext = document.getElementById("nopibext");
    let nosj = document.getElementById("nosj");
    let ordered_satuan = document.getElementById("ordered_satuan");
    let po = document.getElementById("po");
    let post_btn = document.getElementById("post_btn");
    let ppn = document.getElementById("ppn");
    let ppn_persen = document.getElementById("ppn_persen");
    let ppn_select = document.getElementById("ppn_select");
    let qty_ordered = document.getElementById("qty_ordered");
    let qty_received = document.getElementById("qty_received");
    let qty_remaining = document.getElementById("qty_remaining");
    let qty_ship = document.getElementById("qty_ship");
    let registrasi = document.getElementById("registrasi");
    let skbm = document.getElementById("skbm");
    let sppb = document.getElementById("sppb");
    let sub_kategori = document.getElementById("sub_kategori");
    let supplier = document.getElementById("supplier");
    let tglbttb = document.getElementById("tglbttb");
    let tglpib = document.getElementById("tglpib");
    let tglregis = document.getElementById("tglregis");
    let tglskbm = document.getElementById("tglskbm");
    let tglsppb = document.getElementById("tglsppb");
    let tgllob = document.getElementById("tgllob");
    let toleransi;
    let total_disc = document.getElementById("total_disc");
    let tabelData = $("#tabelcreate").DataTable({
        responsive: true,
        scrollX: true,
        searching: false,
        scrollY: "250px",
        paging: false,
    });

    //#endregion

    //#region Function

    function updateIdrUnit() {
        let kurs = numeral(document.getElementById("kurs").value).value();
        let hargaUnit = numeral(
            document.getElementById("harga_unit").value
        ).value();
        if (!isNaN(kurs) && !isNaN(hargaUnit)) {
            let idrUnitValue = hargaUnit * kurs;
            idr_unit.value = numeral(idrUnitValue).format("0,0.0000");
        }
    }

    function updateSubTotal() {
        let qty_received = numeral(
            document.getElementById("qty_received").value
        ).value();
        let hargaUnit = numeral(
            document.getElementById("harga_unit").value
        ).value();
        let disc = numeral(document.getElementById("disc").value).value();
        if (!isNaN(qty_received) && !isNaN(hargaUnit) && !isNaN(disc)) {
            let SubTotalValue = hargaUnit * qty_received;
            let discount = (SubTotalValue * disc) / 100;
            let hargaSubTotal = SubTotalValue - discount;

            harga_sub_total.value = numeral(hargaSubTotal).format("0,0.0000");
        }
    }

    function updateIDRSubTotal() {
        let kurs = numeral(document.getElementById("kurs").value).value();
        let hargaSubTotal = numeral(
            document.getElementById("harga_sub_total").value
        ).value();

        if (!isNaN(kurs) && !isNaN(hargaSubTotal)) {
            let idrSubTotalValue = hargaSubTotal * kurs;
            idr_sub_total.value = numeral(idrSubTotalValue).format("0,0.0000");
        }
    }

    function updateSubTotalDisc() {
        let qty_received = numeral(
            document.getElementById("qty_received").value
        ).value();
        let hargaUnit = numeral(
            document.getElementById("harga_unit").value
        ).value();
        let total_disc = numeral(
            document.getElementById("total_disc").value
        ).value();
        if (!isNaN(qty_received) && !isNaN(hargaUnit) && !isNaN(total_disc)) {
            let SubTotalValue = hargaUnit * qty_received;
            let hargaSubTotal = SubTotalValue - total_disc;
            harga_sub_total.value = numeral(hargaSubTotal).format("0,0.0000");
        }
    }

    function updateDPPNilaiLain() {
        let harga_subTotal = numeral(harga_sub_total.value).value();
        let DPPValue = 0;
        if (!isNaN(harga_subTotal) && ppn_select.value == "15") {
            DPPValue = (harga_subTotal * 11) / 12;
            dpp_nilaiLain.value = numeral(DPPValue).format("0,0.0000");
        } else if (ppn_select.value == "18") {
            DPPValue = harga_subTotal / 10;
            dpp_nilaiLain.value = numeral(DPPValue).format("0,0.0000");
        } else if (ppn_select.value == "19") {
            DPPValue = harga_subTotal;
            dpp_nilaiLain.value = numeral(DPPValue).format("0,0.0000");
        } else if (ppn_select.value == "16" || ppn_select.value == "6") {
            dpp_nilaiLain.value = numeral(DPPValue).format("0,0.0000");
        } else {
            dpp_nilaiLain.value = numeral(harga_subTotal).format("0,0.0000");
        }
    }

    function updateIDRDPPNilaiLain() {
        let idr_hargaSubTotal = numeral(idr_sub_total.value).value();
        let IDRDPPValue = 0;
        if (!isNaN(idr_hargaSubTotal) && ppn_select.value == "15") {
            IDRDPPValue = (idr_hargaSubTotal * 11) / 12;
            idr_dpp.value = numeral(IDRDPPValue).format("0,0.0000");
        } else if (ppn_select.value == "18") {
            IDRDPPValue = idr_hargaSubTotal / 10;
            idr_dpp.value = numeral(IDRDPPValue).format("0,0.0000");
        } else if (ppn_select.value == "19") {
            IDRDPPValue = harga_subTotal;
            idr_dpp.value = numeral(IDRDPPValue).format("0,0.0000");
        } else if (ppn_select.value == "16" || ppn_select.value == "6") {
            idr_dpp.value = numeral(IDRDPPValue).format("0,0.0000");
        } else {
            idr_dpp.value = numeral(idr_hargaSubTotal).format("0,0.0000");
        }
    }

    function updatePPN() {
        let selectedOptionText =
            ppn_select.options[ppn_select.selectedIndex].text;
        let numericPart = selectedOptionText.split(" ")[0]; // Extract the numeric part
        let textPart = selectedOptionText.split(" (")[1]; // Extract the text part
        if (textPart) {
            textPart = textPart.replace(")", ""); // Remove the closing parenthesis
        }
        let selectedPPN = numeral(numericPart).value();
        let DPPValue = numeral(dpp_nilaiLain.value).value();
        if (!isNaN(selectedPPN) && !isNaN(DPPValue)) {
            if (ppn_select.value == "18") {
                //untuk ppn 1.2%
                selectedPPN = 12;
            }
            let jumPPN = (DPPValue * selectedPPN) / 100;
            ppn.value = numeral(jumPPN).format("0,0.0000");
            if (parseFloat(jumPPN) === 0 && parseFloat(DPPValue) === 0) {
                ppn_persen.value = 0;
            } else {
                ppn_persen.value = parseFloat((parseFloat(jumPPN) / parseFloat(DPPValue)).toFixed(2) * 100) ?? 0; // prettier-ignore
            }
        }
    }

    function updateIDRPPN() {
        let selectedOptionText =
            ppn_select.options[ppn_select.selectedIndex].text;
        let numericPart = selectedOptionText.split(" ")[0]; // Extract the numeric part
        let textPart = selectedOptionText.split(" (")[1]; // Extract the text part

        if (textPart) {
            textPart = textPart.replace(")", ""); // Remove the closing parenthesis
        }
        let selectedPPN = numeral(numericPart).value();
        let kurs = numeral(document.getElementById("kurs").value).value();
        let IDRDPPValue = numeral(idr_dpp.value).value();

        if (!isNaN(selectedPPN) && !isNaN(IDRDPPValue)) {
            if (ppn_select.value == "18") {
                //untuk ppn 1.2%
                selectedPPN = 12;
            }
            let jumPPN = (IDRDPPValue * selectedPPN) / 100;
            let idrPPNValue = jumPPN * kurs;
            idr_ppn.value = numeral(idrPPNValue).format("0,0.0000");
        }

        if (textPart == "PPN Impor") {
            idr_ppn.readOnly = false;
        } else {
            idr_ppn.readOnly = true;
        }
    }

    function updateHargaTotal() {
        let ppn = numeral(document.getElementById("ppn").value).value();
        let hargaSubTotal = numeral(
            document.getElementById("harga_sub_total").value
        ).value();
        if (!isNaN(ppn) && !isNaN(hargaSubTotal)) {
            let hargaTotalValue = hargaSubTotal + ppn;
            harga_total.value = numeral(hargaTotalValue).format("0,0.0000");
        }
    }

    function updateIDRHargaTotal() {
        let kurs = numeral(document.getElementById("kurs").value).value();
        let hargaTotal = numeral(
            document.getElementById("harga_total").value
        ).value();
        if (!isNaN(kurs) && !isNaN(hargaTotal)) {
            // let IDRHargaTotalValue = hargaTotal * kurs;
            let IDRHargaTotalValue =
                parseFloat(numeral(idr_sub_total.value).value()) +
                parseFloat(numeral(idr_ppn.value).value());

            idr_harga_total.value =
                numeral(IDRHargaTotalValue).format("0,0.0000");
        }
    }

    function updateDisc() {
        let qty_received = numeral(
            document.getElementById("qty_received").value
        ).value();
        let hargaUnit = numeral(
            document.getElementById("harga_unit").value
        ).value();
        let disc = numeral(document.getElementById("disc").value).value();
        if (!isNaN(hargaUnit) && !isNaN(qty_received) && !isNaN(disc)) {
            let SubTotalValue = hargaUnit * qty_received;
            let discount = (SubTotalValue * disc) / 100;
            total_disc.value = numeral(discount).format("0,0.0000");
        }
    }

    function updateTotalDisc() {
        let qty_received = numeral(
            document.getElementById("qty_received").value
        ).value();
        let hargaUnit = numeral(
            document.getElementById("harga_unit").value
        ).value();
        let total_disc = numeral(
            document.getElementById("total_disc").value
        ).value();
        if (!isNaN(hargaUnit) && !isNaN(qty_received) && !isNaN(total_disc)) {
            let SubTotalValue = hargaUnit * qty_received;
            let discount = (total_disc / SubTotalValue) * 100;
            disc.value = numeral(discount).format("0,0.00");
        }
    }

    function updateIDRDisc() {
        let qty_received = numeral(
            document.getElementById("qty_received").value
        ).value();
        let hargaUnit = numeral(
            document.getElementById("harga_unit").value
        ).value();
        let disc = numeral(document.getElementById("disc").value).value();
        let kurs = numeral(document.getElementById("kurs").value).value();

        if (
            !isNaN(hargaUnit) &&
            !isNaN(qty_received) &&
            !isNaN(disc) &&
            !isNaN(kurs)
        ) {
            let SubTotalValue = hargaUnit * qty_received;
            let discount = (SubTotalValue * disc) / 100;
            let totalIDRDiscValue = discount * kurs;
            idr_total_disc.value =
                numeral(totalIDRDiscValue).format("0,0.0000");
        }
    }

    function updateIDRDiscTotal() {
        let total_disc = numeral(
            document.getElementById("total_disc").value
        ).value();
        let kurs = numeral(document.getElementById("kurs").value).value();

        if (!isNaN(total_disc) && !isNaN(kurs)) {
            let totalIDRDiscValue = total_disc * kurs;
            idr_total_disc.value =
                numeral(totalIDRDiscValue).format("0,0.0000");
        }
    }

    function responseData(datas) {
        data = datas;
        // console.log(data);
        tabelData.clear().draw();
        data.forEach(function (data) {
            tabelData.row
                .add([
                    data.No_trans,
                    data.Kd_brg,
                    data.NAMA_BRG.replace(/</g, "&lt;"),
                    data.nama_sub_kategori,
                    numeral(numeral(data.Qty).value()).format("0,0.00") || 0,
                    data.Nama_satuan,
                    numeral(numeral(data.QtyShipped).value()).format(
                        "0,0.00"
                    ) || 0,
                    numeral(numeral(data.QtyRemain).value()).format("0,0.00") ||
                        0,
                    numeral(parseFloat(data.PriceUnit)).format("0,0.00000") || 0,
                    numeral(parseFloat(data.PriceSub)).format("0,0.0000") || 0,
                    numeral(parseFloat(data.PriceDPP)).format("0,0.0000") || 0,
                    numeral(parseFloat(data.PPN)).format("0,0.0000") || 0,
                    numeral(parseFloat(data.PriceExt)).format("0,0.0000") || 0,
                    data.Kurs,
                    numeral(parseFloat(data.PriceUnitIDR)).format("0.00") || 0,
                    numeral(parseFloat(data.PriceSubIDR)).format("0,0.0000") ||
                        0,
                    numeral(parseFloat(data.PriceDPP_IDR)).format("0,0.0000") ||
                        0,
                    numeral(parseFloat(data.PriceUnitIDR_PPN)).format(
                        "0,0.0000"
                    ) || 0,
                    numeral(parseFloat(data.PriceExtIDR)).format("0,0.0000") ||
                        0,
                    data.Curr,
                    numeral(parseFloat(data.disc)).format("0.00") || 0,
                    numeral(parseFloat(data.Harga_disc)).format("0,0.0000") ||
                        0,
                    numeral(parseFloat(data.DiscIDR)).format("0,0.0000") || 0,
                    numeral(numeral(data.QtyRcv).value()).format("0,0.00") || 0,
                ])
                .draw();
        });
    }

    function clearOptions(selectElement) {
        let length = selectElement.options.length;

        for (let i = length - 1; i > 0; i--) {
            selectElement.remove(i);
        }
    }

    function clearHeader() {
        nobttb.value = "";
        nosj.value = "";
        sppb.value = "";
        registrasi.value = "";
        tglbttb.valueAsDate = new Date();
        nopib.value = "";
        tglsppb.valueAsDate = new Date();
        tglregis.valueAsDate = new Date();
        nopibext.value = "";
        skbm.value = "";
        kodehs.value = "";
        tglpib.valueAsDate = new Date();
        tglskbm.valueAsDate = new Date();
    }

    function clear() {
        no_po.value = "";
        kode_barang.value = "";
        nama_barang.value = "";
        sub_kategori.value = "";
        qty_ordered.value = "";
        ordered_satuan.value = "";
        qty_received.value = "";
        qty_remaining.value = "";
        kurs.value = "1";
        dpp_nilaiLain.value = "0";
        idr_dpp.value = "0";
        mata_uang.value = "IDR";
        disc.value = "0";
        total_disc.value = "0";
        idr_total_disc.value = "0";
        harga_unit.value = "0";
        idr_unit.value = "0";
        harga_sub_total.value = "0";
        idr_sub_total.value = "0";
        ppn_select.selectedIndex = 0;
        ppn.value = "0";
        ppn.readOnly = true;
        idr_ppn.value = "0";
        harga_total.value = "";
        idr_harga_total.value = "";
        qty_ship.value = "";
    }
    // async function setStatusPO() {
    //     try {
    //         const response = await $.ajax({
    //             url: "/CCreateBTTB/SetStatusPO",
    //             type: "GET",
    //             data: { NoPO: po.value.trim() },
    //         });

    //         console.log(response);
    //     } catch (error) {
    //         console.error("Error Send Data:", error);
    //     }
    // }

    function post() {
        const dataToSend = data.map((item) => ({
            disc: item.Harga_disc,
            discIDR: item.DiscIDR,
            idPPN: item.IdPPN,
            idSup: supplier.value,
            jumPPN: item.JumPPN,
            KodeHS: kodehs.value.trim(),
            kurs: item.Kurs,
            mtUang: item.ID_MATAUANG,
            NoPIB: nopib.value.trim(),
            NoPIBExt: nopibext.value.trim(),
            NoPO: po.value.trim(),
            NoReg: registrasi.value.trim(),
            NoSatuan: item.NoSatuan,
            NoSKBM: skbm.value.trim(),
            NoSPPBBC: sppb.value.trim(),
            noTrans: item.No_trans,
            noTrTmp: item.no_kat_utama === "009" ? 1 : null,
            pDPP: item.PriceDPP,
            persen: item.disc,
            pIDRDPP: item.PriceDPP_IDR,
            pIDRPPN: item.PriceUnitIDR_PPN,
            pIDRSub: item.PriceSubIDR,
            pIDRTot: item.PriceExtIDR,
            pIDRUnit: item.PriceUnitIDR,
            pPPN: item.PPN,
            pSub: item.PriceSub,
            pTot: item.PriceExt,
            pUnit: item.PriceUnit,
            Qty: numeral(item.Qty).value(),
            qtyRcv: numeral(item.QtyRcv).value() || 0,
            qtyremain: numeral(item.QtyRemain).value() || 0,
            qtyShip: numeral(item.QtyShipped).value() || 0,
            SJ: nosj.value.trim(),
            tglDatang: tglbttb.value,
            TglPIB: tglpib.value,
            TglReg: tglregis.value.trim(),
            TglSKBM: tglskbm.value,
            TglSPPBBC: tglsppb.value,
            tgllob: tgllob.value
        }));

        try {
            $.ajax({
                url: "/CCreateBTTB/PostData",
                type: "POST",
                headers: { "X-CSRF-TOKEN": csrfToken },
                data: { data: dataToSend },
            }).then((response) => {
                console.log(response);
                nobttb.value = response.BTTB?.trim();
                Swal.fire({
                    icon: "success",
                    title: "Data Sudah Diproses!",
                    showConfirmButton: false,
                }).then(() => {
                    // post_btn.disabled = false;
                    dataPrint();
                });
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Data Tidak Berhasil DiPost!",
                showConfirmButton: false,
            });
            console.error("Error Send Data:", error);
        }
    }

    function dataPrint() {
        try {
            $.ajax({
                url: "/CCreateBTTB/Print",
                type: "GET",
                data: { No_BTTB: nobttb.value },
            }).then((response) => {
                print(response);
            });
        } catch (error) {
            console.error("Error Get Data:", error);
        }
    }

    function print(data) {
        console.log(data); // console.log untuk tracing gagal post BTTB
        const printContentDiv = document.createElement("div");
        let tableRows = "";

        let No = 0;
        let Page = 0;

        const chunkSize = 8;
        const chunkedData = [];
        for (let i = 0; i < data.print.length; i += chunkSize) {
            chunkedData.push(data.print.slice(i, i + chunkSize));
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }

        chunkedData.forEach((chunk, chunkIndex) => {
            chunk.forEach((item, index) => {
                tableRows += `
                <tr style="margin-bottom: 8px;">
                    <td sty><p style="line-height: 13.8px; font-size: 13px; font-family: Helvetica; text-align: center">${
                        No + 1
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 13px; font-family: Helvetica;">${
                        item.Kd_brg
                    }</p></td>
                    <td><p style="line-height: 13.8px; font-size: 13px; font-family: Helvetica;">
                    ${item.NAMA_BRG.replace(/</g, "&lt;")}
                    </td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 13px; font-family: Helvetica;">${
                        !parseFloat(item.Qty)
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(item.Qty).toLocaleString("en-US") +
                              ".00"
                            : parseFloat(item.Qty).toLocaleString("en-US")
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 13px; font-family: Helvetica;">${item.Nama_satuan.trim()}</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 13px; font-family: Helvetica;">${
                        !parseFloat(item.Qty_Terima)
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(item.Qty_Terima).toLocaleString(
                                  "en-US"
                              ) + ".00"
                            : parseFloat(item.Qty_Terima).toLocaleString(
                                  "en-US"
                              )
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 13px; font-family: Helvetica;">${
                        isNaN(parseFloat(item.QtyRemain)) ||
                        parseFloat(item.QtyRemain) === 0
                            ? "0.00"
                            : parseFloat(item.QtyRemain).toLocaleString(
                                  "en-US",
                                  {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                  }
                              )
                    }</p></td>
                </tr>
                `;
                No += 1;
            });

            const print = `
            <style>
                table.styled-table {
                    border-collapse: collapse;
                    width: 100%;
                    margin: 20px 0;
                    font-size: 18px;
                    text-align: left;
                }

                table.styled-table th,
                table.styled-table td {
                    padding: 12px 15px;
                }

                table.styled-table thead tr {
                    border-bottom: 2px solid #333;
                }

                table.styled-table tbody tr {
                    border-bottom: none;
                }

                table.styled-table tbody tr:last-of-type {
                    border-bottom: none;
                }

                table.styled-table tbody tr+tr {
                    margin-top: 10px;
                }
            </style>
            <div style="width: 20.5cm; height: 27.94cm; padding: 30px 10px 0px 10px; margin: 0; background: #FFFFFF; box-sizing: border-box; page-break-after: ${
                chunkIndex < chunkedData.length - 1 ? `always` : `avoid`
            };">
                <main style="width: 100%; height : 70%;">
                    <div style="width: 100%; height: auto; display: flex;">
                        <div style="width: 50%; height: auto; margin-right: 20px;">
                            <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin-top: 2px; margin-bottom: 2px;">PT. Kerta Rajasa Raya</h1>
                            <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">Jl. Raya Tropodo No. 1</p>
                            <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">Waru - Sidoarjo 61256 East Java, Indonesia</p>
                            <br>
                            <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                                data.printHeader[0].NM_SUP
                            }</p>
                            <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                                data.printHeader[0].ALAMAT1
                            }</p>
                            <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                                data.printHeader[0].KOTA1
                            }</p>
                            <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                                data.printHeader[0].NEGARA1
                            }</p>
                        </div>
                        <div style="width: 50%; height: auto; margin-left: 20px;">
                        <div style="width: 100%; display: flex;">
                                <div style="width: 50%; height: auto;">
                                    <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Telephone</h1>
                                </div>
                                <div style="width: 50%; height: auto;">
                                    <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: (031)8669595</p>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex;">
                                <div style="width: 50%; height: auto;">
                                    <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Fax</h1>
                                </div>
                                <div style="width: 50%; height: auto;">
                                    <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: (031)8669989</p>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex;">
                                <div style="width: 50%; height: auto;">
                                    <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Giro</h1>
                                </div>
                                <div style="width: 50%; height: auto;">
                                    <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: </p>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex;">
                                <div style="width: 50%; height: auto;">
                                    <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Tax Registration Number</h1>
                                </div>
                                <div style="width: 50%; height: auto;">
                                    <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: 01.140.897.8-641.000</p>
                                </div>
                            </div>
                            <br>
                            <div style="width: 100%; display: flex;">
                                <div style="width: 50%; height: auto;">
                                    <h1 style="font-size: 13px; font-family: Helvetica; font-weight: bold; margin: 2px 0 4px 0;">Product Receipt</h1>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex;">
                                <div style="width: 50%; height: auto;">
                                    <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Page</h1>
                                </div>
                                <div style="width: 50%; height: auto;">
                                    <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: Page ${
                                        Page + 1
                                    } of ${chunkedData.length}</p>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex;">
                                <div style="width: 50%; height: auto;">
                                    <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Number</h1>
                                </div>
                                <div style="width: 50%; height: auto;">
                                    <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                                        data.printHeader[0].No_PO
                                    }</p>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex;">
                                <div style="width: 50%; height: auto;">
                                    <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Date</h1>
                                </div>
                                <div style="width: 50%; height: auto;">
                                    <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${formatDate(
                                        data.printHeader[0].Datang.split(" ")[0]
                                    )}</p>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex;">
                                <div style="width: 50%; height: auto;">
                                    <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Packing Slip</h1>
                                </div>
                                <div style="width: 50%; height: auto;">
                                    <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                                        data.printHeader[0].No_SuratJalan || ""
                                    }</p>
                                </div>
                            </div>
                            <div style="width: 100%; display: flex;">
                                <div style="width: 50%; height: auto;">
                                    <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Internal Product Receipt</h1>
                                </div>
                                <div style="width: 50%; height: auto;">
                                    <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                                        data.printHeader[0].No_BTTB
                                    }</p>
                                </div>
                            </div>
                            <br>
                            <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin-top: 10px; margin-bottom: 2px;">Delivery Address:</h1>
                            <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">Jl. Raya Tropodo No. 1</p>
                            <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">Waru - Sidoarjo 61256 East Java, Indonesia</p>
                        </div>
                    </div>
                    <div class="details" style="margin-top: 20px;">
                        <table class="styled-table">
                            <thead>
                                <tr>
                                    <th><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">No.</h1></th>
                                    <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Item Number</h1></th>
                                    <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Description</h1></th>
                                    <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Qty</h1></th>
                                    <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Unit</h1></th>
                                    <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Received</h1></th>
                                    <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Remaining</h1></th>
                                </tr>
                            </thead>
                            <tbody style="border-top: 1px solid black;">
                                ${tableRows}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        `;
            printContentDiv.innerHTML += print;
            tableRows = "";
            Page += 1;
        });
        const printWindow = window.open("", "_blank");
        const style = document.createElement("style");
        style.textContent = `
        body {
            margin: 0;
            padding: 0;
        }
        `;
        // window.location.href = "/CreateBTTB";
        printWindow.document.head.appendChild(style);
        printWindow.document.body.appendChild(printContentDiv);
        // printWindow.print();
    }

    function fetchToleransi(barangCode) {
        $.ajax({
            url: "CreateBTTB/getToleransi",
            type: "GET",
            data: {
                kode_barang: barangCode,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        }).then(function (data) {
            if (data.toleransi) {
                toleransi = (100 + parseFloat(data.toleransi)) / 100;
            } else {
                // Return a default value if toleransi is not provided or invalid
                toleransi = 1; // Default value (120%)
            }
        });
    }

    //#endregion

    //#region Load Form

    btn_toleransi.disabled = true;

    //#endregion

    // Daftar kode barang yang diizinkan untuk melebihi 15% dari QTY Order
    // const allowedCodes = [
    //     "000093120",
    //     "000112089",
    //     "000125147",
    //     "000128488",
    //     "000128489",
    //     "000128782",
    //     "000130323",
    //     "000131238",
    //     "000137554",
    //     "000137789",
    //     "000139279",
    //     "000140582",
    //     "000136600",
    //     "000131148",
    //     "000079616",
    //     "000081047",
    // ];

    // // Fungsi untuk memeriksa apakah kode barang diizinkan
    // function isAllowedCode(barangCode) {
    //     return allowedCodes.includes(barangCode);
    // }

    //#region Add Event Listener

    btn_update.addEventListener("click", function () {
        let selectedRow = $("#tabelcreate tr.selected");

        if (selectedRow.length > 0) {
            let noOrder = no_po.value;
            let datas = data.filter((obj) => obj.No_trans === noOrder);
            datas[0].Qty = numeral(numeral(qty_ordered.value).value()).format("0,0.00"); // prettier-ignore
            datas[0].QtyShipped = numeral(numeral(qty_ship.value).value()).format("0,0.00") || 0; // prettier-ignore
            datas[0].QtyRemain = numeral(numeral(qty_remaining.value).value()).format("0,0.00") || 0; // prettier-ignore
            datas[0].PriceUnit = harga_unit.value.replace(/,/g, "") || 0;
            datas[0].PriceSub = harga_sub_total.value.replace(/,/g, "") || 0;
            datas[0].PPN = ppn.value.replace(/,/g, "") || 0;
            datas[0].PriceExt = harga_total.value.replace(/,/g, "") || 0;
            datas[0].PriceUnitIDR = idr_unit.value.replace(/,/g, "") || 0;
            datas[0].PriceSubIDR = idr_sub_total.value.replace(/,/g, "") || 0;
            datas[0].PriceUnitIDR_PPN = idr_ppn.value.replace(/,/g, "") || 0;
            datas[0].PriceExtIDR = idr_harga_total.value.replace(/,/g, "") || 0;
            datas[0].disc = disc.value.replace(/,/g, "") || 0;
            datas[0].Harga_disc = total_disc.value.replace(/,/g, "") || 0;
            datas[0].DiscIDR = idr_total_disc.value.replace(/,/g, "") || 0;
            datas[0].QtyRcv = numeral(numeral(qty_received.value).value()).format("0,0.00") || 0; // prettier-ignore
            datas[0].Kurs = parseFloat(kurs.value).toFixed(4) || 0;
            datas[0].JumPPN = ppn_persen.value || 0;
            datas[0].IdPPN = ppn_select.value;
            post_btn.disabled = false;

            responseData(data);
            clear();
        } else {
            alert("Pilih baris untuk diperbarui.");
        }
    });

    btn_remove.addEventListener("click", function (event) {
        let noOrder = no_po.value;
        let objekDitemukan = data.filter((obj) => obj.No_trans !== noOrder);
        data = objekDitemukan;
        responseData(data);
        clear();
    });

    btn_toleransi.addEventListener("click", function (event) {
        event.preventDefault();
        Swal.fire({
            title: "Kode Barang " + kode_barang.value,
            input: "number",
            inputAttributes: {
                autocapitalize: "off",
                pattern: "\\d+", // Allow only digits
                title: "Please enter only numbers",
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: true,
            preConfirm: (inputValue) => {
                // Clear previous validation messages
                const inputElement = Swal.getInput();
                inputElement.setCustomValidity("");

                // Check if the input is a number
                if (!/^\d+$/.test(inputValue)) {
                    // Set custom validity and show validation message
                    inputElement.setCustomValidity("Input must be a number");
                    Swal.showValidationMessage("Input must be a number");
                    return false; // Prevents closing the Swal
                }
                // Return the input value if validation passes
                return inputValue;
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Sudah diset toleransi sebesar ${result.value}%`,
                    // text: "Your input was successfully processed.",
                });

                const selectedRow = $("#tabelcreate tr.selected");
                const inputValue = result.value;
                $.ajax({
                    url: "CreateBTTB/setToleransi",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        kode_barang: kode_barang.value,
                        inputValue: inputValue,
                    },
                    success: function (data) {
                        console.log(data);
                        // After successful AJAX request, trigger dblclick event on the selected row
                        selectedRow.trigger("dblclick");

                        // Re-select the previously selected row
                        selectedRow.addClass("selected");
                    },
                    error: function (xhr, status, error) {
                        var err = JSON.parse(xhr.responseText);
                        alert(err.Message);
                    },
                });
            }
        });
    });

    post_btn.addEventListener("click", async function () {
        this.disabled = true;
        // setTimeout(() => (this.disabled = false), 2500);

        if (data.length === 0) {
            alert("Data tidak ada");
            return;
        }

        try {
            $("#loading-screen").css("display", "flex");

            // const response = await $.ajax({
            //     url: "/CCreateBTTB/CreateNoBTTB",
            //     type: "GET",
            // });
            // nobttb.value = response.data;
            // console.log(response.data); // Tracing gagal post BTTB

            post();
        } catch (error) {
            console.error("Error Send Data:", error);
        } finally {
            $("#loading-screen").css("display", "none");
        }
    });

    po.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            this.value = this.value.toUpperCase();
            post_btn.disabled = false;
            $("#tabelcreate").DataTable().clear().draw();
            clear();
            $.ajax({
                url: "/Create",
                type: "GET",
                data: {
                    noPO: po.value.trim(),
                },
                beforeSend: function () {
                    // Show loading screen
                    $("#loading-screen").css("display", "flex");
                },
                success: function (response) {
                    if (response.length == 0) {
                        alert("Data Tidak Ada");
                    } else {
                        for (let i = 0; i < supplier.options.length; i++) {
                            if (
                                supplier.options[i].text.replace(/\s/g, "") ===
                                response[0].NM_SUP.replace(/\s/g, "")
                            ) {
                                supplier.selectedIndex = i;
                            }
                        }

                        responseData(response);
                    }
                    // console.log(response);
                },
                error: function (error) {
                    console.error("Error Fetch Data:", error);
                },
                complete: function () {
                    // Hide loading screen
                    $("#loading-screen").css("display", "none");
                },
            });
        }
    });

    $("#tabelcreate").on("dblclick", "tr", function () {
        $("#tabelcreate tr.selected").not(this).removeClass("selected");
        clear();
        $(this).toggleClass("selected");
        btn_toleransi.disabled = false;
        let rowData = tabelData.row(this).data();
        no_po.value = rowData[0];
        kode_barang.value = rowData[1];
        fetchToleransi(rowData[1]);
        nama_barang.value = rowData[2].replace(/&lt;/g, "<").replace(/&gt;/g, ">"); // prettier-ignore
        sub_kategori.value = rowData[3];
        qty_ordered.value = numeral(numeral(rowData[4]).value()).format("0,0.00"); // prettier-ignore
        ordered_satuan.value = rowData[5];
        qty_ship.value =numeral(numeral(rowData[6]).value()).format("0,0.00") || 0; // prettier-ignore
        qty_remaining.value = numeral(numeral(rowData[7]).value()).format("0,0.00") || 0; // prettier-ignore
        harga_unit.value = numeral(numeral(rowData[8]).value()).format("0,0.00000"); // prettier-ignore
        harga_sub_total.value = numeral(numeral(rowData[9]).value()).format("0,0.0000"); // prettier-ignore
        dpp_nilaiLain.value = numeral(numeral(rowData[10]).value()).format("0,0.0000"); // prettier-ignore
        harga_total.value = numeral(numeral(rowData[12]).value()).format("0,0.0000"); // prettier-ignore
        kurs.value = parseFloat(rowData[13]).toFixed(4);
        idr_unit.value = numeral(numeral(rowData[14]).value()).format("0,0.0000"); // prettier-ignore
        idr_sub_total.value = numeral(numeral(rowData[15]).value()).format("0,0.0000"); // prettier-ignore
        idr_dpp.value = numeral(numeral(rowData[16]).value()).format("0,0.0000"); // prettier-ignore
        idr_ppn.value = numeral(numeral(rowData[17]).value()).format("0,0.0000"); // prettier-ignore
        idr_harga_total.value = numeral(numeral(rowData[18]).value()).format("0,0.0000"); // prettier-ignore
        mata_uang.value = rowData[19];
        disc.value = numeral(numeral(rowData[20]).value()).format("0,0.00");
        total_disc.value = numeral(numeral(rowData[21]).value()).format("0,0.0000"); // prettier-ignore
        idr_total_disc.value = numeral(numeral(rowData[22]).value()).format("0,0.0000"); // prettier-ignore
        qty_received.value = numeral(numeral(rowData[23]).value()).format("0,0.00"); // prettier-ignore
        fixValueQTYOrder = numeral(rowData[4]).value();
        fixValueQTYReceived = numeral(rowData[23]).value();
        fixValueQTYRemain = numeral(rowData[7]).value() || 0;
        fixValueQTYShip = numeral(rowData[6]).value() || 0;
        // console.log(fixValueQTYShip);
        ppn.value = numeral(numeral(rowData[11]).value()).format("0,0.0000");

        let noOrder = rowData[0];
        let objekDitemukan = data.filter((obj) => obj.No_trans === noOrder);
        for (let i = 0; i < ppn_select.options.length; i++) {
            if (
                ppn_select.options[i].value.replace(/\s/g, "") ===
                objekDitemukan[0].IdPPN.replace(/\s/g, "")
            ) {
                ppn_select.selectedIndex = i;
                if (ppn_select.value == "16") {
                    ppn.readOnly = false;
                } else {
                    ppn.readOnly = true;
                }
            }
            ppn_persen.value = objekDitemukan[0].JumPPN;
        }
    });

    ppn_select.addEventListener("change", function (event) {
        updateDPPNilaiLain();
        updateIDRDPPNilaiLain();
        updatePPN();
        updateIDRPPN();
        updateHargaTotal();
        updateIDRHargaTotal();
    });

    kurs.addEventListener("input", function (event) {
        updateIdrUnit();
        updateSubTotalDisc();
        updateIDRSubTotal();
        updateDPPNilaiLain();
        updateIDRDPPNilaiLain();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        updateTotalDisc();
        updateIDRDiscTotal();
    });

    idr_ppn.addEventListener("input", function () {
        let kurs = numeral(document.getElementById("kurs").value).value();
        let PPNValue = numeral(this.value).value() / kurs;
        let ppnPersenValue;
        ppn.value = numeral(PPNValue).format("0,0.0000");
        ppnPersenValue = ((numeral(this.value).value() / numeral(idr_sub_total.value).value()) * 100).toFixed(2); //prettier-ignore
        ppn_persen.value =
            isFinite(ppnPersenValue) && !isNaN(ppnPersenValue)
                ? ppnPersenValue.toFixed(2)
                : 0;
        updateHargaTotal();
        updateIDRHargaTotal();
        updateTotalDisc();
        updateIDRDiscTotal();
    });

    harga_unit.addEventListener("input", function (event) {
        updateIdrUnit();
        updateSubTotalDisc();
        updateIDRSubTotal();
        updateDPPNilaiLain();
        updateIDRDPPNilaiLain();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        updateTotalDisc();
        updateIDRDiscTotal();
    });

    disc.addEventListener("input", function (event) {
        updateIdrUnit();
        updateSubTotal();
        updateIDRSubTotal();
        updateDPPNilaiLain();
        updateIDRDPPNilaiLain();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        updateDisc();
        updateIDRDisc();
    });

    total_disc.addEventListener("input", function (event) {
        updateIdrUnit();
        updateSubTotalDisc();
        updateIDRSubTotal();
        updateDPPNilaiLain();
        updateIDRDPPNilaiLain();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        updateTotalDisc();
        updateIDRDiscTotal();
    });

    qty_received.addEventListener("input", function () {
        if (fixValueQTYShip > 0.0) {
            maxLimit = parseFloat(
                (fixValueQTYOrder * toleransi - fixValueQTYShip).toFixed(2)
            );
        } else if (fixValueQTYShip == 0.0 && fixValueQTYRemain > 0.0) {
            let shipS = parseFloat(
                (fixValueQTYOrder - fixValueQTYRemain).toFixed(2)
            );
            maxLimit = parseFloat(
                (fixValueQTYOrder * toleransi - shipS).toFixed(2)
            );
        } else {
            maxLimit = parseFloat((fixValueQTYOrder * toleransi).toFixed(2));
        }

        // console.log(maxLimit);

        if (this.value === "") {
            // Jika input kosong, kosongkan field terkait dan reset oldValue
            qty_remaining.value = "";
            qty_ship.value = "";
        } else if (parseFloat(this.value) <= parseFloat(maxLimit)) {
            let qtyReceivedValue = parseFloat(this.value);
            let qtyShipValue = parseFloat(qty_ship.value);
            let sisa = parseFloat(
                fixValueQTYOrder - fixValueQTYShip - qtyReceivedValue
            );
            let sisa2 = parseFloat(
                fixValueQTYOrder - qtyShipValue - qtyReceivedValue
            );
            // console.log(sisa);
            // console.log(sisa2);

            if (sisa <= maxLimit && sisa >= 0) {
                if (toleransi > 1) {
                    console.log("hehe");
                    if (fixValueQTYRemain == 0.0) {
                        console.log("hehe");
                        qty_ship.value = numeral(
                            fixValueQTYShip + qtyReceivedValue
                        ).format("0,0.00");
                        qty_remaining.value = numeral(
                            fixValueQTYOrder - numeral(qty_ship.value).value()
                        ).format("0,0.00");
                    } else {
                        console.log("hehe");
                        let shipQ = (
                            fixValueQTYOrder - fixValueQTYRemain
                        ).toFixed(2);
                        qty_ship.value = numeral(
                            numeral(shipQ).value() + qtyReceivedValue
                        ).format("0,0.00");
                        qty_remaining.value = numeral(
                            fixValueQTYOrder - numeral(qty_ship.value).value()
                        ).format("0,0.00");
                    }
                    if (qty_remaining.value.toString().startsWith("-")) {
                        qty_remaining.value = numeral(0).format("0,0.00");
                    }
                } else {
                    if (fixValueQTYShip == 0.0 && fixValueQTYRemain > 0.0) {
                        let shipQ = (
                            fixValueQTYOrder - fixValueQTYRemain
                        ).toFixed(2);
                        qty_ship.value = numeral(
                            numeral(shipQ).value() + qtyReceivedValue
                        ).format("0,0.00");
                        qty_remaining.value = numeral(
                            fixValueQTYOrder - numeral(qty_ship.value).value()
                        ).format("0,0.00");
                    } else {
                        qty_remaining.value = numeral(sisa).format("0,0.00");
                        qty_ship.value = numeral(
                            fixValueQTYShip +
                                (qtyReceivedValue - fixValueQTYReceived)
                        ).format("0,0.00");
                    }
                }
            } else if (sisa.toString().startsWith("-")) {
                qty_remaining.value = numeral(0).format("0,0.00");
                qty_ship.value = numeral(
                    fixValueQTYShip + qtyReceivedValue
                ).format("0,0.00");
            } else if (sisa < 0) {
                qty_remaining.value = numeral(sisa2).format("0,0.00");
                qty_ship.value = numeral(
                    fixValueQTYShip + qtyReceivedValue
                ).format("0,0.00");
            } else if (sisa > 0) {
                qty_ship.value = numeral(
                    fixValueQTYRemain + qtyReceivedValue
                ).format("0,0.00");
                qty_remaining.value = numeral(
                    fixValueQTYOrder - numeral(qty_ship.value).value()
                ).format("0,0.00");
                if (qty_remaining.value.toString().startsWith("-")) {
                    qty_remaining.value = numeral(0).format("0,0.00");
                }
                // qtyRemainingElement.value = numeral(0).format("0,0.00");
            }
        } else {
            // Restore previous valid value
            this.value = "";
            qty_ship.value = "";
            qtyRemainingElement.value = "";
            // Show custom error message
            this.setCustomValidity(
                "Tidak boleh melebihi Quantity Order dan Toleransi!"
            );
            this.reportValidity();
        }

        // Panggil fungsi pembaruan setelah setiap perubahan input
        updateDisc();
        updateIdrUnit();
        updateSubTotalDisc();
        updateIDRSubTotal();
        updateDPPNilaiLain();
        updateIDRDPPNilaiLain();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        updateIDRDiscTotal();
        console.log(qty_received.value);
    });

    kurs.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            kurs.value = parseFloat(kurs.value).toFixed(4);
            harga_unit.focus();
            harga_unit.select();
        }
        setInputFilter(
            document.getElementById("kurs"),
            function (value) {
                return /^-?\d*[.,]?\d*$/.test(value);
            },
            "Tidak boleh character, harus angka"
        );
    });

    harga_unit.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const data = numeral(harga_unit.value).value();
            harga_unit.value = numeral(data).format("0,0.00000");
            disc.focus();
            disc.select();
        }
        setInputFilter(
            document.getElementById("harga_unit"),
            function (value) {
                return /^-?\d*([.,]\d*)*$/.test(value);
            },
            "Tidak boleh character, harus angka"
        );
    });

    disc.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            disc.value = numeral(disc.value).format("0,0.00");
            total_disc.focus();
            total_disc.select();
        }
        setInputFilter(
            document.getElementById("disc"),
            function (value) {
                return /^-?\d*([.,]\d*)*$/.test(value);
            },
            "Tidak boleh character, harus angka"
        );
    });

    total_disc.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const data = numeral(total_disc.value).value();
            total_disc.value = numeral(data).format("0,0.0000");
            ppn_select.focus();
            // harga_unit.select();
        }
        setInputFilter(
            document.getElementById("total_disc"),
            function (value) {
                return /^-?\d*([.,]\d*)*$/.test(value);
            },
            "Tidak boleh character, harus angka"
        );
    });

    idr_ppn.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            const data = numeral(idr_ppn.value).value();
            idr_ppn.value = numeral(data).format("0,0.0000");
            btn_update.focus();
        }
        setInputFilter(
            document.getElementById("idr_ppn"),
            function (value) {
                return /^-?\d*([.,]\d*)*$/.test(value);
            },
            "Tidak boleh character, harus angka"
        );
    });

    qty_received.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            console.log(numeral(qty_received.value).format("0,0.00"));
            qty_received.value = numeral(qty_received.value).format("0,0.00");
            qty_remaining.value = numeral(numeral(qty_ordered.value).value() - numeral(qty_ship.value).value()).format("0,0.00"); // prettier-ignore
            if (qty_remaining.value.toString().startsWith("-")) {
                qty_remaining.value = numeral(0).format("0,0.00");
            }
            kurs.focus();
            kurs.select();
        }

        setInputFilter(
            document.getElementById("qty_received"),
            function (value) {
                return /^-?\d*([.,]\d*)*$/.test(value);
            },
            "Tidak boleh character, harus angka"
        );
    });

    //#endregion
});
