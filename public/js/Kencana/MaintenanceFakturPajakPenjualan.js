$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let id_penagihan = document.getElementById("id_penagihan");
    let customer = document.getElementById("customer");
    let nilai_penagihan = document.getElementById("nilai_penagihan");
    let id_fakturPajak = document.getElementById("id_fakturPajak");
    let btn_proses = document.getElementById("btn_proses");
    let btn_redisplay = document.getElementById("btn_redisplay");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        scrollX: "300px",
        scrollCollapse: true,
    });

    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();
    tgl_awal.focus();

    tgl_awal.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tgl_akhir.focus();
        }
    });

    tgl_akhir.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_redisplay.focus();
        }
    });

    id_fakturPajak.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_proses.focus();
        }
    });

    btn_redisplay.addEventListener("click", function (event) {
        event.preventDefault();
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/FakturPajakPenjualanKCN/getData",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awal: tgl_awal.value,
                        tgl_akhir: tgl_akhir.value,
                    });
                },
            },
            columns: [
                {
                    data: "Id_Penagihan",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                {
                    data: "Tgl_Penagihan",
                },
                {
                    data: "NamaCust",
                },
                {
                    data: "Nilai_Penagihan",
                    render: function (data) {
                        return numeral(data).format("0,0.00");
                    },
                },
                {
                    data: "IdFakturPajak",
                },
                {
                    data: "NoSeri_FakturPajak",
                },
            ],
            // columnDefs: [{ targets: [5], visible: false }],
            paging: false,
            scrollY: "300px",
            scrollCollapse: true,
        });
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);

        id_penagihan.value = data.Id_Penagihan;
        customer.value = data.NamaCust;
        nilai_penagihan.value = numeral(data.Nilai_Penagihan).format("0,0.00");
        id_fakturPajak.value = data.NoSeri_FakturPajak || "";

        id_fakturPajak.focus();
        id_fakturPajak.select();
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        if (id_penagihan.value == "" || id_fakturPajak.value == "") {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu & Isi ID. Faktur",
                showConfirmButton: true,
            });
            return;
        }
        $.ajax({
            url: "/Kencana/FakturPajakPenjualanKCN",
            type: "POST",
            data: {
                _token: csrfToken,
                id_penagihan: id_penagihan.value,
                id_fakturPajak: id_fakturPajak.value,
            },
            success: function (response) {
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        document.querySelectorAll("input").forEach((input) => {
                            if (input.type !== "date") {
                                input.value = "";
                            }
                        });
                        $("#table_atas").DataTable().ajax.reload();
                        setTimeout(() => {
                            tgl_awal.focus();
                        }, 300);
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
});
