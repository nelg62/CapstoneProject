/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Cart", (table) => {
    table.increments("id").primary();
    table.integer("userId").unsigned().notNullable();
    table.integer("productId").unsigned().notNullable();
    table.integer("quantity").unsigned().notNullable().defaultTo("1");
    table.timestamps(true, true);

    table
      .foreign("userId")
      .references("id")
      .inTable("Users")
      .onDelete("CASCADE");
    table
      .foreign("productId")
      .references("id")
      .inTable("Product")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Cart");
};
