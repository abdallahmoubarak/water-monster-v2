const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const validSign = ({
  isLogIn,
  name,
  phone,
  email,
  password,
  repass,
}: {
  isLogIn: boolean;
  name?: string;
  phone?: string;
  email: string;
  password: string;
  repass?: string;
}) => {
  let valid = true;
  let message = "All done";
  if (!isLogIn) {
    if (!name || name?.length < 3 || name?.split(" ").length < 1) {
      valid = false;
      message = "Please enter your full name.";
      return { valid, message };
    }
    if (!phone || phone.length < 6) {
      valid = false;
      message = "Phone number is not valid.";
      return { valid, message };
    }
    if (repass !== password) {
      valid = false;
      message = "Make sure the password match.";
      return { valid, message };
    }
  }
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
      "Your password should be at least 8 characters with at least one uppercase, one lowercase, and one special character.";
    return { valid, message };
  }

  return { valid, message };
};
