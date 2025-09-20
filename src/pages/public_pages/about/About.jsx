import React from "react";
import AboutHero from "../../../components/public_pages/about/AboutHero";
import AboutMission from "../../../components/public_pages/about/AboutMission";
import AboutValues from "../../../components/public_pages/about/AboutValues";
import AboutTeam from "../../../components/public_pages/about/AboutTeam";
import AboutContact from "../../../components/public_pages/about/AboutContact";
// import SEO from "../../../components/public_pages/common/SEO/SEO";

const About = () => (
  <div className="min-h-screen bg-gray-50">
    {/* <SEO
      title="About Us | XY Cargo Zambia"
      description="Learn more about XY Cargo Zambia, our mission, values, and team. We provide reliable shipping from China to Zambia."
      keywords="about XY Cargo, logistics, China to Zambia, team, mission, values"
      canonical="https://xycargozm.com/about"
    /> */}
    <AboutHero />
    <AboutMission />
    <AboutValues />
    <AboutTeam />
    <AboutContact />
  </div>
);

export default About;
