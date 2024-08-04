const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "CUSTOMER",
    },
    mobile: {
      type: String,
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "addresses",
      },
    ],
    paymentInformation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payments_information",
      },
    ],
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
      },
    ],
  },
  { timeStramp: true }
);


const User = mongoose.model("users",userSchema);

module.exports = User;
