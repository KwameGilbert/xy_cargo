import React, { useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';

const SupportCenter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const faqs = [
    'How do I track my package?',
    'What are your shipping rates?',
    'How long does shipping take?',
    'What items can I ship?',
    'Do you provide insurance?',
    'How do I prepare my package?',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent!');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Support Center</h2>
        <p className="text-gray-600 mt-4">
          Get help when you need it. Our support team is here 24/7 to assist you.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-16">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
          <ul className="space-y-4">
            {faqs.map((faq, index) => (
              <li key={index} className="border-b border-gray-300 pb-2">
                <button className="text-gray-600 hover:text-red-500 focus:outline-none">
                  {faq}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-8">
            <div className="text-center">
              <Phone size={24} className="text-red-500 mx-auto mb-2" />
              <p className="text-gray-600">Phone Support</p>
              <p className="text-gray-800 font-bold">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <MessageCircle size={24} className="text-red-500 mx-auto mb-2" />
              <p className="text-gray-600">Live Chat</p>
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none">
                Start Chat
              </button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="How can we help you?"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Describe your inquiry in detail..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Send Message
            </button>
          </form>
          <p className="text-gray-600 mt-4">
            <span className="text-red-500 font-bold">Response Time:</span> We typically respond within 2-4 hours during business hours. For urgent matters, please call our 24/7 hotline.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportCenter;