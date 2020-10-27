const express = require("express");
const router = new express.Router();
const Group = require("../models/group");
const Product = require("../models/product");

router.post("/group", async (req, res) => {
  try {
    const group = new Group({
      name: req.body.name,
      price: req.body.price,
      product: req.body.productID,
      category: req.body.categoryID,
    });
    await group.save();

    res.json({
      success: true,
      message: "Succesfully created a new group",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//get all group
router.get("/groups", async (req, res) => {
  try {
    let groups = await Group.find().populate("category product").exec();

    res.json({
      success: true,
      groups: groups,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//get group by id
router.get("/group/:id", async (req, res) => {
  try {
    const group = await Group.findOne({ _id: req.params.id });
    res.json({
      success: true,
      group: group,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.put("/group/:id", async (req, res) => {
  try {
    let group = await Group.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          product: req.body.productID,
          category: req.body.categoryID,
        },
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      updatedGroup: group,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/group/:id", async (req, res) => {
  try {
    let deletedGroup = await Group.findOneAndDelete({ _id: req.params.id });
    if (deletedGroup) {
      res.json({
        status: true,
        message: "Succesfully deleted",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
