import React from 'react';
import { Filter } from 'react-feather';

const ParcelFilters = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <Filter size={20} className="text-gray-400" />
        <span className="text-sm text-gray-600">Filters:</span>
      </div>

      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => handleFilterChange('status', e.target.value)}
        className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Status</option>
        <option value="at_warehouse">At Warehouse</option>
        <option value="in_transit">In Transit</option>
        <option value="delivered">Delivered</option>
        <option value="delayed">Delayed</option>
        <option value="processing">Processing</option>
      </select>

      {/* Date Range Filter */}
      <select
        value={filters.dateRange}
        onChange={(e) => handleFilterChange('dateRange', e.target.value)}
        className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>

      {/* Warehouse Filter */}
      <select
        value={filters.warehouse}
        onChange={(e) => handleFilterChange('warehouse', e.target.value)}
        className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Warehouses</option>
        <option value="china">China</option>
        <option value="usa">USA</option>
        <option value="europe">Europe</option>
      </select>

      {/* Payment Status Filter */}
      <select
        value={filters.paymentStatus}
        onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
        className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Payments</option>
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
      </select>

      {/* Clear Filters Button */}
      <button
        onClick={() => onFilterChange({
          status: 'all',
          dateRange: 'all',
          warehouse: 'all',
          paymentStatus: 'all'
        })}
        className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ParcelFilters;