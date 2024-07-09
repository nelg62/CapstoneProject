const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.productController.getProducts(res);
});

router.post("/create", (req, res) => {
  Controllers.productController.createProduct(req.body, res);
});

router.get("/fetch-and-save", (req, res) => {
  Controllers.productController.fetchAndSaveProducts(res);
});

module.exports = router;
