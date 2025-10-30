const ShipmentInfo = ({ shipment }) => {
    if (!shipment) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="bg-gray-50 shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Shipment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tracking Number</label>
                    <div className="mt-1 p-2 bg-white border border-gray-300 rounded-md">
                        {shipment.tracking_number}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Waybill Number</label>
                    <div className="mt-1 p-2 bg-white border border-gray-300 rounded-md">
                        {shipment.waybill_number}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Origin Country</label>
                    <div className="mt-1 p-2 bg-white border border-gray-300 rounded-md">
                        {shipment.origin_country}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Country</label>
                    <div className="mt-1 p-2 bg-white border border-gray-300 rounded-md">
                        {shipment.destination_country}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className="mt-1 p-2 bg-white border border-gray-300 rounded-md">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-yellow-100 text-yellow-800">
                            {shipment.status.replace('_', ' ')}
                        </span>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <div className="mt-1 p-2 bg-white border border-gray-300 rounded-md capitalize">
                        {shipment.priority}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Departure Date</label>
                    <div className="mt-1 p-2 bg-white border border-gray-300 rounded-md">
                        {formatDate(shipment.departure_date)}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Expected Delivery</label>
                    <div className="mt-1 p-2 bg-white border border-gray-300 rounded-md">
                        {formatDate(shipment.expected_delivery)}
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <div className="mt-1 p-2 bg-white border border-gray-300 rounded-md">
                        {shipment.notes || 'No notes available'}
                    </div>
                </div>

                {/* Tracking Updates */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Updates</label>
                    <div className="space-y-4">
                        {shipment.tracking_updates?.map((update, index) => (
                            <div key={update.update_id} className="bg-white p-4 border border-gray-200 rounded-md">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 capitalize">
                                            {update.status.replace('_', ' ')}
                                        </h4>
                                        <p className="text-sm text-gray-600">{update.location}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(update.updated_at)}
                                    </span>
                                </div>
                                {update.notes && (
                                    <p className="mt-2 text-sm text-gray-600">{update.notes}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipmentInfo;