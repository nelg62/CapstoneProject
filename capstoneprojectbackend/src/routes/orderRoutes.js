const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  // Create new order from items in cart  POST Route
  router.post("/", async (req, res) => {
    const { userId, items } = req.body;
    try {
      // Fetch cart items for current user
      const cartItems = await db("Cart")
        .where({ userId })
        .join("Product", "Cart.productId", "Product.id")
        .select(
          "Cart.productId",
          "Product.title",
          "Product.price",
          "Cart.created_at"
        );

      // Check if the cart is empty
      if (cartItems.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      // Calculate total amount for the order
      const totalAmount = cartItems
        .reduce((acc, item) => acc + parseFloat(item.price), 0)
        .toFixed(2);

      const trx = await db.transaction();

      try {
        // Insert a new order and get the order id
        const [orderId] = await trx("Orders").insert({ userId, totalAmount });
        console.log(cartItems);
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
          return res.status(400).json({ error: "No items in the cart" });
        }
        // Set the orderItems from the cartItems data
        const orderItems = cartItems.map((item) => ({
          orderId,
          productId: item.productId,
          quantity: item.quantity,
          price: parseFloat(item.price),
        }));

        // Insert orderItems to database
        await trx("OrderItems").insert(orderItems);

        // Clear the user's cart
        await trx("Cart").where({ userId }).del();

        // Commit the transaction
        await trx.commit();

        // Respond with created order
        res.status(201).json({ orderId });
      } catch (error) {
        // Rollback the transaction in case of error
        await trx.rollback();
        throw error;
      }
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Get top ordered items GET Route
  router.get("/topOrderedItems", async (req, res) => {
    console.log("Received request for topOrderedItems");
    try {
      // Fetch top ordered items
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

  // Get details of specific order GET Route
  router.get("/:orderId", async (req, res) => {
    console.log("Received request for orderId:", req.params.orderId);
    const { orderId } = req.params;
    try {
      // Fetch order details
      const order = await db("Orders").where({ id: orderId }).first();
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Fetch items for the order
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
      console.error("Error fetching order details:", error);
      res.status(500).json({ error: "Failed to fetch order details" });
    }
  });

  return router;
};
