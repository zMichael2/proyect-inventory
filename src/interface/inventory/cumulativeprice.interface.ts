import { Model } from "sequelize";
class CumulativePrice extends Model {
  public id!: string;
  public fee!: number;
  public date!: string;
  public user_id!: number;
  public inventory_id!: string;
}

interface FeeParams {
  email: string;
  inventory: string;
  amount: number;
  date: string;
}

export { CumulativePrice, FeeParams };
