import { PlusIcon, Eye } from 'lucide-react';

const statusColors = {
  blue: "text-blue-600 bg-blue-50",
  yellow: "text-amber-600 bg-amber-50",
  green: "text-green-600 bg-green-50",
  orange: "text-orange-600 bg-orange-50",
  gray: "text-gray-600 bg-gray-50"
};

const ShipmentTable = ({ shipments }) => {
return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 py-2.5 border-b border-gray-200">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recent Shipments</h2>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-red-600 text-red-600 hover:bg-red-50 px-2 py-1.5 text-sm">
                    <PlusIcon className="w-4 h-4 mr-1" />
                    View All
                </button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Shipment ID
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Destination
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {shipments.map((shipment) => (
                        <tr key={shipment.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2">
                                <span className="text-sm font-medium text-gray-900">
                                    {shipment.id}
                                </span>
                            </td>
                            <td className="px-3 py-2">
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[shipment.statusColor]}`}>
                                    {shipment.status}
                                </span>
                            </td>
                            <td className="px-3 py-2">
                                <span className="text-sm text-gray-600">
                                    {shipment.destination}
                                </span>
                            </td>
                            <td className="px-3 py-2">
                                <span className="text-sm text-gray-600">
                                    {shipment.date}
                                </span>
                            </td>
                            <td className="px-3 py-2">
                                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-red-600 text-red-600 hover:bg-red-50 px-2 py-1.5 text-sm">
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
};

export default ShipmentTable;
