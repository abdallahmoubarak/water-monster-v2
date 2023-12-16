import { useMutation } from "@tanstack/react-query";
import { graphQLClient } from "@/utils/graphQLInstance";
import { gql } from "graphql-request";
import { createContainerTypes } from "../hookTypes";
import { client } from "pages/_app";

const createContainerMutation = gql`
  mutation ($userId: String!, $serialNumber: String!, $location: PointInput) {
    createOrUpdateContainer(
      location: $location
      serialNumber: $serialNumber
      userId: $userId
    ) {
      id
      name
    }
  }
`;

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
    onError: (err: Error) =>
      console.log("create conatiner error: ", err.message),
  });
};
