import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  DollarSign,
  CreditCard,
  Banknote,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import payments from '../../../../public/data/payments.json.js';

const AdminEditPaymentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    status: '',
    paymentMethod: '',
    paymentDate: '',
    dueDate: '',
    notes: '',
    transactionId: ''
  });
  const [errors, setErrors] = useState({});
  const [originalPayment, setOriginalPayment] = useState(null);

  useEffect(() => {
    // Find the payment by ID
    const payment = payments.find(p => p.id === id);
    if (payment) {
      setFormData({
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        paymentMethod: payment.paymentMethod,
        paymentDate: payment.paymentDate || '',
        dueDate: payment.dueDate,
        notes: payment.notes || '',
        transactionId: payment.transactionId || ''
      });
      setOriginalPayment(payment);
    }
    setLoading(false);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    if (formData.status === 'Completed' && !formData.paymentDate) {
      newErrors.paymentDate = 'Payment date is required for completed payments';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Updating payment:', formData);
      // In a real app, this would make an API call to update the payment

      navigate(`/admin/payments/${id}`);
    } catch (error) {
      console.error('Error updating payment:', error);
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600';
      case 'Pending':
        return 'text-yellow-600';
      case 'Processing':
        return 'text-blue-600';
      case 'Failed':
        return 'text-red-600';
      case 'Overdue':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'Credit Card':
        return <CreditCard className="h-5 w-5" />;
      case 'Bank Transfer':
        return <Banknote className="h-5 w-5" />;
      case 'PayPal':
        return <DollarSign className="h-5 w-5" />;
      case 'Cash':
        return <DollarSign className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <span className="text-gray-600">Loading payment...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!originalPayment) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Payment not found</h3>
            <p className="mt-1 text-sm text-gray-500">The payment you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/admin/payments')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Back to Payments
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(`/admin/payments/${id}`)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Payment</h1>
            <p className="text-gray-600 mt-1">Update payment information for {originalPayment.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Edit Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Information */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Payment Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                            errors.amount ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.amount && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.amount}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method *
                      </label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                          errors.paymentMethod ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select payment method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Cash">Cash</option>
                      </select>
                      {errors.paymentMethod && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.paymentMethod}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                          errors.status ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select status</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                      {errors.status && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.status}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Due Date *
                      </label>
                      <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                          errors.dueDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.dueDate && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.dueDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Date
                      </label>
                      <input
                        type="date"
                        name="paymentDate"
                        value={formData.paymentDate}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                          errors.paymentDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.paymentDate && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.paymentDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter transaction ID"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Additional Notes</h3>
                </div>
                <div className="p-6">
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Add any additional notes about this payment..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate(`/admin/payments/${id}`)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Update Payment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Current Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`text-sm font-medium ${getStatusColor(originalPayment.status)}`}>
                    {originalPayment.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Amount:</span>
                  <span className="text-sm font-medium text-gray-900">
                    ${originalPayment.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Method:</span>
                  <div className="flex items-center gap-2">
                    {getPaymentMethodIcon(originalPayment.paymentMethod)}
                    <span className="text-sm font-medium">{originalPayment.paymentMethod}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Due Date:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(originalPayment.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setFormData(prev => ({ ...prev, status: 'Completed', paymentDate: new Date().toISOString().split('T')[0] }))}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark as Paid
                </button>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, status: 'Failed' }))}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  Mark as Failed
                </button>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, status: 'Pending' }))}
                  className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Clock className="h-4 w-4" />
                  Mark as Pending
                </button>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Customer</h3>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">{originalPayment.customerName}</p>
                <p className="text-sm text-gray-600">{originalPayment.customerEmail}</p>
                <p className="text-sm text-gray-600">{originalPayment.shipmentRef}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEditPaymentPage;