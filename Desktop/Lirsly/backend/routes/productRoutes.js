const fs = require("fs");
const path = require("path");

const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const upload = require("../middleware/upload");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// ADD PRODUCT (ADMIN ONLY)
router.post(
  "/add",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, description } = req.body;

      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      if (!req.file) {
        return res.status(400).json({ message: "Image required" });
      }

      const product = await Product.create({
        name,
        price: parseFloat(price),
        description,
        image: req.file.filename
      });

      res.json(product);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // delete image file from uploads folder
    const imagePath = path.join(__dirname, "..", "uploads", product.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // delete product from database
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET SINGLE PRODUCT BY ID
router.get("/:id", async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;