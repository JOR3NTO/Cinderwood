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
// Gallery modal functions
function openModal(photoId) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    
    // Aquí puedes agregar las rutas reales de las fotos
    const photoData = {
        'concert1': '<img src="img/toque.jpg" alt="Cinderwood en Skandalo Tulua" style="width: 100%; height: auto; border-radius: 10px;"><br><strong>Skandalo, Tuluá 2025</strong><br>Show épico en vivo',
        'studio1': '<img src="img/estudioPID.jpg" alt="Grabación de Pure in Deep" style="width: 100%; height: auto; border-radius: 10px;"><br><strong>En el estudio</strong><br>Grabando "Pure in Deep" - 2025',
        'backstage1': '<img src="img/preparacion.jpg" alt="Cinderwood backstage" style="width: 100%; height: auto; border-radius: 10px;"><br><strong>Backstage</strong><br>Los momentos antes de salir al escenario',
        'concert2': '<img src="img/toque3.jpg" alt="Cinderwood en Santo Café Bar Buga" style="width: 100%; height: auto; border-radius: 10px;"><br><strong>Santo Café Bar, Buga</strong><br>Show íntimo en vivo - 2025',
        'band1': '<img src="img/grabacion_Until.jpg" alt="Grabación EP Until The Last One Goes" style="width: 100%; height: auto; border-radius: 10px;"><br><strong>Grabando el EP</strong><br>Primer EP "Until The Last One Goes"',
        'acoustic1': '<img src="img/toque2.jpg" alt="Cinderwood en Cafetería Vonbayage" style="width: 100%; height: auto; border-radius: 10px;"><br><strong>Cafetería Vonbayage</strong><br>Sesión acústica íntima - 2025'
    };
    
    modalImage.innerHTML = photoData[photoId] || 'Foto no encontrada';
    modal.style.display = 'block';
    
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
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