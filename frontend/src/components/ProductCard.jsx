import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  getCartFromStorage, 
  setCartToStorage, 
  addItemToCartHelper 
} from '../cartUtils';


const ProductCard = ({ product }) => {

  const navigate = useNavigate();


  const handleAddToCart = () => {

    const currentCart = getCartFromStorage();

    const updatedCart = addItemToCartHelper(
      currentCart,
      product
    );

    setCartToStorage(updatedCart);

    navigate('/cart');
  };



  const getProductImage = (imgName) => {

    if (!imgName) {
      return "/assets/placeholder.jpg";
    }


    if (
      imgName.startsWith("http") ||
      imgName.startsWith("/")
    ) {
      return imgName;
    }


    return `/assets/${imgName}`;
  };



  return (

    <div className="
      border rounded-xl shadow-md 
      overflow-hidden bg-white 
      flex flex-col justify-between
      hover:-translate-y-1 transition
    ">


      <div className="
        relative bg-gray-50 
        flex justify-center 
        items-center p-4
      ">


        <img
          src={getProductImage(product.image)}
          alt={product.name}
          className="h-48 w-full object-contain"

          onError={(e)=>{
            e.target.src =
            "https://via.placeholder.com/150";
          }}
        />



        {product.countryLogo && (

          <img

            src={
              product.countryLogo.startsWith("/")
              ? product.countryLogo
              : `/assets/${product.countryLogo}`
            }

            alt="country"
            className="
            absolute top-3 right-3 
            w-7 h-4 object-cover
            "
          />

        )}

      </div>



      <div className="p-4 flex-grow">


        <span className="
          text-xs font-bold 
          text-blue-600 
          bg-blue-50 px-2 py-1 rounded
        ">

          {product.category}

        </span>



        <h3 className="
          font-semibold text-lg mt-2
        ">

          {product.name}

        </h3>



        <p className="
          text-gray-500 text-sm
        ">

          {product.description}

        </p>



        <div className="
          text-xl font-bold mt-3
        ">

          ${product.price}

        </div>


      </div>




      <div className="
        p-4 grid grid-cols-2 gap-2
      ">


        <Link

          to={`/product/${product._id || product.id}`}

          className="
          text-center border py-2 
          rounded-lg text-sm
          "

        >

          View

        </Link>




        <button

          onClick={handleAddToCart}

          className="
          bg-blue-600 text-white 
          py-2 rounded-lg
          hover:bg-blue-700
          "

        >

          Add To Cart

        </button>


      </div>


    </div>

  );

};


export default ProductCard;