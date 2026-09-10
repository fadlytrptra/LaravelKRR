jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let tahun = document.getElementById("tahun");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let btn_tanggal = document.getElementById("btn_tanggal");
    let btn_bulan = document.getElementById("btn_bulan");
    let bulan = document.getElementById("bulan");
    let id_bulan = document.getElementById("id_bulan");
    let shift = document.getElementById("shift");

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

    tahun.value = new Date().getFullYear();
    btn_bulan.focus();

    bulan.readOnly = true;
    tanggal.readOnly = true;
    shift.readOnly = true;

    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });

    tahun.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_bulan.focus();
        }
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: "/orderD/store",
            type: "POST",
            data: {
                _token: csrfToken,
                tanggal: tanggal.value,
                shift: shift.value,
                kodeProses: "ProsesPerhitunganBerat",
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
                        table_atas = $("#table_atas").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            destroy: true,
                            ajax: {
                                url: "/orderD/show/getListBerat",
                                dataType: "json",
                                type: "GET",
                                data: function (d) {
                                    return $.extend({}, d, {
                                        _token: csrfToken,
                                        shift: shift.value,
                                        tanggal: tanggal.value,
                                    });
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Premi",
                                    // render: function (data) {
                                    //     return <input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data};
                                    // },
                                },
                                {
                                    data: "Nama_Mesin",
                                    // render: function (data) {
                                    //     return numeral(data).format("0,0.00");
                                    // },
                                },
                                { data: "Nama_Brg" },
                                { data: "Hasil_meter" },
                                { data: "Hasil_Kg" },
                            ],
                            paging: false,
                            scrollY: "300px",
                            scrollCollapse: true,
                        });
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
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_bulan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bulan",
                html: '<table id="bulanTable" class="display" style="width:100%"><thead><tr><th>Nama Bulan</th><th>Id Bulan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#bulanTable")
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
                        const table = $("#bulanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/orderD/show/getBulan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    tahun: tahun.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Bulan",
                                    // render: function (data, type, row) {
                                    //     // Asumsikan data = "2024-02-01" atau "01/02/2024"
                                    //     var date = new Date(data);
                                    //     var month = (date.getMonth() + 1)
                                    //         .toString()
                                    //         .padStart(2, "0");
                                    //     var day = date
                                    //         .getDate()
                                    //         .toString()
                                    //         .padStart(2, "0");
                                    //     var year = date.getFullYear();
                                    //     return `${month}/${day}/${year}`; // mm/dd/yyyy
                                    // },
                                },
                                {
                                    data: "Id_Bulan",
                                },
                            ],
                            order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#bulanTable_filter input").focus();
                        }, 300);
                        // $("#bulanTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#bulanTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "bulanTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    bulan.value = selectedRow.Nama_Bulan;
                    id_bulan.value = selectedRow.Id_Bulan;
                    // tanggal.value = selectedRow.Tgl_Log.split(" ")[0];
                    // shift_lengkap.value = selectedRow.KetShift;
                    setTimeout(() => {
                        btn_tanggal.focus();
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
        // console.log(selectedRow);
    });

    btn_tanggal.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Tanggal",
                html: '<table id="tanggalTable" class="display" style="width:100%"><thead><tr><th>Shift</th><th>Tgl Log</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tanggalTable")
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
                        const table = $("#tanggalTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/orderD/show/getTanggalProsesBerat",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    tahun: tahun.value,
                                    id_bulan: id_bulan.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Shift",
                                },
                                {
                                    data: 'Tgl_Log_raw', // Data asli untuk sorting
                                    render: function (data, type, row) {
                                        // type === 'display' digunakan saat menampilkan di tabel
                                        if (type === 'display') {
                                            return row.Tgl_Log; // tampilkan versi m/d/Y
                                        }
                                        return data; // untuk sorting & filtering (yyyy-mm-dd)
                                    }
                                },
                            ],
                            order: [[1, "desc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#tanggalTable_filter input").focus();
                        }, 300);
                        // $("#tanggalTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#tanggalTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tanggalTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    shift.value = selectedRow.Shift;
                    // tanggal.value = selectedRow.Tgl_Log.split(" ")[0];
                    const originalDate = selectedRow.Tgl_Log; // contoh: "06/16/2025"
                    const dateObj = new Date(originalDate);

                    // Format ke yyyy-MM-dd tanpa konversi UTC
                    const year = dateObj.getFullYear();
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const day = String(dateObj.getDate()).padStart(2, '0');

                    const formattedDate = `${year}-${month}-${day}`;
                    tanggal.value = formattedDate;
                    // shift_lengkap.value = selectedRow.KetShift;
                    setTimeout(() => {
                        btn_proses.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
