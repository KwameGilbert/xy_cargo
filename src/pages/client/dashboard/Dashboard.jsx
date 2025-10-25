import { useEffect, useState } from "react";
import axios from "axios";
import ClientLayout from "../../../components/client/layout/ClientLayout";
import DashboardMetric from "../../../components/client/dashboard/DashboardMetric";
import ShipmentTable from "../../../components/client/dashboard/ShipmentTable";
import QuickActions from "../../../components/client/dashboard/QuickActions";
import Notifications from "../../../components/client/dashboard/Notifications";
import { getAuthHeader, getApiBaseUrl } from "../../../services/client/authService";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Call the real API endpoint
        const response = await axios.get(`${getApiBaseUrl()}/clients/dashboard/data`, {
          headers: getAuthHeader()
        });

        console.log('Fetched dashboard data:', response.data);
        setDashboardData(response.data.data);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // TODO: Handle authentication errors (redirect to login)
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || !dashboardData) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </ClientLayout>
    );
  }

  // Convert metrics object to an array for mapping
  const metrics = dashboardData.metrics ? Object.values(dashboardData.metrics) : [];

  return (
    <ClientLayout>
      <div className="p-2 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="text-gray-600 mt-1">{dashboardData.welcomeMessage}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          {metrics.map((metric, idx) => (
            <DashboardMetric
              key={idx}
              count={metric.count}
              icon={metric.icon}
              label={metric.label}
              currency={metric.currency}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ShipmentTable shipments={dashboardData.recentParcels} />
          </div>
          <div>
            <QuickActions />
            <Notifications notifications={dashboardData.notifications} />
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Dashboard;
