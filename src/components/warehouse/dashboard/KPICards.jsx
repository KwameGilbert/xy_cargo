import React from 'react';
import { Package, Truck, CreditCard, AlertTriangle, Weight, Star } from 'lucide-react';

const KPICards = ({ kpiData }) => {
  const cards = [
    {
      title: 'Parcels Received Today',
      value: kpiData.parcelsReceivedToday,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Pending Shipments',
      value: kpiData.pendingShipments,
      icon: Truck,
      color: 'bg-yellow-500',
    },
    {
      title: 'Unpaid Parcels',
      value: kpiData.unpaidParcels,
      icon: CreditCard,
      color: 'bg-red-500',
    },
    {
      title: 'Claims Opened',
      value: kpiData.claimsOpened,
      icon: AlertTriangle,
      color: 'bg-orange-500',
    },
    {
      title: 'Total Weight Received Today',
      value: `${kpiData.totalWeightReceivedToday} kg`,
      icon: Weight,
      color: 'bg-green-500',
    },
    {
      title: 'Special Packaging Requests',
      value: kpiData.specialPackagingRequests,
      icon: Star,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className={`${card.color} p-3 rounded-full mr-4`}>
            <card.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;