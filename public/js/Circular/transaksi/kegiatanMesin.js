//#region Variables
let csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
// Input elements
const txtIdOrder = document.getElementById("id_order");
const txtNamaOrder = document.getElementById("nama_order");
const txtJamKerjaAwal = document.getElementById("jam_kerja_awal");
const txtJamKerjaAkhir = document.getElementById("jam_kerja_akhir");
const txtRpm = document.getElementById("rpm");
const txtShuttle = document.getElementById("shuttle");
const txtStatusPlc = document.getElementById("status_plc");
const txtIdPlc = document.getElementById("id_plc");
const txtCounterAwal = document.getElementById("counter_awal");
const txtCounterAkhir = document.getElementById("counter_akhir");
const txtMeterManual = document.getElementById("meter_manual");
const dtTanggal1 = document.getElementById("tanggal1");
const hidTanggal = document.getElementById("tanggal2");
const hidIdMesin = document.getElementById("id_mesin");
const hidIdTypeMesin = document.getElementById("id_type_mesin");
let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");
let btn_redisplay = document.getElementById("btn_redisplay");
let totalKg = document.getElementById("totalKg");

// Select elements
const slcIdLog = document.getElementById("id_log");
const slcStatusLog = document.getElementById("status_log");
const slcTypeMesin = document.getElementById("type_mesin");
const slcMesin = document.getElementById("nama_mesin");
const slcShift = document.getElementById("shift");
const slcShiftTable = document.getElementById("shift_table");
const slcKaryawan = document.getElementById("nama_karyawan");

// Button & other elements
const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");
const labelPLC = document.getElementById("label_plc");

tgl_awal.valueAsDate = new Date();
// tgl_awal.valueAsDate = new Date(2025, 11, 25);
tgl_akhir.valueAsDate = new Date();
slcShiftTable.disabled = false;
let table_bawah = $("#table_bawah").DataTable({
    // columnDefs: [{ targets: [5, 6], visible: false }],
    paging: false,
    scrollY: "300px",
    scrollX: "300px",
    scrollCollapse: true,
});
// Non-elements
var modeProses = -1;
var sTransfer = "";
var idKaryawan = "";

const elements = $(
    "#" +
    slcStatusLog.id +
    ", #" +
    slcTypeMesin.id +
    ", #" +
    slcMesin.id +
    ", #" +
    slcShift.id +
    ", #" +
    txtRpm.id +
    ", #" +
    txtShuttle.id +
    ", #" +
    txtCounterAkhir.id
);

//#endregion

//#region Listeners

btn_redisplay.addEventListener("click", async function (event) {
    event.preventDefault();
    // if ($("#" + slcTypeKain.id).val() == 1) {
    table_bawah = $("#table_bawah").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        destroy: true,
        ajax: {
            url: "/order/show/getDataHasilKg",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                    tgl_awal: tgl_awal.value,
                    tgl_akhir: tgl_akhir.value,
                    shift: slcShiftTable.value.trim(),
                });
            },
        },
        columns: [
            {
                data: "Id_Log",
                // render: function (data, type, row) {
                //     if (type === "display") {
                //         return `
                //     <a href="javascript:void(0)"
                //        class="link-Id_Log text-primary"
                //        data-id="${data}">
                //         ${data}
                //     </a>
                //     `;
                //     }
                //     return data; // penting untuk sorting & searching
                // }
            },
            {
                data: 'tanggal_raw', // Data asli untuk sorting
                render: function (data, type, row) {
                    // type === 'display' digunakan saat menampilkan di tabel
                    if (type === 'display') {
                        return row.Tgl_Log; // tampilkan versi m/d/Y
                    }
                    return data; // untuk sorting & filtering (yyyy-mm-dd)
                }
            },
            { data: "Keterangan" },
            // { data: "Shift" },
            { data: "Nama_mesin" },
            { data: "Id_order" },
            { data: "A_rpm" },
            { data: "Ukuran" },
            { data: "Rajutan" },
            { data: "Denier" },
            { data: "Hasil_Meter" },
            {
                data: "Hasil_Kg",
                render: function (data, type, row) {
                    return numeral(data).format("0.00");
                }
            }
        ],
        createdRow: function (row, data, dataIndex) {
            $(row).css("font-family", "Arial");
            $(row).css("font-size", "14px");
        },
        headerCallback: function (thead, data, start, end, display) {
            $(thead).find("th")
                .css("font-family", "Arial")
                .css("font-size", "14px")
                .css("text-align", "center");
        },
        // order: [[1, "asc"]],
        paging: false,
        scrollY: "300px",
        scrollCollapse: true,

        // 👉 HITUNG TOTAL KG
        drawCallback: function (settings) {
            let api = this.api();

            let total = api
                .column(10, { page: "current" }) // index kolom Hasil_Kg
                .data()
                .reduce(function (a, b) {
                    return Number(a) + Number(b);
                }, 0);

            // tampilkan ke input totalKg dengan format 0.00
            document.getElementById("totalKg").value = numeral(total).format("0.00");

            let totalMeter = api
                .column(9, { page: "current" }) // index kolom Hasil_Meter
                .data()
                .reduce(function (a, b) {
                    return Number(a) + Number(b);
                }, 0);

            // tampilkan ke input totalMeter dengan format 0.00
            document.getElementById("totalMeter").value = numeral(totalMeter).format("0");
        }
    });
});

dtTanggal1.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (modeProses == 1) {
            slcStatusLog.focus();
        } else {
            slcIdLog.focus();
        }
    }
});

$("#" + slcStatusLog.id).on("select2:select", function () {
    slcTypeMesin.focus();
});

$("#" + slcTypeMesin.id).on("select2:select", function () {
    $("#" + slcMesin.id)
        .empty()
        .append(new Option())
        .trigger("change");

    $("#" + slcMesin.id).select2({
        placeholder: "",
        ajax: {
            url: url_MesinOrder,
            type: "GET",
            dataType: "json",
            delay: 250,

            data: function (params) {
                return {
                    searchItem: params.term,
                    page: params.page || 1,
                    idTypeMesin: $("#" + slcTypeMesin.id).val(),
                };
            },

            processResults: function (data, params) {
                params.page = params.page || 1;

                data.data.forEach(function (d) {
                    d.id = d.Id_mesin;

                    if (d.Id_mesin && d.Nama_mesin) {
                        d.text = d.Id_mesin + " | " + d.Nama_mesin;
                    }
                });

                return {
                    results: data.data,
                    pagination: {
                        more: data.current_page < data.last_page,
                    },
                };
            },
        },

        templateResult: function (data) {
            if (data.loading) {
                return data.text;
            } else {
                return data.Id_mesin + " | " + data.Nama_mesin;
            }
        },

        templateSelection: function (data) {
            return data.text || "-- Pilih Mesin --";
        },
    });

    slcMesin.disabled = false;
    slcMesin.focus();
});

$("#" + slcShift.id).on("select2:select", function () {
    switch (this.value) {
        case "P":
            txtJamKerjaAwal.value = "07:00";
            txtJamKerjaAkhir.value = "15:00";
            break;

        case "S":
            txtJamKerjaAwal.value = "15:00";
            txtJamKerjaAkhir.value = "23:00";
            break;

        case "M":
            txtJamKerjaAwal.value = "23:00";
            txtJamKerjaAkhir.value = "07:00";
            break;

        default:
            showToast("Shift tidak valid.");
            break;
    }

    getCounterFetch(hidIdMesin.value, slcShift.value);
    getPegawaiFetch(slcShift.value, hidIdMesin.value, txtIdOrder.value);

    txtRpm.disabled = false;
    txtShuttle.disabled = false;
    txtCounterAkhir.disabled = false;
    btnProses.disabled = false;
});

$("#" + slcShiftTable.id).on("select2:select", function () {
    switch (this.value) {
        case "P":
            btn_redisplay.focus();
            // txtJamKerjaAwal.value = "07:00";
            // txtJamKerjaAkhir.value = "15:00";
            break;

        case "S":
            btn_redisplay.focus();
            // txtJamKerjaAwal.value = "15:00";
            // txtJamKerjaAkhir.value = "23:00";
            break;

        case "M":
            btn_redisplay.focus();
            // txtJamKerjaAwal.value = "23:00";
            // txtJamKerjaAkhir.value = "07:00";
            break;

        default:
            showToast("Shift tidak valid.");
            break;
    }

    // getCounterFetch(hidIdMesin.value, slcShift.value);
    // getPegawaiFetch(slcShift.value, hidIdMesin.value, txtIdOrder.value);

    // txtRpm.disabled = false;
    // txtShuttle.disabled = false;
    // txtCounterAkhir.disabled = false;
    // btnProses.disabled = false;
});

$("#" + slcKaryawan.id).on("select2:select", function () {
    txtRpm.focus();
    idKaryawan = this.value;
});

