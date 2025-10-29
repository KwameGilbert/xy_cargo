import React from 'react';

const ParcelCardList = ({ parcels, bulkSelected, handleBulkSelect, navigateToDetails }) => {
  if (!parcels || parcels.length === 0) return null;
  return (
    <div className="space-y-4">
      {parcels.map(parcel => (
        <div key={parcel.id} className="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigateToDetails(parcel)}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <input type="checkbox" checked={bulkSelected.includes(parcel.id)} onChange={e => {e.stopPropagation(); handleBulkSelect(parcel.id);}} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mr-3" />
              <div>
                <div className="text-sm font-medium text-gray-900">{parcel.waybillNumber}</div>
                <div className="text-xs text-gray-500">{parcel.description}</div>
              </div>
            </div>
            {/* Status badge can be added here if needed */}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-500">Recipient:</span> <span className="font-medium">John Smith</span></div>
            <div><span className="text-gray-500">Weight:</span> <span className="font-medium">{parcel.weight} kg</span></div>
            <div><span className="text-gray-500">Cost:</span> <span className="font-medium">${parcel.shippingCost.toFixed(2)}</span></div>
            <div><span className="text-gray-500">Last Update:</span> <span className="font-medium text-xs">{parcel.lastUpdate}</span></div>
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
            <button onClick={e => {e.stopPropagation(); navigateToDetails(parcel);}} className="text-blue-600 hover:text-blue-900 flex items-center text-sm">View</button>
            {/* Add more actions if needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParcelCardList;
