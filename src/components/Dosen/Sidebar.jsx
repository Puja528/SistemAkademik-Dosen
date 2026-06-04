import React, { useState } from "react";
import {
  FiGrid,
  FiCalendar,
  FiCheckSquare,
  FiBookOpen,
  FiUsers,
  FiUser,
  FiChevronLeft,
} from "react-icons/fi";

const PolteksimLogo = () => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="6" fill="#1A3A6B" />
    <polygon
      points="20,7 33,29 7,29"
      fill="none"
      stroke="#F0C040"
      strokeWidth="2.2"
    />
    <circle cx="20" cy="20" r="4.5" fill="#F0C040" />
    <rect x="16.5" y="29" width="7" height="5" rx="1" fill="#F0C040" />
  </svg>
);

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: FiGrid,
  },
  {
    id: "jadwal",
    label: "Jadwal",
    icon: FiCalendar,
  },
  {
    id: "absensi",
    label: "Absensi",
    icon: FiCheckSquare,
  },
  {
    id: "nilai",
    label: "Nilai",
    icon: FiBookOpen,
  },
  {
    id: "mahasiswa",
    label: "Mahasiswa",
    icon: FiUsers,
  },
  {
    id: "profil",
    label: "Profil",
    icon: FiUser,
  },
];

export default function Sidebar({
  portalName = "POLTEKSIM PORTAL",
  role = "Dosen",
  activeItem = "dashboard",
  onNavChange,
  onSwitchRole,
}) {
  const [active, setActive] = useState(activeItem);

  const handleNav = (id) => {
    setActive(id);
    onNavChange?.(id);
  };

  return (
    <aside
      className="
        sticky
        top-0
        w-[240px]
        min-w-[240px]
        h-screen
        bg-white
        border-r
        border-gray-200
        flex
        flex-col
      "
    >
      {/* Logo & Brand */}
      <div
        className="
    h-[76px]
    px-5
    border-b
    border-gray-200
    flex
    items-center
    gap-3
    flex-shrink-0
  "
      >
        <img
          src="..\src\assets\LogoPolteksim.png"
          alt="Polteksim Logo"
          className="w-10 h-10 object-contain"
        />

        <div className="flex flex-col leading-tight">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A3A6B]">
            {portalName}
          </span>

          <span className="text-xs text-gray-400">{role}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => handleNav(id)}
                className={`
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition-all
                  duration-200
                  text-sm
                  ${
                    active === id
                      ? "bg-[#EEF4FF] text-[#2563EB] font-medium"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }
                `}
              >
                <Icon size={18} />

                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div
        className="
          p-4
          border-t
          border-gray-200
        "
      >
        <button
          onClick={onSwitchRole}
          className="
            w-full
            flex
            items-center
            gap-2
            px-3
            py-2.5
            rounded-lg
            text-sm
            text-gray-500
            hover:bg-gray-100
            hover:text-gray-700
            transition
          "
        >
          <FiChevronLeft size={16} />
          <span>Switch Role</span>
        </button>
      </div>
    </aside>
  );
}
