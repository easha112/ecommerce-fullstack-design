import React, { useState, useEffect } from 'react';
import { getCartFromStorage, setCartToStorage, removeItemFromCartHelper } from '../cartUtils';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCartFromStorage());
  }, []);

  const handleRemove = (id) => {
    const updated = removeItemFromCartHelper(cartItems, id);
    setCartItems(updated);
  };

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map(item => 
      (item._id === id || item.id === id) ? { ...item, qty: newQty } : item
    );
    setCartItems(updated);
    setCartToStorage(updated);
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart (Advanced View)</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty. Add some advanced assets!</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map(item => (
              <div key={item._id || item.id} className="flex items-center justify-between border p-4 rounded-xl bg-white shadow-sm">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image.startsWith('http') || item.image.startsWith('/assets') ? item.image : `/assets/${item.image}`}
                    alt={item.name} 
                    className="w-20 h-20 object-contain border rounded"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500 uppercase font-bold">{item.category}</p>
                    <p className="text-blue-600 font-bold">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="number" 
                    className="w-16 border p-1 rounded text-center" 
                    value={item.qty || 1} 
                    onChange={(e) => handleQuantityChange(item._id || item.id, Number(e.target.value))}
                  />
                  <button onClick={() => handleRemove(item._id || item.id)} className="text-red-500 hover:underline font-medium">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between border-b pb-2 mb-4 font-medium text-gray-700">
              <span>Total Items:</span>
              <span>{cartItems.reduce((acc, item) => acc + (item.qty || 1), 0)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
              <span>Grand Total:</span>
              <span>${calculateTotal()}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;