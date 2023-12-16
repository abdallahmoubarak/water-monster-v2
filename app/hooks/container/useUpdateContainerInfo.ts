import {
  updateContainerInfoTypes,
  useUpdateContainerTypes,
} from "../hookTypes";
import { useMutation } from "@tanstack/react-query";
import { graphQLClient } from "@/utils/graphQLInstance";
import { gql } from "graphql-request";
import { handleSendFCM } from "@/utils/SendFcm";

const updateContainerInfoMutation = gql`
  mutation ($id: ID!, $name: String!, $size: String!, $height: String!) {
    updateContainers(
      where: { id: $id }
      update: { name: $name, size: $size, height: $height }
    ) {
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

const updateContainerInfo = async ({
  id,
  name,
  size,
  height,
}: updateContainerInfoTypes) => {
  const variables = { id, name, size, height };
  const currentToken=await localStorage.getItem("fcmToken");

  await handleSendFCM(currentToken,"hello from Water Monster","Test from Houssein!")
  const res: any = await graphQLClient.request(
    updateContainerInfoMutation,
    variables,
  );
  return res?.updateContainers?.containers;
};

export const useUpdateContainerInfo = ({
  setAlertMsg,
  setIsLoading,
  setPage,
}: useUpdateContainerTypes) => {
  return useMutation(updateContainerInfo, {
    onSuccess: () => {
      setIsLoading(false);
      setAlertMsg("Container info updated");
      setPage("Containers");
    },
    onError: () => {
      setIsLoading(false);
      setAlertMsg("Something went wrong");
    },
  });
};
