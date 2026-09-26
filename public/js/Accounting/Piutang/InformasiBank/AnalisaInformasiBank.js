$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let tanggal = document.getElementById("tanggal");
    let tanggal2 = document.getElementById("tanggal2");
    let radiogrupElement = document.getElementsByName("radiogrup");
    let btnOk = document.getElementById("btnOk");
    let btnBatal = document.getElementById("btnBatal");
    let btn_customer = document.getElementById("btn_customer");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let statusPenagihan = document.getElementById("statusPenagihan");

    let formkoreksi = document.getElementById("formkoreksi");
    let methodkoreksi = document.getElementById("methodkoreksi");
    let nama_customer = document.getElementById("nama_customer");
    //INPUTAN
    let tanggalInput = document.getElementById("tanggalInput");
    let noReferensi = document.getElementById("noReferensi");
    let totalNilai = document.getElementById("totalNilai");
    let ketDariBank = document.getElementById("ketDariBank");
    let namaCustomerSelect = document.getElementById("namaCustomerSelect");
    let idCustomer = document.getElementById("idCustomer");
    let radiogrup2;
    let radiogrup2_T = document.getElementById("radiogrup2_T");
    let radiogrup2_K = document.getElementById("radiogrup2_K");
    let radiogrup2_U = document.getElementById("radiogrup2_U");
    let radiobtn = document.getElementsByName("radiogrup2");
    let radiogrup = document.getElementsByName("radiogrup");
    let tabelAnalisa = $("#tabelAnalisa").DataTable();

    const tgl = new Date();
    const formattedDate = tgl.toISOString().substring(0, 10);
    tanggal.value = formattedDate;

    const tgl2 = new Date();
    const formattedDate2 = tgl2.toISOString().substring(0, 10);
    tanggal2.value = formattedDate2;

    // Nilai yang ingin dicentang
    // Nilai yang ingin dicentang
    let targetValue = "0";

    radiogrup.forEach((radio) => {
        if (radio.value === targetValue) {
            radio.checked = true; // Centang radio button dengan nilai yang cocok
        }
    });

    // fetch("/detailcustomer/")
    //     .then((response) => response.json())
    //     .then((options) => {
    //         console.log(options);
    //         namaCustomerSelect.innerHTML = "";

    //         const defaultOption = document.createElement("option");
    //         defaultOption.disabled = true;
    //         defaultOption.selected = true;
    //         defaultOption.innerText = "Pilih Cust";
    //         namaCustomerSelect.appendChild(defaultOption);

    //         options.forEach((entry) => {
    //             const option = document.createElement("option");
    //             option.value = entry.IdCust; // Gunakan entry.IdCust sebagai nilai opsi
    //             option.innerText = entry.IdCust + "|" + entry.NamaCust; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
    //             namaCustomerSelect.appendChild(option);
    //         });
    //     });

    // namaCustomerSelect.addEventListener("change", function (event) {
    //     event.preventDefault();
    //     const selectedOption = namaCustomerSelect.options[namaCustomerSelect.selectedIndex];
    //     if (selectedOption) {
    //         const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
    //         const bagiansatu = selectedValue.split(/[-|]/);
    //         const idcust = bagiansatu[1];
    //         namacust = bagiansatu[2];
    //         idCustomer.value = idcust;
    //     }
    // });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_proses.disabled = true;
        // console.log(radiobtn.value);
        // console.log(radiogrup2.value);
        if (radiogrup2_K.checked) {
            radiogrup2 = "K"
        } else if (radiogrup2_T.checked) {
            radiogrup2 = "T"
        } else {
            radiogrup2 = "U"
        }


        $.ajax({
            url: "AnalisaInformasiBank",
            type: "POST",
            data: {
                _token: csrfToken,
                radiogrup2: radiogrup2,
                radiobtn: radiobtn.value,
                noReferensi: noReferensi.value,
                idCustomer: idCustomer.value,
                nama_customer: nama_customer.value,
                ketDariBank: ketDariBank.value,
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
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        // $("#tabelAnalisa").DataTable().ajax.reload();
                        btn_proses.disabled = false;
                        btnOk.click();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    btn_proses.disabled = false;
                }
            },
            error: function (xhr) {
                alert(xhr.responseJSON.message);
                btn_proses.disabled = false;
            },
        });
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
    });

    totalNilai.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(totalNilai.value.replace(/,/g, ""));
            totalNilai.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        }
    });

    btn_customer.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Jenis Pembayaran",
                html: '<table id="tableCustomer" class="display" style="width:100%"><thead><tr><th>Customer</th><th>ID. Customer</th></tr></thead><tbody></tbody></table>',
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
                                url: "AnalisaInformasiBank/getCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "NAMACUST" }, { data: "IDCust" }],
                            order: [[1, "asc"]],
                        });
                        setTimeout(() => {
                            $("#tableCustomer_filter input").focus();
                        }, 300);
                        // $("#tableCustomer_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#tableCustomer tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
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
                        selectedRow.NAMACUST.trim()
                    );
                    idCustomer.value = escapeHTML(selectedRow.IDCust.trim());
                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btnOk.addEventListener("click", function (event) {
        event.preventDefault();
        // clickOK();

        var radiogrup;
        for (var i = 0; i < radiogrupElement.length; i++) {
            if (radiogrupElement[i].checked) {
                radiogrup = radiogrupElement[i].value;
                break; // Keluar dari loop setelah menemukan yang dipilih
            }
        }
        fetch(
            "/getTabelAnalisis/" +
            tanggal.value +
            "/" +
            tanggal2.value +
            "/" +
            radiogrup
        )
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                // console.log(tanggal.value);

                tabelAnalisa = $("#tabelAnalisa").DataTable({
                    destroy: true,
                    data: options,
                    columns: [
                        { title: "Id. Referensi", data: "IdReferensi" },
                        { title: "Nama Bank", data: "Nama_Bank" },
                        { title: "Mata Uang", data: "Nama_MataUang" },
                        {
                            title: "Nilai",
                            data: "Nilai",
                            render: function (data, type, row) {
                                // Pastikan nilai adalah angka sebelum diformat
                                return numeral(data).format("0,0.00");
                            },
                        },
                        { title: "Keterangan", data: "Keterangan" },
                        { title: "Nama Customer", data: "NamaCust" },
                        { title: "Type", data: "TypeTransaksi" },
                        { title: "Id. Pelunasan", data: "Id_Pelunasan" },
                        { title: "Tagihan (Y/N)", data: "Status_Tagihan" },
                        { title: "Jenis", data: "Jenis_Pembayaran" },
                    ],
                    paging: false,
                    scrollY: "300px",
                    scrollCollapse: true,
                });
            });
    });

    $("#tabelAnalisa tbody").off("click", "tr");
    $("#tabelAnalisa tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#tabelAnalisa tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const table = $("#tabelAnalisa").DataTable();
        let selectedRows = table.rows(".selected").data().toArray();
        console.log(selectedRows[0]);
        noReferensi.value = selectedRows[0].IdReferensi;
        ketDariBank.value = selectedRows[0].Keterangan;
        totalNilai.value = numeral(selectedRows[0].Nilai).format("0,0.00");
        idCustomer.value = selectedRows[0].Id_Cust;

        statusPenagihan.value = selectedRows[0].Status_Tagihan;

        const cust = selectedRows[0].Id_Cust;
        // const options3 = namaCustomerSelect.options;
        // for (let i = 0; i < options3.length; i++) {
        //     let value = options3[i].value.split(/[-|]/);
        //     if (value[1] === cust) {
        //         console.log(value[2]);
        //         namaCustomerSelect.selectedIndex = i;
        //         break;
        //     }
        // }
        const tglInput = selectedRows[0].Tanggal;
        const [tanggal1, waktu] = tglInput.split(" ");
        selectedRows[0].TglInput = tanggal1;
        tanggalInput.value = tanggal1;

        for (var i = 0; i < radiobtn.length; i++) {
            if (radiobtn[i].value === selectedRows[0].TypeTransaksi) {
                radiobtn[i].checked = true;
                break;
            }
        }
        btnProses.disabled = false;
    });

    // btnProses.addEventListener("click", function (event) {
    //     event.preventDefault();

    //     let radioChecked = false;
    //     for (let i = 0; i < radiobtn.length; i++) {
    //         if (radiobtn[i].checked) {
    //             radioChecked = true;
    //             break;
    //         }
    //     }

    //     if (radioChecked) {
    //         methodkoreksi.value = "PUT";
    //         console.log(formkoreksi);
    //         $.ajax({
    //             url: "AnalisaInformasiBank/" + noReferensi.value,
    //             method: "post",
    //             data: new FormData(formkoreksi),
    //             dataType: "JSON",
    //             headers: {
    //                 "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
    //                     "content"
    //                 ),
    //             },
    //             contentType: false,
    //             cache: false,
    //             processData: false,
    //             success: function (response) {
    //                 alert(response);
    //             },
    //         });

    //         var radiogrup;
    //         for (var i = 0; i < radiogrupElement.length; i++) {
    //             if (radiogrupElement[i].checked) {
    //                 radiogrup = radiogrupElement[i].value;
    //                 break;
    //             }
    //         }

    //         fetch(
    //             "/getTabelAnalisis/" +
    //                 tanggal.value +
    //                 "/" +
    //                 tanggal2.value +
    //                 "/" +
    //                 radiogrup
    //         )
    //             .then((response) => response.json())
    //             .then((options) => {
    //                 console.log(options);
    //                 tabelAnalisa = $("#tabelAnalisa").DataTable({
    //                     destroy: true,
    //                     data: options,
    //                     columns: [
    //                         { title: "Id. Referensi", data: "IdReferensi" },
    //                         { title: "Nama Bank", data: "Nama_Bank" },
    //                         { title: "Mata Uang", data: "Nama_MataUang" },
    //                         { title: "Nilai", data: "Nilai" },
    //                         { title: "Keterangan", data: "Keterangan" },
    //                         { title: "Nama Customer", data: "NamaCust" },
    //                         { title: "Type", data: "TypeTransaksi" },
    //                         { title: "Id. Pelunasan", data: "Id_Pelunasan" },
    //                         { title: "Tagihan (Y/N)", data: "Status_Tagihan" },
    //                         { title: "Jenis", data: "Jenis_Pembayaran" },
    //                     ],
    //                 });
    //             });
    //     } else {
    //         alert("Pilih button dulu.");
    //     }
    // });

    // btnBatal.addEventListener("click", function (event) {
    //     event.preventDefault();

    //     tanggalInput.value = "";
    //     noReferensi.value = "";
    //     totalNilai.value = "";
    //     ketDariBank.value = "";
    //     namaCustomerSelect.selectedIndex = 0;
    //     idCustomer.value = "";
    //     var radioButtons = document.querySelectorAll(
    //         'input[name="radiogrup2"]'
    //     );
    //     // Mengulangi semua radio button dan menghapus centang
    //     radioButtons.forEach(function (radioButton) {
    //         radioButton.checked = false;
    //     });
    //     tabelAnalisa.clear().draw();
    // });
});
