import { graphQLClient } from "@/utils/graphQLInstance";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const getAdminQuery = gql`
  query {
    users(where: { userType: "Admin" }) {
      id
      name
      profileUrl
    }
  }
`;
const getAdmin = async () => {
  const res: any = await graphQLClient.request(getAdminQuery);
  return res?.users;
};

export const useGetAdmin = () => {
  return useQuery({
    queryFn: () => getAdmin(),
    queryKey: ["Admin"],
    onError: (err: Error) => console.log(err.message),
  });
};
