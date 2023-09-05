import { DataTypes } from "sequelize";
import { sequelize } from "../../database/config.database";
import { Verification } from "../../interface/verification.interface";

Verification.init(
  {
    verification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    verification_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
    isactivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isactivatechange: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Verification",
    tableName: "verification",
    timestamps: false,
  }
);

export default Verification;
