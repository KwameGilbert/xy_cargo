import React from 'react';
import ShipmentCard from './ShipmentCard';

const RecentShipments = ({ shipments }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Recent Shipments</h2>
      </div>
      <div className="px-6">
        {shipments && shipments.length > 0 ? (
          shipments.map((shipment) => (
            <ShipmentCard key={shipment.trackingNumber} shipment={shipment} />
          ))
        ) : (
          <div className="py-6 text-center text-gray-500">No recent shipments found.</div>
        )}
      </div>
    </div>
  );
};

export default RecentShipments;