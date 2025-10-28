import React from "react";

const AboutMission = () => (
  <section className="py-16 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Vision */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To redefine logistics in Africa by building a connected, efficient, and technology-driven cargo network that empowers trade and supports economic growth.
          </p>
        </div>
        
        {/* Mission */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our mission is to simplify global and regional trade for our clients through timely deliveries, transparent operations, and cost-effective logistics services. We aim to be the preferred link between China and Zambia, ensuring smooth cargo movement with integrity and professionalism.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutMission;
