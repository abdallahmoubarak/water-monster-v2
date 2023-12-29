import { graphQLClient } from "@/utils/graphQLInstance";
import { transferOwnerShipTypes } from "../hookTypes";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "pages/_app";

const transferOwnerShipMutation = gql`
  mutation UpdateContainer($contId: ID!, $ownerId: ID!, $viewerId: ID!) {
    updateContainers(
      where: { id: $contId }
      disconnect: { user: { where: { node: { id: $ownerId } } } }
      connect: { user: { where: { node: { id: $viewerId } } } }
    ) {
      containers {
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
        viewer {
          id
          email
        }
        address
        updatedAt
      }
    }
  }
`;

const transferOwnerShip = async ({
  contId,
  ownerId,
  viewerId,
}: transferOwnerShipTypes) => {
  const variables = {
    contId,
    ownerId,
    viewerId,
  };
  const res = await graphQLClient.request(transferOwnerShipMutation, variables);
  return res;
};

export const useTransferOwnerShip = ({ router }: { router: any }) => {
  return useMutation(transferOwnerShip, {
    onSuccess: async () => {
      client.refetchQueries(["Containers"]);
      await router.replace("/");
    },
    onError: () => {},
  });
};
