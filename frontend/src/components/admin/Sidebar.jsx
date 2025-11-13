import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Home,
  Box,
  ShoppingCart,
  Users,
  Archive,
  FileText,
  Settings,
  LogOut,
  CircleUserRound,
  X,
} from "lucide-react";
import Logo from "./../common/Logo";

// Sidebar menu items
const navItems = [
  { name: "Dashboard", to: "/dashboard", icon: <Home size={18} /> },
  { name: "Products", to: "/dashboard/products", icon: <Box size={18} /> },
  { name: "Orders", to: "/dashboard/orders", icon: <ShoppingCart size={18} /> },
  { name: "Users", to: "/dashboard/users", icon: <Users size={18} /> },
  { name: "Inventory", to: "/dashboard/inventory", icon: <Archive size={18} /> },
  { name: "Invoices", to: "/dashboard/invoices", icon: <FileText size={18} /> },
  { name: "Settings", to: "/dashboard/settings", icon: <Settings size={18} /> },
  { name: "Account", to: "/dashboard/account", icon: <CircleUserRound size={18} /> },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Background overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-gray-900 text-white 
        flex flex-col justify-between p-4 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Logo />
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-md hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex flex-col gap-3 flex-1 mt-4">
          {navItems.map((item) => (
            <Link
              to={item.to}
              key={item.name}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition 
                ${location.pathname === item.to
                  ? "bg-DustyRose text-lavender"
                  : "hover:bg-gray-700"
                }`}
              onClick={onClose}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button className="border-t border-gray-700 pt-4 flex items-center gap-2 text-sm hover:text-DustyRose transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
}
