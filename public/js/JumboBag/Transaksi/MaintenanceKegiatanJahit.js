jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let nomorUser = document.getElementById("nomorUser").value;
    let tambahKegiatanJahitLabel = document.getElementById("tambahKegiatanJahitLabel");
    let tanggalLog = document.getElementById("tanggalLog");
    let shiftJahit = document.getElementById("shiftJahit");
    let std_waktu = document.getElementById("std_waktu");
    let hasil = document.getElementById("hasil");
    let no_label = document.getElementById("no_label");
    let keterangan_kegiatan = document.getElementById("keterangan_kegiatan");
    let total_hasil = document.getElementById("total_hasil");
    let jumlah_operator = document.getElementById("jumlah_operator");
    let button_tambahKegiatanMesin = document.getElementById("button_tambahKegiatanMesin");
    let closeTambahKegiatanJahitModal = document.getElementById("closeTambahKegiatanJahitModal");
    let btn_add = document.getElementById("btn_add");
    let btn_update = document.getElementById("btn_update");
    let btn_delete = document.getElementById("btn_delete");
    let button_modalProses = document.getElementById("button_modalProses");
    // let tgl_awal = document.getElementById("tgl_awal");
    // let tgl_akhir = document.getElementById("tgl_akhir");
    let table_detail = $("#table_detail").DataTable({
        paging: false,
        scrollY: "500px",
        scrollX: true,
        scrollCollapse: true,
        autoWidth: false,
        responsive: false,
        ordering: false,
        searching: false,
        info: false,
        columnDefs: [
            {
                targets: "_all",
                className: "text-nowrap",
            },
        ],
        // columnDefs: [{ targets: [0, 3], visible: false }],
    });

    let kodeBarangUntukDipilih = null;
    let idLog = null;

    tanggalLog.valueAsDate = new Date();

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

    const slcNamaOperator = $("#nama_operator");
    const customer_tableHit = $("#customer_tableHit");
    const kodebarang_tableHit = $("#kodebarang_tableHit");
    const slcLokasi = document.getElementById("lokasi");
    const slcNamaLine = document.getElementById("namaLine");
    const slcStatus = document.getElementById("status");

    initModal();
    initializeSelect2();

    //#region Functions

    function initModal() {
        // setTimeout(() => {
        //     tanggalLog.focus();
        // }, 200);
        $.ajax({
            url: "/MaintKegiatanJahitJBB/initModalTambahKegiatanMesinPotong",
            method: "GET",
            data: { idTypeMesin: 1 }, // id type mesin 1 = potong
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text: "fetching data machine failed ",
                        returnFocus: false,
                    });
                } else {
                    // namaMesinPotong.empty();
                    // data.dataMesin.forEach(function (item) {
                    //     namaMesinPotong.append(
                    //         new Option(item.Nama_Mesin, item.Id_Mesin), // prettier-ignore
                    //     );
                    // });
                    // namaMesinPotong.val(null).trigger("change");
                    data.dataCustomer.forEach(function (item) {
                        customer_tableHit.append(
                            new Option(item.Nama_Customer + " | " + item.Kode_Customer, item.Kode_Customer), // prettier-ignore
                        );
                    });
                    customer_tableHit.val(null).trigger("change");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Mesin.",
                });
            },
        });

        $.ajax({
            url: "/MaintKegiatanJahitJBB/getOperator",
            method: "GET",
            data: { idTypeMesin: 1 }, // id type mesin 1 = potong
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000, // Auto-close after 1.5 seconds (optional)
                        text: "fetching data machine failed ",
                        returnFocus: false,
                    });
                } else {
                    // namaMesinPotong.empty();
                    // data.dataMesin.forEach(function (item) {
                    //     namaMesinPotong.append(
                    //         new Option(item.Nama_Mesin, item.Id_Mesin), // prettier-ignore
                    //     );
                    // });
                    // namaMesinPotong.val(null).trigger("change");
                    data.forEach(function (item) {
                        slcNamaOperator.append(
                            new Option(item.Kd_Pegawai + " | " + item.Nama_Peg, item.Kd_Pegawai), // prettier-ignore
                        );
                    });
                    slcNamaOperator.val(null).trigger("change");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Mesin.",
                });
            },
        });
    }

    function initializeSelect2() {
        slcNamaOperator.select2({
            dropdownParent: $("#div_parentSelectNamaOperator"),
            placeholder: "Pilih Operator",
        });

        customer_tableHit.select2({
            dropdownParent: $("#div_parentSelectCustomerTableHit"),
            placeholder: "Pilih Customer",
        });

        kodebarang_tableHit.select2({
            dropdownParent: $("#div_parentSelectKodeBarangTableHit"),
            placeholder: "Pilih KB Tabel Hit.",
        });

        $("#nama_operator").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#customer_tableHit").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });

        $("#kodebarang_tableHit").each(function () {
            $(this).next(".select2-container").css({
                flex: "1 1 auto",
                width: "100%",
            });
        });
    }

    function clearAll() {
        tanggalLog.valueAsDate = new Date();
        shiftJahit.value = "";
        slcNamaOperator.val(null).trigger("change");
        customer_tableHit.val(null).trigger("change");
        kodebarang_tableHit.empty();
        kodebarang_tableHit.val(null).trigger("change");
        // $("#" + slcStatus.id).val('S').trigger("change");
        std_waktu.value = "";
        hasil.value = "";
        keterangan_kegiatan.value = "";
        total_hasil.value = "";
        jumlah_operator.value = "";

        tableData = [];
        if ($.fn.DataTable.isDataTable("#table_detail")) {
            table_detail.clear().draw();
        }
        // updateTotal();
        selectedRow = null;
    }

    function updateTotal() {
        const total = {
            totalHasil: 0,
            jumlahOperator: 0,
        };

        const operatorUnik = new Set();

        tableData.forEach((row) => {
            total.totalHasil += parseFloat(row.hasil) || 0;

            // Hitung operator hanya jika status M
            if (row.status?.toString().trim().toUpperCase() === "M") {
                let kodePegawai = row.kode_pegawai?.toString().trim();
                let namaOperator = row.nama_operator?.toString().trim().toLowerCase();

                let identitasOperator = kodePegawai
                    ? `KODE_${kodePegawai}`
                    : namaOperator
                        ? `NAMA_${namaOperator}`
                        : null;

                if (identitasOperator) {
                    operatorUnik.add(identitasOperator);
                }
            }
        });

        total.jumlahOperator = operatorUnik.size;

        total_hasil.value = total.totalHasil.toFixed(2);
        jumlah_operator.value = total.jumlahOperator;
    }

    //#region Enter
    function formatNoLabel(textarea) {
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;

        let before = textarea.value.substring(0, start);
        let after = textarea.value.substring(end);

        if (before.trim() !== "" && !before.endsWith(", ")) {
            let beforeTrim = before.trimEnd();

            textarea.value = beforeTrim + ", " + after;

            let newPosition = beforeTrim.length + 2;

            textarea.setSelectionRange(newPosition, newPosition);
        }
    }

    // Keyboard fisik
    no_label.addEventListener("keydown", function (event) {
        if (event.key === " ") {
            event.preventDefault();
            formatNoLabel(this);
        }
    });

    // Keyboard virtual tablet
    no_label.addEventListener("beforeinput", function (event) {
        if (event.inputType === "insertText" && event.data === " ") {
            event.preventDefault();
            formatNoLabel(this);
        }
    });

    shiftJahit.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            this.value = this.value.toUpperCase();
            slcNamaOperator.select2("open");
        }
    });

    shiftJahit.addEventListener("input", function (e) {
        this.value = this.value.toUpperCase();

        if (this.value !== "" && !["P", "S", "M"].includes(this.value)) {
            Swal.fire({
                icon: "warning",
                title: "Input Tidak Valid",
                text: "Shift hanya boleh diisi P, S, atau M.",
                confirmButtonText: "OK"
            });

            this.value = "";
        }
    });

    std_waktu.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            hasil.select();
        }
    });

    hasil.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            no_label.select();
        }
    });

    no_label.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            keterangan_kegiatan.select();
        }
    });

    //#region Datatable Log

    let userAction = [
        "4405",
        "4221",
        "4259",
        "8982",
        "4451",
        "4199"
    ];

    $("#table_logMesin").on("click", ".btn-edit", function () {
        const id = $(this).data("id");
        idLog = id;
        // Ambil data baris yang dipilih
        const table = $("#table_logMesin").DataTable();
        const rowData = table.row($(this).closest("tr")).data();

        // Bandingkan user login dengan user pemilik data
        if (
            !userAction.includes(String(nomorUser).trim()) &&
            String(nomorUser).trim() !== String(rowData.user_input).trim()
        ) {
            Swal.fire({
                icon: "warning",
                title: "Akses Ditolak!",
                text: "Anda tidak memiliki hak untuk mengedit data milik user lain!",
                confirmButtonText: "OK",
            });

            return;
        }

        // Kosongkan data lama SEBELUM menjalankan AJAX
        clearAll();

        $("#tambahKegiatanJahitModal").modal("show");
        tambahKegiatanJahitLabel.innerHTML =
            "Edit Kegiatan Jahit JBB";

        // AJAX header
        $.ajax({
            url: "MaintKegiatanJahitJBB/getDataEdit",
            type: "GET",
            data: {
                idLog: id,
            },
            success: function (data) {
                console.log("Data header:", data);

                if (!data || !data[0]) {
                    console.error("Data header tidak ditemukan.");
                    return;
                }
                tanggalLog.value = data[0].tanggalLog.split(" ")[0];
                $("#" + slcNamaLine.id).val(data[0].namaLine).trigger("change");
                shiftJahit.value = data[0].shiftJahit;
                total_hasil.value = numeral(data[0].total_hasil).format('0.00');
                jumlah_operator.value = data[0].jumlah_operator;
            },
            error: function (xhr) {
                console.error("Gagal mengambil header:", xhr.responseText);
            },
        });

        // AJAX detail
        $.ajax({
            url: "MaintKegiatanJahitJBB/getDataEditDetail",
            type: "GET",
            data: {
                idLog: id,
            },
            success: function (response) {
                console.log("Data detail:", response);

                const table = $("#table_detail").DataTable();

                // Bersihkan data detail sebelumnya
                table.clear();
                tableData.length = 0;

                if (!response || !Array.isArray(response.data)) {
                    console.error("Format response detail tidak sesuai:", response);
                    table.draw();
                    updateTotal();
                    return;
                }

                response.data.forEach(function (row) {
                    const newRow = {
                        idDetail: row.idDetail,
                        nama_operator: row.nama_operator,
                        kode_pegawai: row.kode_pegawai ?? '',
                        status: row.status,
                        customer: row.customer,
                        kodeBarang: row.kodeBarang,
                        std_waktu: numeral(row.std_waktu).format('0'),
                        hasil: numeral(row.hasil).format('0.00'),
                        no_label: row.no_label ?? '',
                        keterangan_kegiatan: row.keterangan_kegiatan ?? '',
                    };

                    tableData.push(newRow);

                    table.row.add([
                        newRow.idDetail,
                        newRow.nama_operator,
                        newRow.kode_pegawai,
                        newRow.status,
                        newRow.customer,
                        newRow.kodeBarang,
                        newRow.std_waktu,
                        newRow.hasil,
                        newRow.no_label,
                        newRow.keterangan_kegiatan,
                    ]);
                });

                table.draw();
                updateTotal();
            },
            error: function (xhr) {
                console.error("Gagal mengambil detail:", xhr.responseText);
            },
        });
    });

    $('#table_logMesin').on('click', '.btn-delete', function () {
        const id = $(this).data('id');
        console.log(id);

        // Ambil data baris yang dipilih
        const table = $("#table_logMesin").DataTable();
        const rowData = table.row($(this).closest("tr")).data();

        console.log(nomorUser);

        // Bandingkan user login dengan user pemilik data
        if (
            !userAction.includes(String(nomorUser).trim()) &&
            String(nomorUser).trim() !== String(rowData.NomorUser).trim()
        ) {
            Swal.fire({
                icon: "warning",
                title: "Akses Ditolak!",
                text: "Anda tidak memiliki hak untuk menghapus data milik user lain!",
                confirmButtonText: "OK",
            });

            return;
        }

        // idLog = id;
        Swal.fire({
            title: 'Apakah anda yakin ingin menghapus data?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "MaintKegiatanJahitJBB",
                    dataType: "json",
                    type: "POST",
                    data: {
                        _token: csrfToken,
                        proses: 3,
                        idLog: id,
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
                                $("#table_logMesin").DataTable().ajax.reload();
                                // console.log(result);
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

    //#region Datatable Detail

    let tableData = [];
    let selectedRow = null;

    $("#table_detail tbody").on("click", "tr", function () {
        const table = $("#table_detail").DataTable();
        const data = table.row(this).data();

        if (!data) return;

        $("#table_detail tbody tr").removeClass("selected");
        $(this).addClass("selected");

        selectedRow = this;

        const kodePegawai = data[2] ?? "";
        const namaOperator = data[1] ?? "";

        // Jika kode pegawai kosong, gunakan nama operator
        const valueOperator = kodePegawai !== ""
            ? kodePegawai
            : namaOperator;

        const textOperator = kodePegawai !== ""
            ? `${kodePegawai} | ${namaOperator}`
            : namaOperator;

        // Cek apakah option sudah tersedia
        const operatorExists = slcNamaOperator.find("option").filter(function () {
            return this.value == valueOperator;
        }).length > 0;

        // Append jika belum tersedia
        if (!operatorExists) {
            slcNamaOperator.append(
                new Option(
                    textOperator,
                    valueOperator,
                    true,
                    true
                )
            );
        }

        // Pilih operator
        slcNamaOperator
            .val(valueOperator)
            .trigger("change");

        $("#" + slcStatus.id)
            .val(data[3])
            .trigger("change");

        kodeBarangUntukDipilih = data[5];

        customer_tableHit
            .val(data[4])
            .trigger("change")
            .trigger("select2:select");

        std_waktu.value = data[6] ?? "";
        hasil.value = data[7] ?? "";
        no_label.value = data[8] ?? "";
        keterangan_kegiatan.value = data[9] ?? "";
    });

    btn_add.addEventListener("click", async function (event) {
        event.preventDefault();

        // if (customer_tableHit.val() === null || kodebarang_tableHit.val() === null || jenisPotongan == null) {
        //     Swal.fire({
        //         icon: "info",
        //         title: "Info!",
        //         text: "Isi terlebih dahulu datanya!",
        //         showConfirmButton: true,
        //         // timer: 2000
        //     });
        //     btn_proses.disabled = false;
        //     return;
        // }

        if (slcNamaOperator.val() == null) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Isi terlebih dahulu nama operatornya!",
                showConfirmButton: true,
                // timer: 2000
            });
            btn_proses.disabled = false;
            return;
        }

        const table = $("#table_detail").DataTable();
        const data = selectedRow ? table.row(selectedRow).data() : undefined;

        let newRow;

        const selectedOperator = slcNamaOperator.find(":selected").text().trim();
        const operatorParts = selectedOperator.split(" | ");
        if (!data) {
            // Tambah baru atau komponen kosong
            newRow = {
                id_detail: "",
                nama_operator: operatorParts.length > 1
                    ? operatorParts[1].trim()
                    : selectedOperator,
                kode_pegawai: operatorParts.length > 1
                    ? operatorParts[0].trim()
                    : "",
                status: $("#" + slcStatus.id).val(),
                customer: customer_tableHit.val(),
                kodeBarang: kodebarang_tableHit.val(),
                std_waktu: std_waktu.value,
                hasil: hasil.value,
                no_label: no_label.value,
                keterangan_kegiatan: keterangan_kegiatan.value,
            };
        } else {
            newRow = {
                id_detail: "",
                nama_operator: operatorParts.length > 1
                    ? operatorParts[1].trim()
                    : selectedOperator,
                kode_pegawai: operatorParts.length > 1
                    ? operatorParts[0].trim()
                    : "",
                status: $("#" + slcStatus.id).val(),
                customer: customer_tableHit.val(),
                kodeBarang: kodebarang_tableHit.val(),
                std_waktu: std_waktu.value,
                hasil: hasil.value,
                no_label: no_label.value,
                keterangan_kegiatan: keterangan_kegiatan.value,
            };
        }

        tableData.push(newRow);
        updateTotal();

        if ($.fn.DataTable.isDataTable("#table_detail")) {
            const table_detail = $("#table_detail").DataTable();

            table_detail.row
                .add([
                    newRow.id_detail,
                    newRow.nama_operator,
                    newRow.kode_pegawai,
                    newRow.status,
                    newRow.customer,
                    newRow.kodeBarang,
                    newRow.std_waktu,
                    newRow.hasil,
                    newRow.no_label,
                    newRow.keterangan_kegiatan,
                ])
                .draw();
        }
    });



    btn_update.addEventListener("click", function (event) {
        event.preventDefault();

        if (!selectedRow) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang ingin diupdate terlebih dahulu!",
            });
            return;
        }

        const table = $("#table_detail").DataTable();
        const row = table.row(selectedRow);
        const oldData = row.data();

        // Identifikasi operator
        const selectedOperator = slcNamaOperator.find(":selected").text().trim();
        const operatorParts = selectedOperator.split(" | ");

        const updatedRow = [
            oldData[0],
            operatorParts.length > 1
                ? operatorParts[1].trim()
                : selectedOperator,
            operatorParts.length > 1
                ? operatorParts[0].trim()
                : "",
            $("#" + slcStatus.id).val(),
            customer_tableHit.val(),
            kodebarang_tableHit.val(),
            std_waktu.value,
            hasil.value,
            no_label.value,
            keterangan_kegiatan.value,
        ];

        const updatedObject = {
            id_detail: updatedRow[0],
            nama_operator: updatedRow[1],
            kode_pegawai: updatedRow[2],
            status: updatedRow[3],
            customer: updatedRow[4],
            kodeBarang: updatedRow[5],
            std_waktu: updatedRow[6],
            hasil: updatedRow[7],
            no_label: updatedRow[8],
            keterangan_kegiatan: updatedRow[9],
        };

        // Cari index data di tableData
        let index = -1;

        if (oldData[0] != null && String(oldData[0]).trim() !== "") {
            index = tableData.findIndex(
                item => String(item.id_detail) === String(oldData[0])
            );
        } else {
            index = tableData.findIndex(item =>
                String(item.nama_operator ?? "") === String(oldData[1] ?? "") &&
                String(item.kode_pegawai ?? "") === String(oldData[2] ?? "") &&
                String(item.status ?? "") === String(oldData[3] ?? "") &&
                String(item.customer ?? "") === String(oldData[4] ?? "") &&
                String(item.kodeBarang ?? "") === String(oldData[5] ?? "") &&
                String(item.std_waktu ?? "") === String(oldData[6] ?? "") &&
                String(item.hasil ?? "") === String(oldData[7] ?? "") &&
                String(item.no_label ?? "") === String(oldData[8] ?? "") &&
                String(item.keterangan_kegiatan ?? "") === String(oldData[9] ?? "")
            );
        }

        if (index !== -1) {
            tableData[index] = updatedObject;
        } else {
            // Jika data tidak ditemukan, cari berdasarkan posisi baris
            const rowIndex = row.index();

            if (rowIndex < tableData.length) {
                tableData[rowIndex] = updatedObject;
            } else {
                console.log("Data tidak ditemukan:", oldData);
                return;
            }
        }

        // Update DataTables
        row.data(updatedRow).draw(false);

        // Hitung ulang total
        updateTotal();

        // Reset selected
        $(selectedRow).removeClass("selected");
        selectedRow = null;
    });



    btn_delete.addEventListener("click", function (event) {
        event.preventDefault();

        if (!selectedRow) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data yang ingin dihapus terlebih dahulu!",
            });
            return;
        }

        const table = $("#table_detail").DataTable();
        const row = table.row(selectedRow);
        const oldData = row.data();

        const idDetail = oldData[0];

        const isNew =
            idDetail === null ||
            idDetail === undefined ||
            String(idDetail).trim() === "";

        function hapusRow() {

            // Hapus dari tableData
            let index = -1;

            if (!isNew) {
                index = tableData.findIndex(
                    item => String(item.id_detail) === String(idDetail)
                );
            } else {
                index = tableData.findIndex(item =>
                    String(item.kode_pegawai ?? "") === String(oldData[2] ?? "") &&
                    String(item.status ?? "") === String(oldData[3] ?? "") &&
                    String(item.customer ?? "") === String(oldData[4] ?? "") &&
                    String(item.kodeBarang ?? "") === String(oldData[5] ?? "") &&
                    String(item.std_waktu ?? "") === String(oldData[6] ?? "") &&
                    String(item.hasil ?? "") === String(oldData[7] ?? "") &&
                    String(item.no_label ?? "") === String(oldData[8] ?? "") &&
                    String(item.keterangan_kegiatan ?? "") === String(oldData[9] ?? "")
                );
            }

            if (index !== -1) {
                tableData.splice(index, 1);
            }

            // Hapus dari DataTables
            row.remove().draw(false);

            updateTotal();

            // Reset selected
            selectedRow = null;
        }

        // Data baru: hapus langsung
        if (isNew) {
            hapusRow();
            return;
        }

        // Data database: konfirmasi terlebih dahulu
        Swal.fire({
            title: "Apakah anda yakin ingin menghapus data detail?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            reverseButtons: true,
        }).then((result) => {

            if (!result.isConfirmed) return;

            $.ajax({
                url: "MaintKegiatanJahitJBB",
                type: "POST",
                data: {
                    _token: csrfToken,
                    proses: 4,
                    idDetail: idDetail,
                },
                success: function (response) {

                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                        }).then(() => {
                            hapusRow();
                        });

                    } else if (response.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: response.error,
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error(error);
                    console.error(xhr.responseText);

                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Terjadi kesalahan saat menghapus data.",
                    });
                },
            });
        });
    });

    //#region Select2
    $("#" + slcLokasi.id).select2({
        placeholder: "-- Pilih Lokasi --"
    });

    $("#" + slcLokasi.id).on("change", function () {
        const val = $(this).val();
        let allowedType = [];
        switch (val) {
            case "Tropodo":
                table_logMesin = $("#table_logMesin").DataTable({
                    responsive: false,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    autoWidth: false,
                    paging: false,
                    // scrollX: true,
                    scrollX: "500px",
                    scrollY: "500px", // Mengatur tinggi tabel
                    scrollCollapse: true,

                    ajax: {
                        url: "MaintKegiatanJahitJBB/getData",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                lokasi: $("#" + slcLokasi.id).val(),
                            });
                        },
                    },

                    columns: [
                        { data: "idLog" },
                        {
                            data: "tanggalLog_raw",
                            render: function (data, type, row) {
                                if (type === "display") {
                                    return row.tanggalLog;
                                }
                                return data;
                            },
                        },
                        { data: "shiftJahit" },
                        { data: "namaLine" },
                        {
                            data: "total_hasil",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        { data: "jumlah_operator" },
                        { data: "user_input" },
                        {
                            data: null,
                            orderable: false,
                            searchable: false,
                            render: function (data, type, row) {
                                return `
                                <div class="d-flex align-items-center gap-1">
                                    <button class="btn btn-sm btn-warning btn-edit"
                                        style="width:150px; white-space:nowrap;"
                                        data-id="${row.idLog}">
                                        <i class="fa fa-edit"></i> Edit
                                    </button>
                                                
                                    <button class="btn btn-sm btn-danger btn-delete"
                                        style="width:150px; white-space:nowrap;"
                                        data-id="${row.idLog}">
                                        <i class="fa fa-trash"></i> Delete
                                    </button>
                                </div>
                            `;
                            },
                        },
                    ],

                    // columnDefs: [
                    //     {
                    //         targets: 2,
                    //         width: "250px"
                    //     },
                    //     {
                    //         targets: 4,
                    //         width: "150px"
                    //     },
                    //     {
                    //         targets: 5,
                    //         width: "250px"
                    //     }
                    // ],

                    createdRow: function (row) {
                        $(row).find("td").css({
                            "font-family": "Arial",
                            "font-size": "14px",
                            "text-align": "center",
                            "vertical-align": "middle"
                        });
                    },

                    order: [[0, "desc"]],
                });
                break;

            case "Mojosari":
                table_logMesin = $("#table_logMesin").DataTable({
                    responsive: false,
                    processing: true,
                    serverSide: true,
                    destroy: true,
                    autoWidth: false,
                    paging: false,
                    // scrollX: true,
                    scrollX: "500px",
                    scrollY: "500px", // Mengatur tinggi tabel
                    scrollCollapse: true,

                    ajax: {
                        url: "MaintKegiatanJahitJBB/getData",
                        dataType: "json",
                        type: "GET",
                        data: function (d) {
                            return $.extend({}, d, {
                                _token: csrfToken,
                                lokasi: $("#" + slcLokasi.id).val(),
                            });
                        },
                    },

                    columns: [
                        { data: "idLog" },
                        {
                            data: "tanggalLog_raw",
                            render: function (data, type, row) {
                                if (type === "display") {
                                    return row.tanggalLog;
                                }
                                return data;
                            },
                        },
                        { data: "shiftJahit" },
                        { data: "namaLine" },
                        {
                            data: "total_hasil",
                            render: function (data) {
                                return numeral(data || 0).format("0.00");
                            }
                        },
                        { data: "jumlah_operator" },
                        { data: "user_input" },
                        {
                            data: null,
                            orderable: false,
                            searchable: false,
                            render: function (data, type, row) {
                                return `
                                <div class="d-flex align-items-center gap-1">
                                    <button class="btn btn-sm btn-warning btn-edit"
                                        style="width:150px; white-space:nowrap;"
                                        data-id="${row.idLog}">
                                        <i class="fa fa-edit"></i> Edit
                                    </button>
                                                
                                    <button class="btn btn-sm btn-danger btn-delete"
                                        style="width:150px; white-space:nowrap;"
                                        data-id="${row.idLog}">
                                        <i class="fa fa-trash"></i> Delete
                                    </button>
                                </div>
                            `;
                            },
                        },
                    ],

                    // columnDefs: [
                    //     {
                    //         targets: 2,
                    //         width: "250px"
                    //     },
                    //     {
                    //         targets: 4,
                    //         width: "150px"
                    //     },
                    //     {
                    //         targets: 5,
                    //         width: "250px"
                    //     }
                    // ],

                    createdRow: function (row) {
                        $(row).find("td").css({
                            "font-family": "Arial",
                            "font-size": "14px",
                            "text-align": "center",
                            "vertical-align": "middle"
                        });
                    },

                    order: [[0, "desc"]],
                });
                break;
        }
    });

    // default lokasi = 1
    $("#" + slcLokasi.id).val("Tropodo").trigger("change");

    $("#" + slcNamaLine.id).select2({
        placeholder: "-- Pilih Line --",
        dropdownParent: $("#div_parentSelectNamaLine"),
    });

    $("#" + slcNamaLine.id).on("change", function () {
        const val = $(this).val();
        console.log(val);

        let allowedType = [];
        switch (val) {
            // case "Rope":
            //     break;

            // case "Belt":
            //     break;
        }
    });

    slcNamaOperator.on("select2:select", function () {
        const selectedOperator = $(this).val();
        if (selectedRow) {
        } else {
            customer_tableHit.select2("open");
        }
        // if (tambahKegiatanJahitLabel.innerHTML !== "Edit Kegiatan Jahit JBB") {
        //     kodebarang_tableHit.select2("open");
        // } else {
        //     kodebarang_tableHit.select2("open");
        // }
    });

    slcNamaOperator.on("select2:open", function () {
        let searchField = document.querySelector(
            ".select2-container--open .select2-search__field",
        );

        $(searchField)
            .off("keydown.slcNamaOperator")
            .on("keydown.slcNamaOperator", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();

                    let newOperator = $(this).val().trim().toUpperCase();

                    if (newOperator !== "") {
                        // Cek apakah operator sudah tersedia
                        const exists = slcNamaOperator.find("option").filter(function () {
                            return this.value === newOperator;
                        }).length > 0;

                        // Append jika belum tersedia
                        if (!exists) {
                            slcNamaOperator.append(
                                new Option(
                                    newOperator,
                                    newOperator,
                                    true,
                                    true,
                                ),
                            );
                        }

                        slcNamaOperator
                            .val(newOperator)
                            .trigger("change")
                            .trigger("select2:select");

                        slcNamaOperator.select2("close");
                    }
                }
            });
    });

    $("#" + slcStatus.id).select2({
        placeholder: "-- Pilih Status --",
        dropdownParent: $("#div_parentSelectStatus"),
    });

    // $("#" + slcStatus.id).on("select2:open", function () {
    //     $(".select2-results__option").off("mouseup.openCustomer");

    //     $(".select2-results__option").on("mouseup.openCustomer", function () {
    //         setTimeout(() => {
    //             $(customer_tableHit).select2("open");
    //         }, 200);
    //     });
    // });

    $("#" + slcStatus.id).on("change", function () {
        const val = $(this).val();
        console.log(val);
        setTimeout(() => {
            if (selectedRow) {
            } else {
                customer_tableHit.select2("open");
            }
        }, 200);
        let allowedType = [];
        switch (val) {
            // case "Rope":
            //     break;

            // case "Belt":
            //     break;
        }
    });

    customer_tableHit.on("select2:select", function () {
        const selectedCustomer = $(this).val();

        $.ajax({
            url: "/MaintKegiatanJahitJBB/getTabelHitunganByCustomer",
            method: "GET",
            data: {
                kodeCustomer: selectedCustomer,
            },
            dataType: "json",
            success: function (data) {
                kodebarang_tableHit.empty();

                data.forEach(function (item) {
                    kodebarang_tableHit.append(
                        new Option(
                            item.Kode_Barang,
                            item.Kode_Barang
                        )
                    );
                });

                if (kodeBarangUntukDipilih !== null) {
                    const kodeBarang = kodeBarangUntukDipilih;

                    // Cek apakah kode barang sudah tersedia
                    const exists = kodebarang_tableHit.find("option").filter(function () {
                        return this.value == kodeBarang;
                    }).length > 0;

                    // Jika belum tersedia, tambahkan option
                    if (!exists) {
                        kodebarang_tableHit.append(
                            new Option(
                                kodeBarang,
                                kodeBarang,
                                true,
                                true
                            )
                        );
                    }

                    // Pilih kode barang dan jalankan event select2
                    kodebarang_tableHit
                        .val(kodeBarang)
                        .trigger("change")
                        .trigger("select2:select");

                    kodeBarangUntukDipilih = null;
                } else {
                    kodebarang_tableHit.val(null).trigger("change");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kode Barang Tabel Hitungan.",
                });
            },
        }).then(() => {
            if (selectedRow === null) {
                kodebarang_tableHit.select2("open");
            }
        });
    });

    kodebarang_tableHit.on("select2:select", function () {
        const selectedKodeBarang = $(this).val();
        $.ajax({
            url: "/MaintKegiatanJahitJBB/getKomponenByTabelHitungan",
            method: "GET",
            data: {
                kodeBarang: selectedKodeBarang,
            },
            dataType: "json",
            success: function (data) {
                // komponen_tableHit.empty();
                data.forEach(function (item) {

                    // komponen_tableHit.append(
                    //     new Option(
                    //         item.Nama_Komponen +
                    //         " Uk. " +
                    //         numeral(item.Panjang_Potongan).value() +
                    //         " X " +
                    //         numeral(item.Lebar_Potongan).value(),
                    //         item.Kode_Komponen
                    //     )
                    // );

                });
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Kode Barang Tabel Hitungan.",
                });
            },
        }).then(() => {
            if (selectedRow) {

            } else {
                $.ajax({
                    url: "/MaintKegiatanJahitJBB/getSTDWaktu",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        kodeBarang: kodebarang_tableHit.val(),
                    },
                    success: function (data) {
                        console.log(data);
                        std_waktu.value = data.Std_Waktu ?? '';

                        if (std_waktu.value === '') {
                            std_waktu.focus();
                        } else {
                            hasil.focus();
                        }
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    },
                });
            }


        });
    });

    kodebarang_tableHit.on("select2:open", function () {
        let searchField = document.querySelector(
            ".select2-container--open .select2-search__field",
        );

        $(searchField)
            .off("keydown.kodebarang_tableHit")
            .on("keydown.kodebarang_tableHit", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();

                    let newKodeBarang = $(this).val().trim().toUpperCase();

                    if (newKodeBarang !== "") {
                        kodebarang_tableHit.append(
                            new Option(
                                newKodeBarang,
                                newKodeBarang,
                                true,
                                true,
                            ),
                        );

                        kodebarang_tableHit
                            .trigger("change")
                            .trigger("select2:select");

                        kodebarang_tableHit.select2("close");
                        // warnaTinta.focus();
                    }
                }
            });
    });

    //#region Event Listener

    button_tambahKegiatanMesin.addEventListener("click", function () {
        // $("#button_modalProsesPotong").data("id", null);
        tambahKegiatanJahitLabel.innerHTML = "Tambah Kegiatan Jahit JBB"; // prettier-ignore
        $("#tambahKegiatanJahitModal").modal("show");
        clearAll();
    });

    closeTambahKegiatanJahitModal.addEventListener("click", function () {
        $("#tambahKegiatanJahitModal").modal("hide");
    });

    $("#tambahKegiatanJahitModal").on("shown.bs.modal", function (event) {
        // let idLog = $("#button_modalProsesPotong").data("id");

        table_detail.columns.adjust().draw(false);

        $("#table_detail").css({
            width: "100%",
            whiteSpace: "nowrap"
        });

        $("#table_detail_wrapper .dataTables_scrollHeadInner").css({
            width: "max-content"
        });

        $("#table_detail_wrapper .dataTables_scrollHeadInner table").css({
            width: "max-content"
        });

        $("#table_detail_wrapper .dataTables_scrollBody table").css({
            width: "max-content"
        });

        shiftJahit.focus();
        // if (idLog == null) {
        //     // tanggalLogMesinPotong.value = moment().format("YYYY-MM-DD");
        //     // clearAll();
        //     setTimeout(() => {
        //         tanggalLog.focus();
        //     }, 200); // delay in milliseconds (adjust as needed)
        //     // div_alasanEditPotong.style.display = "none";
        // } else {
        //     // alasanEdit.value = "";
        //     // div_alasanEditPotong.style.display = "block";
        // }
    });

    button_modalProses.addEventListener("click", async function (event) {
        event.preventDefault();
        button_modalProses.disabled = true;
        const allRowsDataDetail = table_detail.rows().data().toArray();
        if (
            tanggalLog.value == "" || shiftJahit.value == ""
        ) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Isi tanggal dan shift terlebih dahulu!",
                showConfirmButton: true,
                // timer: 2000
            });
            button_modalProses.disabled = false;
            return;
        }

        $.ajax({
            url: "MaintKegiatanJahitJBB",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: (tambahKegiatanJahitLabel.textContent == "Edit Kegiatan Jahit JBB") ? 2 : 1,
                idLog: idLog,
                lokasi: $("#" + slcLokasi.id).val(),
                tanggalLog: tanggalLog.value,
                namaLine: $("#" + slcNamaLine.id).val(),
                shiftJahit: shiftJahit.value,
                total_hasil: total_hasil.value,
                jumlah_operator: jumlah_operator.value,
                allRowsDataDetail: allRowsDataDetail,
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
                        $("#table_logMesin").DataTable().ajax.reload();
                        $("#tambahKegiatanJahitModal").modal("hide");
                        clearAll();
                        // id_setting = null
                        // btn_batal.click();
                        // btn_redisplay.click();
                        button_modalProses.disabled = false;
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    button_modalProses.disabled = false;
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                button_modalProses.disabled = false;
            },
        });
    });
});