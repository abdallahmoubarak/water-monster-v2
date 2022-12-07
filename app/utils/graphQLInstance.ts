import { GraphQLClient } from "graphql-request";

declare const process: {
  env: {
    NEXT_PUBLIC_GQL_PATH: string;
    NEXT_PUBLIC_BASEURL: string;
  };
};

const endpoint: string =
  process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_GQL_PATH;

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
