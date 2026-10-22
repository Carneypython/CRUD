import { useEffect, useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createMahasiswa, getApiError, getMahasiswaById, updateMahasiswa } from '../api/mahasiswaApi';
import Loading from '../components/Loading';

const emptyForm = {
  kode_mahasiswa: '',
  nama_mahasiswa: '',
  alamat_mahasiswa: '',
  tanggal_lahir: '',
  jurusan_mahasiswa: '',
};

function currentDate() {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
}

export default function MahasiswaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!editing) return undefined;
    let active = true;
    getMahasiswaById(id)
      .then((data) => { if (active) setForm(data); })
      .catch((requestError) => { if (active) setError(getApiError(requestError)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [editing, id]);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) await updateMahasiswa(id, form);
      else await createMahasiswa(form);
      navigate('/', { state: { notice: editing ? 'Perubahan data berhasil disimpan.' : 'Mahasiswa berhasil ditambahkan.' } });
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="container app-container form-main"><Loading /></main>;

  return (
    <main className="container app-container form-main">
      <Link to="/" className="back-link"><ArrowLeft size={16} /> Kembali ke daftar</Link>
      <div className="form-heading">
        <p className="eyebrow">DATA AKADEMIK <span>/</span> {editing ? 'PEMBARUAN' : 'ENTRI BARU'}</p>
        <h1>{editing ? 'Edit mahasiswa' : 'Tambah mahasiswa'}</h1>
        <p className="page-subtitle">Lengkapi informasi mahasiswa di bawah ini.</p>
      </div>

      {error && <div className="form-error" role="alert">{error}</div>}

      <form className="student-form" onSubmit={submit}>
        <div className="form-section-heading"><span>01</span><div><h2>Informasi mahasiswa</h2><p>Identitas dan program studi</p></div></div>
        <div className="form-grid">
          <div className="field-group">
            <label htmlFor="kode_mahasiswa">Kode mahasiswa <span>*</span></label>
            <input id="kode_mahasiswa" name="kode_mahasiswa" value={form.kode_mahasiswa} onChange={updateField} maxLength={20} required placeholder="Contoh: 2024001" />
          </div>
          <div className="field-group">
            <label htmlFor="nama_mahasiswa">Nama lengkap <span>*</span></label>
            <input id="nama_mahasiswa" name="nama_mahasiswa" value={form.nama_mahasiswa} onChange={updateField} maxLength={100} required placeholder="Nama sesuai identitas" />
          </div>
          <div className="field-group">
            <label htmlFor="jurusan_mahasiswa">Jurusan <span>*</span></label>
            <input id="jurusan_mahasiswa" name="jurusan_mahasiswa" value={form.jurusan_mahasiswa} onChange={updateField} maxLength={100} required placeholder="Contoh: Teknik Informatika" />
          </div>
          <div className="field-group">
            <label htmlFor="tanggal_lahir">Tanggal lahir <span>*</span></label>
            <input id="tanggal_lahir" name="tanggal_lahir" type="date" value={form.tanggal_lahir?.slice(0, 10) || ''} onChange={updateField} max={currentDate()} required />
          </div>
          <div className="field-group field-full">
            <label htmlFor="alamat_mahasiswa">Alamat <span>*</span></label>
            <textarea id="alamat_mahasiswa" name="alamat_mahasiswa" value={form.alamat_mahasiswa} onChange={updateField} rows={3} required placeholder="Alamat tempat tinggal mahasiswa" />
          </div>
        </div>
        <div className="form-actions">
          <Link className="btn btn-light action-secondary" to="/">Batal</Link>
          <button className="btn btn-primary save-button" type="submit" disabled={saving}>
            <Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan data'}
          </button>
        </div>
      </form>
    </main>
  );
}