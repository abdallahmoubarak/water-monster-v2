import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Neo4jAdapter } from "@next-auth/neo4j-adapter";
import { driver } from "graphql";

// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'

declare const process: {
  env: {
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
  };
};

const neo4jSession = driver.session();

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: Neo4jAdapter(neo4jSession),
});
