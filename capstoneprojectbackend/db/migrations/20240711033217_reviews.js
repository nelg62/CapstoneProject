/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("id").primary();
    table.integer("rating");
    table.string("comment");
    table.string("reviewerName");
    table.string("reviewerEmail");
    table.foreign("productId").references("Product.id");
    table.foreign("userId").references("User.id");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("reviews");
};
