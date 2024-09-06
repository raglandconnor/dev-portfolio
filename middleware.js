import { NextResponse } from "next/server";
import { API_URL } from "./lib/constants";

export default function middleware(request) {
  const token = request.cookies.get("access_token");

  if (token) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Authorization", `Bearer ${token.value}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Redirect to login page if no token is present
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/resume-review"],
};
