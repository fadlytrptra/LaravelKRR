var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

var kasKecil = document.getElementById("kasKecil");
var kasBesar = document.getElementById("kasBesar");
var bulanTahun = document.getElementById("bulanTahun");
var BKK = document.getElementById("BKK");
var statusPenagihan = document.getElementById("statusPenagihan");
var mataUang = document.getElementById("mataUang");
var nilaiBKM = document.getElementById("nilaiBKM");
var tanggalBatal = document.getElementById("tanggalBatal");
var alasan = document.getElementById("alasan");
var uraian = document.getElementById("uraian");

var btn_bkk = document.getElementById("btn_bkk");
var btn_proses = document.getElementById("btn_proses");
var btn_koreksi = document.getElementById("btn_koreksi");
var btn_batalBKM = document.getElementById("btn_batalBKM");

let kode = 0;

// var methodkoreksi = document.getElementById("methodkoreksi");
// var formkoreksi = document.getElementById("formkoreksi");

let stat;

statusPenagihan.readOnly = true;
mataUang.readOnly = true;
nilaiBKM.readOnly = true;
BKK.readOnly = true;
uraian.disabled = true;
kasBesar.checked = true;

var tgl = new Date();
var month = String(tgl.getMonth() + 1).padStart(2, "0");
var year = String(tgl.getFullYear()).slice(-2);
var formattedDate = month + year;
bulanTahun.value = formattedDate;
bulanTahun.focus();

if (kasBesar.checked || kasKecil.checked) {
    bulanTahun.focus();
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        bulanTahun.focus();
    }
}

kasBesar.addEventListener("keypress", handleKeyPress);
kasKecil.addEventListener("keypress", handleKeyPress);

let kodeProses = 0;

btn_koreksi.addEventListener("click", function (event) {
    event.preventDefault();
    uraian.disabled = false;
    kodeProses = 1;
    btn_proses.disabled = false;
    btn_proses.focus();
    btn_koreksi.disabled = true;
    btn_batalBKM.disabled = false;
});

btn_batalBKM.addEventListener("click", function (event) {
    event.preventDefault();
    uraian.disabled = true;
    kodeProses = 2;
    btn_proses.disabled = false;
    btn_proses.focus();
    btn_batalBKM.disabled = true;
    btn_koreksi.disabled = false;
});

bulanTahun.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn_bkk.focus();
        updateKode();
    }
});
// fungsi update kode sesuai pilihan
function updateKode() {
    kode = kasBesar.checked ? 4 : kasKecil.checked ? 3 : null;
    console.log(kode);
}

kasBesar.addEventListener("change", updateKode);
kasKecil.addEventListener("change", updateKode);

// button pilih bkm
btn_bkk.addEventListener("click", function (e) {
    console.log(kode);

    if (!(kasBesar.checked || kasKecil.checked)) {
        Swal.fire({
            icon: "error",
            title: "Pilih dulu, Kas Besar atau Kas Kecil ?",
            returnFocus: false,
        }).then(() => {
            kasBesar.focus();
            if (!kasBesar.checked) {
                kasBesar.checked = true;
            }
        });
    } else {
        try {
            Swal.fire({
                title: "BKM",
                html: `
                    <table id="table_list" class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID BKM</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `,
                preConfirm: () => {
                    const selectedData = $("#table_list")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                width: "40%",
                returnFocus: false,
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: "Select",
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                            order: [0, "asc"],
                            ajax: {
                                url: "/Kencana/BatalBKMTransistorisKencana/getBKM",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    kode: kode,
                                    bulanTahun: bulanTahun.value,
                                },
                            },
                            columns: [{ data: "Id_BKM" }],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "100px",
                                },
                            ],
                        });

                        $("#table_list tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                            scrollRowIntoView(this);
                        });

                        const searchInput = $("#table_list_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "table_list"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    BKK.value = result.value.Id_BKM.trim();

                    $.ajax({
                        type: "GET",
                        url: "/Kencana/BatalBKMTransistorisKencana/getDetailBKM",
                        data: {
                            _token: csrfToken,
                            kode: "1",
                            BKK: BKK.value,
                        },
                        success: function (response) {
                            console.log(response);

                            if (response.warning) {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Warning",
                                    text: response.warning,
                                    returnFocus: false,
                                });
                            } else {
                                stat = response[0].Status_Penagihan.trim();
                                statusPenagihan.value =
                                    stat === "N"
                                        ? stat + "o Penagihan"
                                        : stat + "es Penagihan";

                                mataUang.value =
                                    response[0].Nama_MataUang.trim();
                                nilaiBKM.value = parseFloat(
                                    response[0].Nilai_Pelunasan,
                                ).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                });
                                tanggalBatal.value = response[0].Batal
                                    ? response[0].Batal.trim()
                                    : "";
                                alasan.value = response[0].Uraian
                                    ? response[0].Uraian.trim()
                                    : "";
                                uraian.value = response[0].Uraian
                                    ? response[0].Uraian.trim()
                                    : "";
                                // btn_proses.disabled = false;
                                // btn_proses.focus();
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
});

