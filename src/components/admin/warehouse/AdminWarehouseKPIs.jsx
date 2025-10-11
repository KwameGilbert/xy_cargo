import React from 'react';
import { Package, Activity } from 'lucide-react';

const AdminWarehouseKPIs = ({ warehouses }) => {
  // Calculate KPIs from warehouse data
  const totalWarehouses = warehouses.length;
  const activeWarehouses = warehouses.filter(w => w.status === 'Active').length;

  const kpiCards = [
    {
      title: 'Total Warehouses',
      value: totalWarehouses,
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Active Warehouses',
      value: activeWarehouses,
      icon: Activity,
      color: 'green'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        text: 'text-blue-900'
      },
      green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        text: 'text-green-900'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {kpiCards.map((kpi, index) => {
        const Icon = kpi.icon;
        const colors = getColorClasses(kpi.color);

        return (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
              </div>
              <div className={`p-3 rounded-full ${colors.bg}`}>
                <Icon className={`h-6 w-6 ${colors.icon}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminWarehouseKPIs;