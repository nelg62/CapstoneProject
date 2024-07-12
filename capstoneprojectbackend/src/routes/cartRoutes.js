const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  router.post("/", async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      const existingItem = await db("Cart")
        .where({ userId, productId })
        .first();

      if (existingItem) {
        await db("Cart")
          .where({ userId, productId })
          .update({
            quantity: existingItem.quantity + quantity,
            updated_at: new Date(),
          });
      } else {
        await db("Cart").insert({ userId, productId, quantity });
      }

      res.status(201).json({ message: "Product added to cart" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add product to cart" });
    }
  });

  return router;
};
