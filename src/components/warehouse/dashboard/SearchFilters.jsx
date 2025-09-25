import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchFilters = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    showUnpaidOnly: false,
    showSpecialPackaging: false,
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (filterName) => {
    const newFilters = { ...filters, [filterName]: !filters[filterName] };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by waybill number, parcel code, or customer name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Toggles */}
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterChange('showUnpaidOnly')}
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
              filters.showUnpaidOnly
                ? 'bg-red-100 border-red-300 text-red-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            Unpaid Only
          </button>
          <button
            onClick={() => handleFilterChange('showSpecialPackaging')}
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
              filters.showSpecialPackaging
                ? 'bg-purple-100 border-purple-300 text-purple-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            Special Packaging
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;