function getPendingOrder() {
    const columnsKu = [
        {
            data: "IdOrder",
            width: "75px",
        },
        {
            data: "NamaBarang",
            width: "550px",
        },
        {
            data: "JumlahOrder",
            width: "110px",
        },
        {
            data: "RencanaMulai",
            width: "135px",
        },
        {
            data: "RencanaSelesai",
            width: "135px",
        },
        {
            data: "InfoTambahan",
            width: "50px",
        },
    ];

    initTableServerSide(
        "table_order",
        columnsKu,
        serverSideUrl,
        null,
        null,
        () => {
            addMultiRowClick(
                "table_order",

                (data, index) => {
                    $(".checkbox_order").eq(index).click();
                    listIdOrder.push($(".checkbox_order").eq(index).val());
                    listOrder.push(data);

                    // console.log("listOrder", listOrder);
                    // console.log("listIdOrder", listIdOrder);
                },

                (_, index) => {
                    $(".checkbox_order").eq(index).click();
                    let selectBox = listIdOrder.indexOf(
                        $(".checkbox_order").eq(index).val()
                    );

                    if (selectBox !== -1) {
                        listIdOrder.splice(selectBox, 1);
                        listOrder.splice(selectBox, 1);
                    }
                }
            );
        }
    );
}

var listIdOrder = [];
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
