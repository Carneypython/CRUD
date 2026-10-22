import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDelete({ mahasiswa, onCancel, onConfirm, busy }) {
  if (!mahasiswa) return null;

  return (
    <div className="modal-backdrop-custom" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !busy) onCancel();
    }}>
      <section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
        <button className="icon-button dialog-close" type="button" onClick={onCancel} aria-label="Tutup" disabled={busy}>
          <X size={18} />
        </button>
        <div className="warning-mark"><AlertTriangle size={22} /></div>
        <p className="eyebrow">HAPUS DATA</p>
        <h2 id="delete-title">Hapus mahasiswa ini?</h2>
        <p className="dialog-copy"><strong>{mahasiswa.nama_mahasiswa}</strong> akan dihapus permanen dari daftar.</p>
        <div className="dialog-actions">
          <button className="btn btn-light action-secondary" type="button" onClick={onCancel} disabled={busy}>Batal</button>
          <button className="btn btn-danger action-danger" type="button" onClick={onConfirm} disabled={busy}>
            {busy ? 'Menghapus...' : 'Ya, hapus'}
          </button>
        </div>
      </section>
    </div>
  );
}