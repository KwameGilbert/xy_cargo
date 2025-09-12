import React, { useState, useEffect } from 'react';
import ShipmentCard from './ShipmentCard';
import TrackingDetails from './TrackingDetails';
import { Package, Filter, SortDesc, Search } from 'lucide-react';

const RecentShipments = ({ shipments }) => {
  const [expanded, setExpanded] = useState(null);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date-desc');

  // Apply filtering, searching and sorting whenever dependencies change
  useEffect(() => {
    if (!shipments) return;
    
    let result = [...shipments];
    
    // Apply status filter
    if (filterStatus !== 'ALL') {
      result = result.filter(shipment => shipment.status === filterStatus);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(shipment => 
        shipment.trackingNumber.toLowerCase().includes(query) ||
        shipment.currentLocation.toLowerCase().includes(query) ||
        shipment.route.origin.toLowerCase().includes(query) ||
        shipment.route.destination.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'date-asc':
          return new Date(a.estimatedDelivery) - new Date(b.estimatedDelivery);
        case 'date-desc':
          return new Date(b.estimatedDelivery) - new Date(a.estimatedDelivery);
        case 'alpha-asc':
          return a.trackingNumber.localeCompare(b.trackingNumber);
        case 'alpha-desc':
          return b.trackingNumber.localeCompare(a.trackingNumber);
        default:
          return 0;
      }
    });
    
    setFilteredShipments(result);
  }, [shipments, filterStatus, searchQuery, sortOption]);

  const handleExpand = (trackingNumber) => {
    setExpanded(expanded === trackingNumber ? null : trackingNumber);
  };

  // Get unique statuses from shipments
  const getUniqueStatuses = () => {
    if (!shipments) return ['ALL'];
    const statuses = shipments.map(shipment => shipment.status);
    return ['ALL', ...new Set(statuses)];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm pb-4">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Package className="w-5 h-5 mr-2 text-red-600" />
            <h2 className="text-lg font-semibold">Recent Shipments</h2>
          </div>
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {filteredShipments.length} shipment{filteredShipments.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Search and filter controls */}
      <div className="px-6 pt-4 pb-2 border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-10 p-2"
              placeholder="Search tracking number, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="flex items-center">
              <Filter className="w-4 h-4 text-gray-500 mr-1" />
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 p-2"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {getUniqueStatuses().map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
              <SortDesc className="w-4 h-4 text-gray-500 mr-1" />
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 p-2"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="alpha-asc">A-Z</option>
                <option value="alpha-desc">Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        {filteredShipments && filteredShipments.length > 0 ? (
          <div className="space-y-1">
            {filteredShipments.map((shipment) => (
              <ShipmentCard key={shipment.trackingNumber} shipment={shipment} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <Package className="w-10 h-10 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No shipments found.</p>
            {(searchQuery || filterStatus !== 'ALL') && (
              <button
                className="mt-2 text-sm text-red-600 hover:underline"
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('ALL');
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentShipments;