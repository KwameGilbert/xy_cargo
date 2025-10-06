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
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{shipment.id}</h3>
          <p className="text-sm text-gray-500">{shipment.trackingNumber}</p>
        </div>
        <div>
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
            {shipment.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Origin</p>
          <div className="flex items-center">
            <Globe className="w-3 h-3 mr-1 text-gray-500" />
            <p className="text-sm text-gray-900">{shipment.originCountry}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Destination</p>
          <div className="flex items-center">
            <Globe className="w-3 h-3 mr-1 text-gray-500" />
            <p className="text-sm text-gray-900">{shipment.destinationCountry}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Parcels</p>
          <div className="flex items-center">
            <Package className="w-3 h-3 mr-1 text-gray-500" />
            <p className="text-sm text-gray-900">{shipment.totalParcels} {shipment.totalParcels > 1 ? 'parcels' : 'parcel'}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Weight & Volume</p>
          <p className="text-sm text-gray-900">{shipment.totalWeight}</p>
          <p className="text-xs text-gray-500">{shipment.totalVolume}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Shipping Cost</p>
        <p className="text-sm text-gray-900">{shipment.shippingCost}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Departure</p>
          <p className="text-sm text-gray-900">{shipment.departureDate || 'Not scheduled'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Estimated Arrival</p>
          <p className="text-sm text-gray-900">{shipment.estimatedArrival || 'Not available'}</p>
        </div>
      </div>

      <div className="flex justify-between border-t pt-3">
        <button
          onClick={() => onView(shipment.id)}
          className="flex items-center justify-center rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </button>
        <button
          onClick={() => onEdit(shipment.id)}
          className="flex items-center justify-center rounded-md px-2 py-1 text-sm text-blue-700 hover:bg-blue-50"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </button>
        <button
          onClick={() => onPrintManifest(shipment.id)}
          className="flex items-center justify-center rounded-md px-2 py-1 text-sm text-green-700 hover:bg-green-50"
        >
          <FileText className="w-4 h-4 mr-1" />
          Manifest
        </button>
        <button
          onClick={() => onUpdateStatus(shipment.id)}
          className="flex items-center justify-center rounded-md px-2 py-1 text-sm text-purple-700 hover:bg-purple-50"
        >
          <Truck className="w-4 h-4 mr-1" />
          Status
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

export default ShipmentCard;