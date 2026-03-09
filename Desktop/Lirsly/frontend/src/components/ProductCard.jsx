import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {

  const { addToCart } = useContext(CartContext);

  const imageUrl = `http://localhost:5000/uploads/${product.image}`;

  return (
    <div className="product-card">

      {/* PRODUCT IMAGE */}

      <Link to={`/products/${product._id}`}>
        <img
          src={imageUrl}
          alt={product.name}
          className="product-image"
        />
      </Link>

      {/* PRODUCT NAME */}

      <h3>
        <Link to={`/products/${product._id}`} className="product-link">
          {product.name}
        </Link>
      </h3>

      {/* PRICE */}

      <p className="product-price">₹{product.price}</p>

      {/* ADD TO CART */}

      <button
        className="cart-btn"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;