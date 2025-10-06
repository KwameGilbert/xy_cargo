import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';
import ShipmentFilters from '../../../components/warehouse/shipments/ShipmentFilters';
import ShipmentTable from '../../../components/warehouse/shipments/ShipmentTable';
import ShipmentCard from '../../../components/warehouse/shipments/ShipmentCard';
import ShipmentActions from '../../../components/warehouse/shipments/ShipmentActions';
import mockShipmentsData from '../../../components/warehouse/shipments/mockData';
import { useMediaQuery } from 'react-responsive';

const WarehouseShipmentsPage = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState(mockShipmentsData.shipments);
  const [filters, setFilters] = useState({
    status: '',
    origin: '',
    destination: '',
    carrier: '',
    dateRange: { start: null, end: null },
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShipments, setSelectedShipments] = useState([]);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const { status, origin, destination, carrier, dateRange } = filters;
      const shipmentDate = new Date(shipment.departureDate);

      return (
        (status ? shipment.status === status : true) &&
        (origin ? shipment.originCountry.toLowerCase().includes(origin.toLowerCase()) : true) &&
        (destination ? shipment.destinationCountry.toLowerCase().includes(destination.toLowerCase()) : true) &&
        (carrier ? shipment.carrier.toLowerCase().includes(carrier.toLowerCase()) : true) &&
        (dateRange.start ? shipmentDate >= dateRange.start : true) &&
        (dateRange.end ? shipmentDate <= dateRange.end : true) &&
        (searchTerm
          ? shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
      );
    });
  }, [shipments, filters, searchTerm]);

  const handleSelectShipment = (shipmentId) => {
    setSelectedShipments((prev) =>
      prev.includes(shipmentId)
        ? prev.filter((id) => id !== shipmentId)
        : [...prev, shipmentId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedShipments(filteredShipments.map((s) => s.id));
    } else {
      setSelectedShipments([]);
    }
  };

  const handleViewDetails = (shipmentId) => {
    navigate(`/warehouse/shipments/${shipmentId}`);
  };

  return (
    <WarehouseLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Manage Shipments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track, update, and manage all incoming and outgoing shipments.
          </p>
        </div>

        <ShipmentFilters
          filters={filters}
          setFilters={setFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <ShipmentActions
          selectedCount={selectedShipments.length}
          onExportCSV={() => console.log("Export CSV:", selectedShipments)}
          onExportPDF={() => console.log("Export PDF:", selectedShipments)}
          onPrintManifests={() => console.log("Print manifests for:", selectedShipments)}
          onBulkStatusUpdate={(status) => {
            console.log(`Update ${selectedShipments.length} shipments to ${status}`);
          }}
        />

        <div className="bg-white rounded-lg shadow-md mt-4">

          {isMobile ? (
            <div className="p-4">
              {filteredShipments.map((shipment) => (
                <ShipmentCard
                  key={shipment.id}
                  shipment={shipment}
                  onView={(id) => handleViewDetails(id)}   // ✅ corrected
                  onEdit={(id) => console.log("Edit shipment:", id)}
                  onPrintManifest={(id) => console.log("Print manifest:", id)}
                  onUpdateStatus={(id) => console.log("Update status:", id)}
                />
              ))}
            </div>
          ) : (
            <ShipmentTable
              shipments={filteredShipments}
              selectedShipments={selectedShipments}
              onSelectShipment={handleSelectShipment}
              onSelectAll={handleSelectAll}
              onView={handleViewDetails}
              onEdit={(id) => console.log("Edit shipment:", id)}
              onPrintManifest={(id) => console.log("Print manifest:", id)}
              onUpdateStatus={(id) => console.log("Update status:", id)}
            />
          )}

        </div>
      </div>
    </WarehouseLayout>
  );
};

export default WarehouseShipmentsPage;