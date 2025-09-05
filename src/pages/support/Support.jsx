import React from "react";
import Support from "../../components/home/Support";
import SEO from "../../components/common/SEO/SEO";

const SupportPage = () => {
  return (
    <>
      <SEO 
        title="Support"
        description="Get help from XY Cargo Zambia's support team. Contact us via phone, email, or WhatsApp for shipping assistance and inquiries."
        keywords="shipping support, customer service, help center, contact XY Cargo, shipping assistance"
        canonical="https://xycargozm.com/support"
      />
      <Support />
    </>
  );
};

export default SupportPage;
