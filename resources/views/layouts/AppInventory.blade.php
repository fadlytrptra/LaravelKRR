<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <!-- Loading Screen -->
    <link rel="prefetch" href="{{ asset('images/kuning.png') }}" />
    <link rel="prefetch" href="{{ asset('images/biru.png') }}" />
    <link rel="prefetch" href="{{ asset('images/merah.png') }}" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title style="font-size: 20px">@yield('title', 'Inventory')</title>

    <!-- Title and Logo -->
    <link rel="icon" href="{{ asset('/images/KRR.png') }}" type="image/gif" sizes="16x16">
    <title style="font-size: 20px">{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/jquery-3.1.0.js') }}" loading=lazy></script>
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/numeral.min.js') }}"></script>
    <script src="{{ asset('js/datatables.min.js') }}"></script>
    <script src="{{ asset('js/jquery-dateformat.js') }}"></script>
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
    <script src="{{ asset('js/RDZ.js') }}"></script>
    <script src="{{ asset('js/moment.min.js') }}"></script>
    <script src="{{ asset('js/xlsx.full.min.js') }}"></script>
    <script src="{{ asset('js/select2.min.js') }}"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="{{ asset('css/FontsGoogleapisIconFamilyMaterialIcons.css') }}" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/datatables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/buttons.dataTables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/Rdz.css') }}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/select2.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/FontsGoogleMaterialIcons.css') }}">
    <link rel="stylesheet" href="{{ asset('css/fonts.googleapis.MaterialSymbolsOutlined.css') }}" />
    <div id="loading-screen">
        <div id="part1" class="logo-part"></div>
        <div id="part2" class="logo-part"></div>
        <div id="part3" class="logo-part"></div>
    </div>
</head>

<body onload="Greeting()">
    @if (session('status'))
        <script>
            Swal.fire({
                title: 'Pemberitahuan!',
                text: "{{ session('status') }}",
                icon: 'info',
                confirmButtonText: 'OK'
            });
        </script>
    @endif
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow sticky-top">
            <div class="container col-md-12">
                <a class="navbar-brand RDZNavBrandCenter RDZUnderLine" href="{{ url('/') }}">
                    🡰 <img src="{{ asset('/images/KRR.png') }}" width="55" height="50" alt="KRR">
                    {{-- {{ config('app.name', 'Laravel') }} --}}
                </a>
                @guest
                @else
                    <div class="NameAndroid RDZNavBrandCenter" style="display:none;padding-top: 5px;">
                        <p style="font-size: 15px;display: block;margin-bottom: 0px;text-align:center"><label
                                id="greeting"></label>, {{ Auth::user()->NamaUser }}</p>
                    </div>
                    <br>
                    <button class="navbar-toggler RDZNavBrandCenter" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="{{ __('Toggle navigation') }}">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                @endguest

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    @guest
                    @else
                        <ul class="navbar-nav mr-auto RDZNavContenCenter">
                            @foreach ($access['AccessMenu'] as $menuItem)
                                @php
                                    $print = 0;
                                    $cekSubMenuPrint = 0;
                                @endphp
                                @if ($menuItem->Parent_IdMenu === null)
                                    @php
                                        $print = 1;
                                    @endphp
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" type="button" id="dropdownMenuButton"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            style="margin: 10px">
                                            {{ $menuItem->NamaMenu }}
                                        </a>
                                @endif
                                @foreach ($access['AccessMenu'] as $cekSubMenu)
                                    @if ($menuItem->IdMenu == $cekSubMenu->Parent_IdMenu)
                                        <ul class="dropdown-menu" style="cursor: default;">
                                            @php
                                                $cekSubMenuPrint = 1;
                                            @endphp
                                        @break
                                @endif
                            @endforeach
                            @foreach ($access['AccessMenu'] as $secondMenuItem)
                                @php
                                    $printSecond = 0;
                                @endphp
                                @if ($secondMenuItem->Parent_IdMenu !== null && $secondMenuItem->Parent_IdMenu == $menuItem->IdMenu)
                                    @php
                                        $printSecond = 1;
                                    @endphp
                                    <li>
                                        <a class="dropdown-item" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false"
                                            style="cursor: default; color: black; font-size: 15px">
                                            {{ $secondMenuItem->NamaMenu }} &raquo;
                                        </a>
                                @endif
                                @if ($printSecond == 1)
                                    <ul class="dropdown-menu dropdown-submenu">
                                        @if ($secondMenuItem->NamaMenu !== 'Mutasi Barang')
                                            @foreach ($access['AccessFitur'] as $secondSubMenuItem)
                                                @if ($secondSubMenuItem->Id_Menu === $secondMenuItem->IdMenu && $printSecond == 1)
                                                    <li>
                                                        <a style="color: black;font-size: 15px;display: block"
                                                            class="dropdown-item" tabindex="-1"
                                                            href="{{ url($secondSubMenuItem->Route) }}">{{ $secondSubMenuItem->NamaFitur }}
                                                        </a>
                                                    </li>
                                                @endif
                                            @endforeach
                                        @else
                                            <li>
                                                <a style="color: black;font-size: 15px;display: block"
                                                    class="dropdown-item" tabindex="-1" href="#">Mutasi Antar
                                                    Divisi &raquo;
                                                </a>
                                                <ul class="dropdown-menu dropdown-submenu">
                                                    <li>
                                                        <a style="color: black;font-size: 15px;display: block"
                                                            class="dropdown-item" tabindex="-1" href="#">Awal
                                                            Sebagai Penerima &raquo;
                                                        </a>
                                                        <ul class="dropdown-menu dropdown-submenu">
                                                            <li>
                                                                <a style="color: black;font-size: 15px;display: block"
                                                                    class="dropdown-item" tabindex="-1"
                                                                    href="{{ url('MhnPenerima') }}">Permohonan Penerima
                                                                    (Bon Barang)
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a style="color: black;font-size: 15px;display: block"
                                                                    class="dropdown-item" tabindex="-1"
                                                                    href="{{ url('AccMhnPenerima') }}">Acc Permohonan
                                                                    Penerima
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a style="color: black;font-size: 15px;display: block"
                                                                    class="dropdown-item" tabindex="-1"
                                                                    href="{{ url('AccPemberiBarang') }}">Acc Pemberi
                                                                    Barang
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a style="color: black;font-size: 15px;display: block"
                                                                    class="dropdown-item" tabindex="-1"
                                                                    href="{{ url('PemberiBarang') }}">Pemberi
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a style="color: black;font-size: 15px;display: block"
                                                            class="dropdown-item" tabindex="-1" href="#">Awal
                                                            Sebagai Pemberi &raquo;
                                                        </a>
                                                        <ul class="dropdown-menu dropdown-submenu">
                                                            <li>
                                                                <a style="color: black;font-size: 15px;display: block"
                                                                    class="dropdown-item" tabindex="-1"
                                                                    href="{{ url('MhnPemberi') }}">Permohonan Pemberi
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a style="color: black;font-size: 15px;display: block"
                                                                    class="dropdown-item" tabindex="-1"
                                                                    href="{{ url('PermohonanPenerima') }}">Penerima
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a style="color: black;font-size: 15px;display: block"
                                                                    class="dropdown-item" tabindex="-1"
                                                                    href="{{ url('PermohonanPenerimaBenang') }}">Penerima
                                                                    (CL)
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a style="color: black;font-size: 15px;display: block"
                                                    class="dropdown-item" tabindex="-1" href="#">Mutasi Satu
                                                    Divisi &raquo;
                                                </a>
                                                <ul class="dropdown-menu dropdown-submenu">
                                                    <li>
                                                        <a style="color: black;font-size: 15px;display: block"
                                                            class="dropdown-item" tabindex="-1"
                                                            href="{{ url('PermohonanSatuDivisi') }}">Permohonan Satu
                                                            Divisi
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a style="color: black;font-size: 15px;display: block"
                                                            class="dropdown-item" tabindex="-1"
                                                            href="{{ url('AccSatuDivisi') }}">Acc Satu Divisi
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li>
                                                <a style="color: black;font-size: 15px;display: block"
                                                    class="dropdown-item" tabindex="-1" href="#">Mutasi
                                                    Keluar/Masuk PT KRR &raquo;
                                                </a>
                                                <ul class="dropdown-menu dropdown-submenu">
                                                    <li>
                                                        <a style="color: black;font-size: 15px;display: block"
                                                            class="dropdown-item" tabindex="-1"
                                                            href="{{ url('AccKeluarPenjualan') }}">Acc Keluar Brg u/
                                                            Penjualan
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a style="color: black;font-size: 15px;display: block"
                                                            class="dropdown-item" tabindex="-1"
                                                            href="{{ url('AccReturPenjualan') }}">Acc Retur Brg Dari
                                                            Penjualan
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a style="color: black;font-size: 15px;display: block"
                                                            class="dropdown-item" tabindex="-1"
                                                            href="{{ url('AccPascaKirim') }}">Acc Pengembalian Pasca
                                                            Kirim
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a style="color: black;font-size: 15px;display: block"
                                                    class="dropdown-item" tabindex="-1" href="#">Mutasi
                                                    Masuk/Keluar &raquo;
                                                </a>
                                                <ul class="dropdown-menu dropdown-submenu">
                                                    <li>
                                                        <a style="color: black;font-size: 15px;display: block"
                                                            class="dropdown-item" tabindex="-1"
                                                            href="{{ url('MhnMasukKeluar') }}">Permohonan Masuk/Keluar
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a style="color: black;font-size: 15px;display: block"
                                                            class="dropdown-item" tabindex="-1"
                                                            href="{{ url('AccMhnMasukKeluar') }}">Acc Permohonan
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        @endif
                                    </ul>
                                    </li>
                                @endif
                            @endforeach
                            @foreach ($access['AccessMenu'] as $thirdMenuItem)
                                @php
                                    $printThird = 0;
                                @endphp
                                @if (
                                    $thirdMenuItem->Parent_IdMenu !== null &&
                                        $thirdMenuItem->Parent_IdMenu == $secondMenuItem->IdMenu &&
                                        $secondMenuItem->Parent_IdMenu == $menuItem->IdMenu)
                                    @php
                                        $printThird = 1;
                                    @endphp
                                    <li class="dropdown-submenu">
                                        <a class="dropdown-item" tabindex="-1" href="#"
                                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false" style="margin: 10px;cursor: default;">
                                            {{ $thirdMenuItem->NamaMenu }} &raquo;
                                        </a>
                                        <ul class="dropdown-menu">
                                            @foreach ($access['AccessFitur'] as $thirdSubMenuItem)
                                                @if ($thirdSubMenuItem->Id_Menu === $thirdMenuItem->IdMenu && $printThird == 1)
                                                    <li class="dropdown-submenu">
                                                        <a class="dropdown-item" tabindex="-1" href="#"
                                                            id="dropdownMenuButton" data-toggle="dropdown"
                                                            aria-haspopup="true" aria-expanded="false">
                                                            {{ $thirdSubMenuItem->NamaFitur }} &raquo;
                                                        </a>
                                                        <ul class="dropdown-menu">
                                                            @foreach ($access['AccessMenu'] as $fourthMenuItem)
                                                                @php
                                                                    $printFourth = 0;
                                                                @endphp
                                                                @if ($fourthMenuItem->Parent_IdMenu !== null && $fourthMenuItem->Parent_IdMenu == $thirdMenuItem->IdMenu)
                                                                    @php
                                                                        $printFourth = 1;
                                                                    @endphp
                                                                    <li>
                                                                        <a class="dropdown-item" tabindex="-1"
                                                                            href="{{ url($fourthMenuItem->Route) }}">
                                                                            {{ $fourthMenuItem->NamaFitur }}
                                                                        </a>
                                                                    </li>
                                                                @endif
                                                            @endforeach
                                                        </ul>
                                                    </li>
                                                @endif
                                            @endforeach
                                        </ul>
                                    </li>
                                @endif
                            @endforeach

                            @if ($cekSubMenuPrint == 1)
                                @foreach ($access['AccessFitur'] as $subMenuItem)
                                    @if ($subMenuItem->Id_Menu === $menuItem->IdMenu)
                                        <li>
                                            <a style="color: black;font-size: 15px;display: block"
                                                class="dropdown-item" tabindex="-1"
                                                href="{{ url($subMenuItem->Route) }}">
                                                {{ $subMenuItem->NamaFitur }}
                                            </a>
                                        </li>
                                    @endif
                                @endforeach
                                {{-- @endif --}}

                                {{-- @endforeach --}}
                    </ul>
                    @endif
                    @if ($print == 1 && $printSecond == 0 && $printThird == 0 && $cekSubMenuPrint == 0)
                        <ul class="dropdown-menu">
                            @foreach ($access['AccessFitur'] as $subMenuItem)
                                @if ($subMenuItem->Id_Menu === $menuItem->IdMenu)
                                    <li>
                                        <a style="color: black;font-size: 15px;display: block" class="dropdown-item"
                                            tabindex="-1"
                                            href="{{ url($subMenuItem->Route) }}">{{ $subMenuItem->NamaFitur }}
                                        </a>
                                    </li>
                                @endif
                            @endforeach
                        </ul>
                </div>
                @endif
                @endforeach
                </ul>
            @endguest
            <!-- Right Side Of Navbar -->

            <!-- Authentication Links -->
            @guest
            @else
                <ul class="navbar-nav ml-auto">
                    <div style="border-right: 1px solid;margin-right: 5px;padding-right: 5px;" class="NameWindows">
                        <p style="font-size: 15px;display: block;margin-bottom: 0px;"><label id="greeting1"></label>,
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
<script>
    $(document).ready(function() {
        $('.dropdown-submenu a.test').on("click", function(e) {
            $(this).next('ul').toggle();
            e.stopPropagation();
            e.preventDefault();
        });
    });
</script>
</body>

</html>
