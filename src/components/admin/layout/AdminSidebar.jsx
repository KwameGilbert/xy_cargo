import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Eye,
  Bell,
  ShieldCheck,
} from "lucide-react";

// -------------------------------------------------------------------
// 1. NAVIGATION DATA CONFIGURATION
// Define the entire sidebar structure as a data array
// -------------------------------------------------------------------
const NAV_ITEMS = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    name: "Parcels",
    icon: Package,
    group: "parcels",
    children: [
      { name: "All Parcels", icon: Package, path: "/admin/parcels" },
      { name: "Create Parcel", icon: Plus, path: "/admin/parcels/create" },
      { name: "Value Added Services", icon: Star, path: "/admin/parcels/value-added" },
    ],
  },
  {
    name: "Shipments",
    icon: Ship,
    group: "shipments",
    children: [
      { name: "All Shipments", icon: Truck, path: "/admin/shipments" },
      { name: "Create Shipment", icon: Plus, path: "/admin/shipments/create" },
      { name: "Manifests", icon: FileText, path: "/admin/shipments/manifests" },
    ],
  },
  {
    name: "Warehouses",
    icon: Warehouse,
    group: "warehouses",
    children: [
      { name: "All Warehouses", icon: Warehouse, path: "/admin/warehouses" },
      { name: "Warehouse Staff", icon: User, path: "/admin/warehouses/staff" },
      { name: "Intake Logs", icon: Activity, path: "/admin/warehouses/logs" },
    ],
  },
  {
    name: "Users & Agents",
    icon: Users,
    group: "users",
    children: [
      { name: "Customers", icon: User, path: "/admin/customers" },
      { name: "Agents", icon: UserCheck, path: "/admin/agents" },
      { name: "Agent Commissions", icon: DollarSign, path: "/admin/agents/commissions" },
    ],
  },
  {
    name: "Finance",
    icon: DollarSign,
    group: "finance",
    children: [
      { name: "All Payments", icon: CreditCard, path: "/admin/payments" },
      { name: "Pending Payments", icon: CreditCard, path: "/admin/payments/pending" },
      { name: "Refunds & Adjustments", icon: RotateCcw, path: "/admin/refunds" },
      { name: "Financial Reports", icon: TrendingUp, path: "/admin/reports/finance" },
    ],
  },
  {
    name: "Reports",
    icon: BarChart3,
    group: "reports",
    children: [
      { name: "Operational Reports", icon: BarChart3, path: "/admin/reports/operations" },
      { name: "Customer Analytics", icon: PieChart, path: "/admin/reports/customers" },
      { name: "Agent Performance", icon: UserCheck, path: "/admin/reports/agents" },
      { name: "System Activity Logs", icon: Activity, path: "/admin/reports/logs" },
    ],
  },
  {
    name: "Support",
    icon: Headphones,
    group: "support",
    children: [
      { name: "Support Tickets", icon: MessageSquare, path: "/admin/support/tickets" },
      { name: "Claims", icon: AlertTriangle, path: "/admin/support/claims" },
    ],
  },
  {
    name: "Settings",
    icon: Settings,
    group: "settings",
    children: [
      { name: "Roles & Permissions", icon: Shield, path: "/admin/settings/roles" },
      { name: "Rate Management", icon: DollarSign, path: "/admin/settings/rates" },
      { name: "Notification Settings", icon: Bell, path: "/admin/settings/notifications" },
      { name: "System Preferences", icon: Settings, path: "/admin/settings/system" },
    ],
  },
  {
    name: "Security",
    icon: Shield,
    group: "security",
    children: [
      { name: "Access Logs", icon: Eye, path: "/admin/security/access-logs" },
      { name: "Audit Logs", icon: Activity, path: "/admin/security/audit" },
      { name: "2FA Management", icon: ShieldCheck, path: "/admin/security/2fa" },
    ],
  },
];

// -------------------------------------------------------------------
// 2. SIDEBAR COMPONENT
// -------------------------------------------------------------------
const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleGroup = (group) => setOpenGroup(openGroup === group ? null : group);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Base link styling function
  const linkClass = (isActive) =>
    `flex items-center text-sm px-3 py-2.5 mx-3 rounded-md transition-colors cursor-pointer ${isActive
      ? "bg-red-50 text-red-600 border-r-2 border-red-600"
      : "text-gray-700 hover:bg-gray-50"
    }`;

  // Submenu link styling function
  const subLinkClass = (isActive) =>
    `flex items-center text-sm px-3 py-2.5 rounded-md transition-colors cursor-pointer ${isActive
      ? "text-red-600 font-medium bg-red-50"
      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
    }`;

  // Universal Navigation Link Component
  const NavLink = ({ to, children, className = "" }) => (
    <button
      type="button"
      onClick={() => handleNavigation(to)}
      className={className || linkClass(location.pathname === to)}
      tabIndex={0}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </button>
  );

  // Main Group/Link Renderer Component
  const NavItemRenderer = ({ item }) => {
    const isGroup = item.children && item.children.length > 0;

    if (!isGroup) {
      // Render simple link
      const Icon = item.icon;
      return (
        <NavLink to={item.path}>
          <Icon className="h-4 w-4 mr-3 text-gray-500" />
          {item.name}
        </NavLink>
      );
    }

    // Render collapsible group
    const Icon = item.icon;
    const isOpen = openGroup === item.group;

    return (
      <div>
        <button
          onClick={() => toggleGroup(item.group)}
          className="flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          aria-expanded={isOpen}
          aria-controls={`${item.group}-submenu`}
        >
          <div className="flex items-center">
            <Icon className="h-4 w-4 mr-3 text-gray-500" />
            {item.name}
          </div>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <div
          id={`${item.group}-submenu`}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0" // Increased max-h for safety
            }`}
        >
          <div className="ml-5 mt-1 space-y-1 border-l border-gray-200 pl-3">
            {item.children.map((child, idx) => {
              const ChildIcon = child.icon;
              return (
                <NavLink key={idx} to={child.path} className={subLinkClass(location.pathname === child.path)}>
                  <ChildIcon className="h-3 w-3 mr-2" />
                  {child.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 flex flex-col">
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
        className={`${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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

        {/* Profile Section */}
        <div className="px-4 py-3 border-t border-gray-200">
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

        {/* Navigation - Scrollable */}
        <div className="flex-1 flex flex-col min-h-0">
          <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* Loop through the NAV_ITEMS array to render all links/groups */}
            {NAV_ITEMS.map((item, index) => (
              <NavItemRenderer key={index} item={item} />
            ))}
          </nav>
        </div>

        {/*Logout at Bottom */}
        <div className="flex-shrink-0  border-t border-gray-200">
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

      </aside>
    </div>
  );
};

export default AdminSidebar;