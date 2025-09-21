import React from 'react';
import { Package, Plus, Search } from 'lucide-react';

const ParcelEmptyState = ({ 
  hasFilters = false, 
  onClearFilters, 
  onNewParcel 
}) => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-24 w-24 text-gray-400">
        <Package className="h-full w-full" />
      </div>
      
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {hasFilters ? 'No parcels match your filters' : 'No parcels yet'}
      </h3>
      
      <p className="mt-2 text-sm text-gray-500">
        {hasFilters 
          ? 'Try adjusting your search criteria or clear the filters to see all parcels.'
          : 'Get started by creating your first parcel or importing existing data.'
        }
      </p>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            <Search className="h-4 w-4 mr-2" />
            Clear Filters
          </button>
        )}
        
        <button
          onClick={onNewParcel}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Parcel
        </button>
      </div>
    </div>
  );
};

export default ParcelEmptyState;