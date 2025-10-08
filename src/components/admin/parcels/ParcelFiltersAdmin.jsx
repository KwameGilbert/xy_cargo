import React from 'react';

const ParcelFiltersAdmin = ({ onSearch, onFilter, onDateRangeChange, onSort, warehouses, agents }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <input type="text" placeholder="Search parcels..." onChange={(e) => onSearch(e.target.value)} className="border p-2 rounded" />
      <select onChange={(e) => onFilter({ ...filters, status: e.target.value })} className="border p-2 rounded">
        <option value="all">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="In Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
      </select>
      <select onChange={(e) => onFilter({ ...filters, warehouse: e.target.value })} className="border p-2 rounded">
        <option value="all">All Warehouses</option>
        {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
      </select>
      <input type="text" placeholder="Customer name" onChange={(e) => onFilter({ ...filters, customer: e.target.value })} className="border p-2 rounded" />
      <select onChange={(e) => onFilter({ ...filters, agent: e.target.value })} className="border p-2 rounded">
        <option value="all">All Agents</option>
        {agents.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
      <select onChange={(e) => onFilter({ ...filters, paymentStatus: e.target.value })} className="border p-2 rounded">
        <option value="all">All Payment Statuses</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
      </select>
      <input type="date" onChange={(e) => onDateRangeChange({ ...dateRange, startDate: e.target.value })} className="border p-2 rounded" />
      <input type="date" onChange={(e) => onDateRangeChange({ ...dateRange, endDate: e.target.value })} className="border p-2 rounded" />
      <select onChange={(e) => onSort(e.target.value)} className="border p-2 rounded">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="weight">Weight</option>
        <option value="value">Value</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  </div>
);

export default ParcelFiltersAdmin;