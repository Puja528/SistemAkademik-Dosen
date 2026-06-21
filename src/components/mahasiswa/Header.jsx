import React from 'react';

export default function Header() {
  // ── DATA BACKEND: Mengambil data akun yang sedang login dari local session ──
  const localSession = localStorage.getItem("siakad_session");
  const userLogin = localSession ? JSON.parse(localSession) : null;
  
  const namaUserReal = userLogin?.nama || "Mahasiswa";
  const emailUserReal = userLogin?.email || "mahasiswa@polteksim.ac.id";
  
  // Mengambil 3 huruf inisial avatar agar seragam dengan struktur 'DJS' di admin (contoh: Kiki -> KIK)
  const inisialAvatar = namaUserReal.substring(0, 3).toUpperCase();

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 gap-4 font-sans flex-shrink-0 text-[10px]">
      
      {/* Sisi Kiri: Ucapan Selamat Datang (Font Diperkecil) */}
      <div>
        <p className="text-[9px] text-slate-400 uppercase font-medium tracking-wider m-0">Selamat Datang Kembali</p>
        <h1 className="font-bold text-slate-900 text-[11px] m-0 uppercase tracking-wide mt-0.5">{namaUserReal}</h1>
      </div>

      {/* Sisi Kanan: Panel Profil User */}
      <div className="flex items-center gap-3">
        
        {/* Detail Akun & Role (Font Diperkecil) */}
        <div className="text-right leading-none flex flex-col gap-0.5">
          <p className="text-[11px] font-bold text-slate-800 m-0 tracking-wide">{emailUserReal}</p>
          <p className="text-[9px] font-semibold text-slate-400 m-0 tracking-wider uppercase">
            {userLogin?.role || "Mahasiswa"}
          </p>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Avatar Dinamis: Ukuran disesuaikan agar seimbang dengan teks yang mengecil */}
        <div className="w-7 h-7 rounded-md bg-[#1a3a6b] flex items-center justify-center text-white text-[10px] font-black tracking-wider flex-shrink-0 shadow-xs">
          {inisialAvatar}
        </div>
        
      </div>
    </header>
  );
}