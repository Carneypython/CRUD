import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container app-container header-content">
        <Link className="brand" to="/" aria-label="Data Mahasiswa, beranda">
          <span className="brand-mark"><GraduationCap size={20} strokeWidth={2.2} /></span>
          <span className="brand-name">Ruang<span>Data</span></span>
        </Link>
        <div className="header-context">
          <span className="header-dot" />
          Administrasi akademik
        </div>
      </div>
    </header>
  );
}