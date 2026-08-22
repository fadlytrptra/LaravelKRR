@extends('layouts.appKencana')

@section('title', 'Create Customer')

@section('content')

<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/Kencana/customer.css') }}" rel="stylesheet">

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">

            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @endif

            <div class="card">
                <div class="card-header">
                    Create Customer
                </div>

                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <div class="permohonan-do-container">

                        <form
                            class="permohonan-do-form"
                            method="POST"
                            action="{{ route('Kencana.Customer.store') }}"
                            id="FormCustomer">

                            @csrf

                            <div class="permohonan-do-form">
                                <div class="acs-form">

                                    {{-- =========================
                                         FORM 1
                                         ========================= --}}
                                    <div class="acs-form1">

                                        <div class="acs-div-filter">
                                            <label for="JnsCust">Jenis Customer</label>

                                            <select
                                                name="JnsCust"
                                                id="JnsCust"
                                                class="input">

                                                <option selected disabled>
                                                    -- Pilih Jenis Customer --
                                                </option>

                                                @foreach ($jnscust as $data)
                                                    <option value="{{ $data->IDJnsCust }}">
                                                        {{ $data->IDJnsCust }}
                                                        -
                                                        {{ $data->NamaJnsCust }}
                                                    </option>
                                                @endforeach

                                            </select>
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="NamaCust">
                                                Nama Customer
                                            </label>

                                            <input
                                                type="text"
                                                name="NamaCust"
                                                id="NamaCust"
                                                class="input"
                                                placeholder="Nama Customer">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="KodeCust">
                                                Initial Customer
                                            </label>

                                            <input
                                                type="text"
                                                name="KodeCust"
                                                id="KodeCust"
                                                class="input"
                                                placeholder="Initial Customer">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="ContactPerson">
                                                Contact Person
                                            </label>

                                            <input
                                                type="text"
                                                name="ContactPerson"
                                                id="ContactPerson"
                                                placeholder="Contact Person"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="LimitBeli">
                                                Limit Pembelian
                                            </label>

                                            <input
                                                type="text"
                                                name="LimitBeli"
                                                id="LimitBeli"
                                                placeholder="Limit Pembelian"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="Alamat">
                                                Alamat Kantor
                                            </label>

                                            <textarea
                                                name="Alamat"
                                                id="Alamat"
                                                cols="30"
                                                rows="3"
                                                placeholder="Alamat Kantor"></textarea>
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="Kota">Kota</label>

                                            <input
                                                type="text"
                                                name="Kota"
                                                id="Kota"
                                                placeholder="Kota"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="Province">
                                                Provinsi
                                            </label>

                                            <input
                                                type="text"
                                                name="Province"
                                                id="Province"
                                                placeholder="Provinsi"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="Negara">
                                                Negara
                                            </label>

                                            <input
                                                type="text"
                                                name="Negara"
                                                id="Negara"
                                                placeholder="Negara"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="KodePos">
                                                Kode Pos
                                            </label>

                                            <input
                                                type="text"
                                                name="KodePos"
                                                id="KodePos"
                                                placeholder="Kode Pos"
                                                class="input">
                                        </div>

                                    </div>


                                    {{-- =========================
                                         FORM 2
                                         ========================= --}}
                                    <div class="acs-form1">

                                        <div class="acs-div-filter">
                                            <label for="NoTelp1">
                                                No Telpon 1
                                            </label>

                                            <input
                                                type="text"
                                                name="NoTelp1"
                                                id="NoTelp1"
                                                placeholder="No Telpon 1"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="NoTelp2">
                                                No Telpon 2
                                            </label>

                                            <input
                                                type="text"
                                                name="NoTelp2"
                                                id="NoTelp2"
                                                placeholder="No Telpon 2"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="NoTelex">
                                                No Telex
                                            </label>

                                            <input
                                                type="text"
                                                name="NoTelex"
                                                id="NoTelex"
                                                placeholder="No Telex"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="NoFax1">
                                                No Fax 1
                                            </label>

                                            <input
                                                type="text"
                                                name="NoFax1"
                                                id="NoFax1"
                                                placeholder="No Fax 1"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="NoFax2">
                                                No Fax 2
                                            </label>

                                            <input
                                                type="text"
                                                name="NoFax2"
                                                id="NoFax2"
                                                placeholder="No Fax 2"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="NoHp1">
                                                No. HP 1
                                            </label>

                                            <input
                                                type="text"
                                                name="NoHp1"
                                                id="NoHp1"
                                                placeholder="No. HP 1"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="NoHp2">
                                                No. HP 2
                                            </label>

                                            <input
                                                type="text"
                                                name="NoHp2"
                                                id="NoHp2"
                                                placeholder="No. HP 2"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="Email">Email</label>

                                            <input
                                                type="text"
                                                name="Email"
                                                id="Email"
                                                placeholder="Email"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="AlamatKirim">
                                                Alamat Kirim
                                            </label>

                                            <textarea
                                                name="AlamatKirim"
                                                id="AlamatKirim"
                                                cols="30"
                                                rows="3"
                                                placeholder="Alamat Kirim"></textarea>
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="KotaKirim">
                                                Kota Kirim
                                            </label>

                                            <input
                                                type="text"
                                                name="KotaKirim"
                                                id="KotaKirim"
                                                placeholder="Kota Kirim"
                                                class="input">
                                        </div>

                                    </div>


                                    {{-- =========================
                                         FORM 3
                                         ========================= --}}
                                    <div class="acs-form1">

                                        <div class="acs-div-filter">
                                            <label for="NPWP">
                                                No. NPWP
                                            </label>

                                            <input
                                                type="text"
                                                name="NPWP"
                                                id="NPWP"
                                                placeholder="No. NPWP"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="NamaNPWP">
                                                Nama di NPWP
                                            </label>

                                            <input
                                                type="text"
                                                name="NamaNPWP"
                                                id="NamaNPWP"
                                                placeholder="Nama di NPWP"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="AlamatNPWP">
                                                Alamat di NPWP
                                            </label>

                                            <textarea
                                                name="AlamatNPWP"
                                                id="AlamatNPWP"
                                                cols="30"
                                                rows="10"
                                                placeholder="Alamat di NPWP"></textarea>
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="NITKU">
                                                NITKU
                                            </label>

                                            <input
                                                type="text"
                                                name="NITKU"
                                                id="NITKU"
                                                placeholder="NITKU"
                                                class="input">
                                        </div>

                                        <div class="acs-div-filter">
                                            <label for="IdPembeliCoretax">
                                                ID Pembeli
                                            </label>

                                            <input
                                                type="text"
                                                name="IdPembeliCoretax"
                                                id="IdPembeliCoretax"
                                                placeholder="IdPembeliCoretax"
                                                class="input">
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div class="acs-div-btn">
                                <button
                                    id="submit_btn"
                                    type="submit"
                                    class="btn btn-primary">

                                    <span>Submit</span>

                                </button>
                            </div>

                        </form>


                        {{-- QR CODE --}}
                        <div id="qr-code-uji-coba">

                            <input
                                id="text-content"
                                type="text"
                                value="https://kertarajasa.co.id/"
                                style="width:80%">

                            <br>

                            <div
                                id="qrcode"
                                style="width:200px; height:200px; margin-top:15px;">
                            </div>

                            <span id="text-qr"></span>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    </div>
</div>


<script src="{{ asset('js/qrcode.js') }}"></script>

<style>
    #qr-code-uji-coba {
        display: none;
    }

    @media print {
        .permohonan-do-form {
            display: none !important;
        }

        #text-content {
            display: none;
        }

        #qrcode {
            display: block !important;
        }

        #text-qr {
            display: block;
            font-size: 18px;
        }
    }
</style>

<script>
    var qrcode = new QRCode(
        document.getElementById("qrcode"),
        {
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        }
    );

    function makeCode() {

        var elText = document.getElementById("text-content");
        var textqr = document.getElementById("text-qr");

        if (!elText.value) {
            alert("Input a text");
            elText.focus();
            return;
        }

        textqr.innerHTML = elText.value;

        qrcode.makeCode(elText.value);
    }

    makeCode();

    $("#text-content")
        .on("blur", function() {
            makeCode();
        })
        .on("keydown", function(e) {
            if (e.keyCode == 13) {
                makeCode();
            }
        });
</script>

@endsection