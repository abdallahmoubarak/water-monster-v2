import { useMutation } from "@tanstack/react-query";
import { graphQLClient } from "@/utils/graphQLInstance";
import { gql } from "graphql-request";

const updateDeviceFcmMutation = gql`
  mutation ($id: ID!, $deviceFcm: String!) {
    updateContainers(where: { id: $id }, update: { deviceFcm: $deviceFcm }) {
      containers {
        id
        name
        size
        height
        threshold
        serialNumber
        sensor_state
        deviceFcm
        private_mode
        manual_mode
        water_level
        updatedAt
      }
    }
  }
`;

const updateDeviceFcm = async ({
  id,
  deviceFcm,
}: {
  id: string;
  deviceFcm: string;
}) => {
  const variables = { id, deviceFcm };
  const res: any = await graphQLClient.request(
    updateDeviceFcmMutation,
    variables,
  );
  return res?.updateContainers?.containers;
};

export const UseUpdateDeviceFcm = ({
  setAlertMsg,
}: {
  setAlertMsg: Function;
}) => {
  return useMutation(updateDeviceFcm, {
    onSuccess: () => setAlertMsg("Level Alert updated"),
    onError: () => setAlertMsg("Something went wrong"),
  });
};
