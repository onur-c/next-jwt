import jwt, { JwtPayload } from "jsonwebtoken";

export async function verifyJWT(token: string) {
  try {
    const { payload } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    return payload;
  } catch (error) {
    return null;
  }
}
