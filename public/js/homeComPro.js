// #region Variable
let navbar = document.querySelector('.navbar-home');
let menuToggle = document.getElementById('menuToggle');
let menuOverlay = document.getElementById('menuOverlay');
let closeMenu = document.getElementById('closeMenu');
let langButtons = document.querySelectorAll('.lang-btn');
let menuLinks = document.querySelectorAll('.menu-left a');
let statsCards = document.querySelectorAll('.stats-card');
let closeButtons = document.querySelectorAll('.about-close');
let produkToggle = document.getElementById('produkToggle');
let produkSubmenu = document.getElementById('produkSubmenu');
let arrow = document.querySelector('.arrow');


// #endregion

// #region Function

function handleNavbarScroll() {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove(
            'scrolled'
        );
    }
}

function openMenu() {
    if (!menuOverlay) return;

    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOverlayMenu() {
    if (!menuOverlay) return;

    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
    resetMenuOverlay();
}

function smoothScroll(targetId) {
    const target = document.querySelector(targetId);

    if (!target) return;
    window.scrollTo({
        top:
            target.offsetTop - 70,
        behavior:
            'smooth'
    });

    closeOverlayMenu();
}

function setLanguage(button) {
    langButtons.forEach(btn => {
        btn.classList.remove(
            'active'
        );
    });

    button.classList.add(
        'active'
    );

    const language = button.dataset.lang;
    console.log('Selected Language:', language);

}

function resetMenuOverlay() {
    if (produkSubmenu) {
        produkSubmenu.classList.remove('active');
    }

    if (arrow) {
        arrow.classList.remove('rotate');
    }
}

// #endregion


// #region Event Listener

// navbar scroll
window.addEventListener(
    'scroll',
    handleNavbarScroll
);

// open menu
if (menuToggle) {
    menuToggle.addEventListener(
        'click',
        openMenu
    );
}

// smooth scroll + navigation
menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {

        const href = this.getAttribute('href');

        if (!href) return;

        // anchor section
        if (
            href.startsWith('#') ||
            href.includes('/#')
        ) {
            e.preventDefault();

            const targetId =
                '#' + href.split('#')[1];

            smoothScroll(targetId);
        }
    });
});

// ganti bahasa
langButtons.forEach(button => {
    button.addEventListener(
        'click',
        function () {

            setLanguage(this);
        }
    );
});


// tutup menu dengan esc
document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    // Tutup menu
    if (menuOverlay && menuOverlay.classList.contains('active')) {
        closeOverlayMenu();
        return;
    }

    // Tutup modal about yang sedang aktif
    let activeModal = document.querySelector('.about-modal.active');
    if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// klik luar menu = close
document.addEventListener('click',function (e) {
    if (!menuOverlay) return;

    let isMenuOpen = menuOverlay.classList.contains('active');
    let clickInsideMenu = menuOverlay.contains(e.target);
    let clickMenuButton = menuToggle ? menuToggle.contains(e.target) : false;

    if (isMenuOpen && !clickInsideMenu && !clickMenuButton) {
        closeOverlayMenu();
    }}
);

// modal deskripsi about
statsCards.forEach(card => {
    card.addEventListener(
        'click',
        function () {

            const targetId =
                this.dataset.target;

            if (!targetId)
                return;

            const modal =
                document.getElementById(
                    targetId
                );

            if (!modal)
                return;

            modal.classList.add(
                'active'
            );

            document.body.style
                .overflow =
                'hidden';
        }
    );
});

closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        this.closest(
            '.about-modal'
        ).classList.remove(
            'active'
        );

        document.body.style
            .overflow = '';

    });
});

document.querySelectorAll('.about-modal').forEach(modal => {
    modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove(
                    'active'
                );
                document.body.style
                    .overflow =
                    '';
            }
        }
    );
});

if (produkToggle) {
    produkToggle.addEventListener('click', function (e) {
        e.stopPropagation();

        produkSubmenu.classList.toggle('active');
        arrow.classList.toggle('rotate');
    });
}

// submenu produk tetap bisa navigate
document.querySelectorAll('#produkSubmenu a')
    .forEach(link => {
        link.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });
// first load
handleNavbarScroll();

const heroSwiper = new Swiper(".home-hero-swiper", {
    loop: true,
    speed: 700,

    pagination: {
        el: ".home-swiper-pagination",
        clickable: true,
    },

    navigation: {
        prevEl: ".home-swiper-prev",
        nextEl: ".home-swiper-next",
    },
});

// #endregion
