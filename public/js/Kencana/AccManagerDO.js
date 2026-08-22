let button_submitSelected = document.getElementById("button_submitSelected");
let form_submitSelected = document.getElementById("form_submitSelected");
let array_nomorSP = [];

button_submitSelected.addEventListener("click", function (event) {
    event.preventDefault();

    // create a new form element to submit the selected surat pesanan
    // form_submitSelected.method = "POST";
    // form_submitSelected.action = "{{ url('/SuratPesananManager/upall') }}";
    // form_submitSelected.enctype = "multipart/form-data";
    // form_submitSelected.append("_token","{{ csrf_token() }}");
    // form_submitSelected.style.display = "none"; // hide the form from the user

    // loop through all the rows of the table
    let table = document.getElementById("table_DO");
    let rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].cells;
        let checkbox = cells[0].getElementsByTagName("input")[0]; // get the checkbox in the current row
        console.log(checkbox !== undefined, checkbox.checked);
        if (checkbox !== undefined && checkbox.checked) {
            // check if the checkbox is checked
            let nomorDO = checkbox.value; // get the value of the "Nomor SP" column
            // console.log(nomorDO);
            let input = document.createElement("input"); // create a new input element
            input.type = "hidden"; // set the input type to 'hidden'
            input.name = "nomorDOs[]"; // set the input name to 'nomorSPs[]'
            input.value = nomorDO; // set the input value to the current nomorSP value
            form_submitSelected.appendChild(input); // append the input element to the form
            console.log(form_submitSelected);
        }
        // if (form_submitSelected == undefined) {

        // }
    }
    console.log(form_submitSelected);

    let hiddenInputs = form_submitSelected.querySelectorAll(
        'input[type="hidden"][name="nomorDOs[]"]'
    );
    console.log(hiddenInputs.length);
    if (hiddenInputs.length == 0) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Tidak ada DO yang dipilih",
            showConfirmButton: false,
            timer: 1000,
        });
    } else {
        form_submitSelected.submit();
    }

    // append the form to the document and submit it
    // document.body.appendChild(form_submitSelected);
});

$(document).ready(function () {
    $("#checkAll").on("change", function () {
        $('input[name="selected[]"]').prop("checked", this.checked);
    });

    // Sync "check all" checkbox if one is manually unchecked
    $('input[name="selected[]"]').on("change", function () {
        if (!this.checked) {
            $("#checkAll").prop("checked", false);
        } else if (
            $('input[name="selected[]"]:checked').length ===
            $('input[name="selected[]"]').length
        ) {
            $("#checkAll").prop("checked", true);
        }
    });
});
