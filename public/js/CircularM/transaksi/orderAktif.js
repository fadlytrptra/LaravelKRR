// //#region Variables

// // Form elements
// const slcTypeMesin = document.getElementById("type_mesin");
// const slcMesinAktif = document.getElementById("mesin_aktif");
// const slcOrderBaru = document.getElementById("order_baru");
// const txtIdOrderLama = document.getElementById("id_order_lama");
// const txtNamaOrderLama = document.getElementById("nama_order_lama");
// const txtMeterPanen = document.getElementById("meter_panen");
// const hidData = document.getElementById("form_data");

// // Buttons
// const btnProses = document.getElementById("btn_proses");
// const btnKeluar = document.getElementById("btn_keluar");

// // DataTables
// var tableMesin = null;

// //#endregion

// //#region Listeners

// $("#" + slcMesinAktif.id).on("select2:select", function () {
//     fetchSelect(
//         "/sp-order/Sp_List_Mesin~4/" + slcMesinAktif.value,
//         (data) => {
//             txtIdOrderLama.value = data[0]["Id_Order"];
//             txtNamaOrderLama.value = data[0]["nama_order"];
//             txtMeterPanen.value = data[0]["MeterPanen"];
//             console.log(slcMesinAktif.value);

//             // fetchDataOrderBaru("/getOrderBaruSelect/");
//             slcOrderBaru.disabled = false;
//             slcOrderBaru.focus();
//         },
//         () => {
//             // fetchDataOrderBaru("/getOrderBaruSelect/");
//             slcOrderBaru.disabled = false;
//             slcOrderBaru.focus();
//         }
//     );
// });

// $("#" + slcOrderBaru.id).on("select2:select", function () {
//     fetchSelect("/sp-order/Sp_List_Order~13/" + slcOrderBaru.value, (data) => {
//         txtMeterPanen.value = data[0]["MeterPanen"];
//         txtMeterPanen.disabled = false;
//         btnProses.disabled = false;
//         txtMeterPanen.focus();
//     });
// });

// // function fetchDataOrderBaru(endpoint, idsubkel) {
// //     fetch(endpoint)
// //         .then((response) => response.json())
// //         .then((options) => {
// //             subKelompokSelect
// //                 .empty()
// //                 .append(
// //                     `<option disabled selected>Pilih Sub Kelompok</option>`
// //                 );

// //             Promise.all(
// //                 options.map((entry) => {
// //                     return new Promise((resolve) => {
// //                         const displayText = `${entry.IdSubkelompok} | ${entry.NamaSubKelompok}`;
// //                         subKelompokSelect.append(
// //                             new Option(displayText, entry.IdSubkelompok)
// //                         );
// //                         resolve(); // Resolve after appending
// //                     });
// //                 })
// //             ).then(() => {
// //                 subKelompokSelect.select2("open");
// //             });
// //         });
// // }

// // slcOrderBaru.select2({
// //     // dropdownParent: $("#modalAsalKonversi"),
// //     placeholder: "Pilih Order Baru",
// // });
// // let arraySubKel = [];
// // slcOrderBaru.on("change", function () {
// //     const selectedSubKelompok = $(this).val();
// //     const selectedOption = $(this).find(":selected").text(); // Ambil teks dari option yang dipilih
// //     const selectedArraySub = selectedOption.split(" | "); // Pecah teks menjadi array

// //     console.log(selectedArraySub);
// //     console.log(selectedSubKelompok);
// //     arraySubKel = [selectedArraySub];
// //     if (selectedSubKelompok) {
// //     }
// // });

// $("#" + slcTypeMesin.id).on("select2:select", function () {
//     tableMesin.ajax.reload();
//     slcMesinAktif.disabled = false;
//     slcMesinAktif.focus();

//     $("#" + slcMesinAktif.id).val("");
//     $("#" + slcMesinAktif.id).trigger("change");

//     $("#" + slcOrderBaru.id).val("");
//     $("#" + slcOrderBaru.id).trigger("change");
//     slcOrderBaru.disabled = true;

//     txtIdOrderLama.value = "";
//     txtNamaOrderLama.value = "";
//     txtMeterPanen.value = "";
//     txtMeterPanen.disabled = true;
// });

// $("#" + slcTypeMesin.id).on("select2:unselect", function () {
//     slcMesinAktif.disabled = true;
//     slcOrderBaru.disabled = true;
//     txtMeterPanen.disabled = true;
//     clearForm();
// });

// btnProses.addEventListener("click", function () {
//     if (txtMeterPanen.value === "") txtMeterPanen.value = 0;

//     hidData.value =
//         slcMesinAktif.value +
//         "~" +
//         slcOrderBaru.value +
//         "~" +
//         txtMeterPanen.value;
// });

// btnProses.addEventListener("submit", function (event) {
//     if (
//         $("#" + slcMesinAktif.id).val() === null ||
//         $("#" + slcOrderBaru.id).val() === null
//     ) {
//         showToast("Data belum lengkap. Mohon periksa kembali!");
//         event.preventDefault();
//     }
// });

// btnKeluar.addEventListener("click", function () {
//     window.location.href = "/";
// });

// //#endregion

// //#region Functions
// function initDataTable() {
//     const dtOptions = {
//         responsive: true,
//         scrollX: true,
//         scrollY: "400px",
//         language: {
//             searchPlaceholder: " Pencarian...",
//             search: "",
//             info: "Menampilkan _START_ - _END_ dari _TOTAL_ total data",
//             infoFiltered: "(disaring dari _MAX_ total data)",
//             infoEmpty: "Menampilkan 0 data",
//             zeroRecords: "Data tidak ditemukan",
//             lengthMenu: "Menampilkan _MENU_ data per halaman",
//         },
//         initComplete: function () {
//             var searchInput = $('input[type="search"]');
//             searchInput.eq(0).addClass("form-control");
//             searchInput.wrap('<div class="input-group input-group-sm"></div>');
//             searchInput.before('<span class="input-group-text">Cari:</span>');
//         },
//         processing: true,
//         serverSide: true,
//         ajax: {
//             url: url_OrderBarang,
//             dataType: "json",
//             type: "POST",
//             timeout: 60000,
//             headers: {
//                 "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
//             },
//             data: function (d) {
//                 d.idTypeMesin = $("#" + slcTypeMesin.id).val();
//             },
//         },
//         columns: [
//             { data: "IdMesin", width: "75px" },
//             { data: "NamaMesin", width: "100px" },
//             { data: "IdOrder", width: "75px" },
//             { data: "NamaBarang", width: "600px" },
//             { data: "MeterPanen", width: "100px" },
//         ],
//         columnDefs: [
//             {
//                 targets: 3,
//                 render: DataTable.render.ellipsis(75, true),
//             },
//         ],
//     };

//     if (tableMesin) {
//         tableMesin.destroy();
//     }

//     tableMesin = new DataTable("#table_mesin", dtOptions);
// }

// function init() {
//     addTxtListener(txtMeterPanen, btnProses);
//     initDataTable();

//     $("#" + slcTypeMesin.id).select2({
//         placeholder: "-- Pilih Type Mesin --",
//         allowClear: true,
//     });

//     $("#" + slcMesinAktif.id).select2({
//         placeholder: "",
//         allowClear: true,
//         ajax: {
//             url: url_MesinAktif,
//             type: "GET",
//             dataType: "json",
//             delay: 250,

//             data: function (params) {
//                 return {
//                     searchItem: params.term,
//                     page: params.page || 1,
//                     idTypeMesin: $("#" + slcTypeMesin.id).val(),
//                 };
//             },

//             processResults: function (data, params) {
//                 params.page = params.page || 1;

//                 console.log(data.data);

//                 data.data.forEach(function (d) {
//                     d.id = d.Id_mesin;

//                     if (d.Id_mesin && d.Nama_mesin) {
//                         d.text = d.Id_mesin + " | " + d.Nama_mesin;
//                     }
//                 });

//                 return {
//                     results: data.data,
//                     pagination: {
//                         more: data.current_page < data.last_page,
//                     },
//                 };
//             },
//         },

//         templateResult: function (data) {
//             if (data.loading) {
//                 return data.text;
//             } else {
//                 return data.Id_mesin + " | " + data.Nama_mesin;
//             }
//         },

//         templateSelection: function (data) {
//             return data.text || "-- Pilih Mesin --";
//         },
//     });

//     $("#" + slcOrderBaru.id).select2({
//         placeholder: "",
//         allowClear: true,
//         ajax: {
//             url: url_OrderBaru,
//             type: "GET",
//             dataType: "json",
//             // delay: 250,

//             data: function (params) {
//                 return {
//                     searchItem: params.term,
//                     page: params.page || 1,
//                 };
//             },

//             processResults: function (data, params) {
//                 params.page = params.page || 1;

//                 console.log(data.data);

//                 data.data.forEach(function (d) {
//                     d.id = d.Id_order;

//                     if (d.Id_order && d.Nama_Barang) {
//                         d.text = d.Id_order + " | " + d.Nama_Barang;
//                     }
//                 });

//                 return {
//                     results: data.data,
//                     pagination: {
//                         more: data.current_page < data.last_page,
//                     },
//                 };
//             },
//         },

//         templateResult: function (data) {
//             if (data.loading) {
//                 return data.text;
//             } else {
//                 return data.Nama_Barang + " | " + data.Id_order;
//             }
//         },

//         templateSelection: function (data) {
//             return data.text || "-- Pilih Order Baru --";
//         },
//     });
// }

// $(document).ready(function () {
//     init();
// });
// //#endregion

//#region NEW
jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let id_typeMesin = document.getElementById("id_typeMesin");
    let type_mesin = document.getElementById("type_mesin");
    let btn_typeMesin = document.getElementById("btn_typeMesin");
    let id_mesin = document.getElementById("id_mesin");
    let mesin = document.getElementById("mesin");
    let btn_mesin = document.getElementById("btn_mesin");
    let id_orderLama = document.getElementById("id_orderLama");
    let orderLama = document.getElementById("orderLama");
    let id_orderBaru = document.getElementById("id_orderBaru");
    let orderBaru = document.getElementById("orderBaru");
    let btn_orderBaru = document.getElementById("btn_orderBaru");
    let meterPanen = document.getElementById("meterPanen");
    let btn_batal = document.getElementById("btn_batal");
    let btn_proses = document.getElementById("btn_proses");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });

    btn_typeMesin.focus();
    id_typeMesin.readOnly = true;
    type_mesin.readOnly = true;
    id_mesin.readOnly = true;
    mesin.readOnly = true;
    id_orderLama.readOnly = true;
    orderLama.readOnly = true;
    id_orderBaru.readOnly = true;
    orderBaru.readOnly = true;
    btn_mesin.disabled = true;

    btn_koreksi.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_mesin.disabled = false;
            btn_mesin.focus();
            btn_koreksi.disabled = true;
        }
    });

    meterPanen.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            btn_proses.focus();
        }
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        if (orderBaru.value.trim() === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Nama barang tidak boleh kosong.',
                confirmButtonText: 'OK'
            });
            return;
        } else if (numeral(meterPanen.value.trim()).value() < 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Meter Panen yang Anda inputkan salah!',
                confirmButtonText: 'OK'
            });
            return;
        } else {
            $.ajax({
                url: "/orderD/store",
                type: "POST",
                data: {
                    _token: csrfToken,
                    orderBaru: orderBaru.value,
                    meterPanen: meterPanen.value,
                    id_mesin: id_mesin.value,
                    id_orderBaru: id_orderBaru.value,
                    kodeProses: "ProsesMaintenanceOrderAktif",
                },
                success: function (response) {
                    console.log(response.message);

                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                        }).then((result) => {
                            console.log(result);
                            $("#table_atas").DataTable().ajax.reload();
                            // kode_pegawaiNew.value = "";
                            // nama_pegawaiNew.value = "";
                            // $("#checkbox_all").prop("checked", false);
                            // rowDataArray = [];
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
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
        }
    });

    btn_typeMesin.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Type Mesin",
                html: '<table id="typeMesinTable" class="display" style="width:100%"><thead><tr><th>Type Mesin</th><th>Id Type Mesin</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#typeMesinTable")
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
                        const table = $("#typeMesinTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/orderD/show/getTypeMesin",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Type_Mesin",
                                },
                                {
                                    data: "IdType_Mesin",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#typeMesinTable_filter input").focus();
                        }, 300);
                        // $("#typeMesinTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#typeMesinTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "typeMesinTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_typeMesin.value = selectedRow.IdType_Mesin;
                    type_mesin.value = selectedRow.Type_Mesin;
                    setTimeout(() => {
                        btn_koreksi.focus();
                    }, 300);
                    table_atas = $("#table_atas").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        destroy: true,
                        ajax: {
                            url: "/orderD/show/getListMesin",
                            dataType: "json",
                            type: "GET",
                            data: function (d) {
                                return $.extend({}, d, {
                                    _token: csrfToken,
                                    id_typeMesin: id_typeMesin.value
                                });
                            },
                        },
                        columns: [
                            {
                                data: "Id_mesin",
                                // render: function (data) {
                                //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                // },
                            },
                            {
                                data: "Nama_mesin",
                                // render: function (data) {
                                //     return numeral(data).format("0,0.00");
                                // },
                            },
                            { data: "Id_order" },
                            { data: "Nama_Barang" },
                            { data: "MeterPanen" },
                        ],
                        // order: [[1, "asc"]],
                        paging: false,
                        scrollY: "300px",
                        scrollCollapse: true,
                    });
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
        // console.log(selectedRow);
    });

    btn_mesin.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Mesin",
                html: '<table id="mesinTable" class="display" style="width:100%"><thead><tr><th>Nama Mesin</th><th>Id Mesin</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#mesinTable")
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
                        const table = $("#mesinTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/orderD/show/getMesin",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_typeMesin: id_typeMesin.value
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_mesin",
                                },
                                {
                                    data: "Id_mesin",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#mesinTable_filter input").focus();
                        }, 300);
                        // $("#mesinTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#mesinTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "mesinTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_mesin.value = selectedRow.Id_mesin;
                    mesin.value = selectedRow.Nama_mesin;
                    setTimeout(() => {
                        btn_orderBaru.focus();
                    }, 300);
                    $.ajax({
                        url: "/orderD/show/getDetailMesin",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            id_mesin: id_mesin.value,
                        },
                        success: function (data) {
                            console.log(data);
                            id_orderLama.value = data[0].Id_Order;
                            orderLama.value = data[0].nama_order;
                            meterPanen.value = data[0].MeterPanen;
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
        // console.log(selectedRow);
    });

    btn_orderBaru.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Order",
                html: '<table id="orderBaruTable" class="display" style="width:100%"><thead><tr><th>Nama Barang</th><th>Id Order</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "90%",
                preConfirm: () => {
                    const selectedData = $("#orderBaruTable")
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
                        const table = $("#orderBaruTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/orderD/show/getOrder",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_typeMesin: id_typeMesin.value
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Barang",
                                },
                                {
                                    data: "Id_order",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#orderBaruTable_filter input").focus();
                        }, 300);
                        // $("#orderBaruTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#orderBaruTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "orderBaruTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_orderBaru.value = selectedRow.Id_order;
                    orderBaru.value = selectedRow.Nama_Barang;

                    $.ajax({
                        url: "/orderD/show/getDetailOrder",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            id_orderBaru: id_orderBaru.value,
                        },
                        success: function (data) {
                            console.log(data);
                            // id_orderLama.value = data[0].Id_Order;
                            // orderLama.value = data[0].nama_order;
                            meterPanen.value = data[0].MeterPanen;
                            setTimeout(() => {
                                meterPanen.select();
                                meterPanen.focus();
                            }, 300);
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
        // console.log(selectedRow);
    });
});