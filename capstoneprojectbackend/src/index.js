const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

let dbConnect = require("./dbConnect");

let userRoutes = require("./routes/userRoutes");
let productRoutes = require("./routes/productRoutes");
let cartRoutes = require("./routes/cartRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
