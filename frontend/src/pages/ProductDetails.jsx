import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import { addToCart } from "../cartUtils";

function ProductDetails() {

  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl text-red-500 font-bold">
          Product Not Found
        </h2>

        <Link to="/">
          <button className="mt-4 bg-black text-white px-4 py-2 rounded">
            Go Home
          </button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert("Added to Cart 🛒");
  };

  return (
    <div className="p-10 flex flex-col md:flex-row gap-10">

      <img
        src={product.image}
        className="w-full md:w-[450px] rounded-2xl shadow-lg"
      />

      <div className="flex flex-col gap-4">

        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>

        <p className="text-gray-600">
          {product.description}
        </p>

        <h2 className="text-2xl font-bold">
          ${product.price}
        </h2>

        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Add To Cart
        </button>

        <Link to="/">
          <button className="border px-6 py-3 rounded-xl">
            Back to Shop
          </button>
        </Link>

      </div>
    </div>
  );
}

export default ProductDetails;