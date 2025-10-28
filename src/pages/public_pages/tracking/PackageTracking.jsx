import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Package, Truck, MapPin, CheckCircle, Clock, User } from 'lucide-react';
import { trackParcel } from '../../../services/trackingService';
import { showToast } from '../../../utils/toast';
// import SEO from "../../../components/public_pages/common/SEO/SEO";

const PackageTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      showToast("Please enter a tracking number", "error");
      setError("Please enter a tracking number");
      return;
    }

    setLoading(true);
    setTrackingData(null);
    setError(null);

    // Show loading toast
    showToast("Searching for your package...", "success");

    try {
      const result = await trackParcel(trackingNumber.trim());

      if (!result.success) {
        if (result.code === 404) {
          showToast("No parcel found with this tracking number. Please check and try again.", "error");
          setError('No parcel found with this tracking number. Please check and try again.');
        } else {
          showToast(result.message || 'Unable to track package. Please try again later.', "error");
          setError(result.message || 'Unable to track package. Please try again later.');
        }
        return;
      }

      const data = result.data;

      if (!data.trackingNumber || !data.parcel) {
        showToast('Invalid tracking data received. Please try again later.', "error");
        setError('Invalid tracking data received. Please try again later.');
        return;
      }

      // Transform API data to match component expectations
      const transformedData = {
        trackingNumber: data.trackingNumber,
        parcelId: data.parcel.parcelId,
        status: formatStatus(data.parcel.status),
        currentLocation: getCurrentLocation(data.trackingHistory),
        progress: calculateProgress(data.parcel.status),
        timeline: transformTimeline(data.trackingHistory),
        estimatedDelivery: data.shipment?.expectedDelivery || null,
        lastUpdate: getLastUpdate(data.trackingHistory),
        // Additional comprehensive data
        parcel: {
          description: data.parcel.description,
          weight: data.parcel.weight,
          dimensions: data.parcel.dimensions,
          declaredValue: data.parcel.declaredValue,
          shippingCost: data.parcel.shippingCost,
          paymentStatus: data.parcel.paymentStatus,
          category: data.parcel.category,
          items: data.parcel.items || []
        },
        shipment: data.shipment ? {
          shipmentId: data.shipment.shipmentId,
          waybillNumber: data.shipment.waybillNumber,
          originCountry: data.shipment.originCountry,
          destinationCountry: data.shipment.destinationCountry,
          departureDate: data.shipment.departureDate,
          arrivalDate: data.shipment.arrivalDate,
          priority: data.shipment.priority,
          shippedAt: data.shipment.shippedAt,
          originWarehouse: data.shipment.originWarehouse,
          destinationWarehouse: data.shipment.destinationWarehouse
        } : null,
        client: data.client ? {
          firstName: data.client.firstName,
          lastName: data.client.lastName,
          company: data.client.company
        } : null
      };

      setTrackingData(transformedData);
      
      // Show success message
      const successMessage = data.message || `Package located! Current status: ${transformedData.status}`;
      showToast(successMessage, "success");
    } catch (error) {
      console.error('Tracking error:', error);
      const errorMessage = error.message || 'Unable to track package. Please try again later.';
      showToast(errorMessage, "error");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatStatus = (status) => {
    const statusMap = {
      'RECEIVED': 'Received',
      'PROCESSING': 'Processing',
      'IN_TRANSIT': 'In Transit',
      'OUT_FOR_DELIVERY': 'Out for Delivery',
      'DELIVERED': 'Delivered',
      'PENDING': 'Pending',
      'DAMAGED': 'Damaged',
      'LOST': 'Lost'
    };
    return statusMap[status] || status;
  };

  const getCurrentLocation = (trackingHistory) => {
    if (!trackingHistory || trackingHistory.length === 0) {
      return 'Processing';
    }

    // Get the most recent update location
    const latestUpdate = trackingHistory[trackingHistory.length - 1];
    return latestUpdate.location || 'Unknown';
  };

  const getLastUpdate = (trackingHistory) => {
    if (!trackingHistory || trackingHistory.length === 0) {
      return null;
    }

    const latestUpdate = trackingHistory[trackingHistory.length - 1];
    return latestUpdate.date;
  };

  const calculateProgress = (status) => {
    const statusProgress = {
      'RECEIVED': 20,
      'PROCESSING': 40,
      'PENDING': 40,
      'IN_TRANSIT': 60,
      'OUT_FOR_DELIVERY': 80,
      'DELIVERED': 100,
      'DAMAGED': 0,
      'LOST': 0
    };
    return statusProgress[status] || 0;
  };

  const transformTimeline = (trackingHistory) => {
    if (!trackingHistory || !Array.isArray(trackingHistory)) {
      return [];
    }

    return trackingHistory.map((update, index) => ({
      status: update.status || 'Status Update',
      location: update.location || 'Unknown',
      date: formatDate(update.date),
      description: update.description || update.notes || 'Status update',
      completed: true, // All historical updates are completed
      isLatest: index === trackingHistory.length - 1
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }

      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Unknown';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleTrack();
    }
  };

  const resetTracking = () => {
    setTrackingNumber("");
    setTrackingData(null);
    setError(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50 py-16"
    >
      {/* <SEO 
        title="Track Your Package"
        description="Track your XY Cargo Zambia shipment in real-time. Enter your tracking number to get delivery status and updates on your package."
        keywords="package tracking, shipment tracking, delivery status, tracking number, shipping updates"
        canonical="https://xycargozm.com/tracking"
      /> */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={sectionVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Package Tracking</h1>
          <p className="text-gray-600">Enter your tracking number to get real-time updates on your shipment</p>
        </motion.div>

        {/* Tracking Input */}
        <motion.div variants={sectionVariants} className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter tracking number (e.g., FYC123456789)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              />
            </div>
            <button
              onClick={handleTrack}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center justify-center min-w-[120px] disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="mr-2" size={18} />
                  Track
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Tracking Results */}
        {trackingData && (
          <motion.div
            variants={sectionVariants}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {trackingData.error ? (
              <div className="p-6 text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Tracking Error</h3>
                  <p className="text-red-600">{trackingData.error}</p>
                </div>
              </div>
            ) : (
              <>
                {/* Status Header */}
                <div className="bg-red-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold">Tracking: {trackingData.trackingNumber}</h2>
                      <p className="text-red-100">Status: {trackingData.status}</p>
                    </div>
                    <Package size={48} />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Delivery Progress</span>
                    <span className="text-sm font-medium text-gray-600">{trackingData.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-red-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${trackingData.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-500">Shipped</span>
                    <span className="text-sm text-gray-500">In Transit</span>
                  </div>
                </div>

                {/* Current Status */}
                <div className="p-6 border-b">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Truck className="text-red-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Current Status: {trackingData.status}</h3>
                      <p className="text-gray-600 flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {trackingData.currentLocation}
                      </p>
                      {trackingData.estimatedDelivery && (
                        <p className="text-sm text-gray-500 mt-1">
                          Estimated Delivery: {formatDate(trackingData.estimatedDelivery)}
                        </p>
                      )}
                      {trackingData.lastUpdate && (
                        <p className="text-sm text-gray-500">
                          Last Update: {formatDate(trackingData.lastUpdate)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Parcel Details */}
                {trackingData.parcel && (
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Package className="mr-2" size={20} />
                      Parcel Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="font-medium">{trackingData.parcel.description || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Weight</p>
                        <p className="font-medium">{trackingData.parcel.weight ? `${trackingData.parcel.weight} kg` : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Dimensions</p>
                        <p className="font-medium">{trackingData.parcel.dimensions || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Declared Value</p>
                        <p className="font-medium">{trackingData.parcel.declaredValue ? `$${trackingData.parcel.declaredValue}` : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Shipping Cost</p>
                        <p className="font-medium">{trackingData.parcel.shippingCost ? `$${trackingData.parcel.shippingCost}` : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment Status</p>
                        <p className="font-medium">{trackingData.parcel.paymentStatus || 'N/A'}</p>
                      </div>
                      {trackingData.parcel.category && (
                        <div>
                          <p className="text-sm text-gray-600">Category</p>
                          <p className="font-medium">{trackingData.parcel.category}</p>
                        </div>
                      )}
                    </div>
                    {trackingData.parcel.items && trackingData.parcel.items.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Items</p>
                        <div className="space-y-1">
                          {trackingData.parcel.items.map((item, index) => (
                            <p key={index} className="text-sm">• {item}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Shipment Information */}
                {trackingData.shipment && (
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Truck className="mr-2" size={20} />
                      Shipment Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Waybill Number</p>
                        <p className="font-medium">{trackingData.shipment.waybillNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Priority</p>
                        <p className="font-medium">{trackingData.shipment.priority || 'Standard'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Origin</p>
                        <p className="font-medium">{trackingData.shipment.originCountry || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Destination</p>
                        <p className="font-medium">{trackingData.shipment.destinationCountry || 'N/A'}</p>
                      </div>
                      {trackingData.shipment.departureDate && (
                        <div>
                          <p className="text-sm text-gray-600">Departure Date</p>
                          <p className="font-medium">{formatDate(trackingData.shipment.departureDate)}</p>
                        </div>
                      )}
                      {trackingData.shipment.arrivalDate && (
                        <div>
                          <p className="text-sm text-gray-600">Arrival Date</p>
                          <p className="font-medium">{formatDate(trackingData.shipment.arrivalDate)}</p>
                        </div>
                      )}
                      {trackingData.shipment.shippedAt && (
                        <div>
                          <p className="text-sm text-gray-600">Shipped At</p>
                          <p className="font-medium">{formatDate(trackingData.shipment.shippedAt)}</p>
                        </div>
                      )}
                    </div>
                    {(trackingData.shipment.originWarehouse || trackingData.shipment.destinationWarehouse) && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {trackingData.shipment.originWarehouse && (
                          <div>
                            <p className="text-sm text-gray-600">Origin Warehouse</p>
                            <p className="font-medium">{trackingData.shipment.originWarehouse}</p>
                          </div>
                        )}
                        {trackingData.shipment.destinationWarehouse && (
                          <div>
                            <p className="text-sm text-gray-600">Destination Warehouse</p>
                            <p className="font-medium">{trackingData.shipment.destinationWarehouse}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Client Information */}
                {trackingData.client && (
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <User className="mr-2" size={20} />
                      Client Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{`${trackingData.client.firstName || ''} ${trackingData.client.lastName || ''}`.trim() || 'N/A'}</p>
                      </div>
                      {trackingData.client.company && (
                        <div>
                          <p className="text-sm text-gray-600">Company</p>
                          <p className="font-medium">{trackingData.client.company}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Shipment Timeline</h3>
                  <div className="space-y-4">
                    {trackingData.timeline.map((event, index) => (
                      <motion.div
                        key={index}
                        variants={timelineVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                          event.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {event.completed ? (
                            <CheckCircle className="text-white" size={16} />
                          ) : (
                            <Clock className="text-gray-600" size={16} />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${event.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                            {event.status}
                          </h4>
                          <p className="text-sm text-gray-600">{event.location}</p>
                          <p className="text-sm text-gray-500">{event.date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}        {/* Help Section */}
        <motion.div variants={sectionVariants} className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            Can't find your package or having tracking issues? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={"/support"} className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg">
              Contact Support
            </Link>
            <Link to="/faq" className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg">
              FAQ
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PackageTracking;