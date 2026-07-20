@extends('layouts.appQC')
@section('content')
@section('title', 'Circular Tropodo')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-11 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif

                <div class="row">
                    <div class="col-md-7">

                        {{-- Yang diitung dari database --}}
                        <div class="card">
                            <div class="card-body RDZOverflow RDZMobilePaddingLR0" style="padding: 0">

                                <div class="container">
                                    <div class="row" style="padding-top: 10px">
                                        <div class="col-sm-4">
                                            <label><strong>Potong Gelondongan Circular Tropodo</strong></label>
                                        </div>
                                        <div class="col-sm-3 offset-sm-5">

                                            <form id="dateForm" class="form-inline d-flex align-items-center">
                                                <label for="tanggal" class="mr-2">Tanggal:</label>
                                                <input type="date" id="tanggal" name="tanggal"
                                                    class="form-control mr-2" style="font-size: 11px">
                                            </form>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-2 offset-sm-2 text-center">
                                            <strong>Rajutan</strong>
                                        </div>
                                        <div class="col-sm-4 text-center">
                                            <strong>Benang</strong>
                                        </div>
                                        <div class="col-sm-2 text-center">
                                            <strong>Denier</strong>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-1">
                                            <label for="mesin">Mesin</label>
                                            <input type="text" id="mesin" name="mesin" class="form-control mb-1" style="width: 125%"
                                                readonly>
                                        </div>
                                        <div class="col-sm-1">
                                            <label for="ukuran">Ukuran</label>
                                            <input type="text" id="ukuran" name="ukuran" class="form-control mb-1" style="width: 125%"
                                                readonly>
                                        </div>
                                        <div class="col-sm-1">
                                            <label for="waftRajutan">Waft</label>
                                            <input type="text" id="waftRajutan" name="waftRajutan" style="width: 125%"
                                                class="form-control mb-2" readonly>
                                        </div>
                                        <div class="col-sm-1">
                                            <label for="weftRajutan">Weft</label>
                                            <input type="text" id="weftRajutan" name="weftRajutan" style="width: 125%"
                                                class="form-control mb-1" readonly>
                                        </div>
                                        <div class="col-sm-2">
                                            <label for="waftBenang">Waft</label>
                                            <input type="text" id="waftBenang" name="waftBenang"
                                                class="form-control mb-2" readonly>
                                        </div>
                                        <div class="col-sm-2">
                                            <label for="weftBenang">Weft</label>
                                            <input type="text" id="weftBenang" name="weftBenang" 
                                                class="form-control mb-2" readonly>
                                        </div>
                                        <div class="col-sm-1">
                                            <label for="waftDenier">Waft</label>
                                            <input type="text" id="waftDenier" name="waftDenier" style="width: 125%"
                                                class="form-control mb-1" readonly>
                                        </div>
                                        <div class="col-sm-1">
                                            <label for="weftDenier">Weft</label>
                                            <input type="text" id="weftDenier" name="weftDenier" style="width: 125%"
                                                class="form-control mb-1" readonly>
                                        </div>
                                        <div class="col-sm-2">
                                            <label for="beratStandart">Berat Standart</label>
                                            <input type="text" id="beratStandart" name="beratStandart"
                                                class="form-control mb-2" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {{-- REALITA --}}
                            <div class="card-body RDZOverflow RDZMobilePaddingLR0" style="padding: 0">
                                <label style="padding-left: 1.5%"><strong>Realita</strong></label>
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-2">
                                            <label for="idLog">Id Log</label>
                                            <input type="text" id="idLog" name="idLog" class="form-control mb-1"
                                                readonly>
                                        </div>
                                        <div class="col-sm-2">
                                            <label for="ukuranLebar">Ukuran (Lebar)</label>
                                            <input type="text" id="ukuranLebar" name="ukuranLebar"
                                                class="form-control mb-1">
                                        </div>
                                        <div class="col-sm-2">
                                            <label for="panjangPotongan">Panjang Potongan</label>
                                            <input type="text" id="panjangPotongan" name="panjangPotongan"
                                                class="form-control mb-1" enterkeyhint="enter">
                                        </div>
                                        <div class="col-sm-2">
                                            <label for="beratBarang">Berat Barang</label>
                                            <input type="text" id="beratBarang" name="beratBarang"
                                                class="form-control mb-1">
                                        </div>
                                        <div class="col-sm-2">
                                            <label for="beratReinforced">Berat Reinforced</label>
                                            <input type="text" id="beratReinforced" name="beratReinforced"
                                                class="form-control mb-1" readonly>
                                        </div>
                                        <div class="col-sm-2 d-flex align-items-end">
                                            <button type="button" class="btn btn-primary mb-1"
                                                id="prosesButton">Proses</button>
                                        </div>
                                    </div>
                                </div>

                                {{-- ACTUAL ST --}}
                                <div class="card-body RDZOverflow RDZMobilePaddingLR0" style="padding: 0">
                                    <label style="padding-left: 1.5%"><strong>Actual (ST)</strong></label>
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm-4 text-center">
                                                <strong>Warp</strong>
                                            </div>
                                            <div class="col-sm-4 text-center">
                                                <strong>Weft</strong>
                                            </div>
                                            <div class="col-sm-4 text-center">
                                                <strong>Reinforced</strong>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-2">
                                                <label for="actualStWarp">St (Kgf)</label>
                                                <input type="text" id="actualStWarp" name="actualStWarp"
                                                    class="form-control mb-1">
                                            </div>
                                            <div class="col-sm-2">
                                                <label for="actualElgWarp">Elg (%)</label>
                                                <input type="text" id="actualElgWarp" name="actualElgWarp"
                                                    class="form-control mb-1">
                                            </div>
                                            <div class="col-sm-2">
                                                <label for="actualStWeft">St (Kgf)</label>
                                                <input type="text" id="actualStWeft" name="actualStWeft"
                                                    class="form-control mb-1">
                                            </div>
                                            <div class="col-sm-2">
                                                <label for="actualElgWeft">Elg (%)</label>
                                                <input type="text" id="actualElgWeft" name="actualElgWeft"
                                                    class="form-control mb-1">
                                            </div>
                                            <div class="col-sm-2">
                                                <label for="actualStReinf">St (Kgf)</label>
                                                <input type="text" id="actualStReinf" name="actualStReinf"
                                                    class="form-control mb-1">
                                            </div>
                                            <div class="col-sm-2">
                                                <label for="actualElgReinf">Elg (%)</label>
                                                <input type="text" id="actualElgReinf" name="actualElgReinf"
                                                    class="form-control mb-1">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {{-- Standart --}}
                                <div class="card-body RDZOverflow RDZMobilePaddingLR0" style="padding: 0">
                                    <label style="padding-left: 1.5%"><strong>Standart</strong></label>
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm-4 text-center">
                                                <strong>Warp</strong>
                                            </div>
                                            <div class="col-sm-4 text-center">
                                                <strong>Weft</strong>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-2">
                                                <label for="standartStWarp">St (Kgf)</label>
                                                <input type="text" id="standartStWarp" name="standartStWarp"
                                                    class="form-control mb-1" readonly>
                                            </div>
                                            <div class="col-sm-2">
                                                <label for="standartElgWarp">Elg (%)</label>
                                                <input type="text" id="standartElgWarp" name="standartElgWarp"
                                                    class="form-control mb-1" readonly>
                                            </div>
                                            <div class="col-sm-2">
                                                <label for="standartStWeft">St (Kgf)</label>
                                                <input type="text" id="standartStWeft" name="standartStWeft"
                                                    class="form-control mb-1" readonly>
                                            </div>
                                            <div class="col-sm-2">
                                                <label for="standartElgWeft">Elg (%)</label>
                                                <input type="text" id="standartElgWeft" name="standartElgWeft"
                                                    class="form-control mb-1" readonly>
                                            </div>
                                        </div>

                                        <div class="row mt-2 mb-2">
                                            <div class="col-sm-2"><button class="btn btn-primary btn-block btn-sm"
                                                    id="refreshButton">REFRESH</button></div>
                                            <div class="col-sm-2"><button class="btn btn-primary btn-block btn-sm"
                                                    id="isiButton">ISI</button></div>
                                            <div class="col-sm-2"><button class="btn btn-primary btn-block btn-sm"
                                                    id="koreksiButton">KOREKSI</button></div>
                                            <div class="col-sm-2"><button class="btn btn-primary btn-block btn-sm"
                                                    id="hapusButton">HAPUS</button></div>
                                            <div class="col-sm-2"><button class="btn btn-primary btn-block btn-sm"
                                                    id="batalButton">BATAL</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-5">

                        <div class="card">
                            <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                                <div class="acs-div-container">
                                    <div c1lass="container">
                                        <div class="table-responsive fixed-height">
                                            <table id="tableDataByDate" class="display table-height" style="width:100%">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th scope="col">Mesin</th>
                                                        <th scope="col">Shift</th>
                                                        <th scope="col">Id Log</th>
                                                        <th scope="col">Nama Barang</th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- Table yang Selected --}}
                        <div class="card">
                            <div class="card-body RDZOverflow RDZMobilePaddingLR0" style="padding: 0; padding-top: 5px">
                                <div class="acs-div-container">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="table-responsive fixed-height">
                                                    <table class="table table-bordered table-height" id="tableQcData">
                                                        <thead class="table-dark">
                                                            <tr>
                                                                <th scope="col">Mesin</th>
                                                                <th scope="col">Shift</th>
                                                                <th scope="col">Id Log</th>
                                                                <th scope="col">Ukuran</th>
                                                                <th scope="col">Potongan</th>
                                                                <th scope="col">Berat</th>
                                                                <th scope="col">Berat STD</th>
                                                                <th scope="col">Keterangan</th>
                                                                <th scope="col">StWarp</th>
                                                                <th scope="col">ElgWarp</th>
                                                                <th scope="col">StWeft</th>
                                                                <th scope="col">ElgWeft</th>
                                                                <th scope="col">StReinf</th>
                                                                <th scope="col">ElgReinf</th>
                                                                <th scope="col">BeratReinf</th>
                                                                <th scope="col">Standart St Warp</th>
                                                                <th scope="col">Standart St Weft</th>
                                                                <th scope="col">Standart Elg Warp</th>
                                                                <th scope="col">Standart Elg Weft</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                </div>

            </div>
        </div>
    </div>


    <script type="text/javascript" src="{{ asset('js/QC/Circular/CircularTropodo.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/QC/Circular/CircularTropodo.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
