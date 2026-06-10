import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const loadProducts = async (keyword = '') => {
    setLoading(true);
    try {
      const { data } = await fetchProducts(keyword);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching dynamic products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadProducts(search);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Filter Interface */}
      <form onSubmit={handleSearch} className="mb-8 flex justify-center max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search Laptop, Headphone, Chair, iPhone..."
          className="border p-3 rounded-l-lg w-full outline-none focus:border-blue-500 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 font-semibold shadow-sm">
          Search
        </button>
      </form>

      {loading ? <Loader /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No matching dynamic assets found.</p>
      )}
    </div>
  );
};

export default Products;