@extends('Circular.layouts.app')

@section('title')
    Jam Panen
@endsection

@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Jam Panen</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            @csrf
                            <div class="container">
                                <div class="row justify-content-center mb-3">
                                    <div class="col-md-4 text-center">
                                        <label for="btn_proses" class="form-label fw-bold">Jam Panen
                                            Circular</label>
                                    </div>
                                </div>

                                <div class="row justify-content-center">
                                    <div class="col-md-2 text-center">
                                        <button class="btn btn-success" id="btn_proses">Proses</button>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/informasi/JamPanen.js') }}"></script>
@endsection
