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

        // Public routes → allow access
        if (
          pathname === '/' ||
          pathname === '/login' ||
          pathname === '/register' ||
          pathname === '/forget_password' ||
          pathname.startsWith('/api/auth')
        ) {
          return true;
        }

        // Protected routes → allow only if token exists
        return !!token;
      },
    },
  }
);

// Apply middleware to all routes
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };