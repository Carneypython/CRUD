import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-control">
      <Search size={18} aria-hidden="true" />
      <span className="visually-hidden">Cari mahasiswa</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari kode, nama, alamat, atau jurusan"
      />
      {value && (
        <button className="icon-button search-clear" type="button" onClick={() => onChange('')} aria-label="Hapus pencarian">
          <X size={16} />
        </button>
      )}
    </label>
  );
}