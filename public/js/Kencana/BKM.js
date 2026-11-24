$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let btn_bank = document.getElementById("btn_bank");
    let btn_ok = document.getElementById("btn_ok");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let nama_bank = document.getElementById("nama_bank");
    let OptBesar = document.getElementById("OptBesar");
    let IntRp = document.getElementById("IntRp");
    let EksRp = document.getElementById("EksRp");
    let OptKecil = document.getElementById("OptKecil");
    let IntUS = document.getElementById("IntUS");
    let EksUS = document.getElementById("EksUS");
    let JnsBank = null;
    let IdUang = null;
    let kodeRadio = null;
    let rowDataPertama;
    let table_bkm = $("#table_bkm").DataTable({
        columnDefs: [{ targets: [6], visible: false }],
    });
    let table_rp = $("#table_rp").DataTable({
        // columnDefs: [{ targets: [7, 8], visible: false }],
    });
    let table_rb = $("#table_rb").DataTable({
        // columnDefs: [{ targets: [7, 8], visible: false }],
    });
    let table_rk = $("#table_rk").DataTable({
        // columnDefs: [{ targets: [7, 8], visible: false }],
    });

    bulan.value = new Date().getMonth() + 1;
    tahun.value = new Date().getFullYear();
    bulan.focus();

    bulan.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tahun.focus();
        }
    });

    OptBesar.addEventListener("click", function (event) {
        nama_bank.value = "KRR2";
        JnsBank = null;
        IdUang = 0;
        kodeRadio = 1;
        btn_ok.focus();
    });

    OptKecil.addEventListener("click", function (event) {
        nama_bank.value = "KRR1";
        JnsBank = null;
        IdUang = null;
        kodeRadio = 2;
        btn_ok.focus();
    });

    IntRp.addEventListener("click", function (event) {
        nama_bank.value = "";
        JnsBank = "I";
        IdUang = 1;
        kodeRadio = 6;
        btn_bank.focus();
    });

    EksRp.addEventListener("click", function (event) {
        nama_bank.value = "";
        JnsBank = "E";
        IdUang = 1;
        kodeRadio = 4;
        btn_bank.focus();
    });

    IntUS.addEventListener("click", function (event) {
        nama_bank.value = "";
        JnsBank = "I";
        IdUang = 2;
        kodeRadio = 5;
        btn_bank.focus();
    });

    EksUS.addEventListener("click", function (event) {
        nama_bank.value = "";
        JnsBank = "E";
        IdUang = 2;
        kodeRadio = 3;
        btn_bank.focus();
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        if (rowDataPertama == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        } else {
            Swal.fire({
                title: "Isikan Tanggal Transaksi",
                icon: "info",
                html: '<input type="text" id="id_bkmS" class="swal2-input" readonly> <input type="text" id="jns_pemS" class="swal2-input" readonly> <input type="date" id="bkk_date" class="swal2-input">',
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                didOpen: () => {
                    // Get the current date
                    const today = new Date();
                    // Set the value of the input field
                    document.getElementById("bkk_date").valueAsDate = today;
                    document.getElementById("id_bkmS").value =
                        rowDataPertama.Id_BKM;
                    document.getElementById("jns_pemS").value =
                        rowDataPertama.Jenis_Pembayaran;
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
                    $.ajax({
                        url: "BKM",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            rowDataArray: rowDataArray,
                            tanggal: selectedDate,
                        },
                        success: function (response) {
                            console.log(response);
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    // title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then(() => {
                                    // document.querySelectorAll("input").forEach((input) => {
                                    //     // Check if the input is not 'tanggal', 'mata_uang', or 'id_uang' before clearing
                                    //     if (
                                    //         input.id !== "tanggal" &&
                                    //         input.id !== "mata_uang" &&
                                    //         input.id !== "id_uang"
                                    //     ) {
                                    //         input.value = "";

                                    //         // If the input is a checkbox, uncheck it
                                    //         if (input.type === "checkbox") {
                                    //             input.checked = false;
                                    //             // Reset related variables if needed
                                    //             proses = 1;
                                    //             cek = false;
                                    //         }
                                    //     }
                                    // });
                                    $("#table_bkm").DataTable().ajax.reload();
                                    $("#table_rp tbody").empty();
                                    $("#table_rb tbody").empty();
                                    $("#table_rk tbody").empty();
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "info",
                                    title: "Info!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr) {
                            alert(xhr.responseJSON.message);
                        },
                    });
                } else {
                    console.log("Pemilihan tanggal dibatalkan");
                }
            });
        }
    });

    btn_ok.addEventListener("click", async function (event) {
        event.preventDefault();
        if (kodeRadio == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih jenis transaksi dahulu !",
                showConfirmButton: true,
            });
        } else {
            table_bkm = $("#table_bkm").DataTable({
                responsive: true,
                processing: true,
                serverSide: true,
                destroy: true,
                ajax: {
                    url: "BKM/getBKMData",
                    dataType: "json",
                    type: "GET",
                    data: function (d) {
                        return $.extend({}, d, {
                            _token: csrfToken,
                            nama_bank: nama_bank.value,
                            bulan: bulan.value,
                            tahun: tahun.value,
                            kodeRadio: kodeRadio,
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
                    { data: "Id_BKM" },
                    { data: "Nilai_Pelunasan" },
                    { data: "Nama_MataUang" },
                    { data: "Id_bank" },
                    { data: "Jenis_Pembayaran" },
                    { data: "Id_Jenis_Bayar" },
                ],
                columnDefs: [{ targets: [6], visible: false }],
                paging: false,
                scrollY: "400px",
                scrollCollapse: true,
            });
        }
    });

    let rowDataArray = [];

    // Handle checkbox change events
    $("#table_bkm tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_bkm tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_bkm.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                rowDataArray = [rowDataPertama];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_bkm);
            } else {
                // Remove the unchecked row data from the array
                rowDataPertama = null;
                // rowDataPertama = table_bkm.row($(this).closest("tr")).data();

                rowDataArray = rowDataArray.filter(
                    (row) => row !== rowDataPertama
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_bkm);
            }
        }
    );

    // let rowDataArray = [];

    // $("#table_bkm tbody").off("change", 'input[name="penerimaCheckbox"]');
    // $("#table_bkm tbody").on(
    //     "change",
    //     'input[name="penerimaCheckbox"]',
    //     function () {
    //         if (this.checked) {
    //             $('input[name="penerimaCheckbox"]')
    //                 .not(this)
    //                 .prop("checked", false);
    //             rowDataPertama = table_bkm.row($(this).closest("tr")).data();
    //             rowDataArray.push(rowDataPertama);
    //             console.log(rowDataArray);
    //             console.log(rowDataPertama, this, table_bkm);
    //         } else {
    //             // Kosongkan array saat checkbox tidak dicentang
    //             rowDataArray = [];
    //             rowDataPertama = null;
    //             console.log(rowDataArray);
    //             console.log(rowDataPertama, this, table_bkm);
    //         }
    //     }
    // );

    // Clear rowDataArray when the table is reloaded
    $("#table_bkm").on("xhr.dt", function (e, settings, json, xhr) {
        rowDataArray = [];
    });

    $("#table_bkm tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_bkm tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_bkm.row(this).data();
        console.log(data);

        table_rp = $("#table_rp").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "BKM/getPelunasan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        id_bkm: data.Id_BKM,
                    });
                },
            },
            columns: [
                {
                    data: "Ket",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "Detail" },
                { data: "Kode_Perkiraan" },
            ],
            // columnDefs: [{ targets: [7, 8], visible: false }],
            // paging: false,
            // scrollY: "400px",
            // scrollCollapse: true,
        });

        table_rb = $("#table_rb").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "BKM/getBiaya",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        id_bkm: data.Id_BKM,
                    });
                },
            },
            columns: [
                {
                    data: "KetBiaya",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "Biaya" },
                { data: "Kode_Perkiraan" },
            ],
            // columnDefs: [{ targets: [7, 8], visible: false }],
            // paging: false,
            // scrollY: "400px",
            // scrollCollapse: true,
        });

        table_rk = $("#table_rk").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "BKM/getKurang",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        id_bkm: data.Id_BKM,
                    });
                },
            },
            columns: [
                {
                    data: "KetKrg",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "KurangLebih" },
                { data: "Kode_Perkiraan" },
            ],
            // columnDefs: [{ targets: [7, 8], visible: false }],
            // paging: false,
            // scrollY: "400px",
            // scrollCollapse: true,
        });
    });

    btn_bank.addEventListener("click", async function (event) {
        event.preventDefault();
        if (JnsBank == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Untuk KRR1 & KRR2 tidak ada pilihan bank",
                showConfirmButton: true,
            });
        } else {
            try {
                const result = await Swal.fire({
                    title: "Select a Bank",
                    html: '<table id="tableBank" class="display" style="width:100%"><thead><tr><th>ID. Perkiraan</th><th>Nama Perkiraan</th></tr></thead><tbody></tbody></table>',
                    showCancelButton: true,
                    // width: "50%",
                    preConfirm: () => {
                        const selectedData = $("#tableBank")
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
                            const table = $("#tableBank").DataTable({
                                responsive: true,
                                processing: true,
                                serverSide: true,
                                ajax: {
                                    url: "BKM/getBankData",
                                    dataType: "json",
                                    type: "GET",
                                    data: {
                                        _token: csrfToken,
                                        JnsBank: JnsBank,
                                        IdUang: IdUang,
                                    },
                                },
                                columns: [
                                    { data: "Nama_Bank" },
                                    { data: "Id_Bank" },
                                ],
                            });
                            setTimeout(() => {
                                $("#tableBank_filter input").focus();
                            }, 300);
                            // $("#tableBank_filter input").on(
                            //     "keyup",
                            //     function () {
                            //         table
                            //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                            //             .search(this.value) // Cari berdasarkan input pencarian
                            //             .draw(); // Perbarui hasil pencarian
                            //     }
                            // );
                            $("#tableBank tbody").on(
                                "click",
                                "tr",
                                function () {
                                    table
                                        .$("tr.selected")
                                        .removeClass("selected");
                                    $(this).addClass("selected");
                                }
                            );
                            currentIndex = null;
                            Swal.getPopup().addEventListener("keydown", (e) =>
                                handleTableKeydownInSwal(e, "tableBank")
                            );
                        });
                    },
                }).then((result) => {
                    if (result.isConfirmed && result.value) {
                        const selectedRow = result.value;
                        nama_bank.value = escapeHTML(
                            selectedRow.Id_Bank.trim()
                        );
                        // ket_kiraM.value = escapeHTML(selectedRow.Keterangan.trim());

                        setTimeout(() => {
                            btn_ok.focus();
                        }, 300);
                    }
                });
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    });
});
