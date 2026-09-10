/**
    // Input:
    [
        {
            order: "Order A",
            machines: ["Mesin A", "Mesin B", "Mesin C"],
            startDate: ["2024-05-01", "2024-05-01", "2024-05-01"],
            startShift: ["P", "P", "P"],
            endDate: ["2024-06-01", "2024-08-01", "2024-08-01"],
            endShift: ["S", "M", "S"],
        },
        {
            order: "Order B",
            machines: ["Mesin A", "Mesin B", "Mesin C"],
            startDate: ["2024-06-01", "2024-08-02", "2024-08-01"],
            startShift: ["M", "P", "M"],
            endDate: ["2024-08-01", "2024-09-01", "2024-09-01"],
            endShift: ["P", "P", "P"],
        },
    ]
 * @param {*} machine_schedule
 */
function generateTimeTable(machine_schedule) {
    const days = [];
    const format = "YYYY-MM-DD";
    const dateFormat = "MMM D";
    const shiftNames = ["Pagi", "Sore", "Malam"];
    const shiftsPerDay = 3; // Assuming there are three shifts: Morning, Afternoon, Night

    // Create the table and wrap it with 'table-responsive' div
    const responsiveDiv = document.createElement("div");
    responsiveDiv.className = "table-responsive";
    const table = document.createElement("table");
    table.id = "time_table";
    table.className = "table table-sm";
    responsiveDiv.appendChild(table);

    // Create header row for days
    const headerRow = table.insertRow();
    const timeHeader = document.createElement("th");
    timeHeader.appendChild(document.createTextNode("Waktu / Mesin"));
    timeHeader.rowSpan = 2;
    headerRow.appendChild(timeHeader);

    // Calculate the days covered
    machine_schedule.forEach((priority) => {
        priority.machines.forEach((machine, index) => {
            const startDate = moment(priority.startDates[index]);
            const endDate = moment(priority.endDates[index]);
            let currentDate = startDate.clone();

            while (currentDate <= endDate) {
                const currentFormatDate = currentDate.format(format);
                if (!days.includes(currentFormatDate)) {
                    days.push(currentFormatDate);
                }
                currentDate.add(1, "days");
            }
        });
    });

    days.sort();

    // Adding day headers with colspan
    days.forEach((day) => {
        const th = document.createElement("th");
        th.colSpan = shiftsPerDay;
        th.appendChild(document.createTextNode(moment(day).format(dateFormat)));
        headerRow.appendChild(th);
    });

    // Create shift headers under each day
    const shiftRow = table.insertRow();
    days.forEach(() => {
        shiftNames.forEach((shift) => {
            const th = document.createElement("th");
            th.appendChild(document.createTextNode(shift));
            shiftRow.appendChild(th);
        });
    });

    // Map to track which orders are active during which shifts
    const scheduleMap = {};
    machine_schedule.forEach((priority) => {
        priority.machines.forEach((machine, index) => {
            const key = `${machine}-${priority.startDates[index]}-${priority.endDates[index]}`;
            if (!scheduleMap[key]) {
                scheduleMap[key] = [];
            }
            scheduleMap[key].push(priority.order);
        });
    });

    // Create rows for each machine
    const machineSet = new Set();
    machine_schedule.forEach((priority) => {
        priority.machines.forEach((machine) => machineSet.add(machine));
    });

    machineSet.forEach((machine) => {
        const row = table.insertRow();
        const machineHeader = document.createElement("th");
        machineHeader.appendChild(document.createTextNode(machine));
        row.appendChild(machineHeader);

        days.forEach((day) => {
            shiftNames.forEach((shift) => {
                const td = row.insertCell();
                let text = "No Order"; // Default text if no order is found
                // This is a simplified check, assumes orders do not overlap in real use cases
                machine_schedule.forEach((priority) => {
                    priority.machines.forEach((machineName, index) => {
                        if (machine === machineName) {
                            const startDate = moment(
                                priority.startDates[index]
                            );
                            const endDate = moment(priority.endDates[index]);
                            const currentDay = moment(day);
                            if (
                                currentDay.isBetween(
                                    startDate,
                                    endDate,
                                    "days",
                                    "[]"
                                )
                            ) {
                                text = priority.order; // This assumes the order is applicable
                            }
                        }
                    });
                });
                td.appendChild(document.createTextNode(text));
            });
        });
    });

    const containerKu = document.getElementById("time_table_container");
    containerKu.innerHTML = ``;
    containerKu.appendChild(responsiveDiv);
}
