jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let btn_hapus = document.getElementById("btn_hapus");

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

    btn_hapus.addEventListener("click", function (event) {
        event.preventDefault();
        Swal.fire({
            title: 'Apakah anda sudah yakin hapus history?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "HapusHistoryD/delete",
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
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
            } else if (result.dismiss === Swal.DismissReason.cancel) {

            }
        });
    });
});