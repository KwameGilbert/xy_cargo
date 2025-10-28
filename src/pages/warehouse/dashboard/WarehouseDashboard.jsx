import React, { useState, useEffect } from 'react';
import KPICards from '../../../components/warehouse/dashboard/KPICards';
import ChartsSection from '../../../components/warehouse/dashboard/ChartsSection';
import RecentActivityFeed from '../../../components/warehouse/dashboard/RecentActivityFeed';
import QuickLinks from '../../../components/warehouse/dashboard/QuickLinks';
import NotificationsPanel from '../../../components/warehouse/dashboard/NotificationsPanel';
import SearchFilters from '../../../components/warehouse/dashboard/SearchFilters';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';
import { getDashboardData } from '../../../services/warehouse/dashboardService';

const WarehouseDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getDashboardData();

        if (response.success) {
          setDashboardData(response.data);
        } else {
          throw new Error(response.message || 'Failed to load dashboard data');
        }
      } catch (err) {
        setError('Network error occurred while loading dashboard data');
        // Fallback to mock data if API fails
        setDashboardData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Implement search logic here
    console.log('Searching for:', term);
  };

  const handleFilter = (filterData) => {
    setFilters(filterData);
    // Implement filter logic here
    console.log('Filters applied:', filterData);
  };

  // Show loading state
  if (loading) {
    return (
      <WarehouseLayout>
        <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </WarehouseLayout>
    );
  }

  // Show error state
  if (error && !dashboardData) {
    return (
      <WarehouseLayout>
        <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </WarehouseLayout>
    );
  }

  // Use dashboard data or fallback to mock data
  const data = dashboardData || mockData;

  return (
    <WarehouseLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Warehouse Dashboard</h1>
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                Using offline data. {error}
              </p>
            </div>
          )}
        </div>

        {/* <SearchFilters onSearch={handleSearch} onFilter={handleFilter} /> */}

        <KPICards kpiData={data.kpiData} />

        <QuickLinks />

        <ChartsSection
          parcelIntakeTrend={data.parcelIntakeTrend}
          shipmentStatusDistribution={data.shipmentStatusDistribution}
          paymentsSummary={data.paymentsSummary}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <RecentActivityFeed activities={data.recentActivities} />
          <NotificationsPanel notifications={data.notifications} />
        </div>
      </div>
    </WarehouseLayout>
  );
};

export default WarehouseDashboard;