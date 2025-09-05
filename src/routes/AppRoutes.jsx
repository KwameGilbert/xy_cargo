import { Routes, Route } from "react-router";
import HomePage from "../pages/home/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
