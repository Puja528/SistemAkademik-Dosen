import { FiChevronDown, FiBell, FiSearch } from "react-icons/fi";
import React, { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 gap-4 font-sans flex-shrink-0 text-xs">

      {/* Search Input Box */}
      <div className="relative flex-1 max-w-xs">
        <FiSearch
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Cari mata kuliah, capaian..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-3.5 rounded-lg border border-gray-200 bg-gray-50 text-xs text-slate-700 outline-none focus:border-slate-300 focus:bg-white transition-colors placeholder:text-slate-400"
        />
      </div>

      {/* Right Side Control Panel */}
      <div className="flex items-center gap-4">

        {/* Notification Bell Icon */}
        <button className="relative p-1.5 text-slate-500 rounded-lg hover:bg-gray-50 text-slate-600 transition-colors cursor-pointer">
          <FiBell size={17} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white" />
        </button>

        {/* Vertical Divider */}
        <div className="w-px h-6 bg-gray-200" />

        {/* User Profile Dropdown Button */}
        <button className="flex items-center gap-2.5 rounded-lg px-2 py-1 hover:bg-gray-50 transition-colors cursor-pointer border-none text-left">
          {/* Avatar Component */}
          <div className="w-8 h-8 rounded-lg bg-[#1a3a6b] flex items-center justify-center text-white text-[11px] font-black tracking-wider flex-shrink-0 shadow-sm">
            DJS
          </div>

          {/* User Identity Info */}
          <div className="text-left leading-tight">
            <p className="text-xs font-bold text-slate-900 m-0">Dr. John Smith</p>
            <p className="text-[10px] font-medium text-slate-400 m-0 tracking-wide uppercase">Senior Lecturer</p>
          </div>

          <FiChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
}