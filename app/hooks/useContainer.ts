import { graphQLClient } from "@/utils/graphQLInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "pages/_app";
import {
  createContainerTypes,
  updateContainerTypes,
  useUpdateContainerTypes,
} from "./hookTypes";
import {
  createContainerMutation,
  updateContainerMutation,
  userContainerQuery,
  userViewingContainerQuery,
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
    onSuccess: (res) => localStorage.setItem("Containers", JSON.stringify(res)),
  });
};

/*********************** getting user viewing containers ***********************/

const getUserViewingContainers = async (id: string) => {
  const variables = { id };
  const res = await graphQLClient.request(userViewingContainerQuery, variables);
  console.log(res?.users[0]);
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

export const useCreateContainer = () => {
  return useMutation(createContainer, {
    onSuccess: () => client.refetchQueries(["Containers"]),
    onError: (err: Error) => console.log(err.message),
  });
};

/************************* update a container *************************/

const updateContainer = async ({
  id,
  name,
  size,
  height,
}: updateContainerTypes) => {
  const variables = { container_id: id, name, size, height };
  const res = await graphQLClient.request(updateContainerMutation, variables);
  return res?.updateContainers?.containers;
};

export const useUpdateContainer = ({
  setPage,
  setIsLoading,
}: useUpdateContainerTypes) => {
  return useMutation(updateContainer, {
    onSuccess: () => setPage("Containers"),
    onError: () => setIsLoading(false),
  });
};
