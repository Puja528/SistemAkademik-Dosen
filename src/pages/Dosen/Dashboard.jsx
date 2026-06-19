import React, { useState, useEffect } from "react";
import { FiBook, FiUsers, FiCheckSquare, FiBookOpen, FiCalendar, FiSearch } from "react-icons/fi";
import { dosenAPI } from "../../services/dosenAPI";

const ProgressBar = ({ persen }) => {
  const colorClass = persen >= 80 ? "bg-green-500" : persen >= 60 ? "bg-amber-400" : "bg-red-500";
  return (
    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ease-out ${colorClass}`} style={{ width: `${persen}%` }} />
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const isSelesai = status === "selesai";
  const isSebagian = status === "sebagian";
  const label = isSelesai ? "Selesai" : isSebagian ? "Sebagian" : "Belum Diisi";
  const bgClass = isSelesai ? "bg-green-50 text-green-700 border-green-200" : isSebagian ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-rose-50 text-rose-700 border-rose-200";
  return <span className={`inline-block px-2.5 py-1 rounded-md text-[12px] font-semibold border ${bgClass}`}>{label}</span>;
};

const TH = ({ children, className = "" }) => (
  <th className={`text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2.5 border-b border-gray-100 text-left ${className}`}>{children}</th>
);

const TD = ({ children, className = "" }) => (
  <td className={`px-3 py-3.5 text-[13px] text-gray-600 border-b border-gray-50 transition-colors ${className}`}>{children}</td>
);

const Dashboard = () => {
  const [waktu, setWaktu] = useState(new Date());
  const [searchAbsen, setSearchAbsen] = useState("");
  const [filterNilai, setFilterNilai] = useState("semua");
  const [profilDosen, setProfilDosen] = useState(null);
  const [dataDosen, setDataDosen] = useState({ jadwal: [], nilai: [], absen: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setWaktu(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const muatData = async () => {
      try {
        setIsLoading(true);
        const localSession = JSON.parse(localStorage.getItem("siakad_session"));
        if (!localSession) return;
        const profil = await dosenAPI.fetchDosenByUserId(localSession.id);
        setProfilDosen(profil);
        if (profil) {
          const data = await dosenAPI.fetchDashboardData(profil.nidn);
          setDataDosen(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    muatData();
  }, []);

  const hari = waktu.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const jam = waktu.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const hariIni = new Date().toLocaleDateString("id-ID", { weekday: "long" });

const JADWAL_HARI_INI = dataDosen.jadwal
  .filter(j => j.hari?.toLowerCase() === hariIni.toLowerCase()) // Tambahkan .toLowerCase()
  .map(j => ({
    jam: `${j.jam_mulai?.substring(0, 5) || '00:00'} - ${j.jam_selesai?.substring(0, 5) || '00:00'}`,
    matkul: j.mata_kuliah,
    kelas: j.kelas,
    ruang: j.ruangan
  }));

  const filteredAbsensi = dataDosen.absen.map(a => ({
    nim: a.id_mahasiswa,
    nama: a.mahasiswa?.nama || "-",
    kehadiran: a.status_kehadiran,
    persen: a.status_kehadiran === "Hadir" ? 100 : 0
  })).filter((item) =>
    item.nama.toLowerCase().includes(searchAbsen.toLowerCase()) || item.nim.includes(searchAbsen)
  );

  const filteredNilai = dataDosen.nilai.filter((item) => filterNilai === "semua" || (item.status_nilai === "Terbit" ? "selesai" : "belum") === filterNilai);

  if (isLoading) return <div className="p-6 text-xs font-bold uppercase tracking-wider text-gray-400">Menghubungkan ke database server...</div>;

  return (
    <div className="p-6 flex flex-col gap-5 bg-gray-50/50 min-h-screen">
      <div className="rounded-xl p-6 text-white flex items-center justify-between gap-4 shadow-sm" style={{ background: "linear-gradient(135deg, #1a3a6b 0%, #2e5fa3 60%, #3b7dd8 100%)" }}>
        <div>
          <h1 className="text-xl font-bold m-0 mb-1.5 tracking-tight">Selamat Datang, {profilDosen?.nama}</h1>
          <p className="text-[13px] opacity-80 m-0">NIDN: {profilDosen?.nidn} · Program Studi {profilDosen?.program_studi}</p>
        </div>
        <div className="text-right flex-shrink-0 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/10">
          <div className="text-[11px] opacity-75 mb-0.5 font-medium uppercase tracking-wider">{hari}</div>
          <div className="text-xl font-mono font-bold tracking-wider">{jam} WIB</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: FiBook, label: "Mata Kuliah Diampu", value: dataDosen.jadwal.length, sub: "Semester Berjalan" },
          { icon: FiUsers, label: "Total Mahasiswa", value: [...new Set(dataDosen.absen.map(a => a.id_mahasiswa))].length, sub: "Data Terintegrasi" },
          { icon: FiBookOpen, label: "Status Nilai", value: `${dataDosen.nilai.filter(n => n.status_nilai === 'Terbit').length}/${dataDosen.nilai.length || 0}`, sub: "Selesai diinput" },
        ].map(({ icon: Icon, label, value, sub }, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5"><Icon size={16} className="text-blue-500" /> <span className="text-[13px] text-gray-500">{label}</span></div>
            <span className="text-[32px] font-extrabold text-gray-900">{value}</span>
            <span className="text-[11.5px] text-gray-400 block">{sub}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4"><FiCalendar size={16} className="text-gray-500" /> <span className="text-[14px] font-bold">Jadwal Mengajar Hari Ini</span></div>
          <table className="w-full border-collapse">
            <thead><tr>{["Jam", "Mata Kuliah", "Ruang"].map((h) => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {JADWAL_HARI_INI.map((j, i) => (
                <tr key={i} className="hover:bg-gray-50/70">
                  <TD className="text-gray-900 font-semibold">{j.jam}</TD>
                  <TD><div className="font-semibold">{j.matkul}</div><div className="text-[11px] text-gray-400">{j.kelas}</div></TD>
                  <TD>{j.ruang}</TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4"><div className="flex items-center gap-2"><FiBookOpen size={16} /> <span className="text-[14px] font-bold">Status Nilai</span></div></div>
          <table className="w-full">
            <tbody>
              {filteredNilai.map((n, i) => (
                <tr key={i}><TD>{n.mata_kuliah}</TD><TD className="text-right"><StatusBadge status={n.status_nilai === 'Terbit' ? 'selesai' : 'belum'} /></TD></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4"><span className="text-[14px] font-bold">Rekap Absensi</span></div>
        <div className="relative w-full sm:w-64 mb-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><FiSearch className="text-gray-400" size={14} /></span>
          <input type="text" placeholder="Cari NIM atau Nama..." value={searchAbsen} onChange={(e) => setSearchAbsen(e.target.value)} className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs" />
        </div>
        <table className="w-full">
          <thead><tr>{["NIM", "Nama", "Kehadiran", "Persentase"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>
            {filteredAbsensi.map((r, i) => (
              <tr key={i}>
                <TD>{r.nim}</TD><TD>{r.nama}</TD><TD>{r.kehadiran}</TD>
                <TD><div className="flex items-center gap-3"><ProgressBar persen={r.persen} /> {r.persen}%</div></TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;