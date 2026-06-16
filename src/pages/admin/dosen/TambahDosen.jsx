import React, { useState } from "react";
import { AiOutlineClose, AiOutlineUser, AiOutlineMail, AiOutlineIdcard } from "react-icons/ai";

const TambahDosen = ({ isTambahTerbuka, setIsTambahTerbuka, onSuksesSimpan }) => {
  // Model state form penampung data input baru
  const [inputBaru, setInputBaru] = useState({
    nidn: "",
    nama: "",
    program_studi: "D4 Pengolahan dan Penyimpanan Hasil Perikanan",
    email: "",
    status: "Aktif",
  });

  if (!isTambahTerbuka) return null;

  const tanganiSimpanDosen = (e) => {
    e.preventDefault();
    
    // Alirkan data objek bentukan baru menuju fungsi state induk di MasterDosen
    onSuksesSimpan(inputBaru); 
    
    // Sembunyikan jendela modal form
    setIsTambahTerbuka(false);
    
    // Kembalikan isian field form ke strings kosong
    setInputBaru({
      nidn: "",
      nama: "",
      program_studi: "D4 Pengolahan dan Penyimpanan Hasil Perikanan",
      email: "",
      status: "Aktif",
    });
  };

  return (
    // BACKDROP SCREEN LAYOVER
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-hidden animate-fadeIn">
      
      {/* BOX PANEL LAYOUT */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* HEADER MODAL */}
        <div className="flex justify-between items-center border-b border-slate-100 p-6 shrink-0">
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Formulir Tambah Dosen</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Politeknik Simeulue • Manajemen Data Master</p>
          </div>
          <button 
            type="button"
            onClick={() => setIsTambahTerbuka(false)}
            className="text-slate-400 hover:text-black p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition border border-slate-200"
          >
            <AiOutlineClose className="text-sm" />
          </button>
        </div>

        {/* INPUT CONTENT AREA (Scrollable area) */}
        <form onSubmit={tanganiSimpanDosen} className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-700">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Field Nomor NIDN */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <AiOutlineIdcard className="text-sm" /> NIDN / NUP
              </label>
              <input
                type="text"
                required
                maxLength="10"
                placeholder="Contoh: 0112038901"
                value={inputBaru.nidn}
                onChange={(e) => setInputBaru({ ...inputBaru, nidn: e.target.value })}
                className="w-full bg-slate-50 text-xs font-medium px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
              />
            </div>

            {/* Field Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <AiOutlineUser className="text-sm" /> Nama Lengkap & Gelar
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Ahmad Fauzi, S.Pi., M.Si."
                value={inputBaru.nama}
                onChange={(e) => setInputBaru({ ...inputBaru, nama: e.target.value })}
                className="w-full bg-slate-50 text-xs font-medium px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
              />
            </div>

            {/* Field Email */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <AiOutlineMail className="text-sm" /> Email Resmi Akademik
              </label>
              <input
                type="email"
                required
                placeholder="Contoh: nama.dosen@polteksimeulue.ac.id"
                value={inputBaru.email}
                onChange={(e) => setInputBaru({ ...inputBaru, email: e.target.value })}
                className="w-full bg-slate-50 text-xs font-medium px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
              />
            </div>

            {/* Dropdown Homebase Program Studi */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Homebase Program Studi</label>
              <select
                value={inputBaru.program_studi}
                onChange={(e) => setInputBaru({ ...inputBaru, program_studi: e.target.value })}
                className="w-full bg-slate-50 text-xs font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer"
              >
                <option>D4 Pengolahan dan Penyimpanan Hasil Perikanan</option>
                <option>D3 Perikanan Tangkap</option>
                <option>D3 Budi Daya Ikan</option>
              </select>
            </div>

            {/* Dropdown Status Kepegawaian */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status Kepegawaian</label>
              <select
                value={inputBaru.status}
                onChange={(e) => setInputBaru({ ...inputBaru, status: e.target.value })}
                className="w-full bg-slate-50 text-xs font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer"
              >
                <option>Aktif</option>
                <option>Nonaktif</option>
              </select>
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-5 border-t border-slate-100 bg-white sticky bottom-0 z-10">
            <button
              type="button"
              onClick={() => setIsTambahTerbuka(false)}
              className="flex-1 bg-slate-100 text-slate-700 text-xs font-bold py-3 rounded-xl hover:bg-slate-200 transition"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="flex-1 bg-black text-white text-xs font-bold py-3 rounded-xl hover:bg-slate-800 transition shadow-md"
            >
              Simpan Data Dosen
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TambahDosen;