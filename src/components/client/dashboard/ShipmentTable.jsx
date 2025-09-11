const statusColors = {
  blue: "text-blue-600 bg-blue-50",
  yellow: "text-amber-600 bg-amber-50",
  green: "text-green-600 bg-green-50",
  orange: "text-orange-600 bg-orange-50",
  gray: "text-gray-600 bg-gray-50"
};

const ShipmentTable = ({ shipments }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Shipments</h2>
          <button className="flex items-center text-red-600 text-sm font-medium hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            View All
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipment ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {shipment.id}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[shipment.statusColor]}`}>
                    {shipment.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-600">
                    {shipment.destination}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-600">
                    {shipment.date}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
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
