import React from 'react';
import { Calendar, Filter, Download, RefreshCw } from 'lucide-react';

const ReportFilters = ({
  dateRange,
  setDateRange,
  reportType,
  setReportType,
  onExport,
  isExporting = false,
  showReportType = true,
  showDateRange = true
}) => {
  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 days' },
    { value: 'last30days', label: 'Last 30 days' },
    { value: 'last3months', label: 'Last 3 months' },
    { value: 'last6months', label: 'Last 6 months' },
    { value: 'lastyear', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const reportTypeOptions = [
    { value: 'all', label: 'All Reports' },
    { value: 'revenue', label: 'Revenue Only' },
    { value: 'expenses', label: 'Expenses Only' },
    { value: 'payments', label: 'Payments Only' },
    { value: 'agents', label: 'Agent Performance' },
    { value: 'customers', label: 'Customer Analytics' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {showDateRange && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {showReportType && (
            <div className="flex items-center gap-2">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
              >
                {reportTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {onExport && (
            <button
              onClick={onExport}
              disabled={isExporting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 min-w-[120px] justify-center"
            >
              {isExporting ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isExporting ? 'Exporting...' : 'Export'}
            </button>
          )}
        </div>
      </div>

      {/* Custom date range inputs (shown when custom is selected) */}
      {dateRange === 'custom' && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportFilters;