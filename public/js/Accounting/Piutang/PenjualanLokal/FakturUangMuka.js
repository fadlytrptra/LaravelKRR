$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let btn_customer = document.getElementById("btn_customer");
    let btn_penagihan = document.getElementById("btn_penagihan");
    let btn_noSP = document.getElementById("btn_noSP");
    let btn_userPenagih = document.getElementById("btn_userPenagih");
    let btn_pajak = document.getElementById("btn_pajak");
    let btn_dokumen = document.getElementById("btn_dokumen");
    let tanggal = document.getElementById("tanggal");
    let penagihanPajak = document.getElementById("penagihanPajak");
    let nama_customer = document.getElementById("nama_customer");
    let idCustomer = document.getElementById("idCustomer");
    let id_cust = document.getElementById("id_cust");
    let jenisCustomer = document.getElementById("jenisCustomer");
    let alamat = document.getElementById("alamat");
    let IdPenagihan = document.getElementById("IdPenagihan");
    let no_penagihan = document.getElementById("no_penagihan");
    let no_sp = document.getElementById("no_sp");
    let namaMataUang = document.getElementById("namaMataUang");
    let nomorPO = document.getElementById("nomorPO");
    let user_penagih = document.getElementById("user_penagih");
    let idUserPenagih = document.getElementById("idUserPenagih");
    let nama_pajak = document.getElementById("nama_pajak");
    let jenis_pajak = document.getElementById("jenis_pajak");
    let dokumen = document.getElementById("dokumen");
    let idJenisDokumen = document.getElementById("idJenisDokumen");
    let uangMasuk = document.getElementById("uangMasuk");
    let nilaiSblmPPN = document.getElementById("nilaiSblmPPN");
    let nilaiPpn = document.getElementById("nilaiPpn");
    let terbilang = document.getElementById("terbilang");
    let total = document.getElementById("total");
    let Ppn = document.getElementById("Ppn");
    let idMataUang = document.getElementById("idMataUang");
    let nilaiKurs = document.getElementById("nilaiKurs");
    let btn_hapusItemSP = document.getElementById("btn_hapusItemSP");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6, 7], visible: false }],
    });
    let proses;
    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [0, 7], visible: false }],
    });

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

    tanggal.valueAsDate = new Date();
    penagihanPajak.valueAsDate = new Date();
    nilaiKurs.value = 0;
    btn_proses.disabled = true;
    btn_batal.disabled = true;
    btn_customer.disabled = true;
    btn_penagihan.disabled = true;
    btn_noSP.disabled = true;
    btn_userPenagih.disabled = true;
    btn_pajak.disabled = true;
    btn_dokumen.disabled = true;
    btn_isi.focus();
    id_cust.readOnly = true;
    nama_customer.readOnly = true;
    no_penagihan.readOnly = true;
    jenisCustomer.readOnly = true;
    alamat.readOnly = true;
    no_sp.readOnly = true;
    nomorPO.readOnly = true;
    namaMataUang.readOnly = true;
    user_penagih.readOnly = true;
    nama_pajak.readOnly = true;
    dokumen.readOnly = true;
    nilaiSblmPPN.readOnly = true;
    nilaiPpn.readOnly = true;
    terbilang.readOnly = true;

    btn_isi.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_customer.disabled = false;
        btn_penagihan.disabled = true;
        btn_noSP.disabled = false;
        btn_userPenagih.disabled = false;
        btn_pajak.disabled = false;
        btn_dokumen.disabled = false;
        btn_customer.focus();
        proses = 1;
    });

    btn_koreksi.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_customer.disabled = false;
        btn_penagihan.disabled = false;
        btn_noSP.disabled = false;
        btn_userPenagih.disabled = false;
        btn_pajak.disabled = false;
        btn_dokumen.disabled = false;
        btn_customer.focus();
        proses = 2;
    });

    btn_hapus.addEventListener("click", async function (event) {
        event.preventDefault();
        Swal.fire({
            icon: "error",
            // title: "Error!",
            text: "Penagihan tidak boleh dihapus. Jika ada salah pengisian mohon dikoreksi",
            showConfirmButton: true,
        });
        // btn_isi.disabled = true;
        // btn_koreksi.disabled = true;
        // btn_hapus.disabled = true;
        // btn_proses.disabled = false;
        // btn_batal.disabled = false;
        // btn_customer.disabled = false;
        // btn_penagihan.disabled = false;
        // btn_noSP.disabled = false;
        // btn_userPenagih.disabled = false;
        // btn_pajak.disabled = false;
        // btn_dokumen.disabled = false;
        proses = 3;
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_proses.disabled = true;
        const allRowsDataBawah = table_bawah.rows().data().toArray();
        if (proses == 1) {
            $.ajax({
                url: "FakturUangMuka",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    tanggal: tanggal.value,
                    idCustomer: idCustomer.value,
                    nomorPO: nomorPO.value,
                    idJenisDokumen: idJenisDokumen.value,
                    total: total.value,
                    idMataUang: idMataUang.value,
                    terbilang: terbilang.value,
                    idUserPenagih: idUserPenagih.value,
                    penagihanPajak: penagihanPajak.value,
                    nilaiKurs: nilaiKurs.value,
                    jenis_pajak: jenis_pajak.value,
                    Ppn: Ppn.value,
                    no_sp: no_sp.value,
                    allRowsDataBawah: allRowsDataBawah,
                },
                success: function (response) {
                    console.log(response);

                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                        }).then(() => {
                            location.reload();
                            // document
                            //     .querySelectorAll("input")
                            //     .forEach((input) => (input.value = ""));
                            // $("#table_atas").DataTable().ajax.reload();
                            // idReferensi.value = response.IdReferensi;
                            // btn_proses.disabled = true;
                            // btn_batal.disabled = true;
                            // btn_isi.disabled = false;
                            // btn_koreksi.disabled = false;
                            // btn_hapus.disabled = false;
                            // btn_ok.click();
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: "info",
                            title: "Info!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    }
                },
                error: function (xhr) {
                    alert(xhr.responseJSON.message);
                },
            });
        } else if (proses == 2) {
            $.ajax({
                url: "FakturUangMuka",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    no_penagihan: no_penagihan.value,
                    total: total.value,
                    idMataUang: idMataUang.value,
                    terbilang: terbilang.value,
                    idUserPenagih: idUserPenagih.value,
                    nilaiKurs: nilaiKurs.value,
                    jenis_pajak: jenis_pajak.value,
                },
                success: function (response) {
                    console.log(response);

                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                        }).then(() => {
                            location.reload();
                            // document
                            //     .querySelectorAll("input")
                            //     .forEach((input) => (input.value = ""));
                            // $("#table_atas").DataTable().ajax.reload();
                            // idReferensi.value = response.IdReferensi;
                            // btn_proses.disabled = true;
                            // btn_batal.disabled = true;
                            // btn_isi.disabled = false;
                            // btn_koreksi.disabled = false;
                            // btn_hapus.disabled = false;
                            // btn_ok.click();
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: "info",
                            title: "Info!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    }
                },
                error: function (xhr) {
                    alert(xhr.responseJSON.message);
                },
            });
        } else if (proses == 3) {
            // $.ajax({
            //     url: "MaintenanceInformasiBank",
            //     type: "POST",
            //     data: {
            //         _token: csrfToken,
            //         idReferensi: idReferensi.value,
            //         proses: proses,
            //     },
            //     success: function (response) {
            //         console.log(response);
            //         if (response.message) {
            //             Swal.fire({
            //                 icon: "success",
            //                 title: "Success!",
            //                 text: response.message,
            //                 showConfirmButton: true,
            //             }).then(() => {
            //                 // document
            //                 //     .querySelectorAll("input")
            //                 //     .forEach((input) => (input.value = ""));
            //                 // $("#table_atas").DataTable().ajax.reload();
            //                 // idReferensi.value = response.IdReferensi;
            //                 btn_proses.disabled = true;
            //                 btn_batal.disabled = true;
            //                 btn_isi.disabled = false;
            //                 btn_koreksi.disabled = false;
            //                 btn_hapus.disabled = false;
            //                 btn_ok.click();
            //             });
            //         } else if (response.error) {
            //             Swal.fire({
            //                 icon: "info",
            //                 title: "Info!",
            //                 text: response.error,
            //                 showConfirmButton: false,
            //             });
            //         }
            //     },
            //     error: function (xhr) {
            //         alert(xhr.responseJSON.message);
            //     },
            // });
        }
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
    });

    nilaiKurs.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            uangMasuk.focus();
        }
    });

    uangMasuk.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log(idMataUang.value);

            let terbilangS;
            let TTot = 0;
            let TPPN = 0;
            let TNilai_Penagihan = 0;
            let dpp = 0;
            let TIdJnsCust = "PNX";
            let TIdMataUang = 1; // Example, should be dynamically assigned
            let cbPPN = "11 %"; // Example, should be dynamically assigned
            let TKurs = 0; // Example, should be dynamically assigned

            let value = parseFloat(uangMasuk.value.replace(/,/g, "")); // Remove commas and parse number
            uangMasuk.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            if (id_cust.value === "PNX") {
                if (Ppn.value.trim() === "11") {
                    TPPN = value * 0.11;
                    TTot = value;
                } else if (Ppn.value.trim() === "12") {
                    // value = (value * 11) / 12;
                    // TPPN = value * 0.12;
                    // TTot = Math.round(numeral(uangMasuk.value).value() + TPPN);
                    value = Math.round((value / 1.11) * 100) / 100;
                    dpp = Math.round((value * 11) / 12);
                    TPPN = Math.round(dpp * 0.12);
                    TTot = Math.round(numeral(value).value() + TPPN);
                } else {
                    TPPN = value * 0.1;
                    TTot = value;
                }

                TNilai_Penagihan = value;
            } else {
                if (Ppn.value.trim() === "11") {
                    TNilai_Penagihan = Math.round((value / 1.11) * 100) / 100; // Round to 2 decimals
                    TPPN = TNilai_Penagihan * 0.11;
                    TTot = Math.round(TNilai_Penagihan + TPPN);
                } else if (Ppn.value.trim() === "12") {
                    TNilai_Penagihan = Math.round((value / 1.11) * 100) / 100;
                    dpp = Math.round((TNilai_Penagihan * 11) / 12);
                    TPPN = Math.round(dpp * 0.12);
                    TTot = Math.round(numeral(TNilai_Penagihan).value() + TPPN);
                } else {
                    TNilai_Penagihan = Math.round((value / 1.1) * 100) / 100; // Round to 2 decimals
                    TPPN = TNilai_Penagihan * 0.1;
                    TTot = Math.round(TNilai_Penagihan + TPPN);
                }
            }

            if (idMataUang.value == "1") {
                terbilangS = convertNumberToWordsRupiah(TTot);
            } else {
                if (nilaiKurs.value <= 0) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: "ISI DULU NILAI KURSNYA",
                        showConfirmButton: true,
                    }).then(() => {
                        setTimeout(() => {
                            nilaiKurs.focus();
                            nilaiKurs.select();
                        }, 300);
                    });
                } else {
                    terbilangS = convertNumberToWordsDollar(TTot);
                }
            }

            let valueTNilai_Penagihan;
            valueTNilai_Penagihan = parseFloat(TNilai_Penagihan);
            TNilai_Penagihan = valueTNilai_Penagihan.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            let valueTPPN;
            valueTPPN = parseFloat(TPPN);
            TPPN = valueTPPN.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            let valueTTot;
            valueTTot = parseFloat(TTot);
            TTot = valueTTot.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            nilaiSblmPPN.value = TNilai_Penagihan;
            nilaiPpn.value = TPPN;
            total.value = TTot;
            terbilang.value = terbilangS;

            // Output the result to respective fields or handle it further
            // console.log("TNilai_Penagihan:", TNilai_Penagihan);
            // console.log("TPPN:", TPPN);
            // console.log("TTot:", TTot);
            // console.log("terbilangS:", terbilangS);
        }
    });

    btn_dokumen.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Dokumen",
                html: '<table id="DokumenTable" class="display" style="width:100%"><thead><tr><th>Dokumen</th><th>ID. Dokumen</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#DokumenTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#DokumenTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "FakturUangMuka/getDokumen",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_cust: id_cust.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Dokumen",
                                },
                                {
                                    data: "Id_Jenis_Dokumen",
                                },
                            ],
                            order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#DokumenTable_filter input").focus();
                        }, 300);
                        // $("#DokumenTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Dokumen)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#DokumenTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "DokumenTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    dokumen.value = escapeHTML(selectedRow.Nama_Dokumen.trim());
                    idJenisDokumen.value = escapeHTML(
                        selectedRow.Id_Jenis_Dokumen.trim()
                    );
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    setTimeout(() => {
                        uangMasuk.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_pajak.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Jenis Pajak",
                html: '<table id="PajakTable" class="display" style="width:100%"><thead><tr><th>Nama Pajak</th><th>Jenis Pajak</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PajakTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#PajakTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "FakturUangMuka/getPajak",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Jns_PPN",
                                },
                                {
                                    data: "Jns_PPN",
                                },
                            ],
                            order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PajakTable_filter input").focus();
                        }, 300);
                        // $("#PajakTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Pajak)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PajakTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PajakTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_pajak.value = escapeHTML(
                        selectedRow.Nama_Jns_PPN.trim()
                    );
                    jenis_pajak.value = escapeHTML(selectedRow.Jns_PPN.trim());
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    setTimeout(() => {
                        btn_dokumen.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_userPenagih.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Penagih",
                html: '<table id="PenagihTable" class="display" style="width:100%"><thead><tr><th>Penagih</th><th>ID. Penagih</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PenagihTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#PenagihTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "FakturUangMuka/getPenagih",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama",
                                },
                                {
                                    data: "IdUser",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PenagihTable_filter input").focus();
                        }, 300);
                        // $("#PenagihTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Penagih)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PenagihTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PenagihTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    user_penagih.value = escapeHTML(selectedRow.Nama.trim());
                    idUserPenagih.value = escapeHTML(selectedRow.IdUser.trim());
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    setTimeout(() => {
                        btn_pajak.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    let tableData = [];
    btn_noSP.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Surat Pesanan",
                html: '<table id="PesananTable" class="display" style="width:100%"><thead><tr><th>Surat Pesanan</th><th>ID. Pesanan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PesananTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#PesananTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "FakturUangMuka/getPesanan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    IdPenagihan: IdPenagihan.value,
                                    idCustomer: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "IDSuratPesanan",
                                },
                                {
                                    data: "Tgl_Pesan",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PesananTable_filter input").focus();
                        }, 300);
                        // $("#PesananTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Pesanan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PesananTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PesananTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    no_sp.value = escapeHTML(selectedRow.IDSuratPesanan.trim());
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    const newRow = {
                        no_sp: no_sp.value,
                    };

                    tableData.push(newRow);
                    console.log(tableData);

                    if ($.fn.DataTable.isDataTable("#table_bawah")) {
                        var table_bawah = $("#table_bawah").DataTable();

                        table_bawah.row
                            .add([
                                newRow.no_sp,
                            ])
                            .draw();
                    }

                    $.ajax({
                        url: "FakturUangMuka/getPesananDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_sp: no_sp.value,
                        },
                        success: function (data) {
                            console.log(data);
                            namaMataUang.value = data.TMataUang;
                            idMataUang.value = data.TIdMataUang;
                            nomorPO.value = data.TPO;
                            // alamat.value = data.TAlamat;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                    setTimeout(() => {
                        btn_userPenagih.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    $("#table_bawah tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_bawah tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_bawah.row(this).data();
        console.log(data);

        // x_charge.value = data[1];
        // change_amount.value = data[4];
    });

    btn_hapusItemSP.addEventListener("click", async function (event) {
        event.preventDefault();

        // Get the selected row
        const selectedRow = $("#table_bawah tbody tr.selected");

        if (selectedRow.length > 0) {
            // Get DataTable instance
            var table_bawah = $("#table_bawah").DataTable();

            // Get data of the selected row
            var rowData = table_bawah.row(selectedRow).data();

            // Remove the row from DataTable
            table_bawah.row(selectedRow).remove().draw();

            // Remove the row from tableData array
            tableData = tableData.filter((row) => row.no_sp !== rowData[0]);
            console.log(tableData);
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        }
    });

    btn_penagihan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Penagihan",
                html: '<table id="PenagihanTable" class="display" style="width:100%"><thead><tr><th>Nama Penagihan</th><th>ID. Penagihan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PenagihanTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#PenagihanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "FakturUangMuka/getPenagihan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idCustomer: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Tgl_Penagihan",
                                },
                                {
                                    data: "Id_Penagihan",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PenagihanTable_filter input").focus();
                        }, 300);
                        // $("#PenagihanTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Penagihan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PenagihanTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PenagihanTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    no_penagihan.value = escapeHTML(
                        selectedRow.Id_Penagihan.trim()
                    );
                    IdPenagihan.value = escapeHTML(
                        selectedRow.Tgl_Penagihan.trim()
                    );

                    $.ajax({
                        url: "FakturUangMuka/GetPenagihanDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_penagihan: no_penagihan.value,
                        },
                        success: function (data) {
                            console.log(data);
                            tanggal.value = data.Tanggal;
                            no_sp.value = data.TNoSP;
                            namaMataUang.value = data.TMataUang;
                            idMataUang.value = data.TIdMataUang;
                            nomorPO.value = data.TPO;
                            nilaiKurs.value = data.TKurs;
                            penagihanPajak.value = data.TglFakturPajak;
                            user_penagih.value = data.TPenagih;
                            idUserPenagih.value = data.TIdUser;
                            nama_pajak.value = data.TPajak;
                            jenis_pajak.value = data.TJnsPajak;
                            Ppn.value = data.cbPPN;
                            dokumen.value = data.TDokumen;
                            idJenisDokumen.value = data.TIdJnsDok;
                            nilaiSblmPPN.value = data.TNilai_Penagihan;
                            total.value = data.TTot;
                            terbilang.value = data.TTerbilang;
                            nilaiPpn.value = data.TPPN ?? 0;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                    // idCustomer.value = selectedRow.IDCust.trim().slice(-5);
                    // setTimeout(() => {
                    //     btn_kodebarang.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_customer.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>ID. Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#customerTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#customerTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "FakturUangMuka/getCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NAMACUST",
                                },
                                {
                                    data: "IDCust",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#customerTable_filter input").focus();
                        }, 300);
                        // $("#customerTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#customerTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "customerTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_customer.value = escapeHTML(
                        selectedRow.NAMACUST.trim()
                    );
                    id_cust.value = selectedRow.IDCust.trim().substring(0, 3);
                    idCustomer.value = selectedRow.IDCust.trim().slice(-5);

                    $.ajax({
                        url: "FakturUangMuka/getJenisCustomer",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            idCustomer: idCustomer.value,
                        },
                        success: function (data) {
                            console.log(data);
                            jenisCustomer.value = data.TJenisCust;
                            alamat.value = data.TAlamat;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    if (proses == 1) {
                        setTimeout(() => {
                            btn_noSP.focus();
                        }, 300);
                    } else if (proses == 2) {
                        setTimeout(() => {
                            btn_penagihan.focus();
                        }, 300);
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
