$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let id_kurs = document.getElementById("id_kurs");
    let tanggal_kurs = document.getElementById("tanggal_kurs");
    let nilai_kurs = document.getElementById("nilai_kurs");
    let btn_isi = document.getElementById("btn_isi");
    let btn_proses = document.getElementById("btn_proses");
    let btn_redisplay = document.getElementById("btn_redisplay");
    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();
    let table_atas = $("#table_atas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        destroy: true,
        ajax: {
            url: "/Kencana/MaintenanceKursKencana/getData",
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
                data: "IdKurs",
                // render: function (data) {
                //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                // },
            },
            {
                data: "TanggalKurs",
            },
            {
                data: "NilaiKurs",
                render: function (data) {
                    return numeral(data).format("0,0.00");
                },
            },
        ],
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        scrollX: "300px",
        scrollCollapse: true,
    });
    let proses;

    tgl_awal.focus();
    btn_proses.disabled = true;
    tanggal_kurs.readOnly = true;

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

    tanggal_kurs.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            nilai_kurs.focus();
        }
    });

    nilai_kurs.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            // Format nilai input menggunakan numeral
            let nilai = numeral(nilai_kurs.value).value(); // parse angka dari input
            if (!isNaN(nilai)) {
                nilai_kurs.value = numeral(nilai).format("0,0.00"); // format angka
            }

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
                url: "/Kencana/MaintenanceKursKencana/getData",
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
                    data: "IdKurs",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                {
                    data: "TanggalKurs",
                },
                {
                    data: "NilaiKurs",
                    render: function (data) {
                        return numeral(data).format("0,0.00");
                    },
                },
            ],
            // columnDefs: [{ targets: [5], visible: false }],
            paging: false,
            scrollY: "300px",
            scrollCollapse: true,
        });
    });

    $("#table_atas tbody").on("click", "tr", function () {
        proses = 2;
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);
        btn_proses.disabled = false;
        id_kurs.value = data.IdKurs;
        const tanggal = data.TanggalKurs;
        const parts = tanggal.split("/");
        const formatted = `${parts[2]}-${parts[0].padStart(
            2,
            "0"
        )}-${parts[1].padStart(2, "0")}`;

        tanggal_kurs.value = formatted;
        tanggal_kurs.readOnly = true;

        nilai_kurs.value = numeral(data.NilaiKurs).format("0,0.00");

        nilai_kurs.focus();
        nilai_kurs.select();
    });

    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        proses = 1;
        $("#table_atas tbody tr").removeClass("selected");
        id_kurs.value = "";
        tanggal_kurs.valueAsDate = new Date();
        nilai_kurs.value = "";
        btn_proses.disabled = false;
        tanggal_kurs.readOnly = false;
        tanggal_kurs.focus();
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        if (tanggal_kurs.value == "" || nilai_kurs.value == "") {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Isi semua kolom dengan benar!",
                showConfirmButton: true,
            });
            return;
        }
        $.ajax({
            url: "/Kencana/MaintenanceKursKencana",
            type: "POST",
            data: {
                _token: csrfToken,
                tanggal_kurs: tanggal_kurs.value,
                nilai_kurs: nilai_kurs.value,
                proses: proses,
            },
            success: function (response) {
                console.log(response);

                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        id_kurs.value = "";
                        tanggal_kurs.value = null;
                        nilai_kurs.value = "";
                        tanggal_kurs.readOnly = true;
                        btn_proses.disabled = true;
                        $("#table_atas").DataTable().ajax.reload();
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
