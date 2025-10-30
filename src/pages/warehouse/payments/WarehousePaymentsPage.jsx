import React, { useEffect, useState } from 'react';
import { Card } from '@radix-ui/themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';
import { getPayments, updatePaymentStatus } from '../../../services/warehouse/paymentService';
import { useToast } from '../../../contexts/ToastContext';

const PaymentsTable = ({ payments, onStatusChange }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {payment.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payment.customerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${payment.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payment.paymentMethod}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={payment.status}
                  onChange={(e) => onStatusChange(payment.id, e.target.value)}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(payment.paymentDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

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

const DateFilter = ({ onFilterChange }) => {
  const [period, setPeriod] = useState('monthly');
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handlePeriodChange = (value) => {
    setPeriod(value);
    setShowCustomRange(value === 'custom');
    if (value !== 'custom') {
      onFilterChange({ period: value });
    }
  };

  const handleCustomDateSubmit = () => {
    if (startDate && endDate) {
      onFilterChange({ startDate, endDate });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={period}
          onChange={(e) => handlePeriodChange(e.target.value)}
          className="px-4 py-2 border rounded-md text-sm min-w-[150px]"
        >
          <option value="daily">Today</option>
          <option value="weekly">Last 7 Days</option>
          <option value="monthly">Last 30 Days</option>
          <option value="custom">Custom Range</option>
        </select>

        {showCustomRange && (
          <div className="flex gap-4 items-center">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 text-sm border rounded-md"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 text-sm border rounded-md"
            />
            <button
              onClick={handleCustomDateSubmit}
              disabled={!startDate || !endDate}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm disabled:opacity-50"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const WarehousePaymentsPage = () => {
  const [data, setData] = useState({ payments: [], summary: {} });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { showToast } = useToast();

  const fetchPayments = async (filters = {}) => {
    setLoading(true);
    try {
      const result = await getPayments(filters);
      if (result.success) {
        setData(result.data);
      } else {
        showToast('error', result.message || 'Failed to load payments');
      }
    } catch (err) {
      showToast('error', 'Failed to load payments data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments({ period: 'monthly' });
  }, []);

  const handleStatusChange = async (paymentId, newStatus) => {
    try {
      const result = await paymentService.updatePaymentStatus(paymentId, newStatus);
      if (result.success) {
        showToast('success', 'Payment status updated successfully');
        fetchPayments(); // Refresh the list
      } else {
        showToast('error', result.message || 'Failed to update payment status');
      }
    } catch (err) {
      showToast('error', 'Failed to update payment status');
    }
  };

  if (loading) {
    return (
      <WarehouseLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </WarehouseLayout>
    );
  }

  const filteredPayments = activeTab === 'all'
    ? data.payments
    : data.payments.filter(p => p.status === activeTab);

  return (
    <WarehouseLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Payments Management</h1>
            <p className="text-gray-600 mt-1">Manage and track all payment transactions</p>
          </div>

          <PaymentSummary summary={data.summary} />
          <DateFilter onFilterChange={fetchPayments} />

          <div className="mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex bg-white p-1 rounded-lg shadow-sm border border-gray-200">
                <TabsTrigger
                  value="all"
                  className={`flex-1 py-2 px-4 text-center rounded-md ${
                    activeTab === 'all' ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-600'
                  }`}
                >
                  All Payments
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className={`flex-1 py-2 px-4 text-center rounded-md ${
                    activeTab === 'pending' ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-600'
                  }`}
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className={`flex-1 py-2 px-4 text-center rounded-md ${
                    activeTab === 'completed' ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-600'
                  }`}
                >
                  Completed
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <PaymentsTable
                  payments={filteredPayments}
                  onStatusChange={handleStatusChange}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </WarehouseLayout>
  );
};

export default WarehousePaymentsPage;