import React from "react";

const values = [
  { 
    title: "Reliability", 
    desc: "We keep our promises by ensuring every shipment is handled with care, accuracy, and timeliness." 
  },
  { 
    title: "Integrity", 
    desc: "We conduct our business with honesty, transparency, and accountability in every transaction and partnership." 
  },
  { 
    title: "Customer Commitment", 
    desc: "Our customers are at the heart of what we do; we go the extra mile to provide exceptional service and lasting satisfaction." 
  },
  { 
    title: "Innovation", 
    desc: "We embrace creativity and technology to improve our logistics processes and deliver smarter, faster solutions." 
  },
  { 
    title: "Teamwork", 
    desc: "We believe in the power of collaboration — working together with our clients, partners, and staff to achieve shared success." 
  },
];

const AboutValues = () => (
  <section className="py-10 bg-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((v, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-6 shadow">
            <h3 className="text-lg font-bold text-red-500 mb-2">{v.title}</h3>
            <p className="text-gray-700">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutValues;
