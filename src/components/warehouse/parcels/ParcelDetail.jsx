// ParcelDetail.jsx - Raw API Data Display

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

const ParcelDetail = ({ parcelData }) => {
    if (!parcelData) {
        return <div className="p-6 text-center text-red-500">Error: Parcel data is not available.</div>;
    }

    console.log('Parcel info reached parcel detail component', parcelData);
    const parcel = parcelData;
    const items = parcel.items || [];
    const client = parcel.client || {};
    const trackingUpdates = parcel.shipment?.tracking_updates || [];


    const getStatusColor = (status) => {
      switch (status) {
        case 'Pending':
        case 'Created':
        case 'In Warehouse':
          return 'bg-gray-100 text-gray-800';
        case 'Processing':
        case 'Departed':
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
        case 'Pending':
        case 'Created':
        case 'In Warehouse':
          return Package;
        case 'Processing':
          return Clock;
        case 'In Transit':
        case 'Departed':
          return Truck;
        case 'Delivered':
          return CheckCircle;
        default:
          return AlertTriangle;
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Parcel #{parcel.parcel_id}</h2>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Tracking: {parcel.tracking_number}</p>
                {parcel.shipment?.waybill_number && (
                  <p className="text-sm text-gray-500">Waybill: {parcel.shipment.waybill_number}</p>
                )}
              </div>
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
                <p className="text-sm font-medium text-gray-900">{client.fullName}</p>
                <p className="text-sm text-gray-500">{client.phone}</p>
                <p className="text-sm text-gray-500">{client.email}</p>
                <p className="text-sm text-gray-500 mt-2">{client.address}</p>
                {client.company && (
                  <p className="text-sm text-gray-500 mt-1">Company: {client.company}</p>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Parcel Metrics</h4>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Total Weight</p>
                    <p className="text-sm font-medium text-gray-900">{parcel.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Dimensions (L×W×H)</p>
                    <p className="text-sm font-medium text-gray-900">{parcel.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Declared Value</p>
                    <p className="text-sm font-medium text-gray-900">${parcel.declared_value}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Shipping Cost</p>
                    <p className="text-sm font-medium text-gray-900">${parcel.shipping_cost}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-sm font-medium text-gray-900">{parcel.category || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Status</p>
                    <p className={`text-sm font-medium ${parcel.payment_status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                      {parcel.payment_status.charAt(0).toUpperCase() + parcel.payment_status.slice(1)}
                    </p>
                  </div>
                  {parcel.tags && parcel.tags.length > 0 && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Tags</p>
                      <div className="flex gap-2 mt-1">
                        {parcel.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Shipment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Origin and Destination */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Route Information</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Origin</p>
                  <p className="text-sm font-medium text-gray-900">{parcel.shipment?.origin_country || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Destination</p>
                  <p className="text-sm font-medium text-gray-900">{parcel.shipment?.destination_country || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Important Dates</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Departure Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {parcel.shipment?.departure_date ? new Date(parcel.shipment.departure_date).toLocaleDateString() : 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Expected Delivery</p>
                  <p className="text-sm font-medium text-gray-900">
                    {parcel.shipment?.expected_delivery ? new Date(parcel.shipment.expected_delivery).toLocaleDateString() : 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Arrival Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {parcel.shipment?.arrival_date ? new Date(parcel.shipment.arrival_date).toLocaleDateString() : 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Shipping Details</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Tracking Numbers</p>
                  <div className="text-sm font-medium text-gray-900">
                    <p>Parcel: {parcel.tracking_number || 'N/A'}</p>
                    <p>Shipment: {parcel.shipment?.tracking_number || 'N/A'}</p>
                    <p>Waybill: {parcel.shipment?.waybill_number || 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Priority</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    <span className={`px-2 py-0.5 rounded-full ${
                      parcel.shipment?.priority === 'high' 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {parcel.shipment?.priority || 'Normal'}
                    </span>
                  </p>
                </div>
                {parcel.shipment?.notes && (
                  <div>
                    <p className="text-xs text-gray-500">Shipping Notes</p>
                    <p className="text-sm font-medium text-gray-900">{parcel.shipment.notes}</p>
                  </div>
                )}
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
                {items.length > 0 ? (
                    items.map((item, index) => (
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
                        {item.dimensions.height}x{item.dimensions.width}x{item.dimensions.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.specialPackaging ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Yes (Fragile)
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            No
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                    <tr>
                        <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center italic">
                            No items listed inside this parcel.
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Timeline / Tracking Log */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tracking Timeline</h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {trackingUpdates.length > 0 ? (
                  trackingUpdates.map((update, index) => {
                  const StatusIcon = getStatusIcon(update.status);
                  // Timeline is drawn correctly from newest (top) to oldest (bottom)
                  const isLast = index === trackingUpdates.length - 1;
                  
                  return (
                    <li key={index}>
                      <div className="relative pb-8">
                        {/* Only draw the line if it's NOT the last item */}
                        {!isLast && (
                          <span className="absolute top-4 left-4 -ml-px f-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getStatusColor(update.status)}`}>
                              <StatusIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                <span className="font-medium text-gray-900">{update.status.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>: {update.location}
                                {update.notes && <span className="block text-xs text-gray-400 italic mt-0.5">({update.notes})</span>}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {/* Display only the date and time, removing seconds */}
                              {update.updated_at.substring(0, 16)} 
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                  <li className="text-sm text-gray-500 italic">No tracking updates available.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
};

export default ParcelDetail;