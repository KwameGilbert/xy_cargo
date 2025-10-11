import React from 'react';
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Users
} from 'lucide-react';

const AdminShipmentKPIs = ({ kpiData, kpis }) => {
  // Handle case where neither kpiData nor kpis is provided
  if (!kpiData && !kpis) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Use kpiData if available, otherwise construct from kpis
  const data = kpiData || {
    totalShipmentsToday: kpis?.totalShipments || 0,
    pendingShipments: kpis?.activeShipments || 0,
    inTransitShipments: kpis?.activeShipments || 0,
    deliveredThisWeek: kpis?.completedShipments || 0,
    delayedShipments: kpis?.delayedShipments || 0,
    totalRevenue: '$0',
    averageDeliveryTime: '0 days',
    customerSatisfaction: 0
  };

  const kpisArray = [
    {
      title: 'Total Shipments Today',
      value: data.totalShipmentsToday,
      icon: Package,
      color: 'bg-blue-500',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Pending Shipments',
      value: data.pendingShipments,
      icon: Clock,
      color: 'bg-yellow-500',
      trend: '+5%',
      trendUp: false
    },
    {
      title: 'In Transit',
      value: data.inTransitShipments,
      icon: Truck,
      color: 'bg-purple-500',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Delivered This Week',
      value: data.deliveredThisWeek,
      icon: CheckCircle,
      color: 'bg-green-500',
      trend: '+15%',
      trendUp: true
    },
    {
      title: 'Delayed Shipments',
      value: data.delayedShipments,
      icon: AlertTriangle,
      color: 'bg-red-500',
      trend: '-3%',
      trendUp: true
    },
    {
      title: 'Total Revenue',
      value: data.totalRevenue,
      icon: DollarSign,
      color: 'bg-indigo-500',
      trend: '+18%',
      trendUp: true
    },
    {
      title: 'Avg Delivery Time',
      value: data.averageDeliveryTime,
      icon: TrendingUp,
      color: 'bg-cyan-500',
      trend: '-2 days',
      trendUp: true
    },
    {
      title: 'Customer Satisfaction',
      value: `${data.customerSatisfaction}/5`,
      icon: Users,
      color: 'bg-pink-500',
      trend: '+0.2',
      trendUp: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {kpisArray.map((kpi, index) => {
        const IconComponent = kpi.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    kpi.trendUp ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.trend}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last week</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${kpi.color}`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminShipmentKPIs;