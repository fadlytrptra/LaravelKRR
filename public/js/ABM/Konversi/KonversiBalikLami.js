jQuery(function ($) {
    //#region Get element by ID
    let nomorUser = document.getElementById("nomorUser").value; // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let button_tambahKonversi = document.getElementById("button_tambahKonversi"); //prettier-ignore
    let div_tabelDaftarBarcode = document.getElementById("div_tabelDaftarBarcode"); //prettier-ignore
    let table_daftarBarcode = $("#table_daftarBarcode").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        autoWidth: false,
        ajax: {
            url: "/KonversiBalikLami/getBarcodeAktif",
            type: "GET",
        },
        ordering: false,
        order: [8, "desc"],
        columns: [
            {
                data: "Barcode",
                width: "14%",
            },
            {
                data: "NAMA_BRG",
                width: "36%",
            },
            {
                data: "JumlahPrimer",
                width: "8%",
            },
            {
                data: "JumlahSekunder",
                width: "8%",
            },
            {
                data: "JumlahTritier",
                width: "8%",
            },
            {
                data: "IdKonversi",
                visible: false,
            },
            {
                data: "IdOrderKerja",
                width: "5%",
            },
            {
                data: "UraianDetailTransaksi",
                width: "12%",
                render: function (data, type, full) {
                    if (data.toLowerCase().includes("sisa konversi")) {
                        return "Barcode Sisa Konversi";
                    } else if (data.toLowerCase().includes("tujuan konversi")) {
                        return "Hasil Konversi";
                    }
                },
            },
            {
                data: "IdTransaksi",
                render: function (data, type, full) {
                    return `<button class="btn btn-success btn-cetakUlang" data-id="${data}" id="button_cetakBarcode">Cetak Ulang</button>`;
                },
                width: "8%",
            },
        ],
    });
    let inputBuffer = ""; // Buffer to store the input from the scanner
    let inputTimer; // Timer to check the speed of input
    const scannerThreshold = 50; // Time in milliseconds; adjust based on your scanner speed
    let table_asalKonversi = $("#table_asalKonversi").DataTable({
        responsive: true,
        autoWidth: false,
        searching: false,
        paging: false,
        ordering: false,
        info: false,
        columns: [
            { name: "Barcode", width: "15%" }, // Barcode Asal
            { name: "NamaType", width: "30%" }, // Nama Type Asal
            { name: "JumlahPrimer", width: "13%", className: "text-end" }, // Jumlah Primer
            { name: "JumlahSekunder", width: "13%", className: "text-end" }, // Jumlah Sekunder
            { name: "JumlahTritier", width: "14%", className: "text-end" }, // Jumlah Tritier
            {
                name: "PengeluaranSekunder",
                width: "13%",
                className: "text-end",
                // visible: false,
            }, // Pengeluaran Sekunder
            {
                name: "PengeluaranTritier",
                width: "14%",
                className: "text-end",
                // visible: false,
            }, // Pengeluaran Tritier
            {
                name: "SisaPersenTritier",
                width: "14%",
                className: "text-end",
                // visible: false,
            }, // Sisa Persen Tritier
            {
                width: "15%",
                render: function (data, type, full) {
                    return `<button class="btn btn-danger btn-cancelBarcodeAsal">Hapus🗑️</button>`;
                },
            }, // Aksi
        ],
    });
    let table_tujuanKonversi = $("#table_tujuanKonversi").DataTable({
        responsive: true,
        autoWidth: false,
        searching: false,
        paging: false,
        ordering: false,
        info: false,
        columns: [
            { name: "NamaType", width: "45%" }, // Nama Type
            { name: "JumlahPrimer", width: "13%", className: "text-end" }, // Jumlah Primer
            { name: "JumlahSekunder", width: "13%", className: "text-end" }, // Jumlah Sekunder
            { name: "JumlahTritier", width: "14%", className: "text-end" }, // Jumlah Tritier
            {
                width: "15%",
                render: function (data, type, full) {
                    return `<button class="btn btn-danger btn-cancelBarcodeTujuan">Hapus🗑️</button>`;
                },
            }, // Aksi
        ],
    });
    let barcodeBalikLamiModal = document.getElementById("barcodeBalikLamiModal"); //prettier-ignore
    let barcodeBalikLamiModalLabel = document.getElementById("barcodeBalikLamiModalLabel"); //prettier-ignore
    let input_barcodeTambahan = document.getElementById("input_barcodeTambahan"); //prettier-ignore
    let btn_tambahBarcodeAsal = document.getElementById("btn_tambahBarcodeAsal"); //prettier-ignore
    let input_tanggalKonversi = document.getElementById("input_tanggalKonversi"); //prettier-ignore
    let shiftBL = document.getElementById("shiftBL");
    let div_selectMesin = document.getElementById("div_selectMesin");
    const select_mesin = $("#select_mesin");
    let idOrderKerja = document.getElementById("idOrderKerja");
    let nomor_ok = document.getElementById("nomor_ok");
    let kode_barangHasil = document.getElementById("kode_barangHasil");
    let nama_barangHasil = document.getElementById("nama_barangHasil");
    let afalan_setting = document.getElementById("afalan_setting");
    let btn_timbangAfalan = document.getElementById("btn_timbangAfalan");
    let label_hasilPcs = document.getElementById("label_hasilPcs");
    let hasil_pcs = document.getElementById("hasil_pcs");
    let hasil_kg = document.getElementById("hasil_kg");
    let btn_timbang = document.getElementById("btn_timbang");
    let pemakaian_typePrimerAsal = document.getElementById("pemakaian_typePrimerAsal"); //prettier-ignore
    let satuan_pemakaianTypePrimerAsal = document.getElementById("satuan_pemakaianTypePrimerAsal"); //prettier-ignore
    let pemakaian_typeSekunderAsal = document.getElementById("pemakaian_typeSekunderAsal"); //prettier-ignore
    let satuan_pemakaianTypeSekunderAsal = document.getElementById("satuan_pemakaianTypeSekunderAsal"); //prettier-ignore
    let pemakaian_TritierAsal = document.getElementById("pemakaian_TritierAsal"); //prettier-ignore
    let satuan_pemakaianTritierAsal = document.getElementById("satuan_pemakaianTritierAsal"); //prettier-ignore
    let btn_tambahBarcodeTujuan = document.getElementById("btn_tambahBarcodeTujuan"); //prettier-ignore
    let button_modalProses = document.getElementById("button_modalProses");
    let kodeBarangAsal,
        nomorIndeksBarangAsal,
        dataMesinTemp,
        panjangRoll,
        checkIdType,
        selisihKonversiPersen;
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

    function initializeSelect2() {
        select_mesin.select2({
            dropdownParent: $("#div_selectMesin"),
            allowClear: true,
            placeholder: "Pilih Mesin",
        });

        $("#select_mesin").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
    }

    function InitModal() {
        input_tanggalKonversi.valueAsDate = new Date();
        shiftBL.value = "";
        select_mesin.val(null).trigger("change");
        idOrderKerja.value = "";
        nomor_ok.value = "";
        kode_barangHasil.value = "";
        nama_barangHasil.value = "";
        table_asalKonversi.clear().draw();
        table_tujuanKonversi.clear().draw();
        afalan_setting.value = 0;
        hasil_pcs.value = 0;
        hasil_kg.value = 0;
    }

    function hitungPemakaianRoll() {
        let totalTritierBarcodeTujuan = table_tujuanKonversi.column(3).data().reduce((a, b) => parseFloat(a) + parseFloat(b), 0); // prettier-ignore
        let remainingTritier =
            parseFloat(hasil_kg.value) + parseFloat(afalan_setting.value) + totalTritierBarcodeTujuan; // prettier-ignore
        let pemakaianSekunder = 0;
        let pemakaianPrimer = 0;

        let dt = table_asalKonversi;

        // Loop DataTables rows
        dt.rows().every(function () {
            let row = this.data();

            let primer = parseFloat(row[2]); // Jumlah Primer
            let sekunder = parseFloat(row[3]); // Jumlah Sekunder
            let tritier = parseFloat(row[4]); // Jumlah Tritier

            let pakaiPrimer = 0;
            let pakaiSekunder = 0;
            let pakaiTritier = 0;

            let persenSisaTritier = 0;

            if (remainingTritier > 0) {
                if (remainingTritier >= tritier) {
                    // FULL usage
                    pakaiPrimer = primer;
                    pakaiSekunder = sekunder;
                    pakaiTritier = tritier;

                    remainingTritier -= tritier;
                    pemakaianPrimer += primer;
                    pemakaianSekunder += sekunder;
                    persenSisaTritier = 0;
                } else {
                    // PARTIAL usage
                    let ratio = remainingTritier / tritier;

                    pakaiPrimer = primer;
                    pakaiSekunder = sekunder * ratio;
                    pakaiTritier = remainingTritier;

                    persenSisaTritier = 100 - ratio * 100;

                    if (persenSisaTritier < 5) {
                        pemakaianPrimer += pakaiPrimer;
                    }

                    pemakaianSekunder += pakaiSekunder;
                    remainingTritier = 0;
                }
            }

            // Update DataTables row: col 5 = PengeluaranSekunder, col 6 = PengeluaranTritier
            row[5] = pakaiSekunder.toFixed(2);
            row[6] = pakaiTritier.toFixed(2);
            row[7] = persenSisaTritier.toFixed(2);

            this.data(row); // commit change
        });

        // Update fields (your existing behaviour)
        pemakaian_TritierAsal.value = (
            parseFloat(hasil_kg.value) +
            parseFloat(afalan_setting.value) +
            parseFloat(totalTritierBarcodeTujuan)
        ).toFixed(2);
        pemakaian_typeSekunderAsal.value = pemakaianSekunder.toFixed(2);
        pemakaian_typePrimerAsal.value = pemakaianPrimer.toFixed(2);
    }

    function checkUnusedRows() {
        let rows = table_asalKonversi.rows().data().toArray();

        if (rows.length === 0) return false;

        let hasilKg = parseFloat(hasil_kg.value) || 0;

        // Remaining balance after using each row
        let remaining = hasilKg;

        for (let i = 0; i < rows.length; i++) {
            let tritier = parseFloat(rows[i][4]) || 0;

            if (remaining >= tritier) {
                // This row is fully used → subtract and continue
                remaining -= tritier;
            } else {
                // This is the FIRST row where usage breaks
                // Everything after THIS row is unused
                let unusedRowsExist = i < rows.length - 1;

                return unusedRowsExist; // true = unused rows exist
            }
        }

        // If loop finishes, no unused rows
        return false;
    }

    function getDataMesin() {
        $.ajax({
            url: "/KonversiBalikLami/getDataMesin",
            type: "GET",
            data: {
                _token: csrfToken,
            },
            success: function (data) {
                console.log(data);
                if (data.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: data.error,
                        showConfirmButton: false,
                    });
                } else {
                    dataMesinTemp = data.dataMesin;
                    console.log(dataMesinTemp);

                    select_mesin.empty();
                    data.dataMesin.forEach(function (item) {
                        select_mesin.append(
                            new Option(item.NamaMesin, item.IdMesin), // prettier-ignore
                        );
                    });
                    select_mesin.val(null).trigger("change");
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.error(err.Message);
            },
        });
    }

    function inputBarcodeAsal(nomorIndeks, kodeBarang, jenisInput) {
        $.ajax({
            url: "/KonversiBalikLami/getDataKonversiAsalBalikLami",
            type: "GET",
            data: {
                _token: csrfToken,
                nomorIndeksBarangAsal: nomorIndeks,
                kodeBarangAsal: kodeBarang,
            },
            success: function (data) {
                console.log(data);
                if (data.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: data.error,
                        showConfirmButton: false,
                    });
                } else if (data.dataBarcode.length < 1) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Barcode tidak ditemukan!",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                } else {
                    if (jenisInput == "awal") {
                        pemakaian_typePrimerAsal.value = 0;
                        satuan_pemakaianTypePrimerAsal.value = data.dataBarcode[0].satPrimer.trim(); // prettier-ignore
                        pemakaian_typeSekunderAsal.value = 0;
                        satuan_pemakaianTypeSekunderAsal.value = data.dataBarcode[0].satSekunder.trim(); // prettier-ignore
                        pemakaian_TritierAsal.value = 0;
                        satuan_pemakaianTritierAsal.value = data.dataBarcode[0].satTritier.trim(); // prettier-ignore
                        $("#barcodeBalikLamiModal").modal("show");
                        label_hasilPcs.innerText = "Hasil (" + data.dataBarcode[0].satSekunder.trim() + ") "; // prettier-ignore
                        getDataMesin();
                    } else {
                        if (
                            satuan_pemakaianTypeSekunderAsal.value !==
                            data.dataBarcode[0].satSekunder.trim()
                        ) {
                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: "Satuan Sekunder tidak sesuai dengan barcode sebelumnya!",
                                showConfirmButton: false,
                            });
                            return;
                        }
                    }
                    table_asalKonversi.row
                        .add([
                            nomorIndeks + '-' + kodeBarang, // prettier-ignore
                            data.dataBarcode[0].NamaType,
                            numeral(data.dataBarcode[0].Qty_Primer).format('0.00'), // prettier-ignore
                            numeral(data.dataBarcode[0].Qty_sekunder).format('0.00'), // prettier-ignore
                            numeral(data.dataBarcode[0].Qty).format('0.00'), // prettier-ignore
                            0,
                            0,
                            0,
                        ])
                        .draw();
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.error(err.Message);
            },
        });
    }
    //#endregion

    //#region Load Form
    initializeSelect2();
    //#endregion

    //#region Event Listener
    button_tambahKonversi.addEventListener("click", function () {
        InitModal();
        // Show SweetAlert2 with input field
        Swal.fire({
            title: "Scan Barcode",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
                autocomplete: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: true,
            preConfirm: (inputValue) => {
                const parts = inputValue.split("-");
                if (parts.length !== 2) {
                    Swal.showValidationMessage("Barcode Tidak Valid!");
                    return false;
                }

                let part1 = parts[0].padStart(9, "0");
                let part2 = parts[1].padStart(9, "0");

                const formattedBarcode = `${part1}-${part2}`;

                if (formattedBarcode.length !== 19) {
                    Swal.showValidationMessage("Barcode Tidak Valid!");
                    return false;
                }

                return formattedBarcode;
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                // Handle the submitted value here
                nomorIndeksBarangAsal = result.value.split("-")[0].trim();
                kodeBarangAsal = result.value.split("-")[1].trim();
                inputBarcodeAsal(nomorIndeksBarangAsal, kodeBarangAsal, "awal");
            }
        });

        if (
            nomorUser !== "4384" && //adam
            nomorUser !== "4199" && //kelvin
            nomorUser !== "4428" && //aulia
            nomorUser !== "2244" //ika
        ) {
            afalan_setting.readOnly = true;
            hasil_kg.readOnly = true;
            // jumlah_tritierBarcodeSisa.readOnly = true;
            const elements = [
                Swal.getInput(),
                document.getElementById("input_barcodeTambahan"),
            ];

            elements.forEach((inputElement) => {
                if (!inputElement) return;

                inputElement.addEventListener("keydown", function (e) {
                    const invalidKeys = [
                        "Shift",
                        "Control",
                        "Alt",
                        "Enter",
                        "Meta",
                        "Tab",
                        "Backspace",
                        "CapsLock",
                    ];

                    if (invalidKeys.includes(e.key)) {
                        e.preventDefault();

                        if (e.key === "Enter") {
                            if (inputBuffer.length > 0) {
                                inputElement.value = inputBuffer;

                                // Confirm only if the input is from Swal
                                if (inputElement === elements[0]) {
                                    Swal.clickConfirm();
                                }

                                inputBuffer = "";
                            }
                        }
                        return;
                    }

                    inputBuffer += e.key;

                    clearTimeout(inputTimer);
                    inputTimer = setTimeout(() => {
                        inputBuffer = "";
                    }, scannerThreshold);

                    e.preventDefault();
                });
            });
        }
    });

    btn_tambahBarcodeAsal.addEventListener("click", function () {
        const parts = input_barcodeTambahan.value.split("-");
        if (parts.length !== 2) {
            Swal.showValidationMessage("Barcode Tidak Valid!");
            return;
        }

        let part1 = parts[0].padStart(9, "0");
        let part2 = parts[1].padStart(9, "0");

        const formattedBarcode = `${part1}-${part2}`;

        if (formattedBarcode.length !== 19) {
            Swal.fire({
                icon: "error",
                title: "Terjadi Kesalahan!",
                text: "Barcode Tidak Valid!",
                showConfirmButton: false,
                timer: 1200,
            });
            return;
        }

        // 🔍 === CHECK IF BARCODE ALREADY EXISTS IN FIRST COLUMN ===
        let table = $("#table_asalKonversi").DataTable();
        let exists = table
            .column(0) // first column
            .data()
            .toArray()
            .includes(formattedBarcode);

        if (exists) {
            Swal.fire({
                icon: "error",
                title: "Terjadi Kesalahan!",
                text: "Barcode sudah ada dalam daftar!",
                showConfirmButton: false,
                timer: 1200,
            });
            input_barcodeTambahan.value = "";
            input_tanggalKonversi.focus();
            return;
        }

        input_barcodeTambahan.value = formattedBarcode;
        nomorIndeksBarangAsal = input_barcodeTambahan.value
            .split("-")[0]
            .trim();
        kodeBarangAsal = input_barcodeTambahan.value.split("-")[1].trim();

        inputBarcodeAsal(nomorIndeksBarangAsal, kodeBarangAsal, "lanjutan");

        input_barcodeTambahan.value = "";
        input_tanggalKonversi.focus();
        afalan_setting.value = 0;
        hasil_pcs.value = 0;
        hasil_kg.value = 0;
        hasil_kg.dispatchEvent(new Event("input"));

        pemakaian_typePrimerAsal.value = 0;
        pemakaian_typeSekunderAsal.value = 0;
        pemakaian_TritierAsal.value = 0;
    });

    input_tanggalKonversi.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            shiftBL.focus();
            shiftBL.select();
        }
    });

    shiftBL.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // Allow only 'P', 'M', or 'S'
        const allowedCharacters = ["A", "B", "C"];

        // If the input is more than one character or not one of the allowed characters
        if (this.value.length > 1 || !allowedCharacters.includes(this.value)) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!allowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity(
                "Silahkan pilih [A], [B], atau [C] untuk shift",
            );
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    shiftBL.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            select_mesin.select2("open");
        }
    });

    select_mesin.on("select2:select", function () {
        let selectedIdMesin = select_mesin.val();
        checkIdType = false;
        let selectedData = dataMesinTemp.find(
            (item) => item.IdMesin == selectedIdMesin,
        );
        idOrderKerja.value = selectedData.IdOrder;
        nomor_ok.value = selectedData.No_OK;
        console.log(selectedData);

        if (selectedData.JenisOK == 1) {
            if (selectedData.KBBalikLamiWoven == null) {
                Swal.fire({
                    icon: "error",
                    title: "Proses tidak bisa dilanjutkan!",
                    text:
                        "Kode Barang Balik Lami Woven belum didaftarkan ke dalam order kerja " +
                        selectedData.No_OK,
                });
                return;
            }
            kode_barangHasil.value = selectedData.KBBalikLamiWoven;
            nama_barangHasil.value = selectedData.NamaBarangBalikLamiWoven;

            if (!selectedData.IdTypeBalikLamiWoven) {
                // IdType diambil berdasarkan sub kelompok = nama mesin, cek SP_4384_ABM_Konversi_Printing kode 4
                Swal.fire({
                    icon: "error",
                    title: "Proses tidak bisa dilanjutkan!",
                    text:
                        "Kode Barang " +
                        selectedData.KBBalikLamiWoven +
                        " belum dimaintenance type!",
                });
                return;
            }

            checkIdType = true;
            afalan_setting.focus();
            afalan_setting.select();
        } else if (selectedData.JenisOK == 2) {
            Swal.fire({
                icon: "error",
                title: "Proses tidak bisa dilanjutkan!",
                text: "Order Kerja Starpak tidak bisa diproses balik lami",
            });
            return;
        }
    });

    afalan_setting.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasil_pcs.focus();
            hasil_pcs.select();
        }
    });

    afalan_setting.addEventListener("input", function (e) {
        let value = parseFloat(this.value) || 0;
        let columnTritier = table_asalKonversi.column(4).data();
        let sumColumnTritier = columnTritier.reduce(function (a, b) {
            return parseFloat(a) + parseFloat(b);
        }, 0); // Initialize sum with 0
        let totalTritierBarcodeTujuan = table_tujuanKonversi
            .column(3)
            .data()
            .reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
        let maxValue = sumColumnTritier * 2; // untuk sementara dibuat 100% untuk dilihat nanti butuh batasan berapa persen
        let valueHasilKg = parseFloat(numeral(hasil_kg.value).value() ?? 0);

        // If value is larger than the total Tritier → cap it
        if (value + valueHasilKg + totalTritierBarcodeTujuan > maxValue) {
            this.value = maxValue - (valueHasilKg + totalTritierBarcodeTujuan);
        }
        hitungPemakaianRoll();
    });

    btn_timbangAfalan.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.80:8080/",
            method: "GET",
            dataType: "text",
            success: function (weight) {
                console.log("Data dari timbangan: ".weight);
                if (weight < 0) {
                    Swal.fire({
                        icon: "info",
                        title: "Nilai Timbangan Minus",
                        text: "Data timbangan tidak boleh bernilai negatif. Silakan periksa kembali timbangan Anda",
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    return;
                }
                afalan_setting.value = weight;
                afalan_setting.dispatchEvent(new Event("input"));
                hitungPemakaianRoll();
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "info",
                    title: "Timbangan tidak ditemukan!",
                    text: error,
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        }).then(() => {
            hasil_pcs.focus();
        });
    });

    hasil_pcs.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (hasil_kg.readOnly == false) {
                hasil_kg.focus();
                hasil_kg.select();
            } else {
                btn_timbang.focus();
            }
        }
    });

    hasil_kg.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            button_modalProses.focus();
        }
    });

    hasil_kg.addEventListener("input", function (e) {
        let value = parseFloat(this.value) || 0;
        let columnTritier = table_asalKonversi.column(4).data();
        let sumColumnTritier = columnTritier.reduce(function (a, b) {
            return parseFloat(a) + parseFloat(b);
        }, 0); // Initialize sum with 0
        let totalTritierBarcodeTujuan = table_tujuanKonversi
            .column(3)
            .data()
            .reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
        let maxValue = sumColumnTritier * 2; // untuk sementara dibuat 100% untuk dilihat nanti butuh batasan berapa persen
        let valueAfalanSetting = parseFloat(
            numeral(afalan_setting.value).value() ?? 0,
        );

        // If value is larger than the total Tritier → cap it
        if (value + valueAfalanSetting + totalTritierBarcodeTujuan > maxValue) {
            this.value =
                maxValue - (valueAfalanSetting + totalTritierBarcodeTujuan) ||
                0;
        }
        hitungPemakaianRoll();
    });

    btn_timbang.addEventListener("click", function () {
        $.ajax({
            url: "http://192.168.100.80:8080/",
            method: "GET",
            dataType: "text",
            success: function (weight) {
                console.log("Data dari timbangan: ".weight);
                if (weight < 0) {
                    Swal.fire({
                        icon: "info",
                        title: "Nilai Timbangan Minus",
                        text: "Data timbangan tidak boleh bernilai negatif. Silakan periksa kembali timbangan Anda",
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    return;
                }
                hasil_kg.value = weight;
                hasil_kg.dispatchEvent(new Event("input"));
                hitungPemakaianRoll();
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "info",
                    title: "Timbangan tidak ditemukan!",
                    text: error,
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        }).then(() => {
            btn_tambahBarcodeSisa.focus();
        });
    });

    btn_tambahBarcodeTujuan.addEventListener("click", function () {
        if (
            (hasil_pcs.value == "" ||
                hasil_pcs.value == null ||
                hasil_pcs.value <= 0) &&
            (hasil_kg.value == "" ||
                hasil_kg.value == null ||
                hasil_kg.value <= 0)
        ) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Hasil Konversi tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                hasil_pcs.focus();
            });
            return;
        }

        if (select_mesin.val() === "" || select_mesin.val() == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Pilih mesin terlebih dahulu",
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    select_mesin.select2("open");
                }, 200);
            });
            return;
        }
        table_tujuanKonversi.row
            .add([
                nama_barangHasil.value,
                numeral(1).format('0.00'), // prettier-ignore
                numeral(hasil_pcs.value).format('0.00'), // prettier-ignore
                numeral(hasil_kg.value).format('0.00'), // prettier-ignore
            ])
            .draw();
        hasil_pcs.value = 0;
        hasil_kg.value = 0;
        hasil_kg.dispatchEvent(new Event("input"));
    });

    button_modalProses.addEventListener("click", function () {
        button_modalProses.disabled = true;
        setTimeout(function () {
            button_modalProses.disabled = false;
        }, 300);

        // Check if date is larger than today
        let selectedDate = input_tanggalKonversi.value;
        let today = new Date().toISOString().split("T")[0];

        if (selectedDate > today) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Tanggal tidak boleh lebih dari hari ini",
                returnFocus: false,
            }).then(() => {
                input_tanggalKonversi.focus();
            });
            return;
        }

        if (shiftBL.value == "" || shiftBL.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Shift tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                shiftBL.focus();
            });
            return;
        }

        if (select_mesin.val() === "" || select_mesin.val() == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Mesin tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    select_mesin.select2("open");
                }, 200);
            });
            return;
        }

        let dataTable_asalKonversi = table_asalKonversi.rows().data().toArray();
        if (dataTable_asalKonversi.length > 1) {
            if (checkUnusedRows()) {
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Ada barcode asal yang belum terpakai!",
                    returnFocus: false,
                }).then(() => {
                    setTimeout(() => {
                        btn_timbang.select();
                    }, 200);
                });
                return;
            }
        }

        if (!checkIdType) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text:
                    "Kode Barang " +
                    kode_barangHasil.value +
                    " belum dimaintenance type!",
                returnFocus: false,
            }).then(() => {
                shiftBL.select();
            });
            return;
        }

        let totalTritierBarcodeTujuan = table_tujuanKonversi
            .column(3)
            .data()
            .reduce((a, b) => parseFloat(a) + parseFloat(b), 0);

        if (totalTritierBarcodeTujuan < 1) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Hasil Konversi tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                hasil_pcs.select();
            });
            return;
        }

        $.ajax({
            url: "/KonversiBalikLami",
            type: "POST",
            data: {
                Tgl_konversiBL: input_tanggalKonversi.value,
                shiftBL: shiftBL.value,
                idMesinBL: select_mesin.val(),
                nomorOrderKerja: nomor_ok.value,
                idOrderKerja: idOrderKerja.value,
                hasilPCSBL: hasil_pcs.value,
                hasilKgBL: hasil_kg.value,
                totalAfalanSetting: afalan_setting.value,
                pemakaian_TritierAsal: pemakaian_TritierAsal.value,
                pemakaian_typeSekunderAsal: pemakaian_typeSekunderAsal.value,
                kodeBarangHasil: kode_barangHasil.value,
                nomorIndeksBarangAsal: nomorIndeksBarangAsal,
                kodeBarangAsal: kodeBarangAsal,
                dataAsalKonversi: table_asalKonversi.rows().data().toArray(),
                dataTujuanKonversi: table_tujuanKonversi
                    .rows()
                    .data()
                    .toArray(),
                _token: csrfToken,
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: response.success,
                    }).then(() => {
                        barcodeContainer.innerHTML = ""; // clear old ones if any

                        response.barcode.forEach((item, index) => {
                            // Create card
                            console.log(item);

                            const card = document.createElement("div");
                            card.classList.add("barcode-card");

                            // Barcode canvas
                            const canvas = document.createElement("canvas");
                            canvas.id = `barcode-${index}`;

                            // Generate barcode
                            JsBarcode(canvas, item.code, {
                                format: "CODE128",
                                displayValue: false,
                                margin: 15,
                                width: 2,
                                height: 70,
                            });

                            let tglMutasi = moment(item.Tgl_mutasi).format(
                                "DD/MM/YYYY",
                            );

                            // Text under barcode
                            const textDiv = document.createElement("div");
                            textDiv.classList.add("barcode-text");
                            textDiv.innerHTML = `
                                <div class="barcode-code">${item.code}</div>
                                <div class="barcode-name">${item.NAMA_BRG}</div>
                                <div class="barcode-name">
                                    ${tglMutasi} |
                                    ${item.Qty_Primer} ${item.Satuan_Primer} |
                                    ${item.Qty_sekunder} ${item.Satuan_sekunder} |
                                    ${item.Qty} ${item.Satuan}
                                </div>
                            `;

                            // Assemble
                            card.appendChild(canvas);
                            card.appendChild(textDiv);

                            // Put into container
                            barcodeContainer.appendChild(card);
                        });
                        $("#barcodeBalikLamiModal").modal("hide");
                        setTimeout(() => window.print(), 800);
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-cetakUlang", function (e) {
        var rowID = $(this).data("id");
        $.ajax({
            url: "/KonversiPrintingABM/getDataBarcodeKonversiRTR",
            type: "GET",
            data: {
                idTransaksi: rowID,
                _token: csrfToken,
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: response.success,
                    }).then(() => {
                        barcodeContainer.innerHTML = ""; // clear old ones if any

                        response.barcode.forEach((item, index) => {
                            // A5 container
                            const card = document.createElement("div");
                            card.classList.add("barcode-card");

                            if (response.barcode.length > 1) {
                                card.classList.add("page-break");
                            } else {
                                card.classList.add("no-page-break");
                            }

                            // Barcode canvas
                            const canvas = document.createElement("canvas");
                            canvas.id = `barcode-${index}`;

                            let tglMutasi = moment(item.Tgl_mutasi).format(
                                "DD/MM/YYYY",
                            );

                            // Text under barcode
                            const textDiv = document.createElement("div");
                            textDiv.classList.add("barcode-text");
                            textDiv.innerHTML = `
                                <div class="barcode-code">${item.code}</div>
                                <div class="barcode-name">${item.NAMA_BRG}</div>
                                <div class="barcode-name">${tglMutasi} | ${item.Qty_Primer} ${item.Satuan_Primer} | ${item.Qty_sekunder} ${item.Satuan_sekunder} | ${item.Qty} ${item.Satuan}</div>
                            `;

                            // Assemble
                            card.appendChild(canvas);
                            card.appendChild(textDiv);
                            barcodeContainer.appendChild(card);

                            // Generate barcode (value only)
                            JsBarcode(canvas, item.code, {
                                format: "CODE128",
                                displayValue: false,
                                margin: 5,
                                width: 2,
                                height: 70,
                            });
                        });

                        setTimeout(() => window.print(), 800);
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-cancelBarcodeAsal", function () {
        let table = $("#table_asalKonversi").DataTable();

        // If only one row left, block deletion
        if (table.rows().count() === 1) {
            Swal.fire({
                icon: "error",
                title: "Terjadi Kesalahan!",
                text: "Tidak bisa menghapus baris terakhir!",
                showConfirmButton: false,
                timer: 1200,
            });
            return;
        }

        // Otherwise delete normally
        table.row($(this).closest("tr")).remove().draw(false);
        hasil_kg.value = 0;
        pemakaian_typeSekunderAsal.value = 0;
        pemakaian_TritierAsal.value = 0;
    });

    $(document).on("click", ".btn-cancelBarcodeTujuan", function () {
        let table = $("#table_tujuanKonversi").DataTable();
        table.row($(this).closest("tr")).remove().draw(false);
    });
    //#endregion
});
