import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  const hashedPassword: string = await new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, function (err: unknown, hash: string) {
      if (err instanceof Error) {
        reject(err);
      }
      resolve(hash);
    });
  });

  return hashedPassword;
}
