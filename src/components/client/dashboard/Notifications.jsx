import { Package, CheckCircle, AlertTriangle } from 'lucide-react';

const icons = {
  package: Package,
  check: CheckCircle,
  alert: AlertTriangle
};

const NotificationItem = ({ type, message, icon }) => {
  const IconComponent = icons[icon];
  
  const getTypeStyles = (type) => {
    switch (type) {
      case 'shipment_update':
        return 'text-blue-600 bg-blue-50';
      case 'delivery_confirmed':
        return 'text-green-600 bg-green-50';
      case 'payment_due':
        return 'text-amber-600 bg-amber-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50">
      <div className={`p-2 rounded-full ${getTypeStyles(type)}`}>
        {IconComponent && <IconComponent className="w-4 h-4" />}
      </div>
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  );
};

const Notifications = ({ notifications }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-4">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Recent Notifications</h2>
      </div>
      <div className="p-2">
        {notifications.map((notification, index) => (
          <NotificationItem key={index} {...notification} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
