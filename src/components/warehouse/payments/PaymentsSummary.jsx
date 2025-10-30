import React from 'react';
import { Card } from '@radix-ui/themes';

const PaymentSummary = ({ summary }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <Card className="p-6">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">Total Collected</span>
        <span className="text-2xl font-bold text-green-600">
          ${summary?.totalCollected?.toFixed(2) || '0.00'}
        </span>
      </div>
    </Card>

    <Card className="p-6">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">Pending Payments</span>
        <span className="text-2xl font-bold text-amber-600">
          ${summary?.pendingPayment?.toFixed(2) || '0.00'}
        </span>
      </div>
    </Card>

    <Card className="p-6">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">Total Transactions</span>
        <span className="text-2xl font-bold text-blue-600">
          {summary?.totalTransactions || 0}
        </span>
      </div>
    </Card>
  </div>
);

export default PaymentSummary;