import { createJWT, hashPassword, decodeJWT } from "@/utils/jwt";
import nodemailer from "nodemailer";
import { driver } from "../index";
import validEmail from "@/utils/validEmail";
import validPass from "@/utils/validPass";

export const resetPassMutations = {
  sendMagicLink: async (_source: any, { email }: { email: string }) => {
    const valid = validEmail(email);
    if (!valid) throw new Error("This email address is not valid!");
    const session = driver.session();
    const users = await session.run(
      `MATCH (n:User {email:"${email}"}) RETURN n`,
    );
    session.close();
    const [user]: any = users.records.map(
      (record) => record.get("n").properties,
    );

    if (user) {
      const tempToken = await createJWT({ sub: user.id, email }, 900);
      const magicLinkURL = `${process.env.NEXT_PUBLIC_BASEURL}/reset?token=${tempToken}`;
    
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "husseinreda1472002@gmail.com",
          pass: "bgoxmwmexxclehzr",
        },
      });

      const mailOptions = {
        from: "husseinreda1472002@gmail.com",
        to: email,
        subject: "Magic Link for Login",
        text: `Click the following link to log in: ${magicLinkURL}`,
      };

      await transporter.sendMail(mailOptions);

      return { message: "Magic link sent successfully!", success: true };
    }
    throw new Error("This email address dosen't exist!");
  },

  resetPass: async (
    _source: any,
    { token, password }: { token: string; password: string },
  ) => {
    const { valid } = validPass({ password, rePass: password });
    if (!valid) throw new Error("This password is not valid!");

    const session = driver.session();
    const { email }: any = await decodeJWT(token);
    const hashedPassword = await hashPassword(password);
    const result = await session.run(
      "MATCH (n:User {email: $email}) SET n.password = $hashedPassword RETURN n",
      { email, hashedPassword },
    );
    session.close();

    if (result.records.length > 0) {
      const newToken = await createJWT({
        sub: result.records[0].get("n").properties.id,
      });
      return { user: result.records[0].get("n").properties, token: newToken };
    }
    throw new Error("This email address dosen't exist!");
  },
};
