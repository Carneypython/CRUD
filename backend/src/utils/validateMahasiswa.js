const fields = [
    'kode_mahasiswa',
    'nama_mahasiswa',
    'alamat_mahasiswa',
    'tanggal_lahir',
    'jurusan_mahasiswa'
];

function isValidDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year
        && date.getUTCMonth() === month - 1
        && date.getUTCDate() === day;
}

function validateMahasiswa(input) {
    const data = {};
    const errors = {};

    for (const field of fields) {
        const value = typeof input[field] === 'string' ? input[field].trim() : '';
        if (!value) {
            errors[field] = 'Wajib diisi.';
        }
        data[field] = value;
    }

    if (data.kode_mahasiswa.length > 20) {
        errors.kode_mahasiswa = 'Maksimal 20 karakter.';
    }
    if (data.nama_mahasiswa.length > 100) {
        errors.nama_mahasiswa = 'Maksimal 100 karakter.';
    }
    if (data.jurusan_mahasiswa.length > 100) {
        errors.jurusan_mahasiswa = 'Maksimal 100 karakter.';
    }
    if (data.tanggal_lahir && !isValidDate(data.tanggal_lahir)) {
        errors.tanggal_lahir = 'Gunakan tanggal yang valid.';
    } else if (data.tanggal_lahir) {
        const today = new Date();
        const todayString = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, '0'),
            String(today.getDate()).padStart(2, '0')
        ].join('-');
        if (data.tanggal_lahir > todayString) {
            errors.tanggal_lahir = 'Tanggal lahir tidak boleh di masa depan.';
        }
    }

    return { data, errors };
}

module.exports = { validateMahasiswa };