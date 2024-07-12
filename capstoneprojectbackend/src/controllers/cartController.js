// "use strict";
// const Models = require("../models");

// const addToCart = (data, res) => {
//   Models.Cart.create(data)
//     .then((data) => {
//       res.send({ result: 200, data: data });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };

// const getCartItems = (userId, res) => {
//   Models.Cart.findAll({ where: { userId } })
//     .then((data) => {
//       res.send({ result: 200, data: data });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };

// const removeFromCart = (id, res) => {
//   Models.Cart.destroy({ where: { id } })
//     .then((data) => {
//       res.send({ result: 200, data: data });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };

// module.exports = {
//   addToCart,
//   getCartItems,
//   removeFromCart,
// };
