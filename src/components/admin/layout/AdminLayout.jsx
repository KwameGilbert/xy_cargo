// src/components/admin/layout/AdminLayout.jsx
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="h-screen bg-gray-50 lg:flex">
      {/* Fixed Sidebar - Full height on desktop */}
      <div className="hidden lg:block h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col h-screen">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto w-fit p-2 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