$("#" + slcMesin.id).on("select2:select", function () {
    // $("#" + slcShift.id)
    //     .val(null)
    //     .trigger("change");

    // $("#" + slcKaryawan.id)
    //     .val(null)
    //     .trigger("change");

    txtJamKerjaAwal.value = "";
    txtJamKerjaAkhir.value = "";
    txtRpm.value = "";
    txtShuttle.value = "";
    txtCounterAwal.value = "";
    txtCounterAkhir.value = "";
    txtMeterManual.value = "";

    getDetailMesinFetch(this.value);
});

$("#" + slcIdLog.id).on("select2:select", function () {
    getDetailLog(slcIdLog.value);
});

btnIsi.addEventListener("click", function () {
    modeProses = 1;
    toggleButtons(2);
    // clearForm();
    $('input[type="text"], input[type="number"], input[type="time"]').val("");
    $('input[type="date"]').each(function () {
        if (!$(this).val()) { // cek apakah masih kosong
            $(this).val(getCurrentDate());
        }
    });
    $('input[type="checkbox"]').prop("checked", false);

    // let firstOptionValue = $("#status_log option:first").val();
    let firstOptionValue = $(this).find("option:first").val();
    $("#nama_mesin").val(firstOptionValue).trigger("change.select2");
    // $("#shift").val(firstOptionValue).trigger("change.select2");
    $("#nama_karyawan").val(firstOptionValue).trigger("change.select2");
    removeValidationWarning();
    txtMeterManual.value = "0";
    slcStatusLog.disabled = false;
    slcTypeMesin.disabled = false;
    slcMesin.disabled = false;
    dtTanggal1.disabled = false;
    dtTanggal1.focus();
});

btnKoreksi.addEventListener("click", function () {
    modeProses = 2;
    toggleButtons(2);
    clearForm();
    removeValidationWarning();
    txtMeterManual.value = "0";
    loadIdLogMesin();
    dtTanggal1.disabled = false;
    slcShift.disabled = false;
});

btnHapus.addEventListener("click", function () {
    modeProses = 3;
    toggleButtons(2);
    clearForm();
    removeValidationWarning();
    txtMeterManual.value = "0";
    loadIdLogMesin();
    dtTanggal1.disabled = false;
});

btnProses.addEventListener("click", function () {
    btnProses.disabled = true;
    // Dipanggil setelah lolos semua pengecekan
    const prosesKegiatanMesin = () => {
        let jam_kerja = hitungJamKerja();
        if (jam_kerja < 8) {
            showToast("Jam Kerja Yang Anda Masukan Salah !!, Koreksi Lagi");
            txtJamKerjaAwal.focus();
            btnProses.disabled = false;
            return;
        }

        let processGo;
        switch (modeProses) {
            case 1:
                processGo = () => {
                    prosesIsi(xMeter);
                };
                break;

            case 2:
                processGo = () => {
                    prosesKoreksi();
                };
                break;

            case 3:
                processGo = () => {
                    prosesHapus();
                };
                break;

            default:
                break;
        }

        validateAndProcess(processGo);
    };

    // Mengeset shift, hari, dan tanggal
    hidTanggal.value = getCurrentDate(-1);

    // Cek jumlah counter
    // Jika counter akhir - counter awal = 0, maka tidak valid kecuali status log "02"
    let countAwal = parseFloat(txtCounterAwal.value);
    let countAkhir = parseFloat(txtCounterAkhir.value);
    let xMeter = countAkhir - countAwal;
    if (countAwal > countAkhir) {
        showToast(
            "Counter Akhir yang dimasukkan tidak valid!<br>" +
            "Counter Akhir tidak bisa lebih kecil dari Counter Awal."
        );

        txtCounterAkhir.select();
        return;
    } else if (slcStatusLog.value == "02") {
        if (xMeter !== 0) {
            showToast("Counter Akhir yang dimasukkan tidak valid!");
            txtCounterAkhir.select();
            return;
        }
    }

    if (modeProses == 2) {
        // Cek karyawan untuk satu shift tidak boleh beda.
        fetchSelect(
            "/sp-order/SP_Cek_Pegawai/" +
            dtTanggal1.value +
            "~" +
            hidIdMesin.value +
            "~" +
            txtIdOrder.value +
            "~" +
            slcShift.value,
            (data) => {
                if (data[0]["Id_karyawan"] != slcKaryawan.value) {
                    showToast(
                        "Kode karyawan tidak sama dengan sebelumnya! " +
                        "\nKode Karyawan: <b>" +
                        data[0]["Id_karyawan"] +
                        "</b>"
                    );

                    slcKaryawan.focus();
                    return;
                } else {
                    prosesKegiatanMesin();
                }
            }
        );
    } else {
        prosesKegiatanMesin();
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent !== "Keluar") {
        toggleButtons(1);
        clearForm();
        removeValidationWarning();
        txtMeterManual.value = "0";
        disableAllInputs();
        btnIsi.focus();
    } else window.location.href = "/";
});
//#endregion

//#region Functions
function getPegawaiFetch(s_shift, s_id_mesin, s_id_order) {
    fetchSelect(
        "/sp-order/sp_List_log_Mesin~6/" +
        s_id_mesin +
        "~" +
        s_id_order +
        "~" +
        s_shift.trim(),
        (data) => {
            addOptionToSelect(
                slcKaryawan.id,
                data[0]["Id_karyawan"],
                data[0]["nama_peg"],
                true
            );

            slcKaryawan.disabled = true;
            idKaryawan = data[0]["nama_peg"].split("<")[1].slice(0, -1);
        },
        () => {
            $("#" + slcKaryawan.id)
                .empty()
                .append(new Option())
                .trigger("change");

            $("#" + slcKaryawan.id).select2({
                placeholder: "",
                ajax: {
                    url: url_DaftarPegawai,
                    type: "GET",
                    dataType: "json",
                    delay: 250,

                    data: function (params) {
                        return {
                            searchItem: params.term,
                            page: params.page || 1,
                            shift: $("#" + slcShift.id).val(),
                            tanggal: dtTanggal1.value,
                        };
                    },

                    processResults: function (data, params) {
                        params.page = params.page || 1;

                        console.log(data.data);

                        data.data.forEach(function (d) {
                            d.id = d.Kd_pegawai;

                            if (d.Kd_pegawai && d.nama_peg) {
                                d.text = d.Kd_pegawai + " | " + d.nama_peg;
                            }
                        });

                        return {
                            results: data.data,
                            pagination: {
                                more: data.current_page < data.last_page,
                            },
                        };
                    },
                },

                templateResult: function (data) {
                    if (data.loading) {
                        return data.text;
                    } else {
                        return data.nama_peg;
                    }
                },

                templateSelection: function (data) {
                    return data.text || "-- Pilih Karyawan --";
                },
            });

            slcKaryawan.disabled = false;
            slcKaryawan.focus();
        }
    );
}

function getCounterFetch(s_id_mesin, s_shift) {
    txtCounterAwal.value = 0;
    fetchSelect("/sp-order/Sp_List_Mesin~2/" + s_id_mesin, (data) => {
        switch (s_shift) {
            case "P":
                txtCounterAwal.value = data[0]["Counter_Pagi"];
                break;

            case "S":
                txtCounterAwal.value = data[0]["Counter_Sore"];
                break;

            case "M":
                txtCounterAwal.value = data[0]["Counter_Malam"];
                break;

            default:
                break;
        }
    });
}

function getDetailMesinFetch(s_id_mesin) {
    fetchSelect(
        "/sp-order/Sp_List_Mesin~4/" + s_id_mesin,
        (data) => {
            txtRpm.value = data[0]["Rpm"];
            txtShuttle.value = data[0]["Number_of_shutle"];
            txtIdOrder.value = data[0]["Id_Order"];
            txtNamaOrder.value = data[0]["nama_order"];

            let dataPLC = data[0]["Statuc_PLC"] ?? "";
            txtStatusPlc.value = dataPLC;
            labelPLC.textContent = dataPLC === "Y" ? "Active" : "Non Active";
            txtIdPlc.value = dataPLC === "Y" ? data[0]["Id_PLC"] : "";

            fetchSelect(
                "/sp-order/Sp_Check_Order/" + txtIdOrder.value,
                (data) => {
                    if (data[0]["Ada"] > 0) {
                        showToast(
                            "Order ini sudah di STOP ORDER! Mohon periksa kembali!"
                        );
                    } else {
                        hidIdMesin.value = slcMesin.value;

                        if ($("#shift").val() == '') { //Jika shift belum dipilih
                            slcShift.disabled = false;
                            slcShift.focus();
                        } else { //Jika shift sudah dipilih
                            slcShift.disabled = false;
                            switch (slcShift.value) {
                                case "P":
                                    txtJamKerjaAwal.value = "07:00";
                                    txtJamKerjaAkhir.value = "15:00";
                                    break;

                                case "S":
                                    txtJamKerjaAwal.value = "15:00";
                                    txtJamKerjaAkhir.value = "23:00";
                                    break;

                                case "M":
                                    txtJamKerjaAwal.value = "23:00";
                                    txtJamKerjaAkhir.value = "07:00";
                                    break;

                                default:
                                    showToast("Shift tidak valid.");
                                    break;
                            }

                            getCounterFetch(hidIdMesin.value, slcShift.value);
                            getPegawaiFetch(slcShift.value, hidIdMesin.value, txtIdOrder.value);

                            txtRpm.disabled = false;
                            txtShuttle.disabled = false;
                            txtCounterAkhir.disabled = false;
                            btnProses.disabled = false;
                            txtCounterAkhir.focus();
                        }
                    }
                }
            );
        },
        () => {
            showToast(
                "Mesin ini sedang tidak beroperasi. Isi dulu pada menu Maintenance Mesin & Order Aktif."
            );

            slcMesin.focus();
        }
    );
}

