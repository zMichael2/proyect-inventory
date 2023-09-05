import axios from "axios";

export const emailSendConfimed = async (email: string, code: string) => {
  try {
    const authOptions = {
      method: "post",
      url: `${process.env.LINKEMAIL}/api/emailcode`,
      data: {
        email: email,
        code: code,
        type: "verificate",
      },
    };
    await axios(authOptions);
  } catch (error) {
    console.error(error);

    throw "Could not connect to mail service";
  }
};

export const verifiedEmail = async (email: string) => {
  try {
    const authOptions = {
      method: "post",
      url: `${process.env.LINKEMAIL}/api/emailcode`,
      data: {
        email: email,
        type: "verificateConfirmed",
      },
    };
    await axios(authOptions);
  } catch (error) {
    throw "The confirmation email could not be sent correctly";
  }
};
export const emailSendConfimedChange = async (email: string, code: string) => {
  try {
    const authOptions = {
      method: "post",
      url: `${process.env.LINKEMAIL}/api/emailcode`,
      data: {
        email: email,
        code: code,
        type: "changePassword",
      },
    };
    await axios(authOptions);
  } catch (error) {
    console.error(error);

    throw "Could not connect to mail service";
  }
};
export const verifiedEmailChnage = async (email: string) => {
  try {
    const authOptions = {
      method: "post",
      url: `${process.env.LINKEMAIL}/api/emailcode`,
      data: {
        email: email,
        type: "changeConfirmation",
      },
    };
    await axios(authOptions);
  } catch (error) {
    throw "The confirmation email could not be sent correctly";
  }
};
