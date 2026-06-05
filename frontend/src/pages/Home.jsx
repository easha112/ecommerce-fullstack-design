import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <div className="p-6">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-700 text-white p-10 rounded-2xl mb-8 shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome to E-Shop 🛍️
        </h1>
        <p className="mt-2 text-gray-300">
          Best products at best prices
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

    </div>
  );
}

export default Home;