<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        @yield('title')
    </title>
    <link rel="icon" type="image/png" href="{{ asset('images/KRR.png') }}">

    <link href="{{ asset('css/homeComPro.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootstrap@5.0.1.min.css') }}" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
</head>

<body>
    <!-- NAVBAR -->
    <nav class="navbar-home">
        <div class="container-home">

            <div class="logo-container">
                <a href="{{ url('/company-profile') }}">
                    <img src="{{ asset('images/KRR.png') }}" alt="KRR Logo" class="logo-image">
                </a>

                <div class="logo-text">
                    <a href="{{ url('/company-profile') }}">
                        KERTA RAJASA RAYA
                    </a>
                </div>
            </div>

            <!-- Bahasa dan Menu -->
            <div class="top-action">
                <!-- LANGUAGE -->
                <div class="language-switch">
                    <a href="{{ route('language.switch', 'id') }}"
                        class="lang-btn
                    {{ app()->getLocale() == 'id' ? 'active' : '' }}">
                        ID
                    </a>
                    <a href="{{ route('language.switch', 'en') }}"
                        class="lang-btn
                    {{ app()->getLocale() == 'en' ? 'active' : '' }}">
                        EN
                    </a>
                </div>

                <!-- MENU BUTTON -->
                <button class="menu-btn" id="menuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <!-- MENU -->
            <div class="menu-overlay" id="menuOverlay">
                <button class="close-menu" id="closeMenu">✕</button>

                <div class="menu-wrapper">

                    <!-- TOP -->
                    <div class="menu-header">
                        <div class="menu-home">
                            <a href="{{ url('/company-profile') }}" class="home-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="white"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 2 8h1v5a1 1 0 0 0 1 1h3v-3h2v3h3a1 1 0 0 0 1-1V8h1a.5.5 0 0 0 .354-.854z" />
                                </svg>
                            </a>

                            <span>
                                <span>{{ __('navbar.menu') }}</span>
                            </span>
                        </div>
                    </div>

                    <!-- CONTENT -->
                    <div class="menu-content">
                        <div class="menu-left">
                            {{-- <a href="{{ url('/') }}"><span>{{ __('navbar.home') }}</span></a> --}}
                            <a href="{{ request()->is('/company-profile') ? url('/#about') : url('/company-profile') . '#about' }}">
                                <span>{{ __('navbar.about') }}</span>
                            </a>
                            <div class="menu-item has-submenu">
                                <div class="menu-product" id="produkToggle">
                                    <span>{{ __('navbar.product') }}</span>
                                    <span class="arrow">›</span>
                                </div>
                                <div class="submenu" id="produkSubmenu">
                                    <a href="{{ route('product.blockBottom') }}">
                                        Block Bottom Bag
                                    </a>
                                    <a href="{{ route('product.fibc') }}">
                                        FIBC Bag
                                    </a>
                                    {{-- <a href="{{ route('product.starpakBag') }}">
                                        Starpak Bag
                                    </a> --}}
                                    <a href="{{ route('product.woven') }}">
                                        Woven Bag
                                    </a>
                                </div>
                            </div>
                            <a href="{{ route('catalogue.index') }}"><span>{{ __('navbar.catalogue') }}</span></a>
                            <a href="{{ url('/#contact') }}"><span>{{ __('navbar.contact') }}</span></a>
                            <a href="{{ route('sertifikasi.index') }}"><span>{{ __('navbar.sertifikasi') }}</span></a>
                            <a href="https://mykrr.co.id" target="_blank" rel="noopener noreferrer">
                                <span>Public Web KRR</span>
                            </a>
                        </div>
                    </div>

                    <!-- FOOTER -->
                    <div class="menu-copyright">
                        Copyright © 2026 PT Kerta Rajasa Raya. All Rights Reserved.
                    </div>
                </div>
            </div>

        </div>
    </nav>

    {{-- Content halaman --}}
    @yield('content')
    <script src="{{ asset('js/homeComPro.js') }}"></script>
    <script src="{{ asset('js/bootstrap@5.0.2.min.js') }}"></script>
</body>

</html>
