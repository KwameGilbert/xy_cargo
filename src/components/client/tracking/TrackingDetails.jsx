import { X, MapPin, Flag, Package, Clock, MapPinned, TruckIcon } from 'lucide-react';

const TrackingDetails = ({ shipment, onClose }) => {
  const history = shipment.history || [];

  // Get appropriate status color class
  const getStatusClass = (status) => {
    const statusUpper = status.toUpperCase();
    switch (statusUpper) {
      case 'IN TRANSIT':
        return 'bg-red-50 text-red-700';
      case 'PROCESSING':
        return 'bg-yellow-50 text-yellow-700';
      case 'DELIVERED':
        return 'bg-green-50 text-green-700';
      case 'DELAYED':
        return 'bg-red-50 text-red-700';
      case 'PICKED UP':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  // Calculate progress percentage based on history length
  const calculateProgress = () => {
    if (!history.length) return 0;
    // Find the active event index
    const activeIndex = history.findIndex(event => event.active);
    if (activeIndex === -1) return 0;
    // Calculate percentage (reverse order because newest is first)
    return ((history.length - 1 - activeIndex) / (history.length - 1)) * 100;
  };

  const progressPercentage = calculateProgress();

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 mt-4 relative animate-fadeIn">
      <button
        className="absolute top-4 right-4 border border-red-300 text-red-500 rounded-md p-1 hover:bg-red-50 transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Package className="w-5 h-5 mr-2 text-red-600" />
        Tracking Details
      </h2>
      
      {/* Shipment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-1 flex items-center">
            <TruckIcon className="w-4 h-4 mr-1 text-gray-400" />
            Tracking Number
          </p>
          <p className="font-semibold">{shipment.trackingNumber}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center ${getStatusClass(shipment.status)}`}>
            {shipment.status}
          </span>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-1 flex items-center">
            <MapPinned className="w-4 h-4 mr-1 text-gray-400" />
            Current Location
          </p>
          <p className="font-semibold">{shipment.currentLocation}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-1 flex items-center">
            <Clock className="w-4 h-4 mr-1 text-gray-400" />
            Est. Delivery
          </p>
          <p className="font-semibold">{shipment.estimatedDelivery}</p>
        </div>
      </div>

      {/* Route Progress */}
      <h3 className="text-lg font-semibold mb-4">Route</h3>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-gray-700">{shipment.route.origin}</span>
          <span className="text-xs font-semibold text-gray-700">{shipment.route.destination}</span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div 
            className="absolute h-full bg-red-500 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div className="flex items-center justify-between absolute w-full top-0 px-0">
            <div className="bg-green-50 p-2 rounded-full border-2 border-white -mt-2.5 -ml-1">
              <MapPin className="w-3 h-3 text-green-600" />
            </div>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -mt-1">
              <span className="w-4 h-4 bg-red-500 rounded-full block"></span>
            </div>
            <div className="bg-red-50 p-2 rounded-full border-2 border-white -mt-2.5 -mr-1">
              <Flag className="w-3 h-3 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tracking History */}
      <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
      <div className="space-y-6 relative">
        {/* Vertical timeline line */}
        <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-gray-200"></div>
        
        {history.length > 0 ? (
          history.map((event, idx) => (
            <div key={idx} className="flex items-start pl-8 relative">
              <span className={`absolute left-0 mt-1 w-3 h-3 rounded-full border-2 border-white ${event.active ? 'bg-red-500' : 'bg-gray-300'}`}></span>
              <div className="flex-1">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <p className={`font-semibold ${event.active ? 'text-red-700' : 'text-gray-700'}`}>{event.status}</p>
                    <p className="text-sm text-gray-500">{event.description}</p>
                    <p className="text-xs text-gray-400">{event.location}</p>
                  </div>
                  <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">{event.date}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="pl-8 text-gray-400 text-sm py-4">No tracking history available.</div>
        )}
      </div>
    </div>
  );
};

export default TrackingDetails;
