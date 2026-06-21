import React, { useState } from "react";
import {
  FiGrid,
  FiCalendar,
  FiCheckSquare,
  FiBookOpen,
  FiChevronLeft,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <FiGrid size={17} />, path: "/dosen"},
  { id: "absensi", label: "Kelola Absensi", icon: <FiCheckSquare size={17} />, path: "/dosen/absensi"},
  { id: "nilai", label: "Kelola Nilai", icon: <FiBookOpen size={17} />, path: "/dosen/nilai" },
  { id: "jadwal", label: "Jadwal", icon: <FiCalendar size={17} />, path: "/dosen/jadwal"},
];

export default function Sidebar({
  portalName = "POLTEKSIM PORTAL",
  role = "Dosen",
  activeItem = "dashboard",
  onNavChange,
  onLogout,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <aside className="sticky top-0 w-[200px] min-w-[200px] h-screen bg-white border-r border-gray-200 flex flex-col font-sans">
      <div>
        {/* 1. LOGO & BRAND: Menyesuaikan ukuran dan jarak persis seperti sisi Admin */}
        <div className="h-16 px-5 border-b border-gray-200 flex items-center gap-2.5 flex-shrink-0">
          <img
            src="../src/assets/LogoPolteksim.png"
            alt="Polteksim Logo"
            className="w-9 h-9 object-contain"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback SVG logo jika gambar di folder assets belum terbaca */}
          <div className="hidden w-9 h-9 items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="6" fill="#1A3A6B" />
              <polygon points="20,7 33,29 7,29" fill="none" stroke="#F0C040" strokeWidth="2.2" />
              <circle cx="20" cy="20" r="4.5" fill="#F0C040" />
            </svg>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A3A6B]">
              {portalName}
            </span>
            <span className="text-[11px] text-gray-400">{role}</span>
          </div>
        </div>

        {/* 2. NAVIGASI MENU: Menggunakan skema warna, padding, dan font-size persis milik Admin */}
        <nav className="p-2.5 flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ id, label, icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={id}
                onClick={() => handleNav(path)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border-none cursor-pointer text-[13px] text-left transition-all duration-150 font-sans
                  ${isActive
                    ? "bg-[#f0f4f8] text-[#1a3a6b] font-bold"
                    : "bg-transparent text-gray-500 font-normal hover:bg-gray-50 hover:text-gray-800"
                  }`}
              >
                <span className={isActive ? 'text-[#1a3a6b]' : 'text-gray-400'}>
                  {icon}
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. FOOTER LOGOUT: Menyesuaikan margin top-auto dan efek hover red-50 milik Admin */}
      <div className="p-2.5 border-t border-gray-200 mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg border-none cursor-pointer text-[13px] text-gray-500 bg-transparent hover:bg-red-50 hover:text-red-600 transition-all duration-150 font-sans"
        >
          <FiChevronLeft size={15} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}