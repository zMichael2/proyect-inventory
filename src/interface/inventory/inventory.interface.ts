import { Model } from "sequelize";
class Inventory extends Model {
  public id!: string;
  public user_id!: number;
  public description!: string | null;
  public total_price!: number;
  public price_paid!: number;
  public neighborhood!: string | null;
  public date!: string;
  public payment_end_day!: string;
  public pending_debt!: boolean;
  public iscompleted!: boolean;
  public isactive!: boolean;
  public created_at!: Date;
}

interface InventoryParams {
  email: string;
  description: string;
  totalPrice: number;
  neighborhood: string;
  date: string;
  payment_end_day: string;
}
interface UpdateInvParams {
  id: string;
  description: string;
  total_price: number;
  neighborhood: string;
  date: string;
  payment_end_day: string;
  pending_debt: boolean;
  iscomplete: boolean;
}
export { Inventory, InventoryParams, UpdateInvParams };
