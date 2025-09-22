import React from 'react';
import { Search, X, Filter, ChevronDown, ChevronRight } from 'lucide-react';

const ParcelSearchAndFilters = ({ 
  searchQuery, 
  onSearchChange, 
  onClearSearch,
  filters, 
  onFilterChange, 
  showFilters, 
  onToggleFilters,
  onClearFilters,
  placeholder = "Search by waybill, recipient, or status..."
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                onClick={onClearSearch}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col gap-4">
        {/* Filter Toggle Button */}
        <button
          onClick={onToggleFilters}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors w-fit"
        >
          <Filter className="h-4 w-4 mr-1.5" />
          Filters
          {showFilters ? <ChevronDown className="h-4 w-4 ml-1.5" /> : <ChevronRight className="h-4 w-4 ml-1.5" />}
        </button>

        {/* Active Filters Display */}
        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {filters.status !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Status: {filters.status.replace('_', ' ')}
                <button
                  onClick={() => onFilterChange({ ...filters, status: 'all' })}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.payment !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Payment: {filters.payment}
                <button
                  onClick={() => onFilterChange({ ...filters, payment: 'all' })}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.warehouse !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Warehouse: {filters.warehouse}
                <button
                  onClick={() => onFilterChange({ ...filters, warehouse: 'all' })}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.dateRange !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Date: {filters.dateRange}
                <button
                  onClick={() => onFilterChange({ ...filters, dateRange: 'all' })}
                  className="ml-1 text-yellow-600 hover:text-yellow-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Status</label>
              <select
                value={filters.status}
                onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                className="block w-full border border-gray-300 rounded-md px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Status</option>
                <option value="AT_WAREHOUSE">At Warehouse</option>
                <option value="PROCESSING">Processing</option>
                <option value="IN_TRANSIT">In Transit</option>
                <option value="DELIVERED">Delivered</option>
                <option value="DELAYED">Delayed</option>
              </select>
            </div>

            {/* Payment Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Payment</label>
              <select
                value={filters.payment}
                onChange={(e) => onFilterChange({ ...filters, payment: e.target.value })}
                className="block w-full border border-gray-300 rounded-md px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Payment</option>
                <option value="PAID">Paid</option>
                <option value="UNPAID">Unpaid</option>
              </select>
            </div>

            {/* Warehouse Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Warehouse</label>
              <select
                value={filters.warehouse}
                onChange={(e) => onFilterChange({ ...filters, warehouse: e.target.value })}
                className="block w-full border border-gray-300 rounded-md px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Warehouses</option>
                <option value="Shenzhen">Shenzhen Warehouse</option>
                <option value="Guangzhou">Guangzhou Warehouse</option>
                <option value="Shanghai">Shanghai Warehouse</option>
                <option value="Yiwu">Yiwu Warehouse</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value })}
                className="block w-full border border-gray-300 rounded-md px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClearFilters}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParcelSearchAndFilters;