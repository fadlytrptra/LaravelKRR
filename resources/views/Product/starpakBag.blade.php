@extends('layouts.appComPro')
@section('title', 'Produk | STARPAK BAG')
@section('content')
<link href="{{ asset('css/woven.css') }}" rel="stylesheet">


<section class="product-page">

    {{-- HERO --}}
    <div class="product-hero">
        <div class="hero-overlay">
            <div class="hero-content">
                <h1>Starpak Bag</h1>
                 <p>
                    Solusi kemasan industri modern dengan
                    kekuatan tinggi, perlindungan maksimal,
                    hemat ruang penyimpanan, dan lebih ramah lingkungan.
                </p>
            </div>
        </div>
    </div>

    <div class="product-container">
        {{-- CONTENT --}}
        <div class="product-content">
            <div class="product-card">
                <div class="product-image">
                    <img src="{{ asset('images/product.jpg') }}" alt="Starpak Bag">
                </div>

                <div class="product-info">
                    <span class="subtitle">
                        Advanced Industrial Packaging
                    </span>

                    <h2>Starpak Bag</h2>

                    <p>
                        STARPAK Bag merupakan kemasan industri berbahan
                        woven polypropylene (PP) yang dirancang dengan
                        teknologi modern untuk memberikan daya tahan,
                        efisiensi penyimpanan, dan perlindungan produk
                        yang lebih optimal.
                    </p>

                    <p>
                        Produk ini cocok digunakan untuk berbagai material
                        curah seperti semen, bahan bangunan, pupuk,
                        bahan kimia atau resin, tepung, pakan ternak,
                        hingga berbagai produk berbentuk bubuk dan granular.
                    </p>

                    <p>
                        Dengan desain block bottom yang stabil, STARPAK Bag
                        mampu meningkatkan efisiensi penyimpanan, pengangkutan,
                        loading, dan unloading, baik untuk proses manual
                        maupun otomatis.
                    </p>
                </div>
            </div>

            <div class="feature-section">
                <div class="feature-card">
                    <h2>Kekuatan yang Tinggi</h2>
                    <p>
                        Material polypropylene berkualitas
                        tinggi dengan daya tahan terhadap
                        tekanan, handling, dan distribusi.
                    </p>
                </div>

                <div class="feature-card">
                    <h2>Ketahanan Terhadap Air</h2>
                    <p>
                        Material tahan kelembapan serta
                        dilengkapi micro perforation untuk
                        menjaga sirkulasi udara optimal.
                    </p>
                </div>

                <div class="feature-card">
                    <h2>Hemat Ruang</h2>
                    <p>
                        Desain block bottom membantu
                        efisiensi penyimpanan dan
                        transportasi produk.
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

            <a href="tel:+62318669595"
                class="contact-btn">
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M18.41 22h.37c.31-.01.6-.17.78-.43l2.27-3.27c.15-.22.21-.49.16-.76a1 1 0 0 0-.43-.65l-4.91-3.27c-.41-.27-.96-.21-1.29.15l-1.88 2.03c-.76-.45-2.03-1.26-3.03-2.26s-1.81-2.27-2.26-3.02l2.03-1.88c.36-.33.43-.88.15-1.29L7.1 2.44c-.15-.22-.38-.38-.64-.43-.27-.05-.54 0-.76.16L2.43 4.43c-.26.18-.42.47-.43.78-.03.71-.16 7.04 4.79 11.98 4.46 4.46 10.04 4.8 11.62 4.8Z"></path>
                </svg>
                62818510828
            </a>
        </div>

    </div>
</section>



@endsection
