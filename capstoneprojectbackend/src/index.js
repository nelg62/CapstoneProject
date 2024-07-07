const express = require("express");
const app = express();
require("dotenv").config();
// parse requests of content-type - application/json
app.use(express.json());

let dbConnect = require("./dbConnect");

let userRoutes = require("./routes/userRoutes");
let productRoutes = require("./routes/productRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
