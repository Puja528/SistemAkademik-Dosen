import React, { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineCalendar, AiOutlineClockCircle, AiOutlineEnvironment, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { jadwalAPI } from "../../../services/jadwalAPI";
import BuatJadwalBaru from "./TambahJadwal";
import EditJadwal from "./EditJadwal";

const MasterJadwal = () => {
  const [dataJadwal, setDataJadwal] = useState([]);
  const [cari, setCari] = useState("");
  const [filterProdi, setFilterProdi] = useState("Semua Program Studi");
  const [isModalTerbuka, setIsModalTerbuka] = useState(false);
  const [isEditTerbuka, setIsEditTerbuka] = useState(false);
  const [jadwalEdit, setJadwalEdit] = useState(null);
  const [jadwalTerpilih, setJadwalTerpilih] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pesanError, setPesanError] = useState("");

  const muatData = async () => {
    setIsLoading(true);
    setPesanError("");
    try {
      const data = await jadwalAPI.fetchJadwal();
      setDataJadwal(data || []);
    } catch (error) {
      setPesanError("Gagal terhubung dengan server database jadwal.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    muatData();
  }, []);

  const tanganiHapusSatu = async (id) => {
    if (window.confirm("Yakin ingin menghapus jadwal ini?")) {
      await jadwalAPI.deleteJadwal(id);
      muatData();
    }
  };

  const tanganiHapusBanyak = async () => {
    if (window.confirm(`Yakin hapus ${jadwalTerpilih.length} jadwal terpilih?`)) {
      for (const id of jadwalTerpilih) {
        await jadwalAPI.deleteJadwal(id);
      }
      setJadwalTerpilih([]);
      muatData();
    }
  };

  const jadwalTerfilter = dataJadwal.filter((jdl) => {
    const namaMK = jdl?.mata_kuliah?.toLowerCase() || "";
    const dosenMK = jdl?.nidn_dosen?.toLowerCase() || "";
    const kodeMK = jdl?.kode_mk?.toLowerCase() || "";
    const cocokCari = namaMK.includes(cari.toLowerCase()) || dosenMK.includes(cari.toLowerCase()) || kodeMK.includes(cari.toLowerCase());
    let cocokProdi = true;
    if (jdl.kode_mk) {
      if (filterProdi === "D4 Pengolahan dan Penyimpanan Hasil Perikanan") cocokProdi = jdl.kode_mk.toUpperCase().startsWith("PPHP");
      else if (filterProdi === "D3 Perikanan Tangkap") cocokProdi = jdl.kode_mk.toUpperCase().startsWith("PTK");
      else if (filterProdi === "D3 Budi Daya Ikan") cocokProdi = jdl.kode_mk.toUpperCase().startsWith("BDI");
    }
    return cocokCari && cocokProdi;
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-fadeIn">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <AiOutlineSearch className="absolute left-4 top-3.5 text-slate-400 text-lg" />
          <input type="text" placeholder="Cari..." value={cari} onChange={(e) => setCari(e.target.value)} className="w-full bg-slate-50 text-xs pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none" />
        </div>
        <div className="flex gap-2">
          {jadwalTerpilih.length > 0 && (
            <button onClick={tanganiHapusBanyak} className="bg-red-600 text-white text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-red-700 transition">
              <AiOutlineDelete /> Hapus ({jadwalTerpilih.length})
            </button>
          )}
          <button onClick={() => setIsModalTerbuka(true)} className="bg-black text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition">
            <AiOutlinePlus /> Buat Jadwal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jadwalTerfilter.map((jdl) => (
          <div key={jdl.id_jadwal} className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm relative flex flex-col justify-between">
            <input 
              type="checkbox" 
              className="absolute top-5 right-5 w-5 h-5 cursor-pointer z-10"
              checked={jadwalTerpilih.includes(jdl.id_jadwal)}
              onChange={(e) => {
                if (e.target.checked) setJadwalTerpilih([...jadwalTerpilih, jdl.id_jadwal]);
                else setJadwalTerpilih(jadwalTerpilih.filter(id => id !== jdl.id_jadwal));
              }}
            />
            <div>
              <div className="flex justify-between items-start pr-8">
                <span className="bg-slate-900 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md">{jdl.kelas || "Reguler"}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md truncate max-w-[120px]">{jdl.kode_mk || "MK"} • {jdl.sks || "0"} SKS</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-3 pr-8">{jdl.mata_kuliah}</h4>
              <p className="text-xs font-medium text-slate-400 mt-1">NIDN: {jdl.nidn_dosen}</p>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1 mt-3">
                <div className="flex items-center gap-2"><AiOutlineCalendar /> <span>{jdl.hari}</span></div>
                <div className="flex items-center gap-2"><AiOutlineClockCircle /> <span>{jdl.jam_mulai?.substring(0, 5)} - {jdl.jam_selesai?.substring(0, 5)} WIB</span></div>
                <div className="flex items-center gap-2"><AiOutlineEnvironment /> <span>{jdl.ruangan}</span></div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
              <button onClick={() => { setJadwalEdit(jdl); setIsEditTerbuka(true); }} className="flex-1 text-xs bg-blue-50 text-blue-600 font-bold py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-1"><AiOutlineEdit /> Edit</button>
              <button onClick={() => tanganiHapusSatu(jdl.id_jadwal)} className="flex-1 text-xs bg-red-50 text-red-600 font-bold py-2 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1"><AiOutlineDelete /> Hapus</button>
            </div>
          </div>
        ))}
      </div>

      <BuatJadwalBaru isModalTerbuka={isModalTerbuka} setIsModalTerbuka={setIsModalTerbuka} onSuksesSimpan={muatData} />
      <EditJadwal isEditTerbuka={isEditTerbuka} setIsEditTerbuka={setIsEditTerbuka} dataEdit={jadwalEdit} onSuksesEdit={muatData} />
    </div>
  );
};
export default MasterJadwal;