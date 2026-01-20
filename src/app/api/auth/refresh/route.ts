import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const AppDomain = new URL(request.url);
  const redirectPath = AppDomain.searchParams.get("redirect") ?? "/admin";
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("access_token");
    return response;
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refresh_token=${refreshToken}`,
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      return response;
    }

    const backendSetCookies = response.headers.getSetCookie();
    const res = NextResponse.redirect(new URL(redirectPath, request.url));

    // Set all cookies from backend
    backendSetCookies.forEach((cookie) => {
      res.headers.append("Set-Cookie", cookie);
    });

    return res;
  } catch (error) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }
}
