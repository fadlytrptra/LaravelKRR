//#region Variables
const btnProsesForm = document.getElementById("btn_proses");
const btnBatalForm = document.getElementById("btn_keluar");

const btnProsesOrder = document.getElementById("btn_simpan_order");
const btnBatalOrder = document.getElementById("btn_batal_order");

const btnProsesMesin = document.getElementById("btn_simpan_mesin");
const btnBatalMesin = document.getElementById("btn_batal_mesin");

const spinMesin = document.getElementById("spinnerMesin");

const tabOrder = document.getElementById("nav-order-tab");
const tabMesin = document.getElementById("nav-mesin-tab");
const tabWaktu = document.getElementById("nav-waktu-tab");
const tabSurat = document.getElementById("nav-surat-tab");

var minOrderDeadline = -1;
var maxOrderJumlah = -1;
var minOrderMesin = -1;
var minOrderKecepatan = -1;

var maxMachineSpeed = -1;
var minMachineAge = -1;

const selectedIds = new Set();
var listOrder = [
    // {
    //     NomorKu: 0,
    //     RencanaMulai: "2009-01-02",
    //     RencanaSelesai: "2009-01-02",
    //     NamaBarang:
    //         "AE-763/150.00/12.00 X 12.00/ 2000/HSPG/PP/BELAH LAYAR/0/0/ -00/00/ -00/-",
    //     JumlahOrder: "6500.00",
    //     IdOrder:
    //         '<input class="form-check-input checkbox_order" type="checkbox" value="56"> 56',
    // }
];

var orderPriority = [];
var newOrderPriority = [];
var machinePriority = [
    // machinePriority["Order " + id_order]["detail"].push({
    //     NamaMesin: rowNamaMesin,
    //     Kecepatan: rowKecepatan,
    //     UmurMesin: rowUmurMesin,
    //     NilaiMesin: rowNilaiMesin,
    // });
];

var listMesin = [];
var listSchedule = [];

var tableOrder = null;
var timeline = null;
//#endregion

//#region Listeners
btnProsesForm.addEventListener("click", function () {
    btnProsesOrder.disabled = true;
    btnBatalOrder.disabled = true;

    tabMesin.disabled = true;
    tabWaktu.disabled = true;
    tabSurat.disabled = true;

    tabOrder.click();

    if (listOrder.length <= 0) {
        showToast("Belum ada order yang dipilih.", "error");
        return;
    }

    console.log(listOrder);

    const tbPrioritasOrder = document
        .getElementById("table_prioritas_order")
        .getElementsByTagName("tbody")[0];
    tbPrioritasOrder.innerHTML = `
        <td colspan="7">
            <div class="mt-3 d-flex justify-content-center">
                <div class="spinner-border text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </td>
    `;

    // Hapus perhitungan sebelumnya jika ada.
    document.getElementById("container-order-breakdown").innerHTML = ``;

    //#region dummy testing
    // listOrder = [
    //     {
    //         NomorKu: 0,
    //         RencanaMulai: "2009-01-02",
    //         RencanaSelesai: "2009-03-02",
    //         NamaBarang:
    //             "AE-763/150.00/12.00 X 12.00/ 2000/HSPG/PP/BELAH LAYAR/0/0/ -00/00/ -00/-",
    //         JumlahOrder: "65000.00",
    //         IdOrder: "56",
    //     },
    //     {
    //         NomorKu: 1,
    //         RencanaMulai: "2009-01-02",
    //         RencanaSelesai: "2009-03-02",
    //         NamaBarang:
    //             "C-763/145.00/12.00 X 12.00/ 1600/HSPG/PP/BELAH TUBULAR/0/0/ -00/00/ -00/-",
    //         JumlahOrder: "75000.00",
    //         IdOrder: "57",
    //     },
    //     {
    //         NomorKu: 2,
    //         RencanaMulai: "2009-01-20",
    //         RencanaSelesai: "2009-04-01",
    //         NamaBarang:
    //             "B-763/80.00/12.00 X 12.00/ 750/HSPG/PP/BELAH KR-KN/0/0/ -00/00/ -00/-",
    //         JumlahOrder: "125000.00",
    //         IdOrder: "58",
    //     },
    //     {
    //         NomorKu: 3,
    //         RencanaMulai: "2009-01-01",
    //         RencanaSelesai: "2009-04-01",
    //         NamaBarang:
    //             "EL-763/100.00/12.00 X 12.00/ 1800/HSPG/PP/BELAH SAMPING/0/0/ -00/00/ -00/-",
    //         JumlahOrder: "135000.00",
    //         IdOrder: "59",
    //     },
    //     {
    //         NomorKu: 4,
    //         RencanaMulai: "2009-01-01",
    //         RencanaSelesai: "2009-05-01",
    //         NamaBarang:
    //             "B-698/ 66.00/10.00 X 10.00/ 900/P.P. /P.P /TUBULAR/0/0",
    //         JumlahOrder: "132000.00",
    //         IdOrder: "60",
    //     },
    // ];
    //#endregion

    // Ambil daftar grup mesin yang bisa mengerjakan id order tersebut.
    let list_group = [];
    for (let i = 0; i < listOrder.length; i++) {
        list_group.push({
            IdOrder: listOrder[i]["IdOrder"],
            GroupMesin: getGroupMesin(listOrder[i]["NamaBarang"]),
        });
    }

    // Mengelompokkan id order berdasarkan type mesin
    function mapGroupsToOrders(list_group) {
        const groupToOrders = new Map();

        list_group.forEach((order) => {
            order.GroupMesin.forEach((group) => {
                if (!groupToOrders.has(group)) {
                    groupToOrders.set(group, []);
                }
                groupToOrders.get(group).push(order.IdOrder);
            });
        });

        // console.log("groupToOrders: ", groupToOrders);

        //#region Contoh input & output
        // INPUT
        // list_group = [
        //     { IdOrder: "56", GroupMesin: [13, 2] },
        //     { IdOrder: "57", GroupMesin: [2, 13] },
        //     { IdOrder: "58", GroupMesin: [13] },
        //     { IdOrder: "59", GroupMesin: [3, 2] }
        // ];

        // OUTPUT
        // groupToOrders = Map(3) {
        //     13 => [ '56', '57', '58' ],
        //     2 => [ '56', '57', '59' ],
        //     3 => [ '59' ]
        // }
        //#endregion

        return groupToOrders;
    }
    let groupToOrders = mapGroupsToOrders(list_group);

    // Jalankan SAW untuk tiap grup yang ada, lalu tampilkan ke tabel
    let groupedPromises = [];
    groupToOrders.forEach((orders, group) => {
        createOrderTable(group);

        let promise = Promise.all(orders.map((id) => getOrderValue(id)))
            .then((results) => {
                // console.log(`Results for group ${group}:`, results);

                // Cari nilai tertinggi dan terendah
                minOrderDeadline = Math.min(
                    ...results.map((item) => item.DeadlineOrder)
                );
                maxOrderJumlah = Math.max(
                    ...results.map((item) => parseFloat(item.JumlahOrder))
                );
                minOrderMesin = Math.min(
                    ...results.map((item) => item.JumlahMesin)
                );
                minOrderKecepatan = Math.min(
                    ...results.map((item) => parseInt(item.KecepatanGroup))
                );

                // Normalisasi data
                function normalize(value, reference, defaultValue = "0.00") {
                    if (value === 0) return defaultValue;
                    return (value / reference).toFixed(2);
                }
                const normalizedData = results.map((item) => {
                    let NormalisasiDeadline = parseFloat(
                        normalize(minOrderDeadline, item.DeadlineOrder)
                    );
                    let NormalisasiOrder = parseFloat(
                        normalize(parseFloat(item.JumlahOrder), maxOrderJumlah)
                    );
                    let NormalisasiMesin = parseFloat(
                        normalize(minOrderMesin, item.JumlahMesin)
                    );
                    let NormalisasiKecepatan = parseFloat(
                        normalize(
                            minOrderKecepatan,
                            parseInt(item.KecepatanGroup)
                        )
                    );

                    let FinalResult =
                        NormalisasiDeadline * 0.35 +
                        NormalisasiOrder * 0.25 +
                        NormalisasiMesin * 0.2 +
                        NormalisasiKecepatan * 0.2;

                    return {
                        ...item,
                        NormalisasiDeadline: NormalisasiDeadline.toFixed(2),
                        NormalisasiJumlah: NormalisasiOrder.toFixed(2),
                        NormalisasiMesin: NormalisasiMesin.toFixed(2),
                        NormalisasiKecepatan: NormalisasiKecepatan.toFixed(2),
                        HasilAkhir: FinalResult.toFixed(2),
                        GroupMesin: group,
                    };
                });

                // Sort berdasarkan atribut "HasilAkhir" tertinggi
                normalizedData.sort(
                    (a, b) =>
                        parseFloat(b.HasilAkhir) - parseFloat(a.HasilAkhir)
                );
                console.log(
                    `Normalized results for group ${group}:`,
                    normalizedData
                );

                // Tampilkan hasil perhitungan ke tabel
                const tableId = `table-group-${group}`;
                normalizedData.forEach((data) => {
                    var rowIdOrder = data["IdOrder"];
                    var rowDeadline =
                        minOrderDeadline +
                        " / " +
                        data["DeadlineOrder"] +
                        " = " +
                        data["NormalisasiDeadline"];
                    var rowJumlahOrder =
                        parseInt(data["JumlahOrder"]) +
                        " / " +
                        maxOrderJumlah +
                        " = " +
                        data["NormalisasiJumlah"];
                    var rowJumlahMesin =
                        minOrderMesin +
                        " / " +
                        data["JumlahMesin"] +
                        " = " +
                        data["NormalisasiMesin"];
                    var rowKecepatan =
                        minOrderKecepatan +
                        " / " +
                        data["KecepatanGroup"] +
                        " = " +
                        data["NormalisasiKecepatan"];
                    var rowNilaiOrder = data["HasilAkhir"];

                    addRowToOrderTable(
                        tableId,
                        rowIdOrder,
                        rowDeadline,
                        rowJumlahOrder,
                        rowJumlahMesin,
                        rowKecepatan,
                        rowNilaiOrder
                    );
                });

                return normalizedData;
            })
            .catch((error) => {
                console.error(
                    `Error fetching orders for group ${group}:`,
                    error
                );
            });

        groupedPromises.push(promise);
    });

    Promise.all(groupedPromises)
        .then((data) => {
            console.log("All groups have been processed.", data);

            function processOrderData(nestedOrderData) {
                const uniqueOrders = [];
                const groupOptions = new Map();

                // Helper function to add or update group options
                function addOrUpdateGroupOptions(idOrder, groupMesin) {
                    if (groupOptions.has(idOrder)) {
                        groupOptions.get(idOrder).add(groupMesin);
                    } else {
                        groupOptions.set(idOrder, new Set([groupMesin]));
                    }
                }

                // Flatten the nested array and process each order
                nestedOrderData.flat().forEach((order) => {
                    // Check if the order is already processed
                    if (
                        !uniqueOrders.some((o) => o.IdOrder === order.IdOrder)
                    ) {
                        uniqueOrders.push({
                            IdOrder: order.IdOrder,
                            JumlahOrder: order.JumlahOrder,
                            JumlahMesin: order.JumlahMesin,
                            KecepatanGroup: order.KecepatanGroup,
                        });
                    }
                    // Update the group options for the order
                    addOrUpdateGroupOptions(order.IdOrder, order.GroupMesin);
                });

                // Convert group options Sets to Arrays
                for (let [idOrder, groupsSet] of groupOptions) {
                    groupOptions.set(idOrder, Array.from(groupsSet));
                }

                return { uniqueOrders, groupOptions };
            }

            function assignOrdersToGroups(orderData, groupOptions) {
                console.log("orderData", orderData);

                // Initialize group loads for groups with only one order option
                const groupLoads = new Map();
                console.log("Initial group loads for single-option groups:");

                // Function to calculate the load for a group
                function calculateLoad(
                    jumlahOrder,
                    kecepatanGroup = 50,
                    jumlahMesin
                ) {
                    if (kecepatanGroup == 0) {
                        kecepatanGroup = 50;
                    }

                    let loadKerja =
                        parseFloat(jumlahOrder) /
                        (kecepatanGroup * jumlahMesin);
                    console.log(
                        `${jumlahOrder} / (${kecepatanGroup} * ${jumlahMesin}) = ${loadKerja}`
                    );

                    return loadKerja;
                }

                // Set initial loads using the formula
                orderData.flat().forEach((order) => {
                    const groups = groupOptions.get(order.IdOrder);
                    if (groups && groups.length === 1) {
                        const groupId = groups[0];
                        const load = calculateLoad(
                            order.JumlahOrder,
                            order.KecepatanGroup,
                            getJumlahMesin(null, groupId)
                        );
                        groupLoads.set(groupId, load);
                        console.log(`Group ${groupId}: ${load}`);
                    }
                });

                // Assign orders to groups based on the lowest load
                const orderAssignments = new Map();
                console.log("Assigning orders to groups:");

                orderData.flat().forEach((order) => {
                    const idOrder = order.IdOrder;
                    const groups = groupOptions.get(idOrder);
                    if (groups && groups.length > 1) {
                        let minLoadGroup = groups[0];
                        let minLoadValue = Number.MAX_VALUE;

                        console.log(
                            `Order ${idOrder} has multiple group options:`,
                            groups
                        );

                        groups.forEach((group) => {
                            if (!groupLoads.has(group)) {
                                groupLoads.set(group, 0); // Initialize load for groups with multiple options
                            }
                            const currentLoad = groupLoads.get(group);
                            const potentialLoad = calculateLoad(
                                order.JumlahOrder,
                                order.KecepatanGroup,
                                getJumlahMesin(null, group)
                            );
                            const totalLoad = currentLoad + potentialLoad;

                            console.log(
                                `Group ${group} - Current Load: ${currentLoad}, Potential Load: ${potentialLoad}, Total Load: ${totalLoad}`
                            );

                            if (totalLoad < minLoadValue) {
                                minLoadValue = totalLoad;
                                minLoadGroup = group;
                            }
                        });

                        console.log(
                            `Order ${idOrder} assigned to Group ${minLoadGroup} with load ${minLoadValue}`
                        );
                        orderAssignments.set(idOrder, minLoadGroup);
                        groupLoads.set(minLoadGroup, minLoadValue);
                    } else if (groups && groups.length === 1) {
                        console.log(
                            `Order ${idOrder} has only one group option: Group ${groups[0]}`
                        );
                        orderAssignments.set(idOrder, groups[0]);
                    }
                });

                // console.log(
                //     "Final group loads:",
                //     Object.fromEntries(groupLoads)
                // );
                console.log(
                    "Order assignments:",
                    Object.fromEntries(orderAssignments)
                );
                return orderAssignments;
            }

            const { uniqueOrders, groupOptions } = processOrderData(data);
            // console.log("Unique Orders:", uniqueOrders);
            // console.log("Group Options:", Object.fromEntries(groupOptions));

            const assignments = assignOrdersToGroups(
                uniqueOrders,
                groupOptions
            );
            // console.log(Object.fromEntries(assignments));

            tbPrioritasOrder.innerHTML = ``;
            var tables = document.querySelectorAll('[id^="table-group-"]');
            var tableData = {};
            tables.forEach(function (table) {
                var tableId = table.id;
                var headers = Array.from(table.querySelectorAll("th")).map(
                    (th) => th.textContent.trim()
                );
                var rows = table.querySelectorAll("tbody tr");

                var orders = [];
                rows.forEach(function (row) {
                    var order = {};
                    Array.from(row.cells).forEach(function (cell, index) {
                        order[headers[index]] = cell.textContent.trim();
                    });
                    orders.push(order);
                });

                tableData[tableId] = orders;
            });
            // console.log("tableData", tableData);

            orderPriority = [];
            for (let [key, value] of assignments) {
                // console.log("Key:", key, "Value:", value);

                let row_data = tableData["table-group-" + value].find(
                    (order) => order["Id Order"] === key
                );

                orderPriority.push({
                    IdOrder: row_data["Id Order"],
                    Deadline: row_data["Deadline Order (Hari)"],
                    JumlahOrder: row_data["Jumlah Order"],
                    JumlahMesin: row_data["Jumlah Mesin"],
                    Kecepatan: row_data["Kecepatan Mesin /shift"],
                    GroupMesin: value,
                    NilaiOrder: row_data["Nilai Order"],
                });
            }

            orderPriority.sort((a, b) => {
                // First, sort by GroupMesin from lowest to highest
                if (a.GroupMesin < b.GroupMesin) return -1;
                if (a.GroupMesin > b.GroupMesin) return 1;

                // If GroupMesin is the same, then sort by NilaiOrder from highest to lowest
                if (a.NilaiOrder > b.NilaiOrder) return -1;
                if (a.NilaiOrder < b.NilaiOrder) return 1;

                return 0; // If both GroupMesin and NilaiOrder are equal
            });

            newOrderPriority = orderPriority;
            for (let i = 0; i < orderPriority.length; i++) {
                const element = orderPriority[i];
                addPriorityOrder(
                    element["IdOrder"],
                    element["Deadline"],
                    element["JumlahOrder"],
                    element["JumlahMesin"],
                    element["Kecepatan"],
                    element["GroupMesin"],
                    element["NilaiOrder"]
                );
            }

            $("#table_prioritas_order tbody").sortable({
                handle: ".drag-handle",
                stop: function (_, _) {
                    newOrderPriority = [];
                    $("#table_prioritas_order tbody tr").each(function () {
                        var id = $(this).data("idorder"); // Retrieves the data-idOrder attribute
                        var item = orderPriority.find(
                            (item) => item.IdOrder === id.toString()
                        );
                        if (item) {
                            newOrderPriority.push(item);
                        } else {
                            console.log("No item found for ID:", id);
                        }
                    });
                },
            });

            btnProsesOrder.disabled = false;
            btnBatalOrder.disabled = false;

            showToast(
                "Data berhasil diproses! Silahkan lihat pada tabel Prioritas Order.",
                "success"
            );
        })
        .catch((error) => {
            console.error("An error occurred while processing groups:", error);
        });
});

