import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getMahasiswa = (search = '') =>
  api.get('/mahasiswa', { params: search ? { search } : {} }).then(({ data }) => data.data);

export const getMahasiswaById = (id) =>
  api.get(`/mahasiswa/${id}`).then(({ data }) => data.data);

export const createMahasiswa = (payload) =>
  api.post('/mahasiswa', payload).then(({ data }) => data.data);

export const updateMahasiswa = (id, payload) =>
  api.put(`/mahasiswa/${id}`, payload).then(({ data }) => data.data);

export const deleteMahasiswa = (id) => api.delete(`/mahasiswa/${id}`);

export function getApiError(error) {
  return error.response?.data?.error?.message || 'Tidak dapat menghubungi server. Coba lagi.';
}