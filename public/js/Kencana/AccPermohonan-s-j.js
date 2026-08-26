// get all element
let button_submitSelected = document.getElementById("button_submitSelected");
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
let detailSJLabel = document.getElementById("detailSJLabel");
let Uraian = document.getElementById("Uraian");
let QtyPrimer = document.getElementById("QtyPrimer");
let QtySekunder = document.getElementById("QtySekunder");
let QtyTritier = document.getElementById("QtyTritier");
let MinDO = document.getElementById("MinDO");
let MaxDO = document.getElementById("MaxDO");

$(document).on("click", ".DetailKirim", function (e) {
    // get the data from the row
    let IdHeaderKirim = $(this).data("id");
    let IdPengiriman = $(this).data("sj");
    console.log(IdHeaderKirim);
    console.log(IdPengiriman);

    // populate the modal with the data
    // console.log(row);
    detailSJLabel.value = "Surat Jalan " + IdPengiriman;
    $.ajax({
        url: "/Kencana/SuratJalanManager/getDataHeader",
        type: "GET",
        data: {
            _token: csrfToken,
            IdHeaderKirim: IdHeaderKirim,
        },
        success: function (response) {
            console.log(response);
            if (response.message) {
                Uraian.value = response.message[0].Uraian; // prettier-ignore
                QtyPrimer.value = numeral(response.message[0].QtyPrimer).format('0,0'); // prettier-ignore
                QtySekunder.value = numeral(response.message[0].QtySekunder).format('0,0'); // prettier-ignore
                QtyTritier.value = numeral(response.message[0].QtyTritier).format('0,0'); // prettier-ignore
                MinDO.value = numeral(response.message[0].MinKirimDO).format('0,0'); // prettier-ignore
                MaxDO.value = numeral(response.message[0].MaxKirimDO).format('0,0'); // prettier-ignore
                $("#detailSjModal").modal("show");
            } else if (response.error) {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
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

// get the modal element
var modal = document.getElementById("myModal");

// get the close button
var closeBtn = document.querySelector(".close");

// close the modal when the user clicks outside of it or on the close button
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

button_submitSelected.addEventListener("click", function (event) {
    event.preventDefault();
    let table = document.getElementById("table_SJ");
    let rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].cells;
        let checkbox = cells[0].getElementsByTagName("input")[0]; // get the checkbox in the current row
        // console.log(checkbox.value);
        if (checkbox.checked) {
            // check if the checkbox is checked
            let nomorDO = checkbox.value; // get the value of the "Nomor SP" column
            // console.log(nomorDO);
            let input = document.createElement("input"); // create a new input element
            input.type = "hidden"; // set the input type to 'hidden'
            input.name = "nomorSJs[]"; // set the input name to 'nomorSPs[]'
            input.value = nomorDO; // set the input value to the current nomorSP value
            form_submitSelected.appendChild(input); // append the input element to the form
            // console.log(form_submitSelected);
        }
    }

    // append the form to the document and submit it
    // document.body.appendChild(form_submitSelected);
    form_submitSelected.submit();
});
