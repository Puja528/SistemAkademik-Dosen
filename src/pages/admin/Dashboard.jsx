import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineCalendar,
  AiOutlineUserAdd,
  AiOutlinePlusCircle,
  AiOutlineSolution,
  AiOutlineArrowRight
} from 'react-icons/ai';
import { dashboardAPI } from '../../services/dashboardAdminAPI';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalStudents: 0, totalLecturers: 0, totalSchedules: 0 });
  const [loading, setLoading] = useState(true);
  const [aktivitas, setAktivitas] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await dashboardAPI.fetchDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Gagal memuat statistik:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  useEffect(() => {
    const loadActivities = async () => {
      const data = await dashboardAdminAPI.fetchRecentActivities();
      const formatted = data.map(item => ({
        id: item.id,
        type: item.tipe,
        title: item.judul,
        user: item.user_name,
        detail: item.detail,
        time: new Date(item.waktu).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }));
      setAktivitas(formatted);
    };
    loadActivities();
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20 animate-fadeIn">
      {/* 1. SECTION STATISTIK */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Mahasiswa</span>
            <h3 className="text-3xl font-bold text-slate-900">{loading ? "..." : stats.totalStudents}</h3>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl"><AiOutlineUser className="text-2xl" /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Dosen</span>
            <h3 className="text-3xl font-bold text-slate-900">{loading ? "..." : stats.totalLecturers}</h3>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl"><AiOutlineBook className="text-2xl" /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Jadwal</span>
            <h3 className="text-3xl font-bold text-slate-900">{loading ? "..." : stats.totalSchedules}</h3>
          </div>
          <div className="p-3.5 bg-purple-50 text-purple-600 rounded-xl"><AiOutlineCalendar className="text-2xl" /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tahun Akademik</span>
            <h3 className="text-3xl font-bold text-slate-900">2026/1</h3>
            <span className="text-[11px] text-blue-600 font-semibold bg-blue-50 px-2.5 py-0.5 rounded-md inline-block mt-1">Aktif</span>
          </div>
          <div className="p-3.5 bg-orange-50 text-orange-600 rounded-xl"><AiOutlineSolution className="text-2xl" /></div>
        </div>
      </section>

      {/* 2. SECTION QUICK ACTIONS */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider tracking-widest">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/admin/mahasiswa/')}
            className="bg-white border border-slate-200 hover:border-blue-600 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition shadow-sm group hover:-translate-y-1"
          >
            <AiOutlineUserAdd className="text-2xl text-blue-700" />
            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-800">Tambah Mahasiswa</span>
          </button>
          <button
            onClick={() => navigate('/admin/dosen/')}
            className="bg-white border border-slate-200 hover:border-blue-600 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition shadow-sm group hover:-translate-y-1"
          >
            <AiOutlinePlusCircle className="text-2xl text-blue-700" />
            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-800">Tambah Dosen</span>
          </button>
          <button
            onClick={() => navigate('/admin/jadwal')}
            className="bg-white border border-slate-200 hover:border-blue-600 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition shadow-sm group hover:-translate-y-1"
          >
            <AiOutlineSolution className="text-2xl text-blue-700" />
            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-800">Kelola Jadwal</span>
          </button>
        </div>
      </section>

      {/* 3. SECTION RECENT ACTIVITY (Placeholder) */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4.5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="text-sm font-bold text-slate-800">Aktivitas Terkini</h2>
        </div>
        <div className="px-6 py-10 text-center text-slate-400 text-xs">
          Belum ada aktivitas terbaru dari sistem.
        </div>
      </section>
    </div>
  );
};

export default Dashboard;