import { Routes, Route } from "react-router";
// Public pages
import HomePage from "../pages/public_pages/home/HomePage";
import Pricing from "../pages/public_pages/pricing/Pricing";
import PackageTracking from "../pages/public_pages/tracking/PackageTracking";
import Locations from "../pages/public_pages/location/Locations";
import ShippingCalculator from "../pages/public_pages/ShippingCalc/ShippingCalculator";
import Contact from "../pages/public_pages/contact/Contact";
import SupportPage from "../pages/public_pages/support/Support";
import ServicesPage from "../pages/public_pages/services/Services";
import HowWeWorkPage from "../pages/public_pages/howwework/HowWeWork";
import AboutPage from "../pages/public_pages/about/About";

// Client pages
import ClientLogin from "../pages/client/auth/login";
import Dashboard from "../pages/client/dashboard/Dashboard";

import MainLayout from "../components/public_pages/layout/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes - wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/tracking" element={<PackageTracking />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/calculator" element={<ShippingCalculator />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/how-we-work" element={<HowWeWorkPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      {/* Client Routes - outside of MainLayout */}
      <Route path="/client/auth/login" element={<ClientLogin />} />
      <Route path="/client/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
