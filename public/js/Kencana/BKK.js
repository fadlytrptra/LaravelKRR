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
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [7, 8], visible: false }],
    });
    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [7, 8], visible: false }],
    });

    bulan.value = new Date().getMonth() + 1;
    tahun.value = new Date().getFullYear();

    bulan.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tahun.focus();
        }
    });

    tahun.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_ok.focus();
        }
    });

    OptBesar.addEventListener("click", function (event) {
        nama_bank.value = "KRR2";
        JnsBank = null;
        IdUang = null;
        kodeRadio = 1;
    });

    OptKecil.addEventListener("click", function (event) {
        nama_bank.value = "KRR1";
        JnsBank = null;
        IdUang = null;
        kodeRadio = 2;
    });

    IntRp.addEventListener("click", function (event) {
        nama_bank.value = "";
        JnsBank = "I";
        IdUang = 1;
        kodeRadio = 6;
    });

    EksRp.addEventListener("click", function (event) {
        nama_bank.value = "";
        JnsBank = "E";
        IdUang = 2;
        kodeRadio = 4;
    });

    IntUS.addEventListener("click", function (event) {
        nama_bank.value = "";
        JnsBank = "I";
        IdUang = 2;
        kodeRadio = 5;
    });

    EksUS.addEventListener("click", function (event) {
        nama_bank.value = "";
        JnsBank = "E";
        IdUang = 2;
        kodeRadio = 3;
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        Swal.fire({
            title: "Isikan Tanggal Transaksi Debitnya",
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
                $.ajax({
                    url: "BKK",
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
                                text: response.message[0],
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
                                $("#table_atas").DataTable().ajax.reload();
                                $("#table_bawah tbody").empty();
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
            table_atas = $("#table_atas").DataTable({
                responsive: true,
                processing: true,
                serverSide: true,
                destroy: true,
                ajax: {
                    url: "/Kencana/BKKKencana/getTransaksiBank",
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
                        data: "Id_BKK",
                        render: function (data) {
                            return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                        },
                    },
                    { data: "Tgl_Input" },
                    { data: "Nama_Bank" },
                    { data: "Nilai_Pembulatan" },
                    { data: "Status_Penagihan" },
                    { data: "NM_SUP" },
                ],
                // columnDefs: [{ targets: [7, 8], visible: false }],
                paging: false,
                scrollY: "400px",
                scrollCollapse: true,
            });
        }
    });

    let rowDataArray = [];

    // Handle checkbox change events
    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                // Get the data for the selected row
                let rowDataPertama = table_atas
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                rowDataArray.push(rowDataPertama);

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            } else {
                // Remove the unchecked row data from the array
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                rowDataArray = rowDataArray.filter(
                    (row) => row !== rowDataPertama
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    // Clear rowDataArray when the table is reloaded
    $("#table_atas").on("xhr.dt", function (e, settings, json, xhr) {
        rowDataArray = [];
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);

        table_bawah = $("#table_bawah").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/BKKKencana/getBKKData",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        Id_BKK: data.Id_BKK,
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
                { data: "Jenis_Pembayaran" },
                { data: "Rincian_Bayar" },
                { data: "Symbol" },
                { data: "Nilai_Rincian" },
                { data: "Kode_Perkiraan" },
            ],
            // columnDefs: [{ targets: [7, 8], visible: false }],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
        });
    });

    btn_bank.addEventListener("click", async function (event) {
        event.preventDefault();
        if (JnsBank == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih jenis transaksi dahulu !",
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
                                    url: "/Kencana/BKKKencana/getBankData",
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

                        // setTimeout(() => {
                        //     hutangM.focus();
                        //     hutangM.select();
                        // }, 300);
                    }
                });
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    });
});
