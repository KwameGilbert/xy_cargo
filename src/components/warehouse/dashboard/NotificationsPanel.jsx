import React from 'react';
import { AlertTriangle, Clock, Package } from 'lucide-react';

const NotificationsPanel = ({ notifications }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'urgent':
        return AlertTriangle;
      case 'warning':
        return Clock;
      default:
        return Package;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'text-red-600 bg-red-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Notifications</h3>
      <div className="space-y-3">
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type);
          return (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border-l-4 ${
                notification.type === 'urgent' ? 'border-red-500' : 'border-yellow-500'
              } ${getColor(notification.type)}`}
            >
              <div className="flex items-start">
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs opacity-75">{notification.timestamp}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPanel;