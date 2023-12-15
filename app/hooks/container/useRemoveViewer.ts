import { graphQLClient } from "@/utils/graphQLInstance";
import { removeViewer } from "../hookTypes";
import { gql } from "graphql-request";
import { useMutation } from "@tanstack/react-query";

const removeViewerMutation = gql`
  mutation ($contId: ID!, $userId: ID!) {
    updateContainers(
      where: { id: $contId }
      disconnect: { viewer: [{ where: { node: { id: $userId } } }] }
    ) {
      containers {
        id
        viewer {
          id
        }
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
    onSuccess: () => setAlertMsg("User Removed Successfully!"),
    onError: () => setAlertMsg("Something went wrong"),
  });
};
