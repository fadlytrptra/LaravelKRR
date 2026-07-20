// Button
var dateForm = document.getElementById('dateForm');

// realita dan atasnya
var tanggal = document.getElementById('tanggal');
var mesin = document.getElementById('mesin');
var ukuran = document.getElementById('ukuran');
var waftRajutan = document.getElementById('waftRajutan');
var weftRajutan = document.getElementById('weftRajutan');
var waftBenang = document.getElementById('waftBenang');
var weftBenang = document.getElementById('weftBenang');
var waftDenier = document.getElementById('waftDenier');
var weftDenier = document.getElementById('weftDenier');
var idLog = document.getElementById('idLog');
var ukuranLebar = document.getElementById('ukuranLebar');
var panjangPotongan = document.getElementById('panjangPotongan');
var beratBarang = document.getElementById('beratBarang');
var beratReinforced = document.getElementById('beratReinforced');
var beratStandart = document.getElementById('beratStandart')

// Actual (ST)
var actualStWarp = document.getElementById('actualStWarp');
var actualElgWarp = document.getElementById('actualElgWarp');
var actualStWeft = document.getElementById('actualStWeft');
var actualElgWeft = document.getElementById('actualElgWeft');
var actualStReinf = document.getElementById('actualStReinf');
var actualElgReinf = document.getElementById('actualElgReinf');

// standart
var standartStWarp = document.getElementById('standartStWarp');
var standartStWeft = document.getElementById('standartStWeft');
var standartElgWarp = document.getElementById('standartElgWarp');
var standartElgWeft = document.getElementById('standartElgWeft');

// new variable
var Lebar;
var D_TEK9;
var JenisKrg;
var Id_QC;
var Ket;

// 1=ISI, 2=KOREKSI, 3=DELETE, 0=batal
var nomorButton;
var refreshed;

// token
var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

standartElgWarp.value = '25-30';
standartElgWeft.value = '25-30';

