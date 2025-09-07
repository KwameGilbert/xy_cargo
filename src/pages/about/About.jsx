import React from "react";
import AboutHero from "../../components/about/AboutHero";
import AboutMission from "../../components/about/AboutMission";
import AboutValues from "../../components/about/AboutValues";
import AboutTeam from "../../components/about/AboutTeam";
import AboutContact from "../../components/about/AboutContact";
import SEO from "../../components/common/SEO/SEO";

const About = () => (
  <div className="min-h-screen bg-gray-50">
    <SEO
      title="About Us | XY Cargo Zambia"
      description="Learn more about XY Cargo Zambia, our mission, values, and team. We provide reliable shipping from China to Zambia."
      keywords="about XY Cargo, logistics, China to Zambia, team, mission, values"
      canonical="https://xycargozm.com/about"
    />
    <AboutHero />
    <AboutMission />
    <AboutValues />
    <AboutTeam />
    <AboutContact />
  </div>
);

export default About;
