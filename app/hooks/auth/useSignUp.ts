import { signTypes } from "@/types/common";
import { graphQLClient } from "@/utils/graphQLInstance";
import { gql } from "graphql-request";
import { useSignTypes } from "../hookTypes";
import { useMutation } from "@tanstack/react-query";
import { client } from "pages/_app";

const signUpMutation = gql`
  mutation (
    $name: String!
    $email: String!
    $password: String!
    $phone: String!
  ) {
    signUp(name: $name, email: $email, phone: $phone, password: $password) {
      token
      user {
        id
        name
        email
        phone
        userType
      }
    }
  }
`;

const signUp = async ({ name, phone, email, password }: signTypes) => {
  const variables = { name, phone, email, password };
  const res: any = await graphQLClient.request(signUpMutation, variables);
  return res?.signUp;
};

export const useSignUp = ({ setMsg, setIsLoading }: useSignTypes) => {
  return useMutation(signUp, {
    onSuccess: ({ token, user }) => {
      token && localStorage.setItem("JWT", token);
      user && client.setQueryData(["User"], user);
      token &&
        graphQLClient.setHeaders({
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });
    },
    onError: (err: Error) => {
      setMsg(err.message.split(":")[0]);
      setIsLoading(false);
    },
  });
};
