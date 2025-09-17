import { useState, useEffect } from "react";
import axios from "axios";
import ClientLayout from "../../../components/client/layout/ClientLayout";
import WarehouseParcelCard from "../../../components/client/warehouse/WarehouseParcelCard";
import PackagingRequestModal from "../../../components/client/warehouse/PackagingRequestModal";
import PackagingRequestHistory from "../../../components/client/warehouse/PackagingRequestHistory";

const WarehouseParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [packagingOptions, setPackagingOptions] = useState([]);
  const [packagingRequests, setPackagingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, packaged

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch warehouse parcels data
        const parcelsResponse = await axios.get("/data/warehouse_parcels.json");
        setParcels(parcelsResponse.data);
        
        // Fetch packaging options data
        const optionsResponse = await axios.get("/data/packaging_options.json");
        setPackagingOptions(optionsResponse.data);
        
        // Extract packaging requests from parcels data
        const requests = parcelsResponse.data
          .filter(parcel => parcel.packagingRequested)
          .map(parcel => ({
            id: `req-${parcel.id}`,
            parcelId: parcel.id,
            parcelInfo: {
              description: parcel.description,
              weight: parcel.weight,
              dimensions: parcel.dimensions
            },
            packagingType: parcel.packagingDetails?.packagingType || "",
            additionalOptions: parcel.packagingDetails?.additionalOptions || [],
            cost: parcel.packagingDetails?.cost || 0,
            status: parcel.packagingDetails?.status || "processing",
            requestDate: parcel.packagingDetails?.requestDate || "",
            completionDate: parcel.isPackaged ? "2024-09-15" : null
          }));
          
        setPackagingRequests(requests);
      } catch (error) {
        console.error("Error fetching warehouse data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRequestPackaging = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
  };

  const handlePackagingSubmit = async (requestData) => {
    try {
      // In a real app, this would be an API call to submit the packaging request
      console.log("Packaging request submitted:", requestData);
      
      // Update the local state to reflect the change
      setParcels(prevParcels => 
        prevParcels.map(parcel => 
          parcel.id === requestData.parcelId 
            ? {...parcel, packagingRequested: true, packagingDetails: requestData}
            : parcel
        )
      );
      
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting packaging request:", error);
    }
  };

  const filteredParcels = parcels.filter(parcel => {
    if (filter === "all") return true;
    if (filter === "pending") return !parcel.packagingRequested && !parcel.isPackaged;
    if (filter === "packaged") return parcel.isPackaged;
    if (filter === "requested") return parcel.packagingRequested && !parcel.isPackaged;
    return true;
  });

  if (loading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Warehouse Parcels</h1>
          <p className="text-gray-600 mt-1">
            View and manage your parcels currently at our warehouse
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex space-x-4 mb-6">
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${filter === "all" 
              ? "bg-red-600 text-white" 
              : "bg-white border border-gray-300 text-gray-700"}`}
          >
            All Parcels
          </button>
          <button 
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-md ${filter === "pending" 
              ? "bg-red-600 text-white" 
              : "bg-white border border-gray-300 text-gray-700"}`}
          >
            Pending Packaging
          </button>
          <button 
            onClick={() => setFilter("requested")}
            className={`px-4 py-2 rounded-md ${filter === "requested" 
              ? "bg-red-600 text-white" 
              : "bg-white border border-gray-300 text-gray-700"}`}
          >
            Packaging Requested
          </button>
          <button 
            onClick={() => setFilter("packaged")}
            className={`px-4 py-2 rounded-md ${filter === "packaged" 
              ? "bg-red-600 text-white" 
              : "bg-white border border-gray-300 text-gray-700"}`}
          >
            Packaged
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {/* Parcels grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredParcels.length > 0 ? (
                filteredParcels.map((parcel) => (
                  <WarehouseParcelCard
                    key={parcel.id}
                    parcel={parcel}
                    onRequestPackaging={() => handleRequestPackaging(parcel)}
                  />
                ))
              ) : (
                <div className="col-span-full py-8 text-center bg-white rounded-lg shadow">
                  <p className="text-gray-500">No parcels found matching the selected filter.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Request history sidebar */}
          <div className="lg:col-span-1">
            <PackagingRequestHistory requests={packagingRequests} />
          </div>
        </div>

        {/* Packaging request modal */}
        {isModalOpen && selectedParcel && (
          <PackagingRequestModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handlePackagingSubmit}
            parcel={selectedParcel}
            packagingOptions={packagingOptions}
          />
        )}
      </div>
    </ClientLayout>
  );
};

export default WarehouseParcels;