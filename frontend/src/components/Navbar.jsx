import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCartFromStorage } from '../cartUtils';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation(); // Jab bhi user page badlega, cart count check hoga
  
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  // Glitch-Free Count Sync: Sirf page load par ya component render par chalega, continuous loop nahi chalayega
  useEffect(() => {
    const items = getCartFromStorage();
    const count = items.reduce((acc, item) => acc + (item.qty || 1), 0);
    setCartCount(count);
  }, [location]); // Location change hone par cart auto sync hoga bina glitch ke

  return (
    <nav className="bg-white/85 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-black tracking-tight text-gray-900">
          E-SHOP <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">ADVANCED</span>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-8 font-bold text-gray-600 text-sm">
          <Link to="/" className="hover:text-blue-600 transition-colors py-1">Home</Link>
          <Link to="/products" className="hover:text-blue-600 transition-colors py-1">Products</Link>
          
          {userInfo?.isAdmin && (
            <Link to="/admin" className="text-red-500 font-extrabold bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
              Admin Panel
            </Link>
          )}

          {/* CART WITH BADGE */}
          <Link to="/cart" className="relative hover:text-blue-600 transition-colors flex items-center gap-1.5 py-1">
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black tracking-tighter shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {/* AUTH CONTROL */}
          {userInfo ? (
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <span className="text-xs font-semibold text-gray-400 max-w-[100px] truncate">
                {userInfo.name}
              </span>
              <button 
                onClick={() => { localStorage.removeItem('userInfo'); window.location.reload(); }} 
                className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-semibold tracking-wide hover:bg-gray-800 transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase hover:bg-blue-700 transition-all shadow-md"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;