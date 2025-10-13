import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
  Eye,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Monitor,
  Smartphone,
  Globe
} from 'lucide-react';

// Mock data for access logs
const mockAccessLogs = [
  {
    id: 'LOG-001',
    userId: 'USR-001',
    userName: 'John Admin',
    userRole: 'Administrator',
    action: 'login',
    status: 'success',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    location: 'Lusaka, Zambia',
    deviceType: 'desktop',
    timestamp: '2025-10-13T11:30:00Z',
    sessionId: 'SESS-ABC123',
    details: {
      loginMethod: 'password',
      mfaUsed: true,
      suspiciousActivity: false
    }
  },
  {
    id: 'LOG-002',
    userId: 'USR-002',
    userName: 'Sarah Manager',
    userRole: 'Operations Manager',
    action: 'login',
    status: 'success',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    location: 'Johannesburg, South Africa',
    deviceType: 'desktop',
    timestamp: '2025-10-13T11:25:00Z',
    sessionId: 'SESS-DEF456',
    details: {
      loginMethod: 'password',
      mfaUsed: true,
      suspiciousActivity: false
    }
  },
  {
    id: 'LOG-003',
    userId: 'USR-003',
    userName: 'Mike Agent',
    userRole: 'Field Agent',
    action: 'login_attempt',
    status: 'failed',
    ipAddress: '203.0.113.45',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
    location: 'Unknown',
    deviceType: 'mobile',
    timestamp: '2025-10-13T11:20:00Z',
    sessionId: null,
    details: {
      loginMethod: 'password',
      failureReason: 'invalid_password',
      suspiciousActivity: true
    }
  },
  {
    id: 'LOG-004',
    userId: 'USR-001',
    userName: 'John Admin',
    userRole: 'Administrator',
    action: 'password_change',
    status: 'success',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    location: 'Lusaka, Zambia',
    deviceType: 'desktop',
    timestamp: '2025-10-13T11:15:00Z',
    sessionId: 'SESS-ABC123',
    details: {
      changeType: 'password_reset',
      securityLevel: 'high'
    }
  },
  {
    id: 'LOG-005',
    userId: 'USR-004',
    userName: 'Lisa Customer',
    userRole: 'Customer',
    action: 'login',
    status: 'success',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Android 11; Mobile) AppleWebKit/537.36',
    location: 'Cape Town, South Africa',
    deviceType: 'mobile',
    timestamp: '2025-10-13T11:10:00Z',
    sessionId: 'SESS-GHI789',
    details: {
      loginMethod: 'password',
      mfaUsed: false,
      suspiciousActivity: false
    }
  },
  {
    id: 'LOG-006',
    userId: 'USR-005',
    userName: 'Unknown User',
    userRole: 'Unknown',
    action: 'brute_force_attempt',
    status: 'blocked',
    ipAddress: '198.51.100.15',
    userAgent: 'Python/3.9 aiohttp/3.8.1',
    location: 'Unknown',
    deviceType: 'unknown',
    timestamp: '2025-10-13T11:05:00Z',
    sessionId: null,
    details: {
      attempts: 15,
      blockedDuration: '24h',
      suspiciousActivity: true
    }
  },
  {
    id: 'LOG-007',
    userId: 'USR-006',
    userName: 'David Staff',
    userRole: 'Warehouse Staff',
    action: 'logout',
    status: 'success',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    location: 'Lusaka, Zambia',
    deviceType: 'desktop',
    timestamp: '2025-10-13T11:00:00Z',
    sessionId: 'SESS-JKL012',
    details: {
      sessionDuration: '2h 15m',
      logoutType: 'manual'
    }
  },
  {
    id: 'LOG-008',
    userId: 'USR-007',
    userName: 'Anna Supervisor',
    userRole: 'Supervisor',
    action: 'mfa_setup',
    status: 'success',
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
    location: 'Harare, Zimbabwe',
    deviceType: 'tablet',
    timestamp: '2025-10-13T10:55:00Z',
    sessionId: 'SESS-MNO345',
    details: {
      mfaMethod: 'authenticator_app',
      setupComplete: true
    }
  }
];

const AdminAccessLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');

  // Filter logs based on search and filters
  const filteredLogs = useMemo(() => {
    return mockAccessLogs.filter(log => {
      const matchesSearch = searchTerm === '' ||
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.includes(searchTerm) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
      const matchesAction = actionFilter === 'all' || log.action === actionFilter;
      const matchesUser = userFilter === 'all' || log.userRole === userFilter;

      return matchesSearch && matchesStatus && matchesAction && matchesUser;
    });
  }, [searchTerm, statusFilter, actionFilter, userFilter]);

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case 'success':
        return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' };
      case 'failed':
        return { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100' };
      case 'blocked':
        return { icon: AlertTriangle, color: 'text-orange-600', bgColor: 'bg-orange-100' };
      default:
        return { icon: Clock, color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  // Get device icon
  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case 'desktop':
        return Monitor;
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Monitor; // Using Monitor for tablet as well
      default:
        return Globe;
    }
  };

  // Get action display name
  const getActionDisplayName = (action) => {
    const actionMap = {
      'login': 'Login',
      'logout': 'Logout',
      'login_attempt': 'Login Attempt',
      'password_change': 'Password Change',
      'mfa_setup': 'MFA Setup',
      'brute_force_attempt': 'Brute Force Attempt'
    };
    return actionMap[action] || action.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
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
  const uniqueStatuses = [...new Set(mockAccessLogs.map(log => log.status))];
  const uniqueActions = [...new Set(mockAccessLogs.map(log => log.action))];
  const uniqueRoles = [...new Set(mockAccessLogs.map(log => log.userRole))];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Access Logs</h1>
            <p className="text-gray-600 mt-1">Monitor user authentication and access attempts</p>
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
                <p className="text-sm font-medium text-gray-600">Total Access Events</p>
                <p className="text-2xl font-bold text-gray-900">{mockAccessLogs.length}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful Logins</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockAccessLogs.filter(log => log.action === 'login' && log.status === 'success').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Attempts</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockAccessLogs.filter(log => log.status === 'failed' || log.status === 'blocked').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockAccessLogs.filter(log => log.sessionId && log.action !== 'logout').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
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
                  placeholder="Search logs..."
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
                {uniqueStatuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
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
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Access Logs Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => {
                  const StatusIcon = getStatusInfo(log.status).icon;
                  const DeviceIcon = getDeviceIcon(log.deviceType);
                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-500" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                            <div className="text-sm text-gray-500">{log.userRole}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {getActionDisplayName(log.action)}
                        </div>
                        <div className="text-xs text-gray-500">{log.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusInfo(log.status).bgColor} ${getStatusInfo(log.status).color}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <DeviceIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 capitalize">{log.deviceType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{log.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.ipAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTimestamp(log.timestamp)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No access logs found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAccessLogsPage;