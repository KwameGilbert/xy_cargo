import React from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Home,
  DollarSign,
  Tag,
  Shield
} from 'lucide-react';

const ParcelSummary = ({ parcel, onPayNow }) => {
  const getStatusBadge = (status) => {
    const statusMap = {
      'AT_WAREHOUSE': { bg: 'bg-gray-100', text: 'text-gray-700', icon: Package },
      'IN_TRANSIT': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Truck },
      'DELIVERED': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      'DELAYED': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle },
      'PROCESSING': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock }
    };
    
    const statusKey = status.toUpperCase();
    const config = statusMap[statusKey] || statusMap['AT_WAREHOUSE'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-4 h-4 mr-2" />
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    const isPaid = status === 'PAID';
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {isPaid ? <CheckCircle className="w-4 h-4 mr-2" /> : <Clock className="w-4 h-4 mr-2" />}
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Parcel #{parcel.waybillNumber}</h2>
          <p className="text-gray-600 mt-1">{parcel.description}</p>
        </div>
        {getStatusBadge(parcel.status)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Parcel Info */}
        <div className="space-y-6">
          {/* Parcel Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Parcel Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Waybill Number:</span>
                <span className="font-medium">{parcel.waybillNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tracking Number:</span>
                <span className="font-medium">{parcel.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{parcel.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dimensions:</span>
                <span className="font-medium">{parcel.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Declared Value:</span>
                <span className="font-medium">${parcel.declaredValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Cost:</span>
                <span className="font-medium">${parcel.shippingCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Route Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Origin:</span>
                <span className="ml-2 font-medium">{parcel.origin}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Destination:</span>
                <span className="ml-2 font-medium">{parcel.destination}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Current Location:</span>
                <span className="ml-2 font-medium">{parcel.currentLocation}</span>
              </div>
              {parcel.estimatedDelivery && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="ml-2 font-medium">{parcel.estimatedDelivery}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Customer & Payment */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <User className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Customer:</span>
                <span className="ml-2 font-medium">{parcel.customerName}</span>
              </div>
              {parcel.customerPhone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Phone:</span>
                  <span className="ml-2 font-medium">{parcel.customerPhone}</span>
                </div>
              )}
              {parcel.customerEmail && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 font-medium">{parcel.customerEmail}</span>
                </div>
              )}
            </div>
          </div>

          {/* Recipient Information */}
          {parcel.recipient && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 font-medium">{parcel.recipient.name}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Phone:</span>
                  <span className="ml-2 font-medium">{parcel.recipient.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 font-medium">{parcel.recipient.email}</span>
                </div>
                <div className="flex items-start">
                  <Home className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                  <div>
                    <span className="text-gray-600">Address:</span>
                    <div className="ml-2 font-medium">{parcel.recipient.address}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status:</span>
                {getPaymentBadge(parcel.paymentStatus)}
              </div>
              {parcel.paymentStatus === 'UNPAID' && (
                <button
                  onClick={onPayNow}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  <DollarSign className="h-4 w-4 mr-2 inline" />
                  Pay Now
                </button>
              )}
            </div>
          </div>

          {/* Special Tags */}
          {parcel.specialTags && parcel.specialTags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Tags</h3>
              <div className="flex flex-wrap gap-2">
                {parcel.specialTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParcelSummary;