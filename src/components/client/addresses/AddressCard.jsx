import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold">{address.name}</h3>
          {address.company && <p className="text-sm text-gray-600">{address.company}</p>}
          <div className="mt-3 text-sm text-gray-600">
            <div>{address.line1}</div>
            {address.line2 && <div>{address.line2}</div>}
            <div>{address.city}, {address.state} {address.zip}</div>
            <div>{address.country}</div>
            <div>{address.phone}</div>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="text-sm text-red-600 border border-red-200 px-3 py-2 rounded-md inline-flex items-center gap-2" onClick={() => onEdit?.(address)}>
              <Edit className="w-4 h-4" /> Edit
            </button>
            <button className="text-sm text-gray-600 border border-gray-200 px-3 py-2 rounded-md inline-flex items-center gap-2" onClick={() => onSetDefault?.(address)}>
              Set Default
            </button>
            <button className="text-sm text-gray-600 border border-gray-200 px-3 py-2 rounded-md inline-flex items-center gap-2" onClick={() => onDelete?.(address)}>
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-shrink-0">
          {address.isDefault && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">Default</span>}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
