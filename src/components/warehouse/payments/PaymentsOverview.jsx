import React from 'react';
import { DollarSign, AlertCircle, Clock } from 'lucide-react';

const PaymentsOverview = ({ summary }) => {
  const cards = [
    {
      title: 'Total Collected',
      value: `$${summary.totalCollected.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: summary.collectedChange,
      changeType: summary.collectedChange >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Pending Payments',
      value: `$${summary.pendingPayment.toFixed(2)}`,
      icon: Clock,
      color: 'bg-yellow-500',
      change: summary.pendingChange,
      changeType: summary.pendingChange <= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Overdue Payments',
      value: `$${summary.overdue.toFixed(2)}`,
      icon: AlertCircle,
      color: 'bg-red-500',
      change: summary.overdueChange,
      changeType: summary.overdueChange <= 0 ? 'positive' : 'negative'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`${card.color} p-3 rounded-full`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <div className={`text-sm font-medium ${card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              {card.change > 0 ? '+' : ''}{card.change}%
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
          <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          <p className="text-xs text-gray-500 mt-2">
            {card.changeType === 'positive' ? 'Improved' : 'Declined'} since last month
          </p>
        </div>
      ))}
    </div>
  );
};

export default PaymentsOverview;