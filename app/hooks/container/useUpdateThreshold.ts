import { useMutation } from "@tanstack/react-query";
import { graphQLClient } from "@/utils/graphQLInstance";
import { gql } from "graphql-request";

const updateThresholdMutation = gql`
  mutation ($id: ID!, $threshold: Int!) {
    updateContainers(where: { id: $id }, update: { threshold: $threshold }) {
      containers {
        id
        name
        size
        height
        threshold
        serialNumber
        sensor_state
        private_mode
        manual_mode
        water_level
        updatedAt
      }
    }
  }
`;

const updateThreshold = async ({
  id,
  threshold,
}: {
  id: string;
  threshold: number;
}) => {
  const variables = { id, threshold };
  const res: any = await graphQLClient.request(
    updateThresholdMutation,
    variables,
  );
  return res?.updateContainers?.containers;
};

export const useUpdateThreshold = ({
  setAlertMsg,
}: {
  setAlertMsg: Function;
}) => {
  return useMutation(updateThreshold, {
    onSuccess: () => setAlertMsg("Level Alert updated"),
    onError: () => setAlertMsg("Something went wrong"),
  });
};
