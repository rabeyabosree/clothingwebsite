import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-orange-800 text-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4 md:flex md:justify-between md:items-center">
        
        {/* Left: Logo / Brand */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-white">BrandName</h2>
          <p className="text-gray-400 mt-1">Your tagline or short description</p>
        </div>

        {/* Center: Navigation Links */}
        <div className="mb-6 md:mb-0 flex flex-col md:flex-row md:gap-6">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/shop" className="hover:text-white transition">Shop</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
        </div>

        {/* Right: Social / Contact */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition">Facebook</a>
          <a href="#" className="hover:text-white transition">Instagram</a>
          <a href="#" className="hover:text-white transition">Twitter</a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} BrandName. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
