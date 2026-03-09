import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/Products.css";

function Products() {

  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  /* FETCH PRODUCTS */
  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  /* SCROLL ANIMATION */
  useEffect(() => {

    const cards = document.querySelectorAll(".product-card");

    const observer = new IntersectionObserver(
      (entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.classList.add("show");
          }
        });
      },
      { threshold:0.2 }
    );

    cards.forEach(card => observer.observe(card));

  }, [products]);

  /* DELETE PRODUCT */
  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="products-container">

      <h2>Products</h2>

      <div className="products-grid">

          {products.map((p, index) => {

          const col = index % 3;
          const row = Math.floor(index / 3);

          let animation = "left";

          if(col === 1){
            animation = row === 0 ? "top" : "bottom";
          }

          if(col === 2){
            animation = "right";
          }
          return(

            <div key={p._id} className={`product-card ${animation}`}>

              {/* PRODUCT IMAGE */}
              <Link to={`/products/${p._id}`}>
                <img
                  src={`http://localhost:5000/uploads/products/${p.image}`}
                  alt={p.name}
                  className="product-image"
                />
              </Link>

              {/* PRODUCT TITLE */}
              <h3 className="product-title">{p.name}</h3>

              {/* ADMIN DELETE */}
              {user?.role === "admin" && (
                <button
                  className="btn btn-secondary"
                  onClick={() => deleteProduct(p._id)}
                >
                  Delete
                </button>
              )}

            </div>

          )

        })}

      </div>

    </div>
  );
}

export default Products;