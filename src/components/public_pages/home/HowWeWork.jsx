import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Package, Truck, CheckCircle, ArrowRight } from 'lucide-react';

const HowWeWork = () => {
  const steps = [
    {
      id: 1,
      icon: <UserPlus size={40} className="text-red-500" />,
      title: 'Register',
      description: 'Create your account and verify your identity for secure shipping services.',
      color: 'from-red-400 to-red-600',
    },
    {
      id: 2,
      icon: <Package size={40} className="text-blue-500" />,
      title: 'Drop/Send Parcel',
      description: 'Bring your package to our location or schedule a pickup at your convenience.',
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 3,
      icon: <Truck size={40} className="text-green-500" />,
      title: 'Ship & Track',
      description: 'Watch your package journey in real-time with our advanced tracking system.',
      color: 'from-green-400 to-green-600',
    },
    {
      id: 4,
      icon: <CheckCircle size={40} className="text-purple-500" />,
      title: 'Receive',
      description: 'Your recipient gets the package safely delivered to their doorstep.',
      color: 'from-purple-400 to-purple-600',
    },
  ];

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

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: 360,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 200
      }
    },
  };

  const numberVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.2,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 400
      }
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Decorations */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute -top-20 -left-20 w-40 h-40 bg-red-100 rounded-full opacity-20"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-100 rounded-full opacity-20"
      />

      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-16"
      >
        <motion.h2 
          className="text-4xl font-bold text-gray-800 mb-4"
          whileInView={{ 
            backgroundImage: "linear-gradient(45deg, #ef4444, #3b82f6, #10b981, #8b5cf6)",
            backgroundSize: "400%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          How We Work
        </motion.h2>
        <motion.p 
          className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Simple, transparent, and reliable. Our streamlined process ensures your packages
          reach their destination safely and on time.
        </motion.p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-16 relative"
      >
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              initial="rest"
              className="relative"
            >
              <motion.div 
                className="bg-white shadow-lg rounded-xl p-8 text-center relative overflow-hidden group"
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Gradient on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                
                {/* Step Number */}
                <motion.div 
                  variants={numberVariants}
                  className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${step.color} rounded-full mx-auto mb-6 shadow-lg`}
                >
                  <span className="text-white font-bold text-lg">{step.id}</span>
                </motion.div>
                
                {/* Icon Container */}
                <motion.div 
                  variants={iconVariants}
                  className="flex items-center justify-center w-24 h-24 bg-gray-50 rounded-full mx-auto mb-6 group-hover:bg-gray-100 transition-colors duration-300"
                >
                  {step.icon}
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-semibold text-gray-800 mb-4"
                  whileHover={{ color: "#ef4444" }}
                  transition={{ duration: 0.2 }}
                >
                  {step.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {step.description}
                </motion.p>

                {/* Pulse Effect */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${step.color} rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Arrow between steps (hidden on mobile and last item) */}
            {index < steps.length - 1 && (
              <motion.div
                className="hidden lg:flex items-center justify-center absolute"
                style={{
                  left: `${(index + 1) * 25 - 2}%`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + (index * 0.2) }}
              >
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-white rounded-full p-2 shadow-lg"
                >
                  <ArrowRight className="text-gray-400" size={20} />
                </motion.div>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-center mt-16"
      >
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-all duration-300"
        >
          Start Shipping Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HowWeWork;
