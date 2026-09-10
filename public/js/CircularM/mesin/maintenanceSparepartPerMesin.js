let button_tambahSparepartPerMesin = document.getElementById("button_tambahSparepartPerMesin"); // prettier-ignore
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
let closeModalButton = document.getElementById("closeModalButton"); // prettier-ignore
const modal_tambah_Mesin = $('#modal_tambah_Mesin'); // prettier-ignore
const modal_tambah_NamaSparepart = $('#modal_tambah_NamaSparepart'); // prettier-ignore
let modal_tambah_ButtonProses = document.getElementById("modal_tambah_ButtonProses"); // prettier-ignore
let modal_tambah_KeteranganSparepart = document.getElementById("modal_tambah_KeteranganSparepart"); // prettier-ignore
let modal_tambah_KodeBarang = document.getElementById("modal_tambah_KodeBarang"); // prettier-ignore
let modal_tambah_namaBarang = document.getElementById("modal_tambah_namaBarang"); // prettier-ignore
let modal_tambah_Lifetime = document.getElementById("modal_tambah_Lifetime"); // prettier-ignore
let modal_tambah_closeButton = document.getElementById("modal_tambah_closeButton"); // prettier-ignore
let dataSparepartUnownedByMesin = []; // Initialize the array to store sparepart data

let table_sparepartPerMesin = $("#table_sparepartPerMesin").DataTable({
    processing: true, // Optional, as processing is more relevant for server-side
    responsive: true,
    ordering: false,
    autoWidth: false,
    data: [], // This will be populated with client-side data
    columns: [
        { data: "Nama_mesin" }, // added this to match "Nama Mesin"
        { data: "NamaSparepart" },
        {
            data: "KodeBarang",
            render: function (data, type, full, meta) {
                if (data == "" || data == null) {
                    return '<span class="text-danger detail-brg">Tidak ada</span>';
                } else {
                    return (
                        '<span class="detail-brg" data-id="' +
                        data +
                        '">' +
                        data +
                        "</span>"
                    );
                }
            },
        },
        { data: "LifeTimeInHour" },
        {
            data: "Id_Sparepart_Mesin_KodeBarang",
            render: function (data, type, full, meta) {
                return (
                    '<button class="btn btn-primary btn-edit" data-id="' +
                    data +
                    '">Edit</button> ' +
                    '<button class="btn btn-danger btn-delete" data-id="' +
                    data +
                    '">Hapus</button>'
                );
            },
        },
    ],
    // order: [[2, "asc"]],
    //     columnDefs: [{ targets: [10, 11, 12, 13], visible: false }],
    paging: false,
    scrollY: "550px",
    scrollCollapse: true,
});

getDataPermohonan();

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

