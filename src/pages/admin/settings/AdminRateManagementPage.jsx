import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import RateModal from '../../../components/admin/rates/RateModal';
import DeleteRateModal from '../../../components/admin/rates/DeleteRateModal';
import {
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle,
  AlertTriangle,
  Calendar,
  MoreHorizontal,
  Plane,
  Ship,
  Truck,
  Package
} from 'lucide-react';
import ReportFilters from '../../../components/admin/reports/ReportFilters';
import DataExport from '../../../components/admin/reports/DataExport';

// Mock data for shipping rates
const mockRates = {
  overview: {
    totalRates: 45,
    activeRates: 42,
    pendingUpdates: 3,
    lastUpdated: '2025-10-12T10:30:00Z'
  },
  rates: [
    {
      id: 'RATE-001',
      name: 'Air Freight - Economy',
      type: 'air',
      category: 'economy',
      origin: 'Lusaka',
      destination: 'Johannesburg',
      ratePerKg: 15.50,
      minimumCharge: 150.00,
      currency: 'ZMW',
      effectiveFrom: '2025-10-01',
      effectiveTo: null,
      status: 'active',
      priority: 1,
      conditions: {
        minWeight: 0.5,
        maxWeight: 50
      },
      createdAt: '2025-09-15T08:00:00Z',
      updatedAt: '2025-10-01T00:00:00Z',
      createdBy: 'Admin Team'
    },
    {
      id: 'RATE-002',
      name: 'Air Freight - Express',
      type: 'air',
      category: 'express',
      origin: 'Lusaka',
      destination: 'Johannesburg',
      ratePerKg: 25.00,
      minimumCharge: 250.00,
      currency: 'ZMW',
      effectiveFrom: '2025-10-01',
      effectiveTo: null,
      status: 'active',
      priority: 2,
      conditions: {
        minWeight: 0.5,
        maxWeight: 100
      },
      createdAt: '2025-09-20T10:15:00Z',
      updatedAt: '2025-10-01T00:00:00Z',
      createdBy: 'Operations Manager'
    },
    {
      id: 'RATE-003',
      name: 'Sea Freight - LCL',
      type: 'sea',
      category: 'lcl',
      origin: 'Lusaka',
      destination: 'Durban',
      ratePerCbm: 850.00,
      minimumCharge: 1200.00,
      currency: 'ZMW',
      effectiveFrom: '2025-10-01',
      effectiveTo: null,
      status: 'active',
      priority: 1,
      conditions: {
        minVolume: 1,
        maxVolume: 15
      },
      createdAt: '2025-09-25T14:30:00Z',
      updatedAt: '2025-10-01T00:00:00Z',
      createdBy: 'Finance Team'
    },
    {
      id: 'RATE-004',
      name: 'Sea Freight - FCL 20ft',
      type: 'sea',
      category: 'fcl_20ft',
      origin: 'Lusaka',
      destination: 'Durban',
      flatRate: 4500.00,
      currency: 'ZMW',
      effectiveFrom: '2025-10-01',
      effectiveTo: null,
      status: 'active',
      priority: 2,
      conditions: {
        containerSize: '20ft'
      },
      createdAt: '2025-09-28T09:45:00Z',
      updatedAt: '2025-10-01T00:00:00Z',
      createdBy: 'International Ops'
    },
    {
      id: 'RATE-005',
      name: 'Road Freight - Local',
      type: 'road',
      category: 'local',
      origin: 'Lusaka',
      destination: 'Kitwe',
      ratePerKg: 8.50,
      minimumCharge: 75.00,
      currency: 'ZMW',
      effectiveFrom: '2025-10-01',
      effectiveTo: null,
      status: 'active',
      priority: 1,
      conditions: {
        minWeight: 1,
        maxWeight: 1000
      },
      createdAt: '2025-09-30T11:20:00Z',
      updatedAt: '2025-10-01T00:00:00Z',
      createdBy: 'Local Ops'
    },
    {
      id: 'RATE-006',
      name: 'Air Freight - Heavy Cargo',
      type: 'air',
      category: 'heavy_cargo',
      origin: 'Lusaka',
      destination: 'Johannesburg',
      ratePerKg: 12.00,
      minimumCharge: 500.00,
      currency: 'ZMW',
      effectiveFrom: '2025-10-01',
      effectiveTo: null,
      status: 'active',
      priority: 3,
      conditions: {
        minWeight: 50,
        maxWeight: 500
      },
      createdAt: '2025-10-01T12:00:00Z',
      updatedAt: '2025-10-01T12:00:00Z',
      createdBy: 'Admin Team'
    },
    {
      id: 'RATE-007',
      name: 'Sea Freight - LCL Express',
      type: 'sea',
      category: 'lcl_express',
      origin: 'Lusaka',
      destination: 'Durban',
      ratePerCbm: 1200.00,
      minimumCharge: 1800.00,
      currency: 'ZMW',
      effectiveFrom: '2025-10-01',
      effectiveTo: null,
      status: 'active',
      priority: 2,
      conditions: {
        minVolume: 1,
        maxVolume: 10
      },
      createdAt: '2025-10-02T09:15:00Z',
      updatedAt: '2025-10-02T09:15:00Z',
      createdBy: 'Sea Freight Manager'
    },
    {
      id: 'RATE-008',
      name: 'Road Freight - Express',
      type: 'road',
      category: 'express',
      origin: 'Lusaka',
      destination: 'Livingstone',
      ratePerKg: 12.00,
      minimumCharge: 120.00,
      currency: 'ZMW',
      effectiveFrom: '2025-10-01',
      effectiveTo: null,
      status: 'pending',
      priority: 2,
      conditions: {
        minWeight: 1,
        maxWeight: 200
      },
      createdAt: '2025-10-10T15:30:00Z',
      updatedAt: '2025-10-10T15:30:00Z',
      createdBy: 'Road Transport Team'
    }
  ],
  categories: {
    air: { count: 12, percentage: 27 },
    sea: { count: 15, percentage: 33 },
    road: { count: 18, percentage: 40 }
  },
  status: {
    active: { count: 42, percentage: 93 },
    pending: { count: 3, percentage: 7 }
  }
};

// Delete confirmation modal component
const AdminRateManagementPage = () => {
  const [rates, setRates] = useState(mockRates.rates);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRate, setEditingRate] = useState(null);
  const [deletingRate, setDeletingRate] = useState(null);

  // Filter rates based on search and filters
  const filteredRates = useMemo(() => {
    return rates.filter(rate => {
      const matchesSearch = searchTerm === '' ||
        rate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === 'all' || rate.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || rate.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || rate.status === statusFilter;

      return matchesSearch && matchesType && matchesCategory && matchesStatus;
    });
  }, [rates, searchTerm, typeFilter, categoryFilter, statusFilter]);

  // Handle rate creation
  const handleCreateRate = (rateData) => {
    const newRate = {
      ...rateData,
      id: `RATE-${String(rates.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Current Admin'
    };
    setRates(prev => [...prev, newRate]);
  };

  // Handle rate update
  const handleUpdateRate = (rateData) => {
    setRates(prev => prev.map(rate =>
      rate.id === rateData.id
        ? {
            ...rateData,
            updatedAt: new Date().toISOString()
          }
        : rate
    ));
    setEditingRate(null);
  };

  // Handle rate deletion
  const handleDeleteRate = (rateId) => {
    setRates(prev => prev.filter(rate => rate.id !== rateId));
  };

  // Format currency
  const formatCurrency = (amount, currency = 'ZMW') => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Ongoing';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case 'air':
        return Plane;
      case 'sea':
        return Ship;
      case 'road':
        return Truck;
      default:
        return Package;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rate Management</h1>
            <p className="text-gray-600 mt-1">Manage shipping rates, service charges, and pricing rules</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Rate
            </button>
            <DataExport
              onExportCSV={() => console.log('Export CSV')}
              onExportExcel={() => console.log('Export Excel')}
              onExportPDF={() => console.log('Export PDF')}
              isExporting={false}
            />
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rates</p>
                <p className="text-2xl font-bold text-gray-900">{mockRates.overview.totalRates}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Rates</p>
                <p className="text-2xl font-bold text-green-600">{mockRates.overview.activeRates}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Updates</p>
                <p className="text-2xl font-bold text-yellow-600">{mockRates.overview.pendingUpdates}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="text-sm font-bold text-gray-900">{formatDate(mockRates.overview.lastUpdated)}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
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
                  placeholder="Search rates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Types</option>
                <option value="air">Air Freight</option>
                <option value="sea">Sea Freight</option>
                <option value="road">Road Freight</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Categories</option>
                <option value="economy">Economy</option>
                <option value="express">Express</option>
                <option value="heavy_cargo">Heavy Cargo</option>
                <option value="local">Local Delivery</option>
                <option value="lcl">LCL (Less than Container)</option>
                <option value="fcl_20ft">FCL 20ft Container</option>
                <option value="fcl_40ft">FCL 40ft Container</option>
                <option value="lcl_express">LCL Express</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rates Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type/Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Charge</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRates.map((rate) => {
                  const TypeIcon = getTypeIcon(rate.type);
                  return (
                    <tr key={rate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{rate.name}</div>
                          <div className="text-sm text-gray-500">{rate.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <TypeIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 capitalize">{rate.type}</div>
                            <div className="text-sm text-gray-500 capitalize">{rate.category.replace('_', ' ')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {rate.origin} → {rate.destination}
                        </div>
                        <div className="text-xs text-gray-500">
                          Priority: {rate.priority}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {rate.type === 'air' || rate.type === 'road' ? (
                            <span>{formatCurrency(rate.ratePerKg)}/kg</span>
                          ) : rate.category.startsWith('fcl') ? (
                            <span>{formatCurrency(rate.flatRate)}</span>
                          ) : (
                            <span>{formatCurrency(rate.ratePerCbm)}/CBM</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {rate.minimumCharge ? formatCurrency(rate.minimumCharge) : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(rate.status)}`}>
                          {rate.status.charAt(0).toUpperCase() + rate.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingRate(rate)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Rate"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeletingRate(rate)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Rate"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900" title="More Options">
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

          {filteredRates.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No rates found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Modals */}
        <RateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreateRate}
          mode="create"
        />

        <RateModal
          isOpen={!!editingRate}
          onClose={() => setEditingRate(null)}
          rate={editingRate}
          onSave={handleUpdateRate}
          mode="edit"
        />

        <DeleteRateModal
          isOpen={!!deletingRate}
          onClose={() => setDeletingRate(null)}
          rate={deletingRate}
          onConfirm={handleDeleteRate}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminRateManagementPage;