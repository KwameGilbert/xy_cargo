import React from "react";

const values = [
  { title: "Reliability", desc: "We deliver on our promises and ensure your cargo arrives safely and on time." },
  { title: "Transparency", desc: "Clear pricing and honest communication at every step." },
  { title: "Customer Focus", desc: "Your satisfaction is our top priority." },
  { title: "Innovation", desc: "We use technology to make shipping easier and more efficient." },
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
