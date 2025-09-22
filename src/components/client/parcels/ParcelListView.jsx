import { 
  Package, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Eye, 
  CreditCard,
  MapPin
} from 'lucide-react';

const ParcelListView = ({ 
  parcels, 
  onViewDetails, 
  onPay, 
  onTrack,
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
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3.5 h-3.5 mr-1" />
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    const isPaid = status === 'PAID';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {isPaid ? <CheckCircle className="w-3.5 h-3.5 mr-1" /> : <Clock className="w-3.5 h-3.5 mr-1" />}
        {status}
      </span>
    );
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        {parcels.map((parcel) => (
          <div key={parcel.id} className="bg-white rounded-lg shadow-sm border p-4">
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <Package className="h-6 w-6 text-gray-400 mr-2.5" />
                <div>
                  <div className="text-base font-semibold text-gray-900">{parcel.waybillNumber}</div>
                  <div className="text-xs text-gray-500">{parcel.description}</div>
                </div>
              </div>
              {getStatusBadge(parcel.status)}
            </div>

            {/* Card Body */}
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div>
                <span className="text-gray-500 font-medium">Recipient:</span>
                <div className="font-semibold text-gray-900 text-sm">{parcel.recipient?.name || 'N/A'}</div>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Weight:</span>
                <div className="font-semibold text-gray-900 text-sm">{parcel.weight} kg</div>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Cost:</span>
                <div className="font-semibold text-gray-900 text-sm">${parcel.shippingCost.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Payment:</span>
                <div className="mt-1">{getPaymentBadge(parcel.paymentStatus)}</div>
              </div>
            </div>

            {/* Updated Card Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="flex space-x-4">
                <button
                  onClick={() => onViewDetails(parcel)}
                  className="text-blue-600 hover:text-blue-900 flex items-center text-sm font-medium"
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View
                </button>
                {parcel.paymentStatus === 'UNPAID' && (
                  <button
                    onClick={() => onPay(parcel)}
                    className="text-green-600 hover:text-green-900 flex items-center text-sm font-medium"
                  >
                    <CreditCard className="h-3.5 w-3.5 mr-1" />
                    Pay
                  </button>
                )}
              </div>
              <button
                onClick={() => onTrack(parcel)}
                className="text-gray-600 hover:text-gray-900 flex items-center text-sm font-medium"
              >
                <MapPin className="h-3.5 w-3.5 mr-1" />
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
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Waybill & Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recipient
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight & Cost
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Update
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parcels.map((parcel) => (
              <tr key={parcel.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Package className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-2">
                      <div className="text-base font-semibold text-gray-900">{parcel.waybillNumber}</div>
                      <div className="text-xs text-gray-500">{parcel.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {getStatusBadge(parcel.status)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{parcel.recipient?.name || 'N/A'}</div>
                  <div className="text-xs text-gray-500">{parcel.recipient?.phone || ''}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{parcel.weight} kg</div>
                  <div className="text-xs text-gray-500">${parcel.shippingCost.toFixed(2)}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {getPaymentBadge(parcel.paymentStatus)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                  {parcel.lastUpdate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2.5">
                    <button
                      onClick={() => onViewDetails(parcel)}
                      className="text-blue-600 hover:text-blue-900 flex items-center font-medium text-sm"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View
                    </button>
                    {parcel.paymentStatus === 'UNPAID' && (
                      <button
                        onClick={() => onPay(parcel)}
                        className="text-green-600 hover:text-green-900 flex items-center font-medium text-sm"
                      >
                        <CreditCard className="h-3.5 w-3.5 mr-1" />
                        Pay
                      </button>
                    )}
                    <button
                      onClick={() => onTrack(parcel)}
                      className="text-gray-600 hover:text-gray-900 flex items-center font-medium text-sm"
                    >
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      Track
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default ParcelListView;