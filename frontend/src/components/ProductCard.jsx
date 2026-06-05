import { Link } from "react-router-dom";

function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group">

      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
      />

      {/* Content */}
      <div className="p-4">

        <h2 className="text-lg font-bold">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          {product.description.slice(0, 50)}...
        </p>

        <p className="text-black font-bold mt-2">
          ${product.price}
        </p>

        <Link to={`/product/${product.id}`}>
          <button className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition">
            View Details
          </button>
        </Link>

      </div>
    </div>
  );
}

export default ProductCard;