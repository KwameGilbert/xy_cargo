import React from "react";

const AboutContact = () => (
  <section className="py-10 bg-gray-50">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Contact Us</h2>
      <p className="text-gray-600 mb-4">Have questions or want to partner with us? Reach out below.</p>
      <div className="flex flex-col items-center space-y-2">
        <span className="font-medium text-gray-700">Phone: <a href="tel:+260967379139" className="text-red-500">+260 967 379 139</a></span>
        <span className="font-medium text-gray-700">Email: <a href="mailto:info@xycargozm.com" className="text-red-500">info@xycargozm.com</a></span>
        <span className="font-medium text-gray-700">WhatsApp: <a href="https://wa.me/260967379139" className="text-green-500">Chat Now</a></span>
      </div>
    </div>
  </section>
);

export default AboutContact;
