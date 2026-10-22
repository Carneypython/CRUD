const test = require('node:test');
const assert = require('node:assert/strict');
const { validateMahasiswa } = require('./validateMahasiswa');

const validMahasiswa = {
    kode_mahasiswa: 'MHS001',
    nama_mahasiswa: 'Andi Pratama',
    alamat_mahasiswa: 'Bandung',
    tanggal_lahir: '2004-05-12',
    jurusan_mahasiswa: 'Informatika'
};

test('accepts a complete mahasiswa payload', () => {
    const result = validateMahasiswa(validMahasiswa);
    assert.deepEqual(result.errors, {});
    assert.equal(result.data.kode_mahasiswa, 'MHS001');
});

test('rejects blank required fields and impossible dates', () => {
    const result = validateMahasiswa({ ...validMahasiswa, nama_mahasiswa: '  ', tanggal_lahir: '2025-02-30' });
    assert.equal(result.errors.nama_mahasiswa, 'Wajib diisi.');
    assert.equal(result.errors.tanggal_lahir, 'Gunakan tanggal yang valid.');
});

test('rejects future birth dates', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const date = [
        futureDate.getFullYear(),
        String(futureDate.getMonth() + 1).padStart(2, '0'),
        String(futureDate.getDate()).padStart(2, '0')
    ].join('-');
    const result = validateMahasiswa({ ...validMahasiswa, tanggal_lahir: date });
    assert.equal(result.errors.tanggal_lahir, 'Tanggal lahir tidak boleh di masa depan.');
});