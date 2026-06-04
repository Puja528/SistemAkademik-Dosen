import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register'; // 🔥 Import halaman register baru
// import DashboardUtama from './pages/mahasiswa/DashboardUtama';
import Dashboard from './pages/Dosen/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Jalur URL Login */}
        {/* <Route path="/login" element={<Login />} /> */}
        
        {/* Jalur URL Register */}
        {/* <Route path="/register" element={<Register />} /> */}
        
        {/* Jalur URL Dashboard Dosen */}
        <Route path="/Dosen" element={<Dashboard />} />

        {/* Jika mengetik URL asal / kosong, otomatis diarahkan ke /login */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}