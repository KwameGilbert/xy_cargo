import { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { X, AlertCircle, Package, Check } from 'lucide-react';

const PackagingRequestModal = ({ isOpen, onClose, onSubmit, parcel, packagingOptions }) => {
  const [selectedPackaging, setSelectedPackaging] = useState('');
  const [additionalOptions, setAdditionalOptions] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [basePackagingOptions, setBasePackagingOptions] = useState([]);
  const [additionalPackagingOptions, setAdditionalPackagingOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (packagingOptions && packagingOptions.length > 0) {
      // Filter base packaging options
      const baseOptions = packagingOptions.filter(option => option.id !== 'additional_options');
      setBasePackagingOptions(baseOptions);

      // Get additional options
      const additionalOpts = packagingOptions.find(option => option.id === 'additional_options')?.options || [];
      setAdditionalPackagingOptions(additionalOpts);
    }
  }, [packagingOptions]);

  useEffect(() => {
    // Calculate total cost whenever selections change
    let cost = 0;
    
    // Add base packaging cost
    if (selectedPackaging) {
      const baseOption = basePackagingOptions.find(option => option.id === selectedPackaging);
      cost += baseOption?.basePrice || 0;
    }
    
    // Add additional options cost
    additionalOptions.forEach(optionId => {
      const option = additionalPackagingOptions.find(opt => opt.id === optionId);
      cost += option?.price || 0;
    });
    
    setTotalCost(cost);
  }, [selectedPackaging, additionalOptions, basePackagingOptions, additionalPackagingOptions]);

  const handleBaseOptionChange = (optionId) => {
    setSelectedPackaging(optionId);
  };

  const handleAdditionalOptionToggle = (optionId) => {
    setAdditionalOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  const handleSubmit = async () => {
    if (!selectedPackaging) {
      return; // Require at least a base packaging option
    }
    
    setLoading(true);
    
    try {
      // Prepare the request data
      const requestData = {
        parcelId: parcel.id,
        packagingType: selectedPackaging,
        additionalOptions: additionalOptions,
        cost: totalCost,
        requestDate: new Date().toISOString().split('T')[0]
      };
      
      await onSubmit(requestData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                  >
                    <Package className="mr-2" size={20} />
                    Request Special Packaging
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="mb-4 p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium text-gray-700 mb-2">Parcel Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">ID:</span>
                        <span className="ml-2 text-gray-800">{parcel.id}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Description:</span>
                        <span className="ml-2 text-gray-800">{parcel.description}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Weight:</span>
                        <span className="ml-2 text-gray-800">{parcel.weight} kg</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Dimensions:</span>
                        <span className="ml-2 text-gray-800">{parcel.dimensions}</span>
                      </div>
                    </div>
                    {parcel.isFragile && (
                      <div className="mt-2 flex items-center text-amber-600">
                        <AlertCircle size={16} className="mr-1" />
                        <span className="text-sm">This is a fragile item and requires careful packaging</span>
                      </div>
                    )}
                  </div>

                  <div className="my-6">
                    <h4 className="font-medium text-gray-700 mb-3">Select Packaging Type</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {basePackagingOptions.map((option) => (
                        <div 
                          key={option.id}
                          className={`border rounded-md p-4 cursor-pointer transition-colors ${
                            selectedPackaging === option.id 
                              ? 'border-red-500 bg-red-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleBaseOptionChange(option.id)}
                        >
                          <div className="flex justify-between items-center">
                            <h5 className="font-medium text-gray-800">{option.name}</h5>
                            {selectedPackaging === option.id && (
                              <Check className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                          <div className="mt-2 text-red-600 font-medium">
                            ${option.basePrice.toFixed(2)}
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Recommended for: {option.recommendedFor.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="my-6">
                    <h4 className="font-medium text-gray-700 mb-3">Additional Options</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {additionalPackagingOptions.map((option) => (
                        <div 
                          key={option.id}
                          className="flex items-center"
                        >
                          <input
                            type="checkbox"
                            id={`option-${option.id}`}
                            checked={additionalOptions.includes(option.id)}
                            onChange={() => handleAdditionalOptionToggle(option.id)}
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`option-${option.id}`} className="ml-3 flex-1">
                            <div className="text-sm font-medium text-gray-700">{option.name} (${option.price.toFixed(2)})</div>
                            <div className="text-xs text-gray-500">{option.description}</div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-medium text-gray-900">Total Cost:</span>
                      <span className="text-lg font-bold text-red-600">${totalCost.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center ${
                          !selectedPackaging || loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={handleSubmit}
                        disabled={!selectedPackaging || loading}
                      >
                        {loading ? (
                          <><span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> Processing...</>
                        ) : (
                          'Submit Request'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

PackagingRequestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  parcel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    dimensions: PropTypes.string.isRequired,
    isFragile: PropTypes.bool.isRequired
  }).isRequired,
  packagingOptions: PropTypes.array.isRequired
};

export default PackagingRequestModal;