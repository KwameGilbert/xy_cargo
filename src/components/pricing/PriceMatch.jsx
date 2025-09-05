import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const PriceMatch = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 200
            }}
            className="mb-6"
          >
            <motion.div
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 }
              }}
            >
              <CheckCircle className="text-green-500 h-12 w-12" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl font-bold text-gray-800 mb-6"
          >
            Price Match Guarantee
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-gray-600 mb-8 max-w-2xl"
          >
            Found a lower price elsewhere? We'll match it and give you an additional 5% discount. That's our
            commitment to providing the best value in shipping.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(239, 68, 68, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="text-red-500 border border-red-500 px-6 py-3 rounded-md hover:bg-red-50 transition-colors"
          >
            Request Price Match
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PriceMatch;
