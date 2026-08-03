@extends('layouts.appComPro')
@section('title', 'Produk | PP Woven Bag')
@section('content')
<link href="{{ asset('css/woven.css') }}" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox/fancybox.css" />
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox/fancybox.umd.js"></script>


<section class="product-page">

    {{-- HERO --}}
    <div class="product-hero">
        <div class="hero-overlay">
            <div class="hero-content">
                <h1>PP Woven Bag</h1>
            </div>
        </div>
    </div>

    <div class="product-container">
        {{-- CONTENT --}}
        <div class="product-content">
            <div class="product-card">
                <div class="product-image">
                    <img src="{{ asset('images/woven.png') }}" alt="PP Woven Bag">
                </div>

                <div class="product-info">

                    <h2>PP Woven Bag</h2>
                    <p>
                        {{ __('woven.body1') }}
                    </p>

                    <p>
                        {{ __('woven.body2') }}
                    </p>

                    <p>
                        {{ __('woven.body3') }}
                    </p>

                    <h2>Variasi dari WOVEN BAG</h2>
                    <div class="variant-container">

                        <div class="variant-item">
                            <div class="product-image">
                                <a href="{{ asset('images/woven_1.png') }}"
                                    data-fancybox>

                                    <img src="{{ asset('images/woven_1.png') }}"
                                        alt="OPP WOVEN BAG">
                                </a>
                            </div>

                            <span>EASY OPEN</span>
                        </div>

                        <div class="variant-item">
                            <div class="product-image">
                                <a href="{{ asset('images/woven_2.png') }}"
                                    data-fancybox>

                                    <img src="{{ asset('images/woven_2.png') }}"
                                        alt="TRANSPARANT WOVEN BAG">
                                </a>
                            </div>

                            <span>THC BSF</span>
                        </div>
                        <div class="variant-item">
                            <div class="product-image">
                                <a href="{{ asset('images/woven_3.png') }}"
                                    data-fancybox>

                                    <img src="{{ asset('images/woven_3.png') }}"
                                        alt="PRINTED WOVEN BAG">
                                </a>
                            </div>

                            <span>THM BSF (ULTRASONIC)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="feature-section">
                <div class="feature-card">
                    <h2>{{ __('woven.keunggulan') }}</h2>

                    <ul class="feature-list">
                        <li>{{ __('woven.efisiensi_harga') }}</li>
                        <li>{{ __('woven.ringan') }}</li>
                        <li>{{ __('woven.tahan_rayap') }}</li>
                    </ul>
                </div>

                <div class="feature-card">
                    <h2>{{ __('woven.tipe') }}</h2>

                    <div class="feature-tipe">
                        Inner Liner Bag Coating / Lamination Bag
                    </div>
                </div>

                <div class="feature-card">
                    <h2>{{ __('woven.kapasitas') }}</h2>
                    <p class="feature-number">
                        20 Kg – 50 Kg
                    </p>

                    <div class="divider"></div>

                    <h2>{{ __('woven.kapasitas_produksi') }}</h2>
                    <p class="feature-number">
                        5.000.000 {{ __('woven.potong/bulan') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CONTACT -->
<section id="contact" class="section">
    <div class="contact-box">
        <h2>
            {!! __('navbar.contact_footer', [
                'company' => 'Kerta Rajasa Raya'
            ]) !!}
        </h2>

        <div class="contact-buttons">
            <a href="https://www.google.com/maps/search/?api=1&query=PT+Kerta+Rajasa+Raya+Tropodo"
                target="_blank"
                class="contact-btn">

                <svg xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 2c-4.41 0-8 3.59-8 8-.03 6.44 7.12 11.6 7.42 11.82.17.12.38.19.58.19s.41-.06.58-.19c.3-.22 7.45-5.37 7.42-11.82 0-4.41-3.59-8-8-8m0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4"></path>
                </svg>
                {{ __('navbar.maps') }}
            </a>

            <a href="mailto:sales@kertarajasa.co.id"
                class="contact-btn">
                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    fill="currentColor" viewBox="0 0 24 24" >
                    <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v.25l10 7.5 10-7.5V6c0-1.1-.9-2-2-2"></path><path d="M12 16c-.21 0-.42-.07-.6-.2L2 8.75V18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8.75l-9.4 7.05c-.18.13-.39.2-.6.2"></path>
                </svg>
                sales@kertarajasa.co.id
            </a>

            <a href="https://wa.me/62818510828"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-btn">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M18.41 22h.37c.31-.01.6-.17.78-.43l2.27-3.27c.15-.22.21-.49.16-.76a1 1 0 0 0-.43-.65l-4.91-3.27c-.41-.27-.96-.21-1.29.15l-1.88 2.03c-.76-.45-2.03-1.26-3.03-2.26s-1.81-2.27-2.26-3.02l2.03-1.88c.36-.33.43-.88.15-1.29L7.1 2.44c-.15-.22-.38-.38-.64-.43-.27-.05-.54 0-.76.16L2.43 4.43c-.26.18-.42.47-.43.78-.03.71-.16 7.04 4.79 11.98 4.46 4.46 10.04 4.8 11.62 4.8Z"></path>
                    </svg>
                    {{ __('navbar.pesan') }}
            </a>
        </div>

    </div>
</section>



<script>
Fancybox.bind("[data-fancybox]", {
    groupAll: false,

    Toolbar: {
        display: {
            left: [],
            middle: ["zoomIn", "zoomOut"],
            right: ["close"]
        }
    },

    Thumbs: false,

    Carousel: {
        Navigation: false
    },

    dragToClose: true,

    keyboard: {
        Escape: "close"
    }
});
</script>




@endsection
