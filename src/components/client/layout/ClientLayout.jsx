// src/components/client/layout/ClientLayout.jsx
import Header from "./Header";
import Sidebar from "./Sidebar";

const ClientLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
