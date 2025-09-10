import ShippingCalculator from "../../../components/public_pages/calc/ShippingCalculator";
import SEO from "../../../components/public_pages/common/SEO/SEO";

const ShippingCalculatorPage = () => {
  return (
    <ShippingCalculator
      SEO={
        <SEO
          title="Shipping Calculator | XY Cargo Zambia"
          description="Calculate your shipping costs with XY Cargo Zambia's shipping calculator. Get instant quotes for China to Zambia shipping with air and sea freight options."
          keywords="shipping calculator, China to Zambia, shipping cost, air freight, sea freight, shipping rates"
          canonical="https://xycargozm.com/shipping-calculator"
        />
      }
    />
  );
};

export default ShippingCalculatorPage;