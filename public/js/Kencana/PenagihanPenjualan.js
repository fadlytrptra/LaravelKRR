$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let btn_customer = document.getElementById("btn_customer");
    let btn_penagihan = document.getElementById("btn_penagihan");
    let btn_noSP = document.getElementById("btn_noSP");
    let btn_userPenagih = document.getElementById("btn_userPenagih");
    let btn_pajak = document.getElementById("btn_pajak");
    let btn_dokumen = document.getElementById("btn_dokumen");
    let btn_penagihanUM = document.getElementById("btn_penagihanUM");
    let btn_suratJalan = document.getElementById("btn_suratJalan");
    let btn_lihatItem = document.getElementById("btn_lihatItem");
    let btn_simpanM = document.getElementById("btn_simpanM");
    let btn_keluarM = document.getElementById("btn_keluarM");
    let btn_hapusItem = document.getElementById("btn_hapusItem");
    let btn_hapusItemUM = document.getElementById("btn_hapusItemUM");
    let tanggal = document.getElementById("tanggal");
    let penagihanPajak = document.getElementById("penagihanPajak");
    let nama_customer = document.getElementById("nama_customer");
    let idCustomer = document.getElementById("idCustomer");
    let id_cust = document.getElementById("id_cust");
    let jenisCustomer = document.getElementById("jenisCustomer");
    let alamat = document.getElementById("alamat");
    let IdPenagihan = document.getElementById("IdPenagihan");
    let no_penagihan = document.getElementById("no_penagihan");
    let no_sp = document.getElementById("no_sp");
    let namaMataUang = document.getElementById("namaMataUang");
    let nomorPO = document.getElementById("nomorPO");
    let user_penagih = document.getElementById("user_penagih");
    let idUserPenagih = document.getElementById("idUserPenagih");
    let nama_pajak = document.getElementById("nama_pajak");
    let jenis_pajak = document.getElementById("jenis_pajak");
    let dokumen = document.getElementById("dokumen");
    let idJenisDokumen = document.getElementById("idJenisDokumen");
    let uangMasuk = document.getElementById("uangMasuk");
    let nilaiSblmPPN = document.getElementById("nilaiSblmPPN");
    let nilaiPpn = document.getElementById("nilaiPpn");
    let terbilang = document.getElementById("terbilang");
    let total = document.getElementById("total");
    let Ppn = document.getElementById("Ppn");
    let idMataUang = document.getElementById("idMataUang");
    let nilaiKurs = document.getElementById("nilaiKurs");
    let tanggalBC24 = document.getElementById("tanggalBC24");
    let no_penagihanUM = document.getElementById("no_penagihanUM");
    let id_penagihanUM = document.getElementById("id_penagihanUM");
    let surat_jalan = document.getElementById("surat_jalan");
    let totalLihat = document.getElementById("totalLihat");
    let tanggal_diterima = document.getElementById("tanggal_diterima");
    let nilaiPenagihan = document.getElementById("nilaiPenagihan");
    let nilaiUangMuka = document.getElementById("nilaiUangMuka");
    let dpp_nilaiLain = document.getElementById("dpp_nilaiLain");
    let nilai_total = document.getElementById("nilai_total");
    let nilai_ppn = document.getElementById("nilai_ppn");
    let idJenisPajak = document.getElementById("idJenisPajak");
    let syaratPembayaran = document.getElementById("syaratPembayaran");
    let nama_bank = document.getElementById("nama_bank");
    let btn_bank = document.getElementById("btn_bank");
    let idBank = document.getElementById("idBank");
    let nomor_seriFakturPajak = document.getElementById("nomor_seriFakturPajak"); //prettier-ignore
    let table_atas = $("#table_atas").DataTable({
        columnDefs: [{ targets: [0, 7], visible: false }],
    });
    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [0, 7], visible: false }],
    });
    let table_item = $("#table_item").DataTable({
        // columnDefs: [{ targets: [0], visible: false }],
    });
    let proses;

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

    tanggal.valueAsDate = new Date();
    penagihanPajak.valueAsDate = new Date();
    tanggalBC24.valueAsDate = new Date();

    btn_proses.disabled = true;
    btn_batal.disabled = true;
    btn_customer.disabled = true;
    btn_penagihan.disabled = true;
    btn_noSP.disabled = true;
    btn_userPenagih.disabled = true;
    btn_bank.disabled = true;
    btn_pajak.disabled = true;
    btn_penagihanUM.disabled = true;
    btn_suratJalan.disabled = true;
    btn_dokumen.disabled = true;
    btn_lihatItem.disabled = true;
    btn_hapusItem.disabled = true;
    id_cust.readOnly = true;
    nama_customer.readOnly = true;
    no_penagihan.readOnly = true;
    jenisCustomer.readOnly = true;
    alamat.readOnly = true;
    no_sp.readOnly = true;
    nomorPO.readOnly = true;
    namaMataUang.readOnly = true;
    user_penagih.readOnly = true;
    nama_bank.readOnly = true;
    nama_pajak.readOnly = true;
    no_penagihanUM.readOnly = true;
    surat_jalan.readOnly = true;
    dokumen.readOnly = true;
    noBC24.readOnly = false;
    nomor_seriFakturPajak.readOnly = false;
    nilaiPenagihan.readOnly = true;
    nilaiUangMuka.readOnly = true;
    dpp_nilaiLain.readOnly = true;
    nilai_ppn.readOnly = true;
    nilai_total.readOnly = true;
    terbilang.readOnly = false;
    btn_isi.focus();

    let tableData = [];


    function hitungRingkasanPenagihan() {
        // Total seluruh Nilai Penagihan pada tabel Surat Jalan
        const totalSuratJalan = table_atas
            .rows()
            .data()
            .toArray()
            .reduce((sum, row) => {
                return sum + (numeral(row[4]).value() || 0);
            }, 0);

        // Total seluruh Jumlah UM pada tabel Uang Muka
        const totalUangMuka = table_bawah
            .rows()
            .data()
            .toArray()
            .reduce((sum, row) => {
                return sum + (numeral(row[1]).value() || 0);
            }, 0);

        // Nilai Penagihan = Total Surat Jalan - Total Uang Muka
        const nilaiPenagihanBersih = totalSuratJalan - totalUangMuka;

        // Perhitungan DPP, PPN, dan Total
        const dppNilaiLain = (nilaiPenagihanBersih * 11) / 12;
        const nilaiPPN = (dppNilaiLain * 12) / 100;
        const nilaiTotal = nilaiPenagihanBersih + nilaiPPN;

        nilaiPenagihan.value = numeral(
            nilaiPenagihanBersih
        ).format("0,0.00");

        nilaiUangMuka.value = numeral(
            totalUangMuka
        ).format("0,0.00");

        dpp_nilaiLain.value = numeral(
            dppNilaiLain
        ).format("0,0.00");

        nilai_ppn.value = numeral(
            nilaiPPN
        ).format("0,0.00");

        nilai_total.value = numeral(
            nilaiTotal
        ).format("0,0.00");

        if (idMataUang.value == "1") {
            terbilang.value = convertNumberToWordsRupiah(nilaiTotal);
        } else {
            terbilang.value = convertNumberToWordsDollar(nilaiTotal);
        }
    }

    tanggal.addEventListener("input", function () {
        const selectedDate = new Date(this.value);
        penagihanPajak.valueAsDate = selectedDate;
    });

    btn_isi.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_customer.disabled = false;
        btn_penagihan.disabled = true;
        btn_noSP.disabled = false;
        btn_userPenagih.disabled = false;
        btn_bank.disabled = false;
        btn_pajak.disabled = false;
        btn_penagihanUM.disabled = false;
        btn_suratJalan.disabled = false;
        btn_dokumen.disabled = false;
        btn_lihatItem.disabled = false;
        btn_hapusItem.disabled = false;
        btn_customer.focus();
        proses = 1;
    });

    btn_koreksi.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_customer.disabled = false;
        btn_penagihan.disabled = false;
        btn_noSP.disabled = true;
        btn_userPenagih.disabled = false;
        btn_bank.disabled = false;
        btn_pajak.disabled = false;
        btn_penagihanUM.disabled = false;
        btn_suratJalan.disabled = false;
        btn_dokumen.disabled = false;
        btn_lihatItem.disabled = false;
        btn_hapusItem.disabled = false;
        btn_customer.focus();
        proses = 2;
    });

    btn_hapus.addEventListener("click", async function (event) {
        event.preventDefault();
        // Swal.fire({
        //     icon: "error",
        //     // title: "Error!",
        //     text: "Penagihan tidak boleh dihapus. Jika ada salah pengisian mohon dikoreksi",
        //     showConfirmButton: true,
        // });
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        btn_customer.disabled = false;
        btn_penagihan.disabled = false;
        btn_noSP.disabled = true;
        btn_userPenagih.disabled = false;
        btn_bank.disabled = false;
        btn_pajak.disabled = false;
        btn_penagihanUM.disabled = false;
        btn_suratJalan.disabled = false;
        btn_dokumen.disabled = false;
        btn_lihatItem.disabled = false;
        btn_hapusItem.disabled = false;
        btn_customer.focus();
        proses = 3;
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_proses.disabled = true;
        const allRowsDataAtas = table_atas.rows().data().toArray();
        const allRowsDataBawah = table_bawah.rows().data().toArray();
        console.log(allRowsDataBawah);

        let TTerbilang;
        let TNilaiPenagihan = 0;
        let TNilaiUM = 0;
        let value = parseFloat(nilaiPenagihan.value.replace(/,/g, "")); // Remove commas and parse number
        nilaiPenagihan.value = value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        if (nilaiUangMuka.value == "") {
            TNilaiUM = 0;
        } else {
            let valueUM = parseFloat(nilaiUangMuka.value.replace(/,/g, "")); // Remove commas and parse number
            nilaiUangMuka.value = valueUM.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            TNilaiUM = valueUM;
        }

        TNilaiPenagihan = value;

        if (idUserPenagih.value == "" || user_penagih.value == "") {
            Swal.fire({
                icon: "info",
                title: "P E S A N",
                text: "Isi User Penagihnya",
            });
            return;
        }

        if (idJenisDokumen.value == "") {
            Swal.fire({
                icon: "info",
                title: "P E S A N",
                text: "Isi Jenis Dokumennya",
            });
            return;
        }

        // Nilai Penagihan Ditambah PPN
        // TNilaiPenagihan -= TNilaiUM;

        // Handle customer type and PPN
        if (
            id_cust.value == "PWX" ||
            id_cust.value == "PNX" ||
            id_cust.value == "PXX"
        ) {
            if (
                jenis_pajak.value == "1" ||
                jenis_pajak.value == "2" ||
                jenis_pajak.value == "5"
            ) {
                if (Ppn.value == "11") {
                    TNilaiPenagihan =
                        Math.round((TNilaiPenagihan / 1.11) * 100) / 100;
                } else if (Ppn.value == "12") {
                    TNilaiPenagihan = Math.round(TNilaiPenagihan * 100) / 100;
                } else {
                    TNilaiPenagihan =
                        Math.round((TNilaiPenagihan / 1.1) * 100) / 100;
                }
            } else {
                if (Ppn.value == "11") {
                    TNilaiPenagihan =
                        Math.round(TNilaiPenagihan * 1.11 * 100) / 100;
                } else if (Ppn.value == "12") {
                    TNilaiPenagihan =
                        Math.round(TNilaiPenagihan * 1.11 * 100) / 100;
                } else {
                    TNilaiPenagihan =
                        Math.round(TNilaiPenagihan * 1.1 * 100) / 100;
                }

                if (jenis_pajak.value == "" && proses == 1) {
                    Swal.fire({
                        icon: "info",
                        title: "P E S A N",
                        text: "ISI JENIS PAJAKNYA",
                    });
                    return;
                }
            }
        }
        console.log(TNilaiPenagihan);

        // Handle currency conversion
        if (proses == 1 || proses == 2) {
            if (idMataUang.value == "1") {
                TTerbilang = convertNumberToWordsRupiah(TNilaiPenagihan);
            } else {
                if (nilaiKurs.value <= 0 || nilaiKurs.value == null) {
                    Swal.fire({
                        icon: "info",
                        title: "P E S A N",
                        text: "ISI DULU NILAI KURSNYA",
                    });
                    return;
                }
                TTerbilang = convertNumberToWordsDollar(TNilaiPenagihan);
            }
        }

        // Handle reversing PPN for other tax types
        // if (
        //     id_cust.value == "PWX" ||
        //     id_cust.value == "PNX" ||
        //     id_cust.value == "PXX"
        // ) {
        //     if (
        //         jenis_pajak.value == "1" ||
        //         jenis_pajak.value == "2" ||
        //         jenis_pajak.value == "5"
        //     ) {
        //         if (Ppn.value == "11") {
        //             TNilaiPenagihan =
        //                 Math.round((TNilaiPenagihan / 1.11) * 100) / 100;
        //         } else {
        //             TNilaiPenagihan =
        //                 Math.round((TNilaiPenagihan / 1.1) * 100) / 100;
        //         }
        //     }
        // }

        if (proses == 1) {
            $.ajax({
                url: "/Kencana/PenagihanPenjualanLokalKencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    // nilaiPenagihan: nilaiPenagihan.value,
                    // nilaiUangMuka: nilaiUangMuka.value,
                    id_cust: id_cust.value,
                    Ppn: Ppn.value,
                    idMataUang: idMataUang.value,
                    nilaiKurs: nilaiKurs.value,
                    jenis_pajak: jenis_pajak.value,
                    tanggal: tanggal.value,
                    idCustomer: idCustomer.value,
                    nomorPO: nomorPO.value,
                    idJenisDokumen: idJenisDokumen.value,
                    idUserPenagih: idUserPenagih.value,
                    penagihanPajak: penagihanPajak.value,
                    no_penagihanUM: no_penagihanUM.value,
                    TTerbilang: TTerbilang,
                    noSeriFakturPajak: nomor_seriFakturPajak.value,
                    idBank: idBank.value,
                    TNilaiPenagihan: TNilaiPenagihan,
                    TNilaiUM: TNilaiUM,
                    allRowsDataAtas: allRowsDataAtas,
                    allRowsDataBawah: allRowsDataBawah,
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
                            location.reload();
                            // document
                            //     .querySelectorAll("input")
                            //     .forEach((input) => (input.value = ""));
                            // $("#table_atas").DataTable().ajax.reload();
                            // idReferensi.value = response.IdReferensi;
                            // btn_proses.disabled = true;
                            // btn_batal.disabled = true;
                            // btn_isi.disabled = false;
                            // btn_koreksi.disabled = false;
                            // btn_hapus.disabled = false;
                            // btn_ok.click();
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
                url: "/Kencana/PenagihanPenjualanLokalKencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    Ppn: Ppn.value,
                    nilaiKurs: nilaiKurs.value,
                    jenis_pajak: jenis_pajak.value,
                    idUserPenagih: idUserPenagih.value,
                    penagihanPajak: penagihanPajak.value,
                    no_penagihan: no_penagihan.value,
                    idBank: idBank.value,
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
                            location.reload();
                            // document
                            //     .querySelectorAll("input")
                            //     .forEach((input) => (input.value = ""));
                            // $("#table_atas").DataTable().ajax.reload();
                            // idReferensi.value = response.IdReferensi;
                            // btn_proses.disabled = true;
                            // btn_batal.disabled = true;
                            // btn_isi.disabled = false;
                            // btn_koreksi.disabled = false;
                            // btn_hapus.disabled = false;
                            // btn_ok.click();
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
                url: "/Kencana/PenagihanPenjualanLokalKencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: proses,
                    no_penagihan: no_penagihan.value,
                    tanggal: tanggal.value,
                    idJenisDokumen: idJenisDokumen.value,
                    no_penagihanUM: no_penagihanUM.value,
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
                            location.reload();
                            // document
                            //     .querySelectorAll("input")
                            //     .forEach((input) => (input.value = ""));
                            // $("#table_atas").DataTable().ajax.reload();
                            // idReferensi.value = response.IdReferensi;
                            // btn_proses.disabled = true;
                            // btn_batal.disabled = true;
                            // btn_isi.disabled = false;
                            // btn_koreksi.disabled = false;
                            // btn_hapus.disabled = false;
                            // btn_ok.click();
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

        // Ambil data dari tabel detail barang
        const table_item = $("#table_item").DataTable();
        const rows = table_item.rows().data();

        rows.each(function (rowData) {
            const newRow = {
                Id_Detail: tableData.length + 1,
                surat_jalan: surat_jalan.value,
                TanggalDiterima: tanggal_diterima.value,
                no_sp: no_sp.value,
                jenis: "SJ",
                id_xc: "",
                Total: rowData.Total,
            };

            tableData.push(newRow);

            // Tambahkan item ke tabel Surat Jalan
            if ($.fn.DataTable.isDataTable("#table_atas")) {
                table_atas.row
                    .add([
                        newRow.Id_Detail,
                        "",
                        newRow.surat_jalan,
                        newRow.TanggalDiterima,
                        newRow.Total,
                        newRow.no_sp,
                        newRow.jenis,
                        newRow.id_xc,
                    ])
                    .draw();
            }
        });

        // Hitung ulang ringkasan setelah item ditambahkan
        hitungRingkasanPenagihan();

        // Tutup modal
        btn_keluarM.click();

        setTimeout(() => {
            btn_dokumen.focus();
        }, 300);
    });


    btn_lihatItem.addEventListener("click", async function (event) {
        event.preventDefault();

        const selectedRow = $("#table_atas tbody tr.selected");
        // Get DataTable instance
        var table_atas = $("#table_atas").DataTable();

        // Get data of the selected row
        var rowData = table_atas.row(selectedRow).data();

        if (selectedRow.length > 0) {
            if (rowData[6] == "SJ") {
                table_item = $("#table_item").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    autoWidth: false,
                    ajax: {
                        url: "/Kencana/PenagihanPenjualanLokalKencana/LihatDetilSJ",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                no_sp: rowData[5],
                                idCustomer: idCustomer.value,
                                surat_jalan: rowData[2],
                            });
                        },
                    },
                    columns: [
                        {
                            data: "NamaBarang",
                            // render: function (data) {
                            //     return `<input type="checkbox" name="penerimaCheckboxM" value="${data}" /> ${data}`;
                            // },
                        },
                        { data: "JmlTerimaUmum" },
                        { data: "HargaSatuan" },
                        { data: "Satuan" },
                        { data: "Total" },
                    ],
                    paging: false,
                    scrollY: "400px",
                    scrollCollapse: true,
                    // columnDefs: [{ targets: [3, 4], visible: false }],
                });

                $.ajax({
                    url: "/Kencana/PenagihanPenjualanLokalKencana/TotalDetailSJ",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        no_sp: rowData[5],
                        idCustomer: idCustomer.value,
                        surat_jalan: rowData[2],
                    },
                    success: function (data) {
                        console.log(data);
                        totalLihat.value = data.total;
                        // jenisCustomer.value = data.TJenisCust;
                        // alamat.value = data.TAlamat;
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    },
                });

                btn_simpanM.disabled = true;

                var myModal = new bootstrap.Modal(
                    document.getElementById("modalLihatItem"),
                    {
                        keyboard: false,
                    },
                );
                myModal.show();
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Bukan jenis SJ!",
                    showConfirmButton: true,
                });
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        }
    });

    btn_hapusItem.addEventListener("click", async function (event) {
        event.preventDefault();

        // Get the selected row
        const selectedRow = $("#table_atas tbody tr.selected");

        if (selectedRow.length > 0) {
            // Get DataTable instance
            var table_atas = $("#table_atas").DataTable();

            // Get data of the selected row
            var rowData = table_atas.row(selectedRow).data();

            // Remove the row from DataTable
            table_atas.row(selectedRow).remove().draw();

            // Remove the row from tableData array
            tableData = tableData.filter((row) => row.Id_Detail !== rowData[0]);
            console.log(tableData);


            hitungRingkasanPenagihan();
            // const totalPelunasan = table_atas
            //     .rows()
            //     .data()
            //     .toArray()
            //     .reduce((sum, row) => {
            //         let jumlahUang = row[4].replace(/,/g, "");
            //         return sum + parseInt(jumlahUang);
            //     }, 0);
            // console.log(totalPelunasan);

            // nilaiPenagihan.value = totalPelunasan.toLocaleString("en-US", {
            //     minimumFractionDigits: 2,
            //     maximumFractionDigits: 2,
            // });
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        }
    });

    btn_hapusItemUM.addEventListener("click", async function (event) {
        event.preventDefault();

        // Get the selected row
        const selectedRow = $("#table_bawah tbody tr.selected");

        if (selectedRow.length > 0) {
            // Get DataTable instance
            var table_bawah = $("#table_bawah").DataTable();

            // Get data of the selected row
            var rowData = table_bawah.row(selectedRow).data();

            // Remove the row from DataTable
            table_bawah.row(selectedRow).remove().draw();

            // Remove the row from tableData array
            tableData = tableData.filter(
                (row) => row.no_penagihanUM !== rowData[0],
            );
            console.log(tableData);

            hitungRingkasanPenagihan();

            // nilaiUangMuka.value = totalPelunasanUM.toLocaleString("en-US", {
            //     minimumFractionDigits: 2,
            //     maximumFractionDigits: 2,
            // });
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu!",
                showConfirmButton: true,
            });
        }
    });

    $("#table_bawah tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_bawah tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_bawah.row(this).data();
        console.log(data);
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
                                url: "/Kencana/PenagihanPenjualanLokalKencana/getCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NAMACUST",
                                },
                                {
                                    data: "IDCust",
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
                            },
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "customerTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_customer.value = escapeHTML(
                        selectedRow.NAMACUST.trim(),
                    );
                    id_cust.value = selectedRow.IDCust.trim().substring(0, 3);
                    idCustomer.value = selectedRow.IDCust.trim().slice(-5);

                    if (id_cust.value == "NPX") {
                        btn_pajak.disabled = true;
                    } else {
                        btn_pajak.disabled = false;
                    }

                    $.ajax({
                        url: "/Kencana/PenagihanPenjualanLokalKencana/getJenisCustomer",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            idCustomer: idCustomer.value,
                        },
                        success: function (data) {
                            console.log(data);
                            jenisCustomer.value = data.TJenisCust;
                            alamat.value = data.TAlamat;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    if (proses == 1) {
                        setTimeout(() => {
                            btn_noSP.focus();
                        }, 300);
                    } else if (proses == 2 || proses == 3) {
                        setTimeout(() => {
                            btn_penagihan.focus();
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
                html: '<table id="PenagihanTable" class="display" style="width:100%"><thead><tr><th>Tanggal</th><th>Penagihan</th></tr></thead><tbody></tbody></table>',
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
                                url: "/Kencana/PenagihanPenjualanLokalKencana/getPenagihan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idCustomer: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Tgl_Penagihan",
                                },
                                {
                                    data: "Id_Penagihan",
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
                            },
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PenagihanTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    no_penagihan.value = escapeHTML(
                        selectedRow.Id_Penagihan.trim(),
                    );
                    IdPenagihan.value = escapeHTML(
                        selectedRow.Tgl_Penagihan.trim(),
                    );

                    let terbilangS;

                    $.ajax({
                        url: "/Kencana/PenagihanPenjualanLokalKencana/lihatPenagihan",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_penagihan: no_penagihan.value,
                        },
                        success: function (data) {
                            console.log(data);
                            tanggal.value = data.Tanggal;
                            namaMataUang.value = data.TMataUang;
                            idMataUang.value = data.TIdMataUang;
                            penagihanPajak.value = data.TglFakturPajak;
                            user_penagih.value = data.TPenagih;
                            idUserPenagih.value = data.TIdUser;
                            nama_pajak.value = data.TPajak;
                            jenis_pajak.value = data.TJnsPajak;
                            nomorPO.value = data.TPO;
                            nilaiKurs.value = data.TKurs;
                            syaratPembayaran.value = data.TsyaratPembayaran;
                            Ppn.value = data.cbPPN;
                            id_penagihanUM.value = data.Tid_PenagihanUM;
                            dokumen.value = data.TDokumen;
                            idJenisDokumen.value = data.TIdJnsDok;
                            nilaiUangMuka.value = data.TNilai_UM;
                            nilaiPenagihan.value = numeral(
                                data.TNilai_blm_Pajak,
                            ).format("0,0.00");
                            dpp_nilaiLain.value = numeral((data.TNilai_blm_Pajak * 11) / 12).format("0,0.00"); //prettier-ignore
                            nilai_ppn.value = numeral(
                                (numeral(dpp_nilaiLain.value).value() * 12) /
                                    100,
                            ).format("0,0.00");
                            nilai_total.value = numeral(
                                data.TNilai_Penagihan,
                            ).format("0,0.00");
                            nama_bank.value = data.TIdBank;
                            idBank.value = data.TNamaBank;

                            if (idMataUang.value == "1") {
                                terbilangS = convertNumberToWordsRupiah(
                                    numeral(nilai_total.value).value(),
                                );
                            } else {
                                if (nilaiKurs.value <= 0) {
                                    Swal.fire({
                                        icon: "info",
                                        title: "Info!",
                                        text: "ISI DULU NILAI KURSNYA",
                                        showConfirmButton: true,
                                    }).then(() => {
                                        nilaiKurs.focus();
                                    });
                                } else {
                                    terbilangS = convertNumberToWordsDollar(
                                        nilaiPenagihan.value,
                                    );
                                }
                            }

                            terbilang.value = terbilangS;

                            if (data.ListSJ && data.ListSJ.length > 0) {
                                var table_atas = $("#table_atas").DataTable();

                                table_atas.clear().draw();
                                data.ListSJ.forEach(function (item, index) {
                                    console.log(item);
                                    if (item.Type == "SJ") {
                                        const newRow = {
                                            Id_Detail:
                                                table_atas.rows().count() + 1,
                                            surat_jalan: item.Surat_Jalan,
                                            TanggalDiterima:
                                                item.Tgl_Surat_jalan,
                                            no_sp: item.IDSuratPesanan,
                                            jenis: item.Type,
                                            id_xc: "",
                                            Total: item.Total,
                                        };

                                        table_atas.row
                                            .add([
                                                newRow.Id_Detail,
                                                "",
                                                newRow.surat_jalan,
                                                newRow.TanggalDiterima,
                                                newRow.Total,
                                                newRow.no_sp,
                                                newRow.jenis,
                                                newRow.id_xc,
                                            ])
                                            .draw();
                                    } else if (
                                        item.Type == "XC" &&
                                        item.Nama_Charge == "Storage"
                                    ) {
                                        const newRow = {
                                            Id_Detail:
                                                table_atas.rows().count() + 1,
                                            surat_jalan: "",
                                            TanggalDiterima:
                                                item.Tgl_Surat_jalan ?? "",
                                            no_sp: item.IDSuratPesanan ?? "",
                                            jenis: item.Type,
                                            id_xc: item.Jenis_Charge,
                                        };

                                        table_atas.row
                                            .add([
                                                newRow.Id_Detail,
                                                newRow.surat_jalan,
                                                newRow.TanggalDiterima,
                                                newRow.no_sp,
                                                newRow.jenis,
                                                newRow.id_xc,
                                            ])
                                            .draw();
                                    } else if (
                                        item.Type == "XC" &&
                                        item.Nama_Charge ==
                                            "Extra Charge Transport"
                                    ) {
                                        const newRow = {
                                            Id_Detail:
                                                table_atas.rows().count() + 1,
                                            surat_jalan: "",
                                            TanggalDiterima:
                                                item.Tgl_Surat_jalan ?? "",
                                            no_sp: item.IDSuratPesanan ?? "",
                                            jenis: item.Type,
                                            id_xc: item.Jenis_Charge,
                                        };

                                        table_atas.row
                                            .add([
                                                newRow.Id_Detail,
                                                newRow.surat_jalan,
                                                newRow.TanggalDiterima,
                                                newRow.no_sp,
                                                newRow.jenis,
                                                newRow.id_xc,
                                            ])
                                            .draw();
                                    }
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                    // idCustomer.value = selectedRow.IDCust.trim().slice(-5);
                    if (proses == 3) {
                        setTimeout(() => {
                            btn_proses.focus();
                        }, 300);
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_noSP.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Surat Pesanan",
                html: '<table id="PesananTable" class="display" style="width:100%"><thead><tr><th>Surat Pesanan</th><th>ID. Pesanan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PesananTable")
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
                        const table = $("#PesananTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/PenagihanPenjualanLokalKencana/getPesanan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    IdPenagihan: IdPenagihan.value,
                                    idCustomer: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "IDSuratPesanan",
                                },
                                {
                                    data: "Tgl_Pesan",
                                },
                            ],
                            order: [[0, "desc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PesananTable_filter input").focus();
                        }, 300);
                        // $("#PesananTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Pesanan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PesananTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PesananTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    no_sp.value = escapeHTML(selectedRow.IDSuratPesanan.trim());
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    $.ajax({
                        url: "/Kencana/PenagihanPenjualanLokalKencana/getPesananDetails",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_sp: no_sp.value,
                        },
                        success: function (data) {
                            console.log(data);
                            namaMataUang.value = data.TMataUang;
                            idMataUang.value = data.TIdMataUang;
                            nomorPO.value = data.TPO;
                            syaratPembayaran.value = data.TsyaratPembayaran;
                            nilaiKurs.value = 0;
                            // alamat.value = data.TAlamat;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                    setTimeout(() => {
                        btn_userPenagih.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_userPenagih.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Penagih",
                html: '<table id="PenagihTable" class="display" style="width:100%"><thead><tr><th>Penagih</th><th>ID. Penagih</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PenagihTable")
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
                        const table = $("#PenagihTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/PenagihanPenjualanLokalKencana/getPenagih",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama",
                                },
                                {
                                    data: "IdUser",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PenagihTable_filter input").focus();
                        }, 300);
                        // $("#PenagihTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Penagih)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PenagihTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PenagihTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    user_penagih.value = escapeHTML(selectedRow.Nama.trim());
                    idUserPenagih.value = escapeHTML(selectedRow.IdUser.trim());
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    setTimeout(() => {
                        btn_bank.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_bank.addEventListener("click", async function (e) {
        e.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Penagih",
                html: '<table id="BankTable" class="display" style="width:100%"><thead><tr><th>Nama Bank</th><th>ID. Bank</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#BankTable")
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
                        const table = $("#BankTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/PenagihanPenjualanLokalKencana/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaBank",
                                },
                                {
                                    data: "IdBank",
                                },
                            ],
                            order: [1, "asc"],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#BankTable_filter input").focus();
                        }, 300);
                        // $("#BankTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Penagih)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#BankTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "BankTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_bank.value = escapeHTML(selectedRow.NamaBank.trim());
                    idBank.value = escapeHTML(selectedRow.IdBank.trim());
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    setTimeout(() => {
                        btn_pajak.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_pajak.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Jenis Pajak",
                html: '<table id="PajakTable" class="display" style="width:100%"><thead><tr><th>Nama Pajak</th><th>Jenis Pajak</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PajakTable")
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
                        const table = $("#PajakTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/PenagihanPenjualanLokalKencana/getPajak",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Jns_PPN",
                                },
                                {
                                    data: "Jns_PPN",
                                },
                            ],
                            order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PajakTable_filter input").focus();
                        }, 300);
                        // $("#PajakTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Pajak)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PajakTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PajakTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_pajak.value = escapeHTML(
                        selectedRow.Nama_Jns_PPN.trim(),
                    );
                    jenis_pajak.value = escapeHTML(selectedRow.Jns_PPN.trim());
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    setTimeout(() => {
                        btn_penagihanUM.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_penagihanUM.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Penagihan UM",
                html: '<table id="PenagihanUMTable" class="display" style="width:100%"><thead><tr><th>ID. Penagihan</th><th>Jumlah</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#PenagihanUMTable")
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
                        const table = $("#PenagihanUMTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/PenagihanPenjualanLokalKencana/getTagihanDP",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    no_sp: no_sp.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Penagihan",
                                },
                                {
                                    data: "nilai_BLM_PAJAK",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#PenagihanUMTable_filter input").focus();
                        }, 300);
                        // $("#PenagihanUMTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_PenagihanUM)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#PenagihanUMTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            },
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "PenagihanUMTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // nama_pajak.value = escapeHTML(
                    //     selectedRow.Nama_Jns_PPN.trim()
                    // );
                    // jenis_pajak.value = escapeHTML(selectedRow.Jns_PPN.trim());
                    no_penagihanUM.value = escapeHTML(
                        selectedRow.Id_Penagihan.trim(),
                    );
                    // nilaiUangMuka.value = numeral(
                    //     selectedRow.nilai_BLM_PAJAK.trim()
                    // ).format("0,0.00");
                    setTimeout(() => {
                        btn_dokumen.focus();
                    }, 300);

                    const newRow = {
                        no_penagihanUM: no_penagihanUM.value,
                        nilai_BLM_PAJAK: numeral(
                            selectedRow.nilai_BLM_PAJAK
                        ).format("0,0.00"),
                        Nilai_Penagihan: numeral(
                            selectedRow.Nilai_Penagihan
                        ).value() || 0,
                    };

                    tableData.push(newRow);
                    console.log(tableData);

                    if ($.fn.DataTable.isDataTable("#table_bawah")) {
                        var table_bawah = $("#table_bawah").DataTable();

                        table_bawah.row
                            .add([
                                newRow.no_penagihanUM,
                                newRow.nilai_BLM_PAJAK,
                            ])
                            .draw();
                    }

                    hitungRingkasanPenagihan();

                    // nilaiUangMuka.value = totalPelunasanUM.toLocaleString(
                    //     "en-US",
                    //     {
                    //         minimumFractionDigits: 2,
                    //         maximumFractionDigits: 2,
                    //     },
                    // );
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_suratJalan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Surat Jalan",
                html: '<table id="SuratJalanTable" class="display" style="width:100%"><thead><tr><th>ID. Pengiriman</th><th>Tanggal</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#SuratJalanTable")
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
                        const table = $("#SuratJalanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/PenagihanPenjualanLokalKencana/getSuratJalan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    no_sp: no_sp.value,
                                },
                            },
                            columns: [
                                {
                                    data: "IDPengiriman",
                                },
                                {
                                    data: "TanggalDiterima",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#SuratJalanTable_filter input").focus();
                        }, 300);
                        // $("#SuratJalanTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_SuratJalan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#SuratJalanTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            },
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "SuratJalanTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // nama_pajak.value = escapeHTML(
                    //     selectedRow.Nama_Jns_PPN.trim()
                    // );
                    // jenis_pajak.value = escapeHTML(selectedRow.Jns_PPN.trim());
                    surat_jalan.value = escapeHTML(
                        selectedRow.IDPengiriman.trim(),
                    );
                    tanggal_diterima.value = selectedRow.TanggalDiterima;

                    table_item = $("#table_item").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        destroy: true,
                        autoWidth: false,
                        ajax: {
                            url: "/Kencana/PenagihanPenjualanLokalKencana/LihatDetilSJ",
                            dataType: "json",
                            type: "GET",
                            data: function (d) {
                                return $.extend({}, d, {
                                    _token: csrfToken,
                                    no_sp: no_sp.value,
                                    idCustomer: idCustomer.value,
                                    surat_jalan: surat_jalan.value,
                                });
                            },
                        },
                        columns: [
                            {
                                data: "NamaBarang",
                                // render: function (data) {
                                //     return `<input type="checkbox" name="penerimaCheckboxM" value="${data}" /> ${data}`;
                                // },
                            },
                            { data: "JmlTerimaUmum" },
                            { data: "HargaSatuan" },
                            { data: "Satuan" },
                            { data: "Total" },
                        ],
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        // columnDefs: [{ targets: [3, 4], visible: false }],
                    });

                    $.ajax({
                        url: "/Kencana/PenagihanPenjualanLokalKencana/TotalDetailSJ",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_sp: no_sp.value,
                            idCustomer: idCustomer.value,
                            surat_jalan: surat_jalan.value,
                        },
                        success: function (data) {
                            console.log(data);
                            totalLihat.value = data.total;
                            // jenisCustomer.value = data.TJenisCust;
                            // alamat.value = data.TAlamat;
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    btn_simpanM.disabled = false;

                    var myModal = new bootstrap.Modal(
                        document.getElementById("modalLihatItem"),
                        {
                            keyboard: false,
                        },
                    );
                    myModal.show();
                    // setTimeout(() => {
                    //     btn_dokumen.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_dokumen.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Dokumen",
                html: '<table id="DokumenTable" class="display" style="width:100%"><thead><tr><th>Dokumen</th><th>ID. Dokumen</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "40%",
                preConfirm: () => {
                    const selectedData = $("#DokumenTable")
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
                        const table = $("#DokumenTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/PenagihanPenjualanLokalKencana/getDokumen",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_cust: id_cust.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Dokumen",
                                },
                                {
                                    data: "Id_Jenis_Dokumen",
                                },
                            ],
                            order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#DokumenTable_filter input").focus();
                        }, 300);
                        // $("#DokumenTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_Dokumen)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#DokumenTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "DokumenTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    dokumen.value = escapeHTML(selectedRow.Nama_Dokumen.trim());
                    idJenisDokumen.value = escapeHTML(
                        selectedRow.Id_Jenis_Dokumen.trim(),
                    );
                    // IdPenagihan.value = escapeHTML(selectedRow.Id_Penagihan.trim());
                    // setTimeout(() => {
                    //     uangMasuk.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
    });
});
