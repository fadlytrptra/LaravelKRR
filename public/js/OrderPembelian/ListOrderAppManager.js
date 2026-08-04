let selectDivisi = document.getElementById("select_divisi");
let filter_radioButtonDivisi = document.getElementById(
    "filter_radioButtonDivisi"
);
let nomor_order = document.getElementById("nomor_order");
let filter_radioButtonNomorOrder = document.getElementById(
    "filter_radioButtonNomorOrder"
);
let tglAwal = document.getElementById("tglAwal");
let jamAwal = document.getElementById("jamAwal");
let tglAkhir = document.getElementById("tglAkhir");
let jamAkhir = document.getElementById("jamAkhir");
let statusPengadaan = document.getElementById("status_beliPengadaanPembelian");
let statusBeliSendiri = document.getElementById("status_beliBeliSendiri");
let buttonRedisplay = document.getElementById("button_redisplay");
let tableListOrder = document.getElementById("table_ListOrder");
let checkedAll = document.getElementById("CheckedAll");
let btnPrint = document.getElementById("btn_print");
let checked = document.getElementsByName("checked");

let currentDate = new Date();
checkedAll.disabled = true;
tglAwal.valueAsDate = currentDate;
jamAwal.value =
    ("0" + currentDate.getHours()).slice(-2) +
    ":" +
    ("0" + currentDate.getMinutes()).slice(-2);
tglAkhir.valueAsDate = currentDate;
jamAkhir.value =
    ("0" + currentDate.getHours()).slice(-2) +
    ":" +
    ("0" + currentDate.getMinutes()).slice(-2);

tglAwal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        jamAwal.focus();
    }
});

jamAwal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        tglAkhir.focus();
    }
});

tglAkhir.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        jamAkhir.focus();
    }
});
nomor_order.addEventListener("change", function (event) {
    buttonRedisplay.focus();
});

