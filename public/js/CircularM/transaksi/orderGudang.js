let csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
//#region Variables
const txtKodeAsal = document.getElementById("kode_asal");
const txtIdOrder = document.getElementById("id_order");
const btnIdOrder = document.getElementById("btn_id_order");
const txtTypeAsal = document.getElementById("type_asal");
const txtRollOrder = document.getElementById("roll_order");
const txtRollProduksi = document.getElementById("roll_produksi");

const txtKodeTujuan = document.getElementById("kode_tujuan");
const btnKodeTujuan = document.getElementById("btn_kode_tujuan");
const txtNoSP = document.getElementById("no_sp");
const btnNoSP = document.getElementById("btn_no_sp");
const txtTypeTujuan = document.getElementById("type_tujuan");
const txtMeterOrder = document.getElementById("meter_order");
const txtMeterProduksi = document.getElementById("meter_produksi");

const chkStatusLunas = document.getElementById("status_lunas");
const hidProses = document.getElementById("mode_proses");
const hidData = document.getElementById("form_data");

const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");
//#endregion

//#region Listeners
btnIdOrder.addEventListener("click", async function (event) {
    event.preventDefault();

    if (hidProses.value == "3") {
        try {
            const result = await Swal.fire({
                title: "Select a Order",
                html: '<table id="order1Table" class="display" style="width:100%"><thead><tr><th>Nama Barang</th><th>Id Order</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "75%",
                preConfirm: () => {
                    const selectedData = $("#order1Table")
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
                    jQuery(function ($) {
                        const table = $("#order1Table").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/orderD/show/getOrder1",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    // tahun: tahun.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Barang",
                                },
                                {
                                    data: "Id_Order",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#order1Table_filter input").focus();
                        }, 300);
                        // $("#order1Table_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#order1Table tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "order1Table")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    txtIdOrder.value = selectedRow.Id_Order;
                    txtKodeAsal.value = selectedRow.Kode_Barang;
                    txtTypeAsal.value = selectedRow.Nama_Barang;
                    txtTypeAsal.title = selectedRow.Nama_Barang;
                    txtKodeTujuan.disabled = false;
                    btnKodeTujuan.disabled = false;

                    setTimeout(() => {
                        btnKodeTujuan.focus();
                    }, 300);
                    // $.ajax({
                    //     url: "PenagihanPenjualanLokal/getJenisCustomer",
                    //     type: "GET",
                    //     data: {
                    //         _token: csrfToken,
                    //         idCustomer: idCustomer.value,
                    //     },
                    //     success: function (data) {
                    //         console.log(data);
                    //         jenisCustomer.value = data.TJenisCust;
                    //         alamat.value = data.TAlamat;
                    //     },
                    //     error: function (xhr, status, error) {
                    //         var err = eval("(" + xhr.responseText + ")");
                    //         alert(err.Message);
                    //     },
                    // });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }

    } else if (hidProses.value == "4") {
        try {
            const result = await Swal.fire({
                title: "Select a Order",
                html: '<table id="order2Table" class="display" style="width:100%"><thead><tr><th>Id Surat Pesanan</th><th>Id Order</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "75%",
                preConfirm: () => {
                    const selectedData = $("#order2Table")
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
                    jQuery(function ($) {
                        const table = $("#order2Table").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/orderD/show/getOrder2",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    // tahun: tahun.value,
                                },
                            },
                            columns: [
                                {
                                    data: "idsuratpesanan",
                                },
                                {
                                    data: "id_order",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#order2Table_filter input").focus();
                        }, 300);
                        // $("#order2Table_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#order2Table tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "order2Table")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    txtIdOrder.value = selectedRow.id_order;
                    txtNoSP.value = selectedRow.idsuratpesanan;
                    // setTimeout(() => {
                    //     btnKodeTujuan.focus();
                    // }, 300);
                    $.ajax({
                        url: "/orderD/show/getOrder2Details",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            txtNoSP: txtNoSP.value,
                        },
                        success: function (data) {
                            console.log(data);
                            txtKodeAsal.value = data[0].Kode_barang_asal;
                            txtTypeAsal.value = data[0].Nama_brg_asal;

                            txtKodeTujuan.value = data[0].kode_barang_tujuan;
                            txtTypeTujuan.value = data[0].Nama_brg_tujuan;
                            txtTypeTujuan.title = data[0].Nama_brg_tujuan;

                            txtRollOrder.value = data[0].Roll_order;
                            txtMeterOrder.value = data[0].Meter_order;
                            txtRollProduksi.value = data[0].Roll_produksi;
                            txtMeterProduksi.value = data[0].Meter_produksi;

                            if (data[0].Status == "1") {
                                chkStatusLunas.checked = true;
                            } else chkStatusLunas.checked = false;

                            txtRollOrder.disabled = false;
                            txtMeterOrder.disabled = false;

                            txtRollProduksi.disabled = false;
                            txtMeterProduksi.disabled = false;

                            chkStatusLunas.disabled = false;
                            txtIdOrder.disabled = true;
                            txtNoSP.disabled = true;

                            setTimeout(() => {
                                btnProses.focus();
                            }, 500);


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

    } else if (hidProses.value == "5") {
        // Perbedaan hanya pada kode sp, mungkin bisa jadikan satu dengan hidProses.value "4"
        try {
            const result = await Swal.fire({
                title: "Select a Order",
                html: '<table id="order3Table" class="display" style="width:100%"><thead><tr><th>Id Surat Pesanan</th><th>Id Order</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "75%",
                preConfirm: () => {
                    const selectedData = $("#order3Table")
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
                    jQuery(function ($) {
                        const table = $("#order3Table").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/orderD/show/getOrder3",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    // tahun: tahun.value,
                                },
                            },
                            columns: [
                                {
                                    data: "idsuratpesanan",
                                },
                                {
                                    data: "id_order",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#order3Table_filter input").focus();
                        }, 300);
                        // $("#order3Table_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#order3Table tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "order3Table")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    txtIdOrder.value = selectedRow.id_order;
                    txtNoSP.value = selectedRow.idsuratpesanan;
                    setTimeout(() => {
                        btnProses.focus();
                    }, 300);
                    $.ajax({
                        url: "/orderD/show/getOrder2Details",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            txtNoSP: txtNoSP.value,
                        },
                        success: function (data) {
                            console.log(data);
                            txtKodeAsal.value = data[0].Kode_barang_asal;
                            txtKodeTujuan.value = data[0].kode_barang_tujuan;
                            txtTypeAsal.value = data[0].Nama_brg_asal;
                            txtTypeTujuan.value = data[0].Nama_brg_tujuan;
                            txtTypeTujuan.title = data[0].Nama_brg_tujuan;
                            txtRollOrder.value = data[0].Roll_order;
                            txtMeterOrder.value = data[0].Meter_order;

                            if (data[0].Status == "1") {
                                chkStatusLunas.checked = true;
                            } else chkStatusLunas.checked = false;

                            // setTimeout(() => {
                            //     btnProses.focus();
                            // }, 500);

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
    }
});

btnKodeTujuan.addEventListener("click", async function (event) {
    event.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Select a Kode Tujuan",
            html: '<table id="kodeTujuanTable" class="display" style="width:100%"><thead><tr><th>Nama Barang</th><th>No SP</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            width: "90%",
            preConfirm: () => {
                const selectedData = $("#kodeTujuanTable")
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
                jQuery(function ($) {
                    const table = $("#kodeTujuanTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        returnFocus: true,
                        ajax: {
                            url: "/orderD/show/getKodeTujuanSP",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                // tahun: tahun.value,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Barang",
                            },
                            {
                                data: "Id_Sp",
                            },
                        ],
                        // order: [[1, "asc"]],
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                    });
                    setTimeout(() => {
                        $("#kodeTujuanTable_filter input").focus();
                    }, 300);
                    // $("#kodeTujuanTable_filter input").on(
                    //     "keyup",
                    //     function () {
                    //         table
                    //             .columns(1)
                    //             .search(this.value)
                    //             .draw();
                    //     }
                    // );
                    $("#kodeTujuanTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydownInSwal(e, "kodeTujuanTable")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                txtNoSP.value = selectedRow.Id_Sp;
                txtTypeTujuan.value = selectedRow.Nama_Barang;
                txtTypeTujuan.title = selectedRow.Nama_Barang;
                txtKodeTujuan.value = selectedRow.Kode_Barang;

                btnNoSP.disabled = false;
                txtRollOrder.disabled = false;
                txtMeterOrder.disabled = false;

                setTimeout(() => {
                    txtRollOrder.focus();
                }, 300);

                // $.ajax({
                //     url: "PenagihanPenjualanLokal/getJenisCustomer",
                //     type: "GET",
                //     data: {
                //         _token: csrfToken,
                //         idCustomer: idCustomer.value,
                //     },
                //     success: function (data) {
                //         console.log(data);
                //         jenisCustomer.value = data.TJenisCust;
                //         alamat.value = data.TAlamat;
                //     },
                //     error: function (xhr, status, error) {
                //         var err = eval("(" + xhr.responseText + ")");
                //         alert(err.Message);
                //     },
                // });
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

btnNoSP.addEventListener("click", async function (event) {
    event.preventDefault();
    try {
        const result = await Swal.fire({
            title: "Select a Surat Pesanan",
            html: '<table id="suratPesananTable" class="display" style="width:100%"><thead><tr><th>Nama Barang</th><th>No SP</th></tr></thead><tbody></tbody></table>',
            showCancelButton: true,
            width: "90%",
            preConfirm: () => {
                const selectedData = $("#suratPesananTable")
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
                jQuery(function ($) {
                    const table = $("#suratPesananTable").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        returnFocus: true,
                        ajax: {
                            url: "/orderD/show/getNoSp",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                txtKodeTujuan: txtKodeTujuan.value,
                            },
                        },
                        columns: [
                            {
                                data: "Nama_Barang",
                            },
                            {
                                data: "Id_sp",
                            },
                        ],
                        // order: [[1, "asc"]],
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                    });
                    setTimeout(() => {
                        $("#suratPesananTable_filter input").focus();
                    }, 300);
                    // $("#suratPesananTable_filter input").on(
                    //     "keyup",
                    //     function () {
                    //         table
                    //             .columns(1)
                    //             .search(this.value)
                    //             .draw();
                    //     }
                    // );
                    $("#suratPesananTable tbody").on("click", "tr", function () {
                        // Remove 'selected' class from all rows
                        table.$("tr.selected").removeClass("selected");
                        // Add 'selected' class to the clicked row
                        $(this).addClass("selected");
                    });
                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydownInSwal(e, "suratPesananTable")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const selectedRow = result.value;
                txtTypeTujuan.value = selectedRow.Nama_Barang;
                txtTypeTujuan.title = selectedRow.Nama_Barang;
                txtNoSP.value = selectedRow.Id_sp;

                txtRollOrder.disabled = false;
                txtMeterOrder.disabled = false;

                setTimeout(() => {
                    txtRollOrder.focus();
                }, 300);

                // $.ajax({
                //     url: "PenagihanPenjualanLokal/getJenisCustomer",
                //     type: "GET",
                //     data: {
                //         _token: csrfToken,
                //         idCustomer: idCustomer.value,
                //     },
                //     success: function (data) {
                //         console.log(data);
                //         jenisCustomer.value = data.TJenisCust;
                //         alamat.value = data.TAlamat;
                //     },
                //     error: function (xhr, status, error) {
                //         var err = eval("(" + xhr.responseText + ")");
                //         alert(err.Message);
                //     },
                // });
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

btnIsi.addEventListener("click", function () {
    hidProses.value = 3;
    toggleButtons();
    btnIdOrder.focus();
});

btnKoreksi.addEventListener("click", function () {
    hidProses.value = 4;
    toggleButtons();
    btnIdOrder.focus();
});

btnHapus.addEventListener("click", function () {
    hidProses.value = 5;
    toggleButtons();
    btnIdOrder.focus();
});

btnProses.addEventListener("click", function (event) {
    if (txtTypeAsal.value != "" || txtTypeTujuan.value != "") {
        if (
            hidProses.value == "4" &&
            txtRollProduksi.value == "0" &&
            txtMeterProduksi.value == "0"
        ) {
            chkStatusLunas.checked = false;
            showToast("Roll Produksi dan Meter Produksi tidak boleh kosong.");
            event.preventDefault();
            return;
        }

        var encodeSp = txtNoSP.value.trim().replace("/", "|");
        hidData.value = "";

        switch (hidProses.value) {
            case "4":
                let status = 0;
                if (chkStatusLunas.checked) status = 1;

                hidData.value =
                    txtIdOrder.value +
                    "~" +
                    encodeSp +
                    "~" +
                    txtRollOrder.value +
                    "~" +
                    txtMeterOrder.value +
                    "~" +
                    txtRollProduksi.value +
                    "~" +
                    txtMeterProduksi.value +
                    "~" +
                    status +
                    "~" +
                    getCurrentDateTime() +
                    "~";

                if (status == "1") hidData.value += getCurrentDateTime();
                break;

            case "5":
                hidData.value = txtIdOrder.value + "~" + encodeSp;
                break;

            default:
                hidData.value =
                    txtIdOrder.value +
                    "~" +
                    encodeSp +
                    "~" +
                    txtKodeAsal.value.trim() +
                    "~" +
                    txtKodeTujuan.value.trim() +
                    "~" +
                    txtRollOrder.value +
                    "~" +
                    txtMeterOrder.value +
                    "~" +
                    txtRollProduksi.value +
                    "~" +
                    txtMeterProduksi.value +
                    "~" +
                    getCurrentDateTime() +
                    "~TROPODO";
                break;
        }
    } else showToast("Mohon isi form dengan benar.");
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        clearForm();

        txtKodeAsal.disabled = true;
        txtKodeTujuan.disabled = true;
        txtRollOrder.disabled = true;
        txtMeterOrder.disabled = true;
        txtRollProduksi.disabled = true;
        txtMeterProduksi.disabled = true;
        chkStatusLunas.disabled = true;

        txtIdOrder.disabled = true;
        btnIdOrder.disabled = true;
        btnNoSP.disabled = true;
        btnKodeTujuan.disabled = true;

        btnProses.disabled = true;
        btnKeluar.textContent = "Keluar";
        btnIsi.disabled = false;
        btnHapus.disabled = false;
        btnKoreksi.disabled = false;
        btnIsi.focus();
    } else window.location.href = "/";
});

txtKodeAsal.addEventListener("change", function () {
    if (hidProses.value == "3") {
        if (txtKodeAsal.value.trim().length < 9) {
            while (txtKodeAsal.value.length < 9) {
                txtKodeAsal.value = "0" + txtKodeAsal.value;
            }
        }

        btnIdOrder.disabled = false;
        // btnIdOrder.focus();
    }
});

txtRollOrder.addEventListener("change", function () {
    txtMeterOrder.disabled = false;
    txtMeterOrder.select();
});

txtMeterOrder.addEventListener("change", function () {
    if (hidProses.value == "3") {
        btnProses.focus();
    }
});

txtKodeTujuan.addEventListener("change", function () {
    if (hidProses.value == "3") {
        if (txtKodeTujuan.value.trim().length < 9) {
            while (txtKodeTujuan.value.length < 9) {
                txtKodeTujuan.value = "0" + txtKodeTujuan.value;
            }
        }

        btnNoSP.disabled = false;
        btnNoSP.focus();
    }
});

txtRollProduksi.addEventListener("change", function () {
    txtMeterProduksi.disabled = false;
    txtMeterProduksi.select();
});

txtMeterProduksi.addEventListener("change", function () {
    chkStatusLunas.disabled = false;
    chkStatusLunas.focus();
});

chkStatusLunas.addEventListener("change", function () {
    btnProses.disabled = false;
    btnProses.focus();
});

txtIdOrder.addEventListener("change", function () {
    if (this.value.trim() != "") {
        if (hidProses.value == "3") {
            fetchSelect(
                "/sp-orderD/SP_4384_CIR_Check_GudangOrder1~1/" +
                txtIdOrder.value.trim() +
                "~1",
                (data) => {
                    txtTypeAsal.value = data[0]["Nama_barang"];
                    txtTypeAsal.title = data[0]["Nama_barang"];
                    txtKodeAsal.value = data[0]["Kode_barang"];
                }
            );
        } else {
            fetchSelect(
                "/sp-order/SP_4384_CIR_Check_GudangOrder1~7/" +
                txtIdOrder.value.trim(),
                (data) => {
                    txtNoSP.Text = data[0]["idsuratpesanan"];
                    txtIdOrder.Text = data[0]["Id_order"];
                    txtKodeAsal.Text = data[0]["Kode_barang_asal"];
                    txtKodeTujuan.Text = data[0]["Kode_barang_tujuan"];
                    txtTypeAsal.Text = data[0]["Nama_Brg_Asal"];
                    txtTypeTujuan.Text = data[0]["Nama_Brg_Tujuan"];
                    txtRollOrder.Text = data[0]["Roll_order"];
                    txtMeterOrder.Text = data[0]["Meter_order"];
                    txtRollProduksi.Text = data[0]["Roll_produksi"];
                    txtMeterProduksi.Text = data[0]["Meter_produksi"];

                    if (data[0]["Status"] == "1") {
                        chkStatusLunas.checked = true;
                    } else chkStatusLunas.checked = false;

                    if (hidProses.value == "4") {
                        txtRollOrder.disabled = false;
                        txtMeterOrder.disabled = false;
                        txtRollProduksi.disabled = false;
                        txtMeterProduksi.disabled = false;
                        chkStatusLunas.disabled = false;
                        txtIdOrder.disabled = true;
                        txtNoSP.disabled = true;
                        chkStatusLunas.disabled = false;
                    }
                }
            );
        }

        txtKodeTujuan.disabled = false;
        btnKodeTujuan.disabled = false;
        txtKodeTujuan.select();
    }
});

txtNoSP.addEventListener("change", function () {
    if (hidProses.value != "3") {
        fetchSelect(
            "/sp-orderD/SP_4384_CIR_Check_GudangOrder1~7/" +
            txtIdOrder.value.trim(),
            (data) => {
                txtNoSP.Text = data[0]["idsuratpesanan"];
                txtIdOrder.Text = data[0]["Id_order"];
                txtKodeAsal.Text = data[0]["Kode_barang_asal"];
                txtKodeTujuan.Text = data[0]["Kode_barang_tujuan"];
                txtTypeAsal.Text = data[0]["Nama_Brg_Asal"];
                txtTypeTujuan.Text = data[0]["Nama_Brg_Tujuan"];
                txtRollOrder.Text = data[0]["Roll_order"];
                txtMeterOrder.Text = data[0]["Meter_order"];
                txtRollProduksi.Text = data[0]["Roll_produksi"];
                txtMeterProduksi.Text = data[0]["Meter_produksi"];

                if (data[0]["Status"] == "1") {
                    chkStatusLunas.checked = true;
                } else chkStatusLunas.checked = false;

                if (hidProses.value == "4") {
                    txtRollOrder.disabled = false;
                    txtMeterOrder.disabled = false;
                    txtRollProduksi.disabled = false;
                    txtMeterProduksi.disabled = false;
                    chkStatusLunas.disabled = false;
                    txtIdOrder.disabled = true;
                    txtNoSP.disabled = true;
                    chkStatusLunas.disabled = false;
                }
            }
        );
    }

    btnKodeTujuan.disabled = false;
    btnKodeTujuan.focus();
});
//#endregion

//#region Functions
function toggleButtons() {
    btnProses.disabled = false;
    btnKeluar.disabled = false;
    btnKeluar.textContent = "Batal";
    btnIsi.disabled = true;
    btnHapus.disabled = true;
    btnKoreksi.disabled = true;

    switch (hidProses.value) {
        case "3":
            txtKodeAsal.disabled = true;
            txtKodeTujuan.disabled = true;
            txtRollOrder.disabled = true;
            txtMeterOrder.disabled = true;
            txtRollProduksi.disabled = true;
            txtMeterProduksi.disabled = true;
            chkStatusLunas.disabled = true;
            txtIdOrder.disabled = false;
            btnIdOrder.disabled = false;

            txtRollProduksi.value = "0";
            txtMeterProduksi.value = "0";
            break;

        case "4":
            txtKodeAsal.disabled = true;
            txtKodeTujuan.disabled = true;
            txtRollOrder.disabled = true;
            txtMeterOrder.disabled = true;
            txtRollProduksi.disabled = true;
            txtMeterProduksi.disabled = true;
            chkStatusLunas.disabled = false;

            btnIdOrder.disabled = false;
            btnNoSP.disabled = true;
            btnKodeTujuan.disabled = true;
            break;

        case "5":
            txtNoSP.disabled = true;
            txtKodeTujuan.disabled = true;

            txtKodeAsal.disabled = true;
            txtKodeTujuan.disabled = true;
            txtRollOrder.disabled = true;
            txtMeterOrder.disabled = true;
            txtRollProduksi.disabled = true;
            txtMeterProduksi.disabled = true;
            chkStatusLunas.disabled = true;

            btnIdOrder.disabled = false;
            btnNoSP.disabled = true;
            btnKodeTujuan.disabled = true;
            break;

        default:
            break;
    }
}

function removeDuplicateOrders(arr) {
    const seen = new Set();
    return arr.filter((order) => {
        if (seen.has(order.id_order)) {
            return false;
        } else {
            seen.add(order.id_order);
            return true;
        }
    });
}

function init() {
    prepareButtons(btnIsi, btnKoreksi, btnHapus, btnKeluar);
    btnIsi.focus();
}

$(document).ready(function () {
    init();
});
//#endregion

/**
 *
 * Catatan migrasi
 *
 * SP itu Surat Pesanan
 *
 * Mode proses ada di VB diubah menjadi berikut;
 * (agar menyesuaikan dengan kode SP)
 * proses 1 = 3
 * proses 2 = 4
 * proses 3 = 5
 *
 * TEST CASE:

Id Order
30941
30937
30940
30982
30720

Kode Barang
000071983
000072991
000069820
000044597
000078481

 *
 */
