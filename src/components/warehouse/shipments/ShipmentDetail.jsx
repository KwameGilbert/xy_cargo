import React from 'react';
import { Package, Tag, Weight, Calendar, ArrowRight, Hash } from 'lucide-react';

const ShipmentDetail = ({ shipment }) => {
  if (!shipment) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Select a shipment to view its details.</p>
      </div>
    );
  }

  const getStatusChip = (status) => {
    switch (status) {
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{shipment.id}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Tracking: {shipment.trackingNumber}
            </p>
          </div>
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusChip(
              shipment.status
            )}`}
          >
            {shipment.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 text-sm">
          <div className="flex items-center">
            <Tag className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-500">Carrier</p>
              <p className="font-medium text-gray-900">{shipment.carrier}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <p className="font-medium text-gray-900">{shipment.originCountry}</p>
              <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
              <p className="font-medium text-gray-900">{shipment.destinationCountry}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-500">Est. Arrival</p>
              <p className="font-medium text-gray-900">{shipment.estimatedArrival}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Package className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-500">Total Parcels</p>
              <p className="font-medium text-gray-900">{shipment.totalParcels}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Weight className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-500">Total Weight</p>
              <p className="font-medium text-gray-900">{shipment.totalWeight}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 px-6 py-4">Parcels in this Shipment ({shipment.parcels.length})</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parcel ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Handling</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shipment.parcels.map((parcel) => (
                <tr key={parcel.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{parcel.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{parcel.customerName}</div>
                    <div className="text-xs text-gray-500">{parcel.customerContact}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parcel.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      parcel.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {parcel.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {parcel.specialHandling ? 'Special' : 'Standard'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetail;
