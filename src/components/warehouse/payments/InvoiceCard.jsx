import React, { useState } from 'react';
import { Download, CreditCard, Clock, CheckCircle, XCircle, Edit, Printer, Mail } from 'lucide-react';

const statusClass = (status) => {
  switch (status) {
    case 'PAID':
      return 'bg-green-50 text-green-700';
    case 'PENDING':
      return 'bg-yellow-50 text-yellow-700';
    case 'OVERDUE':
      return 'bg-red-50 text-red-700';
    case 'PROCESSING':
      return 'bg-blue-50 text-blue-700';
    case 'CANCELLED':
      return 'bg-gray-50 text-gray-700';
    default:
      return 'bg-gray-50 text-gray-700';
  }
};

const InvoiceCard = ({ invoice, onStatusChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(invoice.status);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    setShowStatusDropdown(false);
    if (onStatusChange) {
      onStatusChange(invoice.invoiceId, newStatus);
    }
  };

  const statusOptions = ['PAID', 'PENDING', 'OVERDUE', 'PROCESSING', 'CANCELLED'];

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 mb-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <input type="checkbox" className="mr-2" />
            <div>
              <h3 className="text-base font-semibold">{invoice.invoiceId}</h3>
              <p className="text-sm text-gray-500">
                Customer: {invoice.customerName} | Shipment: {invoice.shipmentRef}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-600">
            <div>
              <p className="text-xs text-gray-400">Issue Date</p>
              <div className="font-medium">{invoice.issueDate}</div>
            </div>
            <div>
              <p className="text-xs text-gray-400">Due Date</p>
              <div className="font-medium">{invoice.dueDate}</div>
            </div>
            <div>
              <p className="text-xs text-gray-400">Services</p>
              <div className="font-medium">{invoice.serviceCount} items</div>
            </div>
            <div>
              <p className="text-xs text-gray-400">Payment Method</p>
              <div className="font-medium">{invoice.paymentMethod || 'Not specified'}</div>
            </div>
          </div>
          
          {expanded && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">{invoice.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {invoice.tags && invoice.tags.map((t, i) => (
                  <span key={i} className="text-xs bg-gray-100 border border-gray-200 px-2 py-1 rounded-full">{t}</span>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-3 mt-3">
                <h4 className="text-sm font-medium mb-2">Services</h4>
                <table className="w-full text-sm">
                  <thead className="text-xs text-gray-500">
                    <tr>
                      <th className="text-left pb-2">Service</th>
                      <th className="text-right pb-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.services && invoice.services.map((service, idx) => (
                      <tr key={idx}>
                        <td className="py-1">{service}</td>
                        <td className="text-right">${(invoice.amount / invoice.services.length).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="font-medium">
                      <td className="pt-2">Total</td>
                      <td className="text-right pt-2">${invoice.amount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="border-t border-gray-100 pt-3 mt-3">
                <h4 className="text-sm font-medium mb-2">Notes</h4>
                <p className="text-sm text-gray-600">{invoice.notes || 'No additional notes'}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="text-sm text-gray-600 underline"
            >
              {expanded ? 'Show Less' : 'Show More'}
            </button>
            
            <div className="flex-1"></div>
            
            <button className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-3 py-2 rounded-md text-sm">
              <Printer className="w-4 h-4" />
              Print
            </button>
            
            <button className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-3 py-2 rounded-md text-sm">
              <Mail className="w-4 h-4" />
              Email
            </button>
            
            <button className="inline-flex items-center gap-2 border border-blue-200 text-blue-600 px-3 py-2 rounded-md text-sm">
              <Download className="w-4 h-4" />
              Download
            </button>
            
            <button className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 px-3 py-2 rounded-md text-sm">
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>

        <div className="flex flex-col items-end ml-4">
          <div className="relative">
            <button 
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass(currentStatus)}`}
            >
              {currentStatus}
            </button>
            
            {showStatusDropdown && (
              <div className="absolute right-0 top-8 bg-white shadow-lg rounded-md border border-gray-100 z-10 w-32">
                {statusOptions.map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`block w-full text-left px-3 py-2 text-xs hover:bg-gray-50 ${status === currentStatus ? 'font-bold' : ''}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="text-xl font-semibold mt-4">${invoice.amount.toFixed(2)}</div>
          
          {currentStatus === 'PENDING' && (
            <button className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md mt-4 text-sm">
              <CheckCircle className="w-4 h-4" /> Mark as Paid
            </button>
          )}
          
          {currentStatus === 'OVERDUE' && (
            <div className="flex flex-col gap-2 mt-4">
              <button className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md text-sm">
                <CheckCircle className="w-4 h-4" /> Mark as Paid
              </button>
              <button className="inline-flex items-center gap-2 bg-yellow-600 text-white px-3 py-2 rounded-md text-sm">
                <Clock className="w-4 h-4" /> Extend Due Date
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;