let bet1 = document.getElementById("betwendate1");
let bet2 = document.getElementById("betwendate2");
let no = document.getElementById("no_po");
let redisplayButton = document.getElementById("redisplayButton");
let lihat_BTTB = document.getElementById("lihat_BTTB");
let btnEmailSupplier = document.getElementById("btn_email_supplier");
let table = $("#yourTableId").DataTable();

bet1.valueAsDate = new Date();
bet2.valueAsDate = new Date();

function getSelectedRadio() {
    return (
        document.querySelector('input[name="radiobutton"]:checked')?.value ??
        null
    );
}

redisplayButton.addEventListener("click", function () {
    let selected = getSelectedRadio();

    $("#tabelchelsy").DataTable().clear().destroy();

    if (selected === "between_date") {
        if (bet1.value > bet2.value) {
            Swal.fire(
                "Info",
                "Tanggal Awal tidak boleh lebih dari Tanggal Akhir",
                "info",
            );
            return;
        }
        redisplay(bet1.value, bet2.value, null);
    }

    if (selected === "nomor_po") {
        const nomorPO = no.value.trim();

        if (nomorPO === "") {
            Swal.fire("Info", "Nomor PO harus diisi", "info");
            return;
        }

        // Check format: PO-12345678
        const regexPO = /^PO-\d{8}$/;

        if (!regexPO.test(nomorPO)) {
            Swal.fire(
                "Info",
                "Format Nomor PO adalah \"PO-\" diikuti 8 digit angka, contoh: PO-26059718",
                "info",
            );
            return;
        }

        redisplay(null, null, nomorPO);
    }
});

function getSelectedDateRange() {
    let radioButtons = document.getElementsByName("radiobutton");
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value === "nomor_po"
                ? no.value.trim()
                : { startDate: bet1.value, endDate: bet2.value };
        }
    }
}

function radioButtonIsSelected() {
    let radioButtons = document.getElementsByName("radiobutton");

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value;
        }
    }
    return false;
}

function redisplay(MinDate, MaxDate, noPO) {
    if (MinDate && MaxDate && MinDate > MaxDate) {
        Swal.fire({
            icon: "info",
            title: "Info",
            text: "Tanggal Awal tidak boleh lebih dari Tanggal Akhir",
            showConfirmButton: true,
            confirmButtonText: "OK",
        });
        return;
    }

    let tabelData = $("#tabelchelsy").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        destroy: true,
        scrollX: true,
        scrollY: "400px",
        lengthChange: false,
        pageLength: 100,
        searching: false,
        ajax: {
            url: "/GETPurchaseOrder",
            type: "GET",
            data: {
                MinDate: MinDate,
                MaxDate: MaxDate,
                noPO: noPO,
            },
        },
        columns: [
            { data: "NO_PO" },
            { data: "Status" },
            {
                data: "Tgl_sppb",
                render: (data) => {
                    let p = data.split(" ")[0].split("-");
                    return `${p[2]}-${p[1]}-${p[0]}`;
                },
            },
            { data: "Kd_div" },
            { data: "Nama" },
            { data: "No_BTTB" },
        ],
    });

    $("#tabelchelsy tbody")
        .off("click")
        .on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                let data = tabelData.row(this).data();
                window.location.href = "/OpenReviewPO?No_PO=" + data.NO_PO;
            } else {
                tabelData.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
            }
        });
}

$(document).ready(function () {
    bet1.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            bet2.focus();
        }
    });
    bet2.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            redisplayButton.focus();
        }
    });
    no.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            redisplayButton.focus();
        }
    });
});

// Detach any existing event listeners before attaching new ones
lihat_BTTB.removeEventListener("click", handleLihatBTTBClick);
function handleLihatBTTBClick(event) {
    let data = [];
    data = $("#tabelchelsy").DataTable().row(".selected").data();
    if (data == undefined) {
        alert("Pilih Data Yang Mau Di Review BTTB");
    } else {
        if (data.No_BTTB == null || data.No_BTTB == "") {
            alert("Data Tidak Dapat Di Review BTTB");
        } else {
            const url = "/OpenReviewBTTB" + "?No_BTTB=" + data.No_BTTB;
            window.location.href = url;
        }
    }
}
lihat_BTTB.addEventListener("click", handleLihatBTTBClick);

//email supplier
btnEmailSupplier.addEventListener("click", function () {
    let table = $("#tabelchelsy").DataTable();
    let data = table.row(".selected").data();

    if (!data) {
        Swal.fire("Peringatan", "Pilih data PO terlebih dahulu", "warning");
        return;
    }

    let noPO = data.NO_PO;

    $.ajax({
        url: "/PurchaseOrder/GetEmailSupplier",
        type: "POST",
        data: {
            _token: $('meta[name="csrf-token"]').attr("content"),
            no_po: noPO,
        },
        success: function (res) {
            if (!res.success) {
                Swal.fire("Error", res.message, "error");
                return;
            }

            $("#email_no_po").val(noPO);
            $("#email_supplier").val(res.email);
            $("#email_body").val(``);

            $("#modalEmailSupplier").modal("show");
        },
        error: function () {
            Swal.fire("Error", "Gagal mengambil email supplier", "error");
        },
    });
});

document
    .getElementById("btn_kirim_email")
    .addEventListener("click", function () {
        let noPO = $("#email_no_po").val();
        $.get("/check-pdf-server", function (res) {
            if (res.alive) {
                $.ajax({
                    url: "https://internal.mykrr.co.id/PurchaseOrder/SendEmailSupplier",
                    type: "POST",
                    data: {
                        _token: $('meta[name="csrf-token"]').attr("content"),
                        no_po: noPO,
                        email: $("#email_supplier").val(),
                    },
                    success: function (res) {
                        if (res.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil",
                                text: res.message,
                                confirmButtonText: "OK"
                            }).then(() => {
                                $("#modalEmailSupplier").modal("hide");
                            });
                        } else {
                            Swal.fire({
                                icon: "warning",
                                title: "Email Sudah Dikirim",
                                text: res.message,
                                confirmButtonText: "OK"
                            });
                        }
                    },
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Unable to generate email",
                    text: "Cannot connect to email sender server",
                });
            }
        });
    });

document.getElementById("downloadPdf").addEventListener("click", function () {
    let table = $("#tabelchelsy").DataTable();
    let data = table.row(".selected").data();

    if (!data) {
        Swal.fire({
            icon: "warning",
            title: "Pilih PO terlebih dahulu",
        });
        return;
    }

    let no_po = data.NO_PO; // karena serverSide pakai object

    $.get("/check-pdf-server", function (res) {
        if (res.alive) {
            window.open(
                `https://internal.mykrr.co.id/purchase-order/download-pdf/${no_po}`,
                "_blank",
            );
        } else {
            Swal.fire({
                icon: "error",
                title: "Unable to generate pdf",
                text: "Cannot connect to pdf generator server",
            });
        }
    });
});
