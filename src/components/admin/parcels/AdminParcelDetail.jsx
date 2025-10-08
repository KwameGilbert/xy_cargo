import React, { useState } from 'react';
import { Package, Truck, User, DollarSign, Clock, MapPin, CheckCircle, AlertTriangle, Edit, Split, UserCheck, Calculator, Printer, Send, X, Plus, Minus } from 'lucide-react';

const AdminParcelDetail = ({ parcel }) => {
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showCostModal, setShowCostModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [selectedItemsForSplit, setSelectedItemsForSplit] = useState([]);
  const [newCustomerId, setNewCustomerId] = useState('');
  const [newCost, setNewCost] = useState(parcel.paymentAmount.replace('$', ''));
  const [notificationMessage, setNotificationMessage] = useState('');
  const [editForm, setEditForm] = useState({
    priority: parcel.priority,
    warehouse: parcel.warehouse,
    agent: parcel.agent,
    specialInstructions: parcel.specialInstructions || '',
    adminNotes: parcel.adminNotes || ''
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'In Transit': return 'text-blue-600 bg-blue-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Returned': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="h-4 w-4" />;
      case 'In Transit': return <Truck className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Returned': return <AlertTriangle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const handleSplitParcel = () => {
    // Mock split functionality
    console.log('Splitting parcel with items:', selectedItemsForSplit);
    alert(`Parcel split successful! New parcel created with ${selectedItemsForSplit.length} items.`);
    setShowSplitModal(false);
    setSelectedItemsForSplit([]);
  };

  const handleReassignCustomer = () => {
    // Mock reassign functionality
    console.log('Reassigning to customer:', newCustomerId);
    alert(`Customer reassigned to ${newCustomerId}`);
    setShowReassignModal(false);
    setNewCustomerId('');
  };

  const handleUpdateCost = () => {
    // Mock cost update functionality
    console.log('Updating cost to:', newCost);
    alert(`Cost updated to $${newCost}`);
    setShowCostModal(false);
  };

  const handleEditParcel = () => {
    // Mock edit functionality
    console.log('Updating parcel details:', editForm);
    alert('Parcel details updated successfully!');
    setShowEditModal(false);
  };

  const handleNotifyCustomer = () => {
    // Mock notification functionality
    console.log('Sending notification:', notificationMessage);
    alert('Notification sent to customer!');
    setShowNotifyModal(false);
    setNotificationMessage('');
  };

  const handlePrintInvoice = () => {
    // Mock print functionality
    alert('Printing invoice... (This would open a print dialog in a real application)');
  };

  const handlePrintLabel = () => {
    // Mock print functionality
    alert('Printing label... (This would open a print dialog in a real application)');
  };

  const toggleItemForSplit = (itemId) => {
    setSelectedItemsForSplit(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Parcel {parcel.id}</h1>
            <p className="text-sm text-gray-500">Tracking: {parcel.trackingNumber}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(parcel.status)}`}>
            {getStatusIcon(parcel.status)}
            <span className="ml-2">{parcel.status}</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{parcel.customer.name}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{parcel.warehouse}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">Est. Delivery: {parcel.estimatedDelivery}</span>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Details</h3>
            <div className="bg-gray-50 p-4 rounded-md space-y-2">
              <p className="text-sm"><span className="font-medium">Name:</span> {parcel.customer.name}</p>
              <p className="text-sm"><span className="font-medium">Phone:</span> {parcel.customer.phone}</p>
              <p className="text-sm"><span className="font-medium">Email:</span> {parcel.customer.email}</p>
              <p className="text-sm"><span className="font-medium">Customer ID:</span> {parcel.customer.id}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm whitespace-pre-line">{parcel.customer.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Parcel Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Parcel Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <Package className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Weight</p>
            <p className="text-lg font-semibold text-gray-900">{parcel.totalWeight} kg</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <Package className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-xs text-gray-500 uppercase tracking-wide">Volume</p>
            <p className="text-lg font-semibold text-gray-900">{parcel.totalVolume} m³</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-xs text-gray-500 uppercase tracking-wide">Declared Value</p>
            <p className="text-lg font-semibold text-gray-900">{parcel.totalValue}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-xs text-gray-500 uppercase tracking-wide">Payment Status</p>
            <p className={`text-sm font-semibold ${parcel.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
              {parcel.paymentStatus}
            </p>
          </div>
        </div>
      </div>

      {/* Parcel Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Parcel Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Operational Details</h3>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Priority:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  parcel.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                  parcel.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  parcel.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {parcel.priority}
                </span>
              </p>
              <p className="text-sm"><span className="font-medium">Warehouse:</span> {parcel.warehouse}</p>
              <p className="text-sm"><span className="font-medium">Agent:</span> {parcel.agent}</p>
              <p className="text-sm"><span className="font-medium">Date Created:</span> {parcel.dateCreated}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Information</h3>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Amount:</span> {parcel.paymentAmount}</p>
              <p className="text-sm"><span className="font-medium">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  parcel.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {parcel.paymentStatus}
                </span>
              </p>
              <p className="text-sm"><span className="font-medium">Est. Delivery:</span> {parcel.estimatedDelivery}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Special Information</h3>
            <div className="space-y-2">
              {parcel.specialInstructions && (
                <div className="bg-yellow-50 p-2 rounded">
                  <p className="text-xs font-medium text-yellow-800">Special Instructions:</p>
                  <p className="text-xs text-yellow-700">{parcel.specialInstructions}</p>
                </div>
              )}
              {parcel.adminNotes && (
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-xs font-medium text-blue-800">Admin Notes:</p>
                  <p className="text-xs text-blue-700">{parcel.adminNotes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <button onClick={handlePrintInvoice} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Printer className="h-4 w-4 mr-2" />
            Print Invoice
          </button>
          <button onClick={handlePrintLabel} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Printer className="h-4 w-4 mr-2" />
            Print Label
          </button>
          <button onClick={() => setShowNotifyModal(true)} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Send className="h-4 w-4 mr-2" />
            Notify Customer
          </button>
          <button onClick={() => setShowEditModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Edit className="h-4 w-4 mr-2" />
            Edit Details
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button onClick={() => setShowSplitModal(true)} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Split className="h-4 w-4 mr-2" />
            Split Parcel
          </button>
          <button onClick={() => setShowReassignModal(true)} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <UserCheck className="h-4 w-4 mr-2" />
            Reassign Customer
          </button>
          <button onClick={() => setShowCostModal(true)} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Calculator className="h-4 w-4 mr-2" />
            Update Cost
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            <Edit className="h-4 w-4 mr-2" />
            Update Status
          </button>
        </div>
      </div>

      {/* Items and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Items */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Items in Parcel</h2>
          <div className="space-y-4">
            {parcel.items.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-500">Dimensions: {item.dimensions.length} × {item.dimensions.width} × {item.dimensions.height} cm</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{item.value}</p>
                    <p className="text-sm text-gray-500">{item.weight} kg</p>
                  </div>
                </div>
                {item.specialPackaging && (
                  <div className="mt-2 flex items-center text-yellow-600">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Special Packaging Required</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Parcel Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Weight</span>
              <span className="text-sm font-medium">{parcel.totalWeight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Volume</span>
              <span className="text-sm font-medium">{parcel.totalVolume} m³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Value</span>
              <span className="text-sm font-medium">{parcel.totalValue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Payment Status</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${parcel.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {parcel.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Payment Amount</span>
              <span className="text-sm font-medium">{parcel.paymentAmount}</span>
            </div>
          </div>
          {parcel.specialInstructions && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-md">
              <h4 className="text-sm font-medium text-yellow-800">Special Instructions</h4>
              <p className="text-sm text-yellow-700 mt-1">{parcel.specialInstructions}</p>
            </div>
          )}
          {parcel.adminNotes && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <h4 className="text-sm font-medium text-blue-800">Admin Notes</h4>
              <p className="text-sm text-blue-700 mt-1">{parcel.adminNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Timeline</h2>
        <div className="space-y-4">
          {parcel.statusTimeline.map((event, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100">
                  {getStatusIcon(event.status)}
                </div>
              </div>
              <div className="ml-4 min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">{event.status}</div>
                <div className="text-sm text-gray-500">{event.date}</div>
                <div className="text-sm text-gray-500">{event.location}</div>
              </div>
              {index < parcel.statusTimeline.length - 1 && (
                <div className="ml-4 flex-shrink-0">
                  <div className="h-8 w-0.5 bg-gray-200"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modals for Admin Actions */}
      {showSplitModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Split Parcel</h3>
              <button onClick={() => setShowSplitModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Select items to move to a new parcel. The remaining items will stay in the current parcel.</p>

            <div className="space-y-3 mb-6">
              {parcel.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItemsForSplit.includes(item.id)}
                      onChange={() => toggleItemForSplit(item.id)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} | Weight: {item.weight}kg | Value: {item.value}</p>
                    </div>
                  </div>
                  {item.specialPackaging && (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" title="Special Packaging Required" />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Split Summary</h4>
              <p className="text-sm text-gray-600">
                {selectedItemsForSplit.length} of {parcel.items.length} items selected for new parcel
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowSplitModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button
                onClick={handleSplitParcel}
                disabled={selectedItemsForSplit.length === 0}
                className="px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Create Split Parcel
              </button>
            </div>
          </div>
        </div>
      )}

      {showReassignModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Reassign Customer</h3>
              <button onClick={() => setShowReassignModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Customer</label>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium">{parcel.customer.name}</p>
                  <p className="text-xs text-gray-500">{parcel.customer.id}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Customer ID</label>
                <input
                  type="text"
                  value={newCustomerId}
                  onChange={(e) => setNewCustomerId(e.target.value)}
                  placeholder="Enter customer ID"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <p className="text-sm text-yellow-800">
                  <AlertTriangle className="h-4 w-4 inline mr-1" />
                  This action will transfer the parcel to a different customer. Make sure the new customer ID is valid.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={() => setShowReassignModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button
                onClick={handleReassignCustomer}
                disabled={!newCustomerId.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Reassign Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {showCostModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Update Cost</h3>
              <button onClick={() => setShowCostModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Cost</label>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-lg font-semibold text-gray-900">{parcel.paymentAmount}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Cost ($)</label>
                <input
                  type="number"
                  value={newCost}
                  onChange={(e) => setNewCost(e.target.value)}
                  placeholder="Enter new cost"
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-blue-800">
                  <Calculator className="h-4 w-4 inline mr-1" />
                  This will update the parcel's cost and may affect billing calculations.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={() => setShowCostModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button
                onClick={handleUpdateCost}
                disabled={!newCost || parseFloat(newCost) < 0}
                className="px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Update Cost
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Edit Parcel Details</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={editForm.priority}
                  onChange={(e) => setEditForm({...editForm, priority: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
                <select
                  value={editForm.warehouse}
                  onChange={(e) => setEditForm({...editForm, warehouse: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Warehouse A">Warehouse A</option>
                  <option value="Warehouse B">Warehouse B</option>
                  <option value="Warehouse C">Warehouse C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Agent</label>
                <input
                  type="text"
                  value={editForm.agent}
                  onChange={(e) => setEditForm({...editForm, agent: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                <textarea
                  value={editForm.specialInstructions}
                  onChange={(e) => setEditForm({...editForm, specialInstructions: e.target.value})}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                <textarea
                  value={editForm.adminNotes}
                  onChange={(e) => setEditForm({...editForm, adminNotes: e.target.value})}
                  rows={2}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleEditParcel} className="px-4 py-2 bg-blue-600 text-white rounded">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showNotifyModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Notify Customer</h3>
              <button onClick={() => setShowNotifyModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-medium">{parcel.customer.name}</p>
                  <p className="text-xs text-gray-500">{parcel.customer.email}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notification Type</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option value="status_update">Status Update</option>
                  <option value="delay">Delivery Delay</option>
                  <option value="custom">Custom Message</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder="Enter notification message..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={() => setShowNotifyModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button
                onClick={handleNotifyCustomer}
                disabled={!notificationMessage.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Send Notification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminParcelDetail;