import React from "react";

const Support = () => (
  <section className="py-16 bg-white">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Support</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded shadow">
          <span className="font-semibold">Phone:</span> <a href="tel:+260967379139" className="text-red-500">+260 96 7379139</a> & <a href="tel:+260769481203" className="text-red-500">+260 769 481 203</a>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow">
          <span className="font-semibold">Email:</span> <a href="mailto:support@xycargozm.com" className="text-red-500">support@xycargozm.com</a>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow">
          <span className="font-semibold">WhatsApp:</span> <a href="https://wa.me/260967379139" className="text-green-600">+260 96 7379139</a> & <a href="https://wa.me/260769481203" className="text-green-600">+260 769 481 203</a>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow">
          <span className="font-semibold">FAQ:</span> Check our FAQ section for instant answers.
        </div>
      </div>
    </div>
  </section>
);

export default Support;
