import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Copy, Check } from 'lucide-react';
import ClientLayout from '../../../components/client/layout/ClientLayout';
import { getAuthHeader, getApiBaseUrl } from '../../../services/client/authService';

// --- CopyButton Component ---
const CopyButton = ({ textToCopy, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset 'copied' state after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1 rounded-full transition-colors duration-150 ${className} ${copied ? 'bg-green-100 text-green-700' : 'text-gray-400 hover:text-red-600 hover:bg-gray-100'}`}
      title={copied ? 'Copied!' : 'Copy Address'}
      disabled={copied}
    >
      {copied ? (
        // Checkmark Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        // Copy Icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5v2m0-2h8m-8 0h2M14 5v2m-2 0h2m-2 0H8m6 7h2m-2 0v2" />
        </svg>
      )}
    </button>
  );
};
// --- CopyButton Component ---

const Addresses = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedAddressId, setCopiedAddressId] = useState(null);

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

  const copyToClipboard = async (address, addressId) => {
    try {
      const fullAddress = `${address.line1}${address.line2 ? '\n' + address.line2 : ''}`;
      await navigator.clipboard.writeText(fullAddress);
      setCopiedAddressId(addressId);
      setTimeout(() => setCopiedAddressId(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy address:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = `${address.line1}${address.line2 ? '\n' + address.line2 : ''}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedAddressId(addressId);
      setTimeout(() => setCopiedAddressId(null), 2000);
    }
  };

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
    return base.map((w) => {
      const line1 = w.address || w.name || 'Warehouse Address';
      const line2 = `Attn: ${clientName} / ${customerId}`;
      const fullAddress = `${line1}\n${line2}`; // Combine for easy copying

      return {
        ...w,
        shippingType: w.name || 'Warehouse',
        customerName: clientName,
        customerId: customerId,
        line1: line1,
        line2: line2,
        fullAddress: fullAddress, // New field for the copy function
      };
    });
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
  
  // Display error message if there is one
  if (error) {
    return (
      <ClientLayout>
        <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
      </ClientLayout>
    );
  }

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
                <div key={addr.warehouse_id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex flex-col">
                  {/* Header/Info */}
                  <div className="mb-2 text-sm text-gray-500">
                    Shipping Type: <span className="font-semibold text-gray-900">{addr.shippingType}</span>
                  </div>
                  <div className="mb-1 text-sm text-gray-500">
                    Customer Name: <span className="font-semibold text-gray-900">{addr.customerName}</span>
                  </div>
                  <div className="mb-3 text-sm text-gray-500">
                    Customer ID: <span className="font-semibold text-gray-900">{addr.customerId}</span>
                  </div>

                  {/* Address Block with Copy Button */}
                  <div className="flex-grow flex flex-col justify-end">
                    <div className="relative">
                      <div className="font-mono text-sm bg-gray-50 p-3 rounded border border-gray-200 pr-12">
                        <div className="font-semibold text-gray-900">{addr.line1}</div>
                        {addr.line2 && <div className="text-gray-700">{addr.line2}</div>}
                      </div>
                      <button
                        onClick={() => copyToClipboard(addr, addr.warehouse_id)}
                        className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-gray-200 transition-colors duration-200"
                        title="Copy address"
                      >
                        {copiedAddressId === addr.warehouse_id ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Use the address and your customer ID for warehouse deliveries. This helps us identify and process your goods quickly.
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Addresses;