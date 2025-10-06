import React, { useState } from 'react';
import { Search, Filter, Download, ChevronDown, Calendar, CreditCard, User, DollarSign } from 'lucide-react';

const PaymentMethodIcon = ({ method }) => {
  switch (method?.toLowerCase()) {
    case 'credit card':
      return <CreditCard className="w-4 h-4 text-blue-500" />;
    case 'bank transfer':
      return <DollarSign className="w-4 h-4 text-green-500" />;
    case 'cash':
      return <DollarSign className="w-4 h-4 text-yellow-500" />;
    default:
      return <CreditCard className="w-4 h-4 text-gray-500" />;
  }
};

const PaymentsHistory = ({ payments }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Filter payments based on search term and filters
  const filteredPayments = payments.filter(payment => {
    // Search filter
    const searchMatch = 
      payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Method filter
    const methodMatch = methodFilter === 'ALL' || payment.method === methodFilter;
    
    // Date filter (simplified for demo)
    let dateMatch = true;
    if (dateFilter === 'THIS_MONTH') {
      // Implement date filtering logic here
      dateMatch = true; // Placeholder
    }
    
    return searchMatch && methodMatch && dateMatch;
  });

  // Sort payments
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortBy === 'customer') {
      return sortOrder === 'asc' 
        ? (a.customerName || '').localeCompare(b.customerName || '') 
        : (b.customerName || '').localeCompare(a.customerName || '');
    }
    return 0;
  });

  if (!payments || payments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6">Payment History</h3>
        <p className="text-gray-500 text-center py-8">No payment history available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Payment History</h3>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-md text-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md text-sm">
            + Record Payment
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search payments by ID, invoice, or customer..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <button 
          className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" /> 
          Filters
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select 
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
            >
              <option value="ALL">All Methods</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="Check">Check</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select 
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="ALL">All Time</option>
              <option value="TODAY">Today</option>
              <option value="THIS_WEEK">This Week</option>
              <option value="THIS_MONTH">This Month</option>
              <option value="LAST_MONTH">Last Month</option>
              <option value="CUSTOM">Custom Range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <div className="flex gap-2">
              <button 
                className={`px-3 py-2 text-sm rounded-md ${sortBy === 'date' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-100'}`}
                onClick={() => toggleSort('date')}
              >
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                className={`px-3 py-2 text-sm rounded-md ${sortBy === 'amount' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-100'}`}
                onClick={() => toggleSort('amount')}
              >
                Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                className={`px-3 py-2 text-sm rounded-md ${sortBy === 'customer' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-100'}`}
                onClick={() => toggleSort('customer')}
              >
                Customer {sortBy === 'customer' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recorded By
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPayments.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  No payments found matching your criteria.
                </td>
              </tr>
            ) : (
              sortedPayments.map(payment => (
                <tr key={payment.paymentId} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {payment.paymentId}
                  </td>
                  <td className="px-4 py-4 text-sm text-blue-600 hover:underline cursor-pointer">
                    {payment.invoiceId}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {payment.customerName || 'N/A'}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {payment.date}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <PaymentMethodIcon method={payment.method} />
                      <span className="ml-1">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1 text-gray-400" />
                      {payment.recordedBy || 'System'}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      Receipt
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {sortedPayments.length} of {payments.length} payments
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
          <button className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-md text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsHistory;