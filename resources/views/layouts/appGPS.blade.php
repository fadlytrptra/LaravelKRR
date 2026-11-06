<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{ asset('/images/KRR.png') }}" type="image/gif" sizes="17x15">

    <title>@yield('title', 'GPS Homepage')</title>

    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    {{-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> --}}
    {{-- <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js' type='text/javascript'></script> --}}

    <script src="{{ asset('js/app.js') }}"></script>
    <!-- <script src="//code.jquery.com/jquery-1.11.0.min.js"></script> -->
    <script src="{{ asset('js/datatables.min.js') }}"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/select/1.6.2/js/dataTables.select.min.js"></script>
    <script src="{{ asset('js/jquery-dateformat.js') }}"></script>
    <script src="{{ asset('js/numeral.min.js') }}"></script>
    <script src="{{ asset('js/RDZ.js') }}"></script>
    <script src="{{ asset('js/User.js') }}"></script>
    <script src="{{ asset('js/GPS/gps_main.js') }}"></script>
    <script src="{{ asset('vendor/select2/select2.min.js') }}"></script>
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>

    <!-- Vendor JS Files -->
    <script src="{{ asset('vendor/aos/aos.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>

    <!-- Vendor CSS Files -->
    <link href="{{ asset('vendor/aos/aos.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/select2/select2.min.css') }}" rel="stylesheet">
    <link rel="icon" href="{{ asset('/images/KRR.png') }}" type="image/gif" sizes="17x15">
    <link href="{{ asset('css/sweetalert2.min.css') }}" rel="stylesheet">

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="stylesheet" href="{{ asset('css/FontsGoogleMaterialIcons.css') }}">
    <link href="{{ asset('css/FontsGoogleapisIconFamilyMaterialIcons.css') }}" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/appWorkshop.css') }}" rel="stylesheet">
    <link href="{{ asset('css/datatables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/buttons.dataTables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/RdzAndre.css') }}" rel="stylesheet">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="{{ asset('css/fonts.googleapis.MaterialSymbolsOutlined.css') }}" />
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
                                                    <a class="dropdown-item" tabindex="-1"
                                                        @if (isset($combinedArrayFiturMenus['Route'])) href="{{ url($combinedArrayFiturMenus['Route']) }}"
                                                            style="color: black;font-size: 14px;display: block;margin: 0;padding-left: 5%;padding-bottom: 1px;padding-top: 1px;"
                                                        @else
                                                            style="color: black;font-size: 14px;display: block;margin: 0;padding-left: 5%;padding-bottom: 1px;padding-top: 1px; padding-right: 1px; cursor: default;" @endif>
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
                                                                $filteredItemsSubFitur = $access['AccessFitur']->filter(
                                                                    function ($item) use ($combinedArrayFiturMenus) {
                                                                        return $item->Id_Menu ==
                                                                            $combinedArrayFiturMenus['IdMenu'];
                                                                    },
                                                                );
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
                                                                    <a style="color: black;font-size: 14px;display: block;margin: 0;padding-left: 5%;padding-bottom: 1px;padding-top: 1px;"
                                                                        class="dropdown-item" tabindex="-1"
                                                                        href="{{ url($fiturSubMenu['Route']) }}">{{ $fiturSubMenu['Nama'] }}
                                                                    </a>
                                                                </li>
                                                            @endforeach
                                                        </ul>
                                                    @endif
                                                </li>
                                                @if ($menuItem->IdMenu == 35 && $itemCount == 2)
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

    @include('GPS.modalLookUp')
    @include('GPS.alasan')

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
