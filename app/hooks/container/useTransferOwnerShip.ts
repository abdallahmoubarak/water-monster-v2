import { graphQLClient } from "@/utils/graphQLInstance";
import { transferOwnerShipTypes } from "../hookTypes";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "pages/_app";

const transferOwnerShipMutation = gql`
  mutation UpdateContainer($contId: ID!, $ownerId: ID!, $viewerId: ID!) {
    updateContainers(
      where: { id: $contId }
      disconnect: {
        user: { where: { node: { id: $ownerId } } }
        viewer: { where: { node: { id: $viewerId } } }
      }
      connect: {
        user: { where: { node: { id: $viewerId } } }
        viewer: { where: { node: { id: $ownerId } } }
      }
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
        user {
          email
        }
        viewer {
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

export const useTransferOwnerShip = ({
  setPage,
  setAlertMsg,
}: {
  setPage: Function;
  setAlertMsg: Function;
}) => {
  return useMutation(transferOwnerShip, {
    onSuccess: async () => {
      setPage("Containers");
      client.refetchQueries(["Containers"]);
    },
    onError: () => setAlertMsg("Something went wrong"),
  });
};
