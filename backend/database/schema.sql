CREATE DATABASE IF NOT EXISTS crud_mahasiswa
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE crud_mahasiswa;

CREATE TABLE IF NOT EXISTS mahasiswa (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT ,
    kode_mahasiswa VARCHAR(20) NOT NULL,
    nama_mahasiswa VARCHAR(100) NOT NULL,
    alamat_mahasiswa TEXT NOT NULL,
    tanggal_lahir DATE NOT NULL,
    jurusan_mahasiswa VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_mahasiswa_kode (kode_mahasiswa)
);