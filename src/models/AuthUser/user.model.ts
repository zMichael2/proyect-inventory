import { DataTypes } from "sequelize";
import { sequelize } from "../../database/config.database";
import Verification from "./verification.model";
import Rol from "./rol.model";
import { User } from "../../interface/user.interface";

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name_user: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    email_user: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password_user: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    verification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Verification,
        key: "verification_id",
      },
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Rol,
        key: "rol_id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);
User.belongsTo(Verification, {
  foreignKey: "verification",
  targetKey: "verification_id",
}); //indica donde estas colocando la llave foranea

Verification.hasOne(User, {
  foreignKey: "verification",
  sourceKey: "verification_id",
}); //uno a uno - leer documentación

export default User;
