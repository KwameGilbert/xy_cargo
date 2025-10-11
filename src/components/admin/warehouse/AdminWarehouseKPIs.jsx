import React from 'react';
import { Package, Activity, AlertTriangle, Truck } from 'lucide-react';

const AdminWarehouseKPIs = ({ warehouses }) => {
  // Calculate KPIs from warehouse data
  const totalWarehouses = warehouses.length;
  const activeWarehouses = warehouses.filter(w => w.status === 'Active').length;
  const maintenanceWarehouses = warehouses.filter(w => w.status === 'Maintenance').length;
  const inactiveWarehouses = warehouses.filter(w => w.status === 'Inactive').length;

  // Group by shipment type
  const shipmentTypes = {};
  warehouses.forEach(warehouse => {
    shipmentTypes[warehouse.shipmentType] = (shipmentTypes[warehouse.shipmentType] || 0) + 1;
  });

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
    },
    {
      title: 'Under Maintenance',
      value: maintenanceWarehouses,
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      title: 'Inactive Warehouses',
      value: inactiveWarehouses,
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Sea Freight Hubs',
      value: shipmentTypes['Sea Freight'] || 0,
      icon: Truck,
      color: 'purple'
    },
    {
      title: 'Road Freight Hubs',
      value: shipmentTypes['Road Freight'] || 0,
      icon: Truck,
      color: 'orange'
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
      },
      yellow: {
        bg: 'bg-yellow-50',
        icon: 'text-yellow-600',
        text: 'text-yellow-900'
      },
      red: {
        bg: 'bg-red-50',
        icon: 'text-red-600',
        text: 'text-red-900'
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'text-purple-600',
        text: 'text-purple-900'
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'text-orange-600',
        text: 'text-orange-900'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
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