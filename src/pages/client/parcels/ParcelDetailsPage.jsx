import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ParcelSummary from '../../../components/client/parcels/ParcelSummary';
import ItemsList from '../../../components/client/parcels/ItemsList';
import TrackingTimeline from '../../../components/client/parcels/TrackingTimeline';
import ParcelActions from '../../../components/client/parcels/ParcelActions';
import PaymentModal from '../../../components/client/parcels/PaymentModal';
import ClientLayout from '../../../components/client/layout/ClientLayout';

const ParcelDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const fetchParcel = async () => {
      try {
        setError(null);
        setLoading(true);
        // Try to fetch from detailed data first
        try {
          const res = await fetch('/data/parcel-details.json');
          if (res.ok) {
            const data = await res.json();
            const found = data[id];
            if (found) {
              setParcel(found);
              return;
            }
          }
        } catch (e) {
          console.log('Detailed data not available, falling back to basic data');
        }
        
        // Fallback to basic parcels data
        const res = await fetch('/data/parcels.json');
        if (!res.ok) throw new Error('Failed to fetch parcel');
        const data = await res.json();
        const found = data.find(p => p.id === id);
        setParcel(found);
      } catch (err) {
        setError('Could not load parcel details.');
      } finally {
        setLoading(false);
      }
    };
    fetchParcel();
  }, [id]);

  const handlePayNow = (parcel) => {
    setSelectedParcel(parcel);
    setModalType('payment');
  };

  const handleRequestSpecialPackaging = (item) => {
    console.log('Requesting special packaging for item:', item.name);
    // Implement special packaging request logic
  };

  const handleViewSeparateParcel = (parcelId) => {
    navigate(`/client/parcels/${parcelId}`);
  };

  const handleDownloadInvoice = (parcel) => {
    console.log('Downloading invoice for parcel:', parcel.waybillNumber);
    // Implement download logic
  };

  const handleContactSupport = (parcel) => {
    console.log('Contacting support for parcel:', parcel.waybillNumber);
    // Implement support contact logic
  };

  const handleViewSeparatedParcels = (parcel) => {
    console.log('Viewing separated parcels for:', parcel.waybillNumber);
    // Implement separated parcels view logic
  };

  const closeModal = () => {
    setSelectedParcel(null);
    setModalType(null);
  };

  if (loading) {
    return (
    <ClientLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading parcel details...</p>
        </div>
      </div>
    </ClientLayout>
    );
  }

  if (error) {
    return (
      <ClientLayout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium">{error}</div>
          <button
            onClick={() => navigate('/client/parcels')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Back to Parcels
          </button>
        </div>
      </div>
      </ClientLayout>
    );
  }

  if (!parcel) {
    return (
     <ClientLayout>
       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-lg font-medium">Parcel not found.</div>
          <button
            onClick={() => navigate('/client/parcels')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Back to Parcels
          </button>
        </div>
      </div>
     </ClientLayout>
    );
  }

  return (
    <ClientLayout>
       <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/client/parcels')}
                className="flex items-center text-gray-500 hover:text-gray-700 mr-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Parcels
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Parcel #{parcel.waybillNumber}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Parcel Summary */}
            <ParcelSummary 
              parcel={parcel} 
              onPayNow={handlePayNow}
            />

            {/* Items List */}
            {parcel.items && parcel.items.length > 0 && (
              <ItemsList
                items={parcel.items}
                onRequestSpecialPackaging={handleRequestSpecialPackaging}
                onViewSeparateParcel={handleViewSeparateParcel}
              />
            )}

            {/* Tracking Timeline */}
            <TrackingTimeline trackingHistory={parcel.trackingHistory} />
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-8">
            <ParcelActions
              parcel={parcel}
              onDownloadInvoice={handleDownloadInvoice}
              onContactSupport={handleContactSupport}
              onViewSeparatedParcels={handleViewSeparatedParcels}
            />
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {modalType === 'payment' && selectedParcel && (
        <PaymentModal parcel={selectedParcel} onClose={closeModal} />
      )}
    </div>
    </ClientLayout>
  );
};

export default ParcelDetailsPage;