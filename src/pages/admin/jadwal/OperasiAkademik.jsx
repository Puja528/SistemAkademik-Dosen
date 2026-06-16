import React, { useState } from "react";
// DISESUAIKAN: Menggunakan baris impor ikon eksklusif milikmu
import { AiOutlineSearch, AiOutlinePlus, AiOutlineCalendar, AiOutlineClockCircle, AiOutlineEnvironment } from "react-icons/ai";
import dataJadwalLokal from "../../../data/JadwalData.json"; 
import BuatJadwalBaru from "./BuatJadwalBaru";

const OperasiAkademik = () => {
  const [dataJadwal, setDataJadwal] = useState(dataJadwalLokal || []);
  const [cari, setCari] = useState("");
  const [filterProdi, setFilterProdi] = useState("Semua Program Studi");
  const [isModalTerbuka, setIsModalTerbuka] = useState(false);

  const tanganiJadwalBaruLokal = (jadwalBaru) => {
    setDataJadwal([jadwalBaru, ...dataJadwal]);
  };

  const jadwalTerfilter = dataJadwal.filter((jdl) => {
    const namaMK = jdl?.nama_mk ? jdl.nama_mk.toLowerCase() : "";
    const dosenMK = jdl?.dosen ? jdl.dosen.toLowerCase() : "";
    const kodeMK = jdl?.kode_mk ? jdl.kode_mk.toLowerCase() : "";
    
    const cocokCari = namaMK.includes(cari.toLowerCase()) || 
                      dosenMK.includes(cari.toLowerCase()) || 
                      kodeMK.includes(cari.toLowerCase());

    let cocokProdi = true;
    if (filterProdi === "D4 Pengolahan dan Penyimpanan Hasil Perikanan") {
      cocokProdi = jdl.kode_mk.startsWith("PPHP");
    } else if (filterProdi === "D3 Perikanan Tangkap") {
      cocokProdi = jdl.kode_mk.startsWith("PTK");
    } else if (filterProdi === "D3 Budi Daya Ikan") {
      cocokProdi = jdl.kode_mk.startsWith("BDI");
    }

    return cocokCari && cocokProdi;
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-fadeIn">
      
      {/* FILTER PANEL */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        
        <div className="relative w-full md:w-96">
          <AiOutlineSearch className="absolute left-4 top-3.5 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Cari berdasarkan mata kuliah, kode, atau dosen..."
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            className="w-full bg-slate-50 text-xs font-medium pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-black transition"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
          
          <select 
            value={filterProdi}
            onChange={(e) => setFilterProdi(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 text-xs font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none max-w-xs truncate"
          >
            <option>Semua Program Studi</option>
            <option>D4 Pengolahan dan Penyimpanan Hasil Perikanan</option>
            <option>D3 Perikanan Tangkap</option>
            <option>D3 Budi Daya Ikan</option>
          </select>

          <button 
            type="button"
            onClick={() => setIsModalTerbuka(true)} 
            className="w-full sm:w-auto bg-black text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-sm shrink-0"
          >
            <AiOutlinePlus className="text-sm" />
            <span>Buat Jadwal Baru</span>
          </button>

        </div>
      </div>

      {/* GRID KARTU JADWAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jadwalTerfilter.length > 0 ? (
          jadwalTerfilter.map((jdl) => (
            <div key={jdl.id_jadwal} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
              
              <div className="flex justify-between items-start">
                <span className="bg-slate-900 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wider">
                  {jdl.kelas}
                </span>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                  {jdl.kode_mk} • {jdl.sks} SKS
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">{jdl.nama_mk}</h4>
                <p className="text-xs font-medium text-slate-400 mt-1 truncate">Dosen: <span className="text-slate-700 font-semibold">{jdl.dosen}</span></p>
              </div>

              {/* DISESUAIKAN: Pemanggilan AiOutlineClockCircle di baris ini */}
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1.5 font-medium">
                <div className="flex items-center gap-2">
                  <AiOutlineCalendar className="text-slate-400 text-sm" />
                  <span>Hari {jdl.hari}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AiOutlineClockCircle className="text-slate-400 text-sm" />
                  <span>{jdl.jam} WIB</span>
                </div>
                <div className="flex items-center gap-2">
                  <AiOutlineEnvironment className="text-slate-400 text-sm" />
                  <span className="text-slate-800 font-semibold truncate">{jdl.ruangan}</span>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full bg-white border border-slate-200/60 rounded-2xl py-12 text-center text-slate-400 font-semibold shadow-sm">
            Tidak ada jadwal perkuliahan yang ditemukan.
          </div>
        )}
      </div>

      <BuatJadwalBaru 
        isModalTerbuka={isModalTerbuka}
        setIsModalTerbuka={setIsModalTerbuka}
        onSuksesSimpan={tanganiJadwalBaruLokal}
      />

    </div>
  );
};

export default OperasiAkademik;