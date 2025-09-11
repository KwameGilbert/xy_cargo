import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Warehouse, 
  MapPin, 
  UserCircle, 
  Menu, 
  X, 
  FileText, 
  CreditCard, 
  Building, 
  Headphones, 
  Bell, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { path: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/client/tracking", label: "Track Shipment", icon: Package },
  { path: "/client/payments", label: "Payments & Invoices", icon: CreditCard },
  { path: "/client/addresses", label: "Addresses", icon: MapPin },
  { path: "/client/consolidation", label: "Consolidation", icon: Building },
  { path: "/client/support", label: "Support", icon: Headphones },
  { path: "/client/notifications", label: "Notifications", icon: Bell },
  { path: "/client/settings", label: "Settings", icon: Settings },
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5 text-gray-700" />
        ) : (
          <Menu className="h-5 w-5 text-gray-700" />
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
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 h-screen flex flex-col transition-transform duration-300 ease-in-out overflow-hidden`}
      >
        {/* Logo Section */}
        <div className="px-6 pt-4 pb-4 border-b border-gray-100 flex-shrink-0">
          <Link 
            to="/client/dashboard" 
            className="flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="p-2 bg-red-600 rounded-md">
              <img
                src="/images/logo/logo.png"
                alt="XY Cargo ZM"
                className="h-5 w-auto filter brightness-0 invert"
              />
            </div>
            <div className="ml-3">
              <span className="text-xl font-bold text-gray-800 tracking-tighter">
                XY Cargo ZM
              </span>
            </div>
          </Link>
          
          {/* User Profile Section */}
          <div className="mt-2 flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User profile" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-800">John Smith</h3>
              <p className="text-xs text-gray-500">Customer</p>
            </div>
          </div>
        </div>

        <nav className="px-4 py-6 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path || 
                (path === "/client/tracking" && location.pathname === "/client/parcels");
              return (
                <Link
                  key={path}
                  to={path}
                  className={`group flex items-center px-3 py-3 text-sm rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
                    isActive
                      ? "bg-red-50 text-red-600 border-r-4 border-red-600"
                      : "text-gray-700 hover:bg-red-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={`p-1.5 rounded-lg mr-3 transition-all duration-200 ${
                    isActive 
                      ? "bg-red-100" 
                      : "bg-gray-100 group-hover:bg-red-100"
                  }`}>
                    <Icon
                      className={`h-4 w-4 transition-all duration-200 ${
                        isActive ? "text-red-600" : "text-gray-400 group-hover:text-red-500"
                      }`}
                    />
                  </div>
                  <span className={isActive ? "font-medium" : ""}>{label}</span>
                </Link>
              );
            })}
          </div>
          
          </nav>
          {/* Logout Link - Separated from main menu */}
          <div className="mt-auto px-4 pb-6 pt-2 border-t border-gray-100">
            <Link 
              to="/client/auth/login"
              className="group flex items-center px-3 py-3 text-sm text-gray-700 hover:bg-red-50 hover:scale-[1.02] rounded-lg transition-all duration-200"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
              }}
            >
              <div className="p-1.5 rounded-lg mr-3 transition-all duration-200 bg-gray-100 group-hover:bg-red-100">
                <LogOut className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
              </div>
              <span>Sign Out</span>
            </Link>
          </div>
      </aside>
    </div>
  );
};

export default Sidebar;