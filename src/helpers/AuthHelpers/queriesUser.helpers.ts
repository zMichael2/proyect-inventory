import { Op } from "sequelize";
import { sequelize } from "../../database/config.database";
import User from "../../models/AuthUser/user.model";
import Verification from "../../models/AuthUser/verification.model";
import { CheckCode } from "../../interface/verification.interface";
import { generateVerificationCode } from "./generateCode.helper";
import { messageText } from "../constants.helper";

const getUsersByEmail = async (email: string) => {
  const user = await User.findOne({
    where: {
      email_user: {
        [Op.eq]: email,
      },
    },
  });

  return user;
};

const createVerificationUser = async () => {
  const newVerification = await Verification.create({
    verification_code: generateVerificationCode(),
    isactivate: false,
    isactivatechange: false,
  });

  return {
    id: newVerification.verification_id,
    code: newVerification.verification_code,
  };
};

const updateVerificationCode = async (verificationId: number) => {
  const newCode = generateVerificationCode();
  await Verification.update(
    { verification_code: newCode },
    { where: { verification_id: verificationId } }
  );
  return newCode;
};

const getIdVerificationUser = async (id: number) => {
  const users = await Verification.findOne({
    where: {
      verification_id: id,
    },
  });
  if (!users?.isactivate) {
    return null;
  }

  return users;
};

const correctCodeUser = async (checkCode: CheckCode) => {
  const isCorrect = await User.findOne({
    include: [
      {
        model: Verification,
        attributes: ["isactivate"],
        where: {
          verification_code: checkCode.code,
        },
      },
    ],
    where: {
      email_user: checkCode.email,
    },
  });
  if (!isCorrect) {
    return { message: messageText.INCORRECT_CODE, isError: true };
  }
  await Verification.update(
    { isactivate: true, verification_code: null },
    {
      where: {
        verification_id: sequelize.literal(`(
          SELECT verification_id FROM users
          WHERE email_user = '${checkCode.email}'
          LIMIT 1
        )`),
      },
    }
  );
  return { message: messageText.SUCCESSFULLY_VERFIFIED, isError: false };
};

const generateCodePass = async (email: string) => {
  const code = generateVerificationCode();
  await Verification.update(
    { isactivatechange: true, verification_code: code },
    {
      where: {
        verification_id: sequelize.literal(`(
          SELECT verification_id FROM users
          WHERE email_user = '${email}'
          LIMIT 1
        )`),
      },
    }
  );
  return code;
};

const getIdVerificationChanger = async (id: number) => {
  const users = await Verification.findOne({
    where: {
      verification_id: id,
    },
  });
  if (!users?.isactivatechange) {
    return null;
  }

  return users;
};

const codeCorrectPass = async (checkCode: CheckCode) => {
  const isCorrect = await User.findOne({
    include: [
      {
        model: Verification,
        attributes: ["isactivatechange"],
        where: {
          verification_code: checkCode.code,
        },
      },
    ],
    where: {
      email_user: checkCode.email,
    },
  });
  if (!isCorrect) {
    return null;
  }
  await Verification.update(
    { isactivatechange: false, verification_code: null },
    {
      where: {
        verification_id: sequelize.literal(`(
            SELECT verification_id FROM users
            WHERE email_user = '${checkCode.email}'
            LIMIT 1
          )`),
      },
    }
  );
  return { message: messageText.SUCCESSFULLY_VERFIFIED, isError: false };
};

const updatePassword = async (userId: number, newPassword: string) => {
  await User.update(
    { password_user: newPassword },
    { where: { user_id: userId } }
  );
};

export {
  getUsersByEmail,
  createVerificationUser,
  getIdVerificationUser,
  updateVerificationCode,
  generateCodePass,
  getIdVerificationChanger,
  updatePassword,
  correctCodeUser,
  codeCorrectPass,
};
