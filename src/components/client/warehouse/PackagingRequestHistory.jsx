import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Package, ArrowRight, CheckCircle, Clock, XCircle } from "lucide-react";

const PackagingRequestHistory = ({ requests }) => {
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filter, setFilter] = useState("all"); // all, pending, completed, rejected

  useEffect(() => {
    if (!requests || !requests.length) {
      setFilteredRequests([]);
      return;
    }

    if (filter === "all") {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(request => request.status === filter));
    }
  }, [requests, filter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock size={12} className="mr-1" />
            Processing
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Clock size={12} className="mr-1" />
            Pending
          </span>
        );
    }
  };

  if (!requests || requests.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="text-center py-6">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No packaging requests</h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven't made any special packaging requests yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Packaging Request History</h3>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-xs rounded-full ${
              filter === "all"
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("processing")}
            className={`px-3 py-1 text-xs rounded-full ${
              filter === "processing"
                ? "bg-blue-200 text-blue-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 text-xs rounded-full ${
              filter === "completed"
                ? "bg-green-200 text-green-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-3 py-1 text-xs rounded-full ${
              filter === "rejected"
                ? "bg-red-200 text-red-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredRequests.map((request) => (
          <div key={request.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  {request.parcelInfo.description}
                </span>
                <div className="mt-1 text-xs text-gray-500">
                  Parcel ID: {request.parcelId}
                </div>
              </div>
              {getStatusBadge(request.status)}
            </div>
            
            <div className="mt-2 flex items-center text-xs text-gray-500 space-x-1">
              <div className="font-medium">Requested:</div>
              <div>{request.requestDate}</div>
              {request.completionDate && (
                <>
                  <ArrowRight className="h-3 w-3 mx-1" />
                  <div className="font-medium">Completed:</div>
                  <div>{request.completionDate}</div>
                </>
              )}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Packaging:</span>
                <span className="ml-1 text-gray-700 capitalize">
                  {request.packagingType?.replace("_", " ")}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Cost:</span>
                <span className="ml-1 text-gray-700">${request.cost?.toFixed(2)}</span>
              </div>
            </div>

            {request.additionalOptions?.length > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                <span>Add-ons:</span>
                <span className="ml-1 text-gray-700">
                  {request.additionalOptions
                    .map(option => option.replace("_", " "))
                    .join(", ")}
                </span>
              </div>
            )}

            {request.notes && (
              <div className="mt-2 text-xs">
                <span className="text-gray-500">Notes:</span>
                <span className="ml-1 text-gray-700">{request.notes}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

PackagingRequestHistory.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      parcelId: PropTypes.string.isRequired,
      parcelInfo: PropTypes.object,
      packagingType: PropTypes.string.isRequired,
      additionalOptions: PropTypes.array,
      cost: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      requestDate: PropTypes.string.isRequired,
      completionDate: PropTypes.string,
      notes: PropTypes.string
    })
  ).isRequired
};

export default PackagingRequestHistory;