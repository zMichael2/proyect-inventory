import { DataTypes } from "sequelize";
import { sequelize } from "../../database/config.database";
import { Rol } from "../../interface/rol.interface";

Rol.init(
  {
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    roles: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Rol",
    tableName: "rol",
    timestamps: false,
  }
);

export default Rol;
