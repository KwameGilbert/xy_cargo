import React from 'react';
import { 
  Download, 
  FileText, 
  Phone, 
  Mail, 
  ExternalLink,
  Receipt,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

const ParcelActions = ({ 
  parcel, 
  onDownloadInvoice, 
  onOpenClaim, 
  onContactSupport,
  onViewSeparatedParcels 
}) => {
  const handleDownloadInvoice = () => {
    if (onDownloadInvoice) {
      onDownloadInvoice(parcel);
    } else {
      // Default behavior - simulate download
      console.log('Downloading invoice for parcel:', parcel.waybillNumber);
    }
  };

  const handleOpenClaim = () => {
    if (onOpenClaim) {
      onOpenClaim(parcel);
    } else {
      // Default behavior - navigate to claim page
      console.log('Opening claim for parcel:', parcel.waybillNumber);
    }
  };

  const handleContactSupport = () => {
    if (onContactSupport) {
      onContactSupport(parcel);
    } else {
      // Default behavior - open support modal or page
      console.log('Contacting support for parcel:', parcel.waybillNumber);
    }
  };

  const handleViewSeparatedParcels = () => {
    if (onViewSeparatedParcels) {
      onViewSeparatedParcels(parcel);
    } else {
      // Default behavior - navigate to separated parcels
      console.log('Viewing separated parcels for:', parcel.waybillNumber);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions & Documents</h3>
      
      <div className="space-y-4">
        {/* Download Actions */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Download Documents</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </button>
            
            {parcel.paymentStatus === 'PAID' && (
              <button
                onClick={handleDownloadInvoice}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                <Receipt className="h-4 w-4 mr-2" />
                Download Receipt
              </button>
            )}
          </div>
        </div>

        {/* Support Actions */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Support & Claims</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(parcel.status === 'DELAYED' || parcel.status === 'DELIVERED') && (
              <button
                onClick={handleOpenClaim}
                className="flex items-center justify-center px-4 py-2 border border-red-300 text-red-700 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Open Claim
              </button>
            )}
            
            <button
              onClick={handleContactSupport}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Support
            </button>
          </div>
        </div>

        {/* Separated Parcels */}
        {parcel.separatedParcels && parcel.separatedParcels.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Related Parcels</h4>
            <button
              onClick={handleViewSeparatedParcels}
              className="flex items-center justify-center px-4 py-2 border border-blue-300 text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Separated Parcels ({parcel.separatedParcels.length})
            </button>
          </div>
        )}

        {/* Help & Information */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Help & Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => window.open('/help/tracking', '_blank')}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Tracking Help
            </button>
            
            <button
              onClick={() => window.open('/help/claims', '_blank')}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              <FileText className="h-4 w-4 mr-2" />
              Claims Guide
            </button>
          </div>
        </div>

        {/* Support Contacts */}
        {parcel.supportContacts && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Direct Support</h4>
            <div className="space-y-2">
              {parcel.supportContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{contact.type}</div>
                    <div className="text-sm text-gray-600">{contact.phone}</div>
                    <div className="text-xs text-gray-500">{contact.hours}</div>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${contact.phone}`}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParcelActions;