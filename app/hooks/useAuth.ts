import { useSignTypes } from "./hookTypes";
import { graphQLClient } from "@/utils/graphQLInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  meQuery,
  logInMutation,
  signUpMutation,
  sendMagicLinkMutation,
  resetPassMutation,
} from "./gql/auth";
import { client } from "pages/_app";
import { signTypes } from "@/types/common";

/*********************** useSignUp hook ***********************/

const signUp = async ({ name, phone, email, password }: signTypes) => {
  const variables = { name, phone, email, password };
  const res: any = await graphQLClient.request(signUpMutation, variables);
  return res?.signUp;
};

export const useSignUp = ({ setMsg, setIsLoading }: useSignTypes) => {
  return useMutation(signUp, {
    onSuccess: ({ token, user }) => {
      token && localStorage.setItem("JWT", token);
      user && localStorage.setItem("User", JSON.stringify(user));
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

/*********************** uselogIn hook ***********************/

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

/****************** get current user using jwt *******************/

const getUser = async () => {
  const res: any = await graphQLClient.request(meQuery);
  return res?.me;
};

export const useCurrentUser = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ["User"],
    queryFn: () => getUser(),
    onSuccess: (res) => localStorage.setItem("User", JSON.stringify(res)),
    refetchOnWindowFocus: false,
    enabled,
  });
};

/****************** Send Email Mutation *******************/

const sendMagicLink = async ({ email }: { email: string }) => {
  const res: any = await graphQLClient.request(sendMagicLinkMutation, {
    email,
  });
  return res;
};

export const useSendMagicLinkMutation = ({
  setMsg,
  setIsLoading,
  setIsMailSent,
}: useSignTypes) => {
  return useMutation(sendMagicLink, {
    onSuccess: ({ message }) => {
      setMsg(message);
      setIsMailSent && setIsMailSent(true);
    },
    onError: (err: Error) => {
      setMsg(err.message.split(":")[0]);
      setIsLoading(false);
    },
  });
};

/****************** Send Email Mutation *******************/

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
          authorization: `Bearer ${token}`,
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
