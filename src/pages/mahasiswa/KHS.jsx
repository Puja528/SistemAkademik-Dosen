import React, { useState, useEffect } from 'react';
import { nilaiAPI } from '../../services/nilaiAPI';
import { mahasiswaAPI } from '../../services/mahasiswaAPI';
import Loading from '../../components/admin/Loading';

export default function KHS() {
  const [activeTab, setActiveTab] = useState('khs');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [dataAkademik, setDataAkademik] = useState({ profil: null, nilai: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const muatData = async () => {
      try {
        setLoading(true);
        const session = JSON.parse(localStorage.getItem("siakad_session"));
        if (!session) return;

        // Mengambil profil dan data nilai dari database
        const profil = await mahasiswaAPI.fetchMahasiswaByUserId(session.id);
        const nilaiData = await nilaiAPI.fetchKHSMahasiswa(profil.id_mahasiswa);
        console.log("Data Nilai dari API:", nilaiData);
        setDataAkademik({ profil, nilai: nilaiData });
      } catch (err) {
        console.error("Gagal memuat data akademik:", err);
      } finally {
        setLoading(false);
      }
    };
    muatData();
  }, []);

  // Logika Filter Semester & Perhitungan
  const semIndex = selectedSemester.split(' ')[1];
  const nilaiFilter = dataAkademik.nilai.filter(n => n.jadwal?.semester == semIndex);

  // Hitung IPS Dinamis
  const totalSksSem = nilaiFilter.reduce((acc, curr) => acc + (curr.jadwal?.sks || 0), 0);
  const totalBobotSem = nilaiFilter.reduce((acc, curr) => acc + ((curr.nilai_akhir / 25) * (curr.jadwal?.sks || 0)), 0);
  const ips = totalSksSem > 0 ? (totalBobotSem / totalSksSem).toFixed(2) : "0.00";

  // Hitung Total SKS Lulus
  const totalSksLulus = dataAkademik.nilai.reduce((acc, curr) => acc + (curr.jadwal?.sks || 0), 0);

  if (loading) return <div className="p-8 text-center font-bold"><Loading/></div>;

  return (
    <div className="flex min-h-screen bg-latar font-poppins text-teks">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-poppins-extrabold text-soft-dark flex items-center gap-3">
                <span className="w-1.5 h-6 bg-soft-button rounded-full"></span>
                Panel Hasil Studi Akademik
              </h2>
              <p className="text-xs text-teks-samping font-barlow mt-1 uppercase tracking-wider font-bold">
                PRODI: {dataAkademik.profil?.program_studi} • NIM: {dataAkademik.profil?.id_mahasiswa}
              </p>
            </div>

            <div className="flex bg-white border border-garis p-1 rounded-xl shadow-xs self-start sm:self-auto">
              <button onClick={() => setActiveTab('khs')} className={`px-4 py-2 text-xs font-bold font-barlow uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTab === 'khs' ? 'bg-soft-button text-white shadow-xs' : 'text-teks-samping hover:text-teks'}`}>📑 KHS Per Semester</button>
              <button onClick={() => setActiveTab('transkrip')} className={`px-4 py-2 text-xs font-bold font-barlow uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTab === 'transkrip' ? 'bg-soft-button text-white shadow-xs' : 'text-teks-samping hover:text-teks'}`}>🎓 Transkrip Nilai</button>
            </div>
          </div>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-garis shadow-xs">
              <p className="text-[9px] font-bold font-barlow text-teks-samping uppercase tracking-widest mb-1">IPK Kumulatif</p>
              <p className="text-2xl font-poppins-extrabold text-soft-dark">{dataAkademik.profil?.ipk}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-garis shadow-xs">
              <p className="text-[9px] font-bold font-barlow text-teks-samping uppercase tracking-widest mb-1">IP Semester (IPS)</p>
              <p className="text-2xl font-poppins-extrabold text-soft-button">{activeTab === 'khs' ? ips : 'N/A'}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-garis shadow-xs">
              <p className="text-[9px] font-bold font-barlow text-teks-samping uppercase tracking-widest mb-1">Total SKS Selesai</p>
              <p className="text-2xl font-poppins-extrabold text-teks">{totalSksLulus} SKS</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-garis shadow-xs">
              <p className="text-[9px] font-bold font-barlow text-teks-samping uppercase tracking-widest mb-1">Status Akademik</p>
              <p className="text-2xl font-poppins-extrabold text-emerald-600">{dataAkademik.profil?.status}</p>
            </div>
          </section>

          {activeTab === 'khs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-soft-dark">📋 Hasil Studi {selectedSemester}</h3>
                <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className="bg-white text-xs font-bold px-3 py-1.5 rounded-lg border border-garis">
                  <option>Semester 1</option>
                  <option>Semester 2</option>
                  <option>Semester 3</option>
                </select>
              </div>

              <div className="bg-white rounded-2xl border border-garis shadow-sm overflow-hidden">

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-latar/50 border-b border-garis">
                      <th className="px-4 py-4 text-[10px] font-bold text-teks-samping uppercase">Mata Kuliah</th>
                      <th className="px-4 py-4 text-[10px] font-bold text-teks-samping uppercase text-center">Tugas</th>
                      <th className="px-4 py-4 text-[10px] font-bold text-teks-samping uppercase text-center">UTS</th>
                      <th className="px-4 py-4 text-[10px] font-bold text-teks-samping uppercase text-center">UAS</th>
                      <th className="px-4 py-4 text-[10px] font-bold text-teks-samping uppercase text-center">Akhir</th>
                      <th className="px-4 py-4 text-[10px] font-bold text-teks-samping uppercase text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-garis">
                    {nilaiFilter.map((n) => (
                      <tr key={n.id} className="hover:bg-soft-light/20 transition-colors">
                        <td className="px-4 py-4 text-xs font-semibold text-teks">{n.jadwal?.mata_kuliah}</td>
                        <td className="px-4 py-4 text-xs text-center">{n.nilai_tugas}</td>
                        <td className="px-4 py-4 text-xs text-center">{n.nilai_uts}</td>
                        <td className="px-4 py-4 text-xs text-center">{n.nilai_uas}</td>
                        <td className="px-4 py-4 text-xs text-center font-bold">{n.nilai_akhir}</td>
                        <td className="px-4 py-4 text-center">
                          <span className="px-3 py-1 rounded-lg text-[10px] font-poppins-extrabold bg-emerald-100 text-emerald-700">
                            {n.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'transkrip' && (
            <div className="bg-white rounded-2xl border border-garis shadow-sm overflow-hidden p-6">
              <h3 className="font-bold text-sm text-soft-dark mb-4">🎓 Rekapitulasi Seluruh Mata Kuliah</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-latar/50 border-b border-garis">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase">Sem</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase">Mata Kuliah</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase text-center">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {dataAkademik.nilai.map((t) => (
                    <tr key={t.id} className="border-b">
                      <td className="px-6 py-4 text-xs text-center font-bold text-teks-samping">S-{t.jadwal?.semester}</td>
                      <td className="px-6 py-4 text-xs font-semibold">{t.jadwal?.mata_kuliah}</td>
                      <td className="px-6 py-4 text-center text-xs font-bold text-soft-button">{t.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}