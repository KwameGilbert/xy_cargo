import React from 'react';
import { Search, Filter, X, Calendar, Building, Truck, CheckCircle } from 'lucide-react';

const AdminIntakeLogsFilters = ({ filters, onFiltersChange, onClearFilters, totalLogs }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleMultiSelectChange = (key, value, checked) => {
    onFiltersChange(prev => {
      const currentValues = prev[key] || [];
      if (checked) {
        return {
          ...prev,
          [key]: [...currentValues, value]
        };
      } else {
        return {
          ...prev,
          [key]: currentValues.filter(v => v !== value)
        };
      }
    });
  };

  const warehouses = [
    { id: 'WH-001', name: 'Accra Main Warehouse' },
    { id: 'WH-002', name: 'Tema Port Facility' },
    { id: 'WH-003', name: 'Kumasi Distribution Center' },
    { id: 'WH-004', name: 'Takoradi Harbor Warehouse' },
    { id: 'WH-005', name: 'Cape Coast Transit Hub' },
    { id: 'WH-006', name: 'Tamale Regional Depot' }
  ];

  const statuses = ['Processed', 'Processing', 'Damaged'];
  const shipmentTypes = ['Sea Freight', 'Air Freight', 'Road Freight', 'Sea Express', 'Mixed Cargo'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
      <div className="flex flex-col space-y-4">
        {/* Search - Full width on mobile, flexible on desktop */}
        <div className="w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by parcel ID, tracking number, sender, recipient..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Date Range - Stack on mobile, inline on desktop */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={filters.dateFrom || ''}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            />
          </div>
          <div className="flex-1 relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={filters.dateTo || ''}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            />
          </div>
        </div>

        {/* Filter Dropdowns - Grid layout for better mobile experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* Warehouse Filter */}
          <div className="relative">
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  handleMultiSelectChange('warehouse', e.target.value, true);
                }
              }}
              className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            >
              <option value="">Warehouse</option>
              {warehouses.map(warehouse => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </select>
            <Building className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  handleMultiSelectChange('status', e.target.value, true);
                }
              }}
              className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            >
              <option value="">Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Shipment Type Filter */}
          <div className="relative sm:col-span-2 lg:col-span-1">
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  handleMultiSelectChange('shipmentType', e.target.value, true);
                }
              }}
              className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            >
              <option value="">Shipment Type</option>
              {shipmentTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <Truck className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Clear Filters - Full width button */}
        {(filters.search || filters.dateFrom || filters.dateTo || filters.warehouse?.length || filters.status?.length || filters.shipmentType?.length) && (
          <div className="flex justify-center sm:justify-start">
            <button
              onClick={onClearFilters}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4" />
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Active Filters Display - Better mobile layout */}
      <div className="flex flex-wrap gap-2 mt-4">
        {filters.warehouse?.map(warehouseId => {
          const warehouse = warehouses.find(w => w.id === warehouseId);
          return (
            <span key={warehouseId} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              <Building className="h-3 w-3" />
              <span className="hidden sm:inline">{warehouse?.name}</span>
              <span className="sm:hidden">{warehouse?.name.split(' ')[0]}</span>
              <button
                onClick={() => handleMultiSelectChange('warehouse', warehouseId, false)}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          );
        })}

        {filters.status?.map(status => (
          <span key={status} className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            <CheckCircle className="h-3 w-3" />
            {status}
            <button
              onClick={() => handleMultiSelectChange('status', status, false)}
              className="ml-1 hover:bg-green-200 rounded-full p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        {filters.shipmentType?.map(type => (
          <span key={type} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
            <Truck className="h-3 w-3" />
            {type}
            <button
              onClick={() => handleMultiSelectChange('shipmentType', type, false)}
              className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      {/* Results Count */}
      <div className="mt-4 text-sm text-gray-600 text-center sm:text-left">
        Showing {totalLogs} intake log{totalLogs !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default AdminIntakeLogsFilters;