// Form Input
let tanggal = document.getElementById("tanggal");
let jam = document.getElementById("jam");
let lwbp = document.getElementById("lwbp");
let wbp = document.getElementById("wbp");
let kvar = document.getElementById("kvar");
let teknisi = document.getElementById("teknisi");

// tanggal form
var tanggal_Input = document.getElementById("tanggal");
var tanggal_Output = new Date().toISOString().split("T")[0];
tanggal_Input.value = tanggal_Output;

// tanggal awal search
var tanggal_awalInput = document.getElementById("tanggal-awal");
var tanggal_awalOutput = new Date().toISOString().split("T")[0];
tanggal_awalInput.value = tanggal_awalOutput;

// tanggal akhir search
var tanggal_akhirInput = document.getElementById("tanggal-akhir");
var tanggal_akhirOutput = new Date().toISOString().split("T")[0];
tanggal_akhirInput.value = tanggal_akhirOutput;

tanggal_akhirInput.addEventListener("change", function () {
    // Ambil nilai tanggal awal dan tanggal akhir
    var tanggal_awal = new Date(tanggal_awalInput.value);
    var tanggal_akhir = new Date(tanggal_akhirInput.value);

    // Periksa apakah tanggal akhir kurang dari tanggal awal
    if (tanggal_akhir < tanggal_awal) {
        // Tampilkan pesan peringatan menggunakan SweetAlert
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tanggal akhir tidak boleh lebih kecil dari tanggal awal",
            confirmButtonText: "OK",
        }).then((result) => {
            // Set ulang nilai tanggal akhir ke nilai tanggal awal
            tanggal_akhirInput.value = tanggal_awalInput.value;
        });
    }
});
tanggal_awalInput.addEventListener("change", function () {
    // Ambil nilai tanggal awal dan tanggal akhir
    var tanggal_awal = new Date(tanggal_awalInput.value);
    var tanggal_akhir = new Date(tanggal_akhirInput.value);

    // Periksa apakah tanggal awal lebih besar dari tanggal akhir
    if (tanggal_awal > tanggal_akhir) {
        // Set ulang nilai tanggal akhir ke nilai tanggal awal
        tanggal_akhirInput.value = tanggal_awalInput.value;
    }
});

if (jam) {
    function updateCurrentTime() {
        var currentDateTime = new Date();
        var hours = currentDateTime.getHours().toString().padStart(2, "0");
        var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
        var timeString = hours + ":" + minutes;

        jam.value = timeString;
    }
    updateCurrentTime();
}

var currentDateTime = new Date();
var hours = currentDateTime.getHours().toString().padStart(2, "0");
var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
var timeString = hours + ":" + minutes;

jam.value = timeString;

// Form Button
let inputButton = document.getElementById("inputButton");
let cancelButton = document.getElementById("cancelButton");
let updateButton = document.getElementById("updateButton");
let deleteButton = document.getElementById("deleteButton");
let saveButton = document.getElementById("saveButton");
let refreshButton = document.getElementById("refreshButton");

// Checkbox
let nomorpln = document.getElementById("hiddenNomorpln");

function clearForm() {
    // tanggal.value = "";
    nomorpln.value = "";
    // jam.value = "";
    lwbp.value = "";
    wbp.value = "";
    kvar.value = "";
    teknisi.selectedIndex = 0;
    nomorpln.value = "";
    lokasi.selectedIndex = 0;
}

saveButton.disabled = true;
tanggal.disabled = true;
jam.disabled = true;
lwbp.disabled = true;
lokasi.disabled = true;
wbp.disabled = true;
kvar.disabled = true;
teknisi.disabled = true;
updateButton.disabled = false;
deleteButton.disabled = false;

function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        jam.value.trim() !== "" &&
        lwbp.value.trim() !== "" &&
        lokasi.value.trim() !== "" &&
        wbp.value.trim() !== "" &&
        kvar.value.trim() !== "" &&
        teknisi.value.trim() !== ""
    );
}

[tanggal, jam, lwbp, wbp, kvar, teknisi].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButton.disabled = !checkAllFieldsFilled();
    });
});

// InputButton click
inputButton.addEventListener("click", function () {
    tanggal.disabled = false;
    jam.disabled = false;
    lwbp.disabled = false;
    lokasi.disabled = false;
    wbp.disabled = false;
    kvar.disabled = false;
    teknisi.disabled = false;
    updateButton.disabled = true;
    deleteButton.disabled = true;
    inputButton.disabled = true;
    clearForm();
    $(".checkboxpln").prop("checked", false);
});
// InputButton click
updateButton.addEventListener("click", function () {
    var checkboxValues = $(".checkboxpln:checked")
        .map(function () {
            return this.value;
        })
        .get();

    // Check if there are selected checkboxes
    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu data PLN untuk diperbarui.",
        });
        deleteButton.disabled = false;
    } else {
        tanggal.disabled = false;
        jam.disabled = false;
        lwbp.disabled = false;
        lokasi.disabled = false;
        wbp.disabled = false;
        kvar.disabled = false;
        teknisi.disabled = false;
        inputButton.disabled = true;
        deleteButton.disabled = true;
        saveButton.disabled = false;
    }
});

// CancelButton click
cancelButton.addEventListener("click", function () {
    tanggal.disabled = true;
    inputButton.disabled = false;
    jam.disabled = true;
    lwbp.disabled = true;
    lokasi.disabled = true;
    wbp.disabled = true;
    kvar.disabled = true;
    teknisi.disabled = true;
    inputButton.disabled = false;
    updateButton.disabled = false;
    deleteButton.disabled = false;

    clearForm();

    $(".checkboxpln").prop("checked", false);
    // Disable saveButton
    saveButton.disabled = true;
});

// Reload Window
window.addEventListener("beforeunload", function () {
    clearForm();
    $(".checkboxpln").prop("checked", false);
    saveButton.disabled = true;
});

$(document).ready(function () {
    $("#saveButton").click(function () {
        var tanggalValue = $("#tanggal").val();
        var jamValue = $("#jam").val();
        var lwbpValue = $("#lwbp").val();
        var wbpValue = $("#wbp").val();
        var kvarValue = $("#kvar").val();
        var teknisiValue = $("#teknisi").val();
        var lokasiValue = $("#lokasi").val();
        var nomorplnValue = $("#hiddenNomorpln").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: tanggalValue,
            Jam: jamValue,
            LWBP: lwbpValue,
            WBP: wbpValue,
            KVAR: kvarValue,
            Lokasi: lokasiValue,
            Teknisi: teknisiValue,
        };

        if (nomorplnValue) {
            requestData.NomorPLN = nomorplnValue;
        }

        $.ajax({
            url: nomorplnValue ? "/InputPLN/" + nomorplnValue : "/save-pln",
            method: nomorplnValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                if (response.success) {
                    nomorplnValue
                        ? Swal.fire({
                            icon: "success",
                            title: "Data PLN Berhasil Diperbarui!",
                            showConfirmButton: false,
                            timer: 2000,
                        })
                        : Swal.fire({
                            icon: "success",
                            title: "Data PLN Berhasil Disimpan!",
                            showConfirmButton: false,
                            timer: 2000,
                        });

                    tanggal.disabled = true;
                    jam.value = timeString;
                    jam.disabled = true;
                    lwbp.disabled = true;
                    lokasi.disabled = true;
                    wbp.disabled = true;
                    kvar.disabled = true;
                    teknisi.disabled = true;
                    updateButton.disabled = false;
                    inputButton.disabled = false;
                    deleteButton.disabled = false;
                    saveButton.disabled = true;

                    tanggal_Input.value = tanggal_Output;

                    clearForm();
                    dataTable.ajax.reload();

                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Data PLN Tidak Berhasil Disimpan!",
                        text: response.message,
                        showConfirmButton: true,
                    });
                }
            },
            error: function (xhr) {
                Swal.fire({
                    icon: "error",
                    title: "Data PLN Tidak Berhasil Disimpan!",
                    text: xhr.responseJSON?.message || "Terjadi kesalahan pada server.",
                    showConfirmButton: true,
                });

                console.error("Error saving data:", xhr.responseText);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
        tanggal_Input.value = tanggal_Output;
    });

    var dataTable = $("#table-pln").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-pln",
            type: "GET",
            data: function (d) {
                d.date1 = $("#tanggal-awal").val();
                d.date2 = $("#tanggal-akhir").val();
            },
        },
        columns: [
            {
                data: "nomor",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxpln" value="' +
                        data +
                        '">'
                    );
                },
            },
            {
                data: "tanggal",
                render: function (data, type, full, meta) {
                    var date = moment.utc(data).local();
                    return date.format("MM/DD/YYYY");
                },
            },
            {
                data: "jam",
                render: function (data, type, full, meta) {
                    var date = new Date(data + "Z");
                    var hours = date.getUTCHours().toString().padStart(2, "0");
                    var minutes = date
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            { data: "lwbp" },
            { data: "wbp" },
            { data: "kvar" },
            { data: "teknisi" },
            {
                data: "Lokasi",
                render: function (data) {
                    if (data == null) {
                        return "-";
                    } else {
                        return data;
                    }
                },
            },
        ],
    });

    $("#refreshButton").click(function () {
        inputButton.disabled = false;
        saveButton.disabled = true;
        tanggal.disabled = true;
        jam.disabled = true;
        lwbp.disabled = true;
        lokasi.disabled = true;
        wbp.disabled = true;
        kvar.disabled = true;
        teknisi.disabled = true;
        updateButton.disabled = false;
        deleteButton.disabled = false;
        clearForm();
        dataTable.ajax.reload();
        $(".checkboxpln").prop("checked", false);
    });

    $("#PrintData").on("click", function () {
        // Mengambil data dari DataTables
        var tableData = dataTable.rows().data();
        if (tableData.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tidak ada data dalam tabel.",
            });
            return; // Stop execution if there's no data
        }

        // Membuat format cetakan
        var printContent =
            '<h2>Data PLN</h2><table border="1" style="width: auto;">';
        printContent += "<thead><tr>";
        printContent +=
            "<th style='min-width: 50px;'style='min-width: 50px;'>No</th>";
        printContent += "<th style='min-width: 100px;'>Tanggal</th>";
        printContent += "<th style='min-width: 90px;'>Jam</th>";
        printContent += "<th style='min-width: 90px;'>LWBP</th>";
        printContent += "<th style='min-width: 90px;'>WBP</th>";
        printContent += "<th style='min-width: 90px;'>KVAR</th>";
        printContent += "<th style='min-width: 100px;'>Teknisi</th>";
        printContent += "<th style='min-width: 100px;'>Lokasi</th>";

        // Tambahkan header lainnya sesuai kebutuhan
        printContent += "</tr></thead><tbody>";

        var rowCount = 0;
        // Menambahkan data ke dalam format cetakan
        $("#table-pln tbody tr").each(function (index) {
            var rowData = $(this).find("td");
            rowCount++;
            printContent += "<tr>";
            printContent +=
                "<td style='text-align: center; page-break-inside: avoid;'>" +
                rowCount +
                "</td>"; // Nomor urut

            for (var i = 1; i <= 7; i++) {
                printContent += "<td >" + rowData.eq(i).text() + "</td>";
            }
            printContent += "</tr>";
        });

        printContent += "</tbody></table>";

        // Membuka jendela baru dan mencetak konten
        var printWindow = window.open("", "_blank");
        printWindow.document.write(
            "<html><head><title>DataTables Print</title>"
        );
        printWindow.document.write('<style type="text/css">');
        printWindow.document.write("@media print {");
        printWindow.document.write("body { display: block; margin: 0 auto; }");
        printWindow.document.write("table { margin: 0 auto; }");
        printWindow.document.write("}</style></head><body>");
        printWindow.document.write(printContent);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxpln", function () {
        if ($(this).prop("checked")) {
            var selectedRow = $(this).closest("tr");
            var selectedNomorPLN = $(this).val();

            $.ajax({
                url: "/get-pln-id",
                type: "GET",
                data: { id: selectedNomorPLN },
                beforeSend: function () {
                    // Show loading screen
                    $("#loading-screen").css("display", "flex");
                },
                success: function (data) {
                    console.log(data);
                    var selectedDate = data.tanggal;
                    var startHours = new Date(data.jam + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var startMinutes = new Date(data.jam + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jam.value = startHours + ":" + startMinutes;
                    var selectedLWBP = data.lwbp;
                    var selectedWBP = data.wbp;
                    var selectedKVAR = data.kvar;
                    var selectedTeknisi = data.teknisi;

                    $("#hiddenNomorpln").val(selectedNomorPLN);
                    $("#tanggal").val(selectedDate);
                    // $("#jam").val(selectedJam);
                    $("#lwbp").val(selectedLWBP);
                    $("#wbp").val(selectedWBP);
                    $("#kvar").val(selectedKVAR);
                    $("#teknisi").val(selectedTeknisi);
                    $("#lokasi").val(data.Id_Lokasi_PLN);
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
                complete: function () {
                    // Hide loading screen
                    $("#loading-screen").css("display", "none");
                },
            });
        } else {
            clearForm();
            $("#tanggal").val(tanggal_Output);
        }
    });

    // DeleteButton click
    $("#deleteButton").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxpln:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu data PLN untuk dihapus.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus data PLN yang terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var requestData = {
                    Nomor: checkboxValues,
                };

                $.ajax({
                    url: "/delete-pln",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    beforeSend: function () {
                        // Show loading screen
                        $("#loading-screen").css("display", "flex");
                    },
                    success: function (response) {
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data PLN Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        clearForm();
                        dataTable.ajax.reload();
                    },
                    error: function (error) {
                        console.error(
                            "Error delete Data : ",
                            error.responseText
                        );
                    },
                    complete: function () {
                        // Hide loading screen
                        $("#loading-screen").css("display", "none");
                    },
                });
            }
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------------- //
// Panel sdp //

