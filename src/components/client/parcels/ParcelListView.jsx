import React from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Eye, 
  CreditCard, 
  FileText,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';

const ParcelListView = ({ 
  parcels, 
  onViewDetails, 
  onPay, 
  onClaim, 
  onTrack,
  expandedParcel,
  onToggleExpanded,
  isMobile = false 
}) => {
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
        <Icon className="w-4 h-4 mr-1.5" />
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
        {isPaid ? <CheckCircle className="w-4 h-4 mr-1.5" /> : <Clock className="w-4 h-4 mr-1.5" />}
        {status}
      </span>
    );
  };

  if (isMobile) {
    return (
      <div className="space-y-6">
        {parcels.map((parcel) => (
          <div key={parcel.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-gray-400 mr-3" />
                <div>
                  <div className="text-lg font-semibold text-gray-900">{parcel.waybillNumber}</div>
                  <div className="text-sm text-gray-500">{parcel.description}</div>
                </div>
              </div>
              {getStatusBadge(parcel.status)}
            </div>

            {/* Card Body */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-500 font-medium">Recipient:</span>
                <div className="font-semibold text-gray-900">{parcel.recipient?.name || 'N/A'}</div>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Weight:</span>
                <div className="font-semibold text-gray-900">{parcel.weight} kg</div>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Cost:</span>
                <div className="font-semibold text-gray-900">${parcel.shippingCost.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Payment:</span>
                <div className="mt-1">{getPaymentBadge(parcel.paymentStatus)}</div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex space-x-4">
                <button
                  onClick={() => onViewDetails(parcel)}
                  className="text-blue-600 hover:text-blue-900 flex items-center text-sm font-medium"
                >
                  <Eye className="h-4 w-4 mr-1.5" />
                  View
                </button>
                {parcel.paymentStatus === 'UNPAID' && (
                  <button
                    onClick={() => onPay(parcel)}
                    className="text-green-600 hover:text-green-900 flex items-center text-sm font-medium"
                  >
                    <CreditCard className="h-4 w-4 mr-1.5" />
                    Pay
                  </button>
                )}
                {parcel.status === 'DELAYED' && (
                  <button
                    onClick={() => onClaim(parcel)}
                    className="text-red-600 hover:text-red-900 flex items-center text-sm font-medium"
                  >
                    <FileText className="h-4 w-4 mr-1.5" />
                    Claim
                  </button>
                )}
              </div>
              <button
                onClick={() => onTrack(parcel)}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Track
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Waybill & Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Recipient
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Weight & Cost
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Last Update
              </th>
              <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parcels.map((parcel) => (
              <React.Fragment key={parcel.id}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-semibold text-gray-900">{parcel.waybillNumber}</div>
                        <div className="text-sm text-gray-500">{parcel.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    {getStatusBadge(parcel.status)}
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{parcel.recipient?.name || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{parcel.recipient?.phone || ''}</div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{parcel.weight} kg</div>
                    <div className="text-sm text-gray-500">${parcel.shippingCost.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    {getPaymentBadge(parcel.paymentStatus)}
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                    {parcel.lastUpdate}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onViewDetails(parcel)}
                        className="text-blue-600 hover:text-blue-900 flex items-center font-medium"
                      >
                        <Eye className="h-4 w-4 mr-1.5" />
                        View
                      </button>
                      {parcel.paymentStatus === 'UNPAID' && (
                        <button
                          onClick={() => onPay(parcel)}
                          className="text-green-600 hover:text-green-900 flex items-center font-medium"
                        >
                          <CreditCard className="h-4 w-4 mr-1.5" />
                          Pay
                        </button>
                      )}
                      {parcel.status === 'DELAYED' && (
                        <button
                          onClick={() => onClaim(parcel)}
                          className="text-red-600 hover:text-red-900 flex items-center font-medium"
                        >
                          <FileText className="h-4 w-4 mr-1.5" />
                          Claim
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Tracking Timeline */}
                {expandedParcel === parcel.id && (
                  <tr>
                    <td colSpan="7" className="px-8 py-6 bg-gray-50">
                      <div className="border-l-4 border-red-500 pl-6">
                        <h4 className="text-xl font-semibold text-gray-900 mb-6">Tracking Timeline</h4>
                        <div className="space-y-6">
                          {parcel.trackingHistory && parcel.trackingHistory.length > 0 ? (
                            parcel.trackingHistory.map((event, idx) => (
                              <div key={idx} className="flex items-start">
                                <div className="flex-shrink-0">
                                  <div className={`w-4 h-4 rounded-full ${
                                    event.active ? 'bg-red-500' : 'bg-gray-300'
                                  }`}></div>
                                  {idx < parcel.trackingHistory.length - 1 && (
                                    <div className="w-0.5 h-10 bg-gray-200 ml-2"></div>
                                  )}
                                </div>
                                <div className="ml-6 flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className={`font-semibold text-lg ${
                                        event.active ? 'text-red-700' : 'text-gray-700'
                                      }`}>
                                        {event.status}
                                      </p>
                                      <p className="text-gray-600 mt-1">{event.description}</p>
                                      <p className="text-sm text-gray-500 flex items-center mt-2">
                                        <MapPin className="h-4 w-4 mr-1.5" />
                                        {event.location}
                                      </p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {event.date}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-gray-500 text-base">
                              No tracking information available yet.
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParcelListView;