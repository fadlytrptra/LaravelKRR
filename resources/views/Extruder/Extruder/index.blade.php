@extends('layouts.appExtruder')

@section('title')
    Extruder Homepage
@endsection

@section('content')
    @if (Session::has('info'))
        <script>
            Swal.fire({
                title: 'Informasi',
                text: @json(session('info')),
                icon: 'info',
                confirmButtonText: 'OK'
            });
        </script>
    @endif
    <div id="page_title" class="section-header" data-aos="fade-up">
        <h2>Extruder Homepage</h2>
    </div>
@endsection