function getDataPermohonan() {
    // Fetch the data from your server using an AJAX call
    $.ajax({
        url: "/MaintenanceSparepartPerMesin/selectAllSparepartPerMesin",
        type: "GET",
        success: function (response) {
            // Check if response.data is empty
            if (response.data && response.data.length > 0) {
                // Assuming your server returns an array of objects for the table data
                table_sparepartPerMesin.clear().rows.add(response.data).draw();
            } else {
                // Clear the table if response.data is empty
                table_sparepartPerMesin.clear().draw();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching data: ", error);
        },
    });
}

function cleanValue(val) {
    return val && val.trim() !== "NULL" ? val.trim() : "";
}

function escapeHtml(text) {
    return text
        ? text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
        : "";
}

function getSelectElementsByType(tipeInitialisasi) {
    const elementSets = {
        showModal: [
            { element: modal_tambah_Mesin, placeholder: "Pilih Mesin" }, // prettier-ignore
            { element: modal_tambah_NamaSparepart, placeholder: "Pilih Sparepart" }, // prettier-ignore
        ],
    };

    return elementSets[tipeInitialisasi] || [];
}

function initializeSelectElement(tipeInitialisasi) {
    // Define an array of select elements and their placeholders based on tipeInitialisasi
    let selectElements = getSelectElementsByType(tipeInitialisasi);

    // Initialize each select element with Select2 and set the placeholder
    selectElements.forEach(({ element, placeholder }) => {
        element.select2({
            dropdownParent: $("#modal_tambahSparepartPerMesinBody"),
            placeholder: placeholder,
        });
    });
}

$(document).ready(function () {
    button_tambahSparepartPerMesin.addEventListener("click", function (event) {
        event.preventDefault();
        $("#modal_tambahSparepartPerMesin").modal("show");
        $('#modal_tambah_ButtonProses').data('id', null);
    });

    $("#modal_tambahSparepartPerMesin").on("shown.bs.modal", function (event) {
        initializeSelectElement("showModal");
        let dataId = $("#modal_tambah_ButtonProses").data("id");

        if (dataId) {
            $("#modal_tambah_NamaSparepart").prop("disabled", false).trigger("change"); // prettier-ignore
        } else {
            $("#modal_tambah_NamaSparepart").prop("disabled", true).trigger("change"); // prettier-ignore
        }

        modal_tambah_Mesin.focus();
    });

    $("#modal_tambahSparepartPerMesin").on("hidden.bs.modal", function (event) {
        modal_tambah_Mesin.prop("selectedIndex", 0).trigger("change");
        modal_tambah_NamaSparepart.prop("selectedIndex", 0).trigger("change");
        modal_tambah_KodeBarang.value = "";
        modal_tambah_namaBarang.innerHTML = "";
        modal_tambah_Lifetime.value = "";
        modal_tambah_KeteranganSparepart.innerHTML = "";
    });

    modal_tambah_closeButton.addEventListener("click", function () {
        $("#modal_tambahSparepartPerMesin").modal("hide");
    });

    modal_tambah_Mesin.on("select2:select", function () {
        const selectedMesin = $(this).val(); // Get selected Divisi Asal

        // Fetch Kode Barang based on selected customer
        $.ajax({
            url: "/MaintenanceSparepartPerMesin/getSparepartUnownedByMesin",
            method: "GET",
            data: { idmesin: selectedMesin }, // Pass Kode_Customer to the server
            dataType: "json",
            success: function (data) {
                dataSparepartUnownedByMesin = data;
                if (data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            "Tidak ada Sparepart yang bisa dipilih: ", // prettier-ignore
                    });
                } else {
                    data.forEach(function (sparepart) {
                        modal_tambah_NamaSparepart.append(
                            new Option(
                                sparepart.NamaSparepart,
                                sparepart.IdSparepart
                            )
                        );
                    });
                    $("#modal_tambah_NamaSparepart").prop("disabled", false).trigger("change"); // prettier-ignore
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Objek data.",
                });
            },
        }).then(() => {
            setTimeout(() => {
                modal_tambah_NamaSparepart.select2("open");
            }, 200);
        });
    });

    modal_tambah_NamaSparepart.on("select2:select", function () {
        const selectedSparepart = $(this).val(); // Get selected Divisi Asal

        const sparepart = dataSparepartUnownedByMesin.find(
            (item) => item.IdSparepart === selectedSparepart
        );

        modal_tambah_KeteranganSparepart.innerHTML =
            "Keterangan: " + (sparepart.Keterangan ?? "-") +
            "<br>Identification Number: " + (sparepart.IdentificationNumber ?? "-"); // prettier-ignore
        modal_tambah_KodeBarang.focus();
    });

    setInputFilter(
        document.getElementById("modal_tambah_KodeBarang"),
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );

    modal_tambah_KodeBarang.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            let value = modal_tambah_KodeBarang.value.trim();

            if (value.length < 9) {
                // Pad with leading zeros
                value = value.padStart(9, "0");
                modal_tambah_KodeBarang.setCustomValidity(""); // clear error
            } else if (value.length > 9) {
                // Try trimming leading zeros to make it 9 characters
                let original = value;
                while (value.length > 9 && value.startsWith("0")) {
                    value = value.substring(1);
                }

                if (value.length > 9) {
                    // Still too long after removing zeros — invalid
                    modal_tambah_KodeBarang.setCustomValidity("Kode barang harus tepat 9 digit."); // prettier-ignore
                    modal_tambah_KodeBarang.reportValidity();
                    return;
                } else {
                    modal_tambah_KodeBarang.setCustomValidity(""); // clear error
                }
            } else {
                modal_tambah_KodeBarang.setCustomValidity(""); // clear error
            }

            modal_tambah_KodeBarang.value = value;
            console.log("Formatted value: ", value);
            $.ajax({
                url: "/MaintenanceSparepartPerMesin/getNamaBarang",
                data: {
                    kodeBarang: modal_tambah_KodeBarang.value,
                    _token: csrfToken,
                },
                type: "GET",
                success: function (response) {
                    console.log(response);
                    if (response.length === 0) {
                        modal_tambah_namaBarang.innerHTML = "-"; // prettier-ignore
                        modal_tambah_KodeBarang.setCustomValidity("Kode barang tidak ditemukan."); // prettier-ignore
                        modal_tambah_KodeBarang.reportValidity();
                    } else {
                        modal_tambah_namaBarang.innerHTML = response[0].NAMA_BRG; // prettier-ignore
                        modal_tambah_Lifetime.focus();
                    }
                    // modal_tambah_namaBarang.innerHTML = response[0].NamaBarang; // prettier-ignore
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data: ", error);
                },
            });
        }
    });

    modal_tambah_Lifetime.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            modal_tambah_ButtonProses.focus();
        }
    });

    modal_tambah_ButtonProses.addEventListener("click", function (event) {
        event.preventDefault();
        let dataId = $(this).data("id");
        if (dataId) {
            $.ajax({
                url: "MaintenanceSparepartPerMesin",
                type: "POST",
                data: {
                    idStore: "editSparepartPerMesin",
                    idJenisSparepart: dataId,
                    modal_tambah_KodeBarang: modal_tambah_KodeBarang.value,
                    modal_tambah_Lifetime: modal_tambah_Lifetime.value,
                    modal_tambah_Mesin: modal_tambah_Mesin.val(),
                    IdSparepart: modal_tambah_NamaSparepart.val(),
                    _token: csrfToken,
                },
                success: function (response) {
                    if (response.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Terjadi Kesalahan",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    } else {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.success,
                            showConfirmButton: false,
                        });
                        getDataPermohonan();
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: error,
                        showConfirmButton: false,
                    });
                },
            });
        } else {
        }

    });

    $(document).on("click", ".detail-brg", function (e) {
        e.preventDefault();

        // Get the clicked element and the DataTable row
        let $row = $(this).closest("tr");
        let rowData = table_sparepartPerMesin.row($row).data();

        // Now you can access any column from rowData
        let namaMesin = rowData.Nama_mesin;
        let rowID = $(this).data("id");

        $.ajax({
            url: "/MaintenanceSparepartPerMesin/selectKodeBarangSparepartPerMesin",
            data: {
                kodeBarang: rowID,
                namaSubKelompok: namaMesin,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                let kodeBarang = escapeHtml(response[0].KodeBarang?.trim()) || "-"; // prettier-ignore
                let namaType = escapeHtml(response[0].NamaType) || "-";
                let satuanUmum = cleanValue(response[0].SatUmum?.trim());
                let satuanPrimer = cleanValue(response[0].satPrimer?.trim());
                let satuanSekunder = cleanValue(response[0].satSekunder?.trim()); //prettier-ignore
                let saldoPrimer = satuanPrimer ? parseFloat(response[0].SaldoPrimer ?? 0) + " " + satuanPrimer : "-"; // prettier-ignore
                let saldoSekunder = satuanSekunder ? parseFloat(response[0].SaldoSekunder ?? 0) + " " + satuanSekunder : "-"; // prettier-ignore
                let saldoTritier = satuanUmum ? parseFloat(response[0].SaldoTritier ?? 0) + " " + satuanUmum : "-"; // prettier-ignore

                Swal.fire({
                    title: `<strong>Detail Sparepart</strong>`,
                    html: `
                    <table style="text-align:left; width:100%;">
                        <tr><td><b>Kode Barang</b></td><td>: ${kodeBarang}</td></tr>
                        <tr><td><b>Nama Type</b></td><td>: ${namaType}</td></tr>
                        <tr><td><b>Saldo Primer</b></td><td>: ${saldoPrimer}</td></tr>
                        <tr><td><b>Saldo Sekunder</b></td><td>: ${saldoSekunder}</td></tr>
                        <tr><td><b>Saldo Tritier</b></td><td>: ${saldoTritier}</td></tr>
                    </table>
                `,
                    confirmButtonText: "OK",
                    width: 600,
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-edit", function (e) {
        e.preventDefault();
        let rowID = $(this).data("id");
        $("#modal_tambah_ButtonProses").data("id", rowID); // Set the data-id attribute
        $("#modal_tambahSparepartPerMesin").modal("show");
        $.ajax({
            type: "GET",
            url: "/MaintenanceSparepartPerMesin/getSparepartPerMesinById",
            data: {
                _token: csrfToken,
                Id_Sparepart_Mesin_KodeBarang: rowID,
            },
            success: function (response) {
                if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                } else {
                    console.log(response.listSparepart);
                    modal_tambah_Mesin.val(response.selectedSparepart[0].Id_Mesin).trigger("change"); // prettier-ignore
                    response.listSparepart.forEach(function (sparepart) {
                        modal_tambah_NamaSparepart.append(
                            new Option(
                                sparepart.NamaSparepart,
                                sparepart.IdSparepart
                            )
                        );
                    });

                    modal_tambah_NamaSparepart.append(
                        new Option(response.selectedSparepart[0].NamaSparepart, response.selectedSparepart[0].IdSparepart, true, true)
                    ).trigger("change"); // prettier-ignore
                    modal_tambah_KodeBarang.value = response.selectedSparepart[0].KodeBarang; // prettier-ignore
                    modal_tambah_namaBarang.innerHTML = response.selectedSparepart[0].NAMA_BRG; // prettier-ignore
                    modal_tambah_Lifetime.value = parseFloat(response.selectedSparepart[0].LifeTimeInHour ?? 0); // prettier-ignore
                    modal_tambah_KeteranganSparepart.innerHTML =
                        "Keterangan: " + (response.selectedSparepart[0].Keterangan ?? "-") +
                        "<br>Identification Number: " + (response.selectedSparepart[0].IdentificationNumber ?? "-"); // prettier-ignore
                    modal_tambah_Mesin.focus();
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        e.preventDefault();
        let dataId = $(this).data("id");
        Swal.fire({
            title: "Yakin untuk menghapus?",
            text: "Apakah anda yakin untuk menghapus data sparepart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "MaintenanceSparepartPerMesin",
                    type: "POST",
                    data: {
                        idStore: "deleteSparepartPerMesin",
                        idJenisSparepart: dataId,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Terjadi Kesalahan",
                                text: response.error,
                                showConfirmButton: false,
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Success!",
                                text: response.success,
                                showConfirmButton: false,
                            });
                            getDataPermohonan();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Terjadi Kesalahan",
                            text: error,
                            showConfirmButton: false,
                        });
                    },
                });
            } else if (result.isDismissed) {
                // If user cancels, show a message
                Swal.fire(
                    "Pemberitahuan",
                    "Data sparepart tidak jadi dihapus :)",
                    "info"
                );
            }
        });
    });
});
