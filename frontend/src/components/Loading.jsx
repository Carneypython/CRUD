export default function Loading() {
  return (
    <div className="loading-state" role="status">
      <span className="spinner-border spinner-border-sm" aria-hidden="true" />
      <span>Memuat data mahasiswa</span>
    </div>
  );
}