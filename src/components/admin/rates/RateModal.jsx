import React, { useState } from 'react';
import { XCircle } from 'lucide-react';

const RateModal = ({ isOpen, onClose, rate, onSave, mode }) => {
  const [formData, setFormData] = useState(rate || {
    name: '',
    type: 'air',
    category: 'economy',
    origin: '',
    destination: '',
    ratePerKg: 0,
    ratePerCbm: 0,
    flatRate: 0,
    minimumCharge: 0,
    currency: 'ZMW',
    effectiveFrom: '',
    effectiveTo: '',
    status: 'active',
    priority: 1,
    conditions: {
      minWeight: 0,
      maxWeight: null,
      minVolume: 0,
      maxVolume: null,
      containerSize: ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConditionChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        [field]: value === '' ? null : Number(value)
      }
    }));
  };

  const handleConditionTextChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        [field]: value
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {mode === 'create' ? 'Create New Rate' : 'Edit Rate'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {mode === 'create' ? 'Add a new shipping rate' : 'Modify existing rate details'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rate Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="air">Air Freight</option>
                  <option value="sea">Sea Freight</option>
                  <option value="road">Road Freight</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                {formData.type === 'air' && (
                  <>
                    <option value="economy">Economy</option>
                    <option value="express">Express</option>
                    <option value="heavy_cargo">Heavy Cargo</option>
                  </>
                )}
                {formData.type === 'sea' && (
                  <>
                    <option value="lcl">LCL (Less than Container Load)</option>
                    <option value="fcl_20ft">FCL 20ft Container</option>
                    <option value="fcl_40ft">FCL 40ft Container</option>
                    <option value="lcl_express">LCL Express</option>
                  </>
                )}
                {formData.type === 'road' && (
                  <>
                    <option value="local">Local Delivery</option>
                    <option value="express">Express</option>
                    <option value="heavy_cargo">Heavy Cargo</option>
                  </>
                )}
              </select>
            </div>

            {/* Origin and Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Origin</label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => handleChange('origin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., Lusaka"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => handleChange('destination', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., Johannesburg"
                />
              </div>
            </div>

            {/* Rate Components - Dynamic based on type */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Rate Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.type === 'air' || formData.type === 'road' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rate per kg (ZMW)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.ratePerKg}
                        onChange={(e) => handleChange('ratePerKg', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Charge (ZMW)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.minimumCharge}
                        onChange={(e) => handleChange('minimumCharge', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </>
                ) : formData.type === 'sea' ? (
                  formData.category.startsWith('fcl') ? (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Flat Rate (ZMW)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.flatRate}
                        onChange={(e) => handleChange('flatRate', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rate per CBM (ZMW)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.ratePerCbm}
                          onChange={(e) => handleChange('ratePerCbm', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Charge (ZMW)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.minimumCharge}
                          onChange={(e) => handleChange('minimumCharge', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </>
                  )
                ) : null}
              </div>
            </div>

            {/* Conditions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Rate Conditions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.type === 'air' || formData.type === 'road' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Min Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.conditions.minWeight || ''}
                        onChange={(e) => handleConditionChange('minWeight', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.conditions.maxWeight || ''}
                        onChange={(e) => handleConditionChange('maxWeight', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </>
                ) : formData.type === 'sea' ? (
                  formData.category.startsWith('fcl') ? (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Container Size</label>
                      <select
                        value={formData.conditions.containerSize}
                        onChange={(e) => handleConditionTextChange('containerSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="20ft">20ft Container</option>
                        <option value="40ft">40ft Container</option>
                      </select>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Min Volume (CBM)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.conditions.minVolume || ''}
                          onChange={(e) => handleConditionChange('minVolume', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Volume (CBM)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.conditions.maxVolume || ''}
                          onChange={(e) => handleConditionChange('maxVolume', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </>
                  )
                ) : null}
              </div>
            </div>

            {/* Effective Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Effective From</label>
                <input
                  type="date"
                  value={formData.effectiveFrom}
                  onChange={(e) => handleChange('effectiveFrom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Effective To (Optional)</label>
                <input
                  type="date"
                  value={formData.effectiveTo || ''}
                  onChange={(e) => handleChange('effectiveTo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <input
                  type="number"
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  min="1"
                  max="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {mode === 'create' ? 'Create Rate' : 'Update Rate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RateModal;