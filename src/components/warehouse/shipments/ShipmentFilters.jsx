import React, { useState } from 'react';
import { Search, Filter, Calendar, SortDesc, Globe } from 'lucide-react';

const ShipmentFilters = ({ onSearch, onFilter, onDateRangeChange, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    international: false,
    originCountry: 'all',
    destinationCountry: 'all'
  });
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [sortBy, setSortBy] = useState('newest');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    const newDateRange = { ...dateRange, [name]: value };
    setDateRange(newDateRange);
    onDateRangeChange(newDateRange);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSort(value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by shipment ID, tracking number, origin, destination..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-3">
          {/* Status Filter */}
          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          {/* Origin Country Filter */}
          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <select
              value={filters.originCountry}
              onChange={(e) => handleFilterChange('originCountry', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Origins</option>
              <option value="China">China</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="Japan">Japan</option>
            </select>
          </div>

          {/* Destination Country Filter */}
          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <select
              value={filters.destinationCountry}
              onChange={(e) => handleFilterChange('destinationCountry', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Destinations</option>
              <option value="Ghana">Ghana</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Kenya">Kenya</option>
              <option value="South Africa">South Africa</option>
            </select>
          </div>

          {/* International Toggle */}
          <button
            onClick={() => handleFilterChange('international', !filters.international)}
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
              filters.international
                ? 'bg-blue-100 border-blue-300 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Globe className="w-4 h-4" />
            International Only
          </button>

          {/* Date Range Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateRangeChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <span>to</span>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateRangeChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center ml-auto">
            <SortDesc className="w-4 h-4 mr-2 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="parcels">Parcel Count (High to Low)</option>
              <option value="weight">Total Weight (High to Low)</option>
              <option value="cost">Shipping Cost (High to Low)</option>
              <option value="eta">Estimated Arrival (Soonest)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentFilters;