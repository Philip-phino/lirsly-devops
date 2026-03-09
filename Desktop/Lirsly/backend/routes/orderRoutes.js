const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/create", async (req, res) => {
  try {

    const { name, email, address, items, total } = req.body;

    const order = await Order.create({
      name,
      email,
      address,
      items,
      total
    });

    res.json(order);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;