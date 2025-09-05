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
              <span className="text-xl font-bold">Cargo</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted global logistics partner. Fast, reliable, and affordable shipping solutions 
              connecting businesses and individuals worldwide.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2 text-red-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2 text-red-500" />
                <span>support@fycargo.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2 text-red-500" />
                <span>123 Logistics Ave, Global City</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping-calculator" className="text-gray-400 hover:text-red-500">Shipping Calculator</Link></li>
              <li><Link to="/tracking" className="text-gray-400 hover:text-red-500">Package Tracking</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-red-500">Pricing</Link></li>
              <li><Link to="/express-delivery" className="text-gray-400 hover:text-red-500">Express Delivery</Link></li>
              <li><Link to="/cargo-insurance" className="text-gray-400 hover:text-red-500">Cargo Insurance</Link></li>
              <li><Link to="/customs-clearance" className="text-gray-400 hover:text-red-500">Customs Clearance</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="text-gray-400 hover:text-red-500">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-red-500">Careers</Link></li>
              <li><Link to="/locations" className="text-gray-400 hover:text-red-500">Locations</Link></li>
              <li><Link to="/become-an-agent" className="text-gray-400 hover:text-red-500">Become an Agent</Link></li>
              <li><Link to="/press-media" className="text-gray-400 hover:text-red-500">Press & Media</Link></li>
              <li><Link to="/investor-relations" className="text-gray-400 hover:text-red-500">Investor Relations</Link></li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Get shipping updates, promotions, and logistics insights delivered to your inbox.
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
          <p className="text-gray-500 text-sm">© 2024 XY Cargo. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-red-500 text-sm">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-red-500 text-sm">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-gray-500 hover:text-red-500 text-sm">Cookie Policy</Link>
            <Link to="/accessibility" className="text-gray-500 hover:text-red-500 text-sm">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;