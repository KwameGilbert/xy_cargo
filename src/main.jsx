import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import MainLayout from "./components/layout/MainLayout"
import AppRoutes from "./routes/AppRoutes"
import GlobalSEO from "./components/common/SEO/GlobalSEO"
import "./index.css"

const App = () => {
  return (
    <HelmetProvider>
      <GlobalSEO />
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </HelmetProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)