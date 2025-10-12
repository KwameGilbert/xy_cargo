import React from 'react';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';

const AdminStaffKPIs = ({ staff }) => {
  // Calculate KPIs from staff data
  const totalStaff = staff.length;
  const activeStaff = staff.filter(s => s.status === 'Active').length;
  const onLeaveStaff = staff.filter(s => s.status === 'On Leave').length;

  const kpiCards = [
    {
      title: 'Total Staff',
      value: totalStaff,
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Active Staff',
      value: activeStaff,
      icon: UserCheck,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200'
    },
    {
      title: 'On Leave',
      value: onLeaveStaff,
      icon: UserX,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      borderColor: 'border-yellow-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {kpiCards.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-sm border ${kpi.borderColor} p-6 hover:shadow-md transition-shadow duration-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <Icon className={`h-6 w-6 ${kpi.textColor}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+2.5%</span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStaffKPIs;