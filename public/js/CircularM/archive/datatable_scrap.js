//#region Kolom tabel responsive sesuai persentase dari lebar layar (UNUSED)
var columnDefs = [];
if (colSizes) {
    colSizes.forEach(function (size, index) {
        columnDefs.push({ width: size, targets: index });
    });
}
// Pada "dataTableOptions" tambahkan columnDefs: columnDefs,
//#endregion
