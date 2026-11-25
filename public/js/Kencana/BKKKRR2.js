$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let radio_1 = document.getElementById("radio_1");
    let radio_2 = document.getElementById("radio_2");
    let radio_biaya = document.getElementById("radio_biaya");
    let radio_pembayaran = document.getElementById("radio_pembayaran");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let btn_tampil = document.getElementById("btn_tampil");
    let btn_okbkk = document.getElementById("btn_okbkk");
    let btn_cetakbkk = document.getElementById("btn_cetakbkk");
    let btn_prosesbkk = document.getElementById("btn_prosesbkk");
    let btn_kodePerkiraan = document.getElementById("btn_kodePerkiraan");
    let btn_noBg = document.getElementById("btn_noBg");
    let btn_prosesPembayaran = document.getElementById("btn_prosesPembayaran");
    let btn_prosesBG = document.getElementById("btn_prosesBG");
    let btn_group = document.getElementById("btn_group");
    let id_pembayaran = document.getElementById("id_pembayaran");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let bkk = document.getElementById("bkk");
    let nilaiBkk = document.getElementById("nilaiBkk");
    let nilaiPembulatan = document.getElementById("nilaiPembulatan");
    let jatuhTempo = document.getElementById("jatuhTempo");
    let bank = document.getElementById("bank");
    let jnsByr = document.getElementById("jnsByr");
    let id_jnsByr = document.getElementById("id_jnsByr");
    let noJnsByr = document.getElementById("noJnsByr");
    let jumlahJnsByr = document.getElementById("jumlahJnsByr");
    let statusCetak = document.getElementById("statusCetak");
    let bank_pembayaran = document.getElementById("bank_pembayaran");
    let jnsByr_pembayaran = document.getElementById("jnsByr_pembayaran");
    let noBg = document.getElementById("noBg");
    let rincian = document.getElementById("rincian");
    let nilaiBayar = document.getElementById("nilaiBayar");
    let nilaiRincian = document.getElementById("nilaiRincian");
    let kdPerkiraan1 = document.getElementById("kdPerkiraan1");
    let kdPerkiraan2 = document.getElementById("kdPerkiraan2");
    let bg_b = document.getElementById("bg_b");
    let terbilang = document.getElementById("terbilang");
    let id_matauang = document.getElementById("id_matauang");
    let id_detailkanan = document.getElementById("id_detailkanan");
    let id_detailkiri = document.getElementById("id_detailkiri");
    let IdDetailBGCek = document.getElementById("IdDetailBGCek");
    let btn_gantiBank = document.getElementById("btn_gantiBank");
    let id_bayarMB = document.getElementById("id_bayarMB");
    let nama_supplierMB = document.getElementById("nama_supplierMB");
    let id_bankMB = document.getElementById("id_bankMB");
    let btn_bankMB = document.getElementById("btn_bankMB");
    let btn_prosesMB = document.getElementById("btn_prosesMB");
    let tablekanan = $("#tablekanan").DataTable({
        columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        scrollX: "300px",
        scrollCollapse: true,
    });
    let tablekiri = $("#tablekiri").DataTable({
        paging: false,
        scrollY: "300px",
        scrollX: "300px",
        scrollCollapse: true,
    });
    let tabletampilBKK = $("#tabletampilBKK").DataTable();
    let bg;
    let rowData;
    let rowDataBKK;
    let rowDataKiri;
    let rowDataKanan;
    let proses;
    let dp;

    let currentMonth = new Date().getMonth() + 1;
    month.value = currentMonth.toString().padStart(2, "0");
    let currentYear = new Date().getFullYear();
    year.value = currentYear;
    btn_proses.style.display = "none";
    jatuhTempo.valueAsDate = new Date();

    let currentDate = new Date();
    let day = currentDate.getDate();
    let monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    let months = monthNames[currentDate.getMonth()];
    let years = currentDate.getFullYear();
    document.getElementById("posted_p").innerHTML = `${day}-${months}-${years}`;

    //#region Function
    function escapeHTML(text) {
        return text
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    }

    function parsePaymentValue(value) {
        return parseFloat(value.replace(/,/g, ""));
    }

    function calculateTotalPayment(rowDataArray) {
        return rowDataArray.reduce((total, row) => {
            return total + parsePaymentValue(row.Nilai_Pembayaran);
        }, 0);
    }

    function main() {
        var cases = [
            0, 1, 2, 7, 10, 11, 12, 13, 15, 19, 20, 21, 25, 29, 30, 35, 50, 55,
            69, 70, 99, 100, 101, 119, 510, 900, 1000, 5001, 5019, 5555, 10000,
            11000, 100000, 199001, 1000000, 1111111, 190000009, 1020503000,
        ];
        for (var i = 0; i < cases.length; i++) {
            console.log(
                cases[i] +
                ": " +
                convertNumberToWordsDollar(cases[i]) +
                " - " +
                convertNumberToWordsRupiah(cases[i])
            );
        }
    }

    main();

    $("#uangMuka").off("change");
    $("#uangMuka").on("change", function () {
        if (this.checked) {
            dp = 1;
            $("#radio_biaya").prop("checked", true);
        } else {
            dp = 0;
            $("#radio_biaya").prop("checked", false);
            $("#radio_pembayaran").prop("checked", false);
        }
        console.log(dp);
    });

    document
        .getElementById("dataBKKModal")
        .addEventListener("hidden.bs.modal", function () {
            location.reload();
            // const inputs = this.querySelectorAll('input');
            // inputs.forEach(input => {
            //     if (input.id !== 'month' && input.id !== 'year') {
            //         input.value = '';
            //     }
            // });
            // rowDataBKKArray = [];
            // rowDataBKK = null;
        });

    radio_1.addEventListener("click", function (event) {
        bg = true;
    });

    radio_2.addEventListener("click", function (event) {
        bg = false;
    });

    let tableatas = $("#tableatas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/Kencana/MaintenanceBKKKRR2Kencana/getPengajuan",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                });
            },
        },
        columns: [
            {
                data: "Id_Pembayaran",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckboxA" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "Id_Bank" },
            { data: "NM_SUP" },
            { data: "Rincian_Bayar" },
            { data: "Nilai_Pembayaran" },
            { data: "Jenis_Pembayaran" },
            { data: "Nama_MataUang" },
            { data: "Jml_JenisBayar" },
            { data: "IdMataUang_PO" },
            { data: "Id_Jenis_Bayar" },
            { data: "Id_MataUang" },
            { data: "Id_Supplier" },
            { data: "Jenis_Bank" },
        ],
        order: [[2, "asc"]],
        columnDefs: [{ targets: [10, 11, 12, 13], visible: false }],
        paging: false,
        scrollY: "300px",
        scrollCollapse: true,
    });

    // let rowDataArray = [];

    // $("#tableatas tbody").off("change", 'input[name="penerimaCheckboxA"]');
    // $("#tableatas tbody").on(
    //     "change",
    //     'input[name="penerimaCheckboxA"]',
    //     function () {
    //         if (this.checked) {
    //             rowData = tableatas.row($(this).closest("tr")).data();
    //             rowDataArray.push(rowData);
    //             console.log(rowData, this, tableatas);
    //         } else {
    //             const index = rowDataArray.findIndex(
    //                 (row) => row.Id_Pembayaran === rowData.Id_Pembayaran
    //             );
    //             if (index > -1) {
    //                 rowDataArray.splice(index, 1);
    //             }
    //         }
    //     }
    // );

    let rowDataArray = [];

    // Handle checkbox change events
    $("#tableatas tbody").off("change", 'input[name="penerimaCheckboxA"]');
    $("#tableatas tbody").on(
        "change",
        'input[name="penerimaCheckboxA"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxA"]');
                // .not(this)
                // .prop("checked", false);
                rowData = tableatas.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                rowDataArray.push(rowData);
                // rowDataArray = [rowData];

                console.log(rowDataArray);
                console.log(rowData, this, tableatas);
            } else {
                // rowData = null;
                // Remove the unchecked row data from the array
                rowData = tableatas.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Pembayaran
                rowDataArray = rowDataArray.filter(
                    (row) => row.Id_Pembayaran !== rowData.Id_Pembayaran
                );

                console.log(rowDataArray);
                console.log(rowData, this, tableatas);
            }
        }
    );

    $("#tableatas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#tableatas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = tableatas.row(this).data();
        console.log(data);
        id_pembayaran.value = data.Id_Pembayaran;

        tablekiri = $("#tablekiri").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/MaintenanceBKKKRR2Kencana/getBGCek",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        id_pembayaran: id_pembayaran.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_Detail_BGCek",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxkiri" value="${data}" /> ${data}`;
                    },
                },
                { data: "No_BGCek" },
                { data: "Jatuh_Tempo" },
                { data: "Status_Cetak" },
                { data: "Id_Pembayaran" },
                { data: "Nilai_BGCek" },
            ],
            // columnDefs: [{ targets: [5, 6], visible: false }],
            paging: false,
            scrollY: "300px",
            scrollX: "300px",
            scrollCollapse: true,
        });

        tablekanan = $("#tablekanan").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/MaintenanceBKKKRR2Kencana/getPembayaran",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        id_pembayaran: id_pembayaran.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_Detail_Bayar",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxkanan" value="${data}" /> ${data}`;
                    },
                },
                { data: "Rincian_Bayar" },
                { data: "Nilai_Rincian" },
                { data: "Kode_Perkiraan" },
                { data: "No_BGCek" },
                { data: "Id_Pembayaran" },
                { data: "Keterangan" },
            ],
            columnDefs: [{ targets: [5, 6], visible: false }],
            paging: false,
            scrollY: "300px",
            scrollX: "300px",
            scrollCollapse: true,
        });
    });

    // $("#tableatas tbody").off("click", "tr");
    // $("#tableatas tbody").on("click", "tr", function () {
    //     let checkSelectedRows = $("#tableatas tbody tr.selected");

    //     if (checkSelectedRows.length > 0) {
    //         // Remove "selected" class from previously selected rows
    //         checkSelectedRows.removeClass("selected");
    //     }
    //     $(this).toggleClass("selected");
    //     const tableatas = $("#tableatas").DataTable();
    //     let selectedRows = tableatas.rows(".selected").data().toArray();
    //     id_pembayaran.value = selectedRows[0].Id_Pembayaran;

    //     tablekiri = $("#tablekiri").DataTable({
    //         responsive: true,
    //         processing: true,
    //         serverSide: true,
    //         destroy: true,
    //         ajax: {
    //             url: "MaintenanceBKKKRR2/getBGCek",
    //             dataType: "json",
    //             type: "GET",
    //             data: function (d) {
    //                 return $.extend({}, d, {
    //                     _token: csrfToken,
    //                     id_pembayaran: id_pembayaran.value,
    //                 });
    //             },
    //         },
    //         columns: [
    //             {
    //                 data: "Id_Detail_BGCek",
    //                 render: function (data) {
    //                     return `<input type="checkbox" name="penerimaCheckboxkiri" value="${data}" /> ${data}`;
    //                 },
    //             },
    //             { data: "No_BGCek" },
    //             { data: "Jatuh_Tempo" },
    //             { data: "Status_Cetak" },
    //             { data: "Id_Pembayaran" },
    //             { data: "Nilai_BGCek" },
    //         ],
    //         // columnDefs: [{ targets: [5, 6], visible: false }],
    //     });

    //     tablekanan = $("#tablekanan").DataTable({
    //         responsive: true,
    //         processing: true,
    //         serverSide: true,
    //         destroy: true,
    //         ajax: {
    //             url: "MaintenanceBKKKRR2/getPembayaran",
    //             dataType: "json",
    //             type: "GET",
    //             data: function (d) {
    //                 return $.extend({}, d, {
    //                     _token: csrfToken,
    //                     id_pembayaran: id_pembayaran.value,
    //                 });
    //             },
    //         },
    //         columns: [
    //             {
    //                 data: "Id_Detail_Bayar",
    //                 render: function (data) {
    //                     return `<input type="checkbox" name="penerimaCheckboxkanan" value="${data}" /> ${data}`;
    //                 },
    //             },
    //             { data: "Rincian_Bayar" },
    //             { data: "Nilai_Rincian" },
    //             { data: "Kode_Perkiraan" },
    //             { data: "Id_Detail_BGCek" },
    //             { data: "Id_Pembayaran" },
    //             { data: "Keterangan" },
    //         ],
    //         columnDefs: [{ targets: [5, 6], visible: false }],
    //     });
    // });

    $("#tablekiri tbody").off("change", 'input[name="penerimaCheckboxkiri"]');
    $("#tablekiri tbody").on(
        "change",
        'input[name="penerimaCheckboxkiri"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxkiri"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKiri = tablekiri.row($(this).closest("tr")).data();
                console.log(rowDataKiri, this, tablekiri);
                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };
                id_detailkiri.value = rowDataKiri.Id_Detail_BGCek;
            } else {
                rowDataKiri = null;
            }
        }
    );

    $("#tablekanan tbody").off("change", 'input[name="penerimaCheckboxkanan"]');
    $("#tablekanan tbody").on(
        "change",
        'input[name="penerimaCheckboxkanan"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxkanan"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKanan = tablekanan.row($(this).closest("tr")).data();
                console.log(rowDataKanan, this, tablekanan);
                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };
                id_detailkanan.value = rowDataKanan.Id_Detail_Bayar;
            } else {
                rowDataKanan = null;
            }
        }
    );

    //#region Event Listener
    noJnsByr.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            jumlahJnsByr.focus();
        }
    });

    jumlahJnsByr.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            jatuhTempo.focus();
        }
    });

    jatuhTempo.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            statusCetak.focus();
        }
    });

    statusCetak.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_prosesBG.focus();
        }
    });

    rincian.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            nilaiRincian.focus();
        }
    });

    statusCetak.addEventListener("input", function (e) {
        // Automatically convert the input to uppercase
        this.value = this.value.toUpperCase();

        // Allow only 'P', 'M', or 'S'
        const allowedCharacters = ["T", "O", "S"];

        // If the input is more than one character or not one of the allowed characters
        if (this.value.length > 1 || !allowedCharacters.includes(this.value)) {
            this.value = this.value.slice(0, 1);
            if (!allowedCharacters.includes(this.value)) {
                this.value = "";
            }

            this.classList.add("input-error");
            this.setCustomValidity("Silahkan pilih [T], [O], atau [S]");
        } else {
            this.classList.remove("input-error");
            this.setCustomValidity("");
        }
        this.reportValidity();
    });

    nilaiRincian.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(nilaiRincian.value.replace(/,/g, ""));
            nilaiRincian.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            select_kodePerkiraan.focus();
        }
    });

    let totalPaymentGeneral = 0;

    btn_group.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(rowDataArray);
        if (rowDataArray.length < 1) {
            Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: "Pilih data yang mau di Group",
                showConfirmButton: true,
            });
            return;
        }
        const totalPayment = calculateTotalPayment(rowDataArray);
        Swal.fire({
            title: "Isikan Tanggal Pembuatan BKK",
            icon: "info",
            html: '<input type="date" id="bkk_date" class="swal2-input">',
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            didOpen: () => {
                // Get the current date
                const today = new Date();
                // Set the value of the input field
                document.getElementById("bkk_date").valueAsDate = today;
            },
            preConfirm: () => {
                const date = $("#bkk_date").val();
                if (!date) {
                    Swal.showValidationMessage("Tanggal harus diisi");
                    return false;
                }
                return date;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedDate = result.value;
                console.log("Tanggal yang dipilih: ", selectedDate);
                Swal.fire({
                    title: "Total Pembayaran",
                    icon: "info",
                    text: `${totalPayment
                        .toLocaleString("en-US", {
                            style: "currency",
                            currency: "IDR",
                        })
                        .replace("IDR", "")}`,
                    showCancelButton: true,
                    confirmButtonText: "Ya",
                    cancelButtonText: "Tidak",
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log("Total dibayarkan: ", totalPayment);
                        totalPaymentGeneral = totalPayment;
                        $.ajax({
                            url: "/Kencana/MaintenanceBKKKRR2Kencana/getGroupKencana",
                            type: "POST",
                            data: {
                                _token: csrfToken,
                                rowDataArray: rowDataArray,
                                tanggalgrup: selectedDate,
                                totalPayment: totalPayment,
                            },
                            success: function (response) {
                                if (response.message) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Success!",
                                        text:
                                            response.message +
                                            " dengan ID BKK: " +
                                            response.idbkk,
                                        showConfirmButton: true,
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            bkk.value = response.idBKK;
                                            month.value =
                                                selectedDate.substring(5, 7);

                                            var myModal = new bootstrap.Modal(
                                                document.getElementById(
                                                    "dataBKKModal"
                                                ),
                                                { keyboard: false }
                                            );
                                            myModal.show();
                                            btn_okbkk.click();
                                            // btn_cetakbkk.click();
                                            $("#tableatas")
                                                .DataTable()
                                                .ajax.reload();
                                            $("#tablekiri")
                                                .DataTable()
                                                .ajax.reload();
                                            $("#tablekanan")
                                                .DataTable()
                                                .ajax.reload();
                                            // tableatas.ajax.reload();
                                            // tablekiri.ajax.reload();
                                            // tablekanan.ajax.reload();
                                            // id_detailkanan.value = "";
                                            // id_detailkiri.value = "";
                                            // id_pembayaran.value = "";
                                        } else {
                                            bkk.value = response.idBKK;
                                            month.value =
                                                selectedDate.substring(5, 7);

                                            var myModal = new bootstrap.Modal(
                                                document.getElementById(
                                                    "dataBKKModal"
                                                ),
                                                { keyboard: false }
                                            );
                                            myModal.show();
                                            btn_okbkk.click();
                                            $("#tableatas")
                                                .DataTable()
                                                .ajax.reload();
                                            $("#tablekiri")
                                                .DataTable()
                                                .ajax.reload();
                                            $("#tablekanan")
                                                .DataTable()
                                                .ajax.reload();
                                        }
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
                                let errorMessage =
                                    "Terjadi kesalahan saat memproses data.";
                                if (
                                    xhr.responseJSON &&
                                    xhr.responseJSON.error
                                ) {
                                    errorMessage = xhr.responseJSON.error;
                                } else if (xhr.responseText) {
                                    try {
                                        const response = JSON.parse(
                                            xhr.responseText
                                        );
                                        errorMessage =
                                            response.error || errorMessage;
                                    } catch (e) {
                                        console.error(
                                            "Error parsing JSON response:",
                                            e
                                        );
                                    }
                                }

                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: errorMessage,
                                    showConfirmButton: false,
                                });
                            },
                        });
                    } else {
                        console.log("Total dibayarkan dibatalkan");
                    }
                });
            } else {
                console.log("Pemilihan tanggal dibatalkan");
            }
        });
    });

    btn_prosesPembayaran.addEventListener("click", function (event) {
        event.preventDefault();
        if (proses == 3) {
            Swal.fire({
                title: "Apakah anda yakin menghapus?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "/Kencana/MaintenanceBKKKRR2Kencana",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: proses,
                            bg: bg ? 1 : 0,
                            id_pembayaran: id_pembayaran.value,
                            noJnsByr: noJnsByr.value,
                            jatuhTempo: jatuhTempo.value,
                            statusCetak: statusCetak.value,
                            jumlahJnsByr: jumlahJnsByr.value,
                            id_detailkiri: id_detailkiri.value,
                            rincian: rincian.value,
                            nilaiRincian: nilaiRincian.value,
                            kdPerkiraan1: select_kodePerkiraan.val(),
                            bg_b: bg_b.value,
                            id_detailkanan: id_detailkanan.value,
                            dp: dp,
                        },
                        success: function (response) {
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        // tableatas.ajax.reload();
                                        tablekiri.ajax.reload();
                                        tablekanan.ajax.reload();
                                        id_detailkanan.value = "";
                                        id_detailkiri.value = "";
                                        rowDataKiri = null;
                                        rowDataKanan = null;
                                        var modalElement =
                                            document.getElementById(
                                                "formModalPembayaran"
                                            );
                                        var myModal =
                                            bootstrap.Modal.getInstance(
                                                modalElement
                                            );
                                        myModal.hide();
                                    } else {
                                        // tableatas.ajax.reload();
                                        tablekiri.ajax.reload();
                                        tablekanan.ajax.reload();
                                        id_detailkanan.value = "";
                                        id_detailkiri.value = "";
                                        rowDataKiri = null;
                                        rowDataKanan = null;
                                        var modalElement =
                                            document.getElementById(
                                                "formModalPembayaran"
                                            );
                                        var myModal =
                                            bootstrap.Modal.getInstance(
                                                modalElement
                                            );
                                        myModal.hide();
                                    }
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
                            let errorMessage =
                                "Terjadi kesalahan saat memproses data.";
                            if (xhr.responseJSON && xhr.responseJSON.error) {
                                errorMessage = xhr.responseJSON.error;
                            } else if (xhr.responseText) {
                                try {
                                    const response = JSON.parse(
                                        xhr.responseText
                                    );
                                    errorMessage =
                                        response.error || errorMessage;
                                } catch (e) {
                                    console.error(
                                        "Error parsing JSON response:",
                                        e
                                    );
                                }
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: errorMessage,
                                showConfirmButton: false,
                            });
                        },
                    });
                }
            });
        } else {
            // console.log(bg_b.value);

            $.ajax({
                url: "/Kencana/MaintenanceBKKKRR2Kencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    bg: bg ? 1 : 0,
                    id_pembayaran: id_pembayaran.value,
                    noJnsByr: noJnsByr.value,
                    jatuhTempo: jatuhTempo.value,
                    statusCetak: statusCetak.value,
                    jumlahJnsByr: jumlahJnsByr.value,
                    id_detailkiri: id_detailkiri.value,
                    rincian: rincian.value,
                    nilaiRincian: nilaiRincian.value,
                    kdPerkiraan1: select_kodePerkiraan.val(),
                    bg_b: bg_b.value,
                    id_detailkanan: id_detailkanan.value,
                    dp: dp,
                    IdDetailBGCek: IdDetailBGCek.value,
                },
                success: function (response) {
                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // tableatas.ajax.reload();
                                tablekiri.ajax.reload();
                                tablekanan.ajax.reload();
                                id_detailkanan.value = "";
                                id_detailkiri.value = "";
                                rowDataKiri = null;
                                rowDataKanan = null;
                                var modalElement = document.getElementById(
                                    "formModalPembayaran"
                                );
                                var myModal =
                                    bootstrap.Modal.getInstance(modalElement);
                                myModal.hide();
                                // id_pembayaran.value = "";
                            } else {
                                // tableatas.ajax.reload();
                                tablekiri.ajax.reload();
                                tablekanan.ajax.reload();
                                id_detailkanan.value = "";
                                id_detailkiri.value = "";
                                rowDataKiri = null;
                                rowDataKanan = null;
                                var modalElement = document.getElementById(
                                    "formModalPembayaran"
                                );
                                var myModal =
                                    bootstrap.Modal.getInstance(modalElement);
                                myModal.hide();
                                // id_pembayaran.value = "";
                            }
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
                    let errorMessage = "Terjadi kesalahan saat memproses data.";
                    if (xhr.responseJSON && xhr.responseJSON.error) {
                        errorMessage = xhr.responseJSON.error;
                    } else if (xhr.responseText) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            errorMessage = response.error || errorMessage;
                        } catch (e) {
                            console.error("Error parsing JSON response:", e);
                        }
                    }

                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: errorMessage,
                        showConfirmButton: false,
                    });
                },
            });
        }
    });

    btn_prosesBG.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(proses);

        if (proses == 3) {
            Swal.fire({
                title: "Apakah anda yakin menghapus?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "/Kencana/MaintenanceBKKKRR2Kencana",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: proses,
                            bg: bg ? 1 : 0,
                            id_pembayaran: id_pembayaran.value,
                            noJnsByr: noJnsByr.value,
                            jatuhTempo: jatuhTempo.value,
                            statusCetak: statusCetak.value,
                            jumlahJnsByr: jumlahJnsByr.value,
                            id_detailkiri: id_detailkiri.value,
                            rincian: rincian.value,
                            nilaiRincian: nilaiRincian.value,
                            kdPerkiraan1: select_kodePerkiraan.val(),
                            bg_b: bg_b.value,
                            id_detailkanan: id_detailkanan.value,
                            dp: dp,
                        },
                        success: function (response) {
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        // tableatas.ajax.reload();
                                        tablekiri.ajax.reload();
                                        tablekanan.ajax.reload();
                                        id_detailkanan.value = "";
                                        id_detailkiri.value = "";
                                        rowDataKiri = null;
                                        rowDataKanan = null;
                                        var modalElement =
                                            document.getElementById(
                                                "formBGModal"
                                            );
                                        var myModal =
                                            bootstrap.Modal.getInstance(
                                                modalElement
                                            );
                                        myModal.hide();
                                    } else {
                                        // tableatas.ajax.reload();
                                        tablekiri.ajax.reload();
                                        tablekanan.ajax.reload();
                                        id_detailkanan.value = "";
                                        id_detailkiri.value = "";
                                        rowDataKiri = null;
                                        rowDataKanan = null;
                                        var modalElement =
                                            document.getElementById(
                                                "formBGModal"
                                            );
                                        var myModal =
                                            bootstrap.Modal.getInstance(
                                                modalElement
                                            );
                                        myModal.hide();
                                    }
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
                            let errorMessage =
                                "Terjadi kesalahan saat memproses data.";
                            if (xhr.responseJSON && xhr.responseJSON.error) {
                                errorMessage = xhr.responseJSON.error;
                            } else if (xhr.responseText) {
                                try {
                                    const response = JSON.parse(
                                        xhr.responseText
                                    );
                                    errorMessage =
                                        response.error || errorMessage;
                                } catch (e) {
                                    console.error(
                                        "Error parsing JSON response:",
                                        e
                                    );
                                }
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: errorMessage,
                                showConfirmButton: false,
                            });
                        },
                    });
                }
            });
        } else {
            $.ajax({
                url: "/Kencana/MaintenanceBKKKRR2Kencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    bg: bg ? 1 : 0,
                    id_pembayaran: id_pembayaran.value,
                    noJnsByr: noJnsByr.value,
                    jatuhTempo: jatuhTempo.value,
                    statusCetak: statusCetak.value,
                    jumlahJnsByr: jumlahJnsByr.value,
                    id_detailkiri: id_detailkiri.value,
                    rincian: rincian.value,
                    nilaiRincian: nilaiRincian.value,
                    kdPerkiraan1: select_kodePerkiraan.val(),
                    bg_b: bg_b.value,
                    id_detailkanan: id_detailkanan.value,
                    dp: dp,
                },
                success: function (response) {
                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                            timer: 1500,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // tableatas.ajax.reload();
                                tablekiri.ajax.reload();
                                tablekanan.ajax.reload();
                                id_detailkanan.value = "";
                                id_detailkiri.value = "";
                                rowDataKiri = null;
                                rowDataKanan = null;
                                var modalElement =
                                    document.getElementById("formBGModal");
                                var myModal =
                                    bootstrap.Modal.getInstance(modalElement);
                                myModal.hide();
                            } else {
                                // tableatas.ajax.reload();
                                tablekiri.ajax.reload();
                                tablekanan.ajax.reload();
                                id_detailkanan.value = "";
                                id_detailkiri.value = "";
                                rowDataKiri = null;
                                rowDataKanan = null;
                                var modalElement =
                                    document.getElementById("formBGModal");
                                var myModal =
                                    bootstrap.Modal.getInstance(modalElement);

                                // Menutup modal
                                myModal.hide();
                                // id_pembayaran.value = "";
                            }
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
                    let errorMessage = "Terjadi kesalahan saat memproses data.";
                    if (xhr.responseJSON && xhr.responseJSON.error) {
                        errorMessage = xhr.responseJSON.error;
                    } else if (xhr.responseText) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            errorMessage = response.error || errorMessage;
                        } catch (e) {
                            console.error("Error parsing JSON response:", e);
                        }
                    }

                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: errorMessage,
                        showConfirmButton: false,
                    });
                },
            });
        }
    });

    btn_hapus.addEventListener("click", function (event) {
        event.preventDefault();
        bg_b.value = rowData.Nilai_Pembayaran;
        proses = 3;
        if (rowData == null && rowData == undefined) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }

        if (
            (rowDataKiri == null || rowDataKiri == undefined) &
            (rowDataKanan == null || rowDataKanan == undefined)
        ) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang mau dihapus terlebih dahulu!",
                showConfirmButton: true,
            });
            return;
        }

        if (
            rowDataKiri != null &&
            rowDataKiri != undefined &&
            rowDataKanan != null &&
            rowDataKanan != undefined
        ) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih dari salah satu tabel BG/Cek atau Pembayaran!",
                showConfirmButton: true,
            });
            return;
        }

        if (bg == true && rowDataKiri != null && rowDataKiri != undefined) {
            var modalBG = new bootstrap.Modal(
                document.getElementById("formBGModal"),
                {
                    keyboard: false,
                }
            );
            modalBG.show();
            bank.value = rowData.Id_Bank;
            jnsByr.value = rowData.Jenis_Pembayaran;
            id_jnsByr.value = rowData.Id_Jenis_Bayar;
            noJnsByr.value = rowDataKiri.No_BGCek;
            jumlahJnsByr.value = rowDataKiri.Nilai_BGCek;
            // jatuhTempo.value = rowDataKiri.Jatuh_Tempo;
            var jatuhTempoDate = new Date(rowDataKiri.Jatuh_Tempo);
            jatuhTempoDate.setDate(jatuhTempoDate.getDate() + 1);
            jatuhTempo.valueAsDate = jatuhTempoDate;
            statusCetak.value = rowDataKiri.Status_Cetak;
            setTimeout(() => {
                noJnsByr.focus();
            }, 500);
        } else if (
            bg == false &&
            rowDataKanan != null &&
            rowDataKanan != undefined
        ) {
            var modalPem = new bootstrap.Modal(
                document.getElementById("formModalPembayaran"),
                {
                    keyboard: false,
                }
            );
            modalPem.show();
            bank_pembayaran.value = rowData.Id_Bank;
            jnsByr_pembayaran.value = rowData.Jenis_Pembayaran;
            rincian.value = rowDataKanan.Rincian_Bayar;
            nilaiRincian.value = rowDataKanan.Nilai_Rincian;
            select_kodePerkiraan
                .val(rowDataKanan.Kode_Perkiraan)
                .trigger("change");
            // kdPerkiraan1.value = rowDataKanan.Kode_Perkiraan;
            // kdPerkiraan2.value = rowDataKanan.Keterangan;
        } else {
            Swal.fire({
                title: "Detail BG/Cek atau Detail Pembayaran, Pilih dulu!",
                icon: "info",
                showConfirmButton: true,
            });
        }
    });

    btn_koreksi.addEventListener("click", function (event) {
        event.preventDefault();

        proses = 2;
        if (rowData == null && rowData == undefined) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }

        if (
            (rowDataKiri == null || rowDataKiri == undefined) &
            (rowDataKanan == null || rowDataKanan == undefined)
        ) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang mau dikoreksi terlebih dahulu!",
                showConfirmButton: true,
            });
            return;
        }

        if (
            rowDataKiri != null &&
            rowDataKiri != undefined &&
            rowDataKanan != null &&
            rowDataKanan != undefined
        ) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih dari salah satu tabel BG/Cek atau Pembayaran!",
                showConfirmButton: true,
            });
            return;
        }

        if (bg == true && rowDataKiri != null && rowDataKiri != undefined) {
            var modalBG = new bootstrap.Modal(
                document.getElementById("formBGModal"),
                {
                    keyboard: false,
                }
            );
            modalBG.show();
            bank.value = rowData.Id_Bank;
            jnsByr.value = rowData.Jenis_Pembayaran;
            id_jnsByr.value = rowData.Id_Jenis_Bayar;
            noJnsByr.value = rowDataKiri.No_BGCek;
            jumlahJnsByr.value = rowDataKiri.Nilai_BGCek;
            // let parsedDate = parseDateYMD(rowDataKiri.Jatuh_Tempo);
            // jatuhTempo.value = formatDateToMMDDYYYY(parsedDate);
            console.log(rowDataKiri.Jatuh_Tempo);
            console.log(new Date(rowDataKiri.Jatuh_Tempo));
            var jatuhTempoDate = new Date(rowDataKiri.Jatuh_Tempo);
            jatuhTempoDate.setDate(jatuhTempoDate.getDate() + 1);
            jatuhTempo.valueAsDate = jatuhTempoDate;
            statusCetak.value = rowDataKiri.Status_Cetak;
            setTimeout(() => {
                noJnsByr.focus();
            }, 500);
        } else if (
            bg == false &&
            rowDataKanan != null &&
            rowDataKanan != undefined
        ) {
            var modalPem = new bootstrap.Modal(
                document.getElementById("formModalPembayaran"),
                {
                    keyboard: false,
                }
            );
            modalPem.show();
            bank_pembayaran.value = rowData.Id_Bank;
            jnsByr_pembayaran.value = rowData.Jenis_Pembayaran;
            rincian.value = rowData.NM_SUP + " " + rowDataKanan.Rincian_Bayar;
            nilaiRincian.value = rowDataKanan.Nilai_Rincian;
            select_kodePerkiraan
                .val(rowDataKanan.Kode_Perkiraan)
                .trigger("change");
            // kdPerkiraan1.value = rowDataKanan.Kode_Perkiraan;
            // kdPerkiraan2.value = escapeHTML(rowDataKanan.Keterangan);
            nilaiBayar.value = 0;
        } else {
            Swal.fire({
                title: "Detail BG/Cek atau Detail Pembayaran, Pilih dulu!",
                icon: "info",
                showConfirmButton: true,
            });
        }
    });

    btn_tampil.addEventListener("click", function (event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(
            document.getElementById("dataBKKModal"),
            {
                keyboard: false,
            }
        );
        myModal.show();
    });

    btn_gantiBank.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataArray.length > 1) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Hanya bisa mengganti 1 data bank dalam 1 waktu!",
                showConfirmButton: true,
            });
            return;
        } else if (rowDataArray.length < 1) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang mau diganti bank terlebih dahulu!",
                showConfirmButton: true,
            });
            return;
        } else {
            console.log(rowDataArray);
            id_bayarMB.value = rowDataArray[0].Id_Pembayaran;
            nama_supplierMB.value = rowDataArray[0].NM_SUP;
            // id_bankMB.value = rowDataArray[0].Id_Bank;
            $('#gantiBankModal').modal('show');
            setTimeout(() => {
                fetchDataKelUt("/Kencana/getBankKencanaSelectKencana");
            }, 300);

        }

    });

    const bankSelect = $("#bankSelect");

    function fetchDataKelUt(endpoint) {
        fetch(endpoint)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                return response.json();
            })
            .then((options) => {
                if (!Array.isArray(options)) {
                    throw new Error("Format data bank tidak valid.");
                }

                bankSelect.empty();

                bankSelect.append(
                    new Option("Pilih Bank", "", true, true)
                );

                options.forEach((entry) => {
                    const displayText =
                        `${entry.Id_Bank} | ${entry.Nama_Bank}`;

                    bankSelect.append(
                        new Option(displayText, entry.Id_Bank)
                    );
                });

                // Jangan membaca Id_Bank dari rowDataArray.
                // Data bank baru harus dipilih oleh pengguna.
                bankSelect.val("").trigger("change");

                bankSelect.select2("open");
            })
            .catch((error) => {
                console.error("Gagal memuat pilihan bank:", error);

                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Daftar bank gagal dimuat.",
                });
            });
    }



    bankSelect.select2({
        dropdownParent: $("#gantiBankModal"),
        placeholder: "Pilih Bank",
    });
    bankSelect.on("change", function () {
        const selectedBank = $(this).val();
        console.log(selectedBank);
        if (selectedBank) {
            console.log('hehe');
            btn_prosesMB.focus();
        }
    });

    bankSelect.on("select2:close", function () {
        if ($(this).val()) {
            btn_prosesMB.focus();
        }
    });


    btn_prosesMB.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/MaintenanceBKKKRR2Kencana/" + id_bayarMB.value,
            type: "PUT",
            data: {
                _token: csrfToken,
                id_bayarMB: id_bayarMB.value,
                id_bankMB: bankSelect.val(),
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
                        $("#tableatas").DataTable().ajax.reload();
                        $('#gantiBankModal').modal('hide');
                        rowDataArray = [];
                        rowData = null;
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

    btn_refresh.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_okbkk.addEventListener("click", function (event) {
        event.preventDefault();
        tabletampilBKK = $("#tabletampilBKK").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/MaintenanceBKKKRR2Kencana/getBKK",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        month: month.value,
                        year: year.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_BKK",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "NilaiBKK" },
                { data: "NM_SUP" },
                { data: "Id_MataUang" },
                { data: "Id_Jenis_Bayar" },
            ],
            columnDefs: [{ targets: [3, 4], visible: false }],
            paging: false,
            scrollY: "250px",
            scrollCollapse: true,
        });

        if (bkk.value !== "") {
            // Check the checkbox in the DataTable that has a matching value to bkk.value
            tabletampilBKK.on("draw", function () {
                rowDataBKKArray = []; // Clear the array to avoid duplicate entries

                // Iterate over each checkbox in the DataTable
                tabletampilBKK
                    .$('input[name="penerimaCheckbox"]')
                    .each(function () {
                        // Check if the checkbox value matches bkk.value
                        if (this.value === bkk.value) {
                            this.checked = true; // Check the checkbox

                            // Get the row data for the checked checkbox and push it to the array
                            const rowDataBKK = tabletampilBKK
                                .row($(this).closest("tr"))
                                .data();
                            rowDataBKKArray.push(rowDataBKK);
                        }
                    });
            });
            setTimeout(() => {
                btn_cetakbkk.click();
            }, 300);
            // document
            //     .getElementById("modalDetailPelunasan")
            //     .addEventListener("shown.bs.modal", function () {
            //         setTimeout(() => {
            //             btn_cetakbkk.click();
            //         }, 300);
            //     });
        }
    });

    let rowDataBKKArray = [];

    $("#tabletampilBKK tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#tabletampilBKK tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            // Clear the array before adding the new checked row
            rowDataBKKArray = [];

            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);

                rowDataBKK = tabletampilBKK.row($(this).closest("tr")).data();
                rowDataBKKArray.push(rowDataBKK);

                console.log(rowDataBKK, this, tabletampilBKK);
            }
        }
    );

    btn_cetakbkk.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(rowDataBKK);
        console.log(rowData);

        if (rowDataBKK == null || rowDataBKK == undefined) {
            nilaiBkk.value = numeral(totalPaymentGeneral).format("0,0.00");
            nilaiPembulatan.value = numeral(totalPaymentGeneral).format("0,0.00");
        } else {
            bkk.value = rowDataBKK.Id_BKK;
            nilaiBkk.value = rowDataBKK.NilaiBKK;
            nilaiPembulatan.value = rowDataBKK.NilaiBKK;
        }
        Swal.fire({
            title: "Merubah Nilai Pembulatannya ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            focusCancel: true,
        }).then((result) => {
            if (result.isConfirmed) {
                btn_cetakbkk.style.display = "none";
                btn_prosesbkk.style.display = "block";
                setTimeout(() => {
                    nilaiPembulatan.focus();
                }, 300);
            } else {
                btn_prosesbkk.click();
                // const newWindow = window.open(
                //     "MaintenanceBKKKRR2Print",
                //     "_blank"
                // );
                // newWindow.onload = function () {
                //     newWindow.print();
                // };
            }
        });
    });

    btn_prosesbkk.addEventListener("click", function (event) {
        event.preventDefault();
        btn_cetakbkk.style.display = "block";
        btn_prosesbkk.style.display = "none";
        $.ajax({
            url: "/Kencana/MaintenanceBKKKRR2Kencana/processPrint",
            type: "GET",
            data: {
                _token: csrfToken,
                rowDataBKKArray: rowDataBKKArray,
                nilaiPembulatan: nilaiPembulatan.value,
            },
            success: function (data) {
                // console.log(data);
                id_matauang.value = data.currencyConversion;
                let nilaiTerbilang = data.nilaiTerbilang;
                let nilaiNumerik = nilaiTerbilang.replace(/,/g, "");
                nilaiNumerik = nilaiNumerik.split(".")[0];

                let terbilang;

                if (id_matauang.value == 1) {
                    terbilang = convertNumberToWordsRupiah(nilaiNumerik);
                } else {
                    terbilang = convertNumberToWordsDollar(nilaiNumerik);
                }

                console.log(terbilang);

                $.ajax({
                    url: "/Kencana/MaintenanceBKKKRR2Kencana/viewPrint",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        rowDataBKKArray: rowDataBKKArray,
                        terbilang: terbilang,
                    },
                    success: function (data) {
                        console.log(data);
                        if (data[0] == 8) {
                            document.getElementById("name_p").innerHTML =
                                data.data[0].Id_Bank;
                            document.getElementById("matauang_p").innerHTML =
                                "Amount &nbsp;" + data.data[0].Id_MataUang_BC;
                            let tanggalInput = data.data[0].Tgl_Input;
                            let tanggal = new Date(tanggalInput);
                            let options = {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            };
                            let formattedDate = tanggal
                                .toLocaleDateString("en-GB", options)
                                .replace(" ", "-")
                                .replace(" ", "-");
                            document.getElementById("tanggal_p").innerHTML =
                                formattedDate;
                            document.getElementById("voucher_p").innerHTML =
                                data.data[0].Id_BKK;
                            document.getElementById("description_p").innerHTML =
                                data.data[0].Nama_Bank;
                            document.getElementById("paid_p").innerHTML =
                                data.data[0].NM_SUP;
                            //Tbody Array
                            let tbodyHTML = ""; // Variabel untuk menyimpan isi tbody
                            tbodyHTML += `<tr style="border:none !important">
                                <td style="border:none !important; border-bottom: 2px solid black !important">C.O.A</td>
                                <td style="border:none !important; border-bottom: 2px solid black !important">Account Name</td>
                                <td style="border:none !important; border-bottom: 2px solid black !important">Description</td>
                                <td style="border:none !important; border-bottom: 2px solid black !important" id="nobg_p">CEK/BG
                                    No.</td>
                                <td style="border:none !important; border-bottom: 2px solid black !important" id="matauang_p">Amount ${data.data[0].Id_MataUang_BC ?? ""
                                }
                                </td>
                            </tr>`;
                            data.data.forEach(function (item) {
                                tbodyHTML += `
                                <tr>
                                    <td style="border:none !important;">
                                        ${item.Kode_Perkiraan ?? ""}
                                    </td>
                                    <td style="border:none !important;">
                                        ${item.Keterangan ?? ""}
                                    </td>
                                    <td style="border:none !important;">
                                        ${item.Rincian_Bayar ?? ""}
                                    </td>
                                    <td style="border:none !important;">
                                        ${item.No_BGCek ?? ""}
                                    </td>
                                    <td style="border:none !important;; text-align: right;">
                                        ${parseFloat(
                                    item.Nilai_Rincian
                                ).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                                    </td>
                                </tr>
                            `;
                            });

                            // Menghitung total nilai rincian
                            let totalNilaiRincian = data.data.reduce(function (
                                acc,
                                item
                            ) {
                                return acc + parseFloat(item.Nilai_Rincian);
                            },
                                0);

                            // Menambahkan baris total ke tbody
                            tbodyHTML += `
                            <tr>
                                <td colspan="4" style="text-align: right; border:none !important; border-top: 2px solid black !important">
                                    Total
                                </td>
                                <td style="text-align: right; border:none !important; border-top: 2px solid black !important">
                                    ${totalNilaiRincian.toLocaleString(
                                "en-US",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }
                            )}
                                </td>
                            </tr>
                            `;

                            let tbodyttdHTML = "";
                            tbodyttdHTML += `

                            <tr style="border:none !important">
                    <td style="text-align: center !important; width: 80px; border:none !important">Receiver</td>
                    <td style="text-align: center !important; width: 80px; border:none !important">Cashier</td>
                    <td style="border:none !important"></td>
                    <td style="border:none !important"></td>
                </tr>
                <tr style="border:none !important">
                    <td style="border:none !important">&nbsp;</td>
                    <td style="border:none !important">&nbsp;</td>
                    <td style="width: 80px; text-align: right !important; font-style: italic; border:none !important">
                        Note :</td>
                    <td style="border:none !important" id="batal_p">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                    </td>
                    <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                    </td>
                    <td style="border:none !important">&nbsp;</td>
                    <td style="border:none !important" id="alasan_p">&nbsp;</td>
                </tr>
                            `;
                            // Menambahkan hasil ke dalam tbody
                            document.querySelector(
                                "#ttdTable tbody"
                            ).innerHTML = tbodyttdHTML;

                            // Menambahkan hasil ke dalam tbody
                            document.querySelector(
                                "#paymentTable tbody"
                            ).innerHTML = tbodyHTML;

                            // Menampilkan total di elemen total_p (opsional, jika tetap dibutuhkan di luar tabel)
                            // document.getElementById("total_p").innerHTML =
                            //     totalNilaiRincian.toLocaleString("en-US", {
                            //         minimumFractionDigits: 2,
                            //         maximumFractionDigits: 2,
                            //     });

                            document.getElementById("alasan_p").innerHTML =
                                data.data[0].Alasan;

                            document.getElementById("batal_p").innerHTML =
                                data.data[0].Batal;

                            window.print();
                        } else if (data[0] == 2) {
                            document.getElementById("nobg_p").innerHTML =
                                "Invoice No.";
                            document.getElementById("matauang_p").innerHTML =
                                "Amount &nbsp;" + data.data[0].Id_MataUang_BC;
                            document.getElementById("name_p").innerHTML =
                                data.data[0].Id_Bank;
                            let tanggalInput = data.data[0].Tgl_Input;
                            let tanggal = new Date(tanggalInput);
                            let options = {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            };
                            let formattedDate = tanggal
                                .toLocaleDateString("en-GB", options)
                                .replace(" ", "-")
                                .replace(" ", "-");
                            document.getElementById("tanggal_p").innerHTML =
                                formattedDate;
                            document.getElementById("voucher_p").innerHTML =
                                data.data[0].Id_BKK;
                            document.getElementById("description_p").innerHTML =
                                data.data[0].Nama_Bank;
                            document.getElementById("paid_p").innerHTML =
                                data.data[0].NM_SUP;
                            //Tbody Array
                            let tbodyHTML = ""; // Variabel untuk menyimpan isi tbody
                            tbodyHTML += `<tr style="border:none !important">
                                <td style="border:none !important; border-bottom: 2px solid black !important">C.O.A</td>
                                <td style="border:none !important; border-bottom: 2px solid black !important">Account Name</td>
                                <td style="border:none !important; border-bottom: 2px solid black !important">Description</td>
                                <td style="border:none !important; border-bottom: 2px solid black !important" id="nobg_p">CEK/BG
                                    No.</td>
                                <td style="border:none !important; border-bottom: 2px solid black !important" id="matauang_p">Amount ${data.data[0].Id_MataUang_BC ?? ""
                                }
                                </td>
                            </tr>`;
                            data.data.forEach(function (item) {
                                tbodyHTML += `
                                <tr>
                                    <td style="border:none !important;">
                                        ${item.Kode_Perkiraan ?? ""}
                                    </td>
                                    <td style="border:none !important;">
                                        ${item.Keterangan ?? ""}
                                    </td>
                                    <td style="border:none !important;">
                                        ${item.Rincian_Bayar ?? ""}
                                    </td>
                                    <td style="border:none !important;">
                                        ${item.No_BGCek ?? ""}
                                    </td>
                                    <td style="border:none !important;; text-align: right;">
                                        ${parseFloat(
                                    item.Nilai_Rincian
                                ).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                                    </td>
                                </tr>
                            `;
                            });

                            // Menghitung total nilai rincian
                            let totalNilaiRincian = data.data.reduce(function (
                                acc,
                                item
                            ) {
                                return acc + parseFloat(item.Nilai_Rincian);
                            },
                                0);

                            // Menambahkan baris total ke tbody
                            tbodyHTML += `
                            <tr>
                                <td colspan="4" style="text-align: right; border:none !important; border-top: 2px solid black !important">
                                    Total
                                </td>
                                <td style="text-align: right; border:none !important; border-top: 2px solid black !important">
                                    ${totalNilaiRincian.toLocaleString(
                                "en-US",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }
                            )}
                                </td>
                            </tr>
                            `;

                            let tbodyttdHTML = "";
                            tbodyttdHTML += `

                            <tr style="border:none !important">
                    <td style="text-align: center !important; width: 80px; border:none !important">Receiver</td>
                    <td style="text-align: center !important; width: 80px; border:none !important">Cashier</td>
                    <td style="border:none !important"></td>
                    <td style="border:none !important"></td>
                </tr>
                <tr style="border:none !important">
                    <td style="border:none !important">&nbsp;</td>
                    <td style="border:none !important">&nbsp;</td>
                    <td style="width: 80px; text-align: right !important; font-style: italic; border:none !important">
                        Note :</td>
                    <td style="border:none !important" id="batal_p">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                    </td>
                    <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                    </td>
                    <td style="border:none !important">&nbsp;</td>
                    <td style="border:none !important" id="alasan_p">&nbsp;</td>
                </tr>
                            `;
                            // Menambahkan hasil ke dalam tbody
                            document.querySelector(
                                "#ttdTable tbody"
                            ).innerHTML = tbodyttdHTML;

                            // Menambahkan hasil ke dalam tbody
                            document.querySelector(
                                "#paymentTable tbody"
                            ).innerHTML = tbodyHTML;

                            document.getElementById("alasan_p").innerHTML =
                                data.data[0].Alasan;

                            document.getElementById("batal_p").innerHTML =
                                data.data[0].Batal;

                            window.print();
                        } else {
                            document.getElementById("name_p").innerHTML =
                                data.data[0].Id_Bank;
                            document.getElementById("matauang_p").innerHTML =
                                "Amount &nbsp;" + data.data[0].Id_MataUang_BC;
                            let tanggalInput = data.data[0].Tgl_Input;
                            let tanggal = new Date(tanggalInput);
                            let options = {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            };
                            let formattedDate = tanggal
                                .toLocaleDateString("en-GB", options)
                                .replace(" ", "-")
                                .replace(" ", "-");
                            document.getElementById("tanggal_p").innerHTML =
                                formattedDate;
                            document.getElementById("voucher_p").innerHTML =
                                data.data[0].Id_BKK;
                            document.getElementById("description_p").innerHTML =
                                data.data[0].Nama_Bank;
                            document.getElementById("paid_p").innerHTML =
                                data.data[0].NM_SUP;
                            //Tbody Array
                            let tbodyHTML = ""; // Variabel untuk menyimpan isi tbody
                            tbodyHTML += `<tr style="border:none !important">
                                <td style="border:none !important; border-bottom: 2px solid black !important">C.O.A</td>
                                <td style="border:none !important; border-bottom: 2px solid black !important">Account Name</td>
                                <td style="border:none !important; border-bottom: 2px solid black !important">Description</td>
                                <td style="border:none !important; border-bottom: 2px solid black !important" id="nobg_p">CEK/BG
                                    No.</td>
                                <td style="border:none !important; border-bottom: 2px solid black !important" id="matauang_p">Amount ${data.data[0].Id_MataUang_BC ?? ""
                                }
                                </td>
                            </tr>`;
                            data.data.forEach(function (item) {
                                tbodyHTML += `
                                <tr>
                                    <td style="border:none !important;">
                                        ${item.Kode_Perkiraan ?? ""}
                                    </td>
                                    <td style="border:none !important;">
                                        ${item.Keterangan ?? ""}
                                    </td>
                                    <td style="border:none !important;">
                                        ${item.Rincian_Bayar ?? ""}
                                    </td>
                                    <td style="border:none !important;">
                                        ${item.No_BGCek ?? ""}
                                    </td>
                                    <td style="border:none !important;; text-align: right;">
                                        ${parseFloat(
                                    item.Nilai_Rincian
                                ).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                                    </td>
                                </tr>
                            `;
                            });

                            // Menghitung total nilai rincian
                            let totalNilaiRincian = data.data.reduce(function (
                                acc,
                                item
                            ) {
                                return acc + parseFloat(item.Nilai_Rincian);
                            },
                                0);

                            // Menambahkan baris total ke tbody
                            tbodyHTML += `
                            <tr>
                                <td colspan="4" style="text-align: right; border:none !important; border-top: 2px solid black !important">
                                    Total
                                </td>
                                <td style="text-align: right; border:none !important; border-top: 2px solid black !important">
                                    ${totalNilaiRincian.toLocaleString(
                                "en-US",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }
                            )}
                                </td>
                            </tr>
                            `;

                            let tbodyttdHTML = "";
                            tbodyttdHTML += `

                            <tr style="border:none !important">
                    <td style="text-align: center !important; width: 80px; border:none !important">Receiver</td>
                    <td style="text-align: center !important; width: 80px; border:none !important">Cashier</td>
                    <td style="border:none !important"></td>
                    <td style="border:none !important"></td>
                </tr>
                <tr style="border:none !important">
                    <td style="border:none !important">&nbsp;</td>
                    <td style="border:none !important">&nbsp;</td>
                    <td style="width: 80px; text-align: right !important; font-style: italic; border:none !important">
                        Note :</td>
                    <td style="border:none !important" id="batal_p">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                    </td>
                    <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                    </td>
                    <td style="border:none !important">&nbsp;</td>
                    <td style="border:none !important" id="alasan_p">&nbsp;</td>
                </tr>
                            `;
                            // Menambahkan hasil ke dalam tbody
                            document.querySelector(
                                "#ttdTable tbody"
                            ).innerHTML = tbodyttdHTML;

                            // Menambahkan hasil ke dalam tbody
                            document.querySelector(
                                "#paymentTable tbody"
                            ).innerHTML = tbodyHTML;

                            document.getElementById("alasan_p").innerHTML =
                                data.data[0].Alasan;

                            document.getElementById("batal_p").innerHTML =
                                data.data[0].Batal;

                            window.print();
                        }
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    },
                });
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(rowData);
        bg_b.value = null;
        proses = 1;
        if (rowData == null && rowData == undefined) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }
        if (bg == true) {
            noJnsByr.value = "";
            jumlahJnsByr.value = "";
            jatuhTempo.valueAsDate = new Date();
            var modalBG = new bootstrap.Modal(
                document.getElementById("formBGModal"),
                {
                    keyboard: false,
                }
            );
            modalBG.show();
            bank.value = rowData.Id_Bank;
            jnsByr.value = rowData.Jenis_Pembayaran;
            id_jnsByr.value = rowData.Id_Jenis_Bayar;
            jumlahJnsByr.value = 0;
            setTimeout(() => {
                noJnsByr.focus();
            }, 500);
        } else if (bg == false) {
            noBg.value = "";
            IdDetailBGCek.value = "";
            rincian.value = "";
            nilaiBayar.value = "";
            nilaiRincian.value = "";
            select_kodePerkiraan.val(null).trigger("change");
            var modalPem = new bootstrap.Modal(
                document.getElementById("formModalPembayaran"),
                {
                    keyboard: false,
                }
            );
            modalPem.show();
            bank_pembayaran.value = rowData.Id_Bank;
            jnsByr_pembayaran.value = rowData.Jenis_Pembayaran;
        } else {
            Swal.fire({
                title: "Detail BG/Cek atau Detail Pembayaran, Pilih dulu!",
                icon: "info",
                showConfirmButton: true,
            });
        }
    });

    const select_kodePerkiraan = $("#select_kodePerkiraan");
    select_kodePerkiraan.select2({
        dropdownParent: $("#formModalPembayaran"),
        placeholder: "Pilih Kode Perkiraan",
    });
    select_kodePerkiraan.on("select2:select", function () {
        const selectedKodePerkiraan = $(this).val();
        console.log(selectedKodePerkiraan);
        btn_prosesPembayaran.focus();
    });

    btn_noBg.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a No BG",
                html: '<table id="btnBGTable" class="display" style="width:100%"><thead><tr><th>No BG</th><th>No BG</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#btnBGTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#btnBGTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "/Kencana/MaintenanceBKKKRR2Kencana/getDetailBG",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_pembayaran: id_pembayaran.value,
                                },
                                // success: function (response) {
                                //     if (response.message) {
                                //         Swal.fire({
                                //             icon: "success",
                                //             title: "Success!",
                                //             text: response.message,
                                //             showConfirmButton: true,
                                //         }).then((result) => {
                                //             if (result.isConfirmed) {
                                //             }
                                //         });
                                //     } else if (response.error) {
                                //         Swal.fire({
                                //             icon: "info",
                                //             title: "Info!",
                                //             text: response.error,
                                //             showConfirmButton: false,
                                //         });
                                //     }
                                // },
                            },
                            columns: [
                                { data: "No_BGCek" },
                                { data: "Id_Detail_BGCek" },
                            ],
                            columnDefs: [{ targets: [1], visible: false }],
                        });
                        $("#btnBGTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    noBg.value = escapeHTML(selectedRow.No_BGCek.trim());
                    IdDetailBGCek.value = escapeHTML(
                        selectedRow.Id_Detail_BGCek.trim()
                    );
                    select_kodePerkiraan
                        .val(selectedRow.NoKodePerkiraan.trim())
                        .trigger("change");
                    // kdPerkiraan1.value = selectedRow.NoKodePerkiraan.trim();
                    // kdPerkiraan2.value = selectedRow.Keterangan.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
