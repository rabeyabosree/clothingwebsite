import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducer/authReducer";
import { useNavigate } from "react-router-dom";

function ProfileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("user"));

  const menus = [
    { name: "Orders", path: "/orders" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="absolute right-5 top-14 bg-white shadow-md rounded-lg w-48 py-3 z-50 border border-gray-100">
      {/* User info */}
      <div className="px-4 pb-3 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-800 capitalize">
          {profile?.name || "Guest User"}
        </h4>
        <p className="text-xs text-gray-500">{profile?.email}</p>
      </div>

      {/* Menu items */}
      <ul className="mt-2">
        {menus.map((menu, index) => (
          <li
            key={index}
            onClick={() => navigate(menu.path)}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            {menu.name}
          </li>
        ))}
      </ul>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileMenu;
