const mongoose = require("mongoose");
// const validator = require("validator");
const validator = require("validator");
const { token } = require("morgan");

const memberScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (val) => {
      if (!validator.isEmail(val)) {
        throw new Error({ error: "Invalid Email Address" });
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  buisnessName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    default: "Enter your location",
  },
  title: {
    default: "Enter Title/Name of Buisness",
    type: String,
  },
  content: {
    type: String,
    default: "Enter content here",
  },
  bEmail: {
    type: String,
    validate: (data) => {
      if (!validator.isEmail(data)) {
        throw new Error("Invalid Email Address");
      }
    },
    default: "youremail@domain.com",
  },
  bPhone: {
    type: String,
    default: "Enter Phone Number",
  },
  website: {
    type: String,
    default: "Enter your website address",
  },
  image: {
    type: String,
    default: "/images/company.jpg",
  },
  tagline: {
    type: String,
    default: "",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
});

const productSchema = new mongoose.Schema({
  price: {
    type: Number,
    // default:
  },
  name: {
    type: String,
  },
  image: {
    type: String,
    default: "/images/product.jpg",
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
});

exports.member = mongoose.model("Member", memberScheme);
exports.product = mongoose.model("Products", productSchema);
