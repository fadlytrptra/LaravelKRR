jQuery(function ($) {
    //#region Variables
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore

    let table_SJ = $("#table_SJ").DataTable({
        processing: true,
        responsive: true,
        scrollX: true,
        autoWidth: false,
        serverSide: true,
        orderFixed: [[12, "asc"]],
        columnDefs: [{ targets: 11, orderable: false }],
        ajax: {
            url: "/KirimSJ/getDataSJ",
            type: "GET",
            beforeSend: function () {
                $("#loading-screen").css("display", "flex");
            },
            complete: function () {
                $("#loading-screen").css("display", "none");
            },
        },
        columns: [
            {
                data: "Tanggal",
                render: function (data, type, row) {
                    return moment(data).format("MM/DD/YYYY");
                },
            },
            { data: "IDPengiriman" },
            { data: "NamaCust" },
            { data: "IDSuratPesanan" },
            { data: "NO_PO" },
            { data: "NamaType" },
            {
                data: "QuantityDisplay",
                render: function (data) {
                    if (!data || data === "-") {
                        return "-";
                    }

                    let parts = data.split(" ");

                    let qty = parts[0];
                    let satuan = parts.slice(1).join(" ");

                    return `${qty} ${formatSatuan(satuan)}`;
                },
            },
            { data: "AlamatKirim" },
            { data: "NamaExpeditor" },
            { data: "TrukNopol" },
            {
                data: "Status",
                render: function (data) {
                    if (data === "Pasca Kirim Approved") {
                        return `<span class="badge badge-primary">Pasca Kirim Approved</span>`;
                    }
                    if (data === "Belum Approve Pasca Kirim") {
                        return `<span class="badge badge-secondary">Belum Approve Pasca Kirim</span>`;
                    }
                    if (data === "Pasca Kirim") {
                        return `<span class="badge bg-warning">Pasca Kirim</span>`;
                    }
                    if (data === "Belum Approve") {
                        return `<span class="badge bg-info">Belum Approve</span>`;
                    }
                    return `<span class="badge bg-danger text-white">Belum Kirim</span>`;
                },
            },
            {
                data: "IDPengiriman",
                render: function (data, type, row) {
                    if (row.Status === "Pasca Kirim Approved") {
                        return `
                            <button class="btn btn-proses-pasca"
                                style="background:#14f2fd;color:white;border-color:#14f2fd;"
                                data-idpengiriman="${data}"
                                data-qtyjual="${row.QuantityDisplay}">
                                Proses Pasca
                            </button>
                        `;
                    }
                    if (row.Status === "Belum Approve Pasca Kirim") {
                        return `
                            <button class="btn btn-resendPasca"
                                style="background:#fd1475;color:white;border-color:#fd1475;"
                                data-idpengiriman="${data}">
                                Resend Pasca
                            </button>
                        `;
                    }
                    if (row.Status === "Pasca Kirim") {
                        let disabled =
                            Number(row.IsDownload) === 1 ? "" : "disabled";
                        return `
                            <button class="btn btn-primary btn-unduh" data-idpengiriman="${data}">
                                Unduh File
                            </button>
                            <button class="btn btn-verifikasi" ${disabled}
                                style="background:#fd7e14;color:white;border-color:#fd7e14;"
                                data-idpengiriman="${data}"
                                data-qtyjual="${row.QuantityDisplay}">
                                Verifikasi Pasca
                            </button>
                        `;
                    }

                    if (row.Status === "Belum Approve") {
                        return `
                            <button class="btn btn-warning btn-resendSJ"
                                    data-idpengiriman="${data}">
                                Resend Email
                            </button>
                        `;
                    }

                    if (row.IsTTDComplete == 0) {
                        return `
                            <button class="btn btn-secondary" disabled
                                    title="TTD Supir & Satpam belum lengkap">
                                Kirim SJ
                            </button>
                        `;
                    }

                    return `
                        <button class="btn btn-success btn-kirimSJ"
                                data-idpengiriman="${data}">
                            Kirim SJ
                        </button>
                    `;
                },
            },
            { data: "StatusOrder", visible: false, searchable: false },
        ],
    });
    //#endregion

    //#region Functions

    // loading screen for ajax request
    $.ajaxSetup({
        beforeSend: function () {
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            $("#loading-screen").css("display", "none");
        },
    });

    function formatSatuan(satuan) {
        let mapping = {
            TABUNG: "TABUNG",
            SET: "SET",
            KGM: "KILOGRAM",
            RP: "RP",
            BALL: "BALL",
            LBR: "LEMBAR",
            PC: "POTONG",
            YARDS: "YARD",
            "MTR²": "METER PERSEGI",
            ROLL: "ROLL",
            DRUM: "DRUM",
            LJR: "LONJOR",
            MTR: "METER",
            UNIT: "UNIT",
        };

        return mapping[satuan] || satuan;
    }

    //#endregion

    //#region Event Listeners
    $("#table_SJ").on("click", ".btn-kirimSJ", function () {
        let $btn = $(this);
        let idPengiriman = $btn.data("idpengiriman");

        // CEGAH DOUBLE CLICK
        if ($btn.data("clicked")) return;
        $btn.data("clicked", true);

        Swal.fire({
            title: "Konfirmasi",
            text: "Apakah Anda yakin ingin mengirim SJ ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, kirim!",
            cancelButtonText: "Batal",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",

            // lock UI swal
            allowOutsideClick: false,
            allowEscapeKey: false,

            showLoaderOnConfirm: true,

            preConfirm: () => {
                return $.ajax({
                    url: "KirimSJ",
                    type: "POST",
                    data: {
                        jenisProses: "kirimSJ",
                        idPengiriman: idPengiriman,
                        _token: csrfToken,
                    },
                })
                    .then((response) => {
                        if (response.error) {
                            throw new Error(response.error);
                        }

                        return response;
                    })
                    .catch((error) => {
                        Swal.showValidationMessage(
                            error.responseJSON?.error ||
                                error.message ||
                                "Terjadi kesalahan",
                        );

                        // reset klik kalau gagal
                        $btn.data("clicked", false);
                    });
            },
        }).then((result) => {
            if (!result.isConfirmed) {
                // kalau batal → reset
                $btn.data("clicked", false);
                return;
            }

            let response = result.value;

            Swal.fire("Berhasil!", response.success, "success").then(() => {
                table_SJ.ajax.reload();
            });
        });
    });

    $("#table_SJ").on("click", ".btn-resendSJ", function () {
        let idPengiriman = $(this).data("idpengiriman");

        Swal.fire({
            title: "Konfirmasi",
            text: "Kirim ulang email ke customer?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, kirim ulang!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "KirimSJ",
                    type: "POST",
                    data: {
                        jenisProses: "resendSJ",
                        idPengiriman: idPengiriman,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire("Info", response.error, "info");
                        } else {
                            Swal.fire("Berhasil", response.success, "success");
                        }
                    },
                });
            }
        });
    });

    $("#table_SJ").on("click", ".btn-warningTTD", function () {
        Swal.fire({
            icon: "warning",
            title: "TTD Belum Lengkap",
            text: "Tanda tangan Supir dan Satpam belum lengkap.\nSilakan lakukan Pemeriksaan Barang terlebih dahulu.",
        });
    });

    $("#table_SJ").on("click", ".btn-verifikasi", function () {
        let $btn = $(this);
        let idPengiriman = $btn.data("idpengiriman");
        let qtyjual = numeral($btn.data("qtyjual")).value();
        let maxQty = qtyjual * 2;
        let qtyTemp = 0;
        let dataSuratJalanTerkirim;
        let idDetailKirim;
        let idHeaderKirim;
        let satJual;
        let satPrimer;
        let satSekunder;
        let satTritier;
        let satuanTerpakai;
        let QtyPrimer;
        let QtySekunder;
        let QtyTritier;
        let keteranganPasca = "";

        // CEGAH DOUBLE CLICK
        $btn.prop("disabled", true);
        setTimeout(() => {
            $btn.prop("disabled", false);
        }, 1000);

        $.ajax({
            url: "/KirimSJ/preparePasca",
            type: "GET",
            data: {
                idPengiriman: idPengiriman,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.error) {
                    Swal.fire("Info", response.error, "info");
                } else {
                    console.log(response);
                    dataSuratJalanTerkirim = response.dataSuratJalanTerkirim;
                    qtyTemp = numeral(dataSuratJalanTerkirim[0].QtyTemp).value(); //prettier-ignore
                    satJual = dataSuratJalanTerkirim[0].satJual.trim(); //prettier-ignore
                    satPrimer = dataSuratJalanTerkirim[0].satPrimer.trim(); //prettier-ignore
                    satSekunder = dataSuratJalanTerkirim[0].satSekunder.trim(); //prettier-ignore
                    satTritier = dataSuratJalanTerkirim[0].satTritier.trim(); //prettier-ignore
                    QtyPrimer = numeral(dataSuratJalanTerkirim[0].QtyPrimer).value(); //prettier-ignore
                    QtySekunder = numeral(dataSuratJalanTerkirim[0].QtySekunder).value(); //prettier-ignore
                    QtyTritier = numeral(dataSuratJalanTerkirim[0].QtyTritier).value(); //prettier-ignore
                    if (satJual == satPrimer) {
                        QtyPrimer = qtyTemp;
                        satuanTerpakai = "primer";
                    } else if (satJual == satSekunder) {
                        QtySekunder = qtyTemp;
                        satuanTerpakai = "sekunder";
                    } else {
                        QtyTritier = qtyTemp;
                        satuanTerpakai = "tritier";
                    }
                    keteranganPasca =
                        response.dataSuratJalanTerkirim[0].KeteranganPasca ??
                        "";
                    idDetailKirim = response.idDetailKirim[0].IDDetailKirim;
                    idHeaderKirim = response.idDetailKirim[0].IDHeaderKirim;
                }
            },
        }).then((response) => {
            if (response.error) {
                Swal.fire("Info", response.error, "info");
            } else {
                Swal.fire({
                    title: "Silahkan input jumlah barang yang diterima customer",
                    html: `
                    <div class="row g-2 text-start w-100 pb-2 pl-2 m-0" style ="place-content: center;">
                        <div class="col-8 pl-2 pr-2">
                            <label class="form-label fw-bold">Note Dari Customer</label>
                            <input id="noteDariCustomer" type="text" class="form-control" value="${keteranganPasca}" readonly>
                        </div>
                        <div class="col-4 pl-2 pr-2">
                            <label class="form-label fw-bold">Qty Jual (${satJual})</label>
                            <input id="qtyTempVerifikasi" type="number" class="form-control" value="${qtyTemp}">
                        </div>
                    </div>
                    <div class="row g-2 text-start w-100 pb-2 pl-2 m-0">
                        <div class="col-12 pl-2 pr-2">
                            <label class="form-label fw-bold">Note Untuk Customer</label>
                            <input id="noteCustomer" type="text" class="form-control">
                        </div>
                    </div>`,
                    width: 800,
                    showCancelButton: true,
                    confirmButtonText: "Submit",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    preConfirm: () => {
                        const qtyTempVerifikasi =
                            numeral(
                                document.getElementById("qtyTempVerifikasi")
                                    .value,
                            ).value() || 0;
                        let noteCustomer = document
                            .getElementById("noteCustomer")
                            .value.trim();

                        if (noteCustomer === "") {
                            Swal.showValidationMessage(
                                "Note untuk customer harus diisi",
                            );
                            return false;
                        }
                        if (qtyTempVerifikasi > maxQty) {
                            Swal.showValidationMessage(
                                `Qty jual tidak boleh lebih dari ${maxQty}`,
                            );
                            return false;
                        }
                        return {
                            qtyTempVerifikasi,
                            noteCustomer,
                        };
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url: "KirimSJ",
                            type: "POST",
                            data: {
                                jenisProses: "sendRequestPascaKirim",
                                idPengiriman: idPengiriman,
                                qtyTempVerifikasi:
                                    result.value.qtyTempVerifikasi,
                                noteCustomer: result.value.noteCustomer,
                                _token: csrfToken,
                            },
                        })
                            .then((response) => {
                                if (response.error) {
                                    throw new Error(response.error);
                                } else {
                                    Swal.fire(
                                        "Berhasil!",
                                        response.success,
                                        "success",
                                    ).then(() => {
                                        table_SJ.ajax.reload();
                                    });
                                }
                            })
                            .catch((error) => {
                                Swal.showValidationMessage(
                                    error.responseJSON?.error ||
                                        error.message ||
                                        "Terjadi kesalahan",
                                );
                            });
                    }
                });
            }
        });
    });

    $("#table_SJ").on("click", ".btn-unduh", function () {
        let $btn = $(this);
        let idPengiriman = $btn.data("idpengiriman");

        // CEGAH DOUBLE CLICK
        $btn.prop("disabled", true);
        setTimeout(() => {
            $btn.prop("disabled", false);
        }, 1000);

        Swal.fire({
            title: "Konfirmasi",
            text: "Apakah Anda yakin ingin mengunduh file attachment untuk SJ ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, unduh!",
            cancelButtonText: "Batal",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",

            // lock UI swal
            allowOutsideClick: false,
            allowEscapeKey: false,

            showLoaderOnConfirm: true,

            preConfirm: () => {
                return $.ajax({
                    url: "KirimSJ/UnduhAttachment",
                    type: "GET",
                    data: {
                        idPengiriman: idPengiriman,
                    },
                    xhrFields: {
                        responseType: "blob",
                    },
                    error: async function (xhr) {
                        let message = "Terjadi kesalahan";

                        try {
                            const text = await xhr.response.text();

                            const json = JSON.parse(text);

                            message = json.error;
                        } catch (e) {
                            console.log(e);
                        }

                        Swal.fire("Gagal!", message, "error");
                    },
                }).then((blob, status, xhr) => {
                    const url = window.URL.createObjectURL(blob);

                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "Attachment SJ " + idPengiriman + ".zip";

                    document.body.appendChild(a);
                    a.click();

                    a.remove();
                    window.URL.revokeObjectURL(url);

                    return {
                        success: "File berhasil diunduh",
                    };
                });
            },
        }).then((result) => {
            let response = result.value;
            Swal.fire("Berhasil!", response.success, "success").then(() => {
                table_SJ.ajax.reload();
            });
        });
    });

    $("#table_SJ").on("click", ".btn-resendPasca", function () {
        let idPengiriman = $(this).data("idpengiriman");

        Swal.fire({
            title: "Konfirmasi",
            text: "Kirim ulang email pasca ke customer?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, kirim ulang!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "KirimSJ",
                    type: "POST",
                    data: {
                        jenisProses: "resendPasca",
                        idPengiriman: idPengiriman,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire("Info", response.error, "info");
                        } else {
                            Swal.fire("Berhasil", response.success, "success");
                        }
                    },
                });
            }
        });
    });

    $("#table_SJ").on("click", ".btn-proses-pasca", function () {
        let $btn = $(this);
        let idPengiriman = $btn.data("idpengiriman");
        let qtyjual = numeral($btn.data("qtyjual")).value();
        let maxQty = qtyjual * 2;
        let qtyTemp = 0;
        let qtyTempVerifikasi = 0;
        let dataSuratJalanTerkirim;
        let idDetailKirim;
        let idHeaderKirim;
        let satJual;
        let satPrimer;
        let satSekunder;
        let satTritier;
        let satuanTerpakai;
        let QtyPrimer;
        let QtySekunder;
        let QtyTritier;

        // CEGAH DOUBLE CLICK
        $btn.prop("disabled", true);
        setTimeout(() => {
            $btn.prop("disabled", false);
        }, 1000);

        $.ajax({
            url: "/KirimSJ/preparePasca",
            type: "GET",
            data: {
                idPengiriman: idPengiriman,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.error) {
                    Swal.fire("Info", response.error, "info");
                } else {
                    console.log(response);
                    dataSuratJalanTerkirim = response.dataSuratJalanTerkirim;
                    qtyTempVerifikasi = numeral(dataSuratJalanTerkirim[0].QtyTempVerifikasi).value(); //prettier-ignore
                    satJual = dataSuratJalanTerkirim[0].satJual.trim(); //prettier-ignore
                    satPrimer = dataSuratJalanTerkirim[0].satPrimer.trim(); //prettier-ignore
                    satSekunder = dataSuratJalanTerkirim[0].satSekunder.trim(); //prettier-ignore
                    satTritier = dataSuratJalanTerkirim[0].satTritier.trim(); //prettier-ignore
                    QtyPrimer = numeral(dataSuratJalanTerkirim[0].QtyPrimer).value(); //prettier-ignore
                    QtySekunder = numeral(dataSuratJalanTerkirim[0].QtySekunder).value(); //prettier-ignore
                    QtyTritier = numeral(dataSuratJalanTerkirim[0].QtyTritier).value(); //prettier-ignore
                    if (satJual == satPrimer) {
                        QtySekunder = numeral(qtyTempVerifikasi * (QtySekunder / QtyPrimer)).format("0,0.00"); //prettier-ignore
                        QtyTritier = numeral(qtyTempVerifikasi * (QtyTritier / QtyPrimer)).format("0,0.00"); //prettier-ignore
                        QtyPrimer = numeral(qtyTempVerifikasi).format("0,0.00"); //prettier-ignore
                        satuanTerpakai = "primer";
                    } else if (satJual == satSekunder) {
                        QtyPrimer = numeral(qtyTempVerifikasi / (QtySekunder / QtyPrimer)).format("0,0.00"); //prettier-ignore
                        QtyTritier = numeral((QtyTritier / QtySekunder) * qtyTempVerifikasi).format("0,0.00"); //prettier-ignore
                        QtySekunder = numeral(qtyTempVerifikasi).format("0,0.00"); //prettier-ignore
                        console.log(QtyPrimer, QtyTritier, QtySekunder);
                        satuanTerpakai = "sekunder";
                    } else {
                        QtyPrimer = numeral(qtyTempVerifikasi / (QtyTritier / QtyPrimer)).format("0,0.00"); //prettier-ignore
                        QtySekunder = numeral((QtySekunder / QtyTritier) * qtyTempVerifikasi).format("0,0.00"); //prettier-ignore
                        QtyTritier = numeral(qtyTempVerifikasi).format("0,0.00"); //prettier-ignore
                        satuanTerpakai = "tritier";
                    }
                    idDetailKirim = response.idDetailKirim[0].IDDetailKirim;
                    idHeaderKirim = response.idDetailKirim[0].IDHeaderKirim;
                }
            },
        }).then((response) => {
            if (response.error) {
                Swal.fire("Info", response.error, "info");
            } else {
                Swal.fire({
                    title: "Silahkan input jumlah barang yang akan diproses pasca",
                    html: `
                    <div class="row g-2 text-start w-100 pb-2 pl-2 m-0" style ="place-content: center;">
                        <div class="col-4 pl-2 pr-2">
                            <label class="form-label fw-bold">Qty Primer (${satPrimer})</label>
                            <input id="qty1" type="text" class="form-control" value="${QtyPrimer}" readonly>
                        </div>
                        <div class="col-4 pl-2 pr-2">
                            <label class="form-label fw-bold">Qty Sekunder (${satSekunder})</label>
                            <input id="qty2" type="text" class="form-control" value="${QtySekunder}" readonly>
                        </div>
                        <div class="col-4 pl-2 pr-2">
                            <label class="form-label fw-bold">Qty Tritier (${satTritier})</label>
                            <input id="qty3" type="text" class="form-control" value="${QtyTritier}" readonly>
                        </div>
                    </div>
                    <div class="row g-2 text-start w-100 pb-2 pl-2 m-0">
                        <div class="col-12 pl-2 pr-2">
                            <label class="form-label fw-bold">Alasan Kembali</label>
                            <input id="alasanKembali" type="text" class="form-control">
                        </div>
                    </div>`,
                    width: 800,
                    showCancelButton: true,
                    confirmButtonText: "Submit",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        const alasanInput =
                            document.getElementById("alasanKembali");
                        if (alasanInput) {
                            alasanInput.focus();
                        }
                    },
                    preConfirm: () => {
                        const qty1 = numeral(document.getElementById("qty1").value).value() || 0; //prettier-ignore
                        const qty2 = numeral(document.getElementById("qty2").value).value() || 0; //prettier-ignore
                        const qty3 = numeral(document.getElementById("qty3").value).value() || 0; //prettier-ignore
                        const alasan = document.getElementById("alasanKembali").value.trim(); //prettier-ignore

                        if (alasan === "") {
                            Swal.showValidationMessage(
                                "Alasan kembali harus diisi",
                            );
                            document.getElementById("alasanKembali").focus();
                            return false;
                        }

                        return {
                            qty1,
                            qty2,
                            qty3,
                            alasan,
                        };
                    },
                }).then((result) => {
                    console.log(result);

                    if (result.isConfirmed) {
                        if (qtyTempVerifikasi > qtyjual) {
                            Swal.fire({
                                title: "Konfirmasi",
                                text: "Silahkan pilih proses pasca",
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonText: "Pengembalian",
                                cancelButtonText: "Kekurangan/Kelebihan",
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "rgba(44, 192, 76, 0.87)",
                                // lock UI swal
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                            }).then((result) => {
                                $.ajax({
                                    url: "KirimSJ",
                                    type: "POST",
                                    data: {
                                        jenisProses: "pascaKirim",
                                        jenis_pasca: result.isConfirmed
                                            ? "Pengembalian"
                                            : "Kurang/Lebih",
                                        surat_jalan: idPengiriman,
                                        idDetailKirim: idDetailKirim,
                                        idHeaderKirim: idHeaderKirim,
                                        qty_primerDiterimaCustomer:
                                            result.value.qty1,
                                        qty_sekunderDiterimaCustomer:
                                            result.value.qty2,
                                        qty_tritierDiterimaCustomer:
                                            result.value.qty3,
                                        alasan: result.value.alasan,
                                        _token: csrfToken,
                                    },
                                })
                                    .then((response) => {
                                        if (response.error) {
                                            throw new Error(response.error);
                                        } else {
                                            Swal.fire(
                                                "Berhasil!",
                                                response.success,
                                                "success",
                                            ).then(() => {
                                                table_SJ.ajax.reload();
                                            });
                                        }
                                    })
                                    .catch((error) => {
                                        Swal.showValidationMessage(
                                            error.responseJSON?.error ||
                                                error.message ||
                                                "Terjadi kesalahan",
                                        );
                                    });
                            });
                        } else {
                            $.ajax({
                                url: "KirimSJ",
                                type: "POST",
                                data: {
                                    jenisProses: "pascaKirim",
                                    jenis_pasca: "Kurang/Lebih",
                                    surat_jalan: idPengiriman,
                                    idDetailKirim: idDetailKirim,
                                    idHeaderKirim: idHeaderKirim,
                                    qty_primerDiterimaCustomer:
                                        result.value.qty1,
                                    qty_sekunderDiterimaCustomer:
                                        result.value.qty2,
                                    qty_tritierDiterimaCustomer:
                                        result.value.qty3,
                                    alasan: result.value.alasan,
                                    _token: csrfToken,
                                },
                            })
                                .then((response) => {
                                    if (response.error) {
                                        throw new Error(response.error);
                                    } else {
                                        Swal.fire(
                                            "Berhasil!",
                                            response.success,
                                            "success",
                                        ).then(() => {
                                            table_SJ.ajax.reload();
                                        });
                                    }
                                })
                                .catch((error) => {
                                    Swal.showValidationMessage(
                                        error.responseJSON?.error ||
                                            error.message ||
                                            "Terjadi kesalahan",
                                    );
                                });
                        }
                    }
                });
            }
        });
    });
    //#endregion
});
