import React from 'react';
import Sidebar from '../../components/mahasiswa/Sidebar';
import Header from '../../components/mahasiswa/Header';
import data from '../../data/mahasiswa/dashboardData.json';

export default function DashboardUtama() {
  // Pengaman ekstra jika objek root json kosong atau salah format
  const mahasiswa = data?.mahasiswa || {};
  
  // Mencari array jadwal (mengantisipasi jika namanya 'jadwal' atau 'jadwalHariIni')
  const jadwal = data?.jadwal || data?.jadwalHariIni || [];
  
  // Mencari array pengumuman
  const pengumuman = data?.pengumuman || [];

  return (
    <div className="flex min-h-screen bg-latar font-poppins text-teks">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* ringkasan akademik */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "IPK Kumulatif", val: mahasiswa?.ipk || "3.74", icon: "📈", desc: "Target: 4.0" },
              { label: "SKS Selesai", val: mahasiswa?.sks || "78", icon: "🎓", desc: "Sisa: 66 SKS" },
              { label: "Rata-rata Presensi", val: mahasiswa?.kehadiran || "96.5%", icon: "🌊", desc: "Semester ini" },
              { label: "Semester", val: mahasiswa?.semester || "4", icon: "📅", desc: "Tahun Ajaran 24/25" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-garis shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-barlow font-bold uppercase tracking-widest text-teks-samping">
                    {item.label}
                  </span>
                  <div className="w-10 h-10 bg-soft-light text-soft-dark rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-poppins-extrabold text-soft-dark mb-1">
                  {item.val}
                </h3>
                <p className="text-[10px] font-medium text-teks-samping font-barlow italic">
                  {item.desc}
                </p>
              </div>
            ))}
          </section>

          {/* detail jadwal & pengumuman */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* jadwal kuliah */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-poppins-extrabold text-teks text-lg flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-soft-button rounded-full"></span>
                  Jadwal Perkuliahan Hari Ini
                </h2>
              </div>

              <div className="grid gap-4">
                {jadwal.length > 0 ? (
                  jadwal.map((j) => (
                    <div 
                      key={j.id} 
                      className="bg-white p-5 rounded-2xl border border-garis flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-soft-button/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-soft-light px-3 py-2 rounded-xl text-center min-w-[70px]">
                          <p className="text-[10px] font-bold text-soft-dark font-barlow uppercase leading-none">Jam</p>
                          <p className="text-xs font-poppins-extrabold text-soft-button mt-1">{j.jam}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-teks leading-tight mb-1">{j.mk}</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-teks-samping font-medium font-barlow">
                            <span>👤 {j.dosen || "Dosen Pengampu"}</span>
                            <span className="text-soft-dark">📍 {j.ruang}</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full md:w-auto px-5 py-2 bg-latar hover:bg-soft-light text-soft-dark border border-garis rounded-lg text-[10px] font-bold font-barlow transition-colors uppercase tracking-wider cursor-pointer">
                        Absensi Online
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="bg-white border border-garis border-dashed rounded-2xl py-12 text-center">
                    <p className="text-xs text-teks-samping font-medium">Tidak ada jadwal kuliah yang terdaftar hari ini.</p>
                  </div>
                )}
              </div>
            </div>

            {/* warta pengumuman */}
            <div className="space-y-4">
              <h2 className="font-poppins-extrabold text-teks text-lg flex items-center gap-3 mb-2">
                <span className="w-1.5 h-6 bg-kuning rounded-full"></span>
                Warta Pengumuman
              </h2>

              <div className="bg-white rounded-2xl border border-garis overflow-hidden shadow-sm">
                <div className="p-2">
                  {pengumuman.length > 0 ? (
                    pengumuman.map((p, idx) => (
                      <div 
                        key={p.id} 
                        className={`p-4 hover:bg-latar transition-colors rounded-xl ${
                          idx !== pengumuman.length - 1 ? 'border-b border-garis' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[9px] font-poppins-extrabold px-2 py-0.5 rounded-sm tracking-wide uppercase ${
                            p.tipe === 'Penting' ? 'bg-rose-100 text-merah' : 'bg-soft-light text-soft-dark'
                          }`}>
                            {p.tipe}
                          </span>
                          <span className="text-[10px] text-teks-samping font-bold font-barlow">
                            {p.tgl}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-teks leading-relaxed hover:text-soft-button cursor-pointer">
                          {p.info}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center border-b border-garis">
                      <p className="text-xs text-teks-samping">Belum ada pengumuman terbaru.</p>
                    </div>
                  )}
                </div>
                <button className="w-full py-4 bg-latar/50 text-[10px] font-bold text-teks-samping hover:text-soft-dark transition-colors font-barlow uppercase tracking-widest cursor-pointer">
                  Lihat Semua Berita
                </button>
              </div>

              {/* bantuan */}
              <div className="bg-gradient-to-br from-soft-dark to-soft-button p-5 rounded-2xl text-white shadow-md relative overflow-hidden group">
                <h4 className="font-poppins-extrabold text-sm mb-1">Pusat Bantuan SIAKAD</h4>
                <p className="text-[10px] text-sky-100 leading-relaxed mb-4">
                  Mengalami kendala dalam pengisian KRS atau presensi online?
                </p>
                <button className="bg-white text-soft-dark px-4 py-2 rounded-lg text-[10px] font-bold font-barlow uppercase tracking-wider shadow-sm cursor-pointer">
                  Chat Admin BAAD
                </button>
              </div>
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}