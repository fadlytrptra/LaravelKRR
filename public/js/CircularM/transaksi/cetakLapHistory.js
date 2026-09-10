jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let btn_proses = document.getElementById("btn_proses");
    let tanggal = document.getElementById("tanggal");
    let labelInfo = document.getElementById("labelInfo");
    let btn_prosesCetak = document.getElementById("btn_prosesCetak");
    let btn_keluar = document.getElementById("btn_keluar");
    tanggal.valueAsDate = new Date();

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

    btn_prosesCetak.addEventListener("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: "/orderD/store",
            type: "POST",
            data: {
                _token: csrfToken,
                tanggal: tanggal.value,
                kodeProses: "ProsesCetakHistoryCIR",
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
                        labelInfo.style.display = "block";
                        btn_prosesCetak.style.display = "block";
                        btn_keluar.style.display = "block";
                        btn_proses.style.display = "none";
                        document.querySelector(".card-header").textContent =
                            "Proses Cetak History Circular";
                        tanggal.disabled = true;
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
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: "/orderD/store",
            type: "POST",
            data: {
                _token: csrfToken,
                tanggal: tanggal.value,
                kodeProses: "ProsesLapHistoryCIR",
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
                        labelInfo.style.display = "block";
                        btn_prosesCetak.style.display = "block";
                        btn_keluar.style.display = "block";
                        btn_proses.style.display = "none";
                        document.querySelector(".card-header").textContent =
                            "Proses Cetak History Circular";
                        tanggal.disabled = true;
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
    });

    btn_keluar.addEventListener("click", function (event) {
        event.preventDefault();
        labelInfo.style.display = "none";
        btn_prosesCetak.style.display = "none";
        btn_keluar.style.display = "none";
        btn_proses.style.display = "block";
        document.querySelector(".card-header").textContent =
            "Proses Simpan Tanggal History";
        tanggal.disabled = false;
    });
});
