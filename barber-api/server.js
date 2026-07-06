const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
].filter(Boolean);

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // dozvoli requests bez origin-a (npr. Postman/curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/health', (req, res) => {
    res.json({ status: 'API je żiv! ✅' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta nije pronađena' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Barber API pokrenut na http://localhost:${PORT}`);
});
