import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "@/utils/graphQLInstance";
import { gql } from "graphql-request";

const userViewingContainerQuery = gql`
  query ($id: ID!) {
    users(where: { id: $id }) {
      viewContainers {
        id
        name
        size
        height
        threshold
        distance
        serialNumber
        water_level
        sensor_state
        updatedAt
      }
    }
  }
`;

const getUserViewingContainers = async (id: string) => {
  const variables = { id };
  const res: any = await graphQLClient.request(
    userViewingContainerQuery,
    variables
  );
  return res?.users[0].viewContainers;
};

export const useUserViewingContainers = (id: string) => {
  return useQuery({
    queryKey: ["ViewingContainers"],
    queryFn: () => getUserViewingContainers(id),
  });
};
