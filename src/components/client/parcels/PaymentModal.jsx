import React, { useState } from 'react';
import { X, CreditCard, CheckCircle, Clock } from 'lucide-react';

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
      <div className="flex min-h-full items-center justify-center p-3">
        <div className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-base font-semibold text-gray-900">Payment</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Parcel {parcel.waybillNumber}</span>
                <span className="font-semibold text-sm">${parcel.shippingCost.toFixed(2)}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="block w-full border border-gray-300 rounded-md px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
                <option value="wallet">Digital Wallet</option>
              </select>
            </div>
            
            <div className="flex space-x-2.5">
              <button
                onClick={onClose}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={processing}
                className="flex-1 px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm"
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

export default PaymentModal;