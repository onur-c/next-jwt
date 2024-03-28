import { NextResponse, type NextRequest } from "next/server";
import { getJwtSecretKey } from "@/libs/auth/verify-jwt";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.username === "admin" && body.password === "admin") {
    const jwtToken = await new SignJWT({
      username: body.username,
      role: "admin", // Set your own roles
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30s") // Set your own expiration time
      .sign(getJwtSecretKey());

    const response = NextResponse.json({
      success: true,
      error: null,
    });
    response.cookies.set({
      name: "jwtToken",
      value: jwtToken,
      path: "/",
    });

    return response;
  }

  return NextResponse.json({
    success: false,
    error: "Invalid credentials.",
  });
}
