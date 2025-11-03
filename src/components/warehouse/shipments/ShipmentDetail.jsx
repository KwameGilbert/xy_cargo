import React, { useState } from 'react';
import { Package, Tag, Weight, Calendar, ArrowRight, Hash, Clock, MapPin, CheckCircle, Plus } from 'lucide-react';
import ShipmentTrackingModal from './ShipmentTrackingModal';

const ShipmentDetail = ({ shipment, onAddTrackingUpdate }) => {
  const [showTrackingModal, setShowTrackingModal] = useState(false);
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mt-6 text-sm">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
            <div>
              <p className="text-gray-500">Departure</p>
              <p className="font-medium text-gray-900">{shipment.departureDate || 'Not scheduled'}</p>
            </div>
          </div>
         
          <div className="flex items-center">
           <p className="text-gray-500">Route</p>
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
              <p className="font-medium text-gray-900">{shipment.estimatedArrival || 'Not available'}</p>
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
              <p className="font-medium text-gray-900">{shipment.totalWeight} kg</p>
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

      {/* Notes Section */}
      {shipment.notes && (
        <div className="border-t">
          <h3 className="text-lg font-medium text-gray-900 px-6 py-4">Notes</h3>
          <div className="px-6 pb-6">
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{shipment.notes}</p>
          </div>
        </div>
      )}

      {/* Timeline Section */}
      {shipment.timeline && shipment.timeline.length > 0 && (
        <div className="border-t">
          <div className="px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Tracking Timeline</h3>
            {onAddTrackingUpdate && (
              <button
                onClick={() => setShowTrackingModal(true)}
                className="flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Update
              </button>
            )}
          </div>
          <div className="px-6 pb-6">
            <div className="space-y-4">
              {shipment.timeline.map((update, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 capitalize">
                        {update.humanStatus || update.status}
                      </h4>
                      <time className="text-xs text-gray-500">
                        {new Date(update.updatedAt).toLocaleString()}
                      </time>
                    </div>
                    <div className="mt-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        {update.location}
                      </div>
                      {update.notes && (
                        <p className="text-sm text-gray-500 mt-1">{update.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tracking Modal */}
      <ShipmentTrackingModal
        isOpen={showTrackingModal}
        onClose={() => setShowTrackingModal(false)}
        onSubmit={onAddTrackingUpdate}
        shipmentId={shipment.id}
      />
    </div>
  );
};

export default ShipmentDetail;
