import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';
import ShipmentFilters from '../../../components/warehouse/shipments/ShipmentFilters';
import ShipmentTable from '../../../components/warehouse/shipments/ShipmentTable';
import ShipmentCard from '../../../components/warehouse/shipments/ShipmentCard';
import ShipmentActions from '../../../components/warehouse/shipments/ShipmentActions';
import ShipmentCreateModal from '../../../components/warehouse/shipments/ShipmentCreateModal';
// import { useMediaQuery } from 'react-responsive'; // No longer needed
import { getShipmentsSummary, createShipment } from '../../../services/warehouse/shipmentService';
import { useToast } from '../../../contexts/ToastContext';

const WarehouseShipmentsPage = () => {
    const navigate = useNavigate();
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: '',
        origin: '',
        destination: '',
        dateRange: { start: null, end: null }
    });
    const [searchTerm, setSearchTerm] = useState('');
    // const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // No longer needed
    const [showCreateModal, setShowCreateModal] = useState(false);
    const toast = useToast();

    // ... (fetchShipments and useEffect remain identical) ...
    const fetchShipments = async () => {
        setLoading(true);
        try {
            const result = await getShipmentsSummary();
            
            if (result.success) {
                setShipments(result.data);
            } else {
                toast.error(result.message || 'Failed to fetch shipments');
            }
        } catch (error) {
            toast.error('Error loading shipments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    // ... (filteredShipments useMemo remains identical) ...
    const filteredShipments = useMemo(() => {
        return shipments.filter((shipment) => {
            const { status, origin, destination } = filters;

            if (status && status !== 'all' && shipment.status !== status) return false;
            if (origin && origin !== 'all' && !shipment.originCountry.toLowerCase().includes(origin.toLowerCase())) return false;
            if (destination && destination !== 'all' && !shipment.destinationCountry.toLowerCase().includes(destination.toLowerCase())) return false;
            if (searchTerm) {
                const q = searchTerm.toLowerCase();
                if (!(`${shipment.id}`.toLowerCase().includes(q) || (shipment.trackingNumber || '').toLowerCase().includes(q))) return false;
            }

            return true;
        });
    }, [shipments, filters, searchTerm]);

    const handleCreateShipment = async (shipmentData) => {
        const result = await createShipment(shipmentData);
        if (result.success) {
            toast.success('Shipment created successfully!');
            // Refresh the shipments list
            await fetchShipments();
        } else {
            toast.error(result.message || 'Failed to create shipment');
            throw new Error(result.message);
        }
    };

    // ... (loading state remains identical) ...
    if (loading) {
        return (
            <WarehouseLayout>
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
            </WarehouseLayout>
        );
    }

    return (
        <WarehouseLayout>
            <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shipments Management</h1>
                        <p className="text-gray-600 mt-1 text-sm sm:text-base">View and manage all warehouse shipments</p>
                    </div>

                    {/* Filters */}
                    <ShipmentFilters
                        onSearch={setSearchTerm}
                        onFilter={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
                        onDateRangeChange={(dr) => setFilters(prev => ({ ...prev, dateRange: dr }))}
                        onSort={() => { /* sorting */ }}
                    />
                    
                    {/* Actions */}
                    <ShipmentActions
                         onExportCSV={() => console.log('Export CSV')}
                         onExportPDF={() => console.log('Export PDF')}
                         onPrintManifests={() => console.log('Print manifests')}
                         onCreateShipment={() => setShowCreateModal(true)}
                    />

                    {/* Shipments Table / Cards */}
                    <div className="bg-white shadow-lg rounded-sm border border-gray-200 mb-8">
                        
                        {/* --- Mobile View: Cards (Hidden on 'md' and up) --- */}
                        <div className="p-2 sm:p-4 md:hidden">
                            {filteredShipments.map((shipment) => (
                                <ShipmentCard
                                    key={shipment.id}
                                    shipment={shipment}
                                    onView={(id) => navigate(`/warehouse/shipments/${id}`)}
                                    onEdit={(id) => console.log('Edit shipment:', id)}
                                    onPrintManifest={(id) => console.log('Print manifest:', id)}
                                    onUpdateStatus={(id) => console.log('Update status:', id)}
                                />
                            ))}
                        </div>

                        {/* --- Desktop View: Table (Hidden *below* 'md') --- */}
                        <div className="hidden md:flex">
                            <ShipmentTable
                                shipments={filteredShipments}
                                showSelection={false}
                                onView={(id) => navigate(`/warehouse/shipments/${id}`)}
                                onEdit={(id) => console.log('Edit shipment:', id)}
                                onPrintManifest={(id) => console.log('Print manifest:', id)}
                                onUpdateStatus={(id) => console.log('Update status:', id)}
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* Create Shipment Modal */}
            <ShipmentCreateModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateShipment}
            />
        </WarehouseLayout>
    );
};

export default WarehouseShipmentsPage;