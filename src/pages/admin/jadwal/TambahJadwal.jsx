import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { jadwalAPI } from "../../../services/jadwalAPI";
import { dosenAPI } from "../../../services/dosenAPI";
import axios from "axios";

const TambahJadwal = ({ isModalTerbuka, setIsModalTerbuka, onSuksesSimpan }) => {
  const [form, setForm] = useState({
    kode_mk: "", nama_mk: "", dosen: "", hari: "", 
    jamMulai: "08:00", jamSelesai: "", ruangan: "Lab Pengolahan Modern", 
    kelas: "", id_kelas: "", sks: 2, semester: 1
  });
  
  const [daftarDosen, setDaftarDosen] = useState([]);
  const [daftarKelas, setDaftarKelas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isModalTerbuka) {
      const ambilDataMaster = async () => {
        try {
          const [dsn, kls] = await Promise.all([
            dosenAPI.fetchDosen(),
            axios.get("https://mwkewvjpgcvlwgycdpvo.supabase.co/rest/v1/kelas", {
              headers: { apikey: "sb_publishable_-mjKGRjVH18ef1G8ZCjTHg_dcP5lVxK", Authorization: "Bearer sb_publishable_-mjKGRjVH18ef1G8ZCjTHg_dcP5lVxK" }
            })
          ]);
          setDaftarDosen(dsn || []);
          setDaftarKelas(kls.data || []);
        } catch (err) { console.error(err); }
      };
      ambilDataMaster();
    }
  }, [isModalTerbuka]);

  const tanganiSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        mata_kuliah: form.nama_mk,
        nidn_dosen: form.dosen,
        hari: form.hari,
        jam_mulai: form.jamMulai,
        jam_selesai: form.jamSelesai,
        ruangan: form.ruangan,
        kode_mk: `${form.kode_mk}-${form.semester}${form.kelas}`,
        kelas: form.kelas,
        id_kelas: parseInt(form.id_kelas),
        sks: parseInt(form.sks),
        semester: parseInt(form.semester)
      };
      const res = await jadwalAPI.createJadwal(payload);
      onSuksesSimpan(Array.isArray(res) ? res[0] : res);
      setIsModalTerbuka(false);
    } catch (err) { alert("Gagal menyimpan jadwal"); }
    finally { setIsSubmitting(false); }
  };

  if (!isModalTerbuka) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <form onSubmit={tanganiSubmit} className="bg-white max-w-4xl w-full p-8 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-900">Tambah Jadwal Baru</h2>
          <button type="button" onClick={() => setIsModalTerbuka(false)} className="p-2 bg-slate-100 rounded-full"><AiOutlineClose /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Mata Kuliah", key: "nama_mk" },
            { label: "Kode Prodi", key: "kode_mk", type: "select", options: ["PPHP", "PTK", "BDI"].map(v => ({v, l: v})) },
            { label: "Dosen", key: "dosen", type: "select", options: daftarDosen.map(d => ({ v: d.nidn, l: d.nama })) },
            { label: "Hari", key: "hari", type: "select", options: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map(h => ({ v: h, l: h })) },
            { label: "Jam Mulai", key: "jamMulai", type: "time" },
            { label: "Jam Selesai", key: "jamSelesai", type: "time" },
            { label: "Ruangan", key: "ruangan", type: "select", options: ["Lab Pengolahan Modern", "Lab Hatchery & Pembenihan", "Lab Uji Mutu & Mikrobiologi", "Ruang Teori Bahari 105"].map(r => ({v: r, l: r})) },
            { label: "Kelas", key: "id_kelas", type: "select", options: daftarKelas.map(k => ({ v: k.id, l: k.nama_kelas })) },
          ].map((field) => (
            <div key={field.key} className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{field.label}</label>
              {field.type === "select" ? (
                <select value={form[field.key]} onChange={(e) => {
                    if (field.key === "id_kelas") {
                        const kls = daftarKelas.find(k => k.id == e.target.value);
                        setForm({...form, id_kelas: e.target.value, kelas: kls?.nama_kelas || ""});
                    } else {
                        setForm({...form, [field.key]: e.target.value});
                    }
                }} className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-semibold outline-none transition">
                  {field.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              ) : (
                <input type={field.type || "text"} value={form[field.key] || ""} onChange={(e) => setForm({...form, [field.key]: e.target.value})} className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-semibold outline-none transition" />
              )}
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SKS</label>
            <select value={form.sks} onChange={(e) => setForm({...form, sks: e.target.value})} className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-semibold outline-none transition">
              {[1, 2, 3, 4, 6].map(n => <option key={n} value={n}>{n} SKS</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Semester</label>
            <select value={form.semester} onChange={(e) => setForm({...form, semester: e.target.value})} className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs font-semibold outline-none transition">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>Semester {n}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t pt-6">
          <button type="button" onClick={() => setIsModalTerbuka(false)} className="px-6 py-3 rounded-xl font-bold text-xs bg-slate-100">Batal</button>
          <button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-xl font-bold text-xs bg-black text-white">
            {isSubmitting ? "Menyimpan..." : "Simpan Jadwal"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default TambahJadwal;