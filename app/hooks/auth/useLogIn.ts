import { signTypes } from "@/types/common";
import { graphQLClient } from "@/utils/graphQLInstance";
import { gql } from "graphql-request";
import { useSignTypes } from "../hookTypes";
import { useMutation } from "@tanstack/react-query";
import { client } from "pages/_app";

const logInMutation = gql`
  mutation ($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      token
      user {
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

const logIn = async ({ email, password }: signTypes) => {
  const variables = { email, password };
  const res: any = await graphQLClient.request(logInMutation, variables);
  return res?.logIn;
};

export const useLogIn = ({ setMsg, setIsLoading }: useSignTypes) => {
  return useMutation(logIn, {
    onSuccess: ({ token, user }) => {
      token && localStorage.setItem("JWT", token);
      user && localStorage.setItem("User", JSON.stringify(user));
      user && client.setQueryData(["User"], user);
      token &&
        graphQLClient.setHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });
    },
    onError: (err: Error) => {
      setMsg(err.message.split(":")[0]);
      setIsLoading(false);
    },
  });
};
