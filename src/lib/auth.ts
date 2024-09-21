import { getUserByEmail } from "@/actions/actions";
import bcrytp from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import { authSchema } from "./types";

const config = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        // runs login

        // validation
        const validatedFormData = authSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          console.log("Invalid data");
          return null;
        }

        // extract values
        const { email, password } = validatedFormData.data;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log("User not found");
          return null;
        }
        const passwordsMatch = await bcrytp.compare(
          password,
          user.hashedPassword
        );
        if (!passwordsMatch) {
          console.log("Incorrect Password");
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request to check if user is authorized
      const isTryingToAccessApp = request.url.includes("/app");
      const isLoggedIn = auth?.user;

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }
      if (isLoggedIn && isTryingToAccessApp && !auth?.user.hasAccess) {
        return Response.redirect(new URL("/payment", request.url));
      }
      if (isLoggedIn && isTryingToAccessApp && auth?.user.hasAccess) {
        return true;
      }
      if (isLoggedIn && !isTryingToAccessApp) {
        if (
          (request.nextUrl.pathname.includes("/login") ||
            request.nextUrl.pathname.includes("/signup")) &&
          !auth?.user.hasAccess
        ) {
          return Response.redirect(new URL("/payment", request.url));
        }

        return true;
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }
      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (user) {
        // on Sign In
        token.userId = user.id;
        token.email = user.email!;
        token.hasAccess = user.hasAccess;
      }

      if (trigger === "update") {
        //on every request
        const userFromDb = await getUserByEmail(token.email);
        if(userFromDb){
          token.hasAccess = userFromDb.hasAccess

        }
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
        session.user.hasAccess = token.hasAccess;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
