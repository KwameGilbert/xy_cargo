import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';
import ShipmentDetail from '../../../components/warehouse/shipments/ShipmentDetail';
import { ArrowLeft } from 'lucide-react';
import { getShipmentDetail, addTrackingUpdate } from '../../../services/warehouse/shipmentService';
import { useToast } from '../../../contexts/ToastContext';

const WarehouseShipmentDetailPage = () => {
  const { shipmentId } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const handleAddTrackingUpdate = async (shipmentId, trackingData) => {
    const result = await addTrackingUpdate(shipmentId, trackingData);
    if (result.success) {
      toast.success('Tracking update added successfully!');
      // Refresh the shipment details
      const detailResult = await getShipmentDetail(shipmentId);
      if (detailResult.success) {
        setShipment(detailResult.data);
      }
    } else {
      toast.error(result.message || 'Failed to add tracking update');
      throw new Error(result.message);
    }
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const res = await getShipmentDetail(shipmentId);
      if (!mounted) return;
      if (res.success) {
        setShipment(res.data);
      } else {
        toast?.error(res.message || 'Failed to load shipment');
      }
      setLoading(false);
    };

    load();

    return () => { mounted = false; };
  }, [shipmentId]);

  return (
    <WarehouseLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <Link
            to="/warehouse/shipments"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shipments
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shipment Details</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        ) : shipment ? (
          <ShipmentDetail shipment={shipment} onAddTrackingUpdate={handleAddTrackingUpdate} />
        ) : (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Shipment not found</h2>
            <p className="text-gray-500 mt-2">The shipment with ID "{shipmentId}" could not be found.</p>
          </div>
        )}
      </div>
    </WarehouseLayout>
  );
};

export default WarehouseShipmentDetailPage;
