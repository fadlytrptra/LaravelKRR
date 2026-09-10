jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let btn_refresh = document.getElementById("btn_refresh");
    let btn_batal = document.getElementById("btn_batal");
    let btn_proses = document.getElementById("btn_proses");
    let id_divisi = document.getElementById("id_divisi");
    let nama_divisi = document.getElementById("nama_divisi");
    let id_objek = document.getElementById("id_objek");
    let nama_objek = document.getElementById("nama_objek");
    let id_kelompok = document.getElementById("id_kelompok");
    let nama_kelompok = document.getElementById("nama_kelompok");
    let id_kelompokUtama = document.getElementById("id_kelompokUtama");
    let nama_kelompokUtama = document.getElementById("nama_kelompokUtama");
    let id_subKelompok = document.getElementById("id_subKelompok");
    let nama_subKelompok = document.getElementById("nama_subKelompok");
    let btn_subKelompok = document.getElementById("btn_subKelompok");
    let id_type = document.getElementById("id_type");
    let kode_barang = document.getElementById("kode_barang");
    let nama_barang = document.getElementById("nama_barang");
    let hasil_rumusKonversi = document.getElementById("hasil_rumusKonversi");
    let primer = document.getElementById("primer");
    let sekunder = document.getElementById("sekunder");
    let tritier = document.getElementById("tritier");
    let total_pemakaianBenang = document.getElementById("total_pemakaianBenang");
    let btn_hitungBenang = document.getElementById("btn_hitungBenang");
    let satuanPrimer = document.getElementById("satuanPrimer");
    let satuanSekunder = document.getElementById("satuanSekunder");
    let satuanTritier = document.getElementById("satuanTritier");
    let btn_prosesModal = document.getElementById("btn_prosesModal");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [1, 2, 3], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });
    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });
    let table_modal = $("#table_modal").DataTable({
        // columnDefs: [{ targets: [1, 2, 3], visible: false }],
        paging: false,
        // scrollY: "300px",
        // scrollX: "300px",
        // scrollCollapse: true,
    });
    let dataSelected;
    let sAsal1 = null;
    let sAsal2 = null;

    id_divisi.disabled = true;
    nama_divisi.disabled = true;
    id_objek.disabled = true;
    nama_objek.disabled = true;
    id_kelompok.disabled = true;
    nama_kelompok.disabled = true;
    id_kelompokUtama.disabled = true;
    nama_kelompokUtama.disabled = true;
    id_subKelompok.disabled = true;
    nama_subKelompok.disabled = true;
    id_type.disabled = true;
    kode_barang.disabled = true;
    nama_barang.disabled = true;
    hasil_rumusKonversi.disabled = true;
    satuanPrimer.disabled = true;
    satuanSekunder.disabled = true;
    satuanTritier.disabled = true;

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

    primer.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (sekunder.value.trim() === '' || sekunder.value.trim() === '0') {
                sekunder.select();
                sekunder.focus();
            } else if (tritier.value.trim() === '' || tritier.value.trim() === '0') {
                tritier.select();
                tritier.focus();
            } else {
                btn_hitungBenang.focus();
            }
        }
    });

    sekunder.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (tritier.value.trim() === '' || tritier.value.trim() === '0') {
                tritier.select();
                tritier.focus();
            } else {
                btn_hitungBenang.focus();
            }
        }
    });

    function hitungHslMtr() {
        let lebar = 0, waft = 0, weft = 0, denier = 0;
        let jum = 0;

        for (let i = 0; i < nama_barang.value.length; i++) {
            if (nama_barang.value[i] === "/") {
                jum++;
                switch (jum) {
                    case 1:
                        lebar = parseFloat(nama_barang.value.substr(i + 1, 6)) || 0;
                        break;
                    case 2:
                        waft = parseFloat(nama_barang.value.substr(i + 1, 5)) || 0;
                        weft = parseFloat(nama_barang.value.substr(i + 9, 5)) || 0;
                        break;
                    case 3:
                        denier = parseFloat(nama_barang.value.substr(i + 1, 5)) || 0;
                        break;
                }
            }
        }

        let hasil = 0;
        if (id_subKelompok.value === "0629" || nama_subKelompok.value.startsWith("Kain")) {
            hasil = (10 / (lebar / 2)) / ((waft + weft) / 20) / (denier * 2 / 2000) / 0.0175;
        } else {
            hasil = (10 / lebar) / ((waft + weft) / 20) / (denier * 2 / 2000) / 0.0175;
        }

        return hasil;
    }

    tritier.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            let nilaiTritier = parseFloat(tritier.value) || 0;
            let hasilHitung = hitungHslMtr() * nilaiTritier;

            // Format hasil 2 desimal
            hasil_rumusKonversi.value = hasilHitung.toFixed(2);

            if (nilaiTritier <= 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Info',
                    text: 'Pengisian untuk Tritier salah',
                    showConfirmButton: false,
                    timer: 2500
                }).then(() => {
                    tritier.focus();
                });
            } else {
                btn_hitungBenang.focus();
            }
        }
    });

    btn_refresh.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_prosesModal.addEventListener("click", function (event) {
        event.preventDefault();
        terpilih = rowDataArray;
        // dataSelected = [...terpilih].sort((a, b) => parseInt(a.Id_order) - parseInt(b.Id_order))[0];
        dataSelected = [...terpilih].sort((a, b) => {
            return new Date(a.Tgl_Log_raw) - new Date(b.Tgl_Log_raw);
        })[0];
        console.log(dataSelected);
        if (primer.value.trim() === '' || primer.value <= 0 || tritier.value.trim() === '' || tritier.value <= 0) {
            Swal.fire({
                icon: 'info',
                title: 'Info',
                text: 'Isi dulu jumlah Roll atau Berat',
                showConfirmButton: false,
                timer: 2500
            }).then(() => {
                primer.focus();
            });
            return;
        } else {
            $.ajax({
                url: "TransferHasilMeterD",
                type: "POST",
                data: {
                    _token: csrfToken,
                    table_modal: table_modal.rows().data().toArray(),
                    Tgl_Log: dataSelected.Tgl_Log,
                    noIndek: dataSelected.noIndek,
                    id_log_awal: dataSelected.id_log_awal,
                    Id_Log: dataSelected.Id_Log,
                    Id_order: dataSelected.Id_order,
                    Id_mesin: dataSelected.Id_mesin,
                    id_type: id_type.value,
                    primer: primer.value,
                    sekunder: sekunder.value,
                    tritier: tritier.value,
                    id_subKelompok: id_subKelompok.value,
                },
                success: function (data) {
                    console.log(data);
                    if (data.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: data.message,
                            showConfirmButton: true,
                        }).then(() => {
                            location.reload();
                        });
                    } else if (data.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: data.error,
                            showConfirmButton: true,
                        });
                    }
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                },
            });
        }

    });

    btn_hitungBenang.addEventListener("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: "TransferHasilMeterD/ListTypeTujuan",
            type: "GET",
            data: {
                _token: csrfToken,
                Id_order: dataSelected.Id_order,
                kode_barang: kode_barang.value,
                table_modal: table_modal.rows().data().toArray(),
                tritier: tritier.value,
            },
            success: function (data) {
                console.log(data);
                total_pemakaianBenang.value = data.TotalBng;
                var table_modal = $("#table_modal").DataTable();

                table_modal.clear().draw();
                data.ListAsal.forEach(function (item, index) {
                    // console.log(item);
                    const newRow = {
                        KodeBarang: item[0],
                        NamaType: item[1],
                        Col1: item[2],
                        Col2: item[3],
                        Col3: item[4],
                        IdType: item[5],
                        SaldoPrimer: numeral(item[6]).format('0.00') === '0.00' ? '0' : numeral(item[6]).format('0.00'),
                        SaldoSekunder: numeral(item[7]).format('0.00') === '0.00' ? '0' : numeral(item[7]).format('0.00'),
                        SaldoTritier: numeral(item[8]).format('0.00') === '0.00' ? '0' : numeral(item[8]).format('0.00'),
                        Flag: item[9],
                        NamaSubKelompok: item[10],
                        IdSubkelompok: item[11],
                    };

                    table_modal.row
                        .add([
                            // `<input type="checkbox" name="penerimaCheckbox" value="${newRow.tglPelunasan}" /> ${newRow.tglPelunasan}`,
                            newRow.KodeBarang,
                            newRow.NamaType,
                            newRow.Col1,
                            newRow.Col2,
                            newRow.Col3,
                            newRow.IdType,
                            newRow.SaldoPrimer,
                            newRow.SaldoSekunder,
                            newRow.SaldoTritier,
                            newRow.Flag,
                            newRow.NamaSubKelompok,
                            newRow.IdSubkelompok,
                        ])
                        .draw();
                    table_modal.order([[1, "asc"]]);
                    btn_prosesModal.focus();
                });
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    let terpilih;

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        terpilih = rowDataArray;
        // dataSelected = [...terpilih].sort((a, b) => parseInt(a.Id_order) - parseInt(b.Id_order))[0];
        dataSelected = [...terpilih].sort((a, b) => {
            return new Date(a.Tgl_Log_raw) - new Date(b.Tgl_Log_raw);
        })[0];
        // console.log(dataSelected);
        if (terpilih.length < 1) {
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Tidak ada data yang dipilih.',
                confirmButtonText: 'OK'
            });
            return;
        } else {
            $.ajax({
                url: "TransferHasilMeterD/isiTujuanKonversi",
                type: "GET",
                data: {
                    _token: csrfToken,
                    Id_Log: dataSelected.Id_Log,
                    Id_mesin: dataSelected.Id_mesin,
                    Id_order: dataSelected.Id_order,
                    id_log_awal: dataSelected.id_log_awal,
                },
                success: function (data) {
                    console.log(data);
                    id_divisi.value = data[0].IdDivisi.trim();
                    nama_divisi.value = data[0].NamaDivisi.trim();
                    id_objek.value = data[0].IdObjek.trim();
                    nama_objek.value = data[0].NamaObjek.trim();
                    id_kelompok.value = data[0].IdKelompok.trim();
                    nama_kelompok.value = data[0].NamaKelompok.trim();
                    id_kelompokUtama.value = data[0].IdKelompokUtama.trim();
                    nama_kelompokUtama.value = data[0].NamaKelompokUtama.trim();
                    kode_barang.value = data[0].KodeBarang.trim();
                    sekunder.value = numeral(dataSelected.Hasil_meter).format('0');
                    if (id_divisi.value.trim() === "") {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Peringatan',
                            text: 'Cek Di Program Inventory, Pada Divisi : Circular, Objek : Produksi Roll, untuk kelutama atau kelompok atau subkel atau type ada yang belum terbentuk. Program Tidak Dapat di Lanjutkan',
                            confirmButtonText: 'OK'
                        });
                        return;
                    } else {
                        $("#modalKonversi").modal("show");
                        $("#modalKonversi").on("shown.bs.modal", function () {
                            setTimeout(() => {
                                btn_subKelompok.focus();
                            }, 300);
                        });
                    }
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                },
            });
        }


        // var myModal = new bootstrap.Modal(
        //     document.getElementById("modalKonversi"),
        //     {
        //         keyboard: false,
        //     }
        // );
        // myModal.show();
    });

    $("#modalKonversi").on("hidden.bs.modal", function () {
        hasil_rumusKonversi.value = "";
        primer.value = "";
        sekunder.value = "";
        tritier.value = "";
        total_pemakaianBenang.value = "";
        table_modal.clear().draw();
    });

    btn_subKelompok.addEventListener("click", async function (event) {
        event.preventDefault();

        // Get the currently open Bootstrap modal (if any)
        const openModalEl = document.querySelector('.modal.show');
        let bsModalInstance = null;

        if (openModalEl) {
            bsModalInstance = bootstrap.Modal.getInstance(openModalEl);
            // Disable Bootstrap’s built-in focus trap temporarily
            if (bsModalInstance._focustrap) {
                bsModalInstance._focustrap.deactivate();
            }
        }

        try {
            const result = await Swal.fire({
                title: "Select a Sub Kelompok",
                html: `<table id="subKelompokTable" class="display" style="width:100%">
                     <thead><tr><th>Nama Sub Kelompok</th><th>Id Sub Kelompok</th></tr></thead><tbody></tbody>
                   </table>`,
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#subKelompokTable")
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
                    const table = $("#subKelompokTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        ajax: {
                            url: "TransferHasilMeterD/subKelompok",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kode_barang: kode_barang.value,
                                id_kelompok: id_kelompok.value
                            },
                        },
                        columns: [
                            { data: 'NamaSubKelompok' },
                            { data: 'IdSubKelompok' },
                        ],
                        // order: [[1, "asc"]],
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                    });

                    setTimeout(() => {
                        $("#subKelompokTable_filter input").focus();
                    }, 300);

                    $("#subKelompokTable tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });

                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydownInSwal(e, "subKelompokTable")
                    );
                },
                didClose: () => {
                    // Re-enable the Bootstrap modal focus trap
                    if (bsModalInstance && bsModalInstance._focustrap) {
                        bsModalInstance._focustrap.activate();
                    }
                }
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_subKelompok.value = selectedRow.IdSubKelompok;
                    nama_subKelompok.value = selectedRow.NamaSubKelompok;

                    $.ajax({
                        url: "TransferHasilMeterD/CekTypeBarang",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            kode_barang: kode_barang.value,
                            id_subKelompok: id_subKelompok.value,
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.status) {
                                id_type.value = data.IdType.trim();
                                nama_barang.value = data.NamaType.trim();
                                satuanPrimer.value = data.satuan_primer.trim();
                                satuanSekunder.value = data.satuan_sekunder.trim();
                                satuanTritier.value = data.satuan_tritier.trim();
                                $.ajax({
                                    url: "TransferHasilMeterD/CekAsalKonversi",
                                    type: "GET",
                                    data: {
                                        _token: csrfToken,
                                        Id_mesin: dataSelected.Id_mesin,
                                        Id_order: dataSelected.Id_order,
                                    },
                                    success: function (data) {
                                        console.log(data);

                                        sAsal1 = data.A_kodebarang_warp;
                                        sAsal2 = data.A_kodebarang_weft;
                                        $.ajax({
                                            url: "TransferHasilMeterD/cekTypeKonversi",
                                            type: "GET",
                                            data: {
                                                _token: csrfToken,
                                                Id_mesin: dataSelected.Id_mesin,
                                                Id_order: dataSelected.Id_order,
                                                sAsal1: sAsal1,
                                                sAsal2: sAsal2,
                                            },
                                            success: function (data) {
                                                console.log(data);
                                                if (sAsal1 == sAsal2) {
                                                    if (data.Jumlah < 1) {
                                                        Swal.fire({
                                                            icon: 'warning',
                                                            title: 'Peringatan',
                                                            text: 'Kode Benang Utama Belum Ada, Isi Dulu di Inventory. Program Tidak dapat dilanjutkan',
                                                            confirmButtonText: 'OK'
                                                        });
                                                        $("#modalKonversi").on("hidden.bs.modal", function () {
                                                            hasil_rumusKonversi.value = "";
                                                            primer.value = "";
                                                            sekunder.value = "";
                                                            tritier.value = "";
                                                            total_pemakaianBenang.value = "";
                                                            table_modal.clear().draw();
                                                        });
                                                        return;
                                                    }
                                                } else {
                                                    if (data.Jumlah < 2) {
                                                        Swal.fire({
                                                            icon: 'warning',
                                                            title: 'Peringatan',
                                                            text: 'Kode Benang Utama Belum Ada, Isi Dulu di Inventory. Program Tidak dapat dilanjutkan',
                                                            confirmButtonText: 'OK'
                                                        });
                                                        $("#modalKonversi").on("hidden.bs.modal", function () {
                                                            hasil_rumusKonversi.value = "";
                                                            primer.value = "";
                                                            sekunder.value = "";
                                                            tritier.value = "";
                                                            total_pemakaianBenang.value = "";
                                                            table_modal.clear().draw();
                                                        });
                                                        return;
                                                    }
                                                }
                                                $.ajax({
                                                    url: "TransferHasilMeterD/CekBenangStrip",
                                                    type: "GET",
                                                    data: {
                                                        _token: csrfToken,
                                                        Id_mesin: dataSelected.Id_mesin,
                                                        Id_order: dataSelected.Id_order,
                                                    },
                                                    success: function (data) {
                                                        console.log(data);
                                                        if (data.Error == "") {
                                                            // Tidak ada error
                                                            console.log("CekBenangStrip: Berhasil");
                                                            $.ajax({
                                                                url: "TransferHasilMeterD/IsiAsalKonversi",
                                                                type: "GET",
                                                                data: {
                                                                    _token: csrfToken,
                                                                    Id_mesin: dataSelected.Id_mesin,
                                                                    Id_order: dataSelected.Id_order,
                                                                    sAsal1: sAsal1,
                                                                    sAsal2: sAsal2,
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
                                                                        var table_modal = $("#table_modal").DataTable();

                                                                        table_modal.clear().draw();
                                                                        data.data.forEach(function (item, index) {
                                                                            // console.log(item);
                                                                            const newRow = {
                                                                                KodeBarang: item.KodeBarang,
                                                                                NamaType: item.NamaType,
                                                                                Col1: item.Col1,
                                                                                Col2: item.Col2,
                                                                                Col3: item.Col3,
                                                                                IdType: item.IdType,
                                                                                SaldoPrimer: numeral(item.SaldoPrimer).format('0.00') === '0.00' ? '0' : numeral(item.SaldoPrimer).format('0.00'),
                                                                                SaldoSekunder: numeral(item.SaldoSekunder).format('0.00') === '0.00' ? '0' : numeral(item.SaldoSekunder).format('0.00'),
                                                                                SaldoTritier: numeral(item.SaldoTritier).format('0.00') === '0.00' ? '0' : numeral(item.SaldoTritier).format('0.00'),
                                                                                Flag: item.Flag,
                                                                                NamaSubKelompok: item.NamaSubKelompok,
                                                                                IdSubkelompok: item.IdSubkelompok,
                                                                            };

                                                                            table_modal.row
                                                                                .add([
                                                                                    // `<input type="checkbox" name="penerimaCheckbox" value="${newRow.tglPelunasan}" /> ${newRow.tglPelunasan}`,
                                                                                    newRow.KodeBarang,
                                                                                    newRow.NamaType,
                                                                                    newRow.Col1,
                                                                                    newRow.Col2,
                                                                                    newRow.Col3,
                                                                                    newRow.IdType,
                                                                                    newRow.SaldoPrimer,
                                                                                    newRow.SaldoSekunder,
                                                                                    newRow.SaldoTritier,
                                                                                    newRow.Flag,
                                                                                    newRow.NamaSubKelompok,
                                                                                    newRow.IdSubkelompok,
                                                                                ])
                                                                                .draw();
                                                                            table_modal.order([[1, "asc"]]);
                                                                        });
                                                                        // rowDataArray = [];
                                                                        if (primer.value.trim() === '' || primer.value.trim() === '0') {
                                                                            primer.select(); 0
                                                                            primer.focus();
                                                                        } else if (sekunder.value.trim() === '' || sekunder.value.trim() === '0') {
                                                                            sekunder.select();
                                                                            sekunder.focus();
                                                                        } else {
                                                                            tritier.select();
                                                                            tritier.focus();
                                                                        }
                                                                    }
                                                                },
                                                                error: function (xhr, status, error) {
                                                                    var err = eval("(" + xhr.responseText + ")");
                                                                    alert(err.Message);
                                                                },
                                                            });
                                                            $.ajax({
                                                                url: "TransferHasilMeterD/IsiAsalKonversi1",
                                                                type: "GET",
                                                                data: {
                                                                    _token: csrfToken,
                                                                    Id_order: dataSelected.Id_order,
                                                                    nama_kelompok: nama_kelompok.value,
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
                                                                        var table_modal = $("#table_modal").DataTable();

                                                                        // table_modal.clear().draw();
                                                                        data.data.forEach(function (item, index) {
                                                                            // console.log(item);
                                                                            const newRow = {
                                                                                KodeBarang: item.KodeBarang,
                                                                                NamaType: item.NamaType,
                                                                                Col1: item.Col1,
                                                                                Col2: item.Col2,
                                                                                Col3: item.Col3,
                                                                                IdType: item.IdType,
                                                                                SaldoPrimer: numeral(item.SaldoPrimer).format('0.00') === '0.00' ? '0' : numeral(item.SaldoPrimer).format('0.00'),
                                                                                SaldoSekunder: numeral(item.SaldoSekunder).format('0.00') === '0.00' ? '0' : numeral(item.SaldoSekunder).format('0.00'),
                                                                                SaldoTritier: numeral(item.SaldoTritier).format('0.00') === '0.00' ? '0' : numeral(item.SaldoTritier).format('0.00'),
                                                                                Ket: item.Ket,
                                                                                NamaSubKelompok: item.NamaSubKelompok,
                                                                                IdSubkelompok: item.IdSubkelompok,
                                                                            };

                                                                            table_modal.row
                                                                                .add([
                                                                                    // `<input type="checkbox" name="penerimaCheckbox" value="${newRow.tglPelunasan}" /> ${newRow.tglPelunasan}`,
                                                                                    newRow.KodeBarang,
                                                                                    newRow.NamaType,
                                                                                    newRow.Col1,
                                                                                    newRow.Col2,
                                                                                    newRow.Col3,
                                                                                    newRow.IdType,
                                                                                    newRow.SaldoPrimer,
                                                                                    newRow.SaldoSekunder,
                                                                                    newRow.SaldoTritier,
                                                                                    newRow.Ket,
                                                                                    newRow.NamaSubKelompok,
                                                                                    newRow.IdSubkelompok,
                                                                                ])
                                                                                .draw();
                                                                            table_modal.order([[1, "asc"]]);
                                                                        });
                                                                        // rowDataArray = [];
                                                                    }
                                                                },
                                                                error: function (xhr, status, error) {
                                                                    var err = eval("(" + xhr.responseText + ")");
                                                                    alert(err.Message);
                                                                },
                                                            });
                                                        } else {
                                                            // Tampilkan pesan error
                                                            Swal.fire({
                                                                icon: 'error',
                                                                title: 'Error',
                                                                text: data.Error,
                                                                confirmButtonText: 'OK'
                                                            });
                                                        }
                                                    },
                                                    error: function (xhr, status, error) {
                                                        var err = eval("(" + xhr.responseText + ")");
                                                        alert(err.Message);
                                                    },
                                                });
                                            },
                                            error: function (xhr, status, error) {
                                                var err = eval("(" + xhr.responseText + ")");
                                                alert(err.Message);
                                            },
                                        });
                                    },
                                    error: function (xhr, status, error) {
                                        var err = eval("(" + xhr.responseText + ")");
                                        alert(err.Message);
                                    },
                                });
                                // setTimeout(() => {
                                //     btn_proses.focus();
                                // }, 300);
                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Peringatan',
                                    text: 'Isi Dulu Pada Menu Type Barang Perdivisi Pada Program Inventory. Program Tidak Dapat Dilanjutkan',
                                    confirmButtonText: 'OK'
                                });
                                $("#modalKonversi").on("hidden.bs.modal", function () {
                                    hasil_rumusKonversi.value = "";
                                    primer.value = "";
                                    sekunder.value = "";
                                    tritier.value = "";
                                    total_pemakaianBenang.value = "";
                                    table_modal.clear().draw();
                                });
                                return;
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    table_atas = $("#table_atas").DataTable({
        responsive: true,
        autoWidth: false, //digunakan
        processing: true,
        serverSide: true,
        destroy: true,
        ajax: {
            url: "TransferHasilMeterD/getData",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                });
            },
        },
        columns: [
            // {
            //     data: "Tgl_Log",
            //     render: function (data) {
            //         return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
            //     },
            // },
            {
                data: 'Tgl_Log_raw',
                render: function (data, type, row) {
                    if (type === 'display') {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${row.Tgl_Log_raw}" /> ${row.Tgl_Log}`;
                    }
                    return data;
                }
            },
            { data: "Id_Log" },
            { data: "Id_order" },
            { data: "Id_mesin" },
            { data: "Nama_mesin" },
            { data: "NAMA_BRG" },
            { data: "Hasil_meter" },
            { data: "id_log_awal" },
            { data: "noIndek" },
        ],

        columnDefs: [
            { targets: [1, 2, 3], visible: false },
            { targets: 5, width: "700px" }
        ],
        paging: false,
        scrollY: "300px",
        scrollX: true,
        scrollCollapse: true,
        deferRender: true,

        initComplete: function () {
            this.api().columns.adjust();
        },

        drawCallback: function () {
            this.api().columns.adjust();
        }
    });

    // table_atas.on('init.dt', function () {
    //     setTimeout(function () {
    //         table_atas.columns.adjust();
    //     }, 100);
    // });

    let rowData;
    let rowDataArray = [];

    // Handle checkbox change events
    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowData = table_atas.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                rowDataArray.push(rowData);
                // rowDataArray = [rowData];

                console.log(rowDataArray);
                console.log(rowData, this, table_atas);
            } else {
                // rowData = null;
                // Remove the unchecked row data from the array
                rowData = table_atas.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Log
                rowDataArray = rowDataArray.filter(
                    (row) => row.Id_Log !== rowData.Id_Log
                );

                console.log(rowDataArray);
                console.log(rowData, this, table_atas);
            }
        }
    );

    $("#table_atas tbody").on("click", "tr", function (e) {
        // Cegah klik langsung di checkbox supaya tidak double trigger
        if ($(e.target).is('input[type="checkbox"]')) return;

        var $row = $(this);
        var $checkbox = $row.find('input[name="penerimaCheckbox"]');
        var data = table_atas.row(this).data();

        if ($row.hasClass("selected")) {
            // Jika sudah selected lalu diklik lagi → unselect + uncheck
            $row.removeClass("selected");
            $checkbox.prop("checked", false).trigger("change");
        } else {
            $("#table_atas tbody tr").removeClass("selected");
            //     .find('input[name="penerimaCheckbox"]').prop("checked", false);

            // Tambahkan selected + centang checkbox hanya untuk row yg diklik
            $row.addClass("selected");
            $checkbox.prop("checked", true).trigger("change");

            // Simpan data selected terakhir (optional, kalau perlu banyak simpan pakai array rowDataArray)
            // dataSelected = data;
            // console.log("Selected:", data);

            // Load table_bawah sesuai data selected
            table_bawah = $("#table_bawah").DataTable({
                responsive: true,
                autoWidth: false,
                processing: true,
                serverSide: true,
                destroy: true,
                ajax: {
                    url: "TransferHasilMeterD/getDetail",
                    dataType: "json",
                    type: "GET",
                    data: function (d) {
                        return $.extend({}, d, {
                            _token: csrfToken,
                            Id_Log: data.Id_Log,
                            Id_mesin: data.Id_mesin,
                            Id_order: data.Id_order,
                            id_log_awal: data.id_log_awal,
                        });
                    },
                },
                columns: [
                    { data: "Id_Log" },
                    { data: "Tgl_Log" },
                    { data: "Shift" },
                    { data: "nama_status_log" },
                    { data: "Counter_mesin_awal" },
                    { data: "Counter_mesin_akhir" },
                    { data: "Awal_jam_kerja" },
                    { data: "Akhir_jam_kerja" },
                ],
                paging: false,
                scrollY: "300px",
                scrollX: true,
                scrollCollapse: true,
                deferRender: true,

                initComplete: function () {
                    this.api().columns.adjust();
                },

                drawCallback: function () {
                    this.api().columns.adjust();
                }
            });
        }
    });
});