//#region Variables

//#endregion

//#region Events

btnKeluar.addEventListener("click", function () {
    if (this.textContent !== "Keluar") {
        clearForm();
    } else window.location.href = "/";
});

//#endregion

//#region Functions

function init() {}

$(document).ready(function () {
    init();
});

//#endregion
