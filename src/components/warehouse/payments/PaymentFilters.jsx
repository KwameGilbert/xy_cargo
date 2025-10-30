import React, { useState } from 'react';

const PaymentFilters = ({ onFilterChange }) => {
  const [period, setPeriod] = useState('monthly');
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handlePeriodChange = (value) => {
    setPeriod(value);
    setShowCustomRange(value === 'custom');
    if (value !== 'custom') {
      onFilterChange({ period: value });
    }
  };

  const handleCustomDateSubmit = () => {
    if (startDate && endDate) {
      onFilterChange({ startDate, endDate });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={period}
          onChange={(e) => handlePeriodChange(e.target.value)}
          className="px-4 py-2 border rounded-md text-sm min-w-[150px]"
        >
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last Year</option>
          <option value="custom">Custom Range</option>
        </select>

        {showCustomRange && (
          <div className="flex gap-4 items-center">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 text-sm border rounded-md"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 text-sm border rounded-md"
            />
            <button
              onClick={handleCustomDateSubmit}
              disabled={!startDate || !endDate}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm disabled:opacity-50 hover:bg-red-700 transition-colors"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentFilters;