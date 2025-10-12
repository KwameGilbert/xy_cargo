import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Users, Package } from 'lucide-react';

const FinancialKPIs = ({ data }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const calculateProfit = () => {
    return data.revenue.total - data.expenses.total;
  };

  const calculateProfitMargin = () => {
    return (calculateProfit() / data.revenue.total) * 100;
  };

  const kpis = [
    {
      title: 'Total Revenue',
      value: formatCurrency(data.revenue.total),
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(data.expenses.total),
      change: '+8.2%',
      changeType: 'negative',
      icon: TrendingDown,
      color: 'red'
    },
    {
      title: 'Net Profit',
      value: formatCurrency(calculateProfit()),
      change: '+15.3%',
      changeType: 'positive',
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: 'Profit Margin',
      value: formatPercentage(calculateProfitMargin()),
      change: '+2.1%',
      changeType: 'positive',
      icon: PieChart,
      color: 'purple'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const colorClasses = {
          green: {
            bg: 'bg-green-100',
            text: 'text-green-600',
            icon: 'text-green-600'
          },
          red: {
            bg: 'bg-red-100',
            text: 'text-red-600',
            icon: 'text-red-600'
          },
          blue: {
            bg: 'bg-blue-100',
            text: 'text-blue-600',
            icon: 'text-blue-600'
          },
          purple: {
            bg: 'bg-purple-100',
            text: 'text-purple-600',
            icon: 'text-purple-600'
          }
        };

        const colors = colorClasses[kpi.color];
        const TrendIcon = kpi.changeType === 'positive' ? TrendingUp : TrendingDown;

        return (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                <p className={`text-sm flex items-center mt-1 ${colors.text}`}>
                  <TrendIcon className="h-4 w-4 mr-1" />
                  {kpi.change} from last month
                </p>
              </div>
              <div className={`p-3 ${colors.bg} rounded-full`}>
                <Icon className={`h-6 w-6 ${colors.icon}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FinancialKPIs;