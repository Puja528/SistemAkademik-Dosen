import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { jadwalAPI } from "../../../services/jadwalAPI";

const EditJadwal = ({ isEditTerbuka, setIsEditTerbuka, dataEdit, onSuksesEdit }) => {
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (dataEdit) {
      setForm({ ...dataEdit });
    }
  }, [dataEdit]);

  const tanganiSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await jadwalAPI.updateJadwal(form.id_jadwal, form);
      onSuksesEdit();
      setIsEditTerbuka(false);
    } catch (err) { alert("Gagal memperbarui jadwal"); }
    finally { setIsSubmitting(false); }
  };

  if (!isEditTerbuka) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <form onSubmit={tanganiSubmit} className="bg-white max-w-4xl w-full p-8 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-900">Edit Jadwal: {form.mata_kuliah}</h2>
          <button type="button" onClick={() => setIsEditTerbuka(false)} className="p-2 bg-slate-100 rounded-full"><AiOutlineClose /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Mata Kuliah", key: "mata_kuliah" },
            { label: "Kode MK", key: "kode_mk" },
            { label: "NIDN Dosen", key: "nidn_dosen" },
            { label: "Hari", key: "hari" },
            { label: "Jam Mulai", key: "jam_mulai", type: "time" },
            { label: "Jam Selesai", key: "jam_selesai", type: "time" },
            { label: "Ruangan", key: "ruangan" },
            { label: "Kelas", key: "kelas" },
          ].map((field) => (
            <div key={field.key} className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{field.label}</label>
              <input 
                type={field.type || "text"}
                value={form[field.key] || ""}
                onChange={(e) => setForm({...form, [field.key]: e.target.value})}
                className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-semibold focus:border-black outline-none transition"
              />
            </div>
          ))}

          {/* Dropdown untuk SKS */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SKS</label>
            <select value={form.sks || ""} onChange={(e) => setForm({...form, sks: parseInt(e.target.value)})} className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-semibold outline-none transition">
              {[1, 2, 3, 4, 6].map(num => <option key={num} value={num}>{num} SKS</option>)}
            </select>
          </div>

          {/* Dropdown untuk Semester */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Semester</label>
            <select value={form.semester || ""} onChange={(e) => setForm({...form, semester: parseInt(e.target.value)})} className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-semibold outline-none transition">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => <option key={num} value={num}>Semester {num}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button type="button" onClick={() => setIsEditTerbuka(false)} className="px-6 py-3 rounded-xl font-bold text-xs bg-slate-100">Batal</button>
          <button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-xl font-bold text-xs bg-black text-white">
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditJadwal;