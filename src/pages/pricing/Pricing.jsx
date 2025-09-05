import { motion } from "framer-motion";
import ShippingCalc from "../../components/pricing/ShippingCalc";
import ShippingPricing from "../../components/pricing/Pricing";
import AdditionalServices from "../../components/pricing/AdditionalServices";
import VolumeDiscounts from "../../components/pricing/VolumeDiscounts";
import PriceMatch from "../../components/pricing/PriceMatch";
import SEO from "../../components/common/SEO/SEO";

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
            <SEO 
                title="Pricing"
                description="XY Cargo Zambia shipping rates and pricing. Get competitive rates for air freight, sea freight, and special goods shipping from China to Zambia."
                keywords="shipping rates, freight pricing, air freight cost, sea freight cost, China to Zambia shipping prices"
                canonical="https://xycargozm.com/pricing"
            />
            <motion.div variants={sectionVariants}>
                <ShippingCalc />
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
