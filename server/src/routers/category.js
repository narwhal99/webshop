const router = require("express").Router();
const Category = require("../models/category");

//POST request
router.post("/categories", async (req, res) => {
  try {
    const category = new Category();
    category.type = req.body.type;

    await category.save();

    res.json({
      success: true,
      message: "Successfuly created a new category",
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: err.message,
    });
  }
});

//GET request
router.get("/categories", async (req, res) => {
  try {
    let categories = await Category.find();
    res.json({
      success: true,
      categories: categories,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: err.message,
    });
  }
});

router.get("/categories/:gender/:tag", async (req, res) => {
  try {
    let category = await Category.findOne({
      type: [req.params.gender, req.params.tag],
    })
      .populate("group")
      .exec();

    console.log(category);
    res.json({
      success: true,
      category: category.group,
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: err.message,
    });
  }
});

module.exports = router;
