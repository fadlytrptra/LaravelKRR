@extends('Circular.layouts.app')

@section('content')
    <table id="myTable" class="display">
        <thead>
            <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
                <th>Column 4</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
@endsection

@section('custom_js')
    <script>
        var serverSideUrl = "{{ url('coba-server-side') }}";

        const colObject = [{
                data: "Id_mesin",
            },
            {
                data: "IdType_mesin",
            },
            {
                data: "temp",
            },
            {
                data: "Nama_mesin",
            },
        ];

        var dataTableOptions = {
            processing: true,
            serverSide: true,
            columns: colObject,

            ajax: {
                url: serverSideUrl,
                dataType: "json",
                type: "POST",
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
            },
        };

        $("#myTable").DataTable(dataTableOptions);
    </script>
@endsection
