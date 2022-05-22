import sequelize from "../db-init.js";
import s from "sequelize";
const { DataTypes } = s;

const ProductsAndUsers = sequelize.define("productsAndUsers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // autoIncrement: true,
  },
});

export default ProductsAndUsers;
