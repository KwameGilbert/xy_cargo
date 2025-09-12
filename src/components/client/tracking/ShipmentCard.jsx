import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, ChevronDown, Package, Plane, Ship, Zap } from 'lucide-react';


// Status color mapping based on status text
const getStatusColor = (status) => {
  const statusMap = {
    'delivered': { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-600' },
    'in transit': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-600' },
    'processing': { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-600' },
    'picked up': { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-600' },
    'delayed': { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-600' },
    'customs': { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-600' },
    'pending': { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-600' },
  };
  const key = status?.toLowerCase() || 'pending';
  return statusMap[key] || statusMap.pending;
};

// Get shipping type icon and color
const getShippingTypeInfo = (type) => {
  const typeMap = {
    'air express': { icon: Zap, color: 'text-red-500', bg: 'bg-red-50' },
    'air': { icon: Plane, color: 'text-blue-500', bg: 'bg-blue-50' },
    'sea': { icon: Ship, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  };
  const key = type?.toLowerCase() || 'air';
  return typeMap[key] || typeMap.air;
};

const ShipmentCard = ({ shipment }) => {
  const navigate = useNavigate();
  // Calculate simple progress for the route
  const calculateProgress = () => {
    if (shipment.status?.toLowerCase() === 'delivered') return 100;
    if (shipment.status?.toLowerCase() === 'processing') return 15;
    if (shipment.status?.toLowerCase() === 'in transit') {
      if (shipment.currentLocation === shipment.route.origin) return 15;
      if (shipment.currentLocation === shipment.route.destination) return 90;
      return 50;
    }
    return 10;
  };

  const statusColor = getStatusColor(shipment.status);
  const shippingInfo = getShippingTypeInfo(shipment.shippingType);
  const ShippingIcon = shippingInfo.icon;
  const totalItems = shipment.items?.reduce((acc, it) => acc + it.qty, 0) || 0;
  const totalWeight = shipment.items?.reduce((acc, it) => {
    const w = parseFloat((it.weight || '').replace(/[a-zA-Z\s]/g, '')) || 0;
    return acc + w;
  }, 0) || 0;

  return (
    <div
      className={`rounded-xl mb-3 py-4 px-4 transition-all duration-200 cursor-pointer shadow-sm bg-white hover:bg-gray-50 hover:shadow-md`}
      onClick={() => navigate(`/client/tracking/${shipment.trackingNumber}`)}
      tabIndex={0}
      role="button"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className={`inline-flex items-center px-3 py-2 rounded-full ${statusColor.bg} ${statusColor.text} font-medium mr-2`}>
            {shipment.status?.toLowerCase() === 'delivered' ? <Package className="w-4 h-4 mr-2" /> :
              shipment.status?.toLowerCase() === 'in transit' ? <ArrowRight className="w-4 h-4 mr-2" /> :
              <Calendar className="w-4 h-4 mr-2" />}
            {shipment.status}
          </div>
          <h3 className="text-base font-semibold text-gray-900">{shipment.trackingNumber}</h3>
        </div>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${shippingInfo.bg} ${shippingInfo.color} font-medium text-sm`}>
          <ShippingIcon className="w-4 h-4" />
          {shipment.shippingType || 'Air'}
        </div>
  {/* <ChevronDown ... /> removed for navigation */}
      </div>

      {/* Simple progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4 overflow-hidden">
        <div 
          className="h-full bg-red-600 rounded-full transition-all duration-500"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        <div className="flex flex-col gap-1 justify-center">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Items</span>
            <span className="font-medium text-sm">{totalItems}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Weight</span>
            <span className="font-medium text-sm">{totalWeight.toFixed(2)} lbs</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Cost</span>
            <span className="font-semibold text-green-600 text-sm">${shipment.shippingCost?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;