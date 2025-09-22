import { Package, Download } from 'lucide-react';

const ParcelHeaderWithStats = ({ 
  totalParcels, 
  inTransitCount, 
  unpaidCount, 
  deliveredCount,
  onExport 
}) => {
  return (
    <div className="mb-6">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-900">Parcels</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Manage and track all your parcels in one place
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center">
          <button
            onClick={onExport}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium text-sm"
          >
            <Download className="h-4 w-4 mr-1.5" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-500">Total Parcels</p>
              <p className="text-xl font-bold text-gray-900">{totalParcels}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-500">In Transit</p>
              <p className="text-xl font-bold text-gray-900">{inTransitCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-500">Unpaid</p>
              <p className="text-xl font-bold text-gray-900">{unpaidCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-500">Delivered</p>
              <p className="text-xl font-bold text-gray-900">{deliveredCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelHeaderWithStats;