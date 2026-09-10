@extends('Circular.layouts.app')

@section('title')
    Hapus History
@endsection

@section('content')
    {{-- <div class="card mb-3">
        <div class="card-header">
            Maintenance Order
        </div> --}}

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Hapus History</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <div class="container">
                                    <div class="row justify-content-center mb-3">
                                        <div class="col-md-4 text-center">
                                            <label for="btn_hapus" class="form-label fw-bold">Hapus History
                                                Circular</label>
                                        </div>
                                    </div>

                                    <div class="row justify-content-center">
                                        <div class="col-md-2 text-center">
                                            <button class="btn btn-danger" id="btn_hapus">Hapus</button>
                                        </div>
                                    </div>
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
    <script src="{{ asset('js/Circular/koreksi/HapusHistory.js') }}"></script>
@endsection
