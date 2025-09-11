import { useEffect, useState } from "react";
import axios from "axios";
import ClientLayout from "../../../components/client/layout/ClientLayout";
import DashboardMetric from "../../../components/client/dashboard/DashboardMetric";
import ShipmentTable from "../../../components/client/dashboard/ShipmentTable";
import QuickActions from "../../../components/client/dashboard/QuickActions";
import Notifications from "../../../components/client/dashboard/Notifications";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In production, this would be your API endpoint
        const response = await axios.get('/src/data/dashboard.json');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="p-2 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="text-gray-600 mt-1">{dashboardData.welcomeMessage}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          {Object.entries(dashboardData.metrics).map(([key, metric]) => (
            <DashboardMetric
              key={key}
              count={metric.count}
              icon={metric.icon}
              label={metric.label}
              currency={metric.currency}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ShipmentTable shipments={dashboardData.recentShipments} />
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