function getDetailLog(s_id_log) {
    fetchSelect("/sp-order/sp_List_Log_Mesin_PerLog/" + s_id_log, (data) => {
        dtTanggal1.value = dateTimeToDate(data[0]["Tgl_Log"]);
        addOptionToSelect(slcStatusLog.id, data[0]["Status_log"]);
        addOptionToSelect(slcTypeMesin.id, data[0]["IdType_Mesin"]);
        addOptionToSelect(
            slcMesin.id,
            data[0]["Id_mesin"],
            data[0]["Nama_mesin"]
        );
        hidIdMesin.value = data[0]["Id_mesin"];
        hidIdTypeMesin.value = data[0]["IdType_Mesin"];
        txtRpm.value = data[0]["A_rpm"];
        txtShuttle.value = data[0]["A_n_shutle"];
        txtIdOrder.value = data[0]["Id_order"];
        txtNamaOrder.value = data[0]["NAMA_BRG"];
        txtCounterAwal.value = data[0]["Counter_mesin_awal"];
        txtCounterAkhir.value = data[0]["Counter_mesin_akhir"];
        addOptionToSelect(
            slcKaryawan.id,
            data[0]["Id_karyawan"],
            data[0]["nama_peg"]
        );
        idKaryawan = data[0]["Id_karyawan"];
        addOptionToSelect(slcShift.id, data[0]["Shift"]);
        txtJamKerjaAwal.value = dateTimeToTime(data[0]["Awal_jam_kerja"]);
        txtJamKerjaAkhir.value = dateTimeToTime(data[0]["Akhir_jam_kerja"]);
        sTransfer = data[0]["Kalkulasi_Meter"];
        txtMeterManual.value = data[0]["MeterManual"];

        if (modeProses !== 2) {
            btnProses.disabled = false;
            btnProses.focus();
        } else {
            txtRpm.disabled = false;
            txtShuttle.disabled = false;
            txtCounterAkhir.disabled = false;
            txtMeterManual.disabled = false;
            txtCounterAkhir.focus();
        }
    });
}

function prosesIsi(x_meter) {
    // Mengambil rencana jumlah order & jumlah order yang sudah dikerjakan
    fetchSelect("/sp-order/Sp_List_Order~2/" + txtIdOrder.value, (data) => {
        let sJmlOrder = data[0]["A_jumlah_Order"] ?? 0;
        let sROrder = data[0]["R_jumlah_Order"] ?? 0;

        // Dipanggil setelah dilakukan pengecekan jumlah order
        const isiDB = () => {
            // Proses Isi
            fetchStatement(
                "/sp-order/sp_Insert_Log_Mesin/" +
                dtTanggal1.value +
                "~" +
                parseInt(hidIdMesin.value) +
                "~" +
                slcShift.value.trim() +
                "~" +
                parseInt(txtIdOrder.value) +
                "~" +
                (idKaryawan || "") +
                "~" +
                parseInt(txtCounterAwal.value) +
                "~" +
                parseInt(txtCounterAkhir.value) +
                "~" +
                parseInt(txtRpm.value) +
                "~" +
                parseInt(txtShuttle.value) +
                "~" +
                slcStatusLog.value.trim() +
                "~" +
                txtJamKerjaAwal.value.replace(":", "_") +
                "~" +
                txtJamKerjaAkhir.value.replace(":", "_") +
                "~" +
                parseInt(txtMeterManual.value),
                () => {
                    disableAllInputs();
                    toggleButtons(1);
                    dtTanggal1.dispatchEvent(new Event("change"));
                    tgl_awal.disabled = false;
                    tgl_akhir.disabled = false;
                    slcShiftTable.disabled = false;
                    // showToast("Data berhasil disimpan!", "success");
                    $.ajax({
                        url: "/order/show/HasilKgLogMesin",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            txtIdOrder: txtIdOrder.value,
                            txtCounterAwal: txtCounterAwal.value,
                            txtCounterAkhir: txtCounterAkhir.value,
                        },
                        success: function (data) {
                            console.log(data);
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil!",
                                text: "Data berhasil disimpan!",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                    btnIsi.focus();
                }
            );
        };

        isiDB();

        // if (
        //     parseFloat(sJmlOrder) + parseFloat(x_meter) > parseFloat(sROrder) &&
        //     (slcStatusLog.value.trim() == "01" ||
        //         slcStatusLog.value.trim() == "03" ||
        //         slcStatusLog.value.trim() == "04")
        // ) {
        //     // Cek jumlah meter pada T_Order
        //     showModal(
        //         "Jumlah order melebihi rencana order.<br>" +
        //         "Rencana Order: <b>" +
        //         addThousandsSeparator(parseInt(sROrder)) +
        //         "</b><br>" +
        //         "Sudah Diproduksi: <b>" +
        //         addThousandsSeparator(parseInt(sJmlOrder)) +
        //         "</b><br>" +
        //         "Hasil Sekarang: <b>" +
        //         addThousandsSeparator(parseInt(x_meter)) +
        //         "</b><br>" +
        //         "Apakah yakin ingin melanjutkan?",
        //         () => {
        //             isiDB();
        //         },
        //         () => {
        //             return;
        //         }
        //     );
        // } else {
        //     isiDB();
        // }
    });
}

function prosesKoreksi() {
    fetchStatement(
        "/sp-order/sp_Update_Log_Mesin/" +
        slcIdLog.value.trim() +
        "~" +
        dtTanggal1.value +
        "~" +
        parseInt(hidIdMesin.value) +
        "~" +
        slcShift.value.trim() +
        "~" +
        parseInt(txtIdOrder.value) +
        "~" +
        (idKaryawan || "") +
        "~" +
        parseInt(txtCounterAwal.value) +
        "~" +
        parseInt(txtCounterAkhir.value) +
        "~" +
        parseInt(txtRpm.value) +
        "~" +
        parseInt(txtShuttle.value) +
        "~" +
        slcStatusLog.value.trim() +
        "~" +
        txtJamKerjaAwal.value.replace(":", "_") +
        "~" +
        txtJamKerjaAkhir.value.replace(":", "_") +
        "~" +
        parseFloat(txtMeterManual.value) +
        "~" +
        sTransfer,
        () => {
            disableAllInputs();
            toggleButtons(1);
            tgl_awal.disabled = false;
            tgl_akhir.disabled = false;
            slcShiftTable.disabled = false;
            // showToast("Data berhasil dikoreksi!", "success");
            $.ajax({
                url: "/order/show/HasilKgLogMesin",
                type: "GET",
                data: {
                    _token: csrfToken,
                    slcIdLog: slcIdLog.value.trim(),
                    txtIdOrder: txtIdOrder.value,
                    txtCounterAwal: txtCounterAwal.value,
                    txtCounterAkhir: txtCounterAkhir.value,
                },
                success: function (data) {
                    console.log(data);
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: "Data berhasil disimpan!",
                        timer: 2000,
                        showConfirmButton: false
                    });
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                },
            });
            btnIsi.focus();
        }
    );
}

function prosesHapus() {
    fetchStatement(
        "/sp-order/sp_Delete_Log_Mesin/" + slcIdLog.value.trim(),
        (data) => {
            if (data == -1) {
                fetchSelect(
                    "/sp-order/sp_Delete_Log_Mesin~ERROR/" +
                    slcIdLog.value.trim(),
                    (data2) => {
                        // showToast(data2[0]["NmError"], "error");
                        Swal.fire({
                            icon: "error",
                            title: "Gagal!",
                            text: data2[0]["NmError"],
                            showConfirmButton: true
                        });
                    }
                );
            } else {
                // showToast("Data berhasil dihapus!", "success");
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data berhasil dihapus!",
                    timer: 2000,
                    showConfirmButton: false
                });
                disableAllInputs();
                toggleButtons(1);
                tgl_awal.disabled = false;
                tgl_akhir.disabled = false;
                slcShiftTable.disabled = false;
            }

            btnIsi.focus();
        }
    );
}

function hitungJamKerja() {
    // Get the input time values
    var time1 = txtJamKerjaAwal.value;
    var time2 = txtJamKerjaAkhir.value;

    // Parse the time values into Date objects (today's date is used for calculation)
    var date1 = new Date("2000-01-01T" + time1 + ":00");
    var date2 = new Date("2000-01-01T" + time2 + ":00");

    // Calculate the time difference in milliseconds
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());

    // Convert the time difference to hours
    var hoursDiff = timeDiff / (1000 * 3600);

    // Display the result
    return hoursDiff.toFixed(2);
}

function loadIdLogMesin() {
    $("#" + slcIdLog.id).select2({
        placeholder: "",
        ajax: {
            url: url_IdLog,
            type: "GET",
            dataType: "json",
            delay: 250,

            data: function (params) {
                return {
                    searchItem: params.term,
                    page: params.page || 1,
                    tanggal: dtTanggal1.value,
                };
            },

            processResults: function (data, params) {
                params.page = params.page || 1;

                console.log(data.data);

                data.data.forEach(function (d) {
                    d.id = d.Id_Log;

                    if (d.Id_Log && d.nama) {
                        d.text = d.Id_Log + " | " + d.nama;
                    }
                });

                return {
                    results: data.data,
                    pagination: {
                        more: data.current_page < data.last_page,
                    },
                };
            },
        },

        templateResult: function (data) {
            if (data.loading) {
                return data.text;
            } else {
                return data.Id_Log + " | " + data.nama;
            }
        },

        templateSelection: function (data) {
            return data.text || "-- Pilih Id Log --";
        },
    });

    slcIdLog.disabled = false;
    slcIdLog.focus();
}

/**
 *
 * @param {number} s_nilai - 2 untuk batal, 1 untuk keluar
 */
function toggleButtons(s_nilai) {
    switch (s_nilai) {
        case 2:
            btnIsi.disabled = true;
            btnKoreksi.disabled = true;
            btnHapus.disabled = true;
            btnProses.disabled = false;
            btnKeluar.textContent = "Batal";
            break;

        default:
            btnIsi.disabled = false;
            btnKoreksi.disabled = false;
            btnHapus.disabled = false;
            btnProses.disabled = true;
            btnKeluar.textContent = "Keluar";
            btnIsi.classList.remove("btn-clicked-isi");
            btnKoreksi.classList.remove("btn-clicked-koreksi");
            btnHapus.classList.remove("btn-clicked-hapus");
            break;
    }
}

function init() {
    addTxtListener(txtRpm, txtShuttle);
    addTxtListener(txtShuttle, txtCounterAkhir);
    addTxtListener(txtCounterAkhir, txtMeterManual, {
        extraAction: () => {
            if (
                parseFloat(txtCounterAwal.value) >
                parseFloat(txtCounterAkhir.value)
            ) {
                txtCounterAkhir.focus();
                showToast(
                    "Counter Akhir yang dimasukkan tidak valid!<br>" +
                    "Counter Akhir tidak bisa lebih kecil dari Counter Awal."
                );
            } else {
                txtMeterManual.disabled = false;
                txtMeterManual.focus();
            }
        },
        stopAction: true,
    });
    addTxtListener(txtMeterManual, btnProses);
    addTxtListener(txtJamKerjaAkhir, txtRpm, {
        extraAction: () => {
            if (modeProses == 1 && slcKaryawan.selectedIndex == 0) {
                slcKaryawan.disabled = false;
                slcKaryawan.focus();
            } else {
                txtRpm.disabled = false;
                txtRpm.focus();
            }
        },
        stopAction: true,
    });
    addTxtListener(txtJamKerjaAwal, txtJamKerjaAkhir);
    prepareButtons(btnIsi, btnKoreksi, btnHapus, btnKeluar);

    toggleButtons(1);
    dtTanggal1.value = getCurrentDate();

    $("#" + slcIdLog.id).select2({ placeholder: "-- Pilih Id Log --" });
    $("#" + slcStatusLog.id).select2({ placeholder: "-- Pilih Status Log --" });
    $("#" + slcTypeMesin.id).select2({ placeholder: "-- Pilih Type Mesin --" });
    $("#" + slcMesin.id).select2({ placeholder: "-- Pilih Mesin --" });
    $("#" + slcShift.id).select2({ placeholder: "-- Pilih Shift --" });
    $("#" + slcShiftTable.id).select2({ placeholder: "-- Pilih Shift --" });
    $("#" + slcKaryawan.id).select2({ placeholder: "-- Pilih Karyawan --" });

    attachRemoveWarning();
}

function validateAndProcess(process_action) {
    let is_invalid = false;

    elements.each(function () {
        if ($(this).is("input")) {
            if ($(this).val() === "" || $(this).val() == 0) {
                $(this).addClass("is-invalid");
                is_invalid = true;
            }
        } else if ($(this).is("select")) {
            if ($(this).prop("selectedIndex") === 0) {
                $(
                    '[aria-labelledby="select2-' + this.id + '-container"]'
                ).addClass("is-invalid");
                is_invalid = true;
            }
        }
    });

    if (is_invalid) {
        showToast("Data belum lengkap. Mohon periksa kembali!", "error");
        return;
    } else {
        process_action();
    }
}

function attachRemoveWarning() {
    elements.each(function () {
        if ($(this).is("input")) {
            $(this).on("input", function () {
                if ($(this).val() !== "") {
                    $(this).removeClass("is-invalid");
                }
            });
        } else if ($(this).is("select")) {
            $(this).on("select2:select", function () {
                if ($(this).prop("selectedIndex") !== 0)
                    $(
                        '[aria-labelledby="select2-' + this.id + '-container"]'
                    ).removeClass("is-invalid");
            });
        }
    });
}

function removeValidationWarning() {
    elements.each(function () {
        if ($(this).is("input")) {
            $(this).removeClass("is-invalid");
        } else if ($(this).is("select")) {
            $(
                '[aria-labelledby="select2-' + this.id + '-container"]'
            ).removeClass("is-invalid");
        }
    });
}

$(document).ready(function () {
    init();
    initModal();
});
//#endregion

//#region Modal Pegawai
const PG_dtAwal = document.getElementById("pg_tanggal_awal");
const PG_dtAkhir = document.getElementById("pg_tanggal_akhir");
const PG_btnPegawai = document.getElementById("btn_pegawai");

PG_btnPegawai.addEventListener("click", function () {
    // console.log(PG_dtAwal.value);
    // function convertDate(dt_string) {
    //     // Original date string
    //     let dateString = dt_string;

    //     // Create a new Date object from the string
    //     let date = new Date(dateString);

    //     // Extract year, month, and day components
    //     let year = date.getFullYear();
    //     let month = date.getMonth() + 1; // getMonth() returns 0-based month
    //     let day = date.getDate();

    //     // Format the date as "M/D/YYYY"
    //     let formattedDate = `${month}-${day}-${year}`;

    //     return formattedDate
    // }

    // let tglAwal = convertDate(PG_dtAwal.value);
    // let tglAkhir = convertDate(PG_dtAkhir.value);

    if (PG_dtAwal.value !== "" && PG_dtAkhir.value !== "") {
        fetchStatement(
            "/sp-order/Sp_Transfer_Pegawai/" +
            PG_dtAwal.value +
            "~" +
            PG_dtAkhir.value,
            (data) => {
                $("#modalPegawai").modal("hide");

                if (data == 0) {
                    showToast(
                        "Terdapat kendala dalam melakukan transfer data pegawai. " +
                        "<br>Mohon segera hubungi EDP.",
                        "error"
                    );
                } else {
                    showToast(
                        "Berhasil transfer data pegawai! " +
                        "<br>Total data pegawai: <b>" +
                        data +
                        "</b>",
                        "success"
                    );
                }
            }
        );
    } else {
        if (PG_dtAwal.value === "") {
            PG_dtAwal.classList.add("is-invalid");
        } else {
            PG_dtAwal.classList.remove("is-invalid");
        }

        if (PG_dtAkhir.value === "") {
            PG_dtAkhir.classList.add("is-invalid");
        } else {
            PG_dtAkhir.classList.remove("is-invalid");
        }
    }

    // Penjelasan cara kerja Sp_Transfer_Pegawai lihat folder "catatan_sp"
});

function initModal() {
    PG_dtAwal.value = getCurrentDate(-1);
    PG_dtAkhir.value = getCurrentDate(6);
    addTxtListener(PG_dtAwal, PG_dtAkhir);

    showModal("Apakah anda ingin melakukan transfer data pegawai?", () => {
        $("#modalPegawai").modal("show");
    });
}

$("#modalPegawai").on("hidden.bs.modal", function () {
    btnIsi.focus();
});
//#endregion

/**
 *
 * Test Case Tambah Kegiatan Mesin Gunakan tgl
 * 11/05/2024
 *
 * Test case untuk load data pegawai
 * Bisa ubah tanggal pada tabel pegawai shift di PAYROLL
 *
 */
