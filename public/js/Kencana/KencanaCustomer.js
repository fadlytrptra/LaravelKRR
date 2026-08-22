$(document).ready(function () {

    // =========================================================
    // CSRF
    // =========================================================
    const csrfToken = $('meta[name="csrf-token"]').attr("content");


    // =========================================================
    // ELEMENT
    // =========================================================
    const JnsCust = document.getElementById("JnsCust");
    const NamaCust = document.getElementById("NamaCust");
    const KodeCust = document.getElementById("KodeCust");
    const ContactPerson = document.getElementById("ContactPerson");
    const LimitBeli = document.getElementById("LimitBeli");
    const Alamat = document.getElementById("Alamat");
    const Kota = document.getElementById("Kota");
    const Province = document.getElementById("Province");
    const Negara = document.getElementById("Negara");
    const KodePos = document.getElementById("KodePos");
    const NoTelp1 = document.getElementById("NoTelp1");
    const NoTelp2 = document.getElementById("NoTelp2");
    const NoTelex = document.getElementById("NoTelex");
    const NoFax1 = document.getElementById("NoFax1");
    const NoFax2 = document.getElementById("NoFax2");
    const NoHp1 = document.getElementById("NoHp1");
    const NoHp2 = document.getElementById("NoHp2");
    const Email = document.getElementById("Email");
    const AlamatKirim = document.getElementById("AlamatKirim");
    const KotaKirim = document.getElementById("KotaKirim");
    const NPWP = document.getElementById("NPWP");
    const NamaNPWP = document.getElementById("NamaNPWP");
    const AlamatNPWP = document.getElementById("AlamatNPWP");
    const NITKU = document.getElementById("NITKU");
    const IdPembeliCoretax = document.getElementById("IdPembeliCoretax");

    const FormCustomer = document.getElementById("FormCustomer");
    const modalCustomer = document.getElementById("modalCustomer");
    const modalLabelCustomer = document.getElementById("modalLabelCustomer");
    const typeKegiatanForm = document.getElementById("typeKegiatanForm");
    const submit_btn = document.getElementById("submit_btn");


    // =========================================================
    // CEK ELEMENT
    // =========================================================
    // Karena JS ini juga bisa dipanggil dari halaman lain,
    // jangan langsung error jika element belum tersedia.
    if (!modalCustomer || !FormCustomer) {
        return;
    }


    // =========================================================
    // DATATABLE CUSTOMER
    // =========================================================
    let customerSales = $("#table_Customer").DataTable({

        processing: true,

        // Data sudah diambil seluruhnya dari controller
        serverSide: false,

        ajax: {
            url: window.customerRoutes.getAll,
            type: "GET",
            dataType: "json",

            dataSrc: function (json) {

                console.log("Response Customer:", json);

                if (!json || !json.data) {
                    console.error(
                        "Response Customer tidak memiliki property data:",
                        json
                    );

                    return [];
                }

                return json.data;
            },

            error: function (xhr, status, error) {

                console.error("Error load Customer:", xhr);
                console.error("Status:", status);
                console.error("Error:", error);
                console.error("Response:", xhr.responseText);

                Swal.fire({
                    icon: "error",
                    title: "Gagal mengambil data Customer",
                    text: "Periksa response dari CustomerController."
                });
            }
        },

        columns: [

            {
                data: "IDCustomer",
                defaultContent: "-"
            },

            {
                data: "NamaCustomer",
                defaultContent: "-"
            },

            {
                data: "KotaKirim",
                defaultContent: "-"
            },

            {
                data: "Negara",
                defaultContent: "-"
            },

            {
                data: null,
                orderable: false,
                searchable: false,

                render: function (data, type, row) {

                    /*
                     * IDCustomer dari SP:
                     *
                     * IDCust + ' - ' + JnsCust
                     *
                     * Contoh:
                     * 00001 - 01
                     *
                     * Untuk URL edit/delete hanya IDCust
                     */
                    let idCustomer = row.IDCustomer
                        ? row.IDCustomer.split("-")[0].trim()
                        : "";

                    return `
                        <button
                            type="button"
                            class="btn btn-sm btn-info btn-edit-customer"
                            data-bs-toggle="modal"
                            data-bs-target="#modalCustomer"
                            data-typeform="edit"
                            data-idcustomer="${idCustomer}">

                            &#x270E; Edit

                        </button>

                        <br>

                        <form
                            action="${window.customerRoutes.destroy.replace(
                                "__ID__",
                                idCustomer
                            )}"
                            method="POST"
                            style="display:inline;"
                            onsubmit="return confirm('Apakah Anda Yakin ?');">

                            <input
                                type="hidden"
                                name="_token"
                                value="${csrfToken}">

                            <input
                                type="hidden"
                                name="_method"
                                value="DELETE">

                            <button
                                type="submit"
                                class="btn btn-sm btn-danger mt-1">

                                <span>&#x1F5D1;</span>
                                Hapus

                            </button>

                        </form>
                    `;
                }
            }
        ]
    });


    // =========================================================
    // VARIABLE MODAL
    // =========================================================
    let idCustomer = null;
    let typeform = null;


    // =========================================================
    // MODAL CUSTOMER
    // =========================================================
    modalCustomer.addEventListener(
        "shown.bs.modal",
        function (event) {

            const button = $(event.relatedTarget);

            if (!button || !button.length) {
                return;
            }

            typeform = button.data("typeform");
            idCustomer = button.data("idcustomer");

            console.log("Type Form:", typeform);
            console.log("ID Customer:", idCustomer);

            if (typeKegiatanForm) {
                typeKegiatanForm.value = typeform;
            }


            // =================================================
            // EDIT
            // =================================================
            if (typeform === "edit") {

                modalLabelCustomer.innerHTML = "Edit Customer";

                // Form tetap POST, nanti update dikirim AJAX PUT
                FormCustomer.action =
                    window.customerRoutes.update.replace(
                        "__ID__",
                        idCustomer
                    );

                FormCustomer.method = "POST";


                // Ambil detail customer
                $.ajax({

                    url: window.customerRoutes.getCertain,

                    type: "GET",

                    dataType: "json",

                    data: {
                        idCustomer: idCustomer
                    },

                    headers: {
                        "X-CSRF-TOKEN": csrfToken
                    },

                    beforeSend: function () {

                        $("#loading-screen").css(
                            "display",
                            "flex"
                        );
                    },

                    success: function (response) {

                        console.log(
                            "Detail Customer:",
                            response
                        );

                        if (!response.data) {

                            Swal.fire({
                                icon: "error",
                                title: "Data Customer tidak ditemukan"
                            });

                            return;
                        }

                        const data = response.data;


                        // =====================================
                        // ISI FORM
                        // =====================================

                        if (JnsCust) {
                            JnsCust.value =
                                data.IDJnsCust ?? data.JnsCust ?? "";
                        }

                        if (NamaCust) {
                            NamaCust.value =
                                data.NamaCust ?? "";
                        }

                        if (KodeCust) {
                            KodeCust.value =
                                data.KodeCust ?? "";
                        }

                        if (ContactPerson) {
                            ContactPerson.value =
                                data.ContactPerson ?? "";
                        }

                        if (LimitBeli) {
                            LimitBeli.value =
                                data.LimitBeli ?? "";
                        }

                        if (Alamat) {
                            Alamat.value =
                                data.Alamat ?? "";
                        }

                        if (Kota) {
                            Kota.value =
                                data.Kota ?? "";
                        }

                        if (Province) {
                            Province.value =
                                data.Propinsi ??
                                data.Province ??
                                "";
                        }

                        if (Negara) {
                            Negara.value =
                                data.Negara ?? "";
                        }

                        if (KodePos) {
                            KodePos.value =
                                data.KodePos ?? "";
                        }

                        if (NoTelp1) {
                            NoTelp1.value =
                                data.NoTelp1 ?? "";
                        }

                        if (NoTelp2) {
                            NoTelp2.value =
                                data.NoTelp2 ?? "";
                        }

                        if (NoTelex) {
                            NoTelex.value =
                                data.NoTelex ?? "";
                        }

                        if (NoFax1) {
                            NoFax1.value =
                                data.NoFax1 ?? "";
                        }

                        if (NoFax2) {
                            NoFax2.value =
                                data.NoFax2 ?? "";
                        }

                        if (NoHp1) {
                            NoHp1.value =
                                data.NoHp1 ?? "";
                        }

                        if (NoHp2) {
                            NoHp2.value =
                                data.NoHp2 ?? "";
                        }

                        if (Email) {
                            Email.value =
                                data.Email ?? "";
                        }

                        if (AlamatKirim) {
                            AlamatKirim.value =
                                data.AlamatKirim ?? "";
                        }

                        if (KotaKirim) {
                            KotaKirim.value =
                                data.KotaKirim ?? "";
                        }

                        if (NPWP) {
                            NPWP.value =
                                data.NPWP ?? "";
                        }

                        if (NamaNPWP) {
                            NamaNPWP.value =
                                data.NamaNPWP ?? "";
                        }

                        if (AlamatNPWP) {
                            AlamatNPWP.value =
                                data.AlamatNPWP ?? "";
                        }

                        if (NITKU) {
                            NITKU.value =
                                data.NITKU ?? "";
                        }

                        if (IdPembeliCoretax) {
                            IdPembeliCoretax.value =
                                data.IdPembeliCoretax ?? "";
                        }
                    },

                    error: function (xhr) {

                        console.error(
                            "Error detail Customer:",
                            xhr
                        );

                        Swal.fire({
                            icon: "error",
                            title: "Data Tidak Berhasil Diload!",
                            text:
                                xhr.responseJSON?.error ??
                                "Terjadi kesalahan saat mengambil data Customer."
                        });
                    },

                    complete: function () {

                        $("#loading-screen").css(
                            "display",
                            "none"
                        );
                    }
                });

            }


            // =================================================
            // TAMBAH
            // =================================================
            else if (typeform === "tambah") {

                modalLabelCustomer.innerHTML =
                    "Tambah Customer";

                FormCustomer.action =
                    window.customerRoutes.store;

                FormCustomer.method = "POST";

                // Reset form
                FormCustomer.reset();

                // Pastikan method kembali POST
                $("#methodkoreksi").val("");

                // Type form
                if (typeKegiatanForm) {
                    typeKegiatanForm.value = "tambah";
                }

                // Focus
                setTimeout(function () {

                    if (JnsCust) {
                        JnsCust.focus();
                    }

                }, 300);
            }
        }
    );


    // =========================================================
    // MODAL HIDDEN
    // =========================================================
    modalCustomer.addEventListener(
        "hidden.bs.modal",
        function () {

            FormCustomer.reset();

            idCustomer = null;
            typeform = null;

            if (typeKegiatanForm) {
                typeKegiatanForm.value = "";
            }

            $("#methodkoreksi").val("");
        }
    );


    // =========================================================
    // WARNING
    // =========================================================
    function showWarningAndFocus(element, message) {

        Swal.fire({
            icon: "warning",
            title: "Warning!",
            text: message,
            returnFocus: false
        }).then(function () {

            if (element) {
                element.focus();
            }

        });

        return false;
    }


    // =========================================================
    // SUBMIT
    // =========================================================
    if (submit_btn) {

        submit_btn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                // =============================================
                // VALIDASI
                // =============================================

                if (
                    NamaCust &&
                    NamaCust.value.trim() === ""
                ) {

                    return showWarningAndFocus(
                        NamaCust,
                        "Isi Nama Customer dahulu!"
                    );
                }


                if (
                    KodeCust &&
                    KodeCust.value.trim() === ""
                ) {

                    return showWarningAndFocus(
                        KodeCust,
                        "Isi Initial Customer dahulu!"
                    );
                }


                // =============================================
                // EDIT
                // =============================================
                if (typeform === "edit") {

                    $.ajax({

                        url: window.customerRoutes.update.replace(
                            "__ID__",
                            idCustomer
                        ),

                        type: "PUT",

                        data: {

                            _token: csrfToken,

                            JnsCust: JnsCust?.value ?? "",
                            NamaCust: NamaCust?.value ?? "",
                            KodeCust: KodeCust?.value ?? "",
                            ContactPerson: ContactPerson?.value ?? "",
                            LimitBeli: LimitBeli?.value ?? "",

                            Alamat: Alamat?.value ?? "",
                            Kota: Kota?.value ?? "",
                            Province: Province?.value ?? "",
                            Negara: Negara?.value ?? "",
                            KodePos: KodePos?.value ?? "",

                            NoTelp1: NoTelp1?.value ?? "",
                            NoTelp2: NoTelp2?.value ?? "",
                            NoTelex: NoTelex?.value ?? "",
                            NoFax1: NoFax1?.value ?? "",
                            NoFax2: NoFax2?.value ?? "",

                            NoHp1: NoHp1?.value ?? "",
                            NoHp2: NoHp2?.value ?? "",

                            Email: Email?.value ?? "",

                            AlamatKirim:
                                AlamatKirim?.value ?? "",

                            KotaKirim:
                                KotaKirim?.value ?? "",

                            NPWP:
                                NPWP?.value ?? "",

                            AlamatNPWP:
                                AlamatNPWP?.value ?? "",

                            NamaNPWP:
                                NamaNPWP?.value ?? "",

                            NITKU:
                                NITKU?.value ?? "",

                            IdPembeliCoretax:
                                IdPembeliCoretax?.value ?? ""
                        },

                        beforeSend: function () {

                            $("#loading-screen").css(
                                "display",
                                "flex"
                            );

                            submit_btn.disabled = true;
                        },

                        success: function (response) {

                            console.log(
                                "Update Customer:",
                                response
                            );

                            Swal.fire({
                                icon: "success",
                                title: "Berhasil",
                                text: "Data Customer berhasil diubah.",
                                timer: 1500,
                                showConfirmButton: false
                            }).then(function () {

                                $("#modalCustomer").modal(
                                    "hide"
                                );

                                customerSales.ajax.reload(
                                    null,
                                    false
                                );
                            });
                        },

                        error: function (xhr) {

                            console.error(
                                "Error update Customer:",
                                xhr
                            );

                            Swal.fire({
                                icon: "error",
                                title: "Gagal",
                                text:
                                    xhr.responseJSON?.message ??
                                    xhr.responseJSON?.error ??
                                    "Data Customer gagal diubah."
                            });
                        },

                        complete: function () {

                            $("#loading-screen").css(
                                "display",
                                "none"
                            );

                            submit_btn.disabled = false;
                        }
                    });

                }


                // =============================================
                // TAMBAH
                // =============================================
                else if (typeform === "tambah") {

                    $.ajax({

                        url: window.customerRoutes.store,

                        type: "POST",

                        data: {

                            _token: csrfToken,

                            JnsCust: JnsCust?.value ?? "",
                            NamaCust: NamaCust?.value ?? "",
                            KodeCust: KodeCust?.value ?? "",
                            ContactPerson:
                                ContactPerson?.value ?? "",

                            LimitBeli:
                                LimitBeli?.value ?? "",

                            Alamat:
                                Alamat?.value ?? "",

                            Kota:
                                Kota?.value ?? "",

                            Province:
                                Province?.value ?? "",

                            Negara:
                                Negara?.value ?? "",

                            KodePos:
                                KodePos?.value ?? "",

                            NoTelp1:
                                NoTelp1?.value ?? "",

                            NoTelp2:
                                NoTelp2?.value ?? "",

                            NoTelex:
                                NoTelex?.value ?? "",

                            NoFax1:
                                NoFax1?.value ?? "",

                            NoFax2:
                                NoFax2?.value ?? "",

                            NoHp1:
                                NoHp1?.value ?? "",

                            NoHp2:
                                NoHp2?.value ?? "",

                            Email:
                                Email?.value ?? "",

                            AlamatKirim:
                                AlamatKirim?.value ?? "",

                            KotaKirim:
                                KotaKirim?.value ?? "",

                            NPWP:
                                NPWP?.value ?? "",

                            AlamatNPWP:
                                AlamatNPWP?.value ?? "",

                            NamaNPWP:
                                NamaNPWP?.value ?? "",

                            NITKU:
                                NITKU?.value ?? "",

                            IdPembeliCoretax:
                                IdPembeliCoretax?.value ?? ""
                        },

                        beforeSend: function () {

                            $("#loading-screen").css(
                                "display",
                                "flex"
                            );

                            submit_btn.disabled = true;
                        },

                        success: function (response) {

                            console.log(
                                "Store Customer:",
                                response
                            );

                            if (response.success) {

                                Swal.fire({
                                    icon: "success",
                                    title: "Berhasil",
                                    text: "Data Customer berhasil disimpan.",
                                    timer: 1500,
                                    showConfirmButton: false
                                }).then(function () {

                                    $("#modalCustomer").modal(
                                        "hide"
                                    );

                                    customerSales.ajax.reload(
                                        null,
                                        false
                                    );
                                });

                            } else {

                                showWarningAndFocus(
                                    NamaCust,
                                    response.error ??
                                    "Data Customer gagal disimpan."
                                );
                            }
                        },

                        error: function (xhr) {

                            console.error(
                                "Error store Customer:",
                                xhr
                            );

                            let message =
                                xhr.responseJSON?.error ??
                                xhr.responseJSON?.message ??
                                "Data Customer gagal disimpan.";

                            showWarningAndFocus(
                                NamaCust,
                                message
                            );
                        },

                        complete: function () {

                            $("#loading-screen").css(
                                "display",
                                "none"
                            );

                            submit_btn.disabled = false;
                        }
                    });
                }
            }
        );
    }


    // =========================================================
    // ENTER NAVIGATION
    // =========================================================

    function nextOnEnter(element, nextElement) {

        if (!element || !nextElement) {
            return;
        }

        element.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    nextElement.focus();
                }
            }
        );
    }


    nextOnEnter(JnsCust, NamaCust);
    nextOnEnter(NamaCust, KodeCust);
    nextOnEnter(KodeCust, ContactPerson);
    nextOnEnter(ContactPerson, LimitBeli);
    nextOnEnter(LimitBeli, Alamat);
    nextOnEnter(Alamat, Kota);
    nextOnEnter(Kota, Province);
    nextOnEnter(Province, Negara);
    nextOnEnter(Negara, KodePos);
    nextOnEnter(KodePos, NoTelp1);
    nextOnEnter(NoTelp1, NoTelp2);
    nextOnEnter(NoTelp2, NoTelex);
    nextOnEnter(NoTelex, NoFax1);
    nextOnEnter(NoFax1, NoFax2);
    nextOnEnter(NoFax2, NoHp1);
    nextOnEnter(NoHp1, NoHp2);
    nextOnEnter(NoHp2, Email);
    nextOnEnter(Email, AlamatKirim);
    nextOnEnter(AlamatKirim, KotaKirim);
    nextOnEnter(KotaKirim, NPWP);
    nextOnEnter(NPWP, NamaNPWP);
    nextOnEnter(NamaNPWP, AlamatNPWP);
    nextOnEnter(AlamatNPWP, NITKU);
    nextOnEnter(NITKU, IdPembeliCoretax);


    // =========================================================
    // INPUT FILTER
    // =========================================================

    function setInputFilter(
        textbox,
        inputFilter,
        errMsg
    ) {

        if (!textbox) {
            return;
        }

        [
            "input",
            "keydown",
            "keyup",
            "mousedown",
            "mouseup",
            "select",
            "contextmenu",
            "drop",
            "focusout"
        ].forEach(function (event) {

            textbox.addEventListener(
                event,
                function (e) {

                    if (inputFilter(this.value)) {

                        if (
                            [
                                "keydown",
                                "mousedown",
                                "focusout"
                            ].indexOf(e.type) >= 0
                        ) {

                            this.classList.remove(
                                "input-error"
                            );

                            this.setCustomValidity("");
                        }

                        this.oldValue = this.value;

                        this.oldSelectionStart =
                            this.selectionStart;

                        this.oldSelectionEnd =
                            this.selectionEnd;

                    } else if (
                        this.hasOwnProperty("oldValue")
                    ) {

                        this.classList.add(
                            "input-error"
                        );

                        this.setCustomValidity(
                            errMsg
                        );

                        this.reportValidity();

                        this.value =
                            this.oldValue;

                        this.setSelectionRange(
                            this.oldSelectionStart,
                            this.oldSelectionEnd
                        );

                    } else {

                        this.value = "";
                    }
                }
            );
        });
    }


    // Angka
    setInputFilter(
        LimitBeli,
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );


    setInputFilter(
        KodePos,
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );


    setInputFilter(
        NoTelp1,
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );


    setInputFilter(
        NoTelp2,
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );


    setInputFilter(
        NoTelex,
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );


    setInputFilter(
        NoFax1,
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );


    setInputFilter(
        NoFax2,
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );


    setInputFilter(
        NoHp1,
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );


    setInputFilter(
        NoHp2,
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );


    setInputFilter(
        NPWP,
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );

});