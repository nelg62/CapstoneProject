const express = require("express");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  console.log("Middleware reached");
  const authHeader = req.headers.authorization;
  console.log("Authorization Header", authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    console.log("No token found");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.DB_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.sendStatus(403);
    }
    console.log("Decoded User", user);
    req.user = user;
    next();
  });
};

module.exports = (db) => {
  const router = express.Router();

  router.use(authenticateToken);

  router.post("/", async (req, res) => {
    const { userId, productId } = req.body;
    console.log("Request user:", req.user);
    console.log("userId", userId);
    if (req.user.id !== userId) return res.sendStatus(403);
    try {
      await db("Cart").insert({ userId, productId });

      const cartItems = await db
        .select(
          db.raw("MIN(Cart.id) as cartId"),
          "Product.id as productId",
          "Product.title",
          "Product.thumbnail",
          "Product.price",
          db.raw("COUNT(*) as quantity")
        )
        .from("Cart")
        .leftJoin("Product", "Product.id", "Cart.productId")
        .where("Cart.userId", userId)
        .andWhere("Cart.productId", productId)
        .groupBy(
          "Cart.productId",
          "Product.id",
          "Product.title",
          "Product.thumbnail",
          "Product.price"
        );

      res.status(201).json(cartItems[0]);
    } catch (error) {
      console.error("Error adding item to cart", error);
      res.status(500).json({ error: "failed to add product to cart " });
    }
  });

  router.delete("/", async (req, res) => {
    const { userId, productId } = req.body;
    console.log("Request user:", req.user);
    if (req.user.id !== userId) return res.sendStatus(403);
    try {
      const earliestItem = await db("Cart")
        .where({ userId, productId })
        .orderBy("created_at")
        .first();

      console.log("erliestitem delete", earliestItem);

      if (!earliestItem) {
        return res.status(404).json({ error: "Item not found in cart" });
      }

      await db("Cart").where({ id: earliestItem.id }).del();

      res.json({ message: "Product removed from cart" });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      res.status(500).json({ error: "Failed to remove product from cart" });
    }
  });

  router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    console.log("userId123", userId);
    console.log("Request user:", req.user);

    if (req.user.id !== parseInt(userId)) return res.sendStatus(403);
    try {
      const cartItems = await db("Cart")
        .where({ userId })
        .join("Product", "Cart.productId", "Product.id")
        .select(
          "Cart.productId",
          "Product.title",
          "Product.price",
          "Product.thumbnail",
          db.raw("COUNT(*) as quantity")
        )
        .groupBy(
          "Cart.productId",
          "Product.id",
          "Product.title",
          "Product.price",
          "Product.thumbnail"
        );

      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items " });
    }
  });

  return router;
};