buttonRedisplay.addEventListener("click", function (event) {
    if (filter_radioButtonDivisi.checked == true) {
        let statusPembelian = 1;
        if (statusPengadaan.checked == true) {
            statusPembelian = 1;
        } else {
            statusPembelian = 0;
        }
        $("#table_ListOrder").DataTable().clear().destroy();
        $('input[type="checkbox"]:checked').prop("checked", false);
        $("#checkedCount").text(`Jumlah Data Yang TerCentang 0`);
        $.ajax({
            url: "/ListOrderAppManager/Redisplay",
            method: "GET",
            data: {
                Kd_Div: selectDivisi.value,
                stBeli: statusPembelian,
                MinDate: tglAwal.value + " " + jamAwal.value,
                MaxDate: tglAkhir.value + " " + jamAkhir.value,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                if (response.recordTotal != 0) {
                    checkedAll.disabled = false;
                }
                console.log(response);
                inisialisasiDataTable(response.data);
            },
            error: function (error) {
                console.error("Error fetching data from server:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    } else if (filter_radioButtonNomorOrder.checked == true) {
        $("#table_ListOrder").DataTable().clear().destroy();
        $('input[type="checkbox"]:checked').prop("checked", false);
        $("#checkedCount").text(`Jumlah Data Yang TerCentang 0`);
        $.ajax({
            url: "/ListOrderAppManager/RedisplayNoOrder",
            method: "GET",
            data: {
                noOrder: nomor_order.value.trim(),
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                if (response.recordTotal != 0) {
                    checkedAll.disabled = false;
                }
                inisialisasiDataTable(response.data);
            },
            error: function (error) {
                console.error("Error fetching data from server:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    }
});

function inisialisasiDataTable(response) {
    let table = $("#table_ListOrder").DataTable({
        processing: true,
        responsive: true,
        scrollX: true,
        scrollY: "400px",
        paging: false,
        // lengthChange:false,
        // pageLength : 500,
        data: response,
        columns: [
            {
                data: "No_trans",
                render: function (data) {
                    return `<input type="checkbox" name="checked" value="${data}" id="${data}" style="width: 20px;height: 20px;" />`;
                },
                orderable: false,
            },
            {
                data: "Tgl_acc",
                render: function (data, type, row) {
                    let parts = data.split(" ")[0].split("-");
                    let tgl =
                        parts[1] +
                        "/" +
                        parts[2] +
                        "/" +
                        parts[0] +
                        " " +
                        data.split(" ")[1].slice(0, 5);
                    return tgl;
                },
            },
            { data: "No_trans" },
            { data: "StatusBeli" },
            { data: "Kd_brg" },
            { data: "NAMA_BRG" },
            { data: "nama_sub_kategori" },
            {
                data: "Qty",
                render: function (data, type, row) {
                    return numeral(data).format("0,0.00");
                }
            },
            { data: "Nama_satuan" },
            { data: "Nama" },
            { data: "NM_DIV" },
            {
                data: "Tgl_Dibutuhkan",
                render: function (data) {
                    let parts = data.split(" ")[0].split("-");
                    let tgl = parts[1] + "/" + parts[2] + "/" + parts[0];
                    return tgl;
                },
            },
            {
                data: "keterangan",
                render: function (data) {
                    return data == "-"
                        ? '<p style="text-align:center;font-size: 14px;">-</p>'
                        : data ||
                        '<p style="text-align:center;font-size: 14px;">-</p>';
                },
            },
            {
                data: "Ket_Internal",
                render: function (data) {
                    return data == "-"
                        ? '<p style="text-align:center;font-size: 14px;">-</p>'
                        : data ||
                        '<p style="text-align:center;font-size: 14px;">-</p>';
                },
            },
            {
                data: "HasAttachment",
                className: "text-center",
                render: function (data) {
                    return data ? "Ya" : "Tidak";
                }
            },
            {
                data: "HasAttachment",
                orderable: false,
                searchable: false,
                className: "text-center",
                render: function (data, type, row) {

                    if (!data) {
                        return "";
                    }

                    return `
                    <button
                        type="button"
                        class="btn btn-success btn-sm btn-download-attachment"
                        data-notrans="${row.No_trans}">
                        Print
                    </button>`;
                }
            }
        ],
        columnDefs: [
            {
                targets: 14, // index kolom Attachment
                visible: false
            }
        ]
    });

    $("#table_ListOrder tbody")
        .off("dblclick", "tr")
        .on("dblclick", "tr", function () {
            let checkbox = $(this).find('input[type="checkbox"]');
            checkbox.prop("checked", !checkbox.prop("checked"));
            let checkedCount = $(
                '#table_ListOrder tbody input[type="checkbox"]:checked'
            ).length;

            $("#checkedCount").text(
                `Jumlah Data Yang TerCentang ${checkedCount}`
            );
        });
    $("#table_ListOrder tbody").on(
        "change",
        'input[type="checkbox"]',
        function () {
            let checkedCount = $(
                '#table_ListOrder tbody input[type="checkbox"]:checked'
            ).length;
            $("#checkedCount").text(
                `Jumlah Data Yang TerCentang ${checkedCount}`
            );
        }
    );
    $("#table_ListOrder tbody")
        .off("click", ".btn-download-attachment")
        .on("click", ".btn-download-attachment", function () {

            let noTrans = $(this).data("notrans");

            let checkUrl = `/FinalApprove/getDokumentasi/${noTrans}`;
            let downloadUrl = `/FinalApprove/downloadDokumentasi/${noTrans}`;

            fetch(checkUrl)
                .then(response => {

                    if (response.status === 204 || !response.ok) {
                        Swal.fire({
                            icon: "warning",
                            title: "Dokumentasi tidak ada"
                        });
                        return;
                    }

                    window.open(`/FinalApprove/printDokumentasi/${noTrans}`, "_blank");
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal mengecek dokumentasi"
                    });
                });
        });
}

checkedAll.addEventListener("click", function (event) {
    let table = $("#table_ListOrder").DataTable();
    let rows = table
        .rows({
            search: "applied",
        })
        .nodes();
    if (checkedAll.checked == true) {
        $('input[type="checkbox"]', rows).prop("checked", true);
        let checkedCount = $(
            '#table_ListOrder tbody input[type="checkbox"]:checked'
        ).length;

        $("#checkedCount").text(`Jumlah Data Yang TerCentang ${checkedCount}`);
    } else {
        $('input[type="checkbox"]', rows).prop("checked", false);
        let checkedCount = $(
            '#table_ListOrder tbody input[type="checkbox"]:checked'
        ).length;

        $("#checkedCount").text(`Jumlah Data Yang TerCentang ${checkedCount}`);
    }
});
btnPrint.addEventListener("click", function () {
    let checkedRowData = [];
    let checkboxes = document.querySelectorAll('input[name="checked"]:checked');

    checkboxes.forEach(function (checkbox) {
        let rowData = [];
        let row = checkbox.parentNode.parentNode;

        // ambil data row DataTable
        let table = $("#table_ListOrder").DataTable();
        let dataRow = table.row(row).data();

        row.querySelectorAll("td").forEach(function (cell, index) {

            // skip checkbox, StatusBeli, dan Attachment
            if (index > 0 && index != 3 && index != 14) {

                let cellText = cell.textContent.trim();
                rowData.push(cellText);
            }

        });

        // tambahkan kolom Attachment paling kanan
        rowData.push(
            dataRow.HasAttachment ? "Ya" : "Tidak"
        );

        checkedRowData.push(rowData);
    });

    if (checkedRowData.length > 0 && checkedRowData[0].length > 0) {

        let headerRow = [
            "Tgl. & Jam Approve",
            "No. Order",
            "Kode Barang",
            "Nama Barang",
            "Sub Kategori",
            "Qty.",
            "Satuan",
            "User",
            "Divisi",
            "Tgl. Dibutuhkan",
            "Keterangan Order",
            "Keterangan Internal",
            "Attachment"
        ];

        checkedRowData.unshift(headerRow);

        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(checkedRowData);

        ws["!cols"] = [];

        headerRow.forEach(function (_, index) {
            ws["!cols"][index] = {
                wch: 15,
                s: {
                    wrapText: true
                }
            };
        });

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        let fileName =
            window.prompt("Masukkan nama file (tanpa ekstensi):") || "data";

        if (!fileName.endsWith(".xlsx")) {
            fileName += ".xlsx";
        }

        XLSX.writeFile(wb, fileName);

    } else {
        alert("Pilih Data Yang Akan DiPrint Terlebih Dahulu");
    }
});

$(document).ready(function () {
    $.ajax({
        url: "/ListOrderAppManager/Divisi",
        type: "GET",
        beforeSend: function () {
            // Show loading screen
            $("#loading-screen").css("display", "flex");
        },
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.KD_DIV;
                option.text = data.NM_DIV;
                selectDivisi.add(option);
            });
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
        complete: function () {
            // Hide loading screen
            $("#loading-screen").css("display", "none");
        },
    });
});
