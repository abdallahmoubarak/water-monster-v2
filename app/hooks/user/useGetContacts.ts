import { userTypes } from "../hookTypes";
import { graphQLClient } from "@/utils/graphQLInstance";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const getContactsQuery = gql`
  query ($me: ID!) {
    users(
      where: {
        OR: [
          { sent_messages_SOME: { to: { id: $me } } }
          { received_messages_SOME: { from: { id: $me } } }
        ]
        type_NOT: "Admin"
      }
    ) {
      id
      name
      profileUrl
      userType
    }
  }
`;

const getContacts = async ({ id }: userTypes) => {
  const variables = { me: id };
  const res: any = await graphQLClient.request(getContactsQuery, variables);
  return res?.users;
};

export const useGetContacts = ({ id }: userTypes) => {
  return useQuery({
    queryFn: () => getContacts({ id }),
    queryKey: ["Contacts"],
    onError: (err: Error) => console.log(err.message),
  });
};
