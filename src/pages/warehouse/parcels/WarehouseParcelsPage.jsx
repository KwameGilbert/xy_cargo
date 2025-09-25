import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import ParcelFilters from '../../../components/warehouse/parcels/ParcelFilters';
import ParcelTable from '../../../components/warehouse/parcels/ParcelTable';
import { ParcelCardList } from '../../../components/warehouse/parcels/ParcelCard';
import ParcelActions from '../../../components/warehouse/parcels/ParcelActions';
import mockParcelsData from '../../../components/warehouse/parcels/mockData';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';

const WarehouseParcelsPage = () => {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [filteredParcels, setFilteredParcels] = useState([]);
  const [selectedParcels, setSelectedParcels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    specialHandling: false,
    paymentStatus: 'all'
  });
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [sortBy, setSortBy] = useState('newest');

  // Load mock data
  useEffect(() => {
    setParcels(mockParcelsData.parcels);
    setFilteredParcels(mockParcelsData.parcels);
  }, []);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters(term, filters, dateRange, sortBy);
  };

  // Handle filters
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    applyFilters(searchTerm, newFilters, dateRange, sortBy);
  };

  // Handle date range
  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    applyFilters(searchTerm, filters, newDateRange, sortBy);
  };

  // Handle sort
  const handleSort = (newSortBy) => {
    setSortBy(newSortBy);
    applyFilters(searchTerm, filters, dateRange, newSortBy);
  };

  // Apply all filters, search, and sort
  const applyFilters = (term, filterOptions, dates, sort) => {
    let result = [...parcels];

    // Apply search term
    if (term) {
      const lowerTerm = term.toLowerCase();
      result = result.filter(
        parcel =>
          parcel.id.toLowerCase().includes(lowerTerm) ||
          parcel.trackingNumber.toLowerCase().includes(lowerTerm) ||
          parcel.customerName.toLowerCase().includes(lowerTerm) ||
          parcel.customerContact.toLowerCase().includes(lowerTerm)
      );
    }

    // Apply status filter
    if (filterOptions.status !== 'all') {
      result = result.filter(parcel => parcel.status === filterOptions.status);
    }

    // Apply special handling filter
    if (filterOptions.specialHandling) {
      result = result.filter(parcel => parcel.specialHandling);
    }

    // Apply payment status filter
    if (filterOptions.paymentStatus !== 'all') {
      result = result.filter(parcel => parcel.paymentStatus === filterOptions.paymentStatus);
    }

    // Apply date range filter
    if (dates.startDate && dates.endDate) {
      const startDate = new Date(dates.startDate);
      const endDate = new Date(dates.endDate);
      result = result.filter(parcel => {
        const parcelDate = new Date(parcel.dateCreated);
        return parcelDate >= startDate && parcelDate <= endDate;
      });
    }

    // Apply sorting
    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
        break;
      case 'weight':
        result.sort((a, b) => b.totalWeight - a.totalWeight);
        break;
      case 'value':
        result.sort((a, b) => {
          const valueA = parseFloat(a.declaredValue.replace(/[^0-9.-]+/g, ''));
          const valueB = parseFloat(b.declaredValue.replace(/[^0-9.-]+/g, ''));
          return valueB - valueA;
        });
        break;
      case 'priority':
        // Sort by special handling first, then by status
        result.sort((a, b) => {
          if (a.specialHandling && !b.specialHandling) return -1;
          if (!a.specialHandling && b.specialHandling) return 1;
          
          const statusOrder = { 'Pending': 0, 'In Transit': 1, 'Delivered': 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        break;
      default:
        break;
    }

    setFilteredParcels(result);
  };

  // Handle parcel selection
  const handleSelectParcel = (id) => {
    if (selectedParcels.includes(id)) {
      setSelectedParcels(selectedParcels.filter(parcelId => parcelId !== id));
    } else {
      setSelectedParcels([...selectedParcels, id]);
    }
  };

  // Handle bulk actions
  const handleExportCSV = () => {
    console.log('Exporting CSV for parcels:', selectedParcels);
  };

  const handleExportPDF = () => {
    console.log('Exporting PDF for parcels:', selectedParcels);
  };

  const handlePrintLabels = () => {
    console.log('Printing labels for parcels:', selectedParcels);
  };

  const handleBulkStatusUpdate = (status) => {
    console.log(`Updating status to ${status} for parcels:`, selectedParcels);
  };

  // Handle parcel actions
  const handleViewParcel = (id) => {
    navigate(`/warehouse/parcels/${id}`);
  };

  const handleEditParcel = (id) => {
    navigate(`/warehouse/parcels/${id}/edit`);
  };

  const handlePrintLabel = (id) => {
    console.log('Printing label for parcel:', id);
  };

  const handleMarkShipped = (id) => {
    console.log('Marking parcel as shipped:', id);
  };

  // KPI data
  const kpiData = mockParcelsData.kpiData;

  // Chart data
  const statusDistribution = mockParcelsData.statusDistribution;
  const dailyIntakeTrend = mockParcelsData.dailyIntakeTrend;

  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <WarehouseLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Warehouse Parcels</h1>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => navigate('/warehouse/parcels/create')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Create New Parcel
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">Total Parcels Today</p>
            <p className="text-2xl font-bold text-gray-900">{kpiData.totalParcelsToday}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">Pending Intake</p>
            <p className="text-2xl font-bold text-yellow-600">{kpiData.pendingIntake}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">Special Handling</p>
            <p className="text-2xl font-bold text-red-600">{kpiData.specialHandlingRequired}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">In Transit Now</p>
            <p className="text-2xl font-bold text-blue-600">{kpiData.inTransitNow}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">Delivered This Week</p>
            <p className="text-2xl font-bold text-green-600">{kpiData.deliveredThisWeek}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Status Distribution */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
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
            </div>
          </div>

          {/* Daily Intake Trend */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Daily Intake Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyIntakeTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Filters */}
        <ParcelFilters
          onSearch={handleSearch}
          onFilter={handleFilter}
          onDateRangeChange={handleDateRangeChange}
          onSort={handleSort}
        />

        {/* Bulk Actions */}
        <ParcelActions
          selectedCount={selectedParcels.length}
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
          onPrintLabels={handlePrintLabels}
          onBulkStatusUpdate={handleBulkStatusUpdate}
        />

        {/* Parcel Table (Desktop) */}
        <ParcelTable
          parcels={filteredParcels}
          onView={handleViewParcel}
          onEdit={handleEditParcel}
          onPrintLabel={handlePrintLabel}
          onMarkShipped={handleMarkShipped}
        />

        {/* Parcel Cards (Mobile) */}
        <ParcelCardList
          parcels={filteredParcels}
          onView={handleViewParcel}
          onEdit={handleEditParcel}
          onPrintLabel={handlePrintLabel}
          onMarkShipped={handleMarkShipped}
        />
      </div>
    </WarehouseLayout>
  );
};

export default WarehouseParcelsPage;