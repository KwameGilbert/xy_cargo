import { motion } from "framer-motion";
import { Users, Target, Award, Heart } from "lucide-react";

const AboutUs = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    {
      icon: Users,
      number: "5000+",
      label: "Happy Customers",
      color: "text-blue-600"
    },
    {
      icon: Target,
      number: "99.5%",
      label: "On-Time Delivery",
      color: "text-green-600"
    },
    {
      icon: Award,
      number: "5",
      label: "Years Experience",
      color: "text-purple-600"
    },
    {
      icon: Heart,
      number: "24/7",
      label: "Customer Support",
      color: "text-red-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-red-50 relative overflow-hidden">
      {/* Background Image Placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop&crop=center')"
        }}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-red-100 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-white rounded-full opacity-40 animate-bounce"></div>

      <motion.div
        className="max-w-7xl mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About XY Cargo Zambia</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in international shipping, connecting China and Zambia with reliable,
            efficient, and secure logistics solutions.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Why Choose Us?</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                With over 5 years of experience in international logistics, XY Cargo Zambia has
                established itself as the leading shipping company connecting China and Zambia.
              </p>
              <p>
                We specialize in air freight, sea freight, and express shipping services, ensuring
                your packages arrive safely and on time. Our commitment to excellence and customer
                satisfaction drives everything we do.
              </p>
              <p>
                From small parcels to large cargo shipments, we handle it all with the same level
                of care and professionalism that has made us Zambia's most trusted shipping partner.
              </p>
            </div>

            <motion.div
              className="mt-8"
              variants={itemVariants}
            >
              <a
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Learn More About Us
              </a>
            </motion.div>
          </motion.div>

          {/* Image Placeholder */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div
                className="h-80 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/63405.jpg')"
                }}
              ></div>
              <div className="p-6 bg-white">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Our Mission</h4>
                <p className="text-gray-600 text-sm">
                  To redefine logistics in Africa by building a connected, efficient, and technology-driven cargo network that empowers trade and supports economic growth.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg p-6 text-center shadow-md relative overflow-hidden"
            >
              {/* Background Image Placeholder for Stats */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300&h=200&fit=crop&crop=center')"
                }}
              ></div>

              <div className="relative z-10">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-red-500" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;