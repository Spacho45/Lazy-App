import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.hostname !== "lazyapp.fr") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.hostname = "www.lazyapp.fr";
  url.protocol = "https";

  return NextResponse.redirect(url, 308);
}
