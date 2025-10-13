import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
  Activity,
  Users,
  Package,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download,
  RefreshCw,
  Search,
  Eye,
  UserCheck,
  Settings,
  LogIn,
  LogOut,
  FileText,
  Database,
  Server,
  Wifi,
  WifiOff
} from 'lucide-react';
import ReportFilters from '../../../components/admin/reports/ReportFilters';
import DataExport from '../../../components/admin/reports/DataExport';

// Mock data for system activity logs
const mockActivityData = {
  overview: {
    totalActivities: 15420,
    todayActivities: 234,
    activeUsers: 89,
    systemUptime: 99.8,
    errorRate: 0.2,
    avgResponseTime: 245
  },
  activities: [
    {
      id: 'ACT-001',
      timestamp: '2025-10-12T14:30:00Z',
      user: 'John Admin',
      action: 'User Login',
      resource: 'Authentication',
      status: 'success',
      ip: '192.168.1.100',
      details: 'Successful login from admin panel',
      severity: 'info'
    },
    {
      id: 'ACT-002',
      timestamp: '2025-10-12T14:25:00Z',
      user: 'Mary Customer',
      action: 'Parcel Created',
      resource: 'Parcels',
      status: 'success',
      ip: '10.0.0.50',
      details: 'New parcel created for delivery',
      severity: 'info'
    },
    {
      id: 'ACT-003',
      timestamp: '2025-10-12T14:20:00Z',
      user: 'System',
      action: 'Backup Completed',
      resource: 'Database',
      status: 'success',
      ip: 'localhost',
      details: 'Daily database backup completed successfully',
      severity: 'info'
    },
    {
      id: 'ACT-004',
      timestamp: '2025-10-12T14:15:00Z',
      user: 'David Agent',
      action: 'Payment Processed',
      resource: 'Payments',
      status: 'success',
      ip: '172.16.0.25',
      details: 'Payment of ZMW 1,250 processed',
      severity: 'info'
    },
    {
      id: 'ACT-005',
      timestamp: '2025-10-12T14:10:00Z',
      user: 'System',
      action: 'Security Alert',
      resource: 'Security',
      status: 'warning',
      ip: '192.168.1.150',
      details: 'Multiple failed login attempts detected',
      severity: 'warning'
    },
    {
      id: 'ACT-006',
      timestamp: '2025-10-12T14:05:00Z',
      user: 'Grace Admin',
      action: 'Settings Updated',
      resource: 'Configuration',
      status: 'success',
      ip: '192.168.1.100',
      details: 'Rate management settings updated',
      severity: 'info'
    },
    {
      id: 'ACT-007',
      timestamp: '2025-10-12T14:00:00Z',
      user: 'Peter Customer',
      action: 'Shipment Tracked',
      resource: 'Tracking',
      status: 'success',
      ip: '10.0.0.75',
      details: 'Shipment tracking accessed',
      severity: 'info'
    },
    {
      id: 'ACT-008',
      timestamp: '2025-10-12T13:55:00Z',
      user: 'System',
      action: 'API Error',
      resource: 'API',
      status: 'error',
      ip: 'api.xy-cargo.com',
      details: 'Rate limit exceeded for external API',
      severity: 'error'
    },
    {
      id: 'ACT-009',
      timestamp: '2025-10-12T13:50:00Z',
      user: 'Sarah Agent',
      action: 'Parcel Updated',
      resource: 'Parcels',
      status: 'success',
      ip: '172.16.0.30',
      details: 'Parcel status updated to delivered',
      severity: 'info'
    },
    {
      id: 'ACT-010',
      timestamp: '2025-10-12T13:45:00Z',
      user: 'System',
      action: 'Maintenance Mode',
      resource: 'System',
      status: 'info',
      ip: 'localhost',
      details: 'Scheduled maintenance completed',
      severity: 'info'
    }
  ],
  categories: {
    user: { count: 5234, percentage: 34 },
    system: { count: 4567, percentage: 30 },
    security: { count: 2345, percentage: 15 },
    api: { count: 1890, percentage: 12 },
    database: { count: 1384, percentage: 9 }
  },
  status: {
    success: { count: 14230, percentage: 92.3 },
    warning: { count: 890, percentage: 5.8 },
    error: { count: 300, percentage: 1.9 }
  },
  recentAlerts: [
    {
      id: 'ALT-001',
      timestamp: '2025-10-12T14:10:00Z',
      type: 'Security',
      message: 'Multiple failed login attempts from IP 192.168.1.150',
      severity: 'high',
      status: 'active'
    },
    {
      id: 'ALT-002',
      timestamp: '2025-10-12T13:55:00Z',
      type: 'Performance',
      message: 'API response time exceeded 2 seconds',
      severity: 'medium',
      status: 'resolved'
    },
    {
      id: 'ALT-003',
      timestamp: '2025-10-12T13:40:00Z',
      type: 'System',
      message: 'Database connection pool near capacity',
      severity: 'low',
      status: 'active'
    }
  ]
};

const AdminSystemActivityLogsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState({ start: '2025-10-01', end: '2025-10-12' });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Handle export functionality
  const handleExportReport = async (type) => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Exporting ${type} report...`);
    }, 2000);
  };

  // Filter activities based on search and filters
  const filteredActivities = useMemo(() => {
    return mockActivityData.activities.filter(activity => {
      const matchesSearch = searchTerm === '' ||
        activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.details.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' ||
        (categoryFilter === 'user' && activity.user !== 'System') ||
        (categoryFilter === 'system' && activity.user === 'System') ||
        (categoryFilter === 'security' && activity.resource === 'Security') ||
        (categoryFilter === 'api' && activity.resource === 'API') ||
        (categoryFilter === 'database' && activity.resource === 'Database');

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter]);

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case 'success':
        return { icon: CheckCircle, color: 'text-green-600 bg-green-100', label: 'Success' };
      case 'warning':
        return { icon: AlertTriangle, color: 'text-yellow-600 bg-yellow-100', label: 'Warning' };
      case 'error':
        return { icon: XCircle, color: 'text-red-600 bg-red-100', label: 'Error' };
      default:
        return { icon: Activity, color: 'text-gray-600 bg-gray-100', label: 'Info' };
    }
  };

  // Get severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Get resource icon
  const getResourceIcon = (resource) => {
    switch (resource) {
      case 'Authentication':
        return LogIn;
      case 'Parcels':
        return Package;
      case 'Payments':
        return DollarSign;
      case 'Security':
        return Shield;
      case 'Database':
        return Database;
      case 'API':
        return Server;
      case 'Configuration':
        return Settings;
      case 'Tracking':
        return Eye;
      case 'System':
        return Server;
      default:
        return Activity;
    }
  };

  // Tabs configuration
  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'logs', name: 'Activity Logs', icon: FileText },
    { id: 'alerts', name: 'Alerts', icon: AlertTriangle }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{mockActivityData.overview.totalActivities.toLocaleString()}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Activities</p>
              <p className="text-2xl font-bold text-gray-900">{mockActivityData.overview.todayActivities}</p>
            </div>
            <Clock className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{mockActivityData.overview.activeUsers}</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Uptime</p>
              <p className="text-2xl font-bold text-gray-900">{mockActivityData.overview.systemUptime}%</p>
            </div>
            <Server className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Activity Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Activity Categories</h4>
          <div className="space-y-4">
            {Object.entries(mockActivityData.categories).map(([category, data]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    {category === 'user' && <Users className="h-4 w-4 text-blue-600" />}
                    {category === 'system' && <Server className="h-4 w-4 text-blue-600" />}
                    {category === 'security' && <Shield className="h-4 w-4 text-blue-600" />}
                    {category === 'api' && <Database className="h-4 w-4 text-blue-600" />}
                    {category === 'database' && <Database className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900 capitalize">{category}</span>
                    <div className="text-xs text-gray-500">{data.count} activities</div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">{data.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Activity Status</h4>
          <div className="space-y-4">
            {Object.entries(mockActivityData.status).map(([status, data]) => {
              const statusInfo = getStatusInfo(status);
              const Icon = statusInfo.icon;
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusInfo.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">{statusInfo.label}</span>
                      <div className="text-xs text-gray-500">{data.count} activities</div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{data.percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">System Health Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{mockActivityData.overview.systemUptime}%</div>
            <div className="text-sm text-gray-600">System Uptime</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${mockActivityData.overview.systemUptime}%` }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{mockActivityData.overview.errorRate}%</div>
            <div className="text-sm text-gray-600">Error Rate</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: `${mockActivityData.overview.errorRate * 10}%` }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{mockActivityData.overview.avgResponseTime}ms</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
            <div className="text-xs text-gray-500 mt-2">Target: &lt;200ms</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogsTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('logs')}
        isExporting={isLoading}
        showReportType={false}
      />

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Categories</option>
              <option value="user">User Activities</option>
              <option value="system">System Activities</option>
              <option value="security">Security</option>
              <option value="api">API Calls</option>
              <option value="database">Database</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.map((activity) => {
                const statusInfo = getStatusInfo(activity.status);
                const StatusIcon = statusInfo.icon;
                const ResourceIcon = getResourceIcon(activity.resource);

                return (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTimestamp(activity.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          {activity.user === 'System' ? (
                            <Server className="h-4 w-4 text-gray-600" />
                          ) : (
                            <span className="text-xs font-medium text-gray-600">
                              {activity.user.split(' ').map(n => n[0]).join('')}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{activity.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ResourceIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{activity.resource}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.ip}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {activity.details}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAlertsTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('alerts')}
        isExporting={isLoading}
        showReportType={false}
      />

      {/* Active Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Active Alerts</h4>
        <div className="space-y-4">
          {mockActivityData.recentAlerts.filter(alert => alert.status === 'active').map((alert) => (
            <div key={alert.id} className="flex items-start justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-red-900">{alert.type} Alert</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-red-800 mb-2">{alert.message}</p>
                  <p className="text-xs text-red-600">{formatTimestamp(alert.timestamp)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                  Acknowledge
                </button>
                <button className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                  Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Alerts History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Recent Alerts History</h4>
        <div className="space-y-3">
          {mockActivityData.recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {alert.status === 'active' ? (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900">{alert.type}: {alert.message}</div>
                  <div className="text-xs text-gray-500">{formatTimestamp(alert.timestamp)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  alert.status === 'active' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {alert.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">3</div>
          <div className="text-sm text-gray-600">Active Alerts</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">12</div>
          <div className="text-sm text-gray-600">Resolved Today</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
          <div className="text-sm text-gray-600">Resolution Rate</div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Activity Logs</h1>
            <p className="text-gray-600 mt-1">Monitor system activities, security events, and performance metrics</p>
          </div>
          <div className="flex gap-3">
            <DataExport
              onExportCSV={() => handleExportReport('activity-csv')}
              onExportExcel={() => handleExportReport('activity-excel')}
              onExportPDF={() => handleExportReport('activity-pdf')}
              isExporting={isLoading}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'logs' && renderLogsTab()}
            {activeTab === 'alerts' && renderAlertsTab()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSystemActivityLogsPage;