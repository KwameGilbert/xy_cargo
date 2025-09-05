import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative w-full h-[600px] bg-cover bg-center" style={{ 
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-logistics.jpg')" 
    }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          <span>Fast, Reliable & </span>
          <span className="text-red-500">Affordable</span>
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Global Shipping
        </h1>
        
        <p className="text-white text-lg md:text-xl max-w-3xl mb-10">
          Ship from anywhere to anywhere with real-time tracking and 
          transparent pricing. Your trusted logistics partner for global commerce.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link to="/tracking" className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg">
            <Search size={20} />
            <span>Track Shipment</span>
          </Link>
          <Link to="/quote" className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white px-6 py-3 rounded-lg">
            <FileText size={20} />
            <span>Get a Quote</span>
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          <div className="text-white text-center">
            <p className="font-bold text-xl">200+</p>
            <p className="text-white/80">Countries Served</p>
          </div>
          <div className="text-white text-center">
            <p className="font-bold text-xl">1M+</p>
            <p className="text-white/80">Packages Delivered</p>
          </div>
          <div className="text-white text-center">
            <p className="font-bold text-xl">24/7</p>
            <p className="text-white/80">Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;