import React from 'react';

const ParcelActionsAdmin = ({ onSplit, onReassign, onUpdateCost }) => {
  const handleSplit = () => {
    onSplit();
  };

  const handleReassign = () => {
    onReassign();
  };

  const handleUpdateCost = () => {
    const newCost = prompt("Enter the new cost:");
    if (newCost) {
      onUpdateCost(newCost);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleSplit}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        Split Parcel
      </button>
      <button
        onClick={handleReassign}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        Reassign Customer
      </button>
      <button
        onClick={handleUpdateCost}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Update Cost
      </button>
    </div>
  );
};

export default ParcelActionsAdmin;