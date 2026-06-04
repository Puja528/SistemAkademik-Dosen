import React, { useState } from "react";
import {
  FiBook,
  FiCalendar,
  FiCheckSquare,
  FiStar,
  FiBell,
  FiEdit,
  FiUsers,
  FiList,
} from "react-icons/fi";
import Header from "../../components/Dosen/Header";
import Sidebar from "../../components/Dosen/Sidebar";

// ── Data ──────────────────────────────────────────────────────────
const JADWAL = [
  {
    jam: "08:00 - 09:40",
    matkul: "Basis Data",
    kelas: "TI-A",
    ruang: "Lab 317",
    status: "berlangsung",
  },
  {
    jam: "10:03 - 11:40",
    matkul: "PBO",
    kelas: "TI-B",
    ruang: "Lab 296",
    status: "akan-datang",
  },
];
const REKAP = [
  {
    matkul: "Basis Data - TI-A",
    detail: "Pertemuan 4/16",
    persen: 87,
    warn: false,
  },
  { matkul: "PBO - TI-B", detail: "Pertemuan 3/16", persen: 52, warn: true },
  {
    matkul: "Kecerdasan Buatan - TI-C",
    detail: "Pertemuan 5/16",
    persen: 76,
    warn: false,
  },
];
const NILAI = [
  {
    matkul: "Basis Data - TI-A",
    detail: "2 T | 1 PA | 1 UTS | 1 UAS",
    persen: 60,
    aksi: "input",
  },
  {
    matkul: "PBO - TI-B",
    detail: "2 T | 1 PA | 1 UTS | 1 UAS",
    persen: 100,
    aksi: "input",
  },
  {
    matkul: "Basis Data - TI-A",
    detail: "1 Tugas | 1 PA | 1 UAS",
    persen: 100,
    aksi: "lihat",
  },
];
const BESOK = [
  { matkul: "Basis Data", info: "TI-A · Lab 217", jam: "08:00 - 09:40" },
  { matkul: "Struktur Data", info: "TI-C · Lab 201", jam: "13:00 - 14:40" },
  { matkul: "Kecerdasan Buatan", info: "TI-C · R 204", jam: "15:00 - 16:40" },
];
const NOTIF = [
  {
    warna: "orange",
    teks: "Absensi belum dibuat",
    sub: "Basis Data TI-A · 08:00 WIB",
  },
  {
    warna: "green",
    teks: "Periode input nilai segera berakhir",
    sub: "Deadline: 30 Mei 2025",
  },
];
const QUICK = [
  {
    icon: FiCheckSquare,
    label: "Input Absensi",
    bg: "bg-sky-100",
    text: "text-sky-600",
  },
  {
    icon: FiEdit,
    label: "Input Nilai",
    bg: "bg-green-100",
    text: "text-green-600",
  },
  {
    icon: FiList,
    label: "Lihat Jadwal",
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  {
    icon: FiUsers,
    label: "Mahasiswa",
    bg: "bg-violet-100",
    text: "text-violet-600",
  },
];

// ── Sub-components ─────────────────────────────────────────────────
const ProgressBar = ({ persen }) => {
  const color =
    persen >= 80
      ? "bg-green-500"
      : persen >= 50
        ? "bg-amber-400"
        : "bg-red-400";
  return (
    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${persen}%` }}
      />
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, sub, iconColor }) => (
  <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col gap-1 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <span style={{ color: iconColor }} className="opacity-80 mb-1">
      <Icon size={22} />
    </span>
    <span className="text-3xl font-bold text-gray-900 leading-none">
      {value}
    </span>
    <span className="text-[12.5px] font-semibold text-gray-700">{label}</span>
    {sub && <span className="text-[11px] text-gray-400">{sub}</span>}
  </div>
);

// ── Dashboard ──────────────────────────────────────────────────────
const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const now = new Date();
  const hari = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const jam = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex min-h-screen bg-[#f4f6f9] font-[Segoe_UI,Noto_Sans,sans-serif]">
      <Sidebar activeItem={activePage} onNavChange={setActivePage} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 flex flex-col gap-5 overflow-y-auto">
          {/* Welcome Banner */}
          <div
            className="rounded-2xl p-6 text-white flex items-center justify-between gap-4"
            style={{
              background:
                "linear-gradient(135deg, #1a3a6b 0%, #2e5fa3 60%, #3b7dd8 100%)",
              boxShadow: "0 4px 20px rgba(26,58,107,0.25)",
            }}
          >
            <div>
              <h1 className="text-xl font-bold tracking-tight mb-1">
                Selamat Datang, Dr. Jhon Smith
              </h1>
              <p className="text-[13px] opacity-80">
                Anda memiliki 3 jadwal mengajar hari ini &nbsp;·&nbsp; Semester
                Genap 2024/2025
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-[11px] opacity-70">{hari}</div>
              <div className="text-2xl font-bold tracking-widest leading-tight">
                {jam} WIB
              </div>
              <div className="text-[11px] opacity-60 mt-0.5">
                Semester Genap 2024/2025
              </div>
            </div>
          </div>

          {/* Stats + Notifikasi */}
          <div className="flex gap-5 items-start">
            <div className="grid grid-cols-2 gap-3.5 flex-1 min-w-0">
              <StatCard
                icon={FiBook}
                label="Mata Kuliah"
                value="4"
                sub="Mata kuliah aktif"
                iconColor="#1a3a6b"
              />

              <StatCard
                icon={FiCalendar}
                label="Jadwal Hari Ini"
                value="3"
                sub="Total hari ini"
                iconColor="#2563eb"
              />

              <StatCard
                icon={FiCheckSquare}
                label="Absensi Pending"
                value="2"
                sub="Belum dilakukan"
                iconColor="#f59e0b"
              />

              <StatCard
                icon={FiStar}
                label="Nilai Pending"
                value="1"
                sub="Belum selesai input"
                iconColor="#ef4444"
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 w-72 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] font-bold text-gray-900">
                  Notifikasi &amp; Pengingat
                </span>
                <span className="text-[11px] font-semibold text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                  1 baru
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {NOTIF.map((n, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5
                      ${n.warna === "orange" ? "bg-orange-50 text-orange-500" : "bg-green-50 text-green-600"}`}
                    >
                      <FiBell size={16} />
                    </div>
                    <div>
                      <div className="text-[12.5px] font-semibold text-gray-800 leading-tight">
                        {n.teks}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {n.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Jadwal Hari Ini */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[14px] font-bold text-gray-900">
                  Jadwal Hari Ini
                </div>
                <div className="text-[11.5px] text-gray-400 mt-0.5">
                  Senin, 27 Mei 2025
                </div>
              </div>
              <button className="text-[12px] font-semibold text-blue-600 hover:text-[#1a3a6b] transition-colors">
                Lihat Semua
              </button>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["Jam", "Mata Kuliah", "Ruang", "Status", "Aksi"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wide px-2.5 py-2 border-b border-gray-100"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {JADWAL.map((j, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="px-2.5 py-3 text-[12.5px] font-semibold text-[#1a3a6b] whitespace-nowrap">
                      {j.jam}
                    </td>
                    <td className="px-2.5 py-3">
                      <div className="text-[13px] font-semibold text-gray-900">
                        {j.matkul}
                      </div>
                      <div className="text-[11px] text-gray-400">{j.kelas}</div>
                    </td>
                    <td className="px-2.5 py-3 text-[13px] text-gray-600">
                      {j.ruang}
                    </td>
                    <td className="px-2.5 py-3">
                      {j.status === "berlangsung" ? (
                        <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                          ● Berlangsung
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                          ● Akan Datang
                        </span>
                      )}
                    </td>
                    <td className="px-2.5 py-3">
                      {j.status === "berlangsung" ? (
                        <button className="text-[12.5px] font-semibold text-white bg-[#1a3a6b] hover:bg-[#2e5fa3] px-3.5 py-1.5 rounded-lg transition-colors">
                          Input Absensi
                        </button>
                      ) : (
                        <button className="text-[12.5px] font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 px-3.5 py-1.5 rounded-lg transition-colors">
                          Detail
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rekap + Nilai */}
          <div className="grid grid-cols-2 gap-5">
            {/* Rekap Absensi */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-[14px] font-bold text-gray-900">
                    Rekap Absensi
                  </div>
                  <div className="text-[11.5px] text-gray-400 mt-0.5">
                    Kehadiran mahasiswa per perkuliahan
                  </div>
                </div>
                <button className="text-[12px] font-semibold text-blue-600 hover:text-[#1a3a6b] transition-colors">
                  Lihat Semua
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {REKAP.map((r, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[12.5px] font-semibold text-gray-800">
                          {r.matkul}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {r.detail}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`w-2 h-2 rounded-full ${r.warn ? "bg-amber-400" : "bg-green-500"}`}
                        />
                        <button className="text-[11.5px] font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 px-2.5 py-1 rounded-lg transition-colors">
                          Detail
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ProgressBar persen={r.persen} />
                      <span className="text-[11px] font-semibold text-gray-500 w-8 text-right flex-shrink-0">
                        {r.persen}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Nilai */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-[14px] font-bold text-gray-900">
                    Status Input Nilai
                  </div>
                  <div className="text-[11.5px] text-gray-400 mt-0.5">
                    Progress pengisian per komponen
                  </div>
                </div>
                <button className="text-[12px] font-semibold text-blue-600 hover:text-[#1a3a6b] transition-colors">
                  Lihat Semua
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {NILAI.map((n, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[12.5px] font-semibold text-gray-800">
                          {n.matkul}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {n.detail}
                        </div>
                      </div>
                      <button
                        className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-lg transition-colors flex-shrink-0
                        ${
                          n.aksi === "input"
                            ? "text-white bg-[#1a3a6b] hover:bg-[#2e5fa3]"
                            : "text-gray-600 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {n.aksi === "input" ? "Input" : "Lihat"}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${n.persen === 100 ? "bg-green-500" : "bg-blue-500"}`}
                          style={{ width: `${n.persen}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-500 w-8 text-right flex-shrink-0">
                        {n.persen}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Jadwal Besok + Quick Action */}
          <div className="grid grid-cols-2 gap-5">
            {/* Jadwal Besok */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="text-[14px] font-bold text-gray-900 mb-1">
                Jadwal Besok
              </div>
              <div className="text-[11.5px] text-gray-400 mb-4">
                Selasa, 28 Mei 2025
              </div>
              <div className="flex flex-col gap-3">
                {BESOK.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#1a3a6b] flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold text-gray-800">
                        {b.matkul}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {b.info}
                      </div>
                    </div>
                    <span className="text-[12px] font-semibold text-[#1a3a6b] whitespace-nowrap flex-shrink-0">
                      {b.jam}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="text-[14px] font-bold text-gray-900 mb-4">
                Quick Action
              </div>
              <div className="grid grid-cols-2 gap-3">
                {QUICK.map(({ icon: Icon, label, bg, text }, i) => (
                  <button
                    key={i}
                    className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer font-[inherit]"
                  >
                    <div
                      className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center`}
                    >
                      <span className={text}>
                        <Icon size={22} />
                      </span>
                    </div>
                    <span className="text-[12px] font-semibold text-gray-700 text-center">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
