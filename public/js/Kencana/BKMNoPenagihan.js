$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_kodeperkiraan = document.getElementById("btn_kodeperkiraan");
    let btn_matauang = document.getElementById("btn_matauang");
    let btn_bank = document.getElementById("btn_bank");
    let btn_jenispembayaran = document.getElementById("btn_jenispembayaran");
    let btn_tambahbiaya = document.getElementById("btn_tambahbiaya");
    let btn_tambahdata = document.getElementById("btn_tambahdata");
    let btn_kodeperkiraanMBiaya = document.getElementById(
        "btn_kodeperkiraanMBiaya"
    );
    let btn_prosesMBiaya = document.getElementById("btn_prosesMBiaya");
    let btn_batal = document.getElementById("btn_batal");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_tampilbkk = document.getElementById("btn_tampilbkk");
    let btn_okbkm = document.getElementById("btn_okbkm");
    let btn_proses = document.getElementById("btn_proses");
    let btn_cetakbkm = document.getElementById("btn_cetakbkm");
    let btn_customer = document.getElementById("btn_customer");
    let radio_biaya = document.getElementById("radio_biaya");
    let radio_lain = document.getElementById("radio_lain");
    let radio_nego = document.getElementById("radio_nego");
    let kode_kira = document.getElementById("kode_kira");
    let keterangan_kira = document.getElementById("keterangan_kira");
    let mata_uang = document.getElementById("mata_uang");
    let kode_matauang = document.getElementById("kode_matauang");
    let nama_bank = document.getElementById("nama_bank");
    let id_bank = document.getElementById("id_bank");
    let jenis_bank = document.getElementById("jenis_bank");
    let tanggal_input = document.getElementById("tanggal_input");
    let id_bkm = document.getElementById("id_bkm");
    // let diterima_dari = document.getElementById("diterima_dari");
    let nama_customer = document.getElementById("nama_customer");
    let kode_customer = document.getElementById("kode_customer");
    let kurs_rupiah = document.getElementById("kurs_rupiah");
    let jumlah_uang = document.getElementById("jumlah_uang");
    let no_bukti = document.getElementById("no_bukti");
    let uraian = document.getElementById("uraian");
    let jenis_pembayaran = document.getElementById("jenis_pembayaran");
    let id_jnsPem = document.getElementById("id_jnsPem");
    let idDetail_MBiaya = document.getElementById("idDetail_MBiaya");
    let kodePerkiraan1 = document.getElementById("kodePerkiraan1");
    let kodePerkiraan2 = document.getElementById("kodePerkiraan2");
    let jumlah_biayaMBiaya = document.getElementById("jumlah_biayaMBiaya");
    let keterangan_MBiaya = document.getElementById("keterangan_MBiaya");
    let tutup_modal = document.getElementById("tutup_modal");
    let close_modal = document.getElementById("close_modal");
    let tgl_awalbkk = document.getElementById("tgl_awalbkk");
    let tgl_akhirbkk = document.getElementById("tgl_akhirbkk");
    let bkm = document.getElementById("bkm");
    let total_pelunasan = document.getElementById("total_pelunasan");
    let tutup_modalbkm = document.getElementById("tutup_modalbkm");
    let close_modalbkm = document.getElementById("close_modalbkm");
    let table_kiri = $("#table_kiri").DataTable({
        columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let table_kanan = $("#table_kanan").DataTable({
        columnDefs: [{ targets: [4], visible: false }],
        order: [[3, "asc"]],
    });
    let rowDataPertama;
    let rowDataKedua;
    let rowDataKetiga;
    let koreksi;
    let terbilang;
    let ada1;
    let radio = 0;

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
    // document.getElementById("posted_p").innerHTML = `${day}-${months}-${years}`;

    tgl_awalbkk.valueAsDate = new Date();
    tgl_akhirbkk.valueAsDate = new Date();
    koreksi = 0;
    id_bkm.readOnly = true;
    tanggal_input.valueAsDate = new Date();
    tanggal_input.focus();
    btn_tambahdata.disabled = true;
    kurs_rupiah.value = 0;
    btn_tambahbiaya.disabled = true;

    //#region Function

    function clearValMB() {
        jumlah_biayaMBiaya.value = "";
        kodePerkiraan1.value = "";
        kodePerkiraan2.value = "";
        keterangan_MBiaya.value = "";
    }

    //#region Radio

    radio_biaya.addEventListener("click", function (event) {
        btn_tambahbiaya.disabled = true;
        radio = 1;
    });

    radio_lain.addEventListener("click", function (event) {
        btn_tambahbiaya.disabled = false;
        radio = 2;
    });

    radio_nego.addEventListener("click", function (event) {
        btn_tambahbiaya.disabled = false;
        radio = 3;
    });

    //#region Enter

    tanggal_input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_customer.focus();
        }
    });

    // diterima_dari.addEventListener("keydown", function (event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         if (btn_matauang.disabled) {
    //             jumlah_uang.focus();
    //         } else {
    //             btn_matauang.focus();
    //         }
    //     }
    // });

    jumlah_uang.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(jumlah_uang.value.replace(/,/g, ""));

            // Cek jika jumlah_uang kosong atau bukan angka yang valid
            if (isNaN(value) || jumlah_uang.value.trim() === "") {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Jumlah Uang Tidak Boleh Kosong",
                    showConfirmButton: true,
                });
            } else {
                // Format jumlah uang jika valid
                jumlah_uang.value = value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
                if (btn_bank.disabled) {
                    btn_jenispembayaran.focus();
                } else {
                    btn_bank.focus();
                }
            }
        }
    });

    no_bukti.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            uraian.focus();
        }
    });

    let tableData = [];
    let isAjaxProcessed = false; // Flag to check if AJAX has already been processed

    uraian.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            // Check if all required fields are filled
            if (
                kode_customer.value !== "" &&
                jumlah_uang.value !== "" &&
                nama_bank.value !== "" &&
                keterangan_kira.value !== "" &&
                mata_uang.value !== "" &&
                jenis_pembayaran.value !== ""
            ) {
                btn_tambahdata.disabled = false;

                // Check if AJAX request has not been processed
                if (!isAjaxProcessed) {
                    $.ajax({
                        url: "/Kencana/MaintenanceBKMNoPenagihanKencana/processData",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            kode_customer: kode_customer.value,
                            jumlah_uang: jumlah_uang.value,
                            nama_bank: nama_bank.value,
                            keterangan_kira: keterangan_kira.value,
                            mata_uang: mata_uang.value,
                            jenis_pembayaran: jenis_pembayaran.value,
                            id_bank: id_bank.value,
                            tanggal_input: tanggal_input.value,
                            id_bkm: id_bkm.value,
                        },
                        success: function (data) {
                            console.log(data);

                            // Set the value of id_bkm only once
                            id_bkm.value = data.idBKM;
                            // bkm.value = data.idBKM;
                            // Mark AJAX as processed
                            isAjaxProcessed = true;

                            // Optional: Handle any errors from the AJAX response
                            if (data.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: data.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }

                if (koreksi == 1) {
                    rowDataPertama[1] = kode_customer.value;
                    rowDataPertama[2] = jumlah_uang.value;
                    rowDataPertama[3] = kode_kira.value;
                    rowDataPertama[4] = uraian.value;
                    rowDataPertama[5] = id_jnsPem.value;
                    rowDataPertama[6] = no_bukti.value;
                    rowDataPertama[7] = jenis_pembayaran.value;
                    rowDataPertama[8] = keterangan_kira.value;
                    rowDataPertama[9] = kurs_rupiah.value;
                    // table_kiri.draw(false);
                    if ($.fn.DataTable.isDataTable("#table_kiri")) {
                        var table_kiri = $("#table_kiri").DataTable();
                        let selectedRow = table_kiri.row(
                            $('input[name="penerimaCheckbox"]:checked').closest(
                                "tr"
                            )
                        );
                        selectedRow.data(rowDataPertama).draw();
                    }
                    btn_matauang.disabled = true;
                    btn_bank.disabled = true;
                    document.activeElement.blur();
                    koreksi = 0;
                } else {
                    const newRow = {
                        Id_Detail: tableData.length + 1,
                        kode_customer: kode_customer.value,
                        jumlah_uang: jumlah_uang.value,
                        kode_kira: kode_kira.value,
                        uraian: uraian.value,
                        id_jnsPem: id_jnsPem.value,
                        no_bukti: no_bukti.value,
                        jenis_pembayaran: jenis_pembayaran.value,
                        keterangan_kira: keterangan_kira.value,
                        kurs_rupiah: kurs_rupiah.value,
                        nama_customer: nama_customer.value,
                    };

                    tableData.push(newRow);
                    console.log(tableData);

                    if ($.fn.DataTable.isDataTable("#table_kiri")) {
                        var table_kiri = $("#table_kiri").DataTable();

                        table_kiri.row
                            .add([
                                `<input type="checkbox" name="penerimaCheckbox" value="${newRow.Id_Detail}" /> ${newRow.Id_Detail}`,
                                newRow.kode_customer,
                                newRow.jumlah_uang,
                                newRow.kode_kira,
                                newRow.uraian,
                                newRow.id_jnsPem,
                                newRow.no_bukti,
                                newRow.jenis_pembayaran,
                                newRow.keterangan_kira,
                                newRow.kurs_rupiah,
                                newRow.nama_customer,
                            ])
                            .draw();
                        kode_customer.value = "";
                        jumlah_uang.value = "";
                        jenis_pembayaran.value = "";
                        id_jnsPem.value = "";
                        kode_kira.value = "";
                        keterangan_kira.value = "";
                        no_bukti.value = "";
                        uraian.value = "";
                        nama_customer.value = "";
                        btn_matauang.disabled = true;
                        btn_bank.disabled = true;
                        document.activeElement.blur();

                        const totalPelunasan = tableData.reduce((sum, row) => {
                            // Remove commas only and keep the decimal point
                            const cleanValue = row.jumlah_uang.replace(
                                /,/g,
                                ""
                            );
                            return sum + parseFloat(cleanValue);
                        }, 0);

                        total_pelunasan.value = totalPelunasan.toLocaleString(
                            "en-US",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        );
                    } else {
                        var table_kiri = $("#table_kiri").DataTable();
                    }
                }
            } else {
                alert("Please fill in all required fields!");
                jumlah_uang.focus();
            }
        }
    });

    //#region Event Listener
    close_modalbkm.addEventListener("click", function (event) {
        event.preventDefault();
        bkm.value = "";
    });

    tutup_modalbkm.addEventListener("click", function (event) {
        event.preventDefault();
        bkm.value = "";
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        if (radio === 0) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih pelunasan biaya, lain-lain, atau DP",
                showConfirmButton: true,
            });
            return;
        }
        const allRowsDataKiri = table_kiri.rows().data().toArray();
        console.log(allRowsDataKiri);
        const allRowsDataKanan = table_kanan.rows().data().toArray();
        console.log(allRowsDataKanan);

        let total = 0;

        allRowsDataKiri.forEach((lunasItem) => {
            let biaya = 0; // Initialize biaya for each lunasItem
            ada1 = false; // Flag to check if there's a matching biaya

            // Extract relevant values from lunasItem
            const item = lunasItem[0]; // Assuming 'item' corresponds to 'kode_kira'
            const subItem2 = lunasItem[2]; // Assuming 'subItem2' corresponds to 'jumlah_uang'

            // Loop through each item in the right table data
            allRowsDataKanan.forEach((biayaItem) => {
                const subItem3 = biayaItem[3]; // Assuming 'subItem3' is in the 4th column
                const subItem1 = biayaItem[1]; // Assuming 'subItem1' corresponds to the amount in the 2nd column

                // Check if items match
                if (item === subItem3) {
                    // Remove commas from subItem1, convert to float, and add to biaya
                    biaya += parseFloat(subItem1.replace(/,/g, ""));
                    ada1 = true;
                }
            });

            // Calculate nilai by subtracting biaya from subItem2
            const nilai = parseFloat(subItem2.replace(/,/g, "")) - biaya;
            total += nilai; // Add nilai to total
        });

        // Convert total to string if needed
        const total1 = total.toString();
        if (kode_matauang.value == 1) {
            terbilang = convertNumberToWordsRupiah(total);
        } else {
            terbilang = convertNumberToWordsDollar(total);
        }

        console.log(terbilang);

        console.log("Total:", total1);

        $.ajax({
            url: "/Kencana/MaintenanceBKMNoPenagihanKencana",
            type: "POST",
            data: {
                _token: csrfToken,
                id_bkm: id_bkm.value,
                allRowsDataKiri: allRowsDataKiri,
                allRowsDataKanan: allRowsDataKanan,
                tanggal_input: tanggal_input.value,
                id_bank: id_bank.value,
                kurs_rupiah: kurs_rupiah.value,
                kode_matauang: kode_matauang.value,
                ada1: ada1,
                jenis_bank: jenis_bank.value,
                total: total,
                total_pelunasan: total_pelunasan.value,
                radio: radio,
                terbilang: terbilang,
                // checkedRows: checkedRows,
            },
            success: function (response) {
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        // console.log(id_bkm.value);
                        bkm.value = id_bkm.value;
                        // location.reload();
                        document.querySelectorAll("input").forEach((input) => {
                            if (input.type !== "date" && input.id !== "bkm") {
                                input.value = "";
                            }
                        });
                        $("#table_kiri").DataTable().clear().draw();
                        $("#table_kanan").DataTable().clear().draw();
                        btn_tambahdata.disabled = true;
                        btn_tampilbkk.click();
                        tableData = [];
                        btn_matauang.disabled = false;
                        btn_bank.disabled = false;
                        // tanggal_input.focus();
                        // $("#table_kiri").DataTable().ajax.reload();
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

    btn_hapus.addEventListener("click", function (event) {
        event.preventDefault();

        // Check if rowDataPertama is null
        if (rowDataPertama == null && rowDataKedua == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        } else {
            let checkedKiri = $(
                '#table_kiri input[name="penerimaCheckbox"]:checked'
            ).length;
            let checkedKanan = $(
                '#table_kanan input[name="penerimaCheckbox"]:checked'
            ).length;

            console.log(checkedKiri);
            console.log(checkedKanan);

            if (checkedKiri + checkedKanan !== 1) {
                Swal.fire({
                    icon: "warning",
                    title: "Warning!",
                    text: "Hanya boleh ada satu row yang ter-check, baik di tabel detail atau biaya, bukan keduanya!",
                    showConfirmButton: true,
                });
                return;
            }

            if (
                $.fn.DataTable.isDataTable("#table_kiri") &&
                checkedKiri === 1
            ) {
                var table_kiri = $("#table_kiri").DataTable();
                let selectedRowHapus = table_kiri.row(
                    $('input[name="penerimaCheckbox"]:checked').closest("tr")
                );

                selectedRowHapus.remove().draw();

                const totalPelunasan = table_kiri
                    .rows()
                    .data()
                    .toArray()
                    .reduce((sum, row) => {
                        let jumlahUang = row[2].replace(/,/g, "");
                        return sum + parseInt(jumlahUang);
                    }, 0);
                console.log(totalPelunasan);

                total_pelunasan.value = totalPelunasan.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
            }

            if (
                $.fn.DataTable.isDataTable("#table_kanan") &&
                checkedKanan === 1
            ) {
                var table_kanan = $("#table_kanan").DataTable();
                let selectedRowHpsKn = table_kanan.row(
                    $('input[name="penerimaCheckbox"]:checked').closest("tr")
                );

                selectedRowHpsKn.remove().draw();
            }
        }
    });

    btn_koreksi.addEventListener("click", function (event) {
        event.preventDefault();
        let checkedKiri = $(
            '#table_kiri input[name="penerimaCheckbox"]:checked'
        ).length;
        let checkedKanan = $(
            '#table_kanan input[name="penerimaCheckbox"]:checked'
        ).length;

        if (rowDataPertama == null && rowDataKedua == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        } else if (checkedKanan === 1) {
            clearValMB();
            btn_prosesMBiaya.textContent = "Koreksi";
            koreksi = 2;
            // idDetail_MBiaya.value = rowDataPertama[0].match(/value="(\d+)"/)[1];
            idDetail_MBiaya.value = rowDataKedua[3];
            jumlah_biayaMBiaya.value = rowDataKedua[1];
            kodePerkiraan1.value = rowDataKedua[2];
            kodePerkiraan2.value = rowDataKedua[4];
            keterangan_MBiaya.value =
                rowDataKedua[0].match(/value="([^"]+)"/)[1];
            var myModal = new bootstrap.Modal(
                document.getElementById("ModalTambah"),
                {
                    keyboard: false,
                }
            );
            myModal.show();
            jumlah_biayaMBiaya.focus();
        } else {
            koreksi = 1;
            kode_customer.value = rowDataPertama[1];
            jumlah_uang.value = rowDataPertama[2];
            jenis_pembayaran.value = rowDataPertama[7];
            id_jnsPem.value = rowDataPertama[5];
            kode_kira.value = rowDataPertama[3];
            keterangan_kira.value = rowDataPertama[8];
            no_bukti.value = rowDataPertama[6];
            uraian.value = rowDataPertama[4];
            kurs_rupiah.value = rowDataPertama[9];
            nama_customer.value = rowDataPertama[10];
            btn_matauang.disabled = false;
            btn_bank.disabled = false;
        }
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_tambahdata.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_customer.focus();
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
                                url: "/Kencana/MaintenanceBKMNoPenagihanKencana/getKira",
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
                        setTimeout(() => {
                            $("#tableKira_filter input").focus();
                        }, 300);
                        // $("#tableKira_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
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
                        no_bukti.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_customer.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="tableCustomer" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>ID. Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableCustomer")
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
                        const table = $("#tableCustomer").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "/Kencana/MaintenanceBKMNoPenagihanKencana/getCust",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "NamaCust" }, { data: "IdCust" }],
                        });
                        setTimeout(() => {
                            $("#tableCustomer_filter input").focus();
                        }, 300);
                        // $("#tableCustomer_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#tableCustomer tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableCustomer")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_customer.value = escapeHTML(
                        selectedRow.NamaCust.trim()
                    );
                    kode_customer.value = escapeHTML(
                        selectedRow.TIdCust.trim()
                    );
                    console.log(kode_customer.value);

                    setTimeout(() => {
                        if (btn_matauang.disabled) {
                            jumlah_uang.focus();
                        } else {
                            btn_matauang.focus();
                        }
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_matauang.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Mata Uang",
                html: '<table id="tablematauang" class="display" style="width:100%"><thead><tr><th>Mata Uang</th><th>ID. Mata Uang</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tablematauang")
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
                        const table = $("#tablematauang").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "/Kencana/MaintenanceBKMNoPenagihanKencana/getMataUang",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Nama_MataUang" },
                                { data: "Id_MataUang" },
                            ],
                            order: [[1, "asc"]],
                        });
                        setTimeout(() => {
                            $("#tablematauang_filter input").focus();
                        }, 300);
                        // $("#tablematauang_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#tablematauang tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tablematauang")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kode_matauang.value = selectedRow.Id_MataUang;
                    mata_uang.value = selectedRow.Nama_MataUang;

                    if (mata_uang.value !== "RUPIAH") {
                        Swal.fire({
                            title: "Apakah Dibayar dengan Rupiah?",
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Ya",
                            cancelButtonText: "Tidak",
                            focusConfirm: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setTimeout(() => {
                                    kurs_rupiah.focus();
                                    kurs_rupiah.select();
                                }, 300);
                            } else {
                                // Tambahkan aksi lain jika perlu
                            }
                        });
                    }
                    setTimeout(() => {
                        jumlah_uang.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_jenispembayaran.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Jenis Pembayaran",
                html: '<table id="tableJenisPem" class="display" style="width:100%"><thead><tr><th>Jenis Pembayaran</th><th>ID. Pembayaran</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableJenisPem")
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
                        const table = $("#tableJenisPem").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "/Kencana/MaintenanceBKMNoPenagihanKencana/getJenisBayar",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "Jenis_Pembayaran" },
                                { data: "Id_Jenis_Bayar" },
                            ],
                            order: [[1, "asc"]],
                        });
                        setTimeout(() => {
                            $("#tableJenisPem_filter input").focus();
                        }, 300);
                        // $("#tableJenisPem_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#tableJenisPem tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableJenisPem")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    jenis_pembayaran.value = selectedRow.Jenis_Pembayaran;
                    id_jnsPem.value = selectedRow.Id_Jenis_Bayar;
                    setTimeout(() => {
                        btn_kodeperkiraan.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_bank.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bank",
                html: '<table id="tableBank" class="display" style="width:100%"><thead><tr><th>Nama Bank</th><th>ID. Bank</th></tr></thead><tbody></tbody></table>',
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
                                url: "/Kencana/MaintenanceBKMNoPenagihanKencana/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
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
                        $("#tableBank tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableBank")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_bank.value = selectedRow.Nama_Bank;
                    id_bank.value = selectedRow.Id_Bank;
                    setTimeout(() => {
                        btn_jenispembayaran.focus();
                    }, 300);

                    $.ajax({
                        url: "/Kencana/MaintenanceBKMNoPenagihanKencana/getBankDetail",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            id_bank: id_bank.value,
                        },
                        success: function (data) {
                            console.log(data);
                            jenis_bank.value = data.JenisBank;
                            console.log(jenis_bank.value);
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    //#region Modal Tampil BKK
    btn_cetakbkm.addEventListener("click", async function (event) {
        event.preventDefault();

        $.ajax({
            url: "/Kencana/MaintenanceBKMNoPenagihanKencana/cetakBKM",
            type: "GET",
            data: {
                _token: csrfToken,
                bkm: bkm.value,
            },
            success: function (data) {
                console.log(data);

                if (!data.data || data.data.length === 0) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: "Data BKM tidak ditemukan.",
                    });
                    return;
                }

                // Fungsi format tanggal tanpa Flatpickr
                function formatTanggal(date, padDay = false) {
                    const day = date.getDate();
                    const month = date.toLocaleString("en-US", {
                        month: "long",
                    });
                    const year = date.getFullYear();

                    const formattedDay = padDay
                        ? String(day).padStart(2, "0")
                        : day;

                    return `${formattedDay}/${month}/${year}`;
                }

                const dataBKM = data.data[0];

                // Nomor BKM
                document.getElementById("nomerP").innerHTML =
                    dataBKM.Id_BKM ?? "";

                // Tanggal BKM dari database
                const rawDate = dataBKM.Tgl_Input
                    ? dataBKM.Tgl_Input.split(" ")[0]
                    : null;

                let formattedDate = "";

                if (rawDate) {
                    // Parsing YYYY-MM-DD secara manual agar tidak bergeser
                    // karena perbedaan timezone browser
                    const [year, month, day] = rawDate.split("-").map(Number);

                    const dateObject = new Date(year, month - 1, day);
                    formattedDate = formatTanggal(dateObject);
                }

                document.getElementById("tanggal_atasP").innerHTML =
                    formattedDate;

                // Tanggal cetak saat ini
                const currentDate = new Date();
                const formattedDate1 = formatTanggal(currentDate, true);

                document.getElementById("tanggal_bawahP").innerHTML =
                    `Sidoarjo, ${formattedDate1}`;

                // Simbol mata uang
                document.getElementById("rp_atasP").innerHTML =
                    dataBKM.Symbol ?? "";

                document.getElementById("rp_totalP").innerHTML =
                    dataBKM.Symbol ?? "";

                // Nilai pelunasan
                const nilaiPelunasan =
                    parseFloat(dataBKM.Nilai_Pelunasan) || 0;

                document.getElementById("jumlah_diterimaP").innerHTML =
                    nilaiPelunasan.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });

                // Terbilang
                document.getElementById("terbilangP").innerHTML =
                    dataBKM.Terjemahan ?? "";

                // Membuat rincian penerimaan
                let tbodyHTML = `
                    <tr style="border:none !important">
                        <td style="width:60%; text-align:center">
                            <strong>RINCIAN PENERIMAAN</strong>
                        </td>
                        <td style="text-align:center">
                            <strong>KODE PERKIRAAN</strong>
                        </td>
                        <td style="width:23%; text-align:center">
                            <strong>JUMLAH</strong>
                        </td>
                    </tr>
                `;

                let totalNilaiRincian = 0;

                data.data.forEach(function (item) {
                    const nilaiRincian =
                        parseFloat(item.Nilai_Rincian) || 0;

                    totalNilaiRincian += nilaiRincian;

                    tbodyHTML += `
                        <tr>
                            <td style="border:none !important;">
                                ${item.NamaCust ?? ""} - ${item.Uraian ?? ""}
                            </td>
                            <td style="
                                border:none !important;
                                text-align:center;
                                border-left:1px solid black !important;
                            ">
                                ${item.KodePerkiraan ?? ""}
                            </td>
                            <td style="
                                border:none !important;
                                text-align:right;
                                border-left:1px solid black !important;
                            ">
                                ${numeral(nilaiRincian).format("0,0.00")}
                            </td>
                        </tr>
                    `;
                });

                // Baris grand total menggunakan nilai pelunasan,
                // sesuai logika kode awal
                tbodyHTML += `
                    <tr>
                        <td colspan="2" style="
                            text-align:right;
                            border:none !important;
                            border-top:2px solid black !important;
                        ">
                            <strong>
                                GRAND TOTAL : ${dataBKM.Symbol ?? ""}
                            </strong>
                        </td>
                        <td style="
                            text-align:right;
                            border:none !important;
                            border-top:2px solid black !important;
                        ">
                            ${numeral(nilaiPelunasan).format("0,0.00")}
                        </td>
                    </tr>
                `;

                document.querySelector("#paymentTable tbody").innerHTML =
                    tbodyHTML;

                // Cetak setelah data selesai diisi
                window.print();
            },
            error: function (xhr, status, error) {
                console.error("Gagal mengambil data BKM:", error);
                console.error(xhr.responseText);

                const errorMessage =
                    xhr.responseJSON?.message ||
                    "Terjadi kesalahan saat mengambil data BKM.";

                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: errorMessage,
                });
            },
        });
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
                url: "/Kencana/MaintenanceBKMNoPenagihanKencana/getListBKM",
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
                { data: "Id_BKM" },
                { data: "Nilai_Pelunasan" },
                { data: "Terjemahan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [5], visible: false }],
        });

        myModal.show();
        if (bkm.value !== "") {
            setTimeout(() => {
                btn_cetakbkm.click();
            }, 500);
        }
    });

    btn_okbkm.addEventListener("click", async function (event) {
        event.preventDefault();
        tabletampilBKM = $("#tabletampilBKM").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/MaintenanceBKMNoPenagihanKencana/getOkBKM",
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
                { data: "Id_BKM" },
                { data: "Nilai_Pelunasan" },
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
                bkm.value = rowDataKetiga.Id_BKM;
                console.log(rowDataArrayKetiga);
                console.log(rowDataKetiga, this, tabletampilBKM);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArray = [];
                rowDataKetiga = null;
                bkm.value = "";
                console.log(rowDataArrayKetiga);
                console.log(rowDataKetiga, this, tabletampilBKM);
            }
        }
    );

    //#region Modal Tambah Biaya

    jumlah_biayaMBiaya.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(jumlah_biayaMBiaya.value.replace(/,/g, ""));

            // Cek jika jumlah_uang kosong atau bukan angka yang valid
            if (isNaN(value) || jumlah_biayaMBiaya.value.trim() === "") {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Jumlah Uang Tidak Boleh Kosong",
                    showConfirmButton: true,
                });
            } else {
                // Format jumlah uang jika valid
                jumlah_biayaMBiaya.value = value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
                btn_kodeperkiraanMBiaya.focus();
                // if (btn_bank.disabled) {
                //     btn_jenispembayaran.focus();
                // } else {
                //     btn_bank.focus();
                // }
            }
        }
    });

    keterangan_MBiaya.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_prosesMBiaya.focus();
        }
    });

    btn_tambahbiaya.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowDataPertama == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih detail terlebih dahulu!",
                showConfirmButton: true,
            });
        } else {
            idDetail_MBiaya.value = rowDataPertama[0].match(/value="(\d+)"/)[1];
            var myModal = new bootstrap.Modal(
                document.getElementById("ModalTambah"),
                {
                    keyboard: false,
                }
            );
            myModal.show();
            jumlah_biayaMBiaya.focus();
        }
    });

    btn_kodeperkiraanMBiaya.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKiraMB" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableKiraMB")
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
                        const table = $("#tableKiraMB").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceBKMKRR1/getKira",
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
                        $("#tableKiraMB tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableKiraMB")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kodePerkiraan1.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    kodePerkiraan2.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                    setTimeout(() => {
                        keterangan_MBiaya.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    let tableDataKanan = [];

    btn_prosesMBiaya.addEventListener("click", async function (event) {
        event.preventDefault();
        if (koreksi == 2) {
            // Update rowDataKedua dengan checkbox dan nilai keterangan
            rowDataKedua[0] = `<input type="checkbox" name="penerimaCheckbox" value="${keterangan_MBiaya.value}" /> ${keterangan_MBiaya.value}`;
            rowDataKedua[1] = jumlah_biayaMBiaya.value;
            rowDataKedua[2] = kodePerkiraan1.value;
            rowDataKedua[4] = kodePerkiraan2.value;

            if ($.fn.DataTable.isDataTable("#table_kanan")) {
                var table_kanan = $("#table_kanan").DataTable();
                // Temukan baris yang dipilih berdasarkan checkbox yang dicentang
                let selectedRow = table_kanan.row(
                    $('input[name="penerimaCheckbox"]:checked').closest("tr")
                );
                // Perbarui data baris dengan checkbox dan keterangan yang disertakan
                selectedRow.data(rowDataKedua).draw();

                // Hapus semua centang dari checkbox di tabel #table_kanan
                $('#table_kanan input[name="penerimaCheckbox"]').prop(
                    "checked",
                    false
                );
            }

            document.activeElement.blur();
            tutup_modal.click();
            koreksi = 0;
        } else {
            const newRow = {
                id_biaya: tableDataKanan.length + 1,
                jumlah_biayaMBiaya: jumlah_biayaMBiaya.value,
                kodePerkiraan1: kodePerkiraan1.value,
                keterangan_MBiaya: keterangan_MBiaya.value,
                idDetail_MBiaya: idDetail_MBiaya.value,
                kodePerkiraan2: kodePerkiraan2.value,
            };

            tableDataKanan.push(newRow);
            console.log(tableDataKanan);

            if ($.fn.DataTable.isDataTable("#table_kanan")) {
                var table_kanan = $("#table_kanan").DataTable();

                table_kanan.row
                    .add([
                        `<input type="checkbox" name="penerimaCheckbox" value="${newRow.keterangan_MBiaya}" /> ${newRow.keterangan_MBiaya}`,
                        // newRow.keterangan_MBiaya,
                        newRow.jumlah_biayaMBiaya,
                        newRow.kodePerkiraan1,
                        newRow.idDetail_MBiaya,
                        newRow.kodePerkiraan2,
                    ])
                    .draw();

                Swal.fire({
                    title: "Tambah Biaya Lagi ?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Ya",
                    cancelButtonText: "Tidak",
                    focusConfirm: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        clearValMB();
                        setTimeout(() => {
                            jumlah_biayaMBiaya.focus();
                        }, 300);
                    } else {
                        tutup_modal.click();
                    }
                });
            }
        }
    });

    tutup_modal.addEventListener("click", function (event) {
        event.preventDefault();
        clearValMB();
    });

    close_modal.addEventListener("click", function (event) {
        event.preventDefault();
        clearValMB();
    });

    let rowDataArray = [];

    $("#table_kiri tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_kiri tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_kiri.row($(this).closest("tr")).data();
                rowDataArray.push(rowDataPertama);
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_kiri);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArray = [];
                rowDataPertama = null;
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_kiri);
            }
        }
    );

    let rowDataArrayKedua = [];

    $("#table_kanan tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_kanan tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKedua = table_kanan.row($(this).closest("tr")).data();
                rowDataArray.push(rowDataKedua);
                console.log(rowDataArrayKedua);
                console.log(rowDataKedua, this, table_kanan);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArray = [];
                rowDataKedua = null;
                console.log(rowDataArrayKedua);
                console.log(rowDataKedua, this, table_kanan);
            }
        }
    );
});
