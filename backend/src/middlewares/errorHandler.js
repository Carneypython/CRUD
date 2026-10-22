function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }

    if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            error: { code: 'DUPLICATE_CODE', message: 'Kode mahasiswa sudah digunakan.' }
        });
    }

    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({
            success: false,
            error: { code: 'INVALID_JSON', message: 'Format JSON tidak valid.' }
        });
    }

    console.error(error);
    return res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Terjadi kesalahan pada server.' }
    });
}

module.exports = errorHandler;