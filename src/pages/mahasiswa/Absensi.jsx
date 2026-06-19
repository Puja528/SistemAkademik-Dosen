import React, { useState, useEffect } from 'react';
import { absensiAPI } from '../../services/absensiAPI';
import { mahasiswaAPI } from '../../services/mahasiswaAPI';
import Loading from '../../components/admin/Loading';

export default function Absensi() {
  const [dataAbsen, setDataAbsen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = JSON.parse(localStorage.getItem("siakad_session"));
        const mhs = await mahasiswaAPI.fetchMahasiswaByUserId(session.id);
        const data = await absensiAPI.fetchAbsensiMahasiswa(mhs.id_mahasiswa);
        setDataAbsen(data);
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 1. TRANSFORMASI DATA UNTUK MATA KULIAH
  const matakuliahMap = dataAbsen.reduce((acc, curr) => {
    const id = curr.id_jadwal;
    if (!acc[id]) {
      acc[id] = { id, mk: curr.jadwal?.mata_kuliah, kode: curr.jadwal?.kode, sks: curr.jadwal?.sks, hadir: 0, total: 0 };
    }
    acc[id].total += 1;
    if (curr.status_kehadiran === 'Hadir') acc[id].hadir += 1;
    acc[id].persentase = Math.round((acc[id].hadir / acc[id].total) * 100);
    return acc;
  }, {});

  const matakuliah = Object.values(matakuliahMap);

  // 2. TRANSFORMASI DATA UNTUK RINGKASAN
  const ringkasan = {
    totalPertemuan: dataAbsen.length,
    hadir: dataAbsen.filter(a => a.status_kehadiran === 'Hadir').length,
    sakit: dataAbsen.filter(a => a.status_kehadiran === 'Sakit').length,
    izin: dataAbsen.filter(a => a.status_kehadiran === 'Izin').length,
    alpa: dataAbsen.filter(a => a.status_kehadiran === 'Alpa').length,
    persentaseTotal: dataAbsen.length > 0 
      ? Math.round((dataAbsen.filter(a => a.status_kehadiran === 'Hadir').length / dataAbsen.length) * 100) + "%" 
      : "0%"
  };

  if (loading) return <div><Loading/></div>;

  return (
    <div className="space-y-8">
      {/* HEADER HALAMAN */}
      <div>
        <h2 className="text-xl font-poppins-extrabold text-soft-dark flex items-center gap-3">
          <span className="w-1.5 h-6 bg-soft-button rounded-full"></span>
          Presensi & Syarat Kelayakan Uian
        </h2>
        <p className="text-xs text-teks-samping font-barlow mt-1 uppercase tracking-wider font-bold">
          US-06: Batas Minimum Kehadiran Ikut UAS = 75%
        </p>
      </div>

      {/* KARTU STATISTIK RINGKASAN */}
      <section className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-garis shadow-xs col-span-2 flex flex-col justify-between">
          <p className="text-[10px] font-bold font-barlow text-teks-samping uppercase tracking-wider">Akumulasi Kehadiran Global</p>
          <p className="text-3xl font-poppins-extrabold text-soft-dark mt-2">{ringkasan.persentaseTotal}</p>
        </div>
        {[
          { label: "Total Pertemuan", val: ringkasan.totalPertemuan, sub: "Sudah jalan", color: "text-teks" },
          { label: "Total Hadir", val: ringkasan.hadir, sub: "Pertemuan", color: "text-emerald-600" },
          { label: "Sakit / Izin", val: ringkasan.sakit + ringkasan.izin, sub: "Surat Resmi", color: "text-amber-500" },
          { label: "Alpa", val: ringkasan.alpa, sub: "Mangkir", color: "text-rose-500" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-garis shadow-xs">
            <p className="text-[9px] font-bold font-barlow text-teks-samping uppercase tracking-widest">{stat.label}</p>
            <p className={`text-xl font-poppins-extrabold mt-2 ${stat.color}`}>{stat.val}</p>
            <p className="text-[9px] text-teks-samping font-medium font-barlow italic">{stat.sub}</p>
          </div>
        ))}
      </section>

      {/* DAFTAR PERSENTASE MATA KULIAH */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-sm text-soft-dark flex items-center gap-2">📊 Detail Kehadiran per Mata Kuliah</h3>
          <div className="bg-white rounded-2xl border border-garis p-6 space-y-6 shadow-sm">
            {matakuliah.map((mk) => {
              const diBawahAmbangBatas = mk.persentase < 75;
              return (
                <div key={mk.id} className="p-4 rounded-xl border border-garis/60 bg-latar/10 space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-soft-button bg-soft-light px-2 py-0.5 rounded">{mk.kode}</span>
                      <h4 className="text-xs font-bold text-teks mt-1">{mk.mk} ({mk.sks} SKS)</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-poppins-extrabold text-teks">{mk.hadir} / {mk.total}</span>
                      <p className={`text-xs font-poppins-extrabold ${diBawahAmbangBatas ? 'text-rose-600' : 'text-emerald-600'}`}>{mk.persentase}%</p>
                    </div>
                  </div>
                  {/* Progress Bar & Warning tetap sama */}
                </div>
              );
            })}
          </div>
        </div>

        {/* LOG AKTIVITAS (Menggunakan 5 data terakhir) */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-soft-dark">⏱️ Log Absensi Terakhir</h3>
          <div className="bg-white rounded-2xl border border-garis p-4 space-y-3 shadow-sm">
            {dataAbsen.slice(-5).reverse().map((log) => (
              <div key={log.id_absen} className="p-3 bg-latar/40 border border-garis/60 rounded-xl flex justify-between">
                <div>
                  <h4 className="text-xs font-bold text-teks truncate">{log.jadwal?.mata_kuliah}</h4>
                  <p className="text-[10px] text-teks-samping">{log.tanggal_absen}</p>
                </div>
                <span className={`px-2 py-1 rounded text-[9px] font-bold ${log.status_kehadiran === 'Hadir' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {log.status_kehadiran}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}