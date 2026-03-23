
// ==============================
// DARK MODE SYSTEM
// ==============================

// State management
let count = 0;

// DOM Elements
const elements = {
    angkaDisplay: document.querySelector('#angka-counter'),
    pesanDisplay: document.querySelector('#counter-pesan'),
    btnTambah: document.querySelector('#btn-tambah'),
    btnKurang: document.querySelector('#btn-kurang'),
    darkModeToggle: document.querySelector('#darkModeToggle'),
    contactForm: document.querySelector('.contact-form'),
    themeBtn: document.querySelector('#darkModeToggle')
};

// Check for saved theme preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (elements.themeBtn) {
            elements.themeBtn.innerHTML = '☀️ Light Mode';
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        if (elements.themeBtn) {
            elements.themeBtn.innerHTML = '🌙 Dark Mode';
        }
    }
}

// Toggle theme function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (elements.themeBtn) {
        elements.themeBtn.innerHTML = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

// ==============================
// COUNTER FUNCTIONALITY
// ==============================

// Update pesan berdasarkan jumlah gelas
function updatePesan(n) {
    if (!elements.pesanDisplay) return;
    
    let pesan = '';
    let emoji = '';
    
    if (n === 0) {
        pesan = 'Yuk mulai minum air!';
        emoji = '💪';
    } else if (n < 4) {
        pesan = 'Kurang minum nih...';
        emoji = '😕';
    } else if (n < 8) {
        pesan = 'Lumayan, terus tambah!';
        emoji = '💧';
    } else {
        pesan = 'Keren! Sudah cukup minum air hari ini!';
        emoji = '🎉';
    }
    
    elements.pesanDisplay.textContent = `${pesan} ${emoji}`;
    
    // Animasi angka
    if (elements.angkaDisplay) {
        elements.angkaDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => {
            elements.angkaDisplay.style.transform = 'scale(1)';
        }, 200);
    }
}

// Increment counter
function incrementCounter() {
    count++;
    if (elements.angkaDisplay) {
        elements.angkaDisplay.textContent = count;
    }
    updatePesan(count);
    
    // Save to localStorage
    localStorage.setItem('waterCounter', count);
}

// Decrement counter
function decrementCounter() {
    if (count > 0) {
        count--;
        if (elements.angkaDisplay) {
            elements.angkaDisplay.textContent = count;
        }
        updatePesan(count);
        
        // Save to localStorage
        localStorage.setItem('waterCounter', count);
    }
}

// Load counter from localStorage
function loadCounter() {
    const savedCount = localStorage.getItem('waterCounter');
    if (savedCount !== null) {
        count = parseInt(savedCount, 10);
        if (elements.angkaDisplay) {
            elements.angkaDisplay.textContent = count;
        }
        updatePesan(count);
    }
}

// ==============================
// CONTACT FORM HANDLING
// ==============================

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Validasi sederhana
    if (!name || !email || !message) {
        showFeedback('Semua field harus diisi!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFeedback('Email tidak valid!', 'error');
        return;
    }
    
    // Simulasi pengiriman
    showFeedback('Pesan berhasil dikirim! Terima kasih 😊', 'success');
    form.reset();
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFeedback(message, type) {
    // Hapus feedback yang sudah ada
    const existingFeedback = document.querySelector('.feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Buat feedback baru
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.textContent = message;
    
    // Tambahkan ke form
    const form = document.querySelector('.contact-form');
    form.appendChild(feedback);
    
    // Hapus setelah 3 detik
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

// ==============================
// SMOOTH SCROLLING
// ==============================

function initSmoothScroll() {
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
}

// ==============================
// INTERSECTION OBSERVER (ANIMATIONS)
// ==============================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements
    document.querySelectorAll('.portfolio-card, .skill-item, .about__content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==============================
// INITIALIZATION
// ==============================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Initialize counter
    loadCounter();
    
    // Add event listeners
    if (elements.btnTambah) {
        elements.btnTambah.addEventListener('click', incrementCounter);
    }
    
    if (elements.btnKurang) {
        elements.btnKurang.addEventListener('click', decrementCounter);
    }
    
    if (elements.darkModeToggle) {
        elements.darkModeToggle.addEventListener('click', toggleTheme);
    }
    
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === '+' || e.key === '=') {
            e.preventDefault();
            incrementCounter();
        } else if (e.key === '-' || e.key === '_') {
            e.preventDefault();
            decrementCounter();
        }
    });
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        if (elements.themeBtn) {
            elements.themeBtn.innerHTML = e.matches ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
    }
});
