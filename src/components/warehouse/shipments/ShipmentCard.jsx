import { Eye, Edit, FileText, Truck, MoreHorizontal, Package, Globe } from 'lucide-react';

const ShipmentCard = ({ shipment, onView, onEdit, onPrintManifest, onUpdateStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-3 sm:mb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
        <div className="mb-2 sm:mb-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{shipment.id}</h3>
          <p className="text-xs sm:text-sm text-gray-500">{shipment.trackingNumber}</p>
        </div>
        <div>
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
            {shipment.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-700">Origin</p>
          <div className="flex items-center">
            <Globe className="w-3 h-3 mr-1 text-gray-500 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-gray-900">{shipment.originCountry}</p>
          </div>
        </div>
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-700">Destination</p>
          <div className="flex items-center">
            <Globe className="w-3 h-3 mr-1 text-gray-500 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-gray-900">{shipment.destinationCountry}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-700">Parcels</p>
          <div className="flex items-center">
            <Package className="w-3 h-3 mr-1 text-gray-500 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-gray-900">{shipment.totalParcels} {shipment.totalParcels > 1 ? 'parcels' : 'parcel'}</p>
          </div>
        </div>
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-700">Weight</p>
          <p className="text-xs sm:text-sm text-gray-900">{shipment.totalWeight}</p>
        </div>
      </div>

      <div className="mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm font-medium text-gray-700">Shipping Cost</p>
        <p className="text-sm sm:text-base text-gray-900 font-medium">{shipment.shippingCost}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-700">Departure</p>
          <p className="text-xs sm:text-sm text-gray-900">{shipment.departureDate || 'Not scheduled'}</p>
        </div>
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-700">Arrival</p>
          <p className="text-xs sm:text-sm text-gray-900">{shipment.arrivalDate || 'Not available'}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 sm:gap-2 border-t pt-3">
        <button
          onClick={() => onView(shipment.id)}
          className="flex items-center justify-center rounded-md px-2 py-1 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex-1 min-w-0"
        >
          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span className="truncate">View</span>
        </button>
        <button
          onClick={() => onEdit(shipment.id)}
          className="flex items-center justify-center rounded-md px-2 py-1 text-xs sm:text-sm text-blue-700 hover:bg-blue-50 flex-1 min-w-0"
        >
          <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span className="truncate">Edit</span>
        </button>
        <button
          onClick={() => onPrintManifest(shipment.id)}
          className="flex items-center justify-center rounded-md px-2 py-1 text-xs sm:text-sm text-green-700 hover:bg-green-50 flex-1 min-w-0"
        >
          <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span className="hidden sm:inline truncate">Manifest</span>
          <span className="sm:hidden truncate">Print</span>
        </button>
        <button
          onClick={() => onUpdateStatus(shipment.id)}
          className="flex items-center justify-center rounded-md px-2 py-1 text-xs sm:text-sm text-purple-700 hover:bg-purple-50 flex-1 min-w-0"
        >
          <Truck className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span className="truncate">Status</span>
        </button>
        <button
          className="flex items-center justify-center rounded-md px-2 py-1 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex-shrink-0"
        >
          <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default ShipmentCard;