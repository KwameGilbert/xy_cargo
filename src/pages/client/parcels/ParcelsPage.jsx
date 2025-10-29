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

const ParcelsPage = () => {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
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
        const parcels = Array.isArray(parcelsRes.data) ? parcelsRes.data : [];
        setParcels(parcels);
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
  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = !searchQuery || 
      parcel.waybillNumber.toLowerCase().includes(normalizedSearchQuery) ||
      parcel.description.toLowerCase().includes(normalizedSearchQuery) ||
      parcel.trackingNumber.toLowerCase().includes(normalizedSearchQuery) ||
      (parcel.recipient?.name && parcel.recipient.name.toLowerCase().includes(normalizedSearchQuery));

    const matchesStatus = filters.status === 'all' || 
      parcel.status === filters.status;

    const matchesPayment = filters.payment === 'all' || 
      parcel.paymentStatus === filters.payment;
    const matchesWarehouse = filters.warehouse === 'all' || 
      parcel.originWarehouse === filters.warehouse ||
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

  const handleTrack = (parcel) => {
    // For now, navigate to the same details page
    // Later this can be updated to a dedicated tracking page
    navigate(`/client/parcels/${parcel.id}`);
  };

  const handleExport = () => {
    // Implement export functionality
    // TODO: Implement export functionality for parcels
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
              hasFilters={hasActiveFilters || !!searchQuery}
              onClearFilters={handleClearFilters}
            />
          ) : (
            <ParcelListView
              parcels={filteredParcels}
              onViewDetails={handleViewDetails}
              onPay={handlePay}
              onTrack={handleTrack}
              isMobile={isMobile}
            />
          )}

          {/* Modals */}
          {modalType === 'payment' && selectedParcel && (
            <PaymentModal parcel={selectedParcel} onClose={closeModal} />
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ParcelsPage;