// FUNCTION
// All function
document.addEventListener('DOMContentLoaded', function () {

    // Variable untuk button dan keypress
    const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly])'));
    const inputAll = Array.from(document.querySelectorAll('.card-body input[type="text"]'));
    const prosesButton = document.getElementById('prosesButton');

    const isiButton = document.getElementById('isiButton');
    const koreksiButton = document.getElementById('koreksiButton');
    const hapusButton = document.getElementById('hapusButton');
    const batalButton = document.getElementById('batalButton');
    const refreshButton = document.getElementById('refreshButton');

    // Today's date
    var dateNow = document.getElementById('tanggal');
    var today = new Date().toISOString().slice(0, 10);
    dateNow.value = today;

    // submit date (tidak dipakai), kalau mau pakai submit button, pakai ini
    $('#dateForm').on('submit', function (event) {
        event.preventDefault();
        tableByDate.ajax.reload();
        tableQcData.ajax.reload();
    });

    // table by date data
    const tableByDate = $('#tableDataByDate').DataTable({
        paging: false,
        searching: false,
        info: false,
        processing: true,
        serverSide: true,
        responsive: false,
        scrollX: true,
        scrollY: "200px",
        scrollCollapse: true,
        fixedHeader: true,
        autoWidth: false,

        ajax: {
            url: 'CircularTropodo/getDataFromDate',
            data: function (d) {
                if (
                    nomorButton === 1 ||
                    nomorButton === 2 ||
                    nomorButton === 3 ||
                    refreshed === 1
                ) {
                    d.TglLog = $('#tanggal').val();
                }
            },
            dataType: 'json',
            type: 'GET'
        },

        columns: [
            { data: 'Nama_Mesin' },
            { data: 'Shift' },
            { data: 'Id_Log' },
            { data: 'NAMA_BRG' }
        ],

        order: [[0, 'asc']]
    });

    // select isi tabel data by date
    $("#tableDataByDate tbody").on("click", "tr", async function () {
        panjangPotongan.value = 100;

        ukuranLebar.value = "";
        beratBarang.value = "";
        actualStWarp.value = "";
        actualStWeft.value = "";
        actualStReinf.value = "";
        actualElgWarp.value = "";
        actualElgWeft.value = "";
        actualElgReinf.value = "";
        standartStWarp.value = 0;
        standartStWeft.value = 0;

        var selectedRow = tableByDate.row(this).data();
        var IdLog = selectedRow.Id_Log;

        idLog.value = IdLog;

        try {
            const response = await $.ajax({
                url: "CircularTropodo/showDetailByLog",
                type: "GET",
                data: { IdLog: IdLog },
            });

            if (response.length > 0) {
                mesin.value = response[0].mesin.trim(); // item number
                ukuran.value = response[0].ukuran.trim(); // ukuran
                waftRajutan.value = response[0].waftRajutan.trim(); // txtwaft
                weftRajutan.value = response[0].weftRajutan.trim(); // txtweft
                waftBenang.value = response[0].waftBenang.trim(); // waftBenang
                weftBenang.value = response[0].weftBenang.trim(); // weftBenang
                waftDenier.value = response[0].waftDenier.trim(); // waftDenier
                weftDenier.value = response[0].weftDenier.trim(); // weftDenier
                standartStWarp.value = FormatNumber(4.5 * (waftRajutan.value * 2) * waftDenier.value / 1000, 2);
                standartStWeft.value = FormatNumber(4.5 * (weftRajutan.value * 2) * weftDenier.value / 1000, 2)
                Lebar = response[0].Lebar.trim();
                D_TEK9 = response[0].D_TEK9.trim();
                JenisKrg = response[0].JenisKrg.trim();
                updateBeratReinforced();
                await ambilBeratStandart();

                if (beratStandart.value == 0) {
                    updateBeratStandart();
                }
            } else {
                console.error("No data found for the specified IdLog:", IdLog);
            }
        } catch (error) {
            console.error("Error fetching data detail:", error);
        }

        tableByDate.$("tr.selected").removeClass("selected");
        $(this).addClass("selected");
    });

    // table qc data (bawah)
    const tableQcData = $('#tableQcData').DataTable({
        paging: false,
        searching: false,
        info: false,
        processing: true,
        serverSide: true,
        ajax: {
            url: 'CircularTropodo/getQcData',
            data: function (d) {
                if (nomorButton === 1 || nomorButton === 2 || nomorButton === 3 || refreshed === 1) {
                    d.TglLog = $('#tanggal').val();
                }
            },
            dataType: 'json',
            type: 'GET'
        },
        columns: [
            { data: 'Nama_Mesin' },
            { data: 'Shift' },
            { data: 'Id_Log' },
            { data: 'R_Ukuran' },
            { data: 'R_Potongan' },
            { data: 'R_Berat' },
            { data: 'R_BeratSTD' },
            { data: 'Keterangan' },
            { data: 'St_Warp' },
            { data: 'Elg_Warp' },
            { data: 'St_Weft' },
            { data: 'Elg_Weft' },
            { data: 'St_Reinforced' },
            { data: 'Elg_Reinforced' },
            { data: 'Berat_Reinforced' },
            { data: 'Standart_WA' },
            { data: 'Standart_WE' },
            { data: 'Standart_ElgWA' },
            { data: 'Standart_ElgWE' }
        ],
        order: [[0, 'asc']],
        paging: false,
        responsive: false,
        scrollX: true,
        scrollY: "200px",
        scrollCollapse: true,
        fixedHeader: true,
        autoWidth: false,
    });

    function numberFormat(value) {
        return parseFloat(value).toFixed(2);
    }

    // Select Qc Data
    $("#tableQcData tbody").on("click", "tr", async function () {
        var data = tableQcData.row(this).data();
        var IdLog = data.Id_Log;

        // untuk proses isi dan refresh sendiri, tidak bisa diklik
        if (nomorButton != 2 && nomorButton != 3) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hanya untuk proses KOREKSI/HAPUS!',
            });
            return;
        }

        if (data) {
            mesin.value = data.Nama_Mesin;
            idLog.value = data.Id_Log;
            ukuran.value = numberFormat(data.R_Ukuran);
            ukuranLebar.value = numberFormat(data.R_Ukuran);
            panjangPotongan.value = numberFormat(data.R_Potongan);
            beratBarang.value = numberFormat(data.R_Berat);
            beratReinforced.value = numberFormat(data.Berat_Reinforced);
            beratStandart.value = numberFormat(data.R_BeratSTD);

            actualStWarp.value = numberFormat(data.St_Warp);
            actualElgWarp.value = numberFormat(data.Elg_Warp);
            actualStWeft.value = numberFormat(data.St_Weft);
            actualElgWeft.value = numberFormat(data.Elg_Weft);
            actualStReinf.value = numberFormat(data.St_Reinforced);
            actualElgReinf.value = numberFormat(data.Elg_Reinforced);

            standartStWarp.value = numberFormat(data.Standart_WA);
            standartStWeft.value = numberFormat(data.Standart_WE);
            standartElgWarp.value = data.Standart_ElgWA ?? '0';
            standartElgWeft.value = data.Standart_ElgWE ?? '0';
            Id_QC = data.Id_QC;
            Ket = data.Keterangan;
        }

        // ada data waft dan weft yang tidak ada di table, FETCH DATA WAFT&WEFT
        try {
            const response = await $.ajax({
                url: 'CircularTropodo/getWaftWeft',
                type: 'GET',
                data: { IdLog: IdLog },
                dataType: 'json'
            });

            if (response.length > 0) {
                waftRajutan.value = response[0].Waft_Rajutan.trim();
                weftRajutan.value = response[0].Weft_Rajutan.trim();
                waftBenang.value = response[0].Waft_Benang.trim();
                weftBenang.value = response[0].Weft_Benang.trim();
                waftDenier.value = response[0].Waft_Denier.trim();
                weftDenier.value = response[0].Weft_Denier.trim();
                Lebar = response[0].Lebar;
                JenisKrg = response[0].JenisKrg;
                D_TEK9 = response[0].D_TEK9;
            }
            else {
                console.error("No data found for the specified IdLog:", IdLog);
            }
        } catch (error) {
            console.error("Error fetching Waft & Weft data:", error);
        }

        tableQcData.$("tr.selected").removeClass("selected");
        $(this).addClass("selected");
    });

    // buat keypress enter tiap input
    const debounceTime = 100;
    let debounceTimer;
    let processingInput = false;
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter') {
                if (input.id === 'beratBarang') {
                    if (debounceTimer) {
                        clearTimeout(debounceTimer);
                    }

                    debounceTimer = setTimeout(async () => {
                        if (!processingInput) {
                            processingInput = true;
                            await handleInput(input, index);
                            processingInput = false;
                        }
                    }, debounceTime);

                    event.preventDefault();
                    return;
                } else {
                    await handleInput(input, index);
                    event.preventDefault();
                }
            }
        });
    });

    async function handleInput(input, index) {
        if (input.id === 'ukuranLebar' || input.id === 'panjangPotongan' || input.id === 'beratBarang') {
            if (input.value.trim() === '' || parseFloat(input.value.trim()) <= 0) {
                Swal.fire({
                    title: 'Isi Data!',
                    text: `Isi ${input.previousElementSibling.innerText} dengan angka lebih dari 0 sebelum lanjut ke yang lain!`,
                    icon: 'warning',
                    confirmButtonText: 'OK'
                }).then(() => {
                    input.focus();
                });
                return;
            }
        } else if (input.value.trim() === '') {
            input.value = '0.00';
        }

        if (input.id === 'panjangPotongan') {
            updateBeratReinforced();
            await ambilBeratStandart();

            if (beratStandart.value == 0) {
                updateBeratStandart();
            }
        }

        const nextIndex = index + 1;
        if (nextIndex < inputs.length) {
            setTimeout(() => inputs[nextIndex].focus(), 0);
        } else {
            setTimeout(() => prosesButton.focus(), 0);
        }
    }

    // Event listener untuk input panjangPotongan
    panjangPotongan.addEventListener('input', function () {
        updateBeratReinforced(); // Update berat reinforced ketika input berubah
    });

    // Format angka 2 desimal
    function FormatNumber(num, decimalPlaces) {
        return num.toFixed(decimalPlaces);
    }

    // Update berat reinforced
    function updateBeratReinforced() {
        if (Lebar > 0 && D_TEK9 > 0) {
            let totalReinforced = FormatNumber((panjangPotongan.value * Lebar * (waftRajutan.value * waftDenier.value) / (1143000 * D_TEK9)) / 2, 2);
            beratReinforced.value = totalReinforced;
        }
        else {
            beratReinforced.value = 0.00;
        }
    }

    // Update berat standart kalo value di database masih 0
    function updateBeratStandart() {
        if (/^BELAH/.test(JenisKrg) || /^BLH/.test(JenisKrg)) {
            let totalStandart = FormatNumber(((panjangPotongan.value * ukuran.value * ((waftRajutan.value * waftDenier.value) + (weftRajutan.value * weftDenier.value))) / 1143000) / 2, 2);
            beratStandart.value = totalStandart;
        } else if (/^BELAH KR-KN/.test(JenisKrg) || /^BLH KR-KN/.test(JenisKrg)) {
            let totalStandart = FormatNumber(((panjangPotongan.value * (ukuran.value / 2) * ((waftRajutan.value * waftDenier.value) + (weftRajutan.value * weftDenier.value))) / 1143000) / 2, 2);
            beratStandart.value = totalStandart;
        } else {
            let totalStandart = FormatNumber(((panjangPotongan.value * ukuran.value * ((waftRajutan.value * waftDenier.value) + (weftRajutan.value * weftDenier.value))) / 1143000), 2);
            beratStandart.value = totalStandart;
        }
    }

    // Ambil berat standart dari server
    async function ambilBeratStandart() {
        try {
            const response = await $.ajax({
                url: 'CircularTropodo/ambilBeratStandart',
                type: 'GET',
                data: { IdLog: idLog.value },
                dataType: 'json'
            });

            if (response && response.length > 0) {
                beratStandart.value = response[0].beratStandart.trim();
            } else {
                console.error("No data found for the specified IdLog:", idLog.value);
            }
        } catch (error) {
            console.error("Error fetching standard weight:", error);
        }
    }

    // cek apakah semua udah terisi buat tombol proses
    function allInputsFilled() {
        for (const input of inputAll) {
            if (input.value.trim() === '') {
                Swal.fire({
                    title: 'Isi Data!',
                    text: `Isi ${input.previousElementSibling.innerText} sebelum lanjut ke yang lain!`,
                    icon: 'warning',
                    confirmButtonText: 'OK'
                }).then(() => {
                    input.focus();
                });
                return false;
            }
        }
        return true;
    }

    // untuk hilangkan semua html form saat klik function button
    function clearInput() {
        inputAll.forEach(input => {
            if (input.id !== 'standartElgWarp' && input.id !== 'standartElgWeft') {
                input.value = '';
            }
        });
        standartElgWarp = '25-30';
        standartElgWeft = '25-30';

    }

    // button untuk refresh table qc
    refreshButton.addEventListener('click', async () => {
        if (nomorButton == 1 || nomorButton == 2 || nomorButton == 3) {
            refreshed = 0;
            prosesButton.disabled = false;
        }
        else {
            refreshed = 1;
            prosesButton.disabled = true;
        }

        tableQcData.ajax.reload();
        clearInput()
    });

    // saat salah satu dipencet (harus salah satu dipencet agar bisa batal)
    function disableButtons() {
        isiButton.disabled = true;
        koreksiButton.disabled = true;
        hapusButton.disabled = true;
        prosesButton.disabled = false;
    }

    // saat tekan batal
    function enableButtons() {
        isiButton.disabled = false;
        koreksiButton.disabled = false;
        hapusButton.disabled = false;
    }

    // Inisialisasi status tombol
    enableButtons();

    // Event listener untuk tombol ISI
    isiButton.addEventListener('click', async () => {
        nomorButton = 1;
        tableByDate.ajax.reload();
        tableQcData.ajax.reload();
        disableButtons();
        isiButton.disabled = false;
        clearInput();
    });

    // Event listener untuk tombol KOREKSI
    koreksiButton.addEventListener('click', async () => {
        nomorButton = 2;
        tableQcData.ajax.reload();
        disableButtons();
        koreksiButton.disabled = false;
        clearInput();
    });

    // Event listener untuk tombol DELETE
    hapusButton.addEventListener('click', async () => {
        nomorButton = 3;
        tableQcData.ajax.reload();
        disableButtons();
        hapusButton.disabled = false;
        clearInput();
    });

    // Event listener untuk tombol BATAL
    batalButton.addEventListener('click', async () => {
        enableButtons();
        clearInput();

        nomorButton = 0;
        refreshed = 0;
        tableByDate.clear().draw();
        tableQcData.clear().draw();
    });

    // button proses ISI
    let canClickProsesButton = true;

    prosesButton.addEventListener('click', async () => {
        if (!canClickProsesButton) return; // Prevent further clicks
        canClickProsesButton = false; // Disable further clicks

        if (!allInputsFilled()) {
            canClickProsesButton = true; // Re-enable button if inputs are not filled
            return;
        }

        if (panjangPotongan.value === "" || ukuranLebar.value === "" || beratStandart.value == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Proses Tidak Dapat Dilanjutkan, Isi Berat Standart Terlebih Dahulu !",
                showConfirmButton: true,
                // timer: 2000 
            });
            btn_proses.disabled = false;
            return;
        }

        if (beratStandart.value === "" || beratStandart.value == 0 || beratStandart.value == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Proses Tidak Dapat Dilanjutkan, Isi Berat Standart Terlebih Dahulu !",
                showConfirmButton: true,
                // timer: 2000 
            });
            btn_proses.disabled = false;
            return;
        }

        // ISI
        if (nomorButton == 1) {
            $.ajax({
                type: 'PUT', // update
                url: 'CircularTropodo/prosesIsiData', // update
                data: {
                    _token: csrfToken,
                    IdLog: idLog.value,
                    Tanggal: tanggal.value,
                    Ukuran: ukuranLebar.value,
                    UkuranSTD: ukuran.value,
                    Potongan: panjangPotongan.value,
                    BeratSTD: beratStandart.value,
                    Berat: beratBarang.value,
                    StWarp: actualStWarp.value,
                    ElgWarp: actualElgWarp.value,
                    StWeft: actualStWeft.value,
                    ElgWeft: actualElgWeft.value,
                    StReinforced: actualStReinf.value,
                    ElgReinforced: actualElgReinf.value,
                    BeratReinforced: beratReinforced.value,
                    StandartWA: standartStWarp.value,
                    StandartWE: standartStWeft.value,
                    StandartElgWA: standartElgWarp.value,
                    StandartElgWE: standartElgWeft.value,
                },
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.success,
                        });

                        clearInput();
                        tableByDate.ajax.reload();
                        tableQcData.ajax.reload();
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
                complete: function () {
                    // Re-enable the button after a delay of 1 second
                    setTimeout(() => {
                        canClickProsesButton = true;
                    }, 3000);
                }
            });
        }

        // KOREKSI
        else if (nomorButton == 2) {
            $.ajax({
                type: 'PUT',
                url: 'CircularTropodo/prosesKoreksiData',
                data: {
                    _token: csrfToken,
                    Ukuran: ukuranLebar.value,
                    Potongan: panjangPotongan.value,
                    BeratSTD: beratStandart.value,
                    Berat: beratBarang.value,
                    StWarp: actualStWarp.value,
                    ElgWarp: actualElgWarp.value,
                    StWeft: actualStWeft.value,
                    ElgWeft: actualElgWeft.value,
                    StReinforced: actualStReinf.value,
                    ElgReinforced: actualElgReinf.value,
                    BeratReinforced: beratReinforced.value,
                    StandartWA: standartStWarp.value,
                    StandartWE: standartStWeft.value,
                    StandartElgWA: standartElgWarp.value,
                    StandartElgWE: standartElgWeft.value,
                    Id_QC: Id_QC
                },
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.success,
                        });

                        clearInput();
                        tableQcData.ajax.reload();
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
                complete: function () {
                    setTimeout(() => {
                        canClickProsesButton = true;
                    }, 3000);
                }
            });
        }

        // HAPUS
        else if (nomorButton == 3) {
            $.ajax({
                type: 'DELETE',
                url: 'CircularTropodo/hapusData',
                data: {
                    _token: csrfToken,
                    Id_QC: Id_QC
                },
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: response.success,
                        });

                        clearInput();
                        tableQcData.ajax.reload();
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                },
                complete: function () {
                    setTimeout(() => {
                        canClickProsesButton = true;
                    }, 3000);
                }
            });
        }

        document.activeElement.blur();
    });


});
