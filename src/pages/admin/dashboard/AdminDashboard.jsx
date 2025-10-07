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
  Activity
} from 'lucide-react';

// Mock data - replace with actual API calls
const mockKPIs = {
  totalParcels: 15420,
  pendingShipments: 342,
  activeCustomers: 1289,
  unpaidParcels: 156,
  revenueThisMonth: 45678.90
};

const mockCharts = {
  shipmentVolume: [120, 150, 180, 200, 220, 250, 280], // Last 7 days
  warehousePerformance: [85, 88, 92, 90, 95, 93, 97], // Performance %
  topAgents: [
    { name: 'Agent A', parcels: 450 },
    { name: 'Agent B', parcels: 380 },
    { name: 'Agent C', parcels: 320 }
  ],
  paymentStats: { paid: 85, pending: 15 } // Percentages
};

const mockRecentActivity = [
  { id: 1, action: 'New shipment created', user: 'Admin', time: '2 minutes ago' },
  { id: 2, action: 'Payment processed', user: 'System', time: '5 minutes ago' },
  { id: 3, action: 'User account updated', user: 'Admin', time: '10 minutes ago' },
  { id: 4, action: 'Warehouse inventory updated', user: 'Manager', time: '15 minutes ago' },
  { id: 5, action: 'New customer registered', user: 'System', time: '20 minutes ago' }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [kpis, setKpis] = useState(mockKPIs);
  const [charts, setCharts] = useState(mockCharts);
  const [recentActivity, setRecentActivity] = useState(mockRecentActivity);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        // Replace with actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;