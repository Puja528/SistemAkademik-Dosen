import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const BuatJadwalBaru = ({ isModalTerbuka, setIsModalTerbuka, onSuksesSimpan }) => {
  const [formInput, setFormInput] = useState({
    kode_mk: "",
    nama_mk: "",
    dosen: "",
    hari: "",
    jamMulai: "",
    jamSelesai: "",
    ruangan: "",
    kelas: "",
    sks: "",
    semester: ""
  });

  if (!isModalTerbuka) return null;

  const tanganiFormSubmit = (e) => {
    e.preventDefault();

    if (!formInput.kode_mk || !formInput.hari || !formInput.ruangan || !formInput.dosen) {
      alert("Mohon lengkapi semua pilihan dropdown yang tersedia.");
      return;
    }

    const gabungJam = `${formInput.jamMulai} - ${formInput.jamSelesai}`;

    const objekJadwalSiapKirim = {
      id_jadwal: `JDW${Math.floor(100 + Math.random() * 900)}`,
      kode_mk: formInput.kode_mk,
      nama_mk: formInput.nama_mk,
      dosen: formInput.dosen,
      hari: formInput.hari,
      jam: gabungJam,
      ruangan: formInput.ruangan,
      kelas: formInput.kelas.toUpperCase(),
      sks: parseInt(formInput.sks) || 0,
      semester: parseInt(formInput.semester) || 0
    };

    onSuksesSimpan(objekJadwalSiapKirim);
    setIsModalTerbuka(false);

    setFormInput({
      kode_mk: "",
      nama_mk: "",
      dosen: "",
      hari: "",
      jamMulai: "",
      jamSelesai: "",
      ruangan: "",
      kelas: "",
      sks: "",
      semester: ""
    });
  };

  return (
    // FULLSCREEN LAYER (Mengunci layar penuh secara mutlak)
    <div className="fixed inset-0 bg-white z-[9999] p-6 md:p-12 animate-fadeIn text-slate-700 overflow-y-auto">
      
      <form onSubmit={tanganiFormSubmit} className="max-w-6xl mx-auto w-full pb-24 relative">
        
        {/* 1. HEADER UTAMA (Bersih dari tag label atas untuk menghemat ruang vertikal) */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-5 mb-6 w-full">
          <div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">
              Penerbitan Jadwal Perkuliahan Baru
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Politeknik Kepulauan Simeulue • Sistem Informasi Akademik Terpadu
            </p>
          </div>
          
          <button 
            type="button"
            onClick={() => setIsModalTerbuka(false)}
            className="text-slate-400 hover:text-slate-900 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition border border-slate-200 flex items-center gap-2 text-xs font-bold"
          >
            <AiOutlineClose className="text-sm" />
            <span>Tutup</span>
          </button>
        </div>

        {/* 2. AREA DATA GRID INPUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 w-full">
          
          {/* Program Studi */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Program Studi (Kode)</label>
            <select
              required
              value={formInput.kode_mk}
              onChange={(e) => setFormInput({ ...formInput, kode_mk: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer"
            >
              <option value="" disabled hidden>-- Pilih Program Studi --</option>
              <option value="PPHP">PPHP (D4 Pengolahan Hasil Perikanan)</option>
              <option value="PTK">PTK (D3 Perikanan Tangkap)</option>
              <option value="BDI">BDI (D3 Budi Daya Ikan)</option>
            </select>
          </div>

          {/* Nama Kelas */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nama Kelas</label>
            <input
              type="text"
              required
              placeholder="Contoh: PPHP-2A atau BDI-4B"
              value={formInput.kelas}
              onChange={(e) => setFormInput({ ...formInput, kelas: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
            />
          </div>

          {/* Hari Pelaksanaan */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hari Kuliah</label>
            <select
              required
              value={formInput.hari}
              onChange={(e) => setFormInput({ ...formInput, hari: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer"
            >
              <option value="" disabled hidden>-- Pilih Hari Kuliah --</option>
              <option>Senin</option>
              <option>Selasa</option>
              <option>Rabu</option>
              <option>Kamis</option>
              <option>Jumat</option>
            </select>
          </div>

          {/* Nama Mata Kuliah */}
          <div className="space-y-1 lg:col-span-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nama Lengkap Mata Kuliah</label>
            <input
              type="text"
              required
              placeholder="Masukkan judul mata kuliah kurikulum..."
              value={formInput.nama_mk}
              onChange={(e) => setFormInput({ ...formInput, nama_mk: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
            />
          </div>

          {/* Ruangan */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ruang / Laboratorium</label>
            <select
              required
              value={formInput.ruangan}
              onChange={(e) => setFormInput({ ...formInput, ruangan: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
            >
              <option value="" disabled hidden>-- Pilih Lokasi Ruangan --</option>
              <option>Lab Pengolahan Modern</option>
              <option>Lab Hatchery & Pembenihan</option>
              <option>Lab Uji Mutu & Mikrobiologi</option>
              <option>Ruang Teori Bahari 105</option>
            </select>
          </div>

          {/* Dosen Pengampu */}
          <div className="space-y-1 lg:col-span-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dosen Pengampu Utama</label>
            <select
              required
              value={formInput.dosen}
              onChange={(e) => setFormInput({ ...formInput, dosen: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer"
            >
              <option value="" disabled hidden>-- Pilih Dosen Pengampu Berlisensi --</option>
              <option>Zulkifli, S.Pi., M.Si.</option>
              <option>Siti Aminah, S.St.Pi., M.T.</option>
              <option>Bambang Hermawan, S.Pi., M.Si.</option>
              <option>Rinaawati, S.Pi., M.Si.</option>
            </select>
          </div>

          {/* Jam Operasional Kuliah */}
          <div className="grid grid-cols-2 gap-3 lg:col-span-1">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jam Mulai</label>
              <input
                type="time"
                required
                value={formInput.jamMulai}
                onChange={(e) => setFormInput({ ...formInput, jamMulai: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jam Selesai</label>
              <input
                type="time"
                required
                value={formInput.jamSelesai}
                onChange={(e) => setFormInput({ ...formInput, jamSelesai: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
              />
            </div>
          </div>

          {/* Bobot SKS */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bobot SKS Perkuliahan</label>
            <input
              type="number"
              min="1"
              max="6"
              required
              placeholder="Contoh SKS: 3"
              value={formInput.sks}
              onChange={(e) => setFormInput({ ...formInput, sks: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
            />
          </div>

          {/* Tingkat Semester */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alokasi Semester</label>
            <input
              type="number"
              min="1"
              max="8"
              required
              placeholder="Contoh Semester: 3"
              value={formInput.semester}
              onChange={(e) => setFormInput({ ...formInput, semester: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
            />
          </div>

        </div>

        {/* 3. FIXED FOOTER BUTTONS BAR */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-5 z-[10000]">
          <div className="max-w-6xl mx-auto flex justify-end gap-4 w-full">
            <button
              type="button"
              onClick={() => setIsModalTerbuka(false)}
              className="w-full sm:w-44 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3.5 rounded-xl transition active:scale-[0.98]"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="w-full sm:w-64 bg-black hover:bg-slate-800 text-white text-xs font-bold py-3.5 rounded-xl transition active:scale-[0.98] shadow-md"
            >
              Simpan & Terbitkan Jadwal
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default BuatJadwalBaru;