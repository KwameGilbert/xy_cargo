import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <main>
        {/* Outlet for nested routes */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
