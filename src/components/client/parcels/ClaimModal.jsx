import React, { useState } from 'react';
import { X } from 'react-feather';

const ClaimModal = ({ isOpen, onClose, parcel }) => {
  const [claimType, setClaimType] = useState('delayed');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !parcel) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate claim submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Implement actual claim submission
      onClose();
    } catch (error) {
      console.error('Claim submission failed:', error);
      // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Submit Claim</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Parcel Details</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Waybill No:</span>
              <span className="font-medium">{parcel.waybillNo}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium">{parcel.status}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Claim Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setClaimType('delayed')}
                className={`p-4 border rounded-lg text-center ${
                  claimType === 'delayed'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-blue-500'
                }`}
              >
                Delayed Delivery
              </button>
              <button
                type="button"
                onClick={() => setClaimType('damaged')}
                className={`p-4 border rounded-lg text-center ${
                  claimType === 'damaged'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-blue-500'
                }`}
              >
                Damaged Parcel
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe your issue in detail..."
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
              required
            />
          </div>

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
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Claim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimModal;