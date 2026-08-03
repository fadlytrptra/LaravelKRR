@extends('layouts.appComPro')
@section('title', 'Catalogue | Kerta Rajasa Raya')
@section('content')
<link href="{{ asset('css/catalogue.css') }}" rel="stylesheet">


<section class="product-page">
    {{-- HERO --}}
    <div class="product-hero">
        <div class="hero-overlay">
            <div class="hero-content">
                <h1>{{ __('katalog.judul') }}</h1>
            </div>
        </div>
    </div>

    {{-- CONTENT --}}
    <div class="product-container">
        <div class="catalogue-grid">

            {{-- HISTORY --}}
            <div class="catalogue-card blue-card">

                <div class="card-top">
                    <div class="card-icon">
                        <img src="{{ asset('images/KRR.png') }}">
                    </div>

                    <h3>
                        {{ __('katalog.sejarah') }}, <br>
                        {{ __('katalog.visi') }}, {{ __('katalog.misi') }}
                    </h3>
                </div>

                <p>
                    {{ __('katalog.card1_body') }}
                </p>

                <button class="detail-btn"
                    data-target="historyModal">
                    {{ __('katalog.lihat_selengkapnya') }} →
                </button>
            </div>

            {{-- PRODUCTION --}}
            <div class="catalogue-card orange-card">
                <div class="card-top">
                    <div class="card-icon">
                        <img src="{{ asset('images/box.png') }}">
                    </div>
                    <h3>{{ __('katalog.proses_produksi') }}</h3>
                </div>

                <p>
                    {{ __('katalog.card2_body') }}
                </p>

                <button class="detail-btn"
                    data-target="productionModal">
                    {{ __('katalog.lihat_selengkapnya') }} →
                </button>
            </div>

            {{-- QUALITY --}}
            <div class="catalogue-card green-card">
                <div class="card-top">
                    <div class="card-icon">
                        <img src="{{ asset('images/quality-assurance.png') }}">
                    </div>
                    <h3>{{ __('katalog.jaminan_kualitas') }}</h3>
                </div>

                <p>
                   {{ __('katalog.card3_body') }}
                </p>

                <button class="detail-btn"
                    data-target="qualityModal">
                    {{ __('katalog.lihat_selengkapnya') }} →
                </button>
            </div>

            {{-- PRODUCTS --}}
            <div class="catalogue-card red-card">
                <div class="card-top">
                    <div class="card-icon">
                        <img src="{{ asset('images/best-product.png') }}">
                    </div>

                    <h3>{{ __('katalog.produk') }}</h3>
                </div>

                <p>
                    {{ __('katalog.card5_body') }}
                </p>

                <button class="detail-btn"
                    data-target="productsModal">
                    {{ __('katalog.lihat_selengkapnya') }} →
                </button>
            </div>

            {{-- MARKET --}}
            <div class="catalogue-card teal-card">
                <div class="card-top">
                    <div class="card-icon">
                        <img src="{{ asset('images/distribution.png') }}">
                    </div>
                    <h3>{{ __('katalog.pasar_distribusi') }}</h3>
                </div>

                <p>
                    {{ __('katalog.card6_body') }}
                </p>

                <button class="detail-btn"
                    data-target="marketModal">
                    {{ __('katalog.lihat_selengkapnya') }} →
                </button>
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


