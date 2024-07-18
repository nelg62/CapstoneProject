// const { DataTypes, Model } = require("sequelize");
// let dbConnect = require("../dbConnect");
// const sequelizeInstance = dbConnect.Sequelize;

// class Cart extends Model {}

// Cart.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     productId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultValue: 1,
//     },
//   },
//   {
//     sequelize: sequelizeInstance,
//     modelName: "Cart",
//     timestamps: true,
//     freezeTableName: true,
//   }
// );

// module.exports = Cart;
