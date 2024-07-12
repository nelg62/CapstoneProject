// "use strict";
// const Models = require("../models");
// const axios = require("axios");

// const getProducts = (res) => {
//   Models.Product.findAll({})
//     .then((data) => {
//       res.send({ result: 200, data: data });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };

// const getProductById = (id, res) => {
//   Models.Product.findByPk(id)
//     .then((data) => {
//       if (data) {
//         res.send({ result: 200, data: data });
//       } else {
//         res.send({ result: 404, message: "Product not found" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };

// const createProduct = (data, res) => {
//   Models.Product.create(data)
//     .then((data) => {
//       res.send({ result: 200, data: data });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };

// const fetchAndSaveProducts = async (res) => {
//   try {
//     const response = await axios.get("https://dummyjson.com/products?limit=10");
//     const products = response.data.products;

//     products.forEach(async (product) => {
//       try {
//         await Models.Product.create({
//           id: product.id,
//           title: product.title,
//           description: product.description,
//           category: product.category,
//           price: product.price,
//           discountPercentage: product.discountPercentage,
//           rating: product.rating,
//           stock: product.stock,
//           brand: product.brand,
//           sku: product.sku,
//           weight: product.weight,
//           warrantyInformation: product.warrantyInformation,
//           shippingInformation: product.shippingInformation,
//           availabilityStatus: product.availabilityStatus,
//           returnPolicy: product.returnPolicy,
//           minimumOrderQuantity: product.minimumOrderQuantity,
//           thumbnail: product.thumbnail,
//         });
//         console.log("Data inserted successfully");
//       } catch (err) {
//         console.error("Error inserting data:", err);
//       }
//     });
//     res.send({ result: 200, message: "Data fetched and saved successfully" });
//   } catch (error) {
//     console.error("Error fetching data from API:", error);
//     res.send({ result: 500, error: error.message });
//   }
// };

// module.exports = {
//   getProducts,
//   createProduct,
//   fetchAndSaveProducts,
//   getProductById,
// };
