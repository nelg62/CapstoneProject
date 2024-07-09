"use strict";
const Product = require("./product");
const User = require("./user");
const Cart = require("./cart");

async function init() {
  await Product.sync();
  await User.sync();
  await Cart.sync();
}

init();

module.exports = {
  Product,
  User,
  Cart,
};
