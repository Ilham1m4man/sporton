import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const backendUrl = process.env.API_URL_INTERNAL;

  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend URL not configured" },
      { status: 502 }
    );
  }

  const { pathname, search } = request.nextUrl;
  const url = new URL(`${pathname}${search}`, backendUrl);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/api/:path*",        // API calls
    "/uploads/:path*",    // Static files/images dari BE
  ],
};