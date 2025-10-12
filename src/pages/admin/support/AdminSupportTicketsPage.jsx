import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Users,
  Package,
  DollarSign,
  Settings,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Reply,
  Star,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  FileText,
  MoreHorizontal,
  Plus,
  X
} from 'lucide-react';
import ReportFilters from '../../../components/admin/reports/ReportFilters';
import DataExport from '../../../components/admin/reports/DataExport';

// Mock data for support tickets
const mockSupportTickets = {
  overview: {
    totalTickets: 1247,
    openTickets: 89,
    resolvedToday: 23,
    avgResponseTime: '2.4 hours',
    satisfactionRate: 94.2
  },
  tickets: [
    {
      id: 'TKT-001',
      title: 'Unable to track parcel #PKG-2025-001',
      description: 'Customer reports they cannot find their parcel in the tracking system. Parcel was shipped 3 days ago.',
      status: 'open',
      priority: 'high',
      category: 'tracking',
      requester: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+260 97 123 4567',
        type: 'customer'
      },
      assignedTo: 'Sarah Johnson',
      createdAt: '2025-10-12T09:30:00Z',
      updatedAt: '2025-10-12T11:45:00Z',
      responses: 3,
      tags: ['tracking', 'urgent'],
      attachments: 1
    },
    {
      id: 'TKT-002',
      title: 'Payment not reflecting in account',
      description: 'I made a payment of ZMW 2,500 for parcel delivery but it\'s not showing in my account balance.',
      status: 'in_progress',
      priority: 'medium',
      category: 'payments',
      requester: {
        name: 'Mary Davis',
        email: 'mary.davis@email.com',
        phone: '+260 96 987 6543',
        type: 'customer'
      },
      assignedTo: 'Michael Chen',
      createdAt: '2025-10-12T08:15:00Z',
      updatedAt: '2025-10-12T10:20:00Z',
      responses: 2,
      tags: ['payment', 'account'],
      attachments: 0
    },
    {
      id: 'TKT-003',
      title: 'Warehouse login issues',
      description: 'Unable to access warehouse management system. Getting "Invalid credentials" error.',
      status: 'resolved',
      priority: 'high',
      category: 'technical',
      requester: {
        name: 'David Wilson',
        email: 'd.wilson@warehouse.com',
        phone: '+260 95 555 1234',
        type: 'warehouse_staff'
      },
      assignedTo: 'Admin Team',
      createdAt: '2025-10-11T14:20:00Z',
      updatedAt: '2025-10-11T16:30:00Z',
      responses: 4,
      tags: ['login', 'technical', 'warehouse'],
      attachments: 2
    },
    {
      id: 'TKT-004',
      title: 'Request for bulk shipping quote',
      description: 'Need pricing for shipping 50 parcels to Lusaka. All parcels are under 5kg each.',
      status: 'open',
      priority: 'low',
      category: 'pricing',
      requester: {
        name: 'Robert Brown',
        email: 'r.brown@company.com',
        phone: '+260 77 456 7890',
        type: 'business'
      },
      assignedTo: null,
      createdAt: '2025-10-12T07:45:00Z',
      updatedAt: '2025-10-12T07:45:00Z',
      responses: 0,
      tags: ['bulk', 'pricing', 'quote'],
      attachments: 1
    },
    {
      id: 'TKT-005',
      title: 'Parcel damaged during delivery',
      description: 'Received parcel with broken items. Package shows signs of rough handling.',
      status: 'open',
      priority: 'high',
      category: 'damage',
      requester: {
        name: 'Grace Lee',
        email: 'grace.lee@email.com',
        phone: '+260 96 321 9876',
        type: 'customer'
      },
      assignedTo: 'Claims Team',
      createdAt: '2025-10-12T06:30:00Z',
      updatedAt: '2025-10-12T09:15:00Z',
      responses: 1,
      tags: ['damage', 'complaint', 'urgent'],
      attachments: 3
    },
    {
      id: 'TKT-006',
      title: 'Agent commission payment delay',
      description: 'Monthly commission payment for September not received yet. Usually paid by the 5th.',
      status: 'in_progress',
      priority: 'medium',
      category: 'payments',
      requester: {
        name: 'Peter Mwanza',
        email: 'p.mwanza@agent.com',
        phone: '+260 97 654 3210',
        type: 'agent'
      },
      assignedTo: 'Finance Team',
      createdAt: '2025-10-10T13:10:00Z',
      updatedAt: '2025-10-12T08:45:00Z',
      responses: 3,
      tags: ['commission', 'payment', 'agent'],
      attachments: 0
    },
    {
      id: 'TKT-007',
      title: 'New warehouse registration',
      description: 'Requesting approval to register a new warehouse location in Kitwe.',
      status: 'pending',
      priority: 'medium',
      category: 'registration',
      requester: {
        name: 'Susan Banda',
        email: 's.banda@warehouse.com',
        phone: '+260 95 789 0123',
        type: 'warehouse_staff'
      },
      assignedTo: 'Operations Team',
      createdAt: '2025-10-09T11:20:00Z',
      updatedAt: '2025-10-12T10:30:00Z',
      responses: 2,
      tags: ['registration', 'warehouse', 'new'],
      attachments: 4
    },
    {
      id: 'TKT-008',
      title: 'API integration issues',
      description: 'Third-party integration failing with authentication errors. Need urgent assistance.',
      status: 'open',
      priority: 'high',
      category: 'technical',
      requester: {
        name: 'Tech Solutions Ltd',
        email: 'support@techsolutions.com',
        phone: '+260 21 123 4567',
        type: 'business'
      },
      assignedTo: 'Dev Team',
      createdAt: '2025-10-12T05:15:00Z',
      updatedAt: '2025-10-12T07:30:00Z',
      responses: 1,
      tags: ['api', 'integration', 'technical'],
      attachments: 2
    }
  ],
  categories: {
    tracking: { count: 245, percentage: 19.6 },
    payments: { count: 198, percentage: 15.9 },
    technical: { count: 167, percentage: 13.4 },
    damage: { count: 134, percentage: 10.7 },
    pricing: { count: 123, percentage: 9.9 },
    registration: { count: 89, percentage: 7.1 },
    other: { count: 291, percentage: 23.4 }
  },
  priorities: {
    high: { count: 156, percentage: 12.5 },
    medium: { count: 623, percentage: 50.0 },
    low: { count: 468, percentage: 37.5 }
  },
  status: {
    open: { count: 89, percentage: 7.1 },
    in_progress: { count: 234, percentage: 18.8 },
    resolved: { count: 856, percentage: 68.6 },
    pending: { count: 68, percentage: 5.5 }
  }
};

const AdminSupportTicketsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '2025-10-01', end: '2025-10-12' });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Handle export functionality
  const handleExportReport = async (type) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Exporting ${type} report...`);
    }, 2000);
  };

  // Filter tickets based on search and filters
  const filteredTickets = useMemo(() => {
    let filtered = mockSupportTickets.tickets;

    // Tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === activeTab);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.requester.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.category === categoryFilter);
    }

    return filtered;
  }, [activeTab, searchTerm, statusFilter, priorityFilter, categoryFilter]);

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status info
  const getStatusInfo = (status) => {
    switch (status) {
      case 'open':
        return { color: 'bg-red-100 text-red-800', label: 'Open' };
      case 'in_progress':
        return { color: 'bg-yellow-100 text-yellow-800', label: 'In Progress' };
      case 'resolved':
        return { color: 'bg-green-100 text-green-800', label: 'Resolved' };
      case 'pending':
        return { color: 'bg-blue-100 text-blue-800', label: 'Pending' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: 'Unknown' };
    }
  };

  // Get priority info
  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'high':
        return { color: 'text-red-600', icon: AlertCircle, label: 'High' };
      case 'medium':
        return { color: 'text-yellow-600', icon: Clock, label: 'Medium' };
      case 'low':
        return { color: 'text-green-600', icon: CheckCircle, label: 'Low' };
      default:
        return { color: 'text-gray-600', icon: MessageSquare, label: 'Normal' };
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'tracking':
        return Package;
      case 'payments':
        return DollarSign;
      case 'technical':
        return Settings;
      case 'damage':
        return AlertCircle;
      case 'pricing':
        return DollarSign;
      case 'registration':
        return User;
      default:
        return MessageSquare;
    }
  };

  // Get requester type icon
  const getRequesterTypeIcon = (type) => {
    switch (type) {
      case 'customer':
        return User;
      case 'warehouse_staff':
        return Package;
      case 'agent':
        return Users;
      case 'business':
        return Settings;
      default:
        return User;
    }
  };

  // Tabs configuration
  const tabs = [
    { id: 'all', name: 'All Tickets', count: mockSupportTickets.tickets.length },
    { id: 'open', name: 'Open', count: mockSupportTickets.status.open.count },
    { id: 'in_progress', name: 'In Progress', count: mockSupportTickets.status.in_progress.count },
    { id: 'resolved', name: 'Resolved', count: mockSupportTickets.status.resolved.count }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{mockSupportTickets.overview.totalTickets}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-red-600">{mockSupportTickets.overview.openTickets}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved Today</p>
              <p className="text-2xl font-bold text-green-600">{mockSupportTickets.overview.resolvedToday}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-blue-600">{mockSupportTickets.overview.avgResponseTime}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-purple-600">{mockSupportTickets.overview.satisfactionRate}%</p>
            </div>
            <Star className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Categories */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Ticket Categories</h4>
          <div className="space-y-4">
            {Object.entries(mockSupportTickets.categories).map(([category, data]) => {
              const Icon = getCategoryIcon(category);
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 capitalize">{category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{data.count}</span>
                    <span className="text-sm font-medium text-gray-900">{data.percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Priority Distribution</h4>
          <div className="space-y-4">
            {Object.entries(mockSupportTickets.priorities).map(([priority, data]) => {
              const priorityInfo = getPriorityInfo(priority);
              const Icon = priorityInfo.icon;
              return (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${priorityInfo.color}`} />
                    <span className="text-sm font-medium text-gray-900">{priorityInfo.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{data.count}</span>
                    <span className="text-sm font-medium text-gray-900">{data.percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Recent Tickets</h4>
        <div className="space-y-3">
          {mockSupportTickets.tickets.slice(0, 5).map((ticket) => {
            const statusInfo = getStatusInfo(ticket.status);
            const priorityInfo = getPriorityInfo(ticket.priority);
            const PriorityIcon = priorityInfo.icon;
            const RequesterIcon = getRequesterTypeIcon(ticket.requester.type);

            return (
              <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <RequesterIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                    <div className="text-xs text-gray-500">
                      {ticket.requester.name} • {formatTimestamp(ticket.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PriorityIcon className={`h-4 w-4 ${priorityInfo.color}`} />
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderTicketsTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('tickets')}
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
                placeholder="Search tickets..."
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
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Categories</option>
              <option value="tracking">Tracking</option>
              <option value="payments">Payments</option>
              <option value="technical">Technical</option>
              <option value="damage">Damage</option>
              <option value="pricing">Pricing</option>
              <option value="registration">Registration</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => {
                const statusInfo = getStatusInfo(ticket.status);
                const priorityInfo = getPriorityInfo(ticket.priority);
                const PriorityIcon = priorityInfo.icon;
                const CategoryIcon = getCategoryIcon(ticket.category);
                const RequesterIcon = getRequesterTypeIcon(ticket.requester.type);

                return (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{ticket.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <RequesterIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{ticket.requester.name}</div>
                          <div className="text-sm text-gray-500 capitalize">{ticket.requester.type.replace('_', ' ')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CategoryIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900 capitalize">{ticket.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <PriorityIcon className={`h-4 w-4 mr-2 ${priorityInfo.color}`} />
                        <span className="text-sm text-gray-900">{priorityInfo.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.assignedTo || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTimestamp(ticket.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Reply className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-gray-600 mt-1">Manage and respond to customer support requests</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Plus className="h-4 w-4" />
              New Ticket
            </button>
            <DataExport
              onExportCSV={() => handleExportReport('tickets-csv')}
              onExportExcel={() => handleExportReport('tickets-excel')}
              onExportPDF={() => handleExportReport('tickets-pdf')}
              isExporting={isLoading}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'all' && renderTicketsTab()}
            {activeTab === 'open' && renderTicketsTab()}
            {activeTab === 'in_progress' && renderTicketsTab()}
            {activeTab === 'resolved' && renderTicketsTab()}
          </div>
        </div>

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 backdrop-blur-xs bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedTicket.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">Ticket {selectedTicket.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Ticket Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-700">{selectedTicket.description}</p>
                    </div>

                    {/* Responses/Comments would go here */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Responses ({selectedTicket.responses})</h3>
                      <div className="space-y-4">
                        {/* Mock responses */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900">Sarah Johnson</span>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                          </div>
                          <p className="text-gray-700">I've investigated the tracking issue and found that the parcel is currently in transit. The tracking system should update within the next hour.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Status & Priority */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Ticket Info</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Status:</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusInfo(selectedTicket.status).color}`}>
                            {getStatusInfo(selectedTicket.status).label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Priority:</span>
                          <span className={`text-sm font-medium ${getPriorityInfo(selectedTicket.priority).color}`}>
                            {getPriorityInfo(selectedTicket.priority).label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Category:</span>
                          <span className="text-sm text-gray-900 capitalize">{selectedTicket.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Requester Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Requester</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{selectedTicket.requester.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{selectedTicket.requester.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{selectedTicket.requester.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Reply className="h-4 w-4" />
                        Reply
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                        <Edit className="h-4 w-4" />
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSupportTicketsPage;