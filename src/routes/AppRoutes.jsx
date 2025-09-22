import React from "react";
import { Routes, Route } from "react-router-dom";

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
import ClientLayout from "../components/client/layout/ClientLayout";
import ClientLogin from "../pages/client/auth/login";
import ClientSignup from "../pages/client/auth/signup";
import Dashboard from "../pages/client/dashboard/Dashboard";
import ParcelsPage from "../pages/client/parcels/ParcelsPage";
import ParcelDetailsPage from "../pages/client/parcels/ParcelDetailsPage";
import ClientPayments from "../pages/client/payments/Payments";
import Notifications from "../pages/client/notification/Notifications";
import ClientAddresses from "../pages/client/addresses/Addresses";
import ClientSupport from "../pages/client/support/ClientSupport";

import MainLayout from "../components/public_pages/layout/MainLayout";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes - wrapped in MainLayout */}
    <Route element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="tracking" element={<PackageTracking />} />
      <Route path="locations" element={<Locations />} />
      <Route path="calculator" element={<ShippingCalculator />} />
      <Route path="contact" element={<Contact />} />
      <Route path="support" element={<SupportPage />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="how-we-work" element={<HowWeWorkPage />} />
      <Route path="about" element={<AboutPage />} />
    </Route>

    {/* Auth Routes */}
    <Route path="client/auth/login" element={<ClientLogin />} />
    <Route path="client/auth/signup" element={<ClientSignup />} />

    {/* Client Routes - wrapped in ClientLayout */}
    <Route element={<ClientLayout />}>
      <Route path="client/dashboard" element={<Dashboard />} />
      <Route path="client/parcels" element={<ParcelsPage />} />
      <Route path="client/parcels/:id" element={<ParcelDetailsPage />} />
      <Route path="client/payments" element={<ClientPayments />} />
      <Route path="client/notifications" element={<Notifications />} />
      <Route path="client/addresses" element={<ClientAddresses />} />
      <Route path="client/support" element={<ClientSupport />} />
    </Route>
  </Routes>
);

export default AppRoutes;
