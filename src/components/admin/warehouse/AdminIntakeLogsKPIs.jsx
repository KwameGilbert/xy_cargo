import React from 'react';
import { Package, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

const AdminIntakeLogsKPIs = ({ intakeLogs }) => {
  // Calculate KPIs from the intake logs data
  const totalIntakes = intakeLogs.length;
  const todayIntakes = intakeLogs.filter(log => {
    const today = new Date();
    const logDate = new Date(log.receivedAt);
    return logDate.toDateString() === today.toDateString();
  }).length;

  const pendingProcessing = intakeLogs.filter(log => log.status === 'Processing').length;
  const damagedItems = intakeLogs.filter(log => log.condition === 'Damaged').length;

  const kpis = [
    {
      title: 'Total Intakes',
      value: totalIntakes.toLocaleString(),
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Today\'s Intakes',
      value: todayIntakes,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Pending Processing',
      value: pendingProcessing,
      icon: Clock,
      color: 'bg-yellow-500',
      change: pendingProcessing > 0 ? 'Needs attention' : 'All clear',
      changeType: pendingProcessing > 0 ? 'warning' : 'positive'
    },
    {
      title: 'Damaged Items',
      value: damagedItems,
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: damagedItems > 0 ? 'Quality check needed' : 'No issues',
      changeType: damagedItems > 0 ? 'negative' : 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                <p className={`text-xs mt-1 ${
                  kpi.changeType === 'positive' ? 'text-green-600' :
                  kpi.changeType === 'negative' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {kpi.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${kpi.color}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminIntakeLogsKPIs;