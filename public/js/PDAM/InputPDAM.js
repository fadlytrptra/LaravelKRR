jQuery(function ($) {
    //#region Get element by ID
    let nomorUser = document.getElementById("nomorUser");
    let isAdminPDAM = document.getElementById("isAdminPDAM");
    let select_lokasiSumberAirFilter = document.getElementById("select_lokasiSumberAirFilter"); //prettier-ignore
    let select_sumberAirFilter = document.getElementById("select_sumberAirFilter"); //prettier-ignore
    let button_clearFilter = document.getElementById("button_clearFilter");
    let button_tambahData = document.getElementById("button_tambahData");
    let tambahDataPDAMModal = document.getElementById("tambahDataPDAMModal");
    let tambahDataPDAMLabel = document.getElementById("tambahDataPDAMLabel");
    let tanggalDataPDAM = document.getElementById("tanggalDataPDAM");
    let select_sumberAir = document.getElementById("select_sumberAir");
    let counterSaatIni = document.getElementById("counterSaatIni");
    let counterSebelumnya = document.getElementById("counterSebelumnya");
    let counterPemakaian = document.getElementById("counterPemakaian");
    let keterangan = document.getElementById("keterangan");
    let button_modalProses = document.getElementById("button_modalProses");
    let detailDataPDAMModal = document.getElementById("detailDataPDAMModal");
    let detailDataPDAMLabel = document.getElementById("detailDataPDAMLabel");
    let tanggalDataPDAMDetail = document.getElementById("tanggalDataPDAMDetail"); //prettier-ignore
    let sumberAirDetail = document.getElementById("sumberAirDetail");
    let counterSaatIniDetail = document.getElementById("counterSaatIniDetail");
    let counterSebelumnyaDetail = document.getElementById("counterSebelumnyaDetail"); //prettier-ignore
    let counterPemakaianDetail = document.getElementById("counterPemakaianDetail"); //prettier-ignore
    let keteranganDetail = document.getElementById("keteranganDetail");
    let fileFoto = document.getElementById("fileFoto");
    let btnCameraFoto = document.getElementById("btnCameraFoto");
    let cameraInput = document.getElementById("cameraInput");
    // let jumlahFotoDipilih = document.getElementById("jumlahFotoDipilih");
    let fotoPreview = document.getElementById("fotoPreview");
    let btn_clearPhotos = document.getElementById("btn_clearPhotos");
    let userInputDetail = document.getElementById("userInputDetail");
    let timestampInput = document.getElementById("timestampInput");
    let userKoreksiDetail = document.getElementById("userKoreksiDetail");
    let timestampKoreksi = document.getElementById("timestampKoreksi");
    let selectedFiles = [];
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let minimalCounterSaatIni;

    let table_dataPDAM = $("#table_dataPDAM").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        order: [0, "desc"],
        data: [],
        columns: [
            {
                data: "Tanggal",
                render: function (data, type, full, meta) {
                    return (
                        moment(data).format("YYYY-MM-DD") +
                        " " +
                        moment(full.TanggalInput).format("HH:mm:ss")
                    );
                },
            },
            { data: "Lokasi", width: "12%" },
            { data: "NamaSumberAir" },
            {
                data: "Counter",
                width: "10%",
            },
            {
                data: "Pemakaian",
                width: "10%",
            },
            {
                data: "IdPdam",
                width: isAdminPDAM.value == 1 ? "25%" : "15%",
                render: function (data, type, full, meta) {
                    let tanggalData = moment(full.Tanggal).format("YYYY-MM-DD");
                    if (isAdminPDAM.value == 1) {
                        return (
                            '<button class="btn btn-primary btn-detail" data-id="' +
                            data +
                            '" data-toggle="modal" data-target="#detailDataPDAMModal">Lihat Detail</button> ' +
                            '<button class="btn btn-secondary btn-edit" data-id="' +
                            data +
                            '" data-toggle="modal" data-target="#tambahDataPDAMModal">Edit</button> ' +
                            '<button class="btn btn-danger btn-delete" data-id="' +
                            data +
                            '" data-namaSumberAir ="' +
                            full.NamaSumberAir +
                            '" data-tanggalData ="' +
                            tanggalData +
                            '"> Hapus </button>'
                        );
                    } else {
                        return (
                            '<button class="btn btn-primary btn-detail" data-id="' +
                            data +
                            '" data-toggle="modal" data-target="#detailDataPDAMModal">Lihat Detail</button> '
                        );
                    }
                },
            },
            // {
            //     data: "Aktif", // hidden column
            //     visible: false, // make it invisible
            //     searchable: false, // optional, if you don't want it in search
            // },
        ],
        // orderFixed: {
        //     pre: [0, "desc"], // Always sort by Aktif first
        // },
    });
    //#endregion

    //#region Load Form
    getDataPDAM();
    tanggalDataPDAM.value = moment().format("YYYY-MM-DD");
    if (isAdminPDAM.value == 0) {
        tanggalDataPDAM.readOnly = true;
    }
    counterSaatIni.value = 0;
    counterSebelumnya.value = 0;
    counterPemakaian.value = 0;
    //#endregion

    //#region function
    // Setup global AJAX handlers
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

    function getDataPDAM() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/InputPDAM/getDataPDAM",
            type: "GET",
            success: function (response) {
                // Check if response.data is empty
                if (response.data && response.data.length > 0) {
                    // Assuming your server returns an array of objects for the table data
                    table_dataPDAM.clear().rows.add(response.data).draw();
                } else {
                    // Clear the table if response.data is empty
                    table_dataPDAM.clear().draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    function getDataCounterSebelumnya(sumberAir, idDataPDAM, modal) {
        if (modal == "detail") {
            $.ajax({
                url: "/InputPDAM/getDetailDataPDAMCounterSebelumnya",
                type: "GET",
                data: {
                    idSumberAir: sumberAir,
                    idDataPDAM: idDataPDAM,
                    _token: csrfToken,
                },
                success: function (response) {
                    counterSebelumnyaDetail.value = response.data[0]?.Counter || 0;
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data: ", error);
                },
            });
        } else {
            $.ajax({
                url: "/InputPDAM/getDataCounterSebelumnya",
                type: "GET",
                data: {
                    idSumberAir: sumberAir,
                    idDataPDAM: idDataPDAM,
                    _token: csrfToken,
                },
                success: function (response) {
                    console.log(
                        numeral(response.data[0]?.Counter ?? 0).value(),
                    );
                    let getCounterSebelumnya = numeral(
                        response.data[0]?.Counter ?? 0,
                    ).value();

                    counterSebelumnya.value = getCounterSebelumnya;
                    minimalCounterSaatIni = getCounterSebelumnya;
                    console.log(
                        counterSaatIni.value,
                        counterSaatIni.value > 0,
                        parseInt(counterSaatIni.value) > 0,
                    );

                    if (
                        counterSaatIni.value !== "" &&
                        parseInt(counterSaatIni.value) > 0
                    ) {
                        if (
                            parseInt(counterSaatIni.value) >
                            parseInt(minimalCounterSaatIni)
                        ) {
                            counterPemakaian.value =
                                parseInt(counterSaatIni.value) -
                                parseInt(counterSebelumnya.value);
                        } else {
                            counterSaatIni.value = 0;
                            counterPemakaian.value = 0;
                        }
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data: ", error);
                },
            });
        }
    }

    function renderPreview() {
        $("#fotoPreview").empty();
        selectedFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                $("#fotoPreview").append(`
                    <div class="preview-item">
                        <img src="${e.target.result}" class="preview-image"
                            data-src="${e.target.result}">
                        <button
                            type="button"
                            class="delete-btn-foto"
                            data-index="${index}">
                            ×
                        </button>
                    </div>
                `);
            };
            reader.readAsDataURL(file);
        });
        // $("#jumlahFotoDipilih").text(selectedFiles.length + " foto dipilih");
    }

    function base64ToFile(base64, filename) {
        const byteString = atob(base64);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new File([ab], filename, {
            type: "image/png",
        });
    }
    //#endregion

    //#region Event Listener
    button_tambahData.addEventListener("click", function () {
        $("#button_modalProses").data("id", null);
        tambahDataPDAMLabel.innerHTML = "Tambah Data PDAM";
        if (select_sumberAirFilter.selectedIndex !== 0) {
            select_sumberAir.value = select_sumberAirFilter.value;
            select_sumberAir.dispatchEvent(
                new Event("change", { bubbles: true }),
            );
        }
    });

    $("#tambahDataPDAMModal").on("hidden.bs.modal", function (event) {
        tanggalDataPDAM.value = moment().format("YYYY-MM-DD");
        select_sumberAir.selectedIndex = 0;
        counterSaatIni.value = 0;
        counterSebelumnya.value = 0;
        counterPemakaian.value = 0;
        keterangan.value = "";
        $("#fileFoto").val("");
        $("#cameraInput").val("");
        selectedFiles = [];
        $("#fotoPreview").empty();
        // $("#jumlahFotoDipilih").text(selectedFiles.length + " foto dipilih");
    });

    $("#tambahDataPDAMModal").on("shown.bs.modal", function (event) {
        tanggalDataPDAM.focus();
    });

    select_lokasiSumberAirFilter.addEventListener("change", function (e) {
        // filter datatables table_dataPDAM on third column = this.selectedIndex.text
        const selectedText = this.options[this.selectedIndex].text;

        table_dataPDAM
            .column(2)
            .search("")
            .column(1) // third column (0-based index)
            .search(selectedText)
            .draw();

        $.ajax({
            url: "/InputPDAM/getDataSumberAir",
            type: "GET",
            data: {
                idLokasi: this.value,
                _token: csrfToken,
            },
            success: function (response) {
                console.log(response); // Clear existing options
                if (response.length > 0) {
                    select_sumberAirFilter.innerHTML = "";
                    const defaultOption = new Option(
                        "-- Pilih Sumber Air --",
                        "",
                    );
                    defaultOption.disabled = true;

                    // Optional default option
                    select_sumberAirFilter.appendChild(defaultOption);
                    // Populate options
                    response.forEach(function (item) {
                        select_sumberAirFilter.appendChild(
                            new Option(item.NamaSumberAir, item.IdSumberAir),
                        );
                    });
                    select_sumberAirFilter.disabled = false;
                    if (response.length > 1) {
                        select_sumberAirFilter.selectedIndex = 0;
                    } else {
                        const selectedText =
                            select_sumberAirFilter.options[
                                select_sumberAirFilter.selectedIndex
                            ].text;
                        table_dataPDAM
                            .column(2) // third column (0-based index)
                            .search(selectedText)
                            .draw();
                    }
                } else {
                    select_sumberAirFilter.disabled = true;
                    select_sumberAirFilter.innerHTML = "";
                    const defaultOption = new Option(
                        "-- Tidak Ada Sumber Air --",
                        "",
                    );
                    defaultOption.disabled = true;
                    defaultOption.selected = true;

                    // Optional default option
                    select_sumberAirFilter.appendChild(defaultOption);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    select_sumberAirFilter.addEventListener("change", function (e) {
        const selectedText = this.options[this.selectedIndex].text;

        table_dataPDAM
            .column(2) // third column (0-based index)
            .search(selectedText)
            .draw();
    });

    button_clearFilter.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(select_lokasiSumberAirFilter.options.length);

        if (select_lokasiSumberAirFilter.options.length > 1) {
            select_lokasiSumberAirFilter.selectedIndex = 0;
        }

        if (select_sumberAirFilter.options.length > 0) {
            select_sumberAirFilter.innerHTML = "";
            const defaultOption = new Option("-- Pilih Sumber Air --", "");
            defaultOption.disabled = true;
            select_sumberAirFilter.appendChild(defaultOption);
            select_sumberAirFilter.selectedIndex = 0;
            select_sumberAirFilter.disabled = true;
        }
        table_dataPDAM.column(1).search("").column(2).search("").draw();
    });

    tanggalDataPDAM.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            select_sumberAir.focus(); // Move focus to the next input
        }
    });

    select_sumberAir.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            counterSaatIni.focus(); // Move focus to the next input
        }
    });

    select_sumberAir.addEventListener("change", function (e) {
        getDataCounterSebelumnya(this.value, null);
    });

    counterSaatIni.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            if (parseInt(this.value) < minimalCounterSaatIni) {
                this.setCustomValidity(
                    "Counter saat ini tidak boleh lebih kecil dari " +
                        minimalCounterSaatIni,
                );

                this.reportValidity();
                this.focus();
                this.select();
                return;
            } else if (parseInt(this.value) > 10000000) {
                this.value = 9999999;
            }

            // Clear previous validation message
            this.setCustomValidity("");

            if (counterSebelumnya.value > 0) {
                counterPemakaian.value = this.value - counterSebelumnya.value;
            }
            keterangan.focus();
        }
    });

    counterSaatIni.addEventListener("input", function (e) {
        if (select_sumberAir.selectedIndex < 1) {
            this.setCustomValidity("Pilih Sumber Air dulu!");

            this.reportValidity();
            this.value = 0;
            select_sumberAir.focus();
            return;
        } else {
            this.value = parseInt(this.value);
            if (this.value < minimalCounterSaatIni) {
                this.setCustomValidity(
                    "Counter saat ini tidak boleh lebih kecil dari " +
                        minimalCounterSaatIni,
                );

                this.reportValidity();
                this.focus();
                return;
            } else if (parseInt(this.value) > 10000000) {
                this.value = 9999999;
            }

            // Clear previous validation message
            this.setCustomValidity("");
            if (counterSebelumnya.value > 0) {
                counterPemakaian.value = this.value - counterSebelumnya.value;
            }
        }
    });

    keterangan.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            button_modalProses.focus(); // Move focus to the next input
        }
    });

    $("#fileFoto").on("change", function () {
        let file = this.files[0];
        selectedFiles = [];
        $("#cameraInput").val("");
        if (!file) {
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Ukuran foto maksimal 5 MB");
            $(this).val("");
            return;
        }

        selectedFiles = [file];
        renderPreview();
    });

    $("#btnCameraFoto").click(async function () {
        const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

        if (isMobile) {
            $("#cameraInput").click();
            return;
        }

        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            cameraVideo.srcObject = stream;
            cameraModal.style.display = "flex";
        } catch (err) {
            alert("Tidak dapat mengakses kamera");
            console.log(err);
        }
    });

    $("#cameraInput").on("change", function () {
        let file = this.files[0];
        $("#fileFoto").val("");
        selectedFiles = [];
        if (!file) {
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Ukuran foto maksimal 5 MB");
            return;
        }

        selectedFiles = [file];
        renderPreview();
    });

    $("#btnTakePhoto").click(function () {
        let ctx = cameraCanvas.getContext("2d");

        cameraCanvas.width = cameraVideo.videoWidth;
        cameraCanvas.height = cameraVideo.videoHeight;

        ctx.drawImage(cameraVideo, 0, 0);

        cameraCanvas.toBlob(
            function (blob) {
                const file = new File([blob], `camera_${Date.now()}.jpg`, {
                    type: "image/jpeg",
                });

                const currentTotalSize = selectedFiles.reduce(
                    (sum, f) => sum + f.size,
                    0,
                );

                if (currentTotalSize + file.size > 50 * 1024 * 1024) {
                    alert("Total ukuran seluruh foto maksimal 50 MB");

                    if (stream) {
                        stream.getTracks().forEach((track) => track.stop());
                    }

                    cameraModal.style.display = "none";

                    return;
                }

                if (file.size > 5 * 1024 * 1024) {
                    alert("Ukuran foto maksimal 5 MB");
                    return;
                }

                $("#fileFoto").val("");
                selectedFiles = [file];
                renderPreview();
            },
            "image/jpeg",
            0.9,
        );

        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }

        cameraModal.style.display = "none";
    });

    $("#btnCloseCamera").click(function () {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }

        cameraModal.style.display = "none";
    });

    $(document).on("click", ".preview-image", function () {
        $("#previewModalImage").attr("src", $(this).data("src"));

        $("#imagePreviewModal").modal("show");
    });

    $(document).on("click", ".delete-btn-foto", function () {
        selectedFiles = [];
        renderPreview();
        $("#fileFoto").val("");
        $("#cameraInput").val("");
        // $("#jumlahFotoDipilih").text("0 foto dipilih");
    });

    btn_clearPhotos.addEventListener("click", function () {
        selectedFiles = [];
        renderPreview();

        $("#fileFoto").val("");
        $("#cameraInput").val("");
        // $("#jumlahFotoDipilih").text("0 foto dipilih");
    });

    button_modalProses.addEventListener("click", function () {
        // Temporarily remove Bootstrap 4 modal's focus trap
        $(document).off("focusin.modal");

        let idDataPDAM = $(this).data("id");
        const sumberAir = select_sumberAir.selectedIndex;

        if (parseInt(counterSaatIni.value) < minimalCounterSaatIni) {
            counterSaatIni.setCustomValidity(
                "Counter saat ini tidak boleh lebih kecil dari " +
                    minimalCounterSaatIni,
            );

            counterSaatIni.reportValidity();
            counterSaatIni.focus();
            counterSaatIni.select();
            return;
        }
        if (sumberAir <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Pilih sumber air terlebih dahulu",
                returnFocus: false,
            }).then(() => {
                select_lokasiSumberAir.focus();
            });
            return;
        }

        if (selectedFiles.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Upload foto terlebih dahulu",
                returnFocus: false,
            });
            return;
        }
        //cek counter pemakaian
        if (counterSebelumnya.value > 0) {
            counterPemakaian.value =
                counterSaatIni.value - counterSebelumnya.value;
        }

        if (parseInt(counterPemakaian.value) < 0) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Pemakaian tidak boleh minus",
                returnFocus: false,
            }).then(() => {
                counterSaatIni.focus();
            });
            return;
        }
        const formData = new FormData();

        formData.append("jenisStore", idDataPDAM ? "update" : "store");

        formData.append(
            "tanggalDataPDAM",
            moment(tanggalDataPDAM.value).format("YYYY-MM-DD HH:mm:ss"),
        );

        formData.append("sumberAir", select_sumberAir.value);
        formData.append(
            "counterSaatIni",
            counterSaatIni.value.padStart(7, "0"),
        );
        formData.append(
            "counterPemakaian",
            counterPemakaian.value.padStart(7, "0"),
        );
        formData.append("keterangan", keterangan.value);
        formData.append("idDataPDAM", idDataPDAM);
        formData.append("_token", csrfToken);

        // Add photos
        selectedFiles.forEach((file, index) => {
            formData.append("foto[]", file);
        });

        $.ajax({
            url: "/InputPDAM",
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data berhasil ditambahkan",
                    }).then(() => {
                        $("#tambahDataPDAMModal").modal("hide");
                        getDataPDAM();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding data: ", error);
            },
        });
    });

    table_dataPDAM.on("click", "tbody tr", function () {
        let data = table_dataPDAM.row(this).data();
        console.log(data);

        // alert("You clicked on " + data.IdMesin + "'s row");
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalProses").data("id", rowID);
        tambahDataPDAMLabel.innerHTML = "Edit Data PDAM";
        $.ajax({
            url: "/InputPDAM/getDetailDataPDAM",
            data: {
                idDataPDAM: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                tanggalDataPDAM.value = moment(response.data[0].Tanggal).format('YYYY-MM-DD'); //prettier-ignore
                select_sumberAir.value = response.data[0].IdSumberAir;
                counterSaatIni.value = numeral(response.data[0].Counter).value(); //prettier-ignore
                counterPemakaian.value = numeral(response.data[0].Pemakaian).value(); //prettier-ignore
                keterangan.value = response.data[0].Keterangan;
                if (response.data[0].Foto !== null) {
                    selectedFiles = [
                        base64ToFile(response.data[0].Foto, "foto.png"),
                    ];

                    renderPreview();
                }
                getDataCounterSebelumnya(select_sumberAir.value, rowID);
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalProses").data("id", rowID);
        tambahDataPDAMLabel.innerHTML = "Edit Data PDAM";
        $.ajax({
            url: "/InputPDAM/getDetailDataPDAM",
            data: {
                idDataPDAM: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                numeral.locale("id");
                tanggalDataPDAMDetail.value = moment(response.data[0].Tanggal).format('YYYY-MM-DD'); //prettier-ignore
                sumberAirDetail.value = response.data[0].NamaSumberAir ?? "Data sumber air tidak ditemukan"; //prettier-ignore
                counterSaatIniDetail.value = response.data[0].Counter; //prettier-ignore
                counterPemakaianDetail.value = response.data[0].Pemakaian; //prettier-ignore
                keteranganDetail.value = response.data[0].Keterangan;
                userInputDetail.value = response.data[0].UserInput;
                timestampInput.value = response.data[0].TanggalInput;
                userKoreksiDetail.value = response.data[0].UserKoreksi;
                timestampKoreksi.value = response.data[0].TanggalKoreksi;
                $("#fotoPreviewDetail").empty();
                if (response.data[0].Foto !== null) {
                    $("#fotoPreviewDetail").append(`
                    <label>Foto Pendukung</label>
                    <div class="preview-detailFoto">
                        <img src="data:image/jpeg;base64,${response.data[0].Foto}" class="w-100">
                    </div>
                `);
                }
                getDataCounterSebelumnya(
                    response.data[0].IdSumberAir,
                    rowID,
                    "detail",
                );
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        var namaSumberAir = $(this).data("namasumberair");
        var tanggalData = $(this).data("tanggaldata");

        Swal.fire({
            title: "Yakin untuk mengubah status sumber air?",
            text:
                "Apakah anda yakin untuk menghapus data pada " +
                tanggalData +
                " di sumber air " +
                namaSumberAir +
                "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/InputPDAM/" + rowID,
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Terjadi Kesalahan!",
                                text: response.error,
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil!",
                                text: response.success,
                            });
                            getDataPDAM();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching data: ", error);
                    },
                });
            } else if (result.isDismissed) {
                // If user cancels, show a message or do nothing
                Swal.fire(
                    "Pemberitahuan",
                    "Data PDAM tidak jadi dihapus :)",
                    "info",
                );
            }
        });
    });
});
