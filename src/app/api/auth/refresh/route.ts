import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
    // Server-side calls need to use the actual backend URL, not the proxied one
    // The rewrite in next.config.ts only works for client-side requests
    const backendUrl = process.env.BACKEND_API_URL || "https://wasel-black.vercel.app/api/v1";
    const apiUrl = `${backendUrl}/auth/refresh`;
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
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }
}
