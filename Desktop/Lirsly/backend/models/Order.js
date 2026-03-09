const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,

  items: [
    {
      name: String,
      price: Number,
      image: String
    }
  ],

  total: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);