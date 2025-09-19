import { useState, useEffect } from "react";
import axios from "axios";
import { Package, Box, Clock, Filter, ShoppingBag, Check, X, ChevronRight, ChevronDown, ShieldCheck, Search } from "lucide-react";
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
  const [view, setView] = useState("grid"); // grid, list
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showRequestHistory, setShowRequestHistory] = useState(false);

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
      console.log("Packaging request submitted:", requestData);
      
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
    // First apply status filter
    const statusMatch = 
      filter === "all" ? true :
      filter === "pending" ? !parcel.packagingRequested && !parcel.isPackaged :
      filter === "packaged" ? parcel.isPackaged :
      filter === "requested" ? parcel.packagingRequested && !parcel.isPackaged :
      true;
    
    // Then apply search filter if there's a search query
    const searchMatch = !searchQuery ? true : 
      parcel.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      parcel.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && searchMatch;
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
        {/* Dashboard summary banner */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Total Parcels</div>
              <div className="text-xl font-semibold text-gray-900">{parcels.length}</div>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Pending Packaging</div>
              <div className="text-xl font-semibold text-gray-900">
                {parcels.filter(p => !p.packagingRequested && !p.isPackaged).length}
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Requested Packaging</div>
              <div className="text-xl font-semibold text-gray-900">
                {parcels.filter(p => p.packagingRequested && !p.isPackaged).length}
              </div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Packaged</div>
              <div className="text-xl font-semibold text-gray-900">
                {parcels.filter(p => p.isPackaged).length}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Warehouse Parcels</h1>
          <p className="text-gray-600 mt-1">
            View and manage your parcels currently at our warehouse
          </p>
        </div>

        {/* Search and filter section */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search input */}
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Search by ID or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter buttons - scrollable on mobile */}
          <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0">
            <button 
              onClick={() => setFilter("all")}
              className={`px-3 py-2 rounded-md whitespace-nowrap text-sm ${filter === "all" 
                ? "bg-red-600 text-white" 
                : "bg-white border border-gray-300 text-gray-700"}`}
            >
              All Parcels
            </button>
            <button 
              onClick={() => setFilter("pending")}
              className={`px-3 py-2 rounded-md whitespace-nowrap text-sm ${filter === "pending" 
                ? "bg-red-600 text-white" 
                : "bg-white border border-gray-300 text-gray-700"}`}
            >
              Pending Packaging
            </button>
            <button 
              onClick={() => setFilter("requested")}
              className={`px-3 py-2 rounded-md whitespace-nowrap text-sm ${filter === "requested" 
                ? "bg-red-600 text-white" 
                : "bg-white border border-gray-300 text-gray-700"}`}
            >
              Packaging Requested
            </button>
            <button 
              onClick={() => setFilter("packaged")}
              className={`px-3 py-2 rounded-md whitespace-nowrap text-sm ${filter === "packaged" 
                ? "bg-red-600 text-white" 
                : "bg-white border border-gray-300 text-gray-700"}`}
            >
              Packaged
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {/* Results summary */}
            <div className="mb-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {filteredParcels.length} {filteredParcels.length === 1 ? 'parcel' : 'parcels'}
                {searchQuery && <span> matching "{searchQuery}"</span>}
              </div>
              
              {/* View toggle buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-md ${view === "grid" 
                    ? "bg-gray-200 text-gray-800" 
                    : "bg-white text-gray-600 hover:bg-gray-100"}`}
                >
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-current rounded"></div>
                    <div className="w-2 h-2 bg-current rounded"></div>
                    <div className="w-2 h-2 bg-current rounded"></div>
                    <div className="w-2 h-2 bg-current rounded"></div>
                  </div>
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-md ${view === "list" 
                    ? "bg-gray-200 text-gray-800" 
                    : "bg-white text-gray-600 hover:bg-gray-100"}`}
                >
                  <div className="flex flex-col space-y-1">
                    <div className="w-4 h-1 bg-current rounded"></div>
                    <div className="w-4 h-1 bg-current rounded"></div>
                    <div className="w-4 h-1 bg-current rounded"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Parcels grid/list */}
            {filteredParcels.length > 0 ? (
              view === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredParcels.map((parcel) => (
                    <WarehouseParcelCard
                      key={parcel.id}
                      parcel={parcel}
                      onRequestPackaging={() => handleRequestPackaging(parcel)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
                  {filteredParcels.map((parcel) => (
                    <div key={parcel.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={parcel.images[0] || "https://via.placeholder.com/48?text=No+Image"} 
                            alt={parcel.description}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/48?text=No+Image";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{parcel.description}</div>
                          <div className="text-sm text-gray-500 flex flex-wrap gap-x-4">
                            <span>ID: {parcel.id}</span>
                            <span>{parcel.weight} kg</span>
                            <span>{parcel.dimensions}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {!parcel.isPackaged && !parcel.packagingRequested && (
                          <button
                            onClick={() => handleRequestPackaging(parcel)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                          >
                            Request Packaging
                          </button>
                        )}
                        {parcel.isPackaged && (
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            <Check size={14} className="mr-1" />
                            Packaged
                          </span>
                        )}
                        {parcel.packagingRequested && !parcel.isPackaged && (
                          <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            <Clock size={14} className="mr-1" />
                            Requested
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="py-12 text-center bg-white rounded-lg shadow">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No parcels found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery 
                    ? `No parcels matching "${searchQuery}" in the ${filter} category.` 
                    : `No parcels in the ${filter} category.`}
                </p>
                {searchQuery && (
                  <div className="mt-6">
                    <button
                      onClick={() => setSearchQuery("")}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Request history sidebar - collapsible on mobile */}
          <div className="lg:col-span-1">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowRequestHistory(!showRequestHistory)}
                className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-md text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span>Packaging Request History</span>
                {showRequestHistory ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            
            <div className={`${showRequestHistory ? 'block' : 'hidden'} lg:block`}>
              <PackagingRequestHistory requests={packagingRequests} />
            </div>
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