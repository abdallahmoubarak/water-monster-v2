import { graphQLClient } from "@/utils/graphQLInstance";
import { transferOwnerShipTypes } from "../hookTypes";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

const transferOwnerShipMutation = gql`
  mutation UpdateContainer($contId: ID!, $ownerId: ID!, $viewerId: ID!) {
    updateContainers(
      where: { id: $contId }
      disconnect: { user: { where: { node: { id: $ownerId } } } }
      connect: { user: { where: { node: { id: $viewerId } } } }
    ) {
      containers {
        id
        user {
          id
        }
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
  setAlertMsg,
}: {
  setAlertMsg: Function;
}) => {
  return useMutation(transferOwnerShip, {
    onSuccess: () =>
      setAlertMsg("The OwnerShip for this container was updated!"),
    onError: () => setAlertMsg("Something went wrong"),
  });
};
