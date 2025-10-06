import React from 'react';
import { useParams, Link } from 'react-router-dom';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';
import ShipmentDetail from '../../../components/warehouse/shipments/ShipmentDetail';
import mockShipmentsData from '../../../components/warehouse/shipments/mockData';
import { ArrowLeft } from 'lucide-react';

const WarehouseShipmentDetailPage = () => {
  const { shipmentId } = useParams();
  const shipment = mockShipmentsData.shipments.find((s) => s.id === shipmentId);

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

        {shipment ? (
          <ShipmentDetail shipment={shipment} />
        ) : (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Shipment not found</h2>
            <p className="text-gray-500 mt-2">
              The shipment with ID "{shipmentId}" could not be found.
            </p>
          </div>
        )}
      </div>
    </WarehouseLayout>
  );
};

export default WarehouseShipmentDetailPage;
