/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Product", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description");
    table.string("category");
    table.float("price");
    table.float("discountPercentage");
    table.float("rating");
    table.integer("stock");
    table.string("brand");
    table.string("sku");
    table.float("weight");
    table.string("warrantyInformation");
    table.string("shippingInformation");
    table.string("availabilityStatus");
    table.string("returnPolicy");
    table.integer("minimumOrderQuantity");
    table.string("thumbnail");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Product");
};
