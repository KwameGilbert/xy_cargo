import React from 'react';
import { Eye, Edit, Printer, Truck, MoreHorizontal } from 'lucide-react';

const ParcelCard = ({ parcel, onView, onEdit, onPrintLabel, onMarkShipped }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    return status === 'Paid' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-4 ${parcel.specialHandling ? 'border-l-4 border-red-500' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{parcel.id}</h3>
          <p className="text-sm text-gray-500">{parcel.trackingNumber}</p>
        </div>
        <div className="flex space-x-1">
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(parcel.status)}`}>
            {parcel.status}
          </span>
          {parcel.specialHandling && (
            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              Special
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Customer</p>
          <p className="text-sm text-gray-900">{parcel.customerName}</p>
          <p className="text-xs text-gray-500">{parcel.customerContact}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Items & Weight</p>
          <p className="text-sm text-gray-900">{parcel.items} {parcel.items > 1 ? 'items' : 'item'}</p>
          <p className="text-xs text-gray-500">{parcel.totalWeight} kg, {parcel.volume}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-700">Value</p>
          <p className="text-sm text-gray-900">{parcel.declaredValue}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Payment</p>
          <p className={`text-sm ${getPaymentStatusColor(parcel.paymentStatus)}`}>
            {parcel.paymentStatus}
          </p>
        </div>
      </div>

      <div className="flex justify-between border-t pt-3">
        <button
          onClick={() => onView(parcel.id)}
          className="flex items-center justify-center rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </button>
        <button
          onClick={() => onEdit(parcel.id)}
          className="flex items-center justify-center rounded-md px-2 py-1 text-sm text-blue-700 hover:bg-blue-50"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </button>
        <button
          onClick={() => onPrintLabel(parcel.id)}
          className="flex items-center justify-center rounded-md px-2 py-1 text-sm text-green-700 hover:bg-green-50"
        >
          <Printer className="w-4 h-4 mr-1" />
          Print
        </button>
        <button
          onClick={() => onMarkShipped(parcel.id)}
          className="flex items-center justify-center rounded-md px-2 py-1 text-sm text-purple-700 hover:bg-purple-50"
        >
          <Truck className="w-4 h-4 mr-1" />
          Ship
        </button>
        <button
          className="flex items-center justify-center rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const ParcelCardList = ({ parcels, onView, onEdit, onPrintLabel, onMarkShipped }) => {
  return (
    <div className="md:hidden">
      {parcels.map((parcel) => (
        <ParcelCard
          key={parcel.id}
          parcel={parcel}
          onView={onView}
          onEdit={onEdit}
          onPrintLabel={onPrintLabel}
          onMarkShipped={onMarkShipped}
        />
      ))}
      
      {/* Mobile Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between">
          <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export { ParcelCard, ParcelCardList };