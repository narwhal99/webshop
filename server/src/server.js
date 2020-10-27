const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

//Connect to the database
mongoose.connect(
  "mongodb://127.0.0.1:27017/webshop-api",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to the database");
    }
  }
);

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//IMG folder accessable
app.use("/images", express.static("images"));

//Require api-s
const group = require("./routers/group");
const product = require("./routers/product");
const category = require("./routers/category");

app.use("/api", product);
app.use("/api", group);
app.use("/api", category);

app.listen(8085, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on PORT", 8085);
  }
});
