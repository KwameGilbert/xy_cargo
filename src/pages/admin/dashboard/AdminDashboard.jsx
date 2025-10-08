import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
  Package,
  Truck,
  Users,
  DollarSign,
  TrendingUp,
  BarChart3,
  UserCheck,
  CreditCard,
  Plus,
  Eye,
  Settings,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Filter
} from 'lucide-react';

// Mock data - EXTENDED with new metrics
const mockKPIs = {
  totalParcels: 15420,
  pendingShipments: 342,
  activeCustomers: 1289,
  unpaidParcels: 156,
  revenueThisMonth: 45678.90,
  // NEW: Additional KPIs
  avgDeliveryTime: '2.5 days',
  delayedShipmentsPercent: 8
};

const mockCharts = {
  shipmentVolume: [120, 150, 180, 200, 220, 250, 280], // Last 7 days
  warehousePerformance: [85, 88, 92, 90, 95, 93, 97], // Performance %
  topAgents: [
    { name: 'Agent A', parcels: 450 },
    { name: 'Agent B', parcels: 380 },
    { name: 'Agent C', parcels: 320 }
  ],
  paymentStats: { paid: 85, pending: 15 }, // Percentages
  // NEW: Parcel status distribution (for pie chart)
  parcelStatus: { pending: 25, inTransit: 40, delivered: 30, returned: 5 }, // Percentages
  // NEW: Monthly revenue trend (last 6 months)
  monthlyRevenue: [35000, 38000, 42000, 41000, 45000, 45678.90]
};

const mockRecentActivity = [
  { id: 1, action: 'New shipment created', user: 'Admin', time: '2 minutes ago', type: 'shipment', link: '/admin/shipments/123' },
  { id: 2, action: 'Payment processed', user: 'System', time: '5 minutes ago', type: 'payment', link: '/admin/payments/456' },
  { id: 3, action: 'User account updated', user: 'Admin', time: '10 minutes ago', type: 'user', link: '/admin/users/789' },
  { id: 4, action: 'Warehouse inventory updated', user: 'Manager', time: '15 minutes ago', type: 'warehouse', link: '/admin/warehouses' },
  { id: 5, action: 'New customer registered', user: 'System', time: '20 minutes ago', type: 'customer', link: '/admin/customers' }
];

// NEW: Mock finance summary
const mockFinanceSummary = {
  totalRevenue: 45678.90,
  agentPayouts: 12000.00,
  platformFees: 2300.00,
  pendingRefunds: 450.00
};

