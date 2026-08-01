<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}"> <!-- CSRF Token -->

    <link rel="icon" href="{{ asset('/images/KRR.png') }}" type="image/gif" sizes="17x15">
    {{-- <title style="font-size: 20px">{{ config('app.name', 'Laravel') }}</title> --}}
    <title>@yield('title', config('app.name'))</title>
    <!-- Scripts -->
    <script src="{{ asset('js/jquery-3.1.0.js') }}" loading=lazy></script>

    <!-- Select2 -->
    <script src="{{ asset('js/select2.min.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
    <!-- <script src="//code.jquery.com/jquery-1.11.0.min.js"></script> -->
    <script src="{{ asset('js/datatables.min.js') }}"></script>
    <script src="{{ asset('js/jquery-dateformat.js') }}"></script>

    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
    <script src="{{ asset('js/numeral.min.js') }}"></script>
    <script src="{{ asset('js/User.js') }}"></script>
    <script src="{{ asset('js/jsdelivrNpmSelect2.js') }}"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="{{ asset('css/FontsGoogleapisIconFamilyMaterialIcons.css') }}" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/datatables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/buttons.dataTables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/Rdz.css') }}" rel="stylesheet">
    <!-- Select2 -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/select2.min.css') }}">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="{{ asset('css/FontsGoogleMaterialIcons.css') }}">
    <link rel="stylesheet" href="{{ asset('css/fonts.googleapis.MaterialSymbolsOutlined.css') }}" />
    <link href="{{ asset('css/JsdelivrNpmSelect2.css') }}" rel="stylesheet" />
    @guest
    @else
        <script src="{{ asset('js/RDZ.js') }}"></script>
    @endguest
