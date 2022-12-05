import { graphQLClient } from "@/utils/graphQLInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createMessageMutation, getMessagesQuery } from "./gql/message";

/*********************** use create message hook ***********************/

const createMessage = async ({ from, to, content }: createMessageType) => {
  const variables = { from, to, content };
  const res = await graphQLClient.request(createMessageMutation, variables);
  return res?.createMessage?.messages[0];
};

export const useCreateMessage = () => {
  return useMutation(createMessage, {
    onSuccess: (res) => console.log(res),
    onError: (err: Error) => console.log(err.message),
  });
};

type createMessageType = {
  from: string;
  to: string;
  content: string;
};

/*********************** use create message hook ***********************/

const getMessages = async ({ me, other }: getMessagesType) => {
  const variables = { me, other };
  const res = await graphQLClient.request(getMessagesQuery, variables);
  return res?.messages;
};

export const useGetMessages = ({ me, other, enabled }: useGetMessagesType) => {
  return useQuery({
    queryKey: [`${other}`],
    queryFn: () => getMessages({ me, other }),
    onError: (err: Error) => console.log(err.message),
    enabled,
  });
};

type getMessagesType = {
  me: string;
  other: string;
};

type useGetMessagesType = {
  me: string;
  other: string;
  enabled: boolean;
};
