import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database/config.database";
import { Inventory } from "../../interface/inventory/inventory.interface";
import User from "../AuthUser/user.model";

Inventory.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    price_paid: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: null,
    },
    neighborhood: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    payment_end_day: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    pending_debt: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    iscompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Inventory",
    tableName: "inventory",
    timestamps: false,
  }
);
Inventory.belongsTo(User, { foreignKey: "user_id" });

export default Inventory;
