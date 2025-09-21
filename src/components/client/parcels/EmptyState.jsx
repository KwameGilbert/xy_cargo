import React from 'react';
import { Package } from 'lucide-react';

const EmptyState = ({ searchQuery, filters, setSearchQuery, setFilters }) => (
  <div className="bg-white rounded-lg shadow-sm border p-8">
    <div className="text-center">
      <Package className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No parcels found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {searchQuery || filters.status !== 'all' || filters.payment !== 'all'
          ? 'Try adjusting your search or filters.'
          : 'No parcels yet. Start shipping with us!'}
      </p>
      {(searchQuery || filters.status !== 'all' || filters.payment !== 'all') && (
        <div className="mt-6">
          <button
            onClick={() => {
              setSearchQuery('');
              setFilters({ status: 'all', payment: 'all', dateRange: 'all' });
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  </div>
);

export default EmptyState;
