import React, { useState } from 'react';
import { X } from 'react-feather';

const PaymentModal = ({ isOpen, onClose, parcel }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !parcel) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Implement actual payment processing
      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
      // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Make Payment</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Payment Details</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Waybill No:</span>
              <span className="font-medium">{parcel.waybillNo}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping Cost:</span>
              <span className="font-medium">${parcel.shippingCost.toFixed(2)}</span>
            </div>
            {/* Add more details as needed */}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={\`p-4 border rounded-lg text-center \${
                  paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-blue-500'
                }\`}
              >
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={\`p-4 border rounded-lg text-center \${
                  paymentMethod === 'paypal'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-blue-500'
                }\`}
              >
                PayPal
              </button>
            </div>
          </div>

          {/* Payment method specific fields would go here */}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={\`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 \${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }\`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;