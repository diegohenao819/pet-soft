import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrytp from "bcryptjs";

const config = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log("User not found");
          return null
        }
      const passwordsMatch= await  bcrytp.compare(password, user.hashedPassword)
      if (!passwordsMatch) {
        console.log("Incorrect Password");
        return null;
      }
      return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ request }) => {
      const isTryingToAccessApp = request.url.includes("/app");
      if (isTryingToAccessApp) {
        return false;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn } = NextAuth(config);
