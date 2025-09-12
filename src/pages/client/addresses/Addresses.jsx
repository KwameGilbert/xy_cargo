import React, { useEffect, useState } from 'react';
import axios from 'axios';
import createMockAdapter from '../../../services/mockAdapter';
import addressesData from '../../../data/addresses.json';
import { showToastSync as showToast } from '../../../utils/toast';
import ClientLayout from '../../../components/client/layout/ClientLayout';
import AddressesList from '../../../components/client/addresses/AddressesList';
import AddressFormModal from '../../../components/client/addresses/AddressFormModal';
import ConfirmDialog from '../../../components/client/addresses/ConfirmDialog';
import { Plus } from 'lucide-react';

const STORAGE_KEY = 'fy_addresses_v1';

const Addresses = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // seed localStorage with addresses from source JSON if none exists
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(addressesData.addresses || []));
      }
    } catch (e) {
      // localStorage might not be available in some test environments
      // ignore and continue - adapter will handle missing storage
    }

    // configure axios mock adapter for in-memory API (used for /api/addresses CRUD)
    axios.defaults.adapter = createMockAdapter(STORAGE_KEY);

    // Use the JSON module directly for initial page data (more reliable than fetching '/src/...')
    const fetchData = async () => {
      try {
        const resData = addressesData;
        setAddressesState(resData.addresses || []);
        setData({
          addresses: resData.addresses || [],
          warehouseAddresses: resData.warehouseAddresses || [],
          pageTitle: resData.pageTitle,
          pageDescription: resData.pageDescription
        });
      } catch (err) {
        console.error('Failed to load addresses', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [addressesState, setAddressesState] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmPayload, setConfirmPayload] = useState(null);

  useEffect(() => {
    if (data?.addresses) setAddressesState(data.addresses);
  }, [data]);

  const persist = (next) => {
    setAddressesState(next);
    // keep data in sync (the mock adapter writes to localStorage already)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleAdd = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleDelete = (address) => {
    setConfirmPayload({ action: 'delete', address });
    setConfirmOpen(true);
  };

  const handleSetDefault = (address) => {
    setConfirmPayload({ action: 'setDefault', address });
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!confirmPayload) return;
    const { action, address } = confirmPayload;
    (async () => {
      try {
        if (action === 'delete') {
          await axios.delete(`/api/addresses/${address.id}`);
          const res = await axios.get('/api/addresses');
          persist(res.data || []);
          showToast('Address deleted', 'error');
        }
        if (action === 'setDefault') {
          await axios.put(`/api/addresses/${address.id}`, { ...address, isDefault: true });
          const res = await axios.get('/api/addresses');
          persist(res.data || []);
          showToast('Default address updated', 'success');
        }
      } catch (err) {
        console.error(err);
        showToast('Operation failed', 'error');
      } finally {
        setConfirmOpen(false);
        setConfirmPayload(null);
      }
    })();
  };

  const handleCancelConfirm = () => {
    setConfirmOpen(false);
    setConfirmPayload(null);
  };

  const handleSaveAddress = (addr) => {
    (async () => {
      try {
        if (addr.id) {
          await axios.put(`/api/addresses/${addr.id}`, addr);
          showToast('Address updated', 'success');
        } else {
          await axios.post('/api/addresses', addr);
          showToast('Address added', 'success');
        }
        const res = await axios.get('/api/addresses');
        persist(res.data || []);
      } catch (err) {
        console.error(err);
        showToast('Save failed', 'error');
      } finally {
        setIsFormOpen(false);
        setEditingAddress(null);
      }
    })();
  };

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </ClientLayout>
    );
  }

  const addresses = data?.addresses || [];
  const warehouseAddresses = data?.warehouseAddresses || [];

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
                <div key={addr.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                  <div className="mb-2 text-sm text-gray-500">Shipping Type: <span className="font-semibold text-gray-900">{addr.shippingType}</span></div>
                  <div className="mb-1 text-sm text-gray-500">Customer Name: <span className="font-semibold text-gray-900">{addr.customerName}</span></div>
                  <div className="mb-1 text-sm text-gray-500">Customer ID: <span className="font-semibold text-gray-900">{addr.customerId}</span></div>
                  <div className="mb-2">
                    <div className="font-semibold text-gray-900">{addr.line1}</div>
                    {addr.line2 && <div className="text-gray-700">{addr.line2}</div>}
                    <div className="text-gray-700">{addr.city}, {addr.state} {addr.zip}</div>
                    <div className="text-gray-700">{addr.country}</div>
                  </div>
                  <div className="text-sm text-gray-500">Phone: <span className="font-semibold text-gray-900">{addr.phone}</span></div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-2">Use the address and your customer ID for warehouse deliveries. This helps us identify and process your goods quickly.</div>
          </div>

          <div className="mb-6">
            <button onClick={handleAdd} className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md">
              <Plus className="w-4 h-4" />
              Add New Address
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Shipping Addresses</h2>
            <AddressesList addresses={addressesState} onEdit={handleEdit} onDelete={handleDelete} onSetDefault={handleSetDefault} />
          </div>
        </div>

        <AddressFormModal open={isFormOpen} address={editingAddress} onClose={() => setIsFormOpen(false)} onSave={handleSaveAddress} />
        <ConfirmDialog open={confirmOpen} title={confirmPayload?.action === 'delete' ? 'Delete address' : 'Set default address'} message={
          confirmPayload?.action === 'delete'
            ? `Are you sure you want to delete ${confirmPayload.address.name}? This cannot be undone.`
            : `Set ${confirmPayload?.address.name} as your default shipping address?`
        } onConfirm={handleConfirm} onCancel={handleCancelConfirm} />
      </div>
    </ClientLayout>
  );
};

export default Addresses;
