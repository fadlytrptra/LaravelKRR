@extends('layouts.appKencana')
@section('content')
@section('title', 'Penyesuaian Saldo Supplier')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Penyesuaian Saldo Supplier</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="" action="">
                            @csrf
                            <!-- Form fields go here -->
                            <div>
                                <div style="white-space: nowrap;">
                                    <h5>PENYESUAIAN SALDO</h5>
                                </div>
                            </div>

                            <div class="radio-container">
                                <div>
                                    <label>Supplier</label>
                                </div>
                                <div>
                                    <input type="radio" name="radiogrup" value="radio_hutang" id="radiogrup_hutang" checked>
                                    <label for="radiogrup_hutang">Hutang</label>
                                    <label style="visibility: hidden">AAAAA</label>
                                    <input type="radio" name="radiogrup" value="radio_tunai" id="radiogrup_tunai">
                                    <label for="radiogrup_tunai">Tunai</label>
                                    <label style="visibility: hidden">AAAAAAA</label>
                                    <button id="btn_ok" class="btn btn-primary">OK</button>
                                </div>
                            </div>
                            <br>
                            <table class="table" id="tablepenyesuaian">
                                <thead class="table-dark">
                                    <tr>
                                        <th>Id Supplier</th>
                                        <th>Supplier</th>
                                        <th>Kartu Saldo</th>
                                        <th>Kartu Saldo Rp</th>
                                        <th>Mata Uang</th>
                                        <th>Supplier Saldo</th>
                                        <th>Supplier Saldo Rp</th>
                                        <th>Id Trans</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>

                            <div class="row">
                                <div class="col-9" style="margin-left: 20px;">
                                    <div>
                                        <input class="form-check-input" type="checkbox" id="checkbox2" value="option1">
                                    </div>
                                    <div style="white-space: nowrap;">
                                        <label for="checkbox2">Pilih Semua</label>
                                    </div>
                                </div>
                                <div class="col-12 d-flex justify-content-end">
                                    <button class="btn btn-success" id="btn_proses1">Proses</button>
                                </div>
                            </div>

                            <hr style="height:2px;">
                            <div>
                                <div style="white-space: nowrap;">
                                    <h5>ISI SALDO KOSONG</h5>
                                </div>
                            </div>

                            <br>
                            <table class="table" id="tablesaldokosong">
                                <thead class="table-dark">
                                    <tr>

                                        <th>Id. Supplier</th>
                                        <th>Supplier</th>
                                        <th>Supplier Saldo</th>
                                        <th>Supplier Saldo Rp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>

                            <p>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-9" style="margin-left: 20px;">
                                        <div>
                                            <input class="form-check-input" type="checkbox" id="checkboxAll_ISK" value="option1">
                                        </div>
                                        <div style="white-space: nowrap;">
                                            <label for="checkboxAll_ISK">Pilih Semua</label>
                                        </div>
                                    </div>
                                    <div class="col-12 d-flex justify-content-end">
                                        <button class="btn btn-success" id="btn_proses2">Proses</button>
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
<script src="{{ asset('js/Kencana/PenyesuaianSaldoSupplier.js') }}"></script>
@endsection
