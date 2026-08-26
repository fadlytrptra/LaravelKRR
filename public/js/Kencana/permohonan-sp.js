$(document).ready(function () {
    //#region Document get element by id
    let add_button = document.getElementById("add_button");
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let delete_button = document.getElementById("delete_button");
    let div_detailSuratPesanan = document.getElementById("div_detailSuratPesanan"); // prettier-ignore
    let div_headerSuratPesanan = document.getElementById("div_headerSuratPesanan"); // prettier-ignore
    let div_tabelSuratPesanan = document.getElementById("div_tabelSuratPesanan"); // prettier-ignore
    let edit_button = document.getElementById("edit_button");
    let enter_kodeBarang = document.getElementById("enter_kodeBarang");
    // let faktur_pjkBiasa = document.getElementById("faktur_pjkBiasa");
    // let faktur_pjkSederhana = document.getElementById("faktur_pjkSederhana");
    let form_suratPesanan = document.getElementById("form_suratPesanan");
    let hapus_button = document.getElementById("hapus_button");
    let harga_satuan = document.getElementById("harga_satuan");
    let isi_button = document.getElementById("isi_button");
    let jenis_bayar = document.getElementById("jenis_bayar");
    let jenis_brg = document.getElementById("jenis_brg");
    let jenis_sp = document.getElementById("jenis_sp");
    let kategori = document.getElementById("kategori");
    let kategori_utama = document.getElementById("kategori_utama");
    let keterangan = document.getElementById("keterangan");
    let kode_barang = document.getElementById("kode_barang");
    let kodeStJual;
    let kodeStPrim;
    let kodeStSek;
    let kodeStTri;
    let trigger = 0;
    let div_saldoInventory = document.getElementById("div_saldoInventory");
    let list_customer = document.getElementById("list_customer");
    let list_noSP = document.getElementById("list_noSP");
    let list_sales = document.getElementById("list_sales");
    let table_saldoInventory = $("#table_saldoInventory").DataTable();
    let list_view = $("#list_view").DataTable();
    let table_listView = document.getElementById("list_view");
    let mata_uang = document.getElementById("mata_uang");
    let nama_barang = document.getElementById("nama_barang");
    let no_pi = document.getElementById("no_pi");
    let no_po = document.getElementById("no_po");
    let no_spSelect = document.getElementById("no_spSelect");
    let no_spText = document.getElementById("no_spText");
    let no_suratPesanan = document.getElementById("no_suratPesanan");
    let ppn = document.getElementById("ppn");
    let proses = 0;
    let qty_pesan = document.getElementById("qty_pesan");
    let rencana_kirim = document.getElementById("rencana_kirim");
    let satuan_jual = document.getElementById("satuan_jual");
    let satuan_primer = document.getElementById("satuan_primer");
    let satuan_sekunder = document.getElementById("satuan_sekunder");
    let satuan_tritier = document.getElementById("satuan_tritier");
    let sub_kategori = document.getElementById("sub_kategori");
    let syarat_bayar = document.getElementById("syarat_bayar");
    let tgl_pesan = document.getElementById("tgl_pesan");
    let tgl_po = document.getElementById("tgl_po");
    let total_cost = document.getElementById("total_cost");
    let update_button = document.getElementById("update_button");
    let createSPModal = document.getElementById("createSPModal");
    let btn_tambahModal = document.getElementById("btn_tambahModal");
    let lbl_lunas = document.getElementById("lbl_lunas");
    let lunas = document.getElementById("lunas");
    let terkirim = document.getElementById("terkirim");
    let jml_terkirim = document.getElementById("jml_terkirim");

    edit_button.style.display = "none";

    //#endregion

    //#region Load Form

    setInputFilter(
        document.getElementById("qty_pesan"),
        function (value) {
            return /^-?\d*[.]?\d*$/.test(value);
        },
        "Must be a floating (real) number",
    );
    setInputFilter(
        document.getElementById("harga_satuan"),
        function (value) {
            return /^-?\d*[.]?\d*$/.test(value);
        },
        "Must be a floating (real) number",
    );
    setInputFilter(
        document.getElementById("syarat_bayar"),
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!",
    );
    setInputFilter(
        document.getElementById("kode_barang"),
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!",
    );
    tgl_pesan.valueAsDate = new Date();
    tgl_po.valueAsDate = new Date();
    rencana_kirim.valueAsDate = new Date();
    isi_button.focus();
    div_headerSuratPesanan.classList.toggle("disabled");
    div_tabelSuratPesanan.classList.toggle("disabled");
    div_detailSuratPesanan.classList.toggle("disabled");

    //#endregion

    //#region Funtion

    function formatangka(objek) {
        // console.log(objek); // Output the provided number for debugging purposes

        // Check if the number has decimal places
        if (Number.isInteger(objek)) {
            return objek.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            let parts = objek.toFixed(3).split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".").replace(/\.?0+$/, "");
        }
    }

    //#endregion

    //#region enter-enter

    no_po.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tgl_po.focus();
        }
    });

    tgl_po.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            no_pi.focus();
        }
    });

    no_pi.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            list_sales.focus();
        }
    });

    mata_uang.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            jenis_bayar.focus();
        }
    });

    syarat_bayar.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            keterangan.focus();
        }
    });

    // faktur_pjkBiasa.addEventListener("keypress", function (event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         keterangan.focus();
    //     }
    // });

    // faktur_pjkSederhana.addEventListener("keypress", function (event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         keterangan.focus();
    //     }
    // });

    qty_pesan.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            harga_satuan.addEventListener("focus", function (event) {
                // Set the cursor position to the start of the value
                harga_satuan.selectionStart = 0;
            });
            harga_satuan.focus();
        }
    });

    harga_satuan.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            satuan_jual.focus();
        }
    });

    satuan_jual.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            rencana_kirim.focus();
        }
    });

    rencana_kirim.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            add_button.focus();
        }
    });

    tgl_pesan.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            jenis_sp.focus();
        }
    });

    tgl_po.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            no_pi.focus();
        }
    });

    jenis_sp.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            no_spText.focus();
        }
    });

    no_spText.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            list_customer.focus();
        }
    });

    list_customer.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            no_po.focus();
        }
    });

    list_sales.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            mata_uang.focus();
        }
    });

    jenis_bayar.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            syarat_bayar.focus();
        }
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

    //#endregion

    //#region Add Event Listener

    edit_button.style.display = "block";
    div_tabelSuratPesanan.classList.toggle("disabled");
    div_detailSuratPesanan.classList.toggle("disabled");
    div_headerSuratPesanan.classList.toggle("disabled");
    proses = 1;
    this.innerHTML = "Proses";
    edit_button.innerHTML = "Tutup";
    hapus_button.style.display = "none";
    mata_uang.value = "IDR";
    jenis_sp.selectedIndex = 1;
    list_noSP.disabled = true;

    createSPModal.addEventListener("shown.bs.modal", function (event) {
        setTimeout(() => {
            tgl_pesan.focus();
        }, 300);
    });

    let lbl_sp = document.getElementById("lbl_sp");
    let createSPModalLabel = document.getElementById("createSPModalLabel");

    if ($("#headerCard")[0].innerHTML !== "Surat Pesanan Belum ACC Manager") {
        btn_tambahModal.addEventListener("click", function (event) {
            event.preventDefault();
            funcClearHeaderPesanan();
            funcClearInputBarang();
            list_view.clear().draw();
            mata_uang.value = "IDR";
            jenis_sp.selectedIndex = 1;
            lbl_sp.style.display = "none";
            lbl_lunas.style.display = "none";
            lunas.style.display = "none";
            createSPModalLabel.innerHTML = "Tambah Surat Pesanan";
            terkirim.style.display = "none";
            jml_terkirim.style.display = "none";
            generateNoSP();
            $("#createSPModal").modal("show");
        });
    }

    function formatDate(dateString) {
        let datePart;

        if (dateString !== null) {
            // Split the date string and get the date part
            datePart = dateString.split(" ")[0];
        } else {
            // If dateString is null, use the current date and format it as yyyy-MM-dd
            const currentDate = new Date();
            datePart = currentDate.toISOString().split("T")[0];
        }

        return datePart; // Returns only the date in yyyy-MM-dd format
    }

    let arrayTabel = [];

    $(document).on("click", "#btn_penyesuaian", function (event) {
        event.preventDefault();
        funcClearHeaderPesanan();
        funcClearInputBarang();
        list_view.clear().draw();
        $("#createSPModal").modal("show");
        createSPModalLabel.innerHTML = "Penyesuaian Surat Pesanan";
        lbl_sp.style.display = "block";
        terkirim.style.display = "block";
        jml_terkirim.style.display = "block";
        no_spText.style.display = "block";
        lbl_lunas.style.display = "block";
        lunas.style.display = "block";

        let no_spValue = $(this).data("nosp");

        $.ajax({
            url: "/Kencana/SuratPesanan/Copy?no_sp=" + no_spValue,
            type: "GET",
            success: function (response) {
                console.log(response);
                console.log(response.length > 0);

                if (response.length > 0) {
                    tgl_pesan.value = formatDate(response[0].Tgl_Pesan);
                    jenis_sp.value = response[0].IDJnsSuratPesanan;
                    no_spText.value = response[0].IDSuratPesanan;
                    list_customer.value = response[0].IDCust;
                    no_po.value = response[0].NO_PO;
                    tgl_po.value = formatDate(response[0].Tgl_PO);
                    no_pi.value = response[0].NO_PI;
                    list_sales.value = response[0].IDSales;
                    mata_uang.value = response[0].IDMataUang;
                    jenis_bayar.value = response[0].IDPembayaran;
                    syarat_bayar.value = response[0].SyaratBayar;
                    keterangan.value = response[0].Ket;
                    // if (response[0].JnsFakturPjk == "0") {
                    //     faktur_pjkBiasa.value = response[0].JnsFakturPjk;
                    // } else {
                    //     faktur_pjkSederhana.value = response[0].JnsFakturPjk;
                    // }

                    $.ajax({
                        url: "/Kencana/SuratPesanan/CopyDetails?no_sp=" + no_spValue,
                        type: "GET",
                        success: function (data) {
                            console.log("========== COPY DETAILS KENCANA ==========");
                            console.log("no SP:", no_spValue);
                            console.log("response:", data);
                            console.log("data:", data.data);
                            console.log("jumlah:", data.data ? data.data.length : 0);

                            // Initialize arrayTabel
                            var arrayTabel = [];

                            // Iterate over data array using forEach and push formatted data to arrayTabel
                            data.data.forEach(function (item) {
                                arrayTabel.push([
                                    item.namabarang,
                                    item.IDBarang,
                                    numeral(
                                        parseFloat(item.HargaSatuan),
                                    ).format("0.00000"),
                                    numeral(parseFloat(item.Qty)).format(
                                        "0,0.00",
                                    ),
                                    numeral(item.TerKirim).format("0,0.00"),
                                    item.Satuan,
                                    formatDate(item.TglRencanaKirim),
                                    item.Lunas,
                                    item.PPN,
                                    item.IDJnsBarang,
                                    item.IDPesanan,
                                    item.Informasi,
                                ]);
                            });

                            console.log("arrayTabel:", arrayTabel);

                            for (
                                let index = 0;
                                index < arrayTabel.length;
                                index++
                            ) {
                                funcInsertRow(arrayTabel[index]);
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Kesalahan!",
                        text: "Gagal mengambil data!",
                        showConfirmButton: true,
                    }).then(() => {
                        $("#createSPModal").modal("hide");
                    });
                }
            },
            error: function (xhr) {
                Swal.fire({
                    icon: "error",
                    title: "Kesalahan!",
                    text: "Terjadi kesalahan.",
                    showConfirmButton: true,
                });
            },
        });
    });

    isi_button.addEventListener("click", function (event) {
        event.preventDefault();
        if (createSPModalLabel.innerHTML == "Tambah Surat Pesanan") {
            funcDatatablesIntoInput();
            // Ambil form data menggunakan FormData
            var formData = new FormData(form_suratPesanan);
            if (no_spText.value == "") {
                Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Nomor SP tidak boleh kosong",
                    returnFocus: false,
                }).then(() => {
                    no_spText.focus();
                });
                return;
            }
            $.ajax({
                url: "/Kencana/SuratPesanan",
                type: "POST",
                data: formData,
                processData: false, // Jangan proses data karena FormData sudah ter-serialize
                contentType: false, // Biarkan jQuery menentukan content type
                headers: {
                    "X-CSRF-TOKEN": csrfToken, // Kirim token CSRF secara manual
                },
                success: function (response) {
                    console.log(response);

                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                        }).then(() => {
                            funcClearHeaderPesanan();
                            funcClearInputBarang();
                            list_view.clear().draw();
                            removeHiddenInputsWithoutToken();
                            $("#createSPModal").modal("hide");
                            // Lakukan tindakan setelah sukses
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: "info",
                            title: "Info!",
                            text: response.error,
                            showConfirmButton: false,
                        }).then(() => {
                            removeHiddenInputsWithoutToken();
                        });
                    }
                },
                error: function (xhr) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Something went wrong.",
                        showConfirmButton: true,
                    }).then(() => {
                        removeHiddenInputsWithoutToken();
                    });
                },
            });
        } else if (
            createSPModalLabel.innerHTML == "Penyesuaian Surat Pesanan"
        ) {
            funcDatatablesIntoInput();
            // Ambil form data menggunakan FormData
            var formData = new FormData(form_suratPesanan);

            $.ajax({
                // url: "/SuratPesanan/" + no_spText.value + "/up",
                url: "/Kencana/penyesuaiansp/koreksi",
                type: "POST",
                data: formData,
                processData: false, // Jangan proses data karena FormData sudah ter-serialize
                contentType: false, // Biarkan jQuery menentukan content type
                headers: {
                    "X-CSRF-TOKEN": csrfToken, // Kirim token CSRF secara manual
                },
                success: function (response) {
                    console.log(response);

                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                        }).then(() => {
                            funcClearHeaderPesanan();
                            funcClearInputBarang();
                            list_view.clear().draw();
                            removeHiddenInputsWithoutToken();
                            // Lakukan tindakan setelah sukses
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: "info",
                            title: "Info!",
                            text: response.error,
                            showConfirmButton: false,
                        }).then(() => {
                            removeHiddenInputsWithoutToken();
                        });
                    }
                },
                error: function (xhr) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Something went wrong.",
                        showConfirmButton: true,
                    }).then(() => {
                        removeHiddenInputsWithoutToken();
                    });
                },
            });
        } else if (createSPModalLabel.innerHTML == "Salin Surat Pesanan") {
            funcDatatablesIntoInput();
            // Ambil form data menggunakan FormData
            var formData = new FormData(form_suratPesanan);
            console.log(formData);

            $.ajax({
                url: "/Kencana/SuratPesanan",
                type: "POST",
                data: formData,
                processData: false, // Jangan proses data karena FormData sudah ter-serialize
                contentType: false, // Biarkan jQuery menentukan content type
                headers: {
                    "X-CSRF-TOKEN": csrfToken, // Kirim token CSRF secara manual
                },
                success: function (response) {
                    console.log(response);

                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                        }).then(() => {
                            funcClearHeaderPesanan();
                            funcClearInputBarang();
                            list_view.clear().draw();
                            removeHiddenInputsWithoutToken();
                            // Lakukan tindakan setelah sukses
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: "info",
                            title: "Info!",
                            text: response.error,
                            showConfirmButton: false,
                        }).then(() => {
                            removeHiddenInputsWithoutToken();
                        });
                    }
                },
                error: function (xhr) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Something went wrong.",
                        showConfirmButton: true,
                    }).then(() => {
                        removeHiddenInputsWithoutToken();
                    });
                },
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Something went wrong.",
                showConfirmButton: true,
            }).then(() => {
                removeHiddenInputsWithoutToken();
            });
        }
    });

    edit_button.addEventListener("click", function (event) {
        event.preventDefault();
        if (proses == 0) {
            // enableElements();
            div_headerSuratPesanan.classList.toggle("disabled");
            proses = 2;
            this.innerHTML = "Batal";
            isi_button.innerHTML = "Proses";
            hapus_button.style.display = "none";
            no_spSelect.disabled = false;
            mata_uang.value = "IDR";
            list_noSP.disabled = false;

            //harus isi Nomor SP dulu!
            no_spText.focus();
            no_spText.readOnly = false;
            funcHeaderDisabled(true);
        } else {
            funcClearHeaderPesanan();
            funcClearInputBarang();
            // funcHeaderDisabled(false);
            list_view.clear().draw();
            $("#createSPModal").modal("hide");
            // disableElements();
            proses = 1;
        }
    });

    hapus_button.addEventListener("click", function (event) {
        event.preventDefault();
        if (proses == 0) {
            no_spSelect.disabled = false;
            list_noSP.disabled = false;
            div_headerSuratPesanan.classList.toggle("disabled");
            div_tabelSuratPesanan.classList.toggle("disabled");
            div_detailSuratPesanan.classList.toggle("disabled");
            no_spText.readOnly = false;
            no_spText.focus();
            funcHeaderDisabled(true);
            // enableElements();
            proses = 3;
            isi_button.innerHTML = "Proses";
            edit_button.innerHTML = "Batal";
            this.style.display = "none";
        }
    });

    jenis_brg.addEventListener("change", function () {
        if (ppn.value === "EXCLUDE") {
            return;
        }
        kode_barang.readOnly = false;
        kode_barang.focus();
        enter_kodeBarang.style.display = "block";
        satuan_primer.value = "";
        satuan_sekunder.value = "";
        satuan_tritier.value = "";
        satuan_jual.selectedIndex = "0";
        kategori_utama.selectedIndex = "0";
        kategori.innerHTML = "";
        sub_kategori.innerHTML = "";
        nama_barang.innerHTML = "";
    });

    kategori_utama.addEventListener("change", function () {
        // Code to retrieve options for the second select input based on the selected value of the first select input
        let kategoriUtama = this.value; // Use the value of the first select input as the firstValue variable
        enter_kodeBarang.style.display = "none";
        kategori.disabled = false;
        sub_kategori.disabled = false;
        nama_barang.disabled = false;
        kategori.focus();
        fetch("/Kencana/options/kategori/" + kategoriUtama)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                kategori.innerHTML =
                    "<option disabled selected value>-- Pilih Kategori --</option>";
                options.forEach((option) => {
                    let optionTag = document.createElement("option");
                    optionTag.value = option.no_kategori;
                    optionTag.text = option.nama_kategori;
                    kategori.appendChild(optionTag);
                });
                sub_kategori.innerHTML =
                    "<option disabled selected value>-- Pilih Sub Kategori --</option>";
                nama_barang.innerHTML =
                    "<option disabled selected value>-- Pilih Nama Barang --</option>";
                satuan_jual.disabled = false;
                // fetch("/listsatuan/")
                //     .then((response) => response.json())
                //     .then((options) => {
                //         satuan_jual.innerHTML =
                //             "<option selected value>-- Pilih Satuan Jual --</option>";
                //         options.forEach((option) => {
                //             let optionTag = document.createElement("option");
                //             optionTag.value = option.No_satuan;
                //             optionTag.text = option.Nama_satuan;
                //             satuan_jual.appendChild(optionTag);
                //             satuan_jual.selectedIndex = 0;
                //         });
                //     });
                // funcClearInputBarang();
            });
    });

    kategori.addEventListener("change", function () {
        // Code to retrieve options for the second select input based on the selected value of the first select input
        let kategori = this.value; // Use the value of the first select input as the firstValue variable
        sub_kategori.focus();
        fetch("/Kencana/options/subKategori/" + kategori)
            .then((response) => response.json())
            .then((options) => {
                sub_kategori.innerHTML =
                    "<option disabled selected value>-- Pilih Sub Kategori --</option>";
                options.forEach((option) => {
                    let optionTag = document.createElement("option");
                    optionTag.value = option.no_sub_kategori;
                    optionTag.text = option.nama_sub_kategori;
                    sub_kategori.appendChild(optionTag);
                });
            });
    });

    sub_kategori.addEventListener("change", function () {
        const subKategori = this.value;
        console.log("SUB KATEGORI:", subKategori);

        const isExport =
            jenis_sp.options[jenis_sp.selectedIndex]
                .text
                .trim() === "SP EXPORT";

        const url = isExport
            ? "/Kencana/options/namaBarangExport/" + encodeURIComponent(subKategori)
            : "/Kencana/options/namaBarang/" + encodeURIComponent(subKategori);

        console.log("REQUEST:", url);

        // Bersihkan dropdown
        nama_barang.innerHTML =
            '<option value="" disabled selected>-- Pilih Nama Barang --</option>';

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            cache: false,

            success: function (options) {

                console.log("RESPONSE:", options);
                console.log("JUMLAH RESPONSE:", options.length);

                // Pastikan dropdown dikosongkan lagi
                nama_barang.innerHTML =
                    '<option value="" disabled selected>-- Pilih Nama Barang --</option>';

                options.forEach(function (option) {

                    const optionTag =
                        document.createElement("option");

                    optionTag.value = option.KD_BRG;
                    optionTag.textContent = option.NAMA_BRG;

                    nama_barang.appendChild(optionTag);
                });

                console.log(
                    "JUMLAH OPTION:",
                    nama_barang.options.length
                );

                const ppmfPutih =
                    Array.from(nama_barang.options)
                        .find(function (option) {
                            return option.textContent.trim()
                                .toUpperCase() === "BENANG PPMF PUTIH";
                        });

                console.log(
                    "BENANG PPMF PUTIH DI DOM:",
                    ppmfPutih
                );
            },

            error: function (xhr) {

                console.error(
                    "Gagal mengambil nama barang:",
                    xhr.responseText
                );

                nama_barang.innerHTML =
                    '<option value="" disabled selected>-- Gagal memuat barang --</option>';
            }
        });
    });

    nama_barang.addEventListener("change", function () {
        let namaBarang = this.value;
        kode_barang.value = namaBarang;
        qty_pesan.focus();
        qty_pesan.addEventListener("focus", function (event) {
            // Set the cursor position to the start of the value
            qty_pesan.selectionStart = 0;
        });
        ppn.value = "EXCLUDE";
        // ppn.readOnly = true;
        document.getElementById("kode_barang").readOnly = true;

        //Isi Satuan INV
        fetch("/Kencana/satuan/" + namaBarang)
            .then((response) => response.json())
            .then((data) => {
                console.log(data[0]);
                satuan_primer.value =
                    data[0].SatPrimer.trim() +
                    " (Primer)               -" +
                    data[0].ST_PRIM;
                satuan_sekunder.value =
                    data[0].SatSekunder.trim() +
                    " (Sekunder)               -" +
                    data[0].ST_SEK;
                satuan_tritier.value =
                    data[0].Nama_satuan.trim() +
                    " (Tritier)               -" +
                    data[0].ST_TRI;
                kodeStPrim = satuan_primer.value.split("-").pop();
                kodeStSek = satuan_sekunder.value.split("-").pop();
                kodeStTri = satuan_tritier.value.split("-").pop();
                // kodeStJual = data[0].NO_SATUAN_UMUM + ' - ' + data[0].SatUmum;
                // console.log(kodeStJual);
                const options = satuan_jual.options;
                for (let i = 0; i < options.length; i++) {
                    const option = options[i];
                    // console.log(option);
                    if (option.value === data[0].NO_SATUAN_UMUM) {
                        option.selected = true;
                        break;
                    }
                }
                document.getElementById("satuan_primer").readOnly = true;
                document.getElementById("satuan_sekunder").readOnly = true;
                document.getElementById("satuan_tritier").readOnly = true;
            });
        // console.log(kategoriUtama.value);
    });

    kode_barang.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let kodeBarang9digit;
            kodeBarang9digit = document.getElementById("kode_barang");
            // console.log(kodeBarang9digit.value);
            // alert('Kode barang dienter');
            if (kodeBarang9digit.value.length < 9) {
                // alert("kode barang tidak sesuai");
                kodeBarang9digit.value = kode_barang.value.padStart(9, "0");
                // console.log(kodeBarang9digit.value);
            }
            kode_barang.value = kodeBarang9digit.value;
            fetch("/Kencana/satuan1/" + kode_barang.value)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data[0]);
                    const optionKategoriUtama = kategori_utama.options;
                    for (let i = 0; i < optionKategoriUtama.length; i++) {
                        const option = optionKategoriUtama[i];
                        if (option.value === data[0].no_kat_utama) {
                            option.selected = true;
                            break;
                        }
                    }
                    kategori.innerHTML = "";
                    sub_kategori.innerHTML = "";
                    nama_barang.innerHTML = "";
                    //add option kategori sampai nama barang
                    let optionKategori = document.createElement("option");
                    optionKategori.value = data[0].no_kategori;
                    optionKategori.text = data[0].nama_kategori;
                    kategori.appendChild(optionKategori);
                    let optionSubKategori = document.createElement("option");
                    optionSubKategori.value = data[0].no_sub_kategori;
                    optionSubKategori.text = data[0].nama_sub_kategori;
                    sub_kategori.appendChild(optionSubKategori);
                    let optionNamaBarang = document.createElement("option");
                    optionNamaBarang.value = data[0].KodeBarang;
                    optionNamaBarang.text = data[0].NAMA_BRG;
                    nama_barang.appendChild(optionNamaBarang);
                    //Isi data satuan
                    const optionSatuanJual = satuan_jual.options;
                    for (let i = 0; i < optionSatuanJual.length; i++) {
                        const option = optionSatuanJual[i];
                        // console.log(option);
                        if (option.value === data[0].NO_SATUAN_UMUM) {
                            option.selected = true;
                            break;
                        }
                    }
                    ppn.value = "EXCLUDE";
                    // ppn.readOnly = true;
                    rencana_kirim.valueAsDate = new Date();
                    satuan_primer.value = data[0].SatPrimer;
                    satuan_sekunder.value = data[0].SatSekunder;
                    satuan_tritier.value = data[0].Nama_satuan;
                });
            qty_pesan.focus();
        }
    });

    satuan_jual.addEventListener("change", function () {
        funcTampilBeratStandardKGM();
    });

    add_button.addEventListener("click", function (event) {
        event.preventDefault();
        if (kode_barang.value === "") {
            alert("Tidak ada barang yang dimasukan");
            return;
        } else if (
            jenis_brg.selectedIndex === -1 ||
            jenis_brg.selectedIndex === 0
        ) {
            alert("Pilih jenis barang!");
            jenis_brg.focus();
            return;
        } else if (qty_pesan.value <= 0) {
            alert("Quantity pesan harap diisi!");
            qty_pesan.focus();
            return;
        } else if (harga_satuan.value < 0 || harga_satuan.value == "") {
            alert("Harga satuan harap diisi");
            harga_satuan.focus();
            return;
        }
        const arraydata = [
            nama_barang.options[nama_barang.selectedIndex].text,
            kode_barang.value,
            numeral(parseFloat(harga_satuan.value)).format("0.00000"), //prettier-ignore
            numeral(parseFloat(qty_pesan.value)).format("0,0.00"), // Adjust format as needed
            numeral(parseFloat(0)).format("0,0.00"),
            satuan_jual.options[satuan_jual.selectedIndex].text,
            rencana_kirim.value,
            "",
            ppn.value,
            jenis_brg.value,
            "",
            "",
        ];
        // Insert array into a new row
        funcInsertRow(arraydata);
        funcClearInputBarang();
        jenis_brg.selectedIndex = 0;
        kategori_utama.selectedIndex = 0;
        kategori.innerHTML = "";
        kategori.disabled = false;
        sub_kategori.innerHTML = "";
        sub_kategori.disabled = false;
        nama_barang.innerHTML = "";
        nama_barang.disabled = false;
        kode_barang.readOnly = true;
        enter_kodeBarang.style.display = "none";
        qty_pesan.value = "";
        harga_satuan.value = "";
        // jenisBarang.focus();
        let confirmation = confirm("Apakah ingin menambah barang?");

        if (confirmation) {
            jenis_brg.focus();
        } else {
            isi_button.focus();
        }
    });

    update_button.addEventListener("click", function (event) {
        event.preventDefault();
        let selectedRow = $("#list_view tbody tr.selected");

        if (selectedRow.length > 0) {
            let table = $("#list_view").DataTable();
            let rowData = table.row(selectedRow).data();

            // Update the values in the rowData array
            rowData[0] = nama_barang.options[nama_barang.selectedIndex].text;
            rowData[1] = kode_barang.value;
            rowData[2] = numeral(parseFloat(harga_satuan.value)).format("0.00000"); //prettier-ignore
            rowData[3] = numeral(parseFloat(qty_pesan.value)).format("0,0.00"); // Adjust format as needed
            rowData[4] = numeral(terkirim.value).format("0,0.00");
            rowData[5] = satuan_jual.options[satuan_jual.selectedIndex].text;
            rowData[6] = rencana_kirim.value;
            rowData[7] = lunas.value;
            rowData[8] = ppn.value;
            rowData[9] = jenis_brg.value;
            console.log(rowData);

            // Update the data in the DataTable
            table.row(selectedRow).data(rowData).draw();
            // remove highlight from selected row
            selectedRow.toggleClass("selected");
            // clear input fields
            funcClearInputBarang();
            jenis_brg.selectedIndex = 0;
            kategori_utama.selectedIndex = 0;
            kategori.innerHTML = "";
            kategori.disabled = false;
            sub_kategori.innerHTML = "";
            sub_kategori.disabled = false;
            nama_barang.innerHTML = "";
            nama_barang.disabled = false;
            enter_kodeBarang.style.display = "none";
            qty_pesan.value = "";
            harga_satuan.value = "";
            jenis_brg.focus();
            // Update the table display
            $("#list_view").DataTable().draw();
        }
    });

    delete_button.addEventListener("click", function (event) {
        event.preventDefault();
        let selectedRow = $("#list_view tbody tr.selected");
        console.log(selectedRow.find("td").eq(29).text() !== "");
        let table = $("#list_view").DataTable();
        if (
            createSPModalLabel.innerHTML == "Tambah Surat Pesanan" ||
            createSPModalLabel.innerHTML == "Salin Surat Pesanan"
        ) {
            if (selectedRow.length > 0) {
                let rowIndex = table.row(selectedRow).index();

                // Remove the selected row from the DataTable
                table.row(selectedRow).remove().draw();
                alert("Data sudah terhapus dari tabel!");
            } else {
                alert("Tidak ada data yang dihapus");
            }
        } else if (
            createSPModalLabel.innerHTML == "Penyesuaian Surat Pesanan"
        ) {
            if (selectedRow.length > 0) {
                let idPesanan = selectedRow.find("td").eq(10).text().trim();

                if (idPesanan !== "") {
                    fetch("/Kencana/deletedetail/" + idPesanan)
                        .then((response) => response.json())
                        .then((data) => {
                            alert(data);

                            // Hanya hapus row jika respons dari server bukan error
                            if (
                                data !==
                                "Data tidak bisa dihapus karena ada DO!"
                            ) {
                                table.row(selectedRow).remove().draw();
                            }
                        })
                        .catch((error) => {
                            alert("Terjadi kesalahan saat menghapus data!");
                            console.error("Error:", error);
                        });
                } else {
                    table.row(selectedRow).remove().draw();
                    alert("Data sudah terhapus dari tabel!");
                }
            } else {
                alert("Tidak ada data yang dihapus");
            }
        }
        funcClearInputBarang();
        jenis_brg.selectedIndex = 0;
        kategori_utama.selectedIndex = 0;
        kategori.innerHTML = "";
        kategori.disabled = false;
        sub_kategori.innerHTML = "";
        sub_kategori.disabled = false;
        nama_barang.innerHTML = "";
        nama_barang.disabled = false;
        enter_kodeBarang.style.display = "none";
        qty_pesan.value = "";
        harga_satuan.value = "";
        jenis_brg.focus();
    });

    //#endregion

    //#region Function

    function funcClearHeaderPesanan() {
        tgl_pesan.valueAsDate = new Date();
        jenis_sp.selectedIndex = 0;
        no_spText.value = "";
        no_spSelect.selectedIndex = 0;
        list_sales.selectedIndex = 0;
        list_customer.selectedIndex = 0;
        no_po.value = "";
        tgl_po.valueAsDate = new Date();
        no_pi.value = "";
        mata_uang.value = "";
        jenis_bayar.selectedIndex = 0;
        syarat_bayar.value = "";
        // faktur_pjkBiasa.checked = true;
        keterangan.value = "";
    }

    function funcClearInputBarang() {
        jenis_brg.selectedIndex = 0;
        kategori_utama.selectedIndex = 0;
        kategori.innerHTML = "";
        sub_kategori.innerHTML = "";
        nama_barang.innerHTML = "";
        satuan_jual.selectedIndex = 0;
        qty_pesan.value = "";
        harga_satuan.value = "";
        rencana_kirim.valueAsDate = new Date();
        ppn.value = "";
        satuan_primer.value = "";
        satuan_sekunder.value = "";
        satuan_tritier.value = "";
        kode_barang.readOnly = true;
        kode_barang.value = "";
        lunas.value = "";
    }

    function funcHeaderDisabled(bool) {
        tgl_pesan.readOnly = bool;
        jenis_sp.disabled = bool;
        list_customer.disabled = bool;
        no_po.readOnly = bool;
        no_pi.readOnly = bool;
        tgl_po.readOnly = bool;
        list_sales.disabled = bool;
        mata_uang.readOnly = bool;
        jenis_bayar.disabled = bool;
        syarat_bayar.readOnly = bool;
        keterangan.readOnly = bool;
        // faktur_pjkBiasa.disabled = bool;
        // faktur_pjkSederhana.disabled = bool;
    }

    function generateNoSP() {
        $.ajax({
            url: "/Kencana/SuratPesanan/getLatestNomorSP",
            type: "GET",
            success: function (response) {
                if (response.length > 0) {
                    let newNoSP = parseInt(response[0].Nilai) + 1;
                    no_spText.value = newNoSP.toString().padStart(6, "0");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Kesalahan!",
                        text: "Gagal mengambil data nomor SP!",
                        showConfirmButton: true,
                    });
                }
            },
            error: function (xhr) {
                Swal.fire({
                    icon: "error",
                    title: "Kesalahan!",
                    text: "Terjadi kesalahan mengambil data nomor SP.",
                    showConfirmButton: true,
                });
            },
        });
    }

    function funcInsertRow(array) {
        // console.log(array);

        let isDataInTable = false;
        const table = $("#list_view").DataTable();
        // console.log(table.rows.length);
        if (table.data().length > 0) {
            table.rows().every(function () {
                const rowData = this.data();
                const columnValue = rowData[1]; // Assuming you want to compare the second column

                // Compare the column value with your desired value
                if (columnValue === kode_barang.value) {
                    // Perform your desired action here
                    isDataInTable = true;
                }
            });
        }
        // table.clear();
        if (isDataInTable) {
            alert("Data barang sudah ada");
            table_listView.focus();
        } else {
            table.row.add(array);
            table.draw();
            $("#list_view tbody").off("click", "tr");
            $("#list_view tbody").on("click", "tr", function () {
                if (
                    createSPModalLabel.innerHTML == "Salin Surat Pesanan" ||
                    createSPModalLabel.innerHTML == "Tambah Surat Pesanan"
                ) {
                    let checkSelectedRows = $("#list_view tbody tr.selected");

                    if (checkSelectedRows.length > 0) {
                        // Remove "selected" class from previously selected rows
                        checkSelectedRows.removeClass("selected");
                    }
                    $(this).toggleClass("selected");
                    let selectedRows = table.rows(".selected").data().toArray();
                    // console.log(selectedRows);
                    qty_pesan.value = parseFloat(
                        selectedRows[0][3].replace(/,/g, ""),
                    );
                    harga_satuan.value = parseFloat(
                        selectedRows[0][2].replace(/,/g, ""),
                    );
                    ppn.value = selectedRows[0][8];
                    satuan_jual.selectedIndex = 0;
                    for (let i = 0; i < satuan_jual.length; i++) {
                        // console.log(satuanJual.selectedIndex);
                        satuan_jual.selectedIndex += 1;
                        if (
                            satuan_jual.options[satuan_jual.selectedIndex]
                                .text === selectedRows[0][5].trim()
                        ) {
                            break;
                        }
                    }
                    jenis_brg.value = selectedRows[0][9];
                    rencana_kirim.value = selectedRows[0][6];
                    terkirim.value = numeral(selectedRows[0][4]).format("0");
                    let optionNamaBarang = document.createElement("option");
                    optionNamaBarang.value = selectedRows[0][1];
                    optionNamaBarang.text = selectedRows[0][0];
                    nama_barang.appendChild(optionNamaBarang);
                    kode_barang.value = selectedRows[0][1];
                    kode_barang.readOnly = false;
                    lunas.value = selectedRows[0][7];
                    funcDisplayDataBrg(selectedRows[0][1]);
                } else {
                    let checkSelectedRows = $("#list_view tbody tr.selected");

                    if (checkSelectedRows.length > 0) {
                        // Remove "selected" class from previously selected rows
                        checkSelectedRows.removeClass("selected");
                    }
                    $(this).toggleClass("selected");
                    let selectedRows = table.rows(".selected").data().toArray();
                    // console.log(selectedRows);
                    qty_pesan.value = parseFloat(
                        selectedRows[0][3].replace(/,/g, ""),
                    );
                    harga_satuan.value = parseFloat(
                        selectedRows[0][2].replace(/,/g, ""),
                    );
                    ppn.value = selectedRows[0][8];
                    satuan_jual.selectedIndex = 0;
                    for (let i = 0; i < satuan_jual.length; i++) {
                        // console.log(satuanJual.selectedIndex);
                        satuan_jual.selectedIndex += 1;
                        if (
                            satuan_jual.options[satuan_jual.selectedIndex]
                                .text === selectedRows[0][5].trim()
                        ) {
                            break;
                        }
                    }
                    jenis_brg.value = selectedRows[0][9];
                    rencana_kirim.value = selectedRows[0][6];
                    terkirim.value = numeral(selectedRows[0][4]).format("0");
                    let optionNamaBarang = document.createElement("option");
                    optionNamaBarang.value = selectedRows[0][1];
                    optionNamaBarang.text = selectedRows[0][0];
                    nama_barang.appendChild(optionNamaBarang);
                    kode_barang.value = selectedRows[0][1];
                    kode_barang.readOnly = false;
                    lunas.value = selectedRows[0][7];
                    funcDisplayDataBrg(selectedRows[0][1]);
                }
            });
        }
    }

    function funcDisplayDataBrg(kodeBarangParameter) {
        // console.log(kodeBarangParameter);
        fetch("/Kencana/displaybarang/" + kodeBarangParameter)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                let optionTagKategori = document.createElement("option");
                let optionTagSubKategori = document.createElement("option");
                const optionKategoriUtama = kategori_utama.options;

                for (let i = 0; i < optionKategoriUtama.length; i++) {
                    const option = optionKategoriUtama[i];
                    if (option.value === data[0].IdKelompokUtama) {
                        option.selected = true;
                        break;
                    }
                }
                optionTagKategori.value = data[0].IdKelompok;
                optionTagKategori.text = data[0].NamaKelompok;
                optionTagSubKategori.value = data[0].IdCorak;
                optionTagSubKategori.text = data[0].Corak;
                kategori.appendChild(optionTagKategori);
                sub_kategori.appendChild(optionTagSubKategori);
                satuan_primer.value = data[0].SatuanPrimer;
                satuan_sekunder.value = data[0].SatuanSekunder;
                satuan_tritier.value = data[0].SatuanTritier;
            });
    }

    function funcDatatablesIntoInput() {
        let dataArray = [];
        dataArray = list_view.data().toArray();
        // console.log(dataArray);
        // Create a hidden input element
        for (let i = 0; i < dataArray.length; i++) {
            let row = dataArray[i];
            for (let j = 0; j < dataArray[i].length; j++) {
                // console.log(row[j]);
                let hiddenInput = document.createElement("input");
                hiddenInput.type = "hidden";
                hiddenInput.name = "barang" + j + "[]"; // Set the name attribute as desired
                hiddenInput.multiple = true;
                if (row[j] !== null && row[j] !== undefined) {
                    if (row[j].includes(",")) {
                        hiddenInput.value = row[j].replace(/,/g, "");
                    } else {
                        hiddenInput.value = row[j];
                    }
                } else {
                    hiddenInput.value = ""; // Set a default value when row[j] is null or undefined
                }

                // Append the hidden input to the document body or any other element
                form_suratPesanan.appendChild(hiddenInput);
            }
        }
    }

    function removeHiddenInputsWithoutToken() {
        // Select all hidden input elements
        const hiddenInputs = document
            .getElementById("form_suratPesanan")
            .querySelectorAll('input[type="hidden"]');

        hiddenInputs.forEach((input) => {
            // Check if the input does not have the name '_token'
            if (input.name !== "_token") {
                // console.log(input.name + " is deleted");

                input.remove(); // Remove the input element
            }
        });
    }

    //#endregion
});
