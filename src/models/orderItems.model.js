const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  size: {
    type: String,
  },
  quality: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },
});

const OrderItem = mongoose.model("orderItems", orderItemSchema);

module.exports = OrderItem;
