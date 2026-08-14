jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tanggal = document.getElementById("tanggal");
    let jam_prod = document.getElementById("jam_prod");
    let spek_benang = document.getElementById("spek_benang");
    let jumlah = document.getElementById("jumlah");
    let keterangan = document.getElementById("keterangan");
    let kel_samping = document.getElementById("kel_samping");
    let bendol = document.getElementById("bendol");
    let tebal = document.getElementById("tebal");
    let nglinting = document.getElementById("nglinting");
    let berbulu = document.getElementById("berbulu");
    let tipis = document.getElementById("tipis");
    let besar = document.getElementById("besar");
    let kecil = document.getElementById("kecil");
    let warna_lain = document.getElementById("warna_lain");
    let luka = document.getElementById("luka");
    let trial_warna = document.getElementById("trial_warna");
    let pinggiran = document.getElementById("pinggiran");
    let st_jelek = document.getElementById("st_jelek");
    let elongation = document.getElementById("elongation");
    let setting_lain2 = document.getElementById("setting_lain2");
    let sebab_ng = document.getElementById("sebab_ng");
    let down_grade = document.getElementById("down_grade");
    let up_grade = document.getElementById("up_grade");
    let reject = document.getElementById("reject");
    let supply = document.getElementById("supply");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let labelRedisplay = document.getElementById("labelRedisplay");
    let tgl_awalBawah = document.getElementById("tgl_awalBawah");
    let tgl_akhirBawah = document.getElementById("tgl_akhirBawah");
    let btn_redisplay = document.getElementById("btn_redisplay");
    let btn_laporan = document.getElementById("btn_laporan");
    let btn_simpan = document.getElementById("btn_simpan");
    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        // headerCallback: function (thead, data, start, end, display) {
        //     $(thead).find("th")
        //         .css("font-family", "Arial")
        //         .css("font-size", "14px")
        //         .css("text-align", "center");
        // },
        paging: false,
        scrollY: "300px",
        scrollX: "300px",
        scrollCollapse: true,
    });

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

    tanggal.valueAsDate = new Date();
    tgl_awalBawah.valueAsDate = new Date();
    tgl_akhirBawah.valueAsDate = new Date();

    const slcLokasi = document.getElementById("lokasi");
    const slcMesin = document.getElementById("mesin");
    const slcShift = document.getElementById("shift");

    //#region Function
    function convertToSQLDatetime(dateInput, timeElement) {
        let tgl = dateInput.value;
        if (!tgl) {
            alert("Tanggal belum diisi!");
            return null;
        }

        let jamStr = timeElement.trim();
        if (!jamStr) {
            alert(`${timeElement.id} belum diisi!`);
            return null;
        }

        // Ubah titik jadi titik dua
        jamStr = jamStr.replace('.', ':');

        // Jika belum ada menit, tambahkan :00
        if (!jamStr.includes(':')) {
            jamStr += ':00';
        }

        // Format SQL Server
        let datetimeSQL = `${tgl} ${jamStr}:00`;

        // Validasi tanggal
        let d = new Date(datetimeSQL);
        if (isNaN(d.getTime())) {
            // alert(`Format jam pada ${timeElement.id} tidak valid!`);
            alert(`Format jam tidak valid! Contoh 10.30 atau 10:30`);
            return null;
        }

        // Simpan hasilnya ke value elemen
        timeElement.value = datetimeSQL;

        return datetimeSQL;
    }

    function ambilJam(datetime) {
        if (!datetime) return "";
        return datetime.substring(11, 16); // HH:mm
    }

    $(".cacat-item").on("click", function () {
        let kode = $(this).find(".kode");
        let hidden = $(this).find("input[type=hidden]");
        if (kode.hasClass("selected")) {
            kode.removeClass("selected");
            hidden.val(0);
        } else {
            kode.addClass("selected");
            hidden.val(1);
        }
    });

    $("#" + slcLokasi.id).select2({
        placeholder: "-- Pilih Lokasi --"
    });

    $("#" + slcLokasi.id).on("change", function () {
        const val = $(this).val();
        let allowedType = [];
        switch (val) {
            case "1":
                // Lokasi 1 boleh semua
                btn_redisplay.click();
                allowedType = ["1", "2"];
                btn_batal.click();
                $("#labelProses").text("Input Data");
                $("#btn_proses").text("PROSES");
                break;

            case "2":
                // Lokasi 2 hanya type tertentu
                btn_redisplay.click();
                allowedType = ["3"];
                btn_batal.click();
                $("#labelProses").text("Input Data");
                $("#btn_proses").text("PROSES");
                break;

            case "3":
                // Lokasi 3 hanya type tertentu
                btn_redisplay.click();
                allowedType = ["4", "5", "6"];
                btn_batal.click();
                $("#labelProses").text("Input Data");
                $("#btn_proses").text("PROSES");
                break;
        }
    });

    // default lokasi = 1
    $("#" + slcLokasi.id).val("1").trigger("change");

    $("#" + slcMesin.id).select2({
        placeholder: "-- Pilih Mesin --",
        width: '100%',
        // dropdownParent: $("#parentMesin")
    });

    $("#" + slcMesin.id).on("change", function () {
        const val = $(this).val();
    });

    $("#" + slcShift.id).select2({ placeholder: "-- Pilih Shift --" });
    $("#" + slcShift.id).on("select2:select", function () {
        switch (this.value) {
            case "B":
                // jam_kerja_awal.value = "07:00";
                // jam_kerja_akhir.value = "15:00";
                break;

            case "C":
                // jam_kerja_awal.value = "15:00";
                // jam_kerja_akhir.value = "23:00";
                break;

            case "A":
                // jam_kerja_awal.value = "23:00";
                // jam_kerja_akhir.value = "07:00";
                break;

            case "D":
                // jam_kerja_awal.value = "23:00";
                // jam_kerja_akhir.value = "07:00";
                break;

            default:
                Swal.fire({
                    icon: "warning",
                    title: "Shift Tidak Dikenal",
                });
                break;
        }
    });

    let id_laporan = null;
    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_proses.disabled = true;
        let jam_prodConvert = null;
        if (jam_prod.value.trim() !== "") {
            jam_prodConvert = convertToSQLDatetime(tanggal, jam_prod.value);
            if (jam_prodConvert === null) return;
        }

        // if (selectedRow === null && labelProses.textContent !== "Koreksi Data") {
        //     Swal.fire({
        //         icon: "info",
        //         title: "Info!",
        //         text: "Pilih data ganti ukuran dahulu!",
        //         showConfirmButton: true,
        //         // timer: 2000 
        //     });
        //     btn_proses.disabled = false;
        //     return;
        // }

        if ($("#" + slcShift.id).val() === "" || $("#" + slcShift.id).val() === null || $("#" + slcMesin.id).val() === "" || $("#" + slcMesin.id).val() === null || tanggal.value === "" || tanggal.value === null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Lengkapi data terlebih dahulu!",
                showConfirmButton: true,
                // timer: 2000 
            });
            btn_proses.disabled = false;
            return;
        }

        $.ajax({
            url: "BenangNG",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: (labelProses.textContent == "Koreksi Data") ? 2 : 1,
                tanggal: tanggal.value,
                id_laporan: id_laporan,
                shift: shift.value,
                lokasi: $("#" + slcLokasi.id).val(),
                mesin: $("#" + slcMesin.id).val(),
                jam_prod: jam_prodConvert,
                tanggal: tanggal.value,
                spek_benang: spek_benang.value,
                jumlah: jumlah.value,
                keterangan: keterangan.value,
                kel_samping: kel_samping.value,
                bendol: bendol.value,
                tebal: tebal.value,
                nglinting: nglinting.value,
                berbulu: berbulu.value,
                tipis: tipis.value,
                besar: besar.value,
                kecil: kecil.value,
                warna_lain: warna_lain.value,
                luka: luka.value,
                trial_warna: trial_warna.value,
                pinggiran: pinggiran.value,
                st_jelek: st_jelek.value,
                elongation: elongation.value,
                setting_lain2: setting_lain2.value,
                sebab_ng: sebab_ng.value,
                // down_grade: down_grade.value,
                // up_grade: up_grade.value,
                // reject: reject.value,
                // supply: supply.value,
            },
            success: function (response) {
                console.log(response.message);
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        console.log(result);
                        btn_batal.click();
                        btn_redisplay.click();
                        // $("#table_bawah").DataTable().ajax.reload();
                        btn_proses.disabled = false;
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    btn_proses.disabled = false;
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                btn_proses.disabled = false;
            },
        });
    });

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        table_bawah = $("#table_bawah").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "BenangNG/getData",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awalBawah: tgl_awalBawah.value,
                        tgl_akhirBawah: tgl_akhirBawah.value,
                        lokasi: $("#" + slcLokasi.id).val(),
                    });
                },
            },
            columns: [
                {
                    data: "id_laporan",
                    render: function (data, type, row) {
                        if (type === "display") {
                            return `
                    <a href="javascript:void(0)"
                       class="link-idheader text-primary"
                       data-id="${data}">
                        ${data}
                    </a>
                    `;
                        }
                        return data; // penting untuk sorting & searching
                    },
                },
                {
                    data: "tanggal_raw", // Data asli untuk sorting
                    render: function (data, type, row) {
                        // type === 'display' digunakan saat menampilkan di tabel
                        if (type === "display") {
                            return row.tanggal; // tampilkan versi m/d/Y
                        }
                        return data; // untuk sorting & filtering (yyyy-mm-dd)
                    },
                },
                { data: "shift" },
                { data: "jam_prod" },
                { data: "TypeMesin" },
                { data: "spek_benang" },
                { data: "NamaUser" },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row) {
                        const canAdd = ["4451", "2736"].includes(row.user);

                        let html = "";

                        // Tombol Add selalu muncul jika user 4451 atau 2736
                        if (canAdd) {
                            html += `
                                <button class="btn btn-sm btn-primary btn-add" style="width: 150px;" data-id="${row.id_laporan}">
                                    <i class="fa fa-edit"></i> Add Sortir & Supply
                                </button>
                            `;
                        }

                        // Jika sudah ACC
                        if (row.user_acc !== null && row.user_acc !== "") {
                            html += `
                                <span style="color: green; font-weight: bold;">
                                    Sudah di ACC ${row.user_acc}
                                </span>
                            `;
                            return html;
                        }

                        // Jika belum ACC
                        html += `
                            <button class="btn btn-sm btn-warning btn-koreksi" style="width: 100px;" data-id="${row.id_laporan}">
                                <i class="fa fa-edit"></i> Koreksi
                            </button>
                            <button class="btn btn-sm btn-danger btn-delete" style="width: 60px;" data-id="${row.id_laporan}">
                                <i class="fa fa-trash"></i> Delete
                            </button>
                        `;

                        return html;
                    }
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row)
                    .find("td")
                    .css({
                        "font-family": "Arial",
                        "font-size": "14px",
                        "text-align": "center",
                        "vertical-align": "middle"
                    });
            },
            headerCallback: function (thead, data, start, end, display, tdata) {
                $(thead, tdata)
                    .find("th")
                    .css("font-family", "Arial")
                    .css("font-size", "14px")
                    .css("text-align", "center");
            },
            // order: [[1, "asc"]],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
        });
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        id_laporan = null;
        $("#labelProses").text("Input Data");
        $("#btn_proses").text("PROSES");
        tanggal.valueAsDate = new Date();
        $("#" + slcMesin.id).val(null).trigger("change");
        $("#" + slcShift.id).val(null).trigger("change");
        jam_prod.value = ambilJam(null);
        spek_benang.value = '';
        jumlah.value = '';
        keterangan.value = '';
        sebab_ng.value = '';
        [
            "kel_samping",
            "bendol",
            "tebal",
            "nglinting",
            "berbulu",
            "tipis",
            "besar",
            "kecil",
            "warna_lain",
            "luka",
            "trial_warna",
            "pinggiran",
            "st_jelek",
            "elongation",
            "setting_lain2"
        ].forEach(function (field) {
            const value = 0;

            // Isi hidden input
            $("#" + field).val(value);

            // Ambil span.kode yang berada di dalam cacat-item
            const kode = $("#" + field).closest(".cacat-item").find(".kode");

            if (value == 1) {
                kode.addClass("selected");
            } else {
                kode.removeClass("selected");
            }
        });
    });

    btn_simpan.addEventListener("click", async function (event) {
        event.preventDefault();
        // btn_proses.disabled = true;

        $.ajax({
            url: "BenangNG",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: 4,
                id_laporan: id_laporan,
                down_grade: down_grade_lap.textContent,
                up_grade: up_grade_lap.textContent,
                reject: reject_lap.textContent,
                supply: supply_lap.textContent,
            },
            success: function (response) {
                console.log(response.message);
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        console.log(result);
                        $("#modalLaporan").modal("hide");
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    btn_proses.disabled = false;
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                btn_proses.disabled = false;
            },
        });
    });

    //#region Koreksi
    $('#table_bawah').on('click', '.btn-koreksi', function () {
        const id = $(this).data('id');
        console.log(id);
        id_laporan = id;
        $("#labelProses").text("Koreksi Data");
        $.ajax({
            url: "BenangNG/getDataKoreksi",
            type: "GET",
            data: {
                _token: csrfToken,
                id_laporan: id,
            },
            success: function (data) {
                console.log(data);

                // $("#" + slcLokasi.id).val(data.data[0].lokasi).trigger("change");
                if (data.data[0].tanggal) {
                    const tgl = data.data[0].tanggal.split(' ')[0];
                    document.getElementById("tanggal").value = tgl;
                }
                $("#" + slcMesin.id).val(data.data[0].mesin).trigger("change");
                $("#" + slcShift.id).val(data.data[0].shift).trigger("change");
                if (data.data[0].jam_prod) {
                    const date = new Date(data.data[0].jam_prod);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        document.getElementById("jam_prod").value = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].jam_prod.match(/(\d{2}):(\d{2})/);
                        if (match) document.getElementById("jam_prod").value = `${match[1]}:${match[2]}`;
                    }
                }
                $("#" + slcMesin.id).val(data.data[0].mesin).trigger("change");
                spek_benang.value = data.data[0].spek_benang;
                jumlah.value = data.data[0].jumlah;
                keterangan.value = data.data[0].keterangan;
                [
                    "kel_samping",
                    "bendol",
                    "tebal",
                    "nglinting",
                    "berbulu",
                    "tipis",
                    "besar",
                    "kecil",
                    "warna_lain",
                    "luka",
                    "trial_warna",
                    "pinggiran",
                    "st_jelek",
                    "elongation",
                    "setting_lain2"
                ].forEach(function (field) {
                    const value = data.data[0][field];

                    // Isi hidden input
                    $("#" + field).val(value);

                    // Ambil span.kode yang berada di dalam cacat-item
                    const kode = $("#" + field).closest(".cacat-item").find(".kode");

                    if (value == 1) {
                        kode.addClass("selected");
                    } else {
                        kode.removeClass("selected");
                    }
                });
                sebab_ng.value = data.data[0].sebab_ng;
                $("#btn_proses").text("Proses Update");
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    //#region Link
    $("#table_bawah").on("click", ".link-idheader", function () {
        const id = $(this).data('id');
        id_laporan = id;
        $("#modalLabel").text("Preview Laporan Benang NG");
        $("#modalLaporan")
            .find("input, select, textarea, td[contenteditable], div[contenteditable]")
            .each(function () {
                const type = $(this).attr("type");

                if (type === "checkbox" || type === "radio") {
                    $(this).prop("checked", false);
                } else if ($(this).is("select")) {
                    $(this).prop("selectedIndex", 0);
                } else if ($(this).is("td[contenteditable], div[contenteditable]")) {
                    $(this).text("");
                } else {
                    $(this).val("");
                }
            });
        $("#modalLaporan .shift-option").removeClass("active");
        $("#modalLaporan #shiftValue").val("");
        btn_simpan.style.display = "none";
        $.ajax({
            url: "BenangNG/getDataKoreksi",
            type: "GET",
            data: {
                _token: csrfToken,
                id_laporan: id,
            },
            success: function (data) {
                if (data.data && data.data.length > 0) {
                    $("#ttd_qc")
                        .text(data.data[0].user_input)
                        .show();
                } else {
                    $("#ttd_qc")
                        .text("")
                        .hide();
                }

                if (data.data && data.data.length > 0) {
                    $("#ttd_ext")
                        .text(data.data[0].user_acc)
                        .show();
                } else {
                    $("#ttd_ext")
                        .text("")
                        .hide();
                }

                if (data.ttd && data.ttd.FotoTtd && data.ttd.FotoTtd !== "") {

                    let ttd = data.ttd.FotoTtd;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    // $("#ttd_qc")
                    //     .attr("src", ttd)
                    //     .show();
                    document.getElementById("nama_qc").textContent = data.ttd.NamaUser;
                } else {
                    // $("#ttd_qc")
                    //     .attr("src", "")
                    //     .show();
                    document.getElementById("nama_qc").textContent = "";
                }

                if (data.ttd2 && data.ttd2.FotoTtd && data.ttd2.FotoTtd !== "") {

                    let ttd2 = data.ttd2.FotoTtd;

                    // pastikan ada prefix base64
                    if (!ttd2.startsWith("data:image")) {
                        ttd2 = "data:image/png;base64," + ttd2;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    // $("#ttd_ext")
                    //     .attr("src", ttd2)
                    //     .show();
                    document.getElementById("nama_ext").textContent = data.ttd2.NamaUser;
                } else {
                    // $("#ttd_ext")
                    //     .attr("src", "")
                    //     .show();
                    document.getElementById("nama_ext").textContent = "";
                }

                if (data.data[0].tanggal) {
                    const tgl = data.data[0].tanggal.split(' ')[0];
                    document.getElementById("tanggal_lap").value = tgl;
                }
                document.getElementById("halaman").innerHTML = '1&emsp;Dari&emsp;1';
                if (data.data[0].shift) {
                    document.getElementById("shiftValue").value = data.data[0].shift;
                    const targetShift = document.querySelector(`.shift-option[data-value="${data.data[0].shift}"]`);
                    if (targetShift) targetShift.classList.add("active");
                }
                if (data.data[0].jam_prod) {
                    const date = new Date(data.data[0].jam_prod);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        document.getElementById("timeStart").value = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].timeStart.match(/(\d{2}):(\d{2})/);
                        if (match) document.getElementById("timeStart").value = `${match[1]}:${match[2]}`;
                    }
                }
                // $("#" + slcMesin.id).val(data.data[0].mesin).trigger("change");
                document.getElementById("mesin_lap").textContent = data.data[0].TypeMesin;
                document.getElementById("spek_benang_lap").textContent = data.data[0].spek_benang;
                document.getElementById("jumlah_lap").textContent = data.data[0].jumlah;
                document.getElementById("keterangan_lap").textContent = data.data[0].keterangan;
                $("#modalLaporan .cacat-item .kode").removeClass("selected");

                // Daftar field cacat
                [
                    "kel_samping",
                    "tipis",
                    "trial_warna",
                    "bendol",
                    "besar",
                    "pinggitan",
                    "tebal",
                    "kecil",
                    "st_jelek",
                    "nglinting",
                    "warna_lain",
                    "elongation",
                    "berbulu",
                    "luka",
                    "setting_lain2"
                    // tambahkan field lainnya
                ].forEach(function (field) {
                    if (data.data[0][field] == 1) {
                        $(`#modalLaporan .cacat-item[data-field="${field}"] .kode`)
                            .addClass("selected");
                    }
                });
                document.getElementById("sebab_ng_lap").textContent = data.data[0].sebab_ng;
                document.getElementById("down_grade_lap").textContent = data.data[0].down_grade;
                document.getElementById("up_grade_lap").textContent = data.data[0].up_grade;
                document.getElementById("reject_lap").textContent = data.data[0].reject;
                document.getElementById("supply_lap").textContent = data.data[0].supply;
                $("#modalLaporan").modal("show");
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    //#region Add
    $('#table_bawah').on('click', '.btn-add', function () {
        const id = $(this).data('id');
        id_laporan = id;
        $("#modalLabel").text("Preview Laporan Benang NG");
        $("#modalLaporan")
            .find("input, select, textarea, td[contenteditable], div[contenteditable]")
            .each(function () {
                const type = $(this).attr("type");

                if (type === "checkbox" || type === "radio") {
                    $(this).prop("checked", false);
                } else if ($(this).is("select")) {
                    $(this).prop("selectedIndex", 0);
                } else if ($(this).is("td[contenteditable], div[contenteditable]")) {
                    $(this).text("");
                } else {
                    $(this).val("");
                }
            });
        $("#modalLaporan .shift-option").removeClass("active");
        $("#modalLaporan #shiftValue").val("");
        btn_simpan.style.display = "block";
        $.ajax({
            url: "BenangNG/getDataKoreksi",
            type: "GET",
            data: {
                _token: csrfToken,
                id_laporan: id,
            },
            success: function (data) {
                if (data.data && data.data.length > 0) {
                    $("#ttd_qc")
                        .text(data.data[0].user_input)
                        .show();
                } else {
                    $("#ttd_qc")
                        .text("")
                        .hide();
                }

                if (data.data && data.data.length > 0) {
                    $("#ttd_ext")
                        .text(data.data[0].user_acc)
                        .show();
                } else {
                    $("#ttd_ext")
                        .text("")
                        .hide();
                }

                if (data.ttd && data.ttd.FotoTtd && data.ttd.FotoTtd !== "") {

                    let ttd = data.ttd.FotoTtd;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    // $("#ttd_qc")
                    //     .attr("src", ttd)
                    //     .show();
                    document.getElementById("nama_qc").textContent = data.ttd.NamaUser;
                } else {
                    // $("#ttd_qc")
                    //     .attr("src", "")
                    //     .show();
                    document.getElementById("nama_qc").textContent = "";
                }

                if (data.ttd2 && data.ttd2.FotoTtd && data.ttd2.FotoTtd !== "") {

                    let ttd2 = data.ttd2.FotoTtd;

                    // pastikan ada prefix base64
                    if (!ttd2.startsWith("data:image")) {
                        ttd2 = "data:image/png;base64," + ttd2;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    // $("#ttd_ext")
                    //     .attr("src", ttd2)
                    //     .show();
                    document.getElementById("nama_ext").textContent = data.ttd2.NamaUser;
                } else {
                    // $("#ttd_ext")
                    //     .attr("src", "")
                    //     .show();
                    document.getElementById("nama_ext").textContent = "";
                }

                if (data.data[0].tanggal) {
                    const tgl = data.data[0].tanggal.split(' ')[0];
                    document.getElementById("tanggal_lap").value = tgl;
                }
                document.getElementById("halaman").innerHTML = '1&emsp;Dari&emsp;1';
                if (data.data[0].shift) {
                    document.getElementById("shiftValue").value = data.data[0].shift;
                    const targetShift = document.querySelector(`.shift-option[data-value="${data.data[0].shift}"]`);
                    if (targetShift) targetShift.classList.add("active");
                }
                if (data.data[0].jam_prod) {
                    const date = new Date(data.data[0].jam_prod);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        document.getElementById("timeStart").value = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].timeStart.match(/(\d{2}):(\d{2})/);
                        if (match) document.getElementById("timeStart").value = `${match[1]}:${match[2]}`;
                    }
                }
                // $("#" + slcMesin.id).val(data.data[0].mesin).trigger("change");
                document.getElementById("mesin_lap").textContent = data.data[0].TypeMesin;
                document.getElementById("spek_benang_lap").textContent = data.data[0].spek_benang;
                document.getElementById("jumlah_lap").textContent = data.data[0].jumlah;
                document.getElementById("keterangan_lap").textContent = data.data[0].keterangan;
                $("#modalLaporan .cacat-item .kode").removeClass("selected");

                // Daftar field cacat
                [
                    "kel_samping",
                    "tipis",
                    "trial_warna",
                    "bendol",
                    "besar",
                    "pinggitan",
                    "tebal",
                    "kecil",
                    "st_jelek",
                    "nglinting",
                    "warna_lain",
                    "elongation",
                    "berbulu",
                    "luka",
                    "setting_lain2"
                    // tambahkan field lainnya
                ].forEach(function (field) {
                    if (data.data[0][field] == 1) {
                        $(`#modalLaporan .cacat-item[data-field="${field}"] .kode`)
                            .addClass("selected");
                    }
                });
                document.getElementById("sebab_ng_lap").textContent = data.data[0].sebab_ng;
                document.getElementById("down_grade_lap").textContent = data.data[0].down_grade;
                document.getElementById("up_grade_lap").textContent = data.data[0].up_grade;
                document.getElementById("reject_lap").textContent = data.data[0].reject;
                document.getElementById("supply_lap").textContent = data.data[0].supply;
                $("#modalLaporan").modal("show");
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    //#region Delete
    $('#table_bawah').on('click', '.btn-delete', function () {
        const id = $(this).data('id');
        console.log(id);
        // idDetail = id;
        Swal.fire({
            title: 'Apakah anda yakin ingin menghapus data?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "BenangNG",
                    dataType: "json",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 3,
                        id_laporan: id,
                    },
                    success: function (response) {
                        console.log(response.message);
                        if (response.message) {
                            Swal.fire({
                                icon: "success",
                                title: "Success!",
                                text: response.message,
                                showConfirmButton: true,
                            }).then((result) => {
                                $("#table_bawah").DataTable().ajax.reload();
                                console.log(result);
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
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    },
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    });
});