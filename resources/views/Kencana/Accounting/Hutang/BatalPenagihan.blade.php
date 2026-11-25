@extends('layouts.appKencana')
@section('content')
@section('title', 'Batal Penagihan Kencana')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <script>
                let successMessage = '';
                let errorMessage = '';
            </script>
            @if (Session::has('success'))
                <script>
                    successMessage = "{{ Session::get('success') }}";
                </script>
            @elseif (Session::has('error'))
                <script>
                    errorMessage = "{{ Session::get('error') }}";
                </script>
            @endif
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-md-8 RDZMobilePaddingLR0">
                        <div class="card">
                            <div class="card-header">Batal Penagihan</div>
                            <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                                <div class="form-container col-md-12">
                                    <form action="{{ route('BatalPenagihanKencana.store') }}" method="POST"
                                        id="formbatalpenagihan">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodkoreksi">
                                        <!-- Form fields go here -->
                                        <div class="container fluid">
                                            <p>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label for="id">BULAN/TAHUN</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="number" name="bulan" id="bulan" class="form-control"
                                                        style="width: 100%">
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="number" name="tahun" id="tahun" class="form-control"
                                                        style="width: 100%">
                                                </div>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label for="idPenagihan">ID Penagihan</label>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="input-group">
                                                        {{-- <select id="idPenagihan" name="idPenagihan" class="form-control">
                                                <option disabled selected>-- Pilih ID --</option>
                                                @foreach ($penagihan as $p)
                                                <option value="{{ $p->Id_Penagihan }}">{{ $p->Id_Penagihan }}</option>
                                                @endforeach
                                            </select> --}}
                                                        <input type="text" class="form-control" id="idPenagihan"
                                                            name="idPenagihan" required>
                                                        <div class="input-group-append">
                                                            <button class="btn btn-outline-secondary" type="button"
                                                                id="btn_id"
                                                                style="border-radius: 5px; height:90%; cursor: pointer;">...</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr style="height:2px;">
                                        <div class="container fluid">
                                            <p>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label for="supplier">Supplier</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" id="supplier" name="supplier"
                                                        class="form-control" style="width: 400px">
                                                </div>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="container fluid">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label for="mataUang">Mata Uang</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" id="mataUang" class="form-control"
                                                        style="width: 200px">
                                                </div>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="container fluid">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label for="nilaiTagihan">Nilai Tagihan</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" id="nilaiTagihan" class="form-control"
                                                        style="width: 200px">
                                                </div>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="container fluid">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label for="statusPenagihan">Status Penagihan</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" id="statusPenagihan" class="form-control"
                                                        style="width: 400px">
                                                </div>
                                            </div>
                                        </div>

                                        <hr style="height:2px;">
                                        <div class="container fluid">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label for="alasan">Alasan</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <input type="text" id="alasan" name="alasan" class="form-control"
                                                        style="width: 700px" required>
                                                </div>
                                            </div>
                                        </div>

                                        <p>
                                        <div class="container fluid">
                                            <button type="submit" id="btn_proses" style="width: 100px"
                                                class="btn btn-primary">Proses</button>
                                            <input type="hidden" id="confirmation" name="confirmation" value="no">
                                            <input type="hidden" id="no" name="no" value="no">
                                            <script>
                                                $(document).ready(function() {
                                                    $('#formbatalpenagihan').submit(function(event) {
                                                        event.preventDefault(); // Mencegah pengiriman form default

                                                        Swal.fire({
                                                            title: 'Konfirmasi',
                                                            text: "Apakah Anda yakin ingin memproses?",
                                                            icon: 'question',
                                                            showCancelButton: true,
                                                            confirmButtonColor: '#3085d6',
                                                            cancelButtonColor: '#d33',
                                                            confirmButtonText: 'Ya, Proses!'
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                // Set nilai 'yes' ke dalam input hidden
                                                                $('#confirmation').val('yes');
                                                                // Lanjutkan pengiriman form setelah konfirmasi
                                                                $(this).unbind('submit').submit();
                                                            } else {
                                                                // Jika tidak dikonfirmasi, set nilai 'no' ke dalam input hidden
                                                                $('#no').val('no');
                                                                // Lanjutkan pengiriman form setelah diubah nilai input hidden
                                                                $(this).unbind('submit').submit();
                                                            }
                                                        });
                                                    });
                                                });
                                            </script>
                                        </div>
                                    </form>
                                    <br>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script src="{{ asset('js/Kencana/BatalPenagihan.js') }}"></script>
        @endsection
