import { useState } from "react";
import API from "../services/api";
import "../styles/Admin.css";
import "../styles/Alert.css";

function Admin() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [alert, setAlert] = useState("");

  const showAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(""), 3000);
  };

  const addProduct = async (e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    try {

      await API.post("/products/add", formData);

      showAlert("Product added successfully");

      setName("");
      setPrice("");
      setDescription("");
      setImage(null);

    } catch (err) {

      console.error(err);
      showAlert("Failed to add product");

    }

  };

  return (

    <div className="admin-container">

      {alert && <div className="custom-alert">{alert}</div>}

      <h2 className="admin-title">Add Product</h2>

      <form className="admin-form" onSubmit={addProduct}>

        <input
          className="input-field"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input-field"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          className="input-field"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="file-input-wrapper">
          <input
            type="file"
            id="imageUpload"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <label htmlFor="imageUpload" className="file-label">
            Upload Image
          </label>
        </div>

        <button className="btn">
          Add Product
        </button>

      </form>

    </div>

  );

}

export default Admin;