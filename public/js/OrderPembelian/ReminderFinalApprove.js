jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tanggal = document.getElementById("tanggal");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");

    let table_atas = $("#table_atas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        destroy: true,
        ajax: {
            url: "ReminderFinalApprove/getDataAll",
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
                data: "No_trans",
                render: function (data, type, row) {
                    if (type === "display") {
                        return `
                    <a href="javascript:void(0)"
                       class="link-idheader text-primary"
                       data-bs-toggle="modal" data-bs-target="#modalFinalApprove"
                       data-id="${data}">
                        ${data}
                    </a>
                    `;
                    }
                    return data; // penting untuk sorting & searching
                },
            },
            {
                data: 'tanggal_raw', // Data asli untuk sorting
                render: function (data, type, row) {
                    // type === 'display' digunakan saat menampilkan di tabel
                    if (type === 'display') {
                        return row.tanggal; // tampilkan versi m/d/Y
                    }
                    return data; // untuk sorting & filtering (yyyy-mm-dd)
                }
            },
            { data: "NAMA_BRG" },
            {
                data: "Qty",
                render: function (data, type, full, meta) {
                    return (
                        numeral(data).format("0,0.00") +
                        " " +
                        full.Nama_satuan.trim()
                    );
                },
            },
            {
                data: "PriceUnit",
                render: function (data, type, full, meta) {
                    return (
                        full.Id_MataUang_BC.trim() +
                        " " +
                        numeral(data).format("0,0.0000")
                    );
                },
            },
            {
                data: "PriceExt",
                render: function (data, type, full, meta) {
                    return (
                        full.Id_MataUang_BC.trim() +
                        " " +
                        numeral(data).format("0,0.0000")
                    );
                },
            },
            { data: "Kd_div" },
            { data: "Nama" },
            // { data: "StatusBeli" },
            { data: "DirekturApprove" },
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row) {

                    let btnWA = `
                            <button class="btn btn-sm btn-success btn-wa" 
                                style="width: 100px;"
                                data-id="${row.No_trans}">
                                Kirim WA
                            </button>
                        `;

                    // Jika sudah pernah kirim WA
                    if (row.TimeSendWA !== null && row.TimeSendWA !== "") {
                        btnWA = `
                                <button class="btn btn-sm btn-secondary" 
                                    style="width: 100px;"
                                    disabled>
                                    Sudah WA
                                </button>
                            `;
                    }

                    return `
                            ${btnWA}
                        `;
                }
            },
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
        scrollY: "500px",
        scrollCollapse: true,
    });

    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();
    // tgl_awal.valueAsDate = new Date(2025, 11, 25);

    // $.ajaxSetup({
    //     beforeSend: function () {
    //         // Show the loading screen before the AJAX request
    //         $("#loading-screen").css("display", "flex");
    //     },
    //     complete: function () {
    //         // Hide the loading screen after the AJAX request completes
    //         $("#loading-screen").css("display", "none");
    //     },
    // });

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        // if ($("#" + slcTypeKain.id).val() == 1) {
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "ReminderFinalApprove/getData",
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
                    data: "No_trans",
                    render: function (data, type, row) {
                        if (type === "display") {
                            return `
                    <a href="javascript:void(0)"
                       class="link-idheader text-primary"
                       data-bs-toggle="modal" data-bs-target="#modalFinalApprove"
                       data-id="${data}">
                        ${data}
                    </a>
                    `;
                        }
                        return data; // penting untuk sorting & searching
                    },
                },
                {
                    data: 'tanggal_raw', // Data asli untuk sorting
                    render: function (data, type, row) {
                        // type === 'display' digunakan saat menampilkan di tabel
                        if (type === 'display') {
                            return row.tanggal; // tampilkan versi m/d/Y
                        }
                        return data; // untuk sorting & filtering (yyyy-mm-dd)
                    }
                },
                { data: "NAMA_BRG" },
                {
                    data: "Qty",
                    render: function (data, type, full, meta) {
                        return (
                            numeral(data).format("0,0.00") +
                            " " +
                            full.Nama_satuan.trim()
                        );
                    },
                },
                {
                    data: "PriceUnit",
                    render: function (data, type, full, meta) {
                        return (
                            full.Id_MataUang_BC.trim() +
                            " " +
                            numeral(data).format("0,0.0000")
                        );
                    },
                },
                {
                    data: "PriceExt",
                    render: function (data, type, full, meta) {
                        return (
                            full.Id_MataUang_BC.trim() +
                            " " +
                            numeral(data).format("0,0.0000")
                        );
                    },
                },
                { data: "Kd_div" },
                { data: "Nama" },
                // { data: "StatusBeli" },
                { data: "DirekturApprove" },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row) {

                        let btnWA = `
                            <button class="btn btn-sm btn-success btn-wa" 
                                style="width: 100px;"
                                data-id="${row.No_trans}">
                                Kirim WA
                            </button>
                        `;

                        // Jika sudah pernah kirim WA
                        if (row.TimeSendWA !== null && row.TimeSendWA !== "") {
                            btnWA = `
                                <button class="btn btn-sm btn-secondary" 
                                    style="width: 100px;"
                                    disabled>
                                    Sudah WA
                                </button>
                            `;
                        }

                        return `
                            ${btnWA}
                        `;
                    }
                },
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
            scrollY: "500px",
            scrollCollapse: true,
        });
    });

    $('#table_atas').on('click', '.btn-wa', function () {
        const id = $(this).data('id');
        console.log(id);
        const no_trans = id;
        let data = table_atas.row($(this).closest('tr')).data();
        console.log(data);
        Swal.fire({
            title: 'Apakah anda yakin ingin mengirim pesan Whatsapp?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/FinalApprove/getDetailNoTrans",
                    type: "GET",
                    data: { noTrans: no_trans },
                    success: function (res) {
                        console.log("FULL RESPONSE:", res);

                        // Jalankan AJAX kedua setelah seluruh proses di atas selesai
                        $.ajax({
                            url: "ReminderFinalApprove",
                            dataType: "json",
                            type: "POST",
                            data: {
                                _token: csrfToken,
                                proses: 1,
                                no_trans: no_trans,
                                nama_barang: res[0].NAMA_BRG,
                                kategori_utama: res[0].nama,
                                kategori: res[0].nama_kategori,
                                sub_kategori: res[0].nama_sub_kategori,
                                divisi: res[0].NM_DIV.trim(),
                                user: res[0].NamaUser,
                                status_beli: res[0].StatusBeli == 0 ? "Beli Sendiri" : "Pengadaan Pembelian",
                                keterangan_order: res[0].keterangan,
                                keterangan_internal: res[0].Ket_Internal,
                                data: data,
                            },
                            success: function (response) {
                                if (response.message) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Success!",
                                        text: response.message,
                                        showConfirmButton: true,
                                    }).then(() => {
                                        $("#table_atas").DataTable().ajax.reload();
                                    });
                                } else if (response.error) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error!",
                                        text: response.error,
                                        showConfirmButton: true,
                                    });
                                }
                            },
                            error: function (xhr) {
                                var err = eval("(" + xhr.responseText + ")");
                                alert(err.Message);
                            },
                        });
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to get detail trans.",
                        });
                    },
                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    });

    let listChecked = [];
    let customAccFilters = [];
    let isCheckAll = false;
    let selectedNoTrans = null;
    let modalLabelFinalApprove = document.getElementById("modalLabelFinalApprove"); //prettier-ignore
    let final_namaBarang = document.getElementById("final_namaBarang");
    let final_detailBarang = document.getElementById("final_detailBarang");
    let final_btnShowDetail = document.getElementById("final_btnShowDetail");
    let btnDownload = document.getElementById("btnDownload");
    const btnShowBarang = document.getElementById("btnShowBarang");
    const dokPreview = document.getElementById("dok_preview");
    const dokKeterangan = document.getElementById("dok_keterangan");
    let final_kategoriUtama = document.getElementById("final_kategoriUtama");
    let final_kategori = document.getElementById("final_kategori");
    let final_subKategori = document.getElementById("final_subKategori");
    let final_qtyOrder = document.getElementById("final_qtyOrder");
    let final_divisi = document.getElementById("final_divisi");
    let final_user = document.getElementById("final_user");
    let final_status = document.getElementById("final_status");
    let final_ketOrder = document.getElementById("final_ketOrder");
    let final_ketInternal = document.getElementById("final_ketInternal");
    let final_pembelianTerakhir = document.getElementById("final_pembelianTerakhir"); //prettier-ignore
    let final_supplier = document.getElementById("final_supplier");
    let final_hargaUnit = document.getElementById("final_hargaUnit");
    let final_diskon = document.getElementById("final_diskon");
    let final_ppn = document.getElementById("final_ppn");
    let final_total = document.getElementById("final_total");
    const filterFinalApprove = $("#filterFinalApprove");
    const btnDownloadAttachment = document.getElementById(
        "btnDownloadAttachment",
    );

    btnDownloadAttachment.style.display = "none";

    $("#table_atas").on("click", ".link-idheader", function () {
        const no_trans = $(this).data("id");
        console.log("ID Trans:", no_trans);

        // simpan no_trans (jika diperlukan di modal)
        $("#modalLaporan").data("idheader", no_trans);
        $.ajax({
            url: "/FinalApprove/getDetailNoTrans",
            type: "GET",
            data: { noTrans: no_trans },
            success: function (res) {
                console.log("FULL RESPONSE:", res);
                console.log("Gambar Dokumentasi:", window.dokumentasiBase64);
                console.log("Dokumentasi: ", res[0].Dokumentasi);

                modalLabelFinalApprove.innerHTML =
                    "Detail No. Trans " + no_trans;
                final_namaBarang.value = res[0].NAMA_BRG;
                final_kategoriUtama.innerHTML =
                    "Kategori Utama: " + res[0].nama;
                final_kategori.innerHTML = "Kategori: " + res[0].nama_kategori;
                final_subKategori.innerHTML =
                    "Sub Kategori: " + res[0].nama_sub_kategori;
                final_qtyOrder.value = numeral(res[0].Qty).format("0,0.00");
                final_divisi.value = res[0].NM_DIV.trim();
                final_user.value = res[0].NamaUser;
                final_status.value =
                    res[0].StatusBeli == 0
                        ? "Beli Sendiri "
                        : "Pengadaan Pembelian";
                final_ketOrder.value = res[0].keterangan;
                final_ketInternal.value = res[0].Ket_Internal;
                final_pembelianTerakhir.value = moment(res[0].Tgl_order).format(
                    "MM/DD/YYYY",
                );
                final_supplier.value = res[0].NM_SUP;
                final_hargaUnit.value = numeral(res[0].PriceUnit).format(
                    "0,0.0000",
                );
                final_diskon.value = numeral(res[0].harga_disc).format(
                    "0,0.0000",
                );
                final_ppn.value = numeral(res[0].PPN).format("0,0.0000");
                final_total.value = numeral(res[0].PriceExt).format("0,0.0000");
                window.dokumentasiBase64 = res[0].Dokumentasi;

                checkDokumentasiAvailability(no_trans);
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to get detail trans.",
                });
            },
        });
    });

    function checkDokumentasiAvailability(noTrans) {
        if (!noTrans) {
            updateAttachmentButton(false);
            return;
        }

        let checkUrl = `/FinalApprove/getDokumentasi/${noTrans}`;

        fetch(checkUrl)
            .then((response) => {
                if (response.status === 204 || !response.ok) {
                    updateAttachmentButton(false);
                } else {
                    updateAttachmentButton(true);
                }
            })
            .catch(() => {
                updateAttachmentButton(false);
            });
    }

    function updateAttachmentButton(hasFile) {
        btnDownloadAttachment.classList.remove("btn-warning", "btn-danger");
        if (hasFile) {
            btnDownloadAttachment.classList.add("btn-warning");
        } else {
            btnDownloadAttachment.classList.add("btn-danger");
        }
    }

    final_btnShowDetail.addEventListener("click", function (e) {
        if (this.innerHTML == "Show Kategori Barang") {
            this.innerHTML = "Hide Kategori Barang";
            final_detailBarang.style.display = "block";
        } else if (this.innerHTML == "Hide Kategori Barang") {
            this.innerHTML = "Show Kategori Barang";
            final_detailBarang.style.display = "none";
        }
    });
});