// Form Input
let produksisdp = document.getElementById("produksi-sdp");
let tanggalsdp = document.getElementById("tanggal-sdp");
let jamsdp = document.getElementById("jam-sdp");
let kwhsdp = document.getElementById("kwh-sdp");
let ct_faktorsdp = document.getElementById("ct_faktor-sdp");
let teknisisdp = document.getElementById("teknisi-sdp");

// tanggal form
var tanggal_Input = document.getElementById("tanggal-sdp");
var tanggal_Output = new Date().toISOString().split("T")[0];
tanggal_Input.value = tanggal_Output;

// jam form
jamsdp.value = timeString;

// Form Button
let inputButtonsdp = document.getElementById("inputButton-sdp");
let cancelButtonsdp = document.getElementById("cancelButton-sdp");
let updateButtonsdp = document.getElementById("updateButton-sdp");
let deleteButtonsdp = document.getElementById("deleteButton-sdp");
let saveButtonsdp = document.getElementById("saveButton-sdp");
let refreshButtonsdp = document.getElementById("refreshButton-sdp");

// Checkbox
let nomorsdp = document.getElementById("hiddenNomorSDP");

function clearFormsdp() {
    // produksisdp.value = "";
    // jamsdp.value = "";
    kwhsdp.value = "";
    ct_faktorsdp.value = "";
    teknisisdp.value = "";
    nomorsdp.value = "";
}

saveButtonsdp.disabled = true;
produksisdp.disabled = true;
tanggalsdp.disabled = true;
jamsdp.disabled = true;
kwhsdp.disabled = true;
ct_faktorsdp.disabled = true;
teknisisdp.disabled = true;
updateButtonsdp.disabled = false;
deleteButtonsdp.disabled = false;

function checkAllFieldsFilled1() {
    return (
        produksisdp.value.trim() !== "" &&
        tanggalsdp.value.trim() !== "" &&
        jamsdp.value.trim() !== "" &&
        kwhsdp.value.trim() !== "" &&
        teknisisdp.value.trim() !== ""
    );
}

[produksisdp, tanggalsdp, jamsdp, kwhsdp, ct_faktorsdp, teknisisdp].forEach(
    function (inputField) {
        inputField.addEventListener("input", function () {
            saveButtonsdp.disabled = !checkAllFieldsFilled1();
        });
    }
);

// InputButton click
inputButtonsdp.addEventListener("click", function () {
    produksisdp.disabled = false;
    tanggalsdp.disabled = false;
    jamsdp.disabled = false;
    kwhsdp.disabled = false;
    ct_faktorsdp.disabled = false;
    teknisisdp.disabled = false;
    updateButtonsdp.disabled = true;
    deleteButtonsdp.disabled = true;
    nomorsdp.value = "";
    $(".checkboxsdp").prop("checked", false);
    clearFormsdp();
});
// UpdateButton click
updateButtonsdp.addEventListener("click", function () {
    var checkboxValues = $(".checkboxsdp:checked")
        .map(function () {
            return this.value;
        })
        .get();

    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih setidaknya satu data SDP untuk update.",
        });
        inputButtonsdp.disabled = false;
        deleteButtonsdp.disabled = false;
    } else {
        produksisdp.disabled = false;
        tanggalsdp.disabled = false;
        jamsdp.disabled = false;
        kwhsdp.disabled = false;
        ct_faktorsdp.disabled = false;
        teknisisdp.disabled = false;
        inputButtonsdp.disabled = true;
        deleteButtonsdp.disabled = true;
        saveButton.disabled = true;
    }
});

