import React from 'react';
import { Package, Truck, CreditCard, AlertTriangle, Clock } from 'lucide-react';

const RecentActivityFeed = ({ activities }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'parcel_logged':
        return Package;
      case 'payment_received':
        return CreditCard;
      case 'shipment_created':
        return Truck;
      case 'claim_opened':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div
              key={activity.id}
              className="flex items-start p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => console.log('Navigate to', activity.link)}
            >
              <div className="flex-shrink-0 mr-3">
                <Icon className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivityFeed;