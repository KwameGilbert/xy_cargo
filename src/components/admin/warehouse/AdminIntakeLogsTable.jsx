import React from 'react';
import { Package, Truck, User, Calendar, Clock, Building, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const AdminIntakeLogsTable = ({ intakeLogs }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Damaged':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Damaged':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Good':
        return 'text-green-600';
      case 'Damaged':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatWeight = (weight) => {
    return `${weight} kg`;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="divide-y divide-gray-200">
          {intakeLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-semibold text-xs mr-3">
                    {log.id.slice(-3)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{log.id}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(log.receivedAt)}
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                  {getStatusIcon(log.status)}
                  <span className="ml-1">{log.status}</span>
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="h-4 w-4 mr-2" />
                    <span className="font-medium">{log.parcelId}</span>
                  </div>
                  <span className={`text-xs font-medium ${getConditionColor(log.condition)}`}>
                    {log.condition}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-4 w-4 mr-2" />
                  <span>{log.shipmentType}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{log.warehouseName}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span>{log.receivedBy}</span>
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  {formatWeight(log.weight)} • {log.dimensions}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Intake Details
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parcel Info
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Warehouse
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Received By
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {intakeLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-2 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-semibold text-xs mr-3">
                      {log.id.slice(-3)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {log.id}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(log.receivedAt)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {log.parcelId}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {log.trackingNumber}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Truck className="h-3 w-3" />
                      {log.shipmentType}
                    </div>
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-gray-400 mr-2" />
                    <div className="min-w-0">
                      <div className="text-sm text-gray-900 truncate">
                        {log.warehouseName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {log.warehouseId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">
                      {log.receivedBy}
                    </span>
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                    {getStatusIcon(log.status)}
                    <span className="ml-1">{log.status}</span>
                  </span>
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <div className="min-w-0">
                    <span className={`text-sm font-medium ${getConditionColor(log.condition)}`}>
                      {log.condition}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatWeight(log.weight)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {log.dimensions}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
              

      {/* Notes/Additional Info Section */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="text-xs text-gray-600">
          <strong>Notes:</strong> Click on any intake log entry for detailed information including sender/recipient details and processing notes.
        </div>
      </div>
    </div>
  );
};

export default AdminIntakeLogsTable;