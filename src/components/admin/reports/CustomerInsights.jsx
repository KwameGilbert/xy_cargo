import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Star } from 'lucide-react';

const CustomerInsights = ({ title, insights }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400"></div>;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'down':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getInsightIcon = (title) => {
    if (title.includes('Customers') || title.includes('Purchase')) {
      return <Users className="h-5 w-5 text-blue-600" />;
    } else if (title.includes('Value') || title.includes('Order')) {
      return <DollarSign className="h-5 w-5 text-green-600" />;
    } else if (title.includes('Rate') || title.includes('Performance')) {
      return <Target className="h-5 w-5 text-purple-600" />;
    } else if (title.includes('Satisfaction')) {
      return <Star className="h-5 w-5 text-yellow-600" />;
    }
    return <Target className="h-5 w-5 text-gray-600" />;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white border border-gray-200">
                  {getInsightIcon(insight.title)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                  <p className="text-xs text-gray-500">{insight.description}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getTrendColor(insight.trend)}`}>
                {getTrendIcon(insight.trend)}
                <span>Trend</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{insight.value}</div>
              <div className="text-xs text-gray-500">Current Period</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span className="text-sm font-medium text-blue-900">Key Takeaway</span>
        </div>
        <p className="text-sm text-blue-800">
          Customer analytics show strong engagement with high-value customers driving significant revenue.
          Focus on retention strategies and personalized experiences to maximize lifetime value.
        </p>
      </div>
    </div>
  );
};

export default CustomerInsights;