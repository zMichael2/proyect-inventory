import { uid } from "uid";
import Inventory from "../models/Inventory/inventory.model";
import CumulativePrice from "../models/Inventory/cumulativeprice.mode";
import User from "../models/AuthUser/user.model";
import {
  InventoryParams,
  UpdateInvParams,
} from "../interface/inventory/inventory.interface";
import { FeeParams } from "../interface/inventory/cumulativeprice.interface";
import { getDateInUSTimezone } from "../helpers/datetimeus.helper";
import { getUsersByEmail } from "../helpers/AuthHelpers/queriesUser.helpers";
import { messageText } from "../helpers/constants.helper";
import {
  findInventoryAndUser,
  getTotalFeeForUserAndInventory,
  inventoryExist,
  isComplete,
  updatePricePaid,
} from "../helpers/Inventory/queriesInventory.helper";

const newInventory = async (invParams: InventoryParams) => {
  try {
    const date = invParams.date;
    const user = await getUsersByEmail(invParams.email);

    const info = {
      id: uid(),
      user_id: user?.user_id,
      description: invParams.description,
      total_price: invParams.totalPrice,
      neighborhood: invParams.neighborhood,
      date: invParams.date,
      payment_end_day: invParams.payment_end_day,
    };
    if (!user) {
      return {
        message: messageText.ACCOUNT_DOES_NOT_EXIST,
        isError: true,
      };
    }

    if (!date) {
      const dateTinme = getDateInUSTimezone();
      Object.assign(info, { date: dateTinme });
    }
    const inventory = await Inventory.create(info);

    return {
      //mejora mapName
      data: {
        id: inventory.id,
        user: user.name_user,
        description: inventory.description,
        total_price: inventory.total_price,
        price_paid: inventory.price_paid,
        neighborhood: inventory.neighborhood,
        date: inventory.date,
        payment_end_day: inventory.payment_end_day,
      },
      isError: false,
      message: messageText.INVENTORY_CREATED_SUCCESSFULLY,
    };
  } catch (e) {
    console.log(e);
    throw messageText.ERROR_DATA_BASE;
  }
};

const getInventoryActive = async () => {
  try {
    const inventories = await Inventory.findAll({
      attributes: [
        "id",
        "description",
        "total_price",
        "price_paid",
        "neighborhood",
        "date",
        "payment_end_day",
      ],
      where: {
        isactive: true,
        pending_debt: false,
        iscompleted: false,
      },
      include: [
        {
          model: User,
          attributes: ["email_user"],
        },
      ],
    });

    return {
      data: { inventories },
    };
  } catch (e) {
    console.log(e);

    throw messageText.ERROR_DATA_BASE;
  }
};

const getInventoryById = async (email: string) => {
  try {
    const user = await getUsersByEmail(email);
    if (!user) {
      return {
        message: messageText.ACCOUNT_DOES_NOT_EXIST,
        isError: true,
      };
    }
    const inventories = await Inventory.findAll({
      attributes: [
        "id",
        "description",
        "total_price",
        "price_paid",
        "neighborhood",
        "date",
        "payment_end_day",
      ],
      where: {
        isactive: true,
        pending_debt: false,
        user_id: user?.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["email_user"],
        },
      ],
    });

    return {
      data: { inventories },
    };
  } catch (e) {
    console.log(e);

    throw messageText.ERROR_DATA_BASE;
  }
};

const cumulativeFee = async (feeParams: FeeParams) => {
  try {
    const dateExist = feeParams.date;
    const userAndInventory = await findInventoryAndUser(
      feeParams.email,
      feeParams.inventory
    );

    if (!userAndInventory) {
      return {
        message: messageText.USER_OR_INVENTORY_DOES_NOT_EXIST,
        isError: true,
      };
    }

    const totalPaid = await getTotalFeeForUserAndInventory(
      userAndInventory.user_id,
      feeParams.inventory
    );

    const info = {
      id: uid(),
      fee: feeParams.amount,
      user_id: userAndInventory.user_id,
      inventory_id: feeParams.inventory,
    };

    if (!dateExist) {
      const dateTinme = getDateInUSTimezone();
      Object.assign(info, { date: dateTinme });
    }

    if (totalPaid + feeParams.amount > Number(userAndInventory.total_price)) {
      return {
        message: messageText.VALUE_EXCEEDS_TOTAL_DEBT,
        isError: true,
      };
    }

    if (totalPaid + feeParams.amount === Number(userAndInventory.total_price)) {
      await isComplete(feeParams.inventory);
    }
    const fee = await CumulativePrice.create(info);
    await updatePricePaid(feeParams.inventory, totalPaid + feeParams.amount);

    return {
      data: {
        fee,
        total_price: userAndInventory.total_price,
        price_paid: totalPaid + feeParams.amount,
      },
    };
  } catch (e) {
    console.log(e);
    throw messageText.ERROR_DATA_BASE;
  }
};

const isActiveInventory = async (id: string) => {
  try {
    const isInventoryExist = await inventoryExist(id);
    if (!isInventoryExist) {
      return {
        message: messageText.THE_INVENTORY_DOES_NOT_EXIST,
        isError: true,
      };
    }

    await Inventory.update(
      { isactive: false },
      {
        where: {
          id: id,
        },
      }
    );

    return {
      message: messageText.THE_ELIMINATED_INVENTORY,
    };
  } catch (e) {
    console.log(e);
    throw messageText.ERROR_DATA_BASE;
  }
};

const TotalNotPayed = async () => {
  try {
    const result = await Inventory.sum("total_price", {
      where: {
        pending_debt: true,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
    throw messageText.ERROR_DATA_BASE;
  }
};

const totalPiceIsComplete = async () => {
  try {
    const result = await Inventory.sum("total_price", {
      where: {
        iscompleted: true,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
    throw messageText.ERROR_DATA_BASE;
  }
};

const modifyInventory = async (updateInvParams: UpdateInvParams) => {
  try {
    const { id, ...inventaryParam } = updateInvParams;

    const isInventoryExist = await inventoryExist(id);
    if (!isInventoryExist) {
      return {
        message: messageText.THE_INVENTORY_DOES_NOT_EXIST,
        isError: true,
      };
    }
    const updatedInventory = await Inventory.update(inventaryParam, {
      where: {
        id: id,
      },
    });
    return {
      message: messageText.INVENTORY_UPDATED_CORRECTLY,
    };
  } catch (e) {
    console.log(e);
    throw messageText.ERROR_DATA_BASE;
  }
};

export {
  newInventory,
  getInventoryActive,
  getInventoryById,
  cumulativeFee,
  isActiveInventory,
  TotalNotPayed,
  totalPiceIsComplete,
  modifyInventory,
};
