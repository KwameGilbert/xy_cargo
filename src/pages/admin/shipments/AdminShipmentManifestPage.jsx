import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import ShipmentManifest from '../../../components/admin/shipments/ShipmentManifest';
import mockShipmentsData from '../../../components/admin/shipments/mockData';
import {
  ArrowLeft,
  Printer,
  Download,
  Eye,
  FileText
} from 'lucide-react';

const AdminShipmentManifestPage = () => {
  const { shipmentId } = useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('preview'); // preview, print

  useEffect(() => {
    // Find the shipment by ID
    const foundShipment = mockShipmentsData.shipments.find(s => s.id === shipmentId);
    if (foundShipment) {
      setShipment(foundShipment);
    }
    setLoading(false);
  }, [shipmentId]);

  const handlePrint = () => {
    setViewMode('print');
    setTimeout(() => {
      window.print();
      setViewMode('preview');
    }, 100);
  };

  const handleExportPDF = () => {
    // In a real application, this would generate and download a PDF
    alert('PDF export functionality would be implemented here using a library like jsPDF or react-pdf');
  };

  const handleExportCSV = () => {
    if (!shipment || !shipment.parcels) return;

    // Create CSV content
    const headers = ['Parcel ID', 'Description', 'Customer Name', 'Customer Contact', 'Weight', 'Dimensions', 'Declared Value', 'Payment Status', 'Special Handling'];
    const csvContent = [
      headers.join(','),
      ...shipment.parcels.map(parcel => [
        parcel.id,
        `"${parcel.description}"`,
        `"${parcel.customerName}"`,
        parcel.customerContact,
        parcel.weight,
        parcel.dimensions,
        parcel.declaredValue,
        parcel.paymentStatus,
        parcel.specialHandling ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `shipment-${shipment.id}-manifest.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!shipment) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Manifest not found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The shipment manifest you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/admin/shipments')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shipments
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 print:hidden">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(`/admin/shipments/${shipmentId}`)}
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Shipment Details
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Shipment Manifest</h1>
                  <p className="text-sm text-gray-500">{shipment.id} - {shipment.trackingNumber}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`inline-flex items-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium ${
                    viewMode === 'preview'
                      ? 'border-blue-500 text-blue-700 bg-blue-50'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Manifest
                </button>
                <button
                  onClick={handleExportPDF}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </button>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Manifest Content */}
        <div className="p-6">
          <ShipmentManifest shipment={shipment} />
        </div>

        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print\\:hidden, .print\\:hidden * {
              display: none !important;
            }
            #manifest-content, #manifest-content * {
              visibility: visible;
            }
            #manifest-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}</style>
      </div>
    </AdminLayout>
  );
};

export default AdminShipmentManifestPage;