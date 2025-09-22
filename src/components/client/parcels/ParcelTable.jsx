import React from 'react';
import { DollarSign } from 'lucide-react';
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
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="animate-pulse p-4">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!parcels?.length) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">No parcels found</p>
        </div>
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

  const getStatusBadge = (statusRaw) => {
    const status = (statusRaw || '').toString().toUpperCase();
    const styles = {
      AT_WAREHOUSE: 'bg-gray-100 text-gray-700',
      IN_TRANSIT: 'bg-blue-100 text-blue-700',
      DELIVERED: 'bg-green-100 text-green-700',
      DELAYED: 'bg-red-100 text-red-700',
      PROCESSING: 'bg-amber-100 text-amber-700',
    };
    const classes = styles[status] || 'bg-gray-100 text-gray-700';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Waybill No
                  </th>
                  <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight (kg)
                  </th>
                  <th scope="col" className="hidden md:table-cell px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shipping Cost
                  </th>
                  <th scope="col" className="hidden sm:table-cell px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th scope="col" className="hidden md:table-cell px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Update
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {parcels.map((parcel) => (
                  <React.Fragment key={parcel.id}>
                    <tr 
                      className={`hover:bg-gray-50 cursor-pointer ${selectedParcel?.id === parcel.id ? 'bg-red-50' : ''}`}
                      onClick={() => onRowClick(parcel)}
                    >
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            {parcel.waybillNumber || parcel.waybillNo}
                          </div>
                          <div className="sm:hidden mt-1">
                            {getStatusBadge(parcel.status)}
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-3 py-4 whitespace-nowrap">
                        {getStatusBadge(parcel.status)}
                      </td>
                      <td className="hidden lg:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                        {typeof parcel.weight === 'number' ? parcel.weight.toFixed(2) : parcel.weight}
                      </td>
                      <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                        {typeof parcel.shippingCost === 'number' ? `$${parcel.shippingCost.toFixed(2)}` : parcel.shippingCost}
                      </td>
                      <td className="hidden sm:table-cell px-3 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          (parcel.paymentStatus || '').toString().toUpperCase() === 'PAID' 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {(parcel.paymentStatus || '').toString().toUpperCase()}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap text-xs text-gray-500">
                        {formatDate(parcel.lastUpdate)}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2.5">
                          {(parcel.paymentStatus || '').toString().toLowerCase() === 'unpaid' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onPayClick(parcel);
                              }}
                              className="text-green-600 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                              aria-label={`Pay for parcel ${parcel.waybillNumber || parcel.waybillNo}`}
                            >
                              <DollarSign className="w-4 h-4" />
                            </button>
                          )}
                          {['delayed', 'damaged', 'DELAYED', 'DAMAGED'].includes((parcel.status || '').toString()) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onClaimClick(parcel);
                              }}
                              className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                              aria-label={`File claim for parcel ${parcel.waybillNumber || parcel.waybillNo}`}
                            >
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {selectedParcel?.id === parcel.id && (
                      <tr>
                        <td colSpan="7" className="px-3 py-3 bg-gray-50">
                          <div className="border-l-4 border-red-500 pl-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Tracking Timeline</h4>
                            {parcel.tracking?.history ? (
                              <div className="space-y-3">
                                {parcel.tracking.history.map((event, index) => (
                                  <div key={index} className="flex items-start">
                                    <div className="flex-shrink-0 h-3.5 w-3.5 mt-1">
                                      <div className={`h-full w-full rounded-full ${
                                        event.active ? 'bg-red-500' : 'bg-gray-300'
                                      }`}></div>
                                    </div>
                                    <div className="ml-4">
                                      <p className="text-sm font-medium text-gray-900">{event.status}</p>
                                      <p className="text-xs text-gray-500">{event.description}</p>
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
        </div>
      </div>
    </div>
  );
};

export default ParcelTable;