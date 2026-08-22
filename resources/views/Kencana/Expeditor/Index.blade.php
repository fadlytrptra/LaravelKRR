@extends('layouts.appKencana')

@section('title', 'Expeditor')

@section('content')

<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/Kencana/expeditor.css') }}" rel="stylesheet">

<div class="container-fluid">

    <div class="row justify-content-center">

        <div class="col-md-10 RDZMobilePaddingLR0">

            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @endif

            <button
                class="acs-icon-btn acs-add-btn acs-float"
                onclick="openNewWindow('{{ route('Kencana.Expeditor.create') }}')">

                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">
                    Tambah Expeditor
                </div>

            </button>

            <div class="card">

                <div class="card-header">
                    Expeditor
                </div>

                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <table
                        id="table_Expeditor"
                        class="table table-bordered table-striped"
                        style="width:100%">

                        <thead class="thead-dark">

                            <tr>
                                <th>Id Expeditor</th>
                                <th>Nama Expeditor</th>
                                <th>Contact Person</th>
                                <th>Negara</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            @foreach ($data as $item)

                                <tr>

                                    <td class="RDZPaddingTable RDZCenterTable">
                                        {{ $item->IDExpeditor }}
                                    </td>

                                    <td class="RDZPaddingTable RDZCenterTable">
                                        {{ $item->NamaExpeditor }}
                                    </td>

                                    <td class="RDZPaddingTable RDZCenterTable">
                                        {{ $item->ContactPerson }}
                                    </td>

                                    <td class="RDZPaddingTable RDZCenterTable">
                                        {{ $item->Negara }}
                                    </td>

                                    <td class="acs-td-button">

                                        <button
                                            type="button"
                                            class="btn btn-sm btn-primary"
                                            onclick="openNewWindow('{{ route('Kencana.Expeditor.edit', $item->IDExpeditor) }}')">

                                            <span>&#x270E;</span>
                                            Edit

                                        </button>

                                        <form
                                            action="{{ route('Kencana.Expeditor.destroy', $item->IDExpeditor) }}"
                                            method="POST"
                                            style="display:inline;"
                                            onsubmit="return confirm('Apakah Anda Yakin ?');">

                                            @csrf
                                            @method('DELETE')

                                            <button
                                                type="submit"
                                                class="btn btn-sm btn-danger">

                                                <span>&#x1F5D1;</span>
                                                Hapus

                                            </button>

                                        </form>

                                    </td>

                                </tr>

                            @endforeach

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    </div>

</div>

<script>
    $(document).ready(function () {

        $('#table_Expeditor').DataTable({
            order: [
                [1, 'asc']
            ]
        });

    });
</script>

@endsection