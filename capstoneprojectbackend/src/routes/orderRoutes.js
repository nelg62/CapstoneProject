const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  router.post("/", async (req, res) => {
    const { userId, items } = req.body;
    try {
      const cartItems = await db("Cart")
        .where({ userId })
        .join("Product", "Cart.productId", "Product.id")
        .select(
          "Cart.productId",
          "Product.title",
          "Product.price",
          "Cart.created_at"
        );

      if (cartItems.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      const totalAmount = cartItems
        .reduce((acc, item) => acc + parseFloat(item.price), 0)
        .toFixed(2);

      const [orderId] = await db("Orders").insert({ userId, totalAmount });

      const orderItems = cartItems.map((item) => ({
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: parseFloat(item.price),
      }));

      await db("OrderItems").insert(orderItems);

      await db("Cart").where({ userId }).del();

      res.status(201).json({ orderId });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  router.get("/topOrderedItems", async (req, res) => {
    console.log("Received request for topOrderedItems");
    try {
      const topOrderedItems = await db("OrderItems")
        .join("Product", "OrderItems.productId", "Product.id")
        .select(
          "Product.id as productId",
          "Product.title",
          "Product.thumbnail",
          "Product.price",
          db.raw("COUNT(OrderItems.productId) as orderCount")
        )
        .groupBy(
          "OrderItems.productId",
          "Product.id",
          "Product.title",
          "Product.thumbnail",
          "Product.price"
        )
        .orderBy("orderCount", "DESC")
        .limit(10);

      res.json(topOrderedItems);
    } catch (error) {
      console.error("Error fetching top ordered items:", error);
      res.status(500).json({ error: "Failed to fetch top ordered products" });
    }
  });

  router.get("/:orderId", async (req, res) => {
    console.log("Received request for orderId:", req.params.orderId);
    const { orderId } = req.params;
    try {
      const order = await db("Orders").where({ id: orderId }).first();
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      const orderItems = await db("OrderItems")
        .where({ orderId })
        .join("Product", "OrderItems.productId", "Product.id")
        .select(
          "OrderItems.productId",
          "Product.title",
          "OrderItems.quantity",
          "OrderItems.price",
          "Product.thumbnail"
        );

      res.json({ order, items: orderItems });
    } catch (error) {
      console.error("Error fetching order details", error);
      res.status(500).json({ error: "Failed to fetch order details" });
    }
  });

  return router;
};
