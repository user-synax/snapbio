
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectToDatabase } from "./lib/db";
import User from "./models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      await connectToDatabase();

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          username: null,
        });
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.username) {
        token.username = session.username;
      }

      if (user || !token.id) {
        await connectToDatabase();
        const dbUser = await User.findOne({ email: user?.email || token.email });
        if (dbUser) {
          token.id = dbUser._id;
          token.username = dbUser.username;
          token.isPro = dbUser.isPro;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.isPro = token.isPro;
      }
      return session;
    },
  },
});
