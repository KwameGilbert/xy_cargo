import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const ReportSummary = ({ data, period = 'last month' }) => {
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

  const getRevenueGrowth = () => {
    // Calculate growth from the monthly data
    const months = data.revenue.monthly;
    if (months.length < 2) return 0;

    const current = months[months.length - 1].amount;
    const previous = months[months.length - 2].amount;
    return ((current - previous) / previous) * 100;
  };

  const getTopExpenseCategory = () => {
    return data.expenses.categories.reduce((max, category) =>
      category.amount > max.amount ? category : max
    );
  };

  const getTopPaymentMethod = () => {
    return data.payments.methods.reduce((max, method) =>
      method.amount > max.amount ? method : max
    );
  };

  const insights = [
    {
      type: 'success',
      icon: TrendingUp,
      title: 'Revenue Growth',
      description: `Revenue increased by ${formatPercentage(getRevenueGrowth())} ${period}`,
      value: formatCurrency(data.revenue.total),
      color: 'green'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Highest Expense',
      description: `${getTopExpenseCategory().name} accounts for ${formatPercentage(getTopExpenseCategory().percentage)} of expenses`,
      value: formatCurrency(getTopExpenseCategory().amount),
      color: 'yellow'
    },
    {
      type: 'info',
      icon: Info,
      title: 'Top Payment Method',
      description: `${getTopPaymentMethod().method} is the most used payment method`,
      value: formatPercentage(getTopPaymentMethod().percentage),
      color: 'blue'
    },
    {
      type: 'success',
      icon: CheckCircle,
      title: 'Profit Margin',
      description: `Current profit margin is ${formatPercentage(calculateProfitMargin())}`,
      value: formatCurrency(calculateProfit()),
      color: 'green'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        title: 'text-green-800'
      },
      yellow: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        icon: 'text-yellow-600',
        title: 'text-yellow-800'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        title: 'text-blue-800'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-600',
        title: 'text-red-800'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
        <span className="text-sm text-gray-500">Period: {period}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const colors = getColorClasses(insight.color);

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${colors.bg.replace('50', '100')}`}>
                  <Icon className={`h-4 w-4 ${colors.icon}`} />
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-medium ${colors.title}`}>
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {insight.description}
                  </p>
                  <p className={`text-lg font-semibold mt-2 ${colors.title}`}>
                    {insight.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {data.payments.methods.length}
            </div>
            <div className="text-sm text-gray-500">Payment Methods</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {data.agents.commissions.length}
            </div>
            <div className="text-sm text-gray-500">Top Agents</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {data.customers.topSpenders.length}
            </div>
            <div className="text-sm text-gray-500">Top Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {formatPercentage(
                (data.payments.status.find(s => s.status === 'Completed')?.count || 0) /
                data.payments.status.reduce((sum, s) => sum + s.count, 0) * 100
              )}
            </div>
            <div className="text-sm text-gray-500">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;