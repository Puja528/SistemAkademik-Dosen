import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { mahasiswaAPI } from "../../../services/mahasiswaAPI.js"; 
import { supabase } from "../../../supabaseClient";

const EditMahasiswa = ({ isEditTerbuka, setIsEditTerbuka, dataTerpilih, onSuksesEdit }) => {
  const [inputEdit, setInputEdit] = useState({
    id_mahasiswa: "",
    nama: "",
    program_studi: "",
    emailPrefix: "",
    id: "",
    angkatan: "",
    status: "Aktif",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [daftarKelas, setDaftarKelas] = useState([]);
  
  const tahunSekarang = new Date().getFullYear();
  const daftarAngkatan = [tahunSekarang.toString(), (tahunSekarang + 1).toString()];

  useEffect(() => {
    const fetchKelas = async () => {
      const { data } = await supabase.from("kelas").select("id, nama_kelas");
      setDaftarKelas(data || []);
    };
    fetchKelas();

    if (dataTerpilih) {
      const emailPrefix = dataTerpilih.email ? dataTerpilih.email.split('@')[0] : "";
      
      setInputEdit({
        id_mahasiswa: dataTerpilih.id_mahasiswa || "",
        nama: dataTerpilih.nama || "",
        program_studi: dataTerpilih.program_studi || "",
        emailPrefix: emailPrefix,
        id: dataTerpilih.id?.toString() || "",
        angkatan: dataTerpilih.angkatan?.toString() || tahunSekarang.toString(),
        status: dataTerpilih.status || "Aktif",
      });
    }
  }, [dataTerpilih, isEditTerbuka]);

  if (!isEditTerbuka) return null;

  const tanganiUbahMahasiswa = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailLengkap = `${inputEdit.emailPrefix.trim()}@polteksim.ac.id`;

    const dataSiapUpdate = {
      nama: inputEdit.nama.trim(),
      program_studi: inputEdit.program_studi,
      email: emailLengkap,
      id: parseInt(inputEdit.id),
      angkatan: parseInt(inputEdit.angkatan),
      status: inputEdit.status
    };

    try {
      await mahasiswaAPI.updateMahasiswa(inputEdit.id_mahasiswa, dataSiapUpdate);
      onSuksesEdit(); 
      setIsEditTerbuka(false); 
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Gagal: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[9999] p-6 md:p-12 text-slate-700 overflow-y-auto min-h-screen">
      <form onSubmit={tanganiUbahMahasiswa} className="max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center border-b border-slate-100 pb-5 mb-8">
          <div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">Perbarui Data Mahasiswa</h3>
            <p className="text-xs text-slate-400 mt-0.5">Edit berkas data mahasiswa untuk NIM: <span className="font-bold">{inputEdit.id_mahasiswa}</span></p>
          </div>
          <button type="button" onClick={() => setIsEditTerbuka(false)} className="text-slate-400 hover:text-slate-900 p-2.5 rounded-xl bg-slate-50 transition border border-slate-200 flex items-center gap-2 text-xs font-bold">
            <AiOutlineClose /> Tutup
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">NIM</label>
            <input type="text" disabled value={inputEdit.id_mahasiswa} className="w-full bg-slate-100 text-slate-400 text-xs px-4 py-3 rounded-xl border border-slate-200 cursor-not-allowed" />
          </div>

          <div className="space-y-1 lg:col-span-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nama Lengkap</label>
            <input type="text" required value={inputEdit.nama} onChange={(e) => setInputEdit({ ...inputEdit, nama: e.target.value })} className="w-full bg-slate-50 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:border-black transition outline-none" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Program Studi</label>
            <select required value={inputEdit.program_studi} onChange={(e) => setInputEdit({ ...inputEdit, program_studi: e.target.value })} className="w-full bg-slate-50 text-xs px-4 py-3 rounded-xl border border-slate-200 cursor-pointer outline-none">
              <option value="D4 Pengolahan dan Penyimpanan Hasil Perikanan">D4 Pengolahan dan Penyimpanan Hasil Perikanan</option>
              <option value="D3 Perikanan Tangkap">D3 Perikanan Tangkap</option>
              <option value="D3 Budi Daya Ikan">D3 Budi Daya Ikan</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kelas</label>
            <select required value={inputEdit.id} onChange={(e) => setInputEdit({ ...inputEdit, id: e.target.value })} className="w-full bg-slate-50 text-xs px-4 py-3 rounded-xl border border-slate-200 cursor-pointer outline-none">
              {daftarKelas.map((k) => <option key={k.id} value={k.id}>{k.nama_kelas}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Angkatan</label>
            <select required value={inputEdit.angkatan} onChange={(e) => setInputEdit({ ...inputEdit, angkatan: e.target.value })} className="w-full bg-slate-50 text-xs px-4 py-3 rounded-xl border border-slate-200 cursor-pointer outline-none">
              {daftarAngkatan.map((thn) => <option key={thn} value={thn}>{thn}</option>)}
            </select>
          </div>

          <div className="space-y-1 lg:col-span-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Institusi</label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-black transition">
              <input type="text" required value={inputEdit.emailPrefix} onChange={(e) => setInputEdit({ ...inputEdit, emailPrefix: e.target.value })} className="w-full bg-transparent text-xs px-4 py-3 focus:outline-none" />
              <span className="text-[10px] font-bold text-slate-400 px-4 bg-slate-100 py-3 border-l border-slate-200">@polteksim.ac.id</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 mt-12 flex justify-end gap-4">
          <button type="button" onClick={() => setIsEditTerbuka(false)} className="w-40 bg-slate-100 text-slate-700 text-xs font-bold py-3.5 rounded-xl hover:bg-slate-200 transition">Batalkan</button>
          <button type="submit" disabled={isSubmitting} className={`w-60 text-white text-xs font-bold py-3.5 rounded-xl transition ${isSubmitting ? "bg-slate-400" : "bg-black hover:bg-slate-800"}`}>
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMahasiswa;