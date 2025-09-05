import ShippingCalc from "../../components/pricing/ShippingCalc";
import ShippingPricing from "../../components/pricing/Pricing";
import AdditionalServices from "../../components/pricing/AdditionalServices";
import VolumeDiscounts from "../../components/pricing/VolumeDiscounts";
import PriceMatch from "../../components/pricing/PriceMatch";

const Pricing = () => {
    return (
        <div>
            <ShippingCalc />
            <AdditionalServices />
            <VolumeDiscounts />
            <PriceMatch />
            <ShippingPricing />
        </div>
    );
};

export default Pricing;
