import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Request controller to automatically attach JWT token if available
API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ─── PRODUCTS FUNCTIONS (Cleaned & Unique) ───
// Isme keyword query option integrated hai taake search bhi kaam kare aur browse bhi
export const fetchProducts = (keyword = '') => API.get(`/products?keyword=${keyword}`);
export const fetchProductDetails = (id) => API.get(`/products/${id}`);
export const addProduct = (productData) => API.post('/products', productData);
export const editProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProductAsset = (id) => API.delete(`/products/${id}`);

// ─── AUTH FUNCTIONS ───
export const loginUser = (authData) => API.post('/users/login', authData); 
export const registerUser = (authData) => API.post('/users/signup', authData);

export default API;