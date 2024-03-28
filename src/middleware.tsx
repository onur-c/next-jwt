import { type NextRequest, NextResponse } from "next/server";
import { isAuthPage } from "./libs/auth/is-auth-page";
import { verifyJWT } from "./libs/auth/verify-jwt";

export async function middleware(req: NextRequest) {
  const { url, nextUrl, cookies } = req;
  const { value: jwtToken } = cookies.get("jwtToken") ?? { value: null };

  // console.log(jwtToken);

  const isJWTvalid = jwtToken && (await verifyJWT(jwtToken));
  const isAuthPageRequested = isAuthPage(nextUrl.pathname as string);
  console.log(isJWTvalid);

  if (isAuthPageRequested) {
    // without token and tries to acceess /sign-in(AUTH_PAGES)
    if (!isJWTvalid) {
      return NextResponse.next();
    }
    // with token and tries to access /sign-in(AUTH_PAGES)
    return NextResponse.redirect(new URL("/", url));
  }

  if (!isJWTvalid) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);
    return NextResponse.redirect(new URL(`/sign-in?${searchParams}`, url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/sign-in"],
};
