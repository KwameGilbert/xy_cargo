import React from 'react';
import { Package, Plus, Download } from 'lucide-react';

const ParcelHeader = ({ 
  totalParcels, 
  inTransitCount, 
  unpaidCount, 
  deliveredCount,
  onNewParcel,
  onExport 
}) => {
  return (
    <div className="mb-6">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parcels</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your parcels in one place
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
          <button
            onClick={onNewParcel}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Parcel
          </button>
          
          <button
            onClick={onExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Parcels</p>
              <p className="text-xl font-semibold text-gray-900">{totalParcels}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">In Transit</p>
              <p className="text-xl font-semibold text-gray-900">{inTransitCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Unpaid</p>
              <p className="text-xl font-semibold text-gray-900">{unpaidCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Delivered</p>
              <p className="text-xl font-semibold text-gray-900">{deliveredCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelHeader;