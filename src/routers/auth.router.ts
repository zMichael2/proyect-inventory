import { Router } from "express";
import { celebrate } from "celebrate";
import { celebrateError } from "../middleware/celebrateError.middleware";
import {
  celebrateCheckPass,
  userLoginValidator,
  userRegisterValidator,
} from "../helpers/validateFields.helper";
import {
  authLoginUser,
  authRegisterUser,
  changePasswordCheck,
  checkCode,
  verficatePassword,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post(
  "/register",
  [celebrate(userRegisterValidator)],
  authRegisterUser
);
authRouter.post("/login", [celebrate(userLoginValidator)], authLoginUser);
authRouter.get("/verification/:email/:code", checkCode);

authRouter.get("/changePasswordVerificate/:email", changePasswordCheck);
authRouter.get(
  "/verficatePassword/:email/:code/:password",
  [celebrate(celebrateCheckPass)],
  verficatePassword
);

authRouter.use(celebrateError);

export default authRouter;
