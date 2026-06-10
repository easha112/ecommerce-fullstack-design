import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, addProduct, editProduct, deleteProductAsset } from '../services/api';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '', category: 'laptop', countryLogo: '', stock: 10 });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Protected Route Logic
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login'); // Redirect to login if not admin
    } else {
      loadAdminProducts();
    }
  }, [userInfo, navigate]);

  const loadAdminProducts = async () => {
    try {
      const { data } = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await editProduct(editId, form);
        setMessage('Product updated successfully!');
      } else {
        await addProduct(form);
        setMessage('Product created successfully!');
      }
      setForm({ name: '', price: '', image: '', description: '', category: 'laptop', countryLogo: '', stock: 10 });
      setEditId(null);
      loadAdminProducts();
    } catch (err) {
      setMessage('Error managing product asset');
    }
  };

  const startEdit = (product) => {
    setForm(product);
    setEditId(product._id);
  };

  const handleAssetDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await deleteProductAsset(id);
        setMessage('Asset deleted successfully!');
        loadAdminProducts();
      } catch (err) {
        setMessage('Failed to delete asset');
      }
    }
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{editId ? 'Edit Product Asset' : 'Add Advanced Asset'}</h2>
        {message && <p className="bg-blue-50 text-blue-700 p-2 rounded mb-4 text-sm font-medium">{message}</p>}
        
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
          <input type="text" placeholder="Product Name (e.g. iPhone 15 Pro)" required className="border p-2 rounded outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input type="number" placeholder="Price" required className="border p-2 rounded outline-none" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
          <input type="text" placeholder="Image Name (e.g. product1.jpg)" required className="border p-2 rounded outline-none" value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
          <input type="text" placeholder="Country/Logo Image Path (Optional)" className="border p-2 rounded outline-none" value={form.countryLogo} onChange={e => setForm({...form, countryLogo: e.target.value})} />
          
          <select className="border p-2 rounded outline-none" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option value="laptop">Laptop</option>
            <option value="headphone">Headphone</option>
            <option value="chair">Chair</option>
            <option value="iphone">iPhone</option>
          </select>
          
          <select className="border p-2 rounded outline-none" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
          <option value="Clothes">Clothes</option>
          <option value="Interior">Interior</option>
          <option value="Technology">Technology</option>
          <option value="Miscellaneous">Miscellaneous</option>
          </select>
          <input type="number" placeholder="Stock Level" required className="border p-2 rounded outline-none" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
          <textarea placeholder="Product Description..." required className="border p-2 rounded outline-none h-24 resize-none" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          
          <button type="submit" className="bg-blue-600 text-white font-semibold py-2.5 rounded hover:bg-blue-700 transition">
            {editId ? 'Update System Asset' : 'Save System Asset'}
          </button>
        </form>
      </div>

      {/* Asset List View */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Current Assets Registry</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-sm text-gray-600">
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-b text-sm text-gray-700 hover:bg-gray-50">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 uppercase text-xs tracking-wider text-blue-600 font-bold">{p.category}</td>
                <td className="p-3 font-semibold">${p.price}</td>
                <td className="p-3 flex justify-center gap-4">
                  <button onClick={() => startEdit(p)} className="text-blue-600 font-semibold hover:underline">Edit</button>
                  <button onClick={() => handleAssetDelete(p._id)} className="text-red-600 font-semibold hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;