// Function to handle keydown events for table navigation
function handleTableKeydown(e, tableId) {
    const table = $(`#${tableId}`).DataTable();
    const rows = $(`#${tableId} tbody tr`);
    const rowCount = rows.length;

    if (e.key === "Enter") {
        e.preventDefault();
        const selectedRow = table.row(".selected").data();
        if (selectedRow) {
            Swal.getConfirmButton().click();
        } else {
            const firstRow = $(`#${tableId} tbody tr:first-child`);
            if (firstRow.length) {
                firstRow.click();
                Swal.getConfirmButton().click();
            }
        }
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === null || currentIndex >= rowCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null || currentIndex <= 0) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex--;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table
                .page("next")
                .draw("page")
                .on("draw", function () {
                    currentIndex = 0;
                    const newRows = $(`#${tableId} tbody tr`);
                    const selectedRow = $(newRows[currentIndex]).addClass(
                        "selected",
                    );
                    scrollRowIntoView(selectedRow[0]);
                });
        }
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table
                .page("previous")
                .draw("page")
                .on("draw", function () {
                    currentIndex = 0;
                    const newRows = $(`#${tableId} tbody tr`);
                    const selectedRow = $(newRows[currentIndex]).addClass(
                        "selected",
                    );
                    scrollRowIntoView(selectedRow[0]);
                });
        }
    }
}
// Helper function to scroll selected row into view
function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: "nearest" });
}

btn_proses.addEventListener("click", function (e) {
    $.ajax({
        type: "PUT",
        url: "/Kencana/BatalBKMTransistorisKencana/batal",
        data: {
            _token: csrfToken,
            BKK: BKK.value,
            alasan: alasan.value,
            kodeProses: kodeProses,
            uraian: uraian.value,
        },
        success: function (response) {
            console.log(response);

            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.success,
                    returnFocus: false,
                });

                btn_proses.disabled = true;
                btn_batalBKM.disabled = false;
                btn_koreksi.disabled = false;
                uraian.disabled = true;
                alasan.value = "";
                BKK.value = "";
                statusPenagihan.value = "";
                stat = "";
                mataUang.value = "";
                nilaiBKM.value = "0";
                uraian.value = "";
                kodeProses = 0;
            } else if (response.error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.error,
                    returnFocus: false,
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
});

// function populateOptions(options) {
//     idBKMSelect.innerHTML = "";

//     const defaultOption = document.createElement("option");
//     defaultOption.disabled = true;
//     defaultOption.selected = true;
//     defaultOption.innerText = "Id BKM";
//     idBKMSelect.appendChild(defaultOption);

//     options.forEach((entry) => {
//         const option = document.createElement("option");
//         option.value = entry.Id_BKM;
//         option.innerText = entry.Id_BKM;
//         idBKMSelect.appendChild(option);
//     });
// }

// function fetchData(endpoint) {
//     fetch(endpoint)
//         .then((response) => response.json())
//         .then((options) => {
//             populateOptions(options);
//         });
// };

// idBKMSelect.addEventListener('change', function(event) {
//     event.preventDefault();
//     if (idBKMSelect.value) { // Check if a valid idBKM is selected
//         fetch("/getDataBatalBKM/" + idBKMSelect.value)
//             .then((response) => response.json())
//             .then((options) => {
//                 console.log(options);
//                 statusPenagihan.value = options[0].Status_Penagihan;
//                 mataUang.value = options[0].Nama_MataUang;

//                 var nilaiNumber = parseFloat(options[0].Nilai_Pelunasan);
//                 var nilaiDalamFormatKoma = nilaiNumber.toLocaleString();
//                 nilaiBKM.value = nilaiDalamFormatKoma;
//                 alasan.value = options[0].Uraian;
//             });

//             fetch("/cekBatalBKK/" + idBKMSelect.value) // Ganti URL sesuai dengan rute Anda
//             .then((response) => response.json())
//             .then((result) => {
//                 console.log(result[0].Ada);
//                 const adaData = result[0].Ada > 0; // Memeriksa apakah ada data (nilai 1)

//                 // Lakukan sesuatu berdasarkan keberadaan data
//                 if (adaData) {
//                     // Ada data, aktifkan elemen UI yang sesuai
//                     alert("SUDAH Melunasi Kartu Hutang");
//                 } else {
//                     // Tidak ada data, nonaktifkan elemen UI yang sesuai
//                     alert("BELUM Melunasi Kartu Hutang");
//                     btnProses.disabled = false;
//                 }
//             });
//     }
// });

// btnProses.addEventListener('click', function(event) {
//     event.preventDefault();
//     methodkoreksi.value="DELETE";
//     formkoreksi.action = "/deletedata/" + idBKMSelect.value + "/" +alasan.value;
//     formkoreksi.submit();
// })
