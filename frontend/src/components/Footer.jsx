import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-16 border-t border-gray-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold text-[#ffb703] mb-4">ShopifyStore</h2>
          <p className="text-gray-400">
            Aap ki pasandida products behtareen quality aur munashib qeemat mein. Aaj hi order karein!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-[#ffb703] transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-400 hover:text-[#ffb703] transition-colors duration-300">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-gray-400 hover:text-[#ffb703] transition-colors duration-300">
                My Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
          <p className="text-gray-400 mb-2">Email: support@shopifystore.com</p>
          <p className="text-gray-400">Phone: +92 300 1234567</p>
        </div>

      </div>
      
      {/* Copyright Line */}
      <div className="text-center text-gray-500 mt-10 pt-5 border-t border-gray-800">
        &copy; {new Date().getFullYear()} E-Commerce Fullstack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;