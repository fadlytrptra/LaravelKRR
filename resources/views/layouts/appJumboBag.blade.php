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
    <title style="font-size: 20px">@yield('title', 'Jumbo Bag')</title>

    <!-- Scripts -->
    <script src="{{ asset('js/jquery-3.5.1.js') }}" loading=lazy></script>
    <script src="{{ asset('js/bootstrap@5.0.2.min.js') }}"></script>
    <script src="{{ asset('js/jquery-1.12.1.dataTables.min.js') }}"></script>
    <script src="{{ asset('js/jquery-dateformat.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/datatables.min.js') }}"></script>
    <script src="{{ asset('js/datatablesSumApi.js') }}"></script>
    <script src="{{ asset('js/numeral.min.js') }}"></script>
    <script src="{{ asset('js/RDZ.js') }}"></script>
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
    <script src="{{ asset('js/xlsx.full.min.js') }}"></script>
    <script src="{{ asset('js/User.js') }}"></script>
    <script src="{{ asset('js/jspdf.umd.min.js') }}"></script>
    <script src="{{ asset('js/JSbarcode.all.min.js') }}"></script>
    <script src="{{ asset('js/moment.min.js') }}"></script>
    <script src="{{ asset('js/flatpickr.js') }}"></script>
    <script src="{{ asset('js/select2.min.js') }}"></script>

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
    {{-- <link href="{{ asset('css/bootstrap@5.0.1.min.css') }}" rel="stylesheet"> --}}
    <link rel="stylesheet" type="text/css" href="{{ asset('css/select2.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/FontsGoogleMaterialIcons.css') }}">
    <link rel="stylesheet" href="{{ asset('css/fonts.googleapis.MaterialSymbolsOutlined.css') }}" />

    <!--jQuery UI - v1.12.1-->
    <script src="{{ asset('js/jQuery UI - v1.12.1.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/jQuery UI - v1.12.1.css') }}">

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
                                        <ul class="dropdown-menu">
                                            @php
                                                $filteredItemsMenu = $access['AccessMenu']->filter(function (
                                                    $item,
                                                ) use ($menuItem) {
                                                    return $item->Parent_IdMenu == $menuItem->IdMenu;
                                                });

                                                $filteredArrayMenu = $filteredItemsMenu->all();

                                                $filteredItemsFitur = $access['AccessFitur']->filter(function (
                                                    $item,
                                                ) use ($menuItem) {
                                                    return $item->Id_Menu == $menuItem->IdMenu;
                                                });

                                                $filteredArrayFitur = $filteredItemsFitur->all();

                                                $combinedArrayFiturMenu = [];
                                                foreach ($filteredArrayFitur as $fitur) {
                                                    $combinedArrayFiturMenu[] = [
                                                        'Nama' => $fitur->NamaFitur,
                                                        'Route' => $fitur->Route,
                                                        'IdMenu' => null,
                                                        'IdFitur' => $fitur->IdFitur,
                                                        'NomorUrutDisplay' => $fitur->NomorUrutDisplay,
                                                    ];
                                                }

                                                foreach ($filteredArrayMenu as $menu) {
                                                    $combinedArrayFiturMenu[] = [
                                                        'Nama' => $menu->NamaMenu,
                                                        'Route' => null,
                                                        'IdMenu' => $menu->IdMenu,
                                                        'IdFitur' => null,
                                                        'NomorUrutDisplay' => $menu->NomorUrutDisplay,
                                                    ];
                                                }
                                                usort($combinedArrayFiturMenu, function ($a, $b) {
                                                    return $a['NomorUrutDisplay'] <=> $b['NomorUrutDisplay'];
                                                });

                                                $itemCount = 0;
                                            @endphp

                                            @foreach ($combinedArrayFiturMenu as $combinedArrayFiturMenus)
                                                @php
                                                    $itemCount++;
                                                @endphp

                                                <li>

                                                    @if (isset($combinedArrayFiturMenus['Route']))
                                                        <a class="dropdown-item" tabindex="-1"
                                                            href="{{ url($combinedArrayFiturMenus['Route']) }}"
                                                        style="color: black;font-size: 15px;display: block" @else <a
                                                            class="dropdown-item dropdown-toggle-submenu" tabindex="-1"
                                                            style="color: black;font-size: 15px;display: block; cursor: default;"
                                                            @endif>
                                                            @if (!isset($combinedArrayFiturMenus['Route']))
                                                                {{ $combinedArrayFiturMenus['Nama'] }}<span
                                                                    style="float: right;">»</span>
                                                            @else
                                                                {{ $combinedArrayFiturMenus['Nama'] }}
                                                            @endif
                                                        </a>
                                                        @if (!isset($combinedArrayFiturMenus['Route']))
                                                            <ul class="dropdown-menu dropdown-submenu">
                                                                @php
                                                                    $filteredItemsSubFitur = $access[
                                                                        'AccessFitur'
                                                                    ]->filter(function ($item) use (
                                                                        $combinedArrayFiturMenus,
                                                                    ) {
                                                                        return $item->Id_Menu ==
                                                                            $combinedArrayFiturMenus['IdMenu'];
                                                                    });
                                                                    $filteredArraySubFitur = $filteredItemsSubFitur->all();
                                                                    $arraySubFitur = [];
                                                                    foreach ($filteredArraySubFitur as $subFitur) {
                                                                        $arraySubFitur[] = [
                                                                            'Nama' => $subFitur->NamaFitur,
                                                                            'Route' => $subFitur->Route,
                                                                            'IdMenu' => $subFitur->Id_Menu,
                                                                            'IdFitur' => $subFitur->IdFitur,
                                                                            'NomorUrutDisplay' =>
                                                                                $subFitur->NomorUrutDisplay,
                                                                        ];
                                                                    }

                                                                    usort($arraySubFitur, function ($a, $b) {
                                                                        return $a['NomorUrutDisplay'] <=>
                                                                            $b['NomorUrutDisplay'];
                                                                    });
                                                                @endphp
                                                                @foreach ($arraySubFitur as $fiturSubMenu)
                                                                    <li>
                                                                        <a style="color: black;font-size: 15px;display: block"
                                                                            class="dropdown-item" tabindex="-1"
                                                                            href="{{ url($fiturSubMenu['Route']) }}">{{ $fiturSubMenu['Nama'] }}
                                                                        </a>
                                                                    </li>
                                                                @endforeach
                                                            </ul>
                                                        @endif
                                                </li>
                                                @if ($menuItem->IdMenu == 36 && $itemCount == 10)
                                                    <li>
                                                        <hr style="margin: 0; border: 0,8px solid black;">
                                                    </li>
                                                @endif
                                                @if ($menuItem->IdMenu == 36 && $itemCount == 13)
                                                    <li>
                                                        <hr style="margin: 0; border: 0,8px solid black;">
                                                    </li>
                                                @endif
                                                @if ($menuItem->IdMenu == 36 && $itemCount == 17)
                                                    <li>
                                                        <hr style="margin: 0; border: 0,8px solid black;">
                                                    </li>
                                                @endif
                                            @endforeach
                                        </ul>
                                    </div>
                                    {{-- @dump($access['AccessMenu']) INI CARA DEBUGGING MANUAL --}}
                                @endif
                            @endforeach
                        </ul>
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
    <script>
        $(document).ready(function() {
            $('.dropdown-submenu a.test').on("click", function(e) {
                $(this).next('ul').toggle();
                e.stopPropagation();
                e.preventDefault();
            });

            document.querySelectorAll(".dropdown-toggle-submenu").forEach(function(item) {
                item.addEventListener("click", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    let submenu = this.nextElementSibling;

                    // close other submenus
                    document.querySelectorAll(".dropdown-submenu").forEach(function(el) {
                        if (el !== submenu) {
                            el.classList.remove("show");
                        }
                    });

                    submenu.classList.toggle("show");
                });
            });

            // optional: click outside to close all submenu
            document.addEventListener("click", function() {
                document.querySelectorAll(".dropdown-submenu").forEach(function(el) {
                    el.classList.remove("show");
                });
            });
        });
    </script>
</body>

</html>
