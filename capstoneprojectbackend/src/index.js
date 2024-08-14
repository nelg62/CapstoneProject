const express = require("express");
const knex = require("knex");
const cors = require("cors");
const app = express();
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

// Configure the database connection using Knex
const db = knex({
  client: "pg",
  connection: {
    host: process.env.CLOUD_DB_HOST,
    user: process.env.CLOUD_DB_USER,
    password: process.env.CLOUD_DB_PASSWORD,
    database: process.env.CLOUD_DB_NAME,
  },
  pool: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 60000,
  },
});

// Enable CORS for the specified origin and methods
app.use(
  cors({
    origin: "https://master--capstopeprojectglenharding.netlify.app",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Importing routes and initializing them with a database connection
let userRoutes = require("./routes/userRoutes")(db);
let productRoutes = require("./routes/productRoutes")(db);
let cartRoutes = require("./routes/cartRoutes")(db);
let orderRoutes = require("./routes/orderRoutes")(db);

// Registering routes with Express app
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Setting up Swagger UI for API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  console.error(`Error occurred: ${err.message}`);
  console.error(`Stack trace: ${err.stack}`);
  res.status(500).json({ error: "Something went wrong!" });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
