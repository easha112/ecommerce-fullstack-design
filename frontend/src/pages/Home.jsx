import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const fallbackProducts = [
  { id: "t1", name: "Advanced Premium Coffee Machine", category: "Technology", price: 299, image: "/assets/t1.jpg", countryLogo: "/assets/f1.jpg", description: "High-end espresso and cappuccino maker machine with touch control." },
  { id: "t2", name: "Smart Gadgets Combo Set", category: "Technology", price: 899, image: "/assets/t2.jpg", countryLogo: "/assets/f2.jpg", description: "Premium smartphone and wireless headphones setup for tech lovers." },
  { id: "i1", name: "Aesthetic Living Room Sofa", category: "Interior", price: 450, image: "/assets/i1.jpg", countryLogo: "/assets/f3.jpg", description: "Comfortable single-seater modern sofa with premium fabric." },
  { id: "i2", name: "Minimalist Ceramic Plant Pot", category: "Interior", price: 45, image: "/assets/i2.jpg", countryLogo: "/assets/f4.jpg", description: "Beautiful indoor plant pot to elevate your interior design." },
  { id: "c1", name: "Premium Streetwear Hoodie", category: "Clothes", price: 65, image: "/assets/c1.jpg", countryLogo: "/assets/f5.jpg", description: "Heavyweight cotton hoodie with minimalist aesthetic design." },
  { id: "m1", name: "Leather Organizer Desk Mat", category: "Miscellaneous", price: 35, image: "/assets/m1.jpg", countryLogo: "/assets/f6.jpg", description: "Premium leather desk mat to organize your workstation gadgets." }
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadHomeProducts = async () => {
      try {
        const { data } = await fetchProducts();
        if (isMounted) {
          if (data && data.length > 0) {
            setFeaturedProducts(data);
          } else {
            setFeaturedProducts(fallbackProducts);
          }
        }
      } catch (err) {
        console.error("Fetch error, safe fallback loaded", err);
        if (isMounted) setFeaturedProducts(fallbackProducts);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadHomeProducts();
    return () => { isMounted = false; };
  }, []);

  // Filter products by category
  const clothesProducts = featuredProducts.filter(p => p.category === 'Clothes');
  const interiorProducts = featuredProducts.filter(p => p.category === 'Interior');
  const techProducts = featuredProducts.filter(p => p.category === 'Technology');
  const miscProducts = featuredProducts.filter(p => p.category === 'Miscellaneous');

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      
      {/* ─── NEW STABLE HERO BANNER ─── */}
      <div className="w-full rounded-2xl mb-10 overflow-hidden shadow-lg relative bg-slate-900 h-64 md:h-80 flex items-center">
        <img 
          src="/assets/b1.jpg" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>
        <div className="relative z-20 px-8 md:px-16 text-white w-full max-w-xl">
          <span className="bg-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-3">
            Exclusive Digital Assets
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            E-SHOP <span className="text-blue-400">ADVANCED</span>
          </h1>
          <p className="text-gray-300 mt-2 text-xs md:text-sm leading-relaxed">
            Discover premium tech gadgets, aesthetic interior assets, and modern lifestyle concepts curated precisely under advanced design metrics.
          </p>
        </div>
      </div>

      {/* ─── PRODUCTS SECTION HEADER ─── */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">Featured Advanced Assets</h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Premium curated items ready for configuration</p>
        </div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
          {featuredProducts.length} Items Available
        </span>
      </div>
      
      {/* ─── CATEGORY SECTIONS ─── */}
      {loading ? (
        <div className="text-center py-20 text-gray-400 font-medium">
          Loading Assets Layout...
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* 1. Clothes Section */}
          {clothesProducts.length > 0 && (
            <div>
              <h3 className="text-xl font-extrabold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">Apparel & Clothes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {clothesProducts.map(product => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* 2. Interior Section */}
          {interiorProducts.length > 0 && (
            <div>
              <h3 className="text-xl font-extrabold text-gray-800 mb-4 border-l-4 border-green-600 pl-3">Interior & Home Decor</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {interiorProducts.map(product => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* 3. Technology Section */}
          {techProducts.length > 0 && (
            <div>
              <h3 className="text-xl font-extrabold text-gray-800 mb-4 border-l-4 border-purple-600 pl-3">Technology & Gadgets</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {techProducts.map(product => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* 4. Miscellaneous Section */}
          {miscProducts.length > 0 && (
            <div>
              <h3 className="text-xl font-extrabold text-gray-800 mb-4 border-l-4 border-gray-600 pl-3">Miscellaneous</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {miscProducts.map(product => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Home;