import { getCart, saveCart } from "../cartUtils";
import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState(getCart());

  const update = (data) => {
    setCart(data);
    saveCart(data);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Your Cart 🛒
      </h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="bg-white shadow p-4 rounded-xl flex justify-between mb-4">

            <div>
              <h2 className="font-bold">{item.name}</h2>
              <p>${item.price}</p>
              <p>Qty: {item.qty}</p>
            </div>

          </div>
        ))
      )}

      <h2 className="text-xl font-bold mt-6">
        Total: ${total}
      </h2>

    </div>
  );
}

export default Cart;