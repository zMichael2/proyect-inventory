import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database/config.database";
import { CumulativePrice } from "../../interface/inventory/cumulativeprice.interface";
import Inventory from "./inventory.model";
import User from "../AuthUser/user.model";

CumulativePrice.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    fee: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inventory_id: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CumulativePrice",
    tableName: "cumulativeprice",
    timestamps: false,
  }
);

Inventory.hasMany(CumulativePrice, { foreignKey: "inventory_id" });
CumulativePrice.belongsTo(Inventory, { foreignKey: "inventory_id" });
CumulativePrice.belongsTo(User, { foreignKey: "user_id" });

export default CumulativePrice;
