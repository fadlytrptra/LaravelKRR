$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_batal = document.getElementById("btn_batal");
    let btn_customer = document.getElementById("btn_customer");
    let btn_penagihan = document.getElementById("btn_penagihan");
    let btn_barang = document.getElementById("btn_barang");
    let btn_tambahItem = document.getElementById("btn_tambahItem");
    let btn_hapusItem = document.getElementById("btn_hapusItem");
    let btn_simpanM = document.getElementById("btn_simpanM");
    let btn_notaKredit = document.getElementById("btn_notaKredit");
    let tanggalInput = document.getElementById("tanggalInput");
    let nama_customer = document.getElementById("nama_customer");
    let idCustomer = document.getElementById("idCustomer");
    let idJenisCustomer = document.getElementById("idJenisCustomer");
    let no_penagihan = document.getElementById("no_penagihan");
    let namaBarang = document.getElementById("namaBarang");
    let kodeBarang = document.getElementById("kodeBarang");
    let hargaStlPotong = document.getElementById("hargaStlPotong");
    let totalPot = document.getElementById("totalPot");
    let totalPotongan = document.getElementById("totalPotongan");
    let mataUang = document.getElementById("mataUang");
    let idMataUang = document.getElementById("idMataUang");
    let statusPPN = document.getElementById("statusPPN");
    let jnsPPN = document.getElementById("jnsPPN");
    let statusPelunasan = document.getElementById("statusPelunasan");
    let statusPelunasan2 = document.getElementById("statusPelunasan2");
    let no_notaKredit = document.getElementById("no_notaKredit");
    let terbilang = document.getElementById("terbilang");
    let tutup_modal = document.getElementById("tutup_modal");
    let table_atas = $("#table_atas").DataTable({
        columnDefs: [{ targets: [6], visible: false }],
    });
    let table_tampilModal = $("#table_tampilModal").DataTable({
        // columnDefs: [{ targets: [4], visible: false }],
    });
    let table_hapus = $("#table_hapus").DataTable({
        // columnDefs: [{ targets: [4], visible: false }],
    });
    let proses;

    tanggalInput.valueAsDate = new Date();
    totalPotongan.value = 0;
    nama_customer.readOnly = true;
    no_notaKredit.readOnly = true;
    no_penagihan.readOnly = true;
    kodeBarang.readOnly = true;
    namaBarang.readOnly = true;
    totalPotongan.readOnly = true;
    terbilang.readOnly = true;
    mataUang.readOnly = true;
    statusPelunasan.readOnly = true;
    statusPelunasan2.readOnly = true;
    btn_customer.disabled = true;
    btn_notaKredit.disabled = true;
    btn_penagihan.disabled = true;
    btn_barang.disabled = true;
    btn_tambahItem.disabled = true;
    btn_hapusItem.disabled = true;
    btn_isi.focus();
    btn_proses.disabled = true;
    btn_batal.disabled = true;

    btn_isi.addEventListener("click", async function (event) {
        event.preventDefault();
        document.querySelectorAll("input").forEach((input) => {
            if (input !== tanggalInput) {
                input.value = "";
            }
        });
        statusPelunasan2.value= "";
        table_atas.clear().draw();
        table_hapus.clear().draw();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_customer.disabled = false;
        btn_notaKredit.disabled = true;
        btn_penagihan.disabled = false;
        btn_barang.disabled = false;
        btn_tambahItem.disabled = false;
        btn_hapusItem.disabled = false;
        btn_customer.focus();
        proses = 1;
    });

    btn_koreksi.addEventListener("click", async function (event) {
        event.preventDefault();
        document.querySelectorAll("input").forEach((input) => {
            if (input !== tanggalInput) {
                input.value = "";
            }
        });
        statusPelunasan2.value = "";
        table_atas.clear().draw();
        table_hapus.clear().draw();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_customer.disabled = false;
        btn_notaKredit.disabled = false;
        btn_penagihan.disabled = true;
        btn_barang.disabled = false;
        btn_tambahItem.disabled = false;
        btn_hapusItem.disabled = false;
        btn_customer.focus();
        proses = 2;
    });

    btn_hapus.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_customer.disabled = false;
        btn_notaKredit.disabled = false;
        btn_penagihan.disabled = true;
        btn_barang.disabled = false;
        btn_tambahItem.disabled = false;
        btn_hapusItem.disabled = false;
        btn_customer.focus();
        // Swal.fire({
        //     icon: "error",
        //     // title: "Error!",
        //     text: "Penagihan tidak boleh dihapus. Jika ada salah pengisian mohon dikoreksi",
        //     showConfirmButton: true,
        // });
        proses = 3;
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
    });

    hargaStlPotong.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            var table_tampilModal = $("#table_tampilModal").DataTable();
            table_tampilModal
                .rows()
                .every(function (rowIdx, tableLoop, rowLoop) {
                    var data = this.data();
                    if (
                        numeral(hargaStlPotong.value).value() >
                        numeral(data[2]).value()
                    ) {
                        Swal.fire({
                            icon: "info",
                            // title: "Error!",
                            text: "Tidak boleh lebih besar dari harga",
                            showConfirmButton: true,
                        });
                        return;
                    } else {
                        // Pastikan hargaStlPotong tidak kosong
                        if (hargaStlPotong.value.trim() !== "") {
                            // Mengambil nilai dari tabel DataTable
                            var table_tampilModal =
                                $("#table_tampilModal").DataTable();
                            var totalKirim = 0;
                            var hargaSatuan = 0;

                            // Loop untuk menghitung total pengiriman dan mengambil harga satuan dari baris pertama
                            table_tampilModal
                                .rows()
                                .every(function (rowIdx, tableLoop, rowLoop) {
                                    var data = this.data();
                                    totalKirim += numeral(data[1]).value(); // Ambil jumlah kirim
                                    if (rowIdx === 0) {
                                        hargaSatuan = numeral(data[2]).value(); // Ambil harga satuan dari baris pertama
                                    }
                                });

                            // Hitung total sesuai dengan logika VB
                            var tTotal =
                                totalKirim *
                                (hargaSatuan -
                                    numeral(hargaStlPotong.value).value());

                            // Optional: Tampilkan hasil hitung di console atau di mana pun diperlukan
                            // console.log("Total Pengurangan Harga: ", tTotal);
                            hargaStlPotong.value = numeral(
                                hargaStlPotong.value
                            ).format("0.00");
                            totalPot.value = numeral(tTotal).format("0,0.00");

                            setTimeout(() => {
                                btn_simpanM.focus();
                            }, 300);
                        }
                    }
                });
        }
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        const allRowsDataAtas = table_atas.rows().data().toArray();
        const allRowsDataHapus = table_hapus.rows().data().toArray();

        let grandTotal = parseFloat(totalPotongan.value.replace(/,/g, ""));
        console.log(grandTotal);

        if (statusPPN.value == "Y") {
            grandTotal *= 1.1;
        }

        let TTerbilang;
        if (mataUang.value.trim().toUpperCase() == "RUPIAH") {
            TTerbilang = convertNumberToWordsRupiah(grandTotal);
        } else {
            TTerbilang = convertNumberToWordsDollar(grandTotal);
        }

        if (statusPPN.value == "Y" && ["1", "2", "5"].includes(jnsPPN.value)) {
            grandTotal /= 1.1;
        }

        if (proses == 1) {
            $.ajax({
                url: "/Kencana/PotHargaKCN",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    grandTotal: grandTotal,
                    TTerbilang: TTerbilang,
                    tanggalInput: tanggalInput.value,
                    idMataUang: idMataUang.value,
                    statusPPN: statusPPN.value,
                    no_penagihan: no_penagihan.value,
                    statusPelunasan: statusPelunasan.value,
                    allRowsDataAtas: allRowsDataAtas,
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
                            totalPotongan.value = grandTotal;
                            terbilang.value = TTerbilang;
                            btn_isi.disabled = false;
                            btn_koreksi.disabled = false;
                            btn_hapus.disabled = false;
                            btn_proses.disabled = true;
                            btn_batal.disabled = true;
                            // location.reload();
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
        } else if (proses == 2) {
            $.ajax({
                url: "/Kencana/PotHargaKCN",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    grandTotal: grandTotal,
                    TTerbilang: TTerbilang,
                    no_notaKredit: no_notaKredit.value,
                    allRowsDataAtas: allRowsDataAtas,
                    allRowsDataHapus: allRowsDataHapus,
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
                            totalPotongan.value = grandTotal;
                            terbilang.value = TTerbilang;
                            btn_isi.disabled = false;
                            btn_koreksi.disabled = false;
                            btn_hapus.disabled = false;
                            btn_proses.disabled = true;
                            btn_batal.disabled = true;
                            // location.reload();
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
        } else if (proses == 3) {
            $.ajax({
                url: "/Kencana/PotHargaKCN",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    grandTotal: grandTotal,
                    TTerbilang: TTerbilang,
                    no_notaKredit: no_notaKredit.value,
                    allRowsDataAtas: allRowsDataAtas,
                    allRowsDataHapus: allRowsDataHapus,
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
                            // grandTotalRetur.value = grandTotal;
                            // terbilang.value = TTerbilang;
                            // btn_isi.disabled = false;
                            // btn_koreksi.disabled = false;
                            // btn_hapus.disabled = false;
                            // btn_proses.disabled = true;
                            // btn_batal.disabled = true;
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
        }
    });

    btn_simpanM.addEventListener("click", async function (event) {
        event.preventDefault();
        var table_tampilModal = $("#table_tampilModal").DataTable();
        const allRowsModal = table_tampilModal.rows().data().toArray();

        var table_atas = $("#table_atas").DataTable();
        // table_tampilModal.clear().draw();
        allRowsModal.forEach(function (item, index) {
            console.log(item);
            const newRow = {
                suratJalan: item[0],
                kodeBarang: kodeBarang.value,
                jumlahKirim: item[1],
                hargaLama: item[2],
                hargaBaru: numeral(hargaStlPotong.value).format("0"),
                id: "",
                totalPot: numeral(totalPot.value).format("0"),
            };

            table_atas.row
                .add([
                    newRow.suratJalan,
                    newRow.kodeBarang,
                    newRow.jumlahKirim,
                    newRow.hargaLama,
                    newRow.hargaBaru,
                    newRow.id,
                    newRow.totalPot,
                ])
                .draw();
        });

        var totalPotongan = 0;
        table_atas.rows().every(function (rowIdx, tableLoop, rowLoop) {
            var rowData = this.data();
            totalPotongan += parseFloat(numeral(rowData[6]).value());
        });

        // Tampilkan hasil total pada elemen totalPotongan
        $("#totalPotongan").val(numeral(totalPotongan).format("0,0.00"));

        tutup_modal.click();
        setTimeout(() => {
            btn_proses.focus();
        }, 300);
    });

    tutup_modal.addEventListener("click", async function (event) {
        event.preventDefault();
        hargaStlPotong.value = "";
        totalPot.value = "";
    });

    btn_tambahItem.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/PotHargaKCN/getBarangDetails",
            type: "GET",
            data: {
                _token: csrfToken,
                no_penagihan: no_penagihan.value,
                kodeBarang: kodeBarang.value,
            },
            success: function (data) {
                console.log(data);
                var table_tampilModal = $("#table_tampilModal").DataTable();

                table_tampilModal.clear().draw();
                data.data.forEach(function (item, index) {
                    console.log(item);
                    const newRow = {
                        suratJalan: item.IDPengiriman,
                        jumlahKirim: numeral(item.JmlTerimaUmum).format("0"),
                        harga: numeral(item.HargaSatuan).format("0"),
                    };

                    table_tampilModal.row
                        .add([
                            newRow.suratJalan,
                            newRow.jumlahKirim,
                            newRow.harga,
                        ])
                        .draw();
                });
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
        var myModal = new bootstrap.Modal(
            document.getElementById("modalLihatItem"),
            {
                keyboard: false,
            }
        );

        // Event listener untuk memastikan fokus terjadi setelah modal ditampilkan sepenuhnya
        document
            .getElementById("modalLihatItem")
            .addEventListener("shown.bs.modal", function () {
                hargaStlPotong.focus(); // Fokuskan input
            });

        myModal.show();
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);
    });

    btn_hapusItem.addEventListener("click", async function (event) {
        event.preventDefault();

        // Get the selected row
        const selectedRow = $("#table_atas tbody tr.selected");

        if (selectedRow.length > 0) {
            // Get DataTable instance
            var table_atas = $("#table_atas").DataTable();
            var table_hapus = $("#table_hapus").DataTable();

            // Get data of the selected row
            var rowData = table_atas.row(selectedRow).data();
            console.log(rowData);

            // Add the row to table_hapus
            table_hapus.row.add(rowData).draw();

            // Remove the row from DataTable
            table_atas.row(selectedRow).remove().draw();

            var totalPotongan = 0;
            table_atas.rows().every(function (rowIdx, tableLoop, rowLoop) {
                var rowData = this.data();
                totalPotongan += parseFloat(numeral(rowData[6]).value());
            });

            // Tampilkan hasil total pada elemen totalPotongan
            $("#totalPotongan").val(numeral(totalPotongan).format("0,0.00"));
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        }
    });

    btn_notaKredit.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Nota Kredit",
                html: '<table id="notaKreditTable" class="display" style="width:100%"><thead><tr><th>ID. Nota Kredit</th><th>Nama Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#notaKreditTable")
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
                        const table = $("#notaKreditTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/PotHargaKCN/getNotaKredit",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idCustomer: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_NotaKredit",
                                },
                                {
                                    data: "Tanggal",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#notaKreditTable_filter input").focus();
                        }, 300);
                        // $("#notaKreditTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#notaKreditTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "notaKreditTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    no_notaKredit.value = escapeHTML(
                        selectedRow.Id_NotaKredit.trim()
                    );

                    $.ajax({
                        url: "/Kencana/PotHargaKCN/displayNotaKredit",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_notaKredit: no_notaKredit.value,
                        },
                        success: function (data) {
                            console.log(data);

                            no_penagihan.value = data.Id_Penagihan;
                            mataUang.value = data.Nama_MataUang;
                            idMataUang.value = data.Id_MataUang;
                            statusPPN.value = data.Status_PPN;
                            jnsPPN.value = data.Jns_PPN;
                            statusPelunasan.value = data.Lunas;
                            terbilang.value = data.Terbilang;

                            if (statusPelunasan.value == "Lunas") {
                                statusPelunasan2.value = "Harap Dibuatkan BKK";
                            } else {
                                statusPelunasan2.value = "";
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    $.ajax({
                        url: "/Kencana/PotHargaKCN/displayNotaKreditDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_notaKredit: no_notaKredit.value,
                        },
                        success: function (data) {
                            console.log(data);

                            var table_atas = $("#table_atas").DataTable();
                            // table_tampilModal.clear().draw();
                            data.data.forEach(function (item, index) {
                                console.log(item);
                                const newRow = {
                                    suratJalan: item.SuratJalan,
                                    kodeBarang: item.KdBrg,
                                    jumlahKirim: item.QtyBrg,
                                    hargaLama: item.HargaPot,
                                    hargaBaru: item.HargaSP,
                                    id: item.IdDetail,
                                    totalPot: numeral(data.TTotal).format("0"),
                                };

                                table_atas.row
                                    .add([
                                        newRow.suratJalan,
                                        newRow.kodeBarang,
                                        newRow.jumlahKirim,
                                        newRow.hargaLama,
                                        newRow.hargaBaru,
                                        newRow.id,
                                        newRow.totalPot,
                                    ])
                                    .draw();
                            });

                            var totalPotongan = 0;
                            table_atas
                                .rows()
                                .every(function (rowIdx, tableLoop, rowLoop) {
                                    var rowData = this.data();
                                    totalPotongan += parseFloat(
                                        numeral(rowData[6]).value()
                                    );
                                });

                            // Tampilkan hasil total pada elemen totalPotongan
                            $("#totalPotongan").val(
                                numeral(totalPotongan).format("0,0.00")
                            );
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    // setTimeout(() => {
                    //     btn_suratJalan.focus();
                    // }, 300);

                    // if (proses == 1) {
                    //     setTimeout(() => {
                    //         btn_suratJalan.focus();
                    //     }, 300);
                    // } else if (proses == 2 || proses == 3) {
                    //     setTimeout(() => {
                    //         btn_penagihan.focus();
                    //     }, 300);
                    // }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_customer.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>ID. Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#customerTable")
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
                        const table = $("#customerTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/PotHargaKCN/getCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    proses: proses,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaCust",
                                },
                                {
                                    data: "idCust",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#customerTable_filter input").focus();
                        }, 300);
                        // $("#customerTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#customerTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "customerTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_customer.value = escapeHTML(
                        selectedRow.NamaCust.trim()
                    );
                    idJenisCustomer.value = escapeHTML(
                        selectedRow.TIdJnsCust.trim()
                    );
                    idCustomer.value = escapeHTML(
                        selectedRow.TIdCustomer.trim()
                    );
                    console.log(idCustomer.value);
                    console.log(idJenisCustomer.value);

                    // idJenisCustomer.value = selectedRow.IDCust.trim().substring(
                    //     0,
                    //     3
                    // );
                    // idCustomer.value = selectedRow.IDCust.trim().slice(-5);

                    if (proses == 1) {
                        setTimeout(() => {
                            btn_penagihan.focus();
                        }, 300);
                    } else {
                        setTimeout(() => {
                            btn_notaKredit.focus();
                        }, 300);
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_penagihan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Penagihan",
                html: '<table id="PenagihanTable" class="display" style="width:100%"><thead><tr><th>ID. Penagihan</th><th>Tanggal Penagihan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PenagihanTable")
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
                        const table = $("#PenagihanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/PotHargaKCN/getPenagihan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idCustomer: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Penagihan",
                                },
                                {
                                    data: "Tgl_Penagihan",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PenagihanTable_filter input").focus();
                        }, 300);
                        // $("#PenagihanTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Penagihan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PenagihanTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PenagihanTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    no_penagihan.value = escapeHTML(
                        selectedRow.Id_Penagihan.trim()
                    );

                    $.ajax({
                        url: "/Kencana/PotHargaKCN/getPenagihanDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_penagihan: no_penagihan.value,
                        },
                        success: function (data) {
                            console.log(data);

                            mataUang.value = data.Nama_MataUang;
                            idMataUang.value = data.Id_MataUang;
                            statusPPN.value = data.Status_PPN;
                            jnsPPN.value = data.Jns_PPN;
                            statusPelunasan.value = data.Lunas;

                            if (statusPelunasan.value == "Lunas") {
                                statusPelunasan2.value = "Harap Dibuatkan BKK";
                            } else {
                                statusPelunasan2.value = "";
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    setTimeout(() => {
                        btn_barang.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_barang.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Barang",
                html: '<table id="barangTable" class="display" style="width:100%"><thead><tr><th>Nama Barang</th><th>Kode Barang</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "60%",
                preConfirm: () => {
                    const selectedData = $("#barangTable")
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
                        const table = $("#barangTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/PotHargaKCN/getBarang",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    no_penagihan: no_penagihan.value,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaBarang",
                                },
                                {
                                    data: "KdBrg",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#barangTable_filter input").focus();
                        }, 300);
                        // $("#barangTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_barang)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#barangTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "barangTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    namaBarang.value = escapeHTML(
                        selectedRow.NamaBarang.trim()
                    );
                    kodeBarang.value = escapeHTML(selectedRow.KdBrg.trim());
                    setTimeout(() => {
                        btn_tambahItem.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
