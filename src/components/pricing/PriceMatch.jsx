import React from 'react';
import { CheckCircle } from 'lucide-react';

const PriceMatch = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <CheckCircle className="text-green-500 h-12 w-12" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Price Match Guarantee</h2>
          
          <p className="text-center text-gray-600 mb-8 max-w-2xl">
            Found a lower price elsewhere? We'll match it and give you an additional 5% discount. That's our
            commitment to providing the best value in shipping.
          </p>
          
          <button className="text-red-500 border border-red-500 px-6 py-3 rounded-md hover:bg-red-50 transition-colors">
            Request Price Match
          </button>
        </div>
      </div>
    </section>
  );
};

export default PriceMatch;
