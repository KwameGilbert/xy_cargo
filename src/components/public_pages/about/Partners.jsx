import React from "react";
import { motion } from "framer-motion";

const partners = [
    {
        name: "PIL",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/PIL_logo2.jpeg",
    },
    {
        name: "MAERSK",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Maersk_Group_Logo.svg/2560px-Maersk_Group_Logo.svg.png",
    },
    {
        name: "ETHIOPIA AIRLINE",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3bEG2Mu2zs6lzp6KPvNEmKxNppR1uFC1wOQ&s",
    },
    {
        name: "TANZANIA AIRLINE",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_knpoAO51r-LyQCwboUdkcb-N-KaN6ZBmtA&s",
    },
    {
        name: "EMIRATE",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png",
    },
];

const Partners = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Trusted Partners</h2>
          <p className="text-gray-600 text-lg">
            We collaborate with world-class logistics partners to ensure seamless global connectivity
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center min-h-[100px]"
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-16 object-contain"
                />
              ) : (
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-700 mb-1">
                    {partner.name}
                  </div>
                  <div className="text-sm text-gray-500">Partner</div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;