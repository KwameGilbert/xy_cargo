import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Warehouse, MapPin, UserCircle, Menu, X } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { path: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/client/parcels", label: "My Parcels", icon: Package },
  { path: "/client/warehouse", label: "Warehouse Address", icon: Warehouse },
  { path: "/client/addresses", label: "My Addresses", icon: MapPin },
  { path: "/client/profile", label: "Profile", icon: UserCircle },
];

const Sidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="relative">
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5 text-red-500" />
        ) : (
          <Menu className="h-5 w-5 text-red-500" />
        )}
      </button>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-white to-gray-50 shadow-xl border-r border-gray-100 h-full transition-transform duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <div className="px-6 py-8 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
          <Link 
            to="/client/dashboard" 
            className="flex items-center group hover:scale-105 transition-transform duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="p-2 bg-red-500 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-200">
              <img
                src="/images/logo/logo.png"
                alt="XY Cargo Logo"
                className="h-6 w-auto filter brightness-0 invert"
              />
            </div>
            <div className="ml-3">
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                XY Cargo
              </span>
              <p className="text-xs text-gray-500 font-medium">Client Portal</p>
            </div>
          </Link>
        </div>

        <nav className="px-4 py-6">
          <div className="space-y-2">
            {menuItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] ${
                  isActive
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 hover:shadow-md"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className={`p-2 rounded-lg mr-3 transition-all duration-200 ${
                  isActive 
                    ? "bg-white/20 shadow-lg" 
                    : "bg-gray-100 group-hover:bg-red-200 group-hover:scale-110"
                }`}>
                  <Icon
                    className={`h-4 w-4 transition-all duration-200 ${
                      isActive 
                        ? "text-white" 
                        : "text-gray-500 group-hover:text-red-600"
                    }`}
                  />
                </div>
                <span className="font-semibold">{label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-sm" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
    </div>
  );
};

export default Sidebar;