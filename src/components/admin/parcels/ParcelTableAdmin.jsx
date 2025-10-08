import React from 'react';

const ParcelTableAdmin = ({ parcels, selectedParcels, onSelect, onView, onEdit, onPrintLabel, onMarkShipped }) => (
  <div className="bg-white rounded-lg shadow-md overflow-x-auto hidden md:block">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <input type="checkbox" onChange={() => {}} /> Select All
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {parcels.map(parcel => (
          <tr key={parcel.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <input type="checkbox" checked={selectedParcels.includes(parcel.id)} onChange={() => onSelect(parcel.id)} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{parcel.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parcel.trackingNumber}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parcel.customerName}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${parcel.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {parcel.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parcel.warehouse}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onClick={() => onView(parcel.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">View</button>
              <button onClick={() => onEdit(parcel.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
              <button onClick={() => onPrintLabel(parcel.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">Print</button>
              <button onClick={() => onMarkShipped(parcel.id)} className="text-indigo-600 hover:text-indigo-900">Ship</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ParcelTableAdmin;