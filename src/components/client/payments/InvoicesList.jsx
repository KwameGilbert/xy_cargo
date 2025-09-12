import React from 'react';
import InvoiceCard from './InvoiceCard';

const InvoicesList = ({ invoices, showUnpaidOnly = true }) => {
  const list = showUnpaidOnly ? invoices.filter(i => i.status !== 'PAID') : invoices;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Invoices</h3>
        <button className="text-sm text-red-600 border border-red-200 px-3 py-1 rounded-md">Export</button>
      </div>

      {list.length === 0 ? (
        <div className="py-8 text-center text-gray-500">No invoices to show.</div>
      ) : (
        list.map(inv => <InvoiceCard key={inv.invoiceId} invoice={inv} />)
      )}
    </div>
  );
};

export default InvoicesList;
