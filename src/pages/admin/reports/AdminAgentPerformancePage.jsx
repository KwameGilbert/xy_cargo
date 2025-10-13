import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Target,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  PieChart,
  BarChart3,
  UserCheck,
  Award,
  Clock,
  Star,
  Activity
} from 'lucide-react';
import FinancialKPIs from '../../../components/admin/reports/FinancialKPIs';
import ReportFilters from '../../../components/admin/reports/ReportFilters';
import ChartPlaceholder from '../../../components/admin/reports/ChartPlaceholder';
import DataExport from '../../../components/admin/reports/DataExport';
import CustomerInsights from '../../../components/admin/reports/CustomerInsights';

// Mock data for agent performance
const mockAgentData = {
  overview: {
    totalAgents: 45,
    activeAgents: 38,
    topPerformers: 12,
    avgCommissionPerAgent: 8500,
    totalCommissionsPaid: 382500,
    avgParcelsPerAgent: 156,
    totalParcelsHandled: 7020,
    performanceScore: 84.5
  },
  performance: {
    topAgents: [
      { name: 'John Mwanza', commission: 25000, parcels: 320, rating: 4.8, region: 'Lusaka' },
      { name: 'Mary Banda', commission: 22800, parcels: 298, rating: 4.7, region: 'Ndola' },
      { name: 'David Zulu', commission: 21500, parcels: 275, rating: 4.9, region: 'Kitwe' },
      { name: 'Grace Phiri', commission: 19800, parcels: 245, rating: 4.6, region: 'Chingola' },
      { name: 'Peter Mbewe', commission: 18500, parcels: 230, rating: 4.5, region: 'Mufulira' }
    ],
    performanceMetrics: [
      { metric: 'Commission Target Achievement', value: 92, target: 100, status: 'excellent' },
      { metric: 'Parcel Delivery Rate', value: 96.8, target: 95, status: 'excellent' },
      { metric: 'Customer Satisfaction', value: 4.6, target: 4.5, status: 'good' },
      { metric: 'Response Time', value: 2.3, target: 3, status: 'excellent' }
    ]
  },
  regions: {
    performance: [
      { region: 'Lusaka', agents: 15, avgCommission: 9200, avgParcels: 180, performance: 88 },
      { region: 'Ndola', agents: 12, avgCommission: 8800, avgParcels: 165, performance: 85 },
      { region: 'Kitwe', agents: 8, avgCommission: 8200, avgParcels: 155, performance: 82 },
      { region: 'Chingola', agents: 6, avgCommission: 7800, avgParcels: 145, performance: 79 },
      { region: 'Mufulira', agents: 4, avgCommission: 7500, avgParcels: 140, performance: 76 }
    ]
  },
  trends: {
    monthly: [
      { month: 'Jan 2025', commissions: 28500, parcels: 520, newAgents: 3 },
      { month: 'Feb 2025', commissions: 31200, parcels: 580, newAgents: 2 },
      { month: 'Mar 2025', commissions: 29800, parcels: 550, newAgents: 1 },
      { month: 'Apr 2025', commissions: 33500, parcels: 620, newAgents: 4 },
      { month: 'May 2025', commissions: 35200, parcels: 650, newAgents: 2 }
    ]
  },
  rankings: {
    byCommission: [
      { rank: 1, name: 'John Mwanza', commission: 25000, change: '+5%' },
      { rank: 2, name: 'Mary Banda', commission: 22800, change: '+8%' },
      { rank: 3, name: 'David Zulu', commission: 21500, change: '+3%' },
      { rank: 4, name: 'Grace Phiri', commission: 19800, change: '+12%' },
      { rank: 5, name: 'Peter Mbewe', commission: 18500, change: '+6%' }
    ],
    byParcels: [
      { rank: 1, name: 'John Mwanza', parcels: 320, change: '+7%' },
      { rank: 2, name: 'Mary Banda', parcels: 298, change: '+4%' },
      { rank: 3, name: 'David Zulu', parcels: 275, change: '+9%' },
      { rank: 4, name: 'Grace Phiri', parcels: 245, change: '+11%' },
      { rank: 5, name: 'Peter Mbewe', parcels: 230, change: '+8%' }
    ]
  }
};

const AdminAgentPerformancePage = () => {
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
      title: 'Total Agents',
      value: mockAgentData.overview.totalAgents.toString(),
      change: 8.5,
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Agents',
      value: mockAgentData.overview.activeAgents.toString(),
      change: 6.2,
      changeType: 'positive',
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Avg Commission',
      value: formatCurrency(mockAgentData.overview.avgCommissionPerAgent),
      change: 12.3,
      changeType: 'positive',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Performance Score',
      value: formatPercentage(mockAgentData.overview.performanceScore),
      change: 2.1,
      changeType: 'positive',
      icon: Award,
      color: 'yellow'
    }
  ], []);

  // Tabs configuration
  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'performance', name: 'Performance', icon: Target },
    { id: 'regions', name: 'Regions', icon: Activity },
    { id: 'rankings', name: 'Rankings', icon: Award }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {overviewKPIs.map((kpi, index) => {
          const Icon = kpi.icon;
          const isPositive = kpi.changeType === 'positive';

          return (
            <div
              key={index}
              className={`p-6 rounded-lg border ${
                kpi.color === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                kpi.color === 'green' ? 'bg-green-50 text-green-700 border-green-200' :
                kpi.color === 'purple' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                'bg-yellow-50 text-yellow-700 border-yellow-200'
              } transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{kpi.value}</p>
                  <div className="flex items-center gap-1">
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}%
                    </span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${
                  kpi.color === 'blue' ? 'bg-blue-100' :
                  kpi.color === 'green' ? 'bg-green-100' :
                  kpi.color === 'purple' ? 'bg-purple-100' :
                  'bg-yellow-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    kpi.color === 'blue' ? 'text-blue-600' :
                    kpi.color === 'green' ? 'text-green-600' :
                    kpi.color === 'purple' ? 'text-purple-600' :
                    'text-yellow-600'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Monthly Performance Trends</h4>
          <ChartPlaceholder
            type="line"
            title="Commission & Parcel Trends"
            subtitle="Monthly performance metrics over time"
            data={mockAgentData.trends.monthly}
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Performance Metrics</h4>
          <div className="space-y-4">
            {mockAgentData.performance.performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{metric.metric}</span>
                    <span className="text-sm text-gray-600">
                      {typeof metric.value === 'number' && metric.value < 10 ? metric.value : formatPercentage(metric.value)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metric.status === 'excellent' ? 'bg-green-600' :
                        metric.status === 'good' ? 'bg-blue-600' : 'bg-yellow-600'
                      }`}
                      style={{ width: `${(metric.value / metric.target) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Target: {metric.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CustomerInsights
        title="Agent Performance Insights"
        insights={[
          {
            title: "Top Performers",
            value: `${mockAgentData.overview.topPerformers} agents`,
            description: "Exceeding performance targets",
            trend: "up"
          },
          {
            title: "Commission Growth",
            value: "+12.3%",
            description: "Average commission increase",
            trend: "up"
          },
          {
            title: "Parcel Efficiency",
            value: formatPercentage(96.8),
            description: "Successful delivery rate",
            trend: "up"
          },
          {
            title: "Agent Satisfaction",
            value: "4.6/5",
            description: "Average performance rating",
            trend: "stable"
          }
        ]}
      />
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('performance')}
        isExporting={isLoading}
        showReportType={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Top Performing Agents</h4>
          <div className="space-y-4">
            {mockAgentData.performance.topAgents.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold text-sm">
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                    <div className="text-xs text-gray-500">{agent.region} • {agent.parcels} parcels</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(agent.commission)}</div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-500">{agent.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ChartPlaceholder
            type="bar"
            title="Agent Performance Distribution"
            subtitle="Commission earnings by top agents"
            data={mockAgentData.performance.topAgents}
          />
        </div>
      </div>
    </div>
  );

  const renderRegionsTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('regions')}
        isExporting={isLoading}
        showReportType={false}
      />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Regional Performance</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Commission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Parcels</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockAgentData.regions.performance.map((region, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Activity className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{region.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{region.agents}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(region.avgCommission)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{region.avgParcels}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            region.performance >= 85 ? 'bg-green-600' :
                            region.performance >= 80 ? 'bg-blue-600' : 'bg-yellow-600'
                          }`}
                          style={{ width: `${region.performance}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{region.performance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      region.performance >= 85 ? 'bg-green-100 text-green-800' :
                      region.performance >= 80 ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {region.performance >= 85 ? 'Excellent' :
                       region.performance >= 80 ? 'Good' : 'Average'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRankingsTab = () => (
    <div className="space-y-6">
      <ReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        onExport={() => handleExportReport('rankings')}
        isExporting={isLoading}
        showReportType={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Commission Rankings</h4>
          <div className="space-y-3">
            {mockAgentData.rankings.byCommission.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    agent.rank === 1 ? 'bg-yellow-500 text-white' :
                    agent.rank === 2 ? 'bg-gray-400 text-white' :
                    agent.rank === 3 ? 'bg-orange-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {agent.rank}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                    <div className="text-xs text-green-600">{agent.change}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{formatCurrency(agent.commission)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Parcel Volume Rankings</h4>
          <div className="space-y-3">
            {mockAgentData.rankings.byParcels.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    agent.rank === 1 ? 'bg-yellow-500 text-white' :
                    agent.rank === 2 ? 'bg-gray-400 text-white' :
                    agent.rank === 3 ? 'bg-orange-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {agent.rank}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                    <div className="text-xs text-green-600">{agent.change}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{agent.parcels} parcels</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Performance Leaderboard</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
            <div className="text-2xl mb-2">🥇</div>
            <div className="font-semibold text-gray-900">John Mwanza</div>
            <div className="text-sm text-gray-600">Commission Leader</div>
            <div className="text-lg font-bold text-yellow-600 mt-1">{formatCurrency(25000)}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
            <div className="text-2xl mb-2">🥈</div>
            <div className="font-semibold text-gray-900">Mary Banda</div>
            <div className="text-sm text-gray-600">Parcel Volume Leader</div>
            <div className="text-lg font-bold text-gray-600 mt-1">298 parcels</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <div className="text-2xl mb-2">🥉</div>
            <div className="font-semibold text-gray-900">David Zulu</div>
            <div className="text-sm text-gray-600">Rating Leader</div>
            <div className="text-lg font-bold text-orange-600 mt-1">4.9 ⭐</div>
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
            <h1 className="text-2xl font-bold text-gray-900">Agent Performance</h1>
            <p className="text-gray-600 mt-1">Comprehensive agent performance analytics and insights</p>
          </div>
          <div className="flex gap-3">
            <DataExport
              onExportCSV={() => handleExportReport('agents-csv')}
              onExportExcel={() => handleExportReport('agents-excel')}
              onExportPDF={() => handleExportReport('agents-pdf')}
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
            {activeTab === 'performance' && renderPerformanceTab()}
            {activeTab === 'regions' && renderRegionsTab()}
            {activeTab === 'rankings' && renderRankingsTab()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAgentPerformancePage;