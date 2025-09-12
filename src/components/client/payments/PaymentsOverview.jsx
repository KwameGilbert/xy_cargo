import React from 'react';

const Currency = ({ value }) => (
  <span className="text-2xl font-semibold">${value.toFixed(2)}</span>
);

const PaymentsOverview = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Currency value={summary.totalPaid} />
        <p className="text-sm text-gray-500 mt-2">Total Paid</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Currency value={summary.pendingPayment} />
        <p className="text-sm text-gray-500 mt-2">Pending Payment</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Currency value={summary.overdue} />
        <p className="text-sm text-gray-500 mt-2">Overdue</p>
      </div>
    </div>
  );
};

export default PaymentsOverview;
