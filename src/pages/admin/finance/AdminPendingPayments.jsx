import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  CreditCard,
  Banknote,
  User,
  Package,
  Calendar,
  MoreVertical
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import payments from '../../../../public/data/payments.json.js';

const AdminPendingPayments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(10);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Filter to only pending payments
  const pendingPayments = payments.filter(payment => payment.status === 'Pending');

  // Further filter and sort
  const filteredAndSortedPayments = useMemo(() => {
    let filtered = pendingPayments.filter(payment => {
      const matchesSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.shipmentRef.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesMethod = methodFilter === 'All' || payment.paymentMethod === methodFilter;

      return matchesSearch && matchesMethod;
    });

    // Sort payments
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'customerName':
          aValue = a.customerName.toLowerCase();
          bValue = b.customerName.toLowerCase();
          break;
        case 'dueDate':
        default:
          aValue = new Date(a.dueDate);
          bValue = new Date(b.dueDate);
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [pendingPayments, searchTerm, methodFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPayments.length / paymentsPerPage);
  const startIndex = (currentPage - 1) * paymentsPerPage;
  const paginatedPayments = filteredAndSortedPayments.slice(startIndex, startIndex + paymentsPerPage);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc'); // Default to ascending for due date
    }
  };

  const handleSelectPayment = (paymentId) => {
    setSelectedPayments(prev =>
      prev.includes(paymentId)
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPayments.length === paginatedPayments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(paginatedPayments.map(payment => payment.id));
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedPayments.length === 0) return;

    // In a real app, this would make API calls to update multiple payments
    console.log(`Performing ${bulkAction} on payments:`, selectedPayments);

    // Simulate API call
    setTimeout(() => {
      setShowBulkModal(false);
      setSelectedPayments([]);
      setBulkAction('');
      // You would refresh the data here
    }, 1000);
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'Credit Card':
        return <CreditCard className="h-4 w-4" />;
      case 'Bank Transfer':
        return <Banknote className="h-4 w-4" />;
      case 'PayPal':
        return <DollarSign className="h-4 w-4" />;
      case 'Cash':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateColor = (dueDate) => {
    const daysUntilDue = getDaysUntilDue(dueDate);
    if (daysUntilDue < 0) return 'text-red-600 font-medium';
    if (daysUntilDue <= 3) return 'text-orange-600 font-medium';
    return 'text-gray-600';
  };

  // Calculate summary statistics for pending payments
  const pendingStats = useMemo(() => {
    const total = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const overdue = pendingPayments.filter(p => getDaysUntilDue(p.dueDate) < 0).length;
    const dueSoon = pendingPayments.filter(p => {
      const days = getDaysUntilDue(p.dueDate);
      return days >= 0 && days <= 3;
    }).length;

    return { total, count: pendingPayments.length, overdue, dueSoon };
  }, [pendingPayments]);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pending Payments</h1>
            <p className="text-gray-600 mt-1">Manage payments awaiting completion</p>
          </div>
          <button
            onClick={() => navigate('/admin/payments')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View All Payments
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{formatCurrency(pendingStats.total)}</p>
                <p className="text-sm text-gray-500">{pendingStats.count} payments</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{pendingStats.overdue}</p>
                <p className="text-sm text-gray-500">payments</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due Soon</p>
                <p className="text-2xl font-bold text-orange-600">{pendingStats.dueSoon}</p>
                <p className="text-sm text-gray-500">within 3 days</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Amount</p>
                <p className="text-2xl font-bold text-blue-600">
                  {pendingStats.count > 0 ? formatCurrency(pendingStats.total / pendingStats.count) : '$0.00'}
                </p>
                <p className="text-sm text-gray-500">per payment</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search pending payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Method Filter */}
            <div>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="All">All Payment Methods</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="PayPal">PayPal</option>
                <option value="Cash">Cash</option>
              </select>
            </div>

            {/* Bulk Actions */}
            <div className="flex gap-2">
              {selectedPayments.length > 0 && (
                <>
                  <select
                    value={bulkAction}
                    onChange={(e) => setBulkAction(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  >
                    <option value="">Bulk Actions</option>
                    <option value="mark_paid">Mark as Paid</option>
                    <option value="send_reminder">Send Reminder</option>
                    <option value="mark_overdue">Mark as Overdue</option>
                  </select>
                  <button
                    onClick={() => setShowBulkModal(true)}
                    disabled={!bulkAction}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Apply
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedPayments.length === paginatedPayments.length && paginatedPayments.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-900">
                  {selectedPayments.length} of {paginatedPayments.length} selected
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedPayments.length === paginatedPayments.length && paginatedPayments.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('customerName')}
                  >
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shipment
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('amount')}
                  >
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('dueDate')}
                  >
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedPayments.map((payment) => {
                  const daysUntilDue = getDaysUntilDue(payment.dueDate);
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedPayments.includes(payment.id)}
                          onChange={() => handleSelectPayment(payment.id)}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payment.id}</div>
                        <div className="text-sm text-gray-500">{formatDate(payment.issueDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{payment.customerName}</div>
                            <div className="text-sm text-gray-500">{payment.customerEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.shipmentRef}</div>
                        <div className="text-sm text-gray-500">{payment.agentName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getPaymentMethodIcon(payment.paymentMethod)}
                          <span className="text-sm text-gray-900">{payment.paymentMethod}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${getDueDateColor(payment.dueDate)}`}>
                          {formatDate(payment.dueDate)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                           daysUntilDue === 0 ? 'Due today' :
                           `${daysUntilDue} days left`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Clock className="h-3 w-3" />
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/payments/${payment.id}`)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/payments/${payment.id}/edit`)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Edit Payment"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Mark as Paid"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {paginatedPayments.map((payment) => {
              const daysUntilDue = getDaysUntilDue(payment.dueDate);
              return (
                <div key={payment.id} className="p-4 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedPayments.includes(payment.id)}
                        onChange={() => handleSelectPayment(payment.id)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.id}</div>
                        <div className="text-sm text-gray-500">{formatDate(payment.issueDate)}</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="h-3 w-3" />
                      Pending
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Customer:</span>
                      <span className="text-sm font-medium text-gray-900">{payment.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Method:</span>
                      <span className="text-sm text-gray-900">{payment.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm ${getDueDateColor(payment.dueDate)}`}>
                        Due: {formatDate(payment.dueDate)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                         daysUntilDue === 0 ? 'Due today' :
                         `${daysUntilDue} days left`}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => navigate(`/admin/payments/${payment.id}`)}
                      className="px-3 py-1.5 text-blue-600 border border-blue-600 rounded text-sm hover:bg-blue-50"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/admin/payments/${payment.id}/edit`)}
                      className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                      Mark Paid
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {paginatedPayments.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No pending payments</h3>
              <p className="mt-1 text-sm text-gray-500">All payments have been processed.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + paymentsPerPage, filteredAndSortedPayments.length)} of {filteredAndSortedPayments.length} pending payments
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (page > totalPages) return null;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm border rounded-lg ${
                        currentPage === page
                          ? 'bg-red-600 text-white border-red-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Action Modal */}
        {showBulkModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Bulk Action</h3>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to {bulkAction === 'mark_paid' ? 'mark as paid' :
                                          bulkAction === 'send_reminder' ? 'send reminders for' :
                                          'mark as overdue'} {selectedPayments.length} payment{selectedPayments.length !== 1 ? 's' : ''}?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowBulkModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBulkAction}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPendingPayments;