$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let btn_prosesMB = document.getElementById("btn_prosesMB");
    let btn_bankM = document.getElementById("btn_bankM");
    let btn_koreksiDetail = document.getElementById("btn_koreksiDetail");
    let btn_tampilBKM = document.getElementById("btn_tampilBKM");
    let btn_group = document.getElementById("btn_group");
    let radioDetailPelunasan = document.getElementById("radioDetailPelunasan");
    let radioDetailBiaya = document.getElementById("radioDetailBiaya");
    let radioDetailKurangLebih = document.getElementById(
        "radioDetailKurangLebih"
    );
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let idPelunasanM = document.getElementById("idPelunasanM");
    let tanggalInputM = document.getElementById("tanggalInputM");
    let tanggalTagihM = document.getElementById("tanggalTagihM");
    let jenisBayarM = document.getElementById("jenisBayarM");
    let idBankM = document.getElementById("idBankM");
    let namaBankM = document.getElementById("namaBankM");
    let jenisMB = document.getElementById("jenisMB");
    let mataUangM = document.getElementById("mataUangM");
    let nilaiPeluansanM = document.getElementById("nilaiPeluansanM");
    let noBuktiM = document.getElementById("noBuktiM");
    let tutupModalB = document.getElementById("tutupModalB");
    let id_penagihanMP = document.getElementById("id_penagihanMP");
    let id_pelunasanMP = document.getElementById("id_pelunasanMP");
    let namaCustomer_MP = document.getElementById("namaCustomer_MP");
    let nilai_pelunasanMP = document.getElementById("nilai_pelunasanMP");
    let pelunasanRupiah_MP = document.getElementById("pelunasanRupiah_MP");
    let id_perkiraanMP = document.getElementById("id_perkiraanMP");
    let ket_perkiraanMP = document.getElementById("ket_perkiraanMP");
    let btn_perkiraanMP = document.getElementById("btn_perkiraanMP");
    let btn_prosesMP = document.getElementById("btn_prosesMP");
    let tutup_modalMP = document.getElementById("tutup_modalMP");
    let jumlahBiaya_MBia = document.getElementById("jumlahBiaya_MBia");
    let id_detailMBia = document.getElementById("id_detailMBia");
    let id_perkiraanMBia = document.getElementById("id_perkiraanMBia");
    let ket_perkiraanMBia = document.getElementById("ket_perkiraanMBia");
    let btn_perkiraanMBia = document.getElementById("btn_perkiraanMBia");
    let keterangan_MBia = document.getElementById("keterangan_MBia");
    let btn_prosesMBia = document.getElementById("btn_prosesMBia");
    let tutup_modalB = document.getElementById("tutup_modalB");
    let jumlahUang_MK = document.getElementById("jumlahUang_MK");
    let id_detailMK = document.getElementById("id_detailMK");
    let id_perkiraanMK = document.getElementById("id_perkiraanMK");
    let ket_perkiraanMK = document.getElementById("ket_perkiraanMK");
    let btn_perkiraanMK = document.getElementById("btn_perkiraanMK");
    let keterangan_MK = document.getElementById("keterangan_MK");
    let btn_prosesMK = document.getElementById("btn_prosesMK");
    let tutup_modalMK = document.getElementById("tutup_modalMK");
    let tgl_awalbkk = document.getElementById("tgl_awalbkk");
    let tgl_akhirbkk = document.getElementById("tgl_akhirbkk");
    let btn_okbkm = document.getElementById("btn_okbkm");
    let bkm = document.getElementById("bkm");
    let terbilang = document.getElementById("terbilang");
    let id_matauang = document.getElementById("id_matauang");
    let btn_cetakbkm = document.getElementById("btn_cetakbkm");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
    });
    let table_detailPelunasan = $("#table_detailPelunasan").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });
    let table_detailBiaya = $("#table_detailBiaya").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });
    let table_kurangLebih = $("#table_kurangLebih").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });
    let table_tampilBKM = $("#table_tampilBKM").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });
    let radio;

    bulan.focus();
    tanggalInputM.valueAsDate = new Date();
    tgl_awalbkk.valueAsDate = new Date();
    tgl_akhirbkk.valueAsDate = new Date();

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

    tanggalInputM.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            select_bankM.focus();
        }
    });

    btn_group.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(rowDataArray);
        // let allRowsDataAtas = table_kanan.rows().data().toArray();
        // console.log(allRowsDataAtas);
        if (rowDataArray.length === 0) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data pelunasan terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }
        // const totalPayment = calculateTotalPayment(rowDataArray);
        if (rowDataArray[0][2] == "" || rowDataArray[0][7] == "") {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Input Tgl Pembuatan BKM & Id. Bank, Klik tombol Pilih Bank",
                showConfirmButton: false,
            });
        } else {
            let TTerbilang2;
            let total1 = 0;
            rowDataArray.forEach((row) => {
                let grandTotal = parseFloat(row[5].replace(/,/g, ""));
                let TTerbilang;

                if (row[4].trim().toUpperCase() === "RUPIAH") {
                    TTerbilang = convertNumberToWordsRupiah(grandTotal);
                } else {
                    TTerbilang = convertNumberToWordsDollar(grandTotal);
                }

                total1 += grandTotal;
                row.push(TTerbilang);
            });

            rowDataArray.forEach((row) => {
                if (row[4].trim().toUpperCase() === "RUPIAH") {
                    TTerbilang2 = convertNumberToWordsRupiah(total1);
                } else {
                    TTerbilang2 = convertNumberToWordsDollar(total1);
                }

                row.push(TTerbilang2);
            });

            $.ajax({
                url: "/Kencana/MaintenanceBKMPenagihanKencana/CmdGroup",
                type: "GET",
                data: {
                    _token: csrfToken,
                    rowDataArray: rowDataArray,
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
                            // location.reload();
                            // document
                            //     .querySelectorAll("input")
                            //     .forEach((input) => (input.value = ""));
                            // $("#table_atas").DataTable().ajax.reload();
                            // DataTable instance

                            btn_ok.click();

                            // var table_atas = $("#table_atas").DataTable();

                            // // Iterate through rowDataArray
                            // rowDataArray.forEach(function (row) {
                            //     // Ambil nilai dari elemen ke-1 (index 1)
                            //     var valueToMatch = row[1];

                            //     // Hapus baris dari DataTable jika match
                            //     table_atas.rows().every(function () {
                            //         var rowData = this.data();
                            //         if (rowData[1] === valueToMatch) {
                            //             this.remove();
                            //         }
                            //     });
                            // });

                            // // Refresh DataTable
                            // table_atas.draw();
                            rowDataArray = [];
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
        // Swal.fire({
        //     title: "Isikan Tanggal Pembuatan BKM",
        //     icon: "info",
        //     html: '<input type="date" id="bkk_date" class="swal2-input">',
        //     showCancelButton: true,
        //     confirmButtonText: "Ya",
        //     cancelButtonText: "Tidak",
        //     didOpen: () => {
        //         // Get the current date
        //         const today = new Date();
        //         // Set the value of the input field
        //         document.getElementById("bkk_date").valueAsDate = today;
        //     },
        //     preConfirm: () => {
        //         const date = $("#bkk_date").val();
        //         if (!date) {
        //             Swal.showValidationMessage("Tanggal harus diisi");
        //             return false;
        //         }
        //         return date;
        //     },
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         const selectedDate = result.value;
        //         console.log("Tanggal yang dipilih: ", selectedDate);
        //         Swal.fire({
        //             title: "Total Pembayaran",
        //             icon: "info",
        //             text: `${totalPayment
        //                 .toLocaleString("en-US", {
        //                     style: "currency",
        //                     currency: "IDR",
        //                 })
        //                 .replace("IDR", "")}`,
        //             showCancelButton: true,
        //             confirmButtonText: "Ya",
        //             cancelButtonText: "Tidak",
        //         }).then((result) => {
        //             if (result.isConfirmed) {
        //                 console.log("Total dibayarkan: ", totalPayment);
        //         $.ajax({
        //             url: "MaintenanceBKKKRR1/getGroup",
        //             type: "GET",
        //             data: {
        //                 _token: csrfToken,
        //                 rowDataArray: rowDataArray,
        //                 tanggalgrup: selectedDate,
        //             },
        //             success: function (response) {
        //                 if (response.message) {
        //                     Swal.fire({
        //                         icon: "success",
        //                         title: "Success!",
        //                         text:
        //                             response.message +
        //                             " dengan ID BKK: " +
        //                             response.idbkk,
        //                         showConfirmButton: true,
        //                     }).then((result) => {
        //                         if (result.isConfirmed) {
        //                             // tableatas.ajax.reload();
        //                             // tablekiri.ajax.reload();
        //                             // tablekanan.ajax.reload();
        //                             // id_detailkanan.value = "";
        //                             // id_detailkiri.value = "";
        //                             // id_pembayaran.value = "";
        //                         } else {
        //                             // tableatas.ajax.reload();
        //                             // tablekiri.ajax.reload();
        //                             // tablekanan.ajax.reload();
        //                             // id_detailkanan.value = "";
        //                             // id_detailkiri.value = "";
        //                             // id_pembayaran.value = "";
        //                         }
        //                     });
        //                 } else if (response.error) {
        //                     Swal.fire({
        //                         icon: "error",
        //                         title: "Error!",
        //                         text: response.error,
        //                         showConfirmButton: false,
        //                     });
        //                 }
        //             },
        //             error: function (xhr, status, error) {
        //                 let errorMessage =
        //                     "Terjadi kesalahan saat memproses data.";
        //                 if (xhr.responseJSON && xhr.responseJSON.error) {
        //                     errorMessage = xhr.responseJSON.error;
        //                 } else if (xhr.responseText) {
        //                     try {
        //                         const response = JSON.parse(xhr.responseText);
        //                         errorMessage = response.error || errorMessage;
        //                     } catch (e) {
        //                         console.error(
        //                             "Error parsing JSON response:",
        //                             e
        //                         );
        //                     }
        //                 }

        //                 Swal.fire({
        //                     icon: "error",
        //                     title: "Error!",
        //                     text: errorMessage,
        //                     showConfirmButton: false,
        //                 });
        //             },
        //         });
        //         } else {
        //             console.log("Total dibayarkan dibatalkan");
        //         }
        //         });
        //     } else {
        //         console.log("Pemilihan tanggal dibatalkan");
        //     }
        // });
    });

    function formatTanggal(date, padDay = false) {
        const day = date.getDate();
        const month = date.toLocaleString("en-US", {
            month: "long"
        });
        const year = date.getFullYear();

        const formattedDay = padDay
            ? String(day).padStart(2, "0")
            : day;

        return `${formattedDay}/${month}/${year}`;
    }

    btn_cetakbkm.addEventListener("click", async function (event) {
        event.preventDefault();

        $.ajax({
            url: "/Kencana/MaintenanceBKMPenagihanKencana/cetakBKM",
            type: "GET",
            data: {
                _token: csrfToken,
                bkm: bkm.value,
                Nilai_Pelunasan: numeral(rowDataBKM.Nilai_Pelunasan).format(
                    "0.00"
                ),
            },
            success: function (data) {
                console.log(data);

                document.getElementById("nomerP").innerHTML =
                    data.data[0].Id_BKM;

                // Assume data.data[0].Tgl_Input is in the format "2012-01-02 00:00:00.000"
                const rawDate = data.data[0].Tgl_Input.split(" ")[0]; // Extract the date part

                // Create a Date object from the raw date
                const dateObject = new Date(rawDate);

                // Format the date using Flatpickr's formatDate utility
                const formattedDate = formatTanggal(dateObject); // "2/January/2012"

                // Set the formatted date to the element
                document.getElementById("tanggal_atasP").innerHTML =
                    formattedDate;

                // // Get the current date
                const currentDate = new Date();

                // Format the current date using Flatpickr's formatDate function
                const formattedDate1 = formatTanggal(currentDate, true); // "13/September/2024"

                // Set the formatted date to the element with the additional text "Sidoarjo, "
                document.getElementById(
                    "tanggal_bawahP"
                ).innerHTML = `Sidoarjo, ${formattedDate1}`;

                let totalBiaya = 0;
                let totalKurangLebih = 0;
                let totalnilaiRincian = 0;
                data.data.forEach(function (item) {
                    const biaya = parseFloat(item.Biaya);
                    const kurangLebih = parseFloat(item.KurangLebih);
                    const nilaiRincian = parseFloat(item.Nilai_Rincian);
                    // Accumulate totals
                    totalBiaya += biaya;
                    totalKurangLebih += kurangLebih;
                    totalnilaiRincian += nilaiRincian;
                });

                let SymbolHTML = "";
                data.data.forEach(function (item) {
                    let resultSymbol = ""; // Default value

                    if (
                        (item.ID_Penagihan !== null &&
                            parseFloat(totalBiaya) > 0) ||
                        (item.ID_Penagihan !== null &&
                            parseFloat(totalKurangLebih) !== 0)
                    ) {
                        resultSymbol = "(+)";
                    } else if (
                        item.ID_Penagihan === null &&
                        parseFloat(item.Biaya) !== 0
                    ) {
                        resultSymbol = "(-)";
                    } else if (
                        item.ID_Penagihan === null &&
                        parseFloat(item.KurangLebih) > 0
                    ) {
                        resultSymbol = "(+)";
                    } else if (
                        (item.ID_Penagihan !== null &&
                            parseFloat(totalBiaya) === 0) ||
                        (item.ID_Penagihan !== null &&
                            parseFloat(totalKurangLebih) === 0)
                    ) {
                        resultSymbol = "";
                    }
                    SymbolHTML += resultSymbol + "<br>";
                    // console.log(
                    //     `Item ID_BKM: ${item.Id_BKM}, Symbol: ${resultSymbol}`
                    // );
                });
                document.getElementById("symbolP").innerHTML = SymbolHTML;

                let resultHTML = "";
                data.data.forEach((item) => {
                    let resultValue = 0;

                    if (totalBiaya === 0 && totalKurangLebih === 0) {
                        resultValue = 0;
                    } else if (
                        (item.ID_Penagihan !== null && totalBiaya !== 0) ||
                        (item.ID_Penagihan !== null && totalKurangLebih !== 0)
                    ) {
                        resultValue = parseFloat(item.Nilai_Rincian) || 0;
                    } else if (
                        (item.ID_Penagihan === null && totalBiaya !== 0) ||
                        (item.ID_Penagihan === null && totalKurangLebih !== 0)
                    ) {
                        if (
                            parseFloat(item.Biaya) !== 0 &&
                            parseFloat(item.KurangLebih) === 0
                        ) {
                            resultValue = parseFloat(item.Biaya) || 0;
                        } else if (
                            parseFloat(item.KurangLebih) !== 0 &&
                            parseFloat(item.Biaya) === 0
                        ) {
                            resultValue = parseFloat(item.KurangLebih) || 0;
                        }
                    } else if (
                        item.ID_Penagihan === null &&
                        item.Keterangan !== null
                    ) {
                        resultValue = parseFloat(item.Nilai_Rincian) || 0;
                    }

                    resultHTML +=
                        numeral(resultValue).format("0,0.00") + "<br>";
                });
                document.getElementById("nilaiRincianP").innerHTML = resultHTML;

                let KeteranganHTML = "";
                data.data.forEach((item) => {
                    let result;

                    if (item.ID_Penagihan !== null) {
                        // Concatenate NamaCust and ID_Penagihan if ID_Penagihan is not null
                        result = `${item.NamaCust} - ${item.ID_Penagihan}`;
                    } else if (
                        (item.ID_Penagihan === null &&
                            parseFloat(item.Biaya) !== 0) ||
                        (item.ID_Penagihan === null &&
                            parseFloat(item.KurangLebih) !== 0) ||
                        (item.ID_Penagihan === null &&
                            parseFloat(item.Nilai_Rincian) !== 0)
                    ) {
                        // Use Keterangan if available, otherwise an empty string
                        result =
                            item.Keterangan !== null ? item.Keterangan : "";
                    }

                    KeteranganHTML += result + "<br>";
                });
                document.getElementById("rincianP").innerHTML = KeteranganHTML;

                let KodePerkiraanHTML = "";
                data.data.forEach(function (item) {
                    KodePerkiraanHTML += item.Kode_Perkiraan + "<br>";
                });
                document.getElementById("kode_perkiraanP").innerHTML =
                    KodePerkiraanHTML;

                document.getElementById("rp_atasP").innerHTML =
                    data.data[0].Symbol;

                document.getElementById("jumlah_diterimaP").innerHTML = numeral(
                    data.data[0].Nilai_Pelunasan
                ).format("0,0.00");

                document.getElementById("terbilangP").innerHTML =
                    data.data[0].Terjemahan;

                document.getElementById("jumP").innerHTML =
                    numeral(totalBiaya).format("0,0.00") == "0.00"
                        ? ""
                        : numeral(totalBiaya).format("0,0.00");

                document.getElementById("jum2P").innerHTML =
                    numeral(totalKurangLebih).format("0,0.00") == "0.00"
                        ? ""
                        : numeral(totalKurangLebih).format("0,0.00");

                let totalK;
                if (totalBiaya > 0 || totalKurangLebih !== 0) {
                    // Sum all Nilai_Rincian values in the data array
                    totalK = data.data.reduce(
                        (sum, item) =>
                            sum + parseFloat(item.Nilai_Rincian || 0),
                        0
                    );
                } else {
                    totalK = 0;
                }
                document.getElementById("totalKP").innerHTML =
                    numeral(totalK).format("0,0.00");

                let ket =
                    totalBiaya === 0 && totalKurangLebih === 0
                        ? ""
                        : "Jumlah Tagihan :";
                document.getElementById("ketP").innerHTML = ket;

                let ket2 = totalBiaya === 0 ? "" : "Lain-Lain :";
                document.getElementById("ket2P").innerHTML = ket2;

                let ket3 =
                    totalKurangLebih === 0
                        ? ""
                        : totalKurangLebih < 0
                        ? "KeKurangan"
                        : "KeLebihan";
                document.getElementById("ket3P").innerHTML = ket3;

                let Symbol2 = totalBiaya > 0 ? "(-)" : "";
                document.getElementById("Symbol2P").innerHTML = Symbol2;

                let Symbol3 =
                    totalKurangLebih > 0
                        ? "(+)"
                        : totalKurangLebih < 0
                        ? ""
                        : "";
                document.getElementById("Symbol3P").innerHTML = Symbol3;

                document.getElementById("rp_totalP").innerHTML =
                    data.data[0].Symbol;

                let jum1;
                if (totalBiaya === 0 && totalKurangLebih === 0) {
                    jum1 = data.data.reduce(
                        (sum, item) =>
                            sum + (parseFloat(item.Nilai_Rincian) || 0),
                        0
                    );
                } else {
                    jum1 = 0;
                }
                document.getElementById("jumlahP").innerHTML =
                    jum1 == 0 ? "" : jum1;

                let grandP;
                if (jum1 === 0) {
                    grandP = totalK - totalBiaya + totalKurangLebih;
                } else {
                    // Sum all Nilai_Rincian values in the data array
                    grandP = data.data.reduce(
                        (sum, item) =>
                            sum + (parseFloat(item.Nilai_Rincian) || 0),
                        0
                    );
                }
                document.getElementById("grandP").innerHTML =
                    numeral(grandP).format("0,0.00");

                window.print();
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    radioDetailPelunasan.addEventListener("click", function (event) {
        radio = 1;
    });

    radioDetailBiaya.addEventListener("click", function (event) {
        radio = 2;
    });

    radioDetailKurangLebih.addEventListener("click", function (event) {
        radio = 3;
    });

    btn_koreksiDetail.addEventListener("click", async function (event) {
        event.preventDefault();

        if (radio == 1) {
            if (rowDataPelunasan !== null && rowDataPelunasan !== undefined) {
                console.log(rowDataPelunasan);

                id_penagihanMP.value = rowDataPelunasan.ID_Penagihan;
                id_pelunasanMP.value = rowDataArray[0][1];
                namaCustomer_MP.value = rowDataPelunasan.NamaCust;
                nilai_pelunasanMP.value = rowDataPelunasan.Nilai_Pelunasan;
                pelunasanRupiah_MP.value = rowDataPelunasan.Pelunasan_Rupiah;
                // id_perkiraanMP.value = rowDataPelunasan.Kode_Perkiraan;
                select_kodePerkiraanMP.val(rowDataPelunasan.Kode_Perkiraan).trigger("change");

                // if (id_perkiraanMP.value !== "") {
                //     $.ajax({
                //         url: "/Kencana/MaintenanceBKMPenagihanKencana/getPerkiraanDetails",
                //         type: "GET",
                //         data: {
                //             _token: csrfToken,
                //             id_perkiraanMP: id_perkiraanMP.value,
                //         },
                //         success: function (data) {
                //             console.log(data);
                //             ket_perkiraanMP.value = data.Keterangan;
                //         },
                //         error: function (xhr, status, error) {
                //             var err = eval("(" + xhr.responseText + ")");
                //             alert(err.Message);
                //         },
                //     });
                // }

                var myModal = new bootstrap.Modal(
                    document.getElementById("modalDetailPelunasan"),
                    {
                        keyboard: false,
                    }
                );

                document
                    .getElementById("modalDetailPelunasan")
                    .addEventListener("shown.bs.modal", function () {
                        // btn_perkiraanMP.focus();
                    });

                myModal.show();
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih satu detail pelunasan !",
                    showConfirmButton: false,
                });
            }
        } else if (radio == 2) {
            if (rowDataBiaya !== null && rowDataBiaya !== undefined) {
                console.log(rowDataBiaya);

                jumlahBiaya_MBia.value = rowDataBiaya.Biaya;
                id_detailMBia.value = rowDataBiaya.Id_Detail_Pelunasan;
                select_kodePerkiraanMBia.val(rowDataBiaya.Kode_Perkiraan).trigger("change");
                // id_perkiraanMBia.value = rowDataBiaya.Kode_Perkiraan;
                keterangan_MBia.value = rowDataBiaya.Keterangan;

                // if (id_perkiraanMBia.value !== "") {
                //     $.ajax({
                //         url: "/Kencana/MaintenanceBKMPenagihanKencana/getPerkiraanDetails",
                //         type: "GET",
                //         data: {
                //             _token: csrfToken,
                //             id_perkiraanMP: id_perkiraanMBia.value,
                //         },
                //         success: function (data) {
                //             console.log(data);
                //             ket_perkiraanMBia.value = data.Keterangan;
                //         },
                //         error: function (xhr, status, error) {
                //             var err = eval("(" + xhr.responseText + ")");
                //             alert(err.Message);
                //         },
                //     });
                // }

                var myModal = new bootstrap.Modal(
                    document.getElementById("modalDetailBiaya"),
                    {
                        keyboard: false,
                    }
                );

                document
                    .getElementById("modalDetailBiaya")
                    .addEventListener("shown.bs.modal", function () {
                        btn_perkiraanMBia.focus();
                    });

                myModal.show();
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih satu detail biaya !",
                    showConfirmButton: false,
                });
            }
        } else if (radio == 3) {
            if (rowDataKrgLbh !== null && rowDataKrgLbh !== undefined) {
                console.log(rowDataKrgLbh);

                jumlahUang_MK.value = rowDataKrgLbh.KurangLebih;
                id_detailMK.value = rowDataKrgLbh.Id_Detail_Pelunasan;
                // id_perkiraanMK.value = rowDataKrgLbh.Kode_Perkiraan;
                select_kodePerkiraanMK.val(rowDataKrgLbh.Kode_Perkiraan).trigger("change");
                keterangan_MK.value = rowDataKrgLbh.Keterangan;

                // if (id_perkiraanMK.value !== "") {
                //     $.ajax({
                //         url: "/Kencana/MaintenanceBKMPenagihanKencana/getPerkiraanDetails",
                //         type: "GET",
                //         data: {
                //             _token: csrfToken,
                //             id_perkiraanMP: id_perkiraanMK.value,
                //         },
                //         success: function (data) {
                //             console.log(data);
                //             ket_perkiraanMK.value = data.Keterangan;
                //         },
                //         error: function (xhr, status, error) {
                //             var err = eval("(" + xhr.responseText + ")");
                //             alert(err.Message);
                //         },
                //     });
                // }

                var myModal = new bootstrap.Modal(
                    document.getElementById("modalDetailKurangLebih"),
                    {
                        keyboard: false,
                    }
                );

                document
                    .getElementById("modalDetailKurangLebih")
                    .addEventListener("shown.bs.modal", function () {
                        btn_perkiraanMK.focus();
                    });

                myModal.show();
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih satu detail kurang/lebih !",
                    showConfirmButton: false,
                });
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih detail dahulu !",
                showConfirmButton: false,
            });
        }
    });
    btn_okbkm.addEventListener("click", async function (event) {
        event.preventDefault();
        table_tampilBKM = $("#table_tampilBKM").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            // scrollX: true,
            // width: "150%",
            ajax: {
                url: "/Kencana/MaintenanceBKMPenagihanKencana/getBKMTagihByDate",
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
                        return `<input type="checkbox" name="penerimaCheckboxBKM" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKM" },
                { data: "Nilai_Pelunasan" },
                { data: "Terjemahan" },
            ],
            // paging: false,
            scrollY: "400px",
            // scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });
    });

    btn_tampilBKM.addEventListener("click", async function (event) {
        event.preventDefault();

        table_tampilBKM = $("#table_tampilBKM").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            // scrollX: true,
            // width: "150%",
            ajax: {
                url: "/Kencana/MaintenanceBKMPenagihanKencana/getBKMTagih",
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
                        return `<input type="checkbox" name="penerimaCheckboxBKM" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKM" },
                { data: "Nilai_Pelunasan" },
                { data: "Terjemahan" },
            ],
            // paging: false,
            scrollY: "400px",
            // scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });

        var myModal = new bootstrap.Modal(
            document.getElementById("dataBKMModal"),
            {
                keyboard: false,
            }
        );

        // document
        //     .getElementById("dataBKMModal")
        //     .addEventListener("shown.bs.modal", function () {
        //         btn_perkiraanMK.focus();
        //     });

        myModal.show();
    });

    btn_prosesMP.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/MaintenanceBKMPenagihanKencana/updateDetailPelunasan",
            type: "GET",
            data: {
                _token: csrfToken,
                ID_Detail_Pelunasan: rowDataPelunasan.ID_Detail_Pelunasan,
                id_perkiraanMP: select_kodePerkiraanMP.val(),
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
                        tutup_modalMP.click();
                        rowDataPelunasan = null;
                        $("#table_detailPelunasan").DataTable().ajax.reload();
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
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_prosesMBia.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/MaintenanceBKMPenagihanKencana/updateDetailBiaya",
            type: "GET",
            data: {
                _token: csrfToken,
                ID_Detail_Pelunasan: id_detailMBia.value,
                keterangan_MBia: keterangan_MBia.value,
                id_perkiraanMBia: select_kodePerkiraanMBia.val(),
                // id_perkiraanMBia: id_perkiraanMBia.value,
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
                        tutup_modalB.click();
                        rowDataBiaya = null;
                        $("#table_detailBiaya").DataTable().ajax.reload();
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
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_prosesMK.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/MaintenanceBKMPenagihanKencana/updateDetailKrgLbh",
            type: "GET",
            data: {
                _token: csrfToken,
                id_detailMK: id_detailMK.value,
                keterangan_MK: keterangan_MK.value,
                id_perkiraanMK: select_kodePerkiraanMK.val(),
                // id_perkiraanMK: id_perkiraanMK.value,
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
                        tutup_modalMK.click();
                        rowDataKrgLbh = null;
                        $("#table_kurangLebih").DataTable().ajax.reload();
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
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_prosesMB.addEventListener("click", async function (event) {
        event.preventDefault();
        // rowDataArray[0][2] = idBankM.value;
        rowDataArray[0][2] = select_bankM.val();
        // Function to convert Y-m-d to m/d/Y
        function formatDateToMDY(dateString) {
            const [year, month, day] = dateString.split("-");
            return `${month}/${day}/${year}`;
        }

        // When assigning the formatted date to rowDataPertama
        rowDataArray[0][7] = formatDateToMDY(tanggalInputM.value);
        // table_kiri.draw(false);
        if ($.fn.DataTable.isDataTable("#table_atas")) {
            var table_atas = $("#table_atas").DataTable();
            let selectedRow = table_atas.row(
                $('input[name="penerimaCheckbox"]:checked').closest("tr")
            );

            selectedRow.data(rowDataArray[0]).draw();
            rowDataArray = [];
            // namaBankM.value = "";
        }
        tutupModalB.click();
        // document.activeElement.blur();
    });

    // tutupModalB.addEventListener("click", async function (event) {
    //     event.preventDefault();
    //     // namaBankM.value = "";
    // });

    btn_pilihBank.addEventListener("click", async function (event) {
        event.preventDefault();
        const allRowsDataPelunasan = table_detailPelunasan
            .rows()
            .data()
            .toArray();
        console.log(allRowsDataPelunasan);
        let tglTgh = [];
        let tglMax = null;
        console.log(rowDataArray);

        if (rowDataArray !== null && rowDataArray.length == 1) {
            for (let i = 0; i < allRowsDataPelunasan.length; i++) {
                let tanggalStr = allRowsDataPelunasan[i]["Tgl_Penagihan"];
                // let match = tanggalStr.match(/value="([^"]+)"/);
                console.log(tanggalStr);

                if (tanggalStr) {
                    let [month, day, year] = tanggalStr.split("/").map(Number);
                    tglTgh.push(new Date(year, month - 1, day));
                }
            }
            // Mendapatkan tanggal maksimum dari array tglTgh
            tglMax = tglTgh.reduce(
                (max, date) => (date > max ? date : max),
                tglTgh[0]
            );
            console.log(tglMax);

            // Mengatur nilai ke elemen-elemen input HTML dengan format yang sama dengan VB
            if (tglMax !== undefined) {
                tanggalTagihM.value = tglMax.toLocaleDateString("en-CA");
            } else {
                tanggalTagihM.valueAsDate = new Date();
            }

            // tanggalTagihM.value = tglMax.toLocaleDateString("en-CA"); // format yyyy-mm-dd
            idPelunasanM.value = rowDataArray[0][1];
            jenisBayarM.value = rowDataArray[0][3];
            // idBankM.value = rowDataArray[0][2];
            select_bankM.val(rowDataArray[0][2]).trigger("change");
            mataUangM.value = rowDataArray[0][4];
            nilaiPeluansanM.value = numeral(rowDataArray[0][5]).format(
                "0,0.00"
            );
            noBuktiM.value = rowDataArray[0][6];

            if (select_bankM.val() !== "") {
                $.ajax({
                    url: "/Kencana/MaintenanceBKMPenagihanKencana/getBankAda",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        idBankM: select_bankM.val(),
                    },
                    success: function (data) {
                        console.log(data);
                        jenisMB.value = data.jenis;
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    },
                });
            }

            var myModal = new bootstrap.Modal(
                document.getElementById("modalPilihBank"),
                {
                    keyboard: false,
                }
            );

            document
                .getElementById("modalPilihBank")
                .addEventListener("shown.bs.modal", function () {
                    tanggalInputM.focus(); // Fokuskan input
                });

            myModal.show();
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih satu data pelunasan !",
                showConfirmButton: false,
            });
        }
    });

    const select_kodePerkiraanMP = $("#select_kodePerkiraanMP");
    select_kodePerkiraanMP.select2({
        dropdownParent: $("#modalDetailPelunasan"),
        placeholder: "Pilih Kode Perkiraan",
    });
    select_kodePerkiraanMP.on("select2:select", function () {
        const selectedKodePerkiraanMP = $(this).val();
        console.log(selectedKodePerkiraanMP);
        btn_prosesMP.focus();
    });

    const select_kodePerkiraanMK = $("#select_kodePerkiraanMK");
    select_kodePerkiraanMK.select2({
        dropdownParent: $("#modalDetailKurangLebih"),
        placeholder: "Pilih Kode Perkiraan",
    });
    select_kodePerkiraanMK.on("select2:select", function () {
        const selectedKodePerkiraanMK = $(this).val();
        console.log(selectedKodePerkiraanMK);
        btn_prosesMK.focus();
    });

    const select_kodePerkiraanMBia = $("#select_kodePerkiraanMBia");
    select_kodePerkiraanMBia.select2({
        dropdownParent: $("#modalDetailBiaya"),
        placeholder: "Pilih Kode Perkiraan",
    });
    select_kodePerkiraanMBia.on("select2:select", function () {
        const selectedKodePerkiraanMBia = $(this).val();
        console.log(selectedKodePerkiraanMBia);
        btn_prosesMBia.focus();
    });


    // btn_perkiraanMP.addEventListener("click", async function (event) {
    //     event.preventDefault();
    //     try {
    //         const result = await Swal.fire({
    //             title: "Select a Kode Perkiraan",
    //             html: '<table id="KodePerkiraanMPTable" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
    //             showCancelButton: true,
    //             width: "40%",
    //             preConfirm: () => {
    //                 const selectedData = $("#KodePerkiraanMPTable")
    //                     .DataTable()
    //                     .row(".selected")
    //                     .data();
    //                 if (!selectedData) {
    //                     Swal.showValidationMessage("Please select a row");
    //                     return false;
    //                 }
    //                 return selectedData;
    //             },
    //             didOpen: () => {
    //                 $(document).ready(function () {
    //                     const table = $("#KodePerkiraanMPTable").DataTable({
    //                         responsive: true,
    //                         processing: true,
    //                         serverSide: true,
    //                         returnFocus: true,
    //                         ajax: {
    //                             url: "/Kencana/MaintenanceBKMPenagihanKencana/getKodePerkiraan",
    //                             dataType: "json",
    //                             type: "GET",
    //                             data: {
    //                                 _token: csrfToken,
    //                             },
    //                         },
    //                         columns: [
    //                             {
    //                                 data: "NoKodePerkiraan",
    //                             },
    //                             {
    //                                 data: "Keterangan",
    //                             },
    //                         ],
    //                         paging: false,
    //                         scrollY: "400px",
    //                         scrollCollapse: true,
    //                     });
    //                     setTimeout(() => {
    //                         $("#KodePerkiraanMPTable_filter input").focus();
    //                     }, 300);
    //                     // $("#KodePerkiraanMPTable_filter input").on(
    //                     //     "keyup",
    //                     //     function () {
    //                     //         table
    //                     //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
    //                     //             .search(this.value) // Cari berdasarkan input pencarian
    //                     //             .draw(); // Perbarui hasil pencarian
    //                     //     }
    //                     // );
    //                     $("#KodePerkiraanMPTable tbody").on(
    //                         "click",
    //                         "tr",
    //                         function () {
    //                             // Remove 'selected' class from all rows
    //                             table.$("tr.selected").removeClass("selected");
    //                             // Add 'selected' class to the clicked row
    //                             $(this).addClass("selected");
    //                         }
    //                     );
    //                     currentIndex = null;
    //                     Swal.getPopup().addEventListener("keydown", (e) =>
    //                         handleTableKeydownInSwal(e, "KodePerkiraanMPTable")
    //                     );
    //                 });
    //             },
    //         }).then((result) => {
    //             if (result.isConfirmed && result.value) {
    //                 const selectedRow = result.value;
    //                 id_perkiraanMP.value = escapeHTML(
    //                     selectedRow.NoKodePerkiraan.trim()
    //                 );
    //                 ket_perkiraanMP.value = escapeHTML(
    //                     selectedRow.Keterangan.trim()
    //                 );

    //                 // setTimeout(() => {
    //                 //     btn_prosesMB.focus();
    //                 // }, 300);
    //             }
    //         });
    //     } catch (error) {
    //         console.error("An error occurred:", error);
    //     }
    //     // console.log(selectedRow);
    // });

    // btn_perkiraanMK.addEventListener("click", async function (event) {
    //     event.preventDefault();
    //     try {
    //         const result = await Swal.fire({
    //             title: "Select a Kode Perkiraan",
    //             html: '<table id="KodePerkiraanMKTable" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
    //             showCancelButton: true,
    //             width: "40%",
    //             preConfirm: () => {
    //                 const selectedData = $("#KodePerkiraanMKTable")
    //                     .DataTable()
    //                     .row(".selected")
    //                     .data();
    //                 if (!selectedData) {
    //                     Swal.showValidationMessage("Please select a row");
    //                     return false;
    //                 }
    //                 return selectedData;
    //             },
    //             didOpen: () => {
    //                 $(document).ready(function () {
    //                     const table = $("#KodePerkiraanMKTable").DataTable({
    //                         responsive: true,
    //                         processing: true,
    //                         serverSide: true,
    //                         returnFocus: true,
    //                         ajax: {
    //                             url: "/Kencana/MaintenanceBKMPenagihanKencana/getKodePerkiraan",
    //                             dataType: "json",
    //                             type: "GET",
    //                             data: {
    //                                 _token: csrfToken,
    //                             },
    //                         },
    //                         columns: [
    //                             {
    //                                 data: "NoKodePerkiraan",
    //                             },
    //                             {
    //                                 data: "Keterangan",
    //                             },
    //                         ],
    //                         paging: false,
    //                         scrollY: "400px",
    //                         scrollCollapse: true,
    //                     });
    //                     setTimeout(() => {
    //                         $("#KodePerkiraanMKTable_filter input").focus();
    //                     }, 300);
    //                     // $("#KodePerkiraanMKTable_filter input").on(
    //                     //     "keyup",
    //                     //     function () {
    //                     //         table
    //                     //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
    //                     //             .search(this.value) // Cari berdasarkan input pencarian
    //                     //             .draw(); // Perbarui hasil pencarian
    //                     //     }
    //                     // );
    //                     $("#KodePerkiraanMKTable tbody").on(
    //                         "click",
    //                         "tr",
    //                         function () {
    //                             // Remove 'selected' class from all rows
    //                             table.$("tr.selected").removeClass("selected");
    //                             // Add 'selected' class to the clicked row
    //                             $(this).addClass("selected");
    //                         }
    //                     );
    //                     currentIndex = null;
    //                     Swal.getPopup().addEventListener("keydown", (e) =>
    //                         handleTableKeydownInSwal(e, "KodePerkiraanMKTable")
    //                     );
    //                 });
    //             },
    //         }).then((result) => {
    //             if (result.isConfirmed && result.value) {
    //                 const selectedRow = result.value;
    //                 id_perkiraanMK.value = escapeHTML(
    //                     selectedRow.NoKodePerkiraan.trim()
    //                 );
    //                 ket_perkiraanMK.value = escapeHTML(
    //                     selectedRow.Keterangan.trim()
    //                 );

    //                 setTimeout(() => {
    //                     keterangan_MK.focus();
    //                 }, 300);
    //             }
    //         });
    //     } catch (error) {
    //         console.error("An error occurred:", error);
    //     }
    //     // console.log(selectedRow);
    // });

    // btn_perkiraanMBia.addEventListener("click", async function (event) {
    //     event.preventDefault();
    //     try {
    //         const result = await Swal.fire({
    //             title: "Select a Kode Perkiraan",
    //             html: '<table id="KodePerkiraanMBiaTable" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
    //             showCancelButton: true,
    //             width: "40%",
    //             preConfirm: () => {
    //                 const selectedData = $("#KodePerkiraanMBiaTable")
    //                     .DataTable()
    //                     .row(".selected")
    //                     .data();
    //                 if (!selectedData) {
    //                     Swal.showValidationMessage("Please select a row");
    //                     return false;
    //                 }
    //                 return selectedData;
    //             },
    //             didOpen: () => {
    //                 $(document).ready(function () {
    //                     const table = $("#KodePerkiraanMBiaTable").DataTable({
    //                         responsive: true,
    //                         processing: true,
    //                         serverSide: true,
    //                         returnFocus: true,
    //                         ajax: {
    //                             url: "/Kencana/MaintenanceBKMPenagihanKencana/getKodePerkiraan",
    //                             dataType: "json",
    //                             type: "GET",
    //                             data: {
    //                                 _token: csrfToken,
    //                             },
    //                         },
    //                         columns: [
    //                             {
    //                                 data: "NoKodePerkiraan",
    //                             },
    //                             {
    //                                 data: "Keterangan",
    //                             },
    //                         ],
    //                         paging: false,
    //                         scrollY: "400px",
    //                         scrollCollapse: true,
    //                     });
    //                     setTimeout(() => {
    //                         $("#KodePerkiraanMBiaTable_filter input").focus();
    //                     }, 300);
    //                     // $("#KodePerkiraanMBiaTable_filter input").on(
    //                     //     "keyup",
    //                     //     function () {
    //                     //         table
    //                     //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
    //                     //             .search(this.value) // Cari berdasarkan input pencarian
    //                     //             .draw(); // Perbarui hasil pencarian
    //                     //     }
    //                     // );
    //                     $("#KodePerkiraanMBiaTable tbody").on(
    //                         "click",
    //                         "tr",
    //                         function () {
    //                             // Remove 'selected' class from all rows
    //                             table.$("tr.selected").removeClass("selected");
    //                             // Add 'selected' class to the clicked row
    //                             $(this).addClass("selected");
    //                         }
    //                     );
    //                     currentIndex = null;
    //                     Swal.getPopup().addEventListener("keydown", (e) =>
    //                         handleTableKeydownInSwal(
    //                             e,
    //                             "KodePerkiraanMBiaTable"
    //                         )
    //                     );
    //                 });
    //             },
    //         }).then((result) => {
    //             if (result.isConfirmed && result.value) {
    //                 const selectedRow = result.value;
    //                 id_perkiraanMBia.value = escapeHTML(
    //                     selectedRow.NoKodePerkiraan.trim()
    //                 );
    //                 ket_perkiraanMBia.value = escapeHTML(
    //                     selectedRow.Keterangan.trim()
    //                 );

    //                 setTimeout(() => {
    //                     keterangan_MBia.focus();
    //                 }, 300);
    //             }
    //         });
    //     } catch (error) {
    //         console.error("An error occurred:", error);
    //     }
    //     // console.log(selectedRow);
    // });

    const select_bankM = $("#select_bankM");
    select_bankM.select2({
        dropdownParent: $("#modalPilihBank"),
        placeholder: "Pilih Bank",
    });
    select_bankM.on("select2:select", function () {
        const selectedBank = $(this).val();
        $.ajax({
            url: "/Kencana/MaintenanceBKMPenagihanKencana/getBankDetails",
            type: "GET",
            data: {
                _token: csrfToken,
                idBankM: select_bankM.val(),
            },
            success: function (data) {
                console.log(data);
                jenisMB.value = data[0].Id_Bank;
                setTimeout(() => {
                    btn_prosesMB.focus();
                }, 300);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
        console.log(selectedBank);
    });

    // btn_bankM.addEventListener("click", async function (event) {
    //     event.preventDefault();
    //     try {
    //         const result = await Swal.fire({
    //             title: "Select a Bank",
    //             html: '<table id="BankTable" class="display" style="width:100%"><thead><tr><th>ID. Bank</th><th>Nama Bank</th></tr></thead><tbody></tbody></table>',
    //             showCancelButton: true,
    //             width: "40%",
    //             preConfirm: () => {
    //                 const selectedData = $("#BankTable")
    //                     .DataTable()
    //                     .row(".selected")
    //                     .data();
    //                 if (!selectedData) {
    //                     Swal.showValidationMessage("Please select a row");
    //                     return false;
    //                 }
    //                 return selectedData;
    //             },
    //             didOpen: () => {
    //                 $(document).ready(function () {
    //                     const table = $("#BankTable").DataTable({
    //                         responsive: true,
    //                         processing: true,
    //                         serverSide: true,
    //                         returnFocus: true,
    //                         ajax: {
    //                             url: "/Kencana/MaintenanceBKMPenagihanKencana/getBank",
    //                             dataType: "json",
    //                             type: "GET",
    //                             data: {
    //                                 _token: csrfToken,
    //                             },
    //                         },
    //                         columns: [
    //                             {
    //                                 data: "Id_Bank",
    //                             },
    //                             {
    //                                 data: "Nama_Bank",
    //                             },
    //                         ],
    //                         paging: false,
    //                         scrollY: "400px",
    //                         scrollCollapse: true,
    //                     });
    //                     setTimeout(() => {
    //                         $("#BankTable_filter input").focus();
    //                     }, 300);
    //                     // $("#BankTable_filter input").on(
    //                     //     "keyup",
    //                     //     function () {
    //                     //         table
    //                     //             .columns(1) // Kolom kedua (Kode_Bank)
    //                     //             .search(this.value) // Cari berdasarkan input pencarian
    //                     //             .draw(); // Perbarui hasil pencarian
    //                     //     }
    //                     // );
    //                     $("#BankTable tbody").on("click", "tr", function () {
    //                         // Remove 'selected' class from all rows
    //                         table.$("tr.selected").removeClass("selected");
    //                         // Add 'selected' class to the clicked row
    //                         $(this).addClass("selected");
    //                     });
    //                     currentIndex = null;
    //                     Swal.getPopup().addEventListener("keydown", (e) =>
    //                         handleTableKeydownInSwal(e, "BankTable")
    //                     );
    //                 });
    //             },
    //         }).then((result) => {
    //             if (result.isConfirmed && result.value) {
    //                 const selectedRow = result.value;
    //                 idBankM.value = escapeHTML(selectedRow.Id_Bank.trim());
    //                 namaBankM.value = escapeHTML(selectedRow.Nama_Bank.trim());

    //                 $.ajax({
    //                     url: "/Kencana/MaintenanceBKMPenagihanKencana/getBankDetails",
    //                     type: "GET",
    //                     data: {
    //                         _token: csrfToken,
    //                         idBankM: idBankM.value,
    //                     },
    //                     success: function (data) {
    //                         console.log(data);
    //                         jenisMB.value = data[0].Id_Bank;
    //                     },
    //                     error: function (xhr, status, error) {
    //                         var err = eval("(" + xhr.responseText + ")");
    //                         alert(err.Message);
    //                     },
    //                 });

    //                 setTimeout(() => {
    //                     btn_prosesMB.focus();
    //                 }, 300);
    //             }
    //         });
    //     } catch (error) {
    //         console.error("An error occurred:", error);
    //     }
    //     // console.log(selectedRow);
    // });

    btn_ok.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/MaintenanceBKMPenagihanKencana/cekPelunasan",
            type: "GET",
            data: {
                _token: csrfToken,
                bulan: bulan.value,
                tahun: tahun.value,
            },
            success: function (data) {
                console.log(data);
                if (data.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: data.error,
                        showConfirmButton: false,
                    });
                } else if (data.message) {
                    $.ajax({
                        url: "/Kencana/MaintenanceBKMPenagihanKencana/getPelunasan",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            bulan: bulan.value,
                            tahun: tahun.value,
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.error) {
                                Swal.fire({
                                    icon: "info",
                                    title: "Info!",
                                    text: data.error,
                                    showConfirmButton: false,
                                });
                            } else {
                                var table_atas = $("#table_atas").DataTable();

                                table_atas.clear().draw();
                                data.forEach(function (item, index) {
                                    // console.log(item);
                                    const newRow = {
                                        tglPelunasan: item.Tgl_Pelunasan,
                                        idPelunasan: item.Id_Pelunasan,
                                        idBank: item.Id_Bank,
                                        jenisPembayaran: item.Jenis_Pembayaran,
                                        mataUang: item.Nama_MataUang,
                                        totalPelunasan: item.Nilai,
                                        noBukti: item.No_Bukti,
                                        tglPembulatan: "",
                                        idCust: item.ID_Cust,
                                        idJenisBayar: item.Id_Jenis_Bayar,
                                    };

                                    table_atas.row
                                        .add([
                                            `<input type="checkbox" name="penerimaCheckbox" value="${newRow.tglPelunasan}" /> ${newRow.tglPelunasan}`,
                                            newRow.idPelunasan,
                                            newRow.idBank,
                                            newRow.jenisPembayaran,
                                            newRow.mataUang,
                                            newRow.totalPelunasan,
                                            newRow.noBukti,
                                            newRow.tglPembulatan,
                                            newRow.idCust,
                                            newRow.idJenisBayar,
                                        ])
                                        .draw();
                                });
                                rowDataArray = [];
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    //#region Checkbox

    let rowDataArray = [];
    let rowDataPertama;

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
                    (row) => row[1] !== rowDataPertama[1]
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    let rowDataArrayPelunasan = [];
    let rowDataPelunasan;

    // Handle checkbox change events
    $("#table_detailPelunasan tbody").off(
        "change",
        'input[name="penerimaCheckboxPelunasan"]'
    );
    $("#table_detailPelunasan tbody").on(
        "change",
        'input[name="penerimaCheckboxPelunasan"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxPelunasan"]');
                // .not(this)
                // .prop("checked", false);
                rowDataPelunasan = table_detailPelunasan
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                // rowDataArrayPelunasan.push(rowDataPelunasan);
                rowDataArrayPelunasan = [rowDataPelunasan];

                console.log(rowDataArrayPelunasan);
                console.log(rowDataPelunasan, this, table_detailPelunasan);
            } else {
                rowDataPelunasan = null;
                // Remove the unchecked row data from the array
                // rowDataPelunasan = table_detailPelunasan
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArrayPelunasan = [];
                // Filter out the row with matching Id_Penagihan
                // rowDataArrayPelunasan = rowDataArrayPelunasan.filter(
                //     (row) => row.Id_Penagihan !== rowDataPelunasan.Id_Penagihan
                // );

                console.log(rowDataArrayPelunasan);
                console.log(rowDataPelunasan, this, table_detailPelunasan);
            }
        }
    );

    let rowDataArrayBiaya = [];
    let rowDataBiaya;

    // Handle checkbox change events
    $("#table_detailBiaya tbody").off(
        "change",
        'input[name="penerimaCheckboxBiaya"]'
    );
    $("#table_detailBiaya tbody").on(
        "change",
        'input[name="penerimaCheckboxBiaya"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxBiaya"]');
                // .not(this)
                // .prop("checked", false);
                rowDataBiaya = table_detailBiaya
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                // rowDataArrayBiaya.push(rowDataBiaya);
                rowDataArrayBiaya = [rowDataBiaya];

                console.log(rowDataArrayBiaya);
                console.log(rowDataBiaya, this, table_detailBiaya);
            } else {
                rowDataBiaya = null;
                // Remove the unchecked row data from the array
                // rowDataBiaya = table_detailBiaya
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArrayBiaya = [];
                // Filter out the row with matching Id_Penagihan
                // rowDataArrayBiaya = rowDataArrayBiaya.filter(
                //     (row) => row.Id_Penagihan !== rowDataBiaya.Id_Penagihan
                // );

                console.log(rowDataArrayBiaya);
                console.log(rowDataBiaya, this, table_detailBiaya);
            }
        }
    );

    let rowDataArrayKrgLbh = [];
    let rowDataKrgLbh;

    // Handle checkbox change events
    $("#table_kurangLebih tbody").off(
        "change",
        'input[name="penerimaCheckboxKrgLbh"]'
    );
    $("#table_kurangLebih tbody").on(
        "change",
        'input[name="penerimaCheckboxKrgLbh"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxKrgLbh"]');
                // .not(this)
                // .prop("checked", false);
                rowDataKrgLbh = table_kurangLebih
                    .row($(this).closest("tr"))
                    .data();

                // Add the selected row data to the array
                // rowDataArrayKrgLbh.push(rowDataKrgLbh);
                rowDataArrayKrgLbh = [rowDataKrgLbh];

                console.log(rowDataArrayKrgLbh);
                console.log(rowDataKrgLbh, this, table_kurangLebih);
            } else {
                rowDataKrgLbh = null;
                // Remove the unchecked row data from the array
                // rowDataKrgLbh = table_kurangLebih
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArrayKrgLbh = [];
                // Filter out the row with matching Id_Penagihan
                // rowDataArrayKrgLbh = rowDataArrayKrgLbh.filter(
                //     (row) => row.Id_Penagihan !== rowDataKrgLbh.Id_Penagihan
                // );

                console.log(rowDataArrayKrgLbh);
                console.log(rowDataKrgLbh, this, table_kurangLebih);
            }
        }
    );

    let rowDataArrayBKM = [];
    let rowDataBKM;

    // Handle checkbox change events
    $("#table_tampilBKM tbody").off(
        "change",
        'input[name="penerimaCheckboxBKM"]'
    );
    $("#table_tampilBKM tbody").on(
        "change",
        'input[name="penerimaCheckboxBKM"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxBKM"]')
                    .not(this)
                    .prop("checked", false);
                rowDataBKM = table_tampilBKM.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                // rowDataArrayBKM.push(rowDataBKM);
                rowDataArrayBKM = [rowDataBKM];

                console.log(rowDataArrayBKM);
                console.log(rowDataBKM, this, table_tampilBKM);

                bkm.value = rowDataBKM.Id_BKM;
                terbilang.value = rowDataBKM.Terjemahan;
            } else {
                bkm.value = "";
                terbilang.value = "";
                rowDataBKM = null;
                // Remove the unchecked row data from the array
                // rowDataBKM = table_tampilBKM
                //     .row($(this).closest("tr"))
                //     .data();

                rowDataArrayBKM = [];
                // Filter out the row with matching Id_Penagihan
                // rowDataArrayBKM = rowDataArrayBKM.filter(
                //     (row) => row.Id_Penagihan !== rowDataBKM.Id_Penagihan
                // );

                console.log(rowDataArrayBKM);
                console.log(rowDataBKM, this, table_tampilBKM);
            }
        }
    );

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);

        table_detailPelunasan = $("#table_detailPelunasan").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            scrollX: true,
            // width: "150%",
            ajax: {
                url: "/Kencana/MaintenanceBKMPenagihanKencana/getDetailPelunasan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idPelunasan: data[1],
                    });
                },
            },
            columns: [
                {
                    data: "ID_Penagihan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxPelunasan" value="${data}" /> ${data}`;
                    },
                },
                { data: "Nilai_Pelunasan" },
                { data: "Pelunasan_Rupiah" },
                { data: "Kode_Perkiraan" },
                { data: "NamaCust" },
                { data: "ID_Detail_Pelunasan" },
                { data: "Tgl_Penagihan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });

        table_detailBiaya = $("#table_detailBiaya").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            scrollX: true,
            // width: "150%",
            ajax: {
                url: "/Kencana/MaintenanceBKMPenagihanKencana/getDetailBiaya",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idPelunasan: data[1],
                    });
                },
            },
            columns: [
                {
                    data: "Keterangan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxBiaya" value="${data}" /> ${data}`;
                    },
                },
                { data: "Biaya" },
                { data: "Kode_Perkiraan" },
                { data: "Id_Detail_Pelunasan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });

        table_kurangLebih = $("#table_kurangLebih").DataTable({
            responsive: false,
            processing: true,
            serverSide: true,
            destroy: true,
            scrollX: true,
            // width: "150%",
            ajax: {
                url: "/Kencana/MaintenanceBKMPenagihanKencana/getDetailKrgLbh",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idPelunasan: data[1],
                    });
                },
            },
            columns: [
                {
                    data: "Keterangan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxKrgLbh" value="${data}" /> ${data}`;
                    },
                },
                { data: "KurangLebih" },
                { data: "Kode_Perkiraan" },
                { data: "Id_Detail_Pelunasan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
        });
    });
});
