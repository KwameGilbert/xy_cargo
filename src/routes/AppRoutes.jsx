import { Routes, Route } from "react-router";
import HomePage from "../pages/home/HomePage";
import Pricing from "../pages/pricing/Pricing";
import PackageTracking from "../pages/tracking/PackageTracking";
import Locations from "../pages/location/Locations";
import ShippingCalculator from "../pages/ShippingCalc/ShippingCalculator";
import Contact from "../pages/contact/Contact";
import SupportPage from "../pages/support/Support";
import ServicesPage from "../pages/services/Services";
import HowWeWorkPage from "../pages/howwework/HowWeWork";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/tracking" element={<PackageTracking />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/calculator" element={<ShippingCalculator />} />
      <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/how-we-work" element={<HowWeWorkPage />} />
    </Routes>
  );
};

export default AppRoutes;
