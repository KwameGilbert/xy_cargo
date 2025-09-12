import React from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const ShipmentCard = ({ shipment }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'IN TRANSIT':
        return 'bg-blue-50 text-blue-700';
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

  return (
    <div className="border-b border-gray-100 py-6 first:pt-0 last:border-b-0 last:pb-0 hover:bg-gray-50 px-4 -mx-4 transition-colors">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-base font-semibold text-gray-900">{shipment.trackingNumber}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(shipment.status)}`}>
          {shipment.status}
        </span>
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