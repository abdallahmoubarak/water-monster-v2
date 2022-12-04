import { GraphQLClient } from "graphql-request";

declare const process: {
  env: {
    NEXT_PUBLIC_ENDPOINT: string;
  };
};

const endpoint: string = process.env.NEXT_PUBLIC_ENDPOINT;

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: <HeadersInit | undefined>{
    authorization: Boolean(
      typeof window !== "undefined" && localStorage.getItem("JWT"),
    )
      ? `Bearer ${typeof window !== "undefined" && localStorage.getItem("JWT")}`
      : undefined,
    "Content-Type": "application/json",
  },
});
