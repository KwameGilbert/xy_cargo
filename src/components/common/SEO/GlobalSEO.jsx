import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * Global SEO component for common metadata and Open Graph settings
 */
const GlobalSEO = () => (
  <Helmet>
    <meta name="author" content="XY Cargo Zambia" />
    <meta property="og:site_name" content="XY Cargo Zambia" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/images/logo/logo.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="/images/logo/logo.png" />
    <link rel="icon" href="/favicon.jpg"  type="image/svg+xml" />
    <link rel="apple-touch-icon " href="/images/logo/logo.png" />
  </Helmet>
);

export default GlobalSEO;
