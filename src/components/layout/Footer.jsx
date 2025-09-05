import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-md mr-2">
                <span className="text-white font-bold">XY</span>
              </div>
              <span className="text-xl font-bold">CARGO</span>
            </div>
            <p className="text-gray-400 mb-4">
              Reliable China to Zambia shipping services. Specializing in air and sea freight 
              with competitive rates for all types of goods.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2 text-red-500" />
                <span>+86 188 2011 6270</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2 text-red-500" />
                <span>support@xycargo.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2 text-red-500" />
                <span>广东省佛山市南海区里水镇沙浦工业区横二路9号</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm font-semibold">Working Hours:</p>
              <p className="text-gray-400 text-sm">10am-7pm (China Time)</p>
              <p className="text-gray-400 text-sm">5am-1pm (Zambia Time)</p>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping-calculator" className="text-gray-400 hover:text-red-500">Shipping Calculator</Link></li>
              <li><Link to="/tracking" className="text-gray-400 hover:text-red-500">Package Tracking</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-red-500">Air Freight Services</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-red-500">Sea Freight Services</Link></li>
              <li><a href="https://wa.me/260778264621" className="text-gray-400 hover:text-red-500">Electronics Shipping</a></li>
              <li><a href="https://wa.me/260778264621" className="text-gray-400 hover:text-red-500">Special Goods Handling</a></li>
            </ul>
          </div>

          {/* Contact & Support Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact & Support</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="text-gray-400 hover:text-red-500">About XY Cargo</Link></li>
              <li><Link to="/locations" className="text-gray-400 hover:text-red-500">China Warehouse</Link></li>
              <li><a href="https://wa.me/260778264621" className="text-gray-400 hover:text-red-500">WhatsApp Support</a></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-red-500">Contact Us</Link></li>
              <li><a href="tel:+8618820116270" className="text-gray-400 hover:text-red-500">Call China Office</a></li>
              <li><Link to="/shipping-guide" className="text-gray-400 hover:text-red-500">Shipping Guide</Link></li>
            </ul>
            <div className="mt-4">
              <p className="text-gray-400 text-sm font-semibold mb-2">WhatsApp Contacts:</p>
              <div className="space-y-1">
                <p className="text-gray-400 text-xs">LEON: +260 7782 64621</p>
                <p className="text-gray-400 text-xs">MAX/TINA: +86 199 2439 1428</p>
                <p className="text-gray-400 text-xs">BESS/JUDY: +86 189 2402 5811</p>
              </div>
            </div>
          </div>

          {/* Stay Updated */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Get shipping rates, delivery updates, and China-Zambia logistics insights.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 text-gray-400 px-4 py-2 rounded-l-lg focus:outline-none w-full"
              />
              <button className="bg-red-500 rounded-r-lg p-2">
                <Send size={18} className="text-white" />
              </button>
            </div>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-gray-400 text-xs font-semibold mb-1">Important Notice:</p>
              <p className="text-gray-400 text-xs">
                Unclaimed packages after 3 days: $2/day charge
              </p>
              <p className="text-gray-400 text-xs">
                Minimum weight: 1kg | Min sea freight: 0.1 CBM
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-red-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 XY CARGO. All rights reserved. China to Zambia Shipping Specialists.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-red-500 text-sm">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-red-500 text-sm">Terms of Service</Link>
            <Link to="/shipping-terms" className="text-gray-500 hover:text-red-500 text-sm">Shipping Terms</Link>
            <Link to="/contact" className="text-gray-500 hover:text-red-500 text-sm">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;