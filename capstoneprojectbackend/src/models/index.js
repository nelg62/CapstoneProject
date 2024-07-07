"use strict";
const Product = require("./product");
const User = require("./user");

async function init() {
  await Product.sync();
  await User.sync();
}

init();

module.exports = {
  Product,
  User,
};
