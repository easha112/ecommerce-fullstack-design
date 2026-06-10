import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let response;
      if (isSignup) {
        response = await registerUser(formData);
      } else {
        response = await loginUser({ email: formData.email, password: formData.password });
      }
      
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      
      if (response.data.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>
        {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <input 
              type="text" placeholder="Full Name" required className="border p-3 rounded-lg outline-none focus:border-blue-500"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
          )}
          <input 
            type="email" placeholder="Email Address" required className="border p-3 rounded-lg outline-none focus:border-blue-500"
            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" required className="border p-3 rounded-lg outline-none focus:border-blue-500"
            value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
          />
          <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignup(!isSignup)} className="text-blue-600 font-medium hover:underline focus:outline-none">
            {isSignup ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;