import { Routes, Route } from "react-router";
import HomePage from "../pages/home/HomePage";
import Pricing from "../pages/pricing/Pricing";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
};

export default AppRoutes;
