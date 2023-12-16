import { graphQLClient } from "@/utils/graphQLInstance";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const getUsersQuery = gql`
  query {
    users(where: { type_NOT: "Admin" }) {
      name
      userType
    }
  }
`;

const getUsers = async () => {
  const res: any = await graphQLClient.request(getUsersQuery);
  return res?.users;
};

export const useGetUsers = () => {
  return useQuery({
    queryFn: () => getUsers(),
    queryKey: ["Users"],
    onError: (err: Error) => console.log(err.message),
  });
};