// NEW: Mock notifications
const mockNotifications = [
  { id: 1, message: '12 shipments delayed beyond SLA', type: 'warning', icon: AlertTriangle },
  { id: 2, message: 'Low stock in Warehouse B', type: 'info', icon: Info },
  { id: 3, message: 'Payment gateway offline', type: 'error', icon: XCircle }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [kpis, setKpis] = useState(mockKPIs);
  const [charts, setCharts] = useState(mockCharts);
  const [recentActivity, setRecentActivity] = useState(mockRecentActivity);
  const [financeSummary, setFinanceSummary] = useState(mockFinanceSummary);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [loading, setLoading] = useState(true);
  // NEW: State for tab filtering
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // UPDATED: Extended KPI cards with new metrics
  const kpiCards = [
    {
      title: 'Total Parcels',
      value: kpis.totalParcels.toLocaleString(),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pending Shipments',
      value: kpis.pendingShipments.toLocaleString(),
      icon: Truck,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Active Customers',
      value: kpis.activeCustomers.toLocaleString(),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Unpaid Parcels',
      value: kpis.unpaidParcels.toLocaleString(),
      icon: CreditCard,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Revenue This Month',
      value: `$${kpis.revenueThisMonth.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    // NEW: Additional KPIs
    {
      title: 'Avg Delivery Time',
      value: kpis.avgDeliveryTime,
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Delayed Shipments (%)',
      value: `${kpis.delayedShipmentsPercent}%`,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const quickLinks = [
    {
      title: 'Create Shipment',
      icon: Plus,
      action: () => navigate('/admin/shipments/create'),
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'View Pending Payments',
      icon: Eye,
      action: () => navigate('/admin/payments/pending'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Manage Users',
      icon: Settings,
      action: () => navigate('/admin/users'),
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Recent Activity Log',
      icon: Activity,
      action: () => navigate('/admin/activity'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  // NEW: Function to get activity icon and color based on type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'shipment': return { icon: Truck, color: 'text-yellow-500' };
      case 'payment': return { icon: CreditCard, color: 'text-green-500' };
      case 'user': return { icon: Users, color: 'text-blue-500' };
      case 'warehouse': return { icon: Package, color: 'text-purple-500' };
      case 'customer': return { icon: UserCheck, color: 'text-indigo-500' };
      default: return { icon: Info, color: 'text-gray-500' };
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's an overview of your system.</p>
          </div>

          {/* NEW: Tab Filters */}
          <div className="flex space-x-4 mb-8 border-b border-gray-200">
            {['overview', 'finance', 'operations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-600 hover:text-red-500'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Conditional Rendering Based on Tab */}
          {activeTab === 'overview' && (
            <>
              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-8">
                {kpiCards.map((kpi, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                        <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts and Quick Links */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Charts */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Shipment Volume Trends */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-red-600" />
                      Shipment Volume Trends (Last 7 Days)
                    </h3>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {charts.shipmentVolume.map((value, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-red-600 rounded-t"
                            style={{ height: `${(value / 300) * 100}%` }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* NEW: Parcel Status Distribution Pie Chart */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-red-600" />
                      Parcel Status Distribution
                    </h3>
                    <div className="flex items-center justify-center">
                      <div
                        className="w-32 h-32 rounded-full"
                        style={{
                          background: `conic-gradient(
                            #fbbf24 0% ${charts.parcelStatus.pending}%,
                            #3b82f6 ${charts.parcelStatus.pending}% ${charts.parcelStatus.pending + charts.parcelStatus.inTransit}%,
                            #10b981 ${charts.parcelStatus.pending + charts.parcelStatus.inTransit}% ${charts.parcelStatus.pending + charts.parcelStatus.inTransit + charts.parcelStatus.delivered}%,
                            #ef4444 ${charts.parcelStatus.pending + charts.parcelStatus.inTransit + charts.parcelStatus.delivered}% 100%
                          )`
                        }}
                      ></div>
                      <div className="ml-6 space-y-2">
                        <div className="flex items-center"><div className="w-3 h-3 bg-yellow-400 rounded mr-2"></div> Pending: {charts.parcelStatus.pending}%</div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded mr-2"></div> In Transit: {charts.parcelStatus.inTransit}%</div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded mr-2"></div> Delivered: {charts.parcelStatus.delivered}%</div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded mr-2"></div> Returned: {charts.parcelStatus.returned}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Warehouse Performance and Top Agents */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-red-600" />
                        Warehouse Performance
                      </h3>
                      <div className="space-y-3">
                        {charts.warehousePerformance.map((perf, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Day {index + 1}</span>
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-red-600 h-2 rounded-full"
                                  style={{ width: `${perf}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{perf}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <UserCheck className="h-5 w-5 mr-2 text-red-600" />
                        Top Agents
                      </h3>
                      <div className="space-y-3">
                        {charts.topAgents.map((agent, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{agent.name}</span>
                            <span className="text-sm font-medium">{agent.parcels} parcels</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Payment Stats */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-red-600" />
                      Payment Statistics
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Paid</span>
                          <span>{charts.paymentStats.paid}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-600 h-3 rounded-full"
                            style={{ width: `${charts.paymentStats.paid}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Pending</span>
                          <span>{charts.paymentStats.pending}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-red-600 h-3 rounded-full"
                            style={{ width: `${charts.paymentStats.pending}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
                  <div className="space-y-4">
                    {quickLinks.map((link, index) => (
                      <button
                        key={index}
                        onClick={link.action}
                        className="w-full bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow text-left group"
                      >
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${link.bgColor} mr-3`}>
                            <link.icon className={`h-5 w-5 ${link.color}`} />
                          </div>
                          <span className="font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                            {link.title}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* NEW: Notifications & Alerts Widget */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                      Alerts
                    </h3>
                    <div className="space-y-3">
                      {notifications.map((alert) => (
                        <div key={alert.id} className="flex items-start space-x-3">
                          <alert.icon className={`h-5 w-5 mt-0.5 ${alert.type === 'warning' ? 'text-yellow-500' : alert.type === 'error' ? 'text-red-500' : 'text-blue-500'}`} />
                          <p className="text-sm text-gray-700">{alert.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Activity Feed */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {recentActivity.map((activity) => {
                        const { icon: ActivityIcon, color } = getActivityIcon(activity.type);
                        return (
                          <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                            <ActivityIcon className={`h-5 w-5 mt-0.5 ${color}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 cursor-pointer hover:text-red-600" onClick={() => navigate(activity.link)}>
                                {activity.action}
                              </p>
                              <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => navigate('/admin/activity')}
                      className="mt-4 text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      View All Activity
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'finance' && (
            <>
              {/* NEW: Finance Summary Widget */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Finance Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between"><span>Total Revenue</span><span>${financeSummary.totalRevenue.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Agent Payouts</span><span>${financeSummary.agentPayouts.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Platform Fees</span><span>${financeSummary.platformFees.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Pending Refunds</span><span>${financeSummary.pendingRefunds.toLocaleString()}</span></div>
                  </div>
                </div>

                {/* NEW: Monthly Revenue Trend Line Chart */}
                <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-red-600" />
                    Monthly Revenue Trend
                  </h3>
                  <div className="h-64 flex items-end justify-between">
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      <polyline
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="3"
                        points={charts.monthlyRevenue.map((value, index) => `${index * 60 + 20},${200 - (value / 50000) * 150}`).join(' ')}
                      />
                      {charts.monthlyRevenue.map((value, index) => (
                        <circle key={index} cx={index * 60 + 20} cy={200 - (value / 50000) * 150} r="4" fill="#dc2626" />
                      ))}
                    </svg>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => <span key={month}>{month}</span>)}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'operations' && (
            <>
              {/* Operations-specific content (reuse from overview) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Warehouse Performance */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Warehouse Performance</h3>
                  {/* Reuse existing warehouse performance content */}
                </div>
                {/* Top Agents */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Agents</h3>
                  {/* Reuse existing top agents content */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;