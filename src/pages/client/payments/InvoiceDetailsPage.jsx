import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Download, CreditCard, FileText, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';
import ClientLayout from '../../../components/client/layout/ClientLayout';
import { getAuthHeader, getApiBaseUrl } from '../../../services/client/authService';

const InvoiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await axios.get(`${getApiBaseUrl()}/clients/invoices/${id}`, {
          headers: getAuthHeader()
        });

        console.log('Fetched invoice details:', response.data);
        if (response.data.status === 'success') {
          setInvoice(response.data.invoice);
        } else {
          setError(response.data.message || 'Failed to load invoice details');
        }
      } catch (err) {
        console.error('Error fetching invoice details:', err);
        setError('Could not load invoice details.');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'PAID': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      'PENDING': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      'OVERDUE': { bg: 'bg-red-100', text: 'text-red-700', icon: Clock }
    };
    
    const config = statusMap[status] || statusMap['PENDING'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-4 h-4 mr-2" />
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <ClientLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading invoice details...</p>
          </div>
        </div>
      </ClientLayout>
    );
  }

  if (error) {
    return (
      <ClientLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-600 text-lg font-medium">{error}</div>
            <button
              onClick={() => navigate('/client/payments')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Back to Payments
            </button>
          </div>
        </div>
      </ClientLayout>
    );
  }

  if (!invoice) {
    return (
      <ClientLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 text-lg font-medium">Invoice not found.</div>
            <button
              onClick={() => navigate('/client/payments')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Back to Payments
            </button>
          </div>
        </div>
      </ClientLayout>
    );
  }

  const isSettled = (invoice.balance ?? 0) <= 0;

  return (
    <ClientLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/client/payments')}
                  className="flex items-center text-gray-500 hover:text-gray-700 mr-6"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Payments
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Invoice {invoice.invoiceId}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                {isSettled && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                    Paid in full
                  </span>
                )}
                {getStatusBadge(invoice.status)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Invoice Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Invoice Summary */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice Information</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Invoice Number</p>
                    <p className="text-base font-medium text-gray-900">{invoice.invoiceId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Shipment Reference</p>
                    <p className="text-base font-medium text-gray-900">{invoice.shipmentRef}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Issue Date</p>
                    <p className="text-base font-medium text-gray-900">{invoice.issueDate}</p>
                  </div>
                  {invoice.dueDate && (
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="text-base font-medium text-gray-900">{invoice.dueDate}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">${invoice.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Balance Due</p>
                    <p className={`text-2xl font-bold ${isSettled ? 'text-green-600' : 'text-red-600'}`}>${invoice.balance.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-base text-gray-900 mt-1">{invoice.description}</p>
                </div>
              </div>

              {/* Parcel Details */}
              {invoice.parcel && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Associated Parcel</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Tracking Number</p>
                      <p className="text-base font-medium text-gray-900">{invoice.parcel.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="text-base font-medium text-gray-900">{invoice.parcel.weight} kg</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-base text-gray-900">{invoice.parcel.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment History */}
              {invoice.paymentHistory && invoice.paymentHistory.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
                  <div className="space-y-4">
                    {invoice.paymentHistory.map((payment) => (
                      <div key={payment.paymentId} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{payment.method}</p>
                          <p className="text-xs text-gray-500">{payment.date}</p>
                          <p className="text-xs text-gray-500">Ref: {payment.reference}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-semibold text-gray-900">${payment.amount.toFixed(2)}</p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            payment.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-900">Total Paid</p>
                      <p className="text-lg font-bold text-green-600">${invoice.totalPaid.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Actions */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </button>
                  {invoice.status !== 'PAID' && invoice.balance > 0 && (
                    <button
                      className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay Now ${invoice.balance.toFixed(2)}
                    </button>
                  )}
                </div>
              </div>

              {/* Invoice Summary */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${invoice.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Paid</span>
                    <span className="font-medium text-green-600">-${invoice.totalPaid.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-base font-semibold">Balance Due</span>
                      <span className={`text-lg font-bold ${isSettled ? 'text-green-600' : 'text-red-600'}`}>${invoice.balance.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default InvoiceDetailsPage;
