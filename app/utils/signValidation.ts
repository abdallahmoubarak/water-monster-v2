import { signTypes } from "./../types/common";
const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

/************** Sign Validation Function **************/

export const validSign = ({
  signType,
  email,
  password,
  name,
  phone,
  userType,
}: validationTypes) => {
  let valid = true;
  let message = "All done";

  if (
    !(
      email?.includes("@") &&
      email?.indexOf("@") > 2 &&
      email?.length - email.indexOf("@") > 5
    )
  ) {
    valid = false;
    message = "Please enter a valid email address.";
    return { valid, message };
  }

  if (!regularExpression.test(password)) {
    valid = false;
    message =
      "Please enter a valid password. at least ( 8 char, 1 Uppercase, 1 Lowercase, 1 Special char)";
    return { valid, message };
  }

  if (signType === "signup") {
    if (!phone || (phone && phone?.toString().length < 6)) {
      valid = false;
      message = "Phone number is not valid";
    }
    if (!name || name?.length < 5) {
      valid = false;
      message = "Please enter your full name.";
      return { valid, message };
    }
  }
  return { valid, message };
};

type validationTypes = signTypes & { signType: string };
