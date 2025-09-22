import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClientLayout from '../../../components/client/layout/ClientLayout';
import ParcelHeaderWithStats from '../../../components/client/parcels/ParcelHeaderWithStats';
import ParcelSearchAndFilters from '../../../components/client/parcels/ParcelSearchAndFilters';
import ParcelListView from '../../../components/client/parcels/ParcelListView';
import ParcelLoadingState from '../../../components/client/parcels/ParcelLoadingState';
import ParcelEmptyState from '../../../components/client/parcels/ParcelEmptyState';
import PaymentModal from '../../../components/client/parcels/PaymentModal';
import ClaimModal from '../../../components/client/parcels/ClaimModal';

const ParcelsPage = () => {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedParcel, setExpandedParcel] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    payment: 'all',
    warehouse: 'all',
    dateRange: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parcelsRes = await axios.get('/data/parcels.json');
        setParcels(parcelsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter parcels based on search and filters
  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = !searchQuery || 
      parcel.waybillNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (parcel.recipient?.name && parcel.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filters.status === 'all' || 
      parcel.status === filters.status;

    const matchesPayment = filters.payment === 'all' || 
      parcel.paymentStatus === filters.payment;

    const matchesWarehouse = filters.warehouse === 'all' || 
      parcel.originWarehouse?.includes(filters.warehouse);

    return matchesSearch && matchesStatus && matchesPayment && matchesWarehouse;
  });

  // Calculate summary statistics
  const totalParcels = parcels.length;
  const inTransitCount = parcels.filter(p => p.status === 'IN_TRANSIT' || p.status === 'PROCESSING').length;
  const unpaidCount = parcels.filter(p => p.paymentStatus === 'UNPAID').length;
  const deliveredCount = parcels.filter(p => p.status === 'DELIVERED').length;

  const handleViewDetails = (parcel) => {
    navigate(`/client/parcels/${parcel.id}`);
  };

  const handlePay = (parcel) => {
    setSelectedParcel(parcel);
    setModalType('payment');
  };

  const handleClaim = (parcel) => {
    setSelectedParcel(parcel);
    setModalType('claim');
  };

  const handleTrack = (parcel) => {
    setExpandedParcel(expandedParcel === parcel.id ? null : parcel.id);
  };

  const handleNewParcel = () => {
    // Navigate to new parcel creation page
    navigate('/client/parcels/new');
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Export parcels');
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      payment: 'all',
      warehouse: 'all',
      dateRange: 'all'
    });
  };

  const closeModal = () => {
    setSelectedParcel(null);
    setModalType(null);
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== 'all');

  if (loading) {
    return (
      <ClientLayout>
        <div className="p-2 bg-gray-50 min-h-screen">
          <ParcelLoadingState />
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="p-2 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header with Stats */}
          <ParcelHeaderWithStats
            totalParcels={totalParcels}
            inTransitCount={inTransitCount}
            unpaidCount={unpaidCount}
            deliveredCount={deliveredCount}
            onNewParcel={handleNewParcel}
            onExport={handleExport}
          />

          {/* Search and Filters */}
          <ParcelSearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
            filters={filters}
            onFilterChange={handleFilterChange}
            showFilters={showFilters}
            onToggleFilters={handleToggleFilters}
            onClearFilters={handleClearFilters}
            placeholder="Search by waybill, recipient, or status..."
          />

          {/* Parcels List */}
          {filteredParcels.length === 0 ? (
            <ParcelEmptyState
              hasFilters={hasActiveFilters || searchQuery}
              onClearFilters={handleClearFilters}
              onNewParcel={handleNewParcel}
            />
          ) : (
            <ParcelListView
              parcels={filteredParcels}
              onViewDetails={handleViewDetails}
              onPay={handlePay}
              onClaim={handleClaim}
              onTrack={handleTrack}
              expandedParcel={expandedParcel}
              onToggleExpanded={setExpandedParcel}
              isMobile={isMobile}
            />
          )}

          {/* Modals */}
          {modalType === 'payment' && selectedParcel && (
            <PaymentModal parcel={selectedParcel} onClose={closeModal} />
          )}
          
          {modalType === 'claim' && selectedParcel && (
            <ClaimModal parcel={selectedParcel} onClose={closeModal} />
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ParcelsPage;
