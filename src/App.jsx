import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("./pages/auth/Login"));
const DashboardUtama = lazy(() => import("./pages/mahasiswa/DashboardUtama"));
const KHS = lazy(() => import("./pages/mahasiswa/KHS"));
const Absensi = lazy(() => import("./pages/mahasiswa/Absensi"));
const DosenDashboard = lazy(() => import("./pages/Dosen/Dashboard"));
const DosenNilai = lazy(() => import("./pages/Dosen/Nilai"));
const DosenJadwal = lazy(() => import("./pages/Dosen/Jadwal"));
const DosenAbsensi = lazy(() => import("./pages/Dosen/Absensi"));
const DosenLayout = lazy(() => import("./layouts/Dosen/DosenLayout"));

const PageLoader = () => (
  <div className="flex min-h-screen bg-latar items-center justify-center font-poppins">
    <div className="flex flex-col items-center gap-3">
      {/* Spinner Animasi Loader */}
      <div className="w-10 h-10 border-4 border-soft-light border-t-soft-button rounded-full animate-spin"></div>
      <p className="text-xs font-bold text-teks-samping tracking-wider uppercase font-barlow">
        Memuat Halaman...
      </p>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Jalur URL Login */}
          <Route path="/login" element={<Login />} />

          {/* Jalur URL Dashboard Mahasiswa */}
          <Route path="/mahasiswa" element={<DashboardUtama />} />
          <Route path="/mahasiswa/khs" element={<KHS />} />
          <Route path="/mahasiswa/presensi" element={<Absensi />} />

          {/* Jalur URL Dashboard Dosen */}
          <Route element={<DosenLayout />}>
            <Route path="/dosen" element={<DosenDashboard />} />
            <Route path="/dosen/absensi" element={<DosenAbsensi />} />
            <Route path="/dosen/nilai" element={<DosenNilai />} />
            <Route path="/dosen/jadwal" element={<DosenJadwal />} />
          </Route>

          {/* Jika mengetik URL asal / kosong, otomatis diarahkan ke /login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
