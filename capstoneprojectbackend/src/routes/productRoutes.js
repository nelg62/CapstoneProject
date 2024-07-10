const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.productController.getProducts(res);
});

router.get("/:id", (req, res) => {
  Controllers.productController.getProductById(req.params.id, res);
});

router.post("/create", (req, res) => {
  Controllers.productController.createProduct(req.body, res);
});

router.get("/fetch/fetch-and-save", (req, res) => {
  Controllers.productController.fetchAndSaveProducts(res);
});

module.exports = router;
