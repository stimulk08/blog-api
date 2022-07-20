import jwt from 'jsonwebtoken';
import DataStoredInToken from '../Types/dataStoredInToken';
import { TOKEN_SECRET, JWT_TTL } from '../config';

function generateAccessToken(storedData: DataStoredInToken) {
  return {
    ttl: JWT_TTL,
    token: jwt.sign(storedData, TOKEN_SECRET, { expiresIn: JWT_TTL }),
  };
}

function checkAccessToken(token: string) {
  return jwt.verify(token, TOKEN_SECRET);
}

export { generateAccessToken, checkAccessToken };
