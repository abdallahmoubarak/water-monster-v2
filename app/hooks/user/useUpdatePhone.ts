import { userTypes } from "../hookTypes";
import { setAlertMsgType } from "../../types/common";
import { graphQLClient } from "@/utils/graphQLInstance";
import { useMutation } from "@tanstack/react-query";
import { client } from "pages/_app";
import { gql } from "graphql-request";

const updatePhoneMutation = gql`
  mutation ($id: ID!, $phone: String!) {
    updateUsers(where: { id: $id }, update: { phone: $phone }) {
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

const updatePhone = async ({ id, phone }: userTypes) => {
  const variables = { id, phone };
  const res: any = await graphQLClient.request(updatePhoneMutation, variables);
  return res?.updateUsers?.users[0];
};

export const useUpdatePhone = ({ setAlertMsg }: setAlertMsgType) => {
  return useMutation(updatePhone, {
    onSuccess: (res) => {
      localStorage.setItem("User", JSON.stringify(res));
      client.setQueryData(["User"], res);
      console.log(res);
      setAlertMsg("Phone updated");
    },
    onError: (err: Error) => console.log(err.message),
  });
};
