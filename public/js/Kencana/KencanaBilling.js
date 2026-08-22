//#region get element

let NamaBill = document.getElementById("NamaBill");
let ContactPerson = document.getElementById("ContactPerson");
let Alamat = document.getElementById("Alamat");
let KodePos = document.getElementById("KodePos");
let Kota = document.getElementById("Kota");
let Provinsi = document.getElementById("Provinsi");
let Negara = document.getElementById("Negara");
let NoTelp1 = document.getElementById("NoTelp1");
let NoTelp2 = document.getElementById("NoTelp2");
let NoTelex = document.getElementById("NoTelex");
let NoFax1 = document.getElementById("NoFax1");
let NoFax2 = document.getElementById("NoFax2");
let NoHp1 = document.getElementById("NoHp1");
let NoHp2 = document.getElementById("NoHp2");
let Email = document.getElementById("Email");

//#endregion

//#region enter-enter

NamaBill.focus();

NamaBill.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        ContactPerson.focus();
    }
});
ContactPerson.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Alamat.focus();
    }
});
Alamat.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        KodePos.focus();
    }
});
KodePos.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Kota.focus();
    }
});
Kota.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Provinsi.focus();
    }
});
Provinsi.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Negara.focus();
    }
});
Negara.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoTelp1.focus();
    }
});
NoTelp1.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoTelp2.focus();
    }
});
NoTelp2.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoTelex.focus();
    }
});
NoTelex.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoFax1.focus();
    }
});
NoFax1.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoFax2.focus();
    }
});
NoFax2.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoHp1.focus();
    }
});
NoHp1.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        NoHp2.focus();
    }
});
NoHp2.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Email.focus();
    }
});

//#endregion

//#region input filter
//Penjelasan setinputfilter function: https://jsfiddle.net/KarmaProd/tgn9d1uL/4/
function setInputFilter(textbox, inputFilter, errMsg) {
    [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
        "focusout",
    ].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value - restore the previous one
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(
                    this.oldSelectionStart,
                    this.oldSelectionEnd
                );
            } else {
                // Rejected value - nothing to restore
                this.value = "";
            }
        });
    });
}

setInputFilter(
    document.getElementById("KodePos"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoTelp1"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoTelp2"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoTelex"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoFax1"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoFax2"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoHp1"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("NoHp2"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);

//#endregion
