import React, { useState, useEffect } from 'react';
import { mahasiswaAPI } from '../../services/mahasiswaAPI';
import { nilaiAPI } from '../../services/nilaiAPI';
import Loading from '../../components/admin/Loading';

export default function DashboardUtama() {
  const [activeTab, setActiveTab] = useState('khs');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [dataAkademik, setDataAkademik] = useState({ profil: null, nilai: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const muatData = async () => {
      try {
        setIsLoading(true);
        const localSession = localStorage.getItem("siakad_session");
        if (!localSession) return;

        const dataUserLogin = JSON.parse(localSession);
        const profil = await mahasiswaAPI.fetchMahasiswaByUserId(dataUserLogin.id);
        
        if (profil) {
          const nilaiData = await nilaiAPI.fetchKHSMahasiswa(profil.id_mahasiswa);
          setDataAkademik({ profil, nilai: nilaiData });
        }
      } catch (error) {
        console.error("Gagal sinkronisasi data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    muatData();
  }, []);

  const semFilter = selectedSemester.split(' ')[1];
  const khsPerSemester = {
    ips: (dataAkademik.nilai.filter(n => n.jadwal?.semester == semFilter).reduce((acc, curr) => acc + (curr.nilai_akhir || 0), 0) / (dataAkademik.nilai.filter(n => n.jadwal?.semester == semFilter).length || 1)).toFixed(2),
    nilai: dataAkademik.nilai.filter(n => n.jadwal?.semester == semFilter)
  };
  
  const transkripSemua = dataAkademik.nilai;

  const handleUnduhPDF = () => {
    alert('Sistem Sedang Memproses: Mengunduh dokumen transkrip nilai resmi format PDF...');
  };

  if (isLoading) {
    return <div className="text-xs font-bold uppercase tracking-wider text-slate-400 p-6"><Loading/></div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-soft-dark to-soft-button p-6 rounded-2xl text-white shadow-xs">
        <h1 className="text-xl font-bold font-poppins-extrabold">Portal Informasi Akademik</h1>
        <p className="text-xs opacity-90 mt-1">
          Selamat datang di halaman utama. Saat ini Anda terdata sebagai mahasiswa aktif pada Program Studi {dataAkademik.profil ? dataAkademik.profil.program_studi : "-"} dengan nomor induk mahasiswa {dataAkademik.profil ? dataAkademik.profil.id_mahasiswa : "-"}.
        </p>
      </div>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-garis shadow-xs">
          <p className="text-[9px] font-bold font-barlow text-teks-samping uppercase tracking-widest mb-1">IPK Kumulatif (Terbaru)</p>
          <p className="text-2xl font-poppins-extrabold text-soft-dark">{dataAkademik.profil ? Number(dataAkademik.profil.ipk).toFixed(2) : "0.00"}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-garis shadow-xs">
          <p className="text-[9px] font-bold font-barlow text-teks-samping uppercase tracking-widest mb-1">IP Semester (IPS)</p>
          <p className="text-2xl font-poppins-extrabold text-soft-button">{activeTab === 'khs' ? khsPerSemester.ips : 'N/A'}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-garis shadow-xs">
          <p className="text-[9px] font-bold font-barlow text-teks-samping uppercase tracking-widest mb-1">Total SKS Selesai</p>
          <p className="text-2xl font-poppins-extrabold text-teks">{dataAkademik.nilai.reduce((acc, curr) => acc + (curr.jadwal?.sks || 0), 0)} SKS</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-garis shadow-xs">
          <p className="text-[9px] font-bold font-barlow text-teks-samping uppercase tracking-widest mb-1">Status Akademik</p>
          <p className={`text-2xl font-poppins-extrabold ${dataAkademik.profil?.status === "Aktif" ? "text-emerald-600" : "text-amber-500"}`}>
            {dataAkademik.profil ? dataAkademik.profil.status : "-"}
          </p>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-garis">
        <h3 className="font-bold text-sm text-soft-dark flex items-center gap-2">📊 Lembar Transkrip & Evaluasi Hasil Studi</h3>
        <div className="flex bg-white border border-garis p-1 rounded-xl shadow-xs self-start sm:self-auto">
          <button onClick={() => setActiveTab('khs')} className={`px-4 py-2 text-xs font-bold font-barlow uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTab === 'khs' ? 'bg-soft-button text-white shadow-xs' : 'text-teks-samping hover:text-teks'}`}>📑 KHS Per Semester</button>
          <button onClick={() => setActiveTab('transkrip')} className={`px-4 py-2 text-xs font-bold font-barlow uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTab === 'transkrip' ? 'bg-soft-button text-white shadow-xs' : 'text-teks-samping hover:text-teks'}`}>🎓 Transkrip Nilai</button>
        </div>
      </div>

      {activeTab === 'khs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-xs text-soft-dark">📋 Rincian Nilai Berjalan - {selectedSemester}</h4>
            <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className="bg-white text-xs font-bold px-3 py-1.5 rounded-lg border border-garis cursor-pointer outline-none shadow-xs">
              <option>Semester 1</option>
              <option>Semester 2</option>
              <option>Semester 3</option>
            </select>
          </div>
          <div className="bg-white rounded-2xl border border-garis shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-latar/50 border-b border-garis">
                    <th className="px-6 py-4 text-[10px] font-bold font-barlow text-teks-samping uppercase">Kode</th>
                    <th className="px-6 py-4 text-[10px] font-bold font-barlow text-teks-samping uppercase">Mata Kuliah</th>
                    <th className="px-6 py-4 text-[10px] font-bold font-barlow text-teks-samping uppercase text-center">SKS</th>
                    <th className="px-6 py-4 text-[10px] font-bold font-barlow text-teks-samping uppercase text-center">Nilai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-garis">
                  {khsPerSemester.nilai.map((n) => (
                    <tr key={n.id} className="hover:bg-soft-light/20 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold text-soft-dark">{n.jadwal?.kode_mk}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-teks">{n.jadwal?.mata_kuliah}</td>
                      <td className="px-6 py-4 text-xs text-center font-medium">{n.jadwal?.sks}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block px-3 py-1 rounded-lg text-[10px] font-poppins-extrabold bg-emerald-100 text-emerald-700">{n.grade}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transkrip' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-xs text-soft-dark">🎓 Rekapitulasi Kelulusan</h4>
            <button onClick={handleUnduhPDF} className="bg-soft-dark hover:bg-soft-button text-white px-4 py-2 rounded-xl text-[10px] font-bold font-barlow uppercase tracking-wider shadow-md">📥 Unduh PDF Transkrip</button>
          </div>
          <div className="bg-white rounded-2xl border border-garis shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-latar/50 border-b border-garis">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase text-center">Sem</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase">Mata Kuliah</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-garis">
                {transkripSemua.map((t) => (
                  <tr key={t.id}>
                    <td className="px-6 py-4 text-xs text-center font-bold text-teks-samping">S-{t.jadwal?.semester}</td>
                    <td className="px-6 py-4 text-xs font-semibold">{t.jadwal?.mata_kuliah}</td>
                    <td className="px-6 py-4 text-center text-xs font-bold text-soft-button">{t.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}