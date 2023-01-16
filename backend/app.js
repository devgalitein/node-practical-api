const express = require("express");
const app = express();
require("dotenv").config();
require("./Model/config");
const userRoutes = require("./Routes/userRoutes");
const todoRoutes = require("./Routes/todoRoutes");
const PORT = process.env.PORT || 8080;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
