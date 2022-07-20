import jwt from 'jsonwebtoken';
import { TOKEN_SECRET, JWT_TTL } from '../config';

function generateAccessToken(username: string) {
  return {
    ttl: JWT_TTL,
    token: jwt.sign({ username }, TOKEN_SECRET, { expiresIn: JWT_TTL }),
  };
}

function checkAccessToken(token: string) {
  return jwt.verify(token, TOKEN_SECRET);
}

export { generateAccessToken, checkAccessToken };
