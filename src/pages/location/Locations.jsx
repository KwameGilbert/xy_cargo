import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail, Globe } from "lucide-react";

const Locations = () => {
  const locations = [
    {
      id: 1,
      city: "New York",
      country: "United States",
      address: "1234 Shipping Boulevard, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "newyork@fycargo.com",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM\nSun: Closed",
      services: ["Express Shipping", "International", "Customs Clearance", "Warehousing"],
      timezone: "EST (UTC-5)",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      city: "Los Angeles",
      country: "United States",
      address: "5678 Cargo Street, Los Angeles, CA 90210",
      phone: "+1 (555) 987-6543",
      email: "losangeles@fycargo.com",
      hours: "Mon-Fri: 7:00 AM - 7:00 PM\nSat: 8:00 AM - 5:00 PM\nSun: 10:00 AM - 2:00 PM",
      services: ["Express Shipping", "International", "Same-Day Delivery", "Freight"],
      timezone: "PST (UTC-8)",
      image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      city: "London",
      country: "United Kingdom",
      address: "42 Logistics Lane, London, EC1A 1BB",
      phone: "+44 20 7123 4567",
      email: "london@fycargo.com",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM\nSat: 10:00 AM - 3:00 PM\nSun: Closed",
      services: ["EU Shipping", "International", "Customs Clearance", "Express"],
      timezone: "GMT (UTC+0)",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      city: "Tokyo",
      country: "Japan",
      address: "3-1-1 Shibuya, Tokyo 150-0002",
      phone: "+81 3-1234-5678",
      email: "tokyo@fycargo.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM\nSun: Closed",
      services: ["Asia-Pacific", "International", "Express Shipping", "Local Delivery"],
      timezone: "JST (UTC+9)",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      city: "Sydney",
      country: "Australia",
      address: "123 Harbor View Drive, Sydney, NSW 2000",
      phone: "+61 2 1234 5678",
      email: "sydney@fycargo.com",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM\nSat: 9:00 AM - 1:00 PM\nSun: Closed",
      services: ["Oceania Shipping", "International", "Express", "Freight"],
      timezone: "AEST (UTC+10)",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      city: "Dubai",
      country: "United Arab Emirates",
      address: "Sheikh Zayed Road, Dubai, UAE",
      phone: "+971 4 123 4567",
      email: "dubai@fycargo.com",
      hours: "Sun-Thu: 8:00 AM - 6:00 PM\nFri-Sat: 9:00 AM - 3:00 PM",
      services: ["Middle East Hub", "International", "Express", "Customs"],
      timezone: "GST (UTC+4)",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50 py-16"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={headerVariants} className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Global Locations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With strategically located facilities around the world, FY Cargo ensures fast and reliable shipping 
            to your destination. Find the nearest location or contact our local teams.
          </p>
        </motion.div>

        {/* Global Stats */}
        <motion.div variants={headerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "50+", label: "Global Locations" },
            { number: "200+", label: "Countries Served" },
            { number: "24/7", label: "Customer Support" },
            { number: "99.9%", label: "Delivery Success Rate" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg p-6 text-center shadow-md"
            >
              <h3 className="text-3xl font-bold text-red-500 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Locations Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <motion.div
              key={location.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              {/* Location Image */}
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img 
                  src={location.image} 
                  alt={`${location.city}, ${location.country}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {location.timezone}
                </div>
              </div>

              {/* Location Details */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="text-red-500 mr-2" size={20} />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {location.city}, {location.country}
                  </h3>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-gray-600 text-sm">{location.address}</p>
                  
                  <div className="flex items-center">
                    <Phone className="text-gray-400 mr-2" size={16} />
                    <span className="text-gray-600 text-sm">{location.phone}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="text-gray-400 mr-2" size={16} />
                    <span className="text-gray-600 text-sm">{location.email}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-gray-400 mr-2 mt-1" size={16} />
                    <span className="text-gray-600 text-sm whitespace-pre-line">{location.hours}</span>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Services Available:</h4>
                  <div className="flex flex-wrap gap-2">
                    {location.services.map((service, index) => (
                      <span 
                        key={index}
                        className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
                  >
                    Contact
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium"
                  >
                    Directions
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div variants={headerVariants} className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Don't See Your Location?</h2>
            <p className="text-gray-600 mb-6">
              We're constantly expanding our network. Contact us to learn about shipping options in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
              >
                Request New Location
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg"
              >
                View Coverage Map
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Locations;