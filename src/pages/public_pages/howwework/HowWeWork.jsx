import React from "react";
import HowWeWork from "../../../components/public_pages/home/HowWeWork";
import SEO from "../../../components/public_pages/common/SEO/SEO";

const HowWeWorkPage = () => {
  return (
    <>
      <SEO 
        title="How We Work"
        description="Discover the XY Cargo Zambia shipping process from warehouse to delivery. Learn how we handle your goods from China to Zambia."
        keywords="shipping process, China to Zambia, cargo handling, freight forwarding, import process"
        canonical="https://xycargozm.com/howwework"
      />
      <HowWeWork />
    </>
  );
};

export default HowWeWorkPage;
