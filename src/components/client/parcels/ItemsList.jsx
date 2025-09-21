import React from 'react';
import { 
  Package, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Weight,
  Ruler,
  DollarSign
} from 'lucide-react';

const ItemsList = ({ items, onRequestSpecialPackaging, onViewSeparateParcel }) => {
  const getItemStatusBadge = (status) => {
    const statusMap = {
      'Normal': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      'Separated into new parcel': { bg: 'bg-blue-100', text: 'text-blue-700', icon: ExternalLink },
      'Pending Separation': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      'Error': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle }
    };
    
    const config = statusMap[status] || statusMap['Normal'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  const getSpecialPackagingBadge = (requiresSpecial) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        requiresSpecial ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
      }`}>
        {requiresSpecial ? 'Yes' : 'No'}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Items in This Parcel</h3>
        <p className="text-sm text-gray-600 mt-1">
          {items.length} item{items.length !== 1 ? 's' : ''} in this parcel
        </p>
      </div>

      <div className="overflow-x-auto">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight & Dimensions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Declared Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Special Packaging
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Weight className="h-4 w-4 text-gray-400 mr-1" />
                      {item.weight} kg
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Ruler className="h-3 w-3 text-gray-400 mr-1" />
                      {item.dimensions}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                      ${item.declaredValue}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSpecialPackagingBadge(item.specialPackaging)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getItemStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {!item.specialPackaging && item.status === 'Normal' && (
                        <button
                          onClick={() => onRequestSpecialPackaging(item)}
                          className="text-blue-600 hover:text-blue-900 text-xs"
                        >
                          Request Special Packaging
                        </button>
                      )}
                      {item.separatedParcelId && (
                        <button
                          onClick={() => onViewSeparateParcel(item.separatedParcelId)}
                          className="text-green-600 hover:text-green-900 text-xs"
                        >
                          View Separate Parcel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  {getItemStatusBadge(item.status)}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-gray-500">Quantity:</span>
                    <div className="font-medium">{item.quantity}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Weight:</span>
                    <div className="font-medium">{item.weight} kg</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Dimensions:</span>
                    <div className="font-medium text-xs">{item.dimensions}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Value:</span>
                    <div className="font-medium">${item.declaredValue}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-gray-500 text-sm">Special Packaging:</span>
                    <div className="mt-1">{getSpecialPackagingBadge(item.specialPackaging)}</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {!item.specialPackaging && item.status === 'Normal' && (
                    <button
                      onClick={() => onRequestSpecialPackaging(item)}
                      className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                      Request Special Packaging
                    </button>
                  )}
                  {item.separatedParcelId && (
                    <button
                      onClick={() => onViewSeparateParcel(item.separatedParcelId)}
                      className="text-green-600 hover:text-green-900 text-sm"
                    >
                      View Separate Parcel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsList;