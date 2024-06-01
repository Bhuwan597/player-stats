import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {  
  try {
    // Allow requests for static assets to proceed
    if (req.nextUrl.pathname.startsWith("/_next/") || req.nextUrl.pathname.startsWith("/public/")) {
      return NextResponse.next();
    }
    const token = req.cookies.get("access_token")?.value;
    if (!token) {
      throw new Error("Unauthorized");
    }
    const { payload } = await jwtVerify(token, secret);
    if(!payload){
      throw new Error("Unauthorized");
    }

    // If the user has a valid token and tries to access the login page, redirect to the home page
    if(req.nextUrl.pathname === "/login"){
      return NextResponse.redirect(new URL("/settings", req.url));
    }
  } catch (error: any) {
    if(req.nextUrl.pathname.startsWith("/api/settings")){
      return NextResponse.json({
        message: "Unauthorized!"
      }, {status: 401})
    }
    if (req.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

  }


  // For all other requests, allow them to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/settings"],
};
