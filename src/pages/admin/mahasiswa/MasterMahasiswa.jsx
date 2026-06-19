import React, { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineMore, AiOutlineMail, AiOutlineEdit, AiOutlineDelete, AiOutlineWarning } from "react-icons/ai";
import { mahasiswaAPI } from "../../../services/mahasiswaAPI.js";
import TambahMahasiswa from "./TambahMahasiswa";
import EditMahasiswa from "./EditMahasiswa";
import Loading from "../../../components/admin/Loading.jsx";

const MasterMahasiswa = () => {
  const [dataMhs, setDataMhs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cari, setCari] = useState("");
  const [filterProdi, setFilterProdi] = useState("Semua Program Studi");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  const [isTambahTerbuka, setIsTambahTerbuka] = useState(false);

  const [dropdownAktif, setDropdownAktif] = useState(null);
  const [dataTerpilih, setDataTerpilih] = useState(null);
  const [isEditTerbuka, setIsEditTerbuka] = useState(false);
  const [isHapusTerbuka, setIsHapusTerbuka] = useState(false);

  const ambilDataMahasiswa = async () => {
    try {
      setLoading(true);
      const data = await mahasiswaAPI.fetchMahasiswa();
      setDataMhs(data ? [...data].reverse() : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal mengambil data dari database: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ambilDataMahasiswa();
  }, []);

  const tanganiTambahMhsLokal = () => {
    ambilDataMahasiswa();
  };

  const tanganiEditMhsLokal = () => {
    ambilDataMahasiswa();
  };

  const tanganiHapusMhsDatabase = async () => {
    try {
      await mahasiswaAPI.deleteMahasiswa(dataTerpilih.id_mahasiswa);
      setIsHapusTerbuka(false);
      setDataTerpilih(null);
      ambilDataMahasiswa();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Gagal menghapus data: " + (error.response?.data?.message || error.message));
    }
  };

  const dataTerfilter = dataMhs.filter((mhs) => {
    const namaMhs = mhs?.nama ? mhs.nama.toLowerCase() : "";
    const idMhs = mhs?.id_mahasiswa ? mhs.id_mahasiswa.toLowerCase() : "";
    
    const cocokCari = namaMhs.includes(cari.toLowerCase()) || idMhs.includes(cari.toLowerCase());
    const cocokProdi = filterProdi === "Semua Program Studi" || mhs.program_studi === filterProdi;
    const cocokStatus = filterStatus === "Semua Status" || mhs.status === filterStatus;
    
    return cocokCari && cocokProdi && cocokStatus;
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-fadeIn relative">
      
      <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        
        <div className="relative w-full md:w-96">
          <AiOutlineSearch className="absolute left-4 top-3.5 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau NIM..."
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            className="w-full bg-slate-50 text-xs font-medium pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-black transition"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
          
          <select 
            value={filterProdi}
            onChange={(e) => setFilterProdi(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 text-xs font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none max-w-xs truncate cursor-pointer"
          >
            <option>Semua Program Studi</option>
            <option>D4 Pengolahan dan Penyimpanan Hasil Perikanan</option>
            <option>D3 Perikanan Tangkap</option>
            <option>D3 Budi Daya Ikan</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 text-xs font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none cursor-pointer"
          >
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Nonaktif</option>
          </select>

          <button 
            type="button"
            onClick={() => setIsTambahTerbuka(true)} 
            className="w-full sm:w-auto bg-black text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-sm shrink-0"
          >
            <AiOutlinePlus className="text-sm" />
            <span>Tambah Mahasiswa</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">ID Mahasiswa</th>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Prodi</th>
                <th className="px-6 py-4">Kelas</th>
                <th className="px-6 py-4">Angkatan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-600">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-slate-400 font-semibold bg-slate-50/20">
                    <Loading/>
                  </td>
                </tr>
              ) : dataTerfilter.length > 0 ? (
                dataTerfilter.map((mhs, idx) => (
                  <tr key={mhs.id_mahasiswa} className="hover:bg-slate-50/40 transition">
                    <td className="px-6 py-4.5 text-sm font-medium text-slate-900">{mhs.id_mahasiswa}</td>
                    <td className="px-6 py-4.5 text-sm font-medium text-slate-900">{mhs.nama}</td>
                    <td className="px-6 py-4.5 text-sm font-normal text-slate-500">{mhs.program_studi}</td>
                    <td className="px-6 py-4.5 text-sm font-normal text-slate-500">{mhs.kelas?.nama_kelas}</td>
                    <td className="px-6 py-4.5 text-sm font-normal text-slate-500">{mhs.angkatan}</td>
                    <td className="px-6 py-4.5">
                      <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md inline-block leading-none ${mhs.status === "Aktif" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"}`}>
                        {mhs.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-center relative overflow-visible">
                      <button 
                        type="button"
                        onClick={() => setDropdownAktif(dropdownAktif === idx ? null : idx)}
                        className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-50 transition"
                      >
                        <AiOutlineMore className="text-lg" />
                      </button>

                      {dropdownAktif === idx && (
                        <div className="absolute right-14 top-2 w-32 bg-white border border-slate-200/80 shadow-xl rounded-xl p-1 z-50 text-left animate-fadeIn">
                          <button
                            type="button"
                            onClick={() => {
                              setDataTerpilih(mhs);
                              setIsEditTerbuka(true);
                              setDropdownAktif(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition"
                          >
                            <AiOutlineEdit className="text-slate-500 text-sm" />
                            <span>Edit Data</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDataTerpilih(mhs);
                              setIsHapusTerbuka(true);
                              setDropdownAktif(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          >
                            <AiOutlineDelete className="text-rose-500 text-sm" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-slate-400 font-semibold bg-slate-50/20">
                    Data mahasiswa tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TambahMahasiswa 
        isTambahTerbuka={isTambahTerbuka} 
        setIsTambahTerbuka={setIsTambahTerbuka} 
        onSuksesSimpan={tanganiTambahMhsLokal} 
      />

      <EditMahasiswa 
        isEditTerbuka={isEditTerbuka}
        setIsEditTerbuka={setIsEditTerbuka}
        dataTerpilih={dataTerpilih}
        onSuksesEdit={tanganiEditMhsLokal}
      />

      {isHapusTerbuka && dataTerpilih && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-[99999] animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-100 max-w-md w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4 text-rose-600">
              <AiOutlineWarning className="text-2xl" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Konfirmasi Hapus Data</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Apakah Anda yakin ingin menghapus mahasiswa bernama <strong className="text-slate-900 font-semibold">{dataTerpilih.nama}</strong> ({dataTerpilih.id_mahasiswa})? 
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button 
                type="button" 
                onClick={() => setIsHapusTerbuka(false)} 
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition"
              >
                Batal
              </button>
              <button 
                type="button" 
                onClick={tanganiHapusMhsDatabase} 
                className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 rounded-xl transition"
              >
                Ya, Hapus Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterMahasiswa;