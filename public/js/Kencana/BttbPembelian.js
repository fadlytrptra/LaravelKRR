jQuery(function ($) {
    //#region Variables
    let select_divisi = $("#select_divisi");
    let select_noSPPB = $("#select_noSPPB");
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let table_barang = $("#table_barang").DataTable({
        searching: false,
        info: false,
        paging: false,
        ordering: false,
    });
    let table_terima = $("#table_terima").DataTable({
        searching: false,
        info: false,
        paging: false,
        ordering: false,
    });
    let enterKeyboardEvent = new KeyboardEvent("keypress", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
    });
    let changeEvent = new Event("change", { bubbles: true });
    let total_terima = document.getElementById("total_terima");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let createBTTBModalLabel = document.getElementById("createBTTBModalLabel");
    let bttb_noTerima = document.getElementById("bttb_noTerima");
    let bttb_kodeBarang = document.getElementById("bttb_kodeBarang");
    let bttb_namaBarang = document.getElementById("bttb_namaBarang");
    let bttb_tanggal = document.getElementById("bttb_tanggal");
    let bttb_qtyTerima = document.getElementById("bttb_qtyTerima");
    let bttb_qtyTerimaKoreksi = document.getElementById("bttb_qtyTerimaKoreksi"); //prettier-ignore
    let bttb_satTerima = document.getElementById("bttb_satTerima");
    let bttb_noSatTerima = document.getElementById("bttb_noSatTerima");
    let bttb_qtyTerimaActual = document.getElementById("bttb_qtyTerimaActual");
    let bttb_qtyTerimaActualKoreksi = document.getElementById("bttb_qtyTerimaActualKoreksi"); //prettier-ignore
    let bttb_satTerimaActual = document.getElementById("bttb_satTerimaActual");
    let bttb_tanggalFaktur = document.getElementById("bttb_tanggalFaktur");
    let bttb_noFaktur = document.getElementById("bttb_noFaktur");
    let bttb_nomorSJ = document.getElementById("bttb_nomorSJ");
    let bttb_selectMataUang = $("#bttb_selectMataUang");
    let bttb_kursRupiah = document.getElementById("bttb_kursRupiah");
    let bttb_harga = document.getElementById("bttb_harga");
    let bttb_discount = document.getElementById("bttb_discount");
    let bttb_ppn = document.getElementById("bttb_ppn");
    let bttb_divCbDPP = document.getElementById("bttb_divCbDPP");
    let bttb_checkboxDPP = document.getElementById("bttb_checkboxDPP");
    let bttb_hargaPer = document.getElementById("bttb_hargaPer");
    let bttb_nilaiTrans = document.getElementById("bttb_nilaiTrans");
    let bttb_supplier = document.getElementById("bttb_supplier");
    let bttb_noSupplier = document.getElementById("bttb_noSupplier");
    let bttb_jangkaWaktu = document.getElementById("bttb_jangkaWaktu");
    let bttb_pembayaran = document.getElementById("bttb_pembayaran");
    let bttb_keterangan = document.getElementById("bttb_keterangan");
    let bttb_jenisDokumen = document.getElementById("bttb_jenisDokumen");
    let bttb_noSeriBarang = document.getElementById("bttb_noSeriBarang");
    let bttb_noPIBKRR = document.getElementById("bttb_noPIBKRR");
    let bttb_noPIBExternal = document.getElementById("bttb_noPIBExternal");
    let bttb_noRegisPIB = document.getElementById("bttb_noRegisPIB");
    let bttb_noBL = document.getElementById("bttb_noBL");
    let bttb_noKontrak = document.getElementById("bttb_noKontrak");
    let bttb_noSPPBBC = document.getElementById("bttb_noSPPBBC");
    let bttb_tglPIBExternal = document.getElementById("bttb_tglPIBExternal");
    let bttb_tglRegisPIB = document.getElementById("bttb_tglRegisPIB");
    let bttb_tglBL = document.getElementById("bttb_tglBL");
    let bttb_tglKontrak = document.getElementById("bttb_tglKontrak");
    let bttb_tglSPPBBC = document.getElementById("bttb_tglSPPBBC");
    let button_modalProses = document.getElementById("button_modalProses");
    let koreksiKurs_noFaktur = document.getElementById("koreksiKurs_noFaktur");
    let dppNilaiLain = 0.0;
    let selectedBarangRow = null;
    let selectedTerimaRow = null;
    let proses;
    let daftarSatuan = [];
    // let koreksiKurs_tableBarang = $("#koreksiKurs_tableBarang").DataTable({
    //     searching: false,
    //     info: false,
    //     paging: false,
    //     ordering: false,
    // });
    // let koreksiKurs_tableKurs = $("#koreksiKurs_tableKurs").DataTable({
    //     searching: false,
    //     info: false,
    //     paging: false,
    //     ordering: false,
    // });
    // let koreksiKurs_tableSales = $("#koreksiKurs_tableSales").DataTable({
    //     searching: false,
    //     info: false,
    //     paging: false,
    //     ordering: false,
    // });
    // let koreksiKurs_tableJual = $("#koreksiKurs_tableJual").DataTable({
    //     searching: false,
    //     info: false,
    //     paging: false,
    //     ordering: false,
    // });
    // let koreksiKurs_nomorTerima = document.getElementById("koreksiKurs_nomorTerima"); // prettier-ignore
    // let koreksiKurs_kodeBarang = document.getElementById("koreksiKurs_kodeBarang"); //prettier-ignore
    // let koreksiKurs_namaBarang = document.getElementById("koreksiKurs_namaBarang"); //prettier-ignore
    // let koreksiKurs_harga = document.getElementById("koreksiKurs_harga");
    // let koreksiKurs_kurs = document.getElementById("koreksiKurs_kurs");
    // let koreksiKurs_totalBayar = document.getElementById("koreksiKurs_totalBayar"); //prettier-ignore
    // let koreksiKurs_Proses = document.getElementById("koreksiKurs_Proses");
    //#endregion

    //#region Load Form
    init();
    clearModal();
    getDivisi();
    getMataUang();
    getSatuan();
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

    function getDivisi() {

        $.ajax({
            url: "/Kencana/BttbPembelian/divisi",
            type: "GET",
            success: function (res) {

                if (!res.success) {
                    Swal.fire("Error", res.message, "error");
                    return;
                }

                select_divisi.empty();

                // Placeholder
                select_divisi.append(
                    new Option("Pilih Divisi", "", true, false)
                );

                res.data.forEach(function (item) {

                    select_divisi.append(
                        new Option(
                            item.NM_DIV.trim(),
                            item.KD_DIV.trim()
                        )
                    );

                });

                // Tidak memilih apapun
                select_divisi.val(null).trigger("change");
            },
            error: function (xhr) {
                console.log(xhr.responseText);
            }
        });

    }

    function getMataUang() {
        console.log("getMataUang dipanggil");

        $.ajax({
            url: "/Kencana/BttbPembelian/matauang",
            type: "GET",
            success: function (response) {

                console.log(response);

                bttb_selectMataUang.empty();

                bttb_selectMataUang.append(
                    '<option value="">Pilih Mata Uang</option>'
                );

                $.each(response.data, function(i, item) {
                    console.log(item);

                    bttb_selectMataUang.append(
                        `<option value="${item.Id_MataUang}">
                            ${item.Nama_MataUang}
                        </option>`
                    );
                });

                console.log($("#bttb_selectMataUang").html());

                bttb_selectMataUang.trigger("change");
            },
            error: function(xhr){
                console.log(xhr.status);
                console.log(xhr.responseText);
            }
        });
    }

    function init() {
        select_divisi.select2({
            dropdownParent: $("#dropdownParent1"),
            allowClear: true,
            placeholder: "Pilih Divisi",
        });

        select_noSPPB.select2({
            dropdownParent: $("#dropdownParent1"),
            allowClear: true,
            placeholder: "Pilih Nomor SPPB",
        });

        bttb_selectMataUang.select2({
            dropdownParent: $("#select2DropdownParent"),
            allowClear: true,
            placeholder: "Pilih Mata Uang",
        });

        $("#select_divisi").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#select_noSPPB").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#bttb_selectMataUang").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#bttb_supplier").select2({
            dropdownParent: $("#select2DropdownParent"),
            allowClear: true,
            placeholder: "Pilih Supplier"
        });

        $("#bttb_supplier").next(".select2-container").css({
            width: "100%"
        });

        select_divisi.val(null).trigger("change");
        select_noSPPB.val(null).trigger("change");
        bttb_selectMataUang.val(null).trigger("change");
    }

    function errorHandling(jenisError, data) {
        if (jenisError == "sppbKosong") {
            Swal.fire({
                icon: "error",
                title: "Kolom No. SPPB kosong!",
                text: data,
                showConfirmButton: false,
                timer: 1500,
            });
        } else if (jenisError == "ajaxGetDataResponse") {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: data,
                showConfirmButton: false,
                timer: 1500,
            });
        } else if (jenisError == "qtyTerimaKosong") {
            Swal.fire({
                icon: "error",
                title: "Kolom Qty Terima kosong!",
                text: data,
                showConfirmButton: false,
                timer: 1500,
            });
        } else if (jenisError == "qtyTerimaKosongActual") {
            Swal.fire({
                icon: "error",
                title: "Kolom Qty Terima Actual kosong!",
                text: data,
                showConfirmButton: false,
                timer: 1500,
            });
        } else if (jenisError == "table_terimaBelumDipilih") {
            Swal.fire({
                icon: "error",
                title: "Data pada tabel belum dipilih!",
                text: data,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    function clearModal() {
        bttb_kodeBarang.value = "";
        bttb_namaBarang.value = "";
        bttb_tanggal.valueAsDate = new Date();
        bttb_qtyTerima.value = "";
        bttb_satTerima.value = "";
        bttb_qtyTerimaActual.value = "";
        bttb_satTerimaActual.value = "";
        bttb_tanggalFaktur.valueAsDate = new Date();
        bttb_noFaktur.value = "";
        bttb_nomorSJ.value = "";
        bttb_selectMataUang.val(null).trigger("change");
        bttb_kursRupiah.value = "";
        bttb_harga.value = "";
        bttb_discount.value = "";
        bttb_ppn.value = "";
        bttb_hargaPer.value = "";
        bttb_nilaiTrans.value = "";
        bttb_supplier.value = "";
        bttb_jangkaWaktu.value = "";
        bttb_pembayaran.value = "";
        bttb_keterangan.value = "";
    }

    function loadTerima() {
        console.log("Masuk loadTerima");
        table_barang.clear().draw();
        table_terima.clear().draw();

        total_terima.value = "";

        selectedBarangRow = null;

        $.ajax({

            url: "/Kencana/BttbPembelian/barang",
            type: "GET",

            data: {
                KdDivisi: select_divisi.val(),
                NoSPPB: select_noSPPB.val()
            },

            success: function (res) {

                if (!res.success) {

                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: res.message
                    });

                    return;
                }

                table_barang.clear();

                res.data.forEach(function (item) {

                    table_barang.row.add([
                        item.Kd_brg ?? "",
                        item.NAMA_BRG ?? "",
                        item.nama_kategori ?? "",
                        item.nama_sub_kategori ?? "",
                        item.Nama_satuan ?? "",
                        numeral(item.Qty).format("0,0"),
                        item.Tgl_order
                            ? moment(item.Tgl_order).format("DD/MM/YYYY")
                            : "",
                        item.keterangan ?? "",
                        item.No_trans ?? "",
                        item.Flag ?? "N"
                    ]);

                });

                table_barang.draw();
                if (res.data.length > 0) {
                    loadDetailTerima(res.data[0].No_trans);
                }

            },
            error: function (xhr) {
                console.log(xhr.responseText);
            }
        });

    }

    function loadDetailTerima(noTrans) {
        selectedTerimaRow = null;
        table_terima.clear().draw();
        $.ajax({
            url: "/Kencana/BttbPembelian/terima",
            type: "GET",
            data: {
                NoTrans: noTrans
            },

            success: function (res) {
                if (!res.success) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: res.message
                    });
                    return;
                }

                console.log("Jumlah data =", res.data.length);

                let totalQty = 0;
                let satuan = "";

                res.data.forEach(function (item, index) {
                    totalQty += parseFloat(item.Qty_Terima ?? 0);
                    satuan = item.Sat_Terima ?? "";
                    let nilaiTrans =
                        (parseFloat(item.Hrg_trm ?? 0) *
                            parseFloat(item.Qty_Terima ?? 0)) +
                        parseFloat(item.hrg_ppn ?? 0);

                    table_terima.row.add([
                        index + 1,
                        item.Datang ? moment(item.Datang).format("DD/MM/YYYY") : "",
                        numeral(item.Qty).format("0,0"),
                        item.Sat_Pesan ?? "",
                        numeral(item.Qty_Terima).format("0,0"),
                        item.Sat_Terima ?? "",
                        numeral(item.Hrg_trm).format("0,0.0000"),
                        numeral(item.Disc_trm).format("0.00"),
                        numeral(item.Ppn_trm).format("0.00"),
                        numeral(item.Min_ord).format("0,0"),
                        numeral(nilaiTrans).format("0,0.00"),
                        item.NM_SUP ?? "",
                        item.Waktu ?? "",
                        item.Faktur ?? "",
                        item.Ket_trm ?? "",
                        item.No_terima ?? "",
                        item.No_sup ?? "",
                        item.TglRetur ? moment(item.TglRetur).format("DD/MM/YYYY") : "",
                        item.Nama_MataUang ?? "",
                        numeral(item.Kurs_Rp ?? 0).format("0,0.00"),
                        item.Tgl_Faktur ? moment(item.Tgl_Faktur).format("DD/MM/YYYY") : "",
                        item.No_SuratJalan ?? "",
                        item.Satuan_Terima ?? "",      // kolom No. Sat. Terima
                        selectedBarangRow[0] ?? ""     // kolom Kode Barang
                    ]);
                });
                table_terima.draw();
                total_terima.value =
                    numeral(totalQty).format("0,0") +
                    " " +
                    satuan;
            },

            error: function (xhr) {
                console.log(xhr.responseText);
            }
        });
    }

    function getSupplier(defaultValue = null) {
        $.ajax({
            url: "/Kencana/BttbPembelian/supplier",
            type: "GET",
            success: function(res){

                if(!res.success){
                    Swal.fire("Error", res.message, "error");
                    return;
                }

                $("#bttb_supplier").empty();

                $("#bttb_supplier").append(
                    new Option("Pilih Supplier", "", true, false)
                );

                $.each(res.data, function(_, item){
                    $("#bttb_supplier").append(
                        new Option(
                            item.NM_SUP.trim(),
                            item.NO_SUP.trim()
                        )
                    );
                });

                if(defaultValue){
                    $("#bttb_supplier").val(defaultValue).trigger("change");
                }else{
                    $("#bttb_supplier").val(null).trigger("change");
                }
            }
        });
    }

    function getNamaMataUang(idMataUang){
        $.ajax({
            url: "/Kencana/BttbPembelian/namamatauang",
            type: "GET",
            data:{
                IdMataUang:idMataUang
            },

            success:function(res){
                if(!res.success) return;
                if(res.data.length){
                    bttb_selectMataUang
                        .val(res.data[0].Id_MataUang)
                        .trigger("change");
                }
            }
        });
    }

    function getSatuan() {
        $.ajax({
            url: "/Kencana/BttbPembelian/satuan",
            type: "GET",
            dataType: "json",

            success: function (response) {
                if (!response.success) {
                    Swal.fire("Error", "Gagal mengambil data satuan", "error");
                    return;
                }
                daftarSatuan = response.data;
            },
            error: function () {
                Swal.fire(
                    "Error",
                    "Tidak dapat mengambil data satuan.",
                    "error"
                );
            }
        });
    }

    function prosesBTTB() {
        // ===== VALIDASI =====
        if (!bttb_qtyTerima.value || Number(bttb_qtyTerima.value) <= 0) {
            Swal.fire("Peringatan",
                "Quantity tidak boleh kosong atau 0.",
                "warning");
            bttb_qtyTerima.focus();
            return;
        }

        if (!bttb_qtyTerimaActual.value || Number(bttb_qtyTerimaActual.value) <= 0) {
            Swal.fire("Peringatan",
                "Quantity Terima tidak boleh kosong atau 0.",
                "warning");
            bttb_qtyTerimaActual.focus();
            return;
        }

        if ($("#bttb_supplier").val() == null || $("#bttb_supplier").val() == "") {
            Swal.fire("Peringatan",
                "Supplier tidak boleh kosong.",
                "warning");
            return;
        }

        let harga = parseFloat(bttb_harga.value || 0);
        let qty = parseFloat(bttb_qtyTerimaActual.value || 0);
        let disc = parseFloat(bttb_discount.value || 0);
        let ppn = parseFloat(bttb_ppn.value || 0);
        let kurs = parseFloat(bttb_kursRupiah.value || 0);

        let hrg_murni = qty * harga;
        let hrg_murni_rp = hrg_murni * kurs;
        let hrg_disc = hrg_murni * disc / 100;
        let hrg_disc_rp = hrg_disc * kurs;
        let hrg_nego = hrg_murni - hrg_disc;
        let hrg_nego_rp = hrg_murni_rp - hrg_disc_rp;
        let hrg_ppn = hrg_nego * ppn / 100;
        let hrg_ppn_rp = hrg_ppn * kurs;

        console.log("bttb_noSatTerima =", bttb_noSatTerima.value);
        console.log("bttb_satTerima =", bttb_satTerima.value);

        $.ajax({
            url: "/Kencana/BttbPembelian",
            type: "POST",
            headers: {
                "X-CSRF-TOKEN": csrfToken
            },

            data: {
                jenisProses: proses,
                no_terima: bttb_noTerima.value,
                datang: bttb_tanggal.value,
                qty: bttb_qtyTerima.value,
                QtyTerima: bttb_qtyTerimaActual.value,
                qty_koreksi: bttb_qtyTerimaKoreksi.value,
                QtyTerimakoreksi: bttb_qtyTerimaActualKoreksi.value,
                SatuanTerima: bttb_noSatTerima.value,
                faktur: bttb_noFaktur.value == "" ? "-" : bttb_noFaktur.value,
                no_sup: $("#bttb_supplier").val(),
                min_ord: bttb_hargaPer.value,
                hrg_trm: bttb_harga.value,
                disc_trm: bttb_discount.value,
                ppn_trm: bttb_ppn.value,
                waktu: bttb_jangkaWaktu.value,
                no_ket: Number(bttb_jangkaWaktu.value) == 0 ? "001" : "002",
                ket_trm: bttb_keterangan.value == "" ? "-" : bttb_keterangan.value,
                no_sppb: select_noSPPB.val(),
                no_trans: selectedBarangRow[8],
                kd_div: select_divisi.val(),
                IdMataUang: bttb_selectMataUang.val(),
                KursBeli: bttb_kursRupiah.value,
                TglFaktur: bttb_tanggalFaktur.value,
                NoSJ: bttb_nomorSJ.value,
                hrg_murni,
                hrg_murni_rp,
                hrg_disc,
                hrg_disc_rp,
                hrg_nego,
                hrg_nego_rp,
                hrg_ppn,
                hrg_ppn_rp
            },

            success: function (res) {

                Swal.fire({
                    title: "Apakah masih ada transaksi penerimaan untuk barang ini?",
                    text: "Klik Ya jika transaksi masih berlanjut, klik Tidak jika penerimaan selesai.",
                    icon: "question",
                    showDenyButton: true,
                    confirmButtonText: "Ya",
                    denyButtonText: "Tidak",
                    allowOutsideClick: false
                }).then(function (result) {

                    let flag = result.isConfirmed ? "N" : "Y";

                    console.log(flag);
                    console.log(selectedBarangRow[8]);
                    $.ajax({
                        url: "/Kencana/BttbPembelian/updateFlag",
                        type: "PUT",
                        headers: {
                            "X-CSRF-TOKEN": csrfToken
                        },
                        data: {
                            no_trans_1: selectedBarangRow[8],
                            sFlag: flag
                        },
                        success: function () {

                            Swal.fire({
                                icon: "success",
                                title: "Berhasil",
                                timer: 1200,
                                showConfirmButton: false
                            }).then(function () {

                                $("#createBTTBModal").modal("hide");
                                loadTerima();

                            });

                        },
                        error: function () {
                            Swal.fire("Error", "Gagal mengubah status selesai.", "error");
                        }
                    });

                });

            },

            error: function (xhr) {
                Swal.fire(
                    "Error",
                    xhr.responseJSON?.message ?? "Terjadi kesalahan",
                    "error"
                );
            }
        });
    }

    function hitungNilaiTrans() {
        let harga = parseFloat(bttb_harga.value) || 0;
        let disc = parseFloat(bttb_discount.value) || 0;
        let ppn = parseFloat(bttb_ppn.value) || 0;
        let hargaPer = parseFloat(bttb_hargaPer.value) || 1;
        let qty = parseFloat(bttb_qtyTerimaActual.value) || 0;

        let nilai = harga;
        nilai = nilai - (nilai * disc / 100);
        nilai = nilai + (nilai * ppn / 100);
        nilai = (nilai / hargaPer) * qty;

        bttb_nilaiTrans.value = numeral(nilai).format("0,0.00000");
    }

    // function updateFlag(noTrans, flag, ask) {
    //     $.ajax({
    //         url: "/BttbPembelian/UpdateFlag",
    //         type: "PUT",
    //         data: {
    //             no_trans_1: noTrans,
    //             sFlag: flag,
    //             _token: csrfToken,
    //         },
    //         success: function (data) {
    //             if (data.error || data.length == 0) {
    //                 errorHandling("ajaxGetDataResponse", data.error);
    //             } else {
    //                 if (ask === 1) {
    //                     Swal.fire({
    //                         icon: "success",
    //                         title: "Data sudah diterima.",
    //                         timer: 2000,
    //                         showConfirmButton: false,
    //                     }).then(loadTerima);
    //                 } else {
    //                     Swal.fire({
    //                         icon: "info",
    //                         title: "Pesanan selesai",
    //                         text:
    //                             "No. Trans: " +
    //                             noTrans +
    //                             " sudah memenuhi kuota pesanan",
    //                         timer: 1500,
    //                         showConfirmButton: false,
    //                     }).then(loadTerima);
    //                 }
    //             }
    //         },
    //     });
    // }

    // function getTotalQtyTerimaExisting(KodeBarang, excludeNoTerima = null) {
    //     let total = 0;

    //     table_terima.rows().every(function () {
    //         let row = this.data();
    //         let kodeBarangTerima = row[23];
    //         let noTerima = row[15];

    //         if (
    //             KodeBarang &&
    //             kodeBarangTerima == KodeBarang &&
    //             (!excludeNoTerima || noTerima !== excludeNoTerima)
    //         ) {
    //             total += numeral(row[4]).value();
    //         }
    //     });

    //     return total;
    // }

    // function getDataDetailSPPB(noSPPB) {
    //     let idDivisi = select_divisi.val();

    //     if (!noSPPB || !idDivisi) return;

    //     $.ajax({
    //         url: "/BttbPembelian/getDataDetailSPPB",
    //         type: "GET",
    //         data: {
    //             idDivisi: idDivisi,
    //             noSPPB: noSPPB
    //         },
    //         success: function (res) {
    //             // bersihkan table dulu
    //             table_barang.clear().draw();
    //             table_terima.clear().draw();

    //             // isi table barang
    //             if (res.ListBarang && res.ListBarang.length > 0) {
    //                 res.ListBarang.forEach(function (row) {
    //                     table_barang.row.add(row);
    //                 });
    //                 table_barang.draw();
    //             }

    //             // isi table terima
    //             if (res.ListTerima && res.ListTerima.length > 0) {
    //                 res.ListTerima.forEach(function (row) {
    //                     table_terima.row.add(row);
    //                 });
    //                 table_terima.draw();
    //             }
    //         },
    //         error: function (xhr) {
    //             alert("Gagal load detail SPPB");
    //             console.error(xhr.responseText);
    //         }
    //     });
    // }

    //#endregion

    //#region Event Listener

    select_divisi.on("select2:select", function () {
        let selectedIdDivisi = select_divisi.val();
        table_barang.clear();
        table_terima.clear();
        $.ajax({
            url: "/Kencana/BttbPembelian/nosppb",
            type: "GET",
            data: {
                KdDivisi: selectedIdDivisi
            },
            success: function (res) {
                if (!res.success) {
                    errorHandling("ajaxGetDataResponse", res.message);
                    return;
                }

                select_noSPPB.empty();

                select_noSPPB.append(
                    new Option("Pilih Nomor SPPB", "", true, false)
                );

                res.data.forEach(function (item) {

                    let noSPPB = (item.no_sppb ?? "").trim();

                    if (noSPPB === "") {
                        return;
                    }

                    select_noSPPB.append(
                        new Option(noSPPB, noSPPB)
                    );

                });

                select_noSPPB.val(null).trigger("change");
                select_noSPPB.select2("open");

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.error(err.Message);
            },
        });
    });

    $(document).on("keydown", ".select2-search__field", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();

            let noSPPB = $(this).val().trim();
            let idDivisi = select_divisi.val();

            if (!noSPPB || !idDivisi) return;

            $.ajax({
                url: "/BttbPembelian/getDataSPPBKoreksi",
                type: "GET",
                data: {
                    idDivisi: idDivisi,
                },
                success: function (res) {
                    if (!res.dataSPPB || res.dataSPPB.length === 0) {
                        alert(
                            "Tidak ada data BTTB yang bisa dikoreksi di divisi ini",
                        );
                        return;
                    }
                    select_noSPPB.append(
                        new Option(noSPPB, noSPPB, true, true),
                    );
                    select_noSPPB.trigger("change");
                    select_noSPPB.select2("close");

                    loadTerima();
                },
                error: function () {
                    alert("Gagal cek data koreksi");
                },
            });
        }
    });

    select_divisi.on("select2:clear", function () {
        select_noSPPB.empty();
        table_barang.clear().draw();
        table_terima.clear().draw();
        total_terima.value = "";
    });

    select_noSPPB.on("select2:select", function () {
        loadTerima();
    });

    select_noSPPB.on("select2:clear", function () {
        table_barang.clear().draw();
        table_terima.clear().draw();
        total_terima.value = "";
    });

    $("#createBTTBModal").on("shown.bs.modal", function (event) {
        if (proses == "isiBTTB") {
            bttb_qtyTerima.select();
            bttb_hargaPer.value = 0;
            bttb_nilaiTrans.value = 0;
            bttb_hargaPer.value = 0;
            bttb_nilaiTrans.value = 0;
            bttb_qtyTerima.value = 1;
            bttb_qtyTerimaActual.value = 1;
            bttb_qtyTerimaKoreksi.value = 0;
            bttb_qtyTerimaActualKoreksi.value = 0;
        } else if (proses == "koreksiBTTB") {
            bttb_noFaktur.select();
        }
    });

    btn_isi.addEventListener("click", function () {

        if (!selectedBarangRow) {
            Swal.fire("Error", "Pilih barang terlebih dahulu", "error");
            return;
        }

        proses = "isiBTTB";

        clearModal();

        bttb_noTerima.value = "";

        bttb_kodeBarang.value = selectedBarangRow[0];
        bttb_namaBarang.value = selectedBarangRow[1];

       let satuan = daftarSatuan.find(function (item) {
            return item.Nama_satuan.trim() === selectedBarangRow[4].trim();
        });

        if (satuan) {
            bttb_noSatTerima.value = satuan.No_satuan;
            bttb_satTerima.value = satuan.Nama_satuan;
            bttb_satTerimaActual.value = satuan.Nama_satuan;
        }

        bttb_qtyTerima.value = 1;
        bttb_qtyTerimaActual.value = 1;

        bttb_tanggal.valueAsDate = new Date();
        bttb_tanggalFaktur.valueAsDate = new Date();

        bttb_noFaktur.value = "-";
        bttb_nomorSJ.value = "";

        bttb_harga.value = 0;
        bttb_discount.value = 0;
        bttb_ppn.value = 0;
        bttb_hargaPer.value = 0;
        bttb_nilaiTrans.value = 0;
        hitungNilaiTrans();

        bttb_jangkaWaktu.value = 0;
        bttb_pembayaran.value = "TUNAI";

        getSupplier();

        $("#createBTTBModal").modal("show");

    });

    btn_koreksi.addEventListener("click", function () {
        if (!selectedTerimaRow) {
            Swal.fire("Error", "Pilih data penerimaan yang akan dikoreksi", "error");
            return;
        }

        proses = "koreksiBTTB";

        clearModal();

        // informasi barang
        bttb_kodeBarang.value = selectedBarangRow[0];
        bttb_namaBarang.value = selectedBarangRow[1];

        bttb_noTerima.value = selectedTerimaRow[15];
        bttb_tanggal.value = moment(selectedTerimaRow[1], "DD/MM/YYYY").format("YYYY-MM-DD");

        bttb_qtyTerima.value = numeral(selectedTerimaRow[2]).value();
        bttb_qtyTerimaActual.value = numeral(selectedTerimaRow[4]).value();

        bttb_qtyTerimaKoreksi.value = numeral(selectedTerimaRow[2]).value();
        bttb_qtyTerimaActualKoreksi.value = numeral(selectedTerimaRow[4]).value();

        bttb_satTerima.value = selectedTerimaRow[5];
        bttb_satTerimaActual.value = selectedTerimaRow[5];
        bttb_noSatTerima.value = selectedTerimaRow[22];

        bttb_harga.value = numeral(selectedTerimaRow[6]).value();
        bttb_discount.value = numeral(selectedTerimaRow[7]).value();
        bttb_ppn.value = numeral(selectedTerimaRow[8]).value();

        bttb_hargaPer.value = numeral(selectedTerimaRow[9]).value();
        bttb_nilaiTrans.value = numeral(selectedTerimaRow[10]).value();

        getSupplier(selectedTerimaRow[16]);

        bttb_jangkaWaktu.value = selectedTerimaRow[12];
        bttb_pembayaran.value =
            Number(selectedTerimaRow[12]) === 0 ? "TUNAI" : "KREDIT";

        bttb_noFaktur.value = selectedTerimaRow[13];
        bttb_keterangan.value = selectedTerimaRow[14];
        bttb_nomorSJ.value = selectedTerimaRow[21];

        // Mata uang
        $("#bttb_selectMataUang option").each(function () {
            if ($(this).text().trim() === selectedTerimaRow[18].trim()) {
                $("#bttb_selectMataUang")
                    .val($(this).val())
                    .trigger("change");
            }
        });

        // Kurs
        bttb_kursRupiah.value = numeral(selectedTerimaRow[19]).value();
        hitungNilaiTrans();
        $("#createBTTBModal").modal("show");

    });

    bttb_tanggal.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bttb_qtyTerima.focus();
        }
    });

    bttb_qtyTerima.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bttb_qtyTerimaActual.select();
        }
    });

    bttb_qtyTerimaActual.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bttb_tanggalFaktur.focus();
        }
    });

    bttb_tanggalFaktur.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bttb_noFaktur.focus();
        }
    });

    bttb_noFaktur.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bttb_nomorSJ.focus();
        }
    });

    bttb_nomorSJ.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bttb_selectMataUang.select2("open");
        }
    });

    [
        bttb_harga,
        bttb_discount,
        bttb_ppn,
        bttb_hargaPer,
        bttb_qtyTerimaActual
    ].forEach(function (el) {
        el.addEventListener("input", hitungNilaiTrans);
    });

    bttb_selectMataUang.on("change", function(){
        let id = $(this).val();

        if(id=="1"){
            bttb_kursRupiah.value=1;
            bttb_kursRupiah.readOnly=true;
        } else{
            bttb_kursRupiah.readOnly=false;
            bttb_kursRupiah.value=0;
        }
    });

    bttb_kursRupiah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bttb_harga.select();
        }
    });

    bttb_harga.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bttb_discount.select();
        }
    });

    bttb_discount.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bttb_ppn.select();
        }
    });

    bttb_ppn.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "12") {
                bttb_checkboxDPP.checked = true;
                bttb_divCbDPP.style.display = "block";
                bttb_checkboxDPP.focus();
            } else {
                bttb_checkboxDPP.checked = false;
                bttb_divCbDPP.style.display = "none";
                bttb_hargaPer.select();
            }
        }
    });

    bttb_checkboxDPP.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bttb_hargaPer.select();
        }
    });

    bttb_hargaPer.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();

            hitungNilaiTrans();

            bttb_jangkaWaktu.select();
        }
    });

    bttb_jangkaWaktu.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == 0) {
                bttb_pembayaran.value = "TUNAI";
            } else {
                bttb_pembayaran.value = "KREDIT";
            }
            bttb_keterangan.focus();
        }
    });

    bttb_keterangan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            bttb_jenisDokumen.focus();
        }
    });

    // btn_koreksiKurs.addEventListener("click", function (e) {
    //     e.preventDefault();
    //     $("#koreksiKursModal").modal("show");
    //     koreksiKurs_tableBarang.clear().draw();
    //     koreksiKurs_tableKurs.clear().draw();
    //     koreksiKurs_tableSales.clear().draw();
    //     koreksiKurs_tableJual.clear().draw();
    // });

    // $("#koreksiKursModal").on("shown.bs.modal", function (event) {
    //     koreksiKurs_noFaktur.value = "";
    //     koreksiKurs_kodeBarang.value = "";
    //     koreksiKurs_namaBarang.value = "";
    //     koreksiKurs_harga.value = 0;
    //     koreksiKurs_kurs.value = 0;
    //     koreksiKurs_totalBayar.value = 0;
    //     koreksiKurs_Proses.disabled = true;
    // });

    // koreksiKurs_noFaktur.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter") {
    //         $.ajax({
    //             url: "/BttbPembelian/getListSPPBKoreksiKurs",
    //             type: "GET",
    //             data: {
    //                 NoSPPB: this.value,
    //                 _token: csrfToken,
    //             },
    //             success: function (data) {
    //                 console.log(data);

    //                 if (data.error || data.length == 0) {
    //                     errorHandling("ajaxGetDataResponse", data.error);
    //                 } else {
    //                     koreksiKurs_tableBarang.clear();
    //                     // Insert ListBarang
    //                     data.forEach(function (item) {
    //                         koreksiKurs_tableBarang.row.add([
    //                             moment(item.Datang).format("MM/DD/YYYY"),
    //                             item.Kd_brg,
    //                             item.NAMA_BRG,
    //                             numeral(item.Hrg_trm).format("0,0.0000"),
    //                             numeral(item.Kurs_Rp).format("0,0.00"),
    //                             item.No_terima,
    //                         ]);
    //                     });
    //                     koreksiKurs_tableBarang.draw();
    //                 }
    //             },
    //             error: function (xhr, status, error) {
    //                 var err = eval("(" + xhr.responseText + ")");
    //                 console.error(err.Message);
    //             },
    //         });
    //     }
    // });

    // $("#koreksiKurs_tableBarang tbody").on("click", "tr", function () {
    //     let rowData = koreksiKurs_tableBarang.row(this).data();

    //     if (!rowData) {
    //         return;
    //     }

    //     // remove highlight from other rows
    //     $("#koreksiKurs_tableBarang tbody tr").removeClass("selected");
    //     // add highlight to clicked row
    //     $(this).addClass("selected");
    //     // console.log(rowData);

    //     koreksiKurs_harga.value = numeral(rowData[3]).value();
    //     koreksiKurs_kodeBarang.value = rowData[1];
    //     koreksiKurs_namaBarang.value = rowData[2];
    //     koreksiKurs_kurs.value = numeral(rowData[4]).value();
    //     koreksiKurs_nomorTerima.value = rowData[5];
    //     if (koreksiKurs_kurs.value > 0 && koreksiKurs_harga.value > 0) {
    //         koreksiKurs_kurs.dispatchEvent(enterKeyboardEvent);
    //     }
    //     koreksiKurs_kurs.select();
    // });

    // koreksiKurs_kurs.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter") {
    //         this.value = numeral(this.value).value();
    //         let harga = parseFloat(koreksiKurs_harga.value);
    //         let kurs = parseFloat(this.value);
    //         koreksiKurs_totalBayar.value = numeral(harga * kurs).format(
    //             "0,0.0000",
    //         );
    //         koreksiKurs_Proses.disabled = false;
    //         koreksiKurs_Proses.focus();
    //     }
    // });

    // koreksiKurs_Proses.addEventListener("click", function (e) {
    //     $.ajax({
    //         url: "/BttbPembelian/ProsesKoreksiKurs",
    //         type: "PUT",
    //         data: {
    //             NoSPPB: koreksiKurs_nomorTerima.value,
    //             Kurs: koreksiKurs_kurs.value,
    //             KodeBarang: koreksiKurs_kodeBarang.value,
    //             _token: csrfToken,
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             if (data.error || data.length == 0) {
    //                 errorHandling("ajaxGetDataResponse", data.error);
    //             } else {
    //                 Swal.fire({
    //                     icon: "success",
    //                     title: "Berhasil!",
    //                     text: data.success,
    //                     showConfirmButton: false,
    //                     timer: 2500,
    //                 }).then(() => {
    //                     $("#koreksiKurs_tableBarang tbody tr").removeClass(
    //                         "selected",
    //                     );
    //                     koreksiKurs_noFaktur.value = "";
    //                     koreksiKurs_kodeBarang.value = "";
    //                     koreksiKurs_namaBarang.value = "";
    //                     koreksiKurs_harga.value = 0;
    //                     koreksiKurs_kurs.value = 0;
    //                     koreksiKurs_totalBayar.value = 0;
    //                     koreksiKurs_Proses.disabled = true;
    //                 });
    //             }
    //         },
    //         error: function (xhr, status, error) {
    //             var err = eval("(" + xhr.responseText + ")");
    //             console.error(err.Message);
    //         },
    //     });
    // });

    $('#table_barang tbody').on('click', 'tr', function () {
        console.log("klik");
        let row = table_barang.row(this).data();

        console.log(row);

        if (!row) return;
        $('#table_barang tbody tr').removeClass('selected');
        $(this).addClass('selected');
        selectedBarangRow = row;
        console.log(selectedBarangRow);
        loadDetailTerima(selectedBarangRow[8]);
    });

    $("#btnCariSatuan").on("click", function () {
        if (daftarSatuan.length === 0) {
            Swal.fire(
                "Informasi",
                "Data satuan belum tersedia.",
                "info"
            );
            return;
        }

        let optionHtml = "";

        daftarSatuan.forEach(function (item) {
            optionHtml += `
                <option value="${item.No_satuan}">
                    ${item.Nama_satuan}
                </option>
            `;
        });

        Swal.fire({
            title: "Pilih Satuan",
            html: `
                <select id="swalSatuan" class="form-select">
                    ${optionHtml}
                </select>
            `,
            showCancelButton: true,
            confirmButtonText: "Pilih",
            cancelButtonText: "Batal",

            preConfirm: () => {
                return $("#swalSatuan").val();
            }

        }).then(function (result) {
            if (!result.isConfirmed)
                return;

            let noSatuan = result.value;
            let satuan = daftarSatuan.find(function (item) {
                return item.No_satuan == noSatuan;

            });

            if (!satuan)
                return;

            // isi seperti VB
            $("#bttb_noSatTerima").val(satuan.No_satuan);
            $("#bttb_satTerimaActual").val(satuan.Nama_satuan);
        });
    });

    button_modalProses.addEventListener("click", function (e) {
        e.preventDefault();
        prosesBTTB();
    });

    $('#table_terima tbody').on('click', 'tr', function () {
        let row = table_terima.row(this).data();

        if (!row) return;

        $('#table_terima tbody tr').removeClass('selected');
        $(this).addClass('selected');
        selectedTerimaRow = row;
        console.log(selectedTerimaRow);
    });
    //#endregion
});
