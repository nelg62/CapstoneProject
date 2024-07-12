/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("Product", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.text("description");
      table.string("category");
      table.decimal("price", 10, 2);
      table.decimal("discountPercentage", 5, 2);
      table.decimal("rating", 3, 2);
      table.integer("stock");
      table.string("brand");
      table.string("sku");
      table.decimal("weight", 5, 2);
      table.decimal("width", 5, 2);
      table.decimal("height", 5, 2);
      table.decimal("depth", 5, 2);
      table.string("warrantyInformation");
      table.string("shippingInformation");
      table.string("availabilityStatus");
      table.string("returnPolicy");
      table.integer("minimumOrderQuantity").defaultTo(1);
      table.string("thumbnail");
    })
    .createTable("tags", function (table) {
      table.increments("id").primary();
      table.integer("productId").unsigned().references("id").inTable("Product");
      table.string("tag");
    })
    .createTable("reviews", function (table) {
      table.increments("id").primary();
      table.integer("productId").unsigned().references("id").inTable("Product");
      table.integer("rating");
      table.text("comment");
      table.timestamp("date");
      table.string("reviewerName");
      table.string("reviewerEmail");
    })
    .createTable("images", function (table) {
      table.increments("id").primary();
      table.integer("productId").unsigned().references("id").inTable("Product");
      table.string("url");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("images")
    .dropTableIfExists("reviews")
    .dropTableIfExists("tags")
    .dropTableIfExists("Product");
};
