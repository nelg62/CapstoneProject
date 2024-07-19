const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  // Get list of all Products
  router.get("/", async (req, res) => {
    try {
      const { sortBy, order = "asc", category } = req.query;
      let query = db("Product").select("*");

      if (category) {
        query = query.where("category", category);
      }

      if (sortBy) {
        query = query.orderBy(sortBy, order);
      }

      const products = await query;

      // const products = await db("Product").select("*");

      const productWithNestedData = await Promise.all(
        products.map(async (product) => {
          const tags = await db("tags")
            .where({ productId: product.id })
            .select("tag");
          const reviews = await db("reviews")
            .where({ productId: product.id })
            .select("*");
          const images = await db("images")
            .where({ productId: product.id })
            .select("url");

          product.tags = tags.map((tag) => tag.tag);
          product.reviews = reviews;
          product.images = images.map((image) => image.url);

          return product;
        })
      );
      res.json(productWithNestedData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get one product by ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const product = await db("Product").where({ id }).first();

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const tags = await db("tags").where({ productId: id }).select("tag");
      const reviews = await db("reviews").where({ productId: id }).select("*");
      const images = await db("images").where({ productId: id }).select("url");

      product.tags = tags.map((tag) => tag.tag);
      product.reviews = reviews;
      product.images = images.map((image) => image.url);

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Delete a product
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await db("Product").where({ id }).del();
      console.log(deleted);
      if (deleted) {
        res.json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product " });
    }
  });

  return router;
};
