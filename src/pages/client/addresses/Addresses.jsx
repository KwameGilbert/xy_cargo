import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ClientLayout from '../../../components/client/layout/ClientLayout';
import { getAuthHeader, getApiBaseUrl } from '../../../services/client/authService';

const Addresses = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        const baseUrl = getApiBaseUrl();
        const [warehousesRes, profileRes] = await Promise.all([
          axios.get(`${baseUrl}/warehouses`),
          axios.get(`${baseUrl}/clients/profile/data`, { headers: getAuthHeader() })
        ]);

        const warehouses = warehousesRes.data?.warehouses || [];
        const client = profileRes.data?.client || null;

        setData({
          warehouses,
          client,
          pageTitle: 'Warehouse Addresses',
          pageDescription: 'Use these addresses for warehouse deliveries. Your customer information is included for identification.'
        });
      } catch (err) {
        console.error('Failed to load warehouse addresses and profile', err);
        setError('Failed to load addresses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const clientName = useMemo(() => {
    if (!data?.client) return null;
    const first = data.client.firstName || data.client.first_name || '';
    const last = data.client.lastName || data.client.last_name || '';
    const name = (data.client.name) ? data.client.name : `${first} ${last}`.trim();
    return name || null;
  }, [data?.client]);

  const customerId = useMemo(() => {
    if (!data?.client) return null;
    const id = data.client.id || data.client.client_id || null;
    if (!id) return null;
    const padded = String(id).padStart(6, '0');
    return `CUST-${padded}`;
  }, [data?.client]);

  const warehouseAddresses = useMemo(() => {
    const base = data?.warehouses || [];
    if (!clientName || !customerId) return base;
    return base.map((w) => ({
      ...w,
      shippingType: w.name || 'Warehouse',
      customerName: clientName,
      customerId: customerId,
      line1: w.address || w.name || 'Warehouse Address',
      line2: `Attn: ${clientName} / ${customerId}`,
    }));
  }, [data, clientName, customerId]);

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </ClientLayout>
    );
  }

  const addresses = data?.addresses || [];

  return (
    <ClientLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{data?.pageTitle}</h1>
            <p className="text-gray-600 mt-1">{data?.pageDescription}</p>
          </div>

          {/* Warehouse Addresses Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Warehouse Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {warehouseAddresses.map(addr => (
                <div key={addr.warehouse_id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                  <div className="mb-2 text-sm text-gray-500">Shipping Type: <span className="font-semibold text-gray-900">{addr.shippingType}</span></div>
                  <div className="mb-1 text-sm text-gray-500">Customer Name: <span className="font-semibold text-gray-900">{addr.customerName}</span></div>
                  <div className="mb-1 text-sm text-gray-500">Customer ID: <span className="font-semibold text-gray-900">{addr.customerId}</span></div>
                  <div className="mb-2 font-mono text-sm bg-gray-50 p-2 rounded">
                    <div className="font-semibold text-gray-900">{addr.line1}</div>
                    {addr.line2 && <div className="text-gray-700">{addr.line2}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-2">Use the address and your customer ID for warehouse deliveries. This helps us identify and process your goods quickly.</div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Addresses;
