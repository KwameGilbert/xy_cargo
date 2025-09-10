import React from 'react';
import { motion } from 'framer-motion';

const VolumeDiscounts = () => {
  const discountTiers = [
    {
      percentage: "5%",
      volume: "10+ Shipments/Month",
      type: "Regular Business Discount"
    },
    {
      percentage: "10%",
      volume: "50+ Shipments/Month",
      type: "Growing Business Discount"
    },
    {
      percentage: "15%",
      volume: "100+ Shipments/Month",
      type: "Enterprise Discount"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-gray-200 rounded-lg p-8"
        >
          <div className="text-center mb-6">
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-red-500 font-medium"
            >
              Volume Discounts
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl font-bold text-gray-800 mt-2"
            >
              Save More with Bulk Shipping
            </motion.h2>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
          >
            {discountTiers.map((tier, index) => (
              <motion.div 
                key={index} 
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="text-center"
              >
                <motion.p 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + (index * 0.1),
                    type: "spring",
                    stiffness: 200
                  }}
                  className="text-red-500 text-4xl font-bold"
                >
                  {tier.percentage}
                </motion.p>
                <p className="font-medium text-gray-800 mt-2">{tier.volume}</p>
                <p className="text-gray-600 text-sm">{tier.type}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(239, 68, 68, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition-colors"
            >
              Apply for Volume Discount
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VolumeDiscounts;
