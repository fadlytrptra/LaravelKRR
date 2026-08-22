$(document).ready(function () {

    //#region get element

    const NamaExpeditor =
        document.getElementById("NamaExpeditor");

    const ContactPerson =
        document.getElementById("ContactPerson");

    const Alamat =
        document.getElementById("Alamat");

    const KodePos =
        document.getElementById("KodePos");

    const Kota =
        document.getElementById("Kota");

    const Propinsi =
        document.getElementById("Propinsi");

    const Negara =
        document.getElementById("Negara");

    const NoTelp1 =
        document.getElementById("NoTelp1");

    const NoTelp2 =
        document.getElementById("NoTelp2");

    const NoTelex =
        document.getElementById("NoTelex");

    const NoFax1 =
        document.getElementById("NoFax1");

    const NoFax2 =
        document.getElementById("NoFax2");

    const NoHp1 =
        document.getElementById("NoHp1");

    const NoHp2 =
        document.getElementById("NoHp2");

    const Email =
        document.getElementById("Email");

    //#endregion


    //#region enter-enter

    if (NamaExpeditor) {

        NamaExpeditor.focus();

        NamaExpeditor.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    ContactPerson?.focus();
                }
            }
        );
    }


    if (ContactPerson) {

        ContactPerson.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    Alamat?.focus();
                }
            }
        );
    }


    if (Alamat) {

        Alamat.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    KodePos?.focus();
                }
            }
        );
    }


    if (KodePos) {

        KodePos.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    Kota?.focus();
                }
            }
        );
    }


    if (Kota) {

        Kota.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    Propinsi?.focus();
                }
            }
        );
    }


    if (Propinsi) {

        Propinsi.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    Negara?.focus();
                }
            }
        );
    }


    if (Negara) {

        Negara.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    NoTelp1?.focus();
                }
            }
        );
    }


    if (NoTelp1) {

        NoTelp1.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    NoTelp2?.focus();
                }
            }
        );
    }


    if (NoTelp2) {

        NoTelp2.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    NoTelex?.focus();
                }
            }
        );
    }


    if (NoTelex) {

        NoTelex.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    NoFax1?.focus();
                }
            }
        );
    }


    if (NoFax1) {

        NoFax1.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    NoFax2?.focus();
                }
            }
        );
    }


    if (NoFax2) {

        NoFax2.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    NoHp1?.focus();
                }
            }
        );
    }


    if (NoHp1) {

        NoHp1.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    NoHp2?.focus();
                }
            }
        );
    }


    if (NoHp2) {

        NoHp2.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    Email?.focus();
                }
            }
        );
    }

    //#endregion


    //#region input filter

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

                        this.oldValue =
                            this.value;

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


    // Kode Pos
    setInputFilter(
        KodePos,
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );


    // Telpon
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


    // Telex
    setInputFilter(
        NoTelex,
        function (value) {
            return /^-?\d*$/.test(value);
        },
        "Harus diisi dengan angka!"
    );


    // Fax
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


    // HP
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

    //#endregion

});