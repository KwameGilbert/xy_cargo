import React, { useState, useEffect } from "react";
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
  Menu,
  X,
} from "lucide-react";
import { motion } from 'framer-motion';

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
      { name: "Warehouse Staff", icon: User, path: "/admin/staff" },
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
      // { name: "Refunds & Adjustments", icon: RotateCcw, path: "/admin/refunds" },
      { name: "Financial Reports", icon: TrendingUp, path: "/admin/reports/finance" },
    ],
  },
  {
    name: "Reports",
    icon: BarChart3,
    group: "reports",
    children: [
      // { name: "Operational Reports", icon: BarChart3, path: "/admin/reports/operations" },
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
      // { name: "Claims", icon: AlertTriangle, path: "/admin/support/claims" },
    ],
  },
  {
    name: "Settings",
    icon: Settings,
    group: "settings",
    children: [
      // { name: "Roles & Permissions", icon: Shield, path: "/admin/settings/roles" },
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

// Helper function to find the group of a given path
const findActiveGroup = (path) => {
  for (const item of NAV_ITEMS) {
    if (item.group && item.children?.some(child => child.path === path)) {
      return item.group;
    }
  }
  return null;
};

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(() => findActiveGroup(location.pathname));

  // Effect to automatically open the correct group when the path changes
  useEffect(() => {
    const activeGroup = findActiveGroup(location.pathname);
    if (activeGroup && openGroup !== activeGroup) {
      setOpenGroup(activeGroup);
    }
  }, [location.pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleGroup = (group) => setOpenGroup(openGroup === group ? null : group);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout attempt: Simulating session clear and redirect.');
    // In a real app, you would clear authentication tokens here
    navigate('/admin/auth/login');
    setIsMobileMenuOpen(false);
  };

  // Base link styling function - ADD 'group' for group-hover support
  const linkClass = (isActive) =>
    `flex items-center text-sm px-3 py-2.5 mx-3 rounded-xl transition-colors cursor-pointer w-full group ${
      isActive
        ? "bg-red-50 text-red-700 font-semibold border-r-4 border-red-600 shadow-sm"
        : "text-gray-700 hover:text-red-700 hover:bg-red-100/50"
    }`;

  // Submenu link styling function - ADD 'group' for group-hover support
  const subLinkClass = (isActive) =>
    `flex items-center text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer w-full group ${
      isActive
        ? "text-red-600 font-medium bg-red-50"
        : "text-gray-600 hover:text-red-700 hover:bg-red-100/50"
    }`;

  // Group button styling - ADD 'group' for group-hover support
  const groupButtonClass = (isParentActive) =>
    `flex items-center justify-between w-full text-sm px-3 py-2.5 mx-3 rounded-xl transition-colors group ${
      isParentActive 
        ? "bg-gray-100 text-gray-800" 
        : "text-gray-700 hover:text-red-700 hover:bg-red-100/50"
    }`;

  // Universal Navigation Link Component
  const NavLink = ({ to, children, className = "", ...props }) => (
    <button
      type="button"
      onClick={() => handleNavigation(to)}
      className={className}
      tabIndex={0}
      aria-label={typeof children === "string" ? children : undefined}
      {...props}
    >
      {children}
    </button>
  );

  // Animation variants for the submenu
  const submenuVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.2, ease: "easeInOut" }
      }
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.2, delay: 0.1, ease: "easeInOut" }
      }
    }
  };

  // Main Group/Link Renderer Component
  const NavItemRenderer = ({ item }) => {
    const isGroup = item.children && item.children.length > 0;

    if (!isGroup) {
      // Render simple link
      const Icon = item.icon;
      const isActive = location.pathname === item.path;
      
      return (
        <NavLink 
          to={item.path} 
          className={linkClass(isActive)}
          aria-current={isActive ? "page" : undefined}
        >
          {/* UPDATED: Use group-hover for consistent icon highlighting */}
          <Icon className={`h-4 w-4 mr-3 transition-colors ${isActive ? 'text-red-600' : 'text-gray-500 group-hover:text-red-500'}`} />
          {item.name}
        </NavLink>
      );
    }

    // Render collapsible group
    const Icon = item.icon;
    const isOpen = openGroup === item.group;
    const isParentActive = item.children.some(child => child.path === location.pathname);

    return (
      <div className="mb-1">
        <button
          onClick={() => toggleGroup(item.group)}
          className={groupButtonClass(isParentActive)}
          aria-expanded={isOpen}
          aria-controls={`${item.group}-submenu`}
        >
          <div className="flex items-center">
            {/* UPDATED: Use group-hover for consistent icon highlighting */}
            <Icon className={`h-4 w-4 mr-3 transition-colors ${isParentActive ? 'text-red-600' : 'text-gray-500 group-hover:text-red-500'}`} />
            {item.name}
          </div>
          {/* UPDATED: Use group-hover for chevron highlighting */}
          <ChevronRight
            className={`h-4 w-4 text-gray-400 group-hover:text-red-500 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
          />
        </button>

        {/* Animated submenu container */}
        <motion.div
          id={`${item.group}-submenu`}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          variants={submenuVariants}
          className="overflow-hidden"
        >
          {/* Submenu content */}
          <div className="ml-5 space-y-1 border-l border-gray-200 pl-3">
            {item.children.map((child, idx) => {
              const ChildIcon = child.icon;
              const isActive = location.pathname === child.path;
              return (
                <NavLink 
                  key={idx} 
                  to={child.path} 
                  className={subLinkClass(isActive)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* UPDATED: Use group-hover for consistent icon highlighting */}
                  <ChildIcon className={`h-3 w-3 mr-2 transition-colors ${isActive ? 'text-red-600' : 'text-gray-500 group-hover:text-red-500'}`} />
                  {child.name}
                </NavLink>
              );
            })}
          </div>
        </motion.div>
       </div>
    );
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white text-gray-700 shadow-xl border border-gray-100 hover:scale-[1.03] transition-transform duration-150"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out h-screen`}
      >
        {/* Logo */}
        <div className="border-b border-gray-200 flex-shrink-0">
          <div className="px-6 py-5 flex items-center">
            <div className="p-2 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-extrabold text-gray-900 tracking-wide">XY Cargo ZM</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-semibold text-sm shadow-md">
              BS
            </div>
            <div className="ml-3 flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">Bright Smith</h3>
              <p className="text-xs text-gray-500 truncate">Admin | ID: XY-CU-2833</p>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable Content */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <nav className="flex-1 py-4 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {NAV_ITEMS.map((item, index) => (
              <NavItemRenderer key={index} item={item} />
            ))}
          </nav>
        </div>

        {/* Logout at Bottom */}
        <div className="flex-shrink-0 border-t border-gray-200 p-2">
          <button
            onClick={handleLogout}
            className="flex items-center p-3 w-full text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl cursor-pointer transition-colors"
          >
            <LogOut className="h-4 w-4 mr-3 text-gray-500 hover:text-red-600 transition-colors" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;