{{-- HISTORY --}}
<div class="about-modal" id="historyModal">
    <div class="about-modal-box">

        <button class="about-close">✕</button>

        <!-- HEADER -->
        <div class="about-header">
            <div>
                <h2>
                    {{ __('katalog.sejarah') }}, {{ __('katalog.visi') }}, {{ __('katalog.misi') }}
                </h2>
            </div>
        </div>

        <!-- CONTENT -->
        <div class="about-modal-content">
            <h3 class="section-title">{{ __('katalog.sejarah_perusahaan') }}</h3>

            <div class="history-card">
                <p>
                    <b>1981</b> — {!! __('katalog.sejarah_1') !!}
                </p>
                <p>
                    <b>1982</b> — {!! __('katalog.sejarah_2') !!}
                </p>
                <p>
                    <b>1982</b> — {!! __('katalog.sejarah_3') !!}
                </p>
                <p>
                    <b>1983</b> — {!! __('katalog.sejarah_4') !!}
                </p>
                <p>
                    <b>1985</b> — {!! __('katalog.sejarah_5') !!}
                </p>
                <p>
                    <b>2001</b> — {!! __('katalog.sejarah_6') !!}
                </p>
                <p>
                    <b>2009</b> — {!! __('katalog.sejarah_7') !!}
                </p>
                <p>
                    <b>2010</b> — {!! __('katalog.sejarah_8') !!}
                </p>
                <p>
                    <b>2015</b> — {!! __('katalog.sejarah_9') !!}
                </p>
                <p>
                    <b>2020</b> — {!! __('katalog.sejarah_10') !!}
                </p>
            </div>

            <div class="vm-grid">
                <div class="vm-card vision-card">
                    <h3>{{ __('katalog.visi') }}</h3>
                    <p>
                        {{ __('katalog.visi_body') }}
                    </p>
                </div>

                <div class="vm-card mission-card">
                    <h3>{{ __('katalog.misi') }}</h3>
                    <p>
                        {{ __('katalog.misi_body') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>


{{-- PRODUCTION MODAL --}}
<div class="about-modal" id="productionModal">
    <div class="about-modal-box image-box">

        <button class="about-close">✕</button>

        <div class="about-modal-content production-layout">

            {{-- LEFT --}}
            <div class="production-image">
                <h2>{{ __('katalog.proses_produksi') }}</h2>

                <img
                    src="{{ asset('images/KRRC_Production_Process.jpg') }}"
                    alt="Production Process"
                    class="catalogue-modal-image zoomable-image">
            </div>

            {{-- RIGHT --}}
            <div class="production-description">
                <h3>
                    {{ __('katalog.tahapan_produksi') }}
                </h3>

                <p>
                    {{ __('katalog.tahapan_produksi_body') }}
                </p>

                <div class="production-step">
                    <strong>1. {{ __('katalog.ekstruksi') }}</strong>
                    <p>
                        {{ __('katalog.ekstruksi_body') }}
                    </p>
                </div>

                <div class="production-step">
                    <strong>2. {{ __('katalog.menenun') }}</strong>
                    <p>
                        {{ __('katalog.menenun_body') }}
                    </p>
                </div>

                <div class="production-step">
                    <strong>3. {{ __('katalog.lapisan') }}</strong>
                    <p>
                        {{ __('katalog.lapisan_body') }}
                    </p>
                </div>

                <div class="production-step">
                    <strong>4. {{ __('katalog.pencetakan') }}</strong>
                    <p>
                        {{ __('katalog.pencetakan_body') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>



{{-- QUALITY MODAL --}}
<div class="about-modal" id="qualityModal">
    <div class="about-modal-box image-box">

        <button class="about-close">✕</button>

        <div class="about-modal-content production-layout">

            {{-- LEFT --}}
            <div class="production-image">
                <h2>
                    {{ __('katalog.jaminan_kualitas') }}
                </h2>

                <img
                    src="{{ asset('images/KRRC_Quality_Assurance.jpg') }}"
                    alt="Quality Assurance"
                    class="catalogue-modal-image zoomable-image">
            </div>

            {{-- RIGHT --}}
            <div class="production-description">
                <h3>
                    {{ __('katalog.standar_jaminan_kualitas') }}
                </h3>
                <p>
                    {{ __('katalog.standar_jaminan_kualitas_body') }}
                </p>

                <div class="production-step">
                    <strong>1. {{ __('katalog.QA1') }}</strong>
                    <p>
                        {{ __('katalog.QA1_body') }}
                    </p>
                </div>

                <div class="production-step">
                    <strong>2. {{ __('katalog.QA2') }}</strong>
                    <p>
                        {{ __('katalog.QA2_body') }}
                    </p>
                </div>

                <div class="production-step">
                    <strong>3. {{ __('katalog.QA3') }}</strong>
                    <p>
                        {{ __('katalog.QA3_body') }}
                    </p>
                </div>

                <div class="production-step">
                    <strong>4. {{ __('katalog.QA4') }}</strong>
                    <p>
                        {{ __('katalog.QA4_body') }}
                    </p>
                </div>

                <div class="production-step">
                    <strong>5. {{ __('katalog.QA5') }}</strong>
                    <p>
                        {{ __('katalog.QA5_body') }}
                    </p>
                </div>

            </div>
        </div>
    </div>
</div>


{{-- PRODUCTS --}}
<div class="about-modal" id="productsModal">
    <div class="about-modal-box products-modal-box">
        <button class="about-close">✕</button>

        <div class="about-modal-content">
            <div class="products-modal-header">
                <h2>{{ __('katalog.produk') }}</h2>
                <p>
                    {{ __('katalog.produk_body') }}
                </p>
            </div>

            <div class="products-grid">
                <a href="{{ route('product.blockBottom') }}" class="product-link">
                    <div class="product-link-content">
                        <div>
                            <h3>Block Bottom Bag</h3>
                        </div>
                        <div class="product-arrow">
                            →
                        </div>
                    </div>
                </a>

                <a href="{{ route('product.fibc') }}" class="product-link">
                    <div class="product-link-content">
                        <div>
                            <h3>FIBC Bag</h3>
                        </div>

                        <div class="product-arrow">
                            →
                        </div>
                    </div>
                </a>

                {{-- <a href="{{ route('product.starpakBag') }}" class="product-link">
                    <div class="product-link-content">
                        <div>
                            <h3>Starpak Bag</h3>
                            <span>
                                AD*STAR packaging system
                            </span>
                        </div>

                        <div class="product-arrow">
                            →
                        </div>
                    </div>
                </a> --}}


                <a href="{{ route('product.woven') }}" class="product-link">
                    <div class="product-link-content">
                        <div>
                            <h3>Woven Bag</h3>
                        </div>

                        <div class="product-arrow">
                            →
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>


{{-- MARKET & DISTRIBUTION --}}
<div class="about-modal" id="marketModal">
    <div class="about-modal-box image-box">
        <button class="about-close">✕</button>

        <div class="about-modal-content production-layout">

            {{-- LEFT --}}
            <div class="production-image">
                <h2>
                    {{ __('katalog.pasar_distribusi') }}
                </h2>

                <img
                    src="{{ asset('images/KRRC_Market_Distribution.jpg') }}"
                    alt="Market & Distribution"
                    class="catalogue-modal-image zoomable-image">
            </div>

            {{-- RIGHT --}}
            <div class="production-description">
                <h3>
                    {{ __('katalog.mnd') }}
                </h3>

                <p>
                    {{ __('katalog.mnd_body') }}
                </p>

                <div class="production-step">
                    <strong>1. {{ __('katalog.mnd1') }}</strong>
                    <p>
                        {{ __('katalog.mnd1_body') }}
                    </p>
                </div>

                <div class="production-step">
                    <strong>2. {{ __('katalog.mnd2') }}</strong>
                    <p>
                        {{ __('katalog.mnd2_body') }}
                    </p>
                </div>

                <div class="production-step">
                    <strong>3. {{ __('katalog.mnd3') }}</strong>
                    <p>
                        {{ __('katalog.mnd3_body') }}
                    </p>
                </div>

                <div class="production-step">
                    <strong>4. {{ __('katalog.mnd4') }}</strong>
                    <p>
                        {{ __('katalog.mnd4_body') }}
                    </p>
                </div>

                <div class="production-step">
                    <strong>5. {{ __('katalog.mnd5') }}</strong>
                    <p>
                        {{ __('katalog.mnd5_body') }}
                    </p>
                </div>

            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/catalogue.js') }}"></script>

@endsection
