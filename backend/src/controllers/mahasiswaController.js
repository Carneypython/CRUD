const mahasiswaModel = require('../models/mahasiswaModel');
const { validateMahasiswa } = require('../utils/validateMahasiswa');

function invalidId(id) {
    return !/^\d+$/.test(id) || Number(id) < 1;
}

function sendValidationError(res, errors) {
    return res.status(400).json({
        success: false,
        error: {
            code: 'VALIDATION_ERROR',
            message: 'Periksa kembali data yang dimasukkan.',
            details: errors
        }
    });
}

async function list(req, res) {
    const data = await mahasiswaModel.findAll(req.query.search || '');
    return res.status(200).json({ success: true, data });
}

async function getById(req, res) {
    if (invalidId(req.params.id)) {
        return res.status(400).json({
            success: false,
            error: { code: 'INVALID_ID', message: 'ID mahasiswa tidak valid.' }
        });
    }

    const data = await mahasiswaModel.findById(Number(req.params.id));
    if (!data) {
        return res.status(404).json({
            success: false,
            error: { code: 'NOT_FOUND', message: 'Mahasiswa tidak ditemukan.' }
        });
    }
    return res.status(200).json({ success: true, data });
}

async function create(req, res) {
    const { data, errors } = validateMahasiswa(req.body || {});
    if (Object.keys(errors).length) {
        return sendValidationError(res, errors);
    }

    const mahasiswa = await mahasiswaModel.create(data);
    return res.status(201).json({ success: true, data: mahasiswa });
}

async function update(req, res) {
    if (invalidId(req.params.id)) {
        return res.status(400).json({
            success: false,
            error: { code: 'INVALID_ID', message: 'ID mahasiswa tidak valid.' }
        });
    }

    const id = Number(req.params.id);
    if (!await mahasiswaModel.findById(id)) {
        return res.status(404).json({
            success: false,
            error: { code: 'NOT_FOUND', message: 'Mahasiswa tidak ditemukan.' }
        });
    }

    const { data, errors } = validateMahasiswa(req.body || {});
    if (Object.keys(errors).length) {
        return sendValidationError(res, errors);
    }

    const mahasiswa = await mahasiswaModel.update(id, data);
    if (!mahasiswa) {
        return res.status(404).json({
            success: false,
            error: { code: 'NOT_FOUND', message: 'Mahasiswa tidak ditemukan.' }
        });
    }
    return res.status(200).json({ success: true, data: mahasiswa });
}

async function remove(req, res) {
    if (invalidId(req.params.id)) {
        return res.status(400).json({
            success: false,
            error: { code: 'INVALID_ID', message: 'ID mahasiswa tidak valid.' }
        });
    }

    const removed = await mahasiswaModel.remove(Number(req.params.id));
    if (!removed) {
        return res.status(404).json({
            success: false,
            error: { code: 'NOT_FOUND', message: 'Mahasiswa tidak ditemukan.' }
        });
    }
    return res.status(200).json({ success: true, data: null });
}

module.exports = { list, getById, create, update, remove };