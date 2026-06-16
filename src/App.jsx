import "./assets/tailwind.css";
import React, { lazy, Suspense } from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const MainLayouts = lazy(() => import("./layouts/MainLayouts"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Loading = lazy(() => import("./components/Loading"));
const MasterData = lazy(() => import("./pages/admin/mahasiswa/MasterMahasiswa"));
const MasterDosen = lazy(() => import("./pages/admin/dosen/MasterDosen"));
const OperasiAkademik = lazy(() => import("./pages/admin/jadwal/OperasiAkademik"));
const PublikasiNilai = lazy(() => import("./pages/admin/nilai/PublikasiNilai"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Admin */}
          <Route path="/admin" element={<MainLayouts />}>
            <Route path="dashboard" element={<Dashboard />} />          
            <Route path="mahasiswa" element={<MasterData />} />
            <Route path="dosen" element={<MasterDosen />} />
            <Route path="jadwal" element={<OperasiAkademik />} />
            <Route path="nilai" element={<PublikasiNilai />} />
            
          </Route>
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;