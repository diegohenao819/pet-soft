import NextAuth, { NextAuthConfig } from "next-auth";

const config = {
  pages: {
    signIn: "/login",
  },

  providers: [],
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

export const { auth } = NextAuth(config);
