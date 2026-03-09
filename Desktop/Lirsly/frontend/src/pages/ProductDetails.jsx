import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";
import "../styles/ProductDetails.css";
import "../styles/Alert.css";

function ProductDetails() {

  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [alert, setAlert] = useState("");

  /* ALERT HELPER */
  const showAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(""), 3000);
  };

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {

    e.preventDefault();

    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {

      const res = await API.post("/custom-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setUploadedFile(res.data.filename);
      showAlert("Image uploaded successfully");

    } catch (err) {

      console.error(err);
      showAlert("Upload failed");

    }
  };

  const deleteUploadedImage = async () => {

    try {

      await API.delete(`/custom-upload/${uploadedFile}`);

      setUploadedFile(null);
      setPreview(null);

      showAlert("Image deleted successfully");

    } catch (err) {

      console.error(err);
      showAlert("Delete failed");

    }
  };

  if (!product) return <p>Loading...</p>;

  return (

    <div className="product-details-container">

      {/* CUSTOM ALERT */}
      {alert && <div className="custom-alert">{alert}</div>}

      <div>

        <img
          src={`http://localhost:5000/uploads/products/${product.image}`}
          alt={product.name}
          className="product-details-image"
        />

        {preview && (

          <div className="custom-preview">

            <h4>Your Uploaded Image</h4>

            <img
              src={preview}
              alt="preview"
              className="preview-image"
            />

            {uploadedFile && (

              <button
                className="btn btn-secondary"
                onClick={deleteUploadedImage}
              >
                Delete Uploaded Image
              </button>

            )}

          </div>

        )}

      </div>

      <div className="product-details-info">

        <h2>{product.name}</h2>

        <p className="price">
          ₹{Number(product.price).toLocaleString("en-IN")}/-
        </p>

        <p>{product.description}</p>

        <h3>Upload Your Custom Image</h3>

        <form onSubmit={handleUpload}>

          <input
            type="file"
            onChange={handleImageChange}
            required
          />

          <br /><br />

          <button type="submit" className="btn">
            Upload Image
          </button>

        </form>

        <br />

        <button
          className="btn"
          onClick={() => {
            addToCart(product);
            showAlert("Product added to cart!");
          }}
        >
          Add to Cart
        </button>

      </div>

    </div>

  );
}

export default ProductDetails;