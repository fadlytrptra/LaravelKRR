jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");
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
    tgl_awal.valueAsDate = new Date();
    // tgl_awal.valueAsDate = new Date(2025, 11, 25);
    tgl_akhir.valueAsDate = new Date();
    const slcLokasi = document.getElementById("lokasi");

    // checkbox_all.addEventListener("change", function () {
    //     const checkboxes = document.querySelectorAll(
    //         '#table_atas input[type="checkbox"][name="penerimaCheckbox"]'
    //     );
    //     checkedRows = [];

    //     checkboxes.forEach(function (checkbox) {
    //         checkbox.checked = checkbox_all.checked;

    //         if (checkbox_all.checked) {
    //             let row = table_atas.row($(checkbox).closest("tr")).data();
    //             checkedRows.push(row);
    //         }
    //     });

    //     console.log(checkedRows);
    // });
    let btn_print = document.getElementById("btn_print");
    btn_print.style.display = "none";

    //#region Function
    $("#" + slcLokasi.id).select2({
        placeholder: "-- Pilih Lokasi --"
    });

    $("#" + slcLokasi.id).on("change", function () {

        const val = $(this).val();
        let allowedType = [];
        switch (val) {
            // case "1":
            //     // Lokasi 1 boleh semua
            //     btn_redisplay.click();
            //     allowedType = ["1", "2"];
            //     // btn_batal.click();
            //     // $("#labelProses").text("Input Data");
            //     // $("#btn_proses").text("PROSES");
            //     break;

            // case "2":
            //     // Lokasi 2 hanya type tertentu
            //     btn_redisplay.click();
            //     allowedType = ["3"];
            //     // btn_batal.click();
            //     // $("#labelProses").text("Input Data");
            //     // $("#btn_proses").text("PROSES");
            //     break;

            // case "3":
            //     // Lokasi 3 hanya type tertentu
            //     btn_redisplay.click();
            //     allowedType = ["4", "5", "6"];
            //     // btn_batal.click();
            //     // $("#labelProses").text("Input Data");
            //     // $("#btn_proses").text("PROSES");
            //     break;
        }
    });

    // default lokasi = 1
    $("#" + slcLokasi.id).val("TPD").trigger("change");

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
                document.getElementById("customer_sealContainer").innerHTML = data.header.no_seal + " / " + data.header.no_container; //prettier-ignore
            } else {
                document.getElementById("customer_sealContainer").innerHTML = ""; //prettier-ignore
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

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        // if ($("#" + slcTypeKain.id).val() == 1) {
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "ViewPemeriksaanBarang/getData",
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
                { data: "idHeader" },
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
                { data: "tujuan_kirim" },
                { data: "sopir" },
                { data: "NamaUser" },
                { data: "NamaUserACC" },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row) {
                        return `
                    <button class="btn btn-sm btn-primary btn-view" style="width: 60px;"data-id="${row.idHeader}">
                        <i class="fa fa-edit"></i> View
                    </button>
                    <button
                        class="btn btn-sm btn-danger btn-download" data-id="${row.idHeader}">
                        <i class="fa fa-file-pdf"></i> Download
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

    let idHeader = null;
    $("#table_atas").on("click", ".btn-view", function () {
        const idHeaderLink = $(this).data("id");
        var cekCustomer;
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
                console.log(cekCustomer);

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

    $("#table_atas").on("click", ".btn-download", function () {
        const idHeader = $(this).data("id");

        window.open(
            `PemeriksaanBarang/download/${idHeader}`,
            "_blank"
        );

    });
});
