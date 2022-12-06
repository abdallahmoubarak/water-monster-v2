import { useSignType } from "./hookTypes";
import { graphQLClient } from "@/utils/graphQLInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { meQuery, signInMutation, signUpMutation } from "./gql/auth";
import { client } from "pages/_app";
import { signTypes } from "@/types/common";

/*********************** useSignUp hook ***********************/

const signUp = async ({ userType, name, email, password }: signTypes) => {
  const variables = { name, email, password, userType };
  const res = await graphQLClient.request(signUpMutation, variables);
  return res?.signUp;
};

export const useSignUp = ({ setMsg, setIsLoading }: useSignType) => {
  return useMutation(signUp, {
    onSuccess: (res) => {
      localStorage.setItem("JWT", res?.token);
      client.setQueryData(["User"], res?.user);
      graphQLClient.setHeaders({
        authorization: `Bearer ${res?.token}`,
        "Content-Type": "application/json",
      });
    },
    onError: (err: Error) => {
      setMsg(err.message);
      setIsLoading(false);
    },
  });
};

/*********************** useSignIn hook ***********************/

const signIn = async ({ email, password }: signTypes) => {
  const variables = { email, password };
  const res = await graphQLClient.request(signInMutation, variables);
  return res?.signIn;
};

export const useSignIn = ({ setMsg, setIsLoading }: useSignType) => {
  return useMutation(signIn, {
    onSuccess: (res) => {
      localStorage.setItem("JWT", res?.token);
      localStorage.setItem("User", res?.user);
      client.setQueryData(["User"], res?.user);
      graphQLClient.setHeaders({
        authorization: `Bearer ${res?.token}`,
        "Content-Type": "application/json",
      });
    },
    onError: (err: Error) => {
      setMsg(err.message);
      setIsLoading(false);
    },
  });
};

/****************** get current user using jwt *******************/

const getUser = async () => {
  const res = await graphQLClient.request(meQuery);
  return res?.me;
};

export const useCurrentUser = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ["User"],
    queryFn: () => getUser(),
    refetchOnWindowFocus: false,
    placeholderData:
      typeof window !== "undefined" && localStorage.getItem("User"),
    enabled,
  });
};
