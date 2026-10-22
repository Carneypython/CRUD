import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, GraduationCap, Pencil, Plus, RefreshCw, Trash2, Users } from 'lucide-react';
import { deleteMahasiswa, getApiError, getMahasiswa } from '../api/mahasiswaApi';
import ConfirmDelete from '../components/ConfirmDelete';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';

export default function MahasiswaList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState('');

  async function loadRows(term = search) {
    setLoading(true);
    setError('');
    try {
      setRows(await getMahasiswa(term));
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => loadRows(search), 250);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 3200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (location.state?.notice) {
      setNotice(location.state.notice);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  async function confirmDelete() {
    setDeleting(true);
    try {
      await deleteMahasiswa(selected.id);
      setRows((currentRows) => currentRows.filter((row) => row.id !== selected.id));
      setNotice('Data mahasiswa berhasil dihapus.');
      setSelected(null);
    } catch (requestError) {
      setError(getApiError(requestError));
      setSelected(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="container app-container main-content">
      <div className="page-intro">
        <div>
          <p className="eyebrow">DATA AKADEMIK <span>/</span> REGISTRI</p>
          <h1>Data Mahasiswa</h1>
          <p className="page-subtitle">Kelola catatan mahasiswa dalam satu tempat.</p>
        </div>
        <Link to="/mahasiswa/tambah" className="btn btn-primary add-button">
          <Plus size={18} strokeWidth={2.5} />
          <span>Tambah mahasiswa</span>
        </Link>
      </div>

      {notice && <div className="notice-toast" role="status">{notice}</div>}

      <section className="list-section" aria-label="Daftar mahasiswa">
        <div className="list-toolbar">
          <div className="list-meta">
            <span className="list-icon"><Users size={18} /></span>
            <span className="result-count">{loading ? '...' : rows.length}</span>
            <span className="result-label">mahasiswa</span>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {error ? (
          <div className="state-panel error-panel" role="alert">
            <p>{error}</p>
            <button className="btn btn-outline-dark retry-button" type="button" onClick={() => loadRows()}>
              <RefreshCw size={15} /> Coba lagi
            </button>
          </div>
        ) : loading ? <Loading /> : rows.length === 0 ? (
          <div className="state-panel empty-panel">
            <span className="empty-mark"><GraduationCap size={25} /></span>
            <h2>{search ? 'Tidak ada hasil' : 'Belum ada data mahasiswa'}</h2>
            <p>{search ? 'Coba kata kunci lain.' : 'Mulai dengan menambahkan catatan mahasiswa pertama.'}</p>
            {!search && <Link to="/mahasiswa/tambah" className="text-link">Tambah mahasiswa <ArrowUpRight size={15} /></Link>}
          </div>
        ) : (
          <div className="table-responsive data-table-wrap">
            <table className="table align-middle data-table">
              <thead>
                <tr>
                  <th scope="col">Kode mahasiswa</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Jurusan</th>
                  <th scope="col">Tanggal lahir</th>
                  <th scope="col" className="text-end">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td><span className="student-code">{row.kode_mahasiswa}</span></td>
                    <td>
                      <div className="student-name">{row.nama_mahasiswa}</div>
                      <div className="student-address">{row.alamat_mahasiswa}</div>
                    </td>
                    <td><span className="major-label">{row.jurusan_mahasiswa}</span></td>
                    <td className="birth-date">{row.tanggal_lahir}</td>
                    <td>
                      <div className="row-actions">
                        <Link className="icon-button" to={`/mahasiswa/${row.id}/edit`} aria-label={`Edit ${row.nama_mahasiswa}`} title="Edit">
                          <Pencil size={16} />
                        </Link>
                        <button className="icon-button delete-action" type="button" onClick={() => setSelected(row)} aria-label={`Hapus ${row.nama_mahasiswa}`} title="Hapus">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <footer className="page-footer"><span>RUANGDATA</span><span>Data mahasiswa <span className="footer-separator">·</span> {new Date().getFullYear()}</span></footer>
      <ConfirmDelete mahasiswa={selected} onCancel={() => setSelected(null)} onConfirm={confirmDelete} busy={deleting} />
    </main>
  );
}