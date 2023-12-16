import { graphQLClient } from "@/utils/graphQLInstance";
import { removeViewer } from "../hookTypes";
import { gql } from "graphql-request";
import { useMutation } from "@tanstack/react-query";
import { client } from "pages/_app";

const removeViewerMutation = gql`
  mutation ($contId: ID!, $userId: ID!) {
    updateContainers(
      where: { id: $contId }
      disconnect: { viewer: [{ where: { node: { id: $userId } } }] }
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

const removeViewer = async ({ contId, userId }: removeViewer) => {
  const variables = {
    contId,
    userId,
  };
  const res = await graphQLClient.request(removeViewerMutation, variables);
  return res;
};

export const useRemoveViewer = ({ setAlertMsg }: { setAlertMsg: Function }) => {
  return useMutation(removeViewer, {
    onSuccess: () => {
      setAlertMsg("User Removed Successfully!");
      client.refetchQueries(["Containers"]);
    },
    onError: () => setAlertMsg("Something went wrong"),
  });
};
