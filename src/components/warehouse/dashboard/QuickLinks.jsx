import React from 'react';
import { Plus, Truck, Eye, CreditCard, Upload } from 'lucide-react';

const QuickLinks = () => {
  const links = [
    {
      title: 'Add New Parcel',
      icon: Plus,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => console.log('Add New Parcel'),
    },
    {
      title: 'Create Shipment',
      icon: Truck,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => console.log('Create Shipment'),
    },
    {
      title: 'View All Parcels',
      icon: Eye,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => console.log('View All Parcels'),
    },
    {
      title: 'Record Payment',
      icon: CreditCard,
      color: 'bg-yellow-500 hover:bg-yellow-600',
      action: () => console.log('Record Payment'),
    },
    {
      title: 'Bulk Update',
      icon: Upload,
      color: 'bg-red-500 hover:bg-red-600',
      action: () => console.log('Bulk Update'),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={link.action}
            className={`${link.color} text-white p-4 rounded-lg flex flex-col items-center justify-center transition-colors`}
          >
            <link.icon className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">{link.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;