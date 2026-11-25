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
    let kode_kira = document.getElementById("kode_kira");
    let keterangan_kira = document.getElementById("keterangan_kira");
    let mata_uang = document.getElementById("mata_uang");
    let kode_matauang = document.getElementById("kode_matauang");
    let nama_bank = document.getElementById("nama_bank");
    let id_bank = document.getElementById("id_bank");
    let jenis_bank = document.getElementById("jenis_bank");
    let tanggal_input = document.getElementById("tanggal_input");
    let id_bkm = document.getElementById("id_bkm");
    let diterima_dari = document.getElementById("diterima_dari");
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

    tgl_awalbkk.valueAsDate = new Date();
    tgl_akhirbkk.valueAsDate = new Date();
    koreksi = 0;
    id_bkm.readOnly = true;
    tanggal_input.valueAsDate = new Date();
    tanggal_input.focus();
    btn_tambahdata.disabled = true;
    kurs_rupiah.value = 0;
    mata_uang.readOnly = true;
    nama_bank.readOnly = true;
    jenis_pembayaran.readOnly = true;
    kode_kira.readOnly = true;
    keterangan_kira.readOnly = true;

    //#region Function

    function clearValMB() {
        jumlah_biayaMBiaya.value = "";
        kodePerkiraan1.value = "";
        kodePerkiraan2.value = "";
        keterangan_MBiaya.value = "";
    }

    //#region Enter

    tanggal_input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            diterima_dari.focus();
        }
    });

    diterima_dari.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (btn_matauang.disabled) {
                jumlah_uang.focus();
            } else {
                btn_matauang.focus();
            }
        }
    });

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
                diterima_dari.value !== "" &&
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
                        url: "/Kencana/MaintenanceBKMKRR1Kencana/processData",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            diterima_dari: diterima_dari.value,
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
                    rowDataPertama[1] = diterima_dari.value;
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
                        diterima_dari: diterima_dari.value,
                        jumlah_uang: jumlah_uang.value,
                        kode_kira: kode_kira.value,
                        uraian: uraian.value,
                        id_jnsPem: id_jnsPem.value,
                        no_bukti: no_bukti.value,
                        jenis_pembayaran: jenis_pembayaran.value,
                        keterangan_kira: keterangan_kira.value,
                        kurs_rupiah: kurs_rupiah.value,
                    };

                    tableData.push(newRow);
                    console.log(tableData);

                    if ($.fn.DataTable.isDataTable("#table_kiri")) {
                        var table_kiri = $("#table_kiri").DataTable();

                        table_kiri.row
                            .add([
                                `<input type="checkbox" name="penerimaCheckbox" value="${newRow.Id_Detail}" /> ${newRow.Id_Detail}`,
                                newRow.diterima_dari,
                                newRow.jumlah_uang,
                                newRow.kode_kira,
                                newRow.uraian,
                                newRow.id_jnsPem,
                                newRow.no_bukti,
                                newRow.jenis_pembayaran,
                                newRow.keterangan_kira,
                                newRow.kurs_rupiah,
                            ])
                            .draw();
                        diterima_dari.value = "";
                        jumlah_uang.value = "";
                        jenis_pembayaran.value = "";
                        id_jnsPem.value = "";
                        kode_kira.value = "";
                        keterangan_kira.value = "";
                        no_bukti.value = "";
                        uraian.value = "";
                        // btn_matauang.disabled = true;
                        // btn_bank.disabled = true;
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

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
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
            url: "/Kencana/MaintenanceBKMKRR1Kencana",
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
                        // document.querySelectorAll("input").forEach((input) => {
                        //     if (input.type !== "date" && input.id !== "bkm") {
                        //         input.value = "";
                        //     }
                        // });
                        // $("#table_kiri").DataTable().clear().draw();
                        // $("#table_kanan").DataTable().clear().draw();
                        // btn_tambahdata.disabled = true;
                        // btn_tampilbkk.click();
                        location.reload();
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        // $("#table_atas").DataTable().ajax.reload();
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
            diterima_dari.value = rowDataPertama[1];
            jumlah_uang.value = rowDataPertama[2];
            jenis_pembayaran.value = rowDataPertama[7];
            id_jnsPem.value = rowDataPertama[5];
            kode_kira.value = rowDataPertama[3];
            keterangan_kira.value = rowDataPertama[8];
            no_bukti.value = rowDataPertama[6];
            uraian.value = rowDataPertama[4];
            kurs_rupiah.value = rowDataPertama[9];
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
        diterima_dari.focus();
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
                                url: "/Kencana/MaintenanceBKMKRR1Kencana/getKira",
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
                                url: "/Kencana/MaintenanceBKMKRR1Kencana/getMataUang",
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
                                url: "/Kencana/MaintenanceBKMKRR1Kencana/getJenisBayar",
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
                                url: "/Kencana/MaintenanceBKMKRR1Kencana/getBank",
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
                        url: "/Kencana/MaintenanceBKMKRR1Kencana/getBankDetail",
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
            url: "/Kencana/MaintenanceBKMKRR1Kencana/cetakBKM",
            type: "GET",
            data: {
                _token: csrfToken,
                bkm: bkm.value,
            },
            success: function (data) {
                console.log(data);
                // if (data[0] == 8) {
                //     document.getElementById("name_p").innerHTML =
                //         data.data[0].Id_Bank;
                //     document.getElementById("matauang_p").innerHTML =
                //         "Amount &nbsp;" + data.data[0].Id_MataUang_BC;
                //     let tanggalInput = data.data[0].Tgl_Input;
                //     let tanggal = new Date(tanggalInput);
                //     let options = {
                //         day: "2-digit",
                //         month: "short",
                //         year: "numeric",
                //     };
                //     let formattedDate = tanggal
                //         .toLocaleDateString("en-GB", options)
                //         .replace(" ", "-")
                //         .replace(" ", "-");
                //     document.getElementById("tanggal_p").innerHTML =
                //         formattedDate;
                //     document.getElementById("voucher_p").innerHTML =
                //         data.data[0].Id_BKK;
                //     document.getElementById("description_p").innerHTML =
                //         data.data[0].Nama_Bank;
                //     document.getElementById("paid_p").innerHTML =
                //         data.data[0].NM_SUP;
                //     //Tbody Array
                //     let kodePerkiraanHTML = "";
                //     data.data.forEach(function (item) {
                //         kodePerkiraanHTML += item.Kode_Perkiraan + "<br>";
                //     });
                //     document.getElementById("coa_p").innerHTML =
                //         kodePerkiraanHTML;

                //     let KeteranganHTML = "";
                //     data.data.forEach(function (item) {
                //         KeteranganHTML += item.Keterangan + "<br>";
                //     });
                //     document.getElementById("acc_p").innerHTML = KeteranganHTML;

                //     let Rincian_BayarHTML = "";
                //     data.data.forEach(function (item) {
                //         Rincian_BayarHTML += item.Rincian_Bayar + "<br>";
                //     });
                //     document.getElementById("desc_p").innerHTML =
                //         Rincian_BayarHTML;

                //     let No_BGCekHTML = "";
                //     data.data.forEach(function (item) {
                //         No_BGCekHTML +=
                //             item.Id_Penagihan + "<br>" ?? "" + "<br>";
                //     });
                //     document.getElementById("bgno_p").innerHTML = No_BGCekHTML;

                //     let Nilai_RincianHTML = "";
                //     let totalNilaiRincian = 0; // Variabel untuk menyimpan total nilai

                //     data.data.forEach(function (item) {
                //         let nilaiRincian = parseFloat(item.Nilai_Rincian);
                //         let formattedValue = nilaiRincian.toLocaleString(
                //             "en-US",
                //             {
                //                 minimumFractionDigits: 2,
                //                 maximumFractionDigits: 2,
                //             }
                //         );

                //         Nilai_RincianHTML += formattedValue + "<br>";
                //         totalNilaiRincian += nilaiRincian; // Tambahkan nilai ke total
                //     });

                //     document.getElementById("amount_p").innerHTML =
                //         Nilai_RincianHTML;

                //     // Format total dan tampilkan di element dengan id "total_p"
                //     document.getElementById("total_p").innerHTML =
                //         totalNilaiRincian.toLocaleString("en-US", {
                //             minimumFractionDigits: 2,
                //             maximumFractionDigits: 2,
                //         });

                //     document.getElementById("alasan_p").innerHTML =
                //         data.data[0].Alasan;

                //     document.getElementById("batal_p").innerHTML =
                //         data.data[0].Batal;

                //     window.print();
                // } else if (data[0] == 2) {
                //     document.getElementById("nobg_p").innerHTML = "Invoice No.";
                //     document.getElementById("matauang_p").innerHTML =
                //         "Amount &nbsp;" + data.data[0].Id_MataUang_BC;
                //     document.getElementById("name_p").innerHTML =
                //         data.data[0].Id_Bank;
                //     let tanggalInput = data.data[0].Tgl_Input;
                //     let tanggal = new Date(tanggalInput);
                //     let options = {
                //         day: "2-digit",
                //         month: "short",
                //         year: "numeric",
                //     };
                //     let formattedDate = tanggal
                //         .toLocaleDateString("en-GB", options)
                //         .replace(" ", "-")
                //         .replace(" ", "-");
                //     document.getElementById("tanggal_p").innerHTML =
                //         formattedDate;
                //     document.getElementById("voucher_p").innerHTML =
                //         data.data[0].Id_BKK;
                //     document.getElementById("description_p").innerHTML =
                //         data.data[0].Nama_Bank;
                //     document.getElementById("paid_p").innerHTML =
                //         data.data[0].NM_SUP;
                //     //Tbody Array
                //     let kodePerkiraanHTML = "";
                //     data.data.forEach(function (item) {
                //         kodePerkiraanHTML += item.Kode_Perkiraan + "<br>";
                //     });
                //     document.getElementById("coa_p").innerHTML =
                //         kodePerkiraanHTML;

                //     let KeteranganHTML = "";
                //     data.data.forEach(function (item) {
                //         KeteranganHTML += item.Keterangan + "<br>";
                //     });
                //     document.getElementById("acc_p").innerHTML = KeteranganHTML;

                //     let Rincian_BayarHTML = "";
                //     data.data.forEach(function (item) {
                //         Rincian_BayarHTML += item.Rincian_Bayar + "<br>";
                //     });
                //     document.getElementById("desc_p").innerHTML =
                //         Rincian_BayarHTML;

                //     let Id_PenagihanHTML = "";
                //     data.data.forEach(function (item) {
                //         Id_PenagihanHTML +=
                //             item.Id_Penagihan + "<br>" ?? "" + "<br>";
                //     });
                //     document.getElementById("bgno_p").innerHTML =
                //         Id_PenagihanHTML;

                //     let Nilai_RincianHTML = "";
                //     let totalNilaiRincian = 0;

                //     data.data.forEach(function (item) {
                //         let nilaiRincian = parseFloat(item.Nilai_Rincian);
                //         let formattedValue = nilaiRincian.toLocaleString(
                //             "en-US",
                //             {
                //                 minimumFractionDigits: 2,
                //                 maximumFractionDigits: 2,
                //             }
                //         );

                //         Nilai_RincianHTML += formattedValue + "<br>";
                //         totalNilaiRincian += nilaiRincian; // Tambahkan nilai ke total
                //     });

                //     document.getElementById("amount_p").innerHTML =
                //         Nilai_RincianHTML;

                //     // Format total dan tampilkan di element dengan id "total_p"
                //     document.getElementById("total_p").innerHTML =
                //         totalNilaiRincian.toLocaleString("en-US", {
                //             minimumFractionDigits: 2,
                //             maximumFractionDigits: 2,
                //         });

                //     document.getElementById("alasan_p").innerHTML =
                //         data.data[0].Alasan;

                //     document.getElementById("batal_p").innerHTML =
                //         data.data[0].Batal;

                //     window.print();
                // } else {
                document.getElementById("name_p").innerHTML =
                    data.data[0].Id_bank;
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
                document.getElementById("tanggal_p").innerHTML = formattedDate;
                document.getElementById("voucher_p").innerHTML =
                    data.data[0].Id_BKM;
                document.getElementById("description_p").innerHTML =
                    data.data[0].Nama_Bank;
                document.getElementById("received_p").innerHTML =
                    data.data[0].Keterangan || "";
                //Tbody Array
                let tbodyHTML = ""; // Variabel untuk menyimpan isi tbody
                tbodyHTML += `<tr style="border:none !important">
                    <td style="border:none !important; border-bottom: 2px solid black !important">C.O.A</td>
                    <td style="border:none !important; border-bottom: 2px solid black !important">Account Name</td>
                    <td style="border:none !important; border-bottom: 2px solid black !important">Description</td>
                    <td style="border:none !important; border-bottom: 2px solid black !important" id="nobg_p"></td>
                    <td style="border:none !important; border-bottom: 2px solid black !important" id="matauang_p">Amount ${
                        data.data[0].Id_MataUang_BC ?? ""
                    }
                    </td>
                </tr>`;
                data.data.forEach(function (item) {
                    tbodyHTML += `
                    <tr>
                        <td style="border:none !important;">
                            ${item.KodePerkiraan ?? ""}
                        </td>
                        <td style="border:none !important;">
                            ${item.DetailKdPerkiraan ?? ""}
                        </td>
                        <td style="border:none !important;">
                            ${item.Uraian ?? ""}
                        </td>
                        <td style="border:none !important;">
                            ${""}
                        </td>
                        <td style="border:none !important; text-align: right;">
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
                let totalNilaiRincian = data.data.reduce(function (acc, item) {
                    return acc + parseFloat(item.Nilai_Rincian);
                }, 0);

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
                    <td style="text-align: center !important; width: 80px; border:none !important">Responsible Person</td>
                    <td style="border:none !important"></td>
                </tr>
                <tr style="border:none !important">
                    <td style="border:none !important">&nbsp;</td>
                    <td style="border:none !important">&nbsp;</td>
                    <td style="border:none !important">&nbsp;</td>
                    <td style="border:none !important" id="batal_p">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                    </td>
                    <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                    </td>
                    <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                    </td>
                    <td style="border:none !important" id="alasan_p">&nbsp;</td>
                </tr>
                            `;
                // Menambahkan hasil ke dalam tbody
                document.querySelector("#ttdTable tbody").innerHTML =
                    tbodyttdHTML;

                // Menambahkan hasil ke dalam tbody
                document.querySelector("#paymentTable tbody").innerHTML =
                    tbodyHTML;

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
                url: "/Kencana/MaintenanceBKMKRR1Kencana/getPelunasanTunai",
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
            order: [[0, "desc"]],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [5], visible: false }],
        });

        myModal.show();
    });

    btn_okbkm.addEventListener("click", async function (event) {
        event.preventDefault();
        tabletampilBKM = $("#tabletampilBKM").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/MaintenanceBKMKRR1Kencana/getOkBKM",
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
                                url: "/Kencana/MaintenanceBKMKRR1Kencana/getKira",
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
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowDataPertama = table_kiri.row($(this).closest("tr")).data();
                rowDataArray.push(rowDataPertama);
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_kiri);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                // rowDataArray = [];
                // rowDataPertama = null;
                rowDataPertama = table_kiri.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Detail
                rowDataArray = rowDataArray.filter(
                    (row) => row[0] !== rowDataPertama[0]
                );
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
