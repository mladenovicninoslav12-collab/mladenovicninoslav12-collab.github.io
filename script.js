// Navbar scroll behavior
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// API konfiguracija
const API_URL = 'http://localhost:5000/api';

// Form handling
const form = document.getElementById('reservation-form');
const formMessage = document.getElementById('form-message');

function formatDateTime(value) {
    try {
        const d = new Date(value);
        return d.toLocaleString('sr-RS', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    } catch (e) {
        return value;
    }
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;

    if (!name || !phone || !service || !date) {
        formMessage.innerHTML = '❌ Sva polja su obavezna!';
        formMessage.style.color = '#ff6b6b';
        return;
    }

    try {
        // Pošalji na backend API
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, service, date, email })
        });

        if (!response.ok) {
            throw new Error('API greška');
        }

        const result = await response.json();
        
        // Čuva lokalno kao backup
        const booking = { id: Date.now(), name, phone, service, date, status: 'pending' };
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        const prettyDate = formatDateTime(date);
        formMessage.innerHTML = `<strong style="color: var(--gold);">✅ Hvala ${name}!</strong><br>Uspešno ste poslali zahtev za <strong>${service}</strong>.<br>Vidimo se <strong>${prettyDate}</strong>.`;
        formMessage.style.color = 'var(--gold)';

        form.reset();
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (error) {
        console.error('Greška:', error);
        formMessage.innerHTML = '❌ Greška pri slanju! Proverite da li je API pokrenut na localhost:5000';
        formMessage.style.color = '#ff6b6b';
    }
});

// set year in footer
document.addEventListener('DOMContentLoaded', function () {
    const y = new Date().getFullYear();
    const el = document.getElementById('year');
    if (el) el.textContent = y;
});
