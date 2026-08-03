@extends('layouts.appComPro')
@section('title', 'Profile Company KRR')
@section('content')

<style>
    .client-grid{
        display:grid;
        grid-template-columns: repeat(4, 1fr);
        gap:30px;
        margin-top:50px;
        align-items:start;
        row-gap:90px;
    }

    .client-item{
        display:flex;
        flex-direction:column;
        align-items:center;
        text-align:center;
        justify-content:flex-start;
    }

    .company-name{
        font-size:20px;
        font-weight:700;
        color:#1f2937;
        line-height:1.2;
        min-height:60px;
        text-align:center;
    }

    .logo-circle{
        width:180px;
        height:180px;
        border-radius:50%;
        background:#fff;
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow:0 8px 20px rgba(0,0,0,0.08);
        padding:20px;
        transition:0.3s ease;
        flex-shrink:0;
    }

    .logo-circle img{
        object-fit:contain;
    }

    .logo-sig{
        width:75%;
        height:75%;
    }

    .logo-pig{
        width:100%;
        height:100%;
    }

    .logo-pg{
        width:68%;
        height:68%;
    }

    .logo-kni{
        width:100%;
        height:100%;
    }

    .logo-mi{
        width:120%;
        height:120%;
    }

    .logo-tt{
        width:80%;
        height:80%;
    }

    .logo-jm{
        width:100%;
        height:100%;
    }

    .logo-circle:hover{
        transform:translateY(-5px);
    }

    @media (max-width:1200px){
        .client-grid{
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width:768px){
        .client-grid{
            grid-template-columns: repeat(2, 1fr);
        }

        .logo-circle{
            width:140px;
            height:140px;
        }

        .company-name{
            min-height:50px;
            font-size:18px;
        }
    }

    @media (max-width:480px){
        .client-grid{
            grid-template-columns:1fr;
        }
    }
</style>


<!-- MAIN -->
<section id="home" class="home-hero-section">
    <div class="swiper home-hero-swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="{{ asset('images/kantor_krr.png') }}">
            </div>

            <div class="swiper-slide">
                <img src="{{ asset('images/gedungmojo.jpg') }}">
            </div>
        </div>

        <div class="swiper-pagination home-swiper-pagination"></div>
        <div class="swiper-button-prev home-swiper-prev"></div>
        <div class="swiper-button-next home-swiper-next"></div>
    </div>

    <div class="home-hero-overlay">
        <div class="home-hero-content">
            <h1>{{ __('navbar.mitra_pengemasan_anda') }}</h1>
            <p>
                {{ __('navbar.home_body') }}
            </p>
        </div>
    </div>
</section>

<!-- ABOUT -->
<section id="about" class="section about-section">
    <div class="container-home">

        <div class="about-text">
            <h2>{{ __('navbar.about_kertaRajasaRaya') }}</h2>
            <p>
                {{ __('navbar.about_body') }}
            </p>
        </div>

        <div class="stats-grid">
            <div class="stats-card"
                data-target="modalExperience">
                <h3>25+</h3>
                <span>
                    {{ __('navbar.about_card1') }}
                </span>
            </div>

            <div class="stats-card"
                data-target="modalExport">
                <h3>1985</h3>
                <span>
                    {{ __('navbar.about_card2') }}
                </span>
            </div>

            <div class="stats-card"
                data-target="modalTechnology">
                <h3>AD*STAR</h3>
                <span>
                    {{ __('navbar.about_card3') }}
                </span>
            </div>

            <div class="stats-card"
                data-target="modalCapacity">
                <h3>#1 SEA</h3>
                <span>
                    {{ __('navbar.about_card4') }}
                </span>
            </div>
        </div>
    </div>
</section>

<!-- MAIN CUSTOMER -->
<section id="news" class="section bg-light">
    <div class="container-home">
        <h2 class="section-title">{{ __('navbar.pelanggan_utama') }}</h2>

        <div class="client-grid">
            <div class="client-item">
                <h3 class="company-name">Semen Indonesia Group</h3>

                <div class="logo-circle">
                    <img class= "logo-sig" src="{{ asset('images/sig.png') }}"
                        alt="SIG">
                </div>
            </div>

            {{-- <div class="client-item">
                <h3 class="company-name">Pupuk Indonesia Group</h3>

                <div class="logo-circle">
                    <img class= "logo-pig" src="{{ asset('images/pupuk_indonesia.png') }}"
                        alt="Pupuk Indonesia Group">
                </div>
            </div> --}}

            <div class="client-item">
                <h3 class="company-name">Pertamina Group</h3>

                <div class="logo-circle">
                    <img class= "logo-pg" src="{{ asset('images/pertamina.jpg') }}"
                        alt="Pertamina">
                </div>
            </div>

            {{-- <div class="client-item">
                <h3 class="company-name">Kaltim Nitrate Indonesia</h3>

                <div class="logo-circle">
                    <img class= "logo-kni" src="{{ asset('images/kaltim_nitrate.png') }}"
                        alt="Kaltim Nitrate">
                </div>
            </div> --}}

             <div class="client-item">
                <h3 class="company-name">M-I Indonesia, PT</h3>

                <div class="logo-circle">
                    <img class= "logo-mi" src="{{ asset('images/mi_indonesia.png') }}"
                        alt="M-I Indonesia">
                </div>
            </div>

            <div class="client-item">
                <h3 class="company-name">Timuraya Tunggal, PT</h3>

                <div class="logo-circle">
                    <img class= "logo-tt" src="{{ asset('images/timuraya.png') }}"
                        alt="TIMURAYA TUNGGAL, PT">
                </div>
            </div>

            {{-- <div class="client-item">
                <h3 class="company-name">JM Mutu, PT</h3>

                <div class="logo-circle">
                    <img class= "logo-jm" src="{{ asset('images/jm_mutu.png') }}"
                        alt="JM MUTU, PT">
                </div>
            </div> --}}
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


<!--Modal About-->
<div class="about-modal" id="modalExperience">
    <div class="about-modal-box">
        <button class="about-close">✕</button>

        <div class="about-modal-content">
            <div class="about-modal-image">
                <img src="{{ asset('images/gedungdepan.jpg') }}"alt="">
            </div>
            <div class="about-modal-text">
                <h2>{{ __('navbar.about_modal1') }}</h2>
                <p>
                    {{ __('navbar.about_modal_body1-1') }}
                </p>
                <p>
                    {{ __('navbar.about_modal_body1-2') }}
                </p>
            </div>
        </div>
    </div>
</div>

<div class="about-modal" id="modalExport">
    <div class="about-modal-box">
        <button class="about-close">✕</button>

        <div class="about-modal-content">
            <div class="about-modal-image">
                <img src="{{ asset('images/produksikarung.jpg') }}" alt="">
            </div>

            <div class="about-modal-text">
                <h2>{{ __('navbar.about_modal2') }}</h2>
                <p>
                    {{ __('navbar.about_modal_body2-1') }}
                </p>

                <p>
                    {{ __('navbar.about_modal_body2-2') }}
                </p>
            </div>
        </div>
    </div>
</div>

<div class="about-modal" id="modalTechnology">
    <div class="about-modal-box">
        <button class="about-close">✕</button>

        <div class="about-modal-content">
            <div class="about-modal-image">
                <img src="{{ asset('images/gruppen-43.jpg') }}" alt="">
            </div>

            <div class="about-modal-text">
                <h2>
                    {{ __('navbar.about_modal3') }}
                </h2>

                <p>
                    {{ __('navbar.about_modal_body3-1') }}
                </p>

                <p>
                    {{ __('navbar.about_modal_body3-2') }}
                </p>
            </div>
        </div>
    </div>
</div>

<div class="about-modal"id="modalCapacity">
    <div class="about-modal-box">
        <button class="about-close">✕</button>

        <div class="about-modal-content">
            <div class="about-modal-image">
                <img src="{{ asset('images/starsack.png') }}" alt="">
            </div>

            <div class="about-modal-text">
                <h2>
                    {{ __('navbar.about_modal4') }}
                </h2>

                <p>
                    {{ __('navbar.about_modal_body4-1') }}
                </p>

                <p>
                    {!! __('navbar.about_modal_body4-2', [
                        'STARPAK' => 'STARPAK'
                    ]) !!}
                </p>
            </div>
        </div>
    </div>
</div>

{{-- <link href="{{ asset('css/home.css') }}" rel="stylesheet">
<script src="{{ asset('js/home.js') }}"></script> --}}

@endsection
