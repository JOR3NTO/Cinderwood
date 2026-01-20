/*
=====================================
CINDERWOOD - ELECTRONIC PRESS KIT
=====================================
Author: Created for Cinderwood Band
Description: Interactive functionality for the band's EPK website
Features: Smooth scrolling, animations, modal gallery, stats counter
=====================================
*/

// SMOOTH SCROLLING NAVIGATION
// ===========================
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// SCROLL ANIMATIONS
// ================
// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

function observeFadeIns(root = document) {
    root.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// LANGUAGE SWITCHER
// =================
function setLanguage(lang) {
    const root = document.documentElement;
    root.setAttribute('data-lang', lang);

    const esElements = document.querySelectorAll('.lang-es');
    const enElements = document.querySelectorAll('.lang-en');

    esElements.forEach(el => {
        el.classList.toggle('lang-hidden', lang !== 'es');
    });

    enElements.forEach(el => {
        el.classList.toggle('lang-hidden', lang !== 'en');
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function initLanguageSwitcher() {
    const stored = window.localStorage ? localStorage.getItem('cinderwood-lang') : null;
    const initialLang = stored === 'en' ? 'en' : 'es';
    setLanguage(initialLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang === 'en' ? 'en' : 'es';
            setLanguage(lang);
            if (window.localStorage) {
                localStorage.setItem('cinderwood-lang', lang);
            }
        });
    });
}

// DOWNLOADS AVAILABILITY CHECK
// ============================
document.addEventListener('DOMContentLoaded', async () => {
    const isHttp = window.location && window.location.protocol && window.location.protocol.startsWith('http');
    const files = [
        { id: 'riderDownload', path: 'docs/Rider_Tecnico_Cinderwood.pdf' },
        { id: 'epkDownload', path: 'docs/Cinderwood_Electronic_Press_Kit.pdf' },
    ];

    for (const f of files) {
        const link = document.getElementById(f.id);
        if (!link) continue;
        link.href = f.path;
        if (isHttp) {
            try {
                const res = await fetch(f.path, { method: 'HEAD' });
                if (!res.ok) {
                    link.setAttribute('aria-disabled', 'true');
                    link.classList.add('disabled');
                    link.removeAttribute('download');
                    link.removeAttribute('target');
                }
            } catch {
                link.setAttribute('aria-disabled', 'true');
                link.classList.add('disabled');
                link.removeAttribute('download');
                link.removeAttribute('target');
            }
        }
    }

    // Enable and validate per-song press kit downloads
    const presskitLinks = document.querySelectorAll('.presskit-download');
    for (const link of presskitLinks) {
        const pdfPath = link.getAttribute('data-pdf');
        if (!pdfPath) continue;
        link.href = pdfPath;
        if (isHttp) {
            try {
                const res = await fetch(pdfPath, { method: 'HEAD' });
                if (!res.ok) {
                    link.setAttribute('aria-disabled', 'true');
                    link.classList.add('disabled', 'soon');
                    const textSpan = link.querySelector('.btn-text');
                    if (textSpan) textSpan.textContent = 'Press Kit próximamente';
                    link.removeAttribute('download');
                    link.removeAttribute('target');
                }
            } catch {
                link.setAttribute('aria-disabled', 'true');
                link.classList.add('disabled', 'soon');
                const textSpan = link.querySelector('.btn-text');
                if (textSpan) textSpan.textContent = 'Press Kit próximamente';
                link.removeAttribute('download');
                link.removeAttribute('target');
            }
        }
    }

    // Initialize language switcher
    initLanguageSwitcher();

    // Render gallery (data-driven)
    renderGallery();
});

// MUSIC PLAYER FUNCTIONALITY
// ==========================
// Play track function - opens Spotify directly
function playTrack(spotifyUrl) {
    if (spotifyUrl.startsWith('https://open.spotify.com')) {
        // Open Spotify link in new tab
        window.open(spotifyUrl, '_blank');
    } else {
        // Fallback for old placeholder functionality
        alert(`Reproduciendo: ${spotifyUrl}\n\n(Aquí conectarías con Spotify, SoundCloud, o tu plataforma de música preferida)`);
    }
}

// VISUAL EFFECTS
// ==============
// Header parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header-bg');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// STATISTICS ANIMATION
// ===================
// Dynamic stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 50);
    });
}

// Trigger stats animation when stats section is visible
const statsSection = document.querySelector('#stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// GALLERY MODAL FUNCTIONALITY
// ===========================
const GALLERY_ITEMS = [
    {
        id: 'santuario_enero',
        src: 'img/photos/santuario_enero.jpg',
        alt: 'Cinderwood en Santuario Pub, enero 2026',
        title: 'Santuario Pub, Buga',
        size: 'hero'
    },
    {
        id: 'concert1',
        src: 'img/photos/toque.jpg',
        alt: 'Cinderwood en Skandalo, Tuluá',
        title: 'Skandalo, Tuluá',
        size: 'm'
    },
    {
        id: 'studio1',
        src: 'img/photos/DSC04054.jpg',
        alt: 'Grabación de Pure in Deep',
        title: 'En el estudio',
        size: 'tall'
    },
    {
        id: 'backstage1',
        src: 'img/photos/preparacion.jpg',
        alt: 'Cinderwood backstage',
        title: 'Backstage',
        size: 'm'
    },
    {
        id: 'concert2',
        src: 'img/photos/toque3.jpg',
        alt: 'Cinderwood en Santo Café Bar, Buga',
        title: 'Santo Café Bar, Buga',
        size: 'l'
    },
    {
        id: 'band1',
        src: 'img/photos/grabacion_Until.jpg',
        alt: 'Grabación del EP Until The Last One Goes',
        title: 'Grabando el EP',
        size: 'm'
    },
    {
        id: 'santuario1',
        src: 'img/photos/Santuario.jpg',
        alt: 'Cinderwood en Santuario Pub',
        title: 'Santuario Pub, Buga',
        size: 'm'
    },

    // Fotos adicionales (según los nombres reales en img/photos)
    { id: 'dsc_03841', src: 'img/photos/DSC03841-2.jpg', alt: 'Cinderwood — DSC03841-2', title: '', size: 'm' },
    { id: 'dsc_03883', src: 'img/photos/DSC03883.jpg', alt: 'Cinderwood — DSC03883', title: '', size: 'm' },
    { id: 'dsc_03904', src: 'img/photos/DSC03904.jpg', alt: 'Cinderwood — DSC03904', title: '', size: 'm' },
    { id: 'dsc_04060', src: 'img/photos/DSC04060.jpg', alt: 'Cinderwood — DSC04060', title: '', size: 'm' },
    { id: 'dsc_04200', src: 'img/photos/DSC04200.jpg', alt: 'Cinderwood — DSC04200', title: '', size: 'wide' }
];

const galleryById = Object.fromEntries(GALLERY_ITEMS.map(item => [item.id, item]));

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = '';

    for (const item of GALLERY_ITEMS) {
        const card = document.createElement('figure');
        const sizeClass = item.size ? `size-${item.size}` : 'size-m';
        card.className = `photo-item fade-in ${sizeClass}`;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Abrir foto: ${item.title}`);
        card.dataset.photoId = item.id;

        const img = document.createElement('img');
        img.className = 'gallery-image';
        img.src = item.src;
        img.alt = item.alt;
        img.loading = 'lazy';

        img.addEventListener('error', () => {
            card.classList.add('is-missing');
            card.dataset.missing = 'true';
        });

        const overlay = document.createElement('figcaption');
        overlay.className = 'photo-overlay';

        const title = document.createElement('div');
        title.className = 'photo-title';
        title.textContent = item.title || '';

        if (item.title) {
            overlay.appendChild(title);
        }

        card.appendChild(img);
        card.appendChild(overlay);
        grid.appendChild(card);
    }

    // Delegate events once
    if (!grid.dataset.bound) {
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('[data-photo-id]');
            if (!card) return;
            if (card.dataset.missing === 'true') return;
            openModal(card.dataset.photoId);
        });
        grid.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            const card = e.target.closest('[data-photo-id]');
            if (!card) return;
            e.preventDefault();
            if (card.dataset.missing === 'true') return;
            openModal(card.dataset.photoId);
        });
        grid.dataset.bound = 'true';
    }

    observeFadeIns(grid);
}

// Gallery modal functions
function openModal(photoId) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');

    const item = galleryById[photoId];
    if (!item) {
        modalImage.textContent = 'Foto no encontrada';
    } else {
        modalImage.classList.remove('photo-placeholder');
        modalImage.innerHTML = `
            <img class="modal-photo" src="${item.src}" alt="${item.alt}">
            <div class="modal-caption">
                <strong>${item.title}</strong>
            </div>
        `;
    }
    modal.style.display = 'block';
    
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';

    // Enfocar el botón de cierre para accesibilidad
    if (closeBtn) {
        closeBtn.focus();
    }
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';

    if (modalImage) {
        modalImage.classList.add('photo-placeholder');
        modalImage.textContent = 'Aquí aparecerá la foto seleccionada';
    }
}

// Cerrar modal al hacer click fuera de la imagen
window.onclick = function(event) {
    const modal = document.getElementById('photoModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Permitir cerrar modal con Enter/Espacio en el botón de cierre
const closeBtnKey = document.querySelector('.close-modal');
if (closeBtnKey) {
    closeBtnKey.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            closeModal();
        }
    });
}