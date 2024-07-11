/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("Product", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("description").notNullable();
      table.string("category").notNullable();
      table.decimal("price", 10, 2).notNullable();
      table.decimal("discountPercentage", 5, 2);
      table.decimal("rating", 3, 2);
      table.integer("stock").notNullable();
      table.string("brand").notNullable();
      table.string("sku").notNullable();
      table.decimal("weight", 5, 2);
      table.json("dimensions");
      table.string("warrantyInformation");
      table.string("shippingInformation");
      table.string("availabilityStatus");
      table.string("returnPolicy");
      table.integer("minimumOrderQuantity").defaultTo(1);
      table.string("thumbnail");
      table.timestamps(true, true);
    })
    .createTable("productImages", function (table) {
      table.increments("id").primary();
      table.integer("productId").unsigned().notNullable();
      table.string("image").notNullable();
      table.foreign("productId").references("Product.id").onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("productImages")
    .dropTableIfExists("Product");
};
