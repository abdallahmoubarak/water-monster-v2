import { signTypes } from "@/types/common";
import { createJWT, comparePassword, hashPassword } from "@/utils/jwt";
import { driver } from "../index";
import { v4 as uuidv4 } from "uuid";

export const authMutations = {
  signUp: async (_source: any, { name, phone, email, password }: signTypes) => {
    const session = driver.session();
    const users = await session.run(
      `MATCH (n:User {email:"${email}"}) RETURN n`,
    );

    if (users.records.length > 0) {
      throw new Error("User with that email already exists!");
    }
    const hashedPassword = await hashPassword(password);

    const id = uuidv4();

    await session.run(
      `CREATE (n:User {id:"${id}", phone:"${phone}", email:"${email}", password:"${hashedPassword}", name:"${name}", userType:"Client", createdAt: datetime(), updatedAt: datetime()})`,
    );

    const token = await createJWT({ sub: id });
    const user = { id, email, phone, name, userType: "Client" };
    return { user, token };
  },

  logIn: async (_source: any, { email, password }: signTypes) => {
    const session = driver.session();
    const users = await session.run(
      `MATCH (n:User {email:"${email}"}) RETURN n`,
    );
    const [user]: any = users.records.map(
      (record) => record.get("n").properties,
    );
    if (!user) throw new Error("Email or password is not correct!");
    const correctPassword = await comparePassword(password, user.password);
    if (!correctPassword) throw new Error("Email or password is not correct!");
    const token = await createJWT({ sub: user.id });

    return { user, token };
  },
};
