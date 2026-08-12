jQuery(function ($) {
    //#region Variable
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let select_divisi = $("#select_divisi");
    let button_redisplay = document.getElementById("button_redisplay");
    let terima_divisi = document.getElementById("terima_divisi");
    let terima_objek = document.getElementById("terima_objek");
    let terima_kelompok = document.getElementById("terima_kelompok");
    let terima_kodeBarang = document.getElementById("terima_kodeBarang");
    let terima_kelompokUtama = document.getElementById("terima_kelompokUtama");
    let terima_subKelompok = document.getElementById("terima_subKelompok");
    let terima_idSubKelompok = document.getElementById("terima_idSubKelompok");
    let terima_idType = document.getElementById("terima_idType");
    let terima_namaType = document.getElementById("terima_namaType");
    let terima_qtyPesan = document.getElementById("terima_qtyPesan");
    let terima_satQtyPesan = document.getElementById("terima_satQtyPesan");
    let terima_qtyTerima = document.getElementById("terima_qtyTerima");
    let terima_satQtyTerima = document.getElementById("terima_satQtyTerima");
    let terima_saldoAkhirPrimer = document.getElementById("terima_saldoAkhirPrimer"); // prettier-ignore
    let terima_satSaldoAkhirPrimer = document.getElementById("terima_satSaldoAkhirPrimer"); // prettier-ignore
    let terima_saldoAkhirSekunder = document.getElementById("terima_saldoAkhirSekunder"); // prettier-ignore
    let terima_satSaldoAkhirSekunder = document.getElementById("terima_satSaldoAkhirSekunder"); // prettier-ignore
    let terima_saldoAkhirTritier = document.getElementById("terima_saldoAkhirTritier"); // prettier-ignore
    let terima_satSaldoAkhirTritier = document.getElementById("terima_satSaldoAkhirTritier"); // prettier-ignore
    let terima_jumlahTerimaPrimer = document.getElementById("terima_jumlahTerimaPrimer"); // prettier-ignore
    let terima_satJumlahTerimaPrimer = document.getElementById("terima_satJumlahTerimaPrimer"); // prettier-ignore
    let terima_jumlahTerimaSekunder = document.getElementById("terima_jumlahTerimaSekunder"); // prettier-ignore
    let terima_satJumlahTerimaSekunder = document.getElementById("terima_satJumlahTerimaSekunder"); // prettier-ignore
    let terima_jumlahTerimaTritier = document.getElementById("terima_jumlahTerimaTritier"); // prettier-ignore
    let terima_satJumlahTerimaTritier = document.getElementById("terima_satJumlahTerimaTritier"); // prettier-ignore
    let terima_noSatPrimer = document.getElementById("terima_noSatPrimer");
    let terima_noSatSekunder = document.getElementById("terima_noSatSekunder");
    let terima_noSatTritier = document.getElementById("terima_noSatTritier");
    let button_transfer = document.getElementById("button_transfer"); // prettier-ignore
    let table_trasferBarang = $("#table_trasferBarang").DataTable({
        info: false,
        searching: false,
        paging: false,
        ordering: false,
    });
    let modeSaldo = 0;
    let pakaiAturanKonversi = "T";
    let konvSekunderKePrimer = 0;
    let konvTritierKeSekunder = 0;
    //#endregion

    //#region Load Form
    init();
    getDivisi();
    terima_jumlahTerimaPrimer.readOnly = true;
    terima_jumlahTerimaSekunder.readOnly = true;
    terima_jumlahTerimaTritier.readOnly = true;
    //#endregion

    //#region Function
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
            url: "/Kencana/TransferBarang/divisi",
            type: "GET",
            data: {
                _token: csrfToken,
            },
            success: function (response) {
                if (!response.status) {
                    errorHandling("ajaxGetDataResponse", response.message);
                    return;
                }

                select_divisi.empty();
                select_divisi.append(
                    new Option("-- Pilih Divisi --", "")
                );

                response.data.forEach(function (item) {
                    select_divisi.append(
                        new Option(
                            item.NM_DIV.trim(),
                            item.KD_DIV.trim()
                        )
                    );
                });
                select_divisi.trigger("change");
            },
            error:function(xhr){
                console.log(xhr.status);
                console.log(xhr.responseText);
                Swal.fire({
                    icon:"error",
                    title:"Error",
                    text:xhr.responseText
                });
            },
        });
    }

    function init() {
        tgl_awal.valueAsDate = new Date();
        tgl_akhir.valueAsDate = new Date();

        select_divisi.select2({
            dropdownParent: $("#select2DropdownParent"),
            allowClear: true,
            placeholder: "Pilih Divisi",
        });

        $("#select_divisi").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
        select_divisi.val(null).trigger("change");
        tgl_awal.focus();
    }

    function errorHandling(jenisError, data) {
        if (jenisError == "invalidInput") {
            Swal.fire({
                icon: "error",
                title: "Terjadi Kesalahan!",
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
        }
    }

    function loadBTTB() {
        console.log("loadBTTB dipanggil");
        console.log({
            tgl_awal: tgl_awal.value,
            tgl_akhir: tgl_akhir.value,
            kd_div: select_divisi.val()
        });
        $.ajax({
            url: "/Kencana/TransferBarang/load",
            type: "GET",
            data: {
                tgl_awal: tgl_awal.value,
                tgl_akhir: tgl_akhir.value,
                kd_div: select_divisi.val()
            },
            success:function(response){
                console.log("Response:", response);
                table_trasferBarang.clear().draw();
                if(!response.status){
                    errorHandling(
                        "ajaxGetDataResponse",
                        response.message
                    );
                    return;
                }

                response.data.forEach(function(item){
                    table_trasferBarang.row.add([
                        moment(item.Datang).format("DD/MM/YYYY"),
                        item.kategori,
                        item.sub_kategori,
                        item.Kd_brg,
                        item.NAMA_BRG,
                        numeral(item.Qty).format("0,0"),
                        item.Nama_satuan,
                        item.Kd_div,
                        item.No_terima,
                        numeral(item.Hrg_trm).format("0,0.00"),
                        item.NoSatuan,
                        numeral(item.Qty_Terima).format("0,0"),
                        item.Satuan_Terima,
                        item.IdMataUang,
                        numeral(item.Kurs_Rp).format("0,0.00"),
                        item.nmSatTerima
                    ]);
                });
                table_trasferBarang.draw();
                clearTerima();
            },
            error:function(xhr){
                console.log(xhr.status);
                console.log(xhr.responseText);
                Swal.fire({
                    icon:"error",
                    title:"Error",
                    text:xhr.responseText
                });
            },
        });
    }

    function clearTerima() {
        terima_divisi.value = "";
        terima_objek.value = "";
        terima_kelompok.value = "";
        terima_kodeBarang.value = "";
        terima_kelompokUtama.value = "";
        terima_subKelompok.value = "";
        terima_idSubKelompok.value = "";
        terima_idType.value = "";
        terima_namaType.value = "";
        terima_qtyPesan.value = "";
        terima_satQtyPesan.value = "";
        terima_qtyTerima.value = "";
        terima_satQtyTerima.value = "";
        terima_saldoAkhirPrimer.value = "";
        terima_satSaldoAkhirPrimer.value = "";
        terima_saldoAkhirSekunder.value = "";
        terima_satSaldoAkhirSekunder.value = "";
        terima_saldoAkhirTritier.value = "";
        terima_satSaldoAkhirTritier.value = "";
        terima_jumlahTerimaPrimer.value = "";
        terima_satJumlahTerimaPrimer.value = "";
        terima_jumlahTerimaSekunder.value = "";
        terima_satJumlahTerimaSekunder.value = "";
        terima_jumlahTerimaTritier.value = "";
        terima_satJumlahTerimaTritier.value = "";
        terima_noSatPrimer.value = "";
        terima_noSatSekunder.value = "";
        terima_noSatTritier.value = "";
        terima_jumlahTerimaPrimer.readOnly = false;
        terima_jumlahTerimaSekunder.readOnly = false;
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

    // Helper function to scroll selected row into view
    function scrollRowIntoView(rowElement) {
        rowElement.scrollIntoView({ block: "nearest" });
    }

    function cekKonversi(noSatTerima) {
        $.ajax({
            url: "/Kencana/TransferBarang/konversi",
            type: "GET",
            data: {
                kd_barang: terima_kodeBarang.value,
                id_type: terima_idType.value,
                id_subkelompok: terima_idSubKelompok.value
            },

            success: function (response) {
                if (!response.status) {
                    errorHandling(
                        "ajaxGetDataResponse",
                        response.message
                    );
                    return;
                }

                if (response.data.length === 0) {
                    errorHandling(
                        "ajaxGetDataResponse",
                        "Data konversi tidak ditemukan."
                    );
                    return;
                }

                let data = response.data[0];

                pakaiAturanKonversi = data.PakaiAturanKonversi;
                konvSekunderKePrimer = numeral(data.KonvSekunderKePrimer).value();
                konvTritierKeSekunder = numeral(data.KonvTritierKeSekunder).value();

                cekIDType(data, noSatTerima);
            },

            error: function (xhr) {
                errorHandling(
                    "ajaxGetDataResponse",
                    xhr.responseJSON?.message ??
                    "Terjadi kesalahan."
                );
            }
        });
    }

    function isiDetailBarang(data, rowData) {
        console.log(data);
        terima_divisi.value = data.NamaDivisi ?? "";
        terima_objek.value = data.NamaObjek ?? "";
        terima_kelompok.value = data.NamaKelompok ?? "";
        terima_kodeBarang.value = data.KodeBarang ?? "";
        terima_kelompokUtama.value = data.NamaKelompokUtama ?? "";
        terima_subKelompok.value = data.NamaSubKelompok ?? "";
        terima_idSubKelompok.value = data.IdSubkelompok;
        terima_idType.value = data.IdType;
        terima_namaType.value = data.NamaType ?? "";
        // Qty
        terima_qtyPesan.value = numeral(rowData[5]).value();
        terima_satQtyPesan.value = rowData[6];
        terima_qtyTerima.value = numeral(rowData[11]).value();
        terima_satQtyTerima.value = rowData[12];
        // Saldo
        terima_satSaldoAkhirPrimer.value = satuan(data.Primer);
        terima_satSaldoAkhirSekunder.value = satuan(data.Sekunder);
        terima_satSaldoAkhirTritier.value = satuan(data.Tritier);
        terima_satJumlahTerimaPrimer.value = satuan(data.Primer);
        terima_satJumlahTerimaSekunder.value = satuan(data.Sekunder);
        terima_satJumlahTerimaTritier.value = satuan(data.Tritier);
        // Transfer
        terima_satJumlahTerimaPrimer.value = data.Primer == null ? "" : data.Primer.trim();
        terima_satJumlahTerimaSekunder.value = data.Sekunder == null ? "" : data.Sekunder.trim();
        terima_satJumlahTerimaTritier.value = data.Tritier == null ? "" : data.Tritier.trim();
        terima_noSatPrimer.value = data.UnitPrimer;
        terima_noSatSekunder.value = data.UnitSekunder;
        terima_noSatTritier.value = data.UnitTritier;
        cekKonversi(rowData[12]);
    }

    function satuan(value) {
        if (value == null)
            return "";

        value = value.trim();
        if (value.toUpperCase() === "NULL")
            return "";
        return value;
    }


    function popupType(data, rowData) {
        let html = '<table class="table table-bordered table-hover">';
        html += `
            <thead>
                <tr>
                    <th>Id Type</th>
                    <th>Nama Type</th>
                    <th>Sub Kelompok</th>
                </tr>
            </thead>
            <tbody>
        `;

        data.forEach(function(item){
            html += `
                <tr class="pilihType"
                    data-idtype="${item.IdType}"
                    data-idsub="${item.IdSubkelompok}">
                    <td>${item.IdType}</td>
                    <td>${item.NamaType}</td>
                    <td>${item.NamaSubKelompok}</td>
                </tr>
            `;
        });

        html += "</tbody></table>";
        Swal.fire({
            title: "Pilih Type",
            html: html,
            width: "900px",
            showConfirmButton: false,
            didOpen: () => {
                $(".pilihType").click(function(){
                    let idType = $(this).data("idtype");
                    let selected = data.find(x => x.IdType == idType);

                    isiDetailBarang(selected,rowData);
                    Swal.close();
                });
            }
        });
    }

    function resetSaldo() {
        terima_jumlahTerimaPrimer.readOnly = true;
        terima_jumlahTerimaSekunder.readOnly = true;
        terima_jumlahTerimaTritier.readOnly = true;
        terima_jumlahTerimaPrimer.value = 0;
        terima_jumlahTerimaSekunder.value = 0;
        terima_jumlahTerimaTritier.value = 0;
    }

    function isiSaldo(mode) {
        resetSaldo();
        console.log("isiSaldo :", mode);
        let qty = numeral(terima_qtyTerima.value).value();
        modeSaldo = mode;
        switch (mode) {
            case 1:
                terima_jumlahTerimaPrimer.value = qty;
                terima_jumlahTerimaSekunder.readOnly = false;
                terima_jumlahTerimaTritier.readOnly = false;
                terima_jumlahTerimaSekunder.focus();
                terima_jumlahTerimaSekunder.select();
                break;
            case 2:
                terima_jumlahTerimaSekunder.value = qty;
                terima_jumlahTerimaPrimer.readOnly = false;
                terima_jumlahTerimaTritier.readOnly = false;
                terima_jumlahTerimaPrimer.focus();
                terima_jumlahTerimaPrimer.select();
                break;
            case 3:
                terima_jumlahTerimaTritier.value = qty;
                terima_jumlahTerimaPrimer.readOnly = false;
                terima_jumlahTerimaSekunder.readOnly = false;
                terima_jumlahTerimaPrimer.focus();
                terima_jumlahTerimaPrimer.select();
                break;
        }
    }

    function cekIDType(data, noSatTerima) {
        pakaiAturanKonversi = data.PakaiAturanKonversi;

        konvSekunderKePrimer =
            numeral(data.KonvSekunderKePrimer).value();

        konvTritierKeSekunder =
            numeral(data.KonvTritierKeSekunder).value();

        resetSaldo();

        let qty = numeral(terima_qtyTerima.value).value();

        if (pakaiAturanKonversi === "Y") {

            terima_jumlahTerimaPrimer.value = qty;
            return;
        }

        console.log("No Sat Terima :", noSatTerima);
        console.log("Primer :", data.UnitPrimer);
        console.log("Sekunder :", data.UnitSekunder);
        console.log("Tritier :", data.UnitTritier);

        if (noSatTerima == data.UnitPrimer.trim()) {

            console.log("Mode 1");

            isiSaldo(1);

        }
        else if (noSatTerima == data.UnitSekunder.trim()) {

            console.log("Mode 2");

            isiSaldo(2);

        }
        else if (noSatTerima == data.UnitTritier.trim()) {

            console.log("Mode 3");

            isiSaldo(3);

        }
        else {

            console.log("Tidak cocok");

        }

    }


    //#endregion

    //#region Event Listener
    tgl_awal.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            tgl_akhir.focus();
        }
    });

    tgl_akhir.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            select_divisi.select2("open");
        }
    });

    select_divisi.on("select2:select", function () {
        button_redisplay.focus();
    });

    button_redisplay.addEventListener("click", function (e) {
        if (tgl_awal.value > tgl_akhir.value) {
            errorHandling("invalidInput", "Silahkan cek Tanggal Terima Barang");
            return;
        }

        if (select_divisi.val() == null) {
            errorHandling("invalidInput", "Divisi belum dipilih");
            return;
        }
        loadBTTB();
    });

    $("#table_trasferBarang tbody").on("click", "tr", function () {
        let rowData = table_trasferBarang.row(this).data();

        if (!rowData) {
            return;
        }

        // remove highlight from other rows
        $("#table_trasferBarang tbody tr").removeClass("selected");
        // add highlight to clicked row
        $(this).addClass("selected");
        clearTerima();
        // Cek id type
        console.log("=== CEK KODE BARANG ===");
        console.log("rowData:", rowData);
        console.log("rowData[3]:", rowData[3]);
        console.log("typeof:", typeof rowData[3]);
        $.ajax({
            url: "/Kencana/TransferBarang/detail",
            type: "GET",
            data: {
                kd_barang: rowData[3],
            },
            success: function (response) {
                console.log("=== DETAIL TRANSFER ===");
                console.log("Kode Barang:", rowData[3]);
                console.log("Response:", response);
                console.log("Multiple:", response.multiple);
                console.log("Data:", response.data);
                console.log("Jumlah Data:", response.data?.length);
                if (!response.status) {
                    errorHandling(
                        "ajaxGetDataResponse",
                        response.message
                    );
                    return;
                }

                if (!response.data.length) {
                    errorHandling(
                        "ajaxGetDataResponse",
                        "Kode barang tidak dapat ditransfer."
                    );
                    return;
                }

                if (!response.multiple) {
                    isiDetailBarang(
                        response.data[0],
                        rowData
                    );
                }

                else {
                    popupType(response.data,rowData);
                }

            },
            error:function(xhr){
                console.log(xhr.status);
                console.log(xhr.responseText);
                Swal.fire({
                    icon:"error",
                    title:"Error",
                    text:xhr.responseText
                });
            },
        });
    });

    terima_jumlahTerimaPrimer.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            terima_jumlahTerimaPrimer.value = numeral(this.value).value();
            terima_jumlahTerimaSekunder.select();
        }
    });

    terima_jumlahTerimaSekunder.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            terima_jumlahTerimaSekunder.value = numeral(this.value).value();
            terima_jumlahTerimaTritier.select();
        }
    });

    terima_jumlahTerimaTritier.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            terima_jumlahTerimaTritier.value = numeral(this.value).value();
            button_transfer.focus();
        }
    });

    button_transfer.addEventListener("click", function (e) {
        let selectedRow = $("#table_trasferBarang tbody tr.selected");

        if (!selectedRow.length) {
            errorHandling(
                "invalidInput",
                "Tidak ada barang untuk ditransfer. Anda harus memilih barang yang akan ditransfer"
            );
            return;
        }

        let rowData = table_trasferBarang.row(selectedRow).data();

        function isValidNumber(val) {
            const num = numeral(val).value();
            return Number.isFinite(num);
        }

        if (!isValidNumber(terima_jumlahTerimaPrimer.value) || !isValidNumber(terima_jumlahTerimaSekunder.value) || !isValidNumber(terima_jumlahTerimaTritier.value)) {
            errorHandling(
                "invalidInput",
                "Jumlah terima harus berupa angka yang valid"
            );
            return;
        }

        Swal.fire({
            title: "Data Yang Akan Ditransfer Sudah Benar?",
            confirmButtonText: "Ya",
            showDenyButton: true,
            denyButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/Kencana/TransferBarang/1",
                    type: "PUT",
                    data: {
                        _token: csrfToken,
                        _method: "PUT",

                        id_type: terima_idType.value,

                        primer: numeral(
                            terima_jumlahTerimaPrimer.value
                        ).value(),

                        sekunder: numeral(
                            terima_jumlahTerimaSekunder.value
                        ).value(),

                        tritier: numeral(
                            terima_jumlahTerimaTritier.value
                        ).value(),

                        sub_kelompok: terima_idSubKelompok.value,

                        no_terima: rowData[8],

                        kd_barang: terima_kodeBarang.value,

                        // Qty penerimaan
                        qty: numeral(rowData[11]).value(),

                        // Qty asli = jumlah Tritier
                        qty_asli: numeral(
                            terima_jumlahTerimaTritier.value
                        ).value(),

                        // Harga penerimaan
                        hrg_trm: numeral(rowData[9]).value(),

                        // Satuan Tritier
                        satuan: terima_noSatTritier.value,

                        // Kurs
                        exchange_rate: numeral(rowData[14]).value(),

                        // Mata uang
                        id_mata_uang: rowData[13]
                    },

                    success: function (data) {
                        if (!data.status) {
                            errorHandling(
                                "ajaxGetDataResponse",
                                data.message
                            );
                            return;
                        }

                        Swal.fire({
                            icon: "success",
                            title: "Berhasil!",
                            text: "Proses transfer sudah selesai",
                            showConfirmButton: false,
                            timer: 1500
                        });

                        clearTerima();
                        table_trasferBarang.clear().draw();
                        loadBTTB();
                    },

                    error: function (xhr) {
                        errorHandling(
                            "ajaxGetDataResponse",
                            xhr.responseJSON?.message ??
                            "Terjadi kesalahan."
                        );
                    }
                });
            }
        });
    });
    //#endregion
});
