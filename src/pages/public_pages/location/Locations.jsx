import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail, Globe } from "lucide-react";
import SEO from "../../../components/public_pages/common/SEO/SEO";

const Locations = () => {
  const locations = [
      {
          id: 1,
          city: "Lusaka",
          country: "Zambia",
          address: "Main Shipping Hub, Lusaka, Zambia",
          phone: "+260 96 7379139",
          email: "zambia@xycargozm.com",
          hours: "Mon-Fri: 5:00 AM - 1:00 PM (Zambia Time)\nSat: 8:00 AM - 12:00 PM\nSun: Closed",
          services: ["Delivery Hub", "Customs Clearance", "Final Mile Delivery", "Customer Support"],
          timezone: "CAT (UTC+2)",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
          whatsapp: [
              { number: "+260 96 7379139" }
            ]
        },
        {
          id: 2,
          city: "Foshan",
          country: "China",
          address: "Shop # 94 Carousel Mall, Lusaka, Zambia",
          phone: "+260 96 7379139",
          email: "support@xycargozm.com",
          hours: "Mon-Fri: 8:00 AM - 5:00 PM (Zambia Time)\nSat: 8:00 AM - 12:00 PM\nSun: Closed",
          services: ["Warehouse Operations", "Air Freight", "Sea Freight", "Electronics Handling"],
          timezone: "CAT (UTC+2)",
          image: "https://images.unsplash.com/photo-1570101615121-bc725e35a0bf?w=400&h=250&fit=crop",
          whatsapp: [
            { number: "+260 96 7379139" },
            { number: "+260 769 481 203" }
          ]
        },
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
      <SEO 
        title="Our Locations"
        description="XY Cargo Zambia office locations and warehouse addresses. Find our shipping hubs in Lusaka, Zambia for all your logistics needs."
        keywords="shipping locations, Lusaka office, warehouse address, shipping centers, cargo pickup points"
        canonical="https://xycargozm.com/locations"
      />
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={headerVariants} className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">XY CARGO ZAMBIA Locations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Providing reliable shipping services within Zambia. Our strategically located facility
            in Lusaka, Zambia ensures fast and efficient cargo delivery to all destinations.
          </p>
        </motion.div>

        {/* Service Stats */}
        <motion.div variants={headerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "2", label: "Key Locations" },
            { number: "10-17", label: "Days Air Delivery" },
            { number: "24/7", label: "WhatsApp Support" },
            { number: "$12", label: "Starting Rate/kg" }
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

                {/* WhatsApp Contacts */}
                {location.whatsapp && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">WhatsApp Support:</h4>
                    <div className="space-y-2">
                      {location.whatsapp.map((contact, index) => (
                        <div key={index} className="bg-green-50 p-2 rounded">
                          <a 
                            href={`https://wa.me/${contact.number.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 text-sm font-medium block text-center"
                          >
                            {contact.number}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Buttons */}
                <div className="flex gap-2">
                  <motion.a
                    href={`tel:${location.phone}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium text-center"
                  >
                    Call Now
                  </motion.a>
                  <motion.a
                    href={`mailto:${location.email}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium text-center"
                  >
                    Email
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div variants={headerVariants} className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Ship from China to Zambia?</h2>
            <p className="text-gray-600 mb-6">
              Contact our team for personalized shipping quotes and expert guidance on your cargo needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://wa.me/260967379139"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.107"/>
                </svg>
                WhatsApp Zambia
              </motion.a>
              <motion.a
                href="https://wa.me/260769481203"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.107"/>
                </svg>
                WhatsApp Support
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Locations;