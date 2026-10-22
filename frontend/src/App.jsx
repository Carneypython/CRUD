import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MahasiswaForm from './pages/MahasiswaForm';
import MahasiswaList from './pages/MahasiswaList';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MahasiswaList />} />
        <Route path="/mahasiswa/tambah" element={<MahasiswaForm />} />
        <Route path="/mahasiswa/:id/edit" element={<MahasiswaForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}