import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Plane, Ship, Package, Truck, 
  ShieldCheck, Battery, Smartphone, 
  Clock, DollarSign, MessageCircle 
} from "lucide-react";

const Services = () => {
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

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const servicesData = [
    {
      icon: Plane,
      title: "Air Freight",
      description: "Fast and reliable shipping from China to Zambia in just 10-17 days. Perfect for time-sensitive shipments and valuable goods.",
      features: ["Door-to-door service", "Real-time tracking", "Customs clearance included"],
      color: "bg-blue-50 text-blue-600 border-blue-200",
      buttonText: "Get Air Freight Quote",
      buttonLink: "/shipping-calculator"
    },
    {
      icon: Ship,
      title: "Sea Freight",
      description: "Cost-effective solution for bulk shipments with transit times of 4-6 weeks. Ideal for large volumes and non-urgent cargo.",
      features: ["Affordable bulk rates", "FCL & LCL options", "Regular scheduled departures"],
      color: "bg-green-50 text-green-600 border-green-200",
      buttonText: "Calculate Sea Freight",
      buttonLink: "/shipping-calculator"
    },
    {
      icon: Battery,
      title: "Electronics & Battery Shipping",
      description: "Specialized handling for sensitive electronics, batteries, and regulated goods with all necessary safety compliance.",
      features: ["Special packaging", "Safety documentation", "Customs compliance"],
      color: "bg-orange-50 text-orange-600 border-orange-200",
      buttonText: "Ship Electronics Safely",
      buttonLink: "/contact"
    },
    {
      icon: ShieldCheck,
      title: "Customs Clearance",
      description: "Hassle-free import processing with our experienced team handling all documentation and regulatory requirements.",
      features: ["Documentation assistance", "Duty & tax calculation", "Compliance management"],
      color: "bg-purple-50 text-purple-600 border-purple-200",
      buttonText: "Learn About Customs",
      buttonLink: "/contact"
    },
    {
      icon: Truck,
      title: "Final Mile Delivery",
      description: "Direct delivery to your doorstep in Zambia. We ensure your packages arrive safely at their final destination.",
      features: ["Nationwide coverage", "SMS notifications", "Proof of delivery"],
      color: "bg-red-50 text-red-600 border-red-200",
      buttonText: "Track Your Delivery",
      buttonLink: "/tracking"
    },
    {
      icon: Smartphone,
      title: "Mobile & Tech Products",
      description: "Specialized service for smartphones, tablets, laptops and accessories with secure handling and fast delivery.",
      features: ["Anti-theft packaging", "Insurance options", "Express delivery available"],
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
      buttonText: "Ship Tech Products",
      buttonLink: "/contact"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        className="max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={headingVariants}>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Premium Shipping Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reliable, fast, and secure shipping solutions connecting China and Zambia with services tailored to your specific cargo needs.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Clock, number: "10-17", label: "Days Air Delivery" },
            { icon: Truck, number: "4-6", label: "Weeks Sea Shipping" },
            { icon: Package, number: "1000+", label: "Parcels Monthly" },
            { icon: DollarSign, number: "$12", label: "Starting Rate/kg" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg p-6 text-center shadow-md"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-red-500" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <div className={`p-6 border-b ${service.color}`}>
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-white shadow-sm">
                    <service.icon className={service.color.split(' ')[1]} size={28} />
                  </div>
                  <h3 className="text-xl font-semibold ml-3">{service.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={service.buttonLink}
                  className="block w-full py-3 bg-red-500 hover:bg-red-600 text-white text-center rounded-lg transition-colors"
                >
                  {service.buttonText}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-2xl shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Need a Custom Shipping Solution?</h3>
              <p className="text-red-100">
                Our logistics experts are ready to help with your unique requirements.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link 
                to="/contact"
                className="px-6 py-3 bg-white text-red-500 hover:bg-gray-100 rounded-lg font-medium"
              >
                Contact Us
              </Link>
              <a 
                href="https://wa.me/260967379139" 
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium flex items-center"
              >
                <MessageCircle className="mr-2" size={18} />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
