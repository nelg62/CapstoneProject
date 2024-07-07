const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Matches GET requests sent to /api/products
router.get("/", (req, res) => {
  Controllers.productController.getProducts(res);
});

// Matches POST requests sent to /api/products/create
router.post("/create", (req, res) => {
  Controllers.productController.createProduct(req.body, res);
});

// Matches GET requests sent to /api/products/fetch-and-save
router.get("/fetch-and-save", (req, res) => {
  Controllers.productController.fetchAndSaveProducts(res);
});

module.exports = router;
