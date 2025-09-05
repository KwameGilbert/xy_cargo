import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, User, UserPlus, Menu, X } from 'lucide-react';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { name: 'Services', path: '/services' },
    { name: 'How We Work', path: '/how-we-work' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Locations', path: '/locations' },
    { name: 'Support', path: '/support' },
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' },
    { code: 'de', label: 'DE' },
  ];

  return (
    <nav className="flex items-center justify-between px-4 md:px-16 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-md">
          <span className="text-white font-bold">XY</span>
        </div>
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">Cargo</Link>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button 
          onClick={toggleMobileMenu} 
          className="text-gray-500 hover:text-red-500 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-8">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link to={item.path} className="text-gray-600 hover:text-red-500 text-sm font-medium">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      
      {/* Desktop Right Section - Language & Auth */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Globe className="w-5 h-5" />
          <select className="bg-transparent text-gray-600 focus:outline-none">
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <User className="w-5 h-5" />
          <Link to="/sign-in" className="text-gray-600 text-sm font-medium">
            Sign In
          </Link>
        </div>
        <Link to="/sign-up" className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium">
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
          <ul className="flex flex-col py-4">
            {menuItems.map((item) => (
              <li key={item.name} className="px-4 py-2">
                <Link 
                  to={item.path} 
                  className="text-gray-600 hover:text-red-500 text-sm font-medium block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="px-4 py-2 border-t border-gray-200 mt-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Globe className="w-5 h-5" />
                <select className="bg-transparent text-gray-600 focus:outline-none">
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                  ))}
                </select>
              </div>
            </li>
            <li className="px-4 py-2">
              <Link 
                to="/sign-in" 
                className="flex items-center space-x-2 text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link 
                to="/sign-up" 
                className="block bg-red-500 text-white py-2 px-4 rounded-lg text-center text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;