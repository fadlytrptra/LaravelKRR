jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tanggal = document.getElementById("tanggal");
    let jam_muat_awal = document.getElementById("jam_muat_awal");
    let jam_muat_akhir = document.getElementById("jam_muat_akhir");
    let sopir = document.getElementById("sopir");
    let keterangan = document.getElementById("keterangan");
    let tujuan_kirim = document.getElementById("tujuan_kirim");
    let foto_pengiriman = document.getElementById("foto_pengiriman");
    let btn_clearPhotos = document.getElementById("btn_clearPhotos");
    let preview_fotoPengiriman = document.getElementById("preview_fotoPengiriman"); //prettier-ignore
    let checkbox_customer = document.getElementById("checkbox_customer");
    let ttd_base64 = document.getElementById("ttd_base64");
    let ttd_preview = document.getElementById("ttd_preview");
    let jam_barang = document.getElementById("jam_barang");
    let div_noSeal = document.getElementById("div_noSeal");
    let noSeal = document.getElementById("noSeal");
    let div_noContainer = document.getElementById("div_noContainer");
    let noContainer = document.getElementById("noContainer");
    let div_suratJalan = document.getElementById("div_suratJalan");
    let btn_addSJ = document.getElementById("btn_addSJ");
    let btn_clearSJ = document.getElementById("btn_clearSJ");
    let div_btnSJ = document.getElementById("div_btnSJ");
    let div_SuratJalanTerdaftar = document.getElementById("div_SuratJalanTerdaftar"); //prettier-ignore
    let surat_jalanTerdaftar = document.getElementById("surat_jalanTerdaftar");
    let item = document.getElementById("item");
    let label_tanggalKeluar = document.getElementById("label_tanggalKeluar");
    let tanggal_keluar = document.getElementById("tanggal_keluar");
    let btn_add = document.getElementById("btn_add");
    let btn_update = document.getElementById("btn_update");
    let btn_delete = document.getElementById("btn_delete");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let labelRedisplay = document.getElementById("labelRedisplay");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");
    let ttdModal = document.getElementById("ttdModal");
    let imageModal = document.getElementById("imageModal");
    let modalImagePreview = document.getElementById("modalImagePreview");
    let ttdCanvas = document.getElementById("ttdCanvas");
    let btn_clearTTD = document.getElementById("btn_clearTTD");
    let table_atas = $("#table_atas").DataTable({
        columnDefs: [{ targets: [1, 5], visible: false }],
        // headerCallback: function (thead, data, start, end, display) {
        //     $(thead).find("th")
        //         .css("font-family", "Arial")
        //         .css("font-size", "14px")
        //         .css("text-align", "center");
        // },
        paging: false,
        scrollY: "150px",
        scrollX: "150px",
        scrollCollapse: true,
    });

    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        scrollX: "300px",
        scrollCollapse: true,
    });

    const slcSatuan = $("#satuan");
    const slcNopol = $("#nopol");
    const slcInstansi = $("#instansi");
    const slcTypeBarang = $("#type_barang");
    const slcSuratJalan = $("#surat_jalan");
    tanggal.valueAsDate = new Date();
    tgl_awal.valueAsDate = new Date();
    // tgl_awal.valueAsDate = new Date(2025, 11, 25);
    tgl_akhir.valueAsDate = new Date();
    label_tanggalKeluar.style.display = "none";
    tanggal_keluar.style.display = "none";
    // btn_redisplay.focus();

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
        jamStr = jamStr.replace(".", ":");

        // Jika belum ada menit, tambahkan :00
        if (!jamStr.includes(":")) {
            jamStr += ":00";
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

    function formatAngka(val) {
        if (val === "" || val === null || isNaN(val)) return "";

        let num = parseFloat(val);

        // 10.00 → 10
        if (Number.isInteger(num)) return numeral(num).format("0");

        // **Jika angka punya lebih dari 1 decimal yang bukan .x0 atau .75 → tampilkan apa adanya**
        let decimal = num.toString().split(".")[1] || "";
        if (decimal.length > 1 && decimal !== "75" && decimal !== "70") {
            return numeral(num).format("0.00"); // contoh: 10.23 → 10.23
        }

        // 10.75 → 10.75
        if (decimal === "75") return numeral(num).format("0.00");

        // 10.70 → 10.7
        return numeral(num).format("0.[0]");
    }

    const validRegions = [
        "A", "AA", "AB", "AD", "AE", "AG", "B", "BA", "BB", "BD",
        "BE", "BG", "BH", "BK", "BL", "BM", "BN", "BP", "BR", "BT",
        "D", "DA", "DB", "DC", "DD", "DE", "DG", "DH", "DK", "DL",
        "DM", "DN", "DP", "DR", "DT", "DW", "E", "EA", "EB", "ED",
        "F", "G", "H", "K", "KB", "KH", "KT", "KU", "L", "M",
        "N", "P", "PA", "PB", "PG", "PS", "PT", "PY", "R", "S",
        "T", "W", "Z"
    ]; //prettier-ignore

    function isValidPlat(nopol) {
        const formatRegex = /^([A-Z]{1,2}) \d{1,4} [A-Z]{1,3}$/;
        const match = nopol.match(formatRegex);
        console.log(match);

        if (!match) return false;

        const region = match[1];
        console.log(validRegions.includes(region));

        return validRegions.includes(region);
    }

    function initPrint(data, customer) {
        console.log(data, customer);

        if (customer) {
            document.getElementById("customer_tanggalMuatP").innerHTML =
                data.header.tanggal;
            document.getElementById("customer_nopolP").innerHTML =
                data.header.nopol;
            document.getElementById("customer_jamMuatP").innerHTML =
                data.header.jam_muat;
            document.getElementById("customer_instansiP").innerHTML =
                data.header.instansi;
            document.getElementById("customer_tujuanKirim").innerHTML =
                data.header.tujuan_kirim;
            if (data.header.no_seal || data.header.no_container) {
                document.getElementById("customer_sealContainer").innerHTML =
                    data.header.no_seal + " / " + data.header.no_container;
            } else {
                document.getElementById("customer_sealContainer").innerHTML =
                    "";
            }
            document.getElementById("customer_suratJalan").innerHTML =
                data.header.surat_jalanTerdaftar;
            // ==============================
            // HITUNG TOTAL BERDASARKAN SATUAN
            // ==============================
            let totalPerGroup = {};
            let lastIndexPerGroup = {};

            // ===============================
            // HITUNG TOTAL PER GROUP
            // ===============================
            data.detail.forEach((item, index) => {
                let type = item.nama_typeBarang ?? "";
                let satuan = item.Nama_satuan ?? "";

                let key = `${type}__${satuan}`;

                // total per group
                if (!totalPerGroup[key]) {
                    totalPerGroup[key] = 0;
                }
                totalPerGroup[key] += Number(item.item) || 0;

                // simpan index terakhir group
                lastIndexPerGroup[key] = index;
            });

            // ===============================
            // RENDER TABLE
            // ===============================
            let tbodyHTML = "";

            data.detail.forEach((item, index) => {
                let type = item.nama_typeBarang ?? "";
                let tujuanKirim = item.tujuan_kirim ?? "";
                let satuan = item.Nama_satuan ?? "";
                let key = `${type}__${satuan}`;

                let totalGroup = totalPerGroup[key] ?? 0;

                // tampilkan total hanya di row terakhir group
                let totalHTML = "";
                if (lastIndexPerGroup[key] === index) {
                    totalHTML = `<strong>${formatAngka(totalGroup)}&nbsp;${satuan}</strong>`;
                }

                tbodyHTML += `
                        <tr>
                            <td class="center" style="width:5%;">
                                ${index + 1}
                            </td>
                            <td class="center" style="width:27.5%;">
                                ${type}
                            </td>
                            <td class="center" style="width:10%;">
                                ${ambilJam(item.jam) ?? ""}
                            </td>
                            <td class="center" style="width:27.5%;">
                                ${tujuanKirim}
                            </td>
                            <td class="center" style="width:15%;">
                                ${formatAngka(item.item) ?? ""}&nbsp;${satuan}
                            </td>
                            <td class="center" style="width:15%;">
                                ${totalHTML}
                            </td>
                        </tr>
                    `;
            });
            // ===============================
            // INJECT KE TABLE
            // ===============================
            document.querySelector("#customer_modalItemTable tbody").innerHTML =
                tbodyHTML;
            document.getElementById("customer_kolomKeterangan").innerHTML =
                data.header.keterangan;
            // window.print();
            if (data.header.ttd_base64 && data.header.ttd_base64 !== "") {
                let ttd = data.header.ttd_base64;

                // pastikan ada prefix base64
                if (!ttd.startsWith("data:image")) {
                    ttd = "data:image/png;base64," + ttd;
                }

                /* ====== TAMPIL KE IMG ====== */
                $("#customer_ttd_sopir").attr("src", ttd).show();
            } else {
                $("#customer_ttd_sopir").attr("src", "").show();
            }

            if (
                data.header.customer == 0 &&
                data.header.user_koreksi !== "" &&
                data.header.user_input !== data.header.user_koreksi
            ) {
                if (data.header.FotoTtdK && data.header.FotoTtdK !== "") {
                    let ttd = data.header.FotoTtdK;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    $("#customer_ttd_satpam2").attr("src", ttd).show();
                } else {
                    $("#customer_ttd_satpam2").attr("src", "").show();
                }
                document.getElementById("customer_ttnSatpam2").innerHTML =
                    "Tanda Tangan & Nama Jelas";
                document.getElementById("customer_spm").innerHTML = "Satpam";
                document.getElementById("customer_namaSatpamP2").innerHTML =
                    data.header.NamaUserK;
            } else {
                document.getElementById("customer_ttnSatpam2").innerHTML = "";
                document.getElementById("customer_spm").innerHTML = "";
                document.getElementById("customer_namaSatpamP2").innerHTML = "";
                $("#customer_ttd_satpam2").attr("src", "").show();
            }

            if (data.ttd.FotoTtd && data.ttd.FotoTtd !== "") {
                let ttd = data.ttd.FotoTtd;

                // pastikan ada prefix base64
                if (!ttd.startsWith("data:image")) {
                    ttd = "data:image/png;base64," + ttd;
                }

                /* ====== TAMPIL KE IMG ====== */
                $("#customer_ttd_satpam").attr("src", ttd).show();
            } else {
                $("#customer_ttd_satpam").attr("src", "").show();
            }

            if (data.header.NamaUser && data.header.NamaUser.trim() !== "") {
                if (data.header.fotoTtdAcc && data.header.fotoTtdAcc !== "") {
                    let ttd = data.header.fotoTtdAcc;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    $("#customer_ttd_gudang").attr("src", ttd).show();
                } else {
                    $("#customer_ttd_gudang").attr("src", "").show();
                }
                document.getElementById("customer_ttnGudang").innerHTML =
                    "Tanda Tangan & Nama Jelas";
                document.getElementById("customer_gdg").innerHTML =
                    "Mengetahui";
                document.getElementById("customer_namaGudangP").innerHTML =
                    data.header.NamaUser;
            } else {
                document.getElementById("customer_ttnGudang").innerHTML = "";
                document.getElementById("customer_gdg").innerHTML = "";
                document.getElementById("customer_namaGudangP").innerHTML = "";
                $("#customer_ttd_gudang").attr("src", "").show();
            }

            document.getElementById("customer_namaSatpamP").innerHTML =
                data.ttd.NamaUser;
            document.getElementById("customer_namaSopirP").innerHTML =
                data.header.sopir;

            /* ====== TAMPIL FOTO PENGIRIMAN ====== */
            let arrayFotoPengiriman = [];
            const container = document.getElementById(
                "foto_pengirimanContainerCustomer",
            );

            if (
                data.header.foto_pengiriman &&
                data.header.foto_pengiriman !== "" &&
                data.header.foto_pengiriman !== "null"
            ) {
                arrayFotoPengiriman = data.header.foto_pengiriman.split(", ");
                container.innerHTML = "";

                arrayFotoPengiriman.forEach((src) => {
                    container.innerHTML += `
                        <img src="${src}">
                    `;
                });
            } else {
                container.innerHTML = "";
            }
        } else {
            document.getElementById("tujuanKirimP").innerHTML =
                data.header.tujuan_kirim;
            document.getElementById("tanggalMuatP").innerHTML =
                data.header.tanggal;
            document.getElementById("nopolP").innerHTML = data.header.nopol;
            document.getElementById("jamMuatP").innerHTML =
                data.header.jam_muat;
            document.getElementById("instansiP").innerHTML =
                data.header.instansi;

            // ==============================
            // HITUNG TOTAL BERDASARKAN SATUAN
            // ==============================
            let totalPerGroup = {};
            let lastIndexPerGroup = {};

            // ===============================
            // HITUNG TOTAL PER GROUP
            // ===============================
            data.detail.forEach((item, index) => {
                let type = item.nama_typeBarang ?? "";
                let satuan = item.Nama_satuan ?? "";

                let key = `${type}__${satuan}`;

                // total per group
                if (!totalPerGroup[key]) {
                    totalPerGroup[key] = 0;
                }
                totalPerGroup[key] += Number(item.item) || 0;

                // simpan index terakhir group
                lastIndexPerGroup[key] = index;
            });

            // ===============================
            // RENDER TABLE
            // ===============================
            let tbodyHTML = "";

            data.detail.forEach((item, index) => {
                let type = item.nama_typeBarang ?? "";
                let satuan = item.Nama_satuan ?? "";
                let key = `${type}__${satuan}`;

                let totalGroup = totalPerGroup[key] ?? 0;

                // tampilkan total hanya di row terakhir group
                let totalHTML = "";
                if (lastIndexPerGroup[key] === index) {
                    totalHTML = `<strong>${formatAngka(totalGroup)}&nbsp;${satuan}</strong>`;
                }

                tbodyHTML += `
                        <tr>
                            <td class="center" style="width:10%;">
                                ${index + 1}
                            </td>
                            <td class="center" style="width:30%;">
                                ${type}
                            </td>
                            <td class="center" style="width:15%;">
                                ${ambilJam(item.jam) ?? ""}
                            </td>
                            <td class="center" style="width:30%;">
                                ${formatAngka(item.item) ?? ""}&nbsp;${satuan}
                            </td>
                            <td class="center" style="width:15%;">
                                ${totalHTML}
                            </td>
                        </tr>
                    `;
            });

            // ===============================
            // INJECT KE TABLE
            // ===============================
            document.querySelector("#modalItemTable tbody").innerHTML =
                tbodyHTML;
            document.getElementById("kolomKeterangan").innerHTML =
                data.header.keterangan;
            // window.print();

            if (data.header.ttd_base64 && data.header.ttd_base64 !== "") {
                let ttd = data.header.ttd_base64;

                // pastikan ada prefix base64
                if (!ttd.startsWith("data:image")) {
                    ttd = "data:image/png;base64," + ttd;
                }

                /* ====== TAMPIL KE IMG ====== */
                $("#ttd_sopir").attr("src", ttd).show();
            } else {
                $("#ttd_sopir").attr("src", "").show();
            }

            if (
                data.header.customer == 0 &&
                data.header.user_koreksi !== "" &&
                data.header.user_input !== data.header.user_koreksi
            ) {
                if (data.header.FotoTtdK && data.header.FotoTtdK !== "") {
                    let ttd = data.header.FotoTtdK;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    $("#ttd_satpam2").attr("src", ttd).show();
                } else {
                    $("#ttd_satpam2").attr("src", "").show();
                }
                document.getElementById("ttnSatpam2").innerHTML =
                    "Tanda Tangan & Nama Jelas";
                document.getElementById("spm").innerHTML = "Satpam";
                document.getElementById("namaSatpamP2").innerHTML =
                    data.header.NamaUserK;
            } else {
                // document.getElementById("ttnSatpam2").style.visibility = "hidden";
                // document.getElementById("spm").style.visibility = "hidden";
                // document.getElementById("namaSatpamP2").style.visibility = "hidden";
                document.getElementById("ttnSatpam2").innerHTML = "";
                document.getElementById("spm").innerHTML = "";
                document.getElementById("namaSatpamP2").innerHTML = "";
                $("#ttd_satpam2").attr("src", "").show();
            }

            if (data.ttd.FotoTtd && data.ttd.FotoTtd !== "") {
                let ttd = data.ttd.FotoTtd;

                // pastikan ada prefix base64
                if (!ttd.startsWith("data:image")) {
                    ttd = "data:image/png;base64," + ttd;
                }

                /* ====== TAMPIL KE IMG ====== */
                $("#ttd_satpam").attr("src", ttd).show();
            } else {
                $("#ttd_satpam").attr("src", "").show();
            }

            if (data.header.NamaUser && data.header.NamaUser.trim() !== "") {
                if (data.header.fotoTtdAcc && data.header.fotoTtdAcc !== "") {
                    let ttd = data.header.fotoTtdAcc;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    /* ====== TAMPIL KE IMG ====== */
                    $("#ttd_gudang").attr("src", ttd).show();
                } else {
                    $("#ttd_gudang").attr("src", "").show();
                }
                document.getElementById("ttnGudang").innerHTML =
                    "Tanda Tangan & Nama Jelas";
                document.getElementById("gdg").innerHTML = "Mengetahui";
                document.getElementById("namaGudangP").innerHTML =
                    data.header.NamaUser;
            } else {
                // document.getElementById("ttnGudang").style.visibility = "hidden";
                // document.getElementById("gdg").style.visibility = "hidden";
                // document.getElementById("namaGudangP").style.visibility = "hidden";
                document.getElementById("ttnGudang").innerHTML = "";
                document.getElementById("gdg").innerHTML = "";
                document.getElementById("namaGudangP").innerHTML = "";
                $("#ttd_gudang").attr("src", "").show();
            }

            document.getElementById("namaSatpamP").innerHTML =
                data.ttd.NamaUser;
            document.getElementById("namaSopirP").innerHTML = data.header.sopir;

            /* ====== TAMPIL FOTO PENGIRIMAN ====== */
            let arrayFotoPengiriman = [];
            const container = document.getElementById(
                "foto_pengirimanContainer",
            );

            if (
                data.header.foto_pengiriman &&
                data.header.foto_pengiriman !== "" &&
                data.header.foto_pengiriman !== "null"
            ) {
                arrayFotoPengiriman = data.header.foto_pengiriman.split(", ");
                container.innerHTML = "";

                arrayFotoPengiriman.forEach((src) => {
                    container.innerHTML += `
                        <img src="${src}">
                    `;
                });
            } else {
                container.innerHTML = "";
            }
        }
    }
    //#endregion

    //#region Select2
    slcNopol.select2({
        placeholder: "-- Pilih Nopol --",
        allowClear: true,
        width: "100%",
    });

    slcNopol.on("select2:open", function () {
        let searchField = document.querySelector(
            ".select2-container--open .select2-search__field",
        );

        $(searchField)
            .off("keydown.nopol")
            .on("keydown.nopol", function (e) {
                if (e.key === "Enter") {
                    if ($(this).val().trim() !== "") {
                        e.preventDefault();
                        let nomorPlat = $(this).val().trim().toUpperCase();

                        if (!isValidPlat(nomorPlat)) {
                            Swal.fire({
                                icon: "warning",
                                title: "Format nomor polisi tidak valid",
                                text: "Contoh format yang benar: W 1234 ABC",
                            });
                            return;
                        }

                        // prevent duplicate
                        if (
                            $("#nopol option[value='" + nomorPlat + "']").length
                        ) {
                            slcNopol.val(nomorPlat).trigger("change");
                            slcNopol.select2("close");
                            return;
                        }

                        slcNopol.append(
                            new Option(nomorPlat, nomorPlat, true, true),
                        );
                        slcNopol.trigger("change");
                        slcNopol.select2("close");
                        jam_muat_awal.focus();
                    }
                }
            });
    });

    slcInstansi.select2({
        placeholder: "-- Pilih Instansi --",
        allowClear: true,
        width: "100%",
    });

    slcInstansi.on("select2:open", function () {
        let searchField = document.querySelector(
            ".select2-container--open .select2-search__field",
        );

        $(searchField)
            .off("keydown.instansi")
            .on("keydown.instansi", function (e) {
                if (e.key === "Enter") {
                    if ($(this).val().trim() !== "") {
                        e.preventDefault();
                        let newInstansi = $(this).val().trim().toUpperCase();
                        slcInstansi.append(
                            new Option(newInstansi, newInstansi, true, true),
                        );
                        slcInstansi.trigger("change");
                        slcInstansi.select2("close");
                    }
                }
            });
    });

    slcSuratJalan.select2({
        placeholder: "-- Pilih Surat Jalan --",
    });
    slcSuratJalan.each(function () {
        $(this).next(".select2-container").css({
            flex: "1 1 auto",
            width: "100%",
        });
    });
    slcSuratJalan.on("select2:open", function () {
        let searchField = document.querySelector(
            ".select2-container--open .select2-search__field",
        );

        $(searchField)
            .off("keydown.surat_jalan")
            .on("keydown.surat_jalan", function (e) {
                if (e.key === "Enter") {
                    if ($(this).val().trim() !== "") {
                        e.preventDefault();

                        let newSuratJalan = $(this)
                            .val()
                            .trim()
                            .padStart(10, "0");
                        slcSuratJalan.append(
                            new Option(
                                newSuratJalan,
                                newSuratJalan,
                                true,
                                true,
                            ),
                        );
                        slcSuratJalan.trigger("change");
                        slcSuratJalan.select2("close");
                        // Swal.fire({
                        //     icon: "warning",
                        //     title: "Warning!",
                        //     text: "Tidak diperbolehkan menambahkan surat jalan baru",
                        //     showConfirmButton: true,
                        // });
                    }
                }
            });
    });

    btn_addSJ.addEventListener("click", function () {
        let selected = slcSuratJalan.val();
        if (!selected) return;

        let existing = surat_jalanTerdaftar.value
            ? surat_jalanTerdaftar.value.split(",").map((v) => v.trim())
            : [];

        // check if already exists
        if (!existing.includes(selected)) {
            if (existing.length === 0) {
                surat_jalanTerdaftar.value = selected;
            } else {
                surat_jalanTerdaftar.value += ", " + selected;
            }
        }
        slcSuratJalan.val(null).trigger("change");
    });

    btn_clearSJ.addEventListener("click", function () {
        surat_jalanTerdaftar.value = "";
    });

    let nama_typeBarang = null;
    slcTypeBarang.select2({
        placeholder: "-- Pilih Type Barang --",
        allowClear: true,
    });
    slcTypeBarang.on("change", function () {
        let text = $(this).find(":selected").text();

        if (!text || text.indexOf("|") === -1) {
            nama_typeBarang = null;
            return;
        }

        nama_typeBarang = text.split("|")[1].trim();
    });

    let nama_satuan = null;
    slcSatuan.select2({
        placeholder: "-- Pilih Satuan --",
        allowClear: true,
    });
    slcSatuan.each(function () {
        $(this).next(".select2-container").css({
            flex: "1 1 auto",
            width: "100%",
        });
    });
    slcSatuan.on("change", function () {
        let text = $(this).find(":selected").text();

        if (!text || text.indexOf("|") === -1) {
            nama_satuan = null;
            return;
        }

        nama_satuan = text.split("|")[1].trim();
    });

    //#region Event Listener
    sopir.addEventListener("input", function () {
        this.value = this.value.toUpperCase();
    });

    async function compressImage(file, maxSizeKB = 500) {
        return new Promise((resolve, reject) => {
            if (!file.type.startsWith("image/")) {
                resolve(file);
                return;
            }

            const img = new Image();
            const reader = new FileReader();

            reader.onload = function (e) {
                img.src = e.target.result;
            };

            img.onload = function () {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                let width = img.width;
                let height = img.height;

                const maxDimension = 1920;

                if (width > height && width > maxDimension) {
                    height *= maxDimension / width;
                    width = maxDimension;
                } else if (height > maxDimension) {
                    width *= maxDimension / height;
                    height = maxDimension;
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                let quality = 0.9;

                function compress() {
                    canvas.toBlob(
                        function (blob) {
                            if (!blob) {
                                reject("Gagal mengompres gambar");
                                return;
                            }

                            // Jika sudah <= target atau kualitas sudah terlalu rendah
                            if (
                                blob.size <= maxSizeKB * 1024 ||
                                quality <= 0.1
                            ) {
                                const compressedFile = new File(
                                    [blob],
                                    file.name,
                                    {
                                        type: "image/jpeg",
                                        lastModified: Date.now(),
                                    }
                                );
                                resolve(compressedFile);
                            } else {
                                quality -= 0.05;
                                compress();
                            }
                        },
                        "image/jpeg",
                        quality
                    );
                }

                compress();
            };

            img.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    let selectedFiles = [];
    foto_pengiriman.addEventListener("change", async function () {
        $("#loading-screen").css("display", "flex");

        for (const file of this.files) {
            let finalFile = file;

            // Kompres jika > 500 KB
            if (file.size > 500 * 1024) {
                finalFile = await compressImage(file, 500);
            }

            selectedFiles.push(finalFile);
        }

        let currentTotalSize = selectedFiles.reduce(
            (sum, file) => sum + file.size,
            0
        );

        const maxTotalSize = 50 * 1024 * 1024;

        if (currentTotalSize > maxTotalSize) {
            document.getElementById("error-message").textContent =
                "Total ukuran file tidak boleh melebihi 50 MB.";

            this.value = "";
            $("#loading-screen").hide();
            return;
        }

        document.getElementById("error-message").textContent = "";

        await renderPreview();

        $("#loading-screen").hide();
    });

    function renderPreview() {
        return new Promise((resolve) => {
            preview_fotoPengiriman.innerHTML = "";

            selectedFiles.forEach((file, index) => {
                const imageContainer = document.createElement("div");
                imageContainer.className = "image-container";

                const img = document.createElement("img");
                const imageUrl = URL.createObjectURL(file);
                img.src = imageUrl;

                // open modal
                img.addEventListener("click", function () {
                    const imageModal = new bootstrap.Modal(
                        document.getElementById("imageModal"),
                    );
                    imageModal.show();

                    modalImagePreview.src = imageUrl;
                    modalImagePreview.style.width = "100%";
                });

                // delete button
                const deleteBtn = document.createElement("button");
                deleteBtn.className = "delete-btn";
                deleteBtn.innerHTML = "✕";

                deleteBtn.addEventListener("click", function () {
                    selectedFiles.splice(index, 1);

                    renderPreview();
                });

                imageContainer.appendChild(img);
                imageContainer.appendChild(deleteBtn);

                preview_fotoPengiriman.appendChild(imageContainer);
            });

            // update input file
            const dataTransfer = new DataTransfer();
            selectedFiles.forEach((file) => {
                dataTransfer.items.add(file);
            });
            foto_pengiriman.files = dataTransfer.files;
            requestAnimationFrame(() => {
                resolve();
            });
        });
    }

    btn_clearPhotos.addEventListener("click", function () {
        selectedFiles = [];
        renderPreview();
    });

    checkbox_customer.addEventListener("change", function (e) {
        if (this.checked) {
            div_suratJalan.style.display = "block";
            div_noSeal.style.display = "block";
            div_noContainer.style.display = "block";
            div_btnSJ.style.display = "block";
            div_SuratJalanTerdaftar.style.display = "block";
            label_tanggalKeluar.style.display = "block";
            tanggal_keluar.style.display = "block";
        } else {
            div_suratJalan.style.display = "none";
            div_noSeal.style.display = "none";
            div_noContainer.style.display = "none";
            div_btnSJ.style.display = "none";
            div_SuratJalanTerdaftar.style.display = "none";
            surat_jalanTerdaftar.value = "";
            noSeal.value = "";
            noContainer.value = "";
            slcSuratJalan.val(null).trigger("change");
            label_tanggalKeluar.style.display = "none";
            tanggal_keluar.style.display = "none";
            tanggal_keluar.value = null;
        }
    });

    let tableData = [];

    btn_add.addEventListener("click", async function (event) {
        event.preventDefault();
        if (slcTypeBarang.val() === "" || slcTypeBarang.val() === null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih tipe barangnya terlebih dahulu!",
                showConfirmButton: true,
                // timer: 2000
            });
            btn_proses.disabled = false;
            return;
        }

        const newRow = {
            id_detail: "",
            kode_tipeBarang: slcTypeBarang.val(),
            nama_typeBarang: nama_typeBarang,
            jam_barang: jam_barang.value,
            item: item.value,
            kode_satuan: slcSatuan.val(),
            nama_satuan: nama_satuan,
        };

        tableData.push(newRow);
        console.log(tableData);

        if ($.fn.DataTable.isDataTable("#table_atas")) {
            var table_atas = $("#table_atas").DataTable();

            table_atas.row
                .add([
                    newRow.id_detail,
                    newRow.kode_tipeBarang,
                    newRow.nama_typeBarang,
                    newRow.jam_barang,
                    newRow.item,
                    newRow.kode_satuan,
                    newRow.nama_satuan,
                    newRow.tujuan_pengirimanText,
                    newRow.tujuan_pengirimanValue,
                ])
                .draw();
        }
    });

    btn_update.addEventListener("click", function (event) {
        event.preventDefault();

        if (!selectedRow) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang ingin diedit terlebih dahulu!",
            });
            return;
        }

        // ambil data row lama
        const oldData = table_atas.row(selectedRow).data();

        if (labelProses.textContent == "Input Data") {
            const updatedRow = [
                "", // id_detail (BARU)
                slcTypeBarang.val(),
                nama_typeBarang,
                jam_barang.value,
                item.value,
                slcSatuan.val(),
                nama_satuan,
            ];

            table_atas.row(selectedRow).data(updatedRow).draw(false);
        } else {
            const updatedRow = [
                oldData[0], // id_detail lama
                slcTypeBarang.val(),
                nama_typeBarang,
                jam_barang.value,
                item.value,
                slcSatuan.val(),
                nama_satuan,
            ];

            table_atas.row(selectedRow).data(updatedRow).draw(false);
        }

        // reset selection
        $(selectedRow).removeClass("selected");
        selectedRow = null;
    });

    btn_delete.addEventListener("click", function (event) {
        event.preventDefault();
        if (!selectedRow) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang ingin dihapus terlebih dahulu!",
            });
            return;
        }
        console.log(labelProses.textContent);

        const oldData = table_atas.row(selectedRow).data();
        if (labelProses.textContent == "Input Data") {
            let table_atas = $("#table_atas").DataTable();

            table_atas.row(selectedRow).remove().draw();

            // Reset selectedRow setelah hapus
            selectedRow = null;
        } else {
            Swal.fire({
                title: "Apakah anda yakin ingin menghapus data detail?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "PemeriksaanBarang",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: 4,
                            idDetail: oldData[0],
                        },
                        success: function (response) {
                            console.log(response);
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    table_atas.row(selectedRow).remove().draw();

                                    // Reset selectedRow setelah hapus
                                    selectedRow = null;
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
                        },
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                }
            });
        }
    });

    let selectedRow = null;
    $("#table_atas tbody").on("click", "tr", function () {
        if (!table_atas.row(this).data()) {
            return;
        }

        // Hapus highlight sebelumnya
        $("#table_atas tbody tr").removeClass("selected");

        // Tambah highlight ke row ini
        $(this).addClass("selected");

        // Simpan reference row DataTable
        selectedRow = this;

        // Ambil data (opsional)
        let data = table_atas.row(this).data();
        console.log(data);

        slcTypeBarang.val(data[1]).trigger("change");
        jam_barang.value = data[3];
        item.value = data[4];
        slcSatuan.val(data[5]).trigger("change");
    });

    btn_clearTTD.addEventListener("click", function (event) {
        event.preventDefault();
        ttd_base64.value = "";
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_proses.disabled = true;
        const allRowsDataAtas = table_atas.rows().data().toArray();
        let jam_muat_awalConvert = null;
        if (jam_muat_awal.value.trim() !== "") {
            jam_muat_awalConvert = convertToSQLDatetime(
                tanggal,
                jam_muat_awal.value,
            );
            if (jam_muat_awalConvert === null) return;
        }
        let jam_muat_akhirConvert = null;
        if (jam_muat_akhir.value.trim() !== "") {
            jam_muat_akhirConvert = convertToSQLDatetime(
                tanggal,
                jam_muat_akhir.value,
            );
            if (jam_muat_akhirConvert === null) return;
        }

        if (
            tanggal.value == "" ||
            jam_muat_awal.value == "" ||
            jam_muat_akhir.value == "" ||
            slcNopol.val() == "" ||
            slcNopol.val() == null
        ) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Tanggal, Nopol dan jam muat tidak boleh kosong!",
                showConfirmButton: true,
                // timer: 2000
            });
            btn_proses.disabled = false;
            return;
        }

        const images = [];
        if (foto_pengiriman.files.length > 0) {
            for (let file of foto_pengiriman.files) {
                images.push(
                    new Promise((resolve) => {
                        const reader = new FileReader();

                        reader.onload = function (e) {
                            resolve(e.target.result);
                        };

                        reader.readAsDataURL(file);
                    }),
                );
            }
        } else {
            for (let img of preview_fotoPengiriman.querySelectorAll("img")) {
                images.push(Promise.resolve(img.src));
            }
        }

        if (images.length === 0) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Foto tally sheet tidak boleh kosong!",
                showConfirmButton: true,
                // timer: 2000
            });
            btn_proses.disabled = false;
            return;
        }

        Promise.all(images).then((fileArray) => {
            $.ajax({
                url: "PemeriksaanBarang",
                dataType: "json",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: labelProses.textContent == "Koreksi Data" ? 2 : 1,
                    tanggal: tanggal.value,
                    nopol: slcNopol.val(),
                    jam_muat_awal: jam_muat_awalConvert,
                    jam_muat_akhir: jam_muat_akhirConvert,
                    instansi: slcInstansi.val(),
                    sopir: sopir.value,
                    keterangan: keterangan.value,
                    tujuan_kirim: tujuan_kirim.value,
                    allRowsDataAtas: allRowsDataAtas,
                    idHeader: idHeader,
                    ttd_base64: ttd_base64.value,
                    customer: checkbox_customer.checked ? 1 : 0,
                    surat_jalanTerdaftar: surat_jalanTerdaftar.value,
                    noSeal: noSeal.value,
                    noContainer: noContainer.value,
                    tanggal_keluar: checkbox_customer.checked
                        ? tanggal_keluar.value?.trim()
                            ? tanggal_keluar.value.replace("T", " ") + ":00"
                            : null
                        : null,
                    fotoPengiriman: fileArray,
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
                            // $("#table_atas").DataTable().ajax.reload();
                            btn_batal.click();
                            btn_redisplay.click();
                            btn_proses.disabled = false;
                            // $("#labelProses").text("Input Data");
                            // $("#btn_proses").text("PROSES");
                            // idDetail = null;
                            // tanggal.valueAsDate = new Date();
                            // $("#" + slcTypeMesin.id).val(null).trigger("change");
                            // slcMesin.val(null).trigger("change");
                            // jam_mati.value = ambilJam(null);
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
    });

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        // if ($("#" + slcTypeKain.id).val() == 1) {
        table_bawah = $("#table_bawah").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "PemeriksaanBarang/getDataDetail",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awal: tgl_awal.value,
                        tgl_akhir: tgl_akhir.value,
                    });
                },
            },
            columns: [
                {
                    data: "idHeader",
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
                { data: "jam_muat" },
                { data: "nopol" },
                { data: "instansi" },
                { data: "sopir" },
                { data: "NamaUser_Input" },
                { data: "NamaUser_Acc" },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row) {
                        // jika sudah ada user acc → sembunyikan tombol
                        if (
                            row.NamaUser_Acc !== null &&
                            row.NamaUser_Acc !== ""
                        ) {
                            return ""; // tidak tampil apa-apa
                        }

                        // jika belum acc → tampilkan tombol
                        return `
                            <button class="btn btn-sm btn-warning btn-koreksi" style="width: 60px;" data-id="${row.idHeader}">
                                <i class="fa fa-edit"></i> Koreksi
                            </button>
                            <button class="btn btn-sm btn-danger btn-delete" style="width: 60px;" data-id="${row.idHeader}">
                                <i class="fa fa-trash"></i> Delete
                            </button>
                        `;
                    },
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).css("font-family", "Arial");
                $(row).css("font-size", "14px");
            },
            headerCallback: function (thead, data, start, end, display) {
                $(thead)
                    .find("th")
                    .css("font-family", "Arial")
                    .css("font-size", "14px")
                    .css("text-align", "center");
            },
            // order: [[1, "asc"]],
            paging: false,
            scrollY: "300px",
            scrollCollapse: true,
        });
    });

    // btn_print.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     window.print();
    // });

    $("#table_bawah").on("click", ".link-idheader", function () {
        const idHeaderLink = $(this).data("id");
        let cekCustomer;
        console.log("ID Header:", idHeaderLink);

        // simpan idHeaderLink (jika diperlukan di modal)
        $("#modalLaporan").data("idheader", idHeaderLink);
        $.ajax({
            url: "PemeriksaanBarang/getPrint",
            type: "GET",
            data: {
                _token: csrfToken,
                idHeaderLink: idHeaderLink,
            },
            success: function (data) {
                console.log(data);
                cekCustomer = data.header.customer == 1 ? true : false;
                initPrint(data, cekCustomer);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        }).then(() => {
            console.log(cekCustomer);
            if (cekCustomer) {
                // buka modal Bootstrap 5
                let modalCustomer = new bootstrap.Modal(
                    document.getElementById("modalLaporanCustomer"),
                );
                modalCustomer.show();
            } else {
                // buka modal Bootstrap 5
                let modal = new bootstrap.Modal(
                    document.getElementById("modalLaporan"),
                );
                modal.show();
            }
        });
    });

    let idHeader = null;
    $("#table_bawah").on("click", ".btn-koreksi", function () {
        const id = $(this).data("id");
        console.log(id);
        idHeader = id;
        $.ajax({
            url: "PemeriksaanBarang/getDataKoreksiHeader",
            type: "GET",
            data: {
                _token: csrfToken,
                idHeader: id,
            },
            success: function (data) {
                console.log(data);
                labelProses.textContent = "Koreksi Data";
                btn_proses.textContent = "Proses Update";
                tanggal.value = data.data[0].tanggal_raw;
                const nopol = data.data[0].nopol;
                // check if option already exists
                if (slcNopol.find("option[value='" + nopol + "']").length) {
                    // option exists → select it
                    slcNopol.val(nopol).trigger("change");
                } else {
                    // option doesn't exist → create new option
                    let newOption = new Option(nopol, nopol, true, true);

                    slcNopol.append(newOption).trigger("change");
                }
                jam_muat_awal.value = ambilJam(data.data[0].jam_muat_awal);
                jam_muat_akhir.value = ambilJam(data.data[0].jam_muat_akhir);
                const instansi = data.data[0].instansi;
                // check if option already exists
                if (
                    slcInstansi.find("option[value='" + instansi + "']").length
                ) {
                    // option exists → select it
                    slcInstansi.val(instansi).trigger("change");
                } else {
                    // option doesn't exist → create new option
                    let newOption = new Option(instansi, instansi, true, true);

                    slcInstansi.append(newOption).trigger("change");
                }
                sopir.value = data.data[0].sopir;
                keterangan.value = data.data[0].keterangan;
                if (data.data[0].customer == 1) {
                    checkbox_customer.checked = true;
                } else {
                    checkbox_customer.checked = false;
                }
                checkbox_customer.dispatchEvent(new Event("change"));
                tanggal_keluar.value = data.data[0].tanggal_keluar;
                surat_jalanTerdaftar.value = data.data[0].surat_jalanTerdaftar;
                noSeal.value = data.data[0].no_seal;
                noContainer.value = data.data[0].no_container;
                tujuan_kirim.value = data.data[0].tujuan_kirim;
                preview_fotoPengiriman.innerHTML = "";
                if (
                    data.data[0].foto_pengiriman !== "" &&
                    data.data[0].foto_pengiriman !== null
                ) {
                    console.log(data.data[0].foto_pengiriman);

                    let fotoPengirimanArray =
                        data.data[0].foto_pengiriman.split(", ");
                    fotoPengirimanArray.forEach((foto) => {
                        const img = document.createElement("img");
                        img.src = foto;
                        img.style.width = "100px";
                        img.style.margin = "5px";

                        preview_fotoPengiriman.appendChild(img);
                    });
                }
                if (data.data[0].ttd_base64 && data.data[0].ttd_base64 !== "") {
                    let ttd = data.data[0].ttd_base64;

                    // pastikan ada prefix base64
                    if (!ttd.startsWith("data:image")) {
                        ttd = "data:image/png;base64," + ttd;
                    }

                    // simpan ke hidden input (buat submit ulang)
                    ttd_base64.value = ttd;

                    /* ====== TAMPIL KE IMG ====== */
                    $("#ttd_preview").attr("src", ttd).show();

                    /* ====== TAMPIL KE CANVAS ====== */
                    const canvas = document.getElementById("ttdCanvas");
                    const ctx = canvas.getContext("2d");

                    // clear canvas dulu
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    const img = new Image();
                    img.onload = function () {
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    };
                    img.src = ttd;
                } else {
                    // tidak ada TTD
                    ttd_base64.value = "";
                    $("#ttd_preview").hide();

                    const canvas = document.getElementById("ttdCanvas");
                    const ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                tanggal.focus();
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
        $.ajax({
            url: "PemeriksaanBarang/getDataKoreksiDetail",
            type: "GET",
            data: {
                _token: csrfToken,
                idHeader: id,
            },
            success: function (data) {
                console.log(data);
                if (!$.fn.DataTable.isDataTable("#table_atas")) {
                    return;
                }

                const table_atas = $("#table_atas").DataTable();

                // clear dulu kalau koreksi
                table_atas.clear();

                data.data.forEach(function (row) {
                    const newRow = {
                        id_detail: row.idDetail,
                        kode_tipeBarang: row.type_barang,
                        nama_typeBarang: row.nama_typeBarang,
                        jam_barang: ambilJam(row.jam),
                        item: formatAngka(row.item),
                        kode_satuan: row.satuan,
                        nama_satuan: row.Nama_satuan,
                        tujuan_pengirimanValue: row.tujuan_kirimValue,
                        tujuan_pengirimanText: row.tujuan_kirimText,
                    };

                    // simpan ke array lokal (kalau kamu pakai tableData)
                    tableData.push(newRow);

                    // add ke DataTable
                    table_atas.row.add([
                        newRow.id_detail,
                        newRow.kode_tipeBarang,
                        newRow.nama_typeBarang,
                        newRow.jam_barang,
                        newRow.item,
                        newRow.kode_satuan,
                        newRow.nama_satuan,
                        newRow.tujuan_pengirimanText,
                        newRow.tujuan_pengirimanValue,
                    ]);
                });

                table_atas.draw();
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    $("#table_bawah").on("click", ".btn-delete", function () {
        const id = $(this).data("id");
        console.log(id);
        idHeader = id;
        Swal.fire({
            title: "Apakah anda yakin ingin menghapus data?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "PemeriksaanBarang",
                    dataType: "json",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 3,
                        idHeader: idHeader,
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

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        labelProses.textContent = "Input Data";
        btn_proses.textContent = "PROSES";
        idDetail = null;
        tanggal.valueAsDate = new Date();
        slcNopol.val(null).trigger("change");
        jam_muat_awal.value = ambilJam(null);
        jam_muat_akhir.value = ambilJam(null);
        tujuan_kirim.value = "";
        foto_pengiriman.value = "";
        preview_fotoPengiriman.innerHTML = "";
        slcInstansi.val(null).trigger("change");
        sopir.value = "";
        keterangan.value = "";
        checkbox_customer.checked = false;
        checkbox_customer.dispatchEvent(new Event("change"));
        slcSuratJalan.val(null).trigger("change");
        surat_jalanTerdaftar.value = "";
        noSeal.value = "";
        noContainer.value = "";
        btn_clearTTD.click();
        slcTypeBarang.val(null).trigger("change");
        jam_barang.value = ambilJam(null);
        item.value = "";
        slcSatuan.val(null).trigger("change");
        if ($.fn.DataTable.isDataTable("#table_atas")) {
            $("#table_atas").DataTable().clear().draw();
        }
        // tidak ada TTD
        ttd_base64.value = "";
        $("#ttd_preview").hide();

        const canvas = document.getElementById("ttdCanvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});
