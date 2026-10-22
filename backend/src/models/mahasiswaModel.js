const pool = require('../config/db');

async function findAll(search = '') {
    if (!search.trim()) {
        const [rows] = await pool.execute(
            'SELECT * FROM mahasiswa ORDER BY id DESC'
        );
        return rows;
    }

    const pattern = `%${search.trim()}%`;
    const [rows] = await pool.execute(
        `SELECT * FROM mahasiswa
         WHERE kode_mahasiswa LIKE ?
            OR nama_mahasiswa LIKE ?
            OR alamat_mahasiswa LIKE ?
            OR jurusan_mahasiswa LIKE ?
         ORDER BY id DESC`,
        [pattern, pattern, pattern, pattern]
    );
    return rows;
}

async function findById(id) {
    const [rows] = await pool.execute(
        'SELECT * FROM mahasiswa WHERE id = ?',
        [id]
    );
    return rows[0] || null;
}

async function create(data) {
    const [result] = await pool.execute(
        `INSERT INTO mahasiswa
            (kode_mahasiswa, nama_mahasiswa, alamat_mahasiswa, tanggal_lahir, jurusan_mahasiswa)
         VALUES (?, ?, ?, ?, ?)`,
        [
            data.kode_mahasiswa,
            data.nama_mahasiswa,
            data.alamat_mahasiswa,
            data.tanggal_lahir,
            data.jurusan_mahasiswa
        ]
    );
    return findById(result.insertId);
}

async function update(id, data) {
    await pool.execute(
        `UPDATE mahasiswa
         SET kode_mahasiswa = ?, nama_mahasiswa = ?, alamat_mahasiswa = ?,
             tanggal_lahir = ?, jurusan_mahasiswa = ?
         WHERE id = ?`,
        [
            data.kode_mahasiswa,
            data.nama_mahasiswa,
            data.alamat_mahasiswa,
            data.tanggal_lahir,
            data.jurusan_mahasiswa,
            id
        ]
    );
    return findById(id);
}

async function remove(id) {
    const [result] = await pool.execute(
        'DELETE FROM mahasiswa WHERE id = ?',
        [id]
    );
    return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };