import { setAlertMsgType } from "./../types/common";
import { graphQLClient } from "@/utils/graphQLInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "pages/_app";
import {
  createContainerType,
  updateContainerType,
  updateManualModeType,
  updatePrivateModeType,
  useUpdateContainerType,
} from "./hookTypes";
import {
  createContainerMutation,
  deleteContainerMutation,
  updateContainerMutation,
  updateManualModeMutation,
  updatePrivateModeMutation,
  userContainerQuery,
} from "./gql/container";

/*********************** getting user containers ***********************/

const getUserContainers = async (id: string) => {
  const variables = { id };
  const res = await graphQLClient.request(userContainerQuery, variables);
  return res?.containers;
};

export const useUserContainers = (id: string) => {
  return useQuery({
    queryKey: ["Containers"],
    queryFn: () => getUserContainers(id),
  });
};

/************************* create a container *************************/

const createContainer = async ({
  id,
  name,
  size,
  address,
  date,
}: createContainerType) => {
  const variables = {
    id,
    name,
    size,
    address,
    date,
    title: "Installation",
    state: "approval",
  };
  const res = await graphQLClient.request(createContainerMutation, variables);
  return res;
};

export const useCreateContainer = () => {
  return useMutation(createContainer, {
    onSuccess: () => client.refetchQueries(["Containers"]),
    onError: (err: Error) => console.log(err.message),
  });
};

/************************* update a container *************************/

const updateContainer = async ({ id, name, size }: updateContainerType) => {
  const variables = { container_id: id, name, size };
  const res = await graphQLClient.request(updateContainerMutation, variables);
  return res?.updateContainers?.containers;
};

export const useUpdateContainer = ({
  setPage,
  setIsLoading,
}: useUpdateContainerType) => {
  return useMutation(updateContainer, {
    onSuccess: () => setPage("Containers"),
    onError: () => setIsLoading(false),
  });
};

/************************* delete a container *************************/

const deleteContainer = async (id: string) => {
  const variables = { container_id: id };
  const res = await graphQLClient.request(deleteContainerMutation, variables);
  return res;
};

export const useDeleteContainer = ({
  setPage,
  setIsLoading,
}: useUpdateContainerType) => {
  return useMutation(deleteContainer, {
    onSuccess: () => setPage("Containers"),
    onError: () => setIsLoading(false),
  });
};

/****************** updating private mode in a container ******************/

const updatePrivateMode = async ({
  id,
  private_mode,
}: updatePrivateModeType) => {
  const variables = { id, private_mode };
  const res = await graphQLClient.request(updatePrivateModeMutation, variables);
  return res;
};

export const useUpdatePrivateMode = ({ setAlertMsg }: setAlertMsgType) => {
  return useMutation(updatePrivateMode, {
    onError: (err: Error) => console.log(err.message),
    onSuccess: () => setAlertMsg("Private mode updated"),
  });
};

/****************** updating manual mode in a container ******************/

const updateManualMode = async ({ id, manual_mode }: updateManualModeType) => {
  const variables = { id, manual_mode };
  const res = await graphQLClient.request(updateManualModeMutation, variables);
  return res;
};

export const useUpdateManualMode = ({ setAlertMsg }: setAlertMsgType) => {
  return useMutation(updateManualMode, {
    onError: (err: Error) => console.log(err.message),
    onSuccess: () => setAlertMsg("Mode updated"),
  });
};
