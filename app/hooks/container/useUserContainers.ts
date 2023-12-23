import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "@/utils/graphQLInstance";
import { gql } from "graphql-request";

const userContainerQuery = gql`
  query ($id: ID!) {
    containers(where: { user: { id: $id } }) {
      id
      name
      size
      height
      threshold
      serialNumber
      distance
      sensor_state
      private_mode
      manual_mode
      water_level
      deviceFcm
      viewer {
        id
        email
      }
      address
      updatedAt
    }
  }
`;

const getUserContainers = async (id: string) => {
  const variables = { id };
  const res: any = await graphQLClient.request(userContainerQuery, variables);
  return res?.containers;
};

export const useUserContainers = (id: string) => {
  return useQuery({
    queryKey: ["Containers"],
    queryFn: () => getUserContainers(id),
    onSuccess: (res) => localStorage.setItem("Containers", JSON.stringify(res)),
  });
};
