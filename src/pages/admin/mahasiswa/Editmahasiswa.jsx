import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { mahasiswaAPI } from "../../../services/mahasiswaAPI.js"; 

const EditMahasiswa = ({ isEditTerbuka, setIsEditTerbuka, dataTerpilih, onSuksesEdit }) => {
  const [inputEdit, setInputEdit] = useState({
    id_mahasiswa: "",
    nama: "",
    program_studi: "",
    email: "",
    ipk: "",
    status: "Aktif",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sinkronisasi data mahasiswa terpilih ke dalam state form edit
  useEffect(() => {
    if (dataTerpilih) {
      setInputEdit({
        id_mahasiswa: dataTerpilih.id_mahasiswa || "",
        nama: dataTerpilih.nama || "",
        program_studi: dataTerpilih.program_studi || "",
        email: dataTerpilih.email || "",
        ipk: dataTerpilih.ipk || "",
        status: dataTerpilih.status || "Aktif",
      });
    }
  }, [dataTerpilih, isEditTerbuka]);

  if (!isEditTerbuka) return null;

  const tanganiUbahMahasiswa = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataSiapUpdate = {
      nama: inputEdit.nama.trim(),
      program_studi: inputEdit.program_studi,
      email: inputEdit.email.trim(),
      ipk: parseFloat(inputEdit.ipk) || 0.00,
      status: inputEdit.status
    };

    try {
      // Mengirim data pembaruan ke database
      await mahasiswaAPI.updateMahasiswa(inputEdit.id_mahasiswa, dataSiapUpdate);
      onSuksesEdit(); 
      setIsEditTerbuka(false); 
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Gagal memperbarui data: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Pembungkus Full Screen yang menutupi dashboard (Tanpa scrollbar paksa)
    <div className="fixed inset-0 bg-white z-[9999] p-6 md:p-12 text-slate-700 overflow-y-auto min-h-screen flex flex-col justify-between">
      
      <form onSubmit={tanganiUbahMahasiswa} className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between">
        
        {/* BAGIAN ATAS: HEADER & INPUT */}
        <div>
          {/* HEADER FORM */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-5 mb-8 w-full">
            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">
                Perbarui Data Mahasiswa
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Ubah berkas data mahasiswa resmi untuk NIM: <span className="text-slate-800 font-bold">{inputEdit.id_mahasiswa}</span>
              </p>
            </div>
            
            <button 
              type="button"
              onClick={() => setIsEditTerbuka(false)}
              className="text-slate-400 hover:text-slate-900 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition border border-slate-200 flex items-center gap-2 text-xs font-bold"
            >
              <AiOutlineClose className="text-sm" />
              <span>Tutup</span>
            </button>
          </div>

          {/* AREA INPUT GRID (Struktur matriks kembar identik dengan TambahMahasiswa) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 w-full">
            
            {/* NIM (Disabled / Read-Only karena primary key) */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nomor Induk Mahasiswa (NIM)</label>
              <input
                type="text"
                disabled
                value={inputEdit.id_mahasiswa}
                className="w-full bg-slate-100 text-slate-400 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 cursor-not-allowed select-none"
              />
            </div>

            {/* Nama Lengkap ( col-span-2 agar panjang ) */}
            <div className="space-y-1 lg:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nama Lengkap </label>
              <input
                type="text"
                required
                placeholder="Contoh: Muhammad Rafli"
                value={inputEdit.nama}
                onChange={(e) => setInputEdit({ ...inputEdit, nama: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
              />
            </div>

            {/* Program Studi */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Program Studi </label>
              <select
                required
                value={inputEdit.program_studi}
                onChange={(e) => setInputEdit({ ...inputEdit, program_studi: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer"
              >
                <option value="D4 Pengolahan dan Penyimpanan Hasil Perikanan">PPHP (D4 Pengolahan Hasil Perikanan)</option>
                <option value="D3 Perikanan Tangkap">PTK (D3 Perikanan Tangkap)</option>
                <option value="D3 Budi Daya Ikan">BDI (D3 Budi Daya Ikan)</option>
              </select>
            </div>

            {/* Email ( col-span-2 ) */}
            <div className="space-y-1 lg:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Institusi Resmi</label>
              <input
                type="email"
                required
                placeholder="Contoh: mahasiswa@polteksimeulue.ac.id"
                value={inputEdit.email}
                onChange={(e) => setInputEdit({ ...inputEdit, email: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
              />
            </div>

            {/* IPK */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">IPK Terakhir</label>
              <input
                type="number"
                required
                step="0.01"
                min="0.00"
                max="4.00"
                placeholder="Contoh: 3.75"
                value={inputEdit.ipk}
                onChange={(e) => setInputEdit({ ...inputEdit, ipk: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition"
              />
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status</label>
              <select
                required
                value={inputEdit.status}
                onChange={(e) => setInputEdit({ ...inputEdit, status: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-black focus:bg-white transition cursor-pointer"
              >
                <option value="Aktif">Aktif</option>
                <option value="Cuti">Cuti</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>

          </div>
        </div>

        {/* BAGIAN BAWAH: TOMBOL AKSI (Menyatu natural di bawah input terakhir, anti-tabrakan) */}
        <div className="border-t border-slate-100 pt-6 mt-12 flex justify-end gap-4 w-full bg-white">
          <button
            type="button"
            onClick={() => setIsEditTerbuka(false)}
            className="w-full sm:w-44 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3.5 rounded-xl transition active:scale-[0.98]"
          >
            Batalkan
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-64 text-white text-xs font-bold py-3.5 rounded-xl transition active:scale-[0.98] shadow-md ${
              isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-black hover:bg-slate-800"
            }`}
          >
            {isSubmitting ? "Menyimpan Perubahan..." : "Simpan Perubahan"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditMahasiswa;