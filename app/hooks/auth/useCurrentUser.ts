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
  const res: any = await graphQLClient.request(meQuery);
  return res?.me;
};

export const useCurrentUser = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ["User"],
    queryFn: () => getUser(),
    onSuccess: (res) => localStorage.setItem("User", JSON.stringify(res)),
    refetchOnWindowFocus: false,
    enabled,
  });
};
