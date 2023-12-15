import { graphQLClient } from "@/utils/graphQLInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "pages/_app";
import {
  changeOwnerShip,
  createContainerTypes,
  removeViewer,
  updateContainerInfoTypes,
  useUpdateContainerTypes,
} from "./hookTypes";
import {
  createContainerMutation,
  removeViewerMutation,
  transferOwnerShipMutation,
  updateContainerInfoMutation,
  updateThresholdMutation,
  userContainerQuery,
  userViewingContainerQuery,
} from "./gql/container";

/*********************** getting user containers ***********************/

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

/*********************** getting user viewing containers ***********************/

const getUserViewingContainers = async (id: string) => {
  const variables = { id };
  const res: any = await graphQLClient.request(
    userViewingContainerQuery,
    variables,
  );
  return res?.users[0].viewContainers;
};

export const useUserViewingContainers = (id: string) => {
  return useQuery({
    queryKey: ["ViewingContainers"],
    queryFn: () => getUserViewingContainers(id),
    onSuccess: (res) =>
      localStorage.setItem("ViewingContainers", JSON.stringify(res)),
  });
};

/************************* create a container *************************/

const createContainer = async ({
  userId,
  serialNumber,
  location,
}: createContainerTypes) => {
  const variables = {
    userId,
    serialNumber,
    location,
  };
  const res = await graphQLClient.request(createContainerMutation, variables);
  return res;
};
export const ChangeOwnerShip = async ({
  contId,
  ownerId,
  newOwnerId
}: changeOwnerShip) => {
  const variables = {
    contId,
    ownerId,
    newOwnerId,
  };
  const res = await graphQLClient.request(transferOwnerShipMutation, variables);
  return res;
};
export const removeViewerFromCont = async ({
  contId,
  userId,
  
}: removeViewer) => {
  const variables = {
    contId,
    userId
  };
  const res = await graphQLClient.request(removeViewerMutation, variables);
  return res;
};
export const useCreateContainer = () => {
  return useMutation(createContainer, {
    onSuccess: () => client.refetchQueries(["Containers"]),
    onError: (err: Error) =>
      console.log("create conatiner error: ", err.message),
  });
};

/************************* update container info *************************/

const updateContainerInfo = async ({
  id,
  name,
  size,
  height,
}: updateContainerInfoTypes) => {
  const variables = { id, name, size, height };
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
/************************* update container info *************************/

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
    onSuccess: () => setAlertMsg("Alert level updated"),
    onError: () => setAlertMsg("Something went wrong"),
  });
};
