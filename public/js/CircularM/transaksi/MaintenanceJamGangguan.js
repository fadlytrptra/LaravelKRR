jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let tanggal = document.getElementById("tanggal");
    // let tanggal2 = document.getElementById("tanggal2");
    let shift = document.getElementById("shift");
    let jam_gangguan = document.getElementById("jam_gangguan");
    let jam_gangguan2 = document.getElementById("jam_gangguan2");
    let btn_idGangguan = document.getElementById("btn_idGangguan");
    let idGangguan = document.getElementById("idGangguan");
    let btn_typeMesin = document.getElementById("btn_typeMesin");
    let id_typeMesin = document.getElementById("id_typeMesin");
    let typeMesin = document.getElementById("typeMesin");
    let btn_namaMesin = document.getElementById("btn_namaMesin");
    let id_namaMesin = document.getElementById("id_namaMesin");
    let namaMesin = document.getElementById("namaMesin");
    let idOrder = document.getElementById("idOrder");
    let order = document.getElementById("order");
    let btn_jenisGangguan = document.getElementById("btn_jenisGangguan");
    let id_jenisGangguan = document.getElementById("id_jenisGangguan");
    let jenisGangguan = document.getElementById("jenisGangguan");
    let btn_batal = document.getElementById("btn_batal");
    let btn_proses = document.getElementById("btn_proses");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });
    let proses = 0;
    let typeG = null;

    tanggal.valueAsDate = new Date();
    // tanggal2.valueAsDate = new Date();
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    jam_gangguan.value = currentTime;
    jam_gangguan2.value = currentTime;
    btn_isi.focus();
    btn_proses.disabled = true;
    btn_batal.disabled = true;
    btn_typeMesin.disabled = true;
    btn_namaMesin.disabled = true;
    btn_jenisGangguan.disabled = true;

    //#region Enter
    tanggal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (proses == 1) {
                shift.focus();
            } else {
                btn_idGangguan.disabled = false;
                btn_idGangguan.focus();
            }

        }
    });

    jam_gangguan.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            jam_gangguan2.focus();
        }
    });

    jam_gangguan2.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            // Ambil nilai jam dan shift
            let jamAwal = jam_gangguan.value;
            let jamAkhir = jam_gangguan2.value;
            let currentShift = shift.value;

            // Tentukan rentang waktu berdasarkan shift
            let rentangAwal, rentangAkhir, namaShift;
            if (currentShift === 'P') {
                rentangAwal = '07:00';
                rentangAkhir = '15:00';
                namaShift = 'Pagi';
            } else if (currentShift === 'S') {
                rentangAwal = '15:00';
                rentangAkhir = '23:00';
                namaShift = 'Sore';
            } else if (currentShift === 'M') {
                rentangAwal = '23:00';
                rentangAkhir = '07:00';
                namaShift = 'Malam';
            }

            // Fungsi bantu untuk konversi waktu ke menit
            function toMinutes(time) {
                let [h, m] = time.split(":").map(Number);
                return h * 60 + m;
            }

            let start = toMinutes(jamAwal);
            let end = toMinutes(jamAkhir);
            let minRange = toMinutes(rentangAwal);
            let maxRange = toMinutes(rentangAkhir);

            let valid = true;

            if (currentShift === 'M') {
                // Shift malam (lewat tengah malam)
                if (!(start >= minRange || start < maxRange) || !(end >= minRange || end < maxRange)) {
                    valid = false;
                }
            } else {
                // Shift pagi/sore (normal)
                if (start < minRange || start > maxRange || end < minRange || end > maxRange) {
                    valid = false;
                }
            }

            if (!valid) {
                Swal.fire({
                    icon: "warning",
                    title: "Jam Tidak Sesuai!",
                    text: `Jam gangguan shift ${currentShift} harus pada rentang waktu ${rentangAwal} - ${rentangAkhir}`,
                });
                btn_typeMesin.disabled = true;
                if (shift.value == 'P') {
                    jam_gangguan.value = '07:00';
                    jam_gangguan2.value = '15:00';
                } else if (shift.value == 'S') {
                    jam_gangguan.value = '15:00';
                    jam_gangguan2.value = '23:00';
                } else if (shift.value == 'M') {
                    jam_gangguan.value = '23:00';
                    jam_gangguan2.value = '07:00';
                }
                return;
            }

            // Jika valid, lanjut fokus
            btn_typeMesin.disabled = false;
            btn_typeMesin.focus();
        }
    });

    //#region Event Listener
    btn_isi.addEventListener("click", async function (event) {
        event.preventDefault();
        tanggal.focus();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_batal.disabled = false;
        proses = 1;
    });

    btn_koreksi.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_batal.disabled = false;
        tanggal.focus();
        proses = 2;
    });

    btn_hapus.addEventListener("click", async function (event) {
        event.preventDefault();
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_batal.disabled = false;
        tanggal.focus();
        proses = 3;
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
    });

    shift.addEventListener("change", function (event) {
        event.preventDefault();
        if (shift.value == 'P') {
            jam_gangguan.value = '07:00';
            jam_gangguan2.value = '15:00';
        } else if (shift.value == 'S') {
            jam_gangguan.value = '15:00';
            jam_gangguan2.value = '23:00';
        } else if (shift.value == 'M') {
            jam_gangguan.value = '23:00';
            jam_gangguan2.value = '07:00';
        }

        jam_gangguan.focus();
    });

    $('input[name="type_gangguan"]').on('change', function () {
        typeG = this.id === 'jumbo_bag' ? 'J' : 'W';
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        const tanggalValue = tanggal.value;
        const jam1 = document.getElementById('jam_gangguan').value;
        const jam2 = document.getElementById('jam_gangguan2').value;
        const jam_gangguan = tanggalValue + ' ' + jam1;
        const jam_gangguan2 = tanggalValue + ' ' + jam2;

        dataJam = {
            jam_gangguan: jam_gangguan,
            jam_gangguan2: jam_gangguan2
        };

        $.ajax({
            url: "/MaintenanceJamGangguanD/getStore",
            dataType: "json",
            type: "GET",
            data: {
                _token: csrfToken,
                proses: proses,
                typeG: typeG,
                tanggal: tanggal.value,
                shift: shift.value,
                id_namaMesin: id_namaMesin.value,
                jam_gangguan: dataJam.jam_gangguan,
                jam_gangguan2: dataJam.jam_gangguan2,
                id_jenisGangguan: id_jenisGangguan.value,
                idOrder: idOrder.value,
                order: order.value,
                idGangguan: idGangguan.value,
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

        if (proses == 1) {

        } else if (proses == 2) {

        } else if (proses == 3) {

        }
    });

    btn_idGangguan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a ID Gangguan",
                html: '<table id="idGangguanTable" class="display" style="width:100%"><thead><tr><th>Nama Mesin</th><th>Shift</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#idGangguanTable")
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
                        const table = $("#idGangguanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/MaintenanceJamGangguanD/getListGangguan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    tanggal: tanggal.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_mesin",
                                },
                                {
                                    data: "Shift",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#idGangguanTable_filter input").focus();
                        }, 300);
                        // $("#idGangguanTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#idGangguanTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "idGangguanTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    shift.value = selectedRow.Shift;
                    if (shift.value == 'P') {
                        jam_gangguan.value = '07:00';
                        jam_gangguan2.value = '15:00';
                    } else if (shift.value == 'S') {
                        jam_gangguan.value = '15:00';
                        jam_gangguan2.value = '23:00';
                    } else if (shift.value == 'M') {
                        jam_gangguan.value = '23:00';
                        jam_gangguan2.value = '07:00';
                    }
                    namaMesin.value = selectedRow.Nama_mesin;
                    idGangguan.value = selectedRow.Id_Gangguan;
                    idOrder.value = selectedRow.Id_Order;
                    order.value = selectedRow.NamaOrder;

                    let orderText = order.value?.trim() || "";

                    if (orderText !== "") {
                        // Uncheck dulu semua radio
                        $("#jumbo_bag").prop("checked", false);
                        $("#woven_bag").prop("checked", false);

                        // Ambil huruf pertama
                        let firstChar = orderText.charAt(0).toUpperCase();

                        // Logika sesuai VB
                        if (firstChar === "C") {
                            $("#jumbo_bag").prop("checked", true);
                            typeG = 'J';
                        }
                        if (firstChar === "A" || firstChar === "B") {
                            $("#woven_bag").prop("checked", true);
                            typeG = 'W';
                        }
                    }
                    setTimeout(() => {
                        btn_jenisGangguan.disabled = false;
                        btn_jenisGangguan.focus();
                    }, 300);
                    $.ajax({
                        url: "MaintenanceJamGangguanD/getIdMesinByNama",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            namaMesin: namaMesin.value,
                        },
                        success: function (data) {
                            console.log(data);
                            id_namaMesin.value = data.Id_mesin;
                            // jenisCustomer.value = data.TJenisCust;
                            // alamat.value = data.TAlamat;
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

    btn_typeMesin.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Type Mesin",
                html: '<table id="typeMesinTable" class="display" style="width:100%"><thead><tr><th>Nama Type</th><th>Id Type</th></tr></thead><tbody></tbody></table>',
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
                                url: "/MaintenanceJamGangguanD/getListTypeMesin",
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
                    typeMesin.value = selectedRow.Type_Mesin;
                    setTimeout(() => {
                        btn_namaMesin.disabled = false;
                        btn_namaMesin.focus();
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

    btn_namaMesin.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Mesin",
                html: '<table id="namaMesinTable" class="display" style="width:100%"><thead><tr><th>Nama Mesin</th><th>Id Mesin</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#namaMesinTable")
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
                        const table = $("#namaMesinTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/MaintenanceJamGangguanD/getListMesin",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    id_typeMesin: id_typeMesin.value,
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
                            $("#namaMesinTable_filter input").focus();
                        }, 300);
                        // $("#namaMesinTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#namaMesinTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "namaMesinTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_namaMesin.value = selectedRow.Id_mesin;
                    namaMesin.value = selectedRow.Nama_mesin;
                    setTimeout(() => {
                        btn_namaMesin.focus();
                    }, 300);
                    $.ajax({
                        url: "/MaintenanceJamGangguanD/getLogMesin",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            tanggal: tanggal.value,
                            shift: shift.value,
                            id_namaMesin: id_namaMesin.value,
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.status == "ada") {
                                idOrder.value = data.data[0].Id_order;
                                order.value = data.data[0].NAMA_BRG;

                                let orderText = order.value?.trim() || "";

                                if (orderText !== "") {
                                    // Uncheck dulu semua radio
                                    $("#jumbo_bag").prop("checked", false);
                                    $("#woven_bag").prop("checked", false);

                                    // Ambil huruf pertama
                                    let firstChar = orderText.charAt(0).toUpperCase();

                                    // Logika sesuai VB
                                    if (firstChar === "C") {
                                        $("#jumbo_bag").prop("checked", true);
                                        typeG = 'J';
                                    }
                                    if (firstChar === "A" || firstChar === "B") {
                                        $("#woven_bag").prop("checked", true);
                                        typeG = 'W';
                                    }
                                }
                                setTimeout(() => {
                                    btn_jenisGangguan.disabled = false;
                                    btn_jenisGangguan.focus();
                                }, 300);
                            } else {
                                idOrder.value = "";
                                order.value = "";
                                $("#jumbo_bag").prop("checked", false);
                                $("#woven_bag").prop("checked", false);
                                setTimeout(() => {
                                    btn_jenisGangguan.disabled = false;
                                    btn_jenisGangguan.focus();
                                }, 300);
                            }

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

    btn_jenisGangguan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Jenis Gangguan",
                html: '<table id="jenisGangguanTable" class="display" style="width:100%"><thead><tr><th>Jenis Gangguan</th><th>Id Jenis Gangguan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#jenisGangguanTable")
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
                        const table = $("#jenisGangguanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/MaintenanceJamGangguanD/getListJenisGangguan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Jenis_Gangguan",
                                },
                                {
                                    data: "Id_Jenis_Gangguan",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#jenisGangguanTable_filter input").focus();
                        }, 300);
                        // $("#jenisGangguanTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#jenisGangguanTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "jenisGangguanTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_jenisGangguan.value = selectedRow.Id_Jenis_Gangguan;
                    jenisGangguan.value = selectedRow.Jenis_Gangguan;
                    setTimeout(() => {
                        btn_proses.disabled = false;
                        btn_proses.focus();
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
});