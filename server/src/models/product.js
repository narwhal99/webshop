const mongoose = require("mongoose");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const productSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    stock: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    productImage: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
