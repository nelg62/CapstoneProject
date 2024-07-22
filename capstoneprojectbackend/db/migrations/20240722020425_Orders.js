/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("Orders", (table) => {
      table.increments("id").primary();
      table
        .integer("userId")
        .unsigned()
        .references("id")
        .inTable("Users")
        .onDelete("CASCADE");
      table.timestamp("orderDate").defaultTo(knex.fn.now());
      table.decimal("totalAmount", 10, 2);
      table.string("status").defaultTo("Pending");
    })
    .createTable("OrderItems", (table) => {
      table.increments("id").primary();
      table
        .integer("orderId")
        .unsigned()
        .references("id")
        .inTable("Orders")
        .onDelete("CASCADE");
      table
        .integer("productId")
        .unsigned()
        .references("id")
        .inTable("Product")
        .onDelete("CASCADE");
      table.integer("quantity");
      table.decimal("price", 10, 2);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("OrderItems")
    .dropTableIfExists("Orders");
};
