$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let btn_proses = document.getElementById("btn_proses");
    let tanggal = document.getElementById("tanggal");
    let tanggal2 = document.getElementById("tanggal2");
    let noFaktur = document.getElementById("noFaktur");
    let totalPenagihan = document.getElementById("totalPenagihan");
    let totalPembayaran = document.getElementById("totalPembayaran");
    let notaKredit = document.getElementById("notaKredit");
    let sisaTagihan = document.getElementById("sisaTagihan");
    let lunas = document.getElementById("lunas");
    let idBKM = document.getElementById("idBKM");
    // let table_atas = $("#table_atas").DataTable({
    // });

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2);
    tanggal.valueAsDate = firstDayOfMonth;
    tanggal2.valueAsDate = new Date();
    sisaTagihan.style.backgroundColor = "#ffadff";
    btn_proses.disabled = true;

    let = table_atas = $("#table_atas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/Kencana/AnalisaStatusPelunasanKCN/displayData",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                    tanggal: tanggal.value,
                    tanggal2: tanggal2.value,
                });
            },
        },
        columns: [
            {
                data: "Tgl_Pelunasan",
                // render: function (data) {
                //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                // },
            },
            { data: "NamaCust" },
            { data: "Id_Penagihan" },
            { data: "Jenis_Pembayaran" },
            { data: "NilaiPelunasan" },
            { data: "Nilai_Penagihan" },
            { data: "Terbayar" },
            { data: "Lunas" },
            { data: "Id_BKM" },
        ],
        // columnDefs: [{ targets: [5], visible: false }],
    });

    btn_ok.addEventListener("click", function (event) {
        event.preventDefault();
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/AnalisaStatusPelunasanKCN/displayData",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tanggal: tanggal.value,
                        tanggal2: tanggal2.value,
                    });
                },
            },
            columns: [
                {
                    data: "Tgl_Pelunasan",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: "NamaCust" },
                { data: "Id_Penagihan" },
                { data: "Jenis_Pembayaran" },
                { data: "NilaiPelunasan" },
                { data: "Nilai_Penagihan" },
                { data: "Terbayar" },
                { data: "Lunas" },
                { data: "Id_BKM" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [5], visible: false }],
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

        noFaktur.value = data.Id_Penagihan;
        totalPenagihan.value = data.Nilai_Penagihan;
        totalPembayaran.value = data.Terbayar;
        idBKM.value = data.Id_BKM;

        // Remove commas from the values and convert them to numbers
        const nilaiPenagihan = parseFloat(
            data.Nilai_Penagihan.replace(/,/g, "")
        );
        const terbayar = parseFloat(data.Terbayar.replace(/,/g, ""));

        // Calculate the remaining amount
        const sisaTagihanH = nilaiPenagihan - terbayar;

        // Assign the result to the appropriate element
        sisaTagihan.value = sisaTagihanH.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        // sisaTagihan.value = data.Nilai_Penagihan - data.Terbayar;

        $.ajax({
            url: "/Kencana/AnalisaStatusPelunasanKCN/DisplayNotaKredit",
            type: "GET",
            data: {
                _token: csrfToken,
                Id_Penagihan: data.Id_Penagihan,
            },
            success: function (data) {
                console.log(data);
                // jenis_bank.value = data.JenisBank;
                notaKredit.value = data.jumlah.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
        lunas.value = "";
        lunas.focus();
    });

    lunas.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            lunas.value = lunas.value.toUpperCase();

            if (lunas.value == "Y") {
                btn_proses.disabled = false;
                btn_proses.focus();
            } else if (lunas.value == "N") {
                btn_proses.disabled = false;
                btn_proses.focus();
            } else {
                btn_proses.disabled = true;
            }
        }
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();

        if (sisaTagihan.value !== "0.00") {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Tidak boleh Proses, karena sisa tagihan tdk = Nol",
                showConfirmButton: true,
            });
        } else {
            $.ajax({
                url: "/Kencana/AnalisaStatusPelunasanKCN",
                type: "POST",
                data: {
                    _token: csrfToken,
                    lunas: lunas.value,
                    noFaktur: noFaktur.value,
                    idBKM: idBKM.value,
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
                            // location.reload();
                            // document
                            //     .querySelectorAll("input")
                            //     .forEach((input) => (input.value = ""));
                            // $("#table_atas").DataTable().ajax.reload();
                            noFaktur.value = "";
                            totalPenagihan.value = "";
                            totalPembayaran.value = "";
                            notaKredit.value = "";
                            sisaTagihan.value = "";
                            lunas.value = "";
                            $("#table_atas").DataTable().ajax.reload(() => {
                                $("#table_atas tbody tr").removeClass("selected");
                            });
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
        }
    });

    // btn_proses.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     location.reload();
    // });
});
