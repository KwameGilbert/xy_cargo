import PropTypes from 'prop-types';
import { Package, FileText, AlertCircle, Check, Clock } from 'lucide-react';

const WarehouseParcelCard = ({ parcel, onRequestPackaging }) => {
  const {
    id,
    description,
    arrival_date,
    weight,
    dimensions,
    isFragile,
    isPackaged,
    packagingRequested,
    packagingDetails,
    images,
    contents
  } = parcel;

  const getStatusBadge = () => {
    if (isPackaged) {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
          <Check size={14} className="mr-1" />
          Packaged
        </span>
      );
    }
    
    if (packagingRequested) {
      const status = packagingDetails?.status || "processing";
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex items-center">
          <Clock size={14} className="mr-1" />
          Packaging {status === "completed" ? "Complete" : "Requested"}
        </span>
      );
    }
    
    return (
      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full flex items-center">
        <Clock size={14} className="mr-1" />
        Awaiting Packaging
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Image section */}
      <div className="h-40 overflow-hidden relative">
        <img 
          src={images[0] || "https://via.placeholder.com/300x200?text=No+Image"} 
          alt={description}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
        {isFragile && (
          <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium flex items-center">
            <AlertCircle size={14} className="mr-1" />
            Fragile
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{description}</h3>
          {getStatusBadge()}
        </div>

        <p className="text-sm text-gray-500 mb-1">ID: {id}</p>
        <p className="text-sm text-gray-500 mb-1">Arrived: {arrival_date}</p>

        {/* Details section */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600 font-medium">Weight:</span>
              <span className="ml-1 text-gray-800">{weight} kg</span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Dimensions:</span>
              <span className="ml-1 text-gray-800">{dimensions}</span>
            </div>
          </div>

          {/* Contents preview */}
          <div className="mt-3">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FileText size={16} className="mr-1" />
              <span className="font-medium">Contents:</span>
            </div>
            <ul className="text-sm text-gray-700 pl-5 list-disc">
              {contents.map((item, index) => (
                <li key={index} className="truncate">
                  {item.quantity}x {item.name}
                </li>
              )).slice(0, 3)}
              {contents.length > 3 && (
                <li className="text-gray-500 italic">
                  +{contents.length - 3} more items
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
          {!isPackaged && !packagingRequested ? (
            <button
              onClick={onRequestPackaging}
              className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors w-full"
            >
              <Package size={18} className="mr-2" />
              Request Special Packaging
            </button>
          ) : packagingRequested ? (
            <div className="w-full">
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Packaging Type:</span> 
                <span className="ml-1 capitalize">{packagingDetails?.packagingType?.replace('_', ' ')}</span>
              </div>
              {packagingDetails?.additionalOptions?.length > 0 && (
                <div className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Add-ons:</span> 
                  <span className="ml-1">{packagingDetails.additionalOptions.length} selected</span>
                </div>
              )}
              <div className="text-sm text-gray-700">
                <span className="font-medium">Cost:</span> 
                <span className="ml-1">${packagingDetails?.cost?.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div className="w-full text-sm text-green-600 flex items-center">
              <Check size={18} className="mr-2" />
              Standard packaging applied
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

WarehouseParcelCard.propTypes = {
  parcel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    arrival_date: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    dimensions: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    isFragile: PropTypes.bool.isRequired,
    isPackaged: PropTypes.bool.isRequired,
    packagingRequested: PropTypes.bool,
    packagingDetails: PropTypes.object,
    images: PropTypes.arrayOf(PropTypes.string),
    contents: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired,
  onRequestPackaging: PropTypes.func.isRequired
};

export default WarehouseParcelCard;