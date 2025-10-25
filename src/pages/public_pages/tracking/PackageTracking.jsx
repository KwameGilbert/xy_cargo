import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Package, Truck, MapPin, CheckCircle, Clock } from "lucide-react";
// import SEO from "../../../components/public_pages/common/SEO/SEO";

const PackageTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;
    
    setLoading(true);
    setTrackingData(null);
    
    try {
      const response = await fetch(`/v1/parcels/track/${trackingNumber.trim()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch tracking data');
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Transform API data to match component expectations
        const transformedData = {
          trackingNumber: data.trackingNumber,
          status: data.currentStatus,
          currentLocation: data.trackingHistory.length > 0 ? data.trackingHistory[data.trackingHistory.length - 1].location : 'Unknown',
          progress: calculateProgress(data.currentStatus),
          timeline: data.trackingHistory.map(update => ({
            status: update.status,
            location: update.location,
            date: formatDate(update.date),
            completed: true // All historical updates are completed
          }))
        };
        
        setTrackingData(transformedData);
      } else {
        setTrackingData({
          error: data.message || 'Tracking information not found'
        });
      }
    } catch (error) {
      setTrackingData({
        error: 'Unable to track package. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (status) => {
    const statusProgress = {
      'RECEIVED': 20,
      'PROCESSING': 40,
      'IN_TRANSIT': 60,
      'OUT_FOR_DELIVERY': 80,
      'DELIVERED': 100
    };
    return statusProgress[status] || 0;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                    </div>
                  </div>
                </div>

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
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg">
              Contact Support
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg">
              FAQ
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PackageTracking;