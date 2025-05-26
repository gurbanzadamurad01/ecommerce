import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     *Match all path except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_next/static (inside /public)
     * 4. /favicon.ico
     */
    "/((?!api/|_next/|_static/|_vercel|media/|[\w-]+\.\w+).*)",
  ],
};

export default async function middleware(req:NextRequest) {
   const url = req.nextUrl;
   // Extract the hostname (e.g., "murad.funroad.com" or john.localhost:3000)
   const hostName = req.headers.get("host") || "";

   const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

   if(hostName.endsWith(`.${rootDomain}`)) {
      const tenantSlug = hostName.replace(`.${rootDomain}`, "");
      return NextResponse.rewrite(new URL(`/tenants/${tenantSlug}${url.pathname}`, req.url));
   }

   return NextResponse.next();
}
