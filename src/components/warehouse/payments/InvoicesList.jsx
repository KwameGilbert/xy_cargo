import React, { useState } from 'react';
import InvoiceCard from './InvoiceCard';
import { Search, Filter, Download, Printer, RefreshCw, ChevronDown } from 'lucide-react';

const InvoicesList = ({ invoices, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (invoiceId, newStatus) => {
    if (onStatusChange) {
      onStatusChange(invoiceId, newStatus);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedInvoices(filteredInvoices.map(inv => inv.invoiceId));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleSelectInvoice = (invoiceId) => {
    if (selectedInvoices.includes(invoiceId)) {
      setSelectedInvoices(selectedInvoices.filter(id => id !== invoiceId));
    } else {
      setSelectedInvoices([...selectedInvoices, invoiceId]);
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Filter invoices based on search term and filters
  const filteredInvoices = invoices.filter(invoice => {
    // Search filter
    const searchMatch = 
      invoice.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.shipmentRef.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const statusMatch = statusFilter === 'ALL' || invoice.status === statusFilter;
    
    // Date filter (simplified for demo)
    let dateMatch = true;
    if (dateFilter === 'THIS_MONTH') {
      // Implement date filtering logic here
      dateMatch = true; // Placeholder
    }
    
    return searchMatch && statusMatch && dateMatch;
  });

  // Sort invoices
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.issueDate);
      const dateB = new Date(b.issueDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortBy === 'status') {
      return sortOrder === 'asc' 
        ? a.status.localeCompare(b.status) 
        : b.status.localeCompare(a.status);
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Invoices</h3>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm">
            + Create Invoice
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search invoices by ID, customer, or shipment..."
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="OVERDUE">Overdue</option>
              <option value="PROCESSING">Processing</option>
              <option value="CANCELLED">Cancelled</option>
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
                className={`px-3 py-2 text-sm rounded-md ${sortBy === 'status' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-100'}`}
                onClick={() => toggleSort('status')}
              >
                Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedInvoices.length > 0 && (
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-md mb-4">
          <div className="text-sm">
            <span className="font-medium">{selectedInvoices.length}</span> invoices selected
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1 text-sm text-gray-600 px-3 py-1 border border-gray-300 rounded-md">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button className="inline-flex items-center gap-1 text-sm text-gray-600 px-3 py-1 border border-gray-300 rounded-md">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="inline-flex items-center gap-1 text-sm text-red-600 px-3 py-1 border border-red-300 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedInvoices.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  No invoices found matching your criteria.
                </td>
              </tr>
            ) : (
              sortedInvoices.map(invoice => (
                <tr key={invoice.invoiceId} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedInvoices.includes(invoice.invoiceId)}
                      onChange={() => handleSelectInvoice(invoice.invoiceId)}
                    />
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {invoice.invoiceId}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {invoice.customerName}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {invoice.issueDate}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {invoice.dueDate}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      invoice.status === 'PAID' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      invoice.status === 'OVERDUE' ? 'bg-red-100 text-red-800' :
                      invoice.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium mb-4">Invoice Details</h4>
        {sortedInvoices.length === 0 ? (
          <div className="py-8 text-center text-gray-500">No invoices to show.</div>
        ) : (
          sortedInvoices.map(inv => (
            <InvoiceCard 
              key={inv.invoiceId} 
              invoice={inv} 
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default InvoicesList;