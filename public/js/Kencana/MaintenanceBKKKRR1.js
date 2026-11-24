$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    // let table_atas = $("#table_atas").DataTable();
    // let table_bawah = $("#table_bawah").DataTable();
    let table_bawah = $("#table_bawah").DataTable({});
    let radiogrup_penagihan = document.getElementById("radiogrup_penagihan");
    let radiogrup_nopenagihan = document.getElementById(
        "radiogrup_nopenagihan"
    );
    let btn_tampil = document.getElementById("btn_tampil");
    let btn_proses = document.getElementById("btn_proses");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_batal = document.getElementById("btn_batal");
    let btn_okbkk = document.getElementById("btn_okbkk");
    let btn_group = document.getElementById("btn_group");
    let btn_kodeperkiraan = document.getElementById("btn_kodeperkiraan");
    let btn_koreksidetail = document.getElementById("btn_koreksidetail");
    let btn_hapusdetail = document.getElementById("btn_hapusdetail");
    let btn_cetakbkk = document.getElementById("btn_cetakbkk");
    let btn_prosesbkk = document.getElementById("btn_prosesbkk");
    let tutup_modal = document.getElementById("tutup_modal");
    let close_modal = document.getElementById("close_modal");
    let id_bayar = document.getElementById("id_bayar");
    let id_detail = document.getElementById("id_detail");
    let id_TT = document.getElementById("id_TT");
    let rincinan_bayar = document.getElementById("rincinan_bayar");
    let nilairincian_rp = document.getElementById("nilairincian_rp");
    let total = document.getElementById("total");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let bkk = document.getElementById("bkk");
    let nilaiBkk = document.getElementById("nilaiBkk");
    let nilaiPembulatan = document.getElementById("nilaiPembulatan");
    let kode_kira = document.getElementById("kode_kira");
    let keterangan_kira = document.getElementById("keterangan_kira");
    let tabletampilBKK = $("#tabletampilBKK").DataTable();
    let rowDataPertama;
    let rowDataBawah;
    let rowDataKedua;
    let rowDataBKK;
    let proses;
    let TT;
    let bulatan;
    let confirmPembulatan;

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

    btn_isi.disabled = true;
    btn_hapusdetail.style.display = "none";
    btn_proses.disabled = true;
    btn_koreksidetail.style.display = "none";
    let currentMonth = new Date().getMonth() + 1;
    month.value = currentMonth.toString().padStart(2, "0");
    let currentYear = new Date().getFullYear();
    year.value = currentYear;
    total.style.fontWeight = "bold";
    nilairincian_rp.value = 0;

    let table_kedua = $("#table_kedua").DataTable({});
    $("#table_kedua").parents("div.dataTables_wrapper").first().hide();

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

    rincinan_bayar.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            nilairincian_rp.focus();
        }
    });

    nilairincian_rp.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(nilairincian_rp.value.replace(/,/g, ""));
            nilairincian_rp.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            btn_kodeperkiraan.focus();
        }
    });

    month.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            year.focus();
            year.select();
        }
    });

    year.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_okbkk.focus();
        }
    });

    radiogrup_penagihan.addEventListener("click", function (event) {
        btn_isi.disabled = false;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_group.style.display = "none";
        btn_tampil.style.display = "none";
        TT = true;
        document.getElementById("judul_tabel").innerText = "Data Penagihan";
        $("#table_atas").parents("div.dataTables_wrapper").first().hide();
        table_kedua = $("#table_kedua").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/MaintenanceBKKKRR1Kencana/getPenagihan",
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
                    data: "Waktu_Penagihan",
                    render: function (data, type, row) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_Penagihan" },
                { data: "Id_Inv_Supp" },
                { data: "NM_SUP" },
                { data: "Nama_MataUang" },
                { data: "Nilai_Penagihan" },
                { data: "Lunas" },
                { data: "Status_PPN" },
            ],
            order: [[0, "desc"]],
            // columnDefs: [{ targets: [6], visible: false }],
            paging: false,
            scrollY: "300px",
            scrollCollapse: true,
        });
        $("#table_kedua").parents("div.dataTables_wrapper").first().show();
        Swal.fire({
            icon: "info",
            title: "Info!",
            text: "Menampilkan data penagihan!",
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
            } else {
            }
        });
    });

    radiogrup_nopenagihan.addEventListener("click", function (event) {
        btn_isi.disabled = false;
        btn_koreksi.disabled = false;
        btn_hapus.disabled = true;
        TT = false;
    });

    let table_atas = $("#table_atas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/Kencana/MaintenanceBKKKRR1Kencana/getDataAwalAtas",
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
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "NM_SUP" },
            { data: "Rincian_Bayar" },
            { data: "Nilai_Rincian" },
            { data: "Id_Supplier" },
        ],
        columnDefs: [{ targets: [5], visible: false }],
        paging: false,
        scrollY: "300px",
        scrollCollapse: true,
    });

    let rowDataArray = [];

    // Handle checkbox change events
    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                rowDataArray.push(rowDataPertama);
                // rowDataArray = [rowDataPertama];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            } else {
                // rowDataPertama = null;
                // Remove the unchecked row data from the array
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Penagihan
                rowDataArray = rowDataArray.filter(
                    (row) => row.Id_Pembayaran !== rowDataPertama.Id_Pembayaran
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    $("#table_kedua tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_kedua tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKedua = table_kedua.row($(this).closest("tr")).data();
                console.log(rowDataKedua, this, table_kedua);
            } else {
                rowDataKedua = null;
            }
        }
    );

    function parsePaymentValue(value) {
        return parseFloat(value.replace(/,/g, ""));
    }

    function calculateTotalPayment(rowDataArray) {
        return rowDataArray.reduce((total, row) => {
            return total + parsePaymentValue(row.Nilai_Rincian);
        }, 0);
    }

    let totalPaymentGeneral = 0;

    btn_group.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(rowDataArray);

        // let totalNilai = 0;

        // rowDataArray.forEach((item) => {
        //     // Hapus koma dan ubah ke float
        //     const nilai = parseFloat(item.Nilai_Rincian.replace(/,/g, ""));
        //     totalNilai += nilai;
        // });

        // // Format hasil dengan numeral.js (pastikan numeral sudah dimuat)
        // console.log(
        //     "Total Nilai Rincian: " + numeral(totalNilai).format("0,0.00")
        // );

        let idBayarString = rowDataArray
            .map((item) => item.Id_Pembayaran)
            .join(",");
        console.log(idBayarString);
        // const totalPayment = calculateTotalPayment(rowDataArray);
        let totalPayment = 0;
        $.ajax({
            url: "/Kencana/MaintenanceBKKKRR1Kencana/getTotal",
            type: "GET",
            data: {
                _token: csrfToken,
                rowDataArray: rowDataArray,
            },
            success: function (data) {
                console.log(data);
                totalPayment = numeral(data[0]).format('0,0.00');
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
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
                        $.ajax({
                            url: "/Kencana/MaintenanceBKKKRR1Kencana/getGroup",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                rowDataArray: rowDataArray,
                                tanggalgrup: selectedDate,
                                idBayarString: idBayarString,
                                // totalNilai: totalNilai,
                            },
                            success: function (response) {
                                console.log(selectedDate);
                                console.log(selectedDate.substring(1, 4));
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
                                            console.log(response);
                                            bkk.value = response.idBKK;
                                            nilaiBkk.value = numeral(
                                                response.totalBayar
                                            ).format("0,0.00");
                                            nilaiPembulatan.value = numeral(
                                                response.totalBayar
                                            ).format("0,0.00");
                                            month.value = selectedDate.substring(5, 7);
                                            year.value = selectedDate.substring(0, 4);
                                            var myModal = new bootstrap.Modal(
                                                document.getElementById("dataBKKModal"),
                                                { keyboard: false }
                                            );
                                            document
                                                .getElementById("dataBKKModal")
                                                .addEventListener(
                                                    "shown.bs.modal",
                                                    function () {
                                                        month.focus();
                                                        month.select();
                                                    }
                                                );
                                            myModal.show();
                                            btn_okbkk.click();
                                            table_atas.ajax.reload();
                                            rowDataArray = [];
                                            rowDataPertama = null;
                                            // tablekiri.ajax.reload();
                                            // tablekanan.ajax.reload();
                                            // id_detailkanan.value = "";
                                            // id_detailkiri.value = "";
                                            // id_pembayaran.value = "";
                                        } else {
                                            bkk.value = response.idBKK;
                                            nilaiBkk.value = numeral(
                                                response.totalBayar
                                            ).format("0,0.00");
                                            nilaiPembulatan.value = numeral(
                                                response.totalBayar
                                            ).format("0,0.00");
                                            month.value = selectedDate.substring(5, 7);
                                            year.value = selectedDate.substring(0, 4);
                                            var myModal = new bootstrap.Modal(
                                                document.getElementById("dataBKKModal"),
                                                { keyboard: false }
                                            );
                                            document
                                                .getElementById("dataBKKModal")
                                                .addEventListener(
                                                    "shown.bs.modal",
                                                    function () {
                                                        month.focus();
                                                        month.select();
                                                    }
                                                );
                                            myModal.show();
                                            btn_okbkk.click();
                                            table_atas.ajax.reload();
                                            rowDataArray = [];
                                            rowDataPertama = null;
                                            // tablekiri.ajax.reload();
                                            // tablekanan.ajax.reload();
                                            // id_detailkanan.value = "";
                                            // id_detailkiri.value = "";
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
                                let errorMessage =
                                    "Terjadi kesalahan saat memproses data.";
                                if (xhr.responseJSON && xhr.responseJSON.error) {
                                    errorMessage = xhr.responseJSON.error;
                                } else if (xhr.responseText) {
                                    try {
                                        const response = JSON.parse(xhr.responseText);
                                        errorMessage = response.error || errorMessage;
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

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        btn_proses.disabled = true;
        if (proses === 3) {
            Swal.fire({
                title: "Apakah anda yakin menghapus?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "/Kencana/MaintenanceBKKKRR1Kencana",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: proses,
                            TT: TT ? 1 : 0,
                            nilairincian_rp: nilairincian_rp.value,
                            id_bayar: id_bayar.value,
                            id_detail: id_detail.value,
                            id_TT: id_TT.value,
                            rincinan_bayar: rincinan_bayar.value,
                            kode_kira: kode_kira.value,
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
                                        location.reload();
                                    } else {
                                        location.reload();
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
        } else if (proses === 1 && TT === true) {
            $.ajax({
                url: "/Kencana/MaintenanceBKKKRR1Kencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    TT: TT ? 1 : 0,
                    bulatan: bulatan ? 1 : 0,
                    pajak: rowDataKedua.Status_PPN,
                    nilairincian_rp: nilairincian_rp.value,
                    id_bayar: id_bayar.value,
                    id_detail: id_detail.value,
                    id_TT: id_TT.value,
                    rincinan_bayar: rincinan_bayar.value,
                    kode_kira: kode_kira.value,
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
                            if (result.isConfirmed) {
                                location.reload();
                            } else {
                                location.reload();
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
        } else if (proses === 1 && TT === false) {
            $.ajax({
                url: "/Kencana/MaintenanceBKKKRR1Kencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    TT: TT ? 1 : 0,
                    bulatan: bulatan ? 1 : 0,
                    nilairincian_rp: nilairincian_rp.value,
                    id_bayar: id_bayar.value,
                    id_detail: id_detail.value,
                    id_TT: id_TT.value,
                    rincinan_bayar: rincinan_bayar.value,
                    kode_kira: kode_kira.value,
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
                            if (result.isConfirmed) {
                                if (id_bayar.value == "") {
                                    id_bayar.value = response.Id_Pembayaran;
                                    id_TT.value = response.Id_Penagihan;
                                }
                                btn_proses.disabled = true;
                                btn_isi.disabled = false;
                                btn_koreksi.style.display = "none";
                                btn_koreksidetail.style.display = "block";
                                btn_koreksidetail.disabled = false;
                                rincinan_bayar.value = "";
                                nilairincian_rp.value = 0;
                                kode_kira.value = "";
                                keterangan_kira.value = "";
                                rincinan_bayar.focus();
                                $("#table_atas").DataTable().ajax.reload();
                                table_bawah = $("#table_bawah").DataTable({
                                    responsive: true,
                                    processing: true,
                                    serverSide: true,
                                    destroy: true,
                                    ajax: {
                                        url: "/Kencana/MaintenanceBKKKRR1Kencana/getDetailPembayaran",
                                        dataType: "json",
                                        type: "GET",
                                        data: function (d) {
                                            return $.extend({}, d, {
                                                _token: csrfToken,
                                                id_bayar: id_bayar.value,
                                            });
                                        },
                                    },
                                    columns: [
                                        {
                                            data: "Id_Detail_Bayar",
                                            render: function (data) {
                                                return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                            },
                                        },
                                        { data: "Rincian_Bayar" },
                                        { data: "Nilai_Rincian" },
                                        { data: "Kode_Perkiraan" },
                                    ],
                                    // columnDefs: [{ targets: [1, 2], visible: false }],
                                    paging: false,
                                    scrollY: "300px",
                                    scrollCollapse: true,
                                });
                            } else {
                                if (id_bayar.value == "") {
                                    id_bayar.value = response.Id_Pembayaran;
                                    id_TT.value = response.Id_Penagihan;
                                }
                                btn_proses.disabled = true;
                                btn_isi.disabled = false;
                                btn_koreksi.style.display = "none";
                                btn_koreksidetail.style.display = "block";
                                btn_koreksidetail.disabled = false;
                                rincinan_bayar.value = "";
                                nilairincian_rp.value = 0;
                                kode_kira.value = "";
                                keterangan_kira.value = "";
                                rincinan_bayar.focus();
                                $("#table_atas").DataTable().ajax.reload();
                                table_bawah = $("#table_bawah").DataTable({
                                    responsive: true,
                                    processing: true,
                                    serverSide: true,
                                    destroy: true,
                                    ajax: {
                                        url: "/Kencana/MaintenanceBKKKRR1Kencana/getDetailPembayaran",
                                        dataType: "json",
                                        type: "GET",
                                        data: function (d) {
                                            return $.extend({}, d, {
                                                _token: csrfToken,
                                                id_bayar: id_bayar.value,
                                            });
                                        },
                                    },
                                    columns: [
                                        {
                                            data: "Id_Detail_Bayar",
                                            render: function (data) {
                                                return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                            },
                                        },
                                        { data: "Rincian_Bayar" },
                                        { data: "Nilai_Rincian" },
                                        { data: "Kode_Perkiraan" },
                                    ],
                                    // columnDefs: [{ targets: [1, 2], visible: false }],
                                });
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
        } else if ((proses === 1 && TT == undefined) || TT == null) {
            $.ajax({
                url: "/Kencana/MaintenanceBKKKRR1Kencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    TT: TT ? 1 : 0,
                    bulatan: bulatan ? 1 : 0,
                    nilairincian_rp: nilairincian_rp.value,
                    id_bayar: id_bayar.value,
                    id_detail: id_detail.value,
                    id_TT: id_TT.value,
                    rincinan_bayar: rincinan_bayar.value,
                    kode_kira: kode_kira.value,
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
                            if (result.isConfirmed) {
                                if (id_bayar.value == "") {
                                    id_bayar.value = response.Id_Pembayaran;
                                    id_TT.value = response.Id_Penagihan;
                                }
                                btn_proses.disabled = true;
                                btn_isi.disabled = false;
                                btn_koreksi.style.display = "none";
                                btn_koreksidetail.style.display = "block";
                                btn_koreksidetail.disabled = false;
                                rincinan_bayar.value = "";
                                nilairincian_rp.value = 0;
                                kode_kira.value = "";
                                keterangan_kira.value = "";
                                rincinan_bayar.focus();
                                $("#table_atas").DataTable().ajax.reload();
                                table_bawah = $("#table_bawah").DataTable({
                                    responsive: true,
                                    processing: true,
                                    serverSide: true,
                                    destroy: true,
                                    ajax: {
                                        url: "/Kencana/MaintenanceBKKKRR1Kencana/getDetailPembayaran",
                                        dataType: "json",
                                        type: "GET",
                                        data: function (d) {
                                            return $.extend({}, d, {
                                                _token: csrfToken,
                                                id_bayar: id_bayar.value,
                                            });
                                        },
                                    },
                                    columns: [
                                        {
                                            data: "Id_Detail_Bayar",
                                            render: function (data) {
                                                return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                            },
                                        },
                                        { data: "Rincian_Bayar" },
                                        { data: "Nilai_Rincian" },
                                        { data: "Kode_Perkiraan" },
                                    ],
                                    // columnDefs: [{ targets: [1, 2], visible: false }],
                                    paging: false,
                                    scrollY: "300px",
                                    scrollCollapse: true,
                                });
                            } else {
                                if (id_bayar.value == "") {
                                    id_bayar.value = response.Id_Pembayaran;
                                    id_TT.value = response.Id_Penagihan;
                                }
                                btn_proses.disabled = true;
                                btn_isi.disabled = false;
                                btn_koreksi.style.display = "none";
                                btn_koreksidetail.style.display = "block";
                                btn_koreksidetail.disabled = false;
                                rincinan_bayar.value = "";
                                nilairincian_rp.value = 0;
                                kode_kira.value = "";
                                keterangan_kira.value = "";
                                rincinan_bayar.focus();
                                $("#table_atas").DataTable().ajax.reload();
                                table_bawah = $("#table_bawah").DataTable({
                                    responsive: true,
                                    processing: true,
                                    serverSide: true,
                                    destroy: true,
                                    ajax: {
                                        url: "/Kencana/MaintenanceBKKKRR1Kencana/getDetailPembayaran",
                                        dataType: "json",
                                        type: "GET",
                                        data: function (d) {
                                            return $.extend({}, d, {
                                                _token: csrfToken,
                                                id_bayar: id_bayar.value,
                                            });
                                        },
                                    },
                                    columns: [
                                        {
                                            data: "Id_Detail_Bayar",
                                            render: function (data) {
                                                return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                            },
                                        },
                                        { data: "Rincian_Bayar" },
                                        { data: "Nilai_Rincian" },
                                        { data: "Kode_Perkiraan" },
                                    ],
                                    // columnDefs: [{ targets: [1, 2], visible: false }],
                                });
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
        } else {
            $.ajax({
                url: "/Kencana/MaintenanceBKKKRR1Kencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    TT: TT ? 1 : 0,
                    bulatan: bulatan ? 1 : 0,
                    nilairincian_rp: nilairincian_rp.value,
                    id_bayar: id_bayar.value,
                    id_detail: id_detail.value,
                    id_TT: id_TT.value,
                    rincinan_bayar: rincinan_bayar.value,
                    kode_kira: kode_kira.value,
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
                                location.reload();
                            } else {
                                location.reload();
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

    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(TT);
        btn_proses.disabled = false;
        if (TT === true) {
            Swal.fire({
                icon: "info",
                text: "Pembayaran penagihan terdapat pembulatan?",
                showConfirmButton: true,
                confirmButtonText: "Yes",
                showCancelButton: true,
                cancelButtonText: "No",
            }).then((result) => {
                if (result.isConfirmed) {
                    bulatan = true;
                    setTimeout(() => {
                        btn_kodeperkiraan.focus();
                    }, 300);
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    bulatan = false;
                    setTimeout(() => {
                        btn_kodeperkiraan.focus();
                    }, 300);
                }
            });
            if (rowDataKedua == null) {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih data terlebih dahulu",
                    showConfirmButton: true,
                });
                return;
            } else {
                btn_isi.disabled = true;
                proses = 1;
                id_TT.value = rowDataKedua.Id_Penagihan;
                rincinan_bayar.value = rowDataKedua.Id_Penagihan;
                nilairincian_rp.value = rowDataKedua.Nilai_Penagihan;
            }
        } else if (TT === false) {
            proses = 1;
            btn_isi.disabled = true;
            btn_koreksidetail.disabled = true;
            rincinan_bayar.focus();
        } else if (TT == undefined || TT == null) {
            proses = 1;
            btn_isi.disabled = true;
            btn_koreksidetail.disabled = true;
            rincinan_bayar.focus();
        }
    });

    btn_koreksi.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(rowDataArray);

        if (rowDataPertama == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        } else {
            if (rowDataArray.length === 1) {
                btn_isi.textContent = "Tambah";
                btn_isi.disabled = false;
                btn_koreksi.disabled = true;
                btn_hapus.disabled = true;
                btn_koreksi.style.display = "none";
                btn_koreksidetail.style.display = "block";
                proses = 2;
                id_bayar.value = rowDataPertama.Id_Pembayaran;
                id_TT.value = rowDataPertama.Id_Penagihan;
                total.value = rowDataPertama.Nilai_Rincian;

                if ($.fn.DataTable.isDataTable("#table_bawah")) {
                    $("#table_bawah").DataTable().destroy();
                }

                table_bawah = $("#table_bawah").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    ajax: {
                        url: "/Kencana/MaintenanceBKKKRR1Kencana/getDetailPembayaran",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                id_bayar: id_bayar.value,
                            });
                        },
                    },
                    columns: [
                        {
                            data: "Id_Detail_Bayar",
                            render: function (data) {
                                return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                            },
                        },
                        { data: "Rincian_Bayar" },
                        { data: "Nilai_Rincian" },
                        { data: "Kode_Perkiraan" },
                    ],
                    // columnDefs: [{ targets: [1, 2], visible: false }],
                    paging: false,
                    scrollY: "300px",
                    scrollCollapse: true,
                });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Hanya ada satu data yang dapat dikoreksi",
                    showConfirmButton: true,
                });
                return;
            }
        }
    });

    btn_koreksidetail.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataBawah == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data detail terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        } else {
            btn_isi.disabled = true;
            btn_koreksidetail.disabled = true;
            btn_proses.disabled = false;
            proses = 2;
            id_detail.value = rowDataBawah.Id_Detail_Bayar;
            rincinan_bayar.value = escapeHTML(rowDataBawah.Rincian_Bayar);
            nilairincian_rp.value = rowDataBawah.Nilai_Rincian;
            kode_kira.value = rowDataBawah.Kode_Perkiraan;
        }
    });

    btn_hapus.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataPertama == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        } else {
            btn_koreksi.disabled = true;
            btn_hapus.disabled = true;
            btn_hapus.style.display = "none";
            btn_hapusdetail.style.display = "block";
            proses = 3;
            id_bayar.value = rowDataPertama.Id_Pembayaran;
            id_TT.value = rowDataPertama.Id_Penagihan;
            total.value = rowDataPertama.Nilai_Rincian;

            if ($.fn.DataTable.isDataTable("#table_bawah")) {
                $("#table_bawah").DataTable().destroy();
            }

            table_bawah = $("#table_bawah").DataTable({
                responsive: true,
                processing: true,
                serverSide: true,
                ajax: {
                    url: "/Kencana/MaintenanceBKKKRR1Kencana/getDetailPembayaran",
                    dataType: "json",
                    type: "GET",
                    data: function (d) {
                        return $.extend({}, d, {
                            _token: csrfToken,
                            id_bayar: id_bayar.value,
                        });
                    },
                },
                columns: [
                    {
                        data: "Id_Detail_Bayar",
                        render: function (data) {
                            return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                        },
                    },
                    { data: "Rincian_Bayar" },
                    { data: "Nilai_Rincian" },
                    { data: "Kode_Perkiraan" },
                ],
                // columnDefs: [{ targets: [1, 2], visible: false }],
                paging: false,
                scrollY: "300px",
                scrollCollapse: true,
            });
        }
    });

    btn_hapusdetail.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataBawah == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data detail terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        } else {
            btn_hapusdetail.disabled = true;
            btn_proses.disabled = false;
            proses = 3;
            id_detail.value = rowDataBawah.Id_Detail_Bayar;
            rincinan_bayar.value = rowDataBawah.Rincian_Bayar;
            nilairincian_rp.value = rowDataBawah.Nilai_Rincian;
            kode_kira.value = rowDataBawah.Kode_Perkiraan;
        }
    });

    $("#table_bawah tbody").off("change", 'input[name="penerimaCheckbox"]');

    $("#table_bawah tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataBawah = table_bawah.row($(this).closest("tr")).data();
                console.log(rowDataBawah, this, table_bawah);
            } else {
                rowDataBawah = null;
            }
        }
    );

    btn_tampil.addEventListener("click", function (event) {
        event.preventDefault();
        tabletampilBKK = $("#tabletampilBKK").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/MaintenanceBKKKRR1Kencana/getTampilBKK",
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
                // { data: "Id_MataUang" },
                // { data: "Id_Jenis_Bayar" },
            ],
            // columnDefs: [{ targets: [3, 4], visible: false }],
            paging: false,
            scrollY: "250px",
            scrollCollapse: true,
        });
        var myModal = new bootstrap.Modal(
            document.getElementById("dataBKKModal"),
            {
                keyboard: false,
            }
        );
        document
            .getElementById("dataBKKModal")
            .addEventListener("shown.bs.modal", function () {
                month.focus();
                month.select();
            });
        myModal.show();
    });

    close_modal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
        // if ($.fn.DataTable.isDataTable("#tabletampilBKK")) {
        //     $("#tabletampilBKK").DataTable().destroy();
        // }
        // bkk.value = "";
        // nilaiBkk.value = "";
        // nilaiPembulatan.value = "";
        // rowDataBKKArray = [];
        // rowDataBKK = null;
    });

    tutup_modal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
        // if ($.fn.DataTable.isDataTable("#tabletampilBKK")) {
        //     $("#tabletampilBKK").DataTable().destroy();
        // }
        // bkk.value = "";
        // nilaiBkk.value = "";
        // nilaiPembulatan.value = "";
        // rowDataBKKArray = [];
        // rowDataBKK = null;
    });

    btn_kodeperkiraan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKira" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
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
                                url: "/Kencana/MaintenanceBKKKRR1Kencana/getKira",
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
                            paging: false,
                            scrollY: "300px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#tableKira_filter input").focus();
                        }, 300);
                        // $("#tableKira_filter input").on("keyup", function () {
                        //     table
                        //         .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //         .search(this.value) // Cari berdasarkan input pencarian
                        //         .draw(); // Perbarui hasil pencarian
                        // });
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
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kode_kira.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    keterangan_kira.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );

                    setTimeout(() => {
                        btn_proses.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
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
            } else {
                rowDataBKK = null;
                // Remove the unchecked row data from the array
                // rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Penagihan
                // rowDataArray = rowDataArray.filter(
                //     (row) => row.Id_Penagihan !== rowDataPertama.Id_Penagihan
                // );
                rowDataBKKArray = [];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    document
        .getElementById("nilaiPembulatan")
        .addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();

                // Get the input value
                let inputValue = this.value;

                // Convert the value to a number and format it
                let formattedValue = new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(parseFloat(inputValue.replace(/,/g, "")));

                // Set the formatted value back to the input field
                this.value = formattedValue;
            }
        });

    btn_cetakbkk.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataBKK == null || rowDataBKK == undefined) {
            // Swal.fire({
            //     icon: "info",
            //     title: "Info!",
            //     text: "Pilih data terlebih dahulu",
            //     showConfirmButton: true,
            // });
            // return;
            // nilaiBkk.value = rowDataPertama.Nilai_Pembayaran;
            // nilaiPembulatan.value = rowDataPertama.Nilai_Pembayaran;
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
        }).then((result) => {
            if (result.isConfirmed) {
                confirmPembulatan = "yes";
                btn_cetakbkk.style.display = "none";
                btn_prosesbkk.style.display = "block";
                setTimeout(() => {
                    nilaiPembulatan.focus();
                    nilaiPembulatan.select();
                }, 300);
            } else {
                setTimeout(() => {
                    confirmPembulatan = "no";
                    document.getElementById("btn_prosesbkk").click();
                }, 300);
            }
        });
    });

    btn_prosesbkk.addEventListener("click", function (event) {
        event.preventDefault();
        btn_cetakbkk.style.display = "block";
        btn_prosesbkk.style.display = "none";

        let nilaiTerbilang = nilaiPembulatan.value;
        let nilaiNumerik = nilaiTerbilang.replace(/,/g, "");
        nilaiNumerik = nilaiNumerik.split(".")[0];

        let terbilang;
        terbilang = convertNumberToWordsRupiah(nilaiNumerik);
        console.log(terbilang, rowDataBKKArray);

        $.ajax({
            url: "/Kencana/MaintenanceBKKKRR1Kencana/cetakBKK",
            type: "GET",
            data: {
                _token: csrfToken,
                rowDataBKKArray: rowDataBKKArray,
                nilaiPembulatan: nilaiPembulatan.value,
                confirmPembulatan: confirmPembulatan,
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
                        <td style="border:none !important; border-bottom: 2px solid black !important" id="nobg_p">Invoice
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
                            <td style="border:none !important;white-space: nowrap;">
                                ${item.Id_Penagihan ?? ""}
                            </td>
                            <td style="border:none !important;; text-align: right;">
                                ${parseFloat(item.Nilai_Rincian).toLocaleString(
                            "en-US",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )}
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
                            ${totalNilaiRincian.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
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
                    </tr>`;
                    // Menambahkan hasil ke dalam tbody
                    document.querySelector("#ttdTable tbody").innerHTML =
                        tbodyttdHTML;

                    // Menambahkan hasil ke dalam tbody
                    document.querySelector("#paymentTable tbody").innerHTML =
                        tbodyHTML;

                    document.getElementById("alasan_p").innerHTML =
                        data.data[0].Alasan;

                    document.getElementById("batal_p").innerHTML =
                        data.data[0].Batal;

                    window.print();
                } else if (data[0] == 2) {
                    document.getElementById("nobg_p").innerHTML = "Invoice No.";
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
                        <td style="border:none !important; border-bottom: 2px solid black !important" id="nobg_p">Invoice
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
                            <td style="border:none !important;white-space: nowrap;">
                                ${item.Id_Penagihan ?? ""}
                            </td>
                            <td style="border:none !important;; text-align: right;">
                                ${parseFloat(item.Nilai_Rincian).toLocaleString(
                            "en-US",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )}
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
                            ${totalNilaiRincian.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
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
                    document.querySelector("#ttdTable tbody").innerHTML =
                        tbodyttdHTML;

                    // Menambahkan hasil ke dalam tbody
                    document.querySelector("#paymentTable tbody").innerHTML =
                        tbodyHTML;

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
                        <td style="border:none !important; border-bottom: 2px solid black !important" id="nobg_p">Invoice
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
                            <td style="border:none !important;white-space: nowrap;">
                                ${item.Id_Penagihan ?? ""}
                            </td>
                            <td style="border:none !important;; text-align: right;">
                                ${parseFloat(item.Nilai_Rincian).toLocaleString(
                            "en-US",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )}
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
                            ${totalNilaiRincian.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
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
                    document.querySelector("#ttdTable tbody").innerHTML =
                        tbodyttdHTML;

                    // Menambahkan hasil ke dalam tbody
                    document.querySelector("#paymentTable tbody").innerHTML =
                        tbodyHTML;

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
    });

    btn_okbkk.addEventListener("click", function (event) {
        event.preventDefault();
        tabletampilBKK = $("#tabletampilBKK").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/MaintenanceBKKKRR1Kencana/getTampilBKK",
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
                // { data: "Id_MataUang" },
                // { data: "Id_Jenis_Bayar" },
            ],
            // columnDefs: [{ targets: [3, 4], visible: false }],
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
            }, 2000);
            // document
            //     .getElementById("modalDetailPelunasan")
            //     .addEventListener("shown.bs.modal", function () {
            //         setTimeout(() => {
            //             btn_cetakbkk.click();
            //         }, 300);
            //     });
        }
    });
});
