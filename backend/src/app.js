const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/mahasiswa', require('./routes/mahasiswaRoutes'));

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Backend CRUD Mahasiswa berjalan'
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Endpoint tidak ditemukan.' }
    });
});

app.use(require('./middlewares/errorHandler'));

module.exports = app;