import React from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineBell } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

export default function Header({ toggleSidebar }) {
  const location = useLocation();

  // Menyelaraskan teks judul halaman dengan rute menu mahasiswa Anda
  const dapatkanJudulHalaman = () => {
    switch (location.pathname) {
      case "/mahasiswa":
      case "/mahasiswa/dashboard":
        return "Dashboard Utama";
      case "/mahasiswa/presensi":
        return "Presensi";
      case "/mahasiswa/khs":
        return "Kartu Hasil Studi (KHS)";
      case "/mahasiswa/transkrip":
        return "Transkrip Nilai";
      default:
        return "POLTEKSIM PORTAL";
    }
  };

  // ── DATA BACKEND: Mengambil data akun yang sedang login dari local session ──
  const localSession = localStorage.getItem("siakad_session");
  const userLogin = localSession ? JSON.parse(localSession) : null;

  const namaUserReal = userLogin?.nama || "Mahasiswa";

  // Mengambil 3 huruf inisial avatar
  const inisialAvatar = namaUserReal.substring(0, 3).toUpperCase();

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-10 w-full h-16 shrink-0 font-sans">
      {/* SISI KIRI: Tombol Hamburger & Judul Halaman Dinamis */}
      <div className="flex items-center gap-3">
        {/* Tombol Hamburger: Muncul otomatis di layar HP */}
        <button
          onClick={toggleSidebar}
          type="button"
          className="p-1.5 text-slate-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer md:hidden flex-shrink-0"
          aria-label="Open Menu"
        >
          <FiMenu size={18} />
        </button>

        {/* JUDUL HALAMAN: Menggunakan font-medium text-[15px] seperti struktur Admin & Dosen */}
        <h1 className="text-[14px] md:text-[15px] font-medium text-slate-800 tracking-wide truncate max-w-[150px] sm:max-w-none m-0">
          {dapatkanJudulHalaman()}
        </h1>
      </div>

      {/* SISI KANAN: Panel Notifikasi & Profil Mahasiswa */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Notifikasi Bell */}
        <button
          type="button"
          className="relative text-gray-400 hover:text-[#1a3a6b] transition-colors cursor-pointer p-1"
        >
          <AiOutlineBell className="text-lg" />
          <span className="absolute top-1 right-1 bg-red-500 w-1.5 h-1.5 rounded-full"></span>
        </button>

        {/* Profil Akun */}
        <div className="flex items-center gap-2 md:gap-3 border-l border-gray-200 pl-3 md:pl-4">
          <div className="w-8 h-8 rounded-full bg-[#f0f4f8] text-[#1a3a6b] flex items-center justify-center font-bold text-xs tracking-wider flex-shrink-0 shadow-sm">
            {inisialAvatar}
          </div>

          {/* Detail Nama: Disembunyikan di layar smartphone kecil agar tidak sesak */}
          <div className="hidden md:block text-left leading-tight">
            <p className="text-xs font-bold text-gray-800 m-0 mt-0.5">
              {namaUserReal}
            <p className="text-[9px] text-slate-400 uppercase font-medium tracking-wider m-0">Computer Sciences Student</p>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