btnBatalForm.addEventListener("click", function () {
    tableOrder.rows().deselect();
    listOrder = [];
});

btnProsesOrder.addEventListener("click", function () {
    orderPriority = newOrderPriority;
    showToast("Data sedang diproses..", "info");
    spinMesin.classList.remove("hidden");

    machinePriority = [];

    document.getElementById("spinnerKu").classList.remove("hidden");
    document.getElementById("container-mesin-breakdown").innerHTML = ``;
    for (let i = 0; i < orderPriority.length; i++) {
        const id_order = orderPriority[i]["IdOrder"];
        const i_order = listOrder.findIndex(
            (order) => order["IdOrder"] === id_order
        );

        let group_mesin = orderPriority[i]["GroupMesin"];
        let nama_order = listOrder[i_order]["NamaBarang"];

        machinePriority["Order " + id_order] = {
            detail: [],
        };

        getMesinValue(nama_order, group_mesin)
            .then((result) => {
                createMachineTable(id_order);
                const tableId = `table-mesin-${id_order}`;
                for (let j = 0; j < result.length; j++) {
                    const element = result[j];

                    var rowNamaMesin = element["Nama_mesin"];
                    var rowKecepatan =
                        element["Speed"] +
                        " / " +
                        maxMachineSpeed +
                        " = " +
                        element["NormalizedSpeed"];
                    var rowUmurMesin =
                        minMachineAge +
                        " / " +
                        element["AgeDays"] +
                        " = " +
                        element["NormalizedAge"];
                    var rowNilaiMesin = element["Score"].toFixed(2);

                    machinePriority["Order " + id_order]["detail"].push({
                        IdOrder: id_order,
                        NamaMesin: rowNamaMesin,
                        Kecepatan: rowKecepatan,
                        UmurMesin: rowUmurMesin,
                        NilaiMesin: rowNilaiMesin,
                    });

                    addRowToMachineTable(
                        tableId,
                        rowNamaMesin,
                        rowKecepatan,
                        rowUmurMesin,
                        rowNilaiMesin
                    );
                }

                document
                    .getElementById("placeholder_item")
                    .classList.add("hidden");

                if (i == orderPriority.length - 1) {
                    showToast(
                        "Data berhasil diproses! Silahkan buka pada menu Prioritas Mesin.",
                        "success"
                    );
                }

                spinMesin.classList.add("hidden");
                tabMesin.disabled = false;
                tabMesin.focus();
            })
            .catch((error) => {
                spinMesin.classList.add("hidden");
                console.error("An error occurred:", error);
            });
    }

    console.log("machinePriority", machinePriority);
});

btnBatalOrder.addEventListener("click", function () {
    $("#table_prioritas_order tbody").empty(); // Clear current rows

    for (let i = 0; i < orderPriority.length; i++) {
        const element = orderPriority[i];
        addPriorityOrder(
            element["IdOrder"],
            element["Deadline"],
            element["JumlahOrder"],
            element["JumlahMesin"],
            element["Kecepatan"],
            element["GroupMesin"],
            element["NilaiOrder"]
        );
    }

    showToast("Perubahan berhasil dibatalkan!", "info");
});

btnProsesMesin.addEventListener("click", function () {
    let orderPrior = [
        // {
        //     IdOrder: "",
        //     ListMesin: [],
        //     ListSpeed: [],
        //     TotalMeter: "",
        //     TglMulai: "",
        // },
    ];

    for (let key in machinePriority) {
        let orderKu = {
            IdOrder: "",
            ListMesin: [],
            ListSpeed: [],
            TotalMeter: "",
            TglMulai: "",
        };
        if (machinePriority.hasOwnProperty(key) && key !== "length") {
            orderKu["IdOrder"] = key.split(" ")[1];

            let loopForI = Math.min(machinePriority[key]["detail"].length, 5);
            for (let i = 0; i < loopForI; i++) {
                const element = machinePriority[key]["detail"][i];
                orderKu["ListMesin"].push(element["NamaMesin"]);

                let speedKu = Number(element["Kecepatan"].split(" / ")[0]);
                orderKu["ListSpeed"].push(round50(speedKu));
            }

            orderPrior.push(orderKu);
        }
    }

    function round50(num) {
        return Math.floor(num / 50) * 50;
    }

    function getOrderById(IdOrder) {
        return orderPrior.find((order) => order.IdOrder === IdOrder);
    }

    for (let i = 0; i < listOrder.length; i++) {
        for (let j = 0; j < orderPrior.length; j++) {
            if (listOrder[i]["IdOrder"] == orderPrior[j]["IdOrder"]) {
                orderPrior[j]["TotalMeter"] = listOrder[i]["JumlahOrder"];
                orderPrior[j]["TglMulai"] = listOrder[i]["RencanaMulai"];
            }
        }
    }

    console.log("orderPrior", orderPrior);

    listSchedule = [
        // {
        //     IdOrder: "",
        //     MachineName: "",
        //     StartDate: "",
        //     EndDate: "",
        //     MetersDone: "",
        // }
    ];

    for (let i = 0; i < orderPrior.length; i++) {
        let orderTimeSlot = {
            IdOrder: orderPrior[i]["IdOrder"],
            Mesin: orderPrior[i]["ListMesin"][0],
            Speed: orderPrior[i]["ListSpeed"][0],
            TotalMeter: Number(orderPrior[i]["TotalMeter"]),
            TglMulai: orderPrior[i]["TglMulai"],
        };

        listSchedule.push(calculateTimeSlot(orderTimeSlot));
    }

    console.log("listSchedule", listSchedule);

    let noOverlap = false;
    while (!noOverlap) {
        if (listSchedule.length <= 1) {
            break;
        }

        let foundOverlap = false;

        for (let i = 0; i < listSchedule.length; i++) {
            for (let j = i + 1; j < listSchedule.length; j++) {
                let order_i = listSchedule[i];
                let order_j = listSchedule[j];

                if (order_i["MachineName"] == order_j["MachineName"]) {
                    let i_awal = listSchedule[i]["StartDate"];
                    let i_akhir = listSchedule[i]["EndDate"];

                    let j_awal = listSchedule[j]["StartDate"];
                    let j_akhir = listSchedule[j]["EndDate"];

                    if (i_akhir >= j_awal && i_akhir < j_akhir) {
                        listSchedule.splice(j, 1);
                        recalculateTimeSlot(
                            getOrderById(order_j["IdOrder"]),
                            order_j["MachineName"]
                        );

                        foundOverlap = true;
                        break;
                    } else if (i_awal <= j_akhir && i_awal > j_awal) {
                        listSchedule.splice(j, 1);
                        recalculateTimeSlot(
                            getOrderById(order_j["IdOrder"]),
                            order_j["MachineName"]
                        );

                        foundOverlap = true;
                        break;
                    } else if (i_awal <= j_awal && i_akhir >= j_akhir) {
                        listSchedule.splice(j, 1);
                        recalculateTimeSlot(
                            getOrderById(order_j["IdOrder"]),
                            order_j["MachineName"]
                        );

                        foundOverlap = true;
                        break;
                    } else if (i_awal >= j_awal && i_akhir <= j_akhir) {
                        listSchedule.splice(j, 1);
                        recalculateTimeSlot(
                            getOrderById(order_j["IdOrder"]),
                            order_j["MachineName"]
                        );

                        foundOverlap = true;
                        break;
                    }
                }
            }

            if (foundOverlap) {
                break; // Exit the outer loop if an overlap is found
            }
        }

        // If no overlap is found in the entire array, exit the while loop
        if (!foundOverlap) {
            noOverlap = true;
        }
    }

    function recalculateTimeSlot(order, currentMachine) {
        let machineIndex = order["ListMesin"].indexOf(currentMachine);
        let orderTimeSlot = {
            IdOrder: order["IdOrder"],
            Mesin: order["ListMesin"][machineIndex + 1],
            Speed: order["ListSpeed"][machineIndex + 1],
            TotalMeter: Number(order["TotalMeter"]),
            TglMulai: order["TglMulai"],
        };

        listSchedule.push(calculateTimeSlot(orderTimeSlot));
    }

    function calculateTimeSlot(order) {
        // Define the sequence of shifts
        const shifts = ["P", "S", "M"];

        function getNextShift(currentShift) {
            const currentIndex = shifts.indexOf(currentShift);
            return shifts[(currentIndex + 1) % shifts.length];
        }

        function addDays(date, days) {
            let result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        function formatDate(date) {
            let day = date.getDate();
            let month = date.getMonth() + 1; // Months are zero-based
            let year = date.getFullYear();
            return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        }

        let { IdOrder, Mesin, Speed, TotalMeter, TglMulai } = order;
        let totalMeter = parseFloat(TotalMeter);
        let remainingMeter = totalMeter;

        // const btnInfoOrder = document.getElementById("btn_info_" + IdOrder);
        // let dtek3 = btnInfoOrder.dataset.dtek3;
        // Speed /= dtek3;

        let result = {
            IdOrder: IdOrder,
            MachineName: Mesin,
            StartDate: "",
            EndDate: "",
            EndShift: "", // Include EndShift property
            MetersDone: totalMeter,
        };

        let currentStartDate = new Date(TglMulai);
        let currentShift = "P";

        // Start processing on the current machine
        result.StartDate = formatDate(currentStartDate);
        let metersCompleted = 0;

        // Iterate until all meters are completed for this machine
        while (metersCompleted <= remainingMeter) {
            // Calculate meters completed in current shift
            metersCompleted += Speed;
            // Move to the next shift
            currentShift = getNextShift(currentShift);
            // If a full cycle of shifts is completed, move to the next day
            if (currentShift === "P") {
                currentStartDate = addDays(currentStartDate, 1);
            }
        }

        result.EndDate = formatDate(currentStartDate);
        result.EndShift = currentShift; // Set EndShift property

        return result;
    }

    generateTimeTable(listSchedule);
    showToast(
        "Data berhasil diproses! Silahkan buka pada menu Timeline Order.",
        "success"
    );

    tabWaktu.disabled = false;
    tabSurat.disabled = false;
    tabWaktu.focus();
});

btnBatalMesin.addEventListener("click", function () {
    for (let key in machinePriority) {
        if (machinePriority.hasOwnProperty(key) && key !== "length") {
            $(`#table-mesin-${key.split(" ")[1]} tbody`).empty();
            for (let i = 0; i < machinePriority[key]["detail"].length; i++) {
                const element = machinePriority[key]["detail"][i];
                addRowToMachineTable(
                    `table-mesin-${key.split(" ")[1]}`,
                    element["NamaMesin"],
                    element["Kecepatan"],
                    element["UmurMesin"],
                    element["NilaiMesin"]
                );
            }
        }
    }

    showToast("Perubahan berhasil dibatalkan!", "info");
});
//#endregion

//#region Functions
function addRowToOrderTable(
    tableId,
    idOrder,
    deadline,
    jumlahOrder,
    jumlahMesin,
    kecepatanMesin,
    nilaiOrder
) {
    const table = document.getElementById(tableId);
    const tbody = table.getElementsByTagName("tbody")[0];
    const newRow = tbody.insertRow();

    // Create cells and set their content
    let cellIdOrder = newRow.insertCell(0);
    let cellDeadline = newRow.insertCell(1);
    let cellJumlahOrder = newRow.insertCell(2);
    let cellJumlahMesin = newRow.insertCell(3);
    let cellKecepatanMesin = newRow.insertCell(4);
    let cellNilaiOrder = newRow.insertCell(5);

    cellIdOrder.textContent = idOrder;
    cellDeadline.textContent = deadline;
    cellJumlahOrder.textContent = jumlahOrder;
    cellJumlahMesin.textContent = jumlahMesin;
    cellKecepatanMesin.textContent = kecepatanMesin;
    cellNilaiOrder.textContent = nilaiOrder;
}

function addPriorityOrder(
    idOrder,
    deadline,
    jumlahOrder,
    jumlahMesin,
    kecepatanMesin,
    groupMesin,
    nilaiOrder
) {
    const table = document.getElementById("table_prioritas_order");
    const tbody = table.getElementsByTagName("tbody")[0];
    const newRow = tbody.insertRow();
    newRow.setAttribute("data-idorder", idOrder);

    let cellIdOrder = newRow.insertCell(0);
    let cellDeadline = newRow.insertCell(1);
    let cellJumlahOrder = newRow.insertCell(2);
    let cellJumlahMesin = newRow.insertCell(3);
    let cellKecepatanMesin = newRow.insertCell(4);
    let cellGroupMesin = newRow.insertCell(5);
    let cellNilaiOrder = newRow.insertCell(6);

    cellIdOrder.innerHTML = moveIcon + idOrder;
    cellDeadline.textContent = deadline;
    cellJumlahOrder.textContent = jumlahOrder;
    cellJumlahMesin.textContent = jumlahMesin;
    cellKecepatanMesin.textContent = kecepatanMesin;
    cellGroupMesin.textContent = groupMesin;
    cellNilaiOrder.textContent = nilaiOrder;
}

function createOrderTable(groupId) {
    const ordersContainer = document.getElementById(
        "container-order-breakdown"
    );
    const groupDiv = document.createElement("div");
    groupDiv.className = "table-responsive";
    groupDiv.innerHTML = `
        <h5 class="mt-3">Group: ${groupId}</h5>
        <table id="table-group-${groupId}" class="table table-sm table-bordered align-middle draggable-table">
            <thead>
                <tr>
                    <th style="align-content: center; min-width: 100px;">Id Order</th>
                    <th style="align-content: center; min-width: 175px;">Deadline Order (Hari)</th>
                    <th style="align-content: center; min-width: 175px;">Jumlah Order</th>
                    <th style="align-content: center; min-width: 100px;">Jumlah Mesin</th>
                    <th style="align-content: center; min-width: 175px;">Kecepatan Mesin /shift</th>
                    <th style="align-content: center; min-width: 50px;">Nilai Order</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;

    ordersContainer.appendChild(groupDiv);
}

function addRowToMachineTable(
    tableId,
    namaMesin,
    kecepatanMesin,
    umurMesin,
    nilaiMesin
) {
    const table = document.getElementById(tableId);
    const tbody = table.getElementsByTagName("tbody")[0];
    const newRow = tbody.insertRow();
    newRow.setAttribute("data-nama-mesin", namaMesin);

    // Create cells and set their content
    let cellNamaMesin = newRow.insertCell(0);
    let cellKecepatanMesin = newRow.insertCell(1);
    let cellUmurMesin = newRow.insertCell(2);
    let cellNilaiMesin = newRow.insertCell(3);

    // cellNamaMesin.innerHTML = moveIcon + namaMesin;
    cellNamaMesin.textContent = namaMesin;
    cellKecepatanMesin.textContent = kecepatanMesin;
    cellUmurMesin.textContent = umurMesin;
    cellNilaiMesin.textContent = nilaiMesin;
}

function createMachineTable(orderId) {
    const machinesContainer = document.getElementById(
        "container-mesin-breakdown"
    );
    const groupDiv = document.createElement("div");
    groupDiv.className = "mt-3";
    groupDiv.innerHTML = `
        <h5 class="mt-4">Id Order: ${orderId}</h5>
        <div class="table-responsive table-wrapper">
            <table id="table-mesin-${orderId}" class="table table-sm table-bordered align-middle draggable-table" style="margin: 0px;">
                <thead class="sticky-header">
                    <th style="align-content: center; min-width: 100px;">Nama Mesin</th>
                    <th style="align-content: center; min-width: 175px;">Kecepatan Mesin /shift</th>
                    <th style="align-content: center; min-width: 175px;">Umur Mesin (Hari)</th>
                    <th style="align-content: center; min-width: 50px;">Nilai Mesin</th>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    `;

    machinesContainer.appendChild(groupDiv);
}

function getJumlahMesin(nama_order = null, id_group = null) {
    let jumlah_mesin = 0;
    if (nama_order) {
        let daftar_mesin = getGroupMesin(nama_order);
        for (let i = 0; i < daftar_mesin.length; i++) {
            for (let j = 0; j < listGroupMesin.length; j++) {
                if (daftar_mesin[i] == listGroupMesin[j]["IdGroup"]) {
                    jumlah_mesin += listGroupMesin[j]["Jumlah"];
                }
            }
        }
    } else {
        for (let i = 0; i < listGroupMesin.length; i++) {
            if (id_group == listGroupMesin[i]["IdGroup"]) {
                jumlah_mesin += listGroupMesin[i]["Jumlah"];
            }
        }
    }

    return jumlah_mesin;
}

function getDeadlineOrder(order) {
    let tgl_mulai = new Date(order["RencanaMulai"]);
    let tgl_selesai = new Date(order["RencanaSelesai"]);

    return (tgl_selesai - tgl_mulai) / (1000 * 60 * 60 * 24);
}

function getKecepatanGroup(nama_order = null, id_group = null) {
    return new Promise((resolve, reject) => {
        let body_data, daftar_mesin;

        if (nama_order) {
            daftar_mesin = getGroupMesin(nama_order);
            if (daftar_mesin.length <= 0) {
                resolve("0");
            }

            body_data = {
                typeOrder: nama_order.split("-")[0] + "-",
                typeBenang: nama_order.split("/")[6].replace("BELAH ", ""),
                idGroup: daftar_mesin,
            };
        } else {
            body_data = {
                idGroup: [id_group],
            };
        }

        fetch("/saw-order/get-avg-kecepatan-group", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: JSON.stringify(body_data),
        })
            .then((response) => response.json())
            .then((data) => {
                resolve(data[0]["KecepatanGroup"] || "50");
            })
            .catch((error) => {
                console.error("Error:", error);
                reject(error);
            });
    });
}

/**
 * Mendapatkan daftar type mesin (beserta jumlah dan spesifikasi lain) yang dapat menjalankan order inputan.
 * @param {String} nama_order
 * @returns {Array} Daftar type mesin yang bisa menjalankan order tersebut.
 */
function getGroupMesin(nama_order) {
    let data_order = nama_order.split("/");

    let type_order = data_order[0].split("-")[0];
    let ukuran = parseFloat(data_order[1]);
    let denier = parseFloat(data_order[3]);
    let type_benang = data_order[6].replace("BELAH ", "");

    /**
     * Return true jika angka berada di dalam range, false jika di luar range.
     * @param {number} min
     * @param {number} max
     * @param {number} num
     * @returns
     */
    const checkRange = (min, max, num) => {
        if (num >= min && num <= max) {
            return true;
        } else return false;
    };

    let daftar_mesin = [];
    for (let i = 0; i < listGroupMesin.length; i++) {
        const ele = listGroupMesin[i];

        if (!ele["TypeBenang"].includes(type_benang)) continue;
        if (!ele["TypeOrder"].includes(type_order)) continue;
        if (!checkRange(ele["Ukuran"][0], ele["Ukuran"][1], ukuran)) continue;
        if (!checkRange(ele["Denier"][0], ele["Denier"][1], denier)) continue;

        daftar_mesin.push(ele["IdGroup"]);
    }

    if (daftar_mesin.length <= 0) {
        daftar_mesin.push("13");
    }

    return daftar_mesin;
}

async function getOrderValue(id_order) {
    try {
        const ord_index = listOrder.findIndex(
            (order) => order["IdOrder"] === id_order
        );
        let c1 = getDeadlineOrder(listOrder[ord_index]);
        let c2 = listOrder[ord_index]["JumlahOrder"];
        let c3 = getJumlahMesin(listOrder[ord_index]["NamaBarang"]);
        let c4 = await getKecepatanGroup(listOrder[ord_index]["NamaBarang"]);

        console.log("c4 " + id_order, c4);

        return {
            IdOrder: listOrder[ord_index]["IdOrder"],
            DeadlineOrder: c1,
            JumlahOrder: c2,
            JumlahMesin: c3,
            KecepatanGroup: c4,
        };
    } catch (error) {
        console.error("getOrderValue() FAILED - ", error);
    }
}

function getKecepatanMesin(nama_order, group_mesin) {
    return new Promise((resolve, reject) => {
        let body_data = {
            typeOrder: nama_order.split("-")[0] + "-",
            typeBenang: nama_order.split("/")[6].replace("BELAH ", ""),
            idGroup: group_mesin.length === 1 ? "0" + group_mesin : group_mesin,
        };

        fetch("/saw-mesin/get-avg-kecepatan-mesin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: JSON.stringify(body_data),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    // console.log("Daftar Kecepatan Mesin: ", data);
                    resolve(data);
                } else {
                    resolve(null);
                }

                /**
                 * Data example:
                 * KecepatanMesin	Nama_mesin
                 * 145.000000	CB-01
                 * 17.000000	CB-02
                 * 870.000000	CB-03
                 * 10.000000	CB-04
                 */
            })
            .catch((error) => {
                console.error("Error:", error);
                reject(error);
            });
    });
}

function getUmurMesin(group_mesin) {
    return new Promise((resolve, reject) => {
        let body_data = {
            idGroup: group_mesin,
        };

        fetch("/saw-mesin/get-umur-mesin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: JSON.stringify(body_data),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    // console.log("Daftar Umur Mesin: ", data);
                    resolve(data);
                } else {
                    resolve(null);
                }

                /**
                 * Data example:
                 * Nama_mesin	Date_operation
                 * CB-01	2004-09-15 00:00:00.000
                 * CB-02	2004-09-23 00:00:00.000
                 * CB-03	2004-12-27 00:00:00.000
                 * CB-04	2005-04-12 00:00:00.000
                 */
            })
            .catch((error) => {
                console.error("Error:", error);
                reject(error);
            });
    });
}

async function getMesinValue(nama_order, id_group) {
    try {
        let group_mesin = id_group.length === 1 ? "0" + id_group : id_group;

        // console.log(group_mesin);

        let speedData = await getKecepatanMesin(nama_order, id_group);
        let ageData = await getUmurMesin(group_mesin);

        if (!ageData) {
            // // dummy testing
            // ageData = await getUmurMesin("02");
            // showToast("Ada kendala dalam mengambil data umur mesin", "error");
            // return;
        }

        if (!speedData) {
            speedData = [];
            for (let i = 0; i < ageData.length; i++) {
                const element = ageData[i];
                speedData.push({
                    Nama_mesin: element["Nama_mesin"],
                    KecepatanMesin: 50,
                });
            }
        }

        // Normalize speed data
        const maxSpeed = Math.max(
            ...speedData.map((item) => item.KecepatanMesin)
        );
        speedData.forEach((machine) => {
            machine.normalizedSpeed = machine.KecepatanMesin / maxSpeed;
        });

        // Calculate and normalize age data in days
        const currentDate = new Date();
        ageData.forEach((machine) => {
            const operationDate = new Date(machine.Date_operation);
            machine.ageDays = Math.round(
                (currentDate - operationDate) / (1000 * 3600 * 24)
            ); // Convert ms to days and round
        });
        const minAgeDays = Math.min(
            ...ageData.map((machine) => machine.ageDays)
        );
        ageData.forEach((machine) => {
            machine.normalizedAge = minAgeDays / machine.ageDays;
        });

        // Combine data and calculate scores
        const machineScores = speedData.map((speedMachine) => {
            const ageMachine = ageData.find(
                (a) => a.Nama_mesin === speedMachine.Nama_mesin
            );
            const score =
                0.7 * speedMachine.normalizedSpeed +
                0.3 * ageMachine.normalizedAge;
            return {
                Nama_mesin: speedMachine.Nama_mesin,
                Score: score,
                AgeDays: ageMachine ? ageMachine.ageDays : null, // Include actual age in days
                Speed: speedMachine.KecepatanMesin, // Include actual speed
                NormalizedAge: ageMachine.normalizedAge,
                NormalizedSpeed: speedMachine.normalizedSpeed,
            };
        });

        // Sort machines by score
        machineScores.sort((a, b) => b.Score - a.Score);

        minMachineAge = minAgeDays;
        maxMachineSpeed = maxSpeed;
        console.log("machineScores", machineScores);

        return machineScores;
    } catch (error) {
        console.error("Error in getMesinValue:", error);
        throw error;
    }
}

function getPendingOrder() {
    const dtOptions = {
        responsive: true,
        scrollX: true,
        scrollY: "350px",
        language: {
            searchPlaceholder: " Pencarian...",
            search: "",
            info: "Menampilkan _START_ - _END_ dari _TOTAL_ total data",
            infoFiltered: "(disaring dari _MAX_ total data)",
            infoEmpty: "Menampilkan 0 data",
            zeroRecords: "Data tidak ditemukan",
            lengthMenu: "Menampilkan _MENU_ data per halaman",
            select: {
                rows: "",
            },
        },
        initComplete: function () {
            var searchInput = $('input[type="search"]');
            searchInput.eq(0).addClass("form-control");
            searchInput.wrap('<div class="input-group input-group-sm"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
        processing: true,
        serverSide: true,
        ajax: {
            url: serverSideUrl,
            dataType: "json",
            type: "POST",
            timeout: 60000,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        },
        columns: [
            { data: "NomorKu", width: "25px" },
            { data: "IdOrder", width: "65px" },
            { data: "NamaBarang", width: "550px" },
            { data: "JumlahOrder", width: "110px" },
            { data: "RencanaMulai", width: "125px" },
            { data: "RencanaSelesai", width: "125px" },
            { data: "InfoTambahan", width: "0px" },
        ],
        rowId: "IdOrder",
        columnDefs: [
            {
                orderable: false,
                className: "select-checkbox",
                targets: 0,
                render: function (data, type, full, meta) {
                    return "";
                },
            },
            {
                targets: 2,
                render: DataTable.render.ellipsis(70, true),
            },
        ],
        order: [[1, "desc"]],
        select: {
            style: "multi",
            selector: "td:first-child",
            className: "selected",
            headerCheckbox: false,
        },
        drawCallback: function (settings) {
            for (let i = 0; i < listOrder.length; i++) {
                selectRowById(listOrder[i]["IdOrder"]);
            }

            function selectRowById(idOrder) {
                const rowIndex = tableOrder.column(1).data().indexOf(idOrder);
                if (rowIndex !== -1) {
                    tableOrder.row(rowIndex).select();
                }
            }
        },
    };

    if (tableOrder) {
        tableOrder.destroy();
    }

    tableOrder = new DataTable("#table_order", dtOptions);

    tableOrder
        .on("select", function (e, dt, type, indexes) {
            const rowData = tableOrder.rows(indexes).data().toArray();
            rowData.forEach((data) => {
                const existingOrder = listOrder.find(
                    (order) => order.IdOrder === data.IdOrder
                );

                if (!existingOrder) {
                    listOrder.push({
                        IdOrder: data.IdOrder,
                        RencanaMulai: data.RencanaMulai,
                        RencanaSelesai: data.RencanaSelesai,
                        NamaBarang: data.NamaBarang,
                        JumlahOrder: data.JumlahOrder,
                    });
                }
            });

            console.log(listOrder);
        })
        .on("deselect", function (e, dt, type, indexes) {
            const rowData = tableOrder.rows(indexes).data().toArray();
            rowData.forEach((data) => {
                const removeIndex = listOrder.findIndex(
                    (order) => order.IdOrder === data.IdOrder
                );
                if (removeIndex !== -1) {
                    listOrder.splice(removeIndex, 1);
                }
            });
            console.log(listOrder);
        });
}

/**
 *
 * @param {*} data - [
 *      {
 *          "IdOrder": "5536",
 *          "MachineName": "ST-59",
 *          "StartDate": "2009-01-02",
 *          "EndDate": "2009-01-04",
 *          "EndShift": "P",
 *          "MetersDone": 6500
 *      }
 *  ]
 */
function generateTimeTable(data) {
    // Define shift start and end hours
    const shiftHours = {
        P: { start: "07:00", end: "15:00" },
        S: { start: "15:00", end: "23:00" },
        M: { start: "23:00", end: "07:00" },
    };

    // Function to adjust the date and time based on the shift
    function adjustDateTime(date, shift, isStart) {
        const [year, month, day] = date.split("-").map(Number);
        const { start, end } = shiftHours[shift];
        const time = isStart ? start : end;
        const dateTime = new Date(year, month - 1, day);

        // Adjust for the 'M' shift ending on the next day
        if (shift === "M" && !isStart) {
            dateTime.setDate(dateTime.getDate() + 1);
        }

        const [hours, minutes] = time.split(":").map(Number);
        dateTime.setHours(hours, minutes, 0, 0);

        return dateTime;
    }

    // Create a DataSet for groups
    const groups = new vis.DataSet();

    // Create a DataSet for items
    const items = new vis.DataSet();

    // Iterate through each order in the data
    data.forEach((order) => {
        const groupExists = groups.get({
            filter: (group) => group.id === order.MachineName,
        });

        if (!groupExists.length) {
            // If the group doesn't exist, create it
            groups.add({
                id: order.MachineName,
                content: order.MachineName,
            });
        }

        const startDateTime = adjustDateTime(order.StartDate, "P", true);
        const endDateTime = adjustDateTime(
            order.EndDate,
            order.EndShift,
            false
        );

        items.add({
            id: order.IdOrder,
            group: order.MachineName,
            content: `Order ${order.IdOrder}<br>Jumlah Meter: ${order.MetersDone}`,
            start: startDateTime,
            end: endDateTime,
            title: `Order ${order.IdOrder} (${order.MetersDone} Meter)`,
        });
    });

    // Configuration for the Timeline
    const options = {
        width: "100%",
        height: "500px",
        stack: false,
        showCurrentTime: true,
        zoomMin: 1000 * 60 * 60 * 24, // one day in milliseconds
        type: "range",
        format: {
            minorLabels: {
                minute: "h:mma",
                hour: "ha",
            },
        },
    };

    // Create or update the Timeline
    const container = document.getElementById("visualization");
    if (!timeline) {
        timeline = new vis.Timeline(container, items, groups, options);
    } else {
        timeline.setItems(items);
        timeline.setGroups(groups);
        window.timeline.fit();
    }
}

function init() {
    getPendingOrder();
}

$(document).ready(function () {
    init();
});
//#endregion

//#region Spesifikasi Mesin Terhadap Order (Per Group / Type)
const mesinJB_01_11 = {
    IdGroup: "02",
    TypeOrder: ["AE", "C", "EL"],
    Ukuran: [140, 360],
    Denier: [1500, 2075],
    TypeBenang: ["LAYAR", "TUBULAR"],
    Jumlah: 11,
};

const mesinYM = {
    IdGroup: "11",
    TypeOrder: ["AE", "C", "EL"],
    Ukuran: [50, 140],
    Denier: [1500, 1850],
    TypeBenang: ["LAYAR", "KR-KN", "SAMPING"],
    Jumlah: 5,
};

const mesinSO = {
    IdGroup: "12",
    TypeOrder: ["AE", "B", "C", "EL", "WL"],
    Ukuran: [30, 80],
    Denier: [500, 1000],
    TypeBenang: ["LAYAR", "TUBULAR"],
    Jumlah: 40,
};

const mesinST = {
    IdGroup: "13",
    TypeOrder: ["A", "AE", "B", "C", "EL", "SF", "ST"],
    Ukuran: [25, 155],
    Denier: [500, 2175],
    TypeBenang: ["LAYAR", "KR-KN", "SAMPING", "TUBULAR"],
    Jumlah: 76,
};

const mesinRJ = {
    IdGroup: "14",
    TypeOrder: ["AE", "B", "C", "EL", "SF"],
    Ukuran: [85, 130],
    Denier: [500, 2175],
    TypeBenang: ["KR-KN", "SAMPING", "TUBULAR"],
    Jumlah: 9,
};

const mesinJB_12_24 = {
    IdGroup: "15",
    TypeOrder: ["AE", "C", "EL"],
    Ukuran: [170, 220],
    Denier: [1500, 2200],
    TypeBenang: ["KR-KN", "TUBULAR"],
    Jumlah: 13,
};

const listGroupMesin = [
    mesinJB_01_11,
    mesinYM,
    mesinSO,
    mesinST,
    mesinRJ,
    mesinJB_12_24,
];
//#endregion

//#region Pencetakan SPK
const btnPrintSpk = document.getElementById("btn_print_spk");
const txtNoSurat = document.getElementById("nomor_surat");

btnPrintSpk.addEventListener("click", function () {
    let noSurat = txtNoSurat.value;
    if (noSurat == "" || /^0*$/.test(noSurat)) {
        txtNoSurat.classList.add("is-invalid");
        return;
    }

    txtNoSurat.classList.remove("is-invalid");
    noSurat = ("0000" + noSurat).slice(-4);
    sessionStorage.setItem("no_surat", noSurat);

    sessionStorage.setItem("list_schedule", JSON.stringify(listSchedule));
    window.open("/print/surat-perintah-kerja", "_blank");
});
//#endregion

// Referensi
// https://demo.mobiscroll.com/javascript/timeline/work-order-scheduling#
// https://www.geeksforgeeks.org/how-to-create-time-table-schedule-using-html/

// https://www.sipas.id/blog/surat-perintah-kerja/
