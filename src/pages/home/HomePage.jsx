import NavBar from "../../components/layout/NavBar";
import HeroSection from "../../components/home/HeroSection";
import HowWeWork from "../../components/home/HowWeWork";
import ShippingCalculator from "../../components/home/ShippingCalculator";
import Pricing from "../../components/pricing/Pricing";
import Tracking from "../../components/home/Tracking";
import SupportCenter from "../../components/home/SupportCenter";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <HowWeWork />
      <ShippingCalculator />
      <Pricing />
      {/* <Tracking /> */}

    

    </>
  );
};

export default HomePage;