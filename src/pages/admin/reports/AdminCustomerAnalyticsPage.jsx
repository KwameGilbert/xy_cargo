import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  MapPin,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  PieChart,
  BarChart3,
  UserCheck,
  Star,
  Clock,
  Target
} from 'lucide-react';
import FinancialKPIs from '../../../components/admin/reports/FinancialKPIs';
import ReportFilters from '../../../components/admin/reports/ReportFilters';
import ChartPlaceholder from '../../../components/admin/reports/ChartPlaceholder';
import DataExport from '../../../components/admin/reports/DataExport';
import ReportSummary from '../../../components/admin/reports/ReportSummary';
import CustomerKPIs from '../../../components/admin/reports/CustomerKPIs';
import CustomerInsights from '../../../components/admin/reports/CustomerInsights';

// Mock data for customer analytics
const mockCustomerData = {
  overview: {
    totalCustomers: 2847,
    activeCustomers: 2156,
    newCustomersThisMonth: 234,
    churnRate: 3.2,
    avgLifetimeValue: 12500,
    avgOrderValue: 450,
    totalRevenue: 2850000,
    repeatPurchaseRate: 68.5
  },
  demographics: {
    ageGroups: [
      { group: '18-25', count: 456, percentage: 16 },
      { group: '26-35', count: 892, percentage: 31 },
      { group: '36-45', count: 756, percentage: 27 },
      { group: '46-55', count: 423, percentage: 15 },
      { group: '55+', count: 320, percentage: 11 }
    ],
    locations: [
      { city: 'Lusaka', customers: 892, percentage: 31.3 },
      { city: 'Ndola', customers: 456, percentage: 16.0 },
      { city: 'Kitwe', customers: 423, percentage: 14.8 },
      { city: 'Chingola', customers: 234, percentage: 8.2 },
      { city: 'Mufulira', customers: 198, percentage: 6.9 },
      { city: 'Others', customers: 644, percentage: 22.8 }
    ]
  },
  behavior: {
    customerSegments: [
      { segment: 'High Value', customers: 234, avgSpend: 2500, percentage: 8.2 },
      { segment: 'Regular', customers: 1456, avgSpend: 850, percentage: 51.1 },
      { segment: 'Occasional', customers: 892, avgSpend: 320, percentage: 31.3 },
      { segment: 'One-time', customers: 265, avgSpend: 150, percentage: 9.3 }
    ],
    purchaseFrequency: [
      { frequency: 'Weekly', customers: 156, percentage: 5.5 },
      { frequency: 'Monthly', customers: 892, percentage: 31.3 },
      { frequency: 'Quarterly', customers: 1234, percentage: 43.3 },
      { frequency: 'Annually', customers: 565, percentage: 19.8 }
    ]
  },
  retention: {
    cohorts: [
      { month: 'Jan 2025', customers: 100, retained: 78, retentionRate: 78 },
      { month: 'Feb 2025', customers: 120, retained: 89, retentionRate: 74 },
      { month: 'Mar 2025', customers: 145, retained: 102, retentionRate: 70 },
      { month: 'Apr 2025', customers: 134, retained: 91, retentionRate: 68 },
      { month: 'May 2025', customers: 156, retained: 98, retentionRate: 63 }
    ]
  },
  satisfaction: {
    ratings: [
      { rating: 5, count: 1456, percentage: 51.1 },
      { rating: 4, count: 892, percentage: 31.3 },
      { rating: 3, count: 345, percentage: 12.1 },
      { rating: 2, count: 123, percentage: 4.3 },
      { rating: 1, count: 31, percentage: 1.1 }
    ],
    avgRating: 4.2,
    satisfactionScore: 84
  }
};

const AdminCustomerAnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState({ start: '2025-01-01', end: '2025-12-31' });
  const [isLoading, setIsLoading] = useState(false);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW'
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value}%`;
  };

  // Handle export functionality
  const handleExportReport = async (type) => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Exporting ${type} report...`);
    }, 2000);
  };

  // Calculate KPIs for overview
  const overviewKPIs = useMemo(() => [
    {
      title: 'Total Customers',
      value: mockCustomerData.overview.totalCustomers.toLocaleString(),
      change: 12.5,
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Customers',
      value: mockCustomerData.overview.activeCustomers.toLocaleString(),
      change: 8.3,
      changeType: 'positive',
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Avg Lifetime Value',
      value: formatCurrency(mockCustomerData.overview.avgLifetimeValue),
      change: -2.1,
      changeType: 'negative',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Churn Rate',
      value: formatPercentage(mockCustomerData.overview.churnRate),
      change: -0.8,
      changeType: 'positive',
      icon: TrendingDown,
      color: 'red'
    }
  ], []);

  // Tabs configuration
  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'demographics', name: 'Demographics', icon: Users },
    { id: 'behavior', name: 'Behavior', icon: Target },
    { id: 'retention', name: 'Retention', icon: UserCheck },
    { id: 'satisfaction', name: 'Satisfaction', icon: Star }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <CustomerKPIs kpis={overviewKPIs} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Customer Growth</h4>
          <ChartPlaceholder
            type="line"
            title="Monthly Customer Acquisition"
            subtitle="New customers joining each month"
            data={mockCustomerData.retention.cohorts}
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Revenue by Customer Segment</h4>
          <ChartPlaceholder
            type="bar"
            title="Revenue Distribution"
            subtitle="Revenue generated by different customer segments"
            data={mockCustomerData.behavior.customerSegments}
          />
        </div>
      </div>

      <CustomerInsights
        title="Customer Insights"
        insights={[
          {
            title: "High-Value Customers",
            value: `${mockCustomerData.behavior.customerSegments[0].customers} customers`,
            description: "Generate 40% of total revenue",
            trend: "up"
          },
          {
            title: "Repeat Purchase Rate",
            value: formatPercentage(mockCustomerData.overview.repeatPurchaseRate),
            description: "Customers who make multiple purchases",
            trend: "up"
          },
          {
            title: "Average Order Value",
            value: formatCurrency(mockCustomerData.overview.avgOrderValue),
            description: "Average spend per order",
            trend: "stable"
          },
          {
            title: "Customer Satisfaction",
            value: `${mockCustomerData.satisfaction.satisfactionScore}%`,
            description: "Based on recent feedback",
            trend: "up"
          }
        ]}
      />
    </div>
  );

  const renderDemographicsTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('demographics')}
        isExporting={isLoading}
        showReportType={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Age Distribution</h4>
          <div className="space-y-4">
            {mockCustomerData.demographics.ageGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{group.group} years</span>
                    <span className="text-sm text-gray-600">{group.count} customers</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${group.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{formatPercentage(group.percentage)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ChartPlaceholder
            type="pie"
            title="Age Demographics"
            subtitle="Customer distribution by age groups"
            data={mockCustomerData.demographics.ageGroups}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Geographic Distribution</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distribution</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCustomerData.demographics.locations.map((location, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{location.city}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.customers}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPercentage(location.percentage)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${location.percentage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBehaviorTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('behavior')}
        isExporting={isLoading}
        showReportType={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Customer Segments</h4>
          <div className="space-y-4">
            {mockCustomerData.behavior.customerSegments.map((segment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    segment.segment === 'High Value' ? 'bg-purple-500' :
                    segment.segment === 'Regular' ? 'bg-blue-500' :
                    segment.segment === 'Occasional' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{segment.segment}</div>
                    <div className="text-xs text-gray-500">{segment.customers} customers</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(segment.avgSpend)}</div>
                  <div className="text-xs text-gray-500">{formatPercentage(segment.percentage)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ChartPlaceholder
            type="bar"
            title="Segment Analysis"
            subtitle="Customer distribution and spending by segment"
            data={mockCustomerData.behavior.customerSegments}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Purchase Frequency</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockCustomerData.behavior.purchaseFrequency.map((freq, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{freq.customers}</div>
              <div className="text-sm text-gray-600">{freq.frequency}</div>
              <div className="text-xs text-gray-500 mt-1">{formatPercentage(freq.percentage)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRetentionTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('retention')}
        isExporting={isLoading}
        showReportType={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Cohort Analysis</h4>
          <div className="space-y-3">
            {mockCustomerData.retention.cohorts.map((cohort, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">{cohort.month}</div>
                  <div className="text-xs text-gray-500">{cohort.customers} new customers</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{cohort.retentionRate}%</div>
                  <div className="text-xs text-gray-500">{cohort.retained} retained</div>
                  <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                    <div
                      className="bg-green-600 h-1 rounded-full"
                      style={{ width: `${cohort.retentionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ChartPlaceholder
            type="line"
            title="Retention Trends"
            subtitle="Customer retention rates over time"
            data={mockCustomerData.retention.cohorts}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Retention Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">72%</div>
            <div className="text-sm text-gray-600">3-Month Retention</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">68%</div>
            <div className="text-sm text-gray-600">6-Month Retention</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">45%</div>
            <div className="text-sm text-gray-600">12-Month Retention</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSatisfactionTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('satisfaction')}
        isExporting={isLoading}
        showReportType={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Rating Distribution</h4>
          <div className="space-y-4">
            {mockCustomerData.satisfaction.ratings.map((rating, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{rating.rating} stars</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{rating.count}</div>
                  <div className="text-xs text-gray-500">{formatPercentage(rating.percentage)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ChartPlaceholder
            type="pie"
            title="Satisfaction Ratings"
            subtitle="Customer satisfaction distribution"
            data={mockCustomerData.satisfaction.ratings}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Overall Satisfaction</h4>
          <div className="text-center">
            <div className="text-6xl font-bold text-yellow-500 mb-2">
              {mockCustomerData.satisfaction.avgRating}
            </div>
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(mockCustomerData.satisfaction.avgRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">Average rating from {mockCustomerData.overview.totalCustomers.toLocaleString()} reviews</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Satisfaction Score</h4>
          <div className="text-center">
            <div className="text-6xl font-bold text-green-600 mb-2">
              {mockCustomerData.satisfaction.satisfactionScore}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-green-600 h-3 rounded-full"
                style={{ width: `${mockCustomerData.satisfaction.satisfactionScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">Customer Satisfaction Score</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive customer behavior and insights</p>
          </div>
          <div className="flex gap-3">
            <DataExport
              onExportCSV={() => handleExportReport('customers-csv')}
              onExportExcel={() => handleExportReport('customers-excel')}
              onExportPDF={() => handleExportReport('customers-pdf')}
              isExporting={isLoading}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'demographics' && renderDemographicsTab()}
            {activeTab === 'behavior' && renderBehaviorTab()}
            {activeTab === 'retention' && renderRetentionTab()}
            {activeTab === 'satisfaction' && renderSatisfactionTab()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomerAnalyticsPage;