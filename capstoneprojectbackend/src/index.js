const express = require("express");
const knex = require("knex");
const cors = require("cors");
const app = express();
require("dotenv").config();

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

let dbConnect = require("./dbConnect");

let userRoutes = require("./routes/userRoutes");
let productRoutes = require("./routes/productRoutes")(db);
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
