import React from 'react';
import { ChevronDown, ChevronUp, DollarSign, AlertTriangle } from 'react-feather';
import { format } from 'date-fns';

const ParcelTable = ({ 
  parcels, 
  loading, 
  onRowClick, 
  onPayClick, 
  onClaimClick, 
  selectedParcel 
}) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
        ))}
      </div>
    );
  }

  if (!parcels?.length) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No parcels found</p>
      </div>
    );
  }

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMM dd, yyyy');
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      at_warehouse: 'bg-blue-100 text-blue-800',
      in_transit: 'bg-yellow-100 text-yellow-800',
      delivered: 'bg-green-100 text-green-800',
      delayed: 'bg-red-100 text-red-800',
      processing: 'bg-purple-100 text-purple-800',
    };

    return (
      <span className={\`px-2 py-1 rounded-full text-sm font-medium \${statusStyles[status] || 'bg-gray-100 text-gray-800'}\`}>
        {status?.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Waybill No
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Weight (kg)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Shipping Cost
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Update
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {parcels.map((parcel) => (
            <React.Fragment key={parcel.id}>
              <tr 
                className={\`hover:bg-gray-50 cursor-pointer \${selectedParcel?.id === parcel.id ? 'bg-blue-50' : ''}\`}
                onClick={() => onRowClick(parcel)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {parcel.waybillNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getStatusBadge(parcel.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {parcel.weight.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${parcel.shippingCost.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={\`px-2 py-1 rounded-full text-sm font-medium \${
                    parcel.paymentStatus === 'paid' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }\`}>
                    {parcel.paymentStatus.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(parcel.lastUpdate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {parcel.paymentStatus === 'unpaid' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPayClick(parcel);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <DollarSign size={18} />
                      </button>
                    )}
                    {['delayed', 'damaged'].includes(parcel.status) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClaimClick(parcel);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <AlertTriangle size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              {selectedParcel?.id === parcel.id && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 bg-gray-50">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-gray-900 mb-2">Tracking Timeline</h4>
                      {parcel.tracking?.history ? (
                        <div className="space-y-4">
                          {parcel.tracking.history.map((event, index) => (
                            <div key={index} className="flex items-start">
                              <div className="flex-shrink-0 h-4 w-4 mt-1">
                                <div className={\`h-full w-full rounded-full \${
                                  event.active ? 'bg-blue-500' : 'bg-gray-300'
                                }\`}></div>
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{event.status}</p>
                                <p className="text-sm text-gray-500">{event.description}</p>
                                <p className="text-xs text-gray-400">{event.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No tracking information available</p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelTable;