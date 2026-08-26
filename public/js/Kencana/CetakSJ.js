jQuery(function ($) {
    //#region Variables
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let contoh_printDiv = document.getElementById("contoh_printDiv");
    let contoh_printSjEksportDiv = document.getElementById("contoh_printSjEksportDiv"); // prettier-ignore
    let print_button = document.getElementById("print_button");
    let export_pdf = document.getElementById("export_pdf");
    let tanggal_sj = document.getElementById("tanggal_sj");
    let div_accSuratJalan = document.getElementById("div_accSuratJalan");
    let btn_ttSupir = document.getElementById("btn_ttSupir");
    let btn_accSatpam = document.getElementById("btn_accSatpam");
    let no_sp = document.getElementById("no_sp");
    let no_sjButton = document.getElementById("no_sjButton");
    let no_sjSelect = document.getElementById("no_sjSelect");
    let no_sjText = document.getElementById("no_sjText");
    let contoh_print = document.getElementById("contoh_print");
    let surat_jalanPPN = document.getElementById("surat_jalanPPN");
    let surat_jalanNonPPN = document.getElementById("surat_jalanNonPPN");
    let surat_jalanAfalan = document.getElementById("surat_jalanAfalan");
    let surat_jalanExport = document.getElementById("surat_jalanExport");
    let no_spKolom = document.getElementById("no_spKolom");
    let tanggal_kirimKolom = document.getElementById("tanggal_kirimKolom");
    let truk_nopolKolom = document.getElementById("truk_nopolKolom");
    let table_barangEksport = $("#table_barangEksport").DataTable({
        searching: false,
        paging: false,
        info: false,
        ordering: false,
    });
    let nama_customerExportKolom = document.getElementById("nama_customerExportKolom"); // prettier-ignore
    let kota_exportKolom = document.getElementById("kota_exportKolom");
    let nama_expeditorExportKolom = document.getElementById("nama_expeditorExportKolom"); // prettier-ignore
    let truk_nopolExportKolom = document.getElementById("truk_nopolExportKolom"); // prettier-ignore
    let tanggal_sjExportKolom = document.getElementById("tanggal_sjExportKolom"); // prettier-ignore
    let nomor_spExportKolom = document.getElementById("nomor_spExportKolom");
    let nama_barangKolomNo_poKolom = document.getElementById("nama_barangKolomNo_poKolom"); // prettier-ignore
    let satuan_barangPrimerKolom = document.getElementById("satuan_barangPrimerKolom"); // prettier-ignore
    let jumlah_barangPrimerKolom = document.getElementById("jumlah_barangPrimerKolom"); // prettier-ignore
    let satuan_barangSekunderKolom = document.getElementById("satuan_barangSekunderKolom"); // prettier-ignore
    let jumlah_barangSekunderKolom = document.getElementById("jumlah_barangSekunderKolom"); // prettier-ignore
    let alamat_kirimKolom = document.getElementById("alamat_kirimKolom");
    let nama_customerKolomAlamat_kolom = document.getElementById("nama_customerKolomAlamat_kolom"); //prettier-ignore
    let nama_typeBarangKolom = document.getElementById("nama_typeBarangKolom");
    let nomor_sjKolom = document.getElementById("nomor_sjKolom");
    let print_pdf = document.getElementById("print_pdf");
    let nomor_poEksportKolom = document.getElementById("nomor_poEksportKolom");
    let nama_tandaTanganKolom = document.getElementById("nama_tandaTanganKolom"); // prettier-ignore
    let jenis_barangEksportKolom = document.getElementById("jenis_barangEksportKolom"); // prettier-ignore
    let ttdModal = document.getElementById("ttdModal");
    let ttdCanvas = document.getElementById("ttdCanvas");
    let btn_clearTTD = document.getElementById("btn_clearTTD");
    let btn_simpanTTD = document.getElementById("btn_simpanTTD");
    let canvas,
        ctx,
        drawing = false;
    //#endregion

    //#region Functions
    function initCanvas() {
        canvas = document.getElementById("ttdCanvas");
        if (!canvas) return;

        ctx = canvas.getContext("2d");

        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";

        // MOUSE
        canvas.onmousedown = (e) => {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        };

        canvas.onmousemove = (e) => {
            if (!drawing) return;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        };

        canvas.onmouseup = () => (drawing = false);
        canvas.onmouseleave = () => (drawing = false);

        // TOUCH
        canvas.addEventListener("touchstart", (e) => {
            e.preventDefault();
            drawing = true;
            let t = e.touches[0];
            let rect = canvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(t.clientX - rect.left, t.clientY - rect.top);
        });

        canvas.addEventListener("touchmove", (e) => {
            e.preventDefault();
            if (!drawing) return;
            let t = e.touches[0];
            let rect = canvas.getBoundingClientRect();
            ctx.lineTo(t.clientX - rect.left, t.clientY - rect.top);
            ctx.stroke();
        });

        canvas.addEventListener("touchend", () => (drawing = false));
    }
    //#endregion

    //#region Load Form

    tanggal_sj.valueAsDate = new Date();
    surat_jalanPPN.checked = true;
    contoh_print.style.display = "none";
    // contoh_printDiv.style.display = "none";
    div_accSuratJalan.style.display = "none";
    print_pdf.style.display = "none";

    //#endregion

    //#region Event Listener

    print_button.addEventListener("click", function () {
        $("#loading-screen").css("display", "flex");
        if (no_sjText.value == "" && no_sp.value == "") {
            alert("Kolom Nomor SJ dan Nomor SP tidak boleh kosong!");
            $("#loading-screen").css("display", "none");
            return;
        }
        if (surat_jalanPPN.checked == true) {
            fetch(
            "/Kencana/cetakSuratJalanPPN/" +
                tanggal_sj.value +
                "/" +
                no_sjText.value +
                "/suratjalanppn",
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}: ${response.statusText}`,
                    );
                }

                return response.json();
            })
            .then((data) => {
                console.log("=== DEBUG CETAK SJ ===");
                console.log("Tanggal:", tanggal_sj.value);
                console.log("Nomor SJ:", no_sjText.value);
                console.log("Response:", data);
                console.log("Array?", Array.isArray(data));
                console.log("Length:", data?.length);

                if (!Array.isArray(data) || data.length === 0) {
                    console.error("Data SJ kosong:", data);

                    alert(
                        "Data Surat Jalan tidak ditemukan.\n" +
                        "Tanggal: " + tanggal_sj.value + "\n" +
                        "Nomor SJ: " + no_sjText.value
                    );

                    return;
                }

                numeral.locale("id");
                moment.locale("id");

                let qtyPrimerValue = parseFloat(data[0].QtyPrimer);
                let qtySekunderValue = parseFloat(data[0].QtySekunder);
                let qtyTritierValue = parseFloat(data[0].QtyTritier);

                contoh_printSjEksportDiv.style.width = "21cm";

                no_spKolom.innerHTML = data[0].SuratPesanan;
                nomor_sjKolom.innerHTML = "sj: " + no_sjText.value;

                nama_typeBarangKolom.innerHTML = data[0].NAMATYPEBARANG;
                nama_barangKolomNo_poKolom.innerHTML = data[0].Uraian;

                tanggal_kirimKolom.innerHTML = moment(
                    tanggal_sj.value,
                ).format("D-MMMM-YYYY");

                truk_nopolKolom.innerHTML = data[0].TrukNopol;

                if (data[0].Ket == null || data[0].Ket?.trim() == "") {
                    keterangan_tambahanKolom.style.display = "none";
                } else {
                    var ketWithLineBreaks = data[0].Ket.replace(
                        /\r\n/g,
                        " <br> ",
                    );

                    keterangan_tambahanKolom.innerHTML = ketWithLineBreaks;
                    keterangan_tambahanKolom.style.display = "block";
                }

                nama_customerKolomAlamat_kolom.innerHTML =
                    data[0].NamaCust;

                nama_customerKolomAlamat_kolom.innerHTML +=
                    "<br>" + data[0].Alamat;

                satuan_barangPrimerKolom.innerHTML =
                    data[0].satPrimer?.trim() ?? "";

                jumlah_barangPrimerKolom.innerHTML =
                    numeral(qtyPrimerValue).format("0,0.[00]");

                satuan_barangSekunderKolom.innerHTML =
                    data[0].Satuan?.trim() ?? "";

                if (
                    data[0].Satuan?.trim() ==
                    data[0].SatTRitier?.trim()
                ) {
                    jumlah_barangSekunderKolom.innerHTML =
                        numeral(qtyTritierValue).format("0,0.[00]");
                } else if (
                    data[0].Satuan?.trim() ==
                    data[0].satSekunder?.trim()
                ) {
                    jumlah_barangSekunderKolom.innerHTML =
                        numeral(qtySekunderValue).format("0,0.[00]");
                } else if (
                    data[0].Satuan?.trim() ==
                    data[0].satPrimer?.trim()
                ) {
                    jumlah_barangSekunderKolom.innerHTML =
                        numeral(qtyPrimerValue).format("0,0.[00]");
                }

                if (data[0].NO_PO !== null) {
                    nama_barangKolomNo_poKolom.innerHTML +=
                        "<br><br>PO: " + data[0].NO_PO;
                }

                alamat_kirimKolom.innerHTML =
                    "Dikirim ke: <br>" + data[0].AlamatKirim;

                contoh_print.style.display = "block";
                contoh_printDiv.style.display = "block";
                div_accSuratJalan.style.display = "flex";
                print_pdf.style.display = "inline-block";
            })
            .catch((error) => {
                console.error("Gagal mengambil data Surat Jalan:", error);
                alert("Data Surat Jalan gagal diambil.");
            })
            .finally(() => {
                $("#loading-screen").css("display", "none");
            });
        } else if (surat_jalanNonPPN.checked == true) {
            //coming not so soon
            alert("Hanya SJ PPN dan SJ Export yang dapat dipilih");
            surat_jalanPPN.checked = true;
            return;
        } else if (surat_jalanAfalan.checked == true) {
            //coming not so soon
            alert("Hanya SJ PPN dan SJ Export yang dapat dipilih");
            surat_jalanPPN.checked = true;
            return;
        } else if (surat_jalanExport.checked == true) {
            if (
                no_sjSelect.options[no_sjSelect.selectedIndex].text
                    .split(" | ")[0]
                    .includes("Export")
            ) {
                fetch(
                    "/Kencana/cetakSuratJalanPPN/" +
                        tanggal_sj.value +
                        "/" +
                        no_sjText.value +
                        "/suratjalanexport",
                )
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        contoh_printSjEksportDiv.style.width = "100%";
                        table_barangEksport.clear();
                        contoh_printDiv.style.display = "none";

                        nomor_sjExport.innerHTML =
                            "SJ No. : " + no_sjText.value;
                        moment.locale("en");
                        tanggal_sjExportKolom.innerHTML = moment(
                            tanggal_sj.value,
                        ).format("D/MMMM/YYYY");
                        truk_nopolExportKolom.innerHTML = data[0].TrukNopol;
                        nomor_spExportKolom.innerHTML = no_sp.value;
                        nama_customerExportKolom.innerHTML = data[0].NamaCust;
                        kota_exportKolom.innerHTML = data[0].Kota;
                        nama_expeditorExportKolom.innerHTML = data[0].NamaExpeditor;
                        jenis_barangEksportKolom.innerHTML = data[0].NAMATYPEBARANG;
                        const rows = data.map((item, index) => {
                            return [
                                index + 1,
                                item.NamaType, // Nama Type
                                parseInt(item.QtySekunder) +
                                    " " +
                                    item.satSekunder.trim(), // Satuan
                                parseInt(item.QtyPrimer) +
                                    " " +
                                    item.satPrimer.trim(), // QtySekunder
                            ];
                        });
                        console.log(rows);
                        table_barangEksport.rows.add(rows).draw();
                        $("#table_barangEksport tbody tr td:nth-child(2)",).addClass("second-column-width-90");
                        nomor_poEksportKolom.innerHTML =
                            "PO NO : " + data[0].NO_PO;
                        if (data[0].Ket !== null) {
                            var ketWithLineBreaks = data[0].Ket.replace(
                                /\r\n/g,
                                " <br> ",
                            ); // Replace '\r\n' with '<br>'
                            nomor_poEksportKolom.innerHTML +=
                                " <br> " + ketWithLineBreaks;
                        }

                        contoh_print.style.display = "block";
                        contoh_printSjEksportDiv.style.display = "block";
                        div_accSuratJalan.style.display = "flex";
                        print_pdf.style.display = "inline-block";
                    })
                    .finally(() => {
                        $("#loading-screen").css("display", "none");
                    });
            } else {
                alert("SJ yang dipilih bukan SJ Export!");
                no_sjSelect.focus();
                contoh_print.style.display = "none";
                contoh_printDiv.style.display = "none";
                div_accSuratJalan.style.display = "none";
                print_pdf.style.display = "none";
                $("#loading-screen").css("display", "none");
                return;
            }
        }
    });

    no_sjButton.addEventListener("click", function () {
        if (no_sjText.style.display == "inline") {
            fetch("/Kencana/optionsCetakSuratJalan/" + tanggal_sj.value)
                .then((response) => response.json())
                .then((datas) => {
                    no_sjSelect.innerHTML =
                        "<option disabled selected value>-- Pilih Nomor Surat Jalan --</option>";

                    datas.forEach((data) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = data.IDSuratPesanan;
                        optionTag.text =
                            data.NamaJnsSuratJalan + " | " + data.IDPengiriman;
                        no_sjSelect.appendChild(optionTag);
                    });

                    no_sjText.style.display = "none";
                    no_sjSelect.style.display = "inline";
                    no_sjSelect.focus();
                });
        } else if (no_sjText.style.display == "none") {
            no_sjText.style.display = "inline";
            no_sjSelect.style.display = "none";
            no_sjText.focus();
        }
    });

    no_sjSelect.addEventListener("change", function () {
        no_sjText.value =
            no_sjSelect.options[no_sjSelect.selectedIndex].text.split(" | ")[1];
        no_sp.value = no_sjSelect.value;
    });

    tanggal_sj.addEventListener("change", function () {
        if (no_sjText.style.display == "none") {
            no_sjText.style.display = "inline";
            no_sjSelect.style.display = "none";
        }
    });

    print_pdf.addEventListener("click", function (event) {
        event.preventDefault();
        window.print();
    });

    export_pdf.addEventListener("click", function () {
        $.get("/check-pdf-server", function (res) {
            if (res.alive) {
                window.open(
                    `${window.location.origin}/Kencana/cetak-sj/download-pdf/${no_sjText.value}`,
                    "_blank",
                );
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Unable to generate pdf",
                    text: "Cannot connect to pdf generator server",
                });
            }
        });
    });

    // btn_accSatpam.addEventListener("click", function () {
    //     $.ajax({
    //         url: "/CetakSJ",
    //         type: "POST",
    //         data: {
    //             jenisStore: "accSatpam",
    //             no_sj: no_sjText.value,
    //             _token: csrfToken,
    //         },
    //         success: function (response) {
    //             if (response.success) {
    //                 Swal.fire({
    //                     icon: "success",
    //                     title: "Berhasil!",
    //                     text: response.success,
    //                     showConfirmButton: false,
    //                 });
    //             } else if (response.error) {
    //                 Swal.fire({
    //                     icon: "error",
    //                     title: "Terjadi Kesalahan",
    //                     text: response.error,
    //                 });
    //             }
    //         },
    //         error: function (xhr, status, error) {
    //             console.error("Error: ", error);
    //         },
    //     });
    // });

    // btn_ttSupir.addEventListener("click", function () {
    //     const modal = new bootstrap.Modal(document.getElementById("ttdModal"));
    //     modal.show();

    //     // inisialisasi canvas SETELAH modal muncul
    //     setTimeout(initCanvas, 200);
    // });

    // btn_clearTTD.addEventListener("click", function () {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     let img = document.getElementById("ttd_preview");
    //     // img.src = base64;
    //     img.style.display = "none";
    // });

    // btn_simpanTTD.addEventListener("click", function () {
    //     let base64 = canvas.toDataURL("image/png");
    //     document.getElementById("ttdCanvas").value = base64;

    //     let img = document.getElementById("ttd_preview");
    //     img.src = base64;
    //     img.style.display = "block";

    //     bootstrap.Modal.getInstance(document.getElementById("ttdModal")).hide();
    //     console.log(base64, img);
    //     $.ajax({
    //         url: "/CetakSJ",
    //         type: "POST",
    //         data: {
    //             jenisStore: "accSupir",
    //             no_sj: no_sjText.value,
    //             ttdBase64: base64,
    //             _token: csrfToken,
    //         },
    //         success: function (response) {
    //             if (response.success) {
    //                 Swal.fire({
    //                     icon: "success",
    //                     title: "Berhasil!",
    //                     text: response.success,
    //                     showConfirmButton: false,
    //                 });
    //             } else if (response.error) {
    //                 Swal.fire({
    //                     icon: "error",
    //                     title: "Terjadi Kesalahan",
    //                     text: response.error,
    //                 });
    //             }
    //         },
    //         error: function (xhr, status, error) {
    //             console.error("Error: ", error);
    //         },
    //     });
    // });
    //#endregion
});
