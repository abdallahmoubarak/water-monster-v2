import { userTypes } from "../hookTypes";
import { setAlertMsgType } from "../../types/common";
import { graphQLClient } from "@/utils/graphQLInstance";
import { useMutation } from "@tanstack/react-query";
import { client } from "pages/_app";
import { gql } from "graphql-request";

const updateNameMutation = gql`
  mutation ($id: ID!, $name: String!) {
    updateUsers(where: { id: $id }, update: { name: $name }) {
      users {
        id
        name
        email
        phone
        userType
        profileUrl
      }
    }
  }
`;

const updateName = async ({ id, name }: userTypes) => {
  const variables = { id, name };
  const res: any = await graphQLClient.request(updateNameMutation, variables);
  return res?.updateUsers?.users[0];
};

export const useUpdateName = ({ setAlertMsg }: setAlertMsgType) => {
  return useMutation(updateName, {
    onSuccess: (res) => {
      localStorage.setItem("User", JSON.stringify(res));
      client.setQueryData(["User"], res);
      setAlertMsg("Name updated");
    },
    onError: (err: Error) => console.log(err.message),
  });
};
