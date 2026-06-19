import React from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineBell } from "react-icons/ai";

const Navbar = () => {
  const location = useLocation();

  const dapatkanJudulHalaman = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return "Dashboard";
      case "/admin/mahasiswa":
        return "Data Mahasiswa";
      case "/admin/dosen":
        return "Data Dosen"; 
      case "/admin/jadwal":
        return "Operasi Akademik";
      case "/admin/nilai":
        return "Publikasi Nilai";
      default:
        return "AIS Portal";
    }
  };


  return (
    <header className="bg-white border-b border-slate-200 px-8 py-3 flex justify-between items-center sticky top-0 z-10 w-full h-[60px] shrink-0">
      <h1 className="text-xl font-semibold text-slate-900 tracking-tight"> 
        {dapatkanJudulHalaman()}
      </h1>
      
      <div className="flex items-center gap-5">
        <button className="relative text-slate-400 hover:text-cyan-700 transition">
          <AiOutlineBell className="text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs tracking-wider">
            AU
          </div>
          <div className="text-left hidden md:block">
            <p className="text-xs font-bold text-slate-800 leading-tight">Admin User</p>
            <p className="text-[10px] font-medium text-slate-400">System Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;