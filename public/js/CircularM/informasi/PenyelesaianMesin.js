jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let jam_berhenti = document.getElementById("jam_berhenti");
    let jam_dijalankan = document.getElementById("jam_dijalankan");
    let masalah = document.getElementById("masalah");
    let penyelesaian = document.getElementById("penyelesaian");
    let btn_proses = document.getElementById("btn_proses");
    let btn_redisplay = document.getElementById("btn_redisplay");

    const slcLokasi = document.getElementById("lokasi");
    const slcTypeMesin = document.getElementById("type_mesin");

    tanggal.valueAsDate = new Date();
    tanggal.readOnly = true;
    jam_berhenti.readOnly = true;
    masalah.readOnly = true;
    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();
    btn_proses.disabled = true;

    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        // headerCallback: function (thead, data, start, end, display) {
        //     $(thead).find("th")
        //         .css("font-family", "Arial")
        //         .css("font-size", "14px")
        //         .css("text-align", "center");
        // },
        paging: false,
        scrollY: "300px",
        scrollX: "300px",
        scrollCollapse: true,
    });

    //#region Function

    function convertToSQLDatetime(dateInput, timeElement) {
        let tgl = dateInput.value;
        if (!tgl) {
            alert("Tanggal belum diisi!");
            return null;
        }

        let jamStr = timeElement.trim();
        if (!jamStr) {
            alert(`${timeElement.id} belum diisi!`);
            return null;
        }

        // Ubah titik jadi titik dua
        jamStr = jamStr.replace('.', ':');

        // Jika belum ada menit, tambahkan :00
        if (!jamStr.includes(':')) {
            jamStr += ':00';
        }

        // Format SQL Server
        let datetimeSQL = `${tgl} ${jamStr}:00`;

        // Validasi tanggal
        let d = new Date(datetimeSQL);
        if (isNaN(d.getTime())) {
            // alert(`Format jam pada ${timeElement.id} tidak valid!`);
            alert(`Format jam tidak valid! Contoh 10.30 atau 10:30`);
            return null;
        }

        // Simpan hasilnya ke value elemen
        timeElement.value = datetimeSQL;

        return datetimeSQL;
    }

    function ambilJam(datetime) {
        if (!datetime) return '';
        return datetime.substring(11, 16); // HH:mm
    }

    //#region Select2

    $(document).ready(function () {

        $("#" + slcLokasi.id).select2({
            placeholder: "-- Pilih Lokasi --"
        });

        $("#" + slcLokasi.id).on("change", function () {

            const val = $(this).val();
            let allowedType = [];
            switch (val) {
                case "1":
                    // Lokasi 1 boleh semua
                    // btn_redisplay.click();
                    allowedType = ["1", "2"];
                    // $("#labelProses").text("Input Data");
                    // $("#btn_proses").text("PROSES");
                    break;

                case "2":
                    // Lokasi 2 hanya type tertentu
                    // btn_redisplay.click();
                    allowedType = ["3"];
                    // $("#labelProses").text("Input Data");
                    // $("#btn_proses").text("PROSES");
                    break;

                case "3":
                    // Lokasi 3 hanya type tertentu
                    // btn_redisplay.click();
                    allowedType = ["4", "5", "6"];
                    // $("#labelProses").text("Input Data");
                    // $("#btn_proses").text("PROSES");
                    break;
            }

            let $type = $("#" + slcTypeMesin.id);

            // reset pilihan
            $type.val(null).trigger("change");

            // filter option
            $type.find("option").each(function () {

                if (!this.value) return;

                if (allowedType.includes(this.value)) {
                    $(this).prop("disabled", false).show();
                } else {
                    $(this).prop("disabled", true).hide();
                }
            });

            // re-init select2 agar refresh
            $type.select2("destroy").select2({
                placeholder: "-- Pilih Type Mesin --"
            });

            // reset mesin
            $("#" + slcMesin.id)
                .empty()
                .append(new Option())
                .prop("disabled", true)
                .trigger("change");
        });

        // default lokasi = 1
        $("#" + slcLokasi.id).val("3").trigger("change");
        $("#" + slcLokasi.id).prop("disabled", true);
    });

    $("#" + slcTypeMesin.id).select2({ placeholder: "-- Pilih Type Mesin --" });
    $("#" + slcTypeMesin.id).on("select2:select", function () {
        $("#" + slcMesin.id)
            .empty()
            .append(new Option())
            .trigger("change");

        slcMesin.prop("disabled", false);
        slcMesin.focus();
        const val = $(this).val();

        setTimeout(() => {
            fetchDataMesin("/getMesinSelect/" + $("#" + slcTypeMesin.id).val());
        }, 300);
    });
    $("#" + slcTypeMesin.id).prop("disabled", true);

    const slcMesin = $("#nama_mesin");
    slcMesin.prop("disabled", true);
    function fetchDataMesin(endpoint, idNama_mesin) {
        fetch(endpoint)
            .then((response) => response.json())
            .then((options) => {
                slcMesin
                    .empty()
                    .append(
                        `<option disabled selected>-- Pilih Mesin --</option>`
                    );

                Promise.all(
                    options.map((entry) => {
                        return new Promise((resolve) => {
                            const displayText = `${entry.Id_mesin} | ${entry.Nama_mesin}`;
                            slcMesin.append(
                                new Option(displayText, entry.Id_mesin)
                            );
                            resolve(); // Resolve after appending
                        });
                    })
                ).then(() => {
                    // if (labelProses.textContent == "Update Data") {
                    //     slcMesin.select2("open");
                    // } else {
                    slcMesin.val(idNama_mesin).trigger("change");
                    slcMesin.prop("disabled", true);
                    // }
                });
            });
    }

    let namaMesin = null;
    slcMesin.select2({
        // dropdownParent: $("#modalAsalKonversi"),
        placeholder: "-- Pilih Mesin --",
    });
    slcMesin.on("change", function () {
        const selectedMesin = $(this).val();
        console.log(selectedMesin);
        if (selectedMesin) {
            if (labelProses.textContent == "Update Data") {
                setTimeout(() => {
                    const text = $(this).find(":selected").text();
                    namaMesin = text.split("|")[1].trim();
                    console.log(namaMesin);
                }, 300);
            }
        }
    });

    //#region Event Listener

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        // btn_proses.disabled = true;
        let jam_berhentiConvert = null;
        if (jam_berhenti.value.trim() !== "") {
            jam_berhentiConvert = convertToSQLDatetime(tanggal, jam_berhenti.value);
            if (jam_berhentiConvert === null) return;
        }

        if ($("#" + slcTypeMesin.id).val() === "" || slcMesin.val() === "" || slcMesin.val() === null || jam_berhentiConvert === null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Type mesin, mesin, dan jam berhenti tidak boleh kosong!",
                showConfirmButton: true,
                // timer: 2000 
            });
            btn_proses.disabled = false;
            return;
        }

        $.ajax({
            url: "PenyelesaianMesinD",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                // proses: (labelProses.textContent == "Koreksi Data") ? 2 : 1,
                proses: 1,
                id_pemberhentian: id_pemberhentian,
                tanggal: tanggal.value,
                idType_mesin: $("#" + slcTypeMesin.id).val(),
                idNama_mesin: slcMesin.val(),
                jam_berhenti: jam_berhentiConvert,
                masalah: masalah.value,
                namaMesin: namaMesin,
                lokasi: $("#" + slcLokasi.id).val(),
                jam_dijalankan: jam_dijalankan.value.replace('T', ' ') + ':00',
                penyelesaian: penyelesaian.value,
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
                        btn_batal.click();
                        btn_redisplay.click();
                        // $("#table_atas").DataTable().ajax.reload();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    btn_proses.disabled = false;
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                btn_proses.disabled = false;
            },
        });
    });

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        // if ($("#" + slcTypeKain.id).val() == 1) {
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "PenyelesaianMesinD/getData",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awal: tgl_awal.value,
                        tgl_akhir: tgl_akhir.value,
                        lokasi: $("#" + slcLokasi.id).val(),
                    });
                },
            },
            columns: [
                { data: "id_pemberhentian" },
                {
                    data: 'tanggal_raw', // Data asli untuk sorting
                    render: function (data, type, row) {
                        // type === 'display' digunakan saat menampilkan di tabel
                        if (type === 'display') {
                            return row.tanggal; // tampilkan versi m/d/Y
                        }
                        return data; // untuk sorting & filtering (yyyy-mm-dd)
                    }
                },
                { data: "Type_Mesin" },
                { data: "Nama_mesin" },
                { data: "jam_berhenti" },
                { data: "jam_dijalankan" },
                { data: "masalah" },
                { data: "penyelesaian" },
                { data: "NamaUser" },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row) {
                        console.log(row.user_selesai);
                        
                        if (row.user_selesai == '') {
                            return `
                                <button class="btn btn-sm btn-success btn-selesai" 
                                    style="width: 120px;"
                                    data-id="${row.id_pemberhentian}">
                                    <i class="fa fa-edit"></i> Selesaikan
                                </button>
                            `;
                        } else {
                            return `
                                <button class="btn btn-sm btn-danger btn-batal"
                                    style="width: 120px;"
                                    data-id="${row.id_pemberhentian}">
                                    <i class="fa fa-trash"></i> Batal Selesai
                                </button>
                            `;
                        }
                    }
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row).css("font-family", "Arial");
                $(row).css("font-size", "14px");
            },
            headerCallback: function (thead, data, start, end, display) {
                $(thead).find("th")
                    .css("font-family", "Arial")
                    .css("font-size", "14px")
                    .css("text-align", "center");
            },
            // order: [[1, "asc"]],
            paging: false,
            scrollY: "300px",
            scrollCollapse: true,
        });
        // }
    });

    let id_pemberhentian = null;
    $('#table_atas').on('click', '.btn-selesai', function () {
        const id = $(this).data('id');
        console.log(id);
        id_pemberhentian = id;
        let data = table_atas.row($(this).closest('tr')).data();
        console.log(data);

        $.ajax({
            url: "PenyelesaianMesinD/getDataKoreksi",
            type: "GET",
            data: {
                _token: csrfToken,
                id_pemberhentian: id,
            },
            success: function (data) {
                console.log(data);
                $("#labelProses").text("Update Data");
                $("#btn_proses").text("Proses Update");
                slcMesin.prop("disabled", false);
                // $("#" + slcBenangWa.id).prop("disabled", false);
                // $("#" + slcBenangWe.id).prop("disabled", false);
                $("#" + slcLokasi.id).val(data.data[0].id_lokasi).trigger("change");
                tanggal.value = data.data[0].tanggal;
                $("#" + slcTypeMesin.id).val(data.data[0].type_mesin).trigger("change");
                fetchDataMesin("/getMesinSelect/" + $("#" + slcTypeMesin.id).val(), data.data[0].nama_mesin);
                jam_berhenti.value = ambilJam(data.data[0].jam_berhenti);
                jam_dijalankan.value = data.data[0].jam_dijalankan;
                masalah.value = data.data[0].masalah;
                penyelesaian.value = data.data[0].penyelesaian;
                setTimeout(() => {
                    jam_dijalankan.focus();
                    $("#" + slcTypeMesin.id).prop("disabled", true);
                    $("#" + slcLokasi.id).prop("disabled", true);
                    tanggal.readOnly = true;
                    btn_proses.disabled = false;
                }, 300);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    $('#table_atas').on('click', '.btn-batal', function () {
        const id = $(this).data('id');
        console.log(id);
        id_pemberhentian = id;
        Swal.fire({
            title: 'Apakah anda yakin ingin batal selesai?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "PenyelesaianMesinD",
                    dataType: "json",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 2,
                        id_pemberhentian: id_pemberhentian,
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
                                $("#table_atas").DataTable().ajax.reload();
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
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        $("#labelProses").text("Update Data");
        $("#btn_proses").text("PROSES");
        slcMesin.prop("disabled", true);
        $("#" + slcTypeMesin.id).prop("disabled", true);
        $("#" + slcLokasi.id).prop("disabled", true);
        tanggal.readOnly = true;
        id_pemberhentian = null;
        tanggal.valueAsDate = new Date();
        $("#" + slcTypeMesin.id).val(null).trigger("change");
        slcMesin.val(null).trigger("change");
        jam_berhenti.value = ambilJam(null);
        jam_dijalankan.value = null;
        masalah.value = '';
        penyelesaian.value = '';
        btn_proses.disabled = true;
    });
});