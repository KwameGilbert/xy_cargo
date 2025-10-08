import React, { useState } from 'react';

const ParcelFiltersAdmin = ({ onFilterChange }) => {
  const [status, setStatus] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onFilterChange({ status: e.target.value, customerName, dateRange });
  };

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
    onFilterChange({ status, customerName: e.target.value, dateRange });
  };

  const handleDateRangeChange = (e) => {
    const value = e.target.value.split(',');
    setDateRange(value);
    onFilterChange({ status, customerName, dateRange: value });
  };

  const handleResetFilters = () => {
    setStatus('');
    setCustomerName('');
    setDateRange([null, null]);
    onFilterChange({ status: '', customerName: '', dateRange: [null, null] });
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900">Filter Parcels</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select value={status} onChange={handleStatusChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
          <option value="">All</option>
          <option value="Created">Created</option>
          <option value="Processing">Processing</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={handleCustomerNameChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date Range</label>
        <input
          type="text"
          placeholder="Start Date, End Date"
          value={dateRange.join(',')}
          onChange={handleDateRangeChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        onClick={handleResetFilters}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default ParcelFiltersAdmin;