jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");
    let btn_rata2 = document.getElementById("btn_rata2");
    let btn_simpan = document.getElementById("btn_simpan");
    let btn_tambah = document.getElementById("btn_tambah");
    let modalLabel = document.getElementById("modalLabel");
    let btn_print = document.getElementById("btn_print");
    //#region Inisialisasi ID Laporan
    let referensi = document.getElementById("referensi");
    let tanggal_laporan = document.getElementById("tanggal_laporan");
    let halaman = document.getElementById("halaman");
    let shiftValue = document.getElementById("shiftValue");
    let timeStart = document.getElementById("timeStart");
    let timeEnd = document.getElementById("timeEnd");
    let bahan_pp = document.getElementById("bahan_pp");
    let ca_co3 = document.getElementById("ca_co3");
    let uv = document.getElementById("uv");
    let m_bath = document.getElementById("m_bath");
    let lot_no = document.getElementById("lot_no");
    let spek = document.getElementById("spek");
    let range = document.getElementById("range");
    let r12D = document.getElementById("r12D");
    let r12G = document.getElementById("r12G");
    let r12K = document.getElementById("r12K");
    let r12E = document.getElementById("r12E");
    let r12L = document.getElementById("r12L");
    let r12Ket = document.getElementById("r12Ket");
    let r11D = document.getElementById("r11D");
    let r11G = document.getElementById("r11G");
    let r11K = document.getElementById("r11K");
    let r11E = document.getElementById("r11E");
    let r11L = document.getElementById("r11L");
    let r11Ket = document.getElementById("r11Ket");
    let r10D = document.getElementById("r10D");
    let r10G = document.getElementById("r10G");
    let r10K = document.getElementById("r10K");
    let r10E = document.getElementById("r10E");
    let r10L = document.getElementById("r10L");
    let r10Ket = document.getElementById("r10Ket");
    let r9D = document.getElementById("r9D");
    let r9G = document.getElementById("r9G");
    let r9K = document.getElementById("r9K");
    let r9E = document.getElementById("r9E");
    let r9L = document.getElementById("r9L");
    let r9Ket = document.getElementById("r9Ket");
    let r8D = document.getElementById("r8D");
    let r8G = document.getElementById("r8G");
    let r8K = document.getElementById("r8K");
    let r8E = document.getElementById("r8E");
    let r8L = document.getElementById("r8L");
    let r8Ket = document.getElementById("r8Ket");
    let r7D = document.getElementById("r7D");
    let r7G = document.getElementById("r7G");
    let r7K = document.getElementById("r7K");
    let r7E = document.getElementById("r7E");
    let r7L = document.getElementById("r7L");
    let r7Ket = document.getElementById("r7Ket");
    let r6D = document.getElementById("r6D");
    let r6G = document.getElementById("r6G");
    let r6K = document.getElementById("r6K");
    let r6E = document.getElementById("r6E");
    let r6L = document.getElementById("r6L");
    let r6Ket = document.getElementById("r6Ket");
    let r5D = document.getElementById("r5D");
    let r5G = document.getElementById("r5G");
    let r5K = document.getElementById("r5K");
    let r5E = document.getElementById("r5E");
    let r5L = document.getElementById("r5L");
    let r5Ket = document.getElementById("r5Ket");
    let r4D = document.getElementById("r4D");
    let r4G = document.getElementById("r4G");
    let r4K = document.getElementById("r4K");
    let r4E = document.getElementById("r4E");
    let r4L = document.getElementById("r4L");
    let r4Ket = document.getElementById("r4Ket");
    let r3D = document.getElementById("r3D");
    let r3G = document.getElementById("r3G");
    let r3K = document.getElementById("r3K");
    let r3E = document.getElementById("r3E");
    let r3L = document.getElementById("r3L");
    let r3Ket = document.getElementById("r3Ket");
    let r2D = document.getElementById("r2D");
    let r2G = document.getElementById("r2G");
    let r2K = document.getElementById("r2K");
    let r2E = document.getElementById("r2E");
    let r2L = document.getElementById("r2L");
    let r2Ket = document.getElementById("r2Ket");
    let r1D = document.getElementById("r1D");
    let r1G = document.getElementById("r1G");
    let r1K = document.getElementById("r1K");
    let r1E = document.getElementById("r1E");
    let r1L = document.getElementById("r1L");
    let r1Ket = document.getElementById("r1Ket");
    let l1D = document.getElementById("l1D");
    let l1G = document.getElementById("l1G");
    let l1K = document.getElementById("l1K");
    let l1E = document.getElementById("l1E");
    let l1L = document.getElementById("l1L");
    let l1Ket = document.getElementById("l1Ket");
    let l2D = document.getElementById("l2D");
    let l2G = document.getElementById("l2G");
    let l2K = document.getElementById("l2K");
    let l2E = document.getElementById("l2E");
    let l2L = document.getElementById("l2L");
    let l2Ket = document.getElementById("l2Ket");
    let l3D = document.getElementById("l3D");
    let l3G = document.getElementById("l3G");
    let l3K = document.getElementById("l3K");
    let l3E = document.getElementById("l3E");
    let l3L = document.getElementById("l3L");
    let l3Ket = document.getElementById("l3Ket");
    let l4D = document.getElementById("l4D");
    let l4G = document.getElementById("l4G");
    let l4K = document.getElementById("l4K");
    let l4E = document.getElementById("l4E");
    let l4L = document.getElementById("l4L");
    let l4Ket = document.getElementById("l4Ket");
    let l5D = document.getElementById("l5D");
    let l5G = document.getElementById("l5G");
    let l5K = document.getElementById("l5K");
    let l5E = document.getElementById("l5E");
    let l5L = document.getElementById("l5L");
    let l5Ket = document.getElementById("l5Ket");
    let l6D = document.getElementById("l6D");
    let l6G = document.getElementById("l6G");
    let l6K = document.getElementById("l6K");
    let l6E = document.getElementById("l6E");
    let l6L = document.getElementById("l6L");
    let l6Ket = document.getElementById("l6Ket");
    let l7D = document.getElementById("l7D");
    let l7G = document.getElementById("l7G");
    let l7K = document.getElementById("l7K");
    let l7E = document.getElementById("l7E");
    let l7L = document.getElementById("l7L");
    let l7Ket = document.getElementById("l7Ket");
    let l8D = document.getElementById("l8D");
    let l8G = document.getElementById("l8G");
    let l8K = document.getElementById("l8K");
    let l8E = document.getElementById("l8E");
    let l8L = document.getElementById("l8L");
    let l8Ket = document.getElementById("l8Ket");
    let l9D = document.getElementById("l9D");
    let l9G = document.getElementById("l9G");
    let l9K = document.getElementById("l9K");
    let l9E = document.getElementById("l9E");
    let l9L = document.getElementById("l9L");
    let l9Ket = document.getElementById("l9Ket");
    let l10D = document.getElementById("l10D");
    let l10G = document.getElementById("l10G");
    let l10K = document.getElementById("l10K");
    let l10E = document.getElementById("l10E");
    let l10L = document.getElementById("l10L");
    let l11D = document.getElementById("l11D");
    let l11G = document.getElementById("l11G");
    let l11K = document.getElementById("l11K");
    let l11E = document.getElementById("l11E");
    let l11L = document.getElementById("l11L");
    let l12D = document.getElementById("l12D");
    let l12G = document.getElementById("l12G");
    let l12K = document.getElementById("l12K");
    let l12E = document.getElementById("l12E");
    let l12L = document.getElementById("l12L");
    let rrD = document.getElementById("rrD");
    let rrG = document.getElementById("rrG");
    let rrK = document.getElementById("rrK");
    let rrE = document.getElementById("rrE");
    let rrL = document.getElementById("rrL");
    let ttd_qc = document.getElementById("ttd_qc");
    let ttd_ext = document.getElementById("ttd_ext");
    let nama_qc = document.getElementById("nama_qc");
    let nama_ext = document.getElementById("nama_ext");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        // headerCallback: function (thead, data, start, end, display) {
        //     $(thead).find("th")
        //         .css("font-family", "Arial") 
        //         .css("font-size", "14px")
        //         .css("text-align", "center");
        // },
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "400px",
        scrollX: "400px",
        scrollCollapse: true,
    });

    tanggal_laporan.valueAsDate = new Date();
    const slcLokasi = document.getElementById("lokasi");
    const slcMesin  = document.getElementById("mesin");

    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();

    document.querySelectorAll('.only-number').forEach(function (el) {
        el.addEventListener('input', function () {

            let selection = window.getSelection();
            let range = selection.getRangeAt(0);

            let cursorPosition = range.startOffset;

            let value = this.innerText;

            // Izinkan angka, minus, dan titik
            value = value.replace(/[^0-9.-]/g, '');

            // Minus hanya boleh di depan
            value = value.replace(/(?!^)-/g, '');

            // Hanya satu titik
            value = value.replace(/(\..*)\./g, '$1');

            this.innerText = value;

            // Kembalikan posisi cursor
            let newRange = document.createRange();
            newRange.setStart(this.firstChild || this, Math.min(cursorPosition, value.length));
            newRange.collapse(true);

            selection.removeAllRanges();
            selection.addRange(newRange);

        });
    });

    //#region Function
    function applyColorGroup(fields, color) {
        fields.forEach(id => {
            let el = document.getElementById(id);
            if (el) el.style.color = color;
        });
    }

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

    function formatPrint(val) {
        if (val === '' || val === null || isNaN(val)) return '';

        let num = parseFloat(val);

        // 10.00 → 10
        if (Number.isInteger(num)) return numeral(num).format('0');

        // **Jika angka punya lebih dari 1 decimal yang bukan .x0 atau .75 → tampilkan apa adanya**
        let decimal = (num.toString().split('.')[1] || '');
        if (decimal.length > 1 && decimal !== '75' && decimal !== '70') {
            return numeral(num).format('0.00');  // contoh: 10.23 → 10.23
        }

        // 10.75 → 10.75
        if (decimal === '75') return numeral(num).format('0.00');

        // 10.70 → 10.7
        return numeral(num).format('0.[0]');
    }

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
                // btn_batal.click();
                // $("#labelProses").text("Input Data");
                // $("#btn_proses").text("PROSES");
                break;

            case "2":
                // Lokasi 2 hanya type tertentu
                btn_redisplay.click();
                allowedType = ["3"];
                // btn_batal.click();
                // $("#labelProses").text("Input Data");
                // $("#btn_proses").text("PROSES");
                break;

            case "3":
                // Lokasi 3 hanya type tertentu
                btn_redisplay.click();
                allowedType = ["4", "5", "6"];
                // btn_batal.click();
                // $("#labelProses").text("Input Data");
                // $("#btn_proses").text("PROSES");
                break;
        }
    });

    // default lokasi = 1
    $("#" + slcLokasi.id).val("1").trigger("change");

    $("#" + slcMesin.id).select2({
        placeholder: "-- Pilih Mesin --",
        width: '90%',
        dropdownParent: $("#modalLaporan")
    });

    $("#" + slcMesin.id).on("change", function () {
        const val = $(this).val();
    });

    //#region Rata-rata
    btn_rata2.addEventListener("click", function (event) {
        event.preventDefault();

        // Kolom yang akan dihitung
        const kolom = [
            {
                input: ["r12D", "r11D", "r10D", "r9D", "r8D", "r7D", "r6D", "r5D", "r4D", "r3D", "r2D", "r1D",
                    "l12D", "l11D", "l10D", "l9D", "l8D", "l7D", "l6D", "l5D", "l4D", "l3D", "l2D", "l1D"],
                output: "rrD"
            },
            {
                input: ["r12G", "r11G", "r10G", "r9G", "r8G", "r7G", "r6G", "r5G", "r4G", "r3G", "r2G", "r1G",
                    "l12G", "l11G", "l10G", "l9G", "l8G", "l7G", "l6G", "l5G", "l4G", "l3G", "l2G", "l1G"],
                output: "rrG"
            },
            {
                input: ["r12K", "r11K", "r10K", "r9K", "r8K", "r7K", "r6K", "r5K", "r4K", "r3K", "r2K", "r1K",
                    "l12K", "l11K", "l10K", "l9K", "l8K", "l7K", "l6K", "l5K", "l4K", "l3K", "l2K", "l1K"],
                output: "rrK"
            },
            {
                input: ["r12E", "r11E", "r10E", "r9E", "r8E", "r7E", "r6E", "r5E", "r4E", "r3E", "r2E", "r1E",
                    "l12E", "l11E", "l10E", "l9E", "l8E", "l7E", "l6E", "l5E", "l4E", "l3E", "l2E", "l1E"],
                output: "rrE"
            },
            {
                input: ["r12L", "r11L", "r10L", "r9L", "r8L", "r7L", "r6L", "r5L", "r4L", "r3L", "r2L", "r1L",
                    "l12L", "l11L", "l10L", "l9L", "l8L", "l7L", "l6L", "l5L", "l4L", "l3L", "l2L", "l1L"],
                output: "rrL"
            }
        ];

        kolom.forEach(function (item) {

            let total = 0;
            let jumlahData = 0;

            item.input.forEach(function (id) {

                let value = document.getElementById(id).innerText.trim();

                if (value !== "" && !isNaN(value)) {
                    total += parseFloat(value);
                    jumlahData++;
                }

            });

            let rataRata = jumlahData > 0 ? total / jumlahData : 0;

            // Masukkan hasil rata-rata
            document.getElementById(item.output).innerText = rataRata.toFixed(2);
        });
    });

    //#region Redisplay
    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        // if ($("#" + slcTypeKain.id).val() == 1) {
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "ACCPengecekanMB/getDataLaporan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awal: tgl_awal.value,
                        tgl_akhir: tgl_akhir.value,
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
                { data: "shiftValue" },
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
                 { data: "TypeMesin" },
                { data: "spek" },
                { data: "NamaUser" },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row) {
                        // jika sudah ada user acc → sembunyikan tombol
                        if (
                            row.user_acc !== null &&
                            row.user_acc !== ""
                        ) {
                            return '<span style="color: green; font-weight: bold;">Sudah di ACC ' + row.user_acc + '</span>';
                        }

                        // jika belum acc → tampilkan tombol
                        return `
                            <button class="btn btn-sm btn-success btn-acc" style="width: 100px;" data-id="${row.id_laporan}">
                                <i class="fa fa-check"></i> ACC
                            </button>
                        `;
                    },
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

    //#region Link
    let id_laporan = null;
    $("#table_atas").on("click", ".link-idheader", function () {
        const id = $(this).data('id');
        id_laporan = id;
        $("#modalLabel").text("Preview Laporan Pengecekan Mutu Benang Extruder");
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
        btn_rata2.style.display = "none";
        btn_print.style.display = "block";
        $.ajax({
            url: "ACCPengecekanMB/getDataPrint",
            type: "GET",
            data: {
                _token: csrfToken,
                id_laporan: id,
            },
            success: function (data) {
                if (data.ttd && data.ttd.FotoTtd && data.ttd.FotoTtd !== "") {

                    let ttd = data.ttd.FotoTtd;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    $("#ttd_qc")
                        .attr("src", ttd)
                        .show();
                    document.getElementById("nama_qc").textContent = data.ttd.NamaUser;
                } else {
                    $("#ttd_qc")
                        .attr("src", "")
                        .show();
                    document.getElementById("nama_qc").textContent = "";
                }

                if (data.ttd2 && data.ttd2.FotoTtd && data.ttd2.FotoTtd !== "") {

                    let ttd2 = data.ttd2.FotoTtd;

                    // pastikan ada prefix base64
                    if (!ttd2.startsWith("data:image")) {
                        ttd2 = "data:image/png;base64," + ttd2;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    $("#ttd_ext")
                        .attr("src", ttd2)
                        .show();
                    document.getElementById("nama_ext").textContent = data.ttd2.NamaUser;
                } else {
                    $("#ttd_ext")
                        .attr("src", "")
                        .show();
                    document.getElementById("nama_ext").textContent = "";
                }

                referensi.textContent = data.data[0].referensi;
                if (data.data[0].tanggal_laporan) {
                    const tgl = data.data[0].tanggal_laporan.split(' ')[0];
                    document.getElementById("tanggal_laporan").value = tgl;
                }
                halaman.innerHTML = '1&emsp;Dari&emsp;1';
                if (data.data[0].shiftValue) {
                    document.getElementById("shiftValue").value = data.data[0].shiftValue;
                    const targetShift = document.querySelector(`.shift-option[data-value="${data.data[0].shiftValue}"]`);
                    if (targetShift) targetShift.classList.add("active");
                }
                if (data.data[0].timeStart) {
                    const date = new Date(data.data[0].timeStart);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        document.getElementById("timeStart").value = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].timeStart.match(/(\d{2}):(\d{2})/);
                        if (match) document.getElementById("timeStart").value = `${match[1]}:${match[2]}`;
                    }
                }
                if (data.data[0].timeEnd) {
                    const date = new Date(data.data[0].timeEnd);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        document.getElementById("timeEnd").value = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].timeEnd.match(/(\d{2}):(\d{2})/);
                        if (match) document.getElementById("timeEnd").value = `${match[1]}:${match[2]}`;
                    }
                }
                $("#" + slcMesin.id).val(data.data[0].mesin).trigger("change");
                bahan_pp.textContent = data.data[0].bahan_pp;
                ca_co3.textContent = data.data[0].ca_co3;
                uv.textContent = data.data[0].uv;
                m_bath.textContent = data.data[0].m_bath;
                lot_no.textContent = data.data[0].lot_no;
                spek.textContent = data.data[0].spek;
                range.textContent = data.data[0].range;
                r12D.textContent = formatPrint(data.data[0].r12D);
                r12G.textContent = formatPrint(data.data[0].r12G);
                r12K.textContent = formatPrint(data.data[0].r12K);
                r12E.textContent = formatPrint(data.data[0].r12E);
                r12L.textContent = formatPrint(data.data[0].r12L);
                r12Ket.textContent = data.data[0].r12Ket;
                r11D.textContent = formatPrint(data.data[0].r11D);
                r11G.textContent = formatPrint(data.data[0].r11G);
                r11K.textContent = formatPrint(data.data[0].r11K);
                r11E.textContent = formatPrint(data.data[0].r11E);
                r11L.textContent = formatPrint(data.data[0].r11L);
                r11Ket.textContent = data.data[0].r11Ket;
                r10D.textContent = formatPrint(data.data[0].r10D);
                r10G.textContent = formatPrint(data.data[0].r10G);
                r10K.textContent = formatPrint(data.data[0].r10K);
                r10E.textContent = formatPrint(data.data[0].r10E);
                r10L.textContent = formatPrint(data.data[0].r10L);
                r10Ket.textContent = data.data[0].r10Ket;
                r9D.textContent = formatPrint(data.data[0].r9D);
                r9G.textContent = formatPrint(data.data[0].r9G);
                r9K.textContent = formatPrint(data.data[0].r9K);
                r9E.textContent = formatPrint(data.data[0].r9E);
                r9L.textContent = formatPrint(data.data[0].r9L);
                r9Ket.textContent = data.data[0].r9Ket;
                r8D.textContent = formatPrint(data.data[0].r8D);
                r8G.textContent = formatPrint(data.data[0].r8G);
                r8K.textContent = formatPrint(data.data[0].r8K);
                r8E.textContent = formatPrint(data.data[0].r8E);
                r8L.textContent = formatPrint(data.data[0].r8L);
                r8Ket.textContent = data.data[0].r8Ket;
                r7D.textContent = formatPrint(data.data[0].r7D);
                r7G.textContent = formatPrint(data.data[0].r7G);
                r7K.textContent = formatPrint(data.data[0].r7K);
                r7E.textContent = formatPrint(data.data[0].r7E);
                r7L.textContent = formatPrint(data.data[0].r7L);
                r7Ket.textContent = data.data[0].r7Ket;
                r6D.textContent = formatPrint(data.data[0].r6D);
                r6G.textContent = formatPrint(data.data[0].r6G);
                r6K.textContent = formatPrint(data.data[0].r6K);
                r6E.textContent = formatPrint(data.data[0].r6E);
                r6L.textContent = formatPrint(data.data[0].r6L);
                r6Ket.textContent = data.data[0].r6Ket;
                r5D.textContent = formatPrint(data.data[0].r5D);
                r5G.textContent = formatPrint(data.data[0].r5G);
                r5K.textContent = formatPrint(data.data[0].r5K);
                r5E.textContent = formatPrint(data.data[0].r5E);
                r5L.textContent = formatPrint(data.data[0].r5L);
                r5Ket.textContent = data.data[0].r5Ket;
                r4D.textContent = formatPrint(data.data[0].r4D);
                r4G.textContent = formatPrint(data.data[0].r4G);
                r4K.textContent = formatPrint(data.data[0].r4K);
                r4E.textContent = formatPrint(data.data[0].r4E);
                r4L.textContent = formatPrint(data.data[0].r4L);
                r4Ket.textContent = data.data[0].r4Ket;
                r3D.textContent = formatPrint(data.data[0].r3D);
                r3G.textContent = formatPrint(data.data[0].r3G);
                r3K.textContent = formatPrint(data.data[0].r3K);
                r3E.textContent = formatPrint(data.data[0].r3E);
                r3L.textContent = formatPrint(data.data[0].r3L);
                r3Ket.textContent = data.data[0].r3Ket;
                r2D.textContent = formatPrint(data.data[0].r2D);
                r2G.textContent = formatPrint(data.data[0].r2G);
                r2K.textContent = formatPrint(data.data[0].r2K);
                r2E.textContent = formatPrint(data.data[0].r2E);
                r2L.textContent = formatPrint(data.data[0].r2L);
                r2Ket.textContent = data.data[0].r2Ket;
                r1D.textContent = formatPrint(data.data[0].r1D);
                r1G.textContent = formatPrint(data.data[0].r1G);
                r1K.textContent = formatPrint(data.data[0].r1K);
                r1E.textContent = formatPrint(data.data[0].r1E);
                r1L.textContent = formatPrint(data.data[0].r1L);
                r1Ket.textContent = data.data[0].r1Ket;
                l1D.textContent = formatPrint(data.data[0].l1D);
                l1G.textContent = formatPrint(data.data[0].l1G);
                l1K.textContent = formatPrint(data.data[0].l1K);
                l1E.textContent = formatPrint(data.data[0].l1E);
                l1L.textContent = formatPrint(data.data[0].l1L);
                l1Ket.textContent = data.data[0].l1Ket;
                l2D.textContent = formatPrint(data.data[0].l2D);
                l2G.textContent = formatPrint(data.data[0].l2G);
                l2K.textContent = formatPrint(data.data[0].l2K);
                l2E.textContent = formatPrint(data.data[0].l2E);
                l2L.textContent = formatPrint(data.data[0].l2L);
                l2Ket.textContent = data.data[0].l2Ket;
                l3D.textContent = formatPrint(data.data[0].l3D);
                l3G.textContent = formatPrint(data.data[0].l3G);
                l3K.textContent = formatPrint(data.data[0].l3K);
                l3E.textContent = formatPrint(data.data[0].l3E);
                l3L.textContent = formatPrint(data.data[0].l3L);
                l3Ket.textContent = data.data[0].l3Ket;
                l4D.textContent = formatPrint(data.data[0].l4D);
                l4G.textContent = formatPrint(data.data[0].l4G);
                l4K.textContent = formatPrint(data.data[0].l4K);
                l4E.textContent = formatPrint(data.data[0].l4E);
                l4L.textContent = formatPrint(data.data[0].l4L);
                l4Ket.textContent = data.data[0].l4Ket;
                l5D.textContent = formatPrint(data.data[0].l5D);
                l5G.textContent = formatPrint(data.data[0].l5G);
                l5K.textContent = formatPrint(data.data[0].l5K);
                l5E.textContent = formatPrint(data.data[0].l5E);
                l5L.textContent = formatPrint(data.data[0].l5L);
                l5Ket.textContent = data.data[0].l5Ket;
                l6D.textContent = formatPrint(data.data[0].l6D);
                l6G.textContent = formatPrint(data.data[0].l6G);
                l6K.textContent = formatPrint(data.data[0].l6K);
                l6E.textContent = formatPrint(data.data[0].l6E);
                l6L.textContent = formatPrint(data.data[0].l6L);
                l6Ket.textContent = data.data[0].l6Ket;
                l7D.textContent = formatPrint(data.data[0].l7D);
                l7G.textContent = formatPrint(data.data[0].l7G);
                l7K.textContent = formatPrint(data.data[0].l7K);
                l7E.textContent = formatPrint(data.data[0].l7E);
                l7L.textContent = formatPrint(data.data[0].l7L);
                l7Ket.textContent = data.data[0].l7Ket;
                l8D.textContent = formatPrint(data.data[0].l8D);
                l8G.textContent = formatPrint(data.data[0].l8G);
                l8K.textContent = formatPrint(data.data[0].l8K);
                l8E.textContent = formatPrint(data.data[0].l8E);
                l8L.textContent = formatPrint(data.data[0].l8L);
                l8Ket.textContent = data.data[0].l8Ket;
                l9D.textContent = formatPrint(data.data[0].l9D);
                l9G.textContent = formatPrint(data.data[0].l9G);
                l9K.textContent = formatPrint(data.data[0].l9K);
                l9E.textContent = formatPrint(data.data[0].l9E);
                l9L.textContent = formatPrint(data.data[0].l9L);
                l9Ket.textContent = data.data[0].l9Ket;
                l10D.textContent = formatPrint(data.data[0].l10D);
                l10G.textContent = formatPrint(data.data[0].l10G);
                l10K.textContent = formatPrint(data.data[0].l10K);
                l10E.textContent = formatPrint(data.data[0].l10E);
                l10L.textContent = formatPrint(data.data[0].l10L);
                l11D.textContent = formatPrint(data.data[0].l11D);
                l11G.textContent = formatPrint(data.data[0].l11G);
                l11K.textContent = formatPrint(data.data[0].l11K);
                l11E.textContent = formatPrint(data.data[0].l11E);
                l11L.textContent = formatPrint(data.data[0].l11L);
                l12D.textContent = formatPrint(data.data[0].l12D);
                l12G.textContent = formatPrint(data.data[0].l12G);
                l12K.textContent = formatPrint(data.data[0].l12K);
                l12E.textContent = formatPrint(data.data[0].l12E);
                l12L.textContent = formatPrint(data.data[0].l12L);
                rrD.textContent = formatPrint(data.data[0].rrD);
                rrG.textContent = formatPrint(data.data[0].rrG);
                rrK.textContent = formatPrint(data.data[0].rrK);
                rrE.textContent = formatPrint(data.data[0].rrE);
                rrL.textContent = formatPrint(data.data[0].rrL);

                $("#modalLaporan").modal("show");
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    //#region ACC
    $('#table_atas').on('click', '.btn-acc', function () {
        const id = $(this).data('id');
        console.log(id);
        // idDetail = id;
        Swal.fire({
            title: 'Apakah anda yakin ingin ACC data?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "ACCPengecekanMB",
                    dataType: "json",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 1,
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
                                $("#table_atas").DataTable().ajax.reload();
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