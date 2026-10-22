# RuangData — CRUD Data Mahasiswa

Aplikasi web untuk mengelola data mahasiswa melalui antarmuka React dan REST API berbasis Express.js yang terhubung ke MySQL. Repository ini memisahkan kode frontend dan backend agar pengembangan serta pemeliharaan lebih terstruktur.

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" />
  <img alt="MySQL" src="https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white" />
  <img alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" />
</p>

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Struktur Proyek](#struktur-proyek)
- [Persyaratan](#persyaratan)
- [Instalasi dan Menjalankan Aplikasi](#instalasi-dan-menjalankan-aplikasi)
- [Struktur Database](#struktur-database)
- [Dokumentasi REST API](#dokumentasi-rest-api)
- [Validasi dan Penanganan Error](#validasi-dan-penanganan-error)
- [Troubleshooting](#troubleshooting)
- [Pengembangan Selanjutnya](#pengembangan-selanjutnya)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Tentang Proyek

**RuangData — CRUD Data Mahasiswa** adalah aplikasi full-stack untuk melakukan pengelolaan data mahasiswa. Data disimpan di MySQL, backend menyediakan REST API, dan frontend React digunakan untuk menampilkan serta mengubah data melalui browser.

Struktur repository dibagi menjadi dua bagian utama:

- **`frontend/`** — antarmuka pengguna yang dibangun dengan React dan Vite.
- **`backend/`** — REST API menggunakan Node.js, Express.js, dan MySQL2.

Aplikasi dirancang untuk kebutuhan pembelajaran dan pengembangan CRUD (Create, Read, Update, Delete) dengan pemisahan tanggung jawab antara tampilan, endpoint, validasi, dan akses database.

## Fitur

- **Daftar mahasiswa**  menampilkan data dari database.
- **Tambah mahasiswa**  menyimpan data mahasiswa baru.
- **Edit mahasiswa** mengambil data berdasarkan ID lalu memperbaruinya.
- **Hapus mahasiswa** menampilkan konfirmasi sebelum penghapusan.
- **Pencarian** mencari berdasarkan kode, nama, alamat, atau jurusan; pencarian dilakukan saat pengguna mengetik.
- **Validasi input**  memastikan kolom wajib terisi, membatasi panjang beberapa nilai, memeriksa format tanggal, dan mencegah tanggal lahir di masa depan.
- **Pencegahan kode ganda**  `kode_mahasiswa` harus uniq dengan 4 digit.
- **Status antarmuka** indikator loading, pesan sukses, keadaan data kosong, dan pesan kesalahan.
- **Endpoint health check**  memeriksa apakah backend merespons.

## Teknologi

| Bagian | Teknologi | Penggunaan |
|---|---|---|
| Frontend | React 19, Vite 6 | Membangun antarmuka dan menjalankan server pengembangan |
| Routing | React Router DOM | Navigasi halaman daftar, tambah, dan edit |
| HTTP client | Axios | Mengirim request ke REST API |
| UI | Bootstrap 5, CSS khusus | Komponen dasar dan styling antarmuka |
| Ikon | Lucide React | Ikon pada navigasi dan tombol |
| Backend | Node.js, Express.js 5 | Menyediakan REST API |
| Database driver | MySQL2 | Menghubungkan backend dengan MySQL menggunakan promise API |
| Konfigurasi | dotenv | Membaca variabel lingkungan dari file `.env` |
| Middleware | CORS, Express JSON | Mengatur akses lintas origin dan parsing JSON |
| Database | MySQL | Menyimpan data mahasiswa |

## Struktur Proyek

```text
CRUD/
├── backend/
│   ├── database/
│   │   └── schema.sql
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── mahasiswaController.js
│   │   ├── middlewares/
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   └── mahasiswaModel.js
│   │   ├── routes/
│   │   │   └── mahasiswaRoutes.js
│   │   ├── utils/
│   │   │   └── validateMahasiswa.js
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── mahasiswaApi.js
│   │   ├── components/
│   │   │   ├── ConfirmDelete.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── pages/
│   │   │   ├── MahasiswaForm.jsx
│   │   │   └── MahasiswaList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── package-lock.json
└── .gitignore
```

**Ringkasan backend:** routes memetakan endpoint, controllers mengatur alur request dan response, models menjalankan query database, `validateMahasiswa.js` memvalidasi input, dan `errorHandler.js` menyeragamkan respons error.

## Persyaratan

Pastikan perangkat sudah memiliki:

- Node.js 18 atau versi lebih baru dan npm.
- MySQL Server yang aktif. Contohnya, MySQL dari Laragon atau XAMPP.
- Git untuk mengambil repository.
- Browser modern.
- MySQL Workbench bersifat opsional dan dapat digunakan sebagai client untuk menjalankan SQL serta memeriksa database; Workbench bukan server database.

## Instalasi dan Menjalankan Aplikasi

### 1. Clone repository

```bash
git clone https://github.com/Carneypython/CRUD.git
cd CRUD
```

### 2. Siapkan database

Jalankan layanan MySQL terlebih dahulu. Kemudian buka MySQL Workbench atau client SQL pilihan Anda, lalu jalankan isi file [`backend/database/schema.sql`](backend/database/schema.sql).

File tersebut membuat database `crud_mahasiswa` dan tabel `mahasiswa`. Jika database atau tabel sudah ada, perintah `IF NOT EXISTS` akan mempertahankannya.

### 3. Konfigurasikan backend

Buka terminal pertama dan masuk ke folder backend:

```bash
cd backend
npm install
```

Buat file **`backend/.env`**. Repository tidak menyediakan file `.env` berisi kredensial; isi file lokal ini sesuai pengaturan MySQL di komputer Anda:

```dotenv
PORT=3000
FRONTEND_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=crud_mahasiswa
```

Ganti `DB_PORT`, `DB_USER`, dan `DB_PASSWORD` apabila konfigurasi MySQL Anda berbeda. Kosongkan `DB_PASSWORD` hanya jika akun MySQL yang digunakan memang tidak memakai password. Jangan commit file `.env` ke Git.

Jalankan backend:

```bash
npm run dev
```

Script tersebut menjalankan `nodemon server.js`. Backend akan mencoba membuat koneksi ke MySQL terlebih dahulu, lalu mendengarkan pada `http://localhost:3000` apabila koneksi berhasil.

Periksa health check melalui browser atau API client:

```text
http://localhost:3000/api/health
```

Respons yang diharapkan:

```json
{
  "status": "ok",
  "message": "Backend CRUD Mahasiswa berjalan"
}
```

### 4. Konfigurasikan dan jalankan frontend

Buka terminal kedua dari root repository:

```bash
cd frontend
npm install
```

Buat file lokal `.env` berdasarkan `.env.example`. Di PowerShell Windows, gunakan:

```powershell
Copy-Item .env.example .env
```

Pastikan isi `frontend/.env` memuat URL berikut:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

Jalankan Vite:

```bash
npm run dev
```

Buka alamat yang ditampilkan oleh Vite :

```text
http://localhost:5173
```

**Penting:** jalankan frontend dan backend di dua terminal terpisah. Jika nilai file `.env` frontend diubah ketika Vite sedang berjalan, mulai ulang server Vite agar konfigurasi terbaca kembali.

## Struktur Database

Database yang digunakan adalah `crud_mahasiswa`, dengan tabel `mahasiswa`.

| Kolom | Tipe | Aturan / Keterangan |
|---|---|---|
| `id` | `INT UNSIGNED` | Primary key, auto increment |
| `kode_mahasiswa` | `VARCHAR(20)` | Wajib diisi dan unik |
| `nama_mahasiswa` | `VARCHAR(100)` | Wajib diisi |
| `alamat_mahasiswa` | `TEXT` | Wajib diisi |
| `tanggal_lahir` | `DATE` | Wajib diisi; tidak boleh di masa depan melalui validasi aplikasi |
| `jurusan_mahasiswa` | `VARCHAR(100)` | Wajib diisi |
| `created_at` | `TIMESTAMP` | Otomatis berisi waktu pembuatan data |
| `updated_at` | `TIMESTAMP` | Otomatis diperbarui saat record diubah |

Untuk menguji isi tabel melalui client SQL:

```sql
USE crud_mahasiswa;
SELECT * FROM mahasiswa ORDER BY id DESC;
```

## Dokumentasi REST API

Base URL lokal:

```text
http://localhost:3000/api
```

### Endpoint

| Method | Endpoint | Kegunaan | Respons sukses |
|---|---|---|---|
| `GET` | `/health` | Memeriksa status backend | `200 OK` |
| `GET` | `/mahasiswa` | Mengambil semua mahasiswa | `200 OK` |
| `GET` | `/mahasiswa?search=andi` | Mencari mahasiswa berdasarkan kata kunci | `200 OK` |
| `GET` | `/mahasiswa/:id` | Mengambil satu mahasiswa berdasarkan ID | `200 OK` |
| `POST` | `/mahasiswa` | Menambahkan mahasiswa | `201 Created` |
| `PUT` | `/mahasiswa/:id` | Memperbarui data mahasiswa | `200 OK` |
| `DELETE` | `/mahasiswa/:id` | Menghapus data mahasiswa | `200 OK` |

### Field request

Endpoint `POST /mahasiswa` dan `PUT /mahasiswa/:id` menerima JSON dengan semua field berikut:

```json
{
  "kode_mahasiswa": "2024001",
  "nama_mahasiswa": "Andi Pratama",
  "alamat_mahasiswa": "Jl. Melati No. 10",
  "tanggal_lahir": "2004-05-12",
  "jurusan_mahasiswa": "Teknik Informatika"
}
```

Gunakan format tanggal `YYYY-MM-DD`. Semua field pada contoh tersebut wajib diisi. Kode mahasiswa harus unik.

### Contoh request dengan cURL

Mengambil daftar data:

```bash
curl http://localhost:3000/api/mahasiswa
```

Melakukan pencarian:

```bash
curl "http://localhost:3000/api/mahasiswa?search=andi"
```

Menambahkan data:

```bash
curl -X POST http://localhost:3000/api/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{"kode_mahasiswa":"2024001","nama_mahasiswa":"Andi Pratama","alamat_mahasiswa":"Jl. Melati No. 10","tanggal_lahir":"2004-05-12","jurusan_mahasiswa":"Teknik Informatika"}'
```

Contoh format respons sukses untuk daftar data:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "kode_mahasiswa": "2024001",
      "nama_mahasiswa": "Andi Pratama",
      "alamat_mahasiswa": "Jl. Melati No. 10",
      "tanggal_lahir": "2004-05-12",
      "jurusan_mahasiswa": "Teknik Informatika",
      "created_at": "2026-10-23T00:00:00.000Z",
      "updated_at": "2026-10-23T00:00:00.000Z"
    }
  ]
}
```

Nilai dan format timestamp dalam contoh di atas hanya ilustrasi; hasil aktual mengikuti data dan konfigurasi MySQL Anda.

### Format respons error

Backend mengembalikan error dalam struktur berikut:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Periksa kembali data yang dimasukkan.",
    "details": {
      "nama_mahasiswa": "Wajib diisi."
    }
  }
}
```

`details` disertakan oleh validasi input; error lain dapat memiliki struktur yang lebih ringkas sesuai jenis masalahnya.

## Validasi dan Penanganan Error

Backend menerapkan pemeriksaan berikut:

- Semua field mahasiswa wajib diisi.
- `kode_mahasiswa` maksimal 20 karakter.
- `nama_mahasiswa` dan `jurusan_mahasiswa` maksimal 100 karakter.
- Tanggal lahir harus berupa tanggal kalender valid dengan format `YYYY-MM-DD` dan tidak boleh melewati tanggal hari ini.
- ID pada endpoint detail, edit, dan hapus harus berupa angka positif.
- Kode mahasiswa yang sudah digunakan menghasilkan status `409 Conflict`.
- ID yang tidak ditemukan menghasilkan `404 Not Found`; input tidak valid umumnya menghasilkan `400 Bad Request`.

## Troubleshooting

| Kendala | Yang perlu diperiksa |
|---|---|
| `ECONNREFUSED` di frontend | Pastikan backend aktif di port `3000` dan endpoint `/api/health` dapat dibuka. |
| Koneksi MySQL gagal saat backend mulai | Pastikan MySQL sedang berjalan dan nilai `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, serta `DB_NAME` pada `backend/.env` sesuai. |
| `Unknown database 'crud_mahasiswa'` | Jalankan SQL dari `backend/database/schema.sql`. |
| `Access denied for user` | Periksa username/password MySQL; jangan langsung mengganti kredensial server tanpa memahami konfigurasi lokal. |
| Error CORS | Pastikan `FRONTEND_URL` cocok dengan origin frontend, biasanya `http://localhost:5173`. |
| Kode mahasiswa sudah dipakai | Gunakan `kode_mahasiswa` yang belum terdaftar karena kolom ini unik. |
| Tampilan tidak memakai `VITE_API_URL` terbaru | Mulai ulang server frontend setelah mengubah file `.env`. |

## Pengembangan Selanjutnya

Beberapa peningkatan yang dapat dipertimbangkan untuk versi berikutnya:

- Menambahkan pengujian otomatis untuk endpoint dan validasi.
- Menambahkan pagination jika jumlah data semakin besar.
- Menambahkan dokumentasi API interaktif.
- Menyediakan konfigurasi deployment untuk frontend, backend, dan database.
- Menambahkan screenshot aplikasi setelah tersedia.

Daftar ini merupakan usulan pengembangan, bukan klaim bahwa fitur-fitur tersebut sudah diterapkan.

