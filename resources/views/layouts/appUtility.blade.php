<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<!-- Loading Screen -->
<link rel="prefetch" href="{{ asset('images/kuning.png') }}" />
<link rel="prefetch" href="{{ asset('images/biru.png') }}" />
<link rel="prefetch" href="{{ asset('images/merah.png') }}" />

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="icon" href="{{ asset('/images/KRR.png') }}" type="image/gif" sizes="16x16">
    <title style="font-size: 20px">@yield('title', 'Utility')</title>


    <!-- Scripts -->
    <script src="{{ asset('js/jquery-3.1.0.js') }}" loading=lazy></script>
    <script src="{{ asset('js/jspdf.umd.min.js') }}"></script>



    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/moment.min.js') }}"></script>
    <script src="{{ asset('js/flatpickr.js') }}"></script>
    <script src="{{ asset('js/numeral.min.js') }}"></script>
    <script src="{{ asset('js/datatables.min.js') }}"></script>
    <script src="{{ asset('js/jquery-dateformat.js') }}"></script>
    <script src="{{ asset('js/bootstrap@5.0.2.min.js') }}"></script>
    <script src="{{ asset('js/RDZ.js') }}"></script>


    <script src="{{ asset('js/User.js') }}"></script>
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>


    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="{{ asset('css/FontsGoogleapisIconFamilyMaterialIcons.css') }}" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/datatables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/buttons.dataTables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/Rdz.css') }}" rel="stylesheet">
    <!-- Tambahkan ini untuk Bootstrap Selectpicker -->
    <link href="{{ asset('css/bootstrap-select.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootstrap@5.0.1.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/FontsGoogleMaterialIcons.css') }}">
    <link rel="stylesheet" href="{{ asset('css/fonts.googleapis.MaterialSymbolsOutlined.css') }}" />
    <div id="loading-screen">
        <div id="part1" class="logo-part"></div>
        <div id="part2" class="logo-part"></div>
        <div id="part3" class="logo-part"></div>
    </div>
</head>

<body onload="Greeting()">
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow sticky-top">
            <div class="container-fluid col-md-12">
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
                                        <a class="" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false"
                                            style="margin: 10px;cursor: default;">
                                            {{ $secondMenuItem->NamaMenu }} &raquo;
                                        </a>
                                @endif
                                @if ($printSecond == 1)
                                    <ul class="dropdown-menu dropdown-submenu">
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
                                    </ul>
                                    </li>
                                @endif
                            @endforeach
                            @if ($cekSubMenuPrint == 1)
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
                    @endif
                    {{-- @php
                        echo "<script>console.log('Menu: " . $menuItem->NamaMenu . " ".$print." ".$printSecond." ".$cekSubMenuPrint."');</script>"; //untuk debugging, jangan dihapus
                    @endphp --}}
                    @if ($print == 1 && $printSecond == 0 && $cekSubMenuPrint == 0)
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

                {{-- <ul class="navbar-nav mr-auto RDZNavContenCenter">
                            <div class="dropdown">
                                <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                    Master
                                </a>
                                <ul class="dropdown-menu">
                                    <li style="margin: 10px;"><a class="dropdown-item"
                                            style="color: black;font-size: 15px;display: block"
                                            href="{{ url('Supplier') }}">Supplier</a></li>
                                </ul>
                            </div>
                            <div class="dropdown">
                                <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                    Transaksi Beli (Admin Pembelian)
                                </a>
                                <ul class="dropdown-menu">
                                    <li style="margin: 10px;"><a class="dropdown-item"
                                            style="color: black;font-size: 15px;display: block"
                                            href="{{ url('ListOrderPembelian') }}">List Order Pembelian</a></li>
                                    <li style="margin: 10px;"><a class="dropdown-item"
                                            style="color: black;font-size: 15px;display: block;cursor:default">Isi Supplier
                                            - Harga
                                            &raquo;</a>
                                        <ul class="dropdown-menu dropdown-submenu">
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block;white-space:nowrap"
                                                    tabindex="-1" href="{{ url('IsiSupplierHarga', ['id' => 0]) }}">Beli
                                                    Sendiri</a>
                                            </li>
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block;white-space:nowrap"
                                                    tabindex="-1" href="{{ url('IsiSupplierHarga', ['id' => 1]) }}">Pengadaan
                                                    Pembelian</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li style="margin: 10px;"><a class="dropdown-item"
                                            style="color: black;font-size: 15px;display: block"
                                            href="{{ url('FinalApprove') }}">Final Approve</a></li>
                                    <li style="margin: 10px;"><a
                                            class="dropdown-item"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                            tabindex="-1">PO &raquo;</a>
                                        <ul class="dropdown-menu dropdown-submenu">
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1" href="{{ url('PurchaseOrder/create') }}">Create PO</a>
                                            </li>
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1" href="{{ url('PurchaseOrder') }}">List PO</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li style="margin: 10px;"><a
                                            class="dropdown-item"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                            tabindex="-1">BTTB &raquo;</a>
                                        <ul class="dropdown-menu dropdown-submenu">
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block;white-space:nowrap"
                                                    tabindex="-1" href="{{ url('CreateBTTB') }}">Create BTTB</a>
                                            </li>
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block;white-space:nowrap"
                                                    tabindex="-1" href="{{ url('ReturBTTB') }}">Retur BTTB</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li style="margin: 10px;"><a class="dropdown-item"
                                            style="color: black;font-size: 15px;display: block"
                                            href="{{ url('TransferBarang') }}">Transfer Barang</a></li>
                                </ul>
                            </div>
                            <div class="dropdown">
                                <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                    Transaksi (User)
                                </a>
                                <ul class="dropdown-menu">
                                    <li style="margin: 10px;"><a class="dropdown-item"
                                            style="color: black;font-size: 15px;display: block"
                                            href="{{ url('Approve') }}">Approve</a></li>
                                    <li style="margin: 10px;"><a class="dropdown-item"
                                            style="color: black;font-size: 15px;display: block"
                                            href="{{ url('FinalApprove') }}">Final Approve</a></li>
                                    <li style="margin: 10px;"><a class="dropdown-item"
                                            style="color: black;font-size: 15px;display: block"
                                            href="{{ url('ListOrder') }}">List Order</a></li>
                                </ul>
                            </div>
                            <div class="dropdown">
                                <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                    Informasi
                                </a>
                                <ul class="dropdown-menu">
                                    <li style="margin: 10px;"><a class="dropdown-item"
                                            style="color: black;font-size: 15px;display: block"
                                            href="{{ url('DaftarHarga') }}">Daftar Harga</a></li>
                                </ul>
                            </div>
                        </ul> --}}
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
<script src="{{ asset('js/popper.min.js') }}"></script>
<!-- Tambahkan ini untuk Bootstrap Selectpicker -->
<script src="{{ asset('js/bootstrap@5.0.2.min.js') }}"></script>


</body>

</html>
