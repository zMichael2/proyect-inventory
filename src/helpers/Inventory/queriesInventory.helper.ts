import Inventory from "../../models/Inventory/inventory.model";
import User from "../../models/AuthUser/user.model";
import CumulativePrice from "../../models/Inventory/cumulativeprice.mode";
import { sequelize } from "../../database/config.database";

const findInventoryAndUser = async (email: string, inventoryId: string) => {
  const inventory = await Inventory.findOne({
    attributes: ["user_id", "total_price"],
    where: {
      id: inventoryId,
      isactive: true,
    },
    include: [
      {
        model: User,
        attributes: [],
        where: {
          email_user: email,
        },
      },
    ],
  });
  return inventory;
};
const getTotalFeeForUserAndInventory = async (
  userId: number,
  inventoryId: string
) => {
  const result = await CumulativePrice.findOne({
    attributes: [[sequelize.fn("SUM", sequelize.col("fee")), "total_fee"]],
    where: {
      user_id: userId,
      inventory_id: inventoryId,
    },
  });

  if (result && result.getDataValue("total_fee") !== null) {
    return Number(result.getDataValue("total_fee"));
  } else {
    return 0;
  }
};

const isComplete = async (inventory: string) => {
  await Inventory.update(
    { iscompleted: true },
    {
      where: {
        id: inventory,
      },
    }
  );
};

const updatePricePaid = async (inventory: string, pricePaid: number) => {
  await Inventory.update(
    { price_paid: pricePaid },
    {
      where: {
        id: inventory,
      },
    }
  );
};

const inventoryExist = async (id: string) => {
  const inventory = await Inventory.findOne({
    attributes: ["user_id", "total_price"],
    where: {
      id: id,
      isactive: true,
    },
  });
  return inventory;
};

export {
  findInventoryAndUser,
  getTotalFeeForUserAndInventory,
  updatePricePaid,
  inventoryExist,
  isComplete,
};
