import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Calendar, MapPin, Truck, AlertTriangle, Building, User } from 'lucide-react';

const AdminShipmentFilters = ({ onFiltersChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    originCountry: '',
    destinationCountry: '',
    carrier: '',
    assignedWarehouse: '',
    assignedAgent: '',
    dateFrom: '',
    dateTo: '',
    ...initialFilters
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Filter options
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
    { value: 'In Transit', label: 'In Transit' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Delayed', label: 'Delayed' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'Low', label: 'Low' },
    { value: 'Normal', label: 'Normal' },
    { value: 'High', label: 'High' },
    { value: 'Urgent', label: 'Urgent' }
  ];

  const carrierOptions = [
    { value: '', label: 'All Carriers' },
    { value: 'DHL Express', label: 'DHL Express' },
    { value: 'FedEx', label: 'FedEx' },
    { value: 'UPS', label: 'UPS' },
    { value: 'TNT', label: 'TNT' },
    { value: 'EMS', label: 'EMS' }
  ];

  const warehouseOptions = [
    { value: '', label: 'All Warehouses' },
    { value: 'Warehouse A', label: 'Warehouse A' },
    { value: 'Warehouse B', label: 'Warehouse B' },
    { value: 'Warehouse C', label: 'Warehouse C' }
  ];

  const agentOptions = [
    { value: '', label: 'All Agents' },
    { value: 'Agent Sarah Johnson', label: 'Sarah Johnson' },
    { value: 'Agent Michael Chen', label: 'Michael Chen' },
    { value: 'Agent David Wilson', label: 'David Wilson' }
  ];

  const countryOptions = [
    { value: '', label: 'All Countries' },
    { value: 'China', label: 'China' },
    { value: 'USA', label: 'USA' },
    { value: 'UK', label: 'UK' },
    { value: 'Germany', label: 'Germany' },
    { value: 'Ghana', label: 'Ghana' },
    { value: 'Nigeria', label: 'Nigeria' },
    { value: 'South Africa', label: 'South Africa' }
  ];

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      priority: '',
      originCountry: '',
      destinationCountry: '',
      carrier: '',
      assignedWarehouse: '',
      assignedAgent: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value =>
    value !== '' && value !== null && value !== undefined
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search shipments by ID, tracking number, or customer..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            isExpanded
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {Object.values(filters).filter(v => v !== '').length}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg border border-gray-300"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Origin Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="h-4 w-4 inline mr-1" />
              Origin
            </label>
            <select
              value={filters.originCountry}
              onChange={(e) => handleFilterChange('originCountry', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {countryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Destination Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="h-4 w-4 inline mr-1" />
              Destination
            </label>
            <select
              value={filters.destinationCountry}
              onChange={(e) => handleFilterChange('destinationCountry', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {countryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Carrier Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Truck className="h-4 w-4 inline mr-1" />
              Carrier
            </label>
            <select
              value={filters.carrier}
              onChange={(e) => handleFilterChange('carrier', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {carrierOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Warehouse Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Building className="h-4 w-4 inline mr-1" />
              Warehouse
            </label>
            <select
              value={filters.assignedWarehouse}
              onChange={(e) => handleFilterChange('assignedWarehouse', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {warehouseOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Agent Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <User className="h-4 w-4 inline mr-1" />
              Agent
            </label>
            <select
              value={filters.assignedAgent}
              onChange={(e) => handleFilterChange('assignedAgent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {agentOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="h-4 w-4 inline mr-1" />
              From Date
            </label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="h-4 w-4 inline mr-1" />
              To Date
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;

              let label = '';
              let icon = null;

              switch (key) {
                case 'search':
                  label = `Search: "${value}"`;
                  icon = <Search className="h-3 w-3" />;
                  break;
                case 'status':
                  label = `Status: ${value}`;
                  icon = <AlertTriangle className="h-3 w-3" />;
                  break;
                case 'priority':
                  label = `Priority: ${value}`;
                  break;
                case 'originCountry':
                  label = `From: ${value}`;
                  icon = <MapPin className="h-3 w-3" />;
                  break;
                case 'destinationCountry':
                  label = `To: ${value}`;
                  icon = <MapPin className="h-3 w-3" />;
                  break;
                case 'carrier':
                  label = `Carrier: ${value}`;
                  icon = <Truck className="h-3 w-3" />;
                  break;
                case 'assignedWarehouse':
                  label = `Warehouse: ${value}`;
                  icon = <Building className="h-3 w-3" />;
                  break;
                case 'assignedAgent':
                  label = `Agent: ${value}`;
                  icon = <User className="h-3 w-3" />;
                  break;
                case 'dateFrom':
                  label = `From: ${new Date(value).toLocaleDateString()}`;
                  icon = <Calendar className="h-3 w-3" />;
                  break;
                case 'dateTo':
                  label = `To: ${new Date(value).toLocaleDateString()}`;
                  icon = <Calendar className="h-3 w-3" />;
                  break;
                default:
                  return null;
              }

              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {icon}
                  {label}
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminShipmentFilters;