import React from 'react';
import { MapPin, Calendar, ArrowRight, ChevronDown, Package } from 'lucide-react';

const ShipmentCard = ({ shipment, onClick, expanded }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'IN TRANSIT':
        return 'bg-red-50 text-red-700';
      case 'PROCESSING':
        return 'bg-yellow-50 text-yellow-700';
      case 'DELIVERED':
        return 'bg-green-50 text-green-700';
      case 'DELAYED':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  // Calculate simple progress for the route
  const calculateProgress = () => {
    if (shipment.status === 'DELIVERED') return 100;
    if (shipment.status === 'PROCESSING') return 15;
    if (shipment.status === 'IN TRANSIT') {
      // Simplified progress based on current location matching origin or destination
      if (shipment.currentLocation === shipment.route.origin) return 15;
      if (shipment.currentLocation === shipment.route.destination) return 90;
      return 50; // Somewhere in the middle
    }
    return 10; // Default for other statuses
  };

  return (
    <div
      className={`border border-gray-100 rounded-lg mb-3 py-4 px-4 transition-all duration-200 cursor-pointer ${
        expanded ? 'bg-gray-50 shadow-md' : 'hover:bg-gray-50 hover:shadow-sm'
      }`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-full mr-3 ${getStatusClass(shipment.status).split(' ')[0]}`}>
            <Package className={`w-4 h-4 ${getStatusClass(shipment.status).split(' ')[1]}`} />
          </div>
          <h3 className="text-base font-semibold text-gray-900">{shipment.trackingNumber}</h3>
        </div>
        <div className="flex items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(shipment.status)}`}>
            {shipment.status}
          </span>
          <ChevronDown className={`ml-2 w-5 h-5 text-gray-500 transition-transform ${expanded ? 'transform rotate-180' : ''}`} />
        </div>
      </div>
      
      {/* Simple progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4 overflow-hidden">
        <div 
          className="h-full bg-red-600 rounded-full transition-all duration-500"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start">
          <div className="mt-0.5 mr-2 text-gray-400">
            <ArrowRight className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Route</p>
            <p className="text-sm font-medium">
              {shipment.route.origin} <ArrowRight className="inline w-3 h-3 mx-1" /> {shipment.route.destination}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="mt-0.5 mr-2 text-gray-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Current Location</p>
            <p className="text-sm font-medium">{shipment.currentLocation}</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="mt-0.5 mr-2 text-gray-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Est. Delivery</p>
            <p className="text-sm font-medium">{shipment.estimatedDelivery}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;