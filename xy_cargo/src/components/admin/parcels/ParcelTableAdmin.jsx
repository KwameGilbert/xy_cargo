import React from 'react';
import { useHistory } from 'react-router-dom';
import ParcelActionsAdmin from './ParcelActionsAdmin';
import ParcelFiltersAdmin from './ParcelFiltersAdmin';

const ParcelTableAdmin = ({ parcels, onSplit, onReassign, onUpdateCost }) => {
  const history = useHistory();

  const handleRowClick = (parcelId) => {
    history.push(`/admin/parcels/${parcelId}`);
  };

  return (
    <div className="overflow-x-auto">
      <ParcelFiltersAdmin />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {parcels.map((parcel) => (
            <tr key={parcel.id} onClick={() => handleRowClick(parcel.id)} className="cursor-pointer hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{parcel.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{parcel.customer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{parcel.metrics.totalWeight} kg</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{parcel.metrics.volume}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{parcel.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <ParcelActionsAdmin 
                  parcel={parcel} 
                  onSplit={onSplit} 
                  onReassign={onReassign} 
                  onUpdateCost={onUpdateCost} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelTableAdmin;