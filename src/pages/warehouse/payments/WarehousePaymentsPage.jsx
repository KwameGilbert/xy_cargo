import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WarehouseLayout from '../../../components/warehouse/layout/WarehouseLayout';
import PaymentsOverview from '../../../components/warehouse/payments/PaymentsOverview';
import InvoicesList from '../../../components/warehouse/payments/InvoicesList';
import PaymentsHistory from '../../../components/warehouse/payments/PaymentsHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

const WarehousePaymentsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('invoices'); // invoices | history

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/data/warehouse_payments.json');
        setData(res.data);
      } catch (err) {
        console.error('Failed to load warehouse payments data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (invoiceId, newStatus) => {
    // In a real application, this would make an API call to update the status
    console.log(`Updating invoice ${invoiceId} status to ${newStatus}`);
    
    // For demo purposes, update the local state
    if (data && data.invoices) {
      const updatedInvoices = data.invoices.map(inv => 
        inv.invoiceId === invoiceId ? { ...inv, status: newStatus } : inv
      );
      setData({ ...data, invoices: updatedInvoices });
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

  const invoices = data?.invoices || [];
  const payments = data?.payments || [];

  return (
    <WarehouseLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{data?.pageTitle}</h1>
            <p className="text-gray-600 mt-1">{data?.pageDescription}</p>
          </div>

          {data?.summary && <PaymentsOverview summary={data.summary} />}

          <div className="mb-6">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex bg-white p-1 rounded-lg shadow-sm border border-gray-200">
                <TabsTrigger 
                  value="invoices" 
                  className={`flex-1 py-2 px-4 text-center rounded-md ${activeTab === 'invoices' ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-600'}`}
                >
                  Invoices
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className={`flex-1 py-2 px-4 text-center rounded-md ${activeTab === 'history' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600'}`}
                >
                  Payment History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="invoices" className="mt-6">
                <InvoicesList 
                  invoices={invoices} 
                  onStatusChange={handleStatusChange}
                />
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <PaymentsHistory payments={payments} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </WarehouseLayout>
  );
};

export default WarehousePaymentsPage;