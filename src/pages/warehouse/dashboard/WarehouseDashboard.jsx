import React, { useState } from 'react';
import KPICards from '../../../components/warehouse/dashboard/KPICards';
import ChartsSection from '../../../components/warehouse/dashboard/ChartsSection';
import RecentActivityFeed from '../../../components/warehouse/dashboard/RecentActivityFeed';
import QuickLinks from '../../../components/warehouse/dashboard/QuickLinks';
import NotificationsPanel from '../../../components/warehouse/dashboard/NotificationsPanel';
import SearchFilters from '../../../components/warehouse/dashboard/SearchFilters';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';

// Mock data
const mockData = {
  kpiData: {
    parcelsReceivedToday: 45,
    pendingShipments: 12,
    unpaidParcels: 8,
    claimsOpened: 3,
    totalWeightReceivedToday: 125.5,
    specialPackagingRequests: 5,
  },
  parcelIntakeTrend: [
    { date: '2023-09-19', count: 32 },
    { date: '2023-09-20', count: 28 },
    { date: '2023-09-21', count: 41 },
    { date: '2023-09-22', count: 35 },
    { date: '2023-09-23', count: 52 },
    { date: '2023-09-24', count: 38 },
    { date: '2023-09-25', count: 45 },
  ],
  shipmentStatusDistribution: [
    { name: 'Received', count: 120 },
    { name: 'In Transit', count: 85 },
    { name: 'At Destination', count: 60 },
    { name: 'Delivered', count: 200 },
  ],
  paymentsSummary: [
    { period: 'Mon', paid: 15, unpaid: 5 },
    { period: 'Tue', paid: 18, unpaid: 3 },
    { period: 'Wed', paid: 12, unpaid: 7 },
    { period: 'Thu', paid: 22, unpaid: 4 },
    { period: 'Fri', paid: 19, unpaid: 6 },
    { period: 'Sat', paid: 8, unpaid: 2 },
    { period: 'Sun', paid: 6, unpaid: 1 },
  ],
  recentActivities: [
    {
      id: 1,
      type: 'parcel_logged',
      message: 'New parcel logged for John Doe - Waybill: WB123456',
      timestamp: '2 minutes ago',
      link: '/parcels/WB123456',
    },
    {
      id: 2,
      type: 'payment_received',
      message: 'Payment received for parcel WB123455',
      timestamp: '15 minutes ago',
      link: '/payments/WB123455',
    },
    {
      id: 3,
      type: 'shipment_created',
      message: 'Shipment SH001 created and departed',
      timestamp: '1 hour ago',
      link: '/shipments/SH001',
    },
    {
      id: 4,
      type: 'claim_opened',
      message: 'Claim opened for damaged parcel WB123450',
      timestamp: '2 hours ago',
      link: '/claims/CL001',
    },
  ],
  notifications: [
    {
      id: 1,
      message: '5 parcels unpaid for more than 7 days',
      type: 'urgent',
      timestamp: 'Just now',
    },
    {
      id: 2,
      message: 'Shipment SH002 scheduled to depart today',
      type: 'warning',
      timestamp: '1 hour ago',
    },
    {
      id: 3,
      message: '3 special packaging requests pending',
      type: 'warning',
      timestamp: '3 hours ago',
    },
  ],
};

const WarehouseDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

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

  return (
    <WarehouseLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Warehouse Dashboard</h1>

        <SearchFilters onSearch={handleSearch} onFilter={handleFilter} />

        <KPICards kpiData={mockData.kpiData} />

        <QuickLinks />

        <ChartsSection
          parcelIntakeTrend={mockData.parcelIntakeTrend}
          shipmentStatusDistribution={mockData.shipmentStatusDistribution}
          paymentsSummary={mockData.paymentsSummary}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <RecentActivityFeed activities={mockData.recentActivities} />
          <NotificationsPanel notifications={mockData.notifications} />
        </div>
      </div>
    </WarehouseLayout>
  );
};

export default WarehouseDashboard;