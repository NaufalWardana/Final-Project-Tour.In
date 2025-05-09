import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Users,
  LayoutPanelTop,
  Plane,
  Tag,
  ShoppingCart,
  Image,
  LogOut,
  ChevronRight,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

// Komponen sidebar admin
const AdminSidebar = ({ isExpanded, setIsExpanded }) => {
  const activeClassName = "bg-blue-600 text-white"; // Kelas CSS untuk tautan aktif
  const inactiveClassName = "text-gray-300 hover:bg-gray-700 hover:text-white"; // Kelas CSS untuk tautan tidak aktif
  const { logout } = useAuth(); // Mengambil fungsi logout dari hook useAuth

  // Mengatur lebar sidebar berdasarkan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setIsExpanded(true); // Jika lebar layar lebih dari 960px, sidebar diperluas
      } else {
        setIsExpanded(false); // Jika lebar layar kurang dari 960px, sidebar dipersempit
      }
    };

    handleResize(); // Memanggil fungsi handleResize saat komponen pertama kali dirender
    window.addEventListener("resize", handleResize); // Menambahkan event listener untuk mengatur ulang lebar sidebar saat ukuran layar berubah

    return () => {
      window.removeEventListener("resize", handleResize); // Membersihkan event listener saat komponen di-unmount
    };
  }, [setIsExpanded]);

  // Fungsi untuk logout
  const handleLogout = async () => {
    await logout(); // Memanggil fungsi logout dari hook useAuth
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 bg-zinc-900 text-white transition-all duration-300 ease-in-out flex flex-col
        ${isExpanded ? "w-64" : "w-10"}`} // Mengatur lebar sidebar berdasarkan state isExpanded
    >
      {/* Header */}
      <div
        className={`py-3 border-b border-gray-800 ${
          isExpanded ? "px-4" : "px-2"
        }`}
      >
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 flex-shrink-0" /> {/* Ikon user */}
          <h1
            className={`text-xl font-bold whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0"}`} // Mengatur visibilitas teks berdasarkan state isExpanded
          >
            Admin Manu
          </h1>
        </div>
      </div>

      {/* Menu Navigasi */}
      <nav className="flex-1 py-2 overflow-y-auto">
        <NavLink
          to="/admin-dashboard"
          className={
            ({ isActive }) =>
              `flex items-center gap-3 py-3 transition-colors ${
                isExpanded ? "px-4" : "px-2 justify-center"
              } 
            ${isActive ? activeClassName : inactiveClassName}` // Mengatur kelas CSS berdasarkan apakah tautan aktif atau tidak
          }
        >
          <User className="w-5 h-5 flex-shrink-0" /> {/* Ikon user */}
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`} // Mengatur visibilitas teks berdasarkan state isExpanded
          >
            Dashboard Detail
          </span>
        </NavLink>

        <NavLink
          to="/user-management"
          className={
            ({ isActive }) =>
              `flex items-center gap-3 py-3 transition-colors ${
                isExpanded ? "px-4" : "px-2 justify-center"
              } 
            ${isActive ? activeClassName : inactiveClassName}` // Mengatur kelas CSS berdasarkan apakah tautan aktif atau tidak
          }
        >
          <Users className="w-5 h-5 flex-shrink-0" /> {/* Ikon users */}
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`} // Mengatur visibilitas teks berdasarkan state isExpanded
          >
            User Management
          </span>
        </NavLink>

        <NavLink
          to="/category-management"
          className={
            ({ isActive }) =>
              `flex items-center gap-3 py-3 transition-colors ${
                isExpanded ? "px-4" : "px-2 justify-center"
              } 
            ${isActive ? activeClassName : inactiveClassName}` // Mengatur kelas CSS berdasarkan apakah tautan aktif atau tidak
          }
        >
          <LayoutPanelTop className="w-5 h-5 flex-shrink-0" />{" "}
          {/* Ikon layout panel */}
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`} // Mengatur visibilitas teks berdasarkan state isExpanded
          >
            Management Category
          </span>
        </NavLink>

        <NavLink
          to="/activity-management"
          className={
            ({ isActive }) =>
              `flex items-center gap-3 py-3 transition-colors ${
                isExpanded ? "px-4" : "px-2 justify-center"
              } 
            ${isActive ? activeClassName : inactiveClassName}` // Mengatur kelas CSS berdasarkan apakah tautan aktif atau tidak
          }
        >
          <Plane className="w-5 h-5 flex-shrink-0" /> {/* Ikon plane */}
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`} // Mengatur visibilitas teks berdasarkan state isExpanded
          >
            Management Activity
          </span>
        </NavLink>

        <NavLink
          to="/promo-management"
          className={
            ({ isActive }) =>
              `flex items-center gap-3 py-3 transition-colors ${
                isExpanded ? "px-4" : "px-2 justify-center"
              } 
            ${isActive ? activeClassName : inactiveClassName}` // Mengatur kelas CSS berdasarkan apakah tautan aktif atau tidak
          }
        >
          <Tag className="w-5 h-5 flex-shrink-0" /> {/* Ikon tag */}
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`} // Mengatur visibilitas teks berdasarkan state isExpanded
          >
            Management Promo
          </span>
        </NavLink>

        <NavLink
          to="/banner-management"
          className={
            ({ isActive }) =>
              `flex items-center gap-3 py-3 transition-colors ${
                isExpanded ? "px-4" : "px-2 justify-center"
              } 
            ${isActive ? activeClassName : inactiveClassName}` // Mengatur kelas CSS berdasarkan apakah tautan aktif atau tidak
          }
        >
          <Image className="w-5 h-5 flex-shrink-0" /> {/* Ikon image */}
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`} // Mengatur visibilitas teks berdasarkan state isExpanded
          >
            Management Banner
          </span>
        </NavLink>

        <NavLink
          to="/transaction-management"
          className={
            ({ isActive }) =>
              `flex items-center gap-3 py-3 transition-colors ${
                isExpanded ? "px-4" : "px-2 justify-center"
              } 
            ${isActive ? activeClassName : inactiveClassName}` // Mengatur kelas CSS berdasarkan apakah tautan aktif atau tidak
          }
        >
          <ShoppingCart className="w-5 h-5 flex-shrink-0" />{" "}
          {/* Ikon shopping cart */}
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`} // Mengatur visibilitas teks berdasarkan state isExpanded
          >
            Management Transaction
          </span>
        </NavLink>
        <button
          onClick={() => setIsExpanded(!isExpanded)} // Mengatur state isExpanded saat tombol diklik
          className={`w-full flex items-center gap-3 py-3 text-gray-400 hover:bg-gray-800 transition-colors ${
            isExpanded ? "px-4" : "px-2 justify-center"
          }`}
        >
          <ChevronRight
            className={`w-5 h-5 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`} // Mengatur rotasi ikon berdasarkan state isExpanded
          />
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`} // Mengatur visibilitas teks berdasarkan state isExpanded
          >
            Collapse Menu
          </span>
        </button>
      </nav>

      {/* Footer dengan Toggle dan Logout */}
      <div className="border-t border-gray-800">
        <button
          onClick={handleLogout} // Memanggil fungsi handleLogout saat tombol diklik
          className={`w-full flex items-center gap-3 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300
            ${isExpanded ? "px-4" : "px-2 justify-center"}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" /> {/* Ikon logout */}
          <span
            className={`whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`} // Mengatur visibilitas teks berdasarkan state isExpanded
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
