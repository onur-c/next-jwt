import * as jose from "jose";

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }

  return new TextEncoder().encode(secret);
}

export async function verifyJWT(jwtToken: string) {
  try {
    const { payload } = await jose.jwtVerify(jwtToken, getJwtSecretKey());

    return payload;
  } catch (error) {
    return null;
  }
}
