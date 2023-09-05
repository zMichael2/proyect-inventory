import { Router } from "express";
import { celebrate } from "celebrate";
import { celebrateError } from "../middleware/celebrateError.middleware";
import {
  createInventory,
  deleteInventory,
  getInventory,
  getInventoryId,
  setCumulative,
  totalPiceComplete,
  totalPiceNotPayed,
  updatedInventory,
} from "../controllers/inventory.controller";
import {
  createFeeValidato,
  createInvValidato,
  idInventoryValidator,
  updateInvValidator,
} from "../helpers/validateFields.helper";
import { checkJwt } from "../middleware/jwtTokenValidate.middleware";

const inventoryRouter = Router();

inventoryRouter.post(
  "/createinventory",
  [checkJwt, celebrate(createInvValidato)],
  createInventory
);
inventoryRouter.get("/getinventory", getInventory);
inventoryRouter.get("/getinventory/:email", getInventoryId);
inventoryRouter.post(
  "/setcumulative",
  [celebrate(createFeeValidato)],
  setCumulative
);
inventoryRouter.post(
  "/deleteinventory",
  [celebrate(idInventoryValidator)],
  deleteInventory
);
inventoryRouter.get("/totalpice/notpayed", totalPiceNotPayed);
inventoryRouter.get("/totalpice/complete", totalPiceComplete);
inventoryRouter.post(
  "/updateinventory",
  [celebrate(updateInvValidator)],
  updatedInventory
);

inventoryRouter.use(celebrateError);

export default inventoryRouter;
