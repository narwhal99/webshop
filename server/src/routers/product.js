const express = require("express");
const router = new express.Router();
const Product_group = require("../models/group");
const Product = require("../models/product");
const multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/product", upload.array("productImage", 5), async (req, res) => {
  try {
    const product = new Product({
      color: req.body.color,
      productImage: req.files.map((photo) => photo.path),
    });
    await product.save();

    res.json({
      success: true,
      message: "Succesfully created a new product",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//get every product
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
    });

    if (product) {
      res.json({
        success: true,
        message: "Successfully deleted a product",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// router.delete("/image", async (req, res) => {
//   try {
//     const product = await Product.findOne({ _id: req.body.img.product._id });
//     await unlinkAsync(product.productImage[req.body.img.index]);
//     await product.productImage.splice(req.body.img.index, 1);
//     await product.save();
//     const product_group = await Product_group.find({}).populate({
//       path: "product",
//       model: "Product",
//     });
//     res.send(product_group);
//   } catch (err) {
//     res.send(err);
//   }
// });

// router.patch("/image", upload.array("productImage", 5), async (req, res) => {
//   try {
//     const product = await Product.findOne({ _id: req.body.editedProduct });
//     await req.files.map((photo) => product.productImage.push(photo.path));
//     await product.save();
//     const product_group = await Product_group.find({}).populate({
//       path: "product",
//       model: "Product",
//     });
//     res.send(product_group);
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