</head>
@guest

    <body>
    @else

        <body onload="Greeting()">
        @endguest
        <div id="app">
            <nav class="navbar navbar-expand-md navbar-light bg-white shadow sticky-top">
                <div class="container col-md-12">
                    <div class="d-flex align-items-center">
                        <a class="navbar-brand RDZNavBrandCenter RDZUnderLine" href="{{ url('/') }}">
                            <img src="{{ asset('/images/KRR.png') }}" width="55" height="50" alt="KRR">
                            {{ config('app.name', 'Laravel') }}
                        </a>

                        @if (request()->is('home'))
                            <div class="dropdown d-inline-block">
                                <button class="menu-navbar dropdown-toggle" data-bs-toggle="dropdown">
                                    Informasi
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <button class="dropdown-item" data-bs-toggle="modal"
                                            data-bs-target="#modalPengumuman">
                                            ANNOUNCEMENT
                                        </button>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="{{ route('meeting.index') }}">
                                            MEETING
                                        </a>
                                    </li>
                                    <li>
                                        <button class="dropdown-item" data-bs-toggle="modal"
                                            data-bs-target="#modalIntercom">
                                            INTERCOM
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        @endif

                        @if (request()->is('home') || request()->is('list-bon-kas-merah') || request()->is('list-bon-kas-putih') || request()->is('bon-kas') || request()->is('bon-kas/list-acc'))
                            <div class="dropdown d-inline-block">
                                <button class="menu-navbar dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                    Administrasi
                                </button>

                                <ul class="dropdown-menu menu-bon-kas">
                                    <li>
                                        <a class="dropdown-item"
                                        tabindex="-1"
                                        style="color:black;font-size:15px;display:block;cursor:default;">
                                            Bon Kas
                                            <span style="float:right;">»</span>
                                        </a>

                                        <ul class="dropdown-menu dropdown-submenu">
                                            {{-- <li>
                                                <a class="dropdown-item"
                                                href="{{ route('listBonKasMerah') }}">
                                                    Bon Kas Merah
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item"
                                                href="{{ route('listBonKasPutih') }}">
                                                    Bon Kas Putih
                                                </a>
                                            </li> --}}
                                            <li>
                                                <a class="dropdown-item"
                                                href="{{ route('bon-kas.index') }}">
                                                    List Bon Kas
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item"
                                                href="{{ route('bon-kas.list-acc') }}">
                                                    List ACC Bon Kas
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        @endif

                    </div>
                    @guest
                    @else
                        <div class="NameAndroid RDZNavBrandCenter" style="display:none;padding-top: 5px;">
                            <p style="font-size: 15px;display: block;margin-bottom: 0px;text-align:center"><label
                                    id="greeting"></label>, {{ Auth::user()->NamaUser }}</p>
                        </div>
                        <br>
                        <button class="navbar-toggler RDZNavBrandCenter" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    @endguest

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <!-- Left Side Of Navbar -->
                        @guest
                        @else
                        @endguest
                        <!-- Right Side Of Navbar -->

                        <!-- Authentication Links -->
                        @guest
                        @else
                            <ul class="navbar-nav ml-auto">
                                {{-- <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->NamaUser }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                            document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                        style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li> --}}
                                <div style="border-right: 1px solid;margin-right: 5px;padding-right: 5px;"
                                    class="NameWindows">
                                    <p style="font-size: 15px;display: block;margin-bottom: 0px;"><label
                                            id="greeting1"></label>,
                                        {{ Auth::user()->NamaUser }}</p> {{-- bisa dikasih profile --}}
                                </div>
                                <li><a class="RDZlogout" style="color: black;font-size: 15px;display: block;"
                                        href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                        style="display: none;">
                                        @csrf
                                    </form>
                                </li>
                            </ul>
                        @endguest

                    </div>
                </div>
            </nav>

            <main class="py-4">
                @yield('content')
            </main>
        </div>

        @if (request()->is('home'))
            {{-- ================= MODAL PENGUMUMAN ================= --}}
            <div class="modal fade" id="modalPengumuman" tabindex="-1">
                <div class="modal-dialog modal-xxl modal-dialog-scrollable">
                    <div class="modal-content announcement-modal">

                        <div class="modal-header position-relative">
                            <h5 class="modal-title w-100 text-center m-0">📢 PENGUMUMAN</h5>

                            <button type="button" class="btn-close-custom" data-bs-dismiss="modal" aria-label="Close">

                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                    fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z">
                                    </path>
                                </svg>

                            </button>
                        </div>

                        <div class="modal-body">

                            <div class="announcement-list">
                                @forelse ($pengumuman ?? [] as $p)
                                    <div class="announcement-item">
                                        <div class="announcement-header">
                                            <div class="announcement-title">
                                                <b>{{ strtoupper($p->judul_pesan) }}</b>
                                            </div>

                                            <div class="d-flex align-items-center gap-2">
                                                <div class="announcement-meta mb-0">
                                                    ID: {{ $p->id }}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="announcement-meta">
                                            Mulai berlaku dari
                                            {{ \Carbon\Carbon::parse($p->wkt_tulis)->format('d M Y') }}
                                            sampai
                                            {{ \Carbon\Carbon::parse($p->tgl_akhir)->format('d M Y') }}
                                        </div>
                                        <div class="announcement-meta">
                                            Pengirim : {{ $p->penulis }}
                                        </div>
                                        <div class="announcement-content">
                                            {!! nl2br(e($p->isi_pesan)) !!}
                                        </div>
                                        @if (!empty($p->lampiran))
                                            <div class="mt-2">
                                                <button type="button" class="btn btn-sm btn-outline-primary"
                                                    onclick="window.open('{{ route('pengumuman.lampiran', $p->id) }}', '_blank')">
                                                    <i class="fa fa-paperclip"></i> Lampiran
                                                </button>
                                            </div>
                                        @endif
                                    </div>

                                @empty
                                    <div class="text-center py-5 text-muted">
                                        Tidak ada pengumuman saat ini
                                    </div>
                                @endforelse
                            </div>
                        </div>

                        <!-- Floating Add Button di dalam modal -->
                        <button class="fab-button" onclick="openTambahPengumuman()">
                            +
                        </button>

                    </div>
                </div>
            </div>
        @endif

        @if (request()->is('home'))
            <!-- Bootstrap -->
            <script src="{{ asset('js/bootstrap@5.0.2.min.js') }}"></script>

            <script>
                document.addEventListener("DOMContentLoaded", function() {
                    const pengumumanEl = document.getElementById('modalPengumuman');

                    if (pengumumanEl) {
                        const pengumumanModal = new bootstrap.Modal(pengumumanEl);
                        pengumumanModal.show();
                    }

                    // FIX: hapus backdrop yang tertinggal
                    document.addEventListener('hidden.bs.modal', function() {
                        document.querySelectorAll('.modal-backdrop').forEach(function(el) {
                            el.remove();
                        });
                        document.body.classList.remove('modal-open');
                        document.body.style.overflow = '';
                    });
                });
            </script>
        @endif

        <script>
            function openTambahPengumuman() {
                let pengumumanEl = document.getElementById('modalPengumuman');
                let tambahEl = document.getElementById('tambahPengumumanModal');
                let modalPengumuman = bootstrap.Modal.getInstance(pengumumanEl);

                // tunggu modal pertama benar-benar tertutup
                pengumumanEl.addEventListener('hidden.bs.modal', function() {
                    let modalTambah = new bootstrap.Modal(tambahEl);
                    modalTambah.show();
                }, {
                    once: true
                });
                modalPengumuman.hide();
            }

            // ketika modal tambah ditutup → kembali ke modal pengumuman
            document.addEventListener("DOMContentLoaded", function () {
                let tambahModal = document.getElementById("tambahPengumumanModal");
                let pengumumanModal = document.getElementById("modalPengumuman");

                if(tambahModal){
                    tambahModal.addEventListener("hidden.bs.modal", function () {
                        let modal = new bootstrap.Modal(pengumumanModal);
                        modal.show();
                    });
                }
            });

        </script>

        <style>
            .btn-close-custom {
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                border: none;
                background: none;
                padding: 10px;
                cursor: pointer;
            }

            .btn-close-custom svg {
                color: #333;
            }

            .btn-close-custom:hover svg {
                color: #dc3545;
            }
        </style>

        <!-- Announcement -->
        <link href="{{ asset('css/home.css') }}" rel="stylesheet">
        <script src="{{ asset('js/home.js') }}"></script>

        @auth
            @include('modalTambahPengumuman')
            @include('modalIntercom')
        @endauth

    </body>

</html>
