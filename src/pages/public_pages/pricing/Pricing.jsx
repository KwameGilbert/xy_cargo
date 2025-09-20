import { motion } from "framer-motion";
import ShippingCalculator from "../../../components/public_pages/calc/ShippingCalculator";
import ShippingPricing from "../../../components/public_pages/pricing/Pricing";
import AdditionalServices from "../../../components/public_pages/pricing/AdditionalServices";
import VolumeDiscounts from "../../../components/public_pages/pricing/VolumeDiscounts";
import PriceMatch from "../../../components/public_pages/pricing/PriceMatch";
// import SEO from "../../../components/public_pages/common/SEO/SEO";

const Pricing = () => {
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

    const sectionVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.95
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
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* <SEO 
                title="Pricing"
                description="XY Cargo Zambia shipping rates and pricing. Get competitive rates for air freight, sea freight, and special goods shipping from China to Zambia."
                keywords="shipping rates, freight pricing, air freight cost, sea freight cost, China to Zambia shipping prices"
                canonical="https://xycargozm.com/pricing"
            /> */}
            <motion.div variants={sectionVariants}>
                <ShippingCalculator />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
                <AdditionalServices />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
                <VolumeDiscounts />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
                <PriceMatch />
            </motion.div>
            
            <motion.div variants={sectionVariants}>
                <ShippingPricing />
            </motion.div>
        </motion.div>
    );
};

export default Pricing;
