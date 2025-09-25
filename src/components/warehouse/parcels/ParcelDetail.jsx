import React from 'react';
import { 
  Printer, 
  Send, 
  Edit, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Package
} from 'lucide-react';

const ParcelDetail = ({ parcel }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Created':
        return 'bg-gray-100 text-gray-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Created':
        return Package;
      case 'Processing':
        return Clock;
      case 'In Transit':
        return Truck;
      case 'Delivered':
        return CheckCircle;
      default:
        return AlertTriangle;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{parcel.id}</h2>
            <p className="text-sm text-gray-500">Tracking: {parcel.trackingNumber}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(parcel.status)}`}>
              {parcel.status}
            </span>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Printer className="h-4 w-4 mr-2" />
            Print Invoice
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Printer className="h-4 w-4 mr-2" />
            Print Label
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            <Edit className="h-4 w-4 mr-2" />
            Update Status
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Send className="h-4 w-4 mr-2" />
            Notify Customer
          </button>
        </div>
      </div>
      
      {/* Parcel Overview */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Parcel Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-900">{parcel.customer.name}</p>
              <p className="text-sm text-gray-500">{parcel.customer.phone}</p>
              <p className="text-sm text-gray-500">{parcel.customer.email}</p>
              <p className="text-sm text-gray-500 mt-2">{parcel.customer.address}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Parcel Metrics</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Total Weight</p>
                  <p className="text-sm font-medium text-gray-900">{parcel.metrics.totalWeight} kg</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Volume</p>
                  <p className="text-sm font-medium text-gray-900">{parcel.metrics.volume}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Declared Value</p>
                  <p className="text-sm font-medium text-gray-900">{parcel.metrics.declaredValue}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Payment Status</p>
                  <p className={`text-sm font-medium ${parcel.metrics.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                    {parcel.metrics.paymentStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Items Inside Parcel */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Items Inside Parcel</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dimensions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Special Packaging
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parcel.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.weight} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.dimensions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.specialPackaging ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        No
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Timeline / Tracking Log */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tracking Timeline</h3>
        <div className="flow-root">
          <ul className="-mb-8">
            {parcel.timeline.map((event, index) => {
              const StatusIcon = getStatusIcon(event.status);
              const isLast = index === parcel.timeline.length - 1;
              
              return (
                <li key={index}>
                  <div className="relative pb-8">
                    {!isLast && (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getStatusColor(event.status)}`}>
                          <StatusIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {event.status} <span className="font-medium text-gray-900">by {event.staff}</span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {event.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetail;