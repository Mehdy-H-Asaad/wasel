import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const accessToken = request.cookies.get("access_token")?.value;

  //   NO REFRESH TOKEN, REDIRECT TO LOGIN
  if (!refreshToken) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("access_token");
    return response;
  }

  //   NO ACCESS TOKEN, REFRESH TOKEN IS VALID, REFRESH ACCESS TOKEN
  if (!accessToken) {
    return NextResponse.redirect(
      new URL(
        `/api/auth/refresh?redirect=${encodeURIComponent(
          request.nextUrl.pathname
        )}`,
        request.url
      )
    );
  }

  // VERIFY TOKEN EXPIRATION IN MIDDLEWARE
  try {
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    const exp = payload.exp as number;
    const now = Math.floor(Date.now() / 1000);

    // TOKEN IS EXPIRED OR IS ABOUT TO EXPIRE (LESS THAN 5 MINUTES) PROACTIVELY REFRESH, SO WE NEED TO REFRESH THE TOKEN (REDIRECT TO REFRESH TOKEN ROUTE)
    if (exp <= now || exp - now < 300) {
      return NextResponse.redirect(
        new URL(
          `/api/auth/refresh?redirect=${encodeURIComponent(
            request.nextUrl.pathname
          )}`,
          request.url
        )
      );
    }
  } catch {
    // TOKEN IS INVALID, SO WE NEED TO REFRESH THE TOKEN (REDIRECT TO REFRESH TOKEN ROUTE)
    return NextResponse.redirect(
      new URL(
        `/api/auth/refresh?redirect=${encodeURIComponent(
          request.nextUrl.pathname
        )}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
