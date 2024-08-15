const express = require("express");
const jwt = require("jsonwebtoken");
const validateApiKey = require("../middleware/validateApiKey");

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  console.log("Middleware reached");
  const authHeader = req.headers.authorization;
  console.log("Authorization Header", authHeader);

  // Extract token from authorization header
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    console.log("No token found");
    return res.sendStatus(401); //Unoutorized
  }

  // Verify token
  jwt.verify(token, process.env.CLOUD_DB_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.sendStatus(403); // Forbidden
    }
    console.log("Decoded User", user); // Success
    req.user = user;
    next();
  });
};

module.exports = (db) => {
  const router = express.Router();

  // User authentication middleware on all routes
  // router.use(validateApiKey);
  router.use(authenticateToken);

  // Add an item to Cart  POST Route
  router.post("/", async (req, res) => {
    const { userId, productId } = req.body;
    console.log("post route", req.headers.authorization);
    console.log("API Key backend post route:", process.env.API_KEY);

    // Check if requesting user is current logged in user
    if (req.user.id !== userId) return res.sendStatus(403);

    const trx = await db.transaction();

    try {
      // Insert new item to cart
      await trx("Cart").insert({ userId, productId });

      // Get updated cart items pulling from multiple diffrarant tables
      const cartItems = await trx("Cart")
        .select(
          trx.raw("MIN(Cart.id) as cartId"),
          "Product.id as productId",
          "Product.title",
          "Product.thumbnail",
          "Product.price",
          trx.raw("COUNT(*) as quantity")
        )
        .leftJoin("Product", "Product.id", "Cart.productId")
        .where("Cart.userId", userId)
        .andWhere("Cart.productId", productId)
        .groupBy(
          "Cart.id",
          "Cart.productId",
          "Product.id",
          "Product.title",
          "Product.thumbnail",
          "Product.price"
        );

      await trx.commit();

      res.status(201).json(cartItems[0]); //Respond with created Product in cart
    } catch (error) {
      await trx.rollback();
      console.error("Error adding item to cart", error);
      res.status(500).json({ error: "failed to add product to cart " });
    }
  });

  // Remove item from cart DELETE Route
  router.delete("/", async (req, res) => {
    const { userId, productId } = req.body;
    console.log("Request user:", req.user);

    // Check if requesting user is current logged in user
    if (req.user.id !== userId) return res.sendStatus(403);

    const trx = await db.transaction();

    try {
      // Find the earliest item in the cart with same id
      const earliestItem = await trx("Cart")
        .where({ userId, productId })
        .orderBy("created_at")
        .first();

      if (!earliestItem) {
        return res.status(404).json({ error: "Item not found in cart" }); // not found
      }

      //Delete the erliest item in cart with id
      await trx("Cart").where({ id: earliestItem.id }).del();

      await trx.commit();

      res.json({ message: "Product removed from cart" });
    } catch (error) {
      await trx.rollback();
      console.error("Error removing item from cart:", error);
      res.status(500).json({ error: "Failed to remove product from cart" });
    }
  });

  // Get cart items for a spesific user GET Route
  router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    // Check if requesting user is current logged in user
    if (req.user.id !== parseInt(userId)) return res.sendStatus(403);

    try {
      // Fetch cart items
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

  // Clear the cart for a user POST Route
  router.post("/clear", async (req, res) => {
    const { userId } = req.body;

    // Check if requesting user is current logged in user
    if (req.user.id !== userId) return res.sendStatus(403);

    const trx = await db.transaction();

    try {
      // Clear all items from the cart
      await trx("Cart").where({ userId }).del();

      await trx.commit();

      res.json({ message: "Cart cleared" });
    } catch (error) {
      await trx.rollback();
      console.error("Error clearing cart", error);
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  return router;
};
