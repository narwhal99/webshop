const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  type: { type: String, unique: true, required: true },
});

CategorySchema.virtual("group", {
  ref: "Group",
  localField: "_id",
  foreignField: "category",
});

module.exports = mongoose.model("Category", CategorySchema);
