import User from "../models/AuthUser/user.model";
import { encrypt, verified } from "../helpers/AuthHelpers/bcrypt.handle";
import { messageText } from "../helpers/constants.helper";
import { generateToken } from "../helpers/AuthHelpers/jwt.handle.helper";
import {
  getIdVerificationUser,
  getUsersByEmail,
  createVerificationUser,
  updateVerificationCode,
  generateCodePass,
  getIdVerificationChanger,
  codeCorrectPass,
  updatePassword,
  correctCodeUser,
} from "../helpers/AuthHelpers/queriesUser.helpers";
import {
  UserParameters,
  UserRegisterParameters,
} from "../interface/user.interface";
import {
  emailSendConfimed,
  emailSendConfimedChange,
  verifiedEmailChnage,
} from "./notificationEmail.service";
import { CheckCode, VerificateCode } from "../interface/verification.interface";

const registerUser = async (userParameters: UserRegisterParameters) => {
  try {
    const user = await getUsersByEmail(userParameters.email_user);

    if (!user) {
      const passwordHash = await encrypt(userParameters.password_user);
      const infoVerificateUser = await createVerificationUser();
      await User.create({
        name_user: userParameters.name_user,
        email_user: userParameters.email_user,
        password_user: passwordHash,
        verification: infoVerificateUser.id,
        rol: 1,
      });
      await emailSendConfimed(
        userParameters.email_user,
        infoVerificateUser.code!
      );
      return {
        message: {
          name: userParameters.name_user,
          email: userParameters.email_user,
          state: "to confirm the code",
        },
        isError: false,
      };
    }
    const updateNewcode = await updateVerificationCode(user.verification);
    await emailSendConfimed(user.email_user, updateNewcode);

    return { message: messageText.EMAIL_ALREADY_REGISTERED, isError: true };
  } catch (e) {
    console.log(e);
    throw messageText.ERROR_DATA_BASE;
  }
};

const loginUser = async (userParameters: UserParameters) => {
  try {
    const user = await getUsersByEmail(userParameters.email_user);
    if (!user) {
      return {
        message: messageText.ACCOUNT_DOES_NOT_EXIST,
        isError: true,
      };
    }
    const isActive = await getIdVerificationUser(user!.verification);
    const passwordCorrect = await verified(
      userParameters.password_user,
      user!.password_user
    );

    if (!passwordCorrect) {
      return {
        message: messageText.INCORRECT_PASSWORD,
        isError: true,
      };
    }
    if (!isActive) {
      return { message: messageText.ACCOUNT_DOES_NOT_EXIST, isError: true };
    }

    const token = generateToken(user.name_user, user.email_user);
    return {
      message: { name: user.name_user, email: user.email_user, token: token },
      isError: false,
    };
  } catch (e) {
    console.log(e);
    throw messageText.ERROR_DATA_BASE;
  }
};

const verficateUser = async (checkCode: CheckCode) => {
  try {
    const result = await correctCodeUser(checkCode);
    const { message, isError } = result;
    return { message, isError };
  } catch (error) {
    console.log(error);

    throw messageText.ERROR_DATA_BASE;
  }
};

const checkChangePassword = async (email: string) => {
  try {
    const user = await getUsersByEmail(email);
    if (!user) {
      return { message: messageText.ACCOUNT_DOES_NOT_EXIST, isError: true };
    }
    const code = await generateCodePass(user.email_user);
    await emailSendConfimedChange(user.email_user, code);
    return { message: messageText.EMAIL_WITH_CHANGE_PASS_SENT, isError: false };
  } catch (e) {
    console.log(e);
    throw messageText.ERROR_DATA_BASE;
  }
};

const verficateChangePass = async (verificateCode: VerificateCode) => {
  try {
    const user = await getUsersByEmail(verificateCode.email);
    if (!user) {
      return {
        message: messageText.ACCOUNT_DOES_NOT_EXIST,
        isError: true,
      };
    }
    const isActive = await getIdVerificationChanger(user!.verification); //se puede mejorar
    const codeCorrect = await codeCorrectPass({
      email: user!.email_user,
      code: verificateCode.code,
    });

    if (!isActive) {
      return { message: messageText.PASSWORD_IS_NOT_ACTIVED, isError: true };
    }
    if (!codeCorrect) {
      return { message: messageText.INCORRECT_CODE, isError: true };
    }
    const passwordHash = await encrypt(verificateCode.password);
    await updatePassword(user.user_id, passwordHash);
    await verifiedEmailChnage(verificateCode.email);
    return {
      message: messageText.PASSWORD_CHANGED_SUCCESFULLY,
      isError: false,
    };
  } catch (e) {
    throw messageText.ERROR_DATA_BASE;
  }
};

export {
  registerUser,
  loginUser,
  checkChangePassword,
  verficateChangePass,
  verficateUser,
};
