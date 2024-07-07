const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    discountPercentage: {
      type: DataTypes.FLOAT,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    brand: {
      type: DataTypes.STRING,
    },
    sku: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    warrantyInformation: {
      type: DataTypes.STRING,
    },
    shippingInformation: {
      type: DataTypes.STRING,
    },
    availabilityStatus: {
      type: DataTypes.STRING,
    },
    returnPolicy: {
      type: DataTypes.STRING,
    },
    minimumOrderQuantity: {
      type: DataTypes.INTEGER,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Product",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Product;
