import React from 'react';

const PaymentsHistory = ({ payments }) => {
  if (!payments || payments.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <p className="text-gray-500">No payment history available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold mb-4">Payment History</h3>
      <ul className="space-y-4">
        {payments.map(p => (
          <li key={p.paymentId} className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">{p.invoiceId}</div>
              <div className="text-xs text-gray-500">{p.date} • {p.method}</div>
            </div>
            <div className="text-sm font-semibold">${p.amount.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentsHistory;
