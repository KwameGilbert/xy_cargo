import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
  Activity,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Settings,
  Package,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Edit,
  Trash2,
  Plus,
  Eye
} from 'lucide-react';

// Mock data for audit logs
const mockAuditLogs = [
  {
    id: 'AUD-001',
    timestamp: '2025-10-13T11:30:00Z',
    userId: 'USR-001',
    userName: 'John Admin',
    userRole: 'Administrator',
    action: 'rate_created',
    resource: 'shipping_rate',
    resourceId: 'RATE-013',
    details: {
      description: 'Created new air freight rate for Lusaka → Nairobi',
      changes: {
        ratePerKg: 22.00,
        minimumCharge: 200.00,
        currency: 'USD'
      }
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    severity: 'info',
    category: 'rate_management'
  },
  {
    id: 'AUD-002',
    timestamp: '2025-10-13T11:25:00Z',
    userId: 'USR-002',
    userName: 'Sarah Manager',
    userRole: 'Operations Manager',
    action: 'parcel_status_updated',
    resource: 'parcel',
    resourceId: 'PAR-001',
    details: {
      description: 'Updated parcel status from "processing" to "shipped"',
      changes: {
        oldStatus: 'processing',
        newStatus: 'shipped',
        trackingNumber: 'XYC001234567'
      }
    },
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    severity: 'info',
    category: 'parcel_management'
  },
  {
    id: 'AUD-003',
    timestamp: '2025-10-13T11:20:00Z',
    userId: 'USR-001',
    userName: 'John Admin',
    userRole: 'Administrator',
    action: 'user_role_changed',
    resource: 'user',
    resourceId: 'USR-008',
    details: {
      description: 'Changed user role from "Staff" to "Supervisor"',
      changes: {
        oldRole: 'Staff',
        newRole: 'Supervisor',
        userName: 'David Wilson'
      }
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    severity: 'warning',
    category: 'user_management'
  },
  {
    id: 'AUD-004',
    timestamp: '2025-10-13T11:15:00Z',
    userId: 'USR-003',
    userName: 'Mike Agent',
    userRole: 'Field Agent',
    action: 'payment_processed',
    resource: 'payment',
    resourceId: 'PAY-001',
    details: {
      description: 'Processed payment of $1,250.00 for shipment XY001',
      changes: {
        amount: 1250.00,
        currency: 'USD',
        method: 'credit_card',
        status: 'completed'
      }
    },
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
    severity: 'info',
    category: 'payment'
  },
  {
    id: 'AUD-005',
    timestamp: '2025-10-13T11:10:00Z',
    userId: 'USR-001',
    userName: 'John Admin',
    userRole: 'Administrator',
    action: 'system_config_changed',
    resource: 'system_settings',
    resourceId: 'SYS-001',
    details: {
      description: 'Updated notification settings - enabled SMS notifications',
      changes: {
        setting: 'sms_notifications',
        oldValue: false,
        newValue: true
      }
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    severity: 'warning',
    category: 'system_config'
  },
  {
    id: 'AUD-006',
    timestamp: '2025-10-13T11:05:00Z',
    userId: 'USR-004',
    userName: 'Lisa Customer',
    userRole: 'Customer',
    action: 'parcel_created',
    resource: 'parcel',
    resourceId: 'PAR-002',
    details: {
      description: 'Created new parcel shipment from Lusaka to Johannesburg',
      changes: {
        weight: 5.2,
        dimensions: '30x20x15',
        serviceType: 'express',
        estimatedCost: 85.00
      }
    },
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Android 11; Mobile) AppleWebKit/537.36',
    severity: 'info',
    category: 'parcel_management'
  },
  {
    id: 'AUD-007',
    timestamp: '2025-10-13T11:00:00Z',
    userId: 'USR-005',
    userName: 'Anna Supervisor',
    userRole: 'Supervisor',
    action: 'bulk_rate_update',
    resource: 'shipping_rates',
    resourceId: 'BULK-001',
    details: {
      description: 'Bulk updated 5 shipping rates - increased rates by 5%',
      changes: {
        affectedRates: 5,
        rateIncrease: '5%',
        reason: 'Inflation adjustment'
      }
    },
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
    severity: 'warning',
    category: 'rate_management'
  },
  {
    id: 'AUD-008',
    timestamp: '2025-10-13T10:55:00Z',
    userId: 'USR-001',
    userName: 'John Admin',
    userRole: 'Administrator',
    action: 'user_deleted',
    resource: 'user',
    resourceId: 'USR-009',
    details: {
      description: 'Deleted user account for "Test User"',
      changes: {
        userName: 'Test User',
        reason: 'Account cleanup',
        permanent: true
      }
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    severity: 'critical',
    category: 'user_management'
  }
];

const AdminAuditLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');

  // Filter logs based on search and filters
  const filteredLogs = useMemo(() => {
    return mockAuditLogs.filter(log => {
      const matchesSearch = searchTerm === '' ||
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
      const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
      const matchesAction = actionFilter === 'all' || log.action === actionFilter;
      const matchesUser = userFilter === 'all' || log.userName === userFilter;

      return matchesSearch && matchesSeverity && matchesCategory && matchesAction && matchesUser;
    });
  }, [searchTerm, severityFilter, categoryFilter, actionFilter, userFilter]);

  // Get severity icon and color
  const getSeverityInfo = (severity) => {
    switch (severity) {
      case 'info':
        return { icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-100' };
      case 'warning':
        return { icon: AlertTriangle, color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
      case 'critical':
        return { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100' };
      default:
        return { icon: Activity, color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  // Get action icon
  const getActionIcon = (action) => {
    if (action.includes('created') || action.includes('added')) return Plus;
    if (action.includes('updated') || action.includes('changed')) return Edit;
    if (action.includes('deleted') || action.includes('removed')) return Trash2;
    if (action.includes('viewed') || action.includes('accessed')) return Eye;
    return Settings;
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'user_management':
        return User;
      case 'parcel_management':
        return Package;
      case 'payment':
        return DollarSign;
      case 'rate_management':
        return Settings;
      case 'system_config':
        return Shield;
      default:
        return Activity;
    }
  };

  // Get action display name
  const getActionDisplayName = (action) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Get category display name
  const getCategoryDisplayName = (category) => {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

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

  // Get unique values for filters
  const uniqueSeverities = [...new Set(mockAuditLogs.map(log => log.severity))];
  const uniqueCategories = [...new Set(mockAuditLogs.map(log => log.category))];
  const uniqueActions = [...new Set(mockAuditLogs.map(log => log.action))];
  const uniqueUsers = [...new Set(mockAuditLogs.map(log => log.userName))];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
            <p className="text-gray-600 mt-1">Track all system activities and changes</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Download className="h-4 w-4" />
              Export Logs
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{mockAuditLogs.length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Actions</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockAuditLogs.filter(log => log.severity === 'critical').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">User Management</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockAuditLogs.filter(log => log.category === 'user_management').length}
                </p>
              </div>
              <User className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Changes</p>
                <p className="text-2xl font-bold text-orange-600">
                  {mockAuditLogs.filter(log => log.category === 'system_config').length}
                </p>
              </div>
              <Settings className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search audit logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Severity</option>
                {uniqueSeverities.map(severity => (
                  <option key={severity} value={severity}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryDisplayName(category)}
                  </option>
                ))}
              </select>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Actions</option>
                {uniqueActions.map(action => (
                  <option key={action} value={action}>
                    {getActionDisplayName(action)}
                  </option>
                ))}
              </select>
              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Users</option>
                {uniqueUsers.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => {
                  const SeverityIcon = getSeverityInfo(log.severity).icon;
                  const ActionIcon = getActionIcon(log.action);
                  const CategoryIcon = getCategoryIcon(log.category);
                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatTimestamp(log.timestamp)}
                        </div>
                        <div className="text-xs text-gray-500">{log.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-500" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                            <div className="text-sm text-gray-500">{log.userRole}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ActionIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {getActionDisplayName(log.action)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CategoryIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 capitalize">
                              {log.resource.replace('_', ' ')}
                            </div>
                            <div className="text-xs text-gray-500">{log.resourceId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityInfo(log.severity).bgColor} ${getSeverityInfo(log.severity).color}`}>
                          <SeverityIcon className="h-3 w-3 mr-1" />
                          {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {log.details.description}
                        </div>
                        {log.details.changes && (
                          <div className="text-xs text-gray-500 mt-1">
                            <details>
                              <summary className="cursor-pointer hover:text-gray-700">
                                View changes
                              </summary>
                              <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                                {JSON.stringify(log.details.changes, null, 2)}
                              </pre>
                            </details>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No audit logs found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAuditLogsPage;