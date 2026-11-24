$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let btn_ok = document.getElementById("btn_ok");
    let btn_bank = document.getElementById("btn_bank");
    let btn_mataUang = document.getElementById("btn_mataUang");
    let btn_jenisPembayaran = document.getElementById("btn_jenisPembayaran");
    let tanggal = document.getElementById("tanggal");
    let idReferensi = document.getElementById("idReferensi");
    let nama_bank = document.getElementById("nama_bank");
    let mata_uang = document.getElementById("mata_uang");
    let totalNilai = document.getElementById("totalNilai");
    let keterangan = document.getElementById("keterangan");
    let jenis_pembayaran = document.getElementById("jenis_pembayaran");
    let idJenisPembayaran = document.getElementById("idJenisPembayaran");
    let noBukti = document.getElementById("noBukti");
    let idBank = document.getElementById("idBank");
    let idMataUang = document.getElementById("idMataUang");
    let radio1 = document.getElementById("radio1");
    let radio2 = document.getElementById("radio2");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6, 7], visible: false }],
    });
    let kode = "T";
    let proses;

    tanggal.valueAsDate = new Date();
    btn_proses.disabled = true;
    btn_batal.disabled = true;
    btn_bank.disabled = true;
    btn_mataUang.disabled = true;
    btn_jenisPembayaran.disabled = true;
    nama_bank.readOnly = true;
    mata_uang.readOnly = true;
    jenis_pembayaran.readOnly = true;
    idReferensi.readOnly = true;
    setTimeout(() => {
        btn_ok.click();
        btn_isi.focus();
    }, 300);

    btn_isi.addEventListener("click", async function (event) {
        event.preventDefault();
        nama_bank.value = "";
        idBank.value = "";
        idReferensi.value = "";
        mata_uang.value = "";
        idMataUang.value = "";
        totalNilai.value = 0;
        keterangan.value = "";
        jenis_pembayaran.value = "";
        idJenisPembayaran.value = "";
        noBukti.value = "";
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_bank.disabled = false;
        btn_mataUang.disabled = false;
        btn_jenisPembayaran.disabled = false;
        proses = 1;
        radio1.click();
        btn_bank.focus();
    });

    btn_koreksi.addEventListener("click", async function (event) {
        event.preventDefault();
        nama_bank.value = "";
        idBank.value = "";
        idReferensi.value = "";
        mata_uang.value = "";
        idMataUang.value = "";
        totalNilai.value = 0;
        keterangan.value = "";
        jenis_pembayaran.value = "";
        idJenisPembayaran.value = "";
        noBukti.value = "";
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_bank.disabled = false;
        btn_mataUang.disabled = false;
        btn_jenisPembayaran.disabled = false;
        proses = 2;
        radio1.click();
    });

    btn_hapus.addEventListener("click", async function (event) {
        event.preventDefault();
        nama_bank.value = "";
        idBank.value = "";
        idReferensi.value = "";
        mata_uang.value = "";
        idMataUang.value = "";
        totalNilai.value = 0;
        keterangan.value = "";
        jenis_pembayaran.value = "";
        idJenisPembayaran.value = "";
        noBukti.value = "";
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_bank.disabled = false;
        btn_mataUang.disabled = false;
        btn_jenisPembayaran.disabled = false;
        proses = 3;
        radio1.click();
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        if (proses == 1) {
            $.ajax({
                url: "/Kencana/MaintenanceInformasiBankKencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    tanggal: tanggal.value,
                    idBank: idBank.value,
                    idMataUang: idMataUang.value,
                    totalNilai: totalNilai.value,
                    kode: kode,
                    keterangan: keterangan.value,
                    idJenisPembayaran: idJenisPembayaran.value,
                    noBukti: noBukti.value,
                    proses: proses,
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
                            // document
                            //     .querySelectorAll("input")
                            //     .forEach((input) => (input.value = ""));
                            // $("#table_atas").DataTable().ajax.reload();
                            idReferensi.value = response.IdReferensi;
                            btn_proses.disabled = true;
                            btn_batal.disabled = true;
                            btn_isi.disabled = false;
                            btn_koreksi.disabled = false;
                            btn_hapus.disabled = false;
                            btn_ok.click();
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
                url: "/Kencana/MaintenanceInformasiBankKencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    idReferensi: idReferensi.value,
                    tanggal: tanggal.value,
                    idBank: idBank.value,
                    idMataUang: idMataUang.value,
                    totalNilai: totalNilai.value,
                    kode: kode,
                    keterangan: keterangan.value,
                    idJenisPembayaran: idJenisPembayaran.value,
                    noBukti: noBukti.value,
                    proses: proses,
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
                            // document
                            //     .querySelectorAll("input")
                            //     .forEach((input) => (input.value = ""));
                            // $("#table_atas").DataTable().ajax.reload();
                            // idReferensi.value = response.IdReferensi;
                            btn_proses.disabled = true;
                            btn_batal.disabled = true;
                            btn_isi.disabled = false;
                            btn_koreksi.disabled = false;
                            btn_hapus.disabled = false;
                            btn_ok.click();
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
                url: "/Kencana/MaintenanceInformasiBankKencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    idReferensi: idReferensi.value,
                    proses: proses,
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
                            // document
                            //     .querySelectorAll("input")
                            //     .forEach((input) => (input.value = ""));
                            // $("#table_atas").DataTable().ajax.reload();
                            // idReferensi.value = response.IdReferensi;
                            btn_proses.disabled = true;
                            btn_batal.disabled = true;
                            btn_isi.disabled = false;
                            btn_koreksi.disabled = false;
                            btn_hapus.disabled = false;
                            btn_ok.click();
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

    radio1.addEventListener("click", function (event) {
        kode = "T";
    });

    radio2.addEventListener("click", function (event) {
        kode = "K";
    });

    totalNilai.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(totalNilai.value.replace(/,/g, ""));
            totalNilai.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            setTimeout(() => {
                keterangan.focus();
            }, 300);
        }
    });

    keterangan.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_jenisPembayaran.focus();
        }
    });

    noBukti.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_proses.focus();
        }
    });

    btn_ok.addEventListener("click", async function (event) {
        event.preventDefault();
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            autoWidth: false,
            ajax: {
                url: "/Kencana/MaintenanceInformasiBankKencana/displayData",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tanggal: tanggal.value,
                    });
                },
            },
            columns: [
                {
                    data: "IdReferensi",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckboxM" value="${data}" /> ${data}`;
                    // },
                },
                { data: "Nama_Bank" },
                { data: "Nama_MataUang" },
                { data: "Nilai" },
                { data: "Keterangan" },
                { data: "NamaCust" },
                { data: "Id_Bank" },
                { data: "Id_MataUang" },
                { data: "TypeTransaksi" },
                { data: "Id_Jenis_Bayar" },
                { data: "Jenis_Pembayaran" },
                { data: "No_Bukti" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [3, 4], visible: false }],
        });
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();

        idReferensi.value = data.IdReferensi;
        nama_bank.value = data.Nama_Bank;
        mata_uang.value = data.Nama_MataUang;
        totalNilai.value = data.Nilai;
        keterangan.value = data.Keterangan;
        jenis_pembayaran.value = data.Jenis_Pembayaran;
        noBukti.value = data.No_Bukti;
        idBank.value = data.Id_Bank;
        idMataUang.value = data.Id_MataUang;
        idJenisPembayaran.value = data.Id_Jenis_Bayar;

        if (data.TypeTransaksi == "T") {
            radio1.click();
        } else if (data.TypeTransaksi == "K") {
            radio2.click();
            kode = "K";
        }
    });

    btn_jenisPembayaran.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Jenis Pembayaran",
                html: '<table id="tableJenisPembayaran" class="display" style="width:100%"><thead><tr><th>Jenis Pembayaran</th><th>ID. Pembayaran</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableJenisPembayaran")
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
                        const table = $("#tableJenisPembayaran").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "/Kencana/MaintenanceInformasiBankKencana/getJenisPembayaran",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Jenis_Pembayaran" },
                                { data: "Id_Jenis_Bayar" },
                            ],
                            order: [[1, "asc"]],
                        });
                        setTimeout(() => {
                            $("#tableJenisPembayaran_filter input").focus();
                        }, 300);
                        // $("#tableJenisPembayaran_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#tableJenisPembayaran tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableJenisPembayaran")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    jenis_pembayaran.value = escapeHTML(
                        selectedRow.Jenis_Pembayaran.trim()
                    );
                    idJenisPembayaran.value = escapeHTML(
                        selectedRow.Id_Jenis_Bayar.trim()
                    );
                    setTimeout(() => {
                        noBukti.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_bank.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bank",
                html: '<table id="tableBank" class="display" style="width:100%"><thead><tr><th>Nama Bank</th><th>ID. Bank</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableBank")
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
                        const table = $("#tableBank").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "/Kencana/MaintenanceInformasiBankKencana/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Nama_Bank" },
                                { data: "Id_Bank" },
                            ],
                        });
                        setTimeout(() => {
                            $("#tableBank_filter input").focus();
                        }, 300);
                        // $("#tableBank_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#tableBank tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableBank")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_bank.value = escapeHTML(selectedRow.Nama_Bank.trim());
                    idBank.value = escapeHTML(selectedRow.Id_Bank.trim());
                    setTimeout(() => {
                        btn_mataUang.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_mataUang.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Mata Uang",
                html: '<table id="tableMataUang" class="display" style="width:100%"><thead><tr><th>Nama MataUang</th><th>ID. MataUang</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableMataUang")
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
                        const table = $("#tableMataUang").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "/Kencana/MaintenanceInformasiBankKencana/getMataUang",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Nama_MataUang" },
                                { data: "Id_MataUang" },
                            ],
                            order: [[1, "asc"]],
                        });
                        setTimeout(() => {
                            $("#tableMataUang_filter input").focus();
                        }, 300);
                        // $("#tableMataUang_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#tableMataUang tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableMataUang")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    mata_uang.value = escapeHTML(
                        selectedRow.Nama_MataUang.trim()
                    );
                    idMataUang.value = escapeHTML(
                        selectedRow.Id_MataUang.trim()
                    );
                    setTimeout(() => {
                        totalNilai.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
