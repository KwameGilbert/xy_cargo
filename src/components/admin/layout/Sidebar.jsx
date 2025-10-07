import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Ship,
  Warehouse,
  Users,
  DollarSign,
  BarChart3,
  Headphones,
  Settings,
  Shield,
  LogOut,
  ChevronDown,
  ChevronRight,
  Plus,
  FileText,
  Star,
  Truck,
  User,
  CreditCard,
  RotateCcw,
  TrendingUp,
  PieChart,
  UserCheck,
  Activity,
  MessageSquare,
  AlertTriangle,
  Key,
  Bell,
  Eye,
  ShieldCheck,
} from "lucide-react";

const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("/admin/dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleGroup = (group) => setOpenGroup(openGroup === group ? null : group);

  const handleNavigation = (path) => {
    setCurrentPath(path);
    setIsMobileMenuOpen(false);
  };

  const linkClass = (isActive) =>
    `flex items-center text-sm px-3 py-2.5 mx-3 rounded-md transition-colors cursor-pointer ${
      isActive
        ? "bg-red-50 text-red-600 border-r-2 border-red-600"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  const NavLink = ({ to, children, className = "" }) => (
    <div
      onClick={() => handleNavigation(to)}
      className={className || linkClass(currentPath === to)}
    >
      {children}
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? (
          <ChevronRight className="h-5 w-5 text-gray-700" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-700" />
        )}
      </button>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-40 w-60 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="border-b border-gray-200 flex-shrink-0">
          <div className="px-4 py-4 flex items-center">
            <div className="p-2 bg-red-600 rounded-md flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900">XY Cargo ZM</span>
          </div>
           {/* Profile Section */}
        </div>
        <div className="border-b border-gray-200 flex-shrink-0">
            <div className="px-4 py-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold">
                  BS
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">Bright Smith</h3>
                  <p className="text-xs text-gray-500">ID: XY-CU-2833</p>
                </div>
              </div>
            </div>
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex-1 flex flex-col min-h-0">
          <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* Dashboard */}
            <NavLink to="/admin/dashboard">
              <LayoutDashboard className="h-4 w-4 mr-3 text-gray-500" />
              Dashboard
            </NavLink>

            {/* Parcels */}
            <div>
              <button
                onClick={() => toggleGroup("parcels")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                aria-expanded={openGroup === "parcels"}
                aria-controls="parcels-submenu"
              >
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-3 text-gray-500" />
                  Parcels
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openGroup === "parcels" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id="parcels-submenu"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openGroup === "parcels" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/parcels">
                    <Package className="h-3 w-3 mr-2 text-gray-400" />
                    All Parcels
                  </NavLink>
                  <NavLink to="/admin/parcels/create">
                    <Plus className="h-3 w-3 mr-2 text-gray-400" />
                    Create Parcel
                  </NavLink>
                  <NavLink to="/admin/parcels/value-added">
                    <Star className="h-3 w-3 mr-2 text-gray-400" />
                    Value Added Services
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Shipments */}
            <div>
              <button
                onClick={() => toggleGroup("shipments")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                aria-expanded={openGroup === "shipments"}
                aria-controls="shipments-submenu"
              >
                <div className="flex items-center">
                  <Ship className="h-4 w-4 mr-3 text-gray-500" />
                  Shipments
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openGroup === "shipments" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id="shipments-submenu"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openGroup === "shipments" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/shipments">
                    <Truck className="h-3 w-3 mr-2 text-gray-400" />
                    All Shipments
                  </NavLink>
                  <NavLink to="/admin/shipments/create">
                    <Plus className="h-3 w-3 mr-2 text-gray-400" />
                    Create Shipment
                  </NavLink>
                  <NavLink to="/admin/shipments/manifests">
                    <FileText className="h-3 w-3 mr-2 text-gray-400" />
                    Manifests
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Warehouses */}
            <div>
              <button
                onClick={() => toggleGroup("warehouses")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                aria-expanded={openGroup === "warehouses"}
                aria-controls="warehouses-submenu"
              >
                <div className="flex items-center">
                  <Warehouse className="h-4 w-4 mr-3 text-gray-500" />
                  Warehouses
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openGroup === "warehouses" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id="warehouses-submenu"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openGroup === "warehouses" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/warehouses">
                    <Warehouse className="h-3 w-3 mr-2 text-gray-400" />
                    All Warehouses
                  </NavLink>
                  <NavLink to="/admin/warehouses/staff">
                    <User className="h-3 w-3 mr-2 text-gray-400" />
                    Warehouse Staff
                  </NavLink>
                  <NavLink to="/admin/warehouses/logs">
                    <Activity className="h-3 w-3 mr-2 text-gray-400" />
                    Intake Logs
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Users & Agents */}
            <div>
              <button
                onClick={() => toggleGroup("users")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                aria-expanded={openGroup === "users"}
                aria-controls="users-submenu"
              >
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-3 text-gray-500" />
                  Users & Agents
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openGroup === "users" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id="users-submenu"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openGroup === "users" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/customers">
                    <User className="h-3 w-3 mr-2 text-gray-400" />
                    Customers
                  </NavLink>
                  <NavLink to="/admin/agents">
                    <UserCheck className="h-3 w-3 mr-2 text-gray-400" />
                    Agents
                  </NavLink>
                  <NavLink to="/admin/agents/commissions">
                    <DollarSign className="h-3 w-3 mr-2 text-gray-400" />
                    Agent Commissions
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Finance */}
            <div>
              <button
                onClick={() => toggleGroup("finance")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                aria-expanded={openGroup === "finance"}
                aria-controls="finance-submenu"
              >
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-3 text-gray-500" />
                  Finance
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openGroup === "finance" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id="finance-submenu"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openGroup === "finance" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/payments">
                    <CreditCard className="h-3 w-3 mr-2 text-gray-400" />
                    All Payments
                  </NavLink>
                  <NavLink to="/admin/payments/pending">
                    <CreditCard className="h-3 w-3 mr-2 text-gray-400" />
                    Pending Payments
                  </NavLink>
                  <NavLink to="/admin/refunds">
                    <RotateCcw className="h-3 w-3 mr-2 text-gray-400" />
                    Refunds & Adjustments
                  </NavLink>
                  <NavLink to="/admin/reports/finance">
                    <TrendingUp className="h-3 w-3 mr-2 text-gray-400" />
                    Financial Reports
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Reports */}
            <div>
              <button
                onClick={() => toggleGroup("reports")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                aria-expanded={openGroup === "reports"}
                aria-controls="reports-submenu"
              >
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-3 text-gray-500" />
                  Reports
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openGroup === "reports" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id="reports-submenu"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openGroup === "reports" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/reports/operations">
                    <BarChart3 className="h-3 w-3 mr-2 text-gray-400" />
                    Operational Reports
                  </NavLink>
                  <NavLink to="/admin/reports/customers">
                    <PieChart className="h-3 w-3 mr-2 text-gray-400" />
                    Customer Analytics
                  </NavLink>
                  <NavLink to="/admin/reports/agents">
                    <UserCheck className="h-3 w-3 mr-2 text-gray-400" />
                    Agent Performance
                  </NavLink>
                  <NavLink to="/admin/reports/logs">
                    <Activity className="h-3 w-3 mr-2 text-gray-400" />
                    System Activity Logs
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Support */}
            <div>
              <button
                onClick={() => toggleGroup("support")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                aria-expanded={openGroup === "support"}
                aria-controls="support-submenu"
              >
                <div className="flex items-center">
                  <Headphones className="h-4 w-4 mr-3 text-gray-500" />
                  Support
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openGroup === "support" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id="support-submenu"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openGroup === "support" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/support/tickets">
                    <MessageSquare className="h-3 w-3 mr-2 text-gray-400" />
                    Support Tickets
                  </NavLink>
                  <NavLink to="/admin/support/claims">
                    <AlertTriangle className="h-3 w-3 mr-2 text-gray-400" />
                    Claims
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div>
              <button
                onClick={() => toggleGroup("settings")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                aria-expanded={openGroup === "settings"}
                aria-controls="settings-submenu"
              >
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-3 text-gray-500" />
                  Settings
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openGroup === "settings" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id="settings-submenu"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openGroup === "settings" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/settings/roles">
                    <Shield className="h-3 w-3 mr-2 text-gray-400" />
                    Roles & Permissions
                  </NavLink>
                  <NavLink to="/admin/settings/rates">
                    <DollarSign className="h-3 w-3 mr-2 text-gray-400" />
                    Rate Management
                  </NavLink>
                  <NavLink to="/admin/settings/notifications">
                    <Bell className="h-3 w-3 mr-2 text-gray-400" />
                    Notification Settings
                  </NavLink>
                  <NavLink to="/admin/settings/system">
                    <Settings className="h-3 w-3 mr-2 text-gray-400" />
                    System Preferences
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Security */}
            <div>
              <button
                onClick={() => toggleGroup("security")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                aria-expanded={openGroup === "security"}
                aria-controls="security-submenu"
              >
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-3 text-gray-500" />
                  Security
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openGroup === "security" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id="security-submenu"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openGroup === "security" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/security/access-logs">
                    <Eye className="h-3 w-3 mr-2 text-gray-400" />
                    Access Logs
                  </NavLink>
                  <NavLink to="/admin/security/audit">
                    <Activity className="h-3 w-3 mr-2 text-gray-400" />
                    Audit Logs
                  </NavLink>
                  <NavLink to="/admin/security/2fa">
                    <ShieldCheck className="h-3 w-3 mr-2 text-gray-400" />
                    2FA Management
                  </NavLink>
                </div>
              </div>
            </div>
          </nav>

       
          <div className="flex-shrink-0 border-t border-gray-200">
            {/* Logout */}
            <div
              onClick={() => {
                alert('Logged out successfully! In a real app, this would clear session data.');
                handleNavigation('/admin/auth/login');
              }}
              className="flex items-center px-3 py-2.5 mx-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
            >
              <LogOut className="h-4 w-4 mr-3 text-gray-500" />
              <span className="text-sm">Sign Out</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;