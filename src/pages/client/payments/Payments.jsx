import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClientLayout from '../../../components/client/layout/ClientLayout';
import PaymentsOverview from '../../../components/client/payments/PaymentsOverview';
import InvoicesList from '../../../components/client/payments/InvoicesList';
import PaymentsHistory from '../../../components/client/payments/PaymentsHistory';

const Payments = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('invoices'); // invoices | history

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/data/payments.json');
        setData(res.data);
      } catch (err) {
        console.error('Failed to load payments data', err);
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

  const invoices = data?.invoices || [];
  const payments = data?.payments || [];

  return (
    <ClientLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{data?.pageTitle}</h1>
            <p className="text-gray-600 mt-1">{data?.pageDescription}</p>
          </div>

          {data?.summary && <PaymentsOverview summary={data.summary} />}

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
            <InvoicesList invoices={invoices} showUnpaidOnly={true} />
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
