import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [ingatSaya, setIngatSaya] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi autentikasi berhasil
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-latar flex items-center justify-center font-poppins antialiased p-0 sm:p-4">
      <div className="w-full max-w-5xl min-h-[650px] bg-white sm:rounded-2xl shadow-xl border border-garis overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* SISI KIRI: Visual Branding / Ilustrasi (Aksen Soft Blue) */}
        <div className="hidden lg:flex lg:col-span-5 bg-soft-dark relative p-12 flex-col justify-between text-white">
          {/* Pola dekoratif gelombang laut tipis di latar belakang */}
          <div className="absolute inset-0 bg-gradient-to-b from-soft-button/30 to-soft-dark/90 z-10"></div>
          
          {/* Logo & Identitas */}
          <div className="relative z-20 flex items-center gap-3">
            <div className="w-9 h-9 bg-white text-soft-dark rounded-xl flex items-center justify-center font-poppins-extrabold text-base shadow-sm">
              P
            </div>
            <div>
              <h2 className="font-barlow font-bold text-sm tracking-wider leading-none">POLTEKSIM</h2>
              <p className="text-[10px] text-sky-200 tracking-widest mt-1 uppercase">Portal Akademik</p>
            </div>
          </div>

          {/* Slogan Tengah */}
          <div className="relative z-20 space-y-3">
            <span className="text-[10px] font-bold font-barlow text-soft-dark bg-white px-2.5 py-0.5 rounded-full tracking-wide inline-block uppercase">
              SIAKAD v2.0
            </span>
            <h1 className="text-xl font-poppins-extrabold leading-tight">
              Satu Akses untuk Seluruh Kegiatan Akademik Anda
            </h1>
            <p className="text-xs text-sky-100/90 leading-relaxed font-normal">
              Kelola rencana studi, jadwal perkuliahan, absensi, dan pantau perkembangan nilai mata kuliah dalam satu dashboard terintegrasi.
            </p>
          </div>

          {/* Footer Kiri */}
          <div className="relative z-20">
            <p className="text-[10px] text-sky-200/60 font-barlow">
              © 2026 Politeknik Kelautan & Perikanan.
            </p>
          </div>
        </div>

        {/* SISI KANAN: Form Login (Clean & High Fidelity UI) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center p-8 sm:p-16 bg-white">
          <div className="mb-8">
            <h2 className="text-2xl font-poppins-extrabold text-teks tracking-tight">Selamat Datang</h2>
            <p className="text-xs text-teks-samping mt-1.5 font-barlow">
              Silakan masukkan Nomor Induk Mahasiswa (NIM) dan kata sandi Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input NIM */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold font-barlow text-teks-samping uppercase tracking-wider">
                NIM / Nomor Induk Mahasiswa
              </label>
              <input 
                type="text" 
                required
                placeholder="Contoh: 22040101032"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="w-full px-4 py-3 bg-latar/40 border border-garis rounded-xl text-xs font-semibold text-teks focus:outline-none focus:border-soft-button focus:bg-white transition-all placeholder:text-teks-samping/40"
              />
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold font-barlow text-teks-samping uppercase tracking-wider">
                  Kata Sandi
                </label>
                <a href="#lupa-password" className="text-[11px] font-bold text-soft-button hover:underline font-barlow">
                  Lupa Kata Sandi?
                </a>
              </div>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-latar/40 border border-garis rounded-xl text-xs font-semibold text-teks focus:outline-none focus:border-soft-button focus:bg-white transition-all placeholder:text-teks-samping/40"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 py-1">
              <input 
                type="checkbox" 
                id="remember"
                checked={ingatSaya}
                onChange={(e) => setIngatSaya(e.target.checked)}
                className="w-4 h-4 rounded border-garis text-soft-button focus:ring-soft-light cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-teks-samping font-medium font-barlow select-none cursor-pointer">
                Ingat akun saya di perangkat ini
              </label>
            </div>

            {/* Button Sign In */}
            <button 
              type="submit"
              className="w-full bg-soft-button hover:bg-soft-dark text-white font-bold py-3.5 rounded-xl text-xs tracking-wide shadow-md hover:shadow-lg transition-all duration-200 mt-2 cursor-pointer"
            >
              Masuk ke Portal
            </button>
          </form>

          {/* Footer Form / Help Center */}
          <div className="mt-12 pt-5 border-t border-garis flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-teks-samping font-barlow">
            <p>Mengalami kendala login? <a href="#bantuan" className="text-soft-button font-bold hover:underline">Hubungi IT Helpdesk</a></p>
            <a href="#panduan" className="hover:text-teks font-medium">Unduh Panduan Pengguna</a>
          </div>
        </div>

      </div>
    </div>
  );
}