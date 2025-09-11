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
    <div className="h-full">
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
          className="fixed inset-0 bg-gray-100/10 z-30 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-40 w-56 md:w-64 bg-white border-r border-gray-100 h-full flex flex-col transition-transform duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <div className="border-b border-gray-100 flex-shrink-0">
          <div className="px-4 py-4">
            <Link 
              to="/client/dashboard" 
              className="flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2 bg-red-600 rounded-md">
                <img
                  src="/images/logo/logo.png"
                  alt="XY Cargo ZM"
                  className="h-5 w-5 filter brightness-0 invert"
                />
              </div>
              <span className="ml-2 text-lg font-bold text-gray-900">
                XY Cargo ZM
              </span>
            </Link>
          </div>
          
          {/* User Profile Section */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="User profile" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-900 text-sm">John Smith</h3>
                <p className="text-xs text-gray-500">ID: XY-CU-2833</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Area - Scrollable */}
        <div className="flex-1 flex flex-col min-h-0">
          <nav className="flex-1 py-2 overflow-y-auto">
            <div>
              {menuItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path || 
                  (path === "/client/tracking" && location.pathname === "/client/parcels");
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center text-sm px-3 py-2.5 mx-3 rounded-md transition-colors ${
                      isActive
                        ? "bg-red-50 text-red-600 border-r-2 border-red-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon
                      className={`h-4 w-4 mr-3 ${
                        isActive ? "text-red-600" : "text-gray-500"
                      }`}
                    />
                    <span className={`text-sm ${isActive ? "font-medium" : ""}`}>{label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
          
          {/* Logout Link - Fixed at bottom */}
          <div className="flex-shrink-0 border-t border-gray-100">
            <Link 
              to="/client/auth/login"
              className="flex items-center px-3 py-2.5 mx-3 text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
              }}
            >
              <LogOut className="h-4 w-4 mr-3 text-gray-500" />
              <span className="text-sm">Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
