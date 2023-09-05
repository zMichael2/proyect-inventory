import { Request, Response } from "express";
import {
  checkChangePassword,
  loginUser,
  registerUser,
  verficateChangePass,
  verficateUser,
} from "../services/auth.service";
import { handleHttp } from "../helpers/error.handle.helper";
import { verifiedEmail } from "../services/notificationEmail.service";

const authRegisterUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const response = await registerUser(body);
    if (response.isError) {
      return res.status(406).json({ message: response.message });
    }
    res.status(201).json({ data: [response.message] });
  } catch (e) {
    handleHttp(res, e);
  }
};

const authLoginUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const response = await loginUser(body);
    if (response.isError) {
      return res.status(406).json({ message: response.message });
    }

    res.status(200).json({ message: response.message });
  } catch (e) {
    handleHttp(res, e);
  }
};

const checkCode = async (req: Request, res: Response) => {
  try {
    const { code, email } = req.params;
    const response = await verficateUser({ code, email });
    if (response.isError) {
      return res.status(406).json({ message: response.message });
    }

    await verifiedEmail(email);

    res.status(200).json({ message: response.message });
  } catch (e) {
    handleHttp(res, e);
  }
};

const changePasswordCheck = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const response = await checkChangePassword(email);

    if (response?.isError) {
      return res.status(406).json({ message: response.message });
    }
    res.status(200).json({ message: response.message });
  } catch (e) {
    handleHttp(res, e);
  }
};
const verficatePassword = async (req: Request, res: Response) => {
  try {
    const { email, code, password } = req.params;
    const response = await verficateChangePass({ email, code, password });

    if (response?.isError) {
      return res.status(406).json({ message: response.message });
    }
    res.status(200).json({ message: response.message });
  } catch (e) {
    handleHttp(res, e);
  }
};

export {
  authRegisterUser,
  authLoginUser,
  checkCode,
  changePasswordCheck,
  verficatePassword,
};
