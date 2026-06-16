import React from 'react';
import { 
  AiOutlineUser, 
  AiOutlineBook, 
  AiOutlineCalendar, 
  AiOutlineUserAdd,
  AiOutlinePlusCircle,
  AiOutlineSolution,
  AiOutlineArrowRight
} from 'react-icons/ai';
import dashboardData from '../../data/DashboardData.json';

const Dashboard = () => {
  const { stats, recentActivities } = dashboardData;

  const getBadgeStyle = (type) => {
    switch(type) {
      case 'Student': return 'bg-blue-100 text-blue-700';
      case 'Course': return 'bg-purple-100 text-purple-700';
      case 'Grade': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20 animate-fadeIn">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex justify-between items-center group hover:shadow-md transition duration-200">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Students</span>
            <h3 className="text-3xl font-bold text-slate-900">{stats.totalStudents}</h3>
            <span className="text-[11px] text-slate-400 block mt-1">+12% Bulan ini</span>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl"><AiOutlineUser className="text-2xl" /></div>
        </div>

        {/* Total Lecturers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex justify-between items-center group hover:shadow-md transition duration-200">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Lecturers</span>
            <h3 className="text-3xl font-bold text-slate-900">{stats.totalLecturers}</h3>
            <span className="text-[11px] text-slate-400 block mt-1">+5% Semester ini</span>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl"><AiOutlineBook className="text-2xl" /></div>
        </div>

        {/* Total Courses */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex justify-between items-center group hover:shadow-md transition duration-200">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Courses</span>
            <h3 className="text-3xl font-bold text-slate-900">{stats.totalSchedules}</h3>
            <span className="text-[11px] text-slate-400 block mt-1">+3 Baru</span>
          </div>
          <div className="p-3.5 bg-purple-50 text-purple-600 rounded-xl"><AiOutlineCalendar className="text-2xl" /></div>
        </div>

        {/* Active Academic Term */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex justify-between items-center group hover:shadow-md transition duration-200">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Academic Term</span>
            <h3 className="text-3xl font-bold text-slate-900">2024/1</h3>
            <span className="text-[11px] text-blue-600 font-semibold bg-blue-50 px-2.5 py-0.5 rounded-md inline-block mt-1">Current</span>
          </div>
          <div className="p-3.5 bg-orange-50 text-orange-600 rounded-xl"><AiOutlineSolution className="text-2xl" /></div>
        </div>

      </section>

      {/* 2. SECTION QUICK ACTIONS */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider tracking-widest">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-white border border-slate-200 hover:border-blue-600 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition duration-200 shadow-sm group hover:-translate-y-1">
            <AiOutlineUserAdd className="text-2xl text-blue-700" />
            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-800">Add Student</span>
          </button>
          <button className="bg-white border border-slate-200 hover:border-blue-600 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition duration-200 shadow-sm group hover:-translate-y-1">
            <AiOutlinePlusCircle className="text-2xl text-blue-700" />
            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-800">Create Course</span>
          </button>
          <button className="bg-white border border-slate-200 hover:border-blue-600 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition duration-200 shadow-sm group hover:-translate-y-1">
            <AiOutlineSolution className="text-2xl text-blue-700" />
            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-800">Manage Schedule</span>
          </button>
        </div>
      </section>

      {/* 3. SECTION RECENT ACTIVITY  */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4.5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="text-sm font-bold text-slate-800">Recent Activity</h2>
          <button className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1.5 transition">
            View All <AiOutlineArrowRight />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="px-6 py-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50/50 transition duration-150">
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getBadgeStyle(activity.type)}`}>
                    {activity.type}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 truncate">{activity.title}</h3>
                </div>
                <div>
                  <p className="text-sm text-slate-600 font-medium truncate">{activity.user}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{activity.detail}</p>
                </div>
              </div>
              <div className="text-[11px] font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full self-start sm:self-center">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;