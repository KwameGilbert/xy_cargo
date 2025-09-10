// src/components/client/layout/ClientLayout.jsx
import Header from "./Header";
import Sidebar from "./Sidebar";

const ClientLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
