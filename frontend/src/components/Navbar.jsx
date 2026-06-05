import { Link } from "react-router-dom";
import { getCart } from "../cartUtils";

function Navbar() {
  const cart = getCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <nav className="bg-gradient-to-r from-black to-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold tracking-wide">
        🛒 E-Shop
      </h1>

      <div className="flex gap-6 text-sm">

        <Link className="hover:text-yellow-400 transition" to="/">
          Home
        </Link>

        <Link className="hover:text-yellow-400 transition" to="/cart">
          Cart ({totalItems})
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;