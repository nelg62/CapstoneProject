const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const products = await db("Product").select("*");

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

  return router;
};
