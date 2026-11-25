
jQuery(function ($) {

    //#region Variable
    let baseUrl = "/Kencana/CounterFakturPenagihanKencana";

    let tahun = $("#tahun");
    let counterSebelum = $("#counter_sebelum");
    let counterSesudah = $("#counter_sesudah");

    let btnRefresh = $("#btnRefresh");
    let btnSimpan = $("#btnSimpan");
    //#endregion

    //#region AJAX Setup
    $.ajaxSetup({
        beforeSend: function () {
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            $("#loading-screen").css("display", "none");
        },
    });
    //#endregion

    //#region Function

    // Ambil counter berdasarkan tahun
    function loadData() {

        let tahunValue = tahun.val().trim();

        if (tahunValue === "") {
            showWarning("Tahun harus diisi");
            return;
        }

        $.ajax({
            url: `${baseUrl}/${tahunValue}`,
            type: "GET",
            dataType: "json",

            success: function (response) {

                if (!response.success) {
                    showError(response.message);
                    return;
                }

                counterSebelum.val(response.counter);

                // Kosongkan input counter baru
                counterSesudah.val("");

                counterSesudah.focus();
            },

            error: function (xhr) {

                let message = "Terjadi kesalahan";

                if (xhr.responseJSON?.message) {
                    message = xhr.responseJSON.message;
                }

                showError(message);
            }
        });
    }

    // Simpan counter baru
    function saveData() {

        let tahunValue = tahun.val().trim();
        let counterValue = counterSesudah.val().trim();

        if (tahunValue === "") {
            showWarning("Tahun harus diisi");
            tahun.focus();
            return;
        }

        if (counterValue === "") {
            showWarning("Counter harus diisi");
            counterSesudah.focus();
            return;
        }

        if (!$.isNumeric(counterValue)) {
            showWarning("Counter harus berupa angka");
            counterSesudah.focus();
            return;
        }

        Swal.fire({
            title: "Konfirmasi",
            html: `
                Apakah anda yakin mengganti counter faktur tahun
                <b>${tahunValue}</b> menjadi
                <b>${counterValue}</b>?
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Simpan",
            cancelButtonText: "Batal",
            reverseButtons: true,

        }).then((result) => {

            if (!result.isConfirmed) {
                counterSesudah.focus();
                return;
            }

            $.ajax({
                url: baseUrl,
                type: "POST",
                dataType: "json",

                data: {
                    _token: $('meta[name="csrf-token"]').attr("content"),
                    tahun: tahunValue,
                    counter: counterValue
                },

                beforeSend: function () {
                    btnSimpan.prop("disabled", true);
                },

                complete: function () {
                    btnSimpan.prop("disabled", false);
                },

                success: function (response) {

                    if (!response.success) {
                        showWarning(response.message);
                        return;
                    }

                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: response.message
                    }).then(() => {
                        loadData();
                    });
                },

                error: function (xhr) {

                    let message = "Terjadi kesalahan";

                    if (xhr.status === 422) {

                        let errors = xhr.responseJSON.errors;
                        let firstError = Object.values(errors)[0][0];

                        showWarning(firstError);
                        return;
                    }

                    if (xhr.responseJSON?.message) {
                        message = xhr.responseJSON.message;
                    }

                    showError(message);
                }
            });
        });
    }

    // Pesan berhasil
    function showSuccess(message) {
        Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: message
        });
    }

    // Pesan error
    function showError(message) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: message
        });
    }

    // Pesan peringatan
    function showWarning(message) {
        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: message
        });
    }

    //#endregion

    //#region Form Load
    tahun.val(new Date().getFullYear());
    loadData();
    //#endregion

    //#region Event Listener

    // Refresh
    btnRefresh.on("click", function () {
        loadData();
    });

    // Simpan
    btnSimpan.on("click", function () {
        saveData();
    });

    // Enter pada counter = simpan
    counterSesudah.on("keypress", function (e) {
        if (e.which === 13) {
            saveData();
        }
    });

    // Enter pada tahun = refresh data
    tahun.on("keypress", function (e) {
        if (e.which === 13) {
            loadData();
        }
    });

    // Ganti tahun = ambil data
    tahun.on("change", function () {
        loadData();
    });

    //#endregion

});
