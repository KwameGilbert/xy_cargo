import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
// import { HelmetProvider } from "react-helmet-async"
import MainLayout from "./components/public_pages/layout/MainLayout"
import AppRoutes from "./routes/AppRoutes"
// import GlobalSEO from "./components/public_pages/common/SEO/GlobalSEO"
import "./index.css"

const App = () => {
  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)