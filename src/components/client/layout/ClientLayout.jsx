// src/components/client/layout/ClientLayout.jsx
import Header from "./Header";
import Sidebar from "./Sidebar";

const ClientLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Fixed Sidebar - Full height on desktop */}
      <div className="hidden lg:block h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10">
          <Header />
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-auto p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
