import { Model } from "sequelize";
interface RolAttributes {
  rol_id: number;
  roles: string;
}

class Rol extends Model<RolAttributes> implements RolAttributes {
  public rol_id!: number;
  public roles!: string;
}

export { Rol };
