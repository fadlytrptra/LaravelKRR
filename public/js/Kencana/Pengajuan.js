$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_batal = document.getElementById("btn_batal");
    let btn_jenisBayar = document.getElementById("btn_jenisBayar");
    let noPenagihan = document.getElementById("noPenagihan");
    let idNotaKredit = document.getElementById("idNotaKredit");
    let namaCustomer = document.getElementById("namaCustomer");
    let mataUang = document.getElementById("mataUang");
    let idMataUang = document.getElementById("idMataUang");
    let jumlahUang = document.getElementById("jumlahUang");
    let jenisBayar = document.getElementById("jenisBayar");
    let idJenisBayar = document.getElementById("idJenisBayar");
    let idBank = document.getElementById("idBank");
    let namaBank = document.getElementById("namaBank");
    let rincianBKK = document.getElementById("rincianBKK");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [6], visible: false }],
    });
    let proses;

    btn_proses.disabled = true;
    btn_batal.disabled = true;

    table_atas = $("#table_atas").DataTable({
        responsive: false,
        processing: true,
        serverSide: true,
        destroy: true,
        scrollX: true,
        // width: "150%",
        ajax: {
            url: "/Kencana/PengajuanKCN/getNotaKredit",
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
                data: "Tanggal",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_NotaKredit" },
            { data: "Id_Penagihan" },
            { data: "NamaCust" },
            { data: "Nama_MataUang" },
            { data: "Nilai" },
            { data: "Id_Bank" },
            { data: "Jenis_Pembayaran" },
            { data: "Rincian_Bayar" },
        ],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
        // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
    });

    btn_isi.addEventListener("click", async function (event) {
        event.preventDefault();
        console.log(rowDataPertama);

        if (rowDataPertama !== null && rowDataPertama !== undefined) {
            proses = 1;
            noPenagihan.value = rowDataPertama.Id_Penagihan;
            idNotaKredit.value = rowDataPertama.Id_NotaKredit;
            namaCustomer.value = rowDataPertama.NamaCust;
            mataUang.value = rowDataPertama.Nama_MataUang;
            jenisBayar.value = rowDataPertama.Jenis_Pembayaran;
            idBank.value = rowDataPertama.Id_Bank;
            rincianBKK.value = rowDataPertama.Rincian_Bayar;
            jumlahUang.value = rowDataPertama.Nilai;
            btn_proses.disabled = false;
            btn_batal.disabled = false;
            btn_isi.disabled = true;
            btn_koreksi.disabled = true;
            btn_hapus.disabled = true;
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data dahulu !",
                showConfirmButton: false,
            });
        }
    });

    btn_koreksi.addEventListener("click", async function (event) {
        event.preventDefault();
        console.log(rowDataPertama);

        if (rowDataPertama !== null && rowDataPertama !== undefined) {
            if (
                rowDataPertama.Id_Bank !== "" &&
                rowDataPertama.Jenis_Pembayaran !== ""
            ) {
                proses = 2;
                noPenagihan.value = rowDataPertama.Id_Penagihan;
                idNotaKredit.value = rowDataPertama.Id_NotaKredit;
                namaCustomer.value = rowDataPertama.NamaCust;
                mataUang.value = rowDataPertama.Nama_MataUang;
                jenisBayar.value = rowDataPertama.Jenis_Pembayaran;
                idBank.value = rowDataPertama.Id_Bank;
                rincianBKK.value = rowDataPertama.Rincian_Bayar;
                jumlahUang.value = rowDataPertama.Nilai;
                btn_proses.disabled = false;
                btn_batal.disabled = false;
                btn_isi.disabled = true;
                btn_koreksi.disabled = true;
                btn_hapus.disabled = true;
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Data Belum Diisi",
                    showConfirmButton: false,
                });
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data dahulu !",
                showConfirmButton: false,
            });
        }
    });

    btn_hapus.addEventListener("click", async function (event) {
        event.preventDefault();
        console.log(rowDataPertama);

        if (rowDataPertama !== null && rowDataPertama !== undefined) {
            if (
                rowDataPertama.Id_Bank !== "" &&
                rowDataPertama.Jenis_Pembayaran !== ""
            ) {
                proses = 3;
                noPenagihan.value = rowDataPertama.Id_Penagihan;
                idNotaKredit.value = rowDataPertama.Id_NotaKredit;
                namaCustomer.value = rowDataPertama.NamaCust;
                mataUang.value = rowDataPertama.Nama_MataUang;
                jenisBayar.value = rowDataPertama.Jenis_Pembayaran;
                idBank.value = rowDataPertama.Id_Bank;
                rincianBKK.value = rowDataPertama.Rincian_Bayar;
                jumlahUang.value = rowDataPertama.Nilai;
                btn_proses.disabled = false;
                btn_batal.disabled = false;
                btn_isi.disabled = true;
                btn_koreksi.disabled = true;
                btn_hapus.disabled = true;
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Data Belum Diisi",
                    showConfirmButton: false,
                });
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data dahulu !",
                showConfirmButton: false,
            });
        }
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
    });

    let rowDataArray = [];
    let rowDataPertama;

    // Handle checkbox change events
    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_atas.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                // rowDataArray.push(rowDataPertama);
                rowDataArray = [rowDataPertama];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            } else {
                rowDataPertama = null;
                // Remove the unchecked row data from the array
                // rowDataPertama = table_atas.row($(this).closest("tr")).data();

                rowDataArray = null;
                // Filter out the row with matching Id_NotaKredit
                // rowDataArray = rowDataArray.filter(
                //     (row) => row.Id_NotaKredit !== rowDataPertama.Id_NotaKredit
                // );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            }
        }
    );

    btn_jenisBayar.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>ID. Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                // width: "50%",
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
                                url: "/Kencana/PengajuanKCN/getJenisBayar",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Jenis_Bayar",
                                },
                                {
                                    data: "Jenis_Pembayaran",
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
                    jenisBayar.value = escapeHTML(
                        selectedRow.Jenis_Pembayaran.trim()
                    );
                    idJenisBayar.value = escapeHTML(
                        selectedRow.Id_Jenis_Bayar.trim()
                    );

                    // idJenisCustomer.value = selectedRow.IDCust.trim().substring(
                    //     0,
                    //     3
                    // );
                    // idCustomer.value = selectedRow.IDCust.trim().slice(-5);

                    // if (proses == 1) {
                    //     setTimeout(() => {
                    //         btn_penagihan.focus();
                    //     }, 300);
                    // } else {
                    //     setTimeout(() => {
                    //         btn_notaKredit.focus();
                    //     }, 300);
                    // }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
