const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export default function validPass({
  password,
  rePass,
}: {
  password?: string;
  rePass?: string;
}) {
  let valid = true;
  let message = "All done";
  if (!regularExpression.test(password || "")) {
    valid = false;
    message =
      "Your password should be at least 8 characters with at least one uppercase, one lowercase, and one special character.";
    return { valid, message };
  } else if (password !== rePass) {
    valid = false;
    message = "Your password dosen't match.";
    return { valid, message };
  }
  return { valid, message };
}
