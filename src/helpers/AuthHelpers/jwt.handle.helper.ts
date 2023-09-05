import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;

const generateToken = (name: string, email: string) => {
  const jwt = sign({ name, email }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return jwt;
};

const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};

export { generateToken, verifyToken };
