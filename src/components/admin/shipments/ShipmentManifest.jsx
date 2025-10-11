import React from 'react';
import {
  Package,
  MapPin,
  Truck,
  Calendar,
  DollarSign,
  User,
  Building,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

const ShipmentManifest = ({ shipment }) => {
  if (!shipment) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'In Transit':
        return <Truck className="h-4 w-4 text-blue-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Processing':
        return <Package className="h-4 w-4 text-purple-500" />;
      case 'Delayed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    return amount.toString().replace('$', '');
  };

  const totalDeclaredValue = shipment.parcels?.reduce((total, parcel) => {
    const value = parseFloat(parcel.declaredValue?.replace('$', '').replace(',', '') || 0);
    return total + value;
  }, 0) || 0;

  const totalWeight = shipment.parcels?.reduce((total, parcel) => {
    const weight = parseFloat(parcel.weight?.replace(' kg', '') || 0);
    return total + weight;
  }, 0) || 0;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 print:p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Shipment Manifest</h1>
            <p className="text-blue-100 mt-1">XY Cargo Logistics</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {getStatusIcon(shipment.status)}
              <span className="text-lg font-semibold">{shipment.status}</span>
            </div>
            <p className="text-sm text-blue-100 mt-1">Generated: {formatDate(new Date())}</p>
          </div>
        </div>
      </div>

      {/* Shipment Overview */}
      <div className="p-6 print:p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipment Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Package className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Shipment ID</p>
              <p className="text-sm text-gray-600">{shipment.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Tracking Number</p>
              <p className="text-sm text-gray-600">{shipment.trackingNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Route</p>
              <p className="text-sm text-gray-600">{shipment.originCountry} → {shipment.destinationCountry}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Truck className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Carrier</p>
              <p className="text-sm text-gray-600">{shipment.carrier}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Departure</p>
              <p className="text-sm text-gray-600">{formatDate(shipment.departureDate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Estimated Arrival</p>
              <p className="text-sm text-gray-600">{formatDate(shipment.estimatedArrival)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Priority</p>
              <p className="text-sm text-gray-600">{shipment.priority}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Information */}
      <div className="p-6 print:p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Assignment & Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Warehouse Assignment</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Warehouse:</span>
                <span className="text-sm font-medium">{shipment.assignedWarehouse || 'Not Assigned'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Agent:</span>
                <span className="text-sm font-medium">{shipment.assignedAgent || 'Not Assigned'}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Shipment Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Created By:</span>
                <span className="text-sm font-medium">{shipment.createdBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Created:</span>
                <span className="text-sm font-medium">{formatDate(shipment.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Updated:</span>
                <span className="text-sm font-medium">{formatDate(shipment.lastUpdated)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="p-6 print:p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Shipping Cost</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">${formatCurrency(shipment.shippingCost)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">Insurance Value</span>
            </div>
            <p className="text-2xl font-bold text-green-900">${formatCurrency(shipment.insuranceValue)}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-900">Customs Duty</span>
            </div>
            <p className="text-2xl font-bold text-orange-900">${formatCurrency(shipment.customsDuty)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Package className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Total Parcels</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">{shipment.totalParcels || 0}</p>
          </div>
        </div>
      </div>

      {/* Parcel Details */}
      <div className="p-6 print:p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Parcel Details</h2>

        {shipment.parcels && shipment.parcels.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parcel ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dimensions
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Declared Value
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {shipment.parcels.map((parcel, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {parcel.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {parcel.description}
                      {parcel.specialHandling && (
                        <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                          Special Handling
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      <div>
                        <p className="font-medium">{parcel.customerName}</p>
                        <p className="text-gray-500">{parcel.customerContact}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parcel.weight}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parcel.dimensions}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parcel.declaredValue}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        parcel.paymentStatus === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {parcel.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="3" className="px-4 py-4 text-sm font-medium text-gray-900">
                    Total Summary
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {totalWeight.toFixed(2)} kg
                  </td>
                  <td colSpan="2" className="px-4 py-4 text-sm font-medium text-gray-900">
                    Total Declared Value: ${totalDeclaredValue.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {shipment.parcels.filter(p => p.paymentStatus === 'Paid').length}/{shipment.parcels.length} Paid
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">No parcels in this shipment</p>
          </div>
        )}
      </div>

      {/* Notes */}
      {shipment.notes && (
        <div className="p-6 print:p-4 border-t border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Notes</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{shipment.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="p-6 print:p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            <p><strong>XY Cargo Logistics</strong></p>
            <p>Comprehensive Shipping Solutions</p>
          </div>
          <div className="text-right">
            <p>Manifest ID: {shipment.id}</p>
            <p>Generated: {formatDate(new Date())}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-xs text-gray-500 text-center">
            This manifest serves as an official record of shipment contents. Please retain for customs, insurance, and delivery verification purposes.
          </p>
        </div>
      </div>

      {/* Print-only styles */}
      <style jsx>{`
        @media print {
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:p-4 {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ShipmentManifest;