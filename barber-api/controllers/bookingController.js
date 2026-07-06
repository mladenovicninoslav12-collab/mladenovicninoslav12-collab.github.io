const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const bookingsFilePath = path.join(__dirname, '..', 'data', 'bookings.json');

function loadBookingsFromDisk() {
    try {
        if (!fs.existsSync(bookingsFilePath)) {
            return [];
        }

        const raw = fs.readFileSync(bookingsFilePath, 'utf8');
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn('⚠️ Ne mogu učitati bookings.json, koristim praznu listu:', error.message);
        return [];
    }
}

function saveBookingsToDisk() {
    try {
        const dir = path.dirname(bookingsFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), 'utf8');
    } catch (error) {
        console.warn('⚠️ Ne mogu sačuvati bookings.json:', error.message);
    }
}

// In-memory storage + disk persistence
let bookings = loadBookingsFromDisk();
let bookingId = 1;

if (bookings.length > 0) {
    bookingId = Math.max(...bookings.map(b => Number(b.id) || 0)) + 1;
}

// Email konfiguracija - radi u "safe" modu ako env varijable nisu postavljene
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

let transporter = null;
let emailEnabled = false;

if (EMAIL_USER && EMAIL_PASSWORD && ADMIN_EMAIL) {
    try {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD
            }
        });

        // Provjeri konekciju (nije obavezno, ali pomaže u debug-u)
        transporter.verify().then(() => {
            emailEnabled = true;
            console.log('✅ Email transporter spreman');
        }).catch((err) => {
            emailEnabled = false;
            console.warn('⚠️ Email transporter nije spreman:', err && err.message ? err.message : err);
        });
    } catch (err) {
        console.warn('⚠️ Greška pri kreiranju email transportera:', err && err.message ? err.message : err);
        transporter = null;
        emailEnabled = false;
    }
} else {
    console.warn('⚠️ EMAIL_USER / EMAIL_PASSWORD / ADMIN_EMAIL nisu postavljeni - email je onemogućen.');
}

// Kreiraj novu rezervaciju
exports.createBooking = async (req, res) => {
    try {
        const { name, phone, service, date, email } = req.body;

        // Validacija
        if (!name || !phone || !service || !date) {
            return res.status(400).json({ error: 'Svi polja su obavezna' });
        }

        const newBooking = {
            id: bookingId++,
            name,
            phone,
            service,
            date,
            email,
            status: 'pending',
            createdAt: new Date()
        };

        bookings.push(newBooking);
        saveBookingsToDisk();

        // Pošalji email klijentu (sigurno: ako emailEnabled = false, samo logujemo)
        if (email) {
            const mailOptions = {
                from: EMAIL_USER || 'no-reply@barberelite.local',
                to: email,
                subject: `Potvrda rezervacije - Barber Elite`,
                html: `
                    <h2>Hvala ${name}! 🎉</h2>
                    <p>Vaša rezervacija je primljena.</p>
                    <p><strong>Detalji:</strong></p>
                    <ul>
                        <li><strong>Usluga:</strong> ${service}</li>
                        <li><strong>Datum:</strong> ${new Date(date).toLocaleDateString('sr-RS')}</li>
                        <li><strong>Vrijeme:</strong> ${new Date(date).toLocaleTimeString('sr-RS')}</li>
                    </ul>
                    <p>Kontakt: +381 60 123 4567</p>
                    <p>Hvala što ste odabrali Barber Elite! ✨</p>
                `
            };

            if (emailEnabled && transporter) {
                try {
                    const info = await transporter.sendMail(mailOptions);
                    console.log('Email poslat:', info && info.response ? info.response : info);
                } catch (err) {
                    console.warn('Email greška (slanje klijentu):', err && err.message ? err.message : err);
                }
            } else {
                console.log('Simulacija slanja emaila klijentu:', mailOptions);
            }
        }

        // Pošalji email adminu
        const adminMail = {
            from: EMAIL_USER || 'no-reply@barberelite.local',
            to: ADMIN_EMAIL || 'admin@barberelite.rs',
            subject: `Nova rezervacija - ${service}`,
            html: `
                <h3>Nova rezervacija!</h3>
                <p><strong>Ime:</strong> ${name}</p>
                <p><strong>Telefon:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email || 'N/A'}</p>
                <p><strong>Usluga:</strong> ${service}</p>
                <p><strong>Datum:</strong> ${new Date(date).toLocaleDateString('sr-RS')} ${new Date(date).toLocaleTimeString('sr-RS')}</p>
            `
        };

        if (emailEnabled && transporter) {
            try {
                await transporter.sendMail(adminMail);
                console.log('Admin email poslat');
            } catch (err) {
                console.warn('Admin email greška:', err && err.message ? err.message : err);
            }
        } else {
            console.log('Simulacija slanja admin emaila:', adminMail);
        }

        res.status(201).json({
            message: 'Rezervacija kreirana!',
            booking: newBooking
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Preuzmi sve rezervacije
exports.getBookings = (req, res) => {
    res.json({
        total: bookings.length,
        bookings: bookings
    });
};

// Ažuriraj rezervaciju
exports.updateBooking = (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = bookings.find(b => b.id == id);

        if (!booking) {
            return res.status(404).json({ error: 'Rezervacija nije pronađena' });
        }

        booking.status = status || booking.status;
        saveBookingsToDisk();

        res.json({
            message: 'Rezervacija ažurirana',
            booking
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obriši rezervaciju
exports.deleteBooking = (req, res) => {
    try {
        const { id } = req.params;
        const bookingIndex = bookings.findIndex(b => b.id == id);

        if (bookingIndex === -1) {
            return res.status(404).json({ error: 'Rezervacija nije pronađena' });
        }

        const deletedBooking = bookings.splice(bookingIndex, 1)[0];
        saveBookingsToDisk();

        res.json({
            message: 'Rezervacija obrisana',
            booking: deletedBooking
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
