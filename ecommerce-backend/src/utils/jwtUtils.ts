import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const generateToken = (payload: string | object | Buffer) => {
  const secretKey = 'yourSecretKey'; // Replace with your own secret key
  const options = {
    expiresIn: '1h', // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

module.exports = {
  generateToken,
};