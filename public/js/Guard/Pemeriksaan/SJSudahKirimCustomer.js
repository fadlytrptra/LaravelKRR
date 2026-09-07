$(document).ready(function () {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    const tgl_awal = document.getElementById("tgl_awal");
    const tgl_akhir = document.getElementById("tgl_akhir");
    const btn_redisplay = document.getElementById("btn_redisplay");
    const slcLokasi = document.getElementById("lokasi");
    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();

    $("#lokasi").select2({
        placeholder: "-- Pilih Lokasi --",
        allowClear: true,
    });

    // Default lokasi
    $("#lokasi").val("TPD").trigger("change");

    let table_atas = $("#table_atas").DataTable({
        processing: true,
        serverSide: true,
        destroy: true,
        responsive: true,
        autoWidth: false,

        ajax: {
            url: "SJSudahKirimCustomer/getData",
            type: "GET",
            dataType: "json",

            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                    tgl_awal: tgl_awal.value,
                    tgl_akhir: tgl_akhir.value,
                    id_lokasi: $("#lokasi").val(),
                });
            },
        },

        columns: [
            {
                data: "idHeader",
                name: "idHeader",
                render: function (data, type, row) {
                    if (!data) {
                        return "";
                    }
                    return `
                        <a href="javascript:void(0);"
                           class="id-header-link text-primary font-weight-bold"
                           data-id="${data}">
                            ${data}
                        </a>
                    `;
                },
            },
            {
                data: "tanggal_raw",
                name: "tanggal",
                render: function (data, type, row) {
                    if (type === "display") {
                        return row.tanggal ?? "";
                    }
                    return data ?? "";
                },
            },
            {
                data: "jam_muat",
                name: "jam_muat",
                defaultContent: "",
            },
            {
                data: "nopol",
                name: "nopol",
                defaultContent: "",
            },
            {
                data: "instansi",
                name: "instansi",
                defaultContent: "",
            },
            {
                data: "tujuan_kirim",
                name: "tujuan_kirim",
                defaultContent: "",
            },
            {
                data: "sopir",
                name: "sopir",
                defaultContent: "",
            },
            {
                data: "acc_gudang",
                name: "acc_gudang",
                defaultContent: "",
            },
            {
                data: "waktu_acc_gudang",
                name: "waktu_acc_gudang",
                defaultContent: "",
            },
            {
                data: "acc_satpam",
                name: "acc_satpam",
                defaultContent: "",
            },
        ],

        paging: false,
        scrollY: "300px",
        scrollCollapse: true,
        scrollX: true,

        createdRow: function (row) {
            $(row).css(
                "font-family",
                "Arial"
            );

            $(row).css(
                "font-size",
                "14px"
            );
        },

        headerCallback: function (thead) {
            $(thead)
                .find("th")
                .css(
                    "font-family",
                    "Arial"
                )
                .css(
                    "font-size",
                    "14px"
                )
                .css(
                    "text-align",
                    "center"
                );
        },
    });

    btn_redisplay.addEventListener(
        "click",
        function (event) {
            event.preventDefault();

            table_atas.ajax.reload(
                null,
                false
            );
        }
    );

    $("#table_atas").on(
        "click",
        ".id-header-link",
        function (event) {
            event.preventDefault();

            const idHeaderLink = $(this).data("id");
            console.log(
                "ID Header:",
                idHeaderLink
            );

            $.ajax({
                url: "PemeriksaanBarang/getPrint",
                type: "GET",
                data: {
                    _token: csrfToken,
                    idHeaderLink: idHeaderLink,
                },

                success: function (data) {
                    console.log("Data getPrint:", data);
                    if (!data || !data.header) {
                        alert(
                            "Data pemeriksaan tidak ditemukan."
                        );
                        return;
                    }

                    initPrint(data, true);

                    const modalElement = document.getElementById("modalLaporanCustomer");

                    if (!modalElement) {
                        console.error("#modalLaporanCustomer tidak ditemukan");
                        alert("Modal Preview Pemeriksaan Barang tidak ditemukan.");
                        return;
                    }

                    const modalCustomer = bootstrap.Modal.getOrCreateInstance(modalElement);
                    modalCustomer.show();
                },

                error: function (
                    xhr,
                    status,
                    error
                ) {
                    console.error("Error getPrint:", error);
                    console.error(xhr.responseText);

                    let message = "Gagal mengambil data pemeriksaan.";

                    try {
                        const err = JSON.parse(xhr.responseText);
                        if (err.Message) {
                            message = err.Message;
                        } else if (
                            err.message
                        ) {
                            message = err.message;
                        }

                    } catch (e) {
                        //
                    }

                    alert(message);
                },
            });
        }
    );

    function initPrint(data, customer) {
        if (!customer) {
            return;
        }

        document.getElementById("customer_tanggalMuatP").innerHTML = data.header.tanggal ?? "";
        document.getElementById("customer_nopolP").innerHTML = data.header.nopol ?? "";
        document.getElementById("customer_jamMuatP").innerHTML = data.header.jam_muat ?? "";
        document.getElementById("customer_instansiP").innerHTML = data.header.instansi ?? "";
        document.getElementById("customer_tujuanKirim").innerHTML = data.header.tujuan_kirim ?? "";

        if (data.header.no_seal || data.header.no_container) {
            document.getElementById("customer_sealContainer").innerHTML =
                (data.header.no_seal ?? "") +
                " / " +
                (data.header.no_container ?? "");
        } else {
            document.getElementById("customer_sealContainer").innerHTML = "";
        }

        // ======================================================
        // SURAT JALAN
        // ======================================================

        document.getElementById("customer_suratJalan").innerHTML =data.header.surat_jalanTerdaftar ?? "";

        // ======================================================
        // HITUNG TOTAL
        // ======================================================

        let totalPerGroup = {};
        let lastIndexPerGroup = {};

        data.detail.forEach(
            function (item, index) {
                let type = item.nama_typeBarang ?? "";
                let satuan = item.Nama_satuan ?? "";
                let key = `${type}__${satuan}`;
                if (!totalPerGroup[key]) {
                    totalPerGroup[key] = 0;
                }
                totalPerGroup[key] += Number(item.item) || 0;
                lastIndexPerGroup[key] = index;
            }
        );

        let tbodyHTML = "";

        data.detail.forEach(
            function (item, index) {
                let type = item.nama_typeBarang ?? "";
                let tujuanKirim = item.tujuan_kirim ?? "";
                let satuan = item.Nama_satuan ?? "";
                let key = `${type}__${satuan}`;
                let totalGroup = totalPerGroup[key] ?? 0;
                let totalHTML = "";

                if (lastIndexPerGroup[key] === index) {
                    totalHTML =
                        `<strong>
                            ${formatAngka(totalGroup)}
                            &nbsp;
                            ${satuan}
                        </strong>`;
                }

                tbodyHTML += `
                    <tr>
                        <td
                            class="center"
                            style="width:5%;"
                        >
                            ${index + 1}
                        </td>

                        <td
                            class="center"
                            style="width:27.5%;"
                        >
                            ${type}
                        </td>

                        <td
                            class="center"
                            style="width:10%;"
                        >
                            ${ambilJam(item.jam) ?? ""}
                        </td>

                        <td
                            class="center"
                            style="width:27.5%;"
                        >
                            ${tujuanKirim}
                        </td>

                        <td
                            class="center"
                            style="width:15%;"
                        >
                            ${formatAngka(item.item) ?? ""}
                            &nbsp;
                            ${satuan}
                        </td>

                        <td
                            class="center"
                            style="width:15%;"
                        >
                            ${totalHTML}
                        </td>
                    </tr>
                `;
            }
        );

        document.querySelector(
            "#customer_modalItemTable tbody"
        ).innerHTML =
            tbodyHTML;

        document.getElementById(
            "customer_kolomKeterangan"
        ).innerHTML =
            data.header.keterangan ?? "";

        // ======================================================
        // TTD SOPIR
        // ======================================================

        if (
            data.header.ttd_base64 &&
            data.header.ttd_base64 !== ""
        ) {

            let ttd =
                data.header.ttd_base64;

            if (
                !ttd.startsWith(
                    "data:image"
                )
            ) {
                ttd =
                    "data:image/png;base64," +
                    ttd;
            }

            $("#customer_ttd_sopir")
                .attr("src", ttd)
                .show();

        } else {

            $("#customer_ttd_sopir")
                .attr("src", "")
                .show();
        }

        // ======================================================
        // TTD SATPAM KOREKSI
        // ======================================================

        if (
            data.header.customer == 0 &&
            data.header.user_koreksi !== "" &&
            data.header.user_input !==
                data.header.user_koreksi
        ) {

            if (
                data.header.FotoTtdK &&
                data.header.FotoTtdK !== ""
            ) {

                let ttd =
                    data.header.FotoTtdK;

                if (
                    !ttd.startsWith(
                        "data:image"
                    )
                ) {
                    ttd =
                        "data:image/png;base64," +
                        ttd;
                }

                $("#customer_ttd_satpam2")
                    .attr("src", ttd)
                    .show();

            } else {

                $("#customer_ttd_satpam2")
                    .attr("src", "")
                    .show();
            }

            document.getElementById(
                "customer_ttnSatpam2"
            ).innerHTML =
                "Tanda Tangan & Nama Jelas";

            document.getElementById(
                "customer_spm"
            ).innerHTML =
                "Satpam";

            document.getElementById(
                "customer_namaSatpamP2"
            ).innerHTML =
                data.header.NamaUserK ?? "";

        } else {

            document.getElementById(
                "customer_ttnSatpam2"
            ).innerHTML = "";

            document.getElementById(
                "customer_spm"
            ).innerHTML = "";

            document.getElementById(
                "customer_namaSatpamP2"
            ).innerHTML = "";

            $("#customer_ttd_satpam2")
                .attr("src", "")
                .show();
        }

        // ======================================================
        // TTD SATPAM
        // ======================================================

        if (
            data.ttd &&
            data.ttd.FotoTtd &&
            data.ttd.FotoTtd !== ""
        ) {

            let ttd =
                data.ttd.FotoTtd;

            if (
                !ttd.startsWith(
                    "data:image"
                )
            ) {
                ttd =
                    "data:image/png;base64," +
                    ttd;
            }

            $("#customer_ttd_satpam")
                .attr("src", ttd)
                .show();

        } else {

            $("#customer_ttd_satpam")
                .attr("src", "")
                .show();
        }

        // ======================================================
        // TTD GUDANG
        // ======================================================

        if (
            data.header.NamaUser &&
            data.header.NamaUser.trim() !== ""
        ) {

            if (
                data.header.fotoTtdAcc &&
                data.header.fotoTtdAcc !== ""
            ) {

                let ttd =
                    data.header.fotoTtdAcc;

                if (
                    !ttd.startsWith(
                        "data:image"
                    )
                ) {
                    ttd =
                        "data:image/png;base64," +
                        ttd;
                }

                $("#customer_ttd_gudang")
                    .attr("src", ttd)
                    .show();

            } else {

                $("#customer_ttd_gudang")
                    .attr("src", "")
                    .show();
            }

            document.getElementById(
                "customer_ttnGudang"
            ).innerHTML =
                "Tanda Tangan & Nama Jelas";

            document.getElementById(
                "customer_gdg"
            ).innerHTML =
                "Mengetahui";

            document.getElementById(
                "customer_namaGudangP"
            ).innerHTML =
                data.header.NamaUser;

        } else {

            document.getElementById(
                "customer_ttnGudang"
            ).innerHTML = "";

            document.getElementById(
                "customer_gdg"
            ).innerHTML = "";

            document.getElementById(
                "customer_namaGudangP"
            ).innerHTML = "";

            $("#customer_ttd_gudang")
                .attr("src", "")
                .show();
        }

        // ======================================================
        // NAMA SATPAM & SOPIR
        // ======================================================

        document.getElementById(
            "customer_namaSatpamP"
        ).innerHTML =
            data.ttd?.NamaUser ?? "";

        document.getElementById(
            "customer_namaSopirP"
        ).innerHTML =
            data.header.sopir ?? "";

        // ======================================================
        // FOTO PENGIRIMAN
        // ======================================================

        const container =
            document.getElementById(
                "foto_pengirimanContainerCustomer"
            );

        if (!container) {
            return;
        }

        if (
            data.header.foto_pengiriman &&
            data.header.foto_pengiriman !== "" &&
            data.header.foto_pengiriman !== "null"
        ) {

            const arrayFotoPengiriman =
                data.header.foto_pengiriman.split(
                    ", "
                );

            container.innerHTML = "";

            arrayFotoPengiriman.forEach(
                function (src) {

                    container.innerHTML += `
                        <img src="${src}">
                    `;
                }
            );

        } else {

            container.innerHTML = "";
        }
    }

    // ==========================================================
    // AMBIL JAM
    // ==========================================================

    function ambilJam(datetime) {

        if (!datetime) {
            return "";
        }

        return datetime.substring(
            11,
            16
        );
    }

    // ==========================================================
    // FORMAT ANGKA
    // ==========================================================

    function formatAngka(val) {

        if (
            val === "" ||
            val === null ||
            isNaN(val)
        ) {
            return "";
        }

        let num =
            parseFloat(val);

        if (
            Number.isInteger(num)
        ) {
            return numeral(num)
                .format("0");
        }

        let decimal =
            num.toString()
                .split(".")[1] || "";

        if (
            decimal.length > 1 &&
            decimal !== "75" &&
            decimal !== "70"
        ) {
            return numeral(num)
                .format("0.00");
        }

        if (
            decimal === "75"
        ) {
            return numeral(num)
                .format("0.00");
        }

        return numeral(num)
            .format("0.[0]");
    }
});
