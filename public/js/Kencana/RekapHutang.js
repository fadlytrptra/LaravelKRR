$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let tanggal_awal = document.getElementById("tanggal_awal");
    let tanggal_akhir = document.getElementById("tanggal_akhir");
    let radio_1 = document.getElementById("radio_1");
    let radio_2 = document.getElementById("radio_2");
    let radio_3 = document.getElementById("radio_3");
    let radio_4 = document.getElementById("radio_4");
    let proses = 0;

    tanggal_awal.valueAsDate = new Date();
    tanggal_akhir.valueAsDate = new Date();

    radio_1.addEventListener("click", function (event) {
        proses = 1;
    });

    radio_2.addEventListener("click", function (event) {
        proses = 2;
    });

    radio_3.addEventListener("click", function (event) {
        proses = 3;
    });

    radio_4.addEventListener("click", function (event) {
        proses = 4;
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();

        $.ajax({
            url: "/Kencana/RekapHutangKencana",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: proses,
                tanggal_awal: tanggal_awal.value,
                tanggal_akhir: tanggal_akhir.value,
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
                        document.querySelectorAll('input[type="radio"]:checked').forEach((radio) => {
                            radio.checked = false;
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
    });
});
