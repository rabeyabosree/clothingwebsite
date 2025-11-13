import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsCart2 } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Logo from './Logo';
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"))
  const totalItems = useSelector((state) =>
    state.cart.products.reduce((acc, item) => acc + item.quantity, 0)
  );


  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Logo />

        <div className="flex items-center gap-18">
          {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((menu) => (
            <a
              key={menu.name}
              href={menu.path}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {menu.name}
            </a>
          ))}
        </nav>

        {/* Right Side cart */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="text-xl text-gray-700 relative hover:text-blue-600 transition"
          >
            <BsCart2 />
            {totalItems > 0 && (
              <span className="absolute -top-3 -right-2 text-[12px] bg-[#d4a373] text-white py-0.5 px-1.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* Auth / User */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenu(!isProfileMenu)}
                className="text-2xl text-gray-700 hover:text-blue-600 transition"
              >
                <HiOutlineUserCircle />
              </button>
              {isProfileMenu && (
                <div>
                  <ProfileMenu />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-sm bg-[#d4a373] text-white px-4 py-1.5 rounded-md hover:bg-[#c98b5a] transition"
            >
              Login
            </button>
          )}




          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-md flex flex-col items-center py-4 space-y-3">
          {menuItems.map((menu) => (
            <a
              key={menu.name}
              href={menu.path}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {menu.name}
            </a>
          ))}

          {/* Mobile Auth */}
          {user ? (
            <a
              href="/profile"
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <HiOutlineUserCircle /> {user.name.split(" ")[0]}
            </a>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
              className="text-sm bg-[#d4a373] text-white px-4 py-1.5 rounded-md hover:bg-[#c98b5a] transition"
            >
              Login
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
