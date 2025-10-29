import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ParcelFilters from '../../../components/warehouse/parcels/ParcelFilters';
import ParcelTable from '../../../components/warehouse/parcels/ParcelTable';
import { ParcelCardList } from '../../../components/warehouse/parcels/ParcelCard';
import { getAllParcels } from '../../../services/warehouse/parcelService';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';

const WarehouseParcelsPage = () => {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [filteredParcels, setFilteredParcels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    paymentStatus: 'all'
  });
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load parcels data from API
  useEffect(() => {
    const loadParcels = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getAllParcels();
        if (result.success) {
          setParcels(result.data);
          setFilteredParcels(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to load parcels data');
      } finally {
        setLoading(false);
      }
    };

    loadParcels();
  }, []);

  // ---------- Filtering Logic ----------
  const applyFilters = (term, filterOptions, dates, sort) => {
    let result = [...parcels];

    // Search
    if (term) {
      const lowerTerm = term.toLowerCase();
      result = result.filter(parcel =>
        parcel.id?.toLowerCase().includes(lowerTerm) ||
        parcel.trackingNumber?.toLowerCase().includes(lowerTerm) ||
        parcel.customerName?.toLowerCase().includes(lowerTerm) ||
        parcel.customerContact?.toLowerCase().includes(lowerTerm)
      );
    }

    // Status
    if (filterOptions.status !== 'all') {
      result = result.filter(parcel => parcel.status === filterOptions.status);
    }

    // Payment status
    if (filterOptions.paymentStatus !== 'all') {
      result = result.filter(parcel => parcel.paymentStatus === filterOptions.paymentStatus);
    }

    // Date range
    if (dates.startDate && dates.endDate) {
      const startDate = new Date(dates.startDate);
      const endDate = new Date(dates.endDate);
      result = result.filter(parcel => {
        const parcelDate = new Date(parcel.dateCreated);
        return parcelDate >= startDate && parcelDate <= endDate;
      });
    }

    // Sorting
    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
        break;
      case 'weight':
        result.sort((a, b) => (b.totalWeight || 0) - (a.totalWeight || 0));
        break;
      case 'value':
        result.sort((a, b) => {
          const valueA = parseFloat((a.declaredValue || '0').replace(/[^0-9.-]+/g, ''));
          const valueB = parseFloat((b.declaredValue || '0').replace(/[^0-9.-]+/g, ''));
          return valueB - valueA;
        });
        break;
      case 'priority':
        const statusOrder = { 'Pending': 0, 'In Transit': 1, 'Delivered': 2 };
        result.sort((a, b) => (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99));
        break;
      default:
        break;
    }

    setFilteredParcels(result);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters(term, filters, dateRange, sortBy);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    applyFilters(searchTerm, newFilters, dateRange, sortBy);
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    applyFilters(searchTerm, filters, newDateRange, sortBy);
  };

  const handleSort = (newSortBy) => {
    setSortBy(newSortBy);
    applyFilters(searchTerm, filters, dateRange, newSortBy);
  };

  // ---------- Selection & Actions ----------
  const handleViewParcel = (id) => navigate(`/warehouse/parcels/${id}`);
  const handleEditParcel = (id) => navigate(`/warehouse/parcels/${id}/edit`);
  const handlePrintLabel = (id) => console.log('Printing label', id);
  const handleMarkShipped = (id) => console.log('Marking shipped', id);

  // ---------- KPI Data ----------
  const todayStr = new Date().toDateString();
  const kpiData = {
    totalParcelsToday: parcels.filter(p => new Date(p.dateCreated).toDateString() === todayStr).length,
    inWarehouse: parcels.filter(p => p.status === 'Pending').length,
    inTransitNow: parcels.filter(p => p.status === 'In Transit').length,
    deliveredThisWeek: parcels.filter(p => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(p.dateCreated) >= weekAgo && p.status === 'Delivered';
    }).length
  };

  // ---------- Charts - Commented out ----------
  // const statusCounts = parcels.reduce((acc, parcel) => {
  //   acc[parcel.status] = (acc[parcel.status] || 0) + 1;
  //   return acc;
  // }, {});
  //
  // const statusDistribution = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  //
  // // Daily Intake (last 7 days)
  // const dailyIntakeTrend = Array.from({ length: 7 }, (_, i) => {
  //   const date = new Date();
  //   date.setDate(date.getDate() - (6 - i));
  //   const dateStr = date.toISOString().split('T')[0];
  //   const count = parcels.filter(p => {
  //     const pDate = new Date(p.dateCreated).toISOString().split('T')[0];
  //     return pDate === dateStr;
  //   }).length;
  //   return { date: dateStr, count };
  // });
  //
  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <WarehouseLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <span className="ml-3 text-gray-600">Loading parcels...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <h3 className="text-sm font-medium text-red-800">Error loading parcels</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Warehouse Parcels</h1>
              <button
                onClick={() => navigate('/warehouse/parcels/create')}
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Create New Parcel
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <KpiCard label="Total Parcels Today" value={kpiData.totalParcelsToday} color="text-gray-900" />
              <KpiCard label="In Warehouse" value={kpiData.inWarehouse} color="text-orange-600" />
              <KpiCard label="In Transit Now" value={kpiData.inTransitNow} color="text-blue-600" />
              <KpiCard label="Delivered This Week" value={kpiData.deliveredThisWeek} color="text-green-600" />
            </div>

            {/* Charts - Commented out for now */}
            {/*
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ChartCard title="Status Distribution">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution.length ? statusDistribution : [{ name: 'No Data', value: 1 }]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Daily Intake Trend">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyIntakeTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
            */}

            {/* Filters, Actions, Tables */}
            <ParcelFilters
              onSearch={handleSearch}
              onFilter={handleFilter}
              onDateRangeChange={handleDateRangeChange}
              onSort={handleSort}
            />

            <ParcelTable
              parcels={filteredParcels}
              onView={handleViewParcel}
              onEdit={handleEditParcel}
              onPrintLabel={handlePrintLabel}
              onMarkShipped={handleMarkShipped}
            />

            <ParcelCardList
              parcels={filteredParcels}
              onView={handleViewParcel}
              onEdit={handleEditParcel}
              onPrintLabel={handlePrintLabel}
              onMarkShipped={handleMarkShipped}
            />
          </>
        )}
      </div>
    </WarehouseLayout>
  );
};

// Small helper components for clarity
const KpiCard = ({ label, value, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

// const ChartCard = ({ title, children }) => (
//   <div className="bg-white p-4 rounded-lg shadow-md h-80">
//     <h3 className="text-lg font-semibold mb-4">{title}</h3>
//     {children}
//   </div>
// );
  
export default WarehouseParcelsPage;