import React from 'react';
import { BarChart3, LineChart, PieChart, TrendingUp, AlertCircle } from 'lucide-react';

const ChartPlaceholder = ({
  type = 'bar',
  title,
  subtitle,
  height = 'h-64',
  data = null,
  loading = false,
  error = null
}) => {
  const getChartIcon = () => {
    switch (type) {
      case 'line':
        return <LineChart className="h-12 w-12 text-gray-400" />;
      case 'pie':
        return <PieChart className="h-12 w-12 text-gray-400" />;
      case 'area':
        return <TrendingUp className="h-12 w-12 text-gray-400" />;
      default:
        return <BarChart3 className="h-12 w-12 text-gray-400" />;
    }
  };

  const getChartDescription = () => {
    switch (type) {
      case 'line':
        return 'Line chart showing trends over time';
      case 'pie':
        return 'Pie chart showing proportional data';
      case 'area':
        return 'Area chart showing cumulative trends';
      default:
        return 'Bar chart showing comparative data';
    }
  };

  if (error) {
    return (
      <div className={`${height} bg-red-50 border border-red-200 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-2" />
          <p className="text-red-600 font-medium">Error loading chart</p>
          <p className="text-sm text-red-500 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${height} bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${height} bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center`}>
      <div className="text-center">
        {getChartIcon()}
        <p className="text-gray-500 font-medium mt-2">
          {title || `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {subtitle || getChartDescription()}
        </p>
        {data && (
          <p className="text-xs text-gray-400 mt-2">
            {Array.isArray(data) ? `${data.length} data points` : 'Data available'}
          </p>
        )}
        <div className="mt-3 text-xs text-gray-400">
          <p>Integration with charting library needed</p>
          <p>(e.g., Chart.js, Recharts, or D3.js)</p>
        </div>
      </div>
    </div>
  );
};

export default ChartPlaceholder;