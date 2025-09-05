import React from "react";

const Services = () => (
  <section className="py-16 bg-white">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Services</h2>
      <ul className="space-y-4">
        <li className="bg-gray-50 p-4 rounded shadow">
          <span className="font-semibold">Air Freight:</span> Fast delivery from China to Zambia, 10-17 days.
        </li>
        <li className="bg-gray-50 p-4 rounded shadow">
          <span className="font-semibold">Sea Freight:</span> Affordable bulk shipping, 4-6 weeks.
        </li>
        <li className="bg-gray-50 p-4 rounded shadow">
          <span className="font-semibold">Electronics & Battery Goods:</span> Special handling and compliance.
        </li>
        <li className="bg-gray-50 p-4 rounded shadow">
          <span className="font-semibold">Customs Clearance:</span> Hassle-free import process.
        </li>
        <li className="bg-gray-50 p-4 rounded shadow">
          <span className="font-semibold">Final Mile Delivery:</span> Direct to your door in Zambia.
        </li>
      </ul>
    </div>
  </section>
);

export default Services;
