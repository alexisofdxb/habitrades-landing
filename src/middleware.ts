import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isSiteLive } from "@/src/lib/launch";

export function middleware(request: NextRequest) {
  // Coming soon only on Vercel — local dev always shows the full site.
  if (process.env.VERCEL !== "1") {
    return NextResponse.next();
  }

  if (isSiteLive()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/studio") ||
    pathname === "/coming-soon" ||
    pathname === "/icon.svg" ||
    pathname.startsWith("/images/")
  ) {
    return NextResponse.next();
  }

  if (/\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$/i.test(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};