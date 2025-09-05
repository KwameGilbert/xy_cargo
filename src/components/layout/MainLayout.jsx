import { Children } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>
        {/* Outlet for nested routes */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
