/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("id").primary();
    table.integer("productId").unsigned().notNullable();
    table.integer("userId").unsigned().notNullable();
    table.integer("rating").unsigned().notNullable();
    table.text("comment").notNullable();
    table.timestamp("date").defaultTo(knex.fn.now());
    table.string("reviewerName").notNullable();
    table.string("reviewerEmail").notNullable();
    table
      .foreign("productId")
      .references("id")
      .inTable("Product")
      .onDelete("CASCADE");
    table
      .foreign("userId")
      .references("id")
      .inTable("Users")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("reviews");
};
