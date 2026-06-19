import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { mahasiswaAPI } from "../../../services/mahasiswaAPI.js";
import { supabase } from "../../../supabaseClient";

const TambahMahasiswa = ({ isTambahTerbuka, setIsTambahTerbuka, onSuksesSimpan }) => {
  const [inputBaru, setInputBaru] = useState({
    id_mahasiswa: "",
    nama: "",
    program_studi: "D4 Pengolahan dan Penyimpanan Hasil Perikanan",
    emailPrefix: "",
    id: "",
    angkatan: new Date().getFullYear().toString(),
    status: "Aktif",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [daftarKelas, setDaftarKelas] = useState([]);
  const [emailError, setEmailError] = useState("");

  const tahunSekarang = new Date().getFullYear();
  const daftarAngkatan = [tahunSekarang.toString(), (tahunSekarang + 1).toString()];

  const cekEmailUnik = async (prefix) => {
    if (!prefix) return;
    const emailLengkap = `${prefix}@polteksim.ac.id`;

    const { data } = await supabase
      .from("users")
      .select("email")
      .eq("email", emailLengkap)
      .maybeSingle();

    if (data) {
      setEmailError("Email ini sudah terdaftar!");
    } else {
      setEmailError("");
    }
  };

  useEffect(() => {
    const fetchKelas = async () => {
      const { data } = await supabase.from("kelas").select("id, nama_kelas");
      setDaftarKelas(data || []);
    };
    fetchKelas();
  }, []);

  if (!isTambahTerbuka) return null;

  const tanganiSimpanMahasiswa = async (e) => {
    e.preventDefault();
    if (emailError) return;
    
    setIsSubmitting(true);
    const emailLengkap = `${inputBaru.emailPrefix.trim()}@polteksim.ac.id`;

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: emailLengkap,
        password: "MahasiswaPolteksim2026!",
      });
      if (authError) throw authError;

      const uuidMhsBaru = authData.user?.id;

      await supabase.from("users").insert([{
        id: uuidMhsBaru,
        email: emailLengkap,
        nama: inputBaru.nama.trim(),
        role: "mahasiswa",
        password: "MahasiswaPoltek2026!"
      }]);

      const dataSiapSimpan = {
        id_mahasiswa: inputBaru.id_mahasiswa.trim(),
        nama: inputBaru.nama.trim(),
        program_studi: inputBaru.program_studi,
        email: emailLengkap,
        id_kelas: parseInt(inputBaru.id),
        angkatan: parseInt(inputBaru.angkatan),
        status: inputBaru.status,
        user_id: uuidMhsBaru
      };

      await mahasiswaAPI.createMahasiswa(dataSiapSimpan);
      onSuksesSimpan();
      setIsTambahTerbuka(false);
      alert("Mahasiswa berhasil didaftarkan!");
    } catch (error) {
      console.error("Detail Error:", error);
      alert("Gagal: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[9999] p-6 md:p-12 text-slate-700 overflow-y-auto min-h-screen">
      <form onSubmit={tanganiSimpanMahasiswa} className="max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center border-b border-slate-100 pb-5 mb-8">
          <div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">Tambah Mahasiswa Baru</h3>
            <p className="text-xs text-slate-400 mt-0.5">Lengkapi data Mahasiswa</p>
          </div>
          <button type="button" onClick={() => setIsTambahTerbuka(false)} className="text-slate-400 hover:text-slate-900 p-2.5 rounded-xl bg-slate-50 transition border border-slate-200 flex items-center gap-2 text-xs font-bold">
            <AiOutlineClose /> Tutup
          </button>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest border-b pb-2">Data Diri</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">NIM</label>
                <input type="text" required disabled={isSubmitting} value={inputBaru.id_mahasiswa} onChange={(e) => setInputBaru({ ...inputBaru, id_mahasiswa: e.target.value })} className="w-full bg-slate-50 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:border-black transition outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nama Lengkap</label>
                <input type="text" required disabled={isSubmitting} value={inputBaru.nama} onChange={(e) => setInputBaru({ ...inputBaru, nama: e.target.value })} className="w-full bg-slate-50 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:border-black transition outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest border-b pb-2">Data Akademik</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1 lg:col-span-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Program Studi</label>
                <select required value={inputBaru.program_studi} onChange={(e) => setInputBaru({ ...inputBaru, program_studi: e.target.value })} className="w-full bg-slate-50 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:border-black transition cursor-pointer outline-none">
                  <option value="D4 Pengolahan dan Penyimpanan Hasil Perikanan">D4 Pengolahan dan Penyimpanan Hasil Perikanan</option>
                  <option value="D3 Perikanan Tangkap">D3 Perikanan Tangkap</option>
                  <option value="D3 Budi Daya Ikan">D3 Budi Daya Ikan</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kelas</label>
                <select required value={inputBaru.id} onChange={(e) => setInputBaru({ ...inputBaru, id: e.target.value })} className="w-full bg-slate-50 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:border-black transition cursor-pointer outline-none">
                  <option value="">Pilih Kelas</option>
                  {daftarKelas.map((k) => <option key={k.id} value={k.id}>{k.nama_kelas}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Angkatan</label>
                <select required value={inputBaru.angkatan} onChange={(e) => setInputBaru({ ...inputBaru, angkatan: e.target.value })} className="w-full bg-slate-50 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:border-black transition cursor-pointer outline-none">
                  {daftarAngkatan.map((thn) => <option key={thn} value={thn}>{thn}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest border-b pb-2">Akses Sistem</h4>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Institusi</label>
              <div className={`flex items-center bg-slate-50 border rounded-xl overflow-hidden transition ${emailError ? 'border-red-500' : 'border-slate-200'}`}>
                <input type="text" required placeholder="username" onBlur={(e) => cekEmailUnik(e.target.value)} onChange={(e) => { setInputBaru({ ...inputBaru, emailPrefix: e.target.value }); setEmailError(""); }} className="w-full bg-transparent text-xs px-4 py-3 focus:outline-none" />
                <span className="text-[10px] font-bold text-slate-400 px-4 bg-slate-100 py-3 border-l border-slate-200">@polteksim.ac.id</span>
              </div>
              {emailError && <p className="text-[10px] text-red-500 font-bold px-1 mt-1">{emailError}</p>}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 mt-12 flex justify-end gap-4">
          <button type="button" onClick={() => setIsTambahTerbuka(false)} className="w-40 bg-slate-100 text-slate-700 text-xs font-bold py-3.5 rounded-xl transition hover:bg-slate-200">Batalkan</button>
          <button type="submit" disabled={isSubmitting || !!emailError} className={`w-60 text-white text-xs font-bold py-3.5 rounded-xl transition shadow-md ${isSubmitting || emailError ? "bg-slate-400 cursor-not-allowed" : "bg-black hover:bg-slate-800"}`}>
            {isSubmitting ? "Menyimpan..." : "Simpan Data Mahasiswa"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahMahasiswa;