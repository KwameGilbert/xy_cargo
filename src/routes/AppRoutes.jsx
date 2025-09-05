import { Routes, Route } from "react-router";
import HomePage from "../pages/home/HomePage";
import Pricing from "../pages/pricing/Pricing";
import PackageTracking from "../pages/tracking/PackageTracking";
import Locations from "../pages/location/Locations";
import ShippingCalculator from "../pages/ShippingCalc/ShippingCalculator";
import Contact from "../pages/contact/Contact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/tracking" element={<PackageTracking />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/calculator" element={<ShippingCalculator />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
