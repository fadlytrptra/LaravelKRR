jQuery(function ($) {
    //#region Variables
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    let tambahKegiatanMesinPotongModal = document.getElementById("tambahKegiatanMesinPotongModal"); //prettier-ignore
    let tambahKegiatanMesinPotongLabel = document.getElementById("tambahKegiatanMesinPotongLabel"); //prettier-ignore
    let closeTambahKegiatanMesinPotongModal = document.getElementById("closeTambahKegiatanMesinPotongModal"); //prettier-ignore
    let tanggalLogMesinPotong = document.getElementById("tanggalLogMesinPotong"); //prettier-ignore
    let div_parentSelectNamaMesin = document.getElementById("div_parentSelectNamaMesin"); //prettier-ignore
    const namaMesinPotong = $("#namaMesinPotong");
    let shiftPotong = document.getElementById("shiftPotong");
    let searchDataByBarcode = document.getElementById("searchDataByBarcode");
    let ukuranRoll = document.getElementById("ukuranRoll");
    let rajutanWA = document.getElementById("rajutanWA");
    let rajutanWE = document.getElementById("rajutanWE");
    let denierKain = document.getElementById("denierKain");
    let statusLami = document.getElementById("statusLami");
    let warnaRoll = document.getElementById("warnaRoll");
    let statusReinforced = document.getElementById("statusReinforced");
    let beratRoll = document.getElementById("beratRoll");
    let beratPemakaian = document.getElementById("beratPemakaian");
    let nomor_mesinCL = document.getElementById("nomor_mesinCL");
    let div_parentSelectCustomerTableHit = document.getElementById("div_parentSelectCustomerTableHit"); //prettier-ignore
    const customer_tableHit = $("#customer_tableHit");
    let div_parentSelectKodeBarangTableHit = document.getElementById("div_parentSelectKodeBarangTableHit"); //prettier-ignore
    const kodebarang_tableHit = $("#kodebarang_tableHit");
    let div_parentSelectKomponenTableHit = document.getElementById("div_parentSelectKomponenTableHit"); //prettier-ignore
    const komponen_tableHit = $("#komponen_tableHit");
    let jenisPotongan = document.getElementById("jenisPotongan");
    let btn_isiJenisPotongan = document.getElementById("btn_isiJenisPotongan");
    let ukuranpanjang_tableHit = document.getElementById("ukuranpanjang_tableHit"); //prettier-ignore
    let ukuranlebar_tableHit = document.getElementById("ukuranlebar_tableHit");
    let hasil_potongJumlah = document.getElementById("hasil_potongJumlah");
    let hasil_potongBerat = document.getElementById("hasil_potongBerat");
    let btn_timbangHasil = document.getElementById("btn_timbangHasil");
    let afalan_wa = document.getElementById("afalan_wa");
    let btn_timbangAfalanWA = document.getElementById("btn_timbangAfalanWA");
    let afalan_we = document.getElementById("afalan_we");
    let btn_timbangAfalanWE = document.getElementById("btn_timbangAfalanWE");
    let afalan_lami = document.getElementById("afalan_lami");
    let btn_timbangAfalanLami = document.getElementById("btn_timbangAfalanLami"); //prettier-ignore
    let afalan_tepi = document.getElementById("afalan_tepi");
    let btn_timbangAfalanTepi = document.getElementById("btn_timbangAfalanTepi"); //prettier-ignore
    let div_alasanEditPotong = document.getElementById("div_alasanEditPotong");
    let alasanEdit = document.getElementById("alasanEdit");
    let button_modalProsesPotong = document.getElementById("button_modalProsesPotong"); //prettier-ignore
    let table_logMesin = $("#table_logMesin").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        autoWidth: false,
        lengthMenu: [
            [10, 25, 100],
            ["10", "25", "100"],
        ],
        order: [[0, "desc"]],
        ajax: {
            url: "/MaintKegiatanMesinPotongJBB/getLogMesin",
            type: "GET",
        },
        columns: [
            {
                data: "Tgl_Log",
                render: function (data, type, full, meta) {
                    return moment(data).format("YYYY-MM-DD");
                },
                width: "10%",
            },
            {
                data: "Jenis_Potongan",
                width: "26%",
            },
            {
                data: "Nama_Mesin",
                width: "8%",
            },
            {
                data: "Shift",
                width: "5%",
            },
            {
                data: "KB_TabelHit",
                width: "13%",
            },
            {
                data: "Jumlah_Hasil_Potong",
                width: "9%",
                render: function (data, type, full, meta) {
                    return numeral(data).format("0,0.00");
                },
            },
            {
                data: "Berat_Hasil_Potong",
                width: "9%",
                render: function (data, type, full, meta) {
                    return numeral(data).format("0,0.00");
                },
            },
            {
                data: "Id_Log",
                render: function (data, type, full) {
                    return `
                        <button class="btn btn-primary btn-edit" data-id="${data}">Edit</button>
                        <button class="btn btn-danger btn-delete" data-id="${data}">Hapus</button>
                        `;
                },
                width: "12.5%",
            },
        ],
    });
    let shiftAllowedCharacters = ["P", "S", "M"];
    let statusLamiAllowedCharacters = ["L", "N"];
    let statusReinforcedAllowedCharacters = ["R", "N"];
    let kodebarang_tableHitEdit;
    let komponen_tableHitEdit;
    //#endregion

    //#region Load Form
    initializeSelect2();
    initModal();
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

    // setInputFilter(
    //     afalanCutterLBRTanpaOK,
    //     function (value) {
    //         return /^-?\d*[.]?\d*$/.test(value); // Allow only digits
    //     },
    //     "Only digits are allowed",
    // );

    function initializeSelect2() {
        namaMesinPotong.select2({
            dropdownParent: $("#div_parentSelectNamaMesin"),
            placeholder: "Pilih Mesin",
        });

        customer_tableHit.select2({
            dropdownParent: $("#div_parentSelectCustomerTableHit"),
            placeholder: "Pilih Customer",
        });

        kodebarang_tableHit.select2({
            dropdownParent: $("#div_parentSelectKodeBarangTableHit"),
            placeholder: "Pilih KB Tabel Hit.",
        });

        komponen_tableHit.select2({
            dropdownParent: $("#div_parentSelectKomponenTableHit"),
            placeholder: "Pilih Komponen",
        });

        $("#namaMesinPotong").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#customer_tableHit").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#kodebarang_tableHit").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#komponen_tableHit").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
    }

    function initModal() {
        $.ajax({
            url: "/MaintKegiatanMesinPotongJBB/initModalTambahKegiatanMesinPotong",
            method: "GET",
            data: { idTypeMesin: 1 }, // id type mesin 1 = potong
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text: "fetching data machine failed ",
                        returnFocus: false,
                    });
                } else {
                    namaMesinPotong.empty();
                    data.dataMesin.forEach(function (item) {
                        namaMesinPotong.append(
                            new Option(item.Nama_Mesin, item.Id_Mesin), // prettier-ignore
                        );
                    });
                    namaMesinPotong.val(null).trigger("change");
                    data.dataCustomer.forEach(function (item) {
                        customer_tableHit.append(
                            new Option(item.Nama_Customer + " | " + item.Kode_Customer, item.Kode_Customer), // prettier-ignore
                        );
                    });
                    customer_tableHit.val(null).trigger("change");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Mesin.",
                });
            },
        });
    }

    function clearAll() {
        shiftPotong.value = "";
        searchDataByBarcode.value = "";
        ukuranRoll.value = "";
        rajutanWA.value = "";
        rajutanWE.value = "";
        denierKain.value = "";
        statusLami.value = "";
        warnaRoll.value = "";
        statusReinforced.value = "";
        beratRoll.value = "";
        beratPemakaian.value = "";
        nomor_mesinCL.value = "";
        kodebarang_tableHit.empty();
        kodebarang_tableHit.val(null).trigger("change");
        komponen_tableHit.empty();
        komponen_tableHit.val(null).trigger("change");
        jenisPotongan.value = "";
        ukuranpanjang_tableHit.value = "";
        ukuranlebar_tableHit.value = "";
        hasil_potongJumlah.value = "";
        hasil_potongBerat.value = "";
        afalan_wa.value = "";
        afalan_we.value = "";
        afalan_lami.value = "";
        afalan_tepi.value = "";
        alasanEdit.value = "";
        showTabelHitunganSelect(true);
    }

    function fetchDataByBarcode(nomorIndeks, kodeBarang) {
        $.ajax({
            url: "/MaintKegiatanMesinPotongJBB/getDataByBarcode",
            method: "GET",
            data: {
                kodeBarang: kodeBarang,
                nomorIndeks: nomorIndeks,
            },
            dataType: "json",
            success: function (data) {
                console.log(data);

                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text: "fetching data by barcode failed ",
                        returnFocus: false,
                    });
                } else {
                    // Populate the form fields with the fetched data
                    ukuranRoll.value = numeral(
                        data[0].UkuranRoll?.trim() ?? 0,
                    ).value();
                    rajutanWA.value = numeral(
                        data[0].Warp?.trim() ?? 0,
                    ).value();
                    rajutanWE.value = numeral(
                        data[0].Weft?.trim() ?? 0,
                    ).value();
                    denierKain.value = numeral(
                        data[0].Denier?.trim() ?? 0,
                    ).value();
                    if (data[0].Lami?.includes("MIC")) {
                        statusLami.value = "L";
                    } else {
                        statusLami.value = "N";
                    }
                    warnaRoll.value = data[0].Warna?.trim();
                    beratRoll.value = numeral(data[0].Qty?.trim() ?? 0).value();
                    if (
                        data[0].IdDivisi?.trim() == "CIR" ||
                        data[0].IdDivisi?.trim() == "CLM" ||
                        data[0].IdDivisi?.trim() == "MCL"
                    ) {
                        nomor_mesinCL.value = data[0].NamaKelompok?.trim();
                    }
                    // Move focus to the next field
                    statusReinforced.focus();
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to fetch data by barcode.",
                });
            },
        });
    }

    function showTabelHitunganSelect(show) {
        if (show) {
            div_jenisPotongan.style.display = "none";
            div_parentSelectCustomerTableHit.style.display = "block";
            div_parentSelectKomponenTableHit.style.display = "block";
            div_parentSelectKodeBarangTableHit.style.display = "block";
            jenisPotongan.value = "";
            jenisPotongan.readOnly = true;
            customer_tableHit.val(null).trigger("change");
            btn_isiJenisPotongan.innerHTML = "Isi Jenis Potongan";
            btn_isiJenisPotongan.classList.remove("btn-info");
            btn_isiJenisPotongan.classList.add("btn-primary");
        } else {
            div_jenisPotongan.style.display = "block";
            div_parentSelectCustomerTableHit.style.display = "none";
            div_parentSelectKomponenTableHit.style.display = "none";
            div_parentSelectKodeBarangTableHit.style.display = "none";
            jenisPotongan.value = "";
            jenisPotongan.readOnly = false;
            customer_tableHit.val(null).trigger("change");
            kodebarang_tableHit.empty();
            komponen_tableHit.empty();
            btn_isiJenisPotongan.innerHTML = "Pilih Tabel Hit.";
            btn_isiJenisPotongan.classList.remove("btn-primary");
            btn_isiJenisPotongan.classList.add("btn-info");
        }
        return Promise.resolve();
    }
    //#endregion

    //#region Event Listener
    button_tambahKegiatanMesin.addEventListener("click", function () {
        $("#button_modalProsesPotong").data("id", null);
        tambahKegiatanMesinPotongLabel.innerHTML = "Tambah Kegiatan Mesin Potong JBB"; // prettier-ignore
        $("#tambahKegiatanMesinPotongModal").modal("show");
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $.ajax({
            url: "/MaintKegiatanMesinPotongJBB/getLogMesinByIdLog",
            data: {
                idLog: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                tanggalLogMesinPotong.value = moment(response[0].Tgl_Log).format("YYYY-MM-DD"); // prettier-ignore
                namaMesinPotong.val(response[0].Id_Mesin).trigger("change");
                shiftPotong.value = response[0].Shift;
                ukuranRoll.value = numeral(response[0].Ukuran_Roll).value();
                rajutanWA.value = numeral(response[0].Rajutan_WA).value();
                rajutanWE.value = numeral(response[0].Rajutan_WE).value();
                denierKain.value = numeral(response[0].Denier).value();
                statusLami.value = response[0].Status_Lami == 1 ? "L" : "N";
                warnaRoll.value = response[0].Warna;
                statusReinforced.value = response[0].Status_Reinforced == 1 ? "R" : "N"; //prettier-ignore
                beratRoll.value = numeral(response[0].Berat_Roll).value();
                beratPemakaian.value = numeral(response[0].Berat_Pemakaian).value(); // prettier-ignore
                nomor_mesinCL.value = response[0].Nomor_Mesin_CL;
                if (response[0].KB_TabelHit == null) {
                    showTabelHitunganSelect(false);
                    jenisPotongan.value = response[0].Jenis_Potongan;
                } else {
                    showTabelHitunganSelect(true);
                    customer_tableHit
                        .val(response[0].Kode_Customer?.trim())
                        .trigger("change")
                        .trigger("select2:select");
                    kodebarang_tableHitEdit = response[0].KB_TabelHit?.trim();
                    komponen_tableHitEdit = response[0].Kode_Komponen_TabelHit?.trim(); // prettier-ignore
                    jenisPotongan.value = response[0].Jenis_Potongan;
                }
                ukuranpanjang_tableHit.value = numeral(response[0].Panjang_Potongan).value(); // prettier-ignore
                ukuranlebar_tableHit.value = numeral(response[0].Lebar_Potongan).value(); // prettier-ignore
                hasil_potongJumlah.value = numeral(response[0].Jumlah_Hasil_Potong).value(); // prettier-ignore
                hasil_potongBerat.value = numeral(response[0].Berat_Hasil_Potong).value(); // prettier-ignore
                afalan_wa.value = numeral(response[0].Berat_Afalan_WA).value();
                afalan_we.value = numeral(response[0].Berat_Afalan_WE).value();
                afalan_lami.value = numeral(response[0].Berat_Afalan_Lami).value(); // prettier-ignore
                afalan_tepi.value = numeral(response[0].Berat_Afalan_Tepi).value(); // prettier-ignore
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        }).then(() => {
            $("#button_modalProsesPotong").data("id", rowID);
            tambahKegiatanMesinPotongLabel.innerHTML = "Edit Kegiatan Mesin Potong JBB"; // prettier-ignore
            $("#tambahKegiatanMesinPotongModal").modal("show");
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        Swal.fire({
            title: "Tuliskan alasan penghapusan",
            input: "text",
            inputPlaceholder: "Alasan penghapusan...",
            inputAttributes: {
                autocapitalize: "off",
            },
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            inputValidator: (value) => {
                if (!value) {
                    return "Alasan harus diisi!";
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const reason = result.value;

                $.ajax({
                    url: "/KegiatanMesinMPJPerHariABM/" + rowID,
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
                        alasanHapus: reason,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Terjadi Kesalahan!",
                                text: response.error,
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil!",
                                text: response.success,
                            });
                            table_logMesin.ajax.reload();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching data: ", error);
                    },
                });
            }
            if (result.isConfirmed) {
            } else if (result.isDismissed) {
                // If user cancels, show a message or do nothing
                Swal.fire(
                    "Pemberitahuan",
                    "Kegiatan mesin tidak dihapus :)",
                    "info",
                );
            }
        });
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalProsesPotong").data("id", rowID);
        Swal.fire({
            icon: "info",
            title: "Coming Soon",
            text: "Fitur ini akan tersedia pada update berikutnya.",
            confirmButtonText: "OK",
        });
    });

    $("#tambahKegiatanMesinPotongModal").on("shown.bs.modal", function (event) {
        let idLog = $("#button_modalProsesPotong").data("id");
        if (idLog == null) {
            tanggalLogMesinPotong.value = moment().format("YYYY-MM-DD");
            clearAll();
            setTimeout(() => {
                tanggalLogMesinPotong.focus();
            }, 200); // delay in milliseconds (adjust as needed)
            div_alasanEditPotong.style.display = "none";
        } else {
            alasanEdit.value = "";
            div_alasanEditPotong.style.display = "block";
        }
    });

    closeTambahKegiatanMesinPotongModal.addEventListener("click", function () {
        $("#tambahKegiatanMesinPotongModal").modal("hide");
    });

    tanggalLogMesinPotong.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            namaMesinPotong.select2("open");
        }
    });

    namaMesinPotong.on("select2:select", function () {
        shiftPotong.focus();
    });

    shiftPotong.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // If the input is more than one character or not one of the allowed characters
        if (
            this.value.length > 1 ||
            !shiftAllowedCharacters.includes(this.value)
        ) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!shiftAllowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity(
                "Hanya karakter " +
                    shiftAllowedCharacters.join(", ") +
                    " yang diperbolehkan",
            );
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        // else {
        //     this.classList.remove("input-error");
        //     this.setCustomValidity("");
        //     const cycleWeek = getShiftCycleWeek(); // 1, 2, or 3
        //     let start = "",
        //         end = "";

        //     // Define schedules for each rotation week
        //     if (cycleWeek === 1) {
        //         // Week 1
        //         if (this.value === "A") {
        //             start = "07:00";
        //             end = "15:00";
        //         } else if (this.value === "B") {
        //             start = "15:00";
        //             end = "23:00";
        //         } else if (this.value === "C") {
        //             start = "23:00";
        //             end = "07:00";
        //         }
        //     } else if (cycleWeek === 2) {
        //         // Week 2
        //         if (this.value === "A") {
        //             start = "23:00";
        //             end = "07:00";
        //         } else if (this.value === "B") {
        //             start = "07:00";
        //             end = "15:00";
        //         } else if (this.value === "C") {
        //             start = "15:00";
        //             end = "23:00";
        //         }
        //     } else if (cycleWeek === 3) {
        //         // Week 3
        //         if (this.value === "A") {
        //             start = "15:00";
        //             end = "23:00";
        //         } else if (this.value === "B") {
        //             start = "23:00";
        //             end = "07:00";
        //         } else if (this.value === "C") {
        //             start = "07:00";
        //             end = "15:00";
        //         }
        //     }

        //     // Apply to Flatpickr time pickers
        //     jamKerjaAwal.setDate(start);
        //     jamKerjaAkhir.setDate(end);
        // }
        this.reportValidity(); // Display the validity message
    });

    shiftPotong.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            ukuranRoll.focus();
        }
    });

    searchDataByBarcode.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            this.classList.remove("input-error");
            this.setCustomValidity("");
            this.reportValidity();

            if (this.value.trim() === "") {
                this.classList.add("input-error");
                this.setCustomValidity("Tidak boleh kosong");
                this.reportValidity();
                return;
            }

            const barcode = this.value.trim();

            // Validate barcode format: 000000289-000133198
            const regex = /^\d{1,9}-\d{1,9}$/;

            if (!regex.test(barcode)) {
                this.classList.add("input-error");
                this.setCustomValidity("Barcode tidak valid!");
                this.reportValidity();
                return;
            }

            let [nomorIndeks, kodeBarang] = barcode.split("-");

            nomorIndeks = nomorIndeks.padStart(9, "0");
            kodeBarang = kodeBarang.padStart(9, "0");

            this.value = `${nomorIndeks}-${kodeBarang}`;

            fetchDataByBarcode(nomorIndeks, kodeBarang);
        }
    });

    ukuranRoll.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            rajutanWA.focus();
        }
    });

    rajutanWA.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            rajutanWE.focus();
        }
    });

    rajutanWE.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            denierKain.focus();
        }
    });

    denierKain.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            statusLami.focus();
        }
    });

    statusLami.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // If the input is more than one character or not one of the allowed characters
        if (
            this.value.length > 1 ||
            !statusLamiAllowedCharacters.includes(this.value)
        ) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!statusLamiAllowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity(
                "Hanya karakter " +
                    statusLamiAllowedCharacters.join(", ") +
                    " yang diperbolehkan",
            );
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    statusLami.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.classList.add("input-error");
                this.setCustomValidity(
                    "Isilah dengan karakter " +
                        statusLamiAllowedCharacters.join(" atau "),
                );
            } else {
                this.classList.remove("input-error");
                this.setCustomValidity("");
                warnaRoll.focus();
            }
            this.reportValidity();
        }
    });

    warnaRoll.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.classList.add("input-error");
                this.setCustomValidity("Tidak boleh kosong");
            } else {
                this.classList.remove("input-error");
                this.setCustomValidity("");
                statusReinforced.focus();
            }
            this.reportValidity();
        }
    });

    statusReinforced.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.classList.add("input-error");
                this.setCustomValidity(
                    "Isilah dengan karakter " +
                        statusReinforcedAllowedCharacters.join(" atau "),
                );
            } else {
                this.classList.remove("input-error");
                this.setCustomValidity("");
                beratRoll.focus();
            }
            this.reportValidity();
        }
    });

    statusReinforced.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // If the input is more than one character or not one of the allowed characters
        if (
            this.value.length > 1 ||
            !statusReinforcedAllowedCharacters.includes(this.value)
        ) {
            // Remove the last entered character if it's not allowed
            this.value = this.value.slice(0, 1);
            if (!statusReinforcedAllowedCharacters.includes(this.value)) {
                this.value = ""; // Clear the input if the remaining character is still invalid
            }

            this.classList.add("input-error");
            this.setCustomValidity(
                "Hanya karakter " +
                    statusReinforcedAllowedCharacters.join(", ") +
                    " yang diperbolehkan",
            );
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity(); // Display the validity message
    });

    beratRoll.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            beratPemakaian.focus();
        }
    });

    beratPemakaian.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            nomor_mesinCL.focus();
        }
    });

    nomor_mesinCL.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = "-";
            }
            customer_tableHit.select2("open");
        }
    });

    customer_tableHit.on("select2:select", function () {
        const selectedCustomer = $(this).val(); // Get selected Customer
        $.ajax({
            url: "/MaintKegiatanMesinPotongJBB/getTabelHitunganByCustomer",
            method: "GET",
            data: {
                kodeCustomer: selectedCustomer,
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                kodebarang_tableHit.empty();
                komponen_tableHit.empty();
                data.forEach(function (item) {
                    kodebarang_tableHit.append(
                        new Option(item.Kode_Barang, item.Kode_Barang), // prettier-ignore
                    );
                });
                kodebarang_tableHit.val(null).trigger("change");
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kode Barang Tabel Hitungan.",
                });
            },
        }).then(() => {
            if ($("#button_modalProsesPotong").data("id") == null) {
                kodebarang_tableHit.select2("open");
            } else {
                kodebarang_tableHit
                    .val(kodebarang_tableHitEdit)
                    .trigger("change")
                    .trigger("select2:select");
            }
        });
    });

    kodebarang_tableHit.on("select2:select", function () {
        const selectedKodeBarang = $(this).val(); // Get selected Kode Barang Tabel Hit.
        $.ajax({
            url: "/MaintKegiatanMesinPotongJBB/getKomponenByTabelHitungan",
            method: "GET",
            data: {
                kodeBarang: selectedKodeBarang,
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                komponen_tableHit.empty();
                data.forEach(function (item) {
                    komponen_tableHit.append(
                        new Option(
                            item.Nama_Komponen +
                                " Uk. " +
                                numeral(item.Panjang_Potongan).value() +
                                " X " +
                                numeral(item.Lebar_Potongan).value(),
                            item.Kode_Komponen,
                        ),
                    );
                });
                komponen_tableHit.val(null).trigger("change");
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kode Barang Tabel Hitungan.",
                });
            },
        }).then(() => {
            if ($("#button_modalProsesPotong").data("id") == null) {
                komponen_tableHit.select2("open");
            } else {
                komponen_tableHit.val(komponen_tableHitEdit).trigger("change");
            }
        });
    });

    komponen_tableHit.on("select2:select", function () {
        const selectedData = $(this).select2("data")[0]; // Get selected Komponen
        // let komponenId = selectedData.id;
        let komponenName = selectedData.text;
        let komponenNameParts = komponenName.split(" Uk. ");
        let komponenLength = komponenNameParts[1].split(" X ")[0];
        let komponenWidth = komponenNameParts[1].split(" X ")[1];
        jenisPotongan.value = komponenName;
        ukuranpanjang_tableHit.value = komponenLength;
        ukuranlebar_tableHit.value = komponenWidth;
        hasil_potongJumlah.focus();
    });

    jenisPotongan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.classList.add("input-error");
                this.setCustomValidity("Tidak boleh kosong");
            } else {
                this.classList.remove("input-error");
                this.setCustomValidity("");
                komponen_tableHit.val(this.value).trigger("change");
                ukuranpanjang_tableHit.focus();
            }
            this.reportValidity();
        }
    });

    btn_isiJenisPotongan.addEventListener("click", function (e) {
        e.preventDefault();
        if (this.innerHTML == "Isi Jenis Potongan") {
            showTabelHitunganSelect(false).then(() => {
                jenisPotongan.focus();
            });
        } else {
            showTabelHitunganSelect(true).then(() => {
                customer_tableHit.select2("open");
            });
        }
    });

    ukuranpanjang_tableHit.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            ukuranlebar_tableHit.focus();
        }
    });

    ukuranlebar_tableHit.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hasil_potongJumlah.focus();
        }
    });

    hasil_potongJumlah.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            hasil_potongBerat.focus();
        }
    });

    hasil_potongBerat.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            afalan_wa.focus();
        }
    });

    btn_timbangHasil.addEventListener("click", function () {
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
                hasil_potongBerat.value = weight;
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
            btn_timbangAfalanWA.focus();
        });
    });

    afalan_wa.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            afalan_we.focus();
        }
    });

    btn_timbangAfalanWA.addEventListener("click", function () {
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
                afalan_wa.value = weight;
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
            btn_timbangAfalanWE.focus();
        });
    });

    afalan_we.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            afalan_lami.focus();
        }
    });

    btn_timbangAfalanWE.addEventListener("click", function () {
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
                afalan_we.value = weight;
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
            btn_timbangAfalanLami.focus();
        });
    });

    afalan_lami.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            afalan_tepi.focus();
        }
    });

    btn_timbangAfalanLami.addEventListener("click", function () {
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
                afalan_lami.value = weight;
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
            btn_timbangAfalanTepi.focus();
        });
    });

    afalan_tepi.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = 0;
            }
            button_modalProsesPotong.focus();
        }
    });

    btn_timbangAfalanTepi.addEventListener("click", function () {
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
                afalan_tepi.value = weight;
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
            button_modalProsesPotong.focus();
        });
    });

    button_modalProsesPotong.addEventListener("click", function () {
        let idLog = $(this).data("id");
        const getValue = (el) => parseFloat(el?.value || 0);

        const ukuranRollValue = getValue(ukuranRoll);
        const rajutanWAValue = getValue(rajutanWA);
        const rajutanWEValue = getValue(rajutanWE);
        const denierKainValue = getValue(denierKain);
        const beratRollValue = getValue(beratRoll);
        const beratPemakaianValue = getValue(beratPemakaian);
        const ukuranpanjang_tableHitValue = getValue(ukuranpanjang_tableHit);
        const ukuranlebar_tableHitValue = getValue(ukuranlebar_tableHit);
        const hasil_potongJumlahValue = getValue(hasil_potongJumlah);
        const hasil_potongBeratValue = getValue(hasil_potongBerat);
        const afalan_waValue = getValue(afalan_wa);
        const afalan_weValue = getValue(afalan_we);
        const afalan_lamiValue = getValue(afalan_lami);
        const afalan_tepiValue = getValue(afalan_tepi);
        const cekTotalPemakaian =
            hasil_potongBeratValue +
            afalan_waValue +
            afalan_weValue +
            afalan_lamiValue +
            afalan_tepiValue;

        // Disable the button
        button_modalProsesPotong.disabled = true;

        // Re-enable after 0.5 seconds (500 ms)
        setTimeout(function () {
            button_modalProsesPotong.disabled = false;
        }, 500);

        let selectedDate = tanggalLogMesinPotong.value;
        let today = new Date().toISOString().split("T")[0];

        if (selectedDate > today) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Tanggal tidak boleh lebih dari hari ini",
                returnFocus: false,
            }).then(() => {
                tanggalLogMesinPotong.select();
            });
            return;
        }

        if (shiftPotong.value == "" || shiftPotong.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Shift tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                shiftMPJ.select();
            });
            return;
        }

        if (namaMesinPotong.val() === "" || namaMesinPotong.val() == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Nama mesin tidak boleh kosong",
                returnFocus: false,
            }).then(() => {
                setTimeout(() => {
                    namaMesinPotong.select2("open");
                }, 200);
            });
            return;
        }

        if (jenisPotongan.value == "" || jenisPotongan.value == null) {
            if (div_jenisPotongan.style.display == "block") {
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Jenis Potongan tidak boleh kosong",
                    returnFocus: false,
                }).then(() => {
                    jenisPotongan.select();
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Komponen tabel hitungan harus dipilih",
                    returnFocus: false,
                });
            }
            return;
        }

        if (cekTotalPemakaian !== beratPemakaianValue) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Berat pemakaian tidak sesuai",
                returnFocus: false,
            }).then(() => {
                beratPemakaian.focus();
            });
            return;
        }

        if (idLog) {
            if (alasanEdit.value == "" || alasanEdit.value == null) {
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Alasan Edit harus diisi",
                    returnFocus: false,
                }).then(() => {
                    alasanEdit.focus();
                });
                return;
            }
        }

        $.ajax({
            url: "/MaintKegiatanMesinPotongJBB",
            method: "POST",
            data: {
                jenisStore: idLog ? "update" : "store",
                idLog: idLog,
                TglLogPotong: tanggalLogMesinPotong.value,
                idMesinPotong: namaMesinPotong.val(),
                shiftPotong: shiftPotong.value,
                ukuranRoll: ukuranRollValue,
                rajutanWA: rajutanWAValue,
                rajutanWE: rajutanWEValue,
                denierKain: denierKainValue,
                statusLami: statusLami.value,
                warnaRoll: warnaRoll.value,
                statusReinforced: statusReinforced.value,
                beratRoll: beratRollValue,
                beratPemakaian: beratPemakaianValue,
                nomor_mesinCL: nomor_mesinCL.value,
                kodebarang_tableHit: kodebarang_tableHit.val(),
                komponen_tableHit: komponen_tableHit.val(),
                jenisPotongan: jenisPotongan.value,
                ukuranpanjang_tableHit: ukuranpanjang_tableHitValue,
                ukuranlebar_tableHit: ukuranlebar_tableHitValue,
                hasil_potongJumlah: hasil_potongJumlahValue,
                hasil_potongBerat: hasil_potongBeratValue,
                afalan_wa: afalan_waValue,
                afalan_we: afalan_weValue,
                afalan_lami: afalan_lamiValue,
                afalan_tepi: afalan_tepiValue,
                alasanEdit: alasanEdit.value,
                _token: csrfToken,
            },
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: idLog
                            ? "Data berhasil diupdate"
                            : "Data berhasil ditambahkan",
                    }).then(() => {
                        table_logMesin.ajax.reload();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Mesin.",
                });
            },
        }).then(() => {
            $("#button_modalProsesPotong").data("id", null);
            tambahKegiatanMesinPotongLabel.innerHTML = "Tambah Kegiatan Mesin Potong JBB"; // prettier-ignore
            $("#tambahKegiatanMesinPotongModal").modal("show");
        });
    });
    //#endregion
});
