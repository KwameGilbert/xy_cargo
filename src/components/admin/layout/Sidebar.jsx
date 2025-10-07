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
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex-1 flex flex-col min-h-0">
          <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden">
            {/* Dashboard */}
            <NavLink to="/admin/dashboard">
              <LayoutDashboard className="h-4 w-4 mr-3 text-gray-500" />
              Dashboard
            </NavLink>

            {/* Parcels */}
            <div>
              <button
                onClick={() => toggleGroup("parcels")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-3 text-gray-500" />
                  Parcels
                </div>
                {openGroup === "parcels" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              {openGroup === "parcels" && (
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/parcels">All Parcels</NavLink>
                  <NavLink to="/admin/parcels/create">Create Parcel</NavLink>
                  <NavLink to="/admin/parcels/value-added">Value Added Services</NavLink>
                </div>
              )}
            </div>

            {/* Shipments */}
            <div>
              <button
                onClick={() => toggleGroup("shipments")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Ship className="h-4 w-4 mr-3 text-gray-500" />
                  Shipments
                </div>
                {openGroup === "shipments" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              {openGroup === "shipments" && (
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/shipments">All Shipments</NavLink>
                  <NavLink to="/admin/shipments/create">Create Shipment</NavLink>
                  <NavLink to="/admin/shipments/manifests">Manifests</NavLink>
                </div>
              )}
            </div>

            {/* Warehouses */}
            <div>
              <button
                onClick={() => toggleGroup("warehouses")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Warehouse className="h-4 w-4 mr-3 text-gray-500" />
                  Warehouses
                </div>
                {openGroup === "warehouses" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              {openGroup === "warehouses" && (
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/warehouses">All Warehouses</NavLink>
                  <NavLink to="/admin/warehouses/staff">Warehouse Staff</NavLink>
                  <NavLink to="/admin/warehouses/logs">Intake Logs</NavLink>
                </div>
              )}
            </div>

            {/* Users & Agents */}
            <div>
              <button
                onClick={() => toggleGroup("users")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-3 text-gray-500" />
                  Users & Agents
                </div>
                {openGroup === "users" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              {openGroup === "users" && (
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/customers">Customers</NavLink>
                  <NavLink to="/admin/agents">Agents</NavLink>
                  <NavLink to="/admin/agents/commissions">Agent Commissions</NavLink>
                </div>
              )}
            </div>

            {/* Finance */}
            <div>
              <button
                onClick={() => toggleGroup("finance")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-3 text-gray-500" />
                  Finance
                </div>
                {openGroup === "finance" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              {openGroup === "finance" && (
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/payments">All Payments</NavLink>
                  <NavLink to="/admin/payments/pending">Pending Payments</NavLink>
                  <NavLink to="/admin/refunds">Refunds & Adjustments</NavLink>
                  <NavLink to="/admin/reports/finance">Financial Reports</NavLink>
                </div>
              )}
            </div>

            {/* Reports */}
            <div>
              <button
                onClick={() => toggleGroup("reports")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-3 text-gray-500" />
                  Reports
                </div>
                {openGroup === "reports" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              {openGroup === "reports" && (
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/reports/operations">Operational Reports</NavLink>
                  <NavLink to="/admin/reports/customers">Customer Analytics</NavLink>
                  <NavLink to="/admin/reports/agents">Agent Performance</NavLink>
                  <NavLink to="/admin/reports/logs">System Activity Logs</NavLink>
                </div>
              )}
            </div>

            {/* Support */}
            <div>
              <button
                onClick={() => toggleGroup("support")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Headphones className="h-4 w-4 mr-3 text-gray-500" />
                  Support
                </div>
                {openGroup === "support" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              {openGroup === "support" && (
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/support/tickets">Support Tickets</NavLink>
                  <NavLink to="/admin/support/claims">Claims</NavLink>
                </div>
              )}
            </div>

            {/* Settings */}
            <div>
              <button
                onClick={() => toggleGroup("settings")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-3 text-gray-500" />
                  Settings
                </div>
                {openGroup === "settings" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              {openGroup === "settings" && (
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/settings/roles">Roles & Permissions</NavLink>
                  <NavLink to="/admin/settings/rates">Rate Management</NavLink>
                  <NavLink to="/admin/settings/notifications">Notification Settings</NavLink>
                  <NavLink to="/admin/settings/system">System Preferences</NavLink>
                </div>
              )}
            </div>

            {/* Security */}
            <div>
              <button
                onClick={() => toggleGroup("security")}
                className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-3 text-gray-500" />
                  Security
                </div>
                {openGroup === "security" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              {openGroup === "security" && (
                <div className="ml-8 mt-1 space-y-1">
                  <NavLink to="/admin/security/access-logs">Access Logs</NavLink>
                  <NavLink to="/admin/security/audit">Audit Logs</NavLink>
                  <NavLink to="/admin/security/2fa">2FA Management</NavLink>
                </div>
              )}
            </div>
          </nav>

          {/* Profile and Logout - Merged at Bottom */}
          <div className="flex-shrink-0 border-t border-gray-200">
            {/* Profile Section */}
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

            {/* Logout */}
            <div
              onClick={() => {
                alert('Logged out successfully! In a real app, this would clear session data.');
                handleNavigation('/admin/auth/login');
              }}
              className="flex items-center px-3 py-2.5 mx-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer"
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