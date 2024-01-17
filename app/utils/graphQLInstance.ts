import { GraphQLClient } from "graphql-request";

declare const process: {
  env: { NEXT_PUBLIC_GQL_PATH: string };
};

const endpoint: string = process.env.NEXT_PUBLIC_GQL_PATH;

export const graphQLClient: any = new GraphQLClient(endpoint, {
  headers: <HeadersInit>{
    Authorization: Boolean(
      typeof window !== "undefined" && localStorage.getItem("JWT"),
    )
      ? `Bearer ${typeof window !== "undefined" && localStorage.getItem("JWT")}`
      : undefined,
    "Content-Type": "application/json",
  },
});
