import { graphQLClient } from "@/utils/graphQLInstance";
import { gql } from "graphql-request";
import { useSignTypes } from "../hookTypes";
import { useMutation } from "@tanstack/react-query";
import { client } from "pages/_app";

const resetPassMutation = gql`
  mutation Mutation($token: String!, $password: String!) {
    resetPass(token: $token, password: $password) {
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

const resetPass = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  const res: any = await graphQLClient.request(resetPassMutation, {
    token,
    password,
  });
  return res?.resetPass;
};

export const useResetPassMutation = ({
  setMsg,
  setIsLoading,
  router,
}: useSignTypes) => {
  return useMutation(resetPass, {
    onSuccess: async ({ token, user }) => {
      token && localStorage.setItem("JWT", token);
      user && localStorage.setItem("User", JSON.stringify(user));
      user && client.setQueryData(["User"], user);
      token &&
        graphQLClient.setHeaders({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });
      await router.replace("/");
    },
    onError: (err: Error) => {
      setMsg(err.message.split(":")[0]);
      setIsLoading(false);
    },
  });
};
