<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>
        @yield('title')
    </title>
    <meta content="" name="description">
    <meta content="" name="keywords">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Vendor CSS Files -->
    <link href="{{ asset('vendor/aos/aos.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet">
    <link href="{{ asset('css/datatables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/buttons.dataTables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/select2/select2.min.css') }}" rel="stylesheet">
    <link rel="icon" href="{{ asset('/images/KRR.png') }}" type="image/gif" sizes="17x15">
    <link href="{{ asset('css/sweetalert2.min.css') }}" rel="stylesheet">

    <!-- Vendor JS Files -->
    <script src="{{ asset('vendor/aos/aos.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    {{-- <script src="{{ asset('js/jquery-3.7.0.min.js') }}"></script> --}}
    <script src="{{ asset('js/jquery-3.5.1.js') }}" loading=lazy></script>
    <script src="{{ asset('js/jquery-1.12.1.dataTables.min.js') }}"></script>
    <script src="{{ asset('js/datatables.min.js') }}"></script>
    <script src="{{ asset('js/numeral.min.js') }}"></script>
    <script src="{{ asset('js/RDZ.js') }}"></script>
    <script src="{{ asset('vendor/select2/select2.min.js') }}"></script>
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>

    <!-- Template Main CSS File -->
    <link href="{{ asset('css/extruder_style.css') }}" rel="stylesheet">
</head>

<body onload="Greeting()">
    <!-- ======= Header ======= -->
    <header id="header" class="d-flex align-items-center justify-content-center">
        @if ($pageName == 'WarehouseTerima' && $formName == 'index')
            <div class="container d-flex justify-content-left" style="margin: 0px;">
            @else
                <div class="d-flex justify-content-left" style="gap:20px;">
        @endif

        <div id="logo" style="cursor: default">
            @if ($pageName == 'index')
                <h1><a>🡰 Kerta Rajasa Raya</a></h1>
            @elseif($pageName == 'WarehouseTerima' && $formName == 'index')
                <h1></h1>
            @elseif($formName == 'formBeratWoven')
                <h1><a>Berat Woven</a></h1>
            @elseif($formName == 'formBeratJumbo')
                <h1><a>Berat Jumbo</a></h1>
            @elseif($formName == 'formBeratADStar')
                <h1><a>Berat AD Star</a></h1>
            @elseif($formName == 'formBeratCircular')
                <h1><a>Berat Circular</a></h1>
            @elseif($formName == 'formBeratAssesoris')
                <h1><a>Berat Assesoris</a></h1>
            @elseif($formName == 'formUpdatePersen')
                <h1><a>Update Persen Toleransi BS</a></h1>
            @elseif($formName == 'formBeratWoven2')
                <h1><a>Berat Woven 2</a></h1>
            @elseif($formName == 'formBeratJumbo2')
                <h1><a>Berat Jumbo 2</a></h1>
            @elseif($formName == 'formBeratADStar2')
                <h1><a>Berat AD Star 2</a></h1>
            @elseif($formName == 'formBeratCircular2')
                <h1><a>Berat Circular 2</a></h1>
            @elseif($formName == 'formBeratAssesoris2')
                <h1><a>Berat Assesoris 2</a></h1>
            @elseif($formName == 'formKomposisiKonversi')
                <h1><a>Komposisi Konversi</a></h1>
            @elseif($formName == 'formKonversiKg')
                <h1><a>Konversi dalam Kg</a></h1>
            @elseif($formName == 'formKonversiBarang')
                <h1><a>Konversi Barang</a></h1>
            @elseif($formName == 'formKomposisiTropodo')
                <h1><a>Maintenance Komposisi Bahan Tropodo</a></h1>
            @elseif($formName == 'formKomposisiMojosari' && $formData['namaGedung'] == 'D')
                <h1><a>Maintenance Komposisi Bahan Mojosari Gedung D</a></h1>
            @elseif($formName == 'formKomposisiMojosari' && $formData['namaGedung'] == 'B')
                <h1><a>Maintenance Komposisi Bahan Mojosari Gedung B</a></h1>
            @elseif($formName == 'formKiteMaster')
                <h1><a>Master KITE</a></h1>
            @elseif($formName == 'formKiteEstimasi')
                <h1><a>Estimasi KITE</a></h1>
            @elseif($formName == 'formOrderMaintenance' && $formData['namaGedung'] == 'B')
                <h1><a>Maintenance Order Mojosari Gedung B</a></h1>
            @elseif($formName == 'formOrderMaintenance' && $formData['namaGedung'] == 'D')
                <h1><a>Maintenance Order Mojosari Gedung D</a></h1>
            @elseif($formName == 'formOrderMaintenance' && $formData['namaGedung'] == 'Tropodo')
                <h1><a>Maintenance Order Tropodo</a></h1>
            @elseif($formName == 'formOrderACC' && $formData['namaGedung'] == 'B')
                <h1><a>ACC Order Mojosari Gedung B</a></h1>
            @elseif($formName == 'formOrderACC' && $formData['namaGedung'] == 'D')
                <h1><a>ACC Order Mojosari Gedung D</a></h1>
            @elseif($formName == 'formOrderACC' && $formData['namaGedung'] == 'Tropodo')
                <h1><a>ACC Order Tropodo</a></h1>
            @elseif($formName == 'formOrderStatus' && $formData['namaGedung'] == 'B')
                <h1><a>Pembatalan Order Mojosari Gedung B</a></h1>
            @elseif($formName == 'formOrderStatus' && $formData['namaGedung'] == 'D')
                <h1><a>Pembatalan Order Mojosari Gedung D</a></h1>
            @elseif($formName == 'formOrderStatus' && $formData['namaGedung'] == 'Tropodo')
                <h1><a>Pembatalan Order Tropodo</a></h1>
            @elseif($formName == 'formKonversiMohon' && $formData['namaGedung'] == 'B')
                <h1><a>Permohonan Konversi Mojosari Gedung B</a></h1>
            @elseif($formName == 'formKonversiMohon' && $formData['namaGedung'] == 'D')
                <h1><a>Permohonan Konversi Mojosari Gedung D</a></h1>
            @elseif($formName == 'formKonversiMohon' && $formData['namaGedung'] == 'Tropodo')
                <h1><a>Permohonan Konversi Tropodo</a></h1>
            @elseif($formName == 'formKonversiACC' && $formData['namaGedung'] == 'B')
                <h1><a>ACC Konversi Mojosari Gedung B</a></h1>
            @elseif($formName == 'formKonversiACC' && $formData['namaGedung'] == 'D')
                <h1><a>ACC Konversi Mojosari Gedung D</a></h1>
            @elseif($formName == 'formKonversiACC' && $formData['namaGedung'] == 'Tropodo')
                <h1><a>ACC Konversi Tropodo</a></h1>
            @elseif($formName == 'formBenangMohon' && $formData['namaGedung'] == 'D')
                <h1><a>Permohonan Konversi NG Mojosari Gedung D</a></h1>
            @elseif($formName == 'formBenangMohon' && $formData['namaGedung'] == 'Tropodo')
                <h1><a>Permohonan Konversi NG Tropodo</a></h1>
            @elseif($formName == 'formBenangACC' && $formData['namaGedung'] == 'D')
                <h1><a>ACC Konversi NG Mojosari Gedung D</a></h1>
            @elseif($formName == 'formBenangACC' && $formData['namaGedung'] == 'Tropodo')
                <h1><a>ACC Konversi NG Tropodo</a></h1>
            @elseif($formName == 'formCatatGangguan' && $formData['namaGedung'] == 'D')
                <h1><a>Pencatatan Gangguan Produksi Gedung Mojosari D</a></h1>
            @elseif($formName == 'formCatatGangguan' && $formData['namaGedung'] == 'Tropodo')
                <h1><a>Pencatatan Gangguan Produksi Tropodo</a></h1>
            @elseif($formName == 'formCatatDaya' && $formData['namaGedung'] == 'D')
                <h1><a>Pencatatan Daya Produksi Mojosari Gedung D</a></h1>
            @elseif($formName == 'formCatatDaya' && $formData['namaGedung'] == 'Tropodo')
                <h1><a>Pencatatan Daya Produksi Tropodo</a></h1>
            @elseif($formName == 'LaporanProduksiExtruder')
                <h1><a>Laporan Produksi Extruder</a></h1>
            @elseif($formName == 'ACCPengecekanMB')
                <h1><a>ACC Pengecekan Mutu Benang</a></h1>
            @elseif($formName == 'ACCBenangNG')
                <h1><a>ACC Benang NG</a></h1>
            @elseif($formName == 'formCatatEffisiensi' && $formData['namaGedung'] == 'D')
                <h1><a>Pencatatan Effisiensi Gedung D</a></h1>
            @elseif($formName == 'formCatatEffisiensi' && $formData['namaGedung'] == 'Tropodo')
                <h1><a>Pencatatan Effisiensi Tropodo</a></h1>
            @elseif($formName == 'formCatatPerawatan' && $formData['namaGedung'] == 'D')
                <h1><a>Pencatatan Perawatan Gedung D</a></h1>
            @elseif($formName == 'formCatatPerawatan' && $formData['namaGedung'] == 'Tropodo')
                <h1><a>Pencatatan Perawatan Tropodo</a></h1>
            @elseif($formName == 'formScanGelondongan')
                <h1><a>Scan Kirim Barcode Gelondongan</a></h1>
            @elseif($formName == 'formBatalGelondongan')
                <h1><a>Batal Kirim Barcode Gelondongan</a></h1>
            @elseif($formName == 'formScanAssesoris')
                <h1><a>Scan Kirim Barcode Assesoris</a></h1>
            @elseif($formName == 'formBatalAssesoris')
                <h1><a>Batal Kirim Barcode Assesoris</a></h1>
            @elseif($formName == 'formScanKRR2')
                <h1><a>Scan Kirim Barcode Kerta 2</a></h1>
            @elseif($formName == 'formBatalKRR2')
                <h1><a>Batal Kirim Barcode Kerta 2</a></h1>
            @elseif($formName == 'formTerimaKRR2')
                <h1><a>Terima JBN-JBK-JBJ-JBL</a></h1>
            @elseif($formName == 'formStokSetengah')
                <h1><a>Kirim KRR2</a></h1>
            @elseif($formName == 'formCekBarcode')
                <h1><a>Cek Barcode</a></h1>
            @elseif($formName == 'formTerimaPeletan')
                <h1><a>Terima Barang Peletan</a></h1>
            @elseif($formName == 'formGagalPeletan')
                <h1><a>Tidak Tersimpan Peletan</a></h1>
            @else
                <h1><a href="/home">🡰 Kerta Rajasa Raya</a></h1>
            @endif
        </div>
        @if ($formName == 'index')
            <nav id="navbar" class="navbar">
            @else
                <nav id="navbar" class="navbar" style="margin-left:auto">
        @endif
        <div class="NameAndroid RDZNavBrandCenter" style="display:none;padding-top: 5px;">
            <p style="font-size: 15px;display: block;margin-bottom: 0px;text-align:center"><label
                    id="greeting"></label>, {{ Auth::user()->NamaUser }}</p>
        </div>

        @if ($formName == 'index')
            <div id="navbar_full" class="">
                @if ($pageName == 'BeratKomposisi2') {{-- Ini bisa diganti --}}
                    <ul>
                        <li class="dropdown">
                            <a href="#"><span>Berat Standar</span> <i class="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="/Extruder/BeratKomposisi/formBeratWoven">Berat
                                        Woven</a></li>
                                <li><a href="/Extruder/BeratKomposisi/formBeratJumbo">Berat
                                        Jumbo</a></li>
                                <li><a href="/Extruder/BeratKomposisi/formBeratADStar">Berat AD
                                        Star</a>
                                </li>
                                <li><a href="/Extruder/BeratKomposisi/formBeratCircular">Berat
                                        Gelondongan / Woven Kraft</a></li>
                                <li><a href="/Extruder/BeratKomposisi/formBeratAssesoris">Berat
                                        Assesoris</a>
                                </li>
                                <li><a href="/Extruder/BeratKomposisi/formUpdatePersen">Update
                                        Persen Toleransi BS</a></li>
                            </ul>
                        </li>
                        <li><a href="/Extruder/BeratKomposisi/formKomposisiKonversi">Komposisi
                                Konversi</a></li>
                        <li class="dropdown">
                            <a href="#"><span>Berat Standar 2</span> <i class="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="/Extruder/BeratKomposisi/formBeratWoven2">Berat
                                        Woven</a></li>
                                <li><a href="/Extruder/BeratKomposisi/formBeratJumbo2">Berat
                                        Jumbo</a></li>
                                <li><a href="/Extruder/BeratKomposisi/formBeratADStar2">Berat AD
                                        Star</a>
                                </li>
                                <li><a href="/Extruder/BeratKomposisi/formBeratCircular2">Berat
                                        Gelondongan / Woven Kraft</a></li>
                                <li><a href="/Extruder/BeratKomposisi/formBeratAssesoris2">Berat
                                        Assesoris</a>
                                </li>
                            </ul>
                        </li>
                        <li><a href="/Extruder/BeratKomposisi/formKonversiKg">Konversi Kg</a></li>
                        <li><a href="/Extruder/BeratKomposisi/formKonversiBarang">Konversi</a>
                        </li>
                        <li><a href="/Extruder">Keluar</a></li>
                    </ul>
                @elseif($pageName == 'Extruder')
                    <ul>
                        @foreach ($access['AccessMenu'] as $menuItem)
                            @php
                                $print = 0;
                                $cekSubMenuPrint = 0;
                            @endphp
                            @if ($menuItem->Parent_IdMenu === null)
                                @php
                                    $print = 1;
                                @endphp
                                <li class="dropdown">
                                    <a>
                                        {{ $menuItem->NamaMenu }}
                                    </a>
                                    <ul>
                                        @php
                                            // Filter the submenus for the current menu item
                                            $filteredItemsMenu = $access['AccessMenu']->filter(function ($item) use (
                                                $menuItem,
                                            ) {
                                                return $item->Parent_IdMenu == $menuItem->IdMenu;
                                            });

                                            // Convert the filtered items to an array if needed
                                            $filteredArrayMenu = $filteredItemsMenu->all();

                                            $filteredItemsFitur = $access['AccessFitur']->filter(function ($item) use (
                                                $menuItem,
                                            ) {
                                                return $item->Id_Menu == $menuItem->IdMenu;
                                            });

                                            // Convert the filtered items to an array if needed
                                            $filteredArrayFitur = $filteredItemsFitur->all();

                                            $combinedArrayFiturMenu = [];
                                            foreach ($filteredArrayFitur as $fitur) {
                                                $combinedArrayFiturMenu[] = [
                                                    'Nama' => $fitur->NamaFitur,
                                                    'Route' => $fitur->Route,
                                                    'IdMenu' => null,
                                                ];
                                            }

                                            foreach ($filteredArrayMenu as $menu) {
                                                $combinedArrayFiturMenu[] = [
                                                    'Nama' => $menu->NamaMenu,
                                                    'Route' => null,
                                                    'IdMenu' => $menu->IdMenu,
                                                ];
                                            }
                                            usort($combinedArrayFiturMenu, function ($a, $b) {
                                                return strcmp($a['Nama'], $b['Nama']);
                                            });
                                        @endphp
                                        @foreach ($combinedArrayFiturMenu as $combinedArrayFiturMenus)
                                            <li class="dropdown">
                                                <a tabindex="-1"
                                                    @if (isset($combinedArrayFiturMenus['Route'])) href="{{ url($combinedArrayFiturMenus['Route']) }}"
                                                        style="color: black;font-size: 15px;display: block"
                                                    @else
                                                        style="color: black;font-size: 15px;display: block; cursor: default;" @endif>
                                                    @if (!isset($combinedArrayFiturMenus['Route']))
                                                        {{ $combinedArrayFiturMenus['Nama'] }} »
                                                    @else
                                                        {{ $combinedArrayFiturMenus['Nama'] }}
                                                    @endif
                                                </a>
                                                @if (!isset($combinedArrayFiturMenus['Route']))
                                                    <ul>
                                                        @foreach ($access['AccessFitur'] as $fiturSubMenu)
                                                            @if ($fiturSubMenu->Id_Menu == $combinedArrayFiturMenus['IdMenu'])
                                                                <li class="dropdown">
                                                                    <a style="color: black;font-size: 15px;display: block"
                                                                        tabindex="-1"
                                                                        href="{{ url($fiturSubMenu->Route) }}">{{ $fiturSubMenu->NamaFitur }}
                                                                    </a>
                                                                </li>
                                                            @endif
                                                        @endforeach
                                                    </ul>
                                                @endif
                                            </li>
                                        @endforeach
                                    </ul>
                                </li>
                            @endif
                        @endforeach
                    </ul>
                @elseif($pageName == 'WarehouseTerima')
                    {{-- Ini bisa diganti --}}
                    <ul class="warehouse" style="border: black solid 3px;">
                        <li><a href="/Extruder/WarehouseTerima/formScanGelondongan">Scan
                                Kirim<br>Gelondongan</a>
                        </li>
                        <li><a href="/Extruder/WarehouseTerima/formBatalGelondongan">Batal
                                Kirim<br>Gelondongan</a>
                        </li>
                        <li><a href="/Extruder/WarehouseTerima/formScanAssesoris">Scan
                                Kirim<br>Assesoris</a></li>
                        <li><a href="/Extruder/WarehouseTerima/formBatalAssesoris">Batal
                                Kirim<br>Assesoris</a>
                        </li>
                        <li><a href="/Extruder/WarehouseTerima/formScanKRR2">Scan
                                Kirim<br>KRR2</a></li>
                        <li><a href="/Extruder/WarehouseTerima/formBatalKRR2">Batal
                                Kirim<br>KRR2</a></li>
                        <li><a href="/Extruder/WarehouseTerima/formCekBarcode">Cek<br>Barcode</a>
                        </li>
                        <li><a href="/Extruder/WarehouseTerima/formTerimaKRR2">Terima<br>KRR2</a>
                        </li>
                        <li><a href="/Extruder/WarehouseTerima/formStokSetengah">Stok<br>Setengah
                                Jadi</a></li>
                        <li><a href="/Extruder/WarehouseTerima/formTerimaPeletan">Scan
                                Terima<br>Peletan</a></li>
                        <li><a href="/Extruder/WarehouseTerima/formGagalPeletan">Gagal
                                Terima<br>Peletan</a></li>
                        <li><a href="/Extruder">Keluar</a></li>
                    </ul>
                @endif
            </div>
        @else
            <div id="navbar_exit">
                @if ($pageName == 'BeratKomposisi2')
                    <ul>
                        <li><a href="/Extruder/Berat%20Komposisi%202">Keluar</a></li>
                    </ul>
                @elseif($pageName == 'Extruder')
                    <ul>
                        <li><a href="/Extruder/Extruder" style="cursor: pointer">Extruder Home</a></li>
                    </ul>
                @elseif($pageName == 'WarehouseTerima')
                    <ul>
                        <li><a href="/Extruder/WarehouseTerima">Keluar</a></li>
                    </ul>
                @endif
            </div>
        @endif

        </nav><!-- .navbar -->
        @if ($formName == 'index')
            <div style="margin-left:auto;margin-right: 5px;padding-right: 5px;align-content:center;"
                class="NameWindows">
                <p
                    style="border-right:1px black solid; padding-right:5px;font-size: 15px;display: block;margin-bottom: 0px;">
                    <label id="greeting1"></label>,
                    {{ Auth::user()->NamaUser }}
                </p> {{-- bisa dikasih profile --}}
            </div>
            <a class="RDZlogout" style="color: black;font-size: 15px;display: block;align-content:center;"
                href="{{ route('logout') }}"
                onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                {{ __('Logout') }}
            </a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
            </div>
        @endif
    </header><!-- End Header -->

    <!-- Modal -->
    <div class="modal fade" id="confirmation_modal" tabindex="-1" data-toggle="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Pesan Konfirmasi</h1>
                    <button type="button" id="btn_close_md" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div id="modal_body" class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" id="btn_cancel_md" class="btn btn-secondary"
                        data-bs-dismiss="modal">Batal</button>
                    <button type="button" id="btn_confirm_md" class="btn btn-primary"
                        data-bs-dismiss="modal"></button>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal -->

    <!-- Template Main JS File -->
    <script src="{{ asset('js/Extruder/extruder_main.js') }}"></script>

    <main id="main">
        <div class="container">
            @yield('content')
        </div>
    </main><!-- End #main -->
</body>

</html>
