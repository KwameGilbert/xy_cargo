import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  CreditCard,
  Banknote,
  User,
  Package,
  Calendar,
  MapPin,
  FileText,
  AlertTriangle,
  Download,
  Mail,
  Phone
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import payments from '../../../../public/data/payments.json.js';

const AdminPaymentDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Find the payment by ID
    const foundPayment = payments.find(p => p.id === id);
    setPayment(foundPayment);
    setLoading(false);
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(`Updating payment ${id} status to ${newStatus}`);
      // In a real app, this would make an API call

      // Update local state
      setPayment(prev => ({
        ...prev,
        status: newStatus,
        paymentDate: newStatus === 'Completed' ? new Date().toISOString().split('T')[0] : null,
        updatedAt: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error updating payment status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Processing':
        return <Clock className="h-4 w-4" />;
      case 'Failed':
        return <XCircle className="h-4 w-4" />;
      case 'Overdue':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <span className="text-gray-600">Loading payment details...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!payment) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
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

  const daysUntilDue = getDaysUntilDue(payment.dueDate);
  const isOverdue = daysUntilDue < 0;

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/admin/payments')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
            <p className="text-gray-600 mt-1">{payment.id}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/admin/payments/${payment.id}/edit`)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Invoice
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Status Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Payment Status</h3>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                  {getStatusIcon(payment.status)}
                  {payment.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getPaymentMethodIcon(payment.paymentMethod)}
                    <span className="text-sm font-medium">{payment.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* Status Update Actions */}
              {payment.status === 'Pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleStatusUpdate('Completed')}
                    disabled={updating}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {updating ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    Mark as Paid
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('Failed')}
                    disabled={updating}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Mark as Failed
                  </button>
                </div>
              )}

              {payment.status === 'Processing' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleStatusUpdate('Completed')}
                    disabled={updating}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {updating ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    Confirm Payment
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('Failed')}
                    disabled={updating}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Mark as Failed
                  </button>
                </div>
              )}
            </div>

            {/* Payment Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Invoice Created</p>
                    <p className="text-sm text-gray-600">{formatDate(payment.issueDate)}</p>
                    <p className="text-xs text-gray-500 mt-1">{payment.description}</p>
                  </div>
                </div>

                {payment.paymentDate && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Payment Completed</p>
                      <p className="text-sm text-gray-600">{formatDate(payment.paymentDate)}</p>
                      {payment.transactionId && (
                        <p className="text-xs text-gray-500 mt-1">Transaction ID: {payment.transactionId}</p>
                      )}
                    </div>
                  </div>
                )}

                {payment.status === 'Failed' && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-100 rounded-full">
                      <XCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Payment Failed</p>
                      <p className="text-sm text-gray-600">{formatDate(payment.updatedAt)}</p>
                      <p className="text-xs text-gray-500 mt-1">{payment.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Services Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {payment.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Package className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-900">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{payment.customerName}</p>
                    <p className="text-sm text-gray-600">{payment.customerEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-900">+1 (555) 123-4567</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-900">123 Main St, City, State</p>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                Send Email
              </button>
            </div>

            {/* Shipment Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipment Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{payment.shipmentRef}</p>
                    <p className="text-sm text-gray-600">Shipment Reference</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{payment.agentName}</p>
                    <p className="text-sm text-gray-600">Assigned Agent</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/admin/shipments/${payment.shipmentId}`)}
                className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                View Shipment
              </button>
            </div>

            {/* Payment Dates */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Important Dates</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Issue Date</p>
                    <p className="text-sm text-gray-600">{formatDate(payment.issueDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className={`h-5 w-5 ${isOverdue ? 'text-red-400' : 'text-gray-400'}`} />
                  <div>
                    <p className={`text-sm font-medium ${isOverdue ? 'text-red-900' : 'text-gray-900'}`}>
                      Due Date
                    </p>
                    <p className={`text-sm ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                      {formatDate(payment.dueDate)}
                      {isOverdue && ` (${Math.abs(daysUntilDue)} days overdue)`}
                      {daysUntilDue === 0 && ' (Due today)'}
                      {daysUntilDue > 0 && ` (${daysUntilDue} days left)`}
                    </p>
                  </div>
                </div>
                {payment.paymentDate && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment Date</p>
                      <p className="text-sm text-gray-600">{formatDate(payment.paymentDate)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            {payment.notes && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
                <p className="text-sm text-gray-600">{payment.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPaymentDetailPage;