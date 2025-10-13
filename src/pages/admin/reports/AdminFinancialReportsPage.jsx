import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  CreditCard,
  Users,
  Package,
  Eye,
  FileText,
  RefreshCw,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import FinancialKPIs from '../../../components/admin/reports/FinancialKPIs';
import ReportFilters from '../../../components/admin/reports/ReportFilters';
import ChartPlaceholder from '../../../components/admin/reports/ChartPlaceholder';
import DataExport from '../../../components/admin/reports/DataExport';
import ReportSummary from '../../../components/admin/reports/ReportSummary';

// Mock data for financial reports
const mockFinancialData = {
  revenue: {
    total: 2456789.50,
    monthly: [
      { month: 'Jan', amount: 185000, growth: 12.5 },
      { month: 'Feb', amount: 192000, growth: 3.8 },
      { month: 'Mar', amount: 210000, growth: 9.4 },
      { month: 'Apr', amount: 225000, growth: 7.1 },
      { month: 'May', amount: 238000, growth: 5.8 },
      { month: 'Jun', amount: 252000, growth: 5.9 },
      { month: 'Jul', amount: 268000, growth: 6.3 },
      { month: 'Aug', amount: 275000, growth: 2.6 },
      { month: 'Sep', amount: 289000, growth: 5.1 },
      { month: 'Oct', amount: 295000, growth: 2.1 },
      { month: 'Nov', amount: 312000, growth: 5.8 },
      { month: 'Dec', amount: 328000, growth: 5.1 }
    ]
  },
  expenses: {
    total: 1854321.75,
    categories: [
      { name: 'Operations', amount: 892000, percentage: 48.1 },
      { name: 'Staff Salaries', amount: 456000, percentage: 24.6 },
      { name: 'Marketing', amount: 123000, percentage: 6.6 },
      { name: 'Technology', amount: 156000, percentage: 8.4 },
      { name: 'Facilities', amount: 98000, percentage: 5.3 },
      { name: 'Insurance', amount: 78000, percentage: 4.2 },
      { name: 'Miscellaneous', amount: 52321.75, percentage: 2.8 }
    ]
  },
  payments: {
    methods: [
      { method: 'Credit Card', amount: 1250000, count: 8500, percentage: 50.8 },
      { method: 'Bank Transfer', amount: 650000, count: 3200, percentage: 26.5 },
      { method: 'Cash', amount: 280000, count: 1800, percentage: 11.4 },
      { method: 'PayPal', amount: 195000, count: 1200, percentage: 7.9 },
      { method: 'Mobile Money', amount: 81500, count: 650, percentage: 3.3 }
    ],
    status: [
      { status: 'Completed', amount: 2150000, count: 14200, percentage: 87.5 },
      { status: 'Pending', amount: 245000, count: 1800, percentage: 10.0 },
      { status: 'Failed', amount: 65000, count: 350, percentage: 2.5 }
    ]
  },
  agents: {
    commissions: [
      { agent: 'John Smith', totalCommission: 45000, parcels: 1250, avgCommission: 36 },
      { agent: 'Sarah Johnson', totalCommission: 38500, parcels: 980, avgCommission: 39.3 },
      { agent: 'Mike Davis', totalCommission: 32100, parcels: 850, avgCommission: 37.8 },
      { agent: 'Emma Wilson', totalCommission: 29800, parcels: 720, avgCommission: 41.4 },
      { agent: 'David Brown', totalCommission: 27500, parcels: 650, avgCommission: 42.3 }
    ]
  },
  customers: {
    topSpenders: [
      { name: 'ABC Corp', totalSpent: 125000, parcels: 450, avgOrder: 277.8 },
      { name: 'XYZ Ltd', totalSpent: 98000, parcels: 320, avgOrder: 306.3 },
      { name: 'Tech Solutions', totalSpent: 87500, parcels: 280, avgOrder: 312.5 },
      { name: 'Global Trade', totalSpent: 76500, parcels: 245, avgOrder: 312.2 },
      { name: 'Import Export Co', totalSpent: 68900, parcels: 210, avgOrder: 328.1 }
    ]
  }
};

const AdminFinancialReportsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('last30days');
  const [reportType, setReportType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'revenue', name: 'Revenue', icon: TrendingUp },
    { id: 'expenses', name: 'Expenses', icon: TrendingDown },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'agents', name: 'Agent Performance', icon: Users },
    { id: 'customers', name: 'Customer Analytics', icon: Package }
  ];

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
    return mockFinancialData.revenue.total - mockFinancialData.expenses.total;
  };

  const calculateProfitMargin = () => {
    return (calculateProfit() / mockFinancialData.revenue.total) * 100;
  };

  const handleExportReport = (type) => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would trigger a file download
      console.log(`Exporting ${type} report...`);
    }, 2000);
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <FinancialKPIs data={mockFinancialData} />

      {/* Report Summary */}
      <ReportSummary data={mockFinancialData} period="last month" />

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          <div className="flex items-center gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="last3months">Last 3 months</option>
              <option value="last6months">Last 6 months</option>
              <option value="lastyear">Last year</option>
            </select>
          </div>
        </div>
        <ChartPlaceholder
          type="line"
          title="Revenue Trend Chart"
          subtitle="Monthly revenue growth over time"
          data={mockFinancialData.revenue.monthly}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-3">Payment Methods</h4>
          <div className="space-y-2">
            {mockFinancialData.payments.methods.slice(0, 3).map((method, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-900">{method.method}</span>
                <span className="text-sm font-medium text-gray-900">{formatPercentage(method.percentage)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-3">Top Agents</h4>
          <div className="space-y-2">
            {mockFinancialData.agents.commissions.slice(0, 3).map((agent, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-900">{agent.agent.split(' ')[0]}</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(agent.totalCommission)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-3">Top Customers</h4>
          <div className="space-y-2">
            {mockFinancialData.customers.topSpenders.slice(0, 3).map((customer, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-900">{customer.name.split(' ')[0]}</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(customer.totalSpent)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRevenueTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        reportType={reportType}
        setReportType={setReportType}
        onExport={() => handleExportReport('revenue')}
        isExporting={isLoading}
        showReportType={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Monthly Revenue</h4>
          <div className="space-y-3">
            {mockFinancialData.revenue.monthly.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">{month.month}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(month.amount)}</span>
                </div>
                <div className={`text-sm font-medium ${month.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {month.growth > 0 ? '+' : ''}{month.growth}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ChartPlaceholder
            type="line"
            title="Revenue by Service Type"
            subtitle="Breakdown of revenue by different service categories"
            data={mockFinancialData.revenue.monthly}
          />
        </div>
      </div>
    </div>
  );

  const renderExpensesTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('expenses')}
        isExporting={isLoading}
        showReportType={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Expense Categories</h4>
          <div className="space-y-4">
            {mockFinancialData.expenses.categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-600">{formatCurrency(category.amount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{formatPercentage(category.percentage)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ChartPlaceholder
            type="bar"
            title="Expense Trend"
            subtitle="Monthly expense comparison and trends"
            data={mockFinancialData.expenses.categories}
          />
        </div>
      </div>
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('payments')}
        isExporting={isLoading}
        showReportType={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Payment Methods</h4>
          <div className="space-y-4">
            {mockFinancialData.payments.methods.map((method, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{method.method}</span>
                    <div className="text-xs text-gray-500">{method.count} transactions</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(method.amount)}</div>
                  <div className="text-xs text-gray-500">{formatPercentage(method.percentage)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ChartPlaceholder
            type="pie"
            title="Payment Distribution"
            subtitle="Payment methods usage breakdown"
            data={mockFinancialData.payments.methods}
          />
        </div>
      </div>
    </div>
  );

  const renderAgentsTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('agents')}
        isExporting={isLoading}
        showReportType={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Top Performing Agents</h4>
          <div className="space-y-4">
            {mockFinancialData.agents.commissions.slice(0, 5).map((agent, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">
                      {agent.agent.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{agent.agent}</span>
                    <div className="text-xs text-gray-500">{agent.parcels} parcels</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(agent.totalCommission)}</div>
                  <div className="text-xs text-gray-500">Avg: {formatCurrency(agent.avgCommission)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ChartPlaceholder
            type="bar"
            title="Agent Performance"
            subtitle="Commission earnings by agent"
            data={mockFinancialData.agents.commissions}
          />
        </div>
      </div>
    </div>
  );

  const renderCustomersTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('customers')}
        isExporting={isLoading}
        showReportType={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Top Customers</h4>
          <div className="space-y-4">
            {mockFinancialData.customers.topSpenders.slice(0, 5).map((customer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-green-600">
                      {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                    <div className="text-xs text-gray-500">{customer.parcels} parcels</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(customer.totalSpent)}</div>
                  <div className="text-xs text-gray-500">Avg: {formatCurrency(customer.avgOrder)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ChartPlaceholder
            type="bar"
            title="Customer Revenue"
            subtitle="Revenue generated by top customers"
            data={mockFinancialData.customers.topSpenders}
          />
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
            <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
            <p className="text-gray-600 mt-1">Comprehensive financial analytics and reporting</p>
          </div>
          <div className="flex gap-3">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Reports</option>
              <option value="revenue">Revenue Only</option>
              <option value="expenses">Expenses Only</option>
              <option value="payments">Payments Only</option>
            </select>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </button>
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
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'revenue' && renderRevenueTab()}
          {activeTab === 'expenses' && renderExpensesTab()}
          {activeTab === 'payments' && renderPaymentsTab()}
          {activeTab === 'agents' && renderAgentsTab()}
          {activeTab === 'customers' && renderCustomersTab()}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFinancialReportsPage;