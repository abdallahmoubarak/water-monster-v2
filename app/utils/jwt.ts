import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//TODO: [WM-8] Improve types of the bellow variables

declare const process: {
  env: {
    NEXT_PUBLIC_JWT_SECRET: string;
  };
};

export const createJWT = (data: string | object) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: "30d" },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      },
    );
  });
};

export const comparePassword = (plainText: any, hash: any) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainText, hash, (err: any, result: unknown) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const saltRounds = 10;

export const hashPassword = (plainText: any) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainText, saltRounds, (err: any, hash: unknown) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
};

// export const decodeJWT = (token: string) => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decoded) => {
//       if (err) return reject(err);
//       const { sub } = decoded;
//       return resolve({ sub });
//     });
//   });
// };
