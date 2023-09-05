import { Model } from "sequelize";
interface UserAttributes {
  user_id?: number;
  name_user: string;
  email_user: string;
  password_user: string;
  verification: number;
  rol: number;
  created_at?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public user_id!: number;
  public name_user!: string;
  public email_user!: string;
  public password_user!: string;
  public verification!: number;
  public rol!: number;
  public created_at!: Date;
}

interface UserRegisterParameters {
  name_user: string;
  email_user: string;
  password_user: string;
}

type UserParameters = Omit<UserRegisterParameters, "name_user">;

export { User, UserRegisterParameters, UserParameters };
