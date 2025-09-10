import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, MapPin, Clock, CheckCircle, Truck, Plane, Ship } from 'lucide-react';

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  const demoTrackingNumbers = ['FY123456789', 'FY987654321', 'FY456789123'];

  const trackingStatuses = [
    {
      status: 'Package Received',
      location: 'New York, NY',
      time: '2 days ago',
      icon: Package,
      completed: true,
      color: 'text-green-500'
    },
    {
      status: 'In Transit',
      location: 'Chicago, IL',
      time: '1 day ago',
      icon: Truck,
      completed: true,
      color: 'text-blue-500'
    },
    {
      status: 'Out for Delivery',
      location: 'Los Angeles, CA',
      time: 'Today',
      icon: Plane,
      completed: false,
      color: 'text-orange-500'
    },
    {
      status: 'Delivered',
      location: 'Your Address',
      time: 'Estimated',
      icon: CheckCircle,
      completed: false,
      color: 'text-gray-400'
    }
  ];

  const handleTrack = async () => {
    if (!trackingNumber) {
      return;
    }

    setIsTracking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setTrackingResult({
      number: trackingNumber,
      status: 'In Transit',
      currentLocation: 'Chicago, IL',
      estimatedDelivery: 'Tomorrow, Dec 7',
      progress: 65,
      timeline: trackingStatuses
    });
    
    setIsTracking(false);
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const trackingFormVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const resultVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Decorations */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 left-20 text-purple-200"
      >
        <Ship size={40} />
      </motion.div>
      
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-20 right-20 text-pink-200"
      >
        <Plane size={50} />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto px-4"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-4"
          >
            <Search className="text-red-500 mx-auto" size={48} />
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Track Your Package</h2>
          <p className="text-gray-600 text-lg">
            Get real-time updates on your shipment's journey around the world
          </p>
        </motion.div>

        {/* Tracking Form */}
        <motion.div variants={trackingFormVariants} className="mb-12">
          <motion.div 
            className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 backdrop-blur-sm border border-white/20"
            whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Search size={28} className="text-red-500 mr-3" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-800">Enter Tracking Number</h3>
            </div>

            <div className="space-y-6">
              <motion.input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter your tracking number (e.g., FY123456789)"
                className="w-full border-2 border-gray-200 rounded-xl p-4 text-lg focus:outline-none focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                whileFocus={{ scale: 1.02 }}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              />

              <motion.button
                onClick={handleTrack}
                disabled={!trackingNumber || isTracking}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 15px 30px rgba(239, 68, 68, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {isTracking ? (
                  <motion.div className="flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                    />
                    Tracking...
                  </motion.div>
                ) : (
                  <span className="flex items-center justify-center">
                    <Search size={20} className="mr-2" />
                    Track Package
                  </span>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Demo Tracking Numbers */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <p className="text-gray-600 mb-4 text-lg">Try a demo tracking number:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {demoTrackingNumbers.map((number, index) => (
              <motion.button
                key={number}
                onClick={() => setTrackingNumber(number)}
                className="bg-white text-red-500 border-2 border-red-200 hover:border-red-500 px-4 py-2 rounded-lg font-medium transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#fef2f2"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                {number}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tracking Results */}
        <AnimatePresence mode="wait">
          {trackingResult && (
            <motion.div
              key="tracking-result"
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Tracking: {trackingResult.number}</h3>
                    <p className="text-red-100">Status: {trackingResult.status}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Package size={48} />
                  </motion.div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Delivery Progress</span>
                  <span className="text-sm font-medium text-gray-600">{trackingResult.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${trackingResult.progress}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">Shipped</span>
                  <span className="text-sm text-gray-500">ETA: {trackingResult.estimatedDelivery}</span>
                </div>
              </div>

              {/* Current Status */}
              <div className="p-6 border-b">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-full mr-4">
                    <MapPin className="text-red-500" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Current Location</h4>
                    <p className="text-gray-600">{trackingResult.currentLocation}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-6">Shipment Timeline</h4>
                <div className="space-y-4">
                  {trackingResult.timeline.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + (index * 0.2), duration: 0.5 }}
                      className="flex items-center"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        event.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <event.icon className={event.completed ? 'text-green-500' : event.color} size={20} />
                      </div>
                      <div className="flex-1">
                        <h5 className={`font-medium ${event.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                          {event.status}
                        </h5>
                        <p className="text-sm text-gray-600">{event.location}</p>
                        <p className="text-sm text-gray-500">{event.time}</p>
                      </div>
                      {event.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.5 + (index * 0.2), type: "spring" }}
                          className="text-green-500"
                        >
                          <CheckCircle size={20} />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Real-time Updates',
                description: 'Get instant notifications via SMS and email',
                color: 'text-blue-500'
              },
              {
                icon: MapPin,
                title: 'Live Location',
                description: 'See exactly where your package is at all times',
                color: 'text-green-500'
              },
              {
                icon: Package,
                title: 'Delivery Alerts',
                description: 'Know exactly when your package will arrive',
                color: 'text-purple-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-lg p-6 text-center shadow-lg"
              >
                <feature.icon className={`${feature.color} mx-auto mb-4`} size={32} />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Tracking;