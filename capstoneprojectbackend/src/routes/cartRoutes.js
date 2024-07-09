const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.post("/add", (req, res) => {
  Controllers.cartController.addToCart(req.body, res);
});

router.get("/:userId", (req, res) => {
  Controllers.cartController.getCartItems(req.params.userId, res);
});

router.delete("/remove/:id", (req, res) => {
  Controllers.cartController.removeFromCart(req.params.id, res);
});

module.exports = router;
