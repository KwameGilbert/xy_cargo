import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import ParcelFiltersAdmin from '../../../components/admin/parcels/ParcelFiltersAdmin';
import ParcelTableAdmin from '../../../components/admin/parcels/ParcelTableAdmin';
import ParcelCardListAdmin from '../../../components/admin/parcels/ParcelCardListAdmin';
import ParcelActionsAdmin from '../../../components/admin/parcels/ParcelActionsAdmin';

// Mock data (extended for admin scope)
const mockParcelsData = {
  parcels: [
    // Example parcels (expand as needed)
    {
      id: 'P001',
      trackingNumber: 'XYC-123456',
      customerName: 'John Doe',
      customerContact: 'john@example.com',
      status: 'Pending',
      paymentStatus: 'Paid',
      warehouse: 'Warehouse A',
      agent: 'Agent 1',
      specialHandling: false,
      totalWeight: 5.2,
      declaredValue: '$150.00',
      dateCreated: '2023-10-01',
    },
    // Add more parcels...
  ],
  kpiData: {
    totalParcelsToday: 120,
    pendingIntake: 15,
    specialHandlingRequired: 8,
    inTransitNow: 45,
    deliveredThisWeek: 200,
  },
  statusDistribution: [
    { name: 'Pending', value: 30 },
    { name: 'In Transit', value: 40 },
    { name: 'Delivered', value: 25 },
    { name: 'Returned', value: 5 },
  ],
  dailyIntakeTrend: [
    { date: '2023-10-01', count: 10 },
    { date: '2023-10-02', count: 15 },
    // Add more...
  ],
  warehouses: ['Warehouse A', 'Warehouse B', 'Warehouse C'], // For filter
  agents: ['Agent 1', 'Agent 2', 'Agent 3'], // For filter
};

const AdminAllParcels = () => {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [filteredParcels, setFilteredParcels] = useState([]);
  const [selectedParcels, setSelectedParcels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    warehouse: 'all',
    customer: '',
    agent: 'all',
    paymentStatus: 'all',
    specialHandling: false,
  });
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setParcels(mockParcelsData.parcels);
    setFilteredParcels(mockParcelsData.parcels);
  }, []);

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
    applyFilters(searchTerm, filters, newSortBy);
  };

  const applyFilters = (term, filterOptions, dates, sort) => {
    let result = [...parcels];

    // Search
    if (term) {
      const lowerTerm = term.toLowerCase();
      result = result.filter(parcel =>
        parcel.id.toLowerCase().includes(lowerTerm) ||
        parcel.trackingNumber.toLowerCase().includes(lowerTerm) ||
        parcel.customerName.toLowerCase().includes(lowerTerm) ||
        parcel.customerContact.toLowerCase().includes(lowerTerm)
      );
    }

    // Filters
    if (filterOptions.status !== 'all') result = result.filter(p => p.status === filterOptions.status);
    if (filterOptions.warehouse !== 'all') result = result.filter(p => p.warehouse === filterOptions.warehouse);
    if (filterOptions.customer) result = result.filter(p => p.customerName.toLowerCase().includes(filterOptions.customer.toLowerCase()));
    if (filterOptions.agent !== 'all') result = result.filter(p => p.agent === filterOptions.agent);
    if (filterOptions.paymentStatus !== 'all') result = result.filter(p => p.paymentStatus === filterOptions.paymentStatus);
    if (filterOptions.specialHandling) result = result.filter(p => p.specialHandling);

    // Date range
    if (dates.startDate && dates.endDate) {
      const start = new Date(dates.startDate);
      const end = new Date(dates.endDate);
      result = result.filter(p => {
        const parcelDate = new Date(p.dateCreated);
        return parcelDate >= start && parcelDate <= end;
      });
    }

    // Sort
    switch (sort) {
      case 'newest': result.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)); break;
      case 'oldest': result.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)); break;
      case 'weight': result.sort((a, b) => b.totalWeight - a.totalWeight); break;
      case 'value': result.sort((a, b) => parseFloat(b.declaredValue.replace(/[^0-9.-]+/g, '')) - parseFloat(a.declaredValue.replace(/[^0-9.-]+/g, ''))); break;
      case 'priority': result.sort((a, b) => (a.specialHandling ? -1 : 1) - (b.specialHandling ? -1 : 1)); break;
      default: break;
    }

    setFilteredParcels(result);
  };

  const handleSelectParcel = (id) => {
    setSelectedParcels(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
  };

  // Bulk actions
  const handleAssignToShipment = () => console.log('Assigning to shipment:', selectedParcels);
  const handleMarkDelivered = () => console.log('Marking as delivered:', selectedParcels);
  const handleBulkStatusUpdate = (status) => console.log(`Updating status to ${status}:`, selectedParcels);
  const handleExportCSV = () => console.log('Exporting CSV:', selectedParcels);
  const handleExportPDF = () => console.log('Exporting PDF:', selectedParcels);
  const handlePrintLabels = () => console.log('Printing labels:', selectedParcels);

  // Individual actions
  const handleViewParcel = (id) => navigate(`/admin/parcels/${id}`);
  const handleEditParcel = (id) => navigate(`/admin/parcels/${id}/edit`);
  const handlePrintLabel = (id) => console.log('Printing label:', id);
  const handleMarkShipped = (id) => console.log('Marking shipped:', id);

  const kpiData = mockParcelsData.kpiData;
  const statusDistribution = mockParcelsData.statusDistribution;
  const dailyIntakeTrend = mockParcelsData.dailyIntakeTrend;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">All Parcels</h1>
          <button
            onClick={() => navigate('/admin/parcels/create')}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Create New Parcel
          </button>
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
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusDistribution} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {statusDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
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
        <ParcelFiltersAdmin
          onSearch={handleSearch}
          onFilter={handleFilter}
          onDateRangeChange={handleDateRangeChange}
          onSort={handleSort}
          warehouses={mockParcelsData.warehouses}
          agents={mockParcelsData.agents}
        />

        {/* Bulk Actions */}
        <ParcelActionsAdmin
          selectedCount={selectedParcels.length}
          onAssignToShipment={handleAssignToShipment}
          onMarkDelivered={handleMarkDelivered}
          onBulkStatusUpdate={handleBulkStatusUpdate}
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
          onPrintLabels={handlePrintLabels}
        />

        {/* Parcel Table (Desktop) */}
        <ParcelTableAdmin
          parcels={filteredParcels}
          selectedParcels={selectedParcels}
          onSelect={handleSelectParcel}
          onView={handleViewParcel}
          onEdit={handleEditParcel}
          onPrintLabel={handlePrintLabel}
          onMarkShipped={handleMarkShipped}
        />

        {/* Parcel Cards (Mobile) */}
        <ParcelCardListAdmin
          parcels={filteredParcels}
          onView={handleViewParcel}
          onEdit={handleEditParcel}
          onPrintLabel={handlePrintLabel}
          onMarkShipped={handleMarkShipped}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminAllParcels;