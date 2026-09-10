@extends('CircularM.layouts.app')

@section('title')
    Circular.Net Mlorah
@endsection

@section('content')
    <style>
        html {
            overflow: hidden;
        }

        main {
            background-image: url("images/Circular/background-circular.jpg");
            background-position: -3vw 15vh;
            background-size: 35%;
            overflow: hidden;
        }

        .border-ku {
            border: 3px solid #000;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
        }
    </style>

    <div class="row mt-3">
        <div class="col-md-6 mb-3">
            <div class="p-3 bg-white border-ku" style="--bs-bg-opacity: .75;">
                <h1>Selamat datang, <br>{{ Auth::user()->NamaUser }}</h1>
                <p>Silahkan menuju halaman yang diinginkan melalui menu di atas.</p>
            </div>
        </div>

        <div class="col-md-6 d-flex justify-content-center">
            <img src="{{ asset('images/Circular/background-circular.jpg') }}" alt="Selamat datang di Aplikasi Circular!"
                class="border-ku" style="height: 70%;">
        </div>
    </div>
@endsection
