// src/components/admin/layout/AdminLayout.jsx
import React from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 lg:flex">

      {/* 2. Sidebar */}
      <div className="lg:w-60 lg:flex-shrink-0 top-0 bottom-0 lg:sticky lg:h-screen border-r border-gray-200 bg-white">
        <AdminSidebar />
      </div>

      {/* 3. Main Content Area - Takes up all remaining space on desktop (flex-1) */}
      <div className="flex flex-1 flex-col min-w-0">
        
        {/* Sticky Header */}
        {/* The header is sticky and takes up space in the vertical flow */}
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <AdminHeader />
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;