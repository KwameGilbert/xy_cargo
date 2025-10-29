import React from 'react';
import { Download, CreditCard, Clock } from 'lucide-react';

const statusClass = (status) => {
  switch (status) {
    case 'PAID':
      return 'bg-green-50 text-green-700';
    case 'PENDING':
      return 'bg-yellow-50 text-yellow-700';
    case 'OVERDUE':
      return 'bg-red-50 text-red-700';
    default:
      return 'bg-gray-50 text-gray-700';
  }
};

const InvoiceCard = ({ invoice }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <input type="checkbox" className="mr-2" />
            <div>
              <h3 className="text-base font-semibold">{invoice.invoiceId}</h3>
              <p className="text-sm text-gray-500">Shipment: {invoice.shipmentRef}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm text-gray-600">
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
          </div>
          <p className="text-sm text-gray-600 mt-3">{invoice.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {invoice.tags && invoice.tags.map((t, i) => (
              <span key={i} className="text-xs bg-gray-100 border border-gray-200 px-2 py-1 rounded-full">{t}</span>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            <button className="inline-flex items-center gap-2 border border-red-200 text-red-600 px-3 py-2 rounded-md">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            {invoice.status === 'PENDING' && (
              <button className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-md">
                <CreditCard className="w-4 h-4" /> Pay Now
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass(invoice.status)}`}>{invoice.status}</span>
          <div className="text-xl font-semibold mt-4">${invoice.amount.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
