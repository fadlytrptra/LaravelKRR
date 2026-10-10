jQuery(function ($) {
    //#region Variables
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    const enterEvent = new KeyboardEvent("keypress", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
    });
    const changeEvent = new Event("change", {
        bubbles: true,
    });
    let tanggal_penagihan = document.getElementById("tanggal_penagihan");
    let div_idPenagihan = document.getElementById("div_idPenagihan");
    let id_penagihan = document.getElementById("id_penagihan");
    let button_browseIdPenagihan = document.getElementById("button_browseIdPenagihan"); //prettier-ignore
    let nama_supplier = document.getElementById("nama_supplier");
    let id_supplier = document.getElementById("id_supplier");
    let button_browseSupplier = document.getElementById("button_browseSupplier"); //prettier-ignore
    let status_pajakAda = document.getElementById("status_pajakAda");
    let status_pajakTidakAda = document.getElementById("status_pajakTidakAda");
    const radios = document.querySelectorAll('input[name="status_pajak"]');
    let jenis_dokumen = document.getElementById("jenis_dokumen");
    let id_jenisDokumen = document.getElementById("id_jenisDokumen");
    let button_browseJenisDokumen = document.getElementById("button_browseJenisDokumen"); //prettier-ignore
    let jumlah_dokumen = document.getElementById("jumlah_dokumen");
    let id_penagihanSupplier = document.getElementById("id_penagihanSupplier");
    let nama_mataUang = document.getElementById("nama_mataUang");
    let id_mataUang = document.getElementById("id_mataUang");
    let nilai_tagihan = document.getElementById("nilai_tagihan");
    let button_pembulatanBawahTagihan = document.getElementById("button_pembulatanBawahTagihan"); //prettier-ignore
    let button_pembulatanAtasTagihan = document.getElementById("button_pembulatanAtasTagihan"); //prettier-ignore
    let button_rupiahkanTagihan = document.getElementById("button_rupiahkanTagihan"); //prettier-ignore
    let nilai_akhir = document.getElementById("nilai_akhir");
    let button_nilaiAkhir = document.getElementById("button_nilaiAkhir");
    let button_keterangan = document.getElementById("button_keterangan");
    let table_detailSPPB = $("#table_detailSPPB").DataTable({
        searching: false,
        paging: false,
        info: false,
        ordering: false,
    });
    let total_detailPenagihan = document.getElementById("total_detailPenagihan"); //prettier-ignore
    let button_isiDetailSPPB = document.getElementById("button_isiDetailSPPB");
    let button_koreksiDetailSPPB = document.getElementById("button_koreksiDetailSPPB"); //prettier-ignore
    let button_hapusDetailSPPB = document.getElementById("button_hapusDetailSPPB"); //prettier-ignore
    let table_detailFakturPajak = $("#table_detailFakturPajak").DataTable({
        searching: false,
        paging: false,
        info: false,
        ordering: false,
    });
    let total_detailFakturPajak = document.getElementById("total_detailFakturPajak"); //prettier-ignore
    let button_isiDetailFakturPajak = document.getElementById("button_isiDetailFakturPajak"); //prettier-ignore
    let button_koreksiDetailFakturPajak = document.getElementById("button_koreksiDetailFakturPajak"); //prettier-ignore
    let button_hapusDetailFakturPajak = document.getElementById("button_hapusDetailFakturPajak"); //prettier-ignore
    let button_isiPenagihan = document.getElementById("button_isiPenagihan");
    let button_koreksiPenagihan = document.getElementById("button_koreksiPenagihan"); //prettier-ignore
    let button_cancelPenagihan = document.getElementById("button_cancelPenagihan"); //prettier-ignore
    let button_cetakPenagihan = document.getElementById("button_cetakPenagihan"); //prettier-ignore
    let sppb_tableDataPenagihan = $("#sppb_tableDataPenagihan").DataTable({
        searching: false,
        paging: false,
        info: false,
        ordering: false,
        columnDefs: [{ targets: [18, 17, 16, 15, 14], visible: false }],
    });
    let sppb_tableDataSPPB = $("#sppb_tableDataSPPB").DataTable({
        searching: false,
        paging: false,
        info: false,
        ordering: false,
        columnDefs: [{ targets: [18, 19], visible: false }],
    });
    let sppb_divisi = $("#sppb_divisi");
    let sppb_nomorSPPB = document.getElementById("sppb_nomorSPPB");
    let sppb_idPenagihan = document.getElementById("sppb_idPenagihan");
    let sppb_noTerima = document.getElementById("sppb_noTerima");
    let sppb_kodeBarang = document.getElementById("sppb_kodeBarang");
    let sppb_namaBarang = document.getElementById("sppb_namaBarang");
    let sppb_qtyTagihan = document.getElementById("sppb_qtyTagihan");
    let sppb_satuanQtyTagihan = $("#sppb_satuanQtyTagihan"); //prettier-ignore
    let sppb_mataUang = document.getElementById("sppb_mataUang");
    let sppb_kurs = document.getElementById("sppb_kurs");
    let sppb_idMataUang = document.getElementById("sppb_idMataUang");
    let sppb_discTagihan = document.getElementById("sppb_discTagihan");
    let sppb_ppnTagihan = document.getElementById("sppb_ppnTagihan");
    let sppb_hargaSatuan = document.getElementById("sppb_hargaSatuan");
    let sppb_hargaSatuanRupiah = document.getElementById("sppb_hargaSatuanRupiah"); //prettier-ignore
    let sppb_hargaMurni = document.getElementById("sppb_hargaMurni");
    let sppb_hargaMurniRupiah = document.getElementById("sppb_hargaMurniRupiah"); //prettier-ignore
    let sppb_hargaDisc = document.getElementById("sppb_hargaDisc");
    let sppb_hargaDiscRupiah = document.getElementById("sppb_hargaDiscRupiah");
    let sppb_hargaPPN = document.getElementById("sppb_hargaPPN");
    let sppb_hargaPPNRupiah = document.getElementById("sppb_hargaPPNRupiah");
    let sppb_hargaSubtotal = document.getElementById("sppb_hargaSubtotal");
    let sppb_hargaSubtotalRupiah = document.getElementById("sppb_hargaSubtotalRupiah"); //prettier-ignore
    let sppb_buttonIsi = document.getElementById("sppb_buttonIsi");
    // let sppb_buttonKoreksi = document.getElementById("sppb_buttonKoreksi");
    let sppb_buttonHapus = document.getElementById("sppb_buttonHapus");
    let sppb_buttonSimpan = document.getElementById("sppb_buttonSimpan");
    let pajak_idDetail = document.getElementById("pajak_idDetail");
    let pajak_nomorFaktur = document.getElementById("pajak_nomorFaktur");
    let pajak_hargaMurni = document.getElementById("pajak_hargaMurni");
    let pajak_nilaiPajak = document.getElementById("pajak_nilaiPajak");
    let pajak_hargaPPN = document.getElementById("pajak_hargaPPN");
    let pajak_kursPajak = document.getElementById("pajak_kursPajak");
    let pajak_buttonSimpan = document.getElementById("pajak_buttonSimpan");
    let keterangan_id = document.getElementById("keterangan_id");
    let keterangan_text = document.getElementById("keterangan_text");
    let keterangan_nilai = document.getElementById("keterangan_nilai");
    let keterangan_buttonSimpan = document.getElementById("keterangan_buttonSimpan"); // prettier-ignore
    let modeForm;
    let selectedRowDataDetailSPPB;
    let selectedRowDataDetailFakturPajak;
    let selectedRowDataSPPB;
    let selectedRowDataPenagihan;
    //#endregion

    //#region Load Form
    init("loadForm");
    initializeSelect2();
    getDataDivisi();
    getDataSatuan();
    //#endregion

    //#region Functions
    $.ajaxSetup({
        beforeSend: function () {
            // Show the loading screen before the AJAX request
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            // Hide the loading screen after the AJAX request completes
            $("#loading-screen").css("display", "none");
        },
    });

    function init(jenisInit) {
        if (jenisInit == "loadForm") {
            tanggal_penagihan.valueAsDate = new Date();
            status_pajakAda.checked = true;
            status_pajakAda.disabled = true;
            status_pajakTidakAda.disabled = true;
            jumlah_dokumen.value = 1;
            id_penagihanSupplier.readOnly = true;
            button_browseIdPenagihan.disabled = true;
            button_browseSupplier.disabled = true;
            button_browseJenisDokumen.disabled = true;
            button_pembulatanBawahTagihan.disabled = true;
            button_pembulatanAtasTagihan.disabled = true;
            button_rupiahkanTagihan.disabled = true;
            button_nilaiAkhir.disabled = true;
            button_keterangan.disabled = true;
            button_isiDetailSPPB.disabled = true;
            button_koreksiDetailSPPB.disabled = true;
            button_hapusDetailSPPB.disabled = true;
            button_isiDetailFakturPajak.disabled = true;
            button_koreksiDetailFakturPajak.disabled = true;
            button_hapusDetailFakturPajak.disabled = true;
            button_cancelPenagihan.style.display = "none";
            button_cetakPenagihan.style.display = "none";
            div_idPenagihan.style.display = "flex";
            button_browseIdPenagihan.style.display = "block";
            button_koreksiPenagihan.style.display = "block";
            button_koreksiPenagihan.disabled = false;
            button_isiPenagihan.style.display = "block";
            button_isiPenagihan.disabled = false;
            button_isiPenagihan.focus();
        } else if (jenisInit == "isiPenagihan") {
            button_browseIdPenagihan.style.display = "none";
            button_koreksiPenagihan.style.display = "none";
            button_isiPenagihan.disabled = true;
            id_penagihanSupplier.readOnly = false;
            button_cancelPenagihan.style.display = "block";
            button_cetakPenagihan.style.display = "block";
            button_browseSupplier.disabled = false;
            button_browseIdPenagihan.disabled = true;
            status_pajakAda.disabled = false;
            status_pajakTidakAda.disabled = false;
            button_browseJenisDokumen.disabled = false;
            button_pembulatanBawahTagihan.disabled = false;
            button_pembulatanAtasTagihan.disabled = false;
            button_rupiahkanTagihan.disabled = false;
            button_nilaiAkhir.disabled = false;
            button_keterangan.disabled = false;
            button_isiDetailSPPB.disabled = false;
            button_isiDetailFakturPajak.disabled = false;
        } else if (jenisInit == "koreksiPenagihan") {
            div_idPenagihan.style.display = "flex";
            id_penagihanSupplier.readOnly = false;
            button_browseIdPenagihan.style.display = "block";
            button_isiPenagihan.style.display = "none";
            button_koreksiPenagihan.disabled = true;
            button_cancelPenagihan.style.display = "block";
            button_cetakPenagihan.style.display = "block";
            button_browseSupplier.disabled = false;
            button_browseIdPenagihan.disabled = false;
            status_pajakAda.disabled = false;
            status_pajakTidakAda.disabled = false;
            button_browseJenisDokumen.disabled = false;
            button_pembulatanBawahTagihan.disabled = false;
            button_pembulatanAtasTagihan.disabled = false;
            button_rupiahkanTagihan.disabled = false;
            button_nilaiAkhir.disabled = false;
            button_keterangan.disabled = false;
            button_isiDetailSPPB.disabled = false;
            button_isiDetailFakturPajak.disabled = false;
        }
    }

    function clearAll() {
        tanggal_penagihan.valueAsDate = new Date();
        nama_supplier.value = "";
        id_supplier.value = "";
        id_penagihan.value = "";
        id_penagihanSupplier.value = "";
        status_pajakAda.checked = true;
        jenis_dokumen.value = "";
        id_jenisDokumen.value = "";
        jumlah_dokumen.value = 1;
        nama_mataUang.value = "";
        id_mataUang.value = "";
        nilai_tagihan.value = "";
        nilai_akhir.value = "";
        table_detailSPPB.clear().draw();
        table_detailFakturPajak.clear().draw();
        total_detailPenagihan.value = "";
        total_detailFakturPajak.value = "";
    }

    function initializeSelect2() {
        sppb_divisi.select2({
            dropdownParent: $("#sppb_select2ParentDivisi"),
            placeholder: "Pilih Divisi",
        });

        sppb_satuanQtyTagihan.select2({
            dropdownParent: $("#sppb_select2ParentQtyTagihan"),
            placeholder: "Pilih Satuan",
        });
    }

    function getDataDivisi() {
        sppb_divisi
            .data("select2")
            .options.set("placeholder", "Loading Divisi...");
        sppb_divisi.empty().prop("disabled", true).trigger("change");

        $.ajax({
            url: "/Kencana/MaintenancePenagihanKencana/getDivisi",
            method: "GET",
            data: {
                _token: csrfToken,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data Divisi failed ",
                        returnFocus: false,
                    });
                } else {
                    data.forEach(function (item) {
                        sppb_divisi.append(
                            new Option( item.NM_DIV.trim(), item.Kd_div.trim()), // prettier-ignore
                        );
                    });

                    sppb_divisi
                        .data("select2")
                        .options.set("placeholder", "Pilih Divisi");
                    sppb_divisi
                        .prop("disabled", false)
                        .val(null)
                        .trigger("change");

                    $("#sppb_divisi").each(function () {
                        $(this).next(".select2-container").css({
                            flex: "1 1 auto",
                            width: "100%",
                        });
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Divisi.",
                });
            },
        });
    }

    function getDataSatuan() {
        sppb_satuanQtyTagihan
            .data("select2")
            .options.set("placeholder", "Loading Satuan...");
        sppb_satuanQtyTagihan.empty().prop("disabled", true).trigger("change");

        $.ajax({
            url: "/Kencana/MaintenancePenagihanKencana/getSatuan",
            method: "GET",
            data: {
                _token: csrfToken,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data Satuan failed ",
                        returnFocus: false,
                    });
                } else {
                    data.forEach(function (item) {
                        sppb_satuanQtyTagihan.append(
                            new Option( item.Nama_satuan.trim(), item.No_satuan.trim()), // prettier-ignore
                        );
                    });

                    sppb_satuanQtyTagihan
                        .data("select2")
                        .options.set("placeholder", "Pilih Satuan");
                    sppb_satuanQtyTagihan
                        .prop("disabled", false)
                        .val(null)
                        .trigger("change");

                    $("#sppb_satuanQtyTagihan").each(function () {
                        $(this).next(".select2-container").css({
                            flex: 0.1,
                        });
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Satuan.",
                });
            },
        });
    }

    function clearHeaderModalSPPB() {
        sppb_idPenagihan.value = "";
        sppb_divisi.val(null).trigger("change");
        sppb_nomorSPPB.value = "";
    }

    function clearBagianSPPBModalSPPB(jenisProses) {
        sppb_noTerima.value = "";
        sppb_kodeBarang.value = "";
        sppb_namaBarang.value = "";
        if (jenisProses == "reloadTabelSPPB") {
            sppb_tableDataSPPB.clear().draw();
        }
    }

    function clearBagianPenagihanModalSPPB(jenisProses) {
        sppb_qtyTagihan.value = "";
        sppb_satuanQtyTagihan.val(null).trigger("change");
        sppb_mataUang.value = "";
        sppb_idMataUang.value = "";
        sppb_kurs.value = "";
        sppb_discTagihan.value = "";
        sppb_ppnTagihan.value = "";
        sppb_hargaSatuan.value = "";
        sppb_hargaSatuanRupiah.value = "";
        sppb_hargaMurni.value = "";
        sppb_hargaMurniRupiah.value = "";
        sppb_hargaDisc.value = "";
        sppb_hargaDiscRupiah.value = "";
        sppb_hargaPPN.value = "";
        sppb_hargaPPNRupiah.value = "";
        sppb_hargaSubtotal.value = "";
        sppb_hargaSubtotalRupiah.value = "";
        if (jenisProses == "reloadTabelSPPB") {
            sppb_tableDataPenagihan.clear().draw();
        }
    }

    function clearModalFakturPajak() {
        pajak_nomorFaktur.value = "";
        pajak_hargaMurni.value = "";
        pajak_nilaiPajak.value = "";
        pajak_hargaPPN.value = "";
        pajak_kursPajak.value = "";
    }

    function tampilHeader() {
        $.ajax({
            url: "/Kencana/MaintenancePenagihanKencana/getHeader",
            method: "GET",
            data: {
                _token: csrfToken,
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data header penagihan failed ",
                        returnFocus: false,
                    });
                } else {
                    tanggal_penagihan.value = moment(
                        data[0].Waktu_Penagihan,
                    ).format("YYYY-MM-DD");
                    id_penagihanSupplier.value = data[0].id_inv_supp ?? "";
                    if (data[0].Status_PPN == "Y") {
                        status_pajakAda.checked = true;
                        status_pajakAda.dispatchEvent(changeEvent);
                        tampilDetailPajak();
                    } else if (data[0].Status_PPN == "N") {
                        status_pajakTidakAda.checked = true;
                        status_pajakTidakAda.dispatchEvent(changeEvent);
                    }
                    jenis_dokumen.value = data[0].Nama_Dokumen;
                    id_jenisDokumen.value = data[0].Id_Jenis_Dokumen;
                    jumlah_dokumen.value = data[0].Jumlah_Dokumen;
                    id_mataUang.value = data[0].Id_MataUang;
                    nama_mataUang.value = data[0].Nama_MataUang;
                    nilai_tagihan.value = numeral(data[0].NilaiTagihan).format(
                        "0,0.00",
                    );
                    nilai_akhir.value = numeral(data[0].Nilai_Penagihan).format(
                        "0,0.00",
                    );
                    total_detailPenagihan.value = numeral(
                        data[0].NilaiTagihan,
                    ).format("0,0.00");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load header penagihan.",
                });
            },
        });
    }

    function tampilDetailPO() {
        $.ajax({
            url: "/Kencana/MaintenancePenagihanKencana/getDetailPO",
            method: "GET",
            data: {
                _token: csrfToken,
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data detail po failed ",
                        returnFocus: false,
                    });
                } else {
                    console.log(data);
                    table_detailSPPB.clear().draw();
                    data.forEach((item) => {
                        table_detailSPPB.row.add([
                            item.Id_Divisi,
                            item.No_SPPB,
                            moment(item.Tgl_Faktur).format("MM-DD-YYYY"),
                            item.Faktur,
                            numeral(item.Hrg_Terbayar).format("0,0.0000"),
                            item.No_SuratJalan,
                        ]);
                    });
                    table_detailSPPB.draw();
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load detail po.",
                });
            },
        });
    }

    function tampilDetailPajak() {
        $.ajax({
            url: "/Kencana/MaintenancePenagihanKencana/getDetailPajak",
            method: "GET",
            data: {
                _token: csrfToken,
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data detail pajak failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.length > 0) {
                        table_detailFakturPajak.clear().draw();
                        data.forEach((item) => {
                            table_detailFakturPajak.row.add([
                                item.Id_Detail_Faktur,
                                item.No_Faktur,
                                numeral(item.Nilai_Faktur).format("0,0.0000"),
                                numeral(item.Nilai_Pajak).format("0,0.00"),
                                numeral(item.Hrg_Ppn).format("0,0.0000"),
                                numeral(item.Kurs_Rupiah).format("0,0.0000"),
                            ]);
                        });
                        table_detailFakturPajak.draw();
                        total_detailFakturPajak.value = numeral(
                            data[0].TotalPajak,
                        ).format("0,0.0000");
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load detail pajak.",
                });
            },
        });
    }

    function hitungHargaPPN() {
        let pajak_hargaMurniValue = numeral(pajak_hargaMurni.value).value();
        pajak_hargaMurni.value = numeral(pajak_hargaMurniValue).format(
            "0,0.0000",
        );
        let pajak_nilaiPajakValue = numeral(pajak_nilaiPajak.value).value();
        if (pajak_nilaiPajakValue > 100) {
            pajak_nilaiPajakValue = 100;
        }
        pajak_nilaiPajak.value = numeral(pajak_nilaiPajakValue).format(
            "0,0.00",
        );
        pajak_hargaPPN.value = numeral(
            (pajak_hargaMurniValue * pajak_nilaiPajakValue) / 100,
        ).format("0,0.0000");
    }

    // fungsi swal select pake arrow
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
                            "selected",
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
                            "selected",
                        );
                        scrollRowIntoView(selectedRow[0]);
                    });
            }
        }
    }

    // Helper function to scroll selected row into view
    function scrollRowIntoView(rowElement) {
        rowElement.scrollIntoView({ block: "nearest" });
    }
    //#endregion

    //#region Event Listener
    button_isiPenagihan.addEventListener("click", function (e) {
        init("isiPenagihan");
        tanggal_penagihan.focus();
        modeForm = "isiPenagihan";
    });

    button_koreksiPenagihan.addEventListener("click", function (e) {
        init("koreksiPenagihan");
        button_browseSupplier.focus();
        modeForm = "koreksiPenagihan";
    });

    button_cancelPenagihan.addEventListener("click", function (e) {
        init("loadForm");
        clearAll();
        modeForm = "";
    });

    tanggal_penagihan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            button_browseSupplier.focus();
        }
    });

    button_browseSupplier.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Supplier",
                html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Nama Supplier</th>
                            <th scope="col">Id Supplier</th>
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
                width: "50%",
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
                                url: "/Kencana/MaintenancePenagihanKencana/getDataSupplier",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "NM_SUP" }, { data: "NO_SUP" }],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "70%",
                                },
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
                            handleTableKeydown(e, "table_list"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    nama_supplier.value = result.value.NM_SUP.trim();
                    id_supplier.value = result.value.NO_SUP.trim();
                    if (modeForm == "isiPenagihan") {
                        status_pajakAda.focus();
                    } else if (modeForm == "koreksiPenagihan") {
                        button_browseIdPenagihan.focus();
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    button_browseIdPenagihan.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Penagihan",
                html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id Penagihan</th>
                            <th scope="col">Tgl. Penagihan</th>
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
                width: "50%",
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
                            order: [1, "desc"],
                            ajax: {
                                url: "/Kencana/MaintenancePenagihanKencana/getDataPenagihan",
                                dataType: "json",
                                type: "GET",
                                data: function(d){
                                    d._token =  csrfToken;
                                    d.idSupplier =  id_supplier.value;
                                    console.log("ID Supplier: ", id_supplier.value);
                                },
                                dataSrc: function (json) {
                                    console.log("Response Penagihan:", json);
                                    return json.data || [];
                                },
                                error: function (xhr) {
                                    console.error("Error getDataPenagihan:", xhr.responseText);
                                }
                            },
                            columns: [
                                { data: "Id_Penagihan" },
                                {
                                    data: "Waktu_Penagihan",
                                    render: function (data, type, full, meta) {
                                        return moment(data).format(
                                            "MM/DD/YYYY",
                                        );
                                    },
                                },
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "70%",
                                },
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
                            handleTableKeydown(e, "table_list"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    id_penagihan.value = result.value.Id_Penagihan;

                    $.ajax({
                        url: "/Kencana/MaintenancePenagihanKencana/cekReturDanDetail",
                        method: "GET",
                        data: {
                            _token: csrfToken,
                            idPenagihan: id_penagihan.value,
                        },
                        dataType: "json",
                        success: function (data) {
                            if (!data) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    showConfirmButton: false,
                                    timer: 1000,
                                    text: "fetching data SPPB failed ",
                                    returnFocus: false,
                                });
                            } else {
                                if (data.error) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        showConfirmButton: false,
                                        html: data.error,
                                        returnFocus: false,
                                    });
                                    return;
                                }
                                tampilHeader();
                                tampilDetailPO();
                            }
                        },
                        error: function () {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "Failed to load data SPPB.",
                            });
                        },
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    radios.forEach((radio) => {
        radio.addEventListener("change", function () {
            if (status_pajakAda.checked) {
                button_isiDetailFakturPajak.disabled = false;
            } else if (status_pajakTidakAda.checked) {
                button_isiDetailFakturPajak.disabled = true;
            }
        });
        radio.addEventListener("keypress", function (e) {
            if (e.key == "Enter") {
                e.preventDefault();
                button_browseJenisDokumen.focus();
            }
        });
    });

    button_browseJenisDokumen.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Jenis Dokumen",
                html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Nama Jenis Dokumen</th>
                            <th scope="col">Id Jenis Dokumen</th>
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
                width: "50%",
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
                                url: "/Kencana/MaintenancePenagihanKencana/getDataJenisDokumen",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Nama_Dokumen" },
                                { data: "Id_Jenis_Dokumen" },
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "70%",
                                },
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
                            handleTableKeydown(e, "table_list"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    jenis_dokumen.value = result.value.Nama_Dokumen.trim();
                    id_jenisDokumen.value =
                        result.value.Id_Jenis_Dokumen.trim();
                    jumlah_dokumen.focus();
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    jumlah_dokumen.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            id_penagihanSupplier.focus();
        }
    });

    id_penagihanSupplier.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            console.log(table_detailSPPB.data().toArray());

            if (table_detailSPPB.data().toArray().length > 0) {
                button_pembulatanBawahTagihan.focus();
            } else {
                button_isiDetailSPPB.focus();
            }
        }
    });

    button_pembulatanBawahTagihan.addEventListener("click", function (e) {
        e.preventDefault();

        const nilai = parseFloat(numeral(nilai_tagihan.value).value());
        if (isNaN(nilai)) return;

        nilai_akhir.value = numeral(Math.floor(nilai)).format("0,0.00");
        button_nilaiAkhir.focus();
    });

    button_pembulatanAtasTagihan.addEventListener("click", function (e) {
        e.preventDefault();

        const nilai = parseFloat(numeral(nilai_tagihan.value).value());
        if (isNaN(nilai)) return;

        nilai_akhir.value = numeral(Math.ceil(nilai)).format("0,0.00");
        button_nilaiAkhir.focus();
    });

    button_rupiahkanTagihan.addEventListener("click", function (e) {
        Swal.fire({
            title: "Apakah yakin tagihan akan dirupiahkan?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: `Tidak`,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/Kencana/MaintenancePenagihanKencana",
                    method: "POST",
                    data: {
                        _token: csrfToken,
                        jenisProses: "rupiahkanTagihan",
                        idPenagihan: id_penagihan.value,
                    },
                    dataType: "json",
                    success: function (data) {
                        if (!data) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                showConfirmButton: false,
                                timer: 1000,
                                text: "Delete data Faktur Pajak failed ",
                                returnFocus: false,
                            });
                        } else {
                            if (data.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    showConfirmButton: false,
                                    timer: 1000,
                                    text: data.success,
                                    returnFocus: false,
                                });
                                nilai_akhir.value = numeral(
                                    data.rupiah[0].Harga_TerbayarRp,
                                ).format("0,0.00");
                            } else {
                                console.error(data);
                            }
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to Delete Faktur Pajak.",
                        });
                    },
                });
            }
        });
    });

    button_nilaiAkhir.addEventListener("click", function (e) {
        if (nilai_akhir.value == "" || nilai_akhir.value <= 0) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Nilai akhir tidak sesuai format",
                returnFocus: false,
            });
            button_pembulatanBawahTagihan.focus();
            return;
        }
        $.ajax({
            url: "/Kencana/MaintenancePenagihanKencana",
            method: "POST",
            data: {
                _token: csrfToken,
                jenisProses: "inputPembulatanNilaiAkhir",
                nilaiPenagihan: numeral(nilai_akhir.value).value(),
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "Post data Nilai Pembulatan failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.success,
                            returnFocus: false,
                        });
                        button_cetakPenagihan.focus();
                    } else {
                        console.error(data);
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to post Nilai Pembulatan.",
                });
            },
        });
    });

    button_keterangan.addEventListener("click", function (e) {
        if (id_penagihan.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Harus input Detail Penagihan dulu",
                returnFocus: false,
            });
            button_browseIdPenagihan.focus();
            return;
        }

        $.ajax({
            url: "/Kencana/MaintenancePenagihanKencana/getDataKeteranganPenagihan",
            method: "GET",
            data: {
                _token: csrfToken,
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data Keterangan Penagihan failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.error) {
                        keterangan_text.value = "";
                        keterangan_nilai.value = "";
                        keterangan_id.value = "";
                    } else {
                        keterangan_id.value = data.dataKeterangan[0].Id_Detail;
                        keterangan_text.value =
                            data.dataKeterangan[0].Keterangan;
                        keterangan_nilai.value = numeral(
                            data.dataKeterangan[0].Nilai,
                        ).format("0,0.0000");
                    }
                    $("#modalTTKeterangan").modal("show");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load data Keterangan Penagihan.",
                });
            },
        });
    });

    keterangan_text.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            keterangan_nilai.focus();
        }
    });

    keterangan_nilai.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = numeral(this.value).format("0,0.0000");
            keterangan_buttonSimpan.focus();
        }
    });

    keterangan_buttonSimpan.addEventListener("click", function (e) {
        if (keterangan_text.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Harus input keterangan dulu",
                returnFocus: false,
            });
            keterangan_text.focus();
            return;
        }

        if (keterangan_nilai.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Harus input nilai dulu",
                returnFocus: false,
            });
            keterangan_nilai.focus();
            return;
        }

        $.ajax({
            url: "/Kencana/MaintenancePenagihanKencana",
            method: "POST",
            data: {
                _token: csrfToken,
                jenisProses:
                    keterangan_id.value == ""
                        ? "simpanKeteranganPenagihan"
                        : "updateKeteranganPenagihan",
                idPenagihan: id_penagihan.value,
                keteranganText: keterangan_text.value,
                keteranganNilai: numeral(keterangan_nilai.value).value(),
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "Post data Keterangan Penagihan failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.success,
                            returnFocus: false,
                        });
                        $("#modalTTKeterangan").modal("hide");
                    } else {
                        console.error(data);
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to post Keterangan Penagihan.",
                });
            },
        });
    });

    $("#table_detailSPPB tbody").on("click", "tr", function () {
        selectedRowDataDetailSPPB = table_detailSPPB.row(this).data();
        if (!selectedRowDataDetailSPPB) {
            return;
        }

        // Remove the 'selected' class from any previously selected row
        $("#table_detailSPPB tbody tr").removeClass("selected");
        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");
        console.log(selectedRowDataDetailSPPB);
        button_koreksiDetailSPPB.disabled = false;
        button_hapusDetailSPPB.disabled = false;
    });

    button_isiDetailSPPB.addEventListener("click", function (e) {
        if (nama_supplier.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Supplier harus dipilih",
                returnFocus: false,
            });
            button_browseSupplier.focus();
            return;
        }
        $("#table_detailSPPB tbody tr").removeClass("selected");
        selectedRowDataDetailSPPB = null;
        sppb_idPenagihan.value = "";
        sppb_divisi.val(null).trigger("change");
        sppb_nomorSPPB.value = "";
        button_koreksiDetailSPPB.disabled = true;
        button_hapusDetailSPPB.disabled = true;
        clearHeaderModalSPPB();
        $("#modalTTSPPB").modal("show");
    });

    button_koreksiDetailSPPB.addEventListener("click", function (e) {
        sppb_idPenagihan.value = id_penagihan.value;
        sppb_divisi.val(selectedRowDataDetailSPPB[0]).trigger("change");
        sppb_nomorSPPB.value = selectedRowDataDetailSPPB[1];
        $("#table_detailSPPB tbody tr").removeClass("selected");
        selectedRowDataDetailSPPB = null;
        button_koreksiDetailSPPB.disabled = true;
        button_hapusDetailSPPB.disabled = true;
        // $("#modalTTSPPB").modal("show");
        Swal.fire({
            icon: "error",
            title: "Error",
            showConfirmButton: false,
            timer: 1000,
            text: "Masih perlu ditanyakan apakah butuh fitur dikoreksi",
            returnFocus: false,
        });
    });

    button_hapusDetailSPPB.addEventListener("click", function (e) {
        sppb_idPenagihan.value = id_penagihan.value;
        sppb_divisi.val(selectedRowDataDetailSPPB[0]).trigger("change");
        sppb_nomorSPPB.value = selectedRowDataDetailSPPB[1];
        $("#table_detailSPPB tbody tr").removeClass("selected");
        selectedRowDataDetailSPPB = null;
        button_koreksiDetailSPPB.disabled = true;
        button_hapusDetailSPPB.disabled = true;
        // $("#modalTTSPPB").modal("show");
        Swal.fire({
            icon: "error",
            title: "Error",
            showConfirmButton: false,
            timer: 1000,
            text: "Masih perlu ditanyakan apakah butuh fitur hapus",
            returnFocus: false,
        });
    });

    $("#modalSPPB").on("shown.bs.modal", function (event) {
        if (sppb_idPenagihan.value) {
            sppb_nomorSPPB.value = nomorSPPB;
            sppb_idPenagihan.value = id_penagihan.value;
        } else {
            clearBagianSPPBModalSPPB("reloadTabelSPPB");
            clearBagianPenagihanModalSPPB("reloadTabelSPPB");
        }
    });

    $("#table_detailFakturPajak tbody").on("click", "tr", function () {
        selectedRowDataDetailFakturPajak = table_detailFakturPajak
            .row(this)
            .data();
        if (!selectedRowDataDetailFakturPajak) {
            return;
        }

        // Remove the 'selected' class from any previously selected row
        $("#table_detailFakturPajak tbody tr").removeClass("selected");
        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");
        button_koreksiDetailFakturPajak.disabled = false;
        button_hapusDetailFakturPajak.disabled = false;
        console.log(selectedRowDataDetailFakturPajak);
    });

    button_isiDetailFakturPajak.addEventListener("click", function (e) {
        if (id_penagihan.value == "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Harus input Detail Penagihan dulu",
                returnFocus: false,
            });
            button_isiDetailSPPB.focus();
            return;
        }
        pajak_idDetail.value = "";
        $("#table_detailFakturPajak tbody tr").removeClass("selected");
        selectedRowDataDetailFakturPajak = null;
        button_koreksiDetailFakturPajak.disabled = true;
        button_hapusDetailFakturPajak.disabled = true;
        $("#modalTTPajak").modal("show");
    });

    button_koreksiDetailFakturPajak.addEventListener("click", function (e) {
        pajak_idDetail.value = selectedRowDataDetailFakturPajak[0];
        button_koreksiDetailFakturPajak.disabled = true;
        button_hapusDetailFakturPajak.disabled = true;
        $("#table_detailFakturPajak tbody tr").removeClass("selected");
        selectedRowDataDetailFakturPajak = null;
        // $("#modalTTPajak").modal("show");
        Swal.fire({
            icon: "error",
            title: "Error",
            showConfirmButton: false,
            timer: 1000,
            text: "Masih perlu ditanyakan apakah butuh fitur koreksi",
            returnFocus: false,
        });
    });

    button_hapusDetailFakturPajak.addEventListener("click", function (e) {
        pajak_idDetail.value = selectedRowDataDetailFakturPajak[0];
        button_koreksiDetailFakturPajak.disabled = true;
        button_hapusDetailFakturPajak.disabled = true;
        // $("#modalTTPajak").modal("show");
        Swal.fire({
            title: "Apakah yakin menghapus data faktur pajak?",
            showDenyButton: true,
            confirmButtonText: "Ya",
            denyButtonText: `Tidak`,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/Kencana/MaintenancePenagihanKencana",
                    method: "POST",
                    data: {
                        _token: csrfToken,
                        jenisProses: "deleteDataPajak",
                        idDetailFakturPajak: pajak_idDetail.value,
                        idPenagihan: id_penagihan.value,
                    },
                    dataType: "json",
                    success: function (data) {
                        if (!data) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                showConfirmButton: false,
                                timer: 1000,
                                text: "Delete data Faktur Pajak failed ",
                                returnFocus: false,
                            });
                        } else {
                            if (data.success) {
                                $(
                                    "#table_detailFakturPajak tbody tr",
                                ).removeClass("selected");
                                selectedRowDataDetailFakturPajak = null;
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    showConfirmButton: false,
                                    timer: 1000,
                                    text: data.success,
                                    returnFocus: false,
                                });
                                tampilDetailPajak();
                            } else {
                                console.error(data);
                            }
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to Delete Faktur Pajak.",
                        });
                    },
                });
            }
        });
    });

    $("#modalTTPajak").on("shown.bs.modal", function (event) {
        if (pajak_idDetail.value) {
            $.ajax({
                url: "/Kencana/MaintenancePenagihanKencana/getDataDetailFakturPajak",
                method: "GET",
                data: {
                    _token: csrfToken,
                    idDetail: idDetailFakturPajak,
                },
                dataType: "json",
                success: function (data) {
                    if (!data) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            showConfirmButton: false,
                            timer: 1000,
                            text: "fetching data Faktur Pajak failed ",
                            returnFocus: false,
                        });
                    } else {
                        if (data.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                showConfirmButton: false,
                                html: data.error,
                                returnFocus: false,
                            });
                        }
                        console.log(data);
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load data Faktur Pajak.",
                    });
                },
            });
        } else {
            clearModalFakturPajak();
            pajak_nomorFaktur.focus();
        }
    });

    pajak_nomorFaktur.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            pajak_hargaMurni.focus();
        }
    });

    pajak_hargaMurni.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hitungHargaPPN();
            pajak_nilaiPajak.focus();
        }
    });

    pajak_nilaiPajak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hitungHargaPPN();
            pajak_hargaPPN.focus();
        }
    });

    pajak_hargaPPN.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            pajak_kursPajak.focus();
        }
    });

    pajak_kursPajak.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = numeral(pajak_kursPajak.value).format("0,0.0000");
            pajak_buttonSimpan.focus();
        }
    });

    pajak_buttonSimpan.addEventListener("click", function (e) {
        if (pajak_hargaMurni.value < 1) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Nilai faktur tidak boleh 0",
                returnFocus: false,
            });
            pajak_hargaMurni.focus();
            return;
        }
        $.ajax({
            url: "/Kencana/MaintenancePenagihanKencana",
            method: "POST",
            data: {
                _token: csrfToken,
                jenisProses: pajak_idDetail.value
                    ? "updateDataPajak"
                    : "insertDataPajak",
                idDetailFakturPajak: pajak_idDetail.value,
                nomorFaktur: pajak_nomorFaktur.value,
                hargaMurni: numeral(pajak_hargaMurni.value).value(),
                nilaiPajak: numeral(pajak_nilaiPajak.value).value(),
                hargaPPN: numeral(pajak_hargaPPN.value).value(),
                kursPajak: numeral(pajak_kursPajak.value).value(),
                idPenagihan: id_penagihan.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "Post data Faktur Pajak failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.success,
                            returnFocus: false,
                        });
                        $("#modalTTPajak").modal("hide");
                        tampilDetailPajak();
                    } else {
                        console.error(data);
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to post Faktur Pajak.",
                });
            },
        });
    });

    sppb_nomorSPPB.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (!sppb_divisi.val()) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    showConfirmButton: false,
                    timer: 1000,
                    text: "Divisi harus dipilih",
                    returnFocus: false,
                });
                return;
            }

            if (this.value == "") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    showConfirmButton: false,
                    timer: 1000,
                    text: "Nomor SPPB harus diisi",
                    returnFocus: false,
                });
                return;
            }

            this.value = this.value.toUpperCase();
            sppb_tableDataSPPB.clear().draw();
            sppb_tableDataPenagihan.clear().draw();
            $.ajax({
                url: "/Kencana/MaintenancePenagihanKencana/getDataSPPB",
                method: "GET",
                data: {
                    _token: csrfToken,
                    idDivisi: sppb_divisi.val(),
                    nomorSPPB: this.value,
                    idSupplier: id_supplier.value,
                },
                dataType: "json",
                success: function (data) {
                    if (!data || !data.dataSPPB) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            showConfirmButton: false,
                            timer: 1000,
                            text: "fetching data SPPB failed ",
                            returnFocus: false,
                        });
                    } else {
                        if (data.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                showConfirmButton: false,
                                html: data.error,
                                returnFocus: false,
                            });
                            if (data.dataSPPB.length < 1) {
                                return;
                            }
                        }
                        console.log(data);
                        clearBagianSPPBModalSPPB("reloadTabelSPPB");
                        clearBagianPenagihanModalSPPB("reloadTabelSPPB");
                        sppb_mataUang.value = data.dataSPPB[0].Nama_MataUang.trim(); //prettier-ignore
                        sppb_idMataUang.value = data.dataSPPB[0].IdMataUang;

                        data.dataSPPB.forEach((item) => {
                            sppb_tableDataSPPB.row.add([
                                item.No_terima,
                                // "<" + item.Kd_brg + "> " + item.NAMA_BRG,
                                item.NAMA_BRG,
                                item.Faktur,
                                numeral(item.Qty_Terima).format("0,0.00"),
                                item.Nama_satuan.trim(),
                                item.Nama_MataUang.trim(),
                                numeral(item.Hrg_trm).format("0,0.0000"),
                                numeral(
                                    parseFloat(item.Hrg_trm) *
                                        parseFloat(item.Qty_Terima),
                                ).format("0,0.00"),
                                numeral(item.Kurs_Rp).format("0,0.00"),
                                numeral(item.Harga_disc).format("0,0.00"),
                                numeral(item.Harga_Ppn).format("0,0.00"),
                                numeral(item.Harga_terbayar).format("0,0.00"),
                                numeral(
                                    parseFloat(item.Harga_terbayar) *
                                        parseFloat(item.Kurs_Rp),
                                ).format("0,0.00"),
                                moment(item.Datang).format("MM/DD/YYYY"),
                                moment(item.Tgl_Faktur).format("MM/DD/YYYY"),
                                numeral(item.Disc_trm).format("0,0.00"),
                                numeral(item.Ppn_trm).format("0,0.00"),
                                item.Flag ?? "",
                                item.Kd_brg,
                                item.Sat_Terima,
                            ]);
                        });
                        sppb_tableDataSPPB.draw();
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load data SPPB.",
                    });
                },
            });
        }
    });

    $("#sppb_tableDataSPPB tbody").on("click", "tr", function () {
        // Get data from the clicked row
        if (modeForm !== "isiPenagihan") {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Hanya bisa untuk Prose ISI DETAIL!",
                returnFocus: false,
            });
            return;
        }
        if (selectedRowDataPenagihan) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Selesaikan proses koreksi data penagihannya",
                returnFocus: false,
            });
        }
        selectedRowDataSPPB = sppb_tableDataSPPB.row(this).data();
        if (!selectedRowDataSPPB) {
            return;
        }

        // Remove the 'selected' class from any previously selected row
        $("#sppb_tableDataSPPB tbody tr").removeClass("selected");
        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");
        console.log(selectedRowDataSPPB);

        let rowIndex = -1;

        sppb_tableDataPenagihan
            .column(0)
            .data()
            .each(function (value, i) {
                if (value == selectedRowDataSPPB[0]) {
                    rowIndex = i + 1;
                }
            });

        if (rowIndex !== -1) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                text:
                    "Data SPPB sudah ada di tabel tagihan baris ke " + rowIndex,
                returnFocus: false,
            }).then(() => {
                // Remove the 'selected' class from any previously selected row
                $("#sppb_tableDataSPPB tbody tr").removeClass("selected");
            });
            return;
        }

        sppb_noTerima.value = selectedRowDataSPPB[0];
        sppb_kodeBarang.value = selectedRowDataSPPB[18];
        sppb_namaBarang.value = selectedRowDataSPPB[1];
        sppb_qtyTagihan.value = selectedRowDataSPPB[3];
        sppb_satuanQtyTagihan.val(selectedRowDataSPPB[19]).trigger("change");
        sppb_satuanQtyTagihan.prop("disabled", true).trigger("change");
        sppb_kurs.value = selectedRowDataSPPB[8];
        sppb_discTagihan.value = selectedRowDataSPPB[15];
        sppb_ppnTagihan.value = selectedRowDataSPPB[16];
        sppb_hargaSatuan.value = numeral(selectedRowDataSPPB[6]).format(
            "0,0.0000",
        );

        sppb_hargaSatuanRupiah.value =
            numeral(selectedRowDataSPPB[8]).value() == 0
                ? selectedRowDataSPPB[6]
                : numeral(
                      numeral(selectedRowDataSPPB[6]).value() *
                          numeral(selectedRowDataSPPB[8]).value(),
                  ).format("0,0.0000");
        sppb_hargaMurni.value = numeral(selectedRowDataSPPB[7]).format(
            "0,0.0000",
        );
        sppb_hargaMurniRupiah.value =
            numeral(selectedRowDataSPPB[8]).value() == 0
                ? selectedRowDataSPPB[7]
                : numeral(
                      numeral(selectedRowDataSPPB[7]).value() *
                          numeral(selectedRowDataSPPB[8]).value(),
                  ).format("0,0.0000");
        sppb_hargaDisc.value = numeral(selectedRowDataSPPB[9]).format(
            "0,0.0000",
        );

        sppb_hargaDiscRupiah.value =
            numeral(selectedRowDataSPPB[8]).value() == 0
                ? selectedRowDataSPPB[9]
                : numeral(
                      numeral(selectedRowDataSPPB[9]).value() *
                          numeral(selectedRowDataSPPB[8]).value(),
                  ).format("0,0.0000");
        sppb_hargaPPN.value = numeral(selectedRowDataSPPB[10]).format(
            "0,0.0000",
        );
        sppb_hargaPPNRupiah.value =
            numeral(selectedRowDataSPPB[8]).value() == 0
                ? selectedRowDataSPPB[10]
                : numeral(
                      numeral(selectedRowDataSPPB[10]).value() *
                          numeral(selectedRowDataSPPB[8]).value(),
                  ).format("0,0.0000");
        sppb_hargaSubtotal.value = numeral(
            numeral(selectedRowDataSPPB[7]).value() -
                numeral(selectedRowDataSPPB[9]).value() +
                numeral(selectedRowDataSPPB[10]).value(),
        ).format("0,0.0000");
        sppb_hargaSubtotalRupiah.value =
            numeral(selectedRowDataSPPB[8]).value() == 0
                ? sppb_hargaSubtotal.value
                : numeral(
                      numeral(sppb_hargaSubtotal.value).value() *
                          numeral(selectedRowDataSPPB[8]).value(),
                  ).format("0,0.0000");
    });

    sppb_buttonIsi.addEventListener("click", function (e) {
        if (!selectedRowDataSPPB) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                text: "Pilih data pada tabel SPPB yang ingin dimasukan ke tabel Penagihan",
                returnFocus: false,
            });
            return;
        }
        sppb_tableDataPenagihan.row
            .add([
                sppb_noTerima.value,
                sppb_hargaSatuan.value,
                sppb_kurs.value,
                sppb_discTagihan.value,
                sppb_ppnTagihan.value,
                sppb_hargaDisc.value,
                sppb_hargaPPN.value,
                sppb_qtyTagihan.value,
                sppb_satuanQtyTagihan.select2("data")[0].text,
                sppb_hargaMurni.value,
                sppb_hargaSatuanRupiah.value,
                sppb_hargaMurniRupiah.value,
                sppb_hargaDiscRupiah.value,
                sppb_hargaPPNRupiah.value,
                sppb_kodeBarang.value,
                sppb_namaBarang.value,
                sppb_mataUang.value,
                sppb_idMataUang.value,
                sppb_satuanQtyTagihan.val(),
            ])
            .draw();
        // Remove the 'selected' class from any previously selected row
        $("#sppb_tableDataSPPB tbody tr").removeClass("selected");
        clearBagianSPPBModalSPPB("isiTabelDataPenagihan");
        clearBagianPenagihanModalSPPB("isiTabelDataPenagihan");
        selectedRowDataSPPB = null;
    });

    sppb_buttonHapus.addEventListener("click", function (e) {
        if (!selectedRowDataPenagihan) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Pilih data pada tabel Penagihan yang ingin dihapus dari tabel Penagihan",
                returnFocus: false,
            });
        }

        sppb_tableDataPenagihan.row(".selected").remove().draw(false);

        clearBagianSPPBModalSPPB("isiTabelDataPenagihan");
        clearBagianPenagihanModalSPPB("isiTabelDataPenagihan");
        selectedRowDataPenagihan = null;
    });

    $("#sppb_tableDataPenagihan tbody").on("click", "tr", function () {
        // Get data from the clicked row
        selectedRowDataPenagihan = sppb_tableDataPenagihan.row(this).data();
        if (!selectedRowDataPenagihan) {
            return;
        }
        if (selectedRowDataSPPB) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                text: "Selesaikan proses input data ke tabel penagihan",
                returnFocus: false,
            });
            selectedRowDataPenagihan = null;
            return;
        }

        // Remove the 'selected' class from any previously selected row
        $("#sppb_tableDataPenagihan tbody tr").removeClass("selected");
        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");
        console.log(selectedRowDataPenagihan);
        sppb_noTerima.value = selectedRowDataPenagihan[0];
        sppb_kodeBarang.value = selectedRowDataPenagihan[14];
        sppb_namaBarang.value = selectedRowDataPenagihan[15];
        sppb_qtyTagihan.value = selectedRowDataPenagihan[7];
        sppb_satuanQtyTagihan
            .val(selectedRowDataPenagihan[18])
            .trigger("change");
        sppb_mataUang.value = selectedRowDataPenagihan[16];
        sppb_kurs.value = selectedRowDataPenagihan[2];
        sppb_discTagihan.value = selectedRowDataPenagihan[3];
        sppb_ppnTagihan.value = selectedRowDataPenagihan[4];
        sppb_hargaSatuan.value = selectedRowDataPenagihan[1];
        sppb_hargaSatuanRupiah.value = selectedRowDataPenagihan[10];
        sppb_hargaMurni.value = selectedRowDataPenagihan[9];
        sppb_hargaMurniRupiah.value = selectedRowDataPenagihan[11];
        sppb_hargaDisc.value = selectedRowDataPenagihan[5];
        sppb_hargaDiscRupiah.value = selectedRowDataPenagihan[12];
        sppb_hargaPPN.value = selectedRowDataPenagihan[6];
        sppb_hargaPPNRupiah.value = selectedRowDataPenagihan[13];
        sppb_hargaSubtotal.value = numeral(
            numeral(selectedRowDataPenagihan[9]).value() -
                numeral(selectedRowDataPenagihan[5]).value() +
                numeral(selectedRowDataPenagihan[6]).value(),
        ).format("0,0.0000");
        sppb_hargaSubtotalRupiah.value = numeral(
            numeral(sppb_hargaSubtotal.value).value() *
                numeral(selectedRowDataPenagihan[2]).value(),
        ).format("0,0.0000");
    });

    // sppb_buttonKoreksi.addEventListener("click", function (e) {
    //     if (!selectedRowDataPenagihan) {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Error",
    //             showConfirmButton: false,
    //             timer: 1000,
    //             text: "Pilih data pada tabel Penagihan yang ingin dikoreksi",
    //             returnFocus: false,
    //         });
    //     }
    //     let noTerima = sppb_noTerima.value;

    //     sppb_tableDataPenagihan.rows().every(function () {
    //         let data = this.data();

    //         if (data[0] === noTerima) {
    //             data[9] = numeral(hasil).format("0,0.0000"); // Harga Disc
    //             data[13] = numeral(ppnRp).format("0,0.0000"); // Harga PPN Rp
    //             this.data(data);
    //         }
    //     });

    //     sppb_tableDataPenagihan.draw(false);
    // });

    sppb_buttonSimpan.addEventListener("click", function (e) {
        e.preventDefault();
        if (sppb_tableDataPenagihan.rows().data().toArray().length < 1) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Tidak ada data pada tabel penagihan",
                returnFocus: false,
            });
            button_browseSupplier.focus();
            return;
        }
        let statusPajak = null;
        radios.forEach((radio) => {
            if (radio.checked) {
                statusPajak = radio.value;
            }
        });

        $.ajax({
            url: "/Kencana/MaintenancePenagihanKencana",
            method: "POST",
            data: {
                _token: csrfToken,
                jenisProses: "insertDataSPPB",
                idSupplier: id_supplier.value,
                idInvSupp: id_penagihanSupplier.value,
                idJenisDokumen: id_jenisDokumen.value,
                jumlahDokumen: jumlah_dokumen.value,
                statusPPN: statusPajak,
                tabelDataPenagihan: sppb_tableDataPenagihan
                    .rows()
                    .data()
                    .toArray(),
                idDivisi: sppb_divisi.val(),
                noSPPB: sppb_nomorSPPB.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "Post data SPPB failed ",
                        returnFocus: false,
                    });
                } else {
                    if (data.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.error,
                            returnFocus: false,
                        });
                    } else if (data.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            showConfirmButton: false,
                            timer: 1000,
                            text: data.success,
                            returnFocus: false,
                        }).then(() => {
                            $("#modalTTSPPB").modal("hide");
                            id_penagihan.value = data.idPenagihan;
                            tampilHeader();
                            tampilDetailPO();
                        });
                    }
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to post SPPB.",
                });
            },
        });
    });

    button_cetakPenagihan.addEventListener("click", function (e) {
        if (!id_penagihan.value) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Id Penagihan tidak boleh kosong",
                returnFocus: false,
            });
            return;
        }
        if (!nilai_akhir.value) {
            Swal.fire({
                icon: "error",
                title: "Error",
                showConfirmButton: false,
                timer: 1000,
                text: "Nilai Akhir tidak boleh kosong",
                returnFocus: false,
            });
            return;
        }
        let urlEncodedidPenagihan = encodeURIComponent(id_penagihan.value);
        let terbilang = convertNumberToWordsRupiah(
            numeral(nilai_akhir.value).value(),
        );

        window.open(
            `/Kencana/MaintenancePenagihanKencana/printTT?idPenagihan=` +
                urlEncodedidPenagihan +
                `&terbilang=` +
                terbilang,
            "Cetak TT " + id_penagihan.value,
        );
    });
    //#endregion
});
