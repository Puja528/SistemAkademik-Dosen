import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineEye, AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
import dataPublikasi from "../../../data/PublikasiNilaiData.json";


const PublikasiNilai = () => {
  const [cari, setCari] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua Kelas");
  const [filterStatus, setFilterStatus] = useState("Semua Status");

  // Logika Filter Data Publikasi Nilai
  const nilaiTerfilter = dataPublikasi.filter((pub) => {
    const namaMK = pub?.nama_mk ? pub.nama_mk.toLowerCase() : "";
    const namaDosen = pub?.dosen ? pub.dosen.toLowerCase() : "";
    
    const cocokCari = namaMK.includes(cari.toLowerCase()) || namaDosen.includes(cari.toLowerCase());
    const cocokKelas = filterKelas === "Semua Kelas" || pub.kelas === filterKelas;
    const cocokStatus = filterStatus === "Semua Status" || pub.status === filterStatus;
    
    return cocokCari && cocokKelas && cocokStatus;
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-fadeIn">
      
      {/* AREA FILTER UTAMA (Format Gaya Konsisten & Presisi) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Input Pencarian */}
        <div className="relative w-full md:w-96">
          <AiOutlineSearch className="absolute left-4 top-3.5 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Cari berdasarkan matakuliah atau dosen..."
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            className="w-full bg-slate-50 text-xs font-medium pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 transition"
          />
        </div>

        {/* Dropdown Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
          
          <select 
            value={filterKelas}
            onChange={(e) => setFilterKelas(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 text-xs font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none"
          >
            <option>Semua Kelas</option>
            <option>TI-2A</option>
            <option>SI-2B</option>
            <option>TI-4A</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 text-xs font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none"
          >
            <option>Semua Status</option>
            <option>Terbit</option>
            <option>Draft</option>
          </select>

        </div>
      </div>

      {/* AREA TABEL UTAMA */}
      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Kode MK</th>
                <th className="px-6 py-4">Mata Kuliah & Dosen</th>
                <th className="px-6 py-4">Kelas Paket</th>
                <th className="px-6 py-4">Mhs Terdaftar</th>
                <th className="px-6 py-4">Tanggal Masuk</th>
                <th className="px-6 py-4">Status Transmisi</th>
                <th className="px-6 py-4 text-center">Aksi Staff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600">
              {nilaiTerfilter.length > 0 ? (
                nilaiTerfilter.map((pub, index) => (
                  <tr key={index} className="hover:bg-slate-50/40 transition">
                    <td className="px-6 py-4.5 font-bold text-slate-400 tracking-wide">{pub.kode_mk}</td>
                    <td className="px-6 py-4.5">
                      <div className="text-slate-900 font-bold leading-snug">{pub.nama_mk}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-medium">{pub.dosen}</div>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className="px-2 py-1 bg-slate-100 text-slate-800 rounded-md font-bold text-[10px]">
                        {pub.kelas}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-slate-500 font-semibold">{pub.jumlah_mahasiswa} Mahasiswa</td>
                    <td className="px-6 py-4.5 text-slate-400">{pub.tanggal_input}</td>
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-1.5">
                        {pub.status === "Terbit" ? (
                          <AiOutlineCheckCircle className="text-emerald-500 text-base" />
                        ) : (
                          <AiOutlineClockCircle className="text-amber-500 text-base" />
                        )}
                        <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md inline-block leading-none ${
                          pub.status === "Terbit" 
                            ? "bg-black text-white" 
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}>
                          {pub.status === "Terbit" ? "Terbit (Akses Mhs Open)" : "Draft (Mhs Hidden)"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-center">
                      {pub.status === "Draft" ? (
                        <button className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1.5 rounded-xl font-bold text-[11px] inline-flex items-center gap-1.5 transition duration-150 shadow-sm shadow-blue-100">
                          <span>Terbitkan Nilai</span>
                        </button>
                      ) : (
                        <button className="bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-xl font-bold text-[11px] inline-flex items-center gap-1.5 transition duration-150">
                          <AiOutlineEye className="text-sm" />
                          <span>Lihat Nilai</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-slate-400 font-semibold bg-slate-50/20">
                    Tidak ada antrean publikasi nilai ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default PublikasiNilai;