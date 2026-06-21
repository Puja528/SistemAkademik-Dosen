import React from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineBell } from "react-icons/ai";

const Navbar = () => {
  const location = useLocation();

  const dapatkanJudulHalaman = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return "Dashboard";
      case "/admin/mahasiswa":
        return "Data Mahasiswa";
      case "/admin/dosen":
        return "Data Dosen"; 
      case "/admin/jadwal":
        return "Kelola Jadwal";
      case "/admin/nilai":
        return "Publikasi Nilai";
      default:
        return "POLTEKSIM PORTAL";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-10 w-full h-16 shrink-0 font-sans">
      
      {/* JUDUL HALAMAN: Diubah ke text-[15px] dan font-medium agar kecil & tipis sesuai gambar */}
      <h1 className="text-[15px] font-medium text-slate-800 tracking-wide"> 
        {dapatkanJudulHalaman()}
      </h1>
      
      <div className="flex items-center gap-4">
        {/* Notifikasi Bell */}
        <button type="button" className="relative text-gray-400 hover:text-[#1a3a6b] transition cursor-pointer">
          <AiOutlineBell className="text-lg" />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 w-1.5 h-1.5 rounded-full"></span>
        </button>
        
        {/* Profil Admin */}
        <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
          <div className="w-8 h-8 rounded-full bg-[#f0f4f8] text-[#1a3a6b] flex items-center justify-center font-bold text-xs tracking-wider">
            AU
          </div>
          <div className="text-left hidden md:block leading-tight">
            <p className="text-xs font-bold text-gray-800">Admin</p>
            <p className="text-[10px] text-gray-400 font-medium">System Administrator</p>
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default Navbar;