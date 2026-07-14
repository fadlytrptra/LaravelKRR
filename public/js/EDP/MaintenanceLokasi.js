$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let divLokasiTambah = document.getElementById("divLokasiTambah");
    let listLokasiTambah = document.getElementById("listLokasiTambah");
    let divLokasiEdit = document.getElementById("divLokasiEdit");
    let listLokasiEdit = document.getElementById("listLokasiEdit");
    let userEdit = document.getElementById("userEdit");
    let updateButtonTeknisi = document.getElementById("updateButtonTeknisi");
    let lokasiUserSebelum = [];
    let lokasiUserSesudah = [];
    var dataTableTeknisi = $("#table-teknisi").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ordering: true,
        ajax: {
            url: "MaintenanceUserMaster/getData",
            type: "GET",
        },
        columns: [
            { data: "IDUser" },
            { data: "NomorUser" },
            { data: "NamaUser" },
            { data: "Lokasi" },
            { data: "IsOnline" },
            { data: "IsAdmin" },
            { data: "IsAdminPDAM" },
            { data: "IsAdminFotoBarang" },
            { data: "IsActive" },
            { data: "NoTelp" },
            // { data: "IdUserMaster" },
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return `
            <button class="btn btn-sm btn-primary btn-edit"
                style="width: 150px;"
                data-id="${row.IDUser}">Edit
            </button>

            <button class="btn btn-sm btn-warning btn-password"
                style="width: 150px; border: 1px solid #212529; border-radius: 5px;"
                data-nama="${row.NamaUser}"
                data-user="${row.NomorUser}">
                Ganti Password
            </button>
        `;
                },
            },
        ],
    });

    $(document).on("click", ".btn-password", function () {
        let nama = $(this).data("nama");
        let user = $(this).data("user");

        $("#judul").text("Ganti Password - " + nama);
        $("#editPassword").val("");

        // Set action form
        $(".formEditUser").attr("action", "/User/" + user + "/up");

        $("#EditUser").modal("show");
    });

    let idUserAll = null;
    $("#table-teknisi").on("click", ".btn-edit", function () {
        const idUser = $(this).data("id");
        idUserAll = idUser;
        console.log("ID Header:", idUser);

        // simpan idUser (jika diperlukan di modal)
        // $("#editmodal").data("idheader", idUser);
        $("#editmodal").modal("show");

        $.ajax({
            url: "MaintenanceUserMaster/getDataNamaUser",
            type: "GET",
            data: {
                _token: csrfToken,
                idUser: idUserAll,
            },
            success: function (data) {
                userEdit.value = data.data[0].NomorUser;

                $.ajax({
                    url: "MaintenanceUserMaster/getDetailUser",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        idUser: idUserAll,
                    },
                    success: function (data) {
                        console.log(data);
                        console.log(data.data[0].IsAdminPDAM == "1");

                        $("#isOnline").prop(
                            "checked",
                            data.data[0].IsOnline == "1",
                        );
                        $("#isAdmin").prop(
                            "checked",
                            data.data[0].IsAdmin == "1",
                        );
                        $("#isAdminPDAM").prop(
                            "checked",
                            data.data[0].IsAdminPDAM == "1",
                        );
                        $("#isAdminFotoBarang").prop(
                            "checked",
                            data.data[0].IsAdminFotoBarang == "1"
                        );
                        $("#isActive").prop(
                            "checked",
                            data.data[0].IsActive == "1",
                        );
                        let noTelp = (data.data[0].NoTelp || "").toString();

                        // Ambil daftar kode negara yang ada di select
                        let kodeNegara = "";
                        $("#kodeNegara option").each(function () {
                            const val = $(this).val();

                            if (
                                noTelp.startsWith(val) &&
                                val.length > kodeNegara.length
                            ) {
                                kodeNegara = val;
                            }
                        });

                        if (kodeNegara !== "") {
                            $("#kodeNegara").val(kodeNegara);
                            $("#nomor").val(
                                noTelp.substring(kodeNegara.length),
                            );
                        } else {
                            // Jika tidak ada yang cocok, gunakan default dan tampilkan nomor apa adanya
                            $("#kodeNegara").val("62");
                            $("#nomor").val(noTelp);
                        }
                        // userEdit.value = data.data[0].NomorUser;

                        $.ajax({
                            url: "MaintenanceUserMaster/getDataLokasiUser",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                idUser: idUserAll,
                            },
                            success: function (res) {
                                console.log(res);

                                // 1️⃣ Uncheck semua checkbox dulu
                                $('input.form-check-input[type="checkbox"]')
                                    .not(
                                        "#isOnline, #isAdmin, #isActive, #isAdminPDAM, #isAdminFotoBarang",
                                    )
                                    .prop("checked", false);

                                // 2️⃣ Ambil array data lokasi
                                if (res.data && res.data.length > 0) {
                                    // contoh: [{Id_Lokasi:'JKK'}, {Id_Lokasi:'MJS'}]
                                    res.data.forEach(function (item) {
                                        $(
                                            'input.form-check-input[value="' +
                                                item.Id_Lokasi +
                                                '"]',
                                        ).prop("checked", true);
                                    });
                                }
                            },
                            error: function (xhr, status, error) {
                                console.error(xhr.responseText);
                                alert("Gagal mengambil data lokasi user");
                            },
                        });
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    },
                });
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    updateButtonTeknisi.addEventListener("click", function (event) {
        event.preventDefault();

        let lokasiDipilih = [];

        // ambil semua checkbox yang dicentang
        $("#editmodal input.form-check-input:checked")
            .not("#isOnline, #isAdmin, #isActive, #isAdminPDAM")
            .each(function () {
                lokasiDipilih.push($(this).val());
            });

        $.ajax({
            url: "MaintenanceUserMaster",
            type: "POST",
            data: {
                _token: csrfToken,
                idUser: idUserAll,
                lokasi: lokasiDipilih.join(","), // contoh: JKK,MJS
                isOnline: $("#isOnline").is(":checked") ? "1" : "0",
                isAdmin: $("#isAdmin").is(":checked") ? "1" : "0",
                isAdminPDAM: $("#isAdminPDAM").is(":checked") ? "1" : "0",
                isActive: $("#isActive").is(":checked") ? "1" : "0",
                isAdminFotoBarang: $("#isAdminFotoBarang").is(":checked") ? "1" : "0",
                nomor: $("#kodeNegara").val() + $("#nomor").val(),
            },
            success: function (response) {
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        console.log(result);
                        $("#editmodal").modal("hide");
                        dataTableTeknisi.ajax.reload(null, false);
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    btn_proses.disabled = false;
                }
            },
            error: function (xhr) {
                console.error(xhr.responseText);
                alert("Gagal update lokasi");
            },
        });
    });
});
