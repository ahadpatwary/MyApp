import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        if (
          pathname === '/' ||
          pathname === '/login' ||
          pathname === '/register' ||
          pathname === '/forget_password' ||
          pathname.startsWith('/api/auth')
        ) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };