import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, FileText, Truck, Globe, Shield } from 'lucide-react';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
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

  const statsVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative w-full h-[700px] bg-cover bg-center overflow-hidden" style={{ 
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-logistics.jpg')" 
    }}>
      {/* Animated Background Elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-10 text-white/20"
      >
        <Truck size={40} />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute top-32 right-16 text-white/20"
      >
        <Globe size={35} />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
        className="absolute bottom-40 left-20 text-white/20"
      >
        <Shield size={30} />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h1 
          variants={titleVariants}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Fast, Reliable & 
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-red-500 block md:inline"
          >
            {" "}Affordable
          </motion.span>
        </motion.h1>
        
        <motion.h1 
          variants={titleVariants}
          transition={{ delay: 0.9 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.1, type: "spring", stiffness: 100 }}
          >
            China to Zambia Shipping
          </motion.span>
        </motion.h1>
        
        <motion.p 
          variants={subtitleVariants}
          className="text-white text-lg md:text-xl max-w-3xl mb-10"
        >
          Reliable air and sea freight from China to Zambia with competitive rates and 
          transparent pricing. Your trusted logistics partner connecting two nations.
        </motion.p>
        
        <motion.div 
          variants={containerVariants}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <motion.div variants={buttonVariants}>
            <Link 
              to="/tracking" 
              className="group relative overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Search size={20} />
                </motion.div>
                <span className="font-semibold">Track Shipment</span>
              </motion.div>
              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" }}
              />
            </Link>
          </motion.div>

          <motion.div variants={buttonVariants}>
            <Link 
              to="/calculator" 
              className="group relative overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <FileText size={20} />
                </motion.div>
                <span className="font-semibold">Get a Quote</span>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={statsVariants}
          className="flex flex-wrap justify-center gap-x-12 gap-y-6"
        >
          {[
            { number: "200+", label: "Countries Served", delay: 0 },
            { number: "1M+", label: "Packages Delivered", delay: 0.2 },
            { number: "24/7", label: "Customer Support", delay: 0.4 }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.5 + stat.delay,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-white text-center cursor-pointer"
            >
              <motion.p 
                variants={pulseVariants}
                animate="animate"
                className="font-bold text-2xl md:text-3xl text-red-400"
              >
                {stat.number}
              </motion.p>
              <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/60"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L12 20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;