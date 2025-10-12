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


//Warehouse Pages
import WarehouseLogin from "../pages/warehouse/auth/WarehouseLogin";
import WarehouseForgotPassword from "../pages/warehouse/auth/WarehouseForgotPassword";
import WarehouseDashboard from "../pages/warehouse/dashboard/WarehouseDashboard";
import WarehouseParcelsPage from "../pages/warehouse/parcels/WarehouseParcelsPage";
import WarehouseParcelDetailPage from "../pages/warehouse/parcels/WarehouseParcelDetailPage";
import CreateWarehouseParcelPage from "../pages/warehouse/parcels/CreateWarehouseParcelPage";
import BulkUpdatePage from "../pages/warehouse/parcels/WarehouseBulkUpdatePage";
import WarehousePaymentsPage from "../pages/warehouse/payments/WarehousePaymentsPage";
import WarehouseShipmentsPage from "../pages/warehouse/shipments/WarehouseShipmentsPage";
import WarehouseShipmentDetailPage from "../pages/warehouse/shipments/WarehouseShipmentDetailPage";
import WarehouseNotificationPage from "../pages/warehouse/notifications/WarehouseNotificationPage";
import WarehouseSupportPage from "../pages/warehouse/support/WarehouseSupportPage";
import WarehouseBulkUpdatePage from "../pages/warehouse/parcels/WarehouseBulkUpdatePage";
import WarehouseSettingsPage from "../pages/warehouse/settings/WarehouseSettingsPage";


// Admin Pages
import AdminLayout from "../components/admin/layout/AdminLayout";
import AdminLogin from "../pages/admin/auth/AdminLogin";
import AdminForgotPassword from "../pages/admin/auth/AdminForgotPassword";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import AdminAllParcels from "../pages/admin/parcels/AdminAllParcels";
import CreateAdminParcelPage from "../pages/admin/parcels/CreateAdminParcelPage";
import AdminParcelDetailPage from "../pages/admin/parcels/AdminParcelDetailPage";
import EditAdminParcelPage from "../pages/admin/parcels/EditAdminParcelPage";
import AdminAllShipments from "../pages/admin/shipments/AllShipments";
import AdminShipmentDetailPage from "../pages/admin/shipments/AdminShipmentDetailPage";
import AdminShipmentEditPage from "../pages/admin/shipments/AdminShipmentEditPage";
import AdminCreateShipmentPage from "../pages/admin/shipments/AdminCreateShipmentPage";
import AdminShipmentManifestPage from "../pages/admin/shipments/AdminShipmentManifestPage";

// Warehouse Pages
import AdminAllWarehouses from "../pages/admin/warehouse/AdminAllWarehouses";
import AdminWarehouseDetailPage from "../pages/admin/warehouse/AdminWarehouseDetailPage";
import AdminCreateWarehousePage from "../pages/admin/warehouse/AdminCreateWarehousePage";
import AdminEditWarehousePage from "../pages/admin/warehouse/AdminEditWarehousePage";
import AdminIntakeLogsPage from "../pages/admin/warehouse/AdminIntakeLogsPage";

// Staff Pages
import AdminAllStaff from "../pages/admin/staff/AdminAllStaff";
import AdminCreateStaff from "../pages/admin/staff/AdminCreateStaff";
import AdminEditStaff from "../pages/admin/staff/AdminEditStaff";
import AdminStaffDetailPage from "../pages/admin/staff/AdminStaffDetailPage";

// Customer Pages
import AdminAllCustomers from "../pages/admin/customers/AdminAllCustomers";
import AdminCustomerDetailPage from "../pages/admin/customers/AdminCustomerDetailPage";
import AdminEditCustomerPage from "../pages/admin/customers/AdminEditCustomerPage";

// Agent Pages
import AdminAllAgents from "../pages/admin/agents/AdminAllAgents";
import AdminAgentDetailPage from "../pages/admin/agents/AdminAgentDetailPage";
import AdminCreateAgentPage from "../pages/admin/agents/AdminCreateAgentPage";
import AdminEditAgentPage from "../pages/admin/agents/AdminEditAgentPage";

// Payment Pages
import AdminAllPayments from "../pages/admin/finance/AdminAllPayments";
import AdminPendingPayments from "../pages/admin/finance/AdminPendingPayments";
import AdminPaymentDetailPage from "../pages/admin/finance/AdminPaymentDetailPage";
import AdminEditPaymentPage from "../pages/admin/finance/AdminEditPaymentPage";

