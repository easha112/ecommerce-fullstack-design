import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Products from "./pages/Products"; 
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      {/* ─── GLOBAL VISUAL WRAPPER ─── */}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900 antialiased font-sans flex flex-col">
        
        {/* Transparent Blur Sticky Navbar */}
        <Navbar />

        {/* Main Content Area (flex-grow ensures footer stays at bottom if content is less) */}
        <main className="pb-16 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>

        {/* Footer Added Here */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;