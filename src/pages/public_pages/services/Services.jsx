import React from "react";
import Services from "../../../components/public_pages/home/Services";
import SEO from "../../../components/public_pages/common/SEO/SEO";

const ServicesPage = () => {
  return (
    <>
      <SEO 
        title="Our Services"
        description="Learn about XY Cargo Zambia's air freight, sea freight, electronics shipping, customs clearance and delivery services from China to Zambia."
        keywords="air freight, sea freight, electronics shipping, battery goods, customs clearance, zambia shipping"
        canonical="https://xycargozm.com/services"
      />
      <Services />
    </>
  );
};

export default ServicesPage;
