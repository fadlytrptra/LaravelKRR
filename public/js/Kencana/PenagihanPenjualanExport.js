$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_batal = document.getElementById("btn_batal");
    let btn_customer = document.getElementById("btn_customer");
    let btn_suratJalan = document.getElementById("btn_suratJalan");
    let btn_lihatItem = document.getElementById("btn_lihatItem");
    let btn_insert = document.getElementById("btn_insert");
    let btn_simpanM = document.getElementById("btn_simpanM");
    let btn_hapusItem = document.getElementById("btn_hapusItem");
    let btn_penagihan = document.getElementById("btn_penagihan");
    let btn_penagih = document.getElementById("btn_penagih");
    let tanggal = document.getElementById("tanggal");
    let tanggalPEB = document.getElementById("tanggalPEB");
    let tanggalBL = document.getElementById("tanggalBL");
    let nama_customer = document.getElementById("nama_customer");
    let idCustomer = document.getElementById("idCustomer");
    let idJenisCustomer = document.getElementById("idJenisCustomer");
    let surat_jalan = document.getElementById("surat_jalan");
    let idPesananM = document.getElementById("idPesananM");
    let totalLihat = document.getElementById("totalLihat");
    let harga_fob = document.getElementById("harga_fob");
    let nilaiDitagihkan = document.getElementById("nilaiDitagihkan");
    let mataUang = document.getElementById("mataUang");
    let idMataUang = document.getElementById("idMataUang");
    let tutup_modal = document.getElementById("tutup_modal");
    let nilaiKurs = document.getElementById("nilaiKurs");
    let dokumen = document.getElementById("dokumen");
    let idJenisDokumen = document.getElementById("idJenisDokumen");
    let user_penagih = document.getElementById("user_penagih");
    let idUserPenagih = document.getElementById("idUserPenagih");
    let no_penagihan = document.getElementById("no_penagihan");
    let terbilang = document.getElementById("terbilang");
    let totalFOB = document.getElementById("totalFOB");
    let noPEB = document.getElementById("noPEB");
    let noBL = document.getElementById("noBL");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [4], visible: false }],
    });
    let table_tampilBKK = $("#table_tampilBKK").DataTable({
        // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
    });
    let table_hapus = $("#table_hapus").DataTable({
        // columnDefs: [{ targets: [4], visible: false }],
    });
    $("#table_hapus_wrapper").hide();
    let proses;

    tanggal.valueAsDate = new Date();
    tanggalPEB.valueAsDate = new Date();
    tanggalBL.valueAsDate = new Date();
    nilaiKurs.value = 0;
    dokumen.value = "Invoice";
    idJenisDokumen.value = "8";
    btn_customer.disabled = true;
    btn_penagihan.disabled = true;
    btn_suratJalan.disabled = true;
    btn_penagih.disabled = true;
    btn_lihatItem.disabled = true;
    btn_hapusItem.disabled = true;
    btn_proses.disabled = true;
    btn_batal.disabled = true;
    nama_customer.readOnly = true;
    no_penagihan.readOnly = true;
    surat_jalan.readOnly = true;
    mataUang.readOnly = true;
    dokumen.readOnly = true;
    user_penagih.readOnly = true;
    terbilang.readOnly = true;
    btn_isi.focus();

    btn_isi.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_customer.disabled = false;
        btn_penagihan.disabled = true;
        btn_penagih.disabled = false;
        btn_suratJalan.disabled = false;
        btn_penagih.disabled = false;
        btn_lihatItem.disabled = false;
        btn_hapusItem.disabled = false;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
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
        btn_customer.disabled = true;
        btn_penagihan.disabled = false;
        btn_penagih.disabled = false;
        btn_suratJalan.disabled = true;
        btn_penagih.disabled = false;
        btn_lihatItem.disabled = false;
        btn_hapusItem.disabled = false;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_penagihan.focus();
        proses = 2;
    });

    btn_hapus.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_customer.disabled = true;
        btn_penagihan.disabled = false;
        btn_penagih.disabled = false;
        btn_suratJalan.disabled = true;
        btn_penagih.disabled = false;
        btn_lihatItem.disabled = false;
        btn_hapusItem.disabled = false;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_penagihan.focus();
        // Swal.fire({
        //     icon: "error",
        //     // title: "Error!",
        //     text: "Penagihan tidak boleh dihapus. Jika ada salah pengisian mohon dikoreksi",
        //     showConfirmButton: true,
        // });
        proses = 3;
    });

    nilaiDitagihkan.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(nilaiDitagihkan.value.replace(/,/g, ""));
            nilaiDitagihkan.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        }
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        const allRowsDataAtas = table_atas.rows().data().toArray();
        const allRowsDataHapus = table_hapus.rows().data().toArray();
        let TTerbilang;

        if (proses == 1) {
            idUserPenagih.required = true;
            idJenisDokumen.required = true;
            nilaiDitagihkan.required = true;
            idMataUang.required = true;

            let nilaiDitagihkanValue = parseFloat(
                nilaiDitagihkan.value.replace(/,/g, "")
            );

            if (idMataUang.value == "1") {
                TTerbilang = convertNumberToWordsRupiah(nilaiDitagihkanValue);
            } else {
                if (nilaiKurs.value <= 0 || nilaiKurs.value == null) {
                    Swal.fire({
                        icon: "info",
                        title: "P E S A N",
                        text: "ISI DULU NILAI KURSNYA",
                    });
                    return;
                }
                TTerbilang = convertNumberToWordsDollar(nilaiDitagihkanValue);
            }

            $.ajax({
                url: "/Kencana/PenagihanPenjualanEksportKencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    allRowsDataAtas: allRowsDataAtas,
                    allRowsDataHapus: allRowsDataHapus,
                    TTerbilang: TTerbilang,
                    tanggal: tanggal.value,
                    idCustomer: idCustomer.value,
                    idJenisDokumen: idJenisDokumen.value,
                    nilaiDitagihkan: nilaiDitagihkan.value,
                    idMataUang: idMataUang.value,
                    idUserPenagih: idUserPenagih.value,
                    nilaiKurs: nilaiKurs.value,
                    noPEB: noPEB.value,
                    tanggalPEB: tanggalPEB.value,
                    noBL: noBL.value,
                    tanggalBL: tanggalBL.value,
                    totalFOB: totalFOB.value,
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
            idUserPenagih.required = true;
            idJenisDokumen.required = true;
            nilaiDitagihkan.required = true;
            idMataUang.required = true;

            let nilaiDitagihkanValue = parseFloat(
                nilaiDitagihkan.value.replace(/,/g, "")
            );

            if (idMataUang.value == "1") {
                TTerbilang = convertNumberToWordsRupiah(nilaiDitagihkanValue);
            } else {
                if (nilaiKurs.value <= 0 || nilaiKurs.value == null) {
                    Swal.fire({
                        icon: "info",
                        title: "P E S A N",
                        text: "ISI DULU NILAI KURSNYA",
                    });
                    return;
                }
                TTerbilang = convertNumberToWordsDollar(nilaiDitagihkanValue);
            }

            $.ajax({
                url: "/Kencana/PenagihanPenjualanEksportKencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    allRowsDataAtas: allRowsDataAtas,
                    allRowsDataHapus: allRowsDataHapus,
                    TTerbilang: TTerbilang,
                    no_penagihan: no_penagihan.value,
                    nilaiDitagihkan: nilaiDitagihkan.value,
                    idUserPenagih: idUserPenagih.value,
                    nilaiKurs: nilaiKurs.value,
                    totalFOB: totalFOB.value,
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
            $.ajax({
                url: "/Kencana/PenagihanPenjualanEksportKencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    no_penagihan: no_penagihan.value,
                    tanggal: tanggal.value,
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
        }
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
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
                                url: "/Kencana/PenagihanPenjualanEksportKencana/getCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaCust",
                                },
                                {
                                    data: "Kode",
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
                        selectedRow.NamaCust.trim()
                    );
                    // id_cust.value = selectedRow.IDCust.trim().substring(0, 3);
                    idCustomer.value = selectedRow.TIdCustomer.trim();
                    idJenisCustomer.value = selectedRow.TIdJnsCust.trim();

                    // console.log(idCustomer.value);
                    // console.log(idJenisCustomer.value);

                    // if (id_cust.value == "NPX") {
                    //     btn_pajak.disabled = true;
                    // } else {
                    //     btn_pajak.disabled = false;
                    // }

                    // $.ajax({
                    //     url: "MaintenanceNotaPenjualanTunai/getJenisCustomer",
                    //     type: "GET",
                    //     data: {
                    //         _token: csrfToken,
                    //         idCustomer: idCustomer.value,
                    //     },
                    //     success: function (data) {
                    //         console.log(data);
                    //         jenisCustomer.value = data.TJenisCust;
                    //         alamat.value = data.TAlamat;
                    //     },
                    //     error: function (xhr, status, error) {
                    //         var err = eval("(" + xhr.responseText + ")");
                    //         alert(err.Message);
                    //     },
                    // });

                    // setTimeout(() => {
                    //     btn_noSP.focus();
                    // }, 300);

                    if (proses == 1) {
                        setTimeout(() => {
                            btn_suratJalan.focus();
                        }, 300);
                    } else if (proses == 2 || proses == 3) {
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

    btn_penagihan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Penagihan",
                html: '<table id="PenagihanTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>ID. Penagihan</th></tr></thead><tbody></tbody></table>',
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
                                url: "/Kencana/PenagihanPenjualanEksportKencana/getPenagihanExport",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaCust",
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
                    nama_customer.value = escapeHTML(
                        selectedRow.NamaCust.trim()
                    );

                    $.ajax({
                        url: "/Kencana/PenagihanPenjualanEksportKencana/getPenagihanDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_penagihan: no_penagihan.value,
                        },
                        success: function (data) {
                            console.log(data);

                            if (data.listSJ && data.listSJ.length > 0) {
                                var table_atas = $("#table_atas").DataTable();

                                table_atas.clear().draw();
                                data.listSJ.forEach(function (item, index) {
                                    console.log(item);
                                    const newRow = {
                                        // Id_Detail:
                                        //     table_atas.rows().count() + 1,
                                        suratJalan: item.Surat_Jalan,
                                        tanggal: item.Tgl_Surat_Jalan,
                                        nilaiPenagihan: item.Total,
                                        nilaiFOB: "",
                                        idDetailPesanan:
                                            item.ID_Detail_Penagihan,
                                    };

                                    table_atas.row
                                        .add([
                                            newRow.suratJalan,
                                            newRow.tanggal,
                                            newRow.nilaiPenagihan,
                                            newRow.nilaiFOB,
                                            newRow.idDetailPesanan,
                                        ])
                                        .draw();
                                });
                            }

                            idCustomer.value = data.penagihanData.Id_Customer;
                            mataUang.value = data.penagihanData.Nama_MataUang;
                            idMataUang.value = data.penagihanData.Id_MataUang;
                            nilaiKurs.value = numeral(
                                data.penagihanData.NilaiKurs
                            ).format("0");
                            dokumen.value = data.penagihanData.Dokumen;
                            idJenisDokumen.value = data.penagihanData.IdJnsDok;
                            user_penagih.value = data.penagihanData.NamaPenagih;
                            idUserPenagih.value = data.penagihanData.IdPenagih;
                            nilaiDitagihkan.value =
                                data.penagihanData.Nilai_Penagihan;
                            terbilang.value = data.penagihanData.Terbilang;
                            tanggal.value = data.penagihanData.Tgl_Penagihan;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    // setTimeout(() => {
                    //     btn_penagih.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_suratJalan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Surat Jalan",
                html: '<table id="suratJalanTable" class="display" style="width:100%"><thead><tr><th>Surat Jalan</th><th>Tanggal</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#suratJalanTable")
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
                        const table = $("#suratJalanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/PenagihanPenjualanEksportKencana/getSuratJalan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idCustomer: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "IDPengiriman",
                                },
                                {
                                    data: "Tanggal",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#suratJalanTable_filter input").focus();
                        }, 300);
                        // $("#suratJalanTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#suratJalanTable tbody").on(
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
                            handleTableKeydownInSwal(e, "suratJalanTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    surat_jalan.value = escapeHTML(
                        selectedRow.IDPengiriman.trim()
                    );

                    $.ajax({
                        url: "/Kencana/PenagihanPenjualanEksportKencana/getMataUang",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            surat_jalan: surat_jalan.value,
                            idCustomer: idCustomer.value,
                        },
                        success: function (data) {
                            console.log(data);
                            idMataUang.value = data.TIdMataUang;
                            mataUang.value = data.TMataUang;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    $.ajax({
                        url: "/Kencana/PenagihanPenjualanEksportKencana/getPengirimanDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            surat_jalan: surat_jalan.value,
                            idCustomer: idCustomer.value,
                        },
                        success: function (data) {
                            console.log(data);

                            if (data.data && data.data.length > 0) {
                                var table_tampilBKK =
                                    $("#table_tampilBKK").DataTable();

                                table_tampilBKK.clear().draw();

                                let totalAmount = 0;
                                let totalFOBAmount = 0;

                                data.data.forEach(function (item, index) {
                                    console.log(item);

                                    // Convert 'item.Total' from format '0.0,00' to a number
                                    let totalValue = parseFloat(
                                        item.Total.replace(/\./g, ".").replace(
                                            ",",
                                            ""
                                        )
                                    );

                                    let totalFOBValue;

                                    if (item.TotalFOB.includes(",")) {
                                        totalFOBValue = parseFloat(
                                            item.TotalFOB.replace(
                                                /\./g,
                                                "."
                                            ).replace(",", "")
                                        );
                                    } else {
                                        totalFOBValue = parseFloat(
                                            item.TotalFOB
                                        );
                                    }

                                    const newRow = {
                                        namaType: item.NamaBarang,
                                        kwantum: item.JmlTerimaUmum,
                                        hargaSatuan: item.HargaSatuan,
                                        satuan: item.Satuan,
                                        total: item.Total,
                                        retur: item.StatusRetur,
                                        totalFOB: item.TotalFOB,
                                        idPesanan: item.IdPesanan,
                                    };

                                    // Add row to the DataTable
                                    table_tampilBKK.row
                                        .add([
                                            newRow.namaType,
                                            newRow.kwantum,
                                            newRow.hargaSatuan,
                                            newRow.satuan,
                                            newRow.total,
                                            newRow.retur,
                                            newRow.totalFOB,
                                            newRow.idPesanan,
                                        ])
                                        .draw();

                                    totalAmount += totalValue;
                                    totalFOBAmount += totalFOBValue;
                                });

                                totalLihat.value =
                                    numeral(totalAmount).format("0,0.00");

                                totalFOB.value = totalFOBAmount;
                            }

                            var myModal = new bootstrap.Modal(
                                document.getElementById("modalLihatItem"),
                                {
                                    keyboard: false,
                                }
                            );
                            myModal.show();

                            setTimeout(() => {
                                btn_simpanM.focus();
                            }, 300);
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    // setTimeout(() => {
                    //     btn_noSP.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    $("#table_tampilBKK tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_tampilBKK tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_tampilBKK.row(this).data();
        console.log(data);

        idPesananM.value = data[7];
        // fakturPajak.value = data.IdFakturPajak;
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);
        // fakturPajak.value = data.IdFakturPajak;
    });

    let tableData = [];

    btn_hapusItem.addEventListener("click", async function (event) {
        event.preventDefault();

        // Get the selected row
        const selectedRow = $("#table_atas tbody tr.selected");

        if (selectedRow.length > 0) {
            // Get DataTable instance
            var table_atas = $("#table_atas").DataTable();
            var table_hapus = $("#table_hapus").DataTable();
            // Get data of the selected row
            var rowData = table_atas.row(selectedRow).data();
            console.log(rowData);

            table_hapus.row.add(rowData).draw();
            // Remove the row from DataTable
            table_atas.row(selectedRow).remove().draw();

            // Remove the row from tableData array using 'suratJalan' as unique identifier
            tableData = tableData.filter(
                (row) => row.suratJalan !== rowData[0]
            );
            console.log(tableData);

            // Recalculate the total amount for 'nilaiDitagihkan'
            let totalAmount = tableData.reduce((sum, row) => {
                // Convert 'nilaiPenagihan' (item.Total) to a number format for calculation
                let totalValue = parseFloat(
                    row.nilaiPenagihan.replace(/\./g, ".").replace(",", "")
                );
                return sum + totalValue;
            }, 0);

            // Update the total 'nilaiDitagihkan' input value
            nilaiDitagihkan.value = numeral(totalAmount).format("0,0.00");
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        }
    });

    btn_insert.addEventListener("click", async function (event) {
        event.preventDefault();
        const selectedRow = $("#table_tampilBKK tbody tr.selected");
        const selectedRowAtas = $("#table_atas tbody tr.selected");

        if (selectedRow.length > 0) {
            // Get DataTable instance
            var table_tampilBKK = $("#table_tampilBKK").DataTable();

            // Get the index of the selected row (assuming selectedRow is a DOM element)
            var rowIndex = table_tampilBKK.row(selectedRow).index();

            if (rowIndex !== undefined) {
                // Get data of the selected row
                var rowData = table_tampilBKK.row(rowIndex).data();
                console.log(rowData);

                $.ajax({
                    url: "/Kencana/PenagihanPenjualanEksportKencana/insFOB",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        idPesananM: idPesananM.value,
                        harga_fob: harga_fob.value,
                    },
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    },
                });

                // Update the desired column with new value
                rowData[6] = harga_fob.value;

                // Update row data and redraw the table
                table_tampilBKK.row(rowIndex).data(rowData).draw();
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        }

        if (selectedRowAtas.length > 0) {
            // Get DataTable instance
            var table_atas = $("#table_atas").DataTable();

            // Get data of the selected row
            var rowData = table_atas.row(selectedRowAtas).data();
            console.log(rowData);

            $.ajax({
                url: "/Kencana/PenagihanPenjualanEksportKencana/getPengirimanDetails",
                type: "GET",
                data: {
                    _token: csrfToken,
                    surat_jalan: rowData[0],
                    idCustomer: idCustomer.value,
                },
                success: function (data) {
                    console.log(data);

                    if (data.data && data.data.length > 0) {
                        // var table_tampilBKK = $("#table_tampilBKK").DataTable();

                        // table_tampilBKK.clear().draw();

                        let totalAmount = 0;
                        let totalFOBAmount = 0;

                        data.data.forEach(function (item, index) {
                            console.log(item);

                            // Convert 'item.Total' from format '0.0,00' to a number
                            let totalValue = parseFloat(
                                item.Total.replace(/\./g, ".").replace(",", "")
                            );

                            let totalFOBValue;

                            if (item.TotalFOB.includes(",")) {
                                totalFOBValue = parseFloat(
                                    item.TotalFOB.replace(/\./g, ".").replace(
                                        ",",
                                        ""
                                    )
                                );
                            } else {
                                totalFOBValue = parseFloat(item.TotalFOB);
                            }

                            // const newRow = {
                            //     namaType: item.NamaBarang,
                            //     kwantum: item.JmlTerimaUmum,
                            //     hargaSatuan: item.HargaSatuan,
                            //     satuan: item.Satuan,
                            //     total: item.Total,
                            //     retur: item.StatusRetur,
                            //     totalFOB: item.TotalFOB,
                            //     idPesanan: item.IdPesanan,
                            // };

                            // Add row to the DataTable
                            // table_tampilBKK.row
                            //     .add([
                            //         newRow.namaType,
                            //         newRow.kwantum,
                            //         newRow.hargaSatuan,
                            //         newRow.satuan,
                            //         newRow.total,
                            //         newRow.retur,
                            //         newRow.totalFOB,
                            //         newRow.idPesanan,
                            //     ])
                            //     .draw();

                            totalAmount += totalValue;
                            totalFOBAmount += totalFOBValue;
                        });

                        totalLihat.value =
                            numeral(totalAmount).format("0,0.00");

                        totalFOB.value = totalFOBAmount;
                    }

                    // var myModal = new bootstrap.Modal(
                    //     document.getElementById("modalLihatItem"),
                    //     {
                    //         keyboard: false,
                    //     }
                    // );
                    // myModal.show();

                    console.log(totalFOB.value);

                    setTimeout(() => {
                        btn_simpanM.focus();
                    }, 300);
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                },
            });
        }
    });

    btn_simpanM.addEventListener("click", async function (event) {
        event.preventDefault();
        var table_tampilBKK = $("#table_tampilBKK").DataTable();
        var ListItems = [];

        // Loop melalui setiap baris dari DataTable
        table_tampilBKK.rows().every(function (rowIdx, tableLoop, rowLoop) {
            var data = this.data();
            ListItems.push({
                namaType: data[0], // Nama Barang
                kwantum: data[1], // JmlTerimaUmum
                hargaSatuan: data[2], // HargaSatuan
                satuan: data[3], // Satuan
                total: data[4], // Total
                retur: data[5], // StatusRetur
                totalFOB: data[6], // TotalFOB
                idPesanan: data[7], // IdPesanan
            });
        });

        $.ajax({
            url: "/Kencana/PenagihanPenjualanEksportKencana/insSimpan",
            type: "GET",
            data: {
                _token: csrfToken,
                surat_jalan: surat_jalan.value,
                idCustomer: idCustomer.value,
                ListItems: ListItems,
            },
            success: function (data) {
                console.log(data);

                if (data.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: data.error,
                        showConfirmButton: false,
                    });
                } else {
                    if (data.data && data.data.length > 0) {
                        var table_atas = $("#table_atas").DataTable();

                        // table_atas.clear().draw();

                        let totalAmount = 0;
                        // console.log(data.data);

                        data.data.forEach(function (item, index) {
                            console.log(item);

                            let totalValue = numeral(item.Total).format(
                                "0,0.00"
                            );
                            const newRow = {
                                suratJalan: item.SuratJalan,
                                tanggal: item.TanggalSJ,
                                nilaiPenagihan: item.Total,
                                nilaiFOB: item.TotalFOB,
                                idDetailPesanan: "",
                            };

                            // Add row to the DataTable
                            table_atas.row
                                .add([
                                    newRow.suratJalan,
                                    newRow.tanggal,
                                    newRow.nilaiPenagihan,
                                    newRow.nilaiFOB,
                                    newRow.idDetailPesanan,
                                ])
                                .draw();

                            totalAmount += totalValue;
                        });
                        // console.log(totalAmount);

                        const totalPelunasan = table_atas
                            .rows()
                            .data()
                            .toArray()
                            .reduce((sum, row) => {
                                let jumlahUang = row[2].replace(/,/g, "");
                                return sum + parseInt(jumlahUang);
                            }, 0);
                        console.log(totalPelunasan);

                        // nilaiDitagihkan.value = totalPelunasan.toLocaleString(
                        //     "en-US",
                        //     {
                        //         minimumFractionDigits: 2,
                        //         maximumFractionDigits: 2,
                        //     }
                        // );

                        nilaiDitagihkan.value =
                            numeral(totalAmount).format("0,0.00");
                    }
                    tutup_modal.click();
                    setTimeout(() => {
                        nilaiKurs.focus();
                        nilaiKurs.select();
                    }, 300);
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_lihatItem.addEventListener("click", async function (event) {
        event.preventDefault();
        console.log(idCustomer.value);

        const selectedRow = $("#table_atas tbody tr.selected");

        if (selectedRow.length > 0) {
            // Get DataTable instance
            var table_atas = $("#table_atas").DataTable();

            // Get data of the selected row
            var rowData = table_atas.row(selectedRow).data();
            console.log(rowData);

            $.ajax({
                url: "/Kencana/PenagihanPenjualanEksportKencana/getPengirimanDetails",
                type: "GET",
                data: {
                    _token: csrfToken,
                    surat_jalan: rowData[0],
                    idCustomer: idCustomer.value,
                },
                success: function (data) {
                    console.log(data);

                    if (data.data && data.data.length > 0) {
                        var table_tampilBKK = $("#table_tampilBKK").DataTable();

                        table_tampilBKK.clear().draw();

                        let totalAmount = 0; // Initialize total for all items
                        let totalFOBAmount = 0;

                        data.data.forEach(function (item, index) {
                            console.log(item);

                            // Convert 'item.Total' from format '0.0,00' to a number
                            let totalValue = parseFloat(
                                item.Total.replace(/\./g, ".").replace(",", "")
                            );

                            let totalFOBValue;

                            if (item.TotalFOB.includes(",")) {
                                totalFOBValue = parseFloat(
                                    item.TotalFOB.replace(/\./g, ".").replace(
                                        ",",
                                        ""
                                    )
                                );
                            } else {
                                totalFOBValue = parseFloat(item.TotalFOB);
                            }

                            const newRow = {
                                namaType: item.NamaBarang,
                                kwantum: item.JmlTerimaUmum,
                                hargaSatuan: item.HargaSatuan,
                                satuan: item.Satuan,
                                total: item.Total,
                                retur: item.StatusRetur,
                                totalFOB: item.TotalFOB,
                                idPesanan: item.IdPesanan,
                            };

                            // Add row to the DataTable
                            table_tampilBKK.row
                                .add([
                                    newRow.namaType,
                                    newRow.kwantum,
                                    newRow.hargaSatuan,
                                    newRow.satuan,
                                    newRow.total,
                                    newRow.retur,
                                    newRow.totalFOB,
                                    newRow.idPesanan,
                                ])
                                .draw();

                            totalAmount += totalValue;
                            totalFOBAmount += totalFOBValue;
                        });

                        totalLihat.value =
                            numeral(totalAmount).format("0,0.00");

                        totalFOB.value = totalFOBAmount;
                    }

                    var myModal = new bootstrap.Modal(
                        document.getElementById("modalLihatItem"),
                        {
                            keyboard: false,
                        }
                    );
                    myModal.show();
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                },
            });
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        }
    });

    btn_penagih.addEventListener("click", async function (event) {
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
                                url: "/Kencana/PenagihanPenjualanEksportKencana/getPenagih",
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
                    // setTimeout(() => {
                    //     btn_dokumen.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
