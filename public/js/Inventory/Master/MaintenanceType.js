var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

var divisiId = document.getElementById("divisiId");
var divisiNama = document.getElementById("divisiNama");
var objekId = document.getElementById("objekId");
var objekNama = document.getElementById("objekNama");
var kelompokId = document.getElementById("kelompokId");
var kelompokNama = document.getElementById("kelompokNama");
var kelutId = document.getElementById("kelutId");
var kelutNama = document.getElementById("kelutNama");
var subkelId = document.getElementById("subkelId");
var subkelNama = document.getElementById("subkelNama");
var katUtama = document.getElementById("katUtama");
var kategori = document.getElementById("kategori");
var jenis = document.getElementById("jenis");
var kdBarang = document.getElementById("kdBarang");
var namaBarang = document.getElementById("namaBarang");
var kodeType = document.getElementById("kode_type");
var PIB = document.getElementById("PIB");
var PEB = document.getElementById("PEB");
var namaType = document.getElementById("namaType");
var ketType = document.getElementById("ketType");
var triter = document.getElementById("triter");
var sekunder = document.getElementById("sekunder");
var primer = document.getElementById("primer");
var satuan = document.getElementById("satuan");
var konversi = document.getElementById("konversi");
var primerSekunder = document.getElementById("primerSekunder");
var sekunderTritier = document.getElementById("sekunderTritier");

// button
var btn_divisi = document.getElementById("btn_divisi");
var btn_objek = document.getElementById("btn_objek");
var btn_kelompok = document.getElementById("btn_kelompok");
var btn_kelut = document.getElementById("btn_kelut");
var btn_subkel = document.getElementById("btn_subkel");
var btn_katUtama = document.getElementById("btn_katUtama");
var btn_kategori = document.getElementById("btn_kateogri");
var btn_jenis = document.getElementById("btn_jenis");
var btn_barang = document.getElementById("btn_brang");
var btn_kodeType = document.getElementById("btn_kodetype");
var btn_namaType = document.getElementById("btn_namatype");
var btn_triter = document.getElementById("btn_triter");
var btn_sekunder = document.getElementById("btn_sekunder");
var btn_primer = document.getElementById("btn_primer");
var btn_isi = document.getElementById("btn_isi");
var btn_proses = document.getElementById("btn_proses");
var btn_batal = document.getElementById("btn_batal");
var btn_koreksi = document.getElementById("btn_koreksi");
var btn_hapus = document.getElementById("btn_hapus");

var idtype;
var no_katUtama;
var no_kategori;
var no_subkategori;
var no_tritier;
var no_sekunder;
var no_primer;

var selectedOption;
var selectedNo;

let a; // isi = 1, koreksi = 2, hapus = 3
let impor = 0;
let tmpKode = "";
const divKonversiPS = document.getElementById("konvPS");
const divKonversiST = document.getElementById("konvST");
const inputs = Array.from(
    document.querySelectorAll(
        '.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'
    )
);

btn_isi.focus();

btn_divisi.addEventListener("focus", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// btn_isi.addEventListener("focus", function () {
//     window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
// });

// fungsi berhubungan dengan ENTER & oengecekkan yg kosong2
inputs.forEach((masuk, index) => {
    masuk.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            if (masuk.value.trim() !== "") {
                if (masuk.id === "ketType") {
                    btn_triter.focus();
                } else if (masuk.id === "primerSekunder") {
                    sekunderTritier.select();
                } else if (masuk.id === "kdBarang") {
                    tmpKode = formatKdBarang(kdBarang.value);
                    fillKodeBarang(tmpKode);
                } else {
                    inputs[index + 1].focus();
                }
            } else {
                inputs[index + 1].focus();
            }
        }
    });
});

// format kode barang
function formatKdBarang(kdBarang) {
    kdBarang = kdBarang.trim();
    return kdBarang.padStart(9, "0");
}

