import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * SEO component for managing page metadata
 * @param {Object} props
 * @param {string} props.title - The page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.type - Open Graph type (default: website)
 */
const SEO = ({
  title,
  description,
  keywords,
  ogImage = "/images/xy-cargo-og-image.jpg",
  canonical,
  type = "website",
}) => {
  const siteTitle = "XY Cargo Zambia";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
};

export default SEO;
