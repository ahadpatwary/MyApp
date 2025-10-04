import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
  providers: [
    // GitHub
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    // Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials (Custom Login)
    CredentialsProvider({

      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email or password missing");
        }

        try {

          await connectToDb();

          const user = await User.findOne({ email: credentials.email }).select("+password");

          if (!user) throw new Error("User not found");

          const isValid = await bcrypt.compare(credentials.password, user.password);

          if (!isValid) throw new Error("Invalid password");

          // return user object
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || "User",
          };

        } catch (err: any) {
          throw new Error(err.message || "Login failed");
        }
      },
    }),
  ],


  callbacks: {

    async signIn({ user }) {
      try{
        await connectToDb();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: "ahad patwary",
            email: user.email,
            password: "1234",
          });
        }

        return true; // allow login
      }catch(err){
        throw(err)
      }

    },

    // Attach user data to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    // Attach token to session
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },


  pages: {
    signIn: "/login", // custom login page
    error: "/login",  // error page
  },

  session: {
    strategy: "jwt", // use JWT for sessions
    maxAge: 30 * 24 * 60 * 60
  },

  secret: process.env.NEXTAUTH_SECRET, // keep in env
};

// Export NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
