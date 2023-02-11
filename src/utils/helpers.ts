import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

export const parseError = (error: any) => {
  let message = error.message;

  if (error.message.match(/E11000 duplicate key error/)) {
    const duplicateValue = error.message.match(/"([^']+)"/)[1];
    message = `${duplicateValue} already exists!`;
  }

  let parsedError = {
    ...error,
    message,
  }

  return parsedError;
};

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };
