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
    let btn_notaKredit = document.getElementById("btn_notaKredit");
    let btn_suratJalan = document.getElementById("btn_suratJalan");
    let btn_tambahItem = document.getElementById("btn_tambahItem");
    let btn_hapusItem = document.getElementById("btn_hapusItem");
    let tanggalInput = document.getElementById("tanggalInput");
    let nama_customer = document.getElementById("nama_customer");
    let idCustomer = document.getElementById("idCustomer");
    let idJenisCustomer = document.getElementById("idJenisCustomer");
    let no_notaKredit = document.getElementById("no_notaKredit");
    let surat_jalan = document.getElementById("surat_jalan");
    let namaBarang = document.getElementById("namaBarang");
    let idbarang = document.getElementById("idbarang");
    let MIdRetur = document.getElementById("MIdRetur");
    let no_penagihan = document.getElementById("no_penagihan");
    let mataUang = document.getElementById("mataUang");
    let idMataUang = document.getElementById("idMataUang");
    let nilaiKurs = document.getElementById("nilaiKurs");
    let jumlahRetur = document.getElementById("jumlahRetur");
    let satuan = document.getElementById("satuan");
    let harga = document.getElementById("harga");
    let total = document.getElementById("total");
    let discount = document.getElementById("discount");
    let statusPelunasan = document.getElementById("statusPelunasan");
    let grandTotalRetur = document.getElementById("grandTotalRetur");
    let terbilang = document.getElementById("terbilang");
    let statusPPN = document.getElementById("statusPPN");
    let jenisPPN = document.getElementById("jenisPPN");
    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [4], visible: false }],
    });
    let table_hapus = $("#table_hapus").DataTable({
        // columnDefs: [{ targets: [4], visible: false }],
    });
    let proses;

    tanggalInput.valueAsDate = new Date();
    grandTotalRetur.style.fontWeight = "bold";
    nama_customer.readOnly = true;
    no_notaKredit.readOnly = true;
    surat_jalan.readOnly = true;
    namaBarang.readOnly = true;
    no_penagihan.readOnly = true;
    mataUang.readOnly = true;
    nilaiKurs.readOnly = true;
    jumlahRetur.readOnly = true;
    satuan.readOnly = true;
    harga.readOnly = true;
    total.readOnly = true;
    discount.readOnly = true;
    statusPelunasan.readOnly = true;
    grandTotalRetur.readOnly = true;
    terbilang.readOnly = true;
    btn_customer.disabled = true;
    btn_notaKredit.disabled = true;
    btn_suratJalan.disabled = true;
    btn_tambahItem.disabled = true;
    btn_hapusItem.disabled = true;
    btn_proses.disabled = true;
    btn_batal.disabled = true;
    btn_isi.focus();

    btn_isi.addEventListener("click", async function (event) {
        event.preventDefault();
        document.querySelectorAll("input").forEach((input) => {
            if (input !== tanggalInput) {
                input.value = "";
            }
        });
        document.getElementById("lblStatusPelunasan").textContent = "";
        table_bawah.clear().draw();
        table_hapus.clear().draw();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_customer.disabled = false;
        btn_notaKredit.disabled = true;
        btn_suratJalan.disabled = false;
        btn_tambahItem.disabled = false;
        btn_hapusItem.disabled = false;
        btn_customer.focus();
        proses = 1;
    });

    btn_koreksi.addEventListener("click", async function (event) {
        event.preventDefault();
        document.querySelectorAll("input").forEach((input) => {
            if (input !== tanggalInput) {
                input.value = "";
            }
        });
        document.getElementById("lblStatusPelunasan").textContent = "";
        table_bawah.clear().draw();
        table_hapus.clear().draw();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_customer.disabled = true;
        btn_notaKredit.disabled = false;
        btn_suratJalan.disabled = false;
        btn_tambahItem.disabled = false;
        btn_hapusItem.disabled = false;
        btn_notaKredit.focus();
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
        btn_notaKredit.disabled = false;
        btn_suratJalan.disabled = false;
        btn_tambahItem.disabled = false;
        btn_hapusItem.disabled = false;
        btn_notaKredit.focus();
        // Swal.fire({
        //     icon: "error",
        //     // title: "Error!",
        //     text: "Penagihan tidak boleh dihapus. Jika ada salah pengisian mohon dikoreksi",
        //     showConfirmButton: true,
        // });
        proses = 3;
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        const allRowsDataBawah = table_bawah.rows().data().toArray();
        const allRowsDataHapus = table_hapus.rows().data().toArray();

        let grandTotal = parseFloat(grandTotalRetur.value);
        // console.log(grandTotal);

        if (statusPPN.value == "Y") {
            grandTotal *= 1.1;
        }

        let TTerbilang;
        if (mataUang.value.trim().toUpperCase() == "RUPIAH") {
            TTerbilang = convertNumberToWordsRupiah(grandTotal);
        } else {
            TTerbilang = convertNumberToWordsDollar(grandTotal);
        }

        if (
            statusPPN.value == "Y" &&
            ["1", "2", "5"].includes(jenisPPN.value)
        ) {
            grandTotal /= 1.1;
        }

        if (proses == 1) {
            $.ajax({
                url: "/Kencana/NotaKreditReturKCN",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    grandTotal: grandTotal,
                    TTerbilang: TTerbilang,
                    tanggalInput: tanggalInput.value,
                    idMataUang: idMataUang.value,
                    statusPPN: statusPPN.value,
                    no_penagihan: no_penagihan.value,
                    statusPelunasan: statusPelunasan.value,
                    no_notaKredit: no_notaKredit.value,
                    allRowsDataBawah: allRowsDataBawah,
                    allRowsDataHapus: allRowsDataHapus,
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
                            grandTotalRetur.value = grandTotal;
                            terbilang.value = TTerbilang;
                            btn_isi.disabled = false;
                            btn_koreksi.disabled = false;
                            btn_hapus.disabled = false;
                            btn_proses.disabled = true;
                            btn_batal.disabled = true;
                            // location.reload();
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
            $.ajax({
                url: "/Kencana/NotaKreditReturKCN",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    grandTotal: grandTotal,
                    TTerbilang: TTerbilang,
                    tanggalInput: tanggalInput.value,
                    no_notaKredit: no_notaKredit.value,
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
                            grandTotalRetur.value = grandTotal;
                            terbilang.value = TTerbilang;
                            btn_isi.disabled = false;
                            btn_koreksi.disabled = false;
                            btn_hapus.disabled = false;
                            btn_proses.disabled = true;
                            btn_batal.disabled = true;
                            // location.reload();
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
                url: "/Kencana/NotaKreditReturKCN",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    no_notaKredit: no_notaKredit.value,
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

    btn_notaKredit.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Nota Kredit",
                html: '<table id="notaKreditTable" class="display" style="width:100%"><thead><tr><th>ID. Nota Kredit</th><th>Nama Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#notaKreditTable")
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
                        const table = $("#notaKreditTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/NotaKreditReturKCN/getNotaKredit",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_NotaKredit",
                                },
                                {
                                    data: "NamaCust",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#notaKreditTable_filter input").focus();
                        }, 300);
                        // $("#notaKreditTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#notaKreditTable tbody").on(
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
                            handleTableKeydownInSwal(e, "notaKreditTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    no_notaKredit.value = escapeHTML(
                        selectedRow.Id_NotaKredit.trim()
                    );

                    nama_customer.value = selectedRow.NamaCust.trim();
                    idCustomer.value = selectedRow.NamaCust.trim().slice(-5);

                    $.ajax({
                        url: "/Kencana/NotaKreditReturKCN/getNotaKreditDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_notaKredit: no_notaKredit.value,
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
                                var table_bawah = $("#table_bawah").DataTable();

                                table_bawah.clear().draw();
                                data.data.forEach(function (item, index) {
                                    console.log(item);
                                    const newRow = {
                                        customer: item.NamaCust,
                                        suratJalan: item.IDPengiriman,
                                        namaBarang: item.NamaBarang,
                                        noPenagihan: item.IdPenagihan,
                                        totalRetur: item.Stotal,
                                        idRetur: item.IdRetur,
                                    };

                                    table_bawah.row
                                        .add([
                                            newRow.customer,
                                            newRow.suratJalan,
                                            newRow.namaBarang,
                                            newRow.noPenagihan,
                                            newRow.totalRetur,
                                            newRow.idRetur,
                                        ])
                                        .draw();
                                });
                                let grandTotal = 0;

                                table_bawah
                                    .rows()
                                    .every(function (
                                        rowIdx,
                                        tableLoop,
                                        rowLoop
                                    ) {
                                        let data = this.data();
                                        grandTotal += parseFloat(data[4]) || 0;
                                    });

                                grandTotalRetur.value = grandTotal;
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    setTimeout(() => {
                        btn_suratJalan.focus();
                    }, 300);

                    // if (proses == 1) {
                    //     setTimeout(() => {
                    //         btn_suratJalan.focus();
                    //     }, 300);
                    // } else if (proses == 2 || proses == 3) {
                    //     setTimeout(() => {
                    //         btn_penagihan.focus();
                    //     }, 300);
                    // }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_tambahItem.addEventListener("click", async function (event) {
        event.preventDefault();
        var table_bawah = $("#table_bawah").DataTable();
        var isSuratJalanExist = false;

        const newRow = {
            customer: nama_customer.value,
            suratJalan: surat_jalan.value,
            namaBarang: namaBarang.value,
            noPenagihan: no_penagihan.value,
            totalRetur: total.value,
            idRetur: MIdRetur.value,
        };

        table_bawah.rows().every(function (rowIdx, tableLoop, rowLoop) {
            let data = this.data();
            if (data[1] === newRow.suratJalan) {
                isSuratJalanExist = true;
            }
        });

        if (isSuratJalanExist) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Data Sudah Diinputkan",
                confirmButtonText: "OK",
            });
        } else {
            table_bawah.row
                .add([
                    newRow.customer,
                    newRow.suratJalan,
                    newRow.namaBarang,
                    newRow.noPenagihan,
                    newRow.totalRetur,
                    newRow.idRetur,
                ])
                .draw();

            let grandTotal = 0;

            table_bawah.rows().every(function (rowIdx, tableLoop, rowLoop) {
                let data = this.data();
                grandTotal += parseFloat(data[4]) || 0;
            });

            grandTotalRetur.value = grandTotal;
        }
    });

    let tableData = [];

    btn_hapusItem.addEventListener("click", async function (event) {
        event.preventDefault();

        // Get the selected row
        const selectedRow = $("#table_bawah tbody tr.selected");

        if (selectedRow.length > 0) {
            // Get DataTable instance
            var table_bawah = $("#table_bawah").DataTable();
            var table_hapus = $("#table_hapus").DataTable();

            // Get data of the selected row
            var rowData = table_bawah.row(selectedRow).data();
            console.log(rowData);

            // Add the row to table_hapus
            table_hapus.row.add(rowData).draw();

            // Remove the row from DataTable
            table_bawah.row(selectedRow).remove().draw();

            // Calculate grandTotalRetur
            var totalAmount = 0;

            // Loop through all rows in table_bawah
            table_bawah.rows().every(function () {
                var data = this.data(); // Get the row data
                totalAmount += parseFloat(data[4]) || 0; // Add value from column 4
            });

            // Set the grandTotalRetur value
            grandTotalRetur.value = totalAmount;
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        }
    });

    $("#table_bawah tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_bawah tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_bawah.row(this).data();
        console.log(data);
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
                                url: "/Kencana/NotaKreditReturKCN/getCustomer",
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
                        selectedRow.NamaCust.trim()
                    );
                    idJenisCustomer.value = selectedRow.IDCust.trim().substring(
                        0,
                        3
                    );
                    idCustomer.value = selectedRow.IDCust.trim().slice(-5);

                    setTimeout(() => {
                        btn_suratJalan.focus();
                    }, 300);

                    // if (proses == 1) {
                    //     setTimeout(() => {
                    //         btn_suratJalan.focus();
                    //     }, 300);
                    // } else if (proses == 2 || proses == 3) {
                    //     setTimeout(() => {
                    //         btn_penagihan.focus();
                    //     }, 300);
                    // }
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
                html: '<table id="suratJalanTable" class="display" style="width:100%"><thead><tr><th>ID. Pengiriman</th><th>Nama Barang</th></tr></thead><tbody></tbody></table>',
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
                                url: "/Kencana/NotaKreditReturKCN/getSuratJalan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idCustomer: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "SuratJalan",
                                },
                                {
                                    data: "TBarang",
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
                        selectedRow.TSuratJalan.trim()
                    );

                    namaBarang.value = escapeHTML(selectedRow.TBarang.trim());
                    idbarang.value = escapeHTML(selectedRow.TIdBarang.trim());

                    MIdRetur.value = selectedRow.MIdRetur;

                    $.ajax({
                        url: "/Kencana/NotaKreditReturKCN/getPenagihan",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            idCustomer: idCustomer.value,
                            MIdRetur: MIdRetur.value,
                        },
                        success: function (data) {
                            console.log(data);
                            no_penagihan.value = data.data[0].TIdPenagihan;
                            mataUang.value = data.data[0].TMataUang;
                            idMataUang.value = data.data[0].TIdMataUang;
                            nilaiKurs.value = numeral(
                                data.data[0].TKurs
                            ).format("0");
                            jumlahRetur.value = numeral(
                                data.data[0].TJmlRetur
                            ).format("0");
                            satuan.value = data.data[0].TSatuan.trim();
                            harga.value = numeral(data.data[0].THarga).format(
                                "0.00"
                            );
                            total.value = data.data[0].TTotal;
                            discount.value = data.data[0].TDiscount;
                            statusPelunasan.value = data.data[0].TStatus_Lunas;
                            statusPPN.value = data.data[0].TStatus_PPN;
                            jenisPPN.value = data.data[0].TJns_PPN;

                            if (statusPelunasan.value == "Lunas") {
                                document.getElementById(
                                    "lblStatusPelunasan"
                                ).textContent = "Harap Dibuatkan BKK";
                            } else {
                                document.getElementById(
                                    "lblStatusPelunasan"
                                ).textContent = "";
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    setTimeout(() => {
                        btn_tambahItem.focus();
                    }, 300);

                    // if (proses == 1) {
                    //     setTimeout(() => {
                    //         btn_suratJalan.focus();
                    //     }, 300);
                    // } else if (proses == 2 || proses == 3) {
                    //     setTimeout(() => {
                    //         btn_penagihan.focus();
                    //     }, 300);
                    // }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