// Reports Pages
import AdminFinancialReportsPage from "../pages/admin/reports/AdminFinancialReportsPage";


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

    {/* Client Auth Routes */}
    <Route path="client/auth/login" element={<ClientLogin />} />
    <Route path="client/auth/signup" element={<ClientSignup />} />

    {/* Client Routes - wrapped in ClientLayout */}
   
      <Route path="client/dashboard" element={<Dashboard />} />
      <Route path="client/parcels" element={<ParcelsPage />} />
      <Route path="client/parcels/:id" element={<ParcelDetailsPage />} />
      <Route path="client/payments" element={<ClientPayments />} />
      <Route path="client/notifications" element={<Notifications />} />
      <Route path="client/addresses" element={<ClientAddresses />} />
      <Route path="client/support" element={<ClientSupport />} />


    {/* Warehouse Auth Routes */}
    <Route path="warehouse/auth/login" element={<WarehouseLogin />} />
    <Route path="warehouse/auth/forgot-password" element={<WarehouseForgotPassword />} />

    {/* Warehouse Routes - wrapped in WarehouseLayout */}
      <Route path="warehouse/dashboard" element={<WarehouseDashboard />} />
      <Route path="warehouse/parcels" element={<WarehouseParcelsPage />} />
      <Route path="warehouse/parcels/create" element={<CreateWarehouseParcelPage />} />
      <Route path="warehouse/parcels/bulk-update" element={<BulkUpdatePage />} />
      <Route path="warehouse/parcels/:id" element={<WarehouseParcelDetailPage />} />
      <Route path="warehouse/payments" element={<WarehousePaymentsPage />} />
      <Route path="warehouse/shipments" element={<WarehouseShipmentsPage />} />
      <Route path="warehouse/shipments/:shipmentId" element={<WarehouseShipmentDetailPage />} />
      <Route path="warehouse/notifications" element={<WarehouseNotificationPage />} />
      <Route path="warehouse/support" element={<WarehouseSupportPage />} />
      <Route path="warehouse/bulk-updates"element={<WarehouseBulkUpdatePage />} />
      <Route path="warehouse/settings" element={<WarehouseSettingsPage />} />
      <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />


        {/* Admin Auth Routes */}
        <Route path="admin/auth/login" element={<AdminLogin />} />
        <Route path="admin/auth/forgot-password" element={<AdminForgotPassword />} />

        {/* Admin Routes*/}
        {/* <Route element={<AdminLayout />}> */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          
          <Route path="admin/parcels" element={<AdminAllParcels />} />
          <Route path="admin/parcels/create" element={<CreateAdminParcelPage />} />
          <Route path="admin/parcels/:id" element={<AdminParcelDetailPage />} />
          <Route path="admin/parcels/:id/edit" element={<EditAdminParcelPage />} />
          
          <Route path="admin/shipments" element={<AdminAllShipments />} />
          <Route path="admin/shipments/create" element={<AdminCreateShipmentPage />} />
          <Route path="admin/shipments/:shipmentId" element={<AdminShipmentDetailPage />} />
          <Route path="admin/shipments/:shipmentId/manifest" element={<AdminShipmentManifestPage />} />
          <Route path="admin/shipments/:shipmentId/edit" element={<AdminShipmentEditPage />} />
          
          <Route path="admin/warehouses" element={<AdminAllWarehouses />} />
          <Route path="admin/warehouses/create" element={<AdminCreateWarehousePage />} />
          <Route path="admin/warehouses/:id" element={<AdminWarehouseDetailPage />} />
          <Route path="admin/warehouses/:id/edit" element={<AdminEditWarehousePage />} />
          <Route path="admin/warehouses/logs" element={<AdminIntakeLogsPage />} />
          
          <Route path="admin/staff" element={<AdminAllStaff />} />
          <Route path="admin/staff/create" element={<AdminCreateStaff />} />
          <Route path="admin/staff/:staffId" element={<AdminStaffDetailPage />} />
          <Route path="admin/staff/:staffId/edit" element={<AdminEditStaff />} />
          
          <Route path="admin/customers" element={<AdminAllCustomers />} />
          <Route path="admin/customers/:id" element={<AdminCustomerDetailPage />} />
          <Route path="admin/customers/:id/edit" element={<AdminEditCustomerPage />} />
          
          <Route path="admin/agents" element={<AdminAllAgents />} />
          <Route path="admin/agents/:id" element={<AdminAgentDetailPage />} />
          <Route path="admin/agents/create" element={<AdminCreateAgentPage />} />
          <Route path="admin/agents/:id/edit" element={<AdminEditAgentPage />} />

          <Route path="admin/payments" element={<AdminAllPayments />} />
          <Route path="admin/payments/pending" element={<AdminPendingPayments />} />
          <Route path="admin/payments/:id" element={<AdminPaymentDetailPage />} />
          <Route path="admin/payments/:id/edit" element={<AdminEditPaymentPage />} />

          <Route path="admin/reports/finance" element={<AdminFinancialReportsPage />} />
          {/* <Route path="admin/users" element={<AdminUsersPage />} /> */}
          {/* <Route path="admin/settings" element={<AdminSettingsPage />} /> */}
          {/* <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} /> */}
        {/* </Route> */}

  </Routes>
);

export default AppRoutes;

