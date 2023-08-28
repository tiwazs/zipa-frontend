import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import prisma from "../../../app/_libs/prisma"

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
        //token.apikey = user.apiKey;
        //const userSaved = await userService.findById(user.id);
        //if(userSaved){
        //  token.apikey = userSaved.apiKey;
        //}
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        //session.apikey = token.apikey as string;
        //session.userId = token.uid;
        //session.userEmail = token.email;
        //console.log('data: ' + JSON.stringify(session.apikey));
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour
  },
}

export default NextAuth(authOptions)