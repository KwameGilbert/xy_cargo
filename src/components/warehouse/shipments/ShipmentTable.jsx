import {
  Eye,
  Edit,
  Printer,
  Truck,
  MoreHorizontal,
  Package,
  FileText
} from "lucide-react";

const ShipmentTable = ({
  shipments,
  selectedShipments,
  onSelectShipment,
  onSelectAll,
  onView,
  onEdit,
  onPrintManifest,
  onUpdateStatus
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Checkbox Header */}
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  onChange={onSelectAll}
                  checked={
                    shipments.length > 0 &&
                    selectedShipments.length === shipments.length
                  }
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipment ID / Tracking
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Origin / Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parcels
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight & Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipping Cost
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
            {shipments.map((shipment) => (
              <tr key={shipment.id}>
                {/* Row checkbox */}
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedShipments.includes(shipment.id)}
                    onChange={() => onSelectShipment(shipment.id)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {shipment.id}
                  </div>
                  <div className="text-sm text-gray-500">
                    {shipment.trackingNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {shipment.originCountry}
                  </div>
                  <div className="text-sm text-gray-500">
                    → {shipment.destinationCountry}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-1 text-gray-500" />
                    <span>
                      {shipment.totalParcels}{" "}
                      {shipment.totalParcels > 1 ? "parcels" : "parcel"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {shipment.totalWeight}
                  </div>
                  <div className="text-sm text-gray-500">
                    {shipment.totalVolume}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {shipment.shippingCost}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      shipment.status
                    )}`}
                  >
                    {shipment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(shipment.id)}
                      className="text-gray-600 hover:text-gray-900"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onEdit(shipment.id)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit Shipment"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onPrintManifest(shipment.id)}
                      className="text-green-600 hover:text-green-900"
                      title="Print Manifest"
                    >
                      <FileText className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onUpdateStatus(shipment.id)}
                      className="text-purple-600 hover:text-purple-900"
                      title="Update Status"
                    >
                      <Truck className="w-5 h-5" />
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-900"
                      title="More Options"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <p className="text-sm text-gray-700">Showing 1–5 of 12 results</p>
      </div>
    </div>
  );
};

export default ShipmentTable;