// fungsi untuk autofill jika isi kode barang
function fillKodeBarang(tmpKode) {
    console.log(tmpKode);

    $.ajax({
        url: "MaintenanceType/fillKodeBarang",
        type: "GET",
        data: {
            _token: csrfToken,
            kdBarang: tmpKode,
        },
        timeout: 30000,
        success: function (response) {
            if (response.length > 0) {
                let result = response[0];
                kdBarang.value = result.KD_BRG.trim();

                katUtama.value = decodeHtmlEntities(result.kat_utama.trim());
                no_katUtama = result.no_kat_utama.trim();
                kategori.value = decodeHtmlEntities(
                    result.nama_kategori.trim()
                );
                no_kategori = result.no_kategori.trim();
                jenis.value = decodeHtmlEntities(
                    result.nama_sub_kategori.trim()
                );
                no_subkategori = result.no_sub_kategori.trim();
                namaBarang.value = decodeHtmlEntities(result.NAMA_BRG.trim());
                namaType.value = decodeHtmlEntities(result.NAMA_BRG.trim());

                triter.value = result.Tritier?.trim() ?? "NULL";
                no_tritier = result.No_Sat_Tri?.trim() ?? "000";
                sekunder.value = result.Sekunder?.trim() ?? "NULL";
                no_sekunder = result.No_Sat_Sek?.trim() ?? "000";
                primer.value = result.Primer?.trim() ?? "NULL";
                no_primer = result.No_Sat_Prim?.trim() ?? "000";

                populateDropdownWithSatuanUmum(
                    "satuan",
                    result.Satuan.trim(),
                    triter.value,
                    sekunder.value,
                    primer.value,
                    no_tritier,
                    no_sekunder,
                    no_primer
                );
                ketType.value = result.KET.trim();

                namaType.select();

                let kdBarangStr = String(kdBarang);
                let a = kdBarangStr.charAt(0);
                let b = kdBarangStr.charAt(1);

                if (a === "1" || a === "4") {
                    if (b !== "0" || b !== "1") {
                        impor = 1;
                    }
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Kode Barang Tidak Ada",
                    returnFocus: false,
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error:", error);
        },
    });
}

// button list divisi
btn_divisi.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Divisi",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Divisi</th>
                            <th scope="col">Nama Divisi</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getDivisi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [{ data: "IdDivisi" }, { data: "NamaDivisi" }],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                divisiId.value = result.value.IdDivisi.trim();
                divisiNama.value = decodeHtmlEntities(
                    result.value.NamaDivisi.trim()
                );
                btn_objek.click();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list objek
btn_objek.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Objek",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Objek</th>
                            <th scope="col">Nama Objek</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getObjek",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                divisiId: divisiId.value,
                            },
                        },
                        columns: [{ data: "IdObjek" }, { data: "NamaObjek" }],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                objekId.value = result.value.IdObjek.trim();
                objekNama.value = decodeHtmlEntities(
                    result.value.NamaObjek.trim()
                );
                btn_kelut.click();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok utama
btn_kelut.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Kelompok Utama",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Kelompok Utama</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getKelUt",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                objekId: objekId.value,
                            },
                        },
                        columns: [
                            { data: "IdKelompokUtama" },
                            { data: "NamaKelompokUtama" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                kelutId.value = result.value.IdKelompokUtama.trim();
                kelutNama.value = decodeHtmlEntities(
                    result.value.NamaKelompokUtama.trim()
                );
                btn_kelompok.click();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok
btn_kelompok.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Kelompok",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Kelompok</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getKelompok",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelutId: kelutId.value,
                            },
                        },
                        columns: [
                            { data: "idkelompok" },
                            { data: "namakelompok" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                kelompokId.value = result.value.idkelompok.trim();
                kelompokNama.value = decodeHtmlEntities(
                    result.value.namakelompok.trim()
                );
                btn_subkel.click();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kelompok
btn_subkel.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Sub Kelompok",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Sub Kelompok</th>
                            <th scope="col">Nama Sub Kelompok</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getSubkel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelompokId: kelompokId.value,
                            },
                        },
                        columns: [
                            { data: "IdSubkelompok" },
                            { data: "NamaSubKelompok" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                subkelId.value = result.value.IdSubkelompok.trim();
                subkelNama.value = result.value.NamaSubKelompok.trim();
                if (a === 1) {
                    btn_katUtama.focus();
                } else {
                    btn_kodeType.disabled = false;
                    btn_kodeType.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kategori utama
btn_katUtama.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Kategori Utama",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Kat. Utama</th>
                            <th scope="col">Nama</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getKatut",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [{ data: "no_kat_utama" }, { data: "nama" }],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                katUtama.value = decodeHtmlEntities(result.value.nama.trim());
                no_katUtama = result.value.no_kat_utama.trim();
                console.log("kat utama", no_katUtama);

                btn_kategori.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kategori
btn_kategori.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Kategori ",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Kategori</th>
                            <th scope="col">Nama</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getKategori",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                no_katUtama: no_katUtama,
                            },
                        },
                        columns: [
                            { data: "no_kategori" },
                            { data: "nama_kategori" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                kategori.value = decodeHtmlEntities(
                    result.value.nama_kategori.trim()
                );
                no_kategori = result.value.no_kategori.trim();
                console.log("kategori ", no_kategori);

                btn_jenis.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kategori
btn_jenis.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Sub. Kategori",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Sub. Kategori</th>
                            <th scope="col">Nama</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getSubkategori",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                no_kategori: no_kategori,
                            },
                        },
                        columns: [
                            { data: "no_sub_kategori" },
                            { data: "nama_sub_kategori" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                jenis.value = decodeHtmlEntities(
                    result.value.nama_sub_kategori.trim()
                );
                no_subkategori = result.value.no_sub_kategori.trim();
                btn_barang.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});
var selectedValue;
// button list barang
btn_barang.addEventListener("click", function (e) {
    if (no_kategori.value === "") {
        Swal.fire({
            icon: "warning",
            title: "Tentukan kategori terlebih dahulu",
            returnFocus: false,
        }).then(() => {
            btn_kategori.focus();
        });
        return;
    }

    try {
        Swal.fire({
            title: "Barang",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Kode Barang</th>
                            <th scope="col">Nama Barang</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "90%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getBarang",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                no_subkategori: no_subkategori,
                            },
                        },
                        columns: [{ data: "KD_BRG" }, { data: "NAMA_BRG" }],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "150px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const barangResult = result.value;
                const kdBarangValue = barangResult.KD_BRG.trim();
                const namaBarangValue = decodeHtmlEntities(
                    barangResult.NAMA_BRG.trim()
                );

                kdBarang.value = kdBarangValue;
                namaBarang.value = namaBarangValue;
                namaType.value = namaBarangValue;

                tmpKode = formatKdBarang(kdBarang.value);
                fillKodeBarang(tmpKode);

                $.ajax({
                    url: "MaintenanceType/getSatuanBarang",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        kdBarang: kdBarangValue,
                    },
                    success: function (response) {
                        const satuanBarangArray = Array.isArray(
                            response.data_satuanBarang
                        )
                            ? response.data_satuanBarang
                            : [];
                        const satuanResult =
                            response.data_satuanBarang.length > 0
                                ? satuanBarangArray[0]
                                : {};

                        triter.value = satuanResult.NmSat_Tri?.trim() || "Null";
                        sekunder.value =
                            satuanResult.NmSat_Sek?.trim() || "Null";
                        primer.value =
                            satuanResult.NmSat_Prim?.trim() || "Null";
                        no_tritier = satuanResult.ST_TRI?.trim() || "000";
                        no_sekunder = satuanResult.ST_SEK?.trim() || "000";
                        no_primer = satuanResult.ST_PRIM?.trim() || "000";

                        populateDropdownFromValues(
                            "satuan",
                            triter.value,
                            sekunder.value,
                            primer.value,
                            no_tritier,
                            no_sekunder,
                            no_primer
                        );

                        satuan.addEventListener("change", function () {
                            var selectedOption =
                                this.options[this.selectedIndex];
                            var selectedValue = selectedOption.value;
                            var selectedNo =
                                selectedOption.getAttribute("data-no");

                            console.log("Selected Value:", selectedValue);
                            console.log("Associated Number:", selectedNo);
                        });
                    },
                    error: function (error) {
                        console.error("Error fetching satuanBarang:", error);
                    },
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// fungsi unk bikin dropdown satuan umum dr kdBarang
function populateDropdownFromValues(
    dropdownId,
    triterValue,
    sekunderValue,
    primerValue,
    noTritier,
    noSekunder,
    noPrimer
) {
    var dropdown = document.getElementById(dropdownId);

    var options = [
        {
            value: "",
            text: "Pilih Satuan",
            disabled: true,
            data: {},
        },
    ].concat(
        [
            { value: triterValue, text: triterValue, data: { no: noTritier } },
            {
                value: sekunderValue,
                text: sekunderValue,
                data: { no: noSekunder },
            },
            { value: primerValue, text: primerValue, data: { no: noPrimer } },
        ].filter(function (option) {
            return option.value !== "Null" && option.value.trim() !== "";
        })
    );

    dropdown.innerHTML = options
        .map(function (option) {
            return (
                '<option value="' +
                option.value +
                '" data-no="' +
                (option.data.no || "") +
                '">' +
                option.text +
                "</option>"
            );
        })
        .join("");
}

var selectedNo;

// fungsi unk retrieve dropdown satuan umum dari database & pilih ulang
function populateDropdownWithSatuanUmum(
    dropdownId,
    response,
    triterValue,
    sekunderValue,
    primerValue,
    noTritier,
    noSekunder,
    noPrimer
) {
    // console.log(triter.value, sekunder.value, primer.value, no_tritier, no_sekunder, no_primer);

    var dropdown = document.getElementById(dropdownId);

    var options = [
        {
            value: "",
            text: "Pilih Satuan",
            disabled: true,
            data: {},
        },
    ].concat(
        [
            { value: triterValue, text: triterValue, data: { no: noTritier } },
            {
                value: sekunderValue,
                text: sekunderValue,
                data: { no: noSekunder },
            },
            { value: primerValue, text: primerValue, data: { no: noPrimer } },
        ].filter(function (option) {
            return option.value !== "Null" && option.value.trim() !== "";
        })
    );

    dropdown.innerHTML = options
        .map(function (option) {
            return (
                '<option value="' +
                option.value +
                '" data-no="' +
                (option.data.no || "") +
                '">' +
                option.text +
                "</option>"
            );
        })
        .join("");

    for (var i = 0; i < dropdown.options.length; i++) {
        var option = dropdown.options[i];
        if (option.value.trim() === response.trim()) {
            selectedNo = option.getAttribute("data-no");
            console.log(
                "Matching option found with data-no:",
                selectedNo,
                option.value
            );
            dropdown.selectedIndex = i;
            break;
        }
    }
}

satuan.addEventListener("change", function () {
    var selectedOption = this.options[this.selectedIndex];
    selectedNo = selectedOption.getAttribute("data-no");
});

// button list tritier
btn_triter.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Tritier",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Satuan</th>
                            <th scope="col">Nama Satuan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getSatuan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            { data: "no_satuan" },
                            { data: "nama_satuan" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                triter.value = result.value.nama_satuan.trim();
                no_tritier = result.value.no_satuan.trim();
                populateDropdownFromValues(
                    "satuan",
                    triter.value,
                    sekunder.value,
                    primer.value,
                    no_tritier,
                    no_sekunder,
                    no_primer
                );
                btn_sekunder.focus();
            } else {
                if (!no_tritier) {
                    Swal.fire({
                        icon: "warning",
                        title: "Jika satuan tidak ada, pilih Null !!",
                        returnFocus: false,
                    }).then(() => {
                        btn_triter.focus();
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sekunder
btn_sekunder.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Sekunder",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Satuan</th>
                            <th scope="col">Nama Satuan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getSatuan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            { data: "no_satuan" },
                            { data: "nama_satuan" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                sekunder.value = result.value.nama_satuan.trim();
                no_sekunder = result.value.no_satuan.trim();
                populateDropdownFromValues(
                    "satuan",
                    triter.value,
                    sekunder.value,
                    primer.value,
                    no_tritier,
                    no_sekunder,
                    no_primer
                );
                btn_primer.focus();
            } else {
                if (!no_tritier) {
                    Swal.fire({
                        icon: "warning",
                        title: "Jika satuan tidak ada, pilih Null !!",
                        returnFocus: false,
                    }).then(() => {
                        btn_sekunder.focus();
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list primer
btn_primer.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Primer",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">No Satuan</th>
                            <th scope="col">Nama Satuan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getSatuan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            { data: "no_satuan" },
                            { data: "nama_satuan" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "100px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                primer.value = result.value.nama_satuan.trim();
                no_primer = result.value.no_satuan.trim();
                populateDropdownFromValues(
                    "satuan",
                    triter.value,
                    sekunder.value,
                    primer.value,
                    no_tritier,
                    no_sekunder,
                    no_primer
                );
                btn_proses.focus();
            } else {
                if (!no_tritier) {
                    Swal.fire({
                        icon: "warning",
                        title: "Jika satuan tidak ada, pilih Null !!",
                        returnFocus: false,
                    }).then(() => {
                        btn_primer.focus();
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// fungsi unk menampilkan '&'
function decodeHtmlEntities(str) {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
}

// fungsi swal select pake arrow
function handleTableKeydown(e, tableId) {
    const table = $(`#${tableId}`).DataTable();
    const rows = $(`#${tableId} tbody tr`);
    const rowCount = rows.length;

    if (e.key === "Enter") {
        e.preventDefault();
        const selectedRow = table.row(".selected").data();
        if (selectedRow) {
            Swal.getConfirmButton().click();
        } else {
            const firstRow = $(`#${tableId} tbody tr:first-child`);
            if (firstRow.length) {
                firstRow.click();
                Swal.getConfirmButton().click();
            }
        }
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === null || currentIndex >= rowCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null || currentIndex <= 0) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex--;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table
                .page("next")
                .draw("page")
                .on("draw", function () {
                    currentIndex = 0;
                    const newRows = $(`#${tableId} tbody tr`);
                    const selectedRow = $(newRows[currentIndex]).addClass(
                        "selected"
                    );
                    scrollRowIntoView(selectedRow[0]);
                });
        }
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table
                .page("previous")
                .draw("page")
                .on("draw", function () {
                    currentIndex = 0;
                    const newRows = $(`#${tableId} tbody tr`);
                    const selectedRow = $(newRows[currentIndex]).addClass(
                        "selected"
                    );
                    scrollRowIntoView(selectedRow[0]);
                });
        }
    }
}

// Helper function to scroll selected row into view
function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: "nearest" });
}

function handleChange(event) {
    var selectedValue = event.target.value;
    satuan.value = selectedValue;
}

satuan.addEventListener("change", handleChange);

// fungsi unk display & hide konversi primer sekunter tritier
function toggleKonversiInputs() {
    if (konversi.checked) {
        divKonversiPS.style.display = "flex";
        divKonversiST.style.display = "flex";
        primerSekunder.value = 0;
        sekunderTritier.value = 0;
        primerSekunder.select();
    } else {
        divKonversiPS.style.display = "none";
        divKonversiST.style.display = "none";
    }
}

konversi.addEventListener("change", toggleKonversiInputs);

toggleKonversiInputs();

// fungsi unk catet perubahan subkelId & update ke getListKoreksi
function updateSubkelId(currentSubkelId) {
    if ($.fn.DataTable.isDataTable("#table_list")) {
        const table = $("#table_list").DataTable();
        table.ajax
            .url("MaintenanceType/getListKoreksi?subkelId=" + currentSubkelId)
            .load();
    }
}

// update subkelId yg berubah
subkelId.addEventListener("change", function () {
    const currentSubkelId = subkelId.value;
    updateSubkelId(currentSubkelId);
});

// button kode type & nama type sama
btn_kodeType.addEventListener("click", handleTypeSelection);
btn_namaType.addEventListener("click", handleTypeSelection);

function handleTypeSelection() {
    const currentSubkelId = subkelId.value;
    console.log("currentSubkelId:", currentSubkelId);

    if (divisiNama.value === "") {
        Swal.fire({
            icon: "warning",
            title: "Data Belum Lengkap Terisi",
            returnFocus: false,
        }).then(() => {
            btn_divisi.focus();
        });
        return;
    } else if (objekNama.value === "") {
        Swal.fire({
            icon: "warning",
            title: "Data Belum Lengkap Terisi",
            returnFocus: false,
        }).then(() => {
            btn_objek.focus();
        });
        return;
    } else if (kelutNama.value === "") {
        Swal.fire({
            icon: "warning",
            title: "Data Belum Lengkap Terisi",
            returnFocus: false,
        }).then(() => {
            btn_kelut.focus();
        });
        return;
    } else if (kelompokNama.value === "") {
        Swal.fire({
            icon: "warning",
            title: "Data Belum Lengkap Terisi",
            returnFocus: false,
        }).then(() => {
            btn_kelompok.focus();
        });
        return;
    } else if (subkelNama.value === "") {
        Swal.fire({
            icon: "warning",
            title: "Data Belum Lengkap Terisi",
            returnFocus: false,
        }).then(() => {
            btn_subkel.focus();
        });
        return;
    }

    if (
        (a === 2 && divisiId.value === "INV") ||
        (a === 3 && divisiId.value === "INV")
    ) {
        satuan.disabled = true;
    } else if (
        (a === 2 && divisiId.value !== "INV") ||
        (a === 3 && divisiId.value !== "INV")
    ) {
        satuan.disabled = false;
    }

    try {
        Swal.fire({
            title: "Kode Type",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Type</th>
                            <th scope="col">Nama Type</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "90%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceType/getListKoreksi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                subkelId: currentSubkelId,
                            },
                        },
                        columns: [{ data: "IdType" }, { data: "namaType" }],
                        columnDefs: [
                            {
                                targets: 0,
                                width: "200px",
                            },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                kodeType.value = decodeHtmlEntities(result.value.IdType.trim());
                namaType.value =
                    decodeHtmlEntities(result.value.namaType?.trim()) || "-";

                // First AJAX call
                $.ajax({
                    url: "MaintenanceType/getSatuanKodeBarang",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        idtype: kodeType.value,
                        subkelId: subkelId.value,
                    },
                    timeout: 30000,
                    success: function (response) {
                        const unitResponse = response.data_unit[0];
                        const kodeResponse = response.data_kode[0];

                        console.log(unitResponse, kodeResponse);

                        // Update input fields with kodeResponse data
                        kdBarang.value = kodeResponse.KD_BRG?.trim() ?? "";
                        namaBarang.value = kodeResponse.NAMA_BRG?.trim() ?? "";
                        jenis.value = kodeResponse.SubKategory?.trim() ?? "";
                        kategori.value = kodeResponse.Kategory?.trim() ?? "";
                        katUtama.value =
                            kodeResponse.Kategory_Utama?.trim() ?? "";

                        // Update input fields with unitResponse data
                        ketType.value = unitResponse.UraianType?.trim() ?? "-";
                        PIB.value = unitResponse.PIB?.trim() ?? "";
                        PEB.value = unitResponse.PEB?.trim() ?? "";

                        if (unitResponse.PakaiAturanKonversi?.trim() === "Y") {
                            konversi.checked = true;
                        } else {
                            konversi.checked = false;
                        }
                        toggleKonversiInputs();
                        primerSekunder.value =
                            unitResponse.KonvSekunderKePrimer?.trim() ?? "";
                        sekunderTritier.value =
                            unitResponse.KonvTritierKeSekunder?.trim() ?? "";

                        triter.value =
                            unitResponse.satuan_tritier?.trim() ?? "NULL";
                        no_tritier = unitResponse.kdSatTertier?.trim() ?? "000";
                        sekunder.value =
                            unitResponse.satuan_sekunder?.trim() ?? "NULL";
                        no_sekunder =
                            unitResponse.kdSatSekunder?.trim() ?? "000";
                        primer.value =
                            unitResponse.satuan_primer?.trim() ?? "NULL";
                        no_primer = unitResponse.kdSatPrimer?.trim() ?? "000";

                        populateDropdownFromValues(
                            "satuan",
                            triter.value,
                            sekunder.value,
                            primer.value,
                            no_tritier,
                            no_sekunder,
                            no_primer
                        );
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX Error:", error);
                    },
                });

                // Second AJAX call
                $.ajax({
                    url: "MaintenanceType/getSatuanUmum",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        idtype: kodeType.value,
                    },
                    timeout: 30000,
                    success: function (response) {
                        if (response && response.length > 0) {
                            if (response && response.length > 0) {
                                populateDropdownWithSatuanUmum(
                                    "satuan",
                                    response,
                                    triter.value,
                                    sekunder.value,
                                    primer.value,
                                    no_tritier,
                                    no_sekunder,
                                    no_primer
                                );
                            } else {
                                document.getElementById("satuan").innerHTML =
                                    '<option value="" disabled selected>Pilih Satuan Umum</option>';
                            }
                        }
                        namaType.select();
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX Error:", error);
                    },
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
}

// button proses
btn_proses.addEventListener("click", function (e) {
    if (konversi.checked) {
        konversi.value = "Y";
    } else {
        konversi.value = "T";
    }

    if (selectedNo === "") {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Pilih Satuan Umum Dahulu!",
        }).then(() => {
            satuan.focus();
        });
    } else {
        if (a === 3) {
            Swal.fire({
                title: "Konfirmasi",
                text: `Hapus Type : ${namaType.value}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Hapus",
                cancelButtonText: "Batal",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("Type deleted");

                    $.ajax({
                        url: "MaintenanceType/hapusMaintenance",
                        type: "DELETE",
                        data: {
                            _token: csrfToken,
                            idtype: kodeType.value,
                        },
                        timeout: 30000,
                        success: function (response) {
                            if (response.success) {
                                const idtype =
                                    response.data && response.data[0]
                                        ? response.data[0].idtype
                                        : "";
                                Swal.fire({
                                    icon: "success",
                                    title: "Data terHAPUS",
                                }).then(() => {
                                    disableKetik();
                                    allInputs.forEach(function (input) {
                                        input.value = "";
                                    });
                                    konversi.checked = false;
                                    satuan.value = "";
                                    divKonversiPS.style.display = "none";
                                    divKonversiST.style.display = "none";

                                    btn_isi.focus();
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Data Tidak ter-HAPUS.",
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("AJAX Error:", error);
                        },
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    console.log("Type deletion cancelled");
                }
            });
        }

        try {
            console.log(
                kdBarang.value.substring(1, 2),
                PIB.value,
                kdBarang.value.substring(1, 2) == 3,
                PIB.value == ""
            );

            if (kdBarang.value === "" || namaType.value === "") {
                Swal.fire({
                    icon: "warning",
                    title: "Data Belum Lengkap Terisi",
                    text: "Kode Barang Tidak Boleh Kosong !",
                    returnFocus: false,
                }).then(() => {
                    kdBarang.focus();
                });
            } else if (kdBarang.value.substring(1, 2) == 3 && PIB.value == "") {
                Swal.fire({
                    icon: "warning",
                    title: "PIB Harus Terisi",
                    text: "Untuk kode barang KITE tidak boleh kosong !",
                    returnFocus: false,
                }).then(() => {
                    PIB.focus();
                });
            } else {
                if (tmpKode === "") {
                    tmpKode = kdBarang.value;
                }
                console.log("data tersimpan");

                $.ajax({
                    type: "GET",
                    url: "MaintenanceType/proses",
                    data: {
                        _token: csrfToken,
                        a: a,
                        impor: impor,
                        namaType: namaType.value,
                        ketType: ketType.value,
                        PIB: PIB.value,
                        PEB: PEB.value,
                        kdBarang: tmpKode,
                        subkelId: subkelId.value,
                        konversi: konversi.value,
                        divisiId: divisiId.value,
                        divisiNama: divisiNama.value,
                        objekId: objekId.value,
                        objekNama: objekNama.value,
                        kelompokId: kelompokId.value,
                        kelompokNama: kelompokNama.value,
                        kelutId: kelutId.value,
                        kelutNama: kelutNama.value,
                        subkelNama: subkelNama.value,
                        katUtama: katUtama.value,
                        kategori: kategori.value,
                        jenis: jenis.value,
                        namaBarang: namaBarang.value,
                        kodeType: kodeType.value,
                        no_tritier: no_tritier,
                        no_sekunder: no_sekunder,
                        no_primer: no_primer,
                        satuan: selectedNo,
                        primerSekunder: primerSekunder.value,
                        sekunderTritier: sekunderTritier.value,
                    },
                    timeout: 30000,
                    success: function (response) {
                        console.log(response);

                        if (response.success) {
                            idtype =
                                response.data && response.data[0]
                                    ? response.data[0].idtype
                                    : "";

                            if (a === 1) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Data terSIMPAN",
                                    text: `Kode type: ${idtype}`,
                                }).then(() => {
                                    btn_isi.focus();
                                    kodeType.value = idtype;
                                    disableKetik();

                                    btn_proses.style.display = "none";
                                    btn_isi.style.display = "inline-block";
                                    btn_batal.style.display = "none";
                                    btn_koreksi.style.display = "inline-block";
                                });
                            } else if (a === 2) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Data terKOREKSI",
                                }).then(() => {
                                    disableKetik();
                                    btn_isi.focus();
                                });
                            }
                        } else if (response.error) {
                            if (response.errorType === "subkelIdEmpty") {
                                Swal.fire({
                                    icon: "error",
                                    title: "ID Sub Kelompok Kosong!",
                                    text: "Isi Sub Kelompok Dahulu!",
                                });
                            } else if (
                                response.errorType === "kodeBarangExists"
                            ) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Data Tidak ter-SIMPAN.",
                                    text: `Kode Barang: ${response.data[0].KodeBarang.trim()} yang terletak pada Sub Kelompok: ${response.data[0].IdSubkelompok_Type.trim()} Sudah ADA.`,
                                });
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: "Terjadi kesalahan pada permintaan.",
                                });
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr.responseJSON);
                        if (xhr.responseJSON.errorType === "kodeBarangExists") {
                            Swal.fire({
                                icon: "error",
                                title: "Data Tidak ter-SIMPAN.",
                                text: `Kode Barang: ${kdBarang.value} yang terletak pada Sub Kelompok: ${subkelId.value} Sudah ADA.`,
                            });
                        } else if (
                            xhr.responseJSON.errorType === "subkelIdEmpty"
                        ) {
                            Swal.fire({
                                icon: "error",
                                title: "ID Sub Kelompok Kosong!",
                                text: "Isi Sub Kelompok Dahulu!",
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error, hubungi EDP!",
                                text: xhr.responseJSON,
                            });
                        }
                    },
                });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
});

var allInputs = document.querySelectorAll("input");
const buttons = document.querySelectorAll(".btn-info");
let excludedDivId = "baris-1";

disableKetik();

// fungsi bisa ketik
function enableKetik() {
    allInputs.forEach(function (input) {
        var isInsideExcludedDiv = input.closest("#" + excludedDivId) !== null;

        if (!isInsideExcludedDiv) {
            input.value = "";
            input.disabled = false;
        }
    });

    // disable semua button
    buttons.forEach((button) => {
        button.disabled = false;
    });

    // enable dropdown & checkbox
    satuan.disabled = false;
    konversi.disabled = false;
    konversi.checked = false;

    // hide button isi, tampilkan button proses
    btn_isi.style.display = "none";
    btn_proses.style.display = "inline-block";
    // hide button koreksi, tampilkan button batal
    btn_koreksi.style.display = "none";
    btn_batal.style.display = "inline-block";
}

// fungsi gak bisa ketik
function disableKetik() {
    allInputs.forEach(function (input) {
        input.disabled = true;
    });

    // disable semua button
    buttons.forEach((button) => {
        button.disabled = true;
    });

    // dissable dropdown & checkbox
    satuan.disabled = true;
    konversi.disabled = true;

    // hide button proses, tampilkan button isi
    btn_proses.style.display = "none";
    btn_isi.style.display = "inline-block";

    // hide button batal, tampilkan button koreksi
    btn_batal.style.display = "none";
    btn_koreksi.style.display = "inline-block";

    btn_hapus.disabled = false;
}

// button isi event listener
btn_isi.addEventListener("click", function () {
    a = 1;
    enableKetik();
    btn_divisi.focus();
    btn_hapus.disabled = true;
    btn_kodeType.disabled = true;
    btn_namaType.disabled = true;

    if (subkelNama.value !== "") {
        kdBarang.readOnly = false;
        kdBarang.focus();
        satuan.value = "";
    }
});

// button batal event listener
btn_batal.addEventListener("click", function () {
    btn_hapus.disabled = false;
    disableKetik();
});

// button koreksi event listener
btn_koreksi.addEventListener("click", function () {
    a = 2;
    enableKetik();
    btn_hapus.disabled = true;
    kdBarang.readOnly = true;
    btn_katUtama.disabled = true;
    btn_kategori.disabled = true;
    btn_jenis.disabled = true;
    btn_barang.disabled = true;

    toggleKonversiInputs();

    if (divisiNama.value === "") {
        btn_divisi.focus();
    } else {
        btn_kodeType.focus();
    }
});

// button hapus event listener
btn_hapus.addEventListener("click", function () {
    a = 3;
    enableKetik();

    btn_isi.style.display = "none";
    btn_proses.style.display = "inline-block";

    btn_koreksi.style.display = "none";
    btn_batal.style.display = "inline-block";

    toggleKonversiInputs();

    btn_hapus.disabled = true;
    if (divisiNama.value === "") {
        btn_divisi.focus();
    } else {
        btn_kodeType.focus();
    }
});
