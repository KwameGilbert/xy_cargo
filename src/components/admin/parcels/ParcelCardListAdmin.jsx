import React from 'react';

const ParcelCardListAdmin = ({ parcels, onView, onEdit, onPrintLabel, onMarkShipped }) => (
  <div className="md:hidden space-y-4">
    {parcels.map(parcel => (
      <div key={parcel.id} className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{parcel.id}</h3>
            <p className="text-sm text-gray-500">{parcel.trackingNumber}</p>
            <p className="text-sm text-gray-500">{parcel.customerName}</p>
            <p className="text-sm text-gray-500">{parcel.warehouse}</p>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${parcel.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {parcel.status}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <button onClick={() => onView(parcel.id)} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">View</button>
            <button onClick={() => onEdit(parcel.id)} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Edit</button>
            <button onClick={() => onPrintLabel(parcel.id)} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Print</button>
            <button onClick={() => onMarkShipped(parcel.id)} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Ship</button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ParcelCardListAdmin;