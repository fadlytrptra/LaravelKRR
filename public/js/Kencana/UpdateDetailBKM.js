$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_perkiraanMP = document.getElementById("btn_perkiraanMP");
    let btn_prosesMP = document.getElementById("btn_prosesMP");
    let btn_perkiraanMK = document.getElementById("btn_perkiraanMK");
    let btn_prosesMK = document.getElementById("btn_prosesMK");
    let btn_perkiraanMB = document.getElementById("btn_perkiraanMB");
    let btn_prosesMB = document.getElementById("btn_prosesMB");
    let btn_tampilbkm = document.getElementById("btn_tampilbkm");
    let btn_okbkm = document.getElementById("btn_okbkm");
    let btn_batal = document.getElementById("btn_batal");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let id_penagihanMP = document.getElementById("id_penagihanMP");
    let id_pelunasanMP = document.getElementById("id_pelunasanMP");
    let namaCustomer_MP = document.getElementById("namaCustomer_MP");
    let nilai_pelunasanMP = document.getElementById("nilai_pelunasanMP");
    let pelunasanRupiah_MP = document.getElementById("pelunasanRupiah_MP");
    let id_perkiraanMP = document.getElementById("id_perkiraanMP");
    let ket_perkiraanMP = document.getElementById("ket_perkiraanMP");
    let jumlahUang_MK = document.getElementById("jumlahUang_MK");
    let id_perkiraanMK = document.getElementById("id_perkiraanMK");
    let ket_perkiraanMK = document.getElementById("ket_perkiraanMK");
    let keterangan_MK = document.getElementById("keterangan_MK");
    let jumlahBiaya_MB = document.getElementById("jumlahBiaya_MB");
    let id_detailMB = document.getElementById("id_detailMB");
    let id_perkiraanMB = document.getElementById("id_perkiraanMB");
    let ket_perkiraanMB = document.getElementById("ket_perkiraanMB");
    let keterangan_MB = document.getElementById("keterangan_MB");
    let tgl_awalbkm = document.getElementById("tgl_awalbkm");
    let tgl_akhirbkm = document.getElementById("tgl_akhirbkm");
    let bkm = document.getElementById("bkm");
    let radio_1 = document.getElementById("radio_1");
    let radio_2 = document.getElementById("radio_2");
    let radio_3 = document.getElementById("radio_3");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let table_rp = $("#table_rp").DataTable({
        // columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let table_rb = $("#table_rb").DataTable({
        // columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let table_rk = $("#table_rk").DataTable({
        // columnDefs: [{ targets: [7, 8, 9], visible: false }],
    });
    let rowDataPertama;
    let rowDataKedua;
    let rowDataKetiga;
    let rowDataKeempat;
    let rowDataKelima;
    let koreksi = null;

    jumlahUang_MK.readOnly = true;
    id_perkiraanMK.readOnly = true;
    ket_perkiraanMK.readOnly = true;
    tgl_awalbkm.valueAsDate = new Date();
    tgl_akhirbkm.valueAsDate = new Date();
    bulan.focus();

    radio_1.addEventListener("click", function (event) {
        koreksi = 1;
    });

    radio_2.addEventListener("click", function (event) {
        koreksi = 2;
    });

    radio_3.addEventListener("click", function (event) {
        koreksi = 3;
    });

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

    btn_okbkm.addEventListener("click", async function (event) {
        event.preventDefault();
        tabletampilBKM = $("#tabletampilBKM").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/UpdateDetailBKM/getOkBKM",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awalbkm: tgl_awalbkm.value,
                        tgl_akhirbkm: tgl_akhirbkm.value,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxM" value="${data}" /> ${data}`;
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

    btn_tampilbkm.addEventListener("click", function (event) {
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
                url: "/Kencana/UpdateDetailBKM/getListBKM",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        // tes: "tes",
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxM" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKM" },
                { data: "Nilai_Pelunasan" },
                { data: "Terjemahan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [5], visible: false }],
        });

        myModal.show();
    });

    let rowDataArrayKelima = [];

    $("#tabletampilBKM tbody").off("change", 'input[name="penerimaCheckboxM"]');
    $("#tabletampilBKM tbody").on(
        "change",
        'input[name="penerimaCheckboxM"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxM"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKelima = tabletampilBKM
                    .row($(this).closest("tr"))
                    .data();
                rowDataArray.push(rowDataKelima);
                bkm.value = rowDataKelima.Id_BKM;
                console.log(rowDataArrayKelima);
                console.log(rowDataKelima, this, tabletampilBKM);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArray = [];
                rowDataKelima = null;
                bkm.value = "";
                console.log(rowDataArrayKelima);
                console.log(rowDataKelima, this, tabletampilBKM);
            }
        }
    );

    btn_koreksi.addEventListener("click", function (event) {
        event.preventDefault();
        if (koreksi == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih Detail Yang Akan Dikoreksi",
                showConfirmButton: true,
            });
        } else {
            if (koreksi == 1) {
                if (rowDataKedua == null || rowDataPertama == null) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: "Pilih Data Dahulu",
                        showConfirmButton: true,
                    });
                } else {
                    id_penagihanMP.value = rowDataKedua.ID_Penagihan;
                    id_pelunasanMP.value = rowDataPertama.Id_Pelunasan;
                    namaCustomer_MP.value = rowDataKedua.NamaCust;
                    nilai_pelunasanMP.value = rowDataKedua.Nilai_Pelunasan;
                    pelunasanRupiah_MP.value = rowDataKedua.Pelunasan_Rupiah;
                    id_perkiraanMP.value = rowDataKedua.Kode_Perkiraan;
                    $.ajax({
                        url: "/Kencana/UpdateDetailBKM/getPerkiraan",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            IdPerkiraan: rowDataKedua.Kode_Perkiraan,
                            // checkedRows: checkedRows,
                        },
                        success: function (response) {
                            if (response.error) {
                                Swal.fire({
                                    icon: "info",
                                    title: "Info!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            } else {
                                ket_perkiraanMP.value = response.Keterangan;
                            }
                        },
                        error: function (xhr) {
                            alert(xhr.responseJSON.message);
                        },
                    });
                    var myModal = new bootstrap.Modal(
                        document.getElementById("modalDetailPelunasan"),
                        {
                            keyboard: false,
                        }
                    );
                    myModal.show();
                }
            } else if (koreksi == 2) {
                if (rowDataKetiga == null || rowDataPertama == null) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: "Pilih Data Dahulu",
                        showConfirmButton: true,
                    });
                } else {
                    jumlahBiaya_MB.value = rowDataKetiga.Biaya;
                    id_detailMB.value = rowDataKetiga.Id_Detail_Pelunasan;
                    id_perkiraanMB.value = rowDataKetiga.Kode_Perkiraan;
                    keterangan_MB.value = rowDataKetiga.Keterangan;
                    $.ajax({
                        url: "/Kencana/UpdateDetailBKM/getPerkiraan",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            IdPerkiraan: rowDataKetiga.Kode_Perkiraan,
                            // checkedRows: checkedRows,
                        },
                        success: function (response) {
                            if (response.error) {
                                Swal.fire({
                                    icon: "info",
                                    title: "Info!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            } else {
                                ket_perkiraanMB.value = response.Keterangan;
                            }
                        },
                        error: function (xhr) {
                            alert(xhr.responseJSON.message);
                        },
                    });
                    var myModal = new bootstrap.Modal(
                        document.getElementById("modalDetailBiaya"),
                        {
                            keyboard: false,
                        }
                    );
                    myModal.show();
                }
            } else if (koreksi == 3) {
                if (rowDataKeempat == null || rowDataPertama == null) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: "Pilih Data Dahulu",
                        showConfirmButton: true,
                    });
                } else {
                    jumlahUang_MK.value = rowDataKeempat.KurangLebih;
                    id_perkiraanMK.value = rowDataKeempat.Kode_Perkiraan;
                    keterangan_MK.value = rowDataKeempat.Keterangan;
                    $.ajax({
                        url: "/Kencana/UpdateDetailBKM/getPerkiraan",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            IdPerkiraan: rowDataKeempat.Kode_Perkiraan,
                            // checkedRows: checkedRows,
                        },
                        success: function (response) {
                            if (response.error) {
                                Swal.fire({
                                    icon: "info",
                                    title: "Info!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            } else {
                                ket_perkiraanMK.value = response.Keterangan;
                            }
                        },
                        error: function (xhr) {
                            alert(xhr.responseJSON.message);
                        },
                    });
                    var myModal = new bootstrap.Modal(
                        document.getElementById("modalDetailKurangLebih"),
                        {
                            keyboard: false,
                        }
                    );
                    myModal.show();
                }
            }
        }
    });

    btn_prosesMP.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/UpdateDetailBKM/updatePelunasan",
            type: "PUT",
            data: {
                _token: csrfToken,
                ID_Detail_Pelunasan: rowDataKedua.ID_Detail_Pelunasan,
                id_perkiraanMP: id_perkiraanMP.value,
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

    btn_prosesMK.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/UpdateDetailBKM/updateKrgLbh",
            type: "PUT",
            data: {
                _token: csrfToken,
                Id_Detail_Pelunasan: rowDataKeempat.Id_Detail_Pelunasan,
                id_perkiraanMK: id_perkiraanMK.value,
                keterangan_MK: keterangan_MK.value,
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

    btn_prosesMB.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/UpdateDetailBKM/updateBiaya",
            type: "PUT",
            data: {
                _token: csrfToken,
                Id_Detail_Pelunasan: rowDataKetiga.Id_Detail_Pelunasan,
                id_perkiraanMB: id_perkiraanMB.value,
                keterangan_MB: keterangan_MB.value,
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

    btn_perkiraanMP.addEventListener("click", async function (event) {
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
                                url: "/Kencana/UpdateDetailBKM/getKira",
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
                    id_perkiraanMP.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ket_perkiraanMP.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_perkiraanMK.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKira3" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableKira3")
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
                        const table = $("#tableKira3").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "/Kencana/UpdateDetailBKM/getKira",
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
                        $("#tableKira3 tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableKira3")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_perkiraanMK.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ket_perkiraanMK.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_perkiraanMB.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKira2" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableKira2")
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
                        const table = $("#tableKira2").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "/Kencana/UpdateDetailBKM/getKira",
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
                        $("#tableKira2 tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableKira2")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    id_perkiraanMB.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ket_perkiraanMB.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_ok.addEventListener("click", function (event) {
        event.preventDefault();
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/UpdateDetailBKM/getPelunasan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        bulan: bulan.value,
                        tahun: tahun.value,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Input",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckboxAtas" value="${data}" /> ${data}`;
                    },
                },
                { data: "Id_BKM" },
                { data: "Tgl_Pelunasan" },
                { data: "Id_Pelunasan" },
                { data: "Id_bank" },
                { data: "Jenis_Pembayaran" },
                { data: "Nama_MataUang" },
                { data: "Nilai_Pelunasan" },
                { data: "No_Bukti" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [5], visible: false }],
        });
    });

    let rowDataArray = [];

    $("#table_atas tbody").off("change", 'input[name="penerimaCheckboxAtas"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckboxAtas"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckboxAtas"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_atas.row($(this).closest("tr")).data();
                rowDataArray.push(rowDataPertama);
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArray = [];
                rowDataPertama = null;
                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_atas);
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

        table_rp = $("#table_rp").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/UpdateDetailBKM/getDetailPelunasan",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idPelunasan: data.Id_Pelunasan,
                    });
                },
            },
            columns: [
                {
                    data: "ID_Penagihan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Nilai_Pelunasan" },
                { data: "Pelunasan_Rupiah" },
                { data: "Kode_Perkiraan" },
                { data: "NamaCust" },
                { data: "ID_Detail_Pelunasan" },
            ],
            // columnDefs: [{ targets: [7, 8], visible: false }],
            // paging: false,
            // scrollY: "400px",
            // scrollCollapse: true,
        });

        table_rb = $("#table_rb").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/UpdateDetailBKM/getDetailBiaya",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idPelunasan: data.Id_Pelunasan,
                    });
                },
            },
            columns: [
                {
                    data: "Keterangan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Biaya" },
                { data: "Kode_Perkiraan" },
                { data: "Id_Detail_Pelunasan" },
            ],
            // columnDefs: [{ targets: [7, 8], visible: false }],
            // paging: false,
            // scrollY: "400px",
            // scrollCollapse: true,
        });

        table_rk = $("#table_rk").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/UpdateDetailBKM/getDetailKurang",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        idPelunasan: data.Id_Pelunasan,
                    });
                },
            },
            columns: [
                {
                    data: "Keterangan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "KurangLebih" },
                { data: "Kode_Perkiraan" },
                { data: "Id_Detail_Pelunasan" },
            ],
            // columnDefs: [{ targets: [7, 8], visible: false }],
            // paging: false,
            // scrollY: "400px",
            // scrollCollapse: true,
        });
    });

    let rowDataArrayKedua = [];

    $("#table_rp tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_rp tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKedua = table_rp.row($(this).closest("tr")).data();
                rowDataArrayKedua.push(rowDataKedua);
                console.log(rowDataArrayKedua);
                console.log(rowDataKedua, this, table_rp);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArrayKedua = [];
                rowDataKedua = null;
                console.log(rowDataArrayKedua);
                console.log(rowDataKedua, this, table_rp);
            }
        }
    );

    let rowDataArrayKetiga = [];

    $("#table_rb tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_rb tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKetiga = table_rb.row($(this).closest("tr")).data();
                rowDataArrayKetiga.push(rowDataKetiga);
                console.log(rowDataArrayKetiga);
                console.log(rowDataKetiga, this, table_rb);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArrayKetiga = [];
                rowDataKetiga = null;
                console.log(rowDataArrayKetiga);
                console.log(rowDataKetiga, this, table_rb);
            }
        }
    );

    let rowDataArrayKeempat = [];

    $("#table_rk tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_rk tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataKeempat = table_rk.row($(this).closest("tr")).data();
                rowDataArrayKeempat.push(rowDataKeempat);
                console.log(rowDataArrayKeempat);
                console.log(rowDataKeempat, this, table_rk);
            } else {
                // Kosongkan array saat checkbox tidak dicentang
                rowDataArrayKeempat = [];
                rowDataKeempat = null;
                console.log(rowDataArrayKeempat);
                console.log(rowDataKeempat, this, table_rk);
            }
        }
    );

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });
});
