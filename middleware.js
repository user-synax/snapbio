
import { auth } from "./auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function middleware(request) {
  const session = await auth();
  const path = request.nextUrl.pathname;

  const publicPaths = [
    "/",
    "/auth/signin",
    "/auth/signout",
    "/api/auth",
    "/api/username",
    "/api/user"
  ];

  const isPublicPath =
    publicPaths.some((p) => path.startsWith(p)) ||
    /^\/[a-z0-9_]+$/.test(path);

  const isProtectedPath = path === "/dashboard" || path.startsWith("/dashboard/");
  const isOnboardingPath = path === "/onboarding";

  if (isProtectedPath && !session) {
    const redirectUrl = new URL("/", request.nextUrl);
    return NextResponse.redirect(redirectUrl);
  }

  if (session) {
    // Since we stored username in JWT during sign-in, check from session
    const hasUsername = session.user?.username;

    if (!hasUsername && !isOnboardingPath && !path.startsWith("/api/")) {
      const redirectUrl = new URL("/onboarding", request.nextUrl);
      return NextResponse.redirect(redirectUrl);
    }

    if (hasUsername && isOnboardingPath) {
      const redirectUrl = new URL("/dashboard", request.nextUrl);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
