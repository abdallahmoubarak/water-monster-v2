import { resolvers } from "./resolvers/index";
import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { typeDefs } from "./typeDefs";
import { ApolloServer } from "@apollo/server";

declare const process: {
  env: {
    NEXT_PUBLIC_JWT_SECRET: string;
    NEXT_PUBLIC_NEO4J_PASSWORD: string;
    NEXT_PUBLIC_NEO4J_USER: string;
    NEXT_PUBLIC_NEO4J_URI: string;
  };
};

export const driver = neo4j.driver(
  "test.iot-monster.com",
  neo4j.auth.basic(
    "neo4j+s://ee38a1df.databases.neo4j.io",
    "l416Juq-w8HwBnsf4DqT8bGihlDvZ3Onj8cpILQlCqs",
  ),
);

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers,
  driver,
  features: {
    authorization: { key: "TutorialTesting@123" },
  },
});

export const server = new ApolloServer({
  schema: await neoSchema.getSchema(),
});
