/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("images").del();
  await knex("reviews").del();
  await knex("tags").del();
  await knex("Product").del();

  const products = [
    {
      id: 121,
      title: "iPhone 5s",
      description:
        "The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it's an older model, it still provides a reliable user experience.",
      category: "smartphones",
      price: 199.99,
      discountPercentage: 11.85,
      rating: 3.92,
      stock: 65,
      tags: ["smartphones", "apple"],
      brand: "Apple",
      sku: "AZ1L68SM",
      weight: 4,
      width: 8.49,
      height: 25.34,
      depth: 18.12,
      warrantyInformation: "1 week warranty",
      shippingInformation: "Ships in 1 week",
      availabilityStatus: "In Stock",
      reviews: [
        {
          rating: 4,
          comment: "Highly impressed!",
          date: "2024-05-23T08:56:21.625Z",
          reviewerName: "Wyatt Perry",
          reviewerEmail: "wyatt.perry@x.dummyjson.com",
        },
        {
          rating: 5,
          comment: "Awesome product!",
          date: "2024-05-23T08:56:21.625Z",
          reviewerName: "Olivia Anderson",
          reviewerEmail: "olivia.anderson@x.dummyjson.com",
        },
        {
          rating: 4,
          comment: "Highly recommended!",
          date: "2024-05-23T08:56:21.625Z",
          reviewerName: "Mateo Nguyen",
          reviewerEmail: "mateo.nguyen@x.dummyjson.com",
        },
      ],
      returnPolicy: "No return policy",
      minimumOrderQuantity: 2,
      meta: {
        createdAt: "2024-05-23T08:56:21.625Z",
        updatedAt: "2024-05-23T08:56:21.625Z",
        barcode: "2903942810911",
        qrCode: "https://assets.dummyjson.com/public/qr-code.png",
      },
      images: [
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/1.png",
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/2.png",
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/3.png",
      ],
      thumbnail:
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/thumbnail.png",
    },
    {
      id: 122,
      title: "iPhone 6",
      description:
        "The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time.",
      category: "smartphones",
      price: 299.99,
      discountPercentage: 4.54,
      rating: 3.76,
      stock: 99,
      tags: ["smartphones", "apple"],
      brand: "Apple",
      sku: "ZPXH3X9J",
      weight: 8,
      width: 16.21,
      height: 22.94,
      depth: 5.63,
      warrantyInformation: "3 year warranty",
      shippingInformation: "Ships overnight",
      availabilityStatus: "In Stock",
      reviews: [
        {
          rating: 5,
          comment: "Would buy again!",
          date: "2024-05-23T08:56:21.625Z",
          reviewerName: "Nicholas Bailey",
          reviewerEmail: "nicholas.bailey@x.dummyjson.com",
        },
        {
          rating: 5,
          comment: "Great product!",
          date: "2024-05-23T08:56:21.625Z",
          reviewerName: "Clara Berry",
          reviewerEmail: "clara.berry@x.dummyjson.com",
        },
        {
          rating: 3,
          comment: "Not as described!",
          date: "2024-05-23T08:56:21.625Z",
          reviewerName: "Gavin Stanley",
          reviewerEmail: "gavin.stanley@x.dummyjson.com",
        },
      ],
      returnPolicy: "60 days return policy",
      minimumOrderQuantity: 3,
      meta: {
        createdAt: "2024-05-23T08:56:21.625Z",
        updatedAt: "2024-05-23T08:56:21.625Z",
        barcode: "2517230562429",
        qrCode: "https://assets.dummyjson.com/public/qr-code.png",
      },
      images: [
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/1.png",
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/2.png",
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/3.png",
      ],
      thumbnail:
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/thumbnail.png",
    },
    {
      id: 123,
      title: "iPhone 13 Pro",
      description:
        "The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.",
      category: "smartphones",
      price: 1099.99,
      discountPercentage: 18.3,
      rating: 3.42,
      stock: 26,
      tags: ["smartphones", "apple"],
      brand: "Apple",
      sku: "YGQKHPGK",
      weight: 8,
      width: 22.39,
      height: 9.77,
      depth: 19.6,
      warrantyInformation: "1 year warranty",
      shippingInformation: "Ships in 2 weeks",
      availabilityStatus: "In Stock",
      reviews: [
        {
          rating: 5,
          comment: "Highly impressed!",
          date: "2024-05-23T08:56:21.625Z",
          reviewerName: "Aria Roberts",
          reviewerEmail: "aria.roberts@x.dummyjson.com",
        },
        {
          rating: 4,
          comment: "Great product!",
          date: "2024-05-23T08:56:21.625Z",
          reviewerName: "Ryan Graham",
          reviewerEmail: "ryan.graham@x.dummyjson.com",
        },
        {
          rating: 2,
          comment: "Poor quality!",
          date: "2024-05-23T08:56:21.625Z",
          reviewerName: "Mason Wright",
          reviewerEmail: "mason.wright@x.dummyjson.com",
        },
      ],
      returnPolicy: "7 days return policy",
      minimumOrderQuantity: 1,
      meta: {
        createdAt: "2024-05-23T08:56:21.625Z",
        updatedAt: "2024-05-23T08:56:21.625Z",
        barcode: "2986724589988",
        qrCode: "https://assets.dummyjson.com/public/qr-code.png",
      },
      images: [
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/1.png",
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/2.png",
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/3.png",
      ],
      thumbnail:
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/thumbnail.png",
    },
  ];

  for (const product of products) {
    const [productId] = await knex("Product")
      .insert({
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
        sku: product.sku,
        weight: product.weight,
        width: product.width,
        height: product.height,
        depth: product.depth,
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation,
        availabilityStatus: product.availabilityStatus,
        returnPolicy: product.returnPolicy,
        minimumOrderQuantity: product.minimumOrderQuantity,
        thumbnail: product.thumbnail,
      })
      .returning("id");

    await knex("tags").insert(
      product.tags.map((tag) => ({
        productId: productId,
        tag: tag,
      }))
    );

    await knex("reviews").insert(
      product.reviews.map((review) => ({
        productId: productId,
        rating: review.rating,
        comment: review.comment,
        date: new Date(review.date),
        reviewerName: review.reviewerName,
        reviewerEmail: review.reviewerEmail,
      }))
    );

    await knex("images").insert(
      product.images.map((url) => ({
        productId: productId,
        url: url,
      }))
    );
  }
};
