// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.seed = async function (knex) {
//   // Deletes ALL existing entries
//   await knex("productImages").del();
//   await knex("productImages").insert([
//     {
//       productId: 78,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.png",
//     },
//     {
//       productId: 78,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/2.png",
//     },
//     {
//       productId: 78,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/3.png",
//     },

//     {
//       productId: 79,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png",
//     },
//     {
//       productId: 79,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/2.png",
//     },
//     {
//       productId: 79,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/3.png",
//     },

//     {
//       productId: 80,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/Huawei%20Matebook%20X%20Pro/1.png",
//     },
//     {
//       productId: 80,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/Huawei%20Matebook%20X%20Pro/2.png",
//     },
//     {
//       productId: 80,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/Huawei%20Matebook%20X%20Pro/3.png",
//     },

//     {
//       productId: 81,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/1.png",
//     },
//     {
//       productId: 81,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/2.png",
//     },
//     {
//       productId: 81,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/3.png",
//     },

//     {
//       productId: 82,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/1.png",
//     },
//     {
//       productId: 82,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/2.png",
//     },
//     {
//       productId: 82,
//       image:
//         "https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/3.png",
//     },

//     {
//       productId: 121,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/1.png",
//     },
//     {
//       productId: 121,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/2.png",
//     },
//     {
//       productId: 121,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/3.png",
//     },

//     {
//       productId: 122,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/1.png",
//     },
//     {
//       productId: 122,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/2.png",
//     },
//     {
//       productId: 122,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/3.png",
//     },

//     {
//       productId: 123,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/1.png",
//     },
//     {
//       productId: 123,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/2.png",
//     },
//     {
//       productId: 123,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/3.png",
//     },

//     {
//       productId: 124,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/1.png",
//     },
//     {
//       productId: 124,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/2.png",
//     },
//     {
//       productId: 124,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/3.png",
//     },

//     {
//       productId: 125,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20A57/1.png",
//     },
//     {
//       productId: 125,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20A57/2.png",
//     },
//     {
//       productId: 125,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20A57/3.png",
//     },

//     {
//       productId: 126,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20F19%20Pro%20Plus/1.png",
//     },
//     {
//       productId: 126,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20F19%20Pro%20Plus/2.png",
//     },
//     {
//       productId: 126,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20F19%20Pro%20Plus/3.png",
//     },

//     {
//       productId: 127,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20K1/1.png",
//     },
//     {
//       productId: 127,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20K1/2.png",
//     },
//     {
//       productId: 127,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20K1/3.png",
//     },
//     {
//       productId: 127,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20K1/4.png",
//     },

//     {
//       productId: 128,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Realme%20C35/1.png",
//     },
//     {
//       productId: 128,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Realme%20C35/2.png",
//     },
//     {
//       productId: 128,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Realme%20C35/3.png",
//     },

//     {
//       productId: 129,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Realme%20X/1.png",
//     },
//     {
//       productId: 129,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Realme%20X/2.png",
//     },
//     {
//       productId: 129,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Realme%20X/3.png",
//     },

//     {
//       productId: 130,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Realme%20XT/1.png",
//     },
//     {
//       productId: 130,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Realme%20XT/2.png",
//     },
//     {
//       productId: 130,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Realme%20XT/3.png",
//     },

//     {
//       productId: 131,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S7/1.png",
//     },
//     {
//       productId: 131,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S7/2.png",
//     },
//     {
//       productId: 131,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S7/3.png",
//     },

//     {
//       productId: 132,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S8/1.png",
//     },
//     {
//       productId: 132,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S8/2.png",
//     },
//     {
//       productId: 132,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S8/3.png",
//     },

//     {
//       productId: 133,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S10/1.png",
//     },
//     {
//       productId: 133,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S10/2.png",
//     },
//     {
//       productId: 133,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S10/3.png",
//     },

//     {
//       productId: 134,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Vivo%20S1/1.png",
//     },
//     {
//       productId: 134,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Vivo%20S1/2.png",
//     },
//     {
//       productId: 134,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Vivo%20S1/3.png",
//     },

//     {
//       productId: 135,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Vivo%20V9/1.png",
//     },
//     {
//       productId: 135,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Vivo%20V9/2.png",
//     },
//     {
//       productId: 135,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Vivo%20V9/3.png",
//     },

//     {
//       productId: 136,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Vivo%20X21/1.png",
//     },
//     {
//       productId: 136,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Vivo%20X21/2.png",
//     },
//     {
//       productId: 136,
//       image:
//         "https://cdn.dummyjson.com/products/images/smartphones/Vivo%20X21/3.png",
//     },
//   ]);
// };
