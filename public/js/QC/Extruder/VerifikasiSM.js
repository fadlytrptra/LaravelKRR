jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tanggal = document.getElementById("tanggal");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");
    let btn_simpanKet = document.getElementById("btn_simpanKet");
    //#region Inisialisasi ID Laporan
    let referensi = document.getElementById("referensi");
    let halaman = document.getElementById("halaman");
    let effisiensi = document.getElementById("effisiensi");
    // let shiftSelector = document.getElementById("shiftSelector");
    let shiftValue = document.getElementById("shiftValue");
    let timeStart = document.getElementById("timeStart");
    let timeEnd = document.getElementById("timeEnd");
    let spek_mesin = document.getElementById("spek_mesin");
    let spek_benang = document.getElementById("spek_benang");
    let timeA = document.getElementById("timeA");
    let timeB = document.getElementById("timeB");
    let timeC = document.getElementById("timeC");
    let timeD = document.getElementById("timeD");
    let timeE = document.getElementById("timeE");
    let timeF = document.getElementById("timeF");
    let timeG = document.getElementById("timeG");
    let c1A = document.getElementById("c1A");
    let c1B = document.getElementById("c1B");
    let c1C = document.getElementById("c1C");
    let c1D = document.getElementById("c1D");
    let c1E = document.getElementById("c1E");
    let c1F = document.getElementById("c1F");
    let c1G = document.getElementById("c1G");
    let c2A = document.getElementById("c2A");
    let c2B = document.getElementById("c2B");
    let c2C = document.getElementById("c2C");
    let c2D = document.getElementById("c2D");
    let c2E = document.getElementById("c2E");
    let c2F = document.getElementById("c2F");
    let c2G = document.getElementById("c2G");
    let c3A = document.getElementById("c3A");
    let c3B = document.getElementById("c3B");
    let c3C = document.getElementById("c3C");
    let c3D = document.getElementById("c3D");
    let c3E = document.getElementById("c3E");
    let c3F = document.getElementById("c3F");
    let c3G = document.getElementById("c3G");
    let c4A = document.getElementById("c4A");
    let c4B = document.getElementById("c4B");
    let c4C = document.getElementById("c4C");
    let c4D = document.getElementById("c4D");
    let c4E = document.getElementById("c4E");
    let c4F = document.getElementById("c4F");
    let c4G = document.getElementById("c4G");
    let c5A = document.getElementById("c5A");
    let c5B = document.getElementById("c5B");
    let c5C = document.getElementById("c5C");
    let c5D = document.getElementById("c5D");
    let c5E = document.getElementById("c5E");
    let c5F = document.getElementById("c5F");
    let c5G = document.getElementById("c5G");
    let c6A = document.getElementById("c6A");
    let c6B = document.getElementById("c6B");
    let c6C = document.getElementById("c6C");
    let c6D = document.getElementById("c6D");
    let c6E = document.getElementById("c6E");
    let c6F = document.getElementById("c6F");
    let c6G = document.getElementById("c6G");
    let c7A = document.getElementById("c7A");
    let c7B = document.getElementById("c7B");
    let c7C = document.getElementById("c7C");
    let c7D = document.getElementById("c7D");
    let c7E = document.getElementById("c7E");
    let c7F = document.getElementById("c7F");
    let c7G = document.getElementById("c7G");
    let c8A = document.getElementById("c8A");
    let c8B = document.getElementById("c8B");
    let c8C = document.getElementById("c8C");
    let c8D = document.getElementById("c8D");
    let c8E = document.getElementById("c8E");
    let c8F = document.getElementById("c8F");
    let c8G = document.getElementById("c8G");
    let flA = document.getElementById("flA");
    let flB = document.getElementById("flB");
    let flC = document.getElementById("flC");
    let flD = document.getElementById("flD");
    let flE = document.getElementById("flE");
    let flF = document.getElementById("flF");
    let flG = document.getElementById("flG");
    let scA = document.getElementById("scA");
    let scB = document.getElementById("scB");
    let scC = document.getElementById("scC");
    let scD = document.getElementById("scD");
    let scE = document.getElementById("scE");
    let scF = document.getElementById("scF");
    let scG = document.getElementById("scG");
    let jnA = document.getElementById("jnA");
    let jnB = document.getElementById("jnB");
    let jnC = document.getElementById("jnC");
    let jnD = document.getElementById("jnD");
    let jnE = document.getElementById("jnE");
    let jnF = document.getElementById("jnF");
    let jnG = document.getElementById("jnG");
    let d1A = document.getElementById("d1A");
    let d1B = document.getElementById("d1B");
    let d1C = document.getElementById("d1C");
    let d1D = document.getElementById("d1D");
    let d1E = document.getElementById("d1E");
    let d1F = document.getElementById("d1F");
    let d1G = document.getElementById("d1G");
    let d2A = document.getElementById("d2A");
    let d2B = document.getElementById("d2B");
    let d2C = document.getElementById("d2C");
    let d2D = document.getElementById("d2D");
    let d2E = document.getElementById("d2E");
    let d2F = document.getElementById("d2F");
    let d2G = document.getElementById("d2G");
    let d3A = document.getElementById("d3A");
    let d3B = document.getElementById("d3B");
    let d3C = document.getElementById("d3C");
    let d3D = document.getElementById("d3D");
    let d3E = document.getElementById("d3E");
    let d3F = document.getElementById("d3F");
    let d3G = document.getElementById("d3G");
    let d4A = document.getElementById("d4A");
    let d4B = document.getElementById("d4B");
    let d4C = document.getElementById("d4C");
    let d4D = document.getElementById("d4D");
    let d4E = document.getElementById("d4E");
    let d4F = document.getElementById("d4F");
    let d4G = document.getElementById("d4G");
    let d5A = document.getElementById("d5A");
    let d5B = document.getElementById("d5B");
    let d5C = document.getElementById("d5C");
    let d5D = document.getElementById("d5D");
    let d5E = document.getElementById("d5E");
    let d5F = document.getElementById("d5F");
    let d5G = document.getElementById("d5G");
    let d6A = document.getElementById("d6A");
    let d6B = document.getElementById("d6B");
    let d6C = document.getElementById("d6C");
    let d6D = document.getElementById("d6D");
    let d6E = document.getElementById("d6E");
    let d6F = document.getElementById("d6F");
    let d6G = document.getElementById("d6G");
    let srA = document.getElementById("srA");
    let srB = document.getElementById("srB");
    let srC = document.getElementById("srC");
    let srD = document.getElementById("srD");
    let srE = document.getElementById("srE");
    let srF = document.getElementById("srF");
    let srG = document.getElementById("srG");
    let mrA = document.getElementById("mrA");
    let mrB = document.getElementById("mrB");
    let mrC = document.getElementById("mrC");
    let mrD = document.getElementById("mrD");
    let mrE = document.getElementById("mrE");
    let mrF = document.getElementById("mrF");
    let mrG = document.getElementById("mrG");
    let mvA = document.getElementById("mvA");
    let mvB = document.getElementById("mvB");
    let mvC = document.getElementById("mvC");
    let mvD = document.getElementById("mvD");
    let mvE = document.getElementById("mvE");
    let mvF = document.getElementById("mvF");
    let mvG = document.getElementById("mvG");
    let mpp1A = document.getElementById("mpp1A");
    let mpp1B = document.getElementById("mpp1B");
    let mpp1C = document.getElementById("mpp1C");
    let mpp1D = document.getElementById("mpp1D");
    let mpp1E = document.getElementById("mpp1E");
    let mpp1F = document.getElementById("mpp1F");
    let mpp1G = document.getElementById("mpp1G");
    let mpp2A = document.getElementById("mpp2A");
    let mpp2B = document.getElementById("mpp2B");
    let mpp2C = document.getElementById("mpp2C");
    let mpp2D = document.getElementById("mpp2D");
    let mpp2E = document.getElementById("mpp2E");
    let mpp2F = document.getElementById("mpp2F");
    let mpp2G = document.getElementById("mpp2G");
    let qbA = document.getElementById("qbA");
    let qbB = document.getElementById("qbB");
    let qbC = document.getElementById("qbC");
    let qbD = document.getElementById("qbD");
    let qbE = document.getElementById("qbE");
    let qbF = document.getElementById("qbF");
    let qbG = document.getElementById("qbG");
    let fewA = document.getElementById("fewA");
    let fewB = document.getElementById("fewB");
    let fewC = document.getElementById("fewC");
    let fewD = document.getElementById("fewD");
    let fewE = document.getElementById("fewE");
    let fewF = document.getElementById("fewF");
    let fewG = document.getElementById("fewG");
    let swA = document.getElementById("swA");
    let swB = document.getElementById("swB");
    let swC = document.getElementById("swC");
    let swD = document.getElementById("swD");
    let swE = document.getElementById("swE");
    let swF = document.getElementById("swF");
    let swG = document.getElementById("swG");
    let noyA = document.getElementById("noyA");
    let noyB = document.getElementById("noyB");
    let noyC = document.getElementById("noyC");
    let noyD = document.getElementById("noyD");
    let noyE = document.getElementById("noyE");
    let noyF = document.getElementById("noyF");
    let noyG = document.getElementById("noyG");
    let wgA = document.getElementById("wgA");
    let wgB = document.getElementById("wgB");
    let wgC = document.getElementById("wgC");
    let wgD = document.getElementById("wgD");
    let wgE = document.getElementById("wgE");
    let wgF = document.getElementById("wgF");
    let wgG = document.getElementById("wgG");
    let rs1A = document.getElementById("rs1A");
    let rs1B = document.getElementById("rs1B");
    let rs1C = document.getElementById("rs1C");
    let rs1D = document.getElementById("rs1D");
    let rs1E = document.getElementById("rs1E");
    let rs1F = document.getElementById("rs1F");
    let rs1G = document.getElementById("rs1G");
    let rs2A = document.getElementById("rs2A");
    let rs2B = document.getElementById("rs2B");
    let rs2C = document.getElementById("rs2C");
    let rs2D = document.getElementById("rs2D");
    let rs2E = document.getElementById("rs2E");
    let rs2F = document.getElementById("rs2F");
    let rs2G = document.getElementById("rs2G");
    let rs3A = document.getElementById("rs3A");
    let rs3B = document.getElementById("rs3B");
    let rs3C = document.getElementById("rs3C");
    let rs3D = document.getElementById("rs3D");
    let rs3E = document.getElementById("rs3E");
    let rs3F = document.getElementById("rs3F");
    let rs3G = document.getElementById("rs3G");
    let strA = document.getElementById("strA");
    let strB = document.getElementById("strB");
    let strC = document.getElementById("strC");
    let strD = document.getElementById("strD");
    let strE = document.getElementById("strE");
    let strF = document.getElementById("strF");
    let strG = document.getElementById("strG");
    let rA = document.getElementById("rA");
    let rB = document.getElementById("rB");
    let rC = document.getElementById("rC");
    let rD = document.getElementById("rD");
    let rE = document.getElementById("rE");
    let rF = document.getElementById("rF");
    let rG = document.getElementById("rG");
    let uotA = document.getElementById("uotA");
    let uotB = document.getElementById("uotB");
    let uotC = document.getElementById("uotC");
    let uotD = document.getElementById("uotD");
    let uotE = document.getElementById("uotE");
    let uotF = document.getElementById("uotF");
    let uotG = document.getElementById("uotG");
    let lotA = document.getElementById("lotA");
    let lotB = document.getElementById("lotB");
    let lotC = document.getElementById("lotC");
    let lotD = document.getElementById("lotD");
    let lotE = document.getElementById("lotE");
    let lotF = document.getElementById("lotF");
    let lotG = document.getElementById("lotG");
    let at1A = document.getElementById("at1A");
    let at1B = document.getElementById("at1B");
    let at1C = document.getElementById("at1C");
    let at1D = document.getElementById("at1D");
    let at1E = document.getElementById("at1E");
    let at1F = document.getElementById("at1F");
    let at1G = document.getElementById("at1G");
    let at2A = document.getElementById("at2A");
    let at2B = document.getElementById("at2B");
    let at2C = document.getElementById("at2C");
    let at2D = document.getElementById("at2D");
    let at2E = document.getElementById("at2E");
    let at2F = document.getElementById("at2F");
    let at2G = document.getElementById("at2G");
    let at3A = document.getElementById("at3A");
    let at3B = document.getElementById("at3B");
    let at3C = document.getElementById("at3C");
    let at3D = document.getElementById("at3D");
    let at3E = document.getElementById("at3E");
    let at3F = document.getElementById("at3F");
    let at3G = document.getElementById("at3G");
    let time1 = document.getElementById("time1");
    let remark1 = document.getElementById("remark1");
    let time2 = document.getElementById("time2");
    let remark2 = document.getElementById("remark2");
    let time3 = document.getElementById("time3");
    let remark3 = document.getElementById("remark3");
    let time4 = document.getElementById("time4");
    let remark4 = document.getElementById("remark4");
    let time5 = document.getElementById("time5");
    let remark5 = document.getElementById("remark5");
    let time6 = document.getElementById("time6");
    let remark6 = document.getElementById("remark6");
    let kwhM1 = document.getElementById("kwhM1");
    let kwhM2 = document.getElementById("kwhM2");
    let jamProd = document.getElementById("jamProd");
    let ppA = document.getElementById("ppA");
    let ppB = document.getElementById("ppB");
    let ppC = document.getElementById("ppC");
    let ppD = document.getElementById("ppD");
    let cacA = document.getElementById("cacA");
    let cacB = document.getElementById("cacB");
    let cacC = document.getElementById("cacC");
    let cacD = document.getElementById("cacD");
    let cacE = document.getElementById("cacE");
    let cacF = document.getElementById("cacF");
    let mbA = document.getElementById("mbA");
    let mbB = document.getElementById("mbB");
    let mbC = document.getElementById("mbC");
    let mbD = document.getElementById("mbD");
    let mbE = document.getElementById("mbE");
    let mbF = document.getElementById("mbF");
    let uvA = document.getElementById("uvA");
    let uvB = document.getElementById("uvB");
    let uvC = document.getElementById("uvC");
    let uvD = document.getElementById("uvD");
    let uvE = document.getElementById("uvE");
    let uvF = document.getElementById("uvF");
    let asbA = document.getElementById("asbA");
    let asbB = document.getElementById("asbB");
    let asbC = document.getElementById("asbC");
    let asbD = document.getElementById("asbD");
    let asbE = document.getElementById("asbE");
    let asbF = document.getElementById("asbF");
    let llA = document.getElementById("llA");
    let llB = document.getElementById("llB");
    let llC = document.getElementById("llC");
    let llD = document.getElementById("llD");
    let llF = document.getElementById("llF");
    let bhn1A = document.getElementById("bhn1A");
    let bhn1B = document.getElementById("bhn1B");
    let bhn1C = document.getElementById("bhn1C");
    let bhn1D = document.getElementById("bhn1D");
    let bhn1E = document.getElementById("bhn1E");
    let bhn1F = document.getElementById("bhn1F");
    let bhn2A = document.getElementById("bhn2A");
    let bhn2B = document.getElementById("bhn2B");
    let bhn2C = document.getElementById("bhn2C");
    let bhn2D = document.getElementById("bhn2D");
    let bhn2E = document.getElementById("bhn2E");
    let bhn2F = document.getElementById("bhn2F");
    let mbAT = document.getElementById("mbAT");
    let uvAT = document.getElementById("uvAT");
    let asbAT = document.getElementById("asbAT");
    let llAT = document.getElementById("llAT");
    let bngM = document.getElementById("bngM");
    let prongM = document.getElementById("prongM");
    let silM = document.getElementById("silM");
    let bngL = document.getElementById("bngL");
    let prongL = document.getElementById("prongL");
    let silL = document.getElementById("silL");
    let bngMe = document.getElementById("bngMe");
    let prongMe = document.getElementById("prongMe");
    let silMe = document.getElementById("silMe");
    let bngGB = document.getElementById("bngGB");
    let prongGB = document.getElementById("prongGB");
    let silGB = document.getElementById("silGB");
    let bngLL = document.getElementById("bngLL");
    let prongLL = document.getElementById("prongLL");
    let silLL = document.getElementById("silLL");
    let total = document.getElementById("total");
    let keterangan = document.getElementById("keterangan");
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

    const slcLokasi = document.getElementById("lokasi");

    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();

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

    btn_simpanKet.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "VerifikasiSM",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: 2,
                idLaporan: idLapKoreksi,
                keterangan: keterangan.innerHTML,
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
                        $("#modalLaporan").modal("hide");
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
    });

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        // if ($("#" + slcTypeKain.id).val() == 1) {
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "VerifikasiSM/getDataExt",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awal: tgl_awal.value,
                        tgl_akhir: tgl_akhir.value,
                        id_lokasi: $("#" + slcLokasi.id).val(),
                    });
                },
            },
            columns: [
                {
                    data: "idLaporan",
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
                { data: "spek_mesin" },
                { data: "spek_benang" },
                { data: "userInput" },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row) {
                        // jika sudah ada user acc → sembunyikan tombol
                        if (
                            row.userVerified !== null &&
                            row.userVerified !== ""
                        ) {
                            return '<span style="color: green; font-weight: bold;">Sudah diverifikasi ' + row.userVerified + '</span>';
                        }

                        // jika belum acc → tampilkan tombol
                        return `
                            <button class="btn btn-sm btn-success btn-verifikasi" style="width: 100px;" data-id="${row.idLaporan}">
                                <i class="fa fa-edit"></i> Verifikasi
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

    $("#table_atas").on("click", ".btn-verifikasi", function () {
        const id = $(this).data("id");
        console.log(id);
        Swal.fire({
            title: "Apakah anda yakin ingin verifikasi id laporan " + id + "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "VerifikasiSM",
                    dataType: "json",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 1,
                        idLaporan: id,
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

    let idLapKoreksi = null;
    $("#table_atas").on("click", ".link-idheader", function () {
        const id = $(this).data('id');
        idLapKoreksi = id;
        console.log('Koreksi data ID:', id);
        $("#modalLabelCustomer").text("Koreksi Laporan");
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
        timeA.textContent = "";
        timeB.textContent = "";
        timeC.textContent = "";
        timeD.textContent = "";
        timeE.textContent = "";
        timeF.textContent = "";
        timeG.textContent = "";
        $.ajax({
            url: "VerifikasiSM/getDataPrint",
            type: "GET",
            data: {
                _token: csrfToken,
                idLaporan: id,
                keterangan: keterangan.value
            },
            success: function (data) {
                if (data.data[0].userVerified !== null) {
                    btn_simpanKet.disabled = true;
                } else {
                    btn_simpanKet.disabled = false;
                }

                if (data.ttd && data.ttd !== "") {

                    let ttd = data.ttd.FotoTtd;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    $("#ttd_qc")
                        .attr("src", ttd)
                        .show();
                } else {
                    $("#ttd_qc")
                        .attr("src", "")
                        .show();
                }
                const fieldsB = [
                    "timeB", "c1B", "c2B", "c3B", "c4B", "c5B", "c6B", "c7B", "c8B",
                    "flB", "scB", "jnB", "d1B", "d2B", "d3B", "d4B", "d5B", "d6B",
                    "srB", "mrB", "mvB", "mpp1B", "mpp2B", "qbB", "fewB", "swB",
                    "noyB", "wgB", "rs1B", "rs2B", "rs3B", "strB", "rB", "uotB",
                    "lotB", "at1B", "at2B", "at3B"
                ];

                const fieldsC = [
                    "timeC", "c1C", "c2C", "c3C", "c4C", "c5C", "c6C", "c7C", "c8C",
                    "flC", "scC", "jnC", "d1C", "d2C", "d3C", "d4C", "d5C", "d6C",
                    "srC", "mrC", "mvC", "mpp1C", "mpp2C", "qbC", "fewC", "swC",
                    "noyC", "wgC", "rs1C", "rs2C", "rs3C", "strC", "rC", "uotC",
                    "lotC", "at1C", "at2C", "at3C"
                ];

                const fieldsD = [
                    "timeD", "c1D", "c2D", "c3D", "c4D", "c5D", "c6D", "c7D", "c8D",
                    "flD", "scD", "jnD", "d1D", "d2D", "d3D", "d4D", "d5D", "d6D",
                    "srD", "mrD", "mvD", "mpp1D", "mpp2D", "qbD", "fewD", "swD",
                    "noyD", "wgD", "rs1D", "rs2D", "rs3D", "strD", "rD", "uotD",
                    "lotD", "at1D", "at2D", "at3D"
                ];

                const fieldsE = [
                    "timeE", "c1E", "c2E", "c3E", "c4E", "c5E", "c6E", "c7E", "c8E",
                    "flE", "scE", "jnE", "d1E", "d2E", "d3E", "d4E", "d5E", "d6E",
                    "srE", "mrE", "mvE", "mpp1E", "mpp2E", "qbE", "fewE", "swE",
                    "noyE", "wgE", "rs1E", "rs2E", "rs3E", "strE", "rE", "uotE",
                    "lotE", "at1E", "at2E", "at3E"
                ];

                const fieldsF = [
                    "timeF", "c1F", "c2F", "c3F", "c4F", "c5F", "c6F", "c7F", "c8F",
                    "flF", "scF", "jnF", "d1F", "d2F", "d3F", "d4F", "d5F", "d6F",
                    "srF", "mrF", "mvF", "mpp1F", "mpp2F", "qbF", "fewF", "swF",
                    "noyF", "wgF", "rs1F", "rs2F", "rs3F", "strF", "rF", "uotF",
                    "lotF", "at1F", "at2F", "at3F"
                ];

                const fieldsG = [
                    "timeG", "c1G", "c2G", "c3G", "c4G", "c5G", "c6G", "c7G", "c8G",
                    "flG", "scG", "jnG", "d1G", "d2G", "d3G", "d4G", "d5G", "d6G",
                    "srG", "mrG", "mvG", "mpp1G", "mpp2G", "qbG", "fewG", "swG",
                    "noyG", "wgG", "rs1G", "rs2G", "rs3G", "strG", "rG", "uotG",
                    "lotG", "at1G", "at2G", "at3G"
                ];

                // ======== Kolom B ========
                let colorB = data.data[0].colorB === "red" ? "red" : "black";
                applyColorGroup(fieldsB, colorB);
                // set radio
                let rB = document.querySelector(`input[name="colorB"][value="${colorB}"]`);
                if (rB) {
                    rB.checked = true;
                    rB.dispatchEvent(new Event("change"));
                }

                // ======== Kolom C ========
                let colorC = data.data[0].colorC === "red" ? "red" : "black";
                applyColorGroup(fieldsC, colorC);
                let rC = document.querySelector(`input[name="colorC"][value="${colorC}"]`);
                if (rC) {
                    rC.checked = true;
                    rC.dispatchEvent(new Event("change"));
                }

                // ======== Kolom D ========
                let colorD = data.data[0].colorD === "red" ? "red" : "black";
                applyColorGroup(fieldsD, colorD);
                let rD = document.querySelector(`input[name="colorD"][value="${colorD}"]`);
                if (rD) {
                    rD.checked = true;
                    rD.dispatchEvent(new Event("change"));
                }

                // ======== Kolom E ========
                let colorE = data.data[0].colorE === "red" ? "red" : "black";
                applyColorGroup(fieldsE, colorE);
                let rE = document.querySelector(`input[name="colorE"][value="${colorE}"]`);
                if (rE) {
                    rE.checked = true;
                    rE.dispatchEvent(new Event("change"));
                }

                // ======== Kolom F ========
                let colorF = data.data[0].colorF === "red" ? "red" : "black";
                applyColorGroup(fieldsF, colorF);
                let rF = document.querySelector(`input[name="colorF"][value="${colorF}"]`);
                if (rF) {
                    rF.checked = true;
                    rF.dispatchEvent(new Event("change"));
                }

                // ======== Kolom G ========
                let colorG = data.data[0].colorG === "red" ? "red" : "black";
                applyColorGroup(fieldsG, colorG);
                let rG = document.querySelector(`input[name="colorG"][value="${colorG}"]`);
                if (rG) {
                    rG.checked = true;
                    rG.dispatchEvent(new Event("change"));
                }

                referensi.textContent = data.data[0].referensi;
                if (data.data[0].tanggal) {
                    const tgl = data.data[0].tanggal.split(' ')[0];
                    document.getElementById("tanggal").value = tgl;
                }
                halaman.innerHTML = '1&emsp;Dari&emsp;1';
                effisiensi.textContent = data.data[0].effisiensi;
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
                spek_mesin.textContent = data.data[0].spek_mesin;
                spek_benang.textContent = data.data[0].spek_benang;
                if (data.data[0].timeA) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].timeA);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].timeA.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("timeA").textContent = jamMenit;
                }
                if (data.data[0].timeB) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].timeB);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].timeB.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("timeB").textContent = jamMenit;
                }
                if (data.data[0].timeC) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].timeC);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].timeC.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("timeC").textContent = jamMenit;
                }
                if (data.data[0].timeD) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].timeD);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].timeD.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("timeD").textContent = jamMenit;
                }
                if (data.data[0].timeE) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].timeE);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].timeE.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("timeE").textContent = jamMenit;
                }
                if (data.data[0].timeF) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].timeF);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].timeF.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("timeF").textContent = jamMenit;
                }
                if (data.data[0].timeG) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].timeG);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].timeG.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("timeG").textContent = jamMenit;
                }
                c1A.textContent = formatPrint(data.data[0].c1A);
                c1B.textContent = formatPrint(data.data[0].c1B);
                c1C.textContent = formatPrint(data.data[0].c1C);
                c1D.textContent = formatPrint(data.data[0].c1D);
                c1E.textContent = formatPrint(data.data[0].c1E);
                c1F.textContent = formatPrint(data.data[0].c1F);
                c1G.textContent = formatPrint(data.data[0].c1G);
                c2A.textContent = formatPrint(data.data[0].c2A);
                c2B.textContent = formatPrint(data.data[0].c2B);
                c2C.textContent = formatPrint(data.data[0].c2C);
                c2D.textContent = formatPrint(data.data[0].c2D);
                c2E.textContent = formatPrint(data.data[0].c2E);
                c2F.textContent = formatPrint(data.data[0].c2F);
                c2G.textContent = formatPrint(data.data[0].c2G);
                c3A.textContent = formatPrint(data.data[0].c3A);
                c3B.textContent = formatPrint(data.data[0].c3B);
                c3C.textContent = formatPrint(data.data[0].c3C);
                c3D.textContent = formatPrint(data.data[0].c3D);
                c3E.textContent = formatPrint(data.data[0].c3E);
                c3F.textContent = formatPrint(data.data[0].c3F);
                c3G.textContent = formatPrint(data.data[0].c3G);
                c4A.textContent = formatPrint(data.data[0].c4A);
                c4B.textContent = formatPrint(data.data[0].c4B);
                c4C.textContent = formatPrint(data.data[0].c4C);
                c4D.textContent = formatPrint(data.data[0].c4D);
                c4E.textContent = formatPrint(data.data[0].c4E);
                c4F.textContent = formatPrint(data.data[0].c4F);
                c4G.textContent = formatPrint(data.data[0].c4G);
                c5A.textContent = formatPrint(data.data[0].c5A);
                c5B.textContent = formatPrint(data.data[0].c5B);
                c5C.textContent = formatPrint(data.data[0].c5C);
                c5D.textContent = formatPrint(data.data[0].c5D);
                c5E.textContent = formatPrint(data.data[0].c5E);
                c5F.textContent = formatPrint(data.data[0].c5F);
                c5G.textContent = formatPrint(data.data[0].c5G);
                c6A.textContent = formatPrint(data.data[0].c6A);
                c6B.textContent = formatPrint(data.data[0].c6B);
                c6C.textContent = formatPrint(data.data[0].c6C);
                c6D.textContent = formatPrint(data.data[0].c6D);
                c6E.textContent = formatPrint(data.data[0].c6E);
                c6F.textContent = formatPrint(data.data[0].c6F);
                c6G.textContent = formatPrint(data.data[0].c6G);
                c7A.textContent = formatPrint(data.data[0].c7A);
                c7B.textContent = formatPrint(data.data[0].c7B);
                c7C.textContent = formatPrint(data.data[0].c7C);
                c7D.textContent = formatPrint(data.data[0].c7D);
                c7E.textContent = formatPrint(data.data[0].c7E);
                c7F.textContent = formatPrint(data.data[0].c7F);
                c7G.textContent = formatPrint(data.data[0].c7G);
                c8A.textContent = formatPrint(data.data[0].c8A);
                c8B.textContent = formatPrint(data.data[0].c8B);
                c8C.textContent = formatPrint(data.data[0].c8C);
                c8D.textContent = formatPrint(data.data[0].c8D);
                c8E.textContent = formatPrint(data.data[0].c8E);
                c8F.textContent = formatPrint(data.data[0].c8F);
                c8G.textContent = formatPrint(data.data[0].c8G);
                flA.textContent = formatPrint(data.data[0].flA);
                flB.textContent = formatPrint(data.data[0].flB);
                flC.textContent = formatPrint(data.data[0].flC);
                flD.textContent = formatPrint(data.data[0].flD);
                flE.textContent = formatPrint(data.data[0].flE);
                flF.textContent = formatPrint(data.data[0].flF);
                flG.textContent = formatPrint(data.data[0].flG);
                scA.textContent = formatPrint(data.data[0].scA);
                scB.textContent = formatPrint(data.data[0].scB);
                scC.textContent = formatPrint(data.data[0].scC);
                scD.textContent = formatPrint(data.data[0].scD);
                scE.textContent = formatPrint(data.data[0].scE);
                scF.textContent = formatPrint(data.data[0].scF);
                scG.textContent = formatPrint(data.data[0].scG);
                jnA.textContent = formatPrint(data.data[0].jnA);
                jnB.textContent = formatPrint(data.data[0].jnB);
                jnC.textContent = formatPrint(data.data[0].jnC);
                jnD.textContent = formatPrint(data.data[0].jnD);
                jnE.textContent = formatPrint(data.data[0].jnE);
                jnF.textContent = formatPrint(data.data[0].jnF);
                jnG.textContent = formatPrint(data.data[0].jnG);
                d1A.textContent = formatPrint(data.data[0].d1A);
                d1B.textContent = formatPrint(data.data[0].d1B);
                d1C.textContent = formatPrint(data.data[0].d1C);
                d1D.textContent = formatPrint(data.data[0].d1D);
                d1E.textContent = formatPrint(data.data[0].d1E);
                d1F.textContent = formatPrint(data.data[0].d1F);
                d1G.textContent = formatPrint(data.data[0].d1G);
                d2A.textContent = formatPrint(data.data[0].d2A);
                d2B.textContent = formatPrint(data.data[0].d2B);
                d2C.textContent = formatPrint(data.data[0].d2C);
                d2D.textContent = formatPrint(data.data[0].d2D);
                d2E.textContent = formatPrint(data.data[0].d2E);
                d2F.textContent = formatPrint(data.data[0].d2F);
                d2G.textContent = formatPrint(data.data[0].d2G);
                d3A.textContent = formatPrint(data.data[0].d3A);
                d3B.textContent = formatPrint(data.data[0].d3B);
                d3C.textContent = formatPrint(data.data[0].d3C);
                d3D.textContent = formatPrint(data.data[0].d3D);
                d3E.textContent = formatPrint(data.data[0].d3E);
                d3F.textContent = formatPrint(data.data[0].d3F);
                d3G.textContent = formatPrint(data.data[0].d3G);
                d4A.textContent = formatPrint(data.data[0].d4A);
                d4B.textContent = formatPrint(data.data[0].d4B);
                d4C.textContent = formatPrint(data.data[0].d4C);
                d4D.textContent = formatPrint(data.data[0].d4D);
                d4E.textContent = formatPrint(data.data[0].d4E);
                d4F.textContent = formatPrint(data.data[0].d4F);
                d4G.textContent = formatPrint(data.data[0].d4G);
                d5A.textContent = formatPrint(data.data[0].d5A);
                d5B.textContent = formatPrint(data.data[0].d5B);
                d5C.textContent = formatPrint(data.data[0].d5C);
                d5D.textContent = formatPrint(data.data[0].d5D);
                d5E.textContent = formatPrint(data.data[0].d5E);
                d5F.textContent = formatPrint(data.data[0].d5F);
                d5G.textContent = formatPrint(data.data[0].d5G);
                d6A.textContent = formatPrint(data.data[0].d6A);
                d6B.textContent = formatPrint(data.data[0].d6B);
                d6C.textContent = formatPrint(data.data[0].d6C);
                d6D.textContent = formatPrint(data.data[0].d6D);
                d6E.textContent = formatPrint(data.data[0].d6E);
                d6F.textContent = formatPrint(data.data[0].d6F);
                d6G.textContent = formatPrint(data.data[0].d6G);
                srA.textContent = data.data[0].srA;
                srB.textContent = data.data[0].srB;
                srC.textContent = data.data[0].srC;
                srD.textContent = data.data[0].srD;
                srE.textContent = data.data[0].srE;
                srF.textContent = data.data[0].srF;
                srG.textContent = data.data[0].srG;
                mrA.textContent = data.data[0].mrA;
                mrB.textContent = data.data[0].mrB;
                mrC.textContent = data.data[0].mrC;
                mrD.textContent = data.data[0].mrD;
                mrE.textContent = data.data[0].mrE;
                mrF.textContent = data.data[0].mrF;
                mrG.textContent = data.data[0].mrG;
                mvA.textContent = data.data[0].mvA;
                mvB.textContent = data.data[0].mvB;
                mvC.textContent = data.data[0].mvC;
                mvD.textContent = data.data[0].mvD;
                mvE.textContent = data.data[0].mvE;
                mvF.textContent = data.data[0].mvF;
                mvG.textContent = data.data[0].mvG;
                mpp1A.textContent = data.data[0].mpp1A;
                mpp1B.textContent = data.data[0].mpp1B;
                mpp1C.textContent = data.data[0].mpp1C;
                mpp1D.textContent = data.data[0].mpp1D;
                mpp1E.textContent = data.data[0].mpp1E;
                mpp1F.textContent = data.data[0].mpp1F;
                mpp1G.textContent = data.data[0].mpp1G;
                mpp2A.textContent = data.data[0].mpp2A;
                mpp2B.textContent = data.data[0].mpp2B;
                mpp2C.textContent = data.data[0].mpp2C;
                mpp2D.textContent = data.data[0].mpp2D;
                mpp2E.textContent = data.data[0].mpp2E;
                mpp2F.textContent = data.data[0].mpp2F;
                mpp2G.textContent = data.data[0].mpp2G;
                qbA.textContent = data.data[0].qbA;
                qbB.textContent = data.data[0].qbB;
                qbC.textContent = data.data[0].qbC;
                qbD.textContent = data.data[0].qbD;
                qbE.textContent = data.data[0].qbE;
                qbF.textContent = data.data[0].qbF;
                qbG.textContent = data.data[0].qbG;
                fewA.textContent = data.data[0].fewA;
                fewB.textContent = data.data[0].fewB;
                fewC.textContent = data.data[0].fewC;
                fewD.textContent = data.data[0].fewD;
                fewE.textContent = data.data[0].fewE;
                fewF.textContent = data.data[0].fewF;
                fewG.textContent = data.data[0].fewG;
                swA.textContent = data.data[0].swA;
                swB.textContent = data.data[0].swB;
                swC.textContent = data.data[0].swC;
                swD.textContent = data.data[0].swD;
                swE.textContent = data.data[0].swE;
                swF.textContent = data.data[0].swF;
                swG.textContent = data.data[0].swG;
                noyA.textContent = data.data[0].noyA;
                noyB.textContent = data.data[0].noyB;
                noyC.textContent = data.data[0].noyC;
                noyD.textContent = data.data[0].noyD;
                noyE.textContent = data.data[0].noyE;
                noyF.textContent = data.data[0].noyF;
                noyG.textContent = data.data[0].noyG;
                wgA.textContent = data.data[0].wgA;
                wgB.textContent = data.data[0].wgB;
                wgC.textContent = data.data[0].wgC;
                wgD.textContent = data.data[0].wgD;
                wgE.textContent = data.data[0].wgE;
                wgF.textContent = data.data[0].wgF;
                wgG.textContent = data.data[0].wgG;
                rs1A.textContent = data.data[0].rs1A;
                rs1B.textContent = data.data[0].rs1B;
                rs1C.textContent = data.data[0].rs1C;
                rs1D.textContent = data.data[0].rs1D;
                rs1E.textContent = data.data[0].rs1E;
                rs1F.textContent = data.data[0].rs1F;
                rs1G.textContent = data.data[0].rs1G;
                rs2A.textContent = data.data[0].rs2A;
                rs2B.textContent = data.data[0].rs2B;
                rs2C.textContent = data.data[0].rs2C;
                rs2D.textContent = data.data[0].rs2D;
                rs2E.textContent = data.data[0].rs2E;
                rs2F.textContent = data.data[0].rs2F;
                rs2G.textContent = data.data[0].rs2G;
                rs3A.textContent = data.data[0].rs3A;
                rs3B.textContent = data.data[0].rs3B;
                rs3C.textContent = data.data[0].rs3C;
                rs3D.textContent = data.data[0].rs3D;
                rs3E.textContent = data.data[0].rs3E;
                rs3F.textContent = data.data[0].rs3F;
                rs3G.textContent = data.data[0].rs3G;
                strA.textContent = data.data[0].strA;
                strB.textContent = data.data[0].strB;
                strC.textContent = data.data[0].strC;
                strD.textContent = data.data[0].strD;
                strE.textContent = data.data[0].strE;
                strF.textContent = data.data[0].strF;
                strG.textContent = data.data[0].strG;
                rA.textContent = data.data[0].rA;
                rB.textContent = data.data[0].rB;
                rC.textContent = data.data[0].rC;
                rD.textContent = data.data[0].rD;
                rE.textContent = data.data[0].rE;
                rF.textContent = data.data[0].rF;
                rG.textContent = data.data[0].rG;
                uotA.textContent = data.data[0].uotA;
                uotB.textContent = data.data[0].uotB;
                uotC.textContent = data.data[0].uotC;
                uotD.textContent = data.data[0].uotD;
                uotE.textContent = data.data[0].uotE;
                uotF.textContent = data.data[0].uotF;
                uotG.textContent = data.data[0].uotG;
                lotA.textContent = data.data[0].lotA;
                lotB.textContent = data.data[0].lotB;
                lotC.textContent = data.data[0].lotC;
                lotD.textContent = data.data[0].lotD;
                lotE.textContent = data.data[0].lotE;
                lotF.textContent = data.data[0].lotF;
                lotG.textContent = data.data[0].lotG;
                at1A.textContent = data.data[0].at1A;
                at1B.textContent = data.data[0].at1B;
                at1C.textContent = data.data[0].at1C;
                at1D.textContent = data.data[0].at1D;
                at1E.textContent = data.data[0].at1E;
                at1F.textContent = data.data[0].at1F;
                at1G.textContent = data.data[0].at1G;
                at2A.textContent = data.data[0].at2A;
                at2B.textContent = data.data[0].at2B;
                at2C.textContent = data.data[0].at2C;
                at2D.textContent = data.data[0].at2D;
                at2E.textContent = data.data[0].at2E;
                at2F.textContent = data.data[0].at2F;
                at2G.textContent = data.data[0].at2G;
                at3A.textContent = data.data[0].at3A;
                at3B.textContent = data.data[0].at3B;
                at3C.textContent = data.data[0].at3C;
                at3D.textContent = data.data[0].at3D;
                at3E.textContent = data.data[0].at3E;
                at3F.textContent = data.data[0].at3F;
                at3G.textContent = data.data[0].at3G;
                if (data.data[0].time1) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].time1);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].time1.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("time1").textContent = jamMenit;
                }
                remark1.textContent = data.data[0].remark1;
                if (data.data[0].time2) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].time2);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].time2.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("time2").textContent = jamMenit;
                }
                remark2.textContent = data.data[0].remark2;
                if (data.data[0].time3) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].time3);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].time3.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("time3").textContent = jamMenit;
                }
                remark3.textContent = data.data[0].remark3;
                if (data.data[0].time4) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].time4);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].time4.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("time4").textContent = jamMenit;
                }
                remark4.textContent = data.data[0].remark4;
                if (data.data[0].time5) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].time5);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].time5.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("time5").textContent = jamMenit;
                }
                remark5.textContent = data.data[0].remark5;
                if (data.data[0].time6) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].time6);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].time6.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("time6").textContent = jamMenit;
                }
                remark6.textContent = data.data[0].remark6;
                kwhM1.textContent = data.data[0].kwhM1;
                kwhM2.textContent = data.data[0].kwhM2;
                if (data.data[0].jamProd) {
                    let jamMenit = "";
                    const date = new Date(data.data[0].jamProd);
                    if (!isNaN(date)) {
                        const jam = String(date.getHours()).padStart(2, "0");
                        const menit = String(date.getMinutes()).padStart(2, "0");
                        jamMenit = `${jam}:${menit}`;
                    } else {
                        const match = data.data[0].jamProd.match(/(\d{2}):(\d{2})/);
                        if (match) jamMenit = `${match[1]}:${match[2]}`;
                    }
                    if (jamMenit) document.getElementById("jamProd").textContent = jamMenit;
                }
                ppA.textContent = data.data[0].ppA;
                ppB.textContent = data.data[0].ppB;
                ppC.textContent = data.data[0].ppC;
                ppD.textContent = data.data[0].ppD;
                cacA.textContent = data.data[0].cacA;
                cacB.textContent = data.data[0].cacB;
                cacC.textContent = data.data[0].cacC;
                cacD.textContent = data.data[0].cacD;
                cacE.textContent = data.data[0].cacE;
                cacF.textContent = data.data[0].cacF;
                mbA.textContent = data.data[0].mbA;
                mbB.textContent = data.data[0].mbB;
                mbC.textContent = data.data[0].mbC;
                mbD.textContent = data.data[0].mbD;
                mbE.textContent = data.data[0].mbE;
                mbF.textContent = data.data[0].mbF;
                uvA.textContent = data.data[0].uvA;
                uvB.textContent = data.data[0].uvB;
                uvC.textContent = data.data[0].uvC;
                uvD.textContent = data.data[0].uvD;
                uvE.textContent = data.data[0].uvE;
                uvF.textContent = data.data[0].uvF;
                asbA.textContent = data.data[0].asbA;
                asbB.textContent = data.data[0].asbB;
                asbC.textContent = data.data[0].asbC;
                asbD.textContent = data.data[0].asbD;
                asbE.textContent = data.data[0].asbE;
                asbF.textContent = data.data[0].asbF;
                llA.textContent = data.data[0].llA;
                llB.textContent = data.data[0].llB;
                llC.textContent = data.data[0].llC;
                llD.textContent = data.data[0].llD;
                llF.textContent = data.data[0].llF;
                bhn1A.textContent = data.data[0].bhn1A;
                bhn1B.textContent = data.data[0].bhn1B;
                bhn1C.textContent = data.data[0].bhn1C;
                bhn1D.textContent = data.data[0].bhn1D;
                bhn1E.textContent = data.data[0].bhn1E;
                bhn1F.textContent = data.data[0].bhn1F;
                bhn2A.textContent = data.data[0].bhn2A;
                bhn2B.textContent = data.data[0].bhn2B;
                bhn2C.textContent = data.data[0].bhn2C;
                bhn2D.textContent = data.data[0].bhn2D;
                bhn2E.textContent = data.data[0].bhn2E;
                bhn2F.textContent = data.data[0].bhn2F;
                mbAT.textContent = data.data[0].mbAT;
                uvAT.textContent = data.data[0].uvAT;
                asbAT.textContent = data.data[0].asbAT;
                llAT.textContent = data.data[0].llAT;
                bngM.textContent = data.data[0].bngM;
                prongM.textContent = data.data[0].prongM;
                silM.textContent = data.data[0].silM;
                bngL.textContent = data.data[0].bngL;
                prongL.textContent = data.data[0].prongL;
                silL.textContent = data.data[0].silL;
                bngMe.textContent = data.data[0].bngMe;
                prongMe.textContent = data.data[0].prongMe;
                silMe.textContent = data.data[0].silMe;
                bngGB.textContent = data.data[0].bngGB;
                prongGB.textContent = data.data[0].prongGB;
                silGB.textContent = data.data[0].silGB;
                bngLL.textContent = data.data[0].bngLL;
                prongLL.textContent = data.data[0].prongLL;
                silLL.textContent = data.data[0].silLL;
                total.textContent = data.data[0].total;
                keterangan.innerHTML = data.data[0].keterangan ? data.data[0].keterangan.replace(/\n/g, "<br>") : "";
                $("#modalLaporan").modal("show");
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
        // let modal = new bootstrap.Modal(
        //     document.getElementById("modalLaporan"),
        // );
        // modal.show();

        // });
    });
});