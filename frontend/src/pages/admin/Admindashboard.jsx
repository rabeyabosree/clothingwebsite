import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
     <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {/* Topbar for mobile */}
        <header className="flex items-center justify-between p-4 border-b bg-white md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
