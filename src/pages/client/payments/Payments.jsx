import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClientLayout from '../../../components/client/layout/ClientLayout';
import PaymentsOverview from '../../../components/client/payments/PaymentsOverview';
import InvoicesList from '../../../components/client/payments/InvoicesList';
import PaymentsHistory from '../../../components/client/payments/PaymentsHistory';
import { getAuthHeader, getApiBaseUrl } from '../../../services/client/authService';

const Payments = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('invoices'); // invoices | history

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        // Call the real API endpoint
        const response = await axios.get(`${getApiBaseUrl()}/clients/payments/data`, {
          headers: getAuthHeader()
        });

        console.log('Fetched payments data:', response.data);
        if (response.data.status === 'success') {
          setData(response.data.data);
        } else {
          setError(response.data.message || 'Failed to load payments data');
        }
      } catch (err) {
        console.error('Error fetching payments data:', err);
        setError('Could not load payments data.');
        // TODO: Handle authentication errors (redirect to login)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </ClientLayout>
    );
  }

  if (error) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="text-red-600 text-lg font-medium">{error}</div>
            <button
              onClick={() => navigate('/client/dashboard')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </ClientLayout>
    );
  }

  const invoices = data?.invoices || [];
  const payments = data?.payments || [];
  const summary = data?.summary || { totalPaid: 0, pendingPayment: 0, overdue: 0 };

  return (
    <ClientLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Payments & Invoices</h1>
            <p className="text-gray-600 mt-1">Manage your invoices and payment history</p>
          </div>

          <PaymentsOverview summary={summary} />

          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                className={`px-4 py-2 rounded-md ${tab === 'invoices' ? 'bg-red-50 text-red-600 border border-red-100' : 'text-gray-600'}`}
                onClick={() => setTab('invoices')}
              >
                Invoices
              </button>
              <button
                className={`px-4 py-2 rounded-md ${tab === 'history' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}
                onClick={() => setTab('history')}
              >
                Payment History
              </button>
            </div>
          </div>

          {tab === 'invoices' && (
            <InvoicesList invoices={invoices} showUnpaidOnly={false} />
          )}

          {tab === 'history' && (
            <PaymentsHistory payments={payments} />
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default Payments;
