$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_okbkm = document.getElementById("btn_okbkm");
    let btn_perkiraan = document.getElementById("btn_perkiraan");
    let btn_tampilbkk = document.getElementById("btn_tampilbkk");
    let btnBatal = document.getElementById("btnBatal");
    let btnProses = document.getElementById("btnProses");
    let btnPilihBKM = document.getElementById("btnPilihBKM");

    let idBKK = document.getElementById("idBKK");
    let bkk = document.getElementById("bkk");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let tanggal = document.getElementById("tanggal");
    let idKodePerkiraan = document.getElementById("idKodePerkiraan");
    let ketKodePerkiraan = document.getElementById("ketKodePerkiraan");
    let jumlahUang = document.getElementById("jumlahUang");
    let uraian = document.getElementById("uraian");
    let tgl_awalbkk = document.getElementById("tgl_awalbkk");
    let tgl_akhirbkk = document.getElementById("tgl_akhirbkk");
    let id_bank, id_bank1, id_bkm, id_bkk, jenis_bank, idMtUang, nilai, Konversi, user_id;


    let table_DataBKM = $("#table_DataBKM").DataTable({
        // columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let table_RincianData = $("#table_RincianData").DataTable({
        columnDefs: [{ targets: [5, 6, 7], visible: false }],
    });
    let rowDataPertama;

    tanggal.valueAsDate = new Date();
    tgl_awalbkk.valueAsDate = new Date();
    tgl_akhirbkk.valueAsDate = new Date();
    jumlahUang.value = "0";

    bulan.focus();
    bulan.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            tahun.focus();
        }
    });

    tahun.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            btn_ok.focus();
        }
    });

    uraian.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            if (id_bank === "KRR1" || id_bank === "KRR2") {
                if (id_bank === "KRR2") {
                    id_bank1 = "KI";
                } else if (id_bank === "KRR1") {
                    id_bank1 = "KKK";
                }
            } else {
                id_bank1 = id_bank;
            }

            $.ajax({
                type: 'GET',
                url: '/Kencana/BKMxBKKPembulatanKencana/getUraian',
                data: {
                    _token: csrfToken,
                    id_bank1: id_bank1,
                    tanggal: tanggal.value
                },
                success: function (response) {
                    idBKK.value = response.IdBKK.trim();
                    btnProses.focus();
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    });

    tanggal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            btn_perkiraan.focus();
        }
    });


    btn_ok.addEventListener("click", async function (event) {
        event.preventDefault();
        if (bulan.value === '' && tahun.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Isi Dulu Bulan & Tahun!!',
                returnFocus: false
            }).then(() => {
                bulan.focus();
            })
        } else {
            showDataBKM();
        }

    });

    function showDataBKM() {
        table_DataBKM = $("#table_DataBKM").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/BKMxBKKPembulatanKencana/getBKM",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bulan: bulan.value,
                        tahun: tahun.value,
                    });
                },
                error: function (xhr) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Terjadi kesalahan saat mengambil data.',
                        returnFocus: false
                    });
                    table_DataBKM.clear().draw();
                },
                dataSrc: function (json) {
                    if (json.data.length === 0) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Tidak Ada BKM Pembulatan',
                            returnFocus: false
                        });
                    }
                    return json.data;
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKM" },
                { data: "Total" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
        });
    }


    let rowDataArray = [];

    // Handle checkbox change events
    $("#table_DataBKM tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_DataBKM tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_DataBKM
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                rowDataArray.push(rowDataPertama);

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_DataBKM);

                showRincian();

            } else {
                // Remove the unchecked row data from the array
                rowDataPertama = null;

                // rowDataPertama = table_DataBKM
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArray = rowDataArray.filter(
                    (row) => row !== rowDataPertama
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_DataBKM);
            }
        }
    );

    function showRincian() {
        table_RincianData = $("#table_RincianData").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/BKMxBKKPembulatanKencana/getBKMDetails",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idBKM: rowDataPertama.Id_BKM,
                    });
                },
            },
            columns: [
                {
                    data: "NamaCust",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "No_Bukti" },
                { data: "ID_Penagihan" },
                { data: "MataUang" },
                { data: "Rincian" },
                { data: "Id_bank" },
                { data: "Jenis_Bank" },
                { data: "Id_MataUang" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            columnDefs: [{ targets: [5, 6, 7], visible: false }],
        });
    }

    $("#table_RincianData tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_RincianData tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_RincianData.row(this).data();
        console.log(data);

        btnPilihBKM.addEventListener("click", async function (event) {
            id_bank = data.Id_bank.trim();
            jenis_bank = data.Jenis_Bank.trim();
            idMtUang = data.Id_MataUang.trim();
            id_bkm = rowDataArray[0].Id_BKM.trim();
            jumlahUang.value = rowDataArray[0].Total.trim();
            tanggal.focus();
        });
    });


    btn_perkiraan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            Swal.fire({
                title: "Kode Perkiraan",
                html: '<table id="tableKira" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                returnFocus: false,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableKira")
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
                        const table = $("#tableKira").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "CreateBKM/getKodePerkiraan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "NoKodePerkiraan" },
                                { data: "Keterangan" },
                            ],
                        });
                        $("#tableKira tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableKira")
                        );
                    });
                },
            }).then((result) => {
                console.log(result);

                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    idKodePerkiraan.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ketKodePerkiraan.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                    uraian.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    function formatDate(dateString) {
        let dateObj = new Date(dateString);

        let month = dateObj.getMonth() + 1;
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();

        return (
            (month < 10 ? month : month) + '/' +
            (day < 10 ? day : day) + '/' +
            year
        );
    }

    function formatDateString(dateString) {
        let dateObj = new Date(dateString);
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let day = dateObj.getDate(); // Get the day without leading zero

        return (
            day + '/' +  // No need to add a leading zero manually
            monthNames[dateObj.getMonth()] + '/' +
            dateObj.getFullYear()
        );
    }


    //#region Modal Tampil BKK
    btn_cetakbkm.addEventListener("click", async function (event) {
        event.preventDefault();

        if (rowDataArray.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Pilih 1 Id.BKK Untuk DiCetak!',
                returnFocus: false
            });
        } else {
            $.ajax({
                url: "/Kencana/BKMxBKKPembulatanKencana/cetakBKM",
                type: "GET",
                data: {
                    _token: csrfToken,
                    bkk: bkk.value,
                },
                success: function (data) {
                    console.log(data);

                    document.getElementById("nomer").innerHTML = data.data[0].Id_BKK.trim();
                    document.getElementById("tglCetak").innerHTML = formatDate(data.data[0].Tgl_Input);
                    document.getElementById("symbol").innerHTML = data.data[0].Symbol.trim();
                    document.getElementById("symbol2").innerHTML = data.data[0].Symbol.trim();
                    document.getElementById("nilaiPembulatan").innerHTML =
                        parseFloat(data.data[0].Nilai_Pembulatan.trim()).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        });
                    document.getElementById("terbilangCetak").innerHTML = data.data[0].Terjemahan.trim();
                    document.getElementById("jenisPembayaran").innerHTML = data.data[0].Jenis_Pembayaran.trim();
                    document.getElementById("idBKMAcuan").innerHTML = data.data[0].Id_BKM_Acuan.trim();
                    document.getElementById("tanggalBKM").innerHTML = formatDate(data.data[0].Tgl_BKM);
                    document.getElementById("tglCetakForm").innerHTML = formatDateString(tanggal.valueAsDate);

                    document.getElementById("kodeperkiraan").innerHTML = "";
                    document.getElementById("jenispemb").innerHTML = "";
                    document.getElementById("jatuhtempo").innerHTML = "";
                    document.getElementById("rincianBayar").innerHTML = "";
                    document.getElementById("nilairincian").innerHTML = "";

                    let totalNilaiRincian = 0;

                    data.data.forEach(function (item, index) {
                        // Jenis Pembayaran and Jatuh Tempo
                        let pemb = document.createElement("div");
                        let temp = document.createElement("div");
                        pemb.innerHTML =  '&nbsp';
                        temp.innerHTML =  '&nbsp';
                        document.getElementById("jenispemb").appendChild(pemb);
                        document.getElementById("jatuhtempo").appendChild(temp);

                        // Kode Perkiraan
                        let kodeDiv = document.createElement("div");
                        kodeDiv.innerHTML = item.Kode_Perkiraan;
                        kodeDiv.classList.add("text-center");
                        // kodeDiv.style.textAlign= 'center';
                        document.getElementById("kodeperkiraan").appendChild(kodeDiv);

                        // Rincian
                        let rincianDiv = document.createElement("div");
                        rincianDiv.innerHTML = item.Rincian_Bayar ? item.Rincian_Bayar : '&nbsp';
                        document.getElementById("rincianBayar").appendChild(rincianDiv);

                        // Nilai Rincian
                        let nilaiRincian = parseFloat(item.Nilai_Rincian);
                        let formattedValue = nilaiRincian.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        });

                        let nilaiDiv = document.createElement("div");
                        nilaiDiv.innerHTML = formattedValue;
                        document.getElementById("nilairincian").appendChild(nilaiDiv);

                        // Update total
                        totalNilaiRincian += nilaiRincian;
                    });


                    // Format total dan tampilkan di element dengan id "grandTotal"
                    document.getElementById("grandTotal").innerHTML =
                        totalNilaiRincian.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        });

                    // document.getElementById("alasan_p").innerHTML =
                    //     data.data[0].Alasan;

                    // document.getElementById("batal_p").innerHTML =
                    //     data.data[0].Batal;

                    window.print();
                    // }
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                },
            });
        }


    });

    btn_tampilbkk.addEventListener("click", async function (event) {
        event.preventDefault();
        var myModal = new bootstrap.Modal(
            document.getElementById("dataBKKModal"),
            {
                keyboard: false,
            }
        );

        let = tabletampilBKM = $("#tabletampilBKM").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/BKMxBKKPembulatanKencana/getPembulatan",
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
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKK" },
                { data: "Nilai_Pembulatan" },
                { data: "Terjemahan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [5], visible: false }],
        });

        myModal.show();
    });

    $('#dataBKKModal').on('hidden.bs.modal', function () {
        tgl_awalbkk.valueAsDate = new Date();
        tgl_akhirbkk.valueAsDate = new Date();
        bkk.value = '';
    });

    btn_okbkm.addEventListener("click", async function (event) {
        event.preventDefault();
        tabletampilBKM = $("#tabletampilBKM").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/BKMxBKKPembulatanKencana/getOkBKM",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awalbkk: tgl_awalbkk.value,
                        tgl_akhirbkk: tgl_akhirbkk.value,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKK" },
                { data: "Nilai_Pembulatan" },
                { data: "Terjemahan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [3, 4], visible: false }],
        });
    });

    let rowDataArrayKetiga = [];

    $("#tabletampilBKM tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#tabletampilBKM tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKetiga = tabletampilBKM
                    .row($(this).closest("tr"))
                    .data();
                rowDataArray.push(rowDataKetiga);
                bkk.value = rowDataKetiga.Id_BKK;
                console.log(rowDataArrayKetiga);
                console.log(rowDataKetiga, this, tabletampilBKM);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArray = [];
                rowDataKetiga = null;
                bkk.value = "";
                console.log(rowDataArrayKetiga);
                console.log(rowDataKetiga, this, tabletampilBKM);
            }
        }
    );

    btnBatal.addEventListener("click", async function (event) {
        tanggal.valueAsDate = new Date();
        idBKK.value = '';
        idKodePerkiraan = '';
        ketKodePerkiraan = '';
        jumlahUang = '0';
        uraian = '';
        id_bank = '';
        id_bank1 = '';
        jenis_bank = '';
    });

    function getUserId() {
        $.ajax({
            type: 'GET',
            url: '/Kencana/BKMxBKKPembulatanKencana/getUserId',
            data: {
                _token: csrfToken
            },
            success: function (result) {
                user_id = result.user.trim();
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }
    getUserId();

    function convertNumberToWordsRupiah(num) {
        // Arrays to hold number words
        const ones = [
            "",
            "SATU",
            "DUA",
            "TIGA",
            "EMPAT",
            "LIMA",
            "ENAM",
            "TUJUH",
            "DELAPAN",
            "SEMBILAN",
        ];
        const tens = [
            "",
            "",
            "DUA PULUH",
            "TIGA PULUH",
            "EMPAT PULUH",
            "LIMA PULUH",
            "ENAM PULUH",
            "TUJUH PULUH",
            "DELAPAN PULUH",
            "SEMBILAN PULUH",
        ];
        const teens = [
            "SEPULUH",
            "SEBELAS",
            "DUA BELAS",
            "TIGA BELAS",
            "EMPAT BELAS",
            "LIMA BELAS",
            "ENAM BELAS",
            "TUJUH BELAS",
            "DELAPAN BELAS",
            "SEMBILAN BELAS",
        ];


        function convert(num) {
            if (num === 0) return "NOL RUPIAH";

            const convertBillions = (num) => {
                if (num >= 1000000000) {
                    return (
                        convertBillions(Math.floor(num / 1000000000)) +
                        " MILYAR " +
                        convertMillions(num % 1000000000)
                    );
                } else {
                    return convertMillions(num);
                }
            };

            const convertMillions = (num) => {
                if (num >= 1000000) {
                    return (
                        convertMillions(Math.floor(num / 1000000)) +
                        " JUTA " +
                        convertThousands(num % 1000000)
                    );
                } else {
                    return convertThousands(num);
                }
            };

            const convertThousands = (num) => {
                if (num >= 1000) {
                    if (num >= 1000 && num < 2000) {
                        return "SERIBU " + convertHundreds(num % 1000);
                    } else {
                        return (
                            convertHundreds(Math.floor(num / 1000)) +
                            " RIBU " +
                            convertHundreds(num % 1000)
                        );
                    }
                } else {
                    return convertHundreds(num);
                }
            };

            const convertHundreds = (num) => {
                if (num > 99) {
                    if (num >= 100 && num < 200) {
                        return "SERATUS " + convertTens(num % 100);
                    } else {
                        return (
                            ones[Math.floor(num / 100)] +
                            " RATUS " +
                            convertTens(num % 100)
                        );
                    }
                } else {
                    return convertTens(num);
                }
            };

            const convertTens = (num) => {
                if (num < 10) return ones[num];
                else if (num >= 10 && num < 20) return teens[num - 10];
                else {
                    return tens[Math.floor(num / 10)] + " " + ones[num % 10];
                }
            };

            let result = convertBillions(num).trim();
            result = result.replace(/\s{2,}/g, " ");
            return result + " RUPIAH";
        }

        return convert(num);
    }

    function convertNumberToWordsDollar(num) {
        // Arrays to hold number words
        const ones = [
            "",
            "ONE",
            "TWO",
            "THREE",
            "FOUR",
            "FIVE",
            "SIX",
            "SEVEN",
            "EIGHT",
            "NINE",
        ];
        const tens = [
            "",
            "",
            "TWENTY",
            "THIRTY",
            "FORTY",
            "FIFTY",
            "SIXTY",
            "SEVENTY",
            "EIGHTY",
            "NINETY",
        ];
        const teens = [
            "TEN",
            "ELEVEN",
            "TWELVE",
            "THIRTEEN",
            "FOURTEEN",
            "FIFTEEN",
            "SIXTEEN",
            "SEVENTEEN",
            "EIGHTEEN",
            "NINETEEN",
        ];

        function convert(num) {
            if (num === 0) return "ZERO DOLLAR";

            const convertBillions = (num) => {
                if (num >= 1000000000) {
                    return (
                        convertBillions(Math.floor(num / 1000000000)) +
                        " BILLION " +
                        convertMillions(num % 1000000000)
                    );
                } else {
                    return convertMillions(num);
                }
            };

            const convertMillions = (num) => {
                if (num >= 1000000) {
                    return (
                        convertMillions(Math.floor(num / 1000000)) +
                        " MILLION " +
                        convertThousands(num % 1000000)
                    );
                } else {
                    return convertThousands(num);
                }
            };

            const convertThousands = (num) => {
                if (num >= 1000) {
                    return (
                        convertHundreds(Math.floor(num / 1000)) +
                        " THOUSAND " +
                        convertHundreds(num % 1000)
                    );
                } else {
                    return convertHundreds(num);
                }
            };

            const convertHundreds = (num) => {
                if (num > 99) {
                    return (
                        ones[Math.floor(num / 100)] +
                        " HUNDRED " +
                        convertTens(num % 100)
                    );
                } else {
                    return convertTens(num);
                }
            };

            const convertTens = (num) => {
                if (num < 10) return ones[num];
                else if (num >= 10 && num < 20) return teens[num - 10];
                else {
                    return tens[Math.floor(num / 10)] + " " + ones[num % 10];
                }
            };

            let result = convertBillions(num).trim();
            result = result.replace(/\s{2,}/g, " ");
            return result + " DOLLAR";
        }

        return convert(num);
    }

    //#region Proses

    btnProses.addEventListener("click", async function (event) {
        event.preventDefault();

        id1 = idBKK.value.substring(0, 3);
        id_bkk = parseInt(id1) || 0;
        nilai = 0;

        if (idBKK.value !== '') {
            nilai = numeral(parseFloat(jumlahUang.value)).format("0,0.0000");

            if (parseFloat(nilai) === 0 || nilai === "0.00" || nilai === "0.000") {
                nilai = 0;
            }

            if (idMtUang === '1') {
                Konversi = convertNumberToWordsRupiah(nilai);
            } else {
                Konversi = convertNumberToWordsDollar(nilai)
            }
            console.log('Konversi: ', Konversi);

            $.ajax({
                type: 'PUT',
                url: '/Kencana/BKMxBKKPembulatanKencana/proses',
                data: {
                    _token: csrfToken,
                    idBKK: idBKK.value,
                    tanggal: tanggal.value,
                    user_id: user_id,
                    Konversi: Konversi,
                    nilai: nilai,
                    id_bank: id_bank,
                    idMtUang: idMtUang,
                    id_bkm: id_bkm,
                    uraian: uraian.value,
                    idKodePerkiraan: idKodePerkiraan.value,
                    id_bkk: id_bkk,
                    id_bank1: id_bank1,
                    jenis_bank: jenis_bank
                },
                success: function (response) {
                    console.log(response);

                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            html: response.message,
                            returnFocus: false
                        }).then(() => {
                            tanggal.valueAsDate = new Date();
                            idBKK.value = '';
                            idKodePerkiraan.value = '';
                            ketKodePerkiraan.value = '';
                            jumlahUang.value = '0';
                            uraian.value = '';
                            id_bank = '';
                            id_bank1 = '';
                            jenis_bank = '';
                            rowDataPertama = [];

                            showDataBKM();
                            showRincian();
                            // table_RincianData.clear().draw();
                            // table_RincianData.ajax.reload();

                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            html: response.message,
                            returnFocus: false
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    });
});
