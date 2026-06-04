import React from 'react';

export default function Sidebar() {
  const menu = ["Dashboard Utama", "Rencana Studi (KRS)", "Riwayat Hasil (KHS)", "Data Absensi", "Administrasi UKT"];
  return (
    <aside className="w-64 bg-white border-r border-garis text-teks h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-garis flex items-center gap-3">
        <div className="w-9 h-9 bg-soft-button rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-xs">P</div>
        <span className="font-bold tracking-wider text-xs text-soft-dark">POLTEKSIM</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menu.map((m, i) => (
          <button key={i} className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${i === 0 ? 'bg-soft-light text-soft-dark' : 'text-teks-samping hover:bg-latar/50 hover:text-teks'}`}>
            {m}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-garis">
        <button className="w-full text-left px-4 py-2.5 text-soft-dark hover:bg-rose-50 rounded-lg text-xs font-bold transition-colors">
          🚪 Keluar Akun
        </button>
      </div>
    </aside>
  );
}