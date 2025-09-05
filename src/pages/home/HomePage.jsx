import { motion } from "framer-motion";
import NavBar from "../../components/layout/NavBar";
import HeroSection from "../../components/home/HeroSection";
import HowWeWork from "../../components/home/HowWeWork";
import ShippingCalculator from "../../components/home/ShippingCalculator";
import Pricing from "../../components/pricing/Pricing";
import Tracking from "../../components/home/Tracking";
import SupportCenter from "../../components/home/SupportCenter";
import SEO from "../../components/common/SEO/SEO";

const HomePage = () => {
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

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SEO 
        title="Home"
        description="XY Cargo Zambia - Your trusted shipping partner from China to Zambia. Fast and reliable air freight, sea freight and express shipping services."
        keywords="shipping, cargo, China to Zambia, freight forwarding, logistics, import from China"
        canonical="https://xycargozm.com"
      />
      <motion.div variants={sectionVariants}>
        <HeroSection />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <HowWeWork />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <ShippingCalculator />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <Pricing />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <SupportCenter />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;