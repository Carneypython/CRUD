
require('dotenv').config();

const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        const connection = await pool.getConnection();
        console.log('Koneksi MySQL berhasil');

        connection.release();

        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Koneksi MySQL gagal:', error.message);
        process.exit(1);
    }
}

startServer();
