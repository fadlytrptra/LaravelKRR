$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let table = $("#tablepengajuanbkk").DataTable();
    let supplier1 = document.getElementById("supplier1");
    let supplier2 = document.getElementById("supplier2");
    let radiogrup_penagihan = document.getElementById("radiogrup_penagihan");
    let radiogrup_nopenagihan = document.getElementById("radiogrup_nopenagihan"); //prettier-ignore
    let radiogrup_adadp = document.getElementById("radiogrup_adadp");
    let radiogrup_tidakdp = document.getElementById("radiogrup_tidakdp");
    let btn_bkkuangmuka = document.getElementById("btn_bkkuangmuka");
    let btn_supplier = document.getElementById("btn_supplier");
    let label_pajak = document.getElementById("label_pajak");
    let pajak = document.getElementById("pajak");
    let rincian = document.getElementById("rincian");
    let mata_uang = document.getElementById("mata_uang");
    let mata_uang_kanan = document.getElementById("mata_uang_kanan");
    let nilai_pembayaran_kanan = document.getElementById("nilai_pembayaran_kanan"); //prettier-ignore
    let nilai_pembayaran = document.getElementById("nilai_pembayaran");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let id_pembayaran = document.getElementById("id_pembayaran");
    let btn_bank = document.getElementById("btn_bank");
    let btn_jenispembayaran = document.getElementById("btn_jenispembayaran");
    let btn_matauang = document.getElementById("btn_matauang");
    let kode_perkiraanNomor = document.getElementById("kode_perkiraanNomor");
    let kode_perkiraanNama = document.getElementById("kode_perkiraanNama");
    let btn_kodePerkiraan = document.getElementById("btn_kodePerkiraan");
    let id_bank = document.getElementById("id_bank");
    let kurs = document.getElementById("kurs");
    let jns_pembayaran = document.getElementById("jns_pembayaran");
    let id_jnsbayar = document.getElementById("id_jnsbayar");
    let jumlah_bayar = document.getElementById("jumlah_bayar");
    let nilai_pembayaran2 = document.getElementById("nilai_pembayaran2");
    let belum_dibayar = document.getElementById("belum_dibayar");
    let saldo = document.getElementById("saldo");
    let rincian_dp = document.getElementById("rincian_dp");
    let bkk_uangmuka = document.getElementById("bkk_uangmuka");
    let id_bkk = document.getElementById("id_bkk");
    let id_bayardp = document.getElementById("id_bayardp");
    let ada_bkm = document.getElementById("ada_bkm");
    let bkm = document.getElementById("bkm");
    let rincian_bkk = document.getElementById("rincian_bkk");
    let rowDataPertama;
    let rowData;
    let proses;
    let BKM_Pot;
    let TT;
    let TdkDP;
    let AdaDP;
    let bayar;
    let dp;
    let pjk;

    document.getElementById("nilai_pembayaran").style.color = "green";
    document.getElementById("nilai_pembayaran").style.fontWeight = "bold";
    id_jnsbayar.style.visibility = "hidden";
    mata_uang_kanan.style.visibility = "hidden";
    nilai_pembayaran_kanan.style.visibility = "hidden";
    ada_bkm.style.visibility = "hidden";
    bkm.style.visibility = "hidden";
    btn_bkkuangmuka.disabled = true;
    radiogrup_adadp.disabled = true;
    radiogrup_tidakdp.disabled = true;
    btn_proses.disabled = true;
    kurs.value = 1;
    jumlah_bayar.value = 0;
    nilai_pembayaran2.value = 0;
    belum_dibayar.value = 0;
    saldo.value = 0;
    btn_isi.disabled = true;

    let tablekedua = $("#tablebkkpenagihan").DataTable({
        paging: false,
        scrollY: "300px",
        scrollCollapse: true,
    });
    $("#tablebkkpenagihan").parents("div.dataTables_wrapper").first().hide();

    nilai_pembayaran.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(nilai_pembayaran.value.replace(/,/g, ""));
            nilai_pembayaran.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            btn_proses.focus();
        }
    });

    jumlah_bayar.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            // if (!TT) {
            btn_matauang.focus();
            // } else {
            //     nilai_pembayaran.focus();
            // }
        }
    });

    rincian.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_bank.focus();
        }
    });

    radiogrup_adadp.addEventListener("click", async function (event) {
        AdaDP = true;
        TdkDP = false;
        dp = true;
        Swal.fire({
            title: "Confirmation",
            text: "BKK Uang Muka (Yes) atau BKM Potongan (No)",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            console.log(result);
            btn_bkkuangmuka.disabled = !result.isConfirmed;
            if (!result.isConfirmed) {
                BKM_Pot = true;
                setTimeout(() => {
                    btn_bkkuangmuka.focus();
                }, 300);
            } else {
                BKM_Pot = false;
                setTimeout(() => {
                    btn_bkkuangmuka.focus();
                }, 300);
            }
            console.log(BKM_Pot);
        });
    });

    radiogrup_tidakdp.addEventListener("click", function (event) {
        AdaDP = false;
        TdkDP = true;
        bayar = true;
        btn_bank.focus();
    });

    radiogrup_penagihan.addEventListener("click", function (event) {
        btn_supplier.focus();
        btn_isi.disabled = false;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = false;
        TT = true;
        $("#tablebkkpertama").parents("div.dataTables_wrapper").first().hide();
        if (supplier1.value !== "" || supplier1.value !== null) {
            tablekedua = $("#tablebkkpenagihan").DataTable({
                responsive: true,
                processing: true,
                serverSide: true,
                destroy: true,
                ajax: {
                    url: "/Kencana/MaintenancePengajuanBKKKencana/getTT",
                    dataType: "json",
                    type: "GET",
                    data: function (d) {
                        return $.extend({}, d, {
                            _token: csrfToken,
                            supplier1: supplier1.value,
                        });
                    },
                },
                columns: [
                    {
                        data: "Waktu_Penagihan",
                        render: function (data, type, row) {
                            return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                        },
                    },
                    { data: "Id_Penagihan" },
                    { data: "Status_PPN" },
                    { data: "UangTT" },
                    { data: "Nilai_Penagihan" },
                    { data: "Lunas" },
                    { data: "IdUangTT" },
                    { data: "Id_Pembayaran" },
                    { data: "KursBayar" },
                    // { data: "TT_NoLunas" },
                    // { data: "isRed" },
                ],
                columnDefs: [{ targets: [6, 7, 8], visible: false }],
                paging: false,
                scrollY: "300px",
                scrollCollapse: true,
            });
        } else {
            $("#tablebkkpenagihan")
                .parents("div.dataTables_wrapper")
                .first()
                .show();
        }

        Swal.fire({
            icon: "info",
            title: "Info!",
            text: "Menampilkan data penagihan!",
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
            } else {
            }
        });
        label_pajak.style.visibility = "visible";
        pajak.style.visibility = "visible";
    });

    radiogrup_nopenagihan.addEventListener("click", function (event) {
        btn_isi.disabled = false;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = false;
        TT = false;
        $("#tablebkkpertama").parents("div.dataTables_wrapper").first().hide();
        $("#tablebkkpenagihan")
            .parents("div.dataTables_wrapper")
            .first()
            .hide();
        label_pajak.style.visibility = "hidden";
        pajak.style.visibility = "hidden";
        btn_isi.focus();
        document.querySelector('label[for="radiogrup_adadp"]').innerHTML =
            "&nbsp;DP&nbsp;&nbsp;";
        document.querySelector('label[for="radiogrup_tidakdp"]').innerHTML =
            "&nbsp;Pembayaran&nbsp;&nbsp;";
        document.querySelector('label[for="penagihan"]').innerHTML =
            "NO PENAGIHAN&nbsp;&nbsp;";
    });

    let tablepertama = $("#tablebkkpertama").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/Kencana/MaintenancePengajuanBKKKencana/getPengajuan",
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
                data: "Id_Pembayaran",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "Id_Bank" },
            { data: "Rincian_Bayar" },
            { data: "Nilai_Pembayaran" },
            { data: "Jenis_Pembayaran" },
            { data: "Nama_MataUang" },
            { data: "Jml_JenisBayar" },
        ],
        paging: false,
        scrollY: "300px",
        scrollCollapse: true,
    });

    $("#tablebkkpertama tbody").off("change", 'input[name="penerimaCheckbox"]');

    $("#tablebkkpertama tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = tablepertama.row($(this).closest("tr")).data();
                console.log(rowData, this, tablepertama);
                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000,
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };
            }
        },
    );

    btn_supplier.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Supplier",
                html: '<table id="supplierTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#supplierTable")
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
                        const table = $("#supplierTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "/Kencana/MaintenancePengajuanBKKKencana/getSupplier",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "NM_SUP" }, { data: "NO_SUP" }],
                        });
                        setTimeout(() => {
                            $("#supplierTable_filter input").focus();
                        }, 300);
                        // $("#supplierTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#supplierTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            },
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "supplierTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    supplier2.value = escapeHTML(selectedRow.NM_SUP.trim());
                    supplier1.value = escapeHTML(selectedRow.NO_SUP.trim());

                    if (!TT) {
                        rincian.value =
                            "UANG MUKA - " +
                            escapeHTML(selectedRow.NM_SUP.trim());
                        setTimeout(() => {
                            rincian.focus();
                        }, 300);
                        tablekedua = $("#tablebkkpenagihan").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            destroy: true,
                            ajax: {
                                url: "/Kencana/MaintenancePengajuanBKKKencana/getTT",
                                dataType: "json",
                                type: "GET",
                                data: function (d) {
                                    return $.extend({}, d, {
                                        _token: csrfToken,
                                        supplier1: supplier1.value,
                                    });
                                },
                            },
                            columns: [
                                {
                                    data: "Waktu_Penagihan",
                                    render: function (data, type, row) {
                                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                    },
                                },
                                { data: "Id_Penagihan" },
                                { data: "Status_PPN" },
                                { data: "UangTT" },
                                { data: "Nilai_Penagihan" },
                                { data: "Lunas" },
                                { data: "IdUangTT" },
                                { data: "Id_Pembayaran" },
                                { data: "KursBayar" },
                                // { data: "TT_NoLunas" },
                                // { data: "isRed" },
                            ],
                            columnDefs: [
                                { targets: [6, 7, 8], visible: false },
                            ],
                            paging: false,
                            scrollY: "300px",
                            scrollCollapse: true,
                        });
                        $("#tablebkkpenagihan")
                            .parents("div.dataTables_wrapper")
                            .first()
                            .hide();
                    } else {
                        tablekedua = $("#tablebkkpenagihan").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            destroy: true,
                            ajax: {
                                url: "/Kencana/MaintenancePengajuanBKKKencana/getTT",
                                dataType: "json",
                                type: "GET",
                                data: function (d) {
                                    return $.extend({}, d, {
                                        _token: csrfToken,
                                        supplier1: supplier1.value,
                                    });
                                },
                            },
                            columns: [
                                {
                                    data: "Waktu_Penagihan",
                                    render: function (data, type, row) {
                                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                    },
                                },
                                { data: "Id_Penagihan" },
                                { data: "Status_PPN" },
                                { data: "UangTT" },
                                { data: "Nilai_Penagihan" },
                                { data: "Lunas" },
                                { data: "IdUangTT" },
                                { data: "Id_Pembayaran" },
                                { data: "KursBayar" },
                                // { data: "TT_NoLunas" },
                                // { data: "isRed" },
                            ],
                            columnDefs: [
                                { targets: [6, 7, 8], visible: false },
                            ],
                            paging: false,
                            scrollY: "300px",
                            scrollCollapse: true,
                        });
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    $("#tablebkkpenagihan tbody").off(
        "change",
        'input[name="penerimaCheckbox"]',
    );

    $("#tablebkkpenagihan tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowData = tablekedua.row($(this).closest("tr")).data();
                console.log(rowData, this, tablekedua);
                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000,
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };
            }
        },
    );

    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        proses = 1;
        // btn_isi.disabled = false;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_matauang.disabled = true;

        if (!TT) {
            dp = false;
            bayar = false;
            Swal.fire({
                title: "Confirmation",
                text: "Pengajuan untuk Pembayaran (YES) / Uang Muka (NO) ?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                returnFocus: false,
            }).then((result) => {
                if (mata_uang.value.trim() == "") {
                    // Swal.fire({
                    //     icon: "warning",
                    //     title: "Warning!",
                    //     text: "Isi kode barang terlebih dahulu",
                    //     showConfirmButton: true,
                    // });
                    btn_matauang.disabled = false;
                }
                console.log(result);
                btn_bkkuangmuka.disabled = !result.isConfirmed;
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Confirmation",
                        text: "Pengajuan untuk Pembayaran berdasarkan BKM?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                        didOpen: () => {
                            document.querySelector(".swal2-confirm").focus();
                        },
                    }).then((result) => {
                        console.log(result);
                        if (result.isConfirmed) {
                            ada_bkm.style.visibility = "visible";
                            bkm.style.visibility = "visible";
                            setTimeout(() => {
                                btn_supplier.focus();
                            }, 300);
                        } else {
                            setTimeout(() => {
                                btn_supplier.focus();
                            }, 300);
                        }
                    });
                    radiogrup_adadp.disabled = true;
                    radiogrup_tidakdp.disabled = false;
                    radiogrup_tidakdp.click();
                } else {
                    radiogrup_adadp.disabled = false;
                    radiogrup_adadp.click();
                    radiogrup_tidakdp.disabled = true;
                }
                console.log(BKM_Pot);
            });
            return;
        } else {
            console.log(rowData !== null, rowData !== undefined);
            if (rowData == null && rowData == undefined) {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih data terlebih dahulu",
                    showConfirmButton: true,
                });
                return;
            } else {
                radiogrup_adadp.disabled = false;
                radiogrup_tidakdp.disabled = false;
                pajak.value = rowData.Status_PPN;
                rincian.value = rowData.Id_Penagihan;
                nilai_pembayaran_kanan.value = rowData.Id_Penagihan;
                mata_uang.value = rowData.UangTT;
                nilai_pembayaran.value = rowData.Nilai_Penagihan;
                id_pembayaran.value = rowData.Id_Pembayaran;
                kurs.value = numeral(rowData.KursBayar).format("0.00");
                if (mata_uang.value.trim() == "") {
                    // Swal.fire({
                    //     icon: "warning",
                    //     title: "Warning!",
                    //     text: "Isi kode barang terlebih dahulu",
                    //     showConfirmButton: true,
                    // });
                    btn_matauang.disabled = false;
                }
                return;
            }
        }
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        if (proses === 3) {
            Swal.fire({
                title: "Apakah anda yakin menghapus?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "/Kencana/MaintenancePengajuanBKKKencana",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: proses,
                            TT: TT ? 1 : 0,
                            TdkDP: TdkDP ? 1 : 0,
                            AdaDP: AdaDP ? 1 : 0,
                            id_pembayaran: id_pembayaran.value,
                            nilai_pembayaran_kanan:
                                nilai_pembayaran_kanan.value,
                            bayar: bayar ? 1 : 0,
                            dp: dp ? 1 : 0,
                        },
                        success: function (response) {
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        console.log(TT);

                                        if (TT == undefined) {
                                            tablepertama.ajax.reload();
                                            btn_proses.disabled = true;
                                            btn_koreksi.disabled = false;
                                            btn_hapus.disabled = false;
                                        } else if (TT == true) {
                                            tablekedua.ajax.reload();
                                            btn_proses.disabled = true;
                                            btn_isi.disabled = false;
                                            btn_hapus.disabled = false;
                                        }
                                    }
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            let errorMessage =
                                "Terjadi kesalahan saat memproses data.";
                            if (xhr.responseJSON && xhr.responseJSON.error) {
                                errorMessage = xhr.responseJSON.error;
                            } else if (xhr.responseText) {
                                try {
                                    const response = JSON.parse(
                                        xhr.responseText,
                                    );
                                    errorMessage =
                                        response.error || errorMessage;
                                } catch (e) {
                                    console.error(
                                        "Error parsing JSON response:",
                                        e,
                                    );
                                }
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: errorMessage,
                                showConfirmButton: false,
                            });
                        },
                    });
                }
            });
        } else {
            if (pajak.value == "Ada Pajak") {
                Swal.fire({
                    icon: "info",
                    title: "Pembayaran Pajak di pisah ?",
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Ya",
                    cancelButtonText: "Tidak",
                }).then((result) => {
                    if (result.isConfirmed) {
                        pjk = 1;
                        $.ajax({
                            url: "/Kencana/MaintenancePengajuanBKKKencana",
                            type: "POST",
                            data: {
                                _token: csrfToken,
                                proses: proses,
                                TT: TT ? 1 : 0,
                                TdkDP: TdkDP ? 1 : 0,
                                AdaDP: AdaDP ? 1 : 0,
                                pajak: pajak.value,
                                id_pembayaran: id_pembayaran.value,
                                rincian: rincian.value,
                                mata_uang_kanan: mata_uang_kanan.value,
                                id_bank: id_bank.value,
                                id_jnsbayar: id_jnsbayar.value,
                                jumlah_bayar: jumlah_bayar.value,
                                nilai_pembayaran: nilai_pembayaran.value,
                                nilai_pembayaran_kanan:
                                    nilai_pembayaran_kanan.value,
                                rincian_dp: rincian_dp.value,
                                nilai_pembayaran2: nilai_pembayaran2.value,
                                id_bkk: id_bkk.value,
                                bkk_uangmuka: bkk_uangmuka.value,
                                id_bayardp: id_bayardp.value,
                                belum_dibayar: belum_dibayar.value,
                                bayar: bayar ? 1 : 0,
                                dp: dp ? 1 : 0,
                                supplier1: supplier1.value,
                                kurs: kurs.value,
                                ada_bkm: ada_bkm.value,
                                Id_Penagihan: rowData.Id_Penagihan,
                                pjk: pjk,
                                NoKodePerkiraan: kode_perkiraanNomor.value,
                            },
                            success: function (response) {
                                if (response.message) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Success!",
                                        text: response.message,
                                        showConfirmButton: true,
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            if (TT == true || TT == false) {
                                                // location.reload();
                                                document
                                                    .querySelectorAll("input")
                                                    .forEach((input) => {
                                                        if (
                                                            input.id !==
                                                                "supplier1" &&
                                                            input.id !==
                                                                "supplier2"
                                                        ) {
                                                            input.value = "";
                                                        }
                                                    });
                                                $("#tablebkkpenagihan")
                                                    .DataTable()
                                                    .ajax.reload();
                                                btn_proses.disabled = true;
                                                btn_isi.disabled = false;
                                                btn_hapus.disabled = false;
                                            }
                                        }
                                    });
                                } else if (response.error) {
                                    Swal.fire({
                                        icon: "info",
                                        title: "info!",
                                        text: response.error,
                                        showConfirmButton: false,
                                    });
                                }
                            },
                            error: function (xhr, status, error) {
                                let errorMessage =
                                    "Terjadi kesalahan saat memproses data.";
                                if (
                                    xhr.responseJSON &&
                                    xhr.responseJSON.error
                                ) {
                                    errorMessage = xhr.responseJSON.error;
                                } else if (xhr.responseText) {
                                    try {
                                        const response = JSON.parse(
                                            xhr.responseText,
                                        );
                                        errorMessage =
                                            response.error || errorMessage;
                                    } catch (e) {
                                        console.error(
                                            "Error parsing JSON response:",
                                            e,
                                        );
                                    }
                                }

                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: errorMessage,
                                    showConfirmButton: false,
                                });
                            },
                        });
                    } else if (result.isDismissed) {
                        pjk = 0;
                        $.ajax({
                            url: "/Kencana/MaintenancePengajuanBKKKencana",
                            type: "POST",
                            data: {
                                _token: csrfToken,
                                proses: proses,
                                TT: TT ? 1 : 0,
                                TdkDP: TdkDP ? 1 : 0,
                                AdaDP: AdaDP ? 1 : 0,
                                pajak: pajak.value,
                                id_pembayaran: id_pembayaran.value,
                                rincian: rincian.value,
                                mata_uang_kanan: mata_uang_kanan.value,
                                id_bank: id_bank.value,
                                id_jnsbayar: id_jnsbayar.value,
                                jumlah_bayar: jumlah_bayar.value,
                                nilai_pembayaran: nilai_pembayaran.value,
                                nilai_pembayaran_kanan:
                                    nilai_pembayaran_kanan.value,
                                rincian_dp: rincian_dp.value,
                                nilai_pembayaran2: nilai_pembayaran2.value,
                                id_bkk: id_bkk.value,
                                bkk_uangmuka: bkk_uangmuka.value,
                                id_bayardp: id_bayardp.value,
                                belum_dibayar: belum_dibayar.value,
                                bayar: bayar ? 1 : 0,
                                dp: dp ? 1 : 0,
                                supplier1: supplier1.value,
                                kurs: kurs.value,
                                ada_bkm: ada_bkm.value,
                                Id_Penagihan: rowData.Id_Penagihan,
                                pjk: pjk,
                                NoKodePerkiraan: kode_perkiraanNomor.value,
                            },
                            success: function (response) {
                                if (response.message) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Success!",
                                        text: response.message,
                                        showConfirmButton: true,
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            if (TT == true || TT == false) {
                                                // location.reload();
                                                document
                                                    .querySelectorAll("input")
                                                    .forEach((input) => {
                                                        if (
                                                            input.id !==
                                                                "supplier1" &&
                                                            input.id !==
                                                                "supplier2"
                                                        ) {
                                                            input.value = ""; // Hapus nilai input jika bukan supplier1 atau supplier2
                                                        }
                                                    });
                                                $("#tablebkkpenagihan")
                                                    .DataTable()
                                                    .ajax.reload();
                                                btn_proses.disabled = true;
                                                btn_isi.disabled = false;
                                                btn_hapus.disabled = false;
                                            }
                                        }
                                    });
                                } else if (response.error) {
                                    Swal.fire({
                                        icon: "info",
                                        title: "info!",
                                        text: response.error,
                                        showConfirmButton: false,
                                    });
                                }
                            },
                            error: function (xhr, status, error) {
                                let errorMessage =
                                    "Terjadi kesalahan saat memproses data.";
                                if (
                                    xhr.responseJSON &&
                                    xhr.responseJSON.error
                                ) {
                                    errorMessage = xhr.responseJSON.error;
                                } else if (xhr.responseText) {
                                    try {
                                        const response = JSON.parse(
                                            xhr.responseText,
                                        );
                                        errorMessage =
                                            response.error || errorMessage;
                                    } catch (e) {
                                        console.error(
                                            "Error parsing JSON response:",
                                            e,
                                        );
                                    }
                                }
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: errorMessage,
                                    showConfirmButton: false,
                                });
                            },
                        });
                    }
                });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Dibayar penuh?",
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Ya",
                    cancelButtonText: "Tidak",
                }).then((result) => {
                    if (result.isConfirmed) {
                        bayar = 1;
                        $.ajax({
                            url: "/Kencana/MaintenancePengajuanBKKKencana",
                            type: "POST",
                            data: {
                                _token: csrfToken,
                                proses: proses,
                                TT: TT ? 1 : 0,
                                TdkDP: TdkDP ? 1 : 0,
                                AdaDP: AdaDP ? 1 : 0,
                                pajak: pajak.value,
                                id_pembayaran: id_pembayaran.value,
                                rincian: rincian.value,
                                mata_uang_kanan: mata_uang_kanan.value,
                                id_bank: id_bank.value,
                                id_jnsbayar: id_jnsbayar.value,
                                jumlah_bayar: jumlah_bayar.value,
                                nilai_pembayaran: nilai_pembayaran.value,
                                nilai_pembayaran_kanan:
                                    nilai_pembayaran_kanan.value,
                                rincian_dp: rincian_dp.value,
                                nilai_pembayaran2: nilai_pembayaran2.value,
                                id_bkk: id_bkk.value,
                                bkk_uangmuka: bkk_uangmuka.value,
                                id_bayardp: id_bayardp.value,
                                belum_dibayar: belum_dibayar.value,
                                bayar: bayar ? 1 : 0,
                                dp: dp ? 1 : 0,
                                supplier1: supplier1.value,
                                kurs: kurs.value,
                                ada_bkm: ada_bkm.value,
                                // Id_Penagihan: rowData.Id_Penagihan,
                                pjk: pjk,
                                NoKodePerkiraan: kode_perkiraanNomor.value,
                            },
                            success: function (response) {
                                if (response.message) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Success!",
                                        text: response.message,
                                        showConfirmButton: true,
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            if (TT == true || TT == false) {
                                                // location.reload();
                                                document
                                                    .querySelectorAll("input")
                                                    .forEach((input) => {
                                                        if (
                                                            input.id !==
                                                                "supplier1" &&
                                                            input.id !==
                                                                "supplier2"
                                                        ) {
                                                            input.value = ""; // Hapus nilai input jika bukan supplier1 atau supplier2
                                                        }
                                                    });
                                                $("#tablebkkpenagihan")
                                                    .DataTable()
                                                    .ajax.reload();
                                                btn_proses.disabled = true;
                                                btn_isi.disabled = false;
                                                btn_hapus.disabled = false;
                                            }
                                        }
                                    });
                                } else if (response.error) {
                                    Swal.fire({
                                        icon: "info",
                                        title: "info!",
                                        text: response.error,
                                        showConfirmButton: false,
                                    });
                                }
                            },
                            error: function (xhr, status, error) {
                                let errorMessage =
                                    "Terjadi kesalahan saat memproses data.";
                                if (
                                    xhr.responseJSON &&
                                    xhr.responseJSON.error
                                ) {
                                    errorMessage = xhr.responseJSON.error;
                                } else if (xhr.responseText) {
                                    try {
                                        const response = JSON.parse(
                                            xhr.responseText,
                                        );
                                        errorMessage =
                                            response.error || errorMessage;
                                    } catch (e) {
                                        console.error(
                                            "Error parsing JSON response:",
                                            e,
                                        );
                                    }
                                }

                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: errorMessage,
                                    showConfirmButton: false,
                                });
                            },
                        });
                    } else if (result.isDismissed) {
                        bayar = 0;
                        $.ajax({
                            url: "/Kencana/MaintenancePengajuanBKKKencana",
                            type: "POST",
                            data: {
                                _token: csrfToken,
                                proses: proses,
                                TT: TT ? 1 : 0,
                                TdkDP: TdkDP ? 1 : 0,
                                AdaDP: AdaDP ? 1 : 0,
                                pajak: pajak.value,
                                id_pembayaran: id_pembayaran.value,
                                rincian: rincian.value,
                                mata_uang_kanan: mata_uang_kanan.value,
                                id_bank: id_bank.value,
                                id_jnsbayar: id_jnsbayar.value,
                                jumlah_bayar: jumlah_bayar.value,
                                nilai_pembayaran: nilai_pembayaran.value,
                                nilai_pembayaran_kanan:
                                    nilai_pembayaran_kanan.value,
                                rincian_dp: rincian_dp.value,
                                nilai_pembayaran2: nilai_pembayaran2.value,
                                id_bkk: id_bkk.value,
                                bkk_uangmuka: bkk_uangmuka.value,
                                id_bayardp: id_bayardp.value,
                                belum_dibayar: belum_dibayar.value,
                                bayar: bayar ? 1 : 0,
                                dp: dp ? 1 : 0,
                                supplier1: supplier1.value,
                                kurs: kurs.value,
                                ada_bkm: ada_bkm.value,
                                // Id_Penagihan: rowData.Id_Penagihan,
                                pjk: pjk,
                                NoKodePerkiraan: kode_perkiraanNomor.value,
                            },
                            success: function (response) {
                                if (response.message) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Success!",
                                        text: response.message,
                                        showConfirmButton: true,
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            if (TT == true || TT == false) {
                                                // location.reload();
                                                document
                                                    .querySelectorAll("input")
                                                    .forEach((input) => {
                                                        if (
                                                            input.id !==
                                                                "supplier1" &&
                                                            input.id !==
                                                                "supplier2"
                                                        ) {
                                                            input.value = ""; // Hapus nilai input jika bukan supplier1 atau supplier2
                                                        }
                                                    });
                                                $("#tablebkkpenagihan")
                                                    .DataTable()
                                                    .ajax.reload();
                                                btn_proses.disabled = true;
                                                btn_isi.disabled = false;
                                                btn_hapus.disabled = false;
                                            }
                                        }
                                    });
                                } else if (response.error) {
                                    Swal.fire({
                                        icon: "info",
                                        title: "info!",
                                        text: response.error,
                                        showConfirmButton: false,
                                    });
                                }
                            },
                            error: function (xhr, status, error) {
                                let errorMessage =
                                    "Terjadi kesalahan saat memproses data.";
                                if (
                                    xhr.responseJSON &&
                                    xhr.responseJSON.error
                                ) {
                                    errorMessage = xhr.responseJSON.error;
                                } else if (xhr.responseText) {
                                    try {
                                        const response = JSON.parse(
                                            xhr.responseText,
                                        );
                                        errorMessage =
                                            response.error || errorMessage;
                                    } catch (e) {
                                        console.error(
                                            "Error parsing JSON response:",
                                            e,
                                        );
                                    }
                                }

                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: errorMessage,
                                    showConfirmButton: false,
                                });
                            },
                        });
                    }
                });
            }
        }
    });

    btn_koreksi.addEventListener("click", function (event) {
        event.preventDefault();
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        proses = 2;
        label_pajak.style.visibility = "hidden";
        pajak.style.visibility = "hidden";
        console.log(TT, rowDataPertama);
        if (TT == undefined) {
            rincian.value = rowDataPertama.Rincian_Bayar;
            id_bank.value = rowDataPertama.Id_Bank;
            id_jnsbayar.value = rowDataPertama.Id_Jenis_Bayar;
            jns_pembayaran.value = rowDataPertama.Jenis_Pembayaran;
            mata_uang.value = rowDataPertama.Nama_MataUang;
            kurs.value = parseFloat(rowDataPertama.Kurs_Bayar);
            nilai_pembayaran.value = rowDataPertama.Nilai_Pembayaran;
            id_pembayaran.value = rowDataPertama.Id_Pembayaran;
            jumlah_bayar.value = rowDataPertama.Jml_JenisBayar;
            mata_uang_kanan.value = rowDataPertama.Id_MataUang;
        }
    });

    btn_hapus.addEventListener("click", function (event) {
        event.preventDefault();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        proses = 3;
        console.log(TT);
        if (TT == true) {
            id_pembayaran.value = rowData.Id_Pembayaran;
        } else if (TT == undefined) {
            id_pembayaran.value = rowDataPertama.Id_Pembayaran;
            nilai_pembayaran_kanan.value = rowDataPertama.Id_Penagihan;
        }
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_bkkuangmuka.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a BKK",
                html: '<table id="bkkTable" class="display" style="width:100%"><thead><tr><th>BKK</th><th>Rincian</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "70%",
                preConfirm: () => {
                    const selectedData = $("#bkkTable")
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
                        const table = $("#bkkTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/MaintenancePengajuanBKKKencana/getBKK_DP",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    supplier1: supplier1.value,
                                    BKM_Pot: BKM_Pot ? 1 : 0,
                                },
                            },
                            columns: [
                                {
                                    data: "BKK",
                                },
                                {
                                    data: "Rincian",
                                },
                            ],
                        });
                        setTimeout(() => {
                            $("#bkkTable_filter input").focus();
                        }, 300);
                        // $("#bkkTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#bkkTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "bkkTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    bkk_uangmuka.value = escapeHTML(selectedRow.BKK.trim());
                    rincian_bkk.value = escapeHTML(selectedRow.Rincian.trim());

                    try {
                        const result = Swal.fire({
                            title: "Select a BKK DP",
                            html: '<table id="bkkTable2" class="display" style="width:100%"><thead><tr><th>Nilai Pembayaran</th><th>ID Bayar</th></tr></thead><tbody></tbody></table>',
                            showCancelButton: true,
                            width: "70%",
                            preConfirm: () => {
                                const selectedData = $("#bkkTable2")
                                    .DataTable()
                                    .row(".selected")
                                    .data();
                                if (!selectedData) {
                                    Swal.showValidationMessage(
                                        "Please select a row",
                                    );
                                    return false;
                                }
                                return selectedData;
                            },
                            didOpen: () => {
                                $(document).ready(function () {
                                    const table = $("#bkkTable2").DataTable({
                                        responsive: true,
                                        processing: true,
                                        serverSide: true,
                                        returnFocus: true,
                                        ajax: {
                                            url: "/Kencana/MaintenancePengajuanBKKKencana/getBKK_DPDetails",
                                            dataType: "json",
                                            type: "GET",
                                            data: {
                                                _token: csrfToken,
                                                supplier1: supplier1.value,
                                                BKM_Pot: BKM_Pot ? 1 : 0,
                                                bkk_uangmuka:
                                                    bkk_uangmuka.value,
                                                rincian_bkk: rincian_bkk.value,
                                                nilai_pembayaran:
                                                    nilai_pembayaran.value,
                                            },
                                        },
                                        columns: [
                                            {
                                                data: "TNilaiByrSbl",
                                            },
                                            {
                                                data: "TIDByr_DP",
                                            },
                                        ],
                                    });
                                    setTimeout(() => {
                                        $("#bkkTable2_filter input").focus();
                                    }, 300);
                                    // $("#bkkTable2_filter input").on(
                                    //     "keyup",
                                    //     function () {
                                    //         table
                                    //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                                    //             .search(this.value) // Cari berdasarkan input pencarian
                                    //             .draw(); // Perbarui hasil pencarian
                                    //     }
                                    // );
                                    $("#bkkTable2 tbody").on(
                                        "click",
                                        "tr",
                                        function () {
                                            // Remove 'selected' class from all rows
                                            table
                                                .$("tr.selected")
                                                .removeClass("selected");
                                            // Add 'selected' class to the clicked row
                                            $(this).addClass("selected");
                                        },
                                    );
                                    currentIndex = null;
                                    Swal.getPopup().addEventListener(
                                        "keydown",
                                        (e) =>
                                            handleTableKeydownInSwal(
                                                e,
                                                "bkkTable2",
                                            ),
                                    );
                                });
                            },
                        }).then((result) => {
                            if (result.isConfirmed && result.value) {
                                const selectedRow = result.value;
                                nilai_pembayaran2.value = escapeHTML(
                                    selectedRow.TNilaiByrSbl.trim(),
                                );
                                belum_dibayar.value = escapeHTML(
                                    selectedRow.TSisaByr.trim(),
                                );
                                rincian_dp.value = escapeHTML(
                                    selectedRow.TRincian_DP.trim(),
                                );
                                setTimeout(() => {
                                    btn_bank.focus();
                                }, 300);

                                // sp1.value = decodeHtml(selectedRow.Supplier).trim();
                                // sp2.value = selectedRow.No_Supplier.trim();
                            }
                        });
                    } catch (error) {
                        console.error("An error occurred:", error);
                    }
                    // rincian_dp.value =
                    // sp1.value = decodeHtml(selectedRow.Supplier).trim();
                    // sp2.value = selectedRow.No_Supplier.trim();
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
                html: '<table id="bankTable" class="display" style="width:100%"><thead><tr><th>ID Bank</th><th>Nama Bank</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#bankTable")
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
                        const table = $("#bankTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/MaintenancePengajuanBKKKencana/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Bank",
                                },
                                {
                                    data: "Nama_Bank",
                                },
                            ],
                        });
                        setTimeout(() => {
                            $("#bankTable_filter input").focus();
                        }, 300);
                        // $("#bankTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#bankTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "bankTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // sp1.value = decodeHtml(selectedRow.Supplier).trim();
                    id_bank.value = selectedRow.Id_Bank.trim();

                    setTimeout(() => {
                        btn_jenispembayaran.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_jenispembayaran.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Jenis Pembayaran",
                html: '<table id="jnsbayarTable" class="display" style="width:100%"><thead><tr><th>Jenis Pembayaran</th><th>ID Pembayaran</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#jnsbayarTable")
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
                        const table = $("#jnsbayarTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/MaintenancePengajuanBKKKencana/getJnsByr",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_bank: id_bank.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Jenis_Pembayaran",
                                },
                                {
                                    data: "Id_Jenis_Bayar",
                                },
                            ],
                            order: [[1, "asc"]],
                        });
                        setTimeout(() => {
                            $("#jnsbayarTable_filter input").focus();
                        }, 300);
                        // $("#jnsbayarTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#jnsbayarTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            },
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "jnsbayarTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_jnsbayar.value = selectedRow.Id_Jenis_Bayar.trim();
                    jns_pembayaran.value = selectedRow.Jenis_Pembayaran.trim();

                    setTimeout(() => {
                        jumlah_bayar.focus();
                        jumlah_bayar.select();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_matauang.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Mata Uang",
                html: '<table id="matauangTable" class="display" style="width:100%"><thead><tr><th>Nama Mata Uang</th><th>ID Mata Uang</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#matauangTable")
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
                        const table = $("#matauangTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/MaintenancePengajuanBKKKencana/GetMataUang",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    mata_uang: mata_uang.value,
                                    id_bank: id_bank.value,
                                },
                                error: function (xhr, errorType, exception) {
                                    console.log(xhr);
                                    alert(xhr.responseJSON.message);
                                },
                                // dataSrc: function (json) {
                                //     // Check for error status from the server
                                //     if (json.status && json.status === 'error') {
                                //         // Display an alert with the error message
                                //         alert('Error: ' + json.message);
                                //         return []; // Return an empty array to prevent DataTables from processing data
                                //     } else {
                                //         // Return the data array for DataTables to process
                                //         return json;
                                //     }
                                // },
                            },
                            columns: [
                                {
                                    data: "Nama_MataUang",
                                },
                                {
                                    data: "Id_MataUang",
                                },
                            ],
                            order: [[1, "asc"]],
                        });
                        setTimeout(() => {
                            $("#matauangTable_filter input").focus();
                        }, 300);
                        // $("#matauangTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#matauangTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            },
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "matauangTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // sp1.value = decodeHtml(selectedRow.Supplier).trim();
                    mata_uang.value = selectedRow.Nama_MataUang.trim();
                    mata_uang_kanan.value = selectedRow.Id_MataUang.trim();

                    setTimeout(() => {
                        btn_kodePerkiraan.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_kodePerkiraan.addEventListener("click", async function (e) {
        e.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: `<table id="kodePerkiraanTable" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Keterangan</th>
                                    <th>No. Kode Perkiraan</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>`,
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#kodePerkiraanTable")
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
                        const table = $("#kodePerkiraanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/MaintenancePengajuanBKKKencana/GetKodePerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                                error: function (xhr, errorType, exception) {
                                    console.log(xhr);
                                    alert(xhr.responseJSON.message);
                                },
                                // dataSrc: function (json) {
                                //     // Check for error status from the server
                                //     if (json.status && json.status === 'error') {
                                //         // Display an alert with the error message
                                //         alert('Error: ' + json.message);
                                //         return []; // Return an empty array to prevent DataTables from processing data
                                //     } else {
                                //         // Return the data array for DataTables to process
                                //         return json;
                                //     }
                                // },
                            },
                            columns: [
                                {
                                    data: "Keterangan",
                                },
                                {
                                    data: "NoKodePerkiraan",
                                },
                            ],
                            order: [[1, "asc"]],
                        });
                        setTimeout(() => {
                            $("#kodePerkiraanTable_filter input").focus();
                        }, 300);
                        // $("#matauangTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#kodePerkiraanTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            },
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "kodePerkiraanTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // sp1.value = decodeHtml(selectedRow.Supplier).trim();
                    kode_perkiraanNomor.value =
                        selectedRow.NoKodePerkiraan.trim();
                    kode_perkiraanNama.value = selectedRow.Keterangan.trim();

                    setTimeout(() => {
                        nilai_pembayaran.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
