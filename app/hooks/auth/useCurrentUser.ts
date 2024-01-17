import { graphQLClient } from "@/utils/graphQLInstance";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const meQuery = gql`
  query {
    me {
      id
      name
      email
      phone
      userType
      profileUrl
    }
  }
`;

const getUser = async () => {
  if (!graphQLClient?.requestConfig?.headers?.Authorization) return;

  try {
    const res: any = await graphQLClient.request(meQuery);
    return res?.me;
  } catch (err: any) {
    if (err.message.split(":")[0] === "Unauthenticated") {
      return {};
    }
  }
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["User"],
    queryFn: () => getUser(),
    onSuccess: (res) => console.log(res),
    onError: (err: Error) => console.log(err.message.split(":")[0]),
    refetchOnWindowFocus: false,
  });
};
