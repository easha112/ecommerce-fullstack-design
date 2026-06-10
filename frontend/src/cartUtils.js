// frontend/src/cartUtils.js


// Cart localStorage se lena
export const getCartFromStorage = () => {
  const savedCart = localStorage.getItem("cartItems");

  if (!savedCart) {
    return [];
  }

  return JSON.parse(savedCart);
};


// Cart localStorage me save karna
export const setCartToStorage = (cartItems) => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );
};


// Product add karna
export const addItemToCartHelper = (cartItems, product) => {

  const productId = product._id || product.id;


  const alreadyExist = cartItems.find(
    item => (item._id || item.id) === productId
  );


  let updatedCart;


  if (alreadyExist) {

    updatedCart = cartItems.map(item => {

      if ((item._id || item.id) === productId) {

        return {
          ...item,
          qty: (item.qty || 1) + 1
        };

      }

      return item;

    });


  } else {


    updatedCart = [
      ...cartItems,
      {
        ...product,
        qty: 1
      }
    ];

  }


  setCartToStorage(updatedCart);

  return updatedCart;
};



// Remove product
export const removeItemFromCartHelper = (
  cartItems,
  removeId
) => {


  const updatedCart = cartItems.filter(
    item => (item._id || item.id) !== removeId
  );


  setCartToStorage(updatedCart);

  return updatedCart;
};



// Quantity update
export const updateQuantityHelper = (
  cartItems,
  id,
  qty
) => {


  const updatedCart = cartItems.map(item => {

    if ((item._id || item.id) === id) {

      return {
        ...item,
        qty: qty
      };

    }

    return item;

  });


  setCartToStorage(updatedCart);

  return updatedCart;
};