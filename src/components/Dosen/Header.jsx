import { FiChevronDown } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import React, { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header
      className=" sticky
    top-0
    z-40
    h-[76px]
    bg-white
    border-b
    border-gray-200
    flex
    items-center
    justify-between
    px-6
  "
    >
      {/* Search */}
      <div className="relative">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />

        <input
          type="text"
          placeholder="Cari mata kuliah, capaian..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-[260px]
            h-[38px]
            pl-10
            pr-4
            rounded-lg
            border
            border-gray-200
            bg-gray-50
            text-sm
            outline-none
            focus:border-blue-300
          "
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center h-full">
        {/* Notification */}
        <button
          className="
            relative
            h-full
            w-[56px]
            flex
            items-center
            justify-center
            border-l
            border-r
            border-gray-200
            text-gray-600
            hover:bg-gray-50
          "
        >
          <FiBell size={20} />

          <span
            className="
              absolute
              top-5
              right-4
              w-2
              h-2
              bg-red-500
              rounded-full
            "
          />
        </button>

        {/* Profile */}
        <button
          className="
            flex
            items-center
            gap-3
            px-5
            h-full
            hover:bg-gray-50
          "
        >
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-blue-100
              flex
              items-center
              justify-center
              text-blue-600
              text-sm
              font-semibold
            "
          >
            DJS
          </div>

          <div className="text-left">
            <p className="text-[15px] font-semibold text-gray-900 leading-none">
              Dr. John Smith
            </p>

            <p className="text-xs text-gray-500 mt-1">Senior Lecturer</p>
          </div>

          <FiChevronDown size={16} className="text-gray-500" />
        </button>
      </div>
    </header>
  );
}
