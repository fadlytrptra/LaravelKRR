@extends('layouts.appKencana')
@section('content')
@section('title', 'Batal BKK')
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
                    <div class="col-md-10 RDZMobilePaddingLR0">
                        <div class="card">
                            <div class="card-header">Batal BKK</div>
                            @if (Session::has('success'))
                                <div class="alert alert-success">
                                    {{ Session::get('success') }}
                                </div>
                            @endif
                            <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                                <div class="form-container col-md-12">
                                    <form action="{{ url('/Kencana/BatalBKKKencana') }}" method="POST" id="formkoreksi">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodkoreksi">
                                        <!-- Form fields go here -->
                                        <div class="row">
                                            <div class="col-md-5">
                                                <input type="radio" name="radiogrup1" value="besar" id="kasBesar"
                                                    checked>
                                                <label for="kasBesar">Kas Besar</label>
                                            </div>
                                            <div class="col-md-5">
                                                <input type="radio" name="radiogrup1" value="kecil" id="kasKecil">
                                                <label for="kasKecil">Kas Kecil</label>
                                            </div>
                                        </div>
                                        <p>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="bulanTahun">Bulan/Tahun</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="bulanTahun" name="bulanTahun" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="bkk" style="margin-right: 10px;">BKK</label>
                                            </div>
                                            <div class="col-md-4">
                                                <select id="idBKKSelect" name="idBKKSelect" class="form-control">
                                                    <option disabled selected>Pilih BKK</option>
                                                </select>
                                            </div>
                                        </div>
                                        <hr style="height:2px;">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="statusPenagihan">Status Penagihan</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="statusPenagihan" name="statusPenagihan"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <p>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="mataUang">Mata Uang</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="mataUang" name="mataUang" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                        </div>
                                        <p>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="nilaiBKM">Nilai BKK</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="nilaiBKK" name="nilaiBKK" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="statusPelunasan">Status Pelunasan</label>
                                            </div>
                                            <div class="col-md-9">
                                                <input type="text" id="statusPelunasan" name="statusPelunasan"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <p>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="statusBatal">Status BATAL</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="statusBatal" name="statusBatal"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <hr style="height:2px;">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="alasan">Alasan</label>
                                            </div>
                                            <div class="col-md-9">
                                                <input type="text" id="alasan" name="alasan" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                        </div>

                                        <br>
                                        <div class="mb-3">
                                            <div class="row">
                                                <div class="col-2">
                                                    <input type="submit" id="btnProses" name="proses" value="PROSES"
                                                        class="btn btn-success">
                                                    <input type="hidden" id="confirmation" name="confirmation"
                                                        value="yes">
                                                    <input type="hidden" id="ttReuseConfirmation"
                                                        name="ttReuseConfirmation" value="">
                                                    <input type="hidden" id="no" name="no" value="no">
                                                    <script>
                                                        $(document).ready(function() {
                                                            $('#formkoreksi').submit(function(event) {
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
                                                                        Swal.fire({
                                                                            title: 'Apakah Tanda Terima Penagihan dipakai kembali ?..',
                                                                            icon: 'question',
                                                                            showCancelButton: true,
                                                                            confirmButtonText: 'Yes',
                                                                            cancelButtonText: 'No'
                                                                        }).then((result) => {
                                                                            if (result.isConfirmed) {
                                                                                // Jika dikonfirmasi, set nilai 'yes' ke dalam input hidden kedua
                                                                                $('#ttReuseConfirmation').val('yes');
                                                                            } else {
                                                                                // Jika tidak dikonfirmasi, set nilai 'no' ke dalam input hidden kedua
                                                                                $('#ttReuseConfirmation').val('no');
                                                                            }
                                                                            // Lanjutkan pengiriman form setelah konfirmasi kedua
                                                                            $(this).unbind('submit').submit();
                                                                        });
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
                                                <div class="col-10">
                                                    {{-- <input type="submit" id="btnKeluar" name="keluar" value="KELUAR"
                                                        class="btn btn-primary d-flex ml-auto"> --}}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script src="{{ asset('js/Kencana/BatalBKK.js') }}"></script>
        @endsection
