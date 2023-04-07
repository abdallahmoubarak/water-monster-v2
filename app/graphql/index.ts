import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth";
import neo4j from "neo4j-driver";
import { OGM } from "@neo4j/graphql-ogm";

declare const process: {
  env: {
    NEXT_PUBLIC_JWT_SECRET: string;
    NEXT_PUBLIC_NEO4J_PASSWORD: string;
    NEXT_PUBLIC_NEO4J_USER: string;
    NEXT_PUBLIC_NEO4J_URI: string;
  };
};

export const driver = neo4j.driver(
  process.env.NEXT_PUBLIC_NEO4J_URI,
  neo4j.auth.basic(
    process.env.NEXT_PUBLIC_NEO4J_USER,
    process.env.NEXT_PUBLIC_NEO4J_PASSWORD
  )
);

export const ogm = new OGM({ typeDefs, driver });
export const User = ogm.model("User");
export const Container = ogm.model("Container");

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers,
  driver,
  plugins: {
    auth: new Neo4jGraphQLAuthJWTPlugin({
      secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    }),
  },
});

export const server = new ApolloServer({
  schema: await neoSchema.getSchema(),
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async (ctx: any) => {
    return {
      driver,
      ...ctx,
    };
  },
});