// CancelButton click
cancelButtonsdp.addEventListener("click", function () {
    produksisdp.disabled = true;
    tanggalsdp.disabled = true;
    jamsdp.disabled = true;
    kwhsdp.disabled = true;
    ct_faktorsdp.disabled = true;
    teknisisdp.disabled = true;
    inputButtonsdp.disabled = false;
    updateButtonsdp.disabled = false;
    deleteButtonsdp.disabled = false;
    // Clear Form
    clearFormsdp();
    $(".checkboxsdp").prop("checked", false);
    // Disable saveButton
    saveButton.disabled = true;
});

// Reload Window
window.addEventListener("beforeunload", function () {
    clearFormsdp();
    $("#bulan-sdp").val("");
    $("#tahun-sdp").val("");
    $("#produksiSearch-sdp").val("");
    // Disable saveButton
    saveButtonsdp.disabled = true;
});

$(document).ready(function () {
    $("#saveButton-sdp").click(function () {
        var produksisdpValue = $("#produksi-sdp").val();
        var tanggalsdpValue = $("#tanggal-sdp").val();
        var jamsdpValue = $("#jam-sdp").val();
        var kwhValue = $("#kwh-sdp").val();
        var teknisisdpValue = $("#teknisi-sdp").val();
        var ctFaktorValue = $("#ct_faktor-sdp").val();
        var nomorsdpValue = $("#hiddenNomorSDP").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData1 = {
            Produksi: produksisdpValue,
            Tanggal: tanggalsdpValue,
            Jam: jamsdpValue,
            KWH: kwhValue,
            ct: ctFaktorValue,
            Teknisi: teknisisdpValue,
        };
        if (nomorsdpValue) {
            requestData1.NomorSDP = nomorsdpValue;
        }
        $.ajax({
            url: nomorsdpValue ? "/update-sdp" : "/save-sdp",
            method: nomorsdpValue ? "PUT" : "POST",
            data: requestData1,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                nomorsdpValue
                    ? Swal.fire({
                        icon: "success",
                        title: "Data sdp Berhasil Diperbarui!",
                        showConfirmButton: false,
                        timer: "2000",
                    })
                    : Swal.fire({
                        icon: "success",
                        title: "Data sdp Berhasil Disimpan!",
                        showConfirmButton: false,
                        timer: "2000",
                    });
                clearFormsdp();
                tanggalsdp.disabled = true;
                jamsdp.disabled = true;
                kwhsdp.disabled = true;
                produksisdp.disabled = true;
                ct_faktorsdp.disabled = true;
                teknisisdp.disabled = true;
                inputButtonsdp.disabled = false;
                updateButtonsdp.disabled = false;
                deleteButtonsdp.disabled = false;
                saveButtonsdp.disabled = true;
                tanggal_Input.value = tanggal_Output;
                jam.value = timeString;

                dataTablesdp.ajax.reload();
            },
            error: function (error) {
                Swal.fire({
                    icon: "failed",
                    title: "Data sdp Tidak Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error saving data:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });

    var dataTablesdp = $("#table-panelsdp").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-sdp",
            type: "GET",
            data: function (d) {
                d.bulan = $("#bulan-sdp").val();
                d.tahun = $("#tahun-sdp").val();
                d.produksi = $("#produksiSearch-sdp").val();
            },
        },
        columns: [
            {
                data: "NoTransaksi",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxsdp" value="' +
                        data +
                        '">'
                    );
                },
            },
            { data: "Produksi" },
            {
                data: "Tanggal",
                render: function (data, type, full, meta) {
                    var date1 = moment.utc(data).local();
                    return date1.format("DD/MM/YYYY");
                },
            },
            {
                data: "Jam",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            { data: "KWH" },
            { data: "Teknisi" },
        ],
    });

    $("#refreshButton-sdp").click(function () {
        inputButtonsdp.disabled = false;
        saveButtonsdp.disabled = true;
        produksisdp.disabled = true;
        tanggalsdp.disabled = true;
        jamsdp.disabled = true;
        kwhsdp.disabled = true;
        ct_faktorsdp.disabled = true;
        teknisisdp.disabled = true;
        updateButtonsdp.disabled = true;
        deleteButtonsdp.disabled = true;
        clearFormsdp();
        dataTablesdp.ajax.reload();
    });

    $("#exitButton-sdp").click(function (e) {
        e.preventDefault();
        clearFormsdp();
        dataTablesdp.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxsdp", function () {
        if ($(this).prop("checked")) {
            deleteButtonsdp.disabled = false;
            updateButtonsdp.disabled = false;

            var selectedNomorsdp = $(this).val();

            $("#hiddenNomorSDP").val(selectedNomorsdp);

            $.ajax({
                url: "/get-sdp-id",
                type: "GET",
                data: { idsdp: selectedNomorsdp },
                beforeSend: function () {
                    // Show loading screen
                    $("#loading-screen").css("display", "flex");
                },
                success: function (data) {
                    produksisdp.value = data.NoProduksi;
                    var date = new Date(data.Tanggal + "Z");
                    tanggalsdp.value = date.toISOString().split("T")[0];
                    var startHours = new Date(data.Jam + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var startMinutes = new Date(data.Jam + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jamsdp.value = startHours + ":" + startMinutes;
                    kwhsdp.value = data.KWH;
                    teknisisdp.value = data.Teknisi;
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
                complete: function () {
                    // Hide loading screen
                    $("#loading-screen").css("display", "none");
                },
            });
        } else {
            clearFormsdp();
        }
    });

    $("#deleteButton-sdp").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxsdp:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu data sdp untuk dihapus.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus data sdp terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var requestData = {
                    NomorSDP: checkboxValues,
                };

                $.ajax({
                    url: "/delete-sdp",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        dataTablesdp.ajax.reload();
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data sdp Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        console.log("data sdp delete successfully", response);
                        jam.value = timeString;
                        tanggal_Input.value = tanggal_Output;
                    },
                    error: function (error) {
                        console.error(
                            "Error delete Data : ",
                            error.responseText
                        );
                    },
                });
            }
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------------- //
// Berita Acara //

// Form Input
let nomorBA = document.getElementById("nomor-ba");
let tanggalBA = document.getElementById("tanggal-ba");
let lwbpBA = document.getElementById("lwbp-ba");
let wbpBA = document.getElementById("wbp-ba");
let kvarhBA = document.getElementById("kvarh-ba");
let kvaBA = document.getElementById("kva-ba");
let posisiJamBA = document.getElementById("posisijam-ba");
let timeswitchBA = document.getElementById("timeswitch-ba");
let pelangganBA = document.getElementById("pelanggan-ba");
let pembacaBA = document.getElementById("pembaca-ba");

// tanggal form
var tanggal_Output = new Date().toISOString().split("T")[0];
tanggalBA.value = tanggal_Output;

//jam form
posisiJamBA.value = timeString;
timeswitchBA.value = timeString;

// Form Button
let inputButtonBA = document.getElementById("inputButton-ba");
let cancelButtonBA = document.getElementById("cancelButton-ba");
let updateButtonBA = document.getElementById("updateButton-ba");
let deleteButtonBA = document.getElementById("deleteButton-ba");
let saveButtonBA = document.getElementById("saveButton-ba");
let refreshButtonBA = document.getElementById("refreshButton-ba");

function clearFormBA() {
    nomorBA.value = "";
    lwbpBA.value = "";
    wbpBA.value = "";
    kvarhBA.value = "";
    kvaBA.value = "";
    posisiJamBA.value = "";
    timeswitchBA.value = "";
    pelangganBA.value = "";
    pembacaBA.value = "";
}

nomorBA.disabled = true;
tanggalBA.disabled = true;
lwbpBA.disabled = true;
wbpBA.disabled = true;
kvarhBA.disabled = true;
kvaBA.disabled = true;
posisiJamBA.disabled = true;
timeswitchBA.disabled = true;
pelangganBA.disabled = true;
pembacaBA.disabled = true;

updateButtonBA.disabled = false;
deleteButtonBA.disabled = false;
saveButtonBA.disabled = true;

function checkAllFieldsFilled2() {
    return (
        tanggalBA.value.trim() !== "" &&
        lwbpBA.value.trim() !== "" &&
        wbpBA.value.trim() !== "" &&
        kvarhBA.value.trim() !== "" &&
        kvaBA.value.trim() !== "" &&
        posisiJamBA.value.trim() !== "" &&
        timeswitchBA.value.trim() !== "" &&
        pelangganBA.value.trim() !== "" &&
        pembacaBA.value.trim() !== ""
    );
}

[
    tanggalBA,
    lwbpBA,
    wbpBA,
    kvarhBA,
    kvaBA,
    posisiJamBA,
    timeswitchBA,
    pelangganBA,
    pembacaBA,
].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButtonBA.disabled = !checkAllFieldsFilled2();
    });
});

// CancelButton click
cancelButtonBA.addEventListener("click", function () {
    nomorBA.disabled = true;
    tanggalBA.disabled = true;
    lwbpBA.disabled = true;
    wbpBA.disabled = true;
    kvarhBA.disabled = true;
    kvaBA.disabled = true;
    posisiJamBA.disabled = true;
    timeswitchBA.disabled = true;
    pelangganBA.disabled = true;
    pembacaBA.disabled = true;
    inputButtonBA.disabled = false;
    updateButtonBA.disabled = false;
    deleteButtonBA.disabled = false;

    // Clear Form
    clearFormBA();

    $(".checkboxba").prop("checked", false);
    // Disable saveButton
    saveButtonBA.disabled = true;
});

// Reload Window
window.addEventListener("beforeunload", function () {
    clearFormBA();
    $("#tahun-ba").val("");
    // Disable saveButton
    saveButtonBA.disabled = true;
});

$(document).ready(function () {
    var mode = "insert";

    // InputButton click
    inputButtonBA.addEventListener("click", function () {
        mode = "insert";
        nomorBA.disabled = false;
        tanggalBA.disabled = false;
        lwbpBA.disabled = false;
        wbpBA.disabled = false;
        kvarhBA.disabled = false;
        kvaBA.disabled = false;
        posisiJamBA.disabled = false;
        timeswitchBA.disabled = false;
        pelangganBA.disabled = false;
        pembacaBA.disabled = false;
        updateButtonBA.disabled = true;
        deleteButtonBA.disabled = true;
        $(".checkboxba").prop("checked", false);
        clearFormBA();
    });

    // UpdateButton click
    updateButtonBA.addEventListener("click", function () {
        var checkboxValues = $(".checkboxba:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu Berita untuk diperbarui.",
            });
        } else {
            mode = "update";
            nomorBA.disabled = false;
            tanggalBA.disabled = false;
            lwbpBA.disabled = false;
            wbpBA.disabled = false;
            kvarhBA.disabled = false;
            kvaBA.disabled = false;
            posisiJamBA.disabled = false;
            timeswitchBA.disabled = false;
            pelangganBA.disabled = false;
            pembacaBA.disabled = false;
            inputButtonBA.disabled = true;
            deleteButtonBA.disabled = true;
        }
    });
    $("#saveButton-ba").click(function () {
        var nomorBAValue = nomorBA.value;
        var tanggalBAValue = tanggalBA.value;
        var lwbpBAValue = lwbpBA.value;
        var wbpBAValue = wbpBA.value;
        var kvarhBAValue = kvarhBA.value;
        var kvaBAValue = kvaBA.value;
        var posisiJamBAValue = posisiJamBA.value;
        var timeswitchBAValue = timeswitchBA.value;
        var pelangganBAValue = pelangganBA.value;
        var pembacaBAValue = pembacaBA.value;

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData2 = {
            nomorBA: nomorBAValue,
            TanggalBA: tanggalBAValue,
            lwbpBA: lwbpBAValue,
            wbpBA: wbpBAValue,
            kvarhBA: kvarhBAValue,
            kvaBA: kvaBAValue,
            posisiJamBA: posisiJamBAValue,
            timeswitchBA: timeswitchBAValue,
            pelangganBA: pelangganBAValue,
            pembacaBA: pembacaBAValue,
        };

        var url = mode === "insert" ? "/save-ba" : "/update-ba";
        var method = mode === "insert" ? "POST" : "PUT";
        var alert =
            mode === "insert"
                ? Swal.fire({
                    icon: "success",
                    title: "Data Berita Acara Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                })
                : Swal.fire({
                    icon: "success",
                    title: "Data Berita Acara Berhasil Diperbarui!",
                    showConfirmButton: false,
                    timer: "2000",
                });

        $.ajax({
            url: url,
            method: method,
            data: requestData2,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                alert;
                clearFormBA();
                inputButtonBA.disabled = false;
                deleteButtonBA.disabled = false;
                nomorBA.disabled = true;
                tanggalBA.disabled = true;
                lwbpBA.disabled = true;
                wbpBA.disabled = true;
                kvarhBA.disabled = true;
                kvaBA.disabled = true;
                posisiJamBA.disabled = true;
                timeswitchBA.disabled = true;
                pelangganBA.disabled = true;
                pembacaBA.disabled = true;
                inputButtonBA.disabled = false;
                updateButtonBA.disabled = false;
                deleteButtonBA.disabled = false;
                saveButtonBA.disabled = true;
                tanggalBA.value = tanggal_Output;
                dataTableBA.ajax.reload();
            },
            error: function (error) {
                Swal.fire({
                    icon: "failed",
                    title: "Data PLN Tidak Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error saving data:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });

    var dataTableBA = $("#table-berita").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-ba",
            type: "GET",
            data: function (d) {
                d.tahun = $("#tahun-ba").val();
            },
        },
        columns: [
            {
                data: "Nomor",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxba" value="' +
                        data +
                        '">'
                    );
                },
            },
            {
                data: "Nomor",
            },
            {
                data: "Tanggal",
                render: function (data, type, full, meta) {
                    var date = moment.utc(data).local();
                    return date.format("DD/MM/YYYY");
                },
            },
            { data: "LWBP" },

            { data: "WBP" },
            { data: "KVARH" },
            { data: "KVA_MAKS" },
            {
                data: "Posisi_Jam",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            {
                data: "Time_Switch",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            { data: "Pelanggan" },
            { data: "PembacaMeter" },
        ],
    });

    $("#refreshButton-ba").click(function () {
        inputButtonBA.disabled = false;
        saveButtonBA.disabled = true;
        updateButtonBA.disabled = false;
        deleteButtonBA.disabled = false;
        clearFormBA();
        dataTableBA.ajax.reload();
    });

    $("#exitButton-ba").click(function (e) {
        e.preventDefault();
        clearFormBA();
        dataTablesdp.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxba", function () {
        if ($(this).prop("checked")) {
            var selectedRow = $(this).closest("tr");
            var selectedIdBA = $(this).val();
            var selectedDate = selectedRow.find("td:eq(2)").text();
            var formattanggal = moment(selectedDate, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
            );
            var selectedLWBP = selectedRow.find("td:eq(3)").text();
            var selectedWBP = selectedRow.find("td:eq(4)").text();
            var selectedKVARH = selectedRow.find("td:eq(5)").text();
            var selectedKVA = selectedRow.find("td:eq(6)").text();
            var selectedPosisi = selectedRow.find("td:eq(7)").text();
            var selectedTime = selectedRow.find("td:eq(8)").text();
            var selectedPelanggan = selectedRow.find("td:eq(9)").text();
            var selectedPembaca = selectedRow.find("td:eq(10)").text();

            nomorBA.value = selectedIdBA;
            tanggalBA.value = formattanggal;
            lwbpBA.value = selectedLWBP;
            wbpBA.value = selectedWBP;
            kvarhBA.value = selectedKVARH;
            kvaBA.value = selectedKVA;
            posisiJamBA.value = selectedPosisi;
            timeswitchBA.value = selectedTime;
            pelangganBA.value = selectedPelanggan;
            pembacaBA.value = selectedPembaca;
        } else {
            clearFormBA();
        }
    });

    // DeleteButton click
    $("#deleteButton-ba").click(function (e) {
        e.preventDefault();

        var checkboxValues = $(".checkboxba:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu Berita untuk dihapus.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus data Berita Acara terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var csrfToken = $('meta[name="csrf-token"]').attr("content");
                var requestData3 = {
                    Nomor: checkboxValues,
                };

                $.ajax({
                    url: "/delete-ba",
                    method: "DELETE",
                    data: requestData3,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    beforeSend: function () {
                        // Show loading screen
                        $("#loading-screen").css("display", "flex");
                    },
                    success: function (response) {
                        dataTableBA.ajax.reload();
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data Berita Acara Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        console.log(
                            "data berita acara delete successfully",
                            response
                        );
                    },
                    error: function (error) {
                        console.error(
                            "Error delete Data : ",
                            error.responseText
                        );
                    },
                    complete: function () {
                        // Hide loading screen
                        $("#loading-screen").css("display", "none");
                    },
                });
            }
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------------- //
