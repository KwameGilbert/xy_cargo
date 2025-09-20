import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Package, Search, Filter, ChevronDown, ChevronRight, MapPin, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock, Truck, CreditCard, FileText, Eye, X } from 'lucide-react';
import ClientLayout from '../../../components/client/layout/ClientLayout';

const ParcelsPage = () => {
  const [parcels, setParcels] = useState([]);
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedParcel, setExpandedParcel] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    payment: 'all',
    warehouse: 'all',
    dateRange: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [modalType, setModalType] = useState(null); // 'tracking', 'payment', 'claim'

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch comprehensive parcels data
        const parcelsRes = await axios.get('/data/parcels.json');
        setParcels(parcelsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Use the comprehensive parcels data directly
  const combinedParcels = parcels;

  // Filter parcels based on search and filters
  const filteredParcels = combinedParcels.filter(parcel => {
    const matchesSearch = !searchQuery || 
      parcel.waybillNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filters.status === 'all' || 
      parcel.status === filters.status;

    const matchesPayment = filters.payment === 'all' || 
      parcel.paymentStatus.toLowerCase() === filters.payment.toLowerCase();

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status) => {
    const statusMap = {
      'AT_WAREHOUSE': { bg: 'bg-gray-100', text: 'text-gray-700', icon: Package },
      'IN_TRANSIT': { bg: 'bg-blue-100', text: 'text-blue-700', icon: Truck },
      'DELIVERED': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      'DELAYED': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle },
      'PROCESSING': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock }
    };
    
    const statusKey = status.toUpperCase();
    const config = statusMap[statusKey] || statusMap['AT_WAREHOUSE'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getPaymentBadge = (status) => {
    const isPaid = status === 'PAID';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {isPaid ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
        {status}
      </span>
    );
  };

  const handleAction = (parcel, action) => {
    setSelectedParcel(parcel);
    setModalType(action);
  };

  const closeModal = () => {
    setSelectedParcel(null);
    setModalType(null);
  };

  const toggleExpanded = (parcelId) => {
    setExpandedParcel(expandedParcel === parcelId ? null : parcelId);
  };

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="p-4 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Parcels</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your parcels in one place
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Parcels</p>
                <p className="text-xl font-semibold text-gray-900">{combinedParcels.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">In Transit</p>
                <p className="text-xl font-semibold text-gray-900">
                  {combinedParcels.filter(p => p.status === 'IN_TRANSIT' || p.status === 'PROCESSING').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Unpaid</p>
                <p className="text-xl font-semibold text-gray-900">
                  {combinedParcels.filter(p => p.paymentStatus === 'UNPAID').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Delivered</p>
                <p className="text-xl font-semibold text-gray-900">
                  {combinedParcels.filter(p => p.status === 'DELIVERED').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Search by waybill, description, or tracking number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {showFilters ? <ChevronDown className="h-4 w-4 ml-2" /> : <ChevronRight className="h-4 w-4 ml-2" />}
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="AT_WAREHOUSE">At Warehouse</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="DELAYED">Delayed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
                  <select
                    value={filters.payment}
                    onChange={(e) => setFilters({...filters, payment: e.target.value})}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">All Payment</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => setFilters({status: 'all', payment: 'all', warehouse: 'all', dateRange: 'all'})}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Parcels Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waybill
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Update
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredParcels.map((parcel) => (
                  <>
                    <tr key={parcel.waybillNumber} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{parcel.waybillNumber}</div>
                            <div className="text-sm text-gray-500">{parcel.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(parcel.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {parcel.weight} kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${parcel.shippingCost.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPaymentBadge(parcel.paymentStatus)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {parcel.lastUpdate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleExpanded(parcel.waybillNumber)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Track
                          </button>
                          {parcel.paymentStatus === 'UNPAID' && (
                            <button
                              onClick={() => handleAction(parcel, 'payment')}
                              className="text-green-600 hover:text-green-900 flex items-center"
                            >
                              <CreditCard className="h-4 w-4 mr-1" />
                              Pay
                            </button>
                          )}
                          {(parcel.status === 'DELAYED') && (
                            <button
                              onClick={() => handleAction(parcel, 'claim')}
                              className="text-red-600 hover:text-red-900 flex items-center"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Claim
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Tracking Timeline */}
                    {expandedParcel === parcel.waybillNumber && (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 bg-gray-50">
                          <div className="border-l-4 border-red-500 pl-4">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Tracking Timeline</h4>
                            <div className="space-y-4">
                              {parcel.trackingHistory.length > 0 ? (
                                parcel.trackingHistory.map((event, idx) => (
                                  <div key={idx} className="flex items-start">
                                    <div className="flex-shrink-0">
                                      <div className={`w-3 h-3 rounded-full ${
                                        event.active ? 'bg-red-500' : 'bg-gray-300'
                                      }`}></div>
                                      {idx < parcel.trackingHistory.length - 1 && (
                                        <div className="w-0.5 h-8 bg-gray-200 ml-1.5"></div>
                                      )}
                                    </div>
                                    <div className="ml-4 flex-1">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <p className={`font-medium ${
                                            event.active ? 'text-red-700' : 'text-gray-700'
                                          }`}>
                                            {event.status}
                                          </p>
                                          <p className="text-sm text-gray-600">{event.description}</p>
                                          <p className="text-xs text-gray-500 flex items-center mt-1">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {event.location}
                                          </p>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          {event.date}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-gray-500 text-sm">
                                  No tracking information available yet.
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {modalType === 'payment' && selectedParcel && (
          <PaymentModal parcel={selectedParcel} onClose={closeModal} />
        )}
        
        {modalType === 'claim' && selectedParcel && (
          <ClaimModal parcel={selectedParcel} onClose={closeModal} />
        )}
      </div>
    </ClientLayout>
  );
};

// Payment Modal Component
const PaymentModal = ({ parcel, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-900">Payment</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Parcel {parcel.waybillNumber}</span>
                <span className="font-semibold">${parcel.shippingCost.toFixed(2)}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
                <option value="wallet">Digital Wallet</option>
              </select>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={processing}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {processing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Claim Modal Component
const ClaimModal = ({ parcel, onClose }) => {
  const [claimType, setClaimType] = useState('damage');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate claim submission
    setTimeout(() => {
      setSubmitting(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-900">Open Claim</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Parcel {parcel.waybillNumber}</div>
              <div className="text-sm text-gray-600">Status: {parcel.status}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Claim Type</label>
              <select
                value={claimType}
                onChange={(e) => setClaimType(e.target.value)}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="damage">Damage</option>
                <option value="delay">Delay</option>
                <option value="loss">Loss</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Describe the issue..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || !description.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Claim'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelsPage;
