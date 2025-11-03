import React from "react";

const AboutMission = () => (
  <section className="py-16 bg-gradient-to-br from-white to-red-50 relative overflow-hidden">
    {/* Background Image Placeholder */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop&crop=center')"
      }}
    ></div>

    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Vision */}
        <div className="text-center lg:text-left bg-white rounded-lg p-8 shadow-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
            <span className="text-red-500 font-bold text-2xl">👁️</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To redefine logistics in Africa by building a connected, efficient, and technology-driven cargo network that empowers trade and supports economic growth.
          </p>
        </div>

        {/* Mission */}
        <div className="text-center lg:text-left bg-white rounded-lg p-8 shadow-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
            <span className="text-red-500 font-bold text-2xl">🎯</span>
          </div>
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
