import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductDetails } from '../services/api';
import { getCartFromStorage, setCartToStorage, addItemToCartHelper } from '../cartUtils';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const { data } = await fetchProductDetails(id);
        setProduct(data);
      } catch (err) {
        console.error("Dynamic asset load failed", err);
      }
      setLoading(false);
    };
    getDetails();
  }, [id]);

  const handleAddToCart = () => {
    const currentCart = getCartFromStorage();
    const updatedCart = addItemToCartHelper(currentCart, product);
    setCartToStorage(updatedCart);
    alert(`${product.name} added to cart!`);
    navigate('/cart');
  };

  if (loading) return <Loader />;
  if (!product) return <p className="text-center mt-10 font-bold text-red-500">Product system mein nahi mila.</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-lg rounded-2xl mt-10 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="p-4 bg-gray-50 rounded-xl flex justify-center">
          <img 
            src={product.image.startsWith('http') ? product.image : `/assets/${product.image}`} 
            alt={product.name} 
            className="h-80 object-contain rounded-lg"
            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
          />
        </div>
        <div>
          <span className="text-xs font-extrabold uppercase bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-3">{product.name}</h1>
          <div className="text-2xl font-black text-gray-900 mt-2">${product.price}</div>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
          <div className="text-sm font-semibold text-green-600 mt-2">Available Stock: {product.stock} units</div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl mt-6 hover:bg-blue-700 transition shadow-md"
          >
            Add to Advanced